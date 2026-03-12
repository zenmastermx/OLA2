# Ask Journey AI Assistant
## Complete User Story Documentation
### University of St. Augustine for Health Sciences — OLA 2.0
### Salesforce Experience Cloud Implementation

---

# EXECUTIVE SUMMARY

## Project Overview
Ask Journey is an AI-powered chat assistant embedded within the OLA 2.0 (Online Application) Salesforce Experience Cloud site for the University of St. Augustine for Health Sciences. The assistant provides contextual help, program information, application guidance, and escalation pathways for prospective and active applicants across Occupational Therapy, Nursing, Education, and Certificate programs.

## Story Metrics

| Metric | Value |
|--------|-------|
| **Total User Stories** | 68 |
| **Total Story Points** | 284 |
| **Estimated Sprints (2-week)** | 8-10 |
| **Domains Covered** | 14 |

## Story Point Distribution by Domain

| Domain | Stories | Points |
|--------|---------|--------|
| 1. Widget Presence & Launch | 6 | 21 |
| 2. Greeting & Orientation | 5 | 18 |
| 3. Program Information | 6 | 26 |
| 4. Application Status & Requirements | 5 | 21 |
| 5. Document Guidance | 5 | 21 |
| 6. Contextual In-Form Help | 6 | 26 |
| 7. Deadline & Timeline Information | 4 | 13 |
| 8. Financial Aid Questions | 5 | 18 |
| 9. Campus & Location Information | 4 | 13 |
| 10. Escalation & Handoff | 6 | 26 |
| 11. Conversation History & Session | 5 | 21 |
| 12. Accessibility & Compliance | 5 | 21 |
| 13. Analytics & Feedback | 6 | 26 |
| 14. Admin & Configuration | 5 | 21 |

## Recommended Release Phases

### MVP (Phase 1) — Sprints 1-4
**Focus:** Core chat functionality, basic Q&A, program information
- Domain 1: Widget Presence & Launch (All)
- Domain 2: Greeting & Orientation (All)
- Domain 3: Program Information (US-012 to US-015)
- Domain 6: Contextual In-Form Help (US-029, US-030)
- Domain 11: Conversation History (US-051, US-052)
- Domain 12: Accessibility (US-056, US-057)

**MVP Story Points:** ~95 points

### Phase 2 — Sprints 5-7
**Focus:** Application intelligence, document guidance, escalation
- Domain 4: Application Status & Requirements (All)
- Domain 5: Document Guidance (All)
- Domain 6: Contextual In-Form Help (Remaining)
- Domain 7: Deadline & Timeline (All)
- Domain 10: Escalation & Handoff (All)

**Phase 2 Story Points:** ~107 points

### Phase 3 — Sprints 8-10
**Focus:** Advanced features, analytics, admin tools
- Domain 3: Program Information (Remaining)
- Domain 8: Financial Aid Questions (All)
- Domain 9: Campus & Location (All)
- Domain 11: Conversation History (Remaining)
- Domain 12: Accessibility (Remaining)
- Domain 13: Analytics & Feedback (All)
- Domain 14: Admin & Configuration (All)

**Phase 3 Story Points:** ~82 points

## Key Technical Dependencies

1. **Salesforce Einstein/Agentforce License** — Required for native AI capabilities
2. **LLM API Integration** — Anthropic Claude API or OpenAI for advanced NLP
3. **Experience Cloud Site Configuration** — LWR or Aura site with custom LWC support
4. **Salesforce Objects** — Application__c, Document__c, Program__c, Contact, Lead, Case
5. **Knowledge Base** — Salesforce Knowledge enabled for FAQ management
6. **Apex Classes** — Custom controllers for application status, document validation
7. **Platform Events** — For real-time chat analytics and escalation triggers

---

# DOMAIN 1 — WIDGET PRESENCE & LAUNCH

---

## US-001: Ask Journey Button Display in Navigation Bar

**Title:** Display Ask Journey Button in Application Navigation

**As a** prospective or active applicant,
**I want to** see a persistent "Ask Journey" button in the top navigation bar of the OLA 2.0 application,
**so that** I can easily access AI assistance at any point during my application process.

