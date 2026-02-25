# USA.edu Application Portal - PRD

## Project Overview
A cutting-edge, futuristic student online application portal for the University of St. Augustine for Health Sciences (USA.edu).

## Target Audience
- Occupational Therapy (OT) applicants
- Nursing program applicants

## Core Requirements
- Dark mode first design with glassmorphism UI
- JWT-based authentication
- MongoDB data storage
- AI-powered assistant (Claude Sonnet 4.5)
- Multi-step application forms
- Document upload capability
- Progress tracking
- **Enrollment Advisor Assignment** (NEW)

## Tech Stack
- **Frontend**: React 19, Tailwind CSS, shadcn/ui
- **Backend**: FastAPI (Python)
- **Database**: MongoDB
- **AI**: Claude Sonnet 4.5 via Emergent LLM Key

## Color Palette
- Primary: #00B4D8 (Bright Cyan), #002855 (Deep Navy)
- Accent: #00F5FF (Neon Cyan), #7B68EE (Purple)
- Background: #0A0E14 (Dark), #11161F (Paper)

---

## What's Been Implemented (Jan 30, 2026)

### Pages
1. **Landing Page** (`/`)
   - Hero section with animated background
   - Program selection cards (4-column grid: OT, Nursing, Education, Certificates)
   - Feature highlights (AI Assistant, Progress Tracking, 24/7 Support)
   - Campus locations
   - Stats (15K+ Alumni, 95% Employment, 5 Campuses)

2. **Login Page** (`/login`)
   - Email/password authentication
   - Password visibility toggle
   - Link to registration

3. **Register Page** (`/register`)
   - First/last name, email, phone, password fields
   - Password strength indicators
   - Confirm password validation
   - **Auto-assigns enrollment advisor on registration**
   - **Redesigned Consent Agreement Flow** (Updated Jan 30, 2026)
     - Title: "CONSENT AGREEMENT" (more consent-aligned)
     - Two card options: "I Agree" and "I Do Not Agree"
     - Card design with icon, title, and description (matches communication preference card style)
     - **Smooth animations**: scale, glow effects, and transitions on selection
     - **Field validation**: "I Agree" is grayed out until all fields are filled correctly. Shows error toast if clicked prematurely
     - "I Agree" enables Create Account button with slide-up animation, sets all consent flags to true
     - "I Do Not Agree" hides Create Account button, shows modal with phone number 855-481-9203
     - Modal instructs user to complete application by phone
   - **Email Verification Flow** (NEW - Feb 25, 2026)
     - After registration, user receives verification modal
     - Mock email window opens automatically (for development)
     - User must click "Verify Email Address" button in mock email
     - System polls for verification status every 3 seconds
     - Upon verification, user is redirected to dashboard
     - Unverified users cannot start applications

4. **Mock Email Page** (`/mock-email`) (NEW - Development Only)
   - Simulates email client for development/testing
   - Shows branded verification email from USA.edu
   - "Verify Email Address" button calls verification API
   - Shows success screen after verification
   - Window auto-closes after 3 seconds
     - Modal instructs user to complete application by phone
     - Preferences saved to database and returned on login

