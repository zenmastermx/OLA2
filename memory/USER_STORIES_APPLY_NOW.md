# User Stories - Apply Now Page
## University of St. Augustine - Student Application Portal
### Route: `/register`

---

# PAGE OVERVIEW

The "Apply Now" page is the account registration page where prospective students create their application account. It features a split-screen design with a promotional panel on the left and the registration form on the right.

---

# APPLY NOW PAGE STRUCTURE

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  ┌──────────────────────┐  ┌──────────────────────────────────┐ │
│  │                      │  │  ← Back to Home                  │ │
│  │   LEFT PANEL         │  │                                  │ │
│  │   (Promotional)      │  │  [LOGO]                          │ │
│  │                      │  │                                  │ │
│  │   "Begin Your        │  │  Create Account                  │ │
│  │   Healthcare         │  │  Start your application journey  │ │
│  │   Career Journey"    │  │                                  │ │
│  │                      │  │  [First Name] [Last Name]        │ │
│  │   ✓ AI assistance    │  │  [Email Address]                 │ │
│  │   ✓ Progress track   │  │  [Phone Number]                  │ │
│  │   ✓ Secure uploads   │  │  [Password]                      │ │
│  │   ✓ 24/7 support     │  │  [Confirm Password]              │ │
│  │                      │  │                                  │ │
│  │   (Hidden on mobile) │  │  CONSENT AGREEMENT               │ │
│  │                      │  │  [○ I Agree]                     │ │
│  │                      │  │  [○ I Do Not Agree]              │ │
│  │                      │  │                                  │ │
│  │                      │  │  [Create Account Button]         │ │
│  │                      │  │                                  │ │
│  │                      │  │  Already have account? Sign In   │ │
│  └──────────────────────┘  └──────────────────────────────────┘ │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

# USER STORIES

---

## APPLY-001: Page Layout - Split Screen Design
**Title:** Apply Now - Split Screen Layout

**User Story:**
As a prospective student visiting the Apply Now page, I want to see an engaging split-screen layout with promotional content and a registration form, so that I feel motivated to create an account while having clear instructions.

**Acceptance Criteria:**
- [ ] Page displays full-screen with dark background (`#0A0E14`)
- [ ] Left panel (40%) contains promotional content with gradient overlay
- [ ] Right panel (60%) contains the registration form
- [ ] Left panel is hidden on mobile devices (`hidden lg:flex`)
- [ ] Form is centered and scrollable on all screen sizes
- [ ] Page has slide-up animation on load (`animate-slide-up`)
- [ ] `data-testid="apply-now-page"`

**Layout Logic:**
```jsx
<div className="min-h-screen flex bg-[#0A0E14]">
  {/* Left promotional panel - hidden on mobile */}
  <div className="hidden lg:flex w-[40%] relative">
    {/* Promotional content */}
  </div>
  
  {/* Right form panel */}
  <div className="flex-1 flex items-center justify-center p-8 overflow-y-auto">
    {/* Registration form */}
  </div>
</div>
```

---

## APPLY-002: Left Panel - Promotional Content
**Title:** Apply Now - Promotional Panel

**User Story:**
As a prospective student, I want to see inspiring promotional content about the benefits of applying, so that I feel confident about starting my application journey.

**Acceptance Criteria:**
- [ ] Panel has gradient background (dark teal to transparent)
- [ ] Main headline: "Begin Your Healthcare Career Journey"
- [ ] Subtitle text describes the account creation benefits
- [ ] Four benefit checkmarks displayed:
  - "AI-powered application assistance"
  - "Real-time progress tracking"
  - "Secure document uploads"
  - "24/7 support access"
- [ ] Each benefit has a green checkmark icon (`Check`)
- [ ] Background has subtle blur effects and gradient overlays
- [ ] Panel only visible on large screens (lg:flex)

