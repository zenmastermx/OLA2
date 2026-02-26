# Detailed User Stories - Field & Feature Level
## University of St. Augustine - Student Application Portal

---

# LANDING PAGE (`/`)

---

## NAVIGATION BAR

### NAV-001: University Logo Display
**Title:** Navigation - University Logo

**User Story:**
As a visitor, I want to see the official university logo in the navigation bar, so that I can immediately identify I'm on the correct university website.

**Acceptance Criteria:**
- [ ] Logo is positioned on the left side of the navigation bar
- [ ] Logo displays the correct variant based on theme:
  - Dark mode: White/knocked-out logo
  - Light mode: Colored (PMS 315) logo
- [ ] Logo image URL:
  - Dark: `primary.Horiz.2line.knockedout.whouter.pms315+white.png`
  - Light: `primary.Horiz.2line.knockedout.pms315.png`
- [ ] Logo height is 40px (`h-10`)
- [ ] Logo maintains aspect ratio (`w-auto`)

**Logic:**
```javascript
const logoSrc = theme === 'dark' 
  ? "knockedout.whouter.pms315+white.png"  // White logo for dark mode
  : "knockedout.pms315.png";               // Teal logo for light mode
```

---

### NAV-002: Theme Toggle Button
**Title:** Navigation - Dark/Light Mode Toggle

**User Story:**
As a visitor, I want to toggle between dark and light mode, so that I can view the website in my preferred visual style.

**Acceptance Criteria:**
- [ ] Button displays Sun icon (☀️) when in dark mode (click to switch to light)
- [ ] Button displays Moon icon (🌙) when in light mode (click to switch to dark)
- [ ] Button has hover effect: background changes on hover
- [ ] Theme preference is saved to localStorage
- [ ] Theme persists across page refreshes and browser sessions
- [ ] All page components respond to theme change immediately

**Logic:**
```javascript
// Theme Context
const [theme, setTheme] = useState(() => {
  return localStorage.getItem('theme') || 'dark';
});

const toggleTheme = () => {
  const newTheme = theme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
  localStorage.setItem('theme', newTheme);
};

// Icon display
{theme === 'dark' ? <Sun /> : <Moon />}
```

**Test Scenarios:**
| Action | Expected Result |
|--------|-----------------|
| Click toggle in dark mode | Page switches to light mode, icon becomes Moon |
| Click toggle in light mode | Page switches to dark mode, icon becomes Sun |
| Refresh page after toggle | Theme remains as last selected |
| Clear localStorage, refresh | Defaults to dark mode |

---

### NAV-003: Sign In Button
**Title:** Navigation - Sign In Button

**User Story:**
As a returning user, I want to click a Sign In button in the navigation, so that I can access my existing account and application.

**Acceptance Criteria:**
- [ ] Button text reads "Sign In"
- [ ] Button uses ghost variant (transparent background)
- [ ] Button has hover effect based on theme
- [ ] Clicking navigates to `/login` route
- [ ] Button has `data-testid="nav-login-btn"` for testing

**Logic:**
```javascript
<Link to="/login">
  <Button variant="ghost" data-testid="nav-login-btn">
    Sign In
  </Button>
</Link>
```

**Styling:**
- Dark mode: `text-slate-300 hover:text-white hover:bg-white/5`
- Light mode: `text-gray-700 hover:text-gray-900 hover:bg-gray-100`

---

### NAV-004: Apply Now Button
**Title:** Navigation - Apply Now CTA Button

**User Story:**
As a prospective student, I want a prominent "Apply Now" button in the navigation, so that I can quickly start my application from anywhere on the page.

**Acceptance Criteria:**
- [ ] Button text reads "Apply Now"
- [ ] Button has primary styling: teal background (`#00677F`)
- [ ] Button is rounded (pill shape): `rounded-full`
- [ ] Button has glow shadow effect: `shadow-[0_0_20px_rgba(0,180,216,0.3)]`
- [ ] Hover increases glow: `hover:shadow-[0_0_30px_rgba(0,180,216,0.5)]`
- [ ] Clicking navigates to `/register` route
- [ ] Button has `data-testid="nav-apply-btn"` for testing

**Logic:**
```javascript
<Link to="/register">
  <Button 
    className="bg-[#00677F] hover:bg-[#135163] text-white rounded-full px-6"
    data-testid="nav-apply-btn"
  >
    Apply Now
  </Button>
</Link>
```

---

### NAV-005: Sticky Navigation Behavior
**Title:** Navigation - Sticky Header with Blur

**User Story:**
As a visitor scrolling the page, I want the navigation to remain visible at the top, so that I can always access navigation options.

