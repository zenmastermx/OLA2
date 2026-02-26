# User Stories & Acceptance Criteria
## University of St. Augustine - Student Application Portal

---

## 1. Landing Page / Home Page

### Title
**Landing Page - University Welcome & Program Discovery**

### User Story
**As a** prospective student visiting the USA.edu application portal,
**I want to** see an engaging welcome page that showcases the university's programs, features, and campuses,
**So that I can** understand what the university offers and feel confident starting my application journey.

### Acceptance Criteria

#### Navigation
- [ ] **AC-1.1**: The page displays a fixed navigation bar with the university logo (USA.edu branding)
- [ ] **AC-1.2**: Navigation includes "Sign In" button that navigates to `/login`
- [ ] **AC-1.3**: Navigation includes "Apply Now" button (teal, rounded) that navigates to `/register`
- [ ] **AC-1.4**: A theme toggle button (sun/moon icon) switches between dark and light modes
- [ ] **AC-1.5**: Theme preference persists across page refreshes (localStorage)

#### Hero Section
- [ ] **AC-1.6**: Hero displays a badge indicating "Applications Open for 2026"
- [ ] **AC-1.7**: Hero headline reads "Your Journey to Healthcare Excellence" with gradient text styling
- [ ] **AC-1.8**: Hero subtext describes the university's value proposition
- [ ] **AC-1.9**: "Start Your Application" CTA button navigates to `/register`
- [ ] **AC-1.10**: Statistics display: "15K+ Alumni", "95% Employment Rate", "5 Campus Locations"
- [ ] **AC-1.11**: Hero image displays university campus/students (visible on desktop)

#### Program Selection Section
- [ ] **AC-1.12**: Section title "Choose Your Path" is displayed
- [ ] **AC-1.13**: Four program cards are displayed in a grid:
  - Occupational Therapy (MOT, OTD)
  - Nursing (MSN, DNP)
  - Education (EdD, MS)
  - Certificates (Professional, Advanced)
- [ ] **AC-1.14**: Each program card shows: icon, name, description, and available degrees
- [ ] **AC-1.15**: Program cards have hover effects and visual feedback when selected
- [ ] **AC-1.16**: Clicking a program card highlights it with a teal border glow

#### Features Section
- [ ] **AC-1.17**: Three feature cards are displayed:
  - "AI-Assisted Journey" - AI assistant guidance
  - "Live Application Tracking" - Real-time dashboard
  - "24/7 Support" - Intelligent support system
- [ ] **AC-1.18**: Each feature has an icon, title, and description

#### Campus Locations Section
- [ ] **AC-1.19**: Campus locations are displayed: Austin, Dallas, Miami, San Marcos, St. Augustine
- [ ] **AC-1.20**: Each campus shows a location pin icon

#### Footer / CTA Section
- [ ] **AC-1.21**: Final CTA section encourages users to start their application
- [ ] **AC-1.22**: "Begin Your Journey" button navigates to `/register`

#### Responsive Design
- [ ] **AC-1.23**: Page is fully responsive (mobile, tablet, desktop)
- [ ] **AC-1.24**: Hero image is hidden on mobile devices
- [ ] **AC-1.25**: Program cards stack vertically on mobile