**Visual Design:**
```
┌─────────────────────────┐
│ ░░░░ Gradient BG ░░░░░░ │
│                         │
│  Begin Your Healthcare  │
│  Career Journey         │
│                         │
│  Create your account... │
│                         │
│  ✓ AI-powered assist    │
│  ✓ Real-time tracking   │
│  ✓ Secure uploads       │
│  ✓ 24/7 support         │
│                         │
└─────────────────────────┘
```

---

## APPLY-003: Back to Home Navigation
**Title:** Apply Now - Back Navigation Link

**User Story:**
As a visitor who wants to return to the main site, I want a back link to navigate to the landing page, so that I can easily explore other options.

**Acceptance Criteria:**
- [ ] Link text: "Back to Home"
- [ ] Link has left arrow icon (`ArrowLeft`) on the left
- [ ] Link navigates to `/` (landing page)
- [ ] Link color: `text-slate-400`
- [ ] Hover state: `text-white`
- [ ] `data-testid="back-to-home-link"`

**Implementation:**
```jsx
<Link 
  to="/"
  className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
  data-testid="back-to-home-link"
>
  <ArrowLeft className="w-4 h-4" />
  Back to Home
</Link>
```

---

## APPLY-004: University Logo Display
**Title:** Apply Now - Logo Header

**User Story:**
As a prospective student, I want to see the official university logo, so that I know I'm on the correct official application page.

**Acceptance Criteria:**
- [ ] Logo displays University of St. Augustine branding
- [ ] Logo height: 48px (`h-12`)
- [ ] Logo maintains aspect ratio (`w-auto`)
- [ ] Logo uses white/knocked-out version for dark background

---

## APPLY-005: Page Header Text
**Title:** Apply Now - Header & Subtitle

**User Story:**
As a prospective student, I want to see a clear heading explaining the purpose of this page, so that I understand I'm creating an application account.

**Acceptance Criteria:**
- [ ] Main heading: "Create Account"
- [ ] Heading font: Montserrat, bold, 3xl (`text-3xl font-bold`)
- [ ] Heading color: white
- [ ] Subtitle: "Start your application journey today"
- [ ] Subtitle color: `text-slate-400`
- [ ] Subtitle margin: `mt-2`

---

## APPLY-006: First Name Input Field
**Title:** Apply Now - First Name Field

**User Story:**
As a prospective student, I want to enter my first name, so that my account is personalized with my correct name.

**Acceptance Criteria:**
- [ ] Label: "First Name"
- [ ] Label color: `text-slate-300`
- [ ] Input has User icon on the left side
- [ ] Icon color: `text-slate-500`
- [ ] Placeholder: "John"
- [ ] Field is REQUIRED for form submission
- [ ] Input height: 48px (`h-12`)
- [ ] Input padding-left for icon: `pl-12`
- [ ] Background: `bg-black/20`
- [ ] Border: `border-white/10`
- [ ] Focus border: `border-[#A1D8E0]`
- [ ] Focus ring: `ring-1 ring-[#A1D8E0]`
- [ ] Border radius: `rounded-xl`
- [ ] `data-testid="register-firstname-input"`

**Validation:**
- Empty on submit → Error: "Please fill in all fields"

---

## APPLY-007: Last Name Input Field
**Title:** Apply Now - Last Name Field

**User Story:**
As a prospective student, I want to enter my last name, so that my full legal name is recorded in my application.

**Acceptance Criteria:**
- [ ] Label: "Last Name"
- [ ] Placeholder: "Doe"
- [ ] Same styling as First Name input (without icon)
- [ ] Field is REQUIRED
- [ ] `data-testid="register-lastname-input"`

**Layout:**
- First Name and Last Name are in a 2-column grid (`grid grid-cols-2 gap-4`)

---

## APPLY-008: Email Address Input Field
**Title:** Apply Now - Email Address Field

**User Story:**
As a prospective student, I want to enter my email address, so that I can receive important communications and verify my account.