**Acceptance Criteria:**
- [ ] Navigation is fixed to top of viewport (`fixed top-0`)
- [ ] Navigation has backdrop blur effect (`backdrop-blur-xl`)
- [ ] Navigation has semi-transparent background
- [ ] Navigation has subtle bottom border
- [ ] Navigation has high z-index to stay above content (`z-50`)

**Styling:**
```css
/* Dark mode */
bg-[#0A0E14]/80 border-white/5

/* Light mode */
bg-white/80 border-gray-200
```

---

## HERO SECTION

### HERO-001: Applications Open Badge
**Title:** Hero - Application Status Badge

**User Story:**
As a prospective student, I want to see that applications are currently open, so that I know I can apply now.

**Acceptance Criteria:**
- [ ] Badge displays "Applications Open for 2026"
- [ ] Badge has Sparkles icon (✨) on the left
- [ ] Badge has pill shape (`rounded-full`)
- [ ] Badge has teal-themed styling
- [ ] Badge has subtle border and background

**Styling:**
```css
bg-[#00677F]/10 border border-[#00677F]/30 text-[#00677F]
```

---

### HERO-002: Main Headline
**Title:** Hero - Primary Headline

**User Story:**
As a visitor, I want to see an inspiring headline that communicates the university's value, so that I feel motivated to learn more.

**Acceptance Criteria:**
- [ ] Headline text: "Your Journey to Healthcare Excellence"
- [ ] "Healthcare Excellence" has gradient text effect (teal gradient)
- [ ] Font: Montserrat, bold weight
- [ ] Size: `text-5xl` on mobile, `text-7xl` on desktop (`lg:text-7xl`)
- [ ] Line height is tight for visual impact

**Logic:**
```jsx
<h1 className="font-['Montserrat'] text-5xl lg:text-7xl font-bold">
  Your Journey to{" "}
  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00677F] to-[#135163]">
    Healthcare Excellence
  </span>
</h1>
```

---

### HERO-003: Subheadline Text
**Title:** Hero - Supporting Description

**User Story:**
As a visitor, I want to read a brief description of what the university offers, so that I understand the value proposition.

**Acceptance Criteria:**
- [ ] Text: "Join the University of St. Augustine for Health Sciences and transform your passion into a rewarding healthcare career."
- [ ] Font size: `text-xl`
- [ ] Max width constraint for readability: `max-w-xl`
- [ ] Color: muted (slate-400 dark, gray-600 light)

---

### HERO-004: Start Application CTA Button
**Title:** Hero - Primary Call-to-Action

**User Story:**
As a prospective student ready to apply, I want a prominent button to start my application, so that I can begin the process immediately.

**Acceptance Criteria:**
- [ ] Button text: "Start Your Application"
- [ ] Button has right chevron icon (→)
- [ ] Button is large: `px-8 py-6 text-lg`
- [ ] Button has enhanced glow effect: `shadow-[0_0_30px_rgba(0,180,216,0.4)]`
- [ ] Hover increases glow and scales button slightly: `hover:scale-105`
- [ ] Clicking navigates to `/register`
- [ ] Button has `data-testid="hero-start-application-btn"`

**Logic:**
```javascript
<Button 
  onClick={() => navigate("/register")}
  className="bg-[#00677F] hover:bg-[#135163] rounded-full px-8 py-6 text-lg hover:scale-105"
  data-testid="hero-start-application-btn"
>
  Start Your Application
  <ChevronRight className="ml-2 w-5 h-5" />
</Button>
```

---

### HERO-005: Alumni Statistic
**Title:** Hero - Alumni Count Statistic

**User Story:**
As a prospective student, I want to see how many alumni have graduated, so that I can trust the university's track record.

**Acceptance Criteria:**
- [ ] Number displayed: "15K+"
- [ ] Label: "Alumni Worldwide"
- [ ] Number styled in teal (`text-[#00677F]`), large font
- [ ] Label styled in muted color, small font

**Display:**
```
15K+
Alumni Worldwide
```

---

### HERO-006: Employment Rate Statistic
**Title:** Hero - Employment Rate Statistic

**User Story:**
As a prospective student, I want to see the graduate employment rate, so that I can assess career outcomes.

**Acceptance Criteria:**
- [ ] Number displayed: "95%"
- [ ] Label: "Employment Rate"
- [ ] Same styling as other statistics

**Display:**
```
95%
Employment Rate
```

---

### HERO-007: Campus Count Statistic
**Title:** Hero - Campus Locations Count

**User Story:**
As a prospective student, I want to see how many campuses exist, so that I know my location options.

**Acceptance Criteria:**
- [ ] Number displayed: "5"
- [ ] Label: "Campus Locations"
- [ ] Same styling as other statistics

**Display:**
```
5
Campus Locations
```

---

### HERO-008: Hero Image
**Title:** Hero - Campus Visual Image