4. **Dashboard** (`/dashboard`)
   - Welcome greeting with user name
   - **Application Review Status Progress Bar** (NEW - for submitted apps)
     - Visual progress tracker showing: Application Received → Under Review → Admitted/Denied
     - Dynamic status updates based on review_status field
     - Pulsing indicator for current status
   - Progress ring (percentage complete)
   - Deadline countdown
   - Documents status
   - **Active Application Card**
     - Program badges (Active Application, Program Type)
     - Detail cards: Pathway, Primary Campus, Start Term, Backup Campus
     - Application step navigation (5 steps)
   - **Submitted Applications Section**
     - Consistent card layout matching active application view
     - Detail cards: Pathway, Primary Campus, Start Term, Backup Campus
     - "Submitted" and Program Type badges
     - **Dynamic status badge** (Application Received, Under Review, Admitted, Denied)
     - Submission date display
   - **Enrollment Advisor Card**
     - Advisor name, avatar, title, specialization (dynamically shows user's program)
     - In-app modals for: Schedule Appointment, Send Email, Send Text, Call (UI-only, backend MOCKED)
   - Create new application modal (3-step: Program Category → Pathway → Term/Campus)
   - AI Chat "Ask Journey" button

5. **Application Form** (`/application/:appId/:step`)
   - 6-step application: Personal Info, Academic History, Employment History, Documents Required, **Request Official Transcripts (NEW)**, Review & Submit
   - Theme toggle in navbar
   - Step navigation with progress indicators
   - **Request Official Transcripts Step (NEW)**:
     - Pulls institutions from Academic History
     - Service dropdown per institution (Parchment, National Student Clearinghouse, Portage, CAS, Joint Service Transcripts)
     - "USA Certified Mail" option for manual requests
     - "Request" button triggers API call with timestamp
     - "Mark Sent" option for certified mail
     - Status persists server-side (requested/marked_sent)
     - Progress summary shows X of Y institutions requested

### Features
- ✅ JWT Authentication (register/login/logout)
- ✅ **Enrollment Advisor Auto-Assignment** (NEW)
- ✅ Application CRUD operations
- ✅ Progress calculation (auto-updates)
- ✅ AI Chat "Ask Journey" with Claude Sonnet 4.5
- ✅ Document upload (5 required docs)
- ✅ Program selection (OT: MOT/OTD, Nursing: MSN/DNP)
- ✅ Campus selection (Austin, Dallas, Miami, San Marcos, St. Augustine)
- ✅ Start term selection
- ✅ Financial aid preferences
- ✅ Application submission
- ✅ **Complex nested data persistence** (personal_info, academic_history, employment_history)

### API Endpoints
- `POST /api/auth/register` - User registration (with advisor assignment)
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/auth/advisor` - **Get assigned enrollment advisor** (NEW)
- `GET /api/applications` - List user applications
- `POST /api/applications` - Create application
- `GET /api/applications/:id` - Get application
- `PUT /api/applications/:id` - Update application (supports nested data)
- `POST /api/applications/:id/submit` - Submit application
- `POST /api/applications/:id/documents/:docId/upload` - Upload document
- `POST /api/chat` - AI Chat
- `GET /api/programs` - List programs
- `GET /api/auth/verify-email/:token` - Verify user email (NEW)
- `GET /api/auth/check-verification` - Check if user is verified (NEW)
- `POST /api/auth/resend-verification` - Regenerate verification token (NEW)

### Data Models
- **PersonalInfo**: Contact info, judicial background, emergency contact, citizenship, military, work experience, demographics
- **AcademicHistory**: Prerequisites, education, TOEFL scores, prior application, academic background
- **EmploymentHistory**: Employment verifications with verifier info, dates, hours worked

---

## Backlog / Future Enhancements

### P0 (Critical)
- End-to-End Data Persistence Verification - Audit all form fields including prerequisites
- Wire up "Review & Submit" page to display complete application summary

### P1 (High Priority)
- Connect In-App Modals (Email, Text, Call, Schedule) to backend (currently UI-only/MOCKED)
- Add pathways for "Education" and "Certificates" programs in selection modal
- User Account Settings Page (update communication preferences post-registration)
- ~~Email verification on registration~~ ✅ DONE (Mock implementation for development)
- Password reset functionality
- Real document preview (PDF viewer)
- Application history/timeline
- Email notifications on status changes
- Admin dashboard for reviewing applications
- **Integrate real email service** (SendGrid/Resend) for production email verification

### P2 (Medium Priority)
- Refactor Dashboard.js - Extract modal logic into separate components
- Virtual campus tours integration
- Video interview scheduling
- Scholarship matcher
- Net price calculator
- Mobile native apps

### P3 (Low Priority)
- VR campus tours
- AI essay feedback
- Voice control interface
- Blockchain credentials

---

## User Personas

### Sarah, 24 - Career Changer
- Biology degree holder
- Wants to become an OT
- Values clear guidance through application

### Michael, 28 - Working Professional
- Current LPN seeking MSN
- Limited time, needs mobile-friendly
- Appreciates AI assistance

---

## Success Metrics
- Application completion rate > 80%
- Time to complete < 30 minutes
- User satisfaction > 4.5/5
- Support ticket reduction 50%

---

## Test Credentials
- **User with submitted app**: submitted_test@test.com / password123
- **Alternative test**: testuser@test.com / password123

## MOCKED Features (UI-only, no backend)
- In-app modals for advisor communication (Email, Text, Call, Schedule Appointment)