**Acceptance Criteria:**
- [ ] Label: "Email Address"
- [ ] Input has Mail icon on the left side
- [ ] Icon color: `text-slate-500`
- [ ] Placeholder: "you@example.com"
- [ ] Input type: `email`
- [ ] Field is REQUIRED
- [ ] Browser performs email format validation
- [ ] `data-testid="register-email-input"`

**Validation:**
- Empty on submit → Error: "Please fill in all fields"
- Invalid format → Browser default email validation
- Duplicate email → API error: "Registration failed"

---

## APPLY-009: Phone Number Input Field
**Title:** Apply Now - Phone Number Field

**User Story:**
As a prospective student, I want to enter my phone number, so that enrollment advisors can contact me about my application.

**Acceptance Criteria:**
- [ ] Label: "Phone Number"
- [ ] Input has Phone icon on the left side
- [ ] Placeholder: "(000) 000-0000"
- [ ] Auto-formats as user types: `(XXX) XXX-XXXX`
- [ ] Only accepts numeric input (strips non-digits)
- [ ] Maximum 10 digits (14 characters formatted)
- [ ] Field is REQUIRED for consent validation
- [ ] `data-testid="register-phone-input"`

**Auto-Format Logic:**
```javascript
const formatPhoneNumber = (value) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, ''); // Strip non-digits
  const phoneNumberLength = phoneNumber.length;
  
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};
```

**Format Examples:**
| Input | Display |
|-------|---------|
| 5 | 5 |
| 555 | 555 |
| 5551 | (555) 1 |
| 555123 | (555) 123 |
| 5551234567 | (555) 123-4567 |

---

## APPLY-010: Password Input Field
**Title:** Apply Now - Password Field

**User Story:**
As a prospective student, I want to create a secure password for my account, so that my application data is protected.

**Acceptance Criteria:**
- [ ] Label: "Password"
- [ ] Input has Lock icon on the left side
- [ ] Placeholder: "••••••••"
- [ ] Input type: `password` (masked by default)
- [ ] Show/Hide toggle button on right side (Eye/EyeOff icon)
- [ ] Toggle reveals/hides password text
- [ ] Field is REQUIRED
- [ ] Minimum 8 characters required
- [ ] Must contain at least one number
- [ ] Must contain at least one uppercase letter
- [ ] `data-testid="register-password-input"`

**Toggle Logic:**
```javascript
const [showPassword, setShowPassword] = useState(false);

// Input type
type={showPassword ? "text" : "password"}

// Toggle button
<button onClick={() => setShowPassword(!showPassword)}>
  {showPassword ? <EyeOff /> : <Eye />}
</button>
```

---

## APPLY-011: Password Strength Indicators
**Title:** Apply Now - Password Validation Feedback

**User Story:**
As a prospective student creating a password, I want to see real-time feedback on password requirements, so that I can create a valid password that meets security standards.

**Acceptance Criteria:**
- [ ] Indicators appear only when password field has content
- [ ] Three requirements displayed:
  1. "At least 8 characters" - valid when `password.length >= 8`
  2. "Contains a number" - valid when `/\d/.test(password)`
  3. "Contains uppercase" - valid when `/[A-Z]/.test(password)`
- [ ] Each requirement shows:
  - Circle icon: green (`bg-[#739600]`) with checkmark when valid
  - Circle icon: gray (`bg-slate-700`) when invalid
  - Text: green (`text-[#739600]`) when valid
  - Text: gray (`text-slate-500`) when invalid
- [ ] Updates in real-time as user types

**Implementation:**
```javascript
const passwordChecks = [
  { label: "At least 8 characters", valid: password.length >= 8 },
  { label: "Contains a number", valid: /\d/.test(password) },
  { label: "Contains uppercase", valid: /[A-Z]/.test(password) },
];
```

---

## APPLY-012: Confirm Password Input Field
**Title:** Apply Now - Confirm Password Field