**User Story:**
As a visitor, I want to see an image of the university campus or students, so that I can visualize the environment.

**Acceptance Criteria:**
- [ ] Image displays university campus/innovation visual
- [ ] Image is contained in a glassmorphism card with rounded corners (`rounded-3xl`)
- [ ] Image has floating animation effect (`animate-float`)
- [ ] Image has gradient overlay fading to background at bottom
- [ ] Image is ONLY visible on large screens (`hidden lg:block`)
- [ ] Image height: 500px, object-fit: cover

---

## PROGRAM SELECTION SECTION

### PROG-001: Section Header
**Title:** Programs - Section Title

**User Story:**
As a visitor, I want to see a clear section header for program selection, so that I understand what this section offers.

**Acceptance Criteria:**
- [ ] Title: "Choose Your Path"
- [ ] Subtitle: "Select your program of interest to begin your application journey"
- [ ] Title uses Montserrat font, bold, large size
- [ ] Section is centered

---

### PROG-002: Occupational Therapy Card
**Title:** Programs - Occupational Therapy Program Card

**User Story:**
As a prospective OT student, I want to see the Occupational Therapy program option, so that I can select it and learn more.

**Acceptance Criteria:**
- [ ] Card displays GraduationCap icon
- [ ] Icon background: teal (`#00677F`) at 20% opacity
- [ ] Title: "Occupational Therapy"
- [ ] Description: "Transform lives through therapeutic interventions"
- [ ] Degrees listed: "MOT - Master's", "OTD - Doctorate"
- [ ] Card has glassmorphism styling (`glass-card`)
- [ ] Card has hover lift effect (`card-lift`)
- [ ] Clicking card sets `selectedProgram` to "ot"
- [ ] Selected state: teal border, glow shadow
- [ ] `data-testid="program-card-ot"`

**Logic:**
```javascript
const [selectedProgram, setSelectedProgram] = useState(null);

// On click
onClick={() => setSelectedProgram("ot")}

// Selected styling
className={selectedProgram === "ot" 
  ? 'border-[#00677F] shadow-[0_0_30px_rgba(0,180,216,0.2)]' 
  : ''}
```

---

### PROG-003: Nursing Card
**Title:** Programs - Nursing Program Card

**User Story:**
As a prospective nursing student, I want to see the Nursing program option, so that I can select it.

**Acceptance Criteria:**
- [ ] Card displays Stethoscope icon
- [ ] Icon background: purple (`#7B68EE`) at 20% opacity
- [ ] Title: "Nursing"
- [ ] Description: "Lead the future of patient care"
- [ ] Degrees listed: "MSN - Master's", "DNP - Doctorate"
- [ ] Same interaction behavior as OT card
- [ ] `data-testid="program-card-nursing"`

---

### PROG-004: Education Card
**Title:** Programs - Education Program Card

**User Story:**
As a prospective education student, I want to see the Education program option, so that I can select it.

**Acceptance Criteria:**
- [ ] Card displays BookOpen icon
- [ ] Icon background: amber (`#F59E0B`) at 20% opacity
- [ ] Title: "Education"
- [ ] Description: "Shape tomorrow's healthcare educators"
- [ ] Degrees listed: "EdD - Doctorate", "MS - Master's"
- [ ] Same interaction behavior as other cards
- [ ] `data-testid="program-card-education"`

---

### PROG-005: Certificates Card
**Title:** Programs - Certificates Program Card

**User Story:**
As a professional seeking certification, I want to see the Certificates option, so that I can explore advanced training.

**Acceptance Criteria:**
- [ ] Card displays Award icon
- [ ] Icon background: emerald (`#10B981`) at 20% opacity
- [ ] Title: "Certificates"
- [ ] Description: "Advance your skills with specialized training"
- [ ] Types listed: "Professional", "Advanced"
- [ ] Same interaction behavior as other cards
- [ ] `data-testid="program-card-certificates"`

---

## FEATURES SECTION

### FEAT-001: AI-Assisted Journey Feature
**Title:** Features - AI Assistant Feature Card

**User Story:**
As a prospective student, I want to know about AI assistance available, so that I feel supported during my application.

**Acceptance Criteria:**
- [ ] Card displays Sparkles icon
- [ ] Title: "AI-Assisted Journey"
- [ ] Description: "Get personalized guidance from our AI assistant throughout your application"
- [ ] Card has glassmorphism styling

---

### FEAT-002: Live Application Tracking Feature
**Title:** Features - Progress Tracking Feature Card

**User Story:**
As a prospective student, I want to know I can track my application progress, so that I stay informed.

**Acceptance Criteria:**
- [ ] Card displays FileCheck icon
- [ ] Title: "Live Application Tracking"
- [ ] Description: "Monitor your progress in real-time with our interactive dashboard"

