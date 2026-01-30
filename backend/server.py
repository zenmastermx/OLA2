from fastapi import FastAPI, APIRouter, HTTPException, Depends, UploadFile, File
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime, timezone, timedelta
import jwt
import bcrypt
from emergentintegrations.llm.chat import LlmChat, UserMessage
import base64

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Configuration
JWT_SECRET = os.environ.get('JWT_SECRET', 'usa-edu-secret-key-2026')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

# Emergent LLM Key
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY', '')

# Enrollment Advisors Data
ENROLLMENT_ADVISORS = [
    {
        "id": "adv001",
        "name": "Sarah Mitchell",
        "title": "Senior Enrollment Advisor",
        "email": "smitchell@usa.edu",
        "phone": "(904) 826-1234",
        "avatar_url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        "specialization": "Occupational Therapy Programs",
        "acuity_link": "https://usa-admissions.acuityscheduling.com/schedule.php?appointmentType=sarah-mitchell"
    },
    {
        "id": "adv002",
        "name": "Michael Chen",
        "title": "Enrollment Advisor",
        "email": "mchen@usa.edu",
        "phone": "(904) 826-1235",
        "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        "specialization": "Nursing Programs",
        "acuity_link": "https://usa-admissions.acuityscheduling.com/schedule.php?appointmentType=michael-chen"
    },
    {
        "id": "adv003",
        "name": "Jessica Rodriguez",
        "title": "Enrollment Advisor",
        "email": "jrodriguez@usa.edu",
        "phone": "(904) 826-1236",
        "avatar_url": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        "specialization": "All Programs",
        "acuity_link": "https://usa-admissions.acuityscheduling.com/schedule.php?appointmentType=jessica-rodriguez"
    },
    {
        "id": "adv004",
        "name": "David Thompson",
        "title": "Senior Enrollment Advisor",
        "email": "dthompson@usa.edu",
        "phone": "(904) 826-1237",
        "avatar_url": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        "specialization": "Graduate Programs",
        "acuity_link": "https://usa-admissions.acuityscheduling.com/schedule.php?appointmentType=david-thompson"
    }
]

def assign_advisor():
    """Randomly assign an enrollment advisor to new user"""
    import random
    return random.choice(ENROLLMENT_ADVISORS)

app = FastAPI(title="USA.edu Application Portal API")
api_router = APIRouter(prefix="/api")
security = HTTPBearer()

# ==================== MODELS ====================

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    first_name: str
    last_name: str
    consent_call: Optional[bool] = True
    consent_text: Optional[bool] = True
    consent_email: Optional[bool] = True

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: str
    first_name: str
    last_name: str
    created_at: str
    consent_call: Optional[bool] = True
    consent_text: Optional[bool] = True
    consent_email: Optional[bool] = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class Employer(BaseModel):
    id: Optional[int] = None
    name: Optional[str] = None
    title: Optional[str] = None
    start: Optional[str] = None
    end: Optional[str] = None
    current: Optional[bool] = False

class PersonalInfo(BaseModel):
    # Contact Information
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    middle_name: Optional[str] = None
    preferred_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    alternate_phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    zip_code: Optional[str] = None
    country: Optional[str] = "United States"
    
    # Judicial Background
    judicial_agreement: Optional[str] = None
    felony_conviction: Optional[str] = None
    felony_explanation: Optional[str] = None
    
    # Emergency Contact
    emergency_first_name: Optional[str] = None
    emergency_last_name: Optional[str] = None
    emergency_relationship: Optional[str] = None
    emergency_phone: Optional[str] = None
    emergency_email: Optional[str] = None
    emergency_address: Optional[str] = None
    
    # Citizenship & Identification
    date_of_birth: Optional[str] = None
    gender: Optional[str] = None
    marital_status: Optional[str] = None
    us_citizen: Optional[str] = None
    residency_status: Optional[str] = None
    country_of_citizenship: Optional[str] = None
    us_visa: Optional[str] = None
    ssn: Optional[str] = None
    itin: Optional[str] = None
    funding_options: Optional[List[str]] = []
    
    # US Military Background
    veteran_benefits: Optional[str] = None
    active_military: Optional[str] = None
    military_branch: Optional[str] = None
    
    # Work Experience
    years_work_experience: Optional[str] = None
    current_job_title: Optional[str] = None
    ota_experience: Optional[str] = None
    employers: Optional[List[Dict[str, Any]]] = []
    
    # Demographic Information
    ethnicity: Optional[str] = None
    race: Optional[List[str]] = []
    referral_source: Optional[str] = None