**User Story:**
As a prospective student, I want to confirm my password by typing it again, so that I don't accidentally set the wrong password.

**Acceptance Criteria:**
- [ ] Label: "Confirm Password"
- [ ] Input has Lock icon on the left side
- [ ] Placeholder: "••••••••"
- [ ] Uses same show/hide toggle state as Password field
- [ ] Field is REQUIRED
- [ ] Shows real-time error if passwords don't match
- [ ] Error text: "Passwords do not match" (`text-red-400 text-sm`)
- [ ] `data-testid="register-confirm-password-input"`

**Match Validation Display:**
```jsx
{confirmPassword && password !== confirmPassword && (
  <p className="text-red-400 text-sm mt-1">Passwords do not match</p>
)}
```

---

## APPLY-013: Consent Agreement Section Header
**Title:** Apply Now - Consent Section Title

**User Story:**
As a prospective student, I want to clearly see a consent agreement section, so that I understand I need to agree to communication terms.

**Acceptance Criteria:**
- [ ] Section title: "Consent Agreement"
- [ ] Title styled: `text-xs font-medium uppercase tracking-wider text-slate-400`
- [ ] Section has top border separator: `border-b border-white/[0.05]`
- [ ] Section has top padding: `pt-2`

---

## APPLY-014: "I Agree" Consent Option
**Title:** Apply Now - Consent Agree Card

**User Story:**
As a prospective student who wants to receive communications, I want to select "I Agree", so that enrollment advisors can contact me via calls, texts, and emails.

**Acceptance Criteria:**
- [ ] Card displays checkmark icon in circle container
- [ ] Title: "I Agree"
- [ ] Description: "Receive calls, texts, and emails from enrollment advisors"
- [ ] Card is DISABLED (grayed out, not clickable) until ALL form fields are valid:
  - First Name not empty
  - Last Name not empty
  - Email not empty
  - Phone not empty
  - Password not empty
  - Confirm Password not empty
  - Passwords match
- [ ] Clicking disabled card shows toast: "Please fill in all fields correctly before agreeing"
- [ ] When valid and clicked: card is selected with green styling
- [ ] Selected state:
  - Border: `border-[#739600]/50`
  - Background: `bg-[#0d2818]`
  - Scale: `scale-[1.02]`
  - Shadow: `shadow-[0_0_20px_rgba(40,167,69,0.2)]`
  - Icon turns green: `text-[#739600]`
  - Radio button fills green with checkmark
- [ ] Selecting "I Agree" reveals the "Create Account" button
- [ ] `data-testid="consent-agree-btn"`

**Disabled State Logic:**
```javascript
const isFormValid = firstName && lastName && email && phone && 
                   password && confirmPassword && password === confirmPassword;

// If not valid and clicked
if (!isFormValid) {
  toast.error("Please fill in all fields correctly before agreeing");
  return;
}
```

---

## APPLY-015: "I Do Not Agree" Consent Option
**Title:** Apply Now - Consent Disagree Card

**User Story:**
As a prospective student who prefers not to receive digital communications, I want to select "I Do Not Agree", so that I can complete my application by phone instead.

**Acceptance Criteria:**
- [ ] Card displays Phone icon in circle container
- [ ] Title: "I Do Not Agree"
- [ ] Description: "Complete application by phone instead"
- [ ] Card is always clickable (not disabled)
- [ ] Clicking selects the card AND opens the phone modal
- [ ] Selected state:
  - Border: `border-[#00677F]/50`
  - Background: `bg-[#0a1a20]`
  - Scale: `scale-[1.02]`
  - Shadow: `shadow-[0_0_20px_rgba(0,180,216,0.2)]`
  - Icon turns teal: `text-[#00677F]`
  - Radio button fills teal with checkmark
- [ ] `data-testid="consent-disagree-btn"`

---

## APPLY-016: Phone Application Modal (Disagree Modal)
**Title:** Apply Now - Phone Completion Modal