---

### FEAT-003: 24/7 Support Feature
**Title:** Features - Support Availability Feature Card

**User Story:**
As a prospective student, I want to know support is always available, so that I can get help when needed.

**Acceptance Criteria:**
- [ ] Card displays Headphones icon
- [ ] Title: "24/7 Support"
- [ ] Description: "Access help anytime through our intelligent support system"

---

## CAMPUS LOCATIONS SECTION

### CAMP-001: Campus Location Display
**Title:** Campuses - Location List

**User Story:**
As a prospective student, I want to see all campus locations, so that I can consider which one is best for me.

**Acceptance Criteria:**
- [ ] Five campuses displayed: Austin, Dallas, Miami, San Marcos, St. Augustine
- [ ] Each campus has MapPin icon
- [ ] Campuses displayed in horizontal layout (flex)
- [ ] Each campus is clickable/interactive (visual feedback)

**Data:**
```javascript
const campuses = ["Austin", "Dallas", "Miami", "San Marcos", "St. Augustine"];
```

---

## FOOTER CTA SECTION

### FOOT-001: Final Call-to-Action
**Title:** Footer - Begin Journey CTA

**User Story:**
As a visitor who has scrolled through the page, I want a final prompt to start my application, so that I can take action.

**Acceptance Criteria:**
- [ ] Section has gradient background
- [ ] Headline encourages action: "Ready to Begin?"
- [ ] "Begin Your Journey" button navigates to `/register`
- [ ] Button has same styling as hero CTA

---

---

# SIGN UP PAGE (`/register`)

---

## PAGE LAYOUT

### REG-001: Left Visual Panel
**Title:** Registration - Left Side Visual

**User Story:**
As a visitor on the registration page, I want to see an inspiring visual panel, so that I feel confident about joining.

**Acceptance Criteria:**
- [ ] Panel is ONLY visible on large screens (`hidden lg:flex`)
- [ ] Headline: "Begin Your Healthcare Career Journey"
- [ ] Subtext describes the value of creating an account
- [ ] Four benefit checkmarks displayed:
  - "AI-powered application assistance"
  - "Real-time progress tracking"
  - "Secure document uploads"
  - "24/7 support access"
- [ ] Background has gradient overlay and blur effects

---

### REG-002: Back to Home Link
**Title:** Registration - Back Navigation

**User Story:**
As a visitor who wants to return to the main site, I want a back link, so that I can navigate away easily.

**Acceptance Criteria:**
- [ ] Link text: "Back to Home"
- [ ] Link has left arrow icon (←)
- [ ] Clicking navigates to `/` (landing page)
- [ ] Link has `data-testid="back-to-home-link"`

---

## FORM FIELDS

### REG-003: First Name Field
**Title:** Registration - First Name Input

**User Story:**
As a prospective student, I want to enter my first name, so that my account is personalized.

**Acceptance Criteria:**
- [ ] Label: "First Name"
- [ ] Field has User icon on left side
- [ ] Placeholder text: "John"
- [ ] Field is REQUIRED
- [ ] Validation: Cannot be empty
- [ ] Error if empty on submit: "Please fill in all fields"
- [ ] Input has `data-testid="register-firstname-input"`

**Logic:**
```javascript
const [firstName, setFirstName] = useState("");

// Validation on submit
if (!firstName) {
  toast.error("Please fill in all fields");
  return;
}
```

**Styling:**
```css
pl-12 h-12 bg-black/20 border-white/10 focus:border-[#A1D8E0] rounded-xl
```

---

### REG-004: Last Name Field
**Title:** Registration - Last Name Input

**User Story:**
As a prospective student, I want to enter my last name, so that my full name is recorded.

**Acceptance Criteria:**
- [ ] Label: "Last Name"
- [ ] Field has User icon on left side
- [ ] Placeholder text: "Doe"
- [ ] Field is REQUIRED
- [ ] Validation: Cannot be empty
- [ ] Input has `data-testid="register-lastname-input"`

**Logic:**
```javascript
const [lastName, setLastName] = useState("");

// Validation on submit
if (!lastName) {
  toast.error("Please fill in all fields");
  return;
}
```

---

### REG-005: Email Field
**Title:** Registration - Email Address Input

**User Story:**
As a prospective student, I want to enter my email address, so that I can receive communications and verify my account.

**Acceptance Criteria:**
- [ ] Label: "Email Address"
- [ ] Field has Mail icon on left side
- [ ] Placeholder text: "you@example.com"
- [ ] Field is REQUIRED
- [ ] Field type: `email`
- [ ] Validation: Must be valid email format
- [ ] Error if invalid: Browser default email validation
- [ ] Error if already registered: "Registration failed" (from API)
- [ ] Input has `data-testid="register-email-input"`