#### Theme Support
- [ ] **AC-1.26**: Dark mode: Dark background (#0A0E14), white text, glassmorphism cards
- [ ] **AC-1.27**: Light mode: Light gray background, dark text, appropriate contrast
- [ ] **AC-1.28**: University logo switches between light/dark variants based on theme

---

## 2. Sign Up Page / Registration Page

### Title
**User Registration - Account Creation with Email Verification**

### User Story
**As a** prospective student who wants to apply to USA.edu,
**I want to** create an account by providing my personal information and agreeing to communication preferences,
**So that I can** access the application portal and begin my admission application.

### Acceptance Criteria

#### Page Layout
- [ ] **AC-2.1**: Page displays a split layout (desktop): left visual panel, right registration form
- [ ] **AC-2.2**: Left panel shows headline "Begin Your Healthcare Career Journey"
- [ ] **AC-2.3**: Left panel lists benefits: AI assistance, progress tracking, secure uploads, 24/7 support
- [ ] **AC-2.4**: "Back to Home" link navigates to `/` (landing page)
- [ ] **AC-2.5**: University logo is displayed above the form

#### Registration Form Fields
- [ ] **AC-2.6**: First Name field with user icon (required)
- [ ] **AC-2.7**: Last Name field with user icon (required)
- [ ] **AC-2.8**: Email field with mail icon (required, must be valid email format)
- [ ] **AC-2.9**: Phone field with phone icon (optional, auto-formats as `(XXX) XXX-XXXX`)
- [ ] **AC-2.10**: Password field with lock icon and show/hide toggle (required)
- [ ] **AC-2.11**: Confirm Password field with lock icon and show/hide toggle (required)

#### Password Validation
- [ ] **AC-2.12**: Real-time password strength indicators display:
  - "At least 8 characters" (green check when valid)
  - "Contains a number" (green check when valid)
  - "Contains uppercase" (green check when valid)
- [ ] **AC-2.13**: Password and Confirm Password must match to submit

#### Consent Agreement Section
- [ ] **AC-2.14**: Section titled "CONSENT AGREEMENT" is displayed
- [ ] **AC-2.15**: Two selectable cards: "I Agree" and "I Do Not Agree"
- [ ] **AC-2.16**: Cards have icon, title, and description text
- [ ] **AC-2.17**: Selected card shows visual highlight (scale, glow effect, border color)
- [ ] **AC-2.18**: "I Agree" card is disabled/grayed out until all required fields are filled
- [ ] **AC-2.19**: Clicking disabled "I Agree" shows toast: "Please fill in all required fields correctly"
- [ ] **AC-2.20**: Selecting "I Agree" reveals the "Create Account" button with slide animation
- [ ] **AC-2.21**: Selecting "I Do Not Agree" opens a modal with phone number (855-481-9203)
- [ ] **AC-2.22**: Disagree modal explains user can complete application by phone

#### Form Submission
- [ ] **AC-2.23**: "Create Account" button submits the form
- [ ] **AC-2.24**: Button shows loading spinner during submission
- [ ] **AC-2.25**: Validation errors display as toast notifications:
  - "Please fill in all fields"
  - "Passwords do not match"
  - "Password must be at least 8 characters"
  - "Please agree to the consent terms"

#### Email Verification Flow
- [ ] **AC-2.26**: On successful registration, a verification modal appears
- [ ] **AC-2.27**: Modal displays: "Check Your Email" with user's email address
- [ ] **AC-2.28**: "Open Verification Email" button opens mock email page in new window
- [ ] **AC-2.29**: Mock email page (`/mock-email`) displays branded verification email
- [ ] **AC-2.30**: Clicking "Verify Email Address" in mock email calls verification API
- [ ] **AC-2.31**: Verification modal polls for verification status every 3 seconds
- [ ] **AC-2.32**: On successful verification, user is redirected to `/dashboard`
- [ ] **AC-2.33**: Success toast: "Email verified! Welcome to USA.edu!"

#### Backend Integration
- [ ] **AC-2.34**: Registration calls `POST /api/auth/register` with:
  - email, password, first_name, last_name, phone
  - consent_call, consent_text, consent_email (all true when agreed)
- [ ] **AC-2.35**: Response includes `verification_token` for email verification
- [ ] **AC-2.36**: User record is created with `email_verified: false` initially
- [ ] **AC-2.37**: Enrollment advisor is auto-assigned on registration

#### Existing Account Handling
- [ ] **AC-2.38**: "Already have an account? Sign in" link navigates to `/login`
- [ ] **AC-2.39**: Attempting to register with existing email shows error toast

#### Responsive Design
- [ ] **AC-2.40**: Left visual panel is hidden on mobile devices
- [ ] **AC-2.41**: Form is centered and full-width on mobile
- [ ] **AC-2.42**: All form elements are touch-friendly (minimum 44px tap targets)

#### Accessibility
- [ ] **AC-2.43**: All form fields have associated labels
- [ ] **AC-2.44**: Password visibility toggle is keyboard accessible
- [ ] **AC-2.45**: Error messages are announced to screen readers
- [ ] **AC-2.46**: Focus states are visible on all interactive elements

---

## Test Data

### Valid Registration
```
First Name: Test
Last Name: User
Email: testuser@example.com
Phone: (555) 123-4567
Password: Test1234!
```

### Test Scenarios
1. **Happy Path**: Fill all fields → Agree → Submit → Verify email → Dashboard
2. **Validation Error**: Submit with empty fields → See error toasts
3. **Password Mismatch**: Enter different passwords → See "Passwords do not match"
4. **Disagree Flow**: Click "I Do Not Agree" → See phone modal
5. **Existing Email**: Register with existing email → See registration error

---

## Related Files
- `/app/frontend/src/pages/LandingPage.js`
- `/app/frontend/src/pages/RegisterPage.js`
- `/app/frontend/src/components/VerificationModal.js`
- `/app/frontend/src/pages/MockEmailVerificationPage.js`
- `/app/backend/server.py` (auth endpoints)
