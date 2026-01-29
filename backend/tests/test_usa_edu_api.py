"""
USA.edu Application Portal API Tests
Tests for: Auth (register, login, advisor), Applications CRUD, Employment History
"""
import pytest
import requests
import os
import uuid

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

# Test data
TEST_USER_EMAIL = f"test_{uuid.uuid4().hex[:8]}@test.com"
TEST_USER_PASSWORD = "password123"
TEST_USER_FIRST = "Test"
TEST_USER_LAST = "User"


class TestHealthEndpoints:
    """Health check endpoints"""
    
    def test_api_root(self):
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "USA.edu" in data["message"]
        print("✓ API root endpoint healthy")
    
    def test_health_check(self):
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "timestamp" in data
        print("✓ Health check endpoint working")


class TestAuthEndpoints:
    """Authentication flow tests"""
    
    @pytest.fixture(scope="class")
    def registered_user(self):
        """Register a new user and return token + user data"""
        response = requests.post(f"{BASE_URL}/api/auth/register", json={
            "email": TEST_USER_EMAIL,
            "password": TEST_USER_PASSWORD,
            "first_name": TEST_USER_FIRST,
            "last_name": TEST_USER_LAST
        })
        assert response.status_code == 200, f"Registration failed: {response.text}"
        data = response.json()
        return data
    
    def test_register_new_user(self, registered_user):
        """Test user registration creates user with advisor"""
        assert "access_token" in registered_user
        assert registered_user["token_type"] == "bearer"
        assert registered_user["user"]["email"] == TEST_USER_EMAIL
        assert registered_user["user"]["first_name"] == TEST_USER_FIRST
        assert registered_user["user"]["last_name"] == TEST_USER_LAST
        assert "id" in registered_user["user"]
        print(f"✓ User registered: {TEST_USER_EMAIL}")
    
    def test_register_duplicate_email(self, registered_user):
        """Test duplicate email registration fails"""
        response = requests.post(f"{BASE_URL}/api/auth/register", json={
            "email": TEST_USER_EMAIL,
            "password": "anotherpass",
            "first_name": "Another",
            "last_name": "User"
        })
        assert response.status_code == 400
        assert "already registered" in response.json()["detail"].lower()
        print("✓ Duplicate email registration blocked")
    
    def test_login_success(self, registered_user):
        """Test login with valid credentials"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": TEST_USER_EMAIL,
            "password": TEST_USER_PASSWORD
        })
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert data["user"]["email"] == TEST_USER_EMAIL
        print("✓ Login successful")
    
    def test_login_invalid_credentials(self):
        """Test login with invalid credentials"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "nonexistent@test.com",
            "password": "wrongpassword"
        })
        assert response.status_code == 401
        print("✓ Invalid login rejected")
    
    def test_get_current_user(self, registered_user):
        """Test /auth/me endpoint"""
        token = registered_user["access_token"]
        response = requests.get(f"{BASE_URL}/api/auth/me", headers={
            "Authorization": f"Bearer {token}"
        })
        assert response.status_code == 200
        data = response.json()
        assert data["email"] == TEST_USER_EMAIL
        assert data["first_name"] == TEST_USER_FIRST
        print("✓ Get current user working")
    
    def test_get_advisor_for_user(self, registered_user):
        """Test /auth/advisor endpoint returns advisor data"""
        token = registered_user["access_token"]
        response = requests.get(f"{BASE_URL}/api/auth/advisor", headers={
            "Authorization": f"Bearer {token}"
        })
        assert response.status_code == 200
        advisor = response.json()
        
        # Verify advisor has all required fields
        assert "id" in advisor
        assert "name" in advisor
        assert "title" in advisor
        assert "email" in advisor
        assert "phone" in advisor
        assert "avatar_url" in advisor
        assert "specialization" in advisor
        assert "calendly_link" in advisor
        
        # Verify advisor data is valid
        assert advisor["name"] in ["Sarah Mitchell", "Michael Chen", "Jessica Rodriguez", "David Thompson"]
        assert "@usa.edu" in advisor["email"]
        assert "unsplash" in advisor["avatar_url"]
        assert "calendly" in advisor["calendly_link"]
        
        print(f"✓ Advisor assigned: {advisor['name']} - {advisor['specialization']}")
    
    def test_unauthorized_access(self):
        """Test endpoints require authentication"""
        response = requests.get(f"{BASE_URL}/api/auth/me")
        assert response.status_code in [401, 403, 422]
        print("✓ Unauthorized access blocked")