**Logic:**
```javascript
const [email, setEmail] = useState("");

// Validation on submit
if (!email) {
  toast.error("Please fill in all fields");
  return;
}

// Server-side validation returns error if email exists
```

---

### REG-006: Phone Number Field
**Title:** Registration - Phone Number Input

**User Story:**
As a prospective student, I want to optionally provide my phone number, so that the university can contact me.

**Acceptance Criteria:**
- [ ] Label: "Phone Number"
- [ ] Field has Phone icon on left side
- [ ] Placeholder text: "(000) 000-0000"
- [ ] Field is OPTIONAL
- [ ] Auto-formats as user types: `(XXX) XXX-XXXX`
- [ ] Only accepts numeric input (strips non-digits)
- [ ] Max length: 10 digits (formatted as 14 characters)
- [ ] Input has `data-testid="register-phone-input"`

**Logic:**
```javascript
const [phone, setPhone] = useState("");

const formatPhoneNumber = (value) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, '');  // Strip non-digits
  const phoneNumberLength = phoneNumber.length;
  
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

// On change
onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
```

**Test Cases:**
| Input | Displayed |
|-------|-----------|
| 5 | 5 |
| 555 | 555 |
| 5551 | (555) 1 |
| 555123 | (555) 123 |
| 5551234567 | (555) 123-4567 |
| 55512345678 | (555) 123-4567 (truncated) |

---

### REG-007: Password Field
**Title:** Registration - Password Input

**User Story:**
As a prospective student, I want to create a secure password, so that my account is protected.

**Acceptance Criteria:**
- [ ] Label: "Password"
- [ ] Field has Lock icon on left side
- [ ] Field type: `password` (masked by default)
- [ ] Placeholder: "••••••••"
- [ ] Field is REQUIRED
- [ ] Show/Hide toggle button on right side (Eye/EyeOff icon)
- [ ] Clicking toggle reveals/hides password text
- [ ] Minimum length: 8 characters
- [ ] Must contain at least one number
- [ ] Must contain at least one uppercase letter
- [ ] Input has `data-testid="register-password-input"`

**Logic:**
```javascript
const [password, setPassword] = useState("");
const [showPassword, setShowPassword] = useState(false);

// Password visibility toggle
<button onClick={() => setShowPassword(!showPassword)}>
  {showPassword ? <EyeOff /> : <Eye />}
</button>

// Field type
type={showPassword ? "text" : "password"}

// Validation on submit
if (password.length < 8) {
  toast.error("Password must be at least 8 characters");
  return;
}
```

---

### REG-008: Password Strength Indicator - Length
**Title:** Registration - Password Check: Minimum Length

**User Story:**
As a prospective student creating a password, I want to see if my password meets the length requirement, so that I can create a valid password.

**Acceptance Criteria:**
- [ ] Displays: "At least 8 characters"
- [ ] Shows checkmark (✓) icon when valid (green)
- [ ] Shows X icon when invalid (gray)
- [ ] Updates in real-time as user types

**Logic:**
```javascript
const passwordChecks = [
  { label: "At least 8 characters", valid: password.length >= 8 },
  // ...
];

// Display
{passwordChecks.map((check) => (
  <div className={check.valid ? "text-[#739600]" : "text-slate-500"}>
    {check.valid ? <Check /> : <X />}
    {check.label}
  </div>
))}
```

---

### REG-009: Password Strength Indicator - Number
**Title:** Registration - Password Check: Contains Number

**User Story:**
As a prospective student, I want to see if my password contains a number, so that I meet security requirements.

**Acceptance Criteria:**
- [ ] Displays: "Contains a number"
- [ ] Valid when password contains at least one digit (0-9)
- [ ] Uses regex: `/\d/.test(password)`

**Logic:**
```javascript
{ label: "Contains a number", valid: /\d/.test(password) }
```

---

### REG-010: Password Strength Indicator - Uppercase
**Title:** Registration - Password Check: Contains Uppercase

**User Story:**
As a prospective student, I want to see if my password contains an uppercase letter, so that I meet security requirements.

**Acceptance Criteria:**
- [ ] Displays: "Contains uppercase"
- [ ] Valid when password contains at least one uppercase letter (A-Z)
- [ ] Uses regex: `/[A-Z]/.test(password)`

**Logic:**
```javascript
{ label: "Contains uppercase", valid: /[A-Z]/.test(password) }
```

---

### REG-011: Confirm Password Field
**Title:** Registration - Confirm Password Input

**User Story:**
As a prospective student, I want to confirm my password, so that I don't accidentally set the wrong password.