**User Story:**
As a prospective student who selected "I Do Not Agree", I want to see instructions for completing my application by phone, so that I have an alternative path to apply.

**Acceptance Criteria:**
- [ ] Modal appears when "I Do Not Agree" is clicked
- [ ] Modal has dark backdrop with blur: `bg-black/50 backdrop-blur-sm`
- [ ] Modal content:
  - Phone icon in orange/teal circle at top
  - Title: "Complete Your Application by Phone"
  - Text: "Please call us to complete the application process:"
  - Phone number: "855-481-9203" (large, prominent)
  - Phone number is clickable (`tel:` link)
  - Subtext: "Our enrollment advisors are available to assist you."
- [ ] X button in top-right corner closes modal
- [ ] Clicking backdrop outside modal closes it
- [ ] `data-testid="phone-modal"`

---

## APPLY-017: Consent Legal Text
**Title:** Apply Now - Consent Disclosure

**User Story:**
As a prospective student, I want to read the full consent terms, so that I understand what I'm agreeing to.

**Acceptance Criteria:**
- [ ] Full disclosure text displayed below consent cards
- [ ] Text includes:
  - Description of consent to receive automated communications
  - Statement that consent is not required to purchase
  - E-signature confirmation statement
  - Links to Privacy Policy and Terms of Use
  - Notice about message and data rates
- [ ] Links styled: `text-[#00677F] hover:underline`
- [ ] Text color: `text-slate-500 text-xs`
- [ ] Additional note: "You can update these preferences at any time in your account settings."
- [ ] Note color: `text-slate-600 text-xs`

---

## APPLY-018: Create Account Button
**Title:** Apply Now - Submit Button

**User Story:**
As a prospective student who has completed the form and agreed to consent, I want to click a button to create my account, so that I can start my application.

**Acceptance Criteria:**
- [ ] Button text: "Create Account"
- [ ] Button ONLY visible when "I Agree" is selected
- [ ] Button appears with slide-up animation: `animate-[fadeSlideUp_0.4s_ease-out]`
- [ ] Button styling:
  - Height: 56px (`h-14`)
  - Full width: `w-full`
  - Background: `bg-[#00677F]`
  - Hover: `hover:bg-[#135163]`
  - Text: white, `text-lg font-medium`
  - Border radius: `rounded-xl`
  - Shadow: `shadow-[0_0_20px_rgba(0,180,216,0.3)]`
  - Hover shadow: `shadow-[0_0_30px_rgba(0,180,216,0.5)]`
- [ ] Loading state shows spinner + "Creating Account..."
- [ ] Button disabled during loading
- [ ] `data-testid="register-submit-btn"`

**Loading State:**
```jsx
{loading ? (
  <>
    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
    Creating Account...
  </>
) : (
  "Create Account"
)}
```

---

## APPLY-019: Form Validation - All Fields Required
**Title:** Apply Now - Required Fields Validation

**User Story:**
As a system, I want to validate that all required fields are filled before submission, so that incomplete registrations are prevented.

**Acceptance Criteria:**
- [ ] Validation runs on form submit
- [ ] Required fields: firstName, lastName, email, password
- [ ] If any required field is empty:
  - Show toast: "Please fill in all fields"
  - Prevent form submission
- [ ] Phone is required for consent validation (not form validation)

---

## APPLY-020: Form Validation - Password Match
**Title:** Apply Now - Password Confirmation Validation

**User Story:**
As a system, I want to verify that the password and confirm password match, so that users don't accidentally set incorrect passwords.

**Acceptance Criteria:**
- [ ] Validation runs on form submit
- [ ] If `password !== confirmPassword`:
  - Show toast: "Passwords do not match"
  - Prevent form submission
- [ ] Real-time mismatch indicator shown below confirm password field

---

## APPLY-021: Form Validation - Password Length
**Title:** Apply Now - Password Minimum Length