class Institution(BaseModel):
    id: Optional[int] = None
    name: Optional[str] = None
    date: Optional[str] = None
    degree: Optional[str] = None

class PrerequisiteCourse(BaseModel):
    name: Optional[str] = None
    completed: Optional[bool] = False
    grade: Optional[str] = None
    institution: Optional[str] = None
    credits: Optional[float] = None

class AcademicHistory(BaseModel):
    # Education
    advanced_degree: Optional[str] = None
    highest_degree: Optional[str] = None
    institution_name: Optional[str] = None
    degree_type: Optional[str] = None
    major: Optional[str] = None
    gpa: Optional[float] = None
    graduation_date: Optional[str] = None
    institutions: Optional[List[Dict[str, Any]]] = []
    
    # Prerequisites
    prerequisites: Optional[Dict[str, Any]] = {}
    
    # Test Information (TOEFL)
    toefl_required: Optional[bool] = None
    toefl_date: Optional[str] = None
    toefl_total: Optional[str] = None
    toefl_reading: Optional[str] = None
    toefl_writing: Optional[str] = None
    toefl_speaking: Optional[str] = None
    toefl_listening: Optional[str] = None
    
    # Prior Application
    prior_application: Optional[str] = None
    prior_application_date: Optional[str] = None
    prior_ot_enrollment: Optional[str] = None
    
    # Academic Background
    academic_probation: Optional[str] = None
    probation_explanation: Optional[str] = None

class EmploymentVerification(BaseModel):
    id: Optional[int] = None
    verifier_first_name: Optional[str] = None
    verifier_last_name: Optional[str] = None
    verifier_email: Optional[str] = None
    verifier_phone: Optional[str] = None
    employer_name: Optional[str] = None
    employer_address: Optional[str] = None
    job_title: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None
    hours_worked: Optional[str] = None
    request_stage: Optional[str] = "Pending"
    date_requested: Optional[str] = None
    date_confirmed: Optional[str] = None

class EmploymentHistory(BaseModel):
    verifications: Optional[List[Dict[str, Any]]] = []

class ProgramSelection(BaseModel):
    program_type: Optional[str] = None  # Occupational Therapy, Nursing, Education, Certificates
    program_pathway: Optional[str] = None  # Full pathway name
    program_level: Optional[str] = None  # MOT, OTD, MSN, DNP
    campus: Optional[str] = None  # Primary campus
    secondary_campus: Optional[str] = None  # Backup campus
    start_term: Optional[str] = None
    full_time: Optional[bool] = True

class TranscriptFile(BaseModel):
    name: str
    uploaded_at: str
    file_data: Optional[str] = None

class DocumentInfo(BaseModel):
    id: str
    name: str
    type: str
    status: str  # pending, uploaded, verified
    uploaded_at: Optional[str] = None
    file_data: Optional[str] = None
    files: Optional[List[TranscriptFile]] = None  # For multiple transcript files

class FinancialAid(BaseModel):
    fafsa_completed: Optional[bool] = False
    scholarship_interest: Optional[bool] = False
    payment_plan_interest: Optional[bool] = False
    comments: Optional[str] = None

class ApplicationCreate(BaseModel):
    program_type: str  # Occupational Therapy, Nursing, Education, Certificates
    program_pathway: Optional[str] = None
    start_term: Optional[str] = None
    primary_campus: Optional[str] = None
    secondary_campus: Optional[str] = None

class ApplicationUpdate(BaseModel):
    personal_info: Optional[PersonalInfo] = None
    academic_history: Optional[AcademicHistory] = None
    program_selection: Optional[ProgramSelection] = None
    financial_aid: Optional[FinancialAid] = None
    employment_history: Optional[EmploymentHistory] = None
    current_step: Optional[int] = None

class ApplicationResponse(BaseModel):
    id: str
    user_id: str
    status: str
    progress: int
    current_step: int
    personal_info: Optional[PersonalInfo] = None
    academic_history: Optional[AcademicHistory] = None
    program_selection: Optional[ProgramSelection] = None
    employment_history: Optional[EmploymentHistory] = None
    documents: List[DocumentInfo] = []
    financial_aid: Optional[FinancialAid] = None
    created_at: str
    updated_at: str
    submitted_at: Optional[str] = None