**Acceptance Criteria:**
- [ ] Label: "Confirm Password"
- [ ] Field has Lock icon on left side
- [ ] Field type: `password` (masked by default)
- [ ] Has separate show/hide toggle
- [ ] Field is REQUIRED
- [ ] Validation: Must exactly match Password field
- [ ] Error on mismatch: "Passwords do not match"
- [ ] Input has `data-testid="register-confirm-password-input"`

**Logic:**
```javascript
const [confirmPassword, setConfirmPassword] = useState("");

// Validation on submit
if (password !== confirmPassword) {
  toast.error("Passwords do not match");
  return;
}
```

---

## CONSENT AGREEMENT SECTION

### REG-012: Consent Section Header
**Title:** Registration - Consent Agreement Title

**User Story:**
As a prospective student, I want to see a clear consent section, so that I understand I need to agree to terms.

**Acceptance Criteria:**
- [ ] Title: "CONSENT AGREEMENT"
- [ ] Title styled as uppercase, small text, tracking-wider
- [ ] Subtitle explains the consent purpose

---

### REG-013: "I Agree" Card
**Title:** Registration - Consent Agree Option

**User Story:**
As a prospective student who wants to proceed, I want to agree to the consent terms, so that I can create my account.

**Acceptance Criteria:**
- [ ] Card displays Check icon in circle
- [ ] Title: "I Agree"
- [ ] Description: "I consent to receive calls, texts, and emails..."
- [ ] Card is DISABLED (grayed out, not clickable) until all required fields are filled:
  - First Name not empty
  - Last Name not empty
  - Email not empty
  - Password length >= 8
  - Password contains number
  - Password contains uppercase
  - Passwords match
- [ ] Clicking disabled card shows toast: "Please fill in all required fields correctly before agreeing"
- [ ] When enabled: clicking selects this option
- [ ] Selected state: scale up, green border, glow effect
- [ ] Selecting reveals "Create Account" button with slide animation
- [ ] Card has `data-testid="consent-agree-card"`

**Logic:**
```javascript
const [consentAgreed, setConsentAgreed] = useState(null); // null | true | false

// Check if form is valid for consent
const isFormValid = firstName && lastName && email 
  && password.length >= 8 
  && /\d/.test(password) 
  && /[A-Z]/.test(password) 
  && password === confirmPassword;

// On click
const handleConsentChange = (agreed) => {
  if (agreed && !isFormValid) {
    toast.error("Please fill in all required fields correctly before agreeing");
    return;
  }
  setConsentAgreed(agreed);
};

// Styling when selected
className={consentAgreed === true 
  ? "border-[#739600] bg-[#739600]/5 scale-[1.02] shadow-[0_0_20px_rgba(115,150,0,0.2)]" 
  : ""}
```

---

### REG-014: "I Do Not Agree" Card
**Title:** Registration - Consent Disagree Option

**User Story:**
As a prospective student who doesn't want to consent online, I want an alternative option, so that I can complete my application by phone.

**Acceptance Criteria:**
- [ ] Card displays X icon in circle
- [ ] Title: "I Do Not Agree"
- [ ] Description: "I prefer to complete my application by phone"
- [ ] Card is always clickable (not disabled)
- [ ] Clicking selects this option and opens Disagree Modal
- [ ] Selected state: scale up, orange border, glow effect
- [ ] Card has `data-testid="consent-disagree-card"`

**Logic:**
```javascript
const handleConsentChange = (agreed) => {
  setConsentAgreed(agreed);
  if (!agreed) {
    setShowDisagreeModal(true);  // Open modal
  }
};
```

---

### REG-015: Disagree Modal
**Title:** Registration - Phone Application Modal

**User Story:**
As a prospective student who doesn't consent online, I want to see instructions for applying by phone, so that I have an alternative path.

**Acceptance Criteria:**
- [ ] Modal appears when "I Do Not Agree" is clicked
- [ ] Modal has dark overlay with blur effect
- [ ] Modal displays Phone icon in orange circle
- [ ] Title: "Complete Your Application by Phone"
- [ ] Text: "Please call us to complete the application process:"
- [ ] Phone number displayed prominently: "855-481-9203"
- [ ] Phone number is clickable (tel: link)
- [ ] Subtext: "Our enrollment advisors are available to assist you."
- [ ] X button in top-right closes modal
- [ ] Clicking overlay closes modal

**Logic:**
```javascript
const [showDisagreeModal, setShowDisagreeModal] = useState(false);

// Modal component
{showDisagreeModal && (
  <div className="fixed inset-0 z-50">
    <div className="overlay" onClick={() => setShowDisagreeModal(false)} />
    <div className="modal">
      <button onClick={() => setShowDisagreeModal(false)}>
        <X />
      </button>
      <Phone icon />
      <h3>Complete Your Application by Phone</h3>
      <a href="tel:855-481-9203">855-481-9203</a>
    </div>
  </div>
)}
```