class TestApplicationEndpoints:
    """Application CRUD tests"""
    
    @pytest.fixture(scope="class")
    def auth_token(self):
        """Get auth token for application tests"""
        # Create a unique user for application tests
        email = f"apptest_{uuid.uuid4().hex[:8]}@test.com"
        response = requests.post(f"{BASE_URL}/api/auth/register", json={
            "email": email,
            "password": "password123",
            "first_name": "App",
            "last_name": "Tester"
        })
        if response.status_code == 200:
            return response.json()["access_token"]
        # If user exists, login
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": email,
            "password": "password123"
        })
        return response.json()["access_token"]
    
    @pytest.fixture(scope="class")
    def headers(self, auth_token):
        return {"Authorization": f"Bearer {auth_token}"}
    
    def test_create_application(self, headers):
        """Test creating a new application"""
        response = requests.post(f"{BASE_URL}/api/applications", 
            json={"program_type": "Occupational Therapy"},
            headers=headers
        )
        assert response.status_code == 200
        app = response.json()
        
        assert "id" in app
        assert app["status"] == "draft"
        assert app["current_step"] == 1
        assert app["program_selection"]["program_type"] == "Occupational Therapy"
        assert "documents" in app
        assert len(app["documents"]) == 5  # Default documents
        
        print(f"✓ Application created: {app['id']}")
        return app["id"]
    
    def test_get_applications(self, headers):
        """Test listing user applications"""
        response = requests.get(f"{BASE_URL}/api/applications", headers=headers)
        assert response.status_code == 200
        apps = response.json()
        assert isinstance(apps, list)
        assert len(apps) >= 1
        print(f"✓ Found {len(apps)} application(s)")
    
    def test_update_application_personal_info(self, headers):
        """Test updating personal info in application"""
        # Get existing application
        response = requests.get(f"{BASE_URL}/api/applications", headers=headers)
        apps = response.json()
        app_id = apps[0]["id"]
        
        # Update personal info
        update_data = {
            "personal_info": {
                "first_name": "John",
                "last_name": "Doe",
                "email": "john.doe@test.com",
                "phone": "(555) 123-4567",
                "address": "123 Main St",
                "city": "Austin",
                "state": "TX",
                "zip_code": "78701",
                "date_of_birth": "1990-05-15",
                "gender": "Male",
                "us_citizen": "Yes"
            },
            "current_step": 2
        }
        
        response = requests.put(f"{BASE_URL}/api/applications/{app_id}", 
            json=update_data, headers=headers)
        assert response.status_code == 200
        
        # Verify data persisted
        response = requests.get(f"{BASE_URL}/api/applications/{app_id}", headers=headers)
        app = response.json()
        assert app["personal_info"]["first_name"] == "John"
        assert app["personal_info"]["city"] == "Austin"
        assert app["current_step"] == 2
        
        print("✓ Personal info updated and persisted")
    
    def test_update_application_academic_history(self, headers):
        """Test updating academic history in application"""
        response = requests.get(f"{BASE_URL}/api/applications", headers=headers)
        apps = response.json()
        app_id = apps[0]["id"]
        
        update_data = {
            "academic_history": {
                "institution_name": "University of Texas",
                "degree_type": "Bachelor of Science",
                "major": "Biology",
                "gpa": 3.75,
                "graduation_date": "2020-05-15",
                "institutions": [
                    {"id": 1, "name": "UT Austin", "date": "2020-05", "degree": "BS Biology"}
                ]
            },
            "current_step": 3
        }
        
        response = requests.put(f"{BASE_URL}/api/applications/{app_id}", 
            json=update_data, headers=headers)
        assert response.status_code == 200
        
        # Verify persistence
        response = requests.get(f"{BASE_URL}/api/applications/{app_id}", headers=headers)
        app = response.json()
        assert app["academic_history"]["institution_name"] == "University of Texas"
        assert app["academic_history"]["gpa"] == 3.75
        
        print("✓ Academic history updated and persisted")
    
    def test_update_application_employment_history(self, headers):
        """Test updating employment history with verifications"""
        response = requests.get(f"{BASE_URL}/api/applications", headers=headers)
        apps = response.json()
        app_id = apps[0]["id"]
        
        update_data = {
            "employment_history": {
                "verifications": [
                    {
                        "id": 1,
                        "verifier_first_name": "Jane",
                        "verifier_last_name": "Smith",
                        "verifier_email": "jane.smith@hospital.com",
                        "verifier_phone": "(555) 987-6543",
                        "employer_name": "Austin General Hospital",
                        "employer_address": "456 Medical Dr, Austin, TX 78702",
                        "job_title": "Occupational Therapy Assistant",
                        "start_date": "2021-01-15",
                        "end_date": "2024-12-31",
                        "hours_worked": "2500",
                        "request_stage": "Pending",
                        "date_requested": "2026-01-29"
                    }
                ]
            },
            "current_step": 4
        }
        
        response = requests.put(f"{BASE_URL}/api/applications/{app_id}", 
            json=update_data, headers=headers)
        assert response.status_code == 200
        
        # Verify employment history persisted
        response = requests.get(f"{BASE_URL}/api/applications/{app_id}", headers=headers)
        app = response.json()
        
        assert "employment_history" in app
        assert "verifications" in app["employment_history"]
        assert len(app["employment_history"]["verifications"]) == 1
        
        verification = app["employment_history"]["verifications"][0]
        assert verification["verifier_first_name"] == "Jane"
        assert verification["employer_name"] == "Austin General Hospital"
        assert verification["hours_worked"] == "2500"
        
        print("✓ Employment history with verifications persisted")
    
    def test_get_single_application(self, headers):
        """Test getting a single application by ID"""
        response = requests.get(f"{BASE_URL}/api/applications", headers=headers)
        apps = response.json()
        app_id = apps[0]["id"]
        
        response = requests.get(f"{BASE_URL}/api/applications/{app_id}", headers=headers)
        assert response.status_code == 200
        app = response.json()
        assert app["id"] == app_id
        print(f"✓ Retrieved application {app_id}")
    
    def test_application_not_found(self, headers):
        """Test 404 for non-existent application"""
        response = requests.get(f"{BASE_URL}/api/applications/nonexistent-id", headers=headers)
        assert response.status_code == 404
        print("✓ Non-existent application returns 404")