class ChatMessage(BaseModel):
    message: str
    session_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str

# ==================== AUTH HELPERS ====================

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        user_id = payload.get("sub")
        if not user_id:
            raise HTTPException(status_code=401, detail="Invalid token")
        user = await db.users.find_one({"id": user_id}, {"_id": 0})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ==================== AUTH ROUTES ====================

@api_router.post("/auth/register", response_model=TokenResponse)
async def register(user_data: UserCreate):
    existing = await db.users.find_one({"email": user_data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    user_id = str(uuid.uuid4())
    assigned_advisor = assign_advisor()
    
    user_doc = {
        "id": user_id,
        "email": user_data.email,
        "password_hash": hash_password(user_data.password),
        "first_name": user_data.first_name,
        "last_name": user_data.last_name,
        "enrollment_advisor": assigned_advisor,
        "consent_call": user_data.consent_call,
        "consent_text": user_data.consent_text,
        "consent_email": user_data.consent_email,
        "created_at": datetime.now(timezone.utc).isoformat()
    }
    await db.users.insert_one(user_doc)
    
    token = create_token(user_id)
    return TokenResponse(
        access_token=token,
        user=UserResponse(
            id=user_id,
            email=user_data.email,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            created_at=user_doc["created_at"],
            consent_call=user_data.consent_call,
            consent_text=user_data.consent_text,
            consent_email=user_data.consent_email
        )
    )

@api_router.post("/auth/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    user = await db.users.find_one({"email": credentials.email}, {"_id": 0})
    if not user or not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    token = create_token(user["id"])
    return TokenResponse(
        access_token=token,
        user=UserResponse(
            id=user["id"],
            email=user["email"],
            first_name=user["first_name"],
            last_name=user["last_name"],
            created_at=user["created_at"],
            consent_call=user.get("consent_call", True),
            consent_text=user.get("consent_text", True),
            consent_email=user.get("consent_email", True)
        )
    )

@api_router.get("/auth/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    return UserResponse(
        id=current_user["id"],
        email=current_user["email"],
        first_name=current_user["first_name"],
        last_name=current_user["last_name"],
        created_at=current_user["created_at"],
        consent_call=current_user.get("consent_call", True),
        consent_text=current_user.get("consent_text", True),
        consent_email=current_user.get("consent_email", True)
    )

@api_router.get("/auth/advisor")
async def get_my_advisor(current_user: dict = Depends(get_current_user)):
    """Get the assigned enrollment advisor for current user"""
    advisor = current_user.get("enrollment_advisor")
    if not advisor:
        # Assign one if not exists (for existing users)
        advisor = assign_advisor()
        await db.users.update_one(
            {"id": current_user["id"]},
            {"$set": {"enrollment_advisor": advisor}}
        )
    
    # Convert calendly_link to acuity_link for backwards compatibility
    if advisor and "calendly_link" in advisor and "acuity_link" not in advisor:
        advisor_name = advisor.get("name", "").lower().replace(" ", "-")
        advisor["acuity_link"] = f"https://usa-admissions.acuityscheduling.com/schedule.php?appointmentType={advisor_name}"
    
    return advisor

# ==================== APPLICATION ROUTES ====================

def calculate_progress(app_data: dict) -> int:
    """
    Calculate application progress based on all completed fields across all sections.
    Total: 100% distributed across 5 main sections (20% each)
    - Personal Information: 20% (7 sub-sections)
    - Academic History: 20% (5 sub-sections)
    - Employment History: 20%
    - Documents: 20% (5 required documents)
    - Review/Submit: 20%
    """
    
    # If submitted, always 100%
    if app_data.get("status") == "submitted":
        return 100
    
    total_progress = 0
    
    # === PERSONAL INFORMATION (20% total) ===
    pi = app_data.get("personal_info", {})
    pi_score = 0
    
    # Contact Info (required: first_name, last_name, email)
    if pi.get("first_name") and pi.get("last_name") and pi.get("email"):
        pi_score += 3
    
    # Judicial Background (judicial_agreement must be set to true/false, not null)
    if pi.get("judicial_agreement") is not None and pi.get("judicial_agreement") != "":
        pi_score += 3
    
    # Emergency Contact (required: emergency_first_name, emergency_phone)
    if pi.get("emergency_first_name") and pi.get("emergency_phone"):
        pi_score += 3
    
    # Citizenship & Identification (required: date_of_birth, gender)
    if pi.get("date_of_birth") and pi.get("gender"):
        pi_score += 3
    
    # US Military Background (veteran_benefits must be set)
    if pi.get("veteran_benefits") is not None and pi.get("veteran_benefits") != "":
        pi_score += 3
    
    # Work Experience (years_work_experience must be set)
    if pi.get("years_work_experience") is not None and pi.get("years_work_experience") != "":
        pi_score += 3
    
    # Demographic Information (ethnicity must be set)
    if pi.get("ethnicity") is not None and pi.get("ethnicity") != "":
        pi_score += 2
    
    total_progress += min(pi_score, 20)
    
    # === ACADEMIC HISTORY (20% total) ===
    ah = app_data.get("academic_history", {})
    ah_score = 0
    
    # Prerequisites (at least one course added)
    prereqs = ah.get("prerequisites", {})
    has_prereqs = any(len(p.get("courses", [])) > 0 for p in prereqs.values()) if prereqs else False
    if has_prereqs:
        ah_score += 4
    
    # Education (highest_degree set)
    if ah.get("highest_degree") and ah.get("highest_degree") != "":
        ah_score += 4
    
    # Test Information (toefl_required set or toefl_date provided)
    if ah.get("toefl_required") is not None or ah.get("toefl_date"):
        ah_score += 4
    
    # Prior Application (prior_application set)
    if ah.get("prior_application") is not None and ah.get("prior_application") != "":
        ah_score += 4
    
    # Academic Background (academic_probation set)
    if ah.get("academic_probation") is not None and ah.get("academic_probation") != "":
        ah_score += 4
    
    total_progress += min(ah_score, 20)
    
    # === EMPLOYMENT HISTORY (20% total) ===
    eh = app_data.get("employment_history", {})
    eh_score = 0
    
    # Currently employed status set
    if eh.get("currently_employed") is not None:
        eh_score += 10
    
    # If employed, employer details provided
    if eh.get("currently_employed") == True:
        if eh.get("employer_name"):
            eh_score += 5
        if eh.get("job_title"):
            eh_score += 5
    elif eh.get("currently_employed") == False:
        # Not employed, section complete
        eh_score += 10
    
    total_progress += min(eh_score, 20)
    
    # === DOCUMENTS (20% total) ===
    docs = app_data.get("documents", [])
    uploaded_count = sum(1 for d in docs if d.get("status") == "uploaded")
    total_docs = max(len(docs), 5)  # Assume 5 required documents
    doc_score = int((uploaded_count / total_docs) * 20)
    total_progress += min(doc_score, 20)
    
    # === PROGRAM SELECTION / REVIEW (20% total) ===
    ps = app_data.get("program_selection", {})
    ps_score = 0
    
    if ps.get("program_type"):
        ps_score += 5
    if ps.get("program_pathway"):
        ps_score += 5
    if ps.get("start_term"):
        ps_score += 5
    if ps.get("campus") or ps.get("primary_campus"):
        ps_score += 5
    
    total_progress += min(ps_score, 20)
    
    return min(total_progress, 100)

@api_router.post("/applications", response_model=ApplicationResponse)
async def create_application(app_data: ApplicationCreate, current_user: dict = Depends(get_current_user)):
    existing = await db.applications.find_one({"user_id": current_user["id"], "status": {"$ne": "submitted"}})
    if existing:
        raise HTTPException(status_code=400, detail="You already have an active application")
    
    app_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()
    
    default_docs = [
        {"id": str(uuid.uuid4()), "name": "Official Transcript", "type": "transcript", "status": "pending"},
        {"id": str(uuid.uuid4()), "name": "Resume/CV", "type": "resume", "status": "pending"},
        {"id": str(uuid.uuid4()), "name": "Personal Statement", "type": "statement", "status": "pending"},
        {"id": str(uuid.uuid4()), "name": "Letters of Recommendation", "type": "recommendation", "status": "pending"},
        {"id": str(uuid.uuid4()), "name": "Government ID", "type": "id", "status": "pending"},
    ]
    
    application = {
        "id": app_id,
        "user_id": current_user["id"],
        "status": "draft",
        "progress": 0,
        "current_step": 1,
        "personal_info": {
            "first_name": current_user["first_name"],
            "last_name": current_user["last_name"],
            "email": current_user["email"]
        },
        "academic_history": {},
        "program_selection": {
            "program_type": app_data.program_type,
            "program_pathway": app_data.program_pathway,
            "start_term": app_data.start_term,
            "campus": app_data.primary_campus,
            "secondary_campus": app_data.secondary_campus
        },
        "employment_history": {"verifications": []},
        "documents": default_docs,
        "financial_aid": {},
        "created_at": now,
        "updated_at": now,
        "submitted_at": None
    }
    
    await db.applications.insert_one(application)
    if "_id" in application:
        del application["_id"]
    application["progress"] = calculate_progress(application)
    
    return ApplicationResponse(**application)

@api_router.get("/applications", response_model=List[ApplicationResponse])
async def get_applications(current_user: dict = Depends(get_current_user)):
    apps = await db.applications.find({"user_id": current_user["id"]}, {"_id": 0}).to_list(100)
    for app in apps:
        app["progress"] = calculate_progress(app)
    return apps

@api_router.get("/applications/{app_id}", response_model=ApplicationResponse)
async def get_application(app_id: str, current_user: dict = Depends(get_current_user)):
    app = await db.applications.find_one({"id": app_id, "user_id": current_user["id"]}, {"_id": 0})
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    app["progress"] = calculate_progress(app)
    return ApplicationResponse(**app)

@api_router.put("/applications/{app_id}", response_model=ApplicationResponse)
async def update_application(app_id: str, update_data: ApplicationUpdate, current_user: dict = Depends(get_current_user)):
    app = await db.applications.find_one({"id": app_id, "user_id": current_user["id"]})
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    if app["status"] == "submitted":
        raise HTTPException(status_code=400, detail="Cannot modify submitted application")
    
    update_dict = {"updated_at": datetime.now(timezone.utc).isoformat()}
    
    if update_data.personal_info:
        update_dict["personal_info"] = {**app.get("personal_info", {}), **update_data.personal_info.model_dump(exclude_none=True)}
    if update_data.academic_history:
        update_dict["academic_history"] = {**app.get("academic_history", {}), **update_data.academic_history.model_dump(exclude_none=True)}
    if update_data.program_selection:
        update_dict["program_selection"] = {**app.get("program_selection", {}), **update_data.program_selection.model_dump(exclude_none=True)}
    if update_data.financial_aid:
        update_dict["financial_aid"] = {**app.get("financial_aid", {}), **update_data.financial_aid.model_dump(exclude_none=True)}
    if update_data.employment_history:
        update_dict["employment_history"] = {**app.get("employment_history", {}), **update_data.employment_history.model_dump(exclude_none=True)}
    if update_data.current_step is not None:
        update_dict["current_step"] = update_data.current_step
    
    await db.applications.update_one({"id": app_id}, {"$set": update_dict})
    
    updated_app = await db.applications.find_one({"id": app_id}, {"_id": 0})
    updated_app["progress"] = calculate_progress(updated_app)
    return ApplicationResponse(**updated_app)

@api_router.post("/applications/{app_id}/submit", response_model=ApplicationResponse)
async def submit_application(app_id: str, current_user: dict = Depends(get_current_user)):
    app = await db.applications.find_one({"id": app_id, "user_id": current_user["id"]})
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    if app["status"] == "submitted":
        raise HTTPException(status_code=400, detail="Application already submitted")
    
    now = datetime.now(timezone.utc).isoformat()
    await db.applications.update_one(
        {"id": app_id},
        {"$set": {"status": "submitted", "submitted_at": now, "updated_at": now, "progress": 100}}
    )
    
    updated_app = await db.applications.find_one({"id": app_id}, {"_id": 0})
    updated_app["progress"] = 100
    return ApplicationResponse(**updated_app)

# ==================== DOCUMENT ROUTES ====================

@api_router.post("/applications/{app_id}/documents/{doc_id}/upload")
async def upload_document(
    app_id: str,
    doc_id: str,
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    app = await db.applications.find_one({"id": app_id, "user_id": current_user["id"]})
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    
    documents = app.get("documents", [])
    doc_index = next((i for i, d in enumerate(documents) if d["id"] == doc_id), None)
    
    if doc_index is None:
        raise HTTPException(status_code=404, detail="Document not found")
    
    file_content = await file.read()
    file_data = base64.b64encode(file_content).decode('utf-8')
    
    documents[doc_index]["status"] = "uploaded"
    documents[doc_index]["uploaded_at"] = datetime.now(timezone.utc).isoformat()
    documents[doc_index]["name"] = file.filename or documents[doc_index]["name"]
    documents[doc_index]["file_data"] = file_data[:100] + "..."  # Store preview only
    
    await db.applications.update_one(
        {"id": app_id},
        {"$set": {"documents": documents, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    
    return {"success": True, "document": documents[doc_index]}

@api_router.post("/applications/{app_id}/documents/{doc_id}/upload-transcript")
async def upload_transcript(
    app_id: str,
    doc_id: str,
    file: UploadFile = File(...),
    current_user: dict = Depends(get_current_user)
):
    """Upload a transcript file (supports multiple files for the same document)"""
    app = await db.applications.find_one({"id": app_id, "user_id": current_user["id"]})
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    
    documents = app.get("documents", [])
    doc_index = next((i for i, d in enumerate(documents) if d["id"] == doc_id), None)
    
    if doc_index is None:
        raise HTTPException(status_code=404, detail="Document not found")
    
    file_content = await file.read()
    file_data = base64.b64encode(file_content).decode('utf-8')
    
    # Initialize files array if not exists
    if "files" not in documents[doc_index]:
        documents[doc_index]["files"] = []
    
    # Add new transcript file
    documents[doc_index]["files"].append({
        "name": file.filename,
        "uploaded_at": datetime.now(timezone.utc).isoformat(),
        "file_data": file_data[:100] + "..."  # Store preview only
    })
    
    # Update status to uploaded if at least one file exists
    documents[doc_index]["status"] = "uploaded"
    documents[doc_index]["uploaded_at"] = datetime.now(timezone.utc).isoformat()
    
    await db.applications.update_one(
        {"id": app_id},
        {"$set": {"documents": documents, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    
    return {"success": True, "document": documents[doc_index]}

@api_router.delete("/applications/{app_id}/documents/{doc_id}/transcript/{file_index}")
async def remove_transcript(
    app_id: str,
    doc_id: str,
    file_index: int,
    current_user: dict = Depends(get_current_user)
):
    """Remove a specific transcript file from the document"""
    app = await db.applications.find_one({"id": app_id, "user_id": current_user["id"]})
    if not app:
        raise HTTPException(status_code=404, detail="Application not found")
    
    documents = app.get("documents", [])
    doc_index = next((i for i, d in enumerate(documents) if d["id"] == doc_id), None)
    
    if doc_index is None:
        raise HTTPException(status_code=404, detail="Document not found")
    
    files = documents[doc_index].get("files", [])
    if file_index < 0 or file_index >= len(files):
        raise HTTPException(status_code=404, detail="File not found")
    
    # Remove the file
    files.pop(file_index)
    documents[doc_index]["files"] = files
    
    # Update status based on remaining files
    if len(files) == 0:
        documents[doc_index]["status"] = "pending"
        documents[doc_index]["uploaded_at"] = None
    
    await db.applications.update_one(
        {"id": app_id},
        {"$set": {"documents": documents, "updated_at": datetime.now(timezone.utc).isoformat()}}
    )
    
    return {"success": True, "remaining_files": len(files)}

# ==================== AI CHAT ROUTES ====================

@api_router.post("/chat", response_model=ChatResponse)
async def chat_with_ai(chat_data: ChatMessage, current_user: dict = Depends(get_current_user)):
    session_id = chat_data.session_id or str(uuid.uuid4())
    
    # Get user's application context
    app = await db.applications.find_one({"user_id": current_user["id"]}, {"_id": 0})
    
    context = f"""You are 'Journey', an AI assistant for the University of St. Augustine for Health Sciences (USA.edu) application portal.
    
Current applicant: {current_user['first_name']} {current_user['last_name']}
"""
    if app:
        context += f"""
Application Status: {app.get('status', 'No application')}
Progress: {calculate_progress(app)}%
Program: {app.get('program_selection', {}).get('program_type', 'Not selected')}
Current Step: {app.get('current_step', 1)}
"""
    
    context += """
You help prospective students with:
- Application status and requirements
- Program information:
  • Occupational Therapy: MOT (Master's), OTD (Doctorate)
  • Nursing: MSN (Master's), DNP (Doctorate)
  • Education: EdD (Doctorate), MS (Master's)
  • Certificates: Professional development and advanced specialty certificates
- Document requirements and deadlines
- Campus information and financial aid

CAMPUS LOCATIONS (use this exact information):
• San Marcos, California - Main West Coast campus, located in San Diego County
• Austin, Texas - Texas campus serving the central TX region
• Dallas, Texas - North Texas campus in the Dallas-Fort Worth area
• Miami, Florida - South Florida campus
• St. Augustine, Florida - Founding campus, historic location in northeast Florida

KEY DEADLINES:
• Spring 2026: Application deadline December 1, 2025
• Summer 2026: Application deadline April 1, 2026
• Fall 2026: Application deadline July 1, 2026

REQUIRED DOCUMENTS:
• Official transcripts from all colleges/universities attended
• Resume/CV
• Personal statement
• Letters of recommendation (2-3)
• Government-issued ID

Be friendly, professional, and concise. Guide students through their application journey. Always provide accurate campus location information - San Marcos is in CALIFORNIA, not Texas."""

    try:
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=session_id,
            system_message=context
        ).with_model("anthropic", "claude-sonnet-4-5-20250929")
        
        user_message = UserMessage(text=chat_data.message)
        response = await chat.send_message(user_message)
        
        # Store chat history
        await db.chat_history.insert_one({
            "id": str(uuid.uuid4()),
            "session_id": session_id,
            "user_id": current_user["id"],
            "user_message": chat_data.message,
            "ai_response": response,
            "created_at": datetime.now(timezone.utc).isoformat()
        })
        
        return ChatResponse(response=response, session_id=session_id)
    except Exception as e:
        logging.error(f"AI Chat error: {str(e)}")
        return ChatResponse(
            response="I apologize, but I'm having trouble connecting right now. Please try again in a moment, or contact our admissions team directly at admissions@usa.edu for immediate assistance.",
            session_id=session_id
        )

@api_router.get("/chat/history")
async def get_chat_history(session_id: Optional[str] = None, current_user: dict = Depends(get_current_user)):
    query = {"user_id": current_user["id"]}
    if session_id:
        query["session_id"] = session_id
    history = await db.chat_history.find(query, {"_id": 0}).sort("created_at", 1).to_list(100)
    return history

# ==================== PROGRAMS INFO ====================

@api_router.get("/programs")
async def get_programs():
    return {
        "programs": [
            {
                "id": "ot",
                "name": "Occupational Therapy",
                "description": "Transform lives through therapeutic interventions",
                "levels": [
                    {"code": "MOT", "name": "Master of Occupational Therapy", "duration": "2.5 years"},
                    {"code": "OTD", "name": "Doctor of Occupational Therapy", "duration": "3 years"}
                ],
                "campuses": ["Austin", "Dallas", "Miami", "San Marcos", "St. Augustine"]
            },
            {
                "id": "nursing",
                "name": "Nursing",
                "description": "Lead the future of patient care and healthcare innovation",
                "levels": [
                    {"code": "MSN", "name": "Master of Science in Nursing", "duration": "2 years"},
                    {"code": "DNP", "name": "Doctor of Nursing Practice", "duration": "3 years"}
                ],
                "campuses": ["Austin", "Miami", "St. Augustine"]
            },
            {
                "id": "education",
                "name": "Education",
                "description": "Shape tomorrow's healthcare educators and leaders",
                "levels": [
                    {"code": "EdD", "name": "Doctor of Education", "duration": "3 years"},
                    {"code": "MS-Ed", "name": "Master of Science in Education", "duration": "2 years"}
                ],
                "campuses": ["Austin", "St. Augustine", "Online"]
            },
            {
                "id": "certificates",
                "name": "Certificates",
                "description": "Advance your skills with specialized training programs",
                "levels": [
                    {"code": "Prof", "name": "Professional Certificate", "duration": "6-12 months"},
                    {"code": "Adv", "name": "Advanced Specialty Certificate", "duration": "3-6 months"}
                ],
                "campuses": ["Austin", "Dallas", "Miami", "San Marcos", "St. Augustine", "Online"]
            }
        ],
        "start_terms": ["Spring 2026", "Summer 2026", "Fall 2026", "Spring 2027"]
    }

# ==================== HEALTH CHECK ====================

@api_router.get("/")
async def root():
    return {"message": "USA.edu Application Portal API", "status": "healthy"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}

# Include router
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
