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

## What's Been Implemented (Jan 28, 2026)

### Pages
1. **Landing Page** (`/`)
   - Hero section with animated background
   - Program selection cards (OT & Nursing)
   - Feature highlights (AI Assistant, Progress Tracking, 24/7 Support)
   - Campus locations
   - Stats (15K+ Alumni, 95% Employment, 5 Campuses)

2. **Login Page** (`/login`)
   - Email/password authentication
   - Password visibility toggle
   - Link to registration

3. **Register Page** (`/register`)
   - First/last name, email, password fields
   - Password strength indicators
   - Confirm password validation

4. **Dashboard** (`/dashboard`)
   - Welcome greeting with user name
   - Progress ring (percentage complete)
   - Deadline countdown
   - Documents status
   - Active application card with step navigation
   - Create new application modal
   - AI Chat FAB

5. **Application Form** (`/application/:appId/:step`)
   - Step 1: Personal Information
   - Step 2: Academic History
   - Step 3: Program Selection
   - Step 4: Document Upload
   - Step 5: Financial Aid
   - Step 6: Review & Submit

### Features
- ✅ JWT Authentication (register/login/logout)
- ✅ Application CRUD operations
- ✅ Progress calculation (auto-updates)
- ✅ AI Chat "Ask Journey" with Claude Sonnet 4.5
- ✅ Document upload (5 required docs)
- ✅ Program selection (OT: MOT/OTD, Nursing: MSN/DNP)
- ✅ Campus selection (Austin, Dallas, Miami, San Marcos, St. Augustine)
- ✅ Start term selection
- ✅ Financial aid preferences
- ✅ Application submission

### API Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `GET /api/applications` - List user applications
- `POST /api/applications` - Create application
- `GET /api/applications/:id` - Get application
- `PUT /api/applications/:id` - Update application
- `POST /api/applications/:id/submit` - Submit application
- `POST /api/applications/:id/documents/:docId/upload` - Upload document
- `POST /api/chat` - AI Chat
- `GET /api/programs` - List programs

---

## Backlog / Future Enhancements

### P0 (Critical)
- Email verification on registration
- Password reset functionality

### P1 (High Priority)
- Real document preview (PDF viewer)
- Application history/timeline
- Email notifications on status changes
- Admin dashboard for reviewing applications

### P2 (Medium Priority)
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