**User Story:**
As a system, I want to enforce minimum password length, so that user accounts are secure.

**Acceptance Criteria:**
- [ ] Validation runs on form submit
- [ ] If `password.length < 8`:
  - Show toast: "Password must be at least 8 characters"
  - Prevent form submission

---

## APPLY-022: Form Validation - Consent Required
**Title:** Apply Now - Consent Selection Validation

**User Story:**
As a system, I want to ensure users have agreed to communication consent, so that we have permission to contact them.

**Acceptance Criteria:**
- [ ] Validation runs on form submit
- [ ] If `consentAgreed !== true`:
  - Show toast: "Please agree to the consent terms to create an account"
  - Prevent form submission

---

## APPLY-023: API Registration Call
**Title:** Apply Now - Backend Account Creation

**User Story:**
As a system, I want to create the user account in the database, so that they can log in and access their application.

**Acceptance Criteria:**
- [ ] API endpoint: `POST /api/auth/register`
- [ ] Request payload:
```json
{
  "email": "user@example.com",
  "password": "SecurePass123",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "(555) 123-4567",
  "consent_call": true,
  "consent_text": true,
  "consent_email": true
}
```
- [ ] Response includes:
  - User data (id, email, first_name, last_name)
  - `verification_token` for email verification
- [ ] User created with `email_verified: false`
- [ ] Enrollment advisor auto-assigned to user

---

## APPLY-024: Email Verification Modal
**Title:** Apply Now - Verification Modal Display

**User Story:**
As a newly registered user, I want to see instructions to verify my email, so that I can complete my registration.

**Acceptance Criteria:**
- [ ] Modal appears immediately after successful registration
- [ ] Modal title: "Check Your Email"
- [ ] Modal shows the registered email address
- [ ] Modal has "Open Verification Email" button
- [ ] Modal cannot be dismissed until email is verified
- [ ] Success toast shown: "Account created! Please verify your email."

---

## APPLY-025: Mock Email Verification Window
**Title:** Apply Now - Mock Email Simulation

**User Story:**
As a newly registered user (in development environment), I want to see a simulated verification email, so that I can test the verification flow.

**Acceptance Criteria:**
- [ ] New browser window opens after registration
- [ ] Window URL: `/mock-email?token=xxx&email=xxx&firstName=xxx`
- [ ] Window size: 900x800 pixels
- [ ] Page displays branded email from "USA.edu Admissions"
- [ ] Email greeting: "Hello [firstName],"
- [ ] "Verify Email Address" button calls API to verify
- [ ] After verification, user can proceed to dashboard

---

## APPLY-026: Sign In Link
**Title:** Apply Now - Existing Account Link

**User Story:**
As a returning user who accidentally visited the registration page, I want a link to sign in, so that I can access my existing account.

**Acceptance Criteria:**
- [ ] Text: "Already have an account? Sign In"
- [ ] "Sign In" is a clickable link
- [ ] Link color: `text-[#00677F]`
- [ ] Hover color: `text-[#A1D8E0]`
- [ ] Clicking navigates to `/login`
- [ ] `data-testid="login-link"`

---

## APPLY-027: Error Handling - Duplicate Email
**Title:** Apply Now - Existing Email Error

**User Story:**
As a system, I want to prevent duplicate account creation, so that each email has only one account.

**Acceptance Criteria:**
- [ ] If email already exists in database:
  - API returns error with message
  - Toast displays error message
  - Form remains on page for correction
- [ ] Loading state is cleared on error

---

## APPLY-028: Error Handling - Network Errors
**Title:** Apply Now - API Error Handling

**User Story:**
As a user experiencing network issues, I want to see helpful error messages, so that I know what went wrong and can retry.

**Acceptance Criteria:**
- [ ] If API call fails:
  - Loading state is cleared
  - Toast displays: API error message or "Registration failed. Please try again."
  - User can retry submission
- [ ] Console logs error for debugging