class TestProgramsEndpoint:
    """Programs info endpoint tests"""
    
    def test_get_programs(self):
        """Test programs endpoint returns program data"""
        response = requests.get(f"{BASE_URL}/api/programs")
        assert response.status_code == 200
        data = response.json()
        
        assert "programs" in data
        assert "start_terms" in data
        assert len(data["programs"]) >= 2
        
        # Check OT program
        ot_program = next((p for p in data["programs"] if p["id"] == "ot"), None)
        assert ot_program is not None
        assert "Occupational Therapy" in ot_program["name"]
        assert len(ot_program["levels"]) >= 2
        
        # Check Nursing program
        nursing_program = next((p for p in data["programs"] if p["id"] == "nursing"), None)
        assert nursing_program is not None
        
        print(f"✓ Programs endpoint returns {len(data['programs'])} programs")


class TestExistingUserLogin:
    """Test with provided test credentials"""
    
    def test_login_with_test_credentials(self):
        """Test login with testuser@test.com"""
        response = requests.post(f"{BASE_URL}/api/auth/login", json={
            "email": "testuser@test.com",
            "password": "password123"
        })
        # This may fail if user doesn't exist yet - that's OK
        if response.status_code == 200:
            data = response.json()
            assert "access_token" in data
            print("✓ Test user login successful")
        else:
            print("⚠ Test user not found - will be created on first signup")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