**Acceptance Criteria:**
- [ ] "Ask Journey" button is displayed in the top navigation bar on all application pages
- [ ] Button includes a sparkle/AI icon (✨) and "Ask Journey" text label
- [ ] Button uses branded styling: gradient background (teal #00677F to purple #7B68EE at 20% opacity), rounded-full shape
- [ ] Button is positioned to the right of the "Save" button and left of user profile menu
- [ ] Button remains visible and accessible across all 6 application steps
- [ ] Button includes subtle hover animation (border glow effect)

**Salesforce/Technical Notes:**
- Implement as Lightning Web Component (LWC) embedded in Experience Cloud header region
- Use `lightning-button` with custom CSS styling via static resource
- Component should be added to the Experience Builder page template header slot
- Ensure button visibility is controlled by user permission set (Applicant_Portal_User)

**Priority:** High
**Story Points:** 3

---

## US-002: Open Chat Panel on Button Click

**Title:** Launch Ask Journey Chat Panel

**As an** applicant,
**I want to** click the "Ask Journey" button to open a chat panel,
**so that** I can start interacting with the AI assistant immediately.

**Acceptance Criteria:**
- [ ] Clicking the "Ask Journey" button opens a chat panel overlay
- [ ] Chat panel slides in from the right side of the screen with smooth animation (300ms ease-out)
- [ ] Panel dimensions: 448px width, 600px height (max 80vh on smaller screens)
- [ ] Panel includes branded header with Journey avatar, title "ASK JOURNEY", and subtitle "AI Application Assistant"
- [ ] Panel includes close (X) button in top-right corner
- [ ] Dark backdrop overlay (40% opacity with blur) appears behind the panel
- [ ] Panel is positioned above all other page content (z-index: 9999)

**Salesforce/Technical Notes:**
- Use `lightning-modal` or custom LWC overlay component
- Implement `@api` method `openChat()` for external triggering
- Store panel open/closed state in component property, not Salesforce record
- Use CSS `@keyframes` for slide-in animation

**Priority:** High
**Story Points:** 5

---

## US-003: Close and Minimize Chat Panel

**Title:** Close or Minimize Chat Panel

**As an** applicant,
**I want to** close or minimize the Ask Journey chat panel,
**so that** I can return to my application without losing my conversation context.

**Acceptance Criteria:**
- [ ] Clicking the X button closes the chat panel with slide-out animation
- [ ] Clicking the dark backdrop outside the panel closes it
- [ ] When closed, the "Ask Journey" button remains visible in the navigation
- [ ] Conversation history is preserved when panel is closed and reopened within the same session
- [ ] Minimized state shows a small floating icon that can re-expand the chat
- [ ] Keyboard shortcut (Escape key) closes the panel

**Salesforce/Technical Notes:**
- Store conversation state in component-level JavaScript variable
- Consider using `sessionStorage` for persistence across page navigation within session
- Implement `@api` method `closeChat()` for programmatic closing
- Add event listener for `keydown` to handle Escape key

**Priority:** High
**Story Points:** 3

---

## US-004: Chat Panel Persistence Across Application Steps

**Title:** Maintain Chat State Across Application Navigation

**As an** applicant,
**I want** the Ask Journey conversation to persist as I navigate between application steps,
**so that** I don't lose context or have to repeat my questions.

**Acceptance Criteria:**
- [ ] Chat conversation history persists when navigating from Step 1 to Step 2, etc.
- [ ] If chat panel is open, it remains open during in-app navigation
- [ ] If chat panel is closed, it remains closed during navigation
- [ ] Conversation context (messages, user queries) is maintained for the duration of the browser session
- [ ] Navigation within OLA 2.0 does not trigger a new conversation thread
- [ ] Only a full page refresh or logout clears the conversation

**Salesforce/Technical Notes:**
- Use `sessionStorage` to persist conversation JSON across Experience Cloud page loads
- Implement `connectedCallback()` to restore state on component mount
- Consider Platform Cache for server-side session storage if needed
- Use navigation event listener (`lightning-navigation`) to detect step changes

**Priority:** High
**Story Points:** 5

---

## US-005: Mobile Responsive Chat Panel

**Title:** Mobile-Optimized Ask Journey Experience

**As an** applicant using a mobile device,
**I want** the Ask Journey chat to be fully functional and easy to use on my phone or tablet,
**so that** I can get assistance regardless of the device I'm using.

**Acceptance Criteria:**
- [ ] On mobile (< 768px), chat panel expands to full screen width
- [ ] On mobile, "Ask Journey" button text is hidden; only icon is shown
- [ ] Touch gestures work correctly (scroll, tap, swipe to dismiss)
- [ ] Virtual keyboard does not obscure the input field when typing
- [ ] Chat messages are readable without horizontal scrolling
- [ ] Panel height adjusts to account for mobile browser chrome (URL bar, etc.)
- [ ] Minimum touch target size of 44px for all interactive elements

**Salesforce/Technical Notes:**
- Use CSS media queries with Salesforce SLDS breakpoints
- Test on iOS Safari and Android Chrome for keyboard behavior
- Use `visualViewport` API to handle keyboard appearance
- Implement `@media (max-width: 768px)` rules in component CSS

**Priority:** High
**Story Points:** 5

---

## US-006: Chat Panel Loading State

**Title:** Display Loading State While Chat Initializes

**As an** applicant,
**I want to** see a loading indicator when the chat panel is initializing or when Journey is processing my request,
**so that** I know the system is working and I should wait for a response.

**Acceptance Criteria:**
- [ ] When chat panel first opens, a brief loading spinner is shown while initializing
- [ ] When a message is sent, a typing indicator (three animated dots) appears in the chat
- [ ] Loading state is visually distinct (pulsing avatar glow, animated dots)
- [ ] Loading state does not block user from typing a follow-up message
- [ ] If loading takes > 10 seconds, display a timeout message with retry option
- [ ] Loading indicators meet accessibility contrast requirements

**Salesforce/Technical Notes:**
- Use `lightning-spinner` for initial load
- Implement custom CSS animation for typing indicator dots
- Set `setTimeout` for 10-second timeout handling
- Show loading state via conditional rendering in LWC template

**Priority:** Medium
**Story Points:** 3

---

# DOMAIN 2 — GREETING & ORIENTATION

---

## US-007: Journey Welcome Message

**Title:** Display Personalized Welcome Message

**As an** applicant opening Ask Journey for the first time in a session,
**I want to** receive a friendly welcome message from Journey,
**so that** I understand what the assistant can help me with and feel welcomed.

**Acceptance Criteria:**
- [ ] On first open, Journey displays: "Hi! I'm Journey, your AI assistant for the USA.edu application process. I'm here to help you navigate your path to a healthcare career."
- [ ] Welcome message appears with a subtle fade-in animation
- [ ] For authenticated users, message includes their first name: "Hi [First Name]! I'm Journey..."
- [ ] Message is followed by "Here's what I can help you with:" capability list
- [ ] Journey avatar (gradient circle with sparkles icon) is displayed next to the message
- [ ] Welcome message only appears once per session (subsequent opens show conversation history)

**Salesforce/Technical Notes:**
- Retrieve user first name from `User.FirstName` or `Contact.FirstName` via Apex
- Store "hasSeenWelcome" flag in `sessionStorage`
- Use `@wire` adapter to get current user context
- Implement null-safe check for guest users

**Priority:** High
**Story Points:** 3

---

## US-008: Capability List Display

**Title:** Show Journey's Capabilities After Welcome

**As an** applicant,
**I want to** see a list of things Journey can help me with,
**so that** I understand the scope of assistance available and can choose a relevant topic.

**Acceptance Criteria:**
- [ ] After welcome message, display capability bullets:
  - "Answer questions about our programs (OTD, Nursing, Education, Certificates)"
  - "Explain application requirements and deadlines"
  - "Help with document submissions"
  - "Check your application status"
  - "Connect you with an admissions advisor"
- [ ] Each capability is styled as a subtle list item with a checkmark or bullet icon
- [ ] Capability list appears with staggered animation (each item fades in sequentially)
- [ ] List is displayed only once after the welcome message
- [ ] User can scroll past capabilities to view quick-action chips

**Salesforce/Technical Notes:**
- Implement as static HTML within the greeting message component
- Use CSS `animation-delay` for staggered effect
- Store capability list in a Salesforce Custom Metadata Type for easy updates
- Consider making capabilities dynamic based on user type (guest vs. authenticated)

**Priority:** High
**Story Points:** 3

---

## US-009: Quick-Action Prompt Chips

**Title:** Display Clickable Quick-Action Chips

**As an** applicant,
**I want to** see pre-built question chips that I can click to quickly get common information,
**so that** I don't have to type out frequently asked questions.

**Acceptance Criteria:**
- [ ] Display 4-6 quick-action chips below the greeting:
  - "What documents do I need?"
  - "Tell me about the programs"
  - "What are the deadlines?"
  - "Campus locations?"
  - "Check my application status" (authenticated users only)
  - "Talk to an advisor"
- [ ] Chips are styled as pill-shaped buttons with subtle border and background
- [ ] Clicking a chip sends that question as if the user typed it
- [ ] Chips disappear or move to a collapsed state after first user interaction
- [ ] Chips are keyboard-accessible (Tab to navigate, Enter to select)
- [ ] Chips re-appear when conversation is cleared or reset

**Salesforce/Technical Notes:**
- Implement chips as `lightning-button` components with `variant="neutral"`
- Store chip text in Custom Metadata for admin configurability
- Conditionally render "Check my application status" using `@wire(getRecord)` to check auth status
- Dispatch custom event `chipSelected` with chip value as payload

**Priority:** High
**Story Points:** 5

---

## US-010: Personalization for Authenticated Users

**Title:** Personalize Greeting Based on User Context

**As an** authenticated applicant with an existing application,
**I want** Journey to recognize my context (program of interest, application step),
**so that** the assistance I receive is immediately relevant to my situation.

**Acceptance Criteria:**
- [ ] For authenticated users, Journey's greeting includes: "I see you're applying for [Program Name]."
- [ ] If user has an in-progress application, Journey mentions: "You're currently on Step [X] - [Step Name]."
- [ ] Quick-action chips are prioritized based on current application step
- [ ] If application is complete/submitted, Journey says: "Your application has been submitted! I can help you check its status."
- [ ] Guest users receive a generic greeting without application context
- [ ] Personalization data is fetched in < 2 seconds after panel opens

**Salesforce/Technical Notes:**
- Create Apex controller `JourneyContextController` with method `getApplicantContext()`
- Query `Application__c` where `Contact__c = :currentContactId` and `Status__c != 'Submitted'`
- Return wrapper class with programName, currentStep, applicationStatus
- Use `@wire` decorator with caching enabled for performance

**Priority:** Medium
**Story Points:** 5

---

## US-011: Return User Recognition

**Title:** Recognize Returning Users with Saved Applications

**As a** returning applicant who previously started an application,
**I want** Journey to acknowledge my return and offer to help me continue,
**so that** I feel recognized and can quickly resume where I left off.

**Acceptance Criteria:**
- [ ] For users with a saved but incomplete application, Journey says: "Welcome back, [First Name]! Ready to continue your [Program] application?"
- [ ] Journey offers a direct action: "You left off on Step [X]. Would you like me to help you complete it?"
- [ ] If application was last updated > 30 days ago, Journey notes: "It's been a while since your last visit. Let me know if anything has changed."
- [ ] Quick chip offered: "Continue my application"
- [ ] If user has multiple applications, Journey asks: "I see you have [X] applications. Which one would you like to work on?"

**Salesforce/Technical Notes:**
- Query `Application__c.LastModifiedDate` to determine "returning" status
- Use `SOQL` with `ORDER BY LastModifiedDate DESC LIMIT 5` for multiple applications
- Store last interaction timestamp in `Application__c.Last_Journey_Interaction__c` custom field
- Implement date comparison logic in Apex controller

**Priority:** Medium
**Story Points:** 5

---

# DOMAIN 3 — PROGRAM INFORMATION

---

## US-012: General Program Overview Query

**Title:** Answer General "Tell Me About Programs" Query

**As a** prospective applicant,
**I want to** ask Journey about USA Health Sciences programs in general,
**so that** I can understand my options before deciding which to apply for.

**Acceptance Criteria:**
- [ ] When user asks "Tell me about the programs" or similar, Journey provides an overview
- [ ] Response lists all four program categories: Occupational Therapy (OTD), Nursing, Education, and Certificates
- [ ] Each program includes a 1-2 sentence description
- [ ] Journey offers follow-up: "Would you like more details about any specific program?"
- [ ] Response includes clickable program names that trigger detailed information
- [ ] If user is authenticated with a selected program, that program is highlighted first

**Salesforce/Technical Notes:**
- Create Salesforce Knowledge articles for each program category
- Use Einstein Search or SOSL to match user query to Knowledge articles
- Return structured response from `Program__c` custom object with fields: Name, Description__c, Type__c
- Implement intent classification to detect "program information" queries

**Priority:** High
**Story Points:** 5

---

## US-013: OTD Program Specific Information

**Title:** Provide Occupational Therapy Doctorate (OTD) Details

**As a** prospective OTD applicant,
**I want to** ask Journey specific questions about the OTD program,
**so that** I can determine if it's the right fit for my career goals.

**Acceptance Criteria:**
- [ ] Journey can answer: "What are the OTD program requirements?"
- [ ] Journey can answer: "How long is the OTD program?"
- [ ] Journey can answer: "What is the OTD tuition cost?"
- [ ] Journey can answer: "Which campuses offer OTD?"
- [ ] Journey can answer: "What careers can I pursue with an OTD?"
- [ ] Journey provides accurate, up-to-date information from the Salesforce Knowledge base
- [ ] If information is not available, Journey says: "I don't have that specific detail, but I can connect you with an admissions advisor who can help."

**Salesforce/Technical Notes:**
- Create Knowledge article: "OTD_Program_FAQ" with data categories
- Fields to include: Prerequisites__c, Duration__c, Tuition__c, Campuses__c, Career_Outcomes__c
- Use parameterized SOQL: `SELECT ... FROM Knowledge__kav WHERE Program__c = 'OTD'`
- Enable Einstein Article Recommendations for related content

**Priority:** High
**Story Points:** 5

---

## US-014: Nursing Program Specific Information

**Title:** Provide Nursing Program Details

**As a** prospective Nursing applicant,
**I want to** ask Journey about MSN, DNP, and other nursing pathways,
**so that** I can understand the different nursing degree options available.

**Acceptance Criteria:**
- [ ] Journey differentiates between MSN (Master's) and DNP (Doctorate) programs
- [ ] Journey can answer: "What's the difference between MSN and DNP?"
- [ ] Journey can answer: "What are the prerequisites for the nursing program?"
- [ ] Journey can answer: "Is the nursing program available online?"
- [ ] Journey explains specialty tracks if applicable (e.g., Family Nurse Practitioner)
- [ ] Journey provides clinical hour requirements if asked

**Salesforce/Technical Notes:**
- Create separate Knowledge articles for MSN and DNP
- Link articles via `Related_Programs__c` lookup field
- Implement sub-intent detection for "MSN vs DNP" comparison queries
- Include structured data for clinical requirements

**Priority:** High
**Story Points:** 5

---

## US-015: Education Program Specific Information

**Title:** Provide Education Program Details

**As a** prospective Education applicant,
**I want to** ask Journey about EdD and MS Education programs,
**so that** I can understand how these degrees advance my career in healthcare education.

**Acceptance Criteria:**
- [ ] Journey can explain the EdD (Doctor of Education) program focus
- [ ] Journey can explain the MS in Education program options
- [ ] Journey can answer: "Who is the Education program designed for?"
- [ ] Journey can answer: "Can I complete the Education program while working?"
- [ ] Journey explains the difference between clinical and non-clinical education tracks
- [ ] Journey provides admission requirements specific to Education programs

**Salesforce/Technical Notes:**
- Create Knowledge articles for EdD and MS Education
- Tag articles with `Audience__c` picklist (e.g., "Working Professionals", "Career Changers")
- Include program format information: online, hybrid, on-campus

**Priority:** Medium
**Story Points:** 3

---

## US-016: Certificate Program Information

**Title:** Provide Certificate Program Details

**As a** prospective student interested in specialized training,
**I want to** ask Journey about certificate programs,
**so that** I can explore shorter-term credentials that enhance my healthcare career.

**Acceptance Criteria:**
- [ ] Journey can list available certificate programs
- [ ] Journey can answer: "How long are the certificate programs?"
- [ ] Journey can answer: "Do certificates count toward a degree?"
- [ ] Journey explains the difference between professional and advanced certificates
- [ ] Journey provides information on certificate-to-degree pathways if available
- [ ] Journey clarifies whether certificates require prior healthcare experience

**Salesforce/Technical Notes:**
- Create Certificate__c custom object or use Program__c with RecordType
- Include Duration__c, Stackable__c (boolean for degree credit), Prerequisites__c
- Query with filter: `WHERE RecordType.Name = 'Certificate'`

**Priority:** Medium
**Story Points:** 3

---

## US-017: Program Comparison Query

**Title:** Compare Multiple Programs Side-by-Side

**As a** prospective applicant considering multiple paths,
**I want to** ask Journey to compare two or more programs,
**so that** I can make an informed decision about which program best fits my goals.

**Acceptance Criteria:**
- [ ] Journey can respond to: "Compare OTD and Nursing programs"
- [ ] Comparison includes: duration, tuition range, career outcomes, prerequisites
- [ ] Response is formatted as a clear comparison (bullet points or implicit table structure)
- [ ] Journey asks clarifying questions if comparison is ambiguous: "Would you like to compare specific degree levels?"
- [ ] Journey can compare across program types (e.g., OTD vs. Certificate in Hand Therapy)
- [ ] Comparison data is dynamically pulled from Salesforce, not hardcoded

**Salesforce/Technical Notes:**
- Create Apex method `comparePrograms(List<String> programIds)`
- Return wrapper class with side-by-side data structure
- Use dynamic SOQL to fetch requested program records
- Implement NLP entity extraction to identify programs in user query

**Priority:** Low
**Story Points:** 8

---

# DOMAIN 4 — APPLICATION STATUS & REQUIREMENTS

---

## US-018: Check Application Status

**Title:** Provide Current Application Status

**As an** authenticated applicant,
**I want to** ask Journey "What is my application status?",
**so that** I can understand where my application stands in the review process.

**Acceptance Criteria:**
- [ ] Journey retrieves and displays current application status (e.g., "In Progress", "Submitted", "Under Review", "Decision Made")
- [ ] For "In Progress" applications, Journey shows completion percentage
- [ ] For "Submitted" applications, Journey shows submission date
- [ ] For "Under Review" applications, Journey provides estimated review timeline
- [ ] For "Decision Made" applications, Journey indicates next steps (e.g., "Check your email for your decision letter")
- [ ] If user has no application, Journey offers to help start one

**Salesforce/Technical Notes:**
- Query `Application__c.Status__c` and `Application__c.Submitted_Date__c`
- Create formula field `Completion_Percentage__c` based on required fields populated
- Use Process Builder or Flow to update status based on milestones
- Restrict query to applications owned by current user's Contact

**Priority:** High
**Story Points:** 5

---

## US-019: Show Completed vs. Incomplete Steps

**Title:** Display Application Progress by Step

**As an** authenticated applicant with an in-progress application,
**I want to** ask Journey which application steps I've completed and which remain,
**so that** I can focus my effort on incomplete sections.

**Acceptance Criteria:**
- [ ] Journey lists all 6 application steps with completion status:
  - Step 1: Personal Information — ✓ Complete / ○ Incomplete
  - Step 2: Academic History — ✓ Complete / ○ Incomplete
  - (etc. for all 6 steps)
- [ ] Journey highlights the next recommended action: "You should complete Step [X] next."
- [ ] Clicking on a step name (if in chat) could navigate user to that step (stretch goal)
- [ ] Journey provides estimated time to complete remaining steps
- [ ] For each incomplete step, Journey can explain what's missing if asked

**Salesforce/Technical Notes:**
- Create `Application_Step__c` junction object or use checkbox fields on `Application__c`
- Fields: Step_1_Complete__c, Step_2_Complete__c, etc. (checkbox)
- Alternatively, use related `Application_Progress__c` records per step
- Calculate completion in Apex controller and return structured list

**Priority:** High
**Story Points:** 5

---

## US-020: Explain What's Needed to Submit

**Title:** Summarize Remaining Requirements for Submission

**As an** authenticated applicant close to completing my application,
**I want to** ask Journey "What do I still need to submit?",
**so that** I can ensure my application is complete before the deadline.

**Acceptance Criteria:**
- [ ] Journey provides a checklist of missing items:
  - Missing form fields (e.g., "Emergency contact phone number is blank")
  - Missing documents (e.g., "Official transcript not yet uploaded")
  - Missing signatures/consents (e.g., "Background check consent not signed")
- [ ] Journey prioritizes items by importance/deadline impact
- [ ] Journey offers to explain any requirement the user doesn't understand
- [ ] When all requirements are met, Journey says: "Great news! Your application is complete and ready to submit."
- [ ] Journey provides a "Submit Application" call-to-action when ready

**Salesforce/Technical Notes:**
- Create validation rule summary Apex method that returns list of unmet requirements
- Use `Schema.DescribeFieldResult` to get field labels for user-friendly messages
- Query `Document__c` where `Application__c = :appId AND Status__c != 'Received'`
- Include consent/signature tracking via checkbox fields or separate object

**Priority:** High
**Story Points:** 5

---

## US-021: Provide Estimated Review Timeline

**Title:** Explain Application Review Timeline

**As an** applicant who has submitted their application,
**I want to** ask Journey how long the review process takes,
**so that** I can set appropriate expectations for when I'll receive a decision.

**Acceptance Criteria:**
- [ ] Journey provides program-specific review timelines:
  - OTD: "Typically 2-4 weeks after all materials received"
  - Nursing: "Rolling review, typically 3-4 weeks"
  - Education: "2-3 weeks during standard admission periods"
  - Certificates: "1-2 weeks"
- [ ] Journey explains factors that may affect timeline (e.g., peak application periods)
- [ ] Journey clarifies: "Review begins once all required documents are received"
- [ ] If materials are still pending, Journey notes: "Your review will begin once we receive [missing item]"
- [ ] Journey offers to notify user when status changes (if notification feature exists)

**Salesforce/Technical Notes:**
- Store review timelines in `Program__c.Typical_Review_Days__c` field
- Create Custom Metadata Type `Review_Timeline__mdt` for admin-configurable values
- Display dynamic timeline based on `Application__c.Program__c` lookup

**Priority:** Medium
**Story Points:** 3

---

## US-022: Application Requirements by Program

**Title:** List Program-Specific Application Requirements

**As a** prospective applicant,
**I want to** ask Journey what's required to apply for a specific program,
**so that** I can gather all necessary materials before starting my application.

**Acceptance Criteria:**
- [ ] Journey can answer: "What do I need to apply for the OTD program?"
- [ ] Response includes:
  - Academic prerequisites (e.g., "Bachelor's degree with minimum 3.0 GPA")
  - Required documents (e.g., "Official transcripts, 3 letters of recommendation")
  - Test scores (e.g., "GRE not required")
  - Experience requirements (e.g., "40+ observation hours")
- [ ] Requirements are program-specific, not generic
- [ ] Journey distinguishes between required vs. recommended items
- [ ] Journey provides links to detailed requirements page if available

**Salesforce/Technical Notes:**
- Create `Program_Requirement__c` object with fields: Program__c (lookup), Type__c (picklist: Academic, Document, Experience), Description__c, Required__c (checkbox)
- Query: `SELECT ... FROM Program_Requirement__c WHERE Program__r.Name = :programName`
- Order results by Required__c DESC, then by Type__c

**Priority:** High
**Story Points:** 5

---

# DOMAIN 5 — DOCUMENT GUIDANCE

---

## US-023: List Required Documents by Program

**Title:** Explain Required Documents for Application

**As an** applicant,
**I want to** ask Journey "What documents do I need to submit?",
**so that** I can prepare and gather all necessary paperwork for my application.

**Acceptance Criteria:**
- [ ] Journey provides a program-specific document checklist:
  - Official transcripts from all post-secondary institutions
  - Resume/CV
  - Personal statement/Essay
  - Letters of recommendation (number varies by program)
  - Government-issued ID
  - Program-specific items (e.g., observation hour logs for OTD)
- [ ] Journey indicates which documents are required vs. optional
- [ ] Journey explains what "official" transcript means (sealed, from registrar)
- [ ] For authenticated users, Journey shows which documents are already uploaded
- [ ] Journey provides document formatting requirements (file types, size limits)

**Salesforce/Technical Notes:**
- Query `Document_Requirement__c` where `Program__c = :selectedProgram`
- Join with `Document__c` to show uploaded status for authenticated users
- Include fields: Required__c, Format__c, Max_Size_MB__c, Description__c
- Return structured list to LWC for rendering

**Priority:** High
**Story Points:** 5

---

## US-024: Explain Document Formats and Upload Process

**Title:** Provide Document Format and Upload Instructions

**As an** applicant preparing documents,
**I want to** know what file formats are accepted and how to upload documents,
**so that** my submissions are processed without issues.

**Acceptance Criteria:**
- [ ] Journey explains accepted file formats: PDF, DOC, DOCX, JPG, PNG
- [ ] Journey specifies maximum file size: "Files must be under 10MB each"
- [ ] Journey provides upload instructions: "In Step 4 (Documents Required), click the 'Upload' button next to each document type"
- [ ] Journey troubleshoots common issues: "If your upload fails, try reducing the file size or converting to PDF"
- [ ] Journey explains how to replace a previously uploaded document
- [ ] Journey confirms what happens after upload: "You'll see a green checkmark when the document is successfully received"

**Salesforce/Technical Notes:**
- Store format requirements in Custom Metadata `Document_Format__mdt`
- Reference Salesforce Files size limits (may vary by org configuration)
- Include help text for the document upload LWC component
- Log upload errors to `Document_Upload_Log__c` for troubleshooting

**Priority:** Medium
**Story Points:** 3

---

## US-025: Check Document Receipt Status

**Title:** Confirm Document Receipt Status

**As an** authenticated applicant,
**I want to** ask Journey if my documents have been received,
**so that** I can confirm my application materials are complete.

**Acceptance Criteria:**
- [ ] Journey can answer: "Did you receive my transcripts?"
- [ ] Journey checks document status and responds:
  - "Yes, we received your official transcript from [Institution] on [Date]"
  - "Not yet — we're still waiting for your transcript from [Institution]"
- [ ] Journey lists all expected documents with receipt status
- [ ] For uploaded documents, Journey shows upload date and processing status
- [ ] For mailed documents, Journey explains typical processing time (3-5 business days)
- [ ] Journey differentiates between "received" and "verified/approved"

**Salesforce/Technical Notes:**
- Query `Document__c` where `Application__c = :appId`
- Include fields: Type__c, Status__c (Pending, Received, Verified), Received_Date__c, Source_Institution__c
- Use `@wire` with refreshApex for real-time updates
- Consider Platform Events to push document status updates

**Priority:** High
**Story Points:** 5

---

## US-026: Transcript Request Guidance

**Title:** Explain How to Request Official Transcripts

**As an** applicant who needs to submit transcripts,
**I want** Journey to explain how to request official transcripts from my previous institutions,
**so that** I can complete this requirement efficiently.

**Acceptance Criteria:**
- [ ] Journey explains: "Official transcripts must be sent directly from your previous institution"
- [ ] Journey provides common transcript services: "Many schools use Parchment, National Student Clearinghouse, or eSCRIP-SAFE"
- [ ] Journey provides the mailing address for physical transcripts (or explains e-transcript submission)
- [ ] Journey clarifies: "Unofficial transcripts are acceptable initially, but official versions must be received before enrollment"
- [ ] Journey offers step-by-step guidance in Step 5 of the application (Request Official Transcripts)
- [ ] Journey can answer: "How do I know if my transcript was received?"

**Salesforce/Technical Notes:**
- Store transcript submission methods in Knowledge article
- Include `Transcript_Vendor__c` picklist on `Document__c` for tracking
- Link to Step 5 of application if user is authenticated
- Provide email address or portal for e-transcript delivery

**Priority:** Medium
**Story Points:** 3

---

## US-027: Letters of Recommendation Guidance

**Title:** Explain Letters of Recommendation Process

**As an** applicant needing letters of recommendation,
**I want** Journey to explain how recommendations work,
**so that** I can request them from appropriate references and track their submission.

**Acceptance Criteria:**
- [ ] Journey explains how many letters are required (varies by program)
- [ ] Journey describes who should provide recommendations (e.g., "Professional or academic references who can speak to your qualifications")
- [ ] Journey explains the recommendation submission process:
  - Applicant enters recommender contact info
  - System sends automated email to recommender
  - Recommender submits letter via secure link
- [ ] Journey can check status: "1 of 3 letters received"
- [ ] Journey offers to resend recommendation request emails if needed
- [ ] Journey explains deadline: "Letters should be received by [deadline] for full consideration"

**Salesforce/Technical Notes:**
- Create `Recommendation__c` object with fields: Recommender_Email__c, Status__c, Submitted_Date__c, Application__c (lookup)
- Implement email automation via Flow or Process Builder
- Create "Resend Request" invocable action
- Track email send/open/click via Salesforce Email Tracking

**Priority:** Medium
**Story Points:** 5

---

# DOMAIN 6 — CONTEXTUAL IN-FORM HELP

---

## US-028: Detect Current Application Step

**Title:** Identify User's Current Application Step

**As** the Journey AI system,
**I need to** detect which step of the application the user is currently viewing,
**so that** I can provide contextually relevant assistance.

**Acceptance Criteria:**
- [ ] Journey detects current step from URL parameter or page context
- [ ] Journey updates internal context when user navigates between steps
- [ ] Context is available for: Step 1 (Personal Info), Step 2 (Academic), Step 3 (Employment), Step 4 (Documents), Step 5 (Transcripts), Step 6 (Review)
- [ ] If detection fails, Journey asks: "Which section of your application are you working on?"
- [ ] Step context is included in all AI prompts for relevant responses
- [ ] Context detection does not add noticeable latency to chat interactions

**Salesforce/Technical Notes:**
- Use `lightning-navigation` to get current page reference
- Parse URL for step number: `/application/{appId}/step/{stepNumber}`
- Alternatively, use `@wire(CurrentPageReference)` in LWC
- Store step context in component property, pass to Apex controller

**Priority:** High
**Story Points:** 5

---

## US-029: Step 1 Personal Information Help

**Title:** Provide Help for Personal Information Fields

**As an** applicant on Step 1 (Personal Information),
**I want** Journey to explain specific fields or sections I have questions about,
**so that** I can accurately complete my personal information.

**Acceptance Criteria:**
- [ ] Journey can explain "Judicial Background" section: "This asks about any criminal history. Answering 'yes' doesn't automatically disqualify you — each case is reviewed individually."
- [ ] Journey can explain "Citizenship & Identification": "We collect this for federal reporting requirements and to determine eligibility for certain programs or financial aid."
- [ ] Journey can explain "US Military Background": "Veteran status may qualify you for military benefits or specialized programs."
- [ ] Journey can explain "Emergency Contact": "This person will be contacted only in case of emergency during your enrollment."
- [ ] Journey proactively offers: "Need help with any of the fields on this page? Just ask!"
- [ ] Journey answers in a reassuring, non-judgmental tone for sensitive topics

**Salesforce/Technical Notes:**
- Create field-level help text records in `Field_Help__c` custom object
- Fields: Field_API_Name__c, Help_Text__c, Step__c
- Query help text dynamically based on user question using keyword matching
- Use sentiment-aware responses for sensitive topics (judicial, military)

**Priority:** High
**Story Points:** 5

---

## US-030: Step 2 Academic History Help

**Title:** Provide Help for Academic History Section

**As an** applicant on Step 2 (Academic History),
**I want** Journey to help me understand what academic information is required,
**so that** I can accurately report my educational background.

**Acceptance Criteria:**
- [ ] Journey can explain what "post-secondary education" includes
- [ ] Journey can answer: "Do I need to list all schools I attended?"
- [ ] Journey can explain GPA requirements and how to calculate GPA if needed
- [ ] Journey can clarify: "What if I don't remember my exact graduation date?"
- [ ] Journey explains prerequisite courses and how to indicate completion
- [ ] Journey helps with international education questions: "I studied abroad — how do I report that?"

**Salesforce/Technical Notes:**
- Create Knowledge article "Academic History FAQ"
- Include GPA calculator link or embedded tool
- Reference WES (World Education Services) for international credential evaluation
- Detect academic history keywords for intent matching

**Priority:** High
**Story Points:** 5

---

## US-031: Step 3 Employment History Help

**Title:** Provide Help for Employment History Section

**As an** applicant on Step 3 (Employment History),
**I want** Journey to explain what employment information is needed and why,
**so that** I can provide accurate work history details.

**Acceptance Criteria:**
- [ ] Journey can explain why employment history is collected: "We want to understand your professional background and relevant healthcare experience."
- [ ] Journey can answer: "How far back should I go with my employment history?"
- [ ] Journey can explain: "What counts as healthcare experience?"
- [ ] Journey helps with employment verification: "Your employer may be contacted to verify employment dates."
- [ ] Journey clarifies hours calculation: "Enter approximate weekly hours if you don't know exactly."
- [ ] Journey addresses gaps: "It's okay to have gaps in employment — just provide what's accurate."

**Salesforce/Technical Notes:**
- Store help content in Knowledge articles tagged with "Employment"
- Calculate total healthcare hours from `Employment__c` records if needed
- Include tooltips in the actual form component that link to Journey

**Priority:** Medium
**Story Points:** 3

---

## US-032: Step 4 Documents Help

**Title:** Provide Contextual Help for Document Uploads

**As an** applicant on Step 4 (Documents Required),
**I want** Journey to help me understand each document requirement,
**so that** I upload the correct documents in the right format.

**Acceptance Criteria:**
- [ ] Journey can explain each document type when asked:
  - "What should my personal statement include?"
  - "What makes a good letter of recommendation?"
  - "Can I submit an unofficial transcript initially?"
- [ ] Journey detects if user is stuck on document step for extended time and proactively offers help
- [ ] Journey provides document templates or examples if available
- [ ] Journey troubleshoots upload errors: "What does 'file too large' mean?"
- [ ] Journey confirms successful uploads: "I see you've uploaded your resume. Great job!"

**Salesforce/Technical Notes:**
- Implement proactive help trigger based on time-on-page (e.g., > 5 minutes)
- Use `@wire` to monitor document upload events via Platform Events
- Link to sample personal statements in Knowledge base (if approved for sharing)
- Include document-specific validation messages

**Priority:** Medium
**Story Points:** 5

---

## US-033: Step 5 Transcript Request Help

**Title:** Provide Help for Official Transcript Requests

**As an** applicant on Step 5 (Request Official Transcripts),
**I want** Journey to guide me through requesting transcripts from my previous institutions,
**so that** I can complete this requirement correctly.

**Acceptance Criteria:**
- [ ] Journey explains the transcript request process step-by-step
- [ ] Journey can answer: "What's the difference between official and unofficial transcripts?"
- [ ] Journey provides institution-specific guidance if the school is in our database
- [ ] Journey clarifies electronic vs. mailed transcripts and which we accept
- [ ] Journey explains timing: "Request transcripts as soon as possible — they can take 2-4 weeks"
- [ ] Journey tracks and reports which transcripts have been requested vs. received

**Salesforce/Technical Notes:**
- Create `Institution__c` reference object with transcript ordering information
- Include common transcript vendors (Parchment, NSC) with direct links
- Store USAHS transcript receiving email/address in Custom Settings
- Integrate with external transcript tracking if available

**Priority:** Medium
**Story Points:** 3

---

## US-034: Step 6 Review & Submit Help

**Title:** Provide Help for Review and Submission

**As an** applicant on Step 6 (Review & Submit),
**I want** Journey to help me review my application and understand the submission process,
**so that** I can submit with confidence.

**Acceptance Criteria:**
- [ ] Journey summarizes application completion status on this step
- [ ] Journey highlights any missing or incomplete items before submission
- [ ] Journey explains what happens after submission: "Your application will be reviewed by our admissions team within [X] weeks."
- [ ] Journey answers: "Can I edit my application after submitting?"
- [ ] Journey explains the certification statement the user is signing
- [ ] Journey celebrates successful submission: "Congratulations on submitting your application! 🎉"

**Salesforce/Technical Notes:**
- Run validation check before displaying "Submit" button
- Create Apex method `validateApplicationForSubmission(Id appId)` returning list of issues
- Trigger confirmation email via Flow on submission
- Update `Application__c.Status__c` to "Submitted" and set `Submitted_Date__c`

**Priority:** Medium
**Story Points:** 5

---

# DOMAIN 7 — DEADLINE & TIMELINE INFORMATION

---

## US-035: Program-Specific Application Deadlines

**Title:** Provide Application Deadline Information

**As a** prospective applicant,
**I want to** ask Journey about application deadlines for my program of interest,
**so that** I can plan my application timeline accordingly.

**Acceptance Criteria:**
- [ ] Journey provides program-specific deadlines when asked: "When is the deadline for the OTD program?"
- [ ] Journey explains if deadlines vary by campus or start term
- [ ] Journey clarifies "priority" vs. "final" deadlines if applicable
- [ ] Journey shows upcoming deadlines in chronological order: "The next OTD deadline is [Date] for the [Term] cohort."
- [ ] Journey warns when deadlines are approaching: "Heads up — the deadline for Spring admission is in 2 weeks!"
- [ ] Journey explains what happens if a deadline is missed (rolling admissions, next term)

**Salesforce/Technical Notes:**
- Create `Admission_Deadline__c` object with fields: Program__c (lookup), Term__c, Deadline_Date__c, Type__c (Priority/Final), Campus__c
- Query with `WHERE Deadline_Date__c >= TODAY ORDER BY Deadline_Date__c ASC`
- Include deadline information in daily/weekly email reminders if configured

**Priority:** High
**Story Points:** 5

---

## US-036: Rolling Admissions Explanation

**Title:** Explain Rolling Admissions Process

**As a** prospective applicant unfamiliar with rolling admissions,
**I want** Journey to explain how rolling admissions works,
**so that** I understand when to apply and when to expect a decision.

**Acceptance Criteria:**
- [ ] Journey explains: "Rolling admissions means we review applications as they're received, rather than waiting for a deadline."
- [ ] Journey clarifies: "The earlier you apply, the earlier you'll receive a decision."
- [ ] Journey notes: "Space may be limited — applying early increases your chances of securing a spot."
- [ ] Journey differentiates which programs use rolling vs. deadline-based admissions
- [ ] Journey provides typical decision turnaround: "Decisions are typically made within [X] weeks of receiving a complete application."

**Salesforce/Technical Notes:**
- Store admission type (Rolling, Deadline-based) on `Program__c.Admission_Type__c`
- Create Knowledge article "What is Rolling Admissions?"
- Include context in personalized deadline responses

**Priority:** Medium
**Story Points:** 2

---

## US-037: Financial Aid Deadlines

**Title:** Provide Financial Aid Deadline Information

**As an** applicant seeking financial aid,
**I want** Journey to tell me about financial aid deadlines,
**so that** I don't miss important dates for FAFSA, scholarships, or other aid.

**Acceptance Criteria:**
- [ ] Journey provides FAFSA deadline: "The FAFSA opens October 1 each year. Submit as early as possible for maximum aid."
- [ ] Journey explains institutional aid deadlines if different from application deadlines
- [ ] Journey mentions scholarship application deadlines
- [ ] Journey clarifies: "You can start your FAFSA before your application is complete, but you'll need to list our school code: [Code]"
- [ ] Journey warns when financial aid deadlines are approaching
- [ ] Journey explains consequences of missing aid deadlines

**Salesforce/Technical Notes:**
- Store financial aid deadlines in `Financial_Aid_Deadline__c` or Custom Metadata
- Include USAHS school code (FAFSA code) in Custom Setting
- Link to FAFSA website in responses
- Tag financial aid Knowledge articles for AI retrieval

**Priority:** Medium
**Story Points:** 3

---

## US-038: Enrollment Term Start Dates

**Title:** Provide Program Start Date Information

**As an** admitted or prospective applicant,
**I want** Journey to tell me when programs start,
**so that** I can plan my transition to student life.

**Acceptance Criteria:**
- [ ] Journey provides start dates by program and term: "The OTD program starts May 11, 2026 for the Summer cohort."
- [ ] Journey lists upcoming start dates for the next 2-3 terms
- [ ] Journey explains orientation dates and requirements
- [ ] Journey clarifies differences between campuses if start dates vary
- [ ] Journey helps with: "Can I defer my start date to a later term?"
- [ ] Journey provides countdown: "Your program starts in [X] weeks!"

**Salesforce/Technical Notes:**
- Create `Term__c` object with Start_Date__c, Orientation_Date__c, Program__c (lookup)
- Query future terms: `WHERE Start_Date__c >= TODAY`
- Include deferral policy in Knowledge base
- Calculate countdown in LWC using JavaScript date functions

**Priority:** Low
**Story Points:** 3

---

# DOMAIN 8 — FINANCIAL AID QUESTIONS

---

## US-039: FAFSA Guidance

**Title:** Provide FAFSA Application Guidance

**As an** applicant seeking financial aid,
**I want** Journey to explain the FAFSA process,
**so that** I can successfully apply for federal financial aid.

**Acceptance Criteria:**
- [ ] Journey explains what FAFSA is: "The Free Application for Federal Student Aid determines your eligibility for federal grants, loans, and work-study."
- [ ] Journey provides USAHS school code for FAFSA: "Add our school code [XXXXXX] to your FAFSA to have your information sent to us."
- [ ] Journey walks through basic FAFSA steps
- [ ] Journey answers: "When should I fill out the FAFSA?"
- [ ] Journey clarifies dependency status questions if asked
- [ ] Journey links to FAFSA website: studentaid.gov

**Salesforce/Technical Notes:**
- Store school code in Custom Setting `Financial_Aid_Settings__c`
- Create comprehensive FAFSA Knowledge article
- Include common FAFSA questions in AI training data
- Link to external FAFSA resources appropriately

**Priority:** Medium
**Story Points:** 3

---

## US-040: Scholarship Information

**Title:** Provide Scholarship Opportunity Information

**As an** applicant seeking to reduce education costs,
**I want** Journey to tell me about available scholarships,
**so that** I can apply for financial awards I may qualify for.

**Acceptance Criteria:**
- [ ] Journey can list available scholarships by program or eligibility criteria
- [ ] Journey explains application process for institutional scholarships
- [ ] Journey provides scholarship deadlines: "The merit scholarship deadline is [Date]"
- [ ] Journey answers: "Am I eligible for any scholarships?" based on user profile if authenticated
- [ ] Journey differentiates between merit-based, need-based, and program-specific scholarships
- [ ] Journey mentions external scholarship resources if internal options are limited

**Salesforce/Technical Notes:**
- Create `Scholarship__c` object with fields: Name, Amount__c, Eligibility_Criteria__c, Deadline__c, Program__c
- Query scholarships where user may qualify (based on GPA, program, etc.)
- Link to scholarship application portal or page

**Priority:** Medium
**Story Points:** 5

---

## US-041: Payment Plan Information

**Title:** Explain Tuition Payment Options

**As an** admitted student planning finances,
**I want** Journey to explain payment plan options,
**so that** I can understand how to manage tuition payments.

**Acceptance Criteria:**
- [ ] Journey explains monthly payment plan option if available
- [ ] Journey provides information on payment deadlines by term
- [ ] Journey clarifies when payment is due relative to enrollment
- [ ] Journey explains consequences of late payment (holds, late fees)
- [ ] Journey directs users to student accounts or bursar's office for specific questions
- [ ] Journey answers: "Can I set up automatic payments?"

**Salesforce/Technical Notes:**
- Store payment plan details in Knowledge article
- Include bursar contact information in Custom Settings
- Link to student portal payment section if applicable
- Do not store or request payment card information in chat

**Priority:** Low
**Story Points:** 3

---

## US-042: Tuition and Cost Information

**Title:** Provide Program Tuition Information

**As a** prospective applicant,
**I want** Journey to tell me how much a program costs,
**so that** I can plan financially for my education.

**Acceptance Criteria:**
- [ ] Journey provides tuition by program: "The OTD program tuition is approximately $[X] total."
- [ ] Journey clarifies per-credit-hour vs. flat-rate programs
- [ ] Journey explains additional costs: fees, books, equipment, clinical requirements
- [ ] Journey differentiates costs by campus if applicable
- [ ] Journey notes: "Tuition is subject to change — this is an estimate based on current rates."
- [ ] Journey offers: "Would you like help exploring financial aid options?"

**Salesforce/Technical Notes:**
- Store tuition in `Program__c.Tuition__c` and `Program__c.Per_Credit_Rate__c`
- Include estimated total cost of attendance in program record
- Add disclaimer about rate changes in response template
- Link to official tuition page for authoritative information

**Priority:** Medium
**Story Points:** 3

---

## US-043: Financial Aid Contact Escalation

**Title:** Connect User to Financial Aid Office

**As an** applicant with complex financial aid questions,
**I want** Journey to connect me with a financial aid advisor,
**so that** I can get personalized help with my financial situation.

**Acceptance Criteria:**
- [ ] Journey recognizes when a question requires human expertise: "That's a great question about your specific aid package. Let me connect you with our financial aid team."
- [ ] Journey provides financial aid office contact info: phone, email, hours
- [ ] Journey offers to create a callback request or case
- [ ] Journey can schedule a financial aid advising appointment if integration exists
- [ ] Journey summarizes the user's question in any escalation handoff
- [ ] Journey confirms: "Is there anything else I can help you with while you wait?"

**Salesforce/Technical Notes:**
- Create escalation Flow that creates Case with RecordType "Financial Aid Inquiry"
- Include `Case.Description__c` with chat transcript summary
- Query `Business_Hours__c` to display office availability
- Integrate with Salesforce Scheduler for appointment booking (if licensed)

**Priority:** Medium
**Story Points:** 5

---

# DOMAIN 9 — CAMPUS & LOCATION INFORMATION

---

## US-044: Campus Locations Overview

**Title:** Provide Campus Location Information

**As a** prospective applicant,
**I want** Journey to tell me about campus locations,
**so that** I can choose a campus that's convenient for me.

**Acceptance Criteria:**
- [ ] Journey lists all campus locations: Austin, Dallas, Miami, San Marcos, St. Augustine
- [ ] Journey provides basic info for each: city, state, and programs offered
- [ ] Journey can answer: "Which campus should I choose?"
- [ ] Journey explains campus-specific features or specialties if applicable
- [ ] Journey provides campus addresses and general directions
- [ ] Journey links to campus information pages for detailed virtual tours

**Salesforce/Technical Notes:**
- Create `Campus__c` object with fields: Name, City__c, State__c, Address__c, Programs_Offered__c (multi-select picklist)
- Query all campuses: `SELECT ... FROM Campus__c ORDER BY Name`
- Include campus photos or virtual tour links in Knowledge articles

**Priority:** Medium
**Story Points:** 3

---

## US-045: Program Availability by Campus

**Title:** Show Which Programs Are Offered at Each Campus

**As a** prospective applicant,
**I want** Journey to tell me which programs are available at a specific campus,
**so that** I can apply to a campus that offers my desired program.

**Acceptance Criteria:**
- [ ] Journey can answer: "What programs are offered in Miami?"
- [ ] Journey can reverse-answer: "Which campuses offer the OTD program?"
- [ ] Journey notes if a program is only offered at certain campuses
- [ ] Journey clarifies hybrid/online options that may not require campus attendance
- [ ] Journey explains any campus-specific admission differences
- [ ] Response includes program format (on-campus, hybrid, online)

**Salesforce/Technical Notes:**
- Create junction object `Campus_Program__c` linking Campus__c and Program__c
- Include `Format__c` field (On-Campus, Hybrid, Online)
- Query: `SELECT Program__r.Name FROM Campus_Program__c WHERE Campus__r.Name = :campusName`

**Priority:** Medium
**Story Points:** 3

---

## US-046: Online and Hybrid Program Information

**Title:** Explain Online and Hybrid Learning Options

**As a** prospective applicant who cannot relocate,
**I want** Journey to explain online and hybrid program options,
**so that** I can pursue my degree while managing other commitments.

**Acceptance Criteria:**
- [ ] Journey identifies which programs are available fully online
- [ ] Journey explains hybrid format: "Hybrid programs combine online coursework with periodic on-campus intensives."
- [ ] Journey clarifies technology requirements for online learning
- [ ] Journey explains residency requirements for hybrid programs
- [ ] Journey answers: "Can I complete the entire program online?"
- [ ] Journey notes any differences in tuition or fees for online programs

**Salesforce/Technical Notes:**
- Add `Delivery_Format__c` picklist to `Program__c`: Online, On-Campus, Hybrid
- Include `Residency_Requirements__c` text field for hybrid programs
- Create Knowledge article "Online Learning at USAHS"

**Priority:** Low
**Story Points:** 3

---

## US-047: Campus Visit and Virtual Tour

**Title:** Provide Campus Visit Information

**As a** prospective applicant,
**I want** Journey to help me schedule a campus visit or find a virtual tour,
**so that** I can experience the campus before committing.

**Acceptance Criteria:**
- [ ] Journey can answer: "How can I visit the campus?"
- [ ] Journey provides options: in-person visit, virtual tour, information session
- [ ] Journey links to campus visit scheduling page or provides contact for scheduling
- [ ] Journey explains what to expect during a campus visit
- [ ] Journey offers virtual tour links for remote exploration
- [ ] Journey mentions upcoming open house or admitted student events if scheduled

**Salesforce/Technical Notes:**
- Store event information in `Event__c` or Campaign object
- Link to Salesforce Scheduler or external scheduling tool (Calendly, etc.)
- Include virtual tour URLs in `Campus__c.Virtual_Tour_URL__c`
- Create Knowledge article "Visiting Our Campuses"

**Priority:** Low
**Story Points:** 3

---

# DOMAIN 10 — ESCALATION & HANDOFF

---

## US-048: Recognize Out-of-Scope Questions

**Title:** Identify Questions Journey Cannot Answer

**As** the Journey AI system,
**I need to** recognize when a question is outside my knowledge base or capabilities,
**so that** I can gracefully escalate to human support rather than providing inaccurate information.

**Acceptance Criteria:**
- [ ] Journey recognizes low-confidence responses and flags them internally
- [ ] Journey does not fabricate or guess answers for topics outside its knowledge
- [ ] Journey responds: "I'm not sure about that specific question. Let me connect you with someone who can help."
- [ ] Journey logs unrecognized questions for admissions team review
- [ ] Journey offers escalation options: live chat (if available), phone, email, callback request
- [ ] Journey thanks the user: "Thank you for your patience — we want to make sure you get accurate information."

**Salesforce/Technical Notes:**
- Implement confidence threshold in LLM response evaluation (e.g., < 70% confidence = escalate)
- Create `Unanswered_Question__c` object to log queries for review
- Include `Question__c`, `Session_Id__c`, `User_Contact__c`, `Timestamp__c`
- Run weekly report on unrecognized questions to improve Knowledge base

**Priority:** High
**Story Points:** 5

---

## US-049: Connect to Admissions Advisor

**Title:** Offer Live Advisor Connection

**As an** applicant with a complex question,
**I want** Journey to offer to connect me with a live admissions advisor,
**so that** I can get personalized help from a human.

**Acceptance Criteria:**
- [ ] Journey offers: "Would you like me to connect you with an admissions advisor?"
- [ ] Journey displays advisor contact options: phone number, email, live chat (if available)
- [ ] Journey shows current availability: "Our advisors are available [hours]. It's currently [time]."
- [ ] If outside business hours, Journey offers callback scheduling: "Leave your number and we'll call you back."
- [ ] Journey can transfer to live chat if embedded chat tool is available (e.g., Salesforce Messaging)
- [ ] Journey confirms: "I've sent your information to an advisor. They'll reach out within [timeframe]."

**Salesforce/Technical Notes:**
- Query `Business_Hours__c` object for current availability
- Integrate with Salesforce Omni-Channel for live chat routing if licensed
- Create quick action to launch phone dialer or email composer
- Include advisor queue availability via Omni-Channel API

**Priority:** High
**Story Points:** 5

---

## US-050: Create Support Case/Ticket

**Title:** Generate Salesforce Case for Escalation

**As an** applicant whose question requires follow-up,
**I want** Journey to create a support case capturing my question,
**so that** an advisor can review and respond even if I leave the chat.

**Acceptance Criteria:**
- [ ] Journey can create a Case in Salesforce with one confirmation click
- [ ] Case includes: user's question, conversation transcript, contact info, application ID (if authenticated)
- [ ] Case is assigned to appropriate queue based on question category (Admissions, Financial Aid, Technical)
- [ ] Journey confirms: "I've created a support ticket (#[CaseNumber]). You'll receive a response within [SLA]."
- [ ] Journey provides case number for user reference
- [ ] User receives email confirmation of case creation

**Salesforce/Technical Notes:**
- Use `Apex @AuraEnabled` method to insert Case record
- Case fields: Subject, Description (transcript), ContactId, Application__c, Origin (set to "Journey AI Chat")
- Use Assignment Rules to route to correct queue
- Trigger confirmation email via Flow on Case creation
- Return Case.CaseNumber to LWC for display

**Priority:** High
**Story Points:** 5

---

## US-051: Callback Request Form

**Title:** Collect Callback Request Information

**As an** applicant who prefers a phone call,
**I want** Journey to collect my callback information,
**so that** an advisor can call me at my convenience.

**Acceptance Criteria:**
- [ ] Journey asks: "When's the best time to call you?"
- [ ] Journey collects: phone number (validates format), preferred callback time, brief topic description
- [ ] For authenticated users, Journey pre-fills phone number from profile
- [ ] Journey creates Task or Case for admissions team with callback details
- [ ] Journey confirms: "Great, we'll call you at [number] around [time]. Look for a call from [phone/identifier]."
- [ ] Journey sends callback confirmation email to user

**Salesforce/Technical Notes:**
- Create `Callback_Request__c` object or use Task with RecordType "Callback"
- Fields: Phone__c, Preferred_Time__c (datetime), Topic__c, Contact__c
- Validate phone with regex: `^\(?[0-9]{3}\)?[-.\s]?[0-9]{3}[-.\s]?[0-9]{4}$`
- Assign Task to callback queue for advisor action

**Priority:** Medium
**Story Points:** 5

---

## US-052: Emergency/Urgent Escalation

**Title:** Handle Urgent or Sensitive Escalations

**As an** applicant with an urgent or sensitive issue,
**I want** Journey to recognize the urgency and escalate immediately,
**so that** I receive timely human support.

**Acceptance Criteria:**
- [ ] Journey recognizes urgency keywords: "urgent", "deadline today", "problem with payment", "discrimination", "accessibility issue"
- [ ] For urgent issues, Journey skips normal escalation flow and provides immediate contact: "For urgent matters, please call us directly at [number]."
- [ ] For sensitive issues (complaints, legal concerns), Journey routes to appropriate specialized queue
- [ ] Journey does not attempt to handle complaints or legal matters — immediate handoff
- [ ] Journey logs urgent escalations with priority flag for reporting
- [ ] Journey maintains empathetic tone: "I understand this is important. Let me get you help right away."

**Salesforce/Technical Notes:**
- Implement keyword detection for urgency classification
- Create high-priority Case record type or escalation flag
- Route to dedicated queue (e.g., "Urgent_Admissions_Queue")
- Include SLA with shorter response time for urgent cases
- Log escalation in analytics for admissions management visibility

**Priority:** High
**Story Points:** 5

---

## US-053: Handoff Transcript Summary

**Title:** Summarize Conversation for Handoff

**As an** admissions advisor receiving an escalated chat,
**I want** a summary of the Journey conversation,
**so that** I can quickly understand the applicant's question and context without re-asking.

**Acceptance Criteria:**
- [ ] When escalating, Journey generates a summary of the conversation
- [ ] Summary includes: user's main question(s), Journey's responses, current application step (if applicable), user's expressed sentiment
- [ ] Summary is attached to Case or visible in Omni-Channel Supervisor for live transfer
- [ ] Summary is structured in bullet points for quick scanning
- [ ] Full conversation transcript is also available if advisor needs details
- [ ] Summary is generated automatically — no user action required

**Salesforce/Technical Notes:**
- Use LLM to generate conversation summary from transcript
- Store summary in `Case.Description` or custom `Chat_Summary__c` field
- Attach full transcript as ContentVersion linked to Case
- If using Omni-Channel, pass summary via conversation attributes

**Priority:** Medium
**Story Points:** 5

---

# DOMAIN 11 — CONVERSATION HISTORY & SESSION MANAGEMENT

---

## US-054: Maintain Conversation Context Within Session

**Title:** Preserve Context Throughout Conversation

**As an** applicant having a multi-turn conversation with Journey,
**I want** Journey to remember what we've discussed earlier in the conversation,
**so that** I don't have to repeat myself.

**Acceptance Criteria:**
- [ ] Journey remembers context within a conversation: "As I mentioned earlier, the OTD deadline is..."
- [ ] Journey can reference previous questions: "Going back to your question about documents..."
- [ ] Conversation context is maintained for at least 30 minutes of inactivity
- [ ] Context includes: questions asked, Journey's responses, user's expressed program interest, current application step
- [ ] Context is used to personalize responses throughout the session
- [ ] Context is not persisted after session ends (cleared on logout or browser close)

**Salesforce/Technical Notes:**
- Store conversation history in JavaScript array within LWC component
- Pass last 5-10 messages as context to LLM for each request
- Implement session timeout with 30-minute threshold
- Clear context on `window.beforeunload` or logout event

**Priority:** High
**Story Points:** 5

---

## US-055: Clear Chat / Start New Conversation

**Title:** Allow User to Clear Chat History

**As an** applicant,
**I want** to clear the current chat and start a fresh conversation with Journey,
**so that** I can ask new questions without prior context influencing responses.

**Acceptance Criteria:**
- [ ] Chat panel includes a "Clear Chat" or "New Conversation" option
- [ ] Clicking "Clear Chat" removes all messages from the display
- [ ] Journey conversation context is reset
- [ ] Journey displays fresh welcome message after clearing
- [ ] User is asked to confirm before clearing: "Start a new conversation? This will clear your current chat history."
- [ ] Clearing chat does not affect application data or progress

**Salesforce/Technical Notes:**
- Implement `clearChat()` method that resets messages array
- Show confirmation modal before clearing
- Reset `sessionStorage` conversation data
- Log "conversation cleared" event for analytics

**Priority:** Low
**Story Points:** 2

---

## US-056: Handle Session Timeout

**Title:** Gracefully Handle Session Timeout

**As an** applicant whose session has timed out,
**I want** Journey to handle the timeout gracefully and allow me to continue,
**so that** I can resume without confusion or data loss.

**Acceptance Criteria:**
- [ ] After 30 minutes of inactivity, Journey session is considered timed out
- [ ] On next message after timeout, Journey notifies: "It's been a while! I've started a fresh conversation. How can I help you?"
- [ ] User is not kicked out of the application — only chat context is reset
- [ ] If user is still authenticated in Experience Cloud, Journey maintains user context (name, application)
- [ ] Timeout duration is configurable by administrators
- [ ] No error message is shown — timeout is handled seamlessly

**Salesforce/Technical Notes:**
- Implement `lastActivityTimestamp` tracking in component
- Check timestamp on each user message
- Store timeout duration in Custom Metadata `Journey_Settings__mdt`
- On timeout, clear message array but retain user authentication context

**Priority:** Medium
**Story Points:** 3

---

## US-057: Conversation History Persistence Across Logins

**Title:** Persist Conversation History Across Sessions (Optional)

**As an** authenticated applicant,
**I want** my Journey conversation history to be saved,
**so that** I can review previous discussions when I return.

**Acceptance Criteria:**
- [ ] For authenticated users, conversation history is saved to Salesforce
- [ ] On next login, Journey offers: "Would you like to continue our previous conversation?"
- [ ] User can choose to start fresh or load previous conversation
- [ ] History is stored securely and visible only to the user and admissions staff
- [ ] History older than 90 days is automatically purged
- [ ] Guest users do not have persistent history (session only)

**Salesforce/Technical Notes:**
- Create `Journey_Conversation__c` object with fields: Contact__c, Transcript__c (Long Text Area), Session_Date__c
- Insert new record on session end if user is authenticated
- Query for previous conversation on session start
- Implement data retention Flow to delete records > 90 days
- Mark as OPTIONAL/Phase 3 feature due to storage implications

**Priority:** Low
**Story Points:** 8

---

## US-058: Export or Email Conversation Transcript

**Title:** Allow User to Export Chat Transcript

**As an** applicant,
**I want** to export or email my conversation with Journey,
**so that** I can reference the information provided later.

**Acceptance Criteria:**
- [ ] Chat panel includes "Email Transcript" or "Download" option
- [ ] Clicking "Email Transcript" sends conversation to user's email on file
- [ ] Transcript includes: timestamp, all messages (user and Journey), any links or resources provided
- [ ] Download option creates a PDF or TXT file of the conversation
- [ ] Export option is only available if conversation has at least 2 exchanges
- [ ] Journey confirms: "I've sent the transcript to [email]. Check your inbox!"

**Salesforce/Technical Notes:**
- Create Apex method to send email via `Messaging.SingleEmailMessage`
- Use Email Template for formatted transcript
- For PDF generation, consider using Visualforce page rendered as PDF
- Require user confirmation of email address before sending

**Priority:** Low
**Story Points:** 5

---

# DOMAIN 12 — ACCESSIBILITY & COMPLIANCE

---

## US-059: WCAG 2.1 AA Compliance

**Title:** Ensure Chat Interface Meets Accessibility Standards

**As an** applicant with visual or motor impairments,
**I want** the Journey chat interface to be fully accessible,
**so that** I can use the AI assistant regardless of my abilities.

**Acceptance Criteria:**
- [ ] All interactive elements have sufficient color contrast (4.5:1 minimum for text)
- [ ] All images and icons have appropriate alt text
- [ ] Focus indicators are clearly visible on all interactive elements
- [ ] No information is conveyed by color alone
- [ ] Text can be resized up to 200% without loss of functionality
- [ ] Chat interface passes automated WCAG 2.1 AA testing (e.g., axe, WAVE)

**Salesforce/Technical Notes:**
- Use SLDS (Salesforce Lightning Design System) components which are pre-tested for accessibility
- Run axe DevTools or Salesforce Accessibility Inspector during development
- Document accessibility testing results in user story acceptance
- Include accessibility review in Definition of Done

**Priority:** High
**Story Points:** 5

---

## US-060: Keyboard Navigation Support

**Title:** Enable Full Keyboard Navigation

**As an** applicant who cannot use a mouse,
**I want** to navigate and use Journey entirely with my keyboard,
**so that** I can access AI assistance without a pointing device.

**Acceptance Criteria:**
- [ ] Tab key moves focus through all interactive elements in logical order
- [ ] Enter/Space activates buttons and links
- [ ] Escape key closes the chat panel
- [ ] Arrow keys navigate within message history
- [ ] Focus is trapped within chat panel when open (doesn't escape to background)
- [ ] Focus returns to "Ask Journey" button when panel is closed

**Salesforce/Technical Notes:**
- Implement `tabindex` attributes appropriately
- Use `aria-modal="true"` and focus trap in modal component
- Test with keyboard-only navigation
- Implement `keydown` event handlers for Escape and other keys

**Priority:** High
**Story Points:** 5

---

## US-061: Screen Reader Support

**Title:** Ensure Screen Reader Compatibility

**As an** applicant using a screen reader,
**I want** Journey to be fully compatible with assistive technology,
**so that** I can hear and interact with the AI assistant.

**Acceptance Criteria:**
- [ ] All messages are announced to screen readers as they appear
- [ ] Chat panel has appropriate ARIA labels: `aria-label="Ask Journey AI Assistant Chat"`
- [ ] New messages are announced using `aria-live="polite"` region
- [ ] Loading states are announced: "Journey is typing..."
- [ ] Buttons and links have descriptive accessible names
- [ ] Screen reader users can distinguish between their messages and Journey's responses

**Salesforce/Technical Notes:**
- Add `role="log"` to message container
- Use `aria-live="polite"` for message area
- Include `aria-label` on input field: "Type your question to Journey"
- Test with VoiceOver (Mac), NVDA (Windows), and JAWS

**Priority:** High
**Story Points:** 5

---

## US-062: Language and Translation Support

**Title:** Support Multiple Languages (Future Enhancement)

**As an** applicant whose primary language is not English,
**I want** Journey to communicate in my preferred language,
**so that** I can understand and interact effectively.

**Acceptance Criteria:**
- [ ] Journey can detect user's browser language preference
- [ ] Journey offers to switch languages: "Would you prefer to chat in Spanish?"
- [ ] Core responses are available in top 2-3 languages (English, Spanish, and one other TBD)
- [ ] Language preference is saved for the session
- [ ] Translated responses maintain accuracy for admissions-critical information
- [ ] If translation is not available, Journey notes: "I'm sorry, I can only assist in English at this time."

**Salesforce/Technical Notes:**
- Use Salesforce Translation Workbench for static UI text
- For AI responses, implement translation layer or use multilingual LLM
- Store language preference in User settings or session
- Mark as OPTIONAL/Future phase due to translation effort required

**Priority:** Low
**Story Points:** 13

---

## US-063: FERPA Compliance for Student Data

**Title:** Ensure FERPA Compliance in Chat Interactions

**As** the University compliance team,
**I need** Journey to handle student data in compliance with FERPA,
**so that** we protect student privacy and meet federal requirements.

**Acceptance Criteria:**
- [ ] Journey does not display full SSN, only last 4 digits if necessary
- [ ] Journey does not repeat sensitive information (grades, financial details) unless user is verified
- [ ] Conversation logs are treated as educational records and protected accordingly
- [ ] Journey does not share information with third parties
- [ ] Users are informed that conversations may be reviewed for quality/training purposes
- [ ] Data retention policies comply with institutional records requirements

**Salesforce/Technical Notes:**
- Mask sensitive fields in all Apex responses: `SSN__c.replaceAll('.(?=.{4})', '*')`
- Store conversation logs in encrypted fields or Shield-protected objects
- Include privacy notice in Journey's welcome message or help section
- Review with compliance/legal team before production deployment

**Priority:** High
**Story Points:** 5

---

# DOMAIN 13 — ANALYTICS & FEEDBACK

---

## US-064: Response Rating (Thumbs Up/Down)

**Title:** Allow Users to Rate Journey's Responses

**As an** applicant,
**I want** to rate Journey's responses as helpful or not helpful,
**so that** the AI can be improved based on my feedback.

**Acceptance Criteria:**
- [ ] Each Journey response includes subtle thumbs up/down icons
- [ ] Clicking thumbs up records positive feedback
- [ ] Clicking thumbs down prompts: "Sorry that wasn't helpful. What were you looking for?"
- [ ] Feedback is logged with the specific message for review
- [ ] Rating icons are unobtrusive and don't distract from conversation
- [ ] User can only rate each message once (icons dim after selection)

**Salesforce/Technical Notes:**
- Create `Chat_Feedback__c` object with fields: Message_Id__c, Rating__c (Positive/Negative), Comment__c, Timestamp__c
- Include message text and Journey response in record for context
- Display aggregate feedback metrics in admissions dashboard
- Use feedback to fine-tune LLM prompts or Knowledge articles

**Priority:** Medium
**Story Points:** 5

---

## US-065: Log Unanswered Questions

**Title:** Track Questions Journey Couldn't Answer

**As an** admissions administrator,
**I want** to see questions that Journey couldn't answer well,
**so that** I can improve the Knowledge base and Journey's training.

**Acceptance Criteria:**
- [ ] Questions with low-confidence responses are automatically logged
- [ ] Questions where user gave thumbs down are flagged for review
- [ ] Log includes: question text, Journey's attempted response, user feedback, timestamp, user context (program, step)
- [ ] Admissions team can view logged questions in Salesforce report
- [ ] Log can be filtered by date, topic, program
- [ ] Logged questions can be marked as "Resolved" after Knowledge base is updated

**Salesforce/Technical Notes:**
- Use `Unanswered_Question__c` object from US-048
- Add `Status__c` picklist: New, Under Review, Resolved
- Create report type and dashboard for admissions team
- Schedule weekly review meeting to process unanswered questions

**Priority:** Medium
**Story Points:** 5

---

## US-066: Track Common Questions by Step

**Title:** Report on Most Common Questions by Application Step

**As an** admissions administrator,
**I want** to see which questions are most commonly asked at each application step,
**so that** I can proactively improve the application UX and Journey's contextual help.

**Acceptance Criteria:**
- [ ] Analytics track which step the user was on when asking a question
- [ ] Dashboard shows question volume by step (Step 1 Personal Info gets 40% of questions, etc.)
- [ ] Report shows top 10 questions for each step
- [ ] Trends can be viewed over time (week-over-week, month-over-month)
- [ ] Insights inform application form improvements (e.g., add inline help if many questions on a field)
- [ ] Data is anonymized — no individual user tracking in reports

**Salesforce/Technical Notes:**
- Log `Application_Step__c` field with each conversation record
- Create rollup reports: Questions by Step, Questions by Topic
- Build Salesforce Dashboard for admissions leadership
- Use Einstein Analytics for advanced visualizations if licensed

**Priority:** Medium
**Story Points:** 5

---

## US-067: Track Questions by Program Interest

**Title:** Report on Questions by Program

**As an** admissions administrator,
**I want** to see which questions are most commonly asked by applicants to each program,
**so that** I can provide program-specific improvements.

**Acceptance Criteria:**
- [ ] Analytics include user's program of interest (if known) with each question
- [ ] Dashboard shows question volume by program
- [ ] Report identifies program-specific FAQ gaps
- [ ] Data helps inform program-specific Knowledge articles
- [ ] Can compare question patterns across programs
- [ ] Report available on-demand and via scheduled email

**Salesforce/Technical Notes:**
- Query `Application__c.Program__c` for authenticated users
- For guests, infer program from questions asked
- Build Program-specific FAQ based on analysis
- Include program field in `Chat_Session__c` or `Chat_Message__c` objects

**Priority:** Low
**Story Points:** 3

---

## US-068: Journey Usage Analytics Dashboard

**Title:** Build Comprehensive Journey Analytics Dashboard

**As an** admissions director,
**I want** a dashboard showing Journey usage metrics,
**so that** I can assess the AI assistant's value and identify improvement opportunities.

**Acceptance Criteria:**
- [ ] Dashboard shows total conversations per day/week/month
- [ ] Dashboard shows average messages per conversation
- [ ] Dashboard shows percentage of escalations to human advisors
- [ ] Dashboard shows positive vs. negative feedback ratio
- [ ] Dashboard shows most common question topics (word cloud or top 10 list)
- [ ] Dashboard shows conversations by user type (guest vs. authenticated)
- [ ] Dashboard is accessible to admissions leadership only

**Salesforce/Technical Notes:**
- Create `Chat_Session__c` object to track each conversation with metrics
- Fields: Start_Time__c, End_Time__c, Message_Count__c, Escalated__c, User_Type__c
- Build Salesforce Dashboard with charts and metrics
- Consider Einstein Analytics for advanced analysis

**Priority:** Medium
**Story Points:** 8

---

## US-069: NPS or Satisfaction Survey

**Title:** Offer Post-Conversation Satisfaction Survey

**As an** applicant completing a conversation with Journey,
**I want** the opportunity to rate my overall experience,
**so that** the university can measure and improve the AI assistant.

**Acceptance Criteria:**
- [ ] When user closes chat, prompt appears: "How was your experience with Journey today?"
- [ ] Simple 1-5 star rating or NPS scale (0-10)
- [ ] Optional text field for additional comments
- [ ] Survey only appears if conversation had 3+ exchanges (not for quick closures)
- [ ] Survey responses are logged and aggregated in dashboard
- [ ] User can dismiss survey without answering

**Salesforce/Technical Notes:**
- Create `Survey_Response__c` object with fields: Rating__c, Comments__c, Session_Id__c
- Trigger survey modal on `closeChat()` method
- Calculate NPS score: (Promoters - Detractors) / Total × 100
- Display NPS trend in analytics dashboard

**Priority:** Low
**Story Points:** 5

---

# DOMAIN 14 — ADMIN & CONFIGURATION

---

## US-070: Update FAQ/Knowledge Base Without Developer

**Title:** Enable Admissions Team to Update Journey's Knowledge

**As an** admissions administrator,
**I want** to update Journey's answers to common questions without requiring developer assistance,
**so that** information stays current and accurate.

**Acceptance Criteria:**
- [ ] Admissions staff can create and edit Salesforce Knowledge articles
- [ ] Knowledge articles are used as Journey's primary information source
- [ ] Changes to Knowledge articles are reflected in Journey within 24 hours
- [ ] Article structure supports Q&A format: Question, Answer, Category, Program
- [ ] Admissions staff can preview how Journey will use an article
- [ ] Version history is maintained for Knowledge articles

**Salesforce/Technical Notes:**
- Enable Salesforce Knowledge in the org
- Create Data Category hierarchy: Programs > OTD, Nursing, Education, Certificates
- Train Journey LLM to use Knowledge articles via RAG (Retrieval-Augmented Generation)
- Implement article publishing workflow for quality control

**Priority:** High
**Story Points:** 8

---

## US-071: Configure Quick-Action Chips

**Title:** Allow Admin Configuration of Suggested Questions

**As an** admissions administrator,
**I want** to modify the quick-action chips/suggested questions shown in Journey,
**so that** I can promote timely topics like upcoming deadlines.

**Acceptance Criteria:**
- [ ] Quick-action chips are configurable via Custom Metadata or Custom Object
- [ ] Admin can add, edit, remove, and reorder chips
- [ ] Admin can set chip visibility: Always, Authenticated Only, Guest Only
- [ ] Admin can set expiration dates for time-sensitive chips (e.g., "Deadline Tomorrow!")
- [ ] Changes take effect immediately without deployment
- [ ] Admin interface is user-friendly (no code required)

**Salesforce/Technical Notes:**
- Create `Journey_Quick_Action__mdt` Custom Metadata Type
- Fields: Label__c, Query_Text__c, Order__c, Visibility__c, Expiration_Date__c
- Query in LWC `connectedCallback()` and filter by visibility/expiration
- Refresh on each chat panel open to get latest chips

**Priority:** Medium
**Story Points:** 5

---

## US-072: Manage Deadline and Date Information

**Title:** Enable Admin Updates to Deadlines and Dates

**As an** admissions administrator,
**I want** to update application deadlines and term dates that Journey provides,
**so that** applicants always receive accurate timing information.

**Acceptance Criteria:**
- [ ] Deadlines are stored in Salesforce objects, not hardcoded
- [ ] Admin can update deadlines via standard Salesforce UI
- [ ] Journey automatically reflects updated deadlines
- [ ] Admin receives reminder to update deadlines for next admission cycle
- [ ] Historical deadlines are retained for reporting
- [ ] Deadline changes can be made without deploying code

**Salesforce/Technical Notes:**
- Use `Admission_Deadline__c` object created in US-035
- Create List View for admissions team to manage deadlines
- Implement validation rule: `Deadline_Date__c >= TODAY`
- Set up scheduled report to notify of upcoming deadline expirations

**Priority:** High
**Story Points:** 3

---

## US-073: Review and Moderate Escalated Cases

**Title:** Provide Admin View of Escalated Conversations

**As an** admissions team lead,
**I want** to review conversations that were escalated from Journey,
**so that** I can ensure quality responses and identify training gaps.

**Acceptance Criteria:**
- [ ] Admin dashboard shows all escalated conversations
- [ ] Each escalation record includes: original question, Journey's response, reason for escalation, resolution status
- [ ] Admin can mark escalations as "Resolved" with notes
- [ ] Admin can identify patterns in escalations (e.g., all about financial aid)
- [ ] Escalation volume is tracked over time
- [ ] Admin can reassign escalated cases if needed

**Salesforce/Technical Notes:**
- Use Case object with RecordType "Journey Escalation"
- Create custom List View filtered to Journey escalations
- Build report showing escalation reasons and trends
- Include escalation metrics in Domain 13 analytics dashboard

**Priority:** Medium
**Story Points:** 5

---

## US-074: Journey System Health Monitoring

**Title:** Monitor Journey AI System Status

**As an** IT administrator,
**I want** to monitor Journey's system health and API status,
**so that** I can quickly identify and resolve technical issues.

**Acceptance Criteria:**
- [ ] Dashboard shows Journey system status: Online, Degraded, Offline
- [ ] Dashboard shows LLM API response times and error rates
- [ ] Alerts are sent if Journey becomes unavailable or response times exceed threshold
- [ ] Admin can view recent error logs for troubleshooting
- [ ] System health is checked automatically every 5 minutes
- [ ] Historical uptime data is retained for SLA reporting

**Salesforce/Technical Notes:**
- Implement health check Apex class that calls LLM API with test prompt
- Log results to `System_Health_Log__c` object
- Use Platform Events to trigger alerts on failure
- Build dashboard with system status indicators
- Configure email alert via Salesforce Flow

**Priority:** Low
**Story Points:** 5

---

# DEPENDENCIES & RISKS

---

## Salesforce Licensing Dependencies

| License/Feature | Requirement | Impact if Unavailable |
|-----------------|-------------|----------------------|
| Experience Cloud | Required | Cannot build portal |
| Einstein AI/Agentforce | Recommended | Must use external LLM |
| Salesforce Knowledge | Required | Limited FAQ management |
| Omni-Channel | Optional | No live chat handoff |
| Einstein Analytics | Optional | Basic reporting only |
| Salesforce Shield | Recommended | Standard encryption only |

## LLM API Integration Considerations

| Consideration | Details | Mitigation |
|---------------|---------|------------|
| API Latency | External LLM calls add 1-3 seconds latency | Implement caching, show typing indicator |
| API Cost | Per-token pricing for Claude/OpenAI | Monitor usage, implement rate limits |
| API Rate Limits | May throttle during high traffic | Implement queuing, fallback responses |
| Data Privacy | User data sent to external API | Use Anthropic/OpenAI HIPAA-eligible tiers |
| Model Updates | LLM behavior may change with updates | Pin to specific model version |

## Data Privacy & FERPA Risks

| Risk | Description | Mitigation |
|------|-------------|------------|
| PII in Logs | Conversation logs contain personal info | Encrypt logs, implement retention policy |
| Data Sharing | LLM provider receives user queries | Use enterprise/HIPAA tier, DPA in place |
| Consent | Users unaware of AI data processing | Add consent notice in welcome message |
| Access Control | Unauthorized access to chat history | Role-based access, field-level security |

## Experience Cloud Configuration Prerequisites

| Prerequisite | Details |
|--------------|---------|
| Site Template | LWR or Aura site template configured |
| User Profiles | Guest User, Applicant User profiles created |
| Permission Sets | Chat access permissions assigned |
| Page Layouts | Header region available for widget |
| Custom Objects | Application__c, Document__c deployed |
| Knowledge Setup | Data Categories, Article Types configured |

## Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| LLM Hallucination | Medium | High | Implement retrieval-augmented generation (RAG), confidence thresholds |
| Performance Issues | Medium | Medium | Optimize queries, implement caching, async processing |
| Scope Creep | High | Medium | Strict MVP definition, phased rollout |
| Integration Failures | Low | High | Retry logic, graceful fallbacks, monitoring |
| User Adoption | Medium | Medium | User training, change management, feedback loop |

---

# APPENDIX

## Glossary

| Term | Definition |
|------|------------|
| Journey | The AI assistant persona for USA Health Sciences |
| OLA 2.0 | Online Application version 2.0 |
| LWC | Lightning Web Component |
| LLM | Large Language Model (Claude, GPT, etc.) |
| RAG | Retrieval-Augmented Generation |
| FERPA | Family Educational Rights and Privacy Act |
| FAFSA | Free Application for Federal Student Aid |
| OTD | Occupational Therapy Doctorate |

## Related Documentation

- Salesforce Experience Cloud Developer Guide
- Einstein Copilot Implementation Guide
- Anthropic Claude API Documentation
- WCAG 2.1 Guidelines
- FERPA Compliance Checklist

---

*Document Version: 1.0*
*Created: December 2025*
*Author: Product Management & Salesforce Architecture Team*
*Classification: Internal Use Only*