---

# VALIDATION SUMMARY TABLE

| Field | Required | Validation Rules | Error Message |
|-------|----------|------------------|---------------|
| First Name | Yes | Not empty | "Please fill in all fields" |
| Last Name | Yes | Not empty | "Please fill in all fields" |
| Email | Yes | Not empty, valid format | "Please fill in all fields" |
| Phone | Yes* | Required for consent | "Please fill in all fields correctly before agreeing" |
| Password | Yes | Min 8 chars, has number, has uppercase | "Password must be at least 8 characters" |
| Confirm Password | Yes | Must match Password | "Passwords do not match" |
| Consent | Yes | Must be "I Agree" | "Please agree to the consent terms" |

*Phone is required to enable the "I Agree" consent option.

---

# STATE FLOW DIAGRAM

```
1. Initial State
   ├── All fields empty
   ├── consentAgreed = null
   ├── "I Agree" card DISABLED (grayed)
   └── "Create Account" button HIDDEN

2. User Fills Form
   ├── As each field is filled, validation runs
   ├── Password indicators update in real-time
   └── When ALL fields valid → "I Agree" card ENABLED

3. User Clicks "I Agree"
   ├── consentAgreed = true
   ├── Card shows selected state (green)
   └── "Create Account" button SLIDES IN

4. User Clicks "Create Account"
   ├── loading = true
   ├── Button shows spinner + "Creating Account..."
   └── API call: POST /api/auth/register

5. Registration Success
   ├── loading = false
   ├── Toast: "Account created! Please verify your email."
   ├── Verification modal opens
   └── Mock email window opens

6. User Verifies Email
   ├── User clicks "Verify" in mock email
   ├── API confirms verification
   ├── Toast: "Email verified! Welcome to USA.edu!"
   └── Redirect to /dashboard
```

---

# TEST SCENARIOS

## Happy Path
1. Fill all fields with valid data
2. Click "I Agree" consent card
3. Click "Create Account" button
4. Click "Verify Email Address" in mock email window
5. Verify redirect to Dashboard

## Validation Errors
1. Submit with empty fields → "Please fill in all fields"
2. Submit with mismatched passwords → "Passwords do not match"
3. Submit with short password (< 8 chars) → "Password must be at least 8 characters"
4. Click "I Agree" with incomplete form → "Please fill in all fields correctly before agreeing"

## Consent Flow
1. Click "I Do Not Agree" → Phone modal opens with 855-481-9203
2. Close modal, fill form, click "I Agree" → Create Account button appears
3. Select "I Agree" then "I Do Not Agree" → Button disappears, modal opens

## Edge Cases
1. Register with existing email → API error toast
2. Network error during registration → Error toast, can retry
3. Close mock email window → Can click "Open Verification Email" again
4. Refresh page during verification → Must restart registration

---

# RELATED FILES

| File | Purpose |
|------|---------|
| `/app/frontend/src/pages/RegisterPage.js` | Main component |
| `/app/frontend/src/components/VerificationModal.js` | Email verification modal |
| `/app/frontend/src/pages/MockEmailPage.js` | Simulated verification email |
| `/app/backend/server.py` | Auth endpoints |

---

# TEST DATA

## Valid Registration
```
First Name: John
Last Name: Doe
Email: johndoe@example.com
Phone: (555) 123-4567
Password: SecurePass1!
Confirm Password: SecurePass1!
Consent: I Agree
```

## Password Test Cases
| Password | 8+ Chars | Has Number | Has Uppercase | Valid |
|----------|----------|------------|---------------|-------|
| pass | ❌ | ❌ | ❌ | ❌ |
| password | ✅ | ❌ | ❌ | ❌ |
| password1 | ✅ | ✅ | ❌ | ❌ |
| Password1 | ✅ | ✅ | ✅ | ✅ |
| PASS1234 | ✅ | ✅ | ✅ | ✅ |