---

## FORM SUBMISSION

### REG-016: Create Account Button
**Title:** Registration - Submit Button

**User Story:**
As a prospective student who has filled out the form, I want to submit my registration, so that my account is created.

**Acceptance Criteria:**
- [ ] Button text: "Create Account"
- [ ] Button has ArrowRight icon
- [ ] Button is ONLY visible after "I Agree" is selected
- [ ] Button appears with slide-up animation
- [ ] Button has primary styling (teal background)
- [ ] Button is full width
- [ ] Clicking submits the form
- [ ] Button shows loading spinner during submission
- [ ] Button is disabled during loading
- [ ] Button has `data-testid="create-account-btn"`

**Logic:**
```javascript
const [loading, setLoading] = useState(false);

// Only show when agreed
{consentAgreed === true && (
  <Button 
    type="submit" 
    disabled={loading}
    data-testid="create-account-btn"
  >
    {loading ? (
      <>
        <Loader2 className="animate-spin" />
        Creating Account...
      </>
    ) : (
      <>
        Create Account
        <ArrowRight />
      </>
    )}
  </Button>
)}
```

---

### REG-017: Form Validation - All Fields Required
**Title:** Registration - Empty Field Validation

**User Story:**
As a system, I want to validate that required fields are filled, so that incomplete registrations are prevented.

**Acceptance Criteria:**
- [ ] Validation runs on form submit
- [ ] If firstName, lastName, email, or password is empty:
  - Show toast: "Please fill in all fields"
  - Do NOT submit form
- [ ] Form does not submit until validation passes

**Logic:**
```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!firstName || !lastName || !email || !password) {
    toast.error("Please fill in all fields");
    return;
  }
  // Continue...
};
```

---

### REG-018: Form Validation - Password Match
**Title:** Registration - Password Confirmation Validation

**User Story:**
As a system, I want to ensure passwords match, so that users don't accidentally set wrong passwords.

**Acceptance Criteria:**
- [ ] Validation runs on form submit
- [ ] If password !== confirmPassword:
  - Show toast: "Passwords do not match"
  - Do NOT submit form

---

### REG-019: Form Validation - Password Length
**Title:** Registration - Password Minimum Length Validation

**User Story:**
As a system, I want to enforce minimum password length, so that accounts are secure.

**Acceptance Criteria:**
- [ ] Validation runs on form submit
- [ ] If password.length < 8:
  - Show toast: "Password must be at least 8 characters"
  - Do NOT submit form

---

### REG-020: Form Validation - Consent Required
**Title:** Registration - Consent Validation

**User Story:**
As a system, I want to ensure users have agreed to consent, so that we have permission to contact them.

**Acceptance Criteria:**
- [ ] Validation runs on form submit
- [ ] If consentAgreed !== true:
  - Show toast: "Please agree to the consent terms to create an account"
  - Do NOT submit form

---

## EMAIL VERIFICATION FLOW

### REG-021: Registration API Call
**Title:** Registration - Backend Registration

**User Story:**
As a system, I want to create the user account in the database, so that they can log in later.

**Acceptance Criteria:**
- [ ] API endpoint: `POST /api/auth/register`
- [ ] Request body:
  ```json
  {
    "email": "user@example.com",
    "password": "Password123",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "(555) 123-4567",
    "consent_call": true,
    "consent_text": true,
    "consent_email": true
  }
  ```
- [ ] Response includes: user data + `verification_token`
- [ ] User is created with `email_verified: false`
- [ ] Enrollment advisor is auto-assigned

---

### REG-022: Verification Modal Display
**Title:** Registration - Email Verification Modal

**User Story:**
As a newly registered user, I want to see instructions to verify my email, so that I can complete registration.

**Acceptance Criteria:**
- [ ] Modal appears immediately after successful registration
- [ ] Modal displays: "Check Your Email"
- [ ] Modal shows the registered email address
- [ ] Modal has "Open Verification Email" button
- [ ] Modal cannot be closed until verified (`canClose={false}`)
- [ ] Modal shows countdown timer for resend option

---

### REG-023: Mock Email Window
**Title:** Registration - Mock Verification Email

**User Story:**
As a newly registered user (in development), I want to see a simulated verification email, so that I can test the flow.

**Acceptance Criteria:**
- [ ] New browser window opens automatically after registration
- [ ] Window URL: `/mock-email?token=xxx&email=xxx&firstName=xxx`
- [ ] Window size: 900x800 pixels
- [ ] Page displays branded email from "USA.edu Admissions"
- [ ] Email shows: "Hello [firstName],"
- [ ] Email has "Verify Email Address" button
- [ ] Clicking button calls: `GET /api/auth/verify-email/{token}`

**Logic:**
```javascript
// Open mock email after registration
setTimeout(() => {
  const params = new URLSearchParams({
    token: userData.verification_token,
    email: email,
    firstName: firstName
  });
  const mockEmailUrl = `${window.location.origin}/mock-email?${params.toString()}`;
  window.open(mockEmailUrl, "_blank", "width=900,height=800");
}, 500);
```

---

### REG-024: Verification Polling
**Title:** Registration - Verification Status Check

**User Story:**
As a system, I want to poll for verification status, so that the user is redirected once verified.

**Acceptance Criteria:**
- [ ] Verification modal polls `/api/auth/check-verification` every 3 seconds
- [ ] If `email_verified: true` is returned:
  - Close verification modal
  - Update user context with verified status
  - Show toast: "Email verified! Welcome to USA.edu!"
  - Redirect to `/dashboard`

---

### REG-025: Sign In Link
**Title:** Registration - Existing Account Link

**User Story:**
As a returning user who accidentally went to register, I want a link to sign in, so that I can access my existing account.

**Acceptance Criteria:**
- [ ] Text: "Already have an account? Sign in"
- [ ] "Sign in" is a clickable link
- [ ] Clicking navigates to `/login`

---

## ERROR HANDLING

### REG-026: Duplicate Email Error
**Title:** Registration - Existing Email Error

**User Story:**
As a system, I want to prevent duplicate registrations, so that each email has one account.

**Acceptance Criteria:**
- [ ] If email already exists in database:
  - API returns error with message
  - Toast displays: "Registration failed. Please try again." or specific error
  - Form remains on page for user to correct

---

### REG-027: Network Error Handling
**Title:** Registration - API Error Handling

**User Story:**
As a user experiencing network issues, I want to see helpful error messages, so that I know what went wrong.

**Acceptance Criteria:**
- [ ] If API call fails:
  - Loading state is cleared
  - Toast displays error message from response or generic message
  - User can retry submission

**Logic:**
```javascript
try {
  const userData = await register(email, password, firstName, lastName, options);
  // Success...
} catch (error) {
  console.error("Register error:", error);
  toast.error(error.response?.data?.detail || "Registration failed. Please try again.");
} finally {
  setLoading(false);
}
```

---

# VALIDATION SUMMARY TABLE

| Field | Required | Validation Rules | Error Message |
|-------|----------|------------------|---------------|
| First Name | Yes | Not empty | "Please fill in all fields" |
| Last Name | Yes | Not empty | "Please fill in all fields" |
| Email | Yes | Not empty, valid format | "Please fill in all fields" |
| Phone | No | Auto-formatted, max 10 digits | N/A |
| Password | Yes | Min 8 chars, has number, has uppercase | "Password must be at least 8 characters" |
| Confirm Password | Yes | Must match Password | "Passwords do not match" |
| Consent | Yes | Must be "I Agree" | "Please agree to the consent terms" |

---

# STATE FLOW DIAGRAM

```
Registration Page State Flow:

1. Initial State
   - All fields empty
   - consentAgreed = null
   - "I Agree" card disabled (grayed)
   - "Create Account" button hidden

2. User Fills Form
   - As fields are filled, password checks update in real-time
   - When ALL validations pass, "I Agree" card becomes enabled

3. User Clicks "I Agree"
   - consentAgreed = true
   - Card gets selected styling
   - "Create Account" button slides into view

4. User Clicks "Create Account"
   - loading = true
   - Button shows spinner
   - API call to /api/auth/register

5. Registration Success
   - loading = false
   - Toast: "Account created! Please verify your email."
   - Verification modal opens
   - Mock email window opens

6. User Verifies Email
   - Poll detects email_verified = true
   - Toast: "Email verified! Welcome to USA.edu!"
   - Redirect to /dashboard
```

---

# TEST SCENARIOS

## Happy Path
1. Fill all fields with valid data
2. Click "I Agree"
3. Click "Create Account"
4. Click "Verify Email Address" in mock email
5. Verify redirect to Dashboard

## Validation Errors
1. Submit with empty fields → See "Please fill in all fields"
2. Submit with mismatched passwords → See "Passwords do not match"
3. Submit with short password → See "Password must be at least 8 characters"
4. Click "I Agree" with invalid form → See "Please fill in all required fields correctly"

## Consent Flow
1. Click "I Do Not Agree" → See phone modal with 855-481-9203
2. Close modal and click "I Agree" → Button appears
3. Select "I Agree" then "I Do Not Agree" → Button disappears

## Edge Cases
1. Register with existing email → See error toast
2. Network error during registration → See error toast, can retry
3. Close mock email window → Can click "Open Verification Email" again
