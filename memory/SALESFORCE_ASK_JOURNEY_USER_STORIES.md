# Ask Journey AI Assistant
## Complete User Story Documentation
### University of St. Augustine for Health Sciences - OLA 2.0
### Salesforce Experience Cloud Implementation

---

# EXECUTIVE SUMMARY

## Project Overview

Ask Journey is an AI-powered floating chat widget embedded within the OLA 2.0 (Online Application) Salesforce Experience Cloud site for the University of St. Augustine for Health Sciences (USAHS). The assistant appears as a persistent "Ask Journey" button in the top navigation bar of the application flow and opens a branded slide-in chat panel with conversation area, quick-action prompt chips, and free-text input.

The assistant is named "Journey" and serves applicants across four program categories: Occupational Therapy (OTD), Nursing, Education, and Certificates. It provides contextual help across the 6-step application process: Personal Information, Academic History, Employment History, Documents Required, Request Official Transcripts, and Review & Submit.

## Story Metrics

| Metric | Value |
|--------|-------|
| **Total User Stories** | 78 |
| **Total Story Points** | 326 |
| **Estimated Sprints (2-week)** | 9-11 |
| **Domains Covered** | 14 |
| **User Personas** | 4 |

## Story Point Distribution by Domain

| # | Domain | Stories | Points |
|---|--------|---------|--------|
| 1 | Widget Presence & Launch | 6 | 24 |
| 2 | Greeting & Orientation | 5 | 21 |
| 3 | Program Information | 6 | 29 |
| 4 | Application Status & Requirements | 5 | 23 |
| 5 | Document Guidance | 5 | 21 |
| 6 | Contextual In-Form Help | 7 | 31 |
| 7 | Deadline & Timeline Information | 5 | 18 |
| 8 | Financial Aid Questions | 5 | 19 |
| 9 | Campus & Location Information | 5 | 16 |
| 10 | Escalation & Handoff | 7 | 31 |
| 11 | Conversation History & Session Management | 5 | 21 |
| 12 | Accessibility & Compliance | 6 | 26 |
| 13 | Analytics & Feedback | 6 | 26 |
| 14 | Admin & Configuration | 5 | 21 |

## Recommended Release Phases

### MVP (Phase 1) -- Sprints 1-4
**Focus:** Core chat functionality, basic Q&A, program information, essential accessibility

| Domain | Stories Included | Points |
|--------|-----------------|--------|
| 1. Widget Presence & Launch | US-001 through US-006 (All) | 24 |
| 2. Greeting & Orientation | US-007 through US-011 (All) | 21 |
| 3. Program Information | US-012 through US-015 | 20 |
| 6. Contextual In-Form Help | US-030, US-031 | 10 |
| 11. Conversation History | US-053, US-054 | 8 |
| 12. Accessibility | US-059, US-060 | 8 |

**MVP Estimated Points:** ~91 points

### Phase 2 -- Sprints 5-7
**Focus:** Application intelligence, document guidance, escalation, deadlines

| Domain | Stories Included | Points |
|--------|-----------------|--------|
| 4. Application Status & Requirements | US-018 through US-022 (All) | 23 |
| 5. Document Guidance | US-023 through US-027 (All) | 21 |
| 6. Contextual In-Form Help | US-028, US-029, US-032, US-033, US-034 | 21 |
| 7. Deadline & Timeline | US-035 through US-039 (All) | 18 |
| 10. Escalation & Handoff | US-050 through US-056 (All) | 31 |

**Phase 2 Estimated Points:** ~114 points

### Phase 3 -- Sprints 8-11
**Focus:** Advanced features, analytics, admin tools, remaining accessibility

| Domain | Stories Included | Points |
|--------|-----------------|--------|
| 3. Program Information | US-016, US-017 (Remaining) | 9 |
| 8. Financial Aid Questions | US-040 through US-044 (All) | 19 |
| 9. Campus & Location | US-045 through US-049 (All) | 16 |
| 11. Conversation History | US-055, US-056, US-057 (Remaining) | 13 |
| 12. Accessibility | US-061, US-062, US-063, US-064 (Remaining) | 18 |
| 13. Analytics & Feedback | US-065 through US-070 (All) | 26 |
| 14. Admin & Configuration | US-071 through US-075 (All) | 21 |

**Phase 3 Estimated Points:** ~122 points

## Key Technical Dependencies

1. **Salesforce Experience Cloud** -- LWR or Aura site template with custom LWC support enabled
2. **Salesforce Einstein / Agentforce License** -- Required for native AI capabilities; if unavailable, external LLM integration via Apex callout
3. **LLM API Integration** -- Anthropic Claude API or OpenAI GPT via Named Credential and Apex HTTP callout
4. **Salesforce Objects** -- Application__c, Document__c, Program__c, Contact, Lead, Case, Knowledge__kav
5. **Salesforce Knowledge** -- Enabled with Data Categories for FAQ and program content management
6. **Apex Classes** -- Custom controllers for application status, document validation, chat orchestration
7. **Platform Events** -- For real-time analytics, escalation triggers, and system health monitoring
8. **Named Credentials** -- Secure storage for LLM API keys and external service authentication

---

# DOMAIN 1 -- WIDGET PRESENCE & LAUNCH

---

## US-001: Ask Journey Button Display in Navigation Bar

**Title:** Display Ask Journey Button in Application Navigation

**As a** prospective or active applicant,
**I want to** see a persistent "Ask Journey" button in the top navigation bar of the OLA 2.0 application,
**so that** I can easily access AI assistance at any point during my application process.

**Acceptance Criteria:**
- [ ] "Ask Journey" button is displayed in the top navigation bar on all application pages
- [ ] Button includes a sparkle/AI icon and "Ask Journey" text label
- [ ] Button uses branded styling: gradient background (teal #00677F to purple #7B68EE at 20% opacity), rounded-full shape
- [ ] Button is positioned to the right of the "Save" button and left of user profile menu
- [ ] Button remains visible and accessible across all 6 application steps
- [ ] Button includes subtle hover animation (border glow effect, scale 1.02)

**Salesforce/Technical Notes:**
- Implement as Lightning Web Component (LWC) embedded in Experience Cloud header region
- Use `lightning-button` with custom CSS styling via static resource
- Component should be added to the Experience Builder page template header slot
- Ensure button visibility is controlled by user permission set (Applicant_Portal_User)
- CSS should use `@import` from a static resource to maintain Salesforce CSP compliance

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
- [ ] Opening the panel does not trigger page reload or navigation

**Salesforce/Technical Notes:**
- Use `lightning-modal` or custom LWC overlay component
- Implement `@api` method `openChat()` for external triggering from nav bar component
- Store panel open/closed state in component property, not Salesforce record
- Use CSS `@keyframes` for slide-in animation; avoid inline styles for CSP compliance
- Communicate between nav button and panel via Lightning Message Service (LMS) channel

**Priority:** High
**Story Points:** 5

---

## US-003: Close and Minimize Chat Panel

**Title:** Close or Minimize Chat Panel

**As an** applicant,
**I want to** close or minimize the Ask Journey chat panel,
**so that** I can return to my application without losing my conversation context.

**Acceptance Criteria:**
- [ ] Clicking the X button closes the chat panel with slide-out animation (200ms ease-in)
- [ ] Clicking the dark backdrop outside the panel closes it
- [ ] When closed, the "Ask Journey" button remains visible in the navigation
- [ ] Conversation history is preserved when panel is closed and reopened within the same session
- [ ] A minimize button allows the panel to collapse to a small floating icon in the bottom-right corner
- [ ] Minimized state shows Journey avatar icon that re-expands the chat on click
- [ ] Keyboard shortcut (Escape key) closes the panel

**Salesforce/Technical Notes:**
- Store conversation state in component-level JavaScript variable (not Salesforce record)
- Use `sessionStorage` for persistence across Experience Cloud page navigation within session
- Implement `@api` method `closeChat()` for programmatic closing
- Add event listener for `keydown` to handle Escape key; remove listener on `disconnectedCallback()`

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
- [ ] If chat panel is minimized, it remains minimized during navigation
- [ ] Conversation context (messages, user queries) is maintained for the duration of the browser session
- [ ] Navigation within OLA 2.0 does not trigger a new conversation thread
- [ ] Only a full page refresh or explicit logout clears the conversation

**Salesforce/Technical Notes:**
- Use `sessionStorage` to persist conversation JSON across Experience Cloud page loads
- Implement `connectedCallback()` to restore state on component mount after navigation
- Consider Platform Cache (Session partition) for server-side session storage if needed
- Use Lightning Navigation event listener to detect step changes and update Journey's context variable

**Priority:** High
**Story Points:** 5

---

## US-005: Mobile Responsive Chat Panel

**Title:** Mobile-Optimized Ask Journey Experience

**As an** applicant using a mobile device,
**I want** the Ask Journey chat to be fully functional and easy to use on my phone or tablet,
**so that** I can get assistance regardless of the device I'm using.

**Acceptance Criteria:**
- [ ] On mobile (< 768px), chat panel expands to full screen width and height
- [ ] On mobile, "Ask Journey" button text is hidden; only icon is shown to conserve navbar space
- [ ] Touch gestures work correctly (scroll, tap, swipe to dismiss)
- [ ] Virtual keyboard does not obscure the input field when typing; input auto-scrolls above keyboard
- [ ] Chat messages are readable without horizontal scrolling
- [ ] Panel height adjusts to account for mobile browser chrome (URL bar, navigation bar)
- [ ] Minimum touch target size of 44x44px for all interactive elements (per Apple HIG and WCAG)
- [ ] Tablet (768-1024px) shows a medium-width panel (80% screen width)

**Salesforce/Technical Notes:**
- Use CSS media queries with Salesforce SLDS breakpoints (`$mq-medium: 768px`)
- Test on iOS Safari and Android Chrome for keyboard behavior differences
- Use `visualViewport` API to handle keyboard appearance and adjust layout dynamically
- Implement `@media (max-width: 768px)` rules in component CSS; avoid `!important` where possible

**Priority:** High
**Story Points:** 5

---

## US-006: Chat Panel Loading State

**Title:** Display Loading State While Chat Initializes

**As an** applicant,
**I want to** see a loading indicator when the chat panel is initializing or when Journey is processing my request,
**so that** I know the system is working and I should wait for a response.

**Acceptance Criteria:**
- [ ] When chat panel first opens, a brief loading spinner is shown while the LLM initializes
- [ ] When a message is sent, a typing indicator (three animated dots) appears in the chat area
- [ ] Loading state is visually distinct (pulsing avatar glow, animated dots with branded colors)
- [ ] Loading state does not block user from typing a follow-up message in the input field
- [ ] If loading takes > 10 seconds, display a timeout message: "Journey is taking longer than usual. Please try again."
- [ ] Timeout message includes a "Retry" button
- [ ] Loading indicators meet WCAG 2.1 AA contrast requirements

**Salesforce/Technical Notes:**
- Use `lightning-spinner` with `variant="brand"` for initial load
- Implement custom CSS animation for typing indicator dots (three-dot bounce)
- Set `setTimeout` for 10-second timeout handling; clear on response
- Show loading state via conditional rendering (`if:true` / `if:false`) in LWC template

**Priority:** Medium
**Story Points:** 3

---

# DOMAIN 2 -- GREETING & ORIENTATION

---

## US-007: Journey Welcome Message

**Title:** Display Personalized Welcome Message

**As an** applicant opening Ask Journey for the first time in a session,
**I want to** receive a friendly welcome message from Journey,
**so that** I understand what the assistant can help me with and feel welcomed.

**Acceptance Criteria:**
- [ ] On first open, Journey displays: "Hi! I'm Journey, your AI assistant for the USA.edu application process. I'm here to help you navigate your path to a healthcare career."
- [ ] Welcome message appears with a subtle fade-in animation (400ms)
- [ ] For authenticated users, message includes their first name: "Hi [First Name]! I'm Journey..."
- [ ] Message is followed by "Here's what I can help you with:" capability list
- [ ] Journey avatar (gradient circle with sparkle icon) is displayed next to the message
- [ ] Welcome message only appears once per session (subsequent opens show conversation history)

**Salesforce/Technical Notes:**
- Retrieve user first name from `User.FirstName` or `Contact.FirstName` via Apex controller
- Store "hasSeenWelcome" flag in `sessionStorage`
- Use `@wire` adapter to get current user context; null-safe check for guest users
- Implement in `renderedCallback()` with a one-time flag to prevent re-animation

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
- [ ] Each capability is styled as a subtle list item with a checkmark or info icon
- [ ] Capability list appears with staggered animation (each item fades in sequentially, 100ms delay per item)
- [ ] List is displayed only once after the welcome message (not repeated on re-open)
- [ ] User can scroll past capabilities to view quick-action chips below

**Salesforce/Technical Notes:**
- Implement as static HTML within the greeting message component template
- Use CSS `animation-delay` for staggered effect (0ms, 100ms, 200ms, etc.)
- Store capability list in a Salesforce Custom Metadata Type (`Journey_Capability__mdt`) for admin updates
- Consider making capabilities dynamic based on user type (guest shows 4 items; authenticated shows 5 including "Check your application status")

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
- [ ] Chips are styled as pill-shaped buttons with subtle border and background (branded teal/purple tones)
- [ ] Clicking a chip sends that question as if the user typed it; chip text appears as a user message
- [ ] Chips disappear or collapse into a "Show suggestions" link after first user interaction
- [ ] Chips are keyboard-accessible (Tab to navigate, Enter/Space to select)
- [ ] Chips re-appear when conversation is cleared or reset

**Salesforce/Technical Notes:**
- Implement chips as `lightning-button` components with `variant="neutral"` and custom CSS class
- Store chip text in Custom Metadata Type (`Journey_Quick_Action__mdt`) for admin configurability
- Conditionally render "Check my application status" by checking `isAuthenticated` via `@wire(getRecord)` on User
- Dispatch custom event `chipselected` with chip value as payload; parent handles as chat input

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
- [ ] If user has an in-progress application, Journey mentions: "You're currently on Step [X] -- [Step Name]."
- [ ] Quick-action chips are prioritized based on current application step (e.g., document chips on Step 4)
- [ ] If application is complete/submitted, Journey says: "Your application has been submitted! I can help you check its status."
- [ ] Guest users receive a generic greeting without application context
- [ ] Personalization data is fetched in < 2 seconds after panel opens

**Salesforce/Technical Notes:**
- Create Apex controller `JourneyContextController` with `@AuraEnabled(cacheable=true)` method `getApplicantContext()`
- Query `Application__c` where `Contact__c = :currentContactId` and `Status__c != 'Submitted'`
- Return wrapper class with fields: `programName`, `currentStep`, `applicationStatus`, `submittedDate`
- Use `@wire` decorator with caching enabled for performance; refresh on panel open

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
- [ ] If application was last updated > 30 days ago, Journey notes: "It's been a while since your last visit. Let me know if anything has changed or if you have new questions."
- [ ] Quick chip offered: "Continue my application"
- [ ] If user has multiple applications, Journey asks: "I see you have [X] applications. Which one would you like to work on?"

**Salesforce/Technical Notes:**
- Query `Application__c.LastModifiedDate` to determine "returning" status
- Use SOQL with `ORDER BY LastModifiedDate DESC LIMIT 5` for multiple applications
- Store last interaction timestamp in custom field `Application__c.Last_Journey_Interaction__c` (DateTime)
- Implement date comparison logic in Apex controller to calculate days since last update

**Priority:** Medium
**Story Points:** 5

---

# DOMAIN 3 -- PROGRAM INFORMATION

---

## US-012: General Program Overview Query

**Title:** Answer General "Tell Me About Programs" Query

**As a** prospective applicant,
**I want to** ask Journey about USA Health Sciences programs in general,
**so that** I can understand my options before deciding which to apply for.

**Acceptance Criteria:**
- [ ] When user asks "Tell me about the programs" or similar, Journey provides an overview of all offerings
- [ ] Response lists all four program categories: Occupational Therapy (OTD), Nursing, Education, and Certificates
- [ ] Each program includes a 1-2 sentence description highlighting key differentiators
- [ ] Journey offers follow-up: "Would you like more details about any specific program?"
- [ ] Response includes clickable program names that trigger detailed information when selected
- [ ] If user is authenticated with a selected program, that program is highlighted first in the list

**Salesforce/Technical Notes:**
- Create Salesforce Knowledge articles for each program category with Data Category: Programs
- Use Einstein Search or SOSL to match user query to Knowledge articles by keyword
- Return structured response from `Program__c` custom object fields: Name, Description__c, Type__c
- Implement intent classification in prompt engineering to detect "program information" queries

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
- [ ] Journey can answer: "How long is the OTD program?" (e.g., "The entry-level OTD program is approximately 3 years")
- [ ] Journey can answer: "What is the OTD tuition cost?" (provides per-credit or total estimate)
- [ ] Journey can answer: "Which campuses offer OTD?" (lists all applicable campuses)
- [ ] Journey can answer: "What careers can I pursue with an OTD?" (career outcomes and licensure info)
- [ ] Journey provides accurate, up-to-date information sourced from Salesforce Knowledge base
- [ ] If specific data is unavailable, Journey says: "I don't have that detail right now, but I can connect you with an admissions advisor who specializes in OTD."

**Salesforce/Technical Notes:**
- Create Knowledge article: "OTD_Program_FAQ" with Data Category: Programs > OTD
- Include custom fields: Prerequisites__c, Duration__c, Tuition__c, Campuses__c (multi-select), Career_Outcomes__c
- Use parameterized query: `SELECT ... FROM Knowledge__kav WHERE Program__c = 'OTD' AND PublishStatus = 'Online'`
- Enable Einstein Article Recommendations for related content surfacing

**Priority:** High
**Story Points:** 5

---

## US-014: Nursing Program Specific Information

**Title:** Provide Nursing Program Details

**As a** prospective Nursing applicant,
**I want to** ask Journey about MSN, DNP, and other nursing pathways,
**so that** I can understand the different nursing degree options available.

**Acceptance Criteria:**
- [ ] Journey differentiates between MSN (Master of Science in Nursing) and DNP (Doctor of Nursing Practice) programs
- [ ] Journey can answer: "What's the difference between MSN and DNP?" (comparison of scope, duration, career outcomes)
- [ ] Journey can answer: "What are the prerequisites for the nursing program?" (GPA, licensure, clinical hours)
- [ ] Journey can answer: "Is the nursing program available online?" (explains hybrid/online options)
- [ ] Journey explains specialty tracks if applicable (e.g., Family Nurse Practitioner, Nurse Executive)
- [ ] Journey provides clinical hour requirements and fieldwork expectations if asked

**Salesforce/Technical Notes:**
- Create separate Knowledge articles for MSN and DNP under Data Category: Programs > Nursing
- Link related articles via `Related_Programs__c` lookup field for cross-referencing
- Implement sub-intent detection in prompt engineering for "MSN vs DNP" comparison queries
- Include structured data for clinical requirements: `Clinical_Hours__c`, `Fieldwork_Sites__c`

**Priority:** High
**Story Points:** 5

---

## US-015: Education Program Specific Information

**Title:** Provide Education Program Details

**As a** prospective Education applicant,
**I want to** ask Journey about EdD and MS Education programs,
**so that** I can understand how these degrees advance my career in healthcare education.

**Acceptance Criteria:**
- [ ] Journey can explain the EdD (Doctor of Education) program focus and target audience
- [ ] Journey can explain the MS in Education program options and specializations
- [ ] Journey can answer: "Who is the Education program designed for?" (working professionals, career changers)
- [ ] Journey can answer: "Can I complete the Education program while working?" (flexible scheduling info)
- [ ] Journey explains the difference between clinical and non-clinical education tracks
- [ ] Journey provides admission requirements specific to Education programs (GPA, essays, experience)

**Salesforce/Technical Notes:**
- Create Knowledge articles for EdD and MS Education under Data Category: Programs > Education
- Tag articles with `Audience__c` picklist (e.g., "Working Professionals", "Career Changers", "Current Educators")
- Include program format information: online, hybrid, on-campus in `Delivery_Format__c` field

**Priority:** Medium
**Story Points:** 5

---

## US-016: Certificate Program Information

**Title:** Provide Certificate Program Details

**As a** prospective student interested in specialized training,
**I want to** ask Journey about certificate programs,
**so that** I can explore shorter-term credentials that enhance my healthcare career.

**Acceptance Criteria:**
- [ ] Journey can list available certificate programs with brief descriptions
- [ ] Journey can answer: "How long are the certificate programs?" (typical duration for each)
- [ ] Journey can answer: "Do certificates count toward a degree?" (stackable credentials info)
- [ ] Journey explains the difference between professional and advanced certificates
- [ ] Journey provides information on certificate-to-degree pathways if available
- [ ] Journey clarifies whether certificates require prior healthcare experience or licensure

**Salesforce/Technical Notes:**
- Use `Program__c` with RecordType "Certificate" or create `Certificate__c` custom object
- Include fields: Duration__c, Stackable__c (checkbox for degree credit), Prerequisites__c, Format__c
- Query with filter: `WHERE RecordType.Name = 'Certificate' AND IsActive__c = TRUE`

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
- [ ] Comparison includes: duration, tuition range, career outcomes, prerequisites, delivery format
- [ ] Response is formatted as a clear, structured comparison (bullet points per program)
- [ ] Journey asks clarifying questions if comparison is ambiguous: "Would you like to compare specific degree levels (e.g., OTD vs. DNP)?"
- [ ] Journey can compare across program types (e.g., OTD vs. Certificate in Hand Therapy)
- [ ] Comparison data is dynamically pulled from Salesforce records, not hardcoded

**Salesforce/Technical Notes:**
- Create Apex method `comparePrograms(List<String> programNames)` returning wrapper class
- Return `ProgramComparisonWrapper` with side-by-side data structure for each program
- Use dynamic SOQL to fetch requested program records from `Program__c`
- Implement NLP entity extraction in prompt engineering to identify program names in user query

**Priority:** Low
**Story Points:** 8

---

# DOMAIN 4 -- APPLICATION STATUS & REQUIREMENTS

---

## US-018: Check Application Status

**Title:** Provide Current Application Status

**As an** authenticated applicant,
**I want to** ask Journey "What is my application status?",
**so that** I can understand where my application stands in the review process.

**Acceptance Criteria:**
- [ ] Journey retrieves and displays current application status (e.g., "In Progress", "Submitted", "Under Review", "Decision Made")
- [ ] For "In Progress" applications, Journey shows completion percentage and next action
- [ ] For "Submitted" applications, Journey shows submission date and confirmation
- [ ] For "Under Review" applications, Journey provides estimated review timeline by program
- [ ] For "Decision Made" applications, Journey indicates next steps (e.g., "Check your email for your decision letter")
- [ ] If user has no application, Journey offers: "It looks like you haven't started an application yet. Would you like help getting started?"

**Salesforce/Technical Notes:**
- Query `Application__c.Status__c`, `Application__c.Submitted_Date__c`, `Application__c.Program__c`
- Create formula field `Completion_Percentage__c` based on required fields populated (or calculate in Apex)
- Use Process Builder or Flow to update Status__c based on review milestones
- Restrict query to applications where `Contact__c = :currentUserContactId`

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
  - Step 1: Personal Information -- Complete / Incomplete
  - Step 2: Academic History -- Complete / Incomplete
  - Step 3: Employment History -- Complete / Incomplete
  - Step 4: Documents Required -- Complete / Incomplete
  - Step 5: Request Official Transcripts -- Complete / Incomplete
  - Step 6: Review & Submit -- Complete / Incomplete
- [ ] Journey highlights the next recommended action: "I'd suggest completing Step [X] -- [Step Name] next."
- [ ] Journey provides estimated time to complete remaining steps (e.g., "Steps 3 and 4 typically take about 15 minutes each")
- [ ] For each incomplete step, Journey can explain what specific fields or items are missing if asked

**Salesforce/Technical Notes:**
- Use checkbox fields on `Application__c`: `Step_1_Complete__c` through `Step_6_Complete__c`
- Alternatively, create related `Application_Step__c` junction object per step with `Status__c` picklist
- Calculate completion in Apex controller `getApplicationProgress(Id appId)` returning structured list
- Include estimated time per step in Custom Metadata `Application_Step__mdt`

**Priority:** High
**Story Points:** 5

---

## US-020: Explain What's Needed to Submit

**Title:** Summarize Remaining Requirements for Submission

**As an** authenticated applicant close to completing my application,
**I want to** ask Journey "What do I still need to submit?",
**so that** I can ensure my application is complete before the deadline.

**Acceptance Criteria:**
- [ ] Journey provides a prioritized checklist of missing items:
  - Missing form fields (e.g., "Emergency contact phone number is blank in Step 1")
  - Missing documents (e.g., "Official transcript not yet uploaded in Step 4")
  - Missing signatures/consents (e.g., "Background check consent not yet signed")
- [ ] Journey prioritizes items by deadline impact and required vs. optional
- [ ] Journey offers to explain any requirement the user doesn't understand
- [ ] When all requirements are met, Journey says: "Your application is complete and ready to submit! Head to Step 6 to review and submit."
- [ ] Journey provides a direct navigation suggestion to the step where missing items reside

**Salesforce/Technical Notes:**
- Create Apex method `getSubmissionRequirements(Id appId)` returning list of unmet requirements
- Use `Schema.DescribeFieldResult` to get field labels for user-friendly error messages
- Query `Document__c` where `Application__c = :appId AND Status__c != 'Received'` for missing docs
- Include consent/signature tracking via checkbox fields or separate `Consent__c` object

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
  - OTD: "Typically 2-4 weeks after all materials are received"
  - Nursing: "Rolling review, typically 3-4 weeks"
  - Education: "2-3 weeks during standard admission periods"
  - Certificates: "1-2 weeks"
- [ ] Journey explains factors that may affect timeline (e.g., peak application periods, holidays)
- [ ] Journey clarifies: "The review clock starts once all required documents are received."
- [ ] If materials are still pending, Journey notes: "Your review will begin once we receive [specific missing item]."
- [ ] Journey offers: "I'll do my best to keep you posted. You can always ask me for an update."

**Salesforce/Technical Notes:**
- Store review timelines in `Program__c.Typical_Review_Days__c` (Number field)
- Create Custom Metadata Type `Review_Timeline__mdt` for admin-configurable values per program
- Display dynamic timeline based on `Application__c.Program__c` lookup
- Cross-reference `Document__c` records to determine if all materials received

**Priority:** Medium
**Story Points:** 3

---

## US-022: Application Requirements by Program

**Title:** List Program-Specific Application Requirements

**As a** prospective applicant who has not yet started,
**I want to** ask Journey what's required to apply for a specific program,
**so that** I can gather all necessary materials before starting my application.

**Acceptance Criteria:**
- [ ] Journey can answer: "What do I need to apply for the OTD program?" (or any program)
- [ ] Response includes:
  - Academic prerequisites (e.g., "Bachelor's degree with minimum 3.0 cumulative GPA")
  - Required documents (e.g., "Official transcripts, 3 letters of recommendation, personal statement")
  - Test scores if applicable (e.g., "GRE not required for OTD")
  - Experience requirements (e.g., "40+ documented observation hours in an OT setting")
- [ ] Requirements are program-specific, not generic
- [ ] Journey distinguishes between required vs. recommended items clearly
- [ ] Journey provides links or directions to detailed requirements pages on the university website

**Salesforce/Technical Notes:**
- Create `Program_Requirement__c` object: Program__c (lookup), Type__c (picklist: Academic, Document, Experience, Test Score), Description__c, Required__c (checkbox)
- Query: `SELECT ... FROM Program_Requirement__c WHERE Program__r.Name = :programName ORDER BY Required__c DESC, Type__c`
- Return structured list to LWC for formatted display in chat message

**Priority:** High
**Story Points:** 5

---

# DOMAIN 5 -- DOCUMENT GUIDANCE

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
  - Program-specific items (e.g., observation hour logs for OTD, licensure verification for Nursing)
- [ ] Journey indicates which documents are required vs. optional
- [ ] Journey explains what "official" transcript means (sealed, issued directly from institution registrar)
- [ ] For authenticated users, Journey shows which documents are already uploaded vs. still needed
- [ ] Journey provides document formatting requirements (file types: PDF, DOC, DOCX, JPG, PNG; size limits)

**Salesforce/Technical Notes:**
- Query `Document_Requirement__c` where `Program__c = :selectedProgram`
- Left outer join with `Document__c` to show uploaded status for authenticated users
- Include fields: Required__c, Format__c (multi-select), Max_Size_MB__c, Description__c
- Return structured checklist to LWC for rendering with status icons

**Priority:** High
**Story Points:** 5

---

## US-024: Explain Document Formats and Upload Process

**Title:** Provide Document Format and Upload Instructions

**As an** applicant preparing documents for upload,
**I want to** know what file formats are accepted and how to upload them,
**so that** my submissions are processed without issues.

**Acceptance Criteria:**
- [ ] Journey explains accepted file formats: PDF (preferred), DOC, DOCX, JPG, PNG
- [ ] Journey specifies maximum file size: "Individual files must be under 10MB each"
- [ ] Journey provides step-by-step upload instructions: "Navigate to Step 4 (Documents Required), then click 'Upload' next to each document type"
- [ ] Journey troubleshoots common upload issues: "If your upload fails, try reducing the file size, converting to PDF, or using a different browser"
- [ ] Journey explains how to replace a previously uploaded document
- [ ] Journey confirms what happens after upload: "You'll see a green checkmark and confirmation when the document is successfully received"

**Salesforce/Technical Notes:**
- Store format requirements in Custom Metadata `Document_Format__mdt` (configurable without code)
- Reference Salesforce Files size limits (may vary by org; default 2GB but Experience Cloud may differ)
- Include help text in document upload LWC component tooltip linking to Journey
- Log upload errors to `Document_Upload_Log__c` for admin troubleshooting

**Priority:** Medium
**Story Points:** 3

---

## US-025: Check Document Receipt Status

**Title:** Confirm Document Receipt Status

**As an** authenticated applicant who has uploaded documents,
**I want to** ask Journey if my documents have been received and verified,
**so that** I can confirm my application materials are complete.

**Acceptance Criteria:**
- [ ] Journey can answer: "Did you receive my transcripts?" or "What's the status of my documents?"
- [ ] Journey checks and responds per document:
  - "We received your official transcript from [Institution] on [Date]."
  - "We're still waiting for your transcript from [Institution]."
- [ ] Journey lists all expected documents with current receipt/verification status
- [ ] For uploaded documents, Journey shows upload date and processing status (Pending Review, Verified, Rejected)
- [ ] For mailed/e-transcripts, Journey explains typical processing time (3-5 business days after receipt)
- [ ] Journey differentiates between "received" and "verified/approved" statuses

**Salesforce/Technical Notes:**
- Query `Document__c` where `Application__c = :appId`
- Include fields: Type__c, Status__c (Pending, Received, Verified, Rejected), Received_Date__c, Source_Institution__c
- Use `@wire` with `refreshApex()` for real-time updates on re-query
- Consider Platform Events to push document status updates to open chat panels

**Priority:** High
**Story Points:** 5

---

## US-026: Transcript Request Guidance

**Title:** Explain How to Request Official Transcripts

**As an** applicant who needs to submit transcripts from previous institutions,
**I want** Journey to explain how to request official transcripts,
**so that** I can complete this requirement efficiently.

**Acceptance Criteria:**
- [ ] Journey explains: "Official transcripts must be sent directly from your previous institution to USAHS"
- [ ] Journey provides common transcript ordering services: "Many schools use Parchment, National Student Clearinghouse, or eSCRIP-SAFE"
- [ ] Journey provides the mailing address for physical transcripts and email/portal for e-transcripts
- [ ] Journey clarifies: "Unofficial transcripts can be uploaded initially for review, but official versions must be received before enrollment"
- [ ] Journey offers step-by-step guidance for Step 5 (Request Official Transcripts) of the application
- [ ] Journey can answer: "How do I know if my transcript was received?" (directs to document status check)

**Salesforce/Technical Notes:**
- Store transcript submission methods in Knowledge article "How to Request Official Transcripts"
- Include `Transcript_Vendor__c` picklist on `Document__c` for tracking delivery method
- Store USAHS transcript receiving email/address in Custom Settings `Transcript_Settings__c`
- Link to Step 5 navigation when user is authenticated

**Priority:** Medium
**Story Points:** 3

---

## US-027: Letters of Recommendation Guidance

**Title:** Explain Letters of Recommendation Process

**As an** applicant needing letters of recommendation,
**I want** Journey to explain the recommendation process,
**so that** I can request them from appropriate references and track submission.

**Acceptance Criteria:**
- [ ] Journey explains how many letters are required per program (e.g., "OTD requires 3 letters; Nursing requires 2")
- [ ] Journey describes ideal recommenders: "Professional or academic references who can speak to your qualifications and potential in healthcare"
- [ ] Journey explains the submission process:
  - Applicant enters recommender's name and email in the application
  - System sends automated request email to recommender with secure submission link
  - Recommender submits letter via the portal
- [ ] Journey can check status: "1 of 3 recommendation letters have been received"
- [ ] Journey offers to resend recommendation request emails if recommender hasn't responded
- [ ] Journey explains deadline: "All letters should be received by [deadline] for your application to be considered complete"

**Salesforce/Technical Notes:**
- Create `Recommendation__c` object: Recommender_Name__c, Recommender_Email__c, Status__c (Requested, Received, Waived), Submitted_Date__c, Application__c (lookup)
- Implement automated email via Flow triggered on Recommendation__c insert
- Create "Resend Request" invocable Apex action
- Track email delivery via Salesforce Email Tracking if enabled

**Priority:** Medium
**Story Points:** 5

---

# DOMAIN 6 -- CONTEXTUAL IN-FORM HELP

---

## US-028: Detect Current Application Step

**Title:** Identify User's Current Application Step for Context

**As** the Journey AI system,
**I need to** detect which step of the application the user is currently viewing,
**so that** I can provide contextually relevant assistance without the user specifying their location.

**Acceptance Criteria:**
- [ ] Journey detects current step from URL parameter or page context variable
- [ ] Journey updates internal context when user navigates between steps (Step 1 through Step 6)
- [ ] Context detection covers: Step 1 (Personal Information), Step 2 (Academic History), Step 3 (Employment History), Step 4 (Documents Required), Step 5 (Request Official Transcripts), Step 6 (Review & Submit)
- [ ] If detection fails, Journey asks: "Which section of your application are you working on?"
- [ ] Step context is included in all LLM prompts for relevant, step-aware responses
- [ ] Context detection does not add noticeable latency (< 100ms) to chat interactions

**Salesforce/Technical Notes:**
- Use `@wire(CurrentPageReference)` in LWC to get current page reference
- Parse URL for step number: `/application/{appId}/step/{stepNumber}`
- Store step context in component property, pass to Apex controller with each chat request
- Publish step context via Lightning Message Service (LMS) to decouple navigation from chat component

**Priority:** High
**Story Points:** 5

---

## US-029: Proactive Help Offer Based on Step

**Title:** Proactively Offer Help When User Enters a New Step

**As an** applicant navigating to a new application step,
**I want** Journey to proactively acknowledge my location and offer relevant help,
**so that** I know the assistant is context-aware and available.

**Acceptance Criteria:**
- [ ] When user navigates to a new step, Journey (if open) displays a subtle message: "I see you're now on [Step Name]. Need any help here?"
- [ ] Proactive message only appears if chat panel is already open
- [ ] Message includes 1-2 step-relevant quick-action chips (e.g., on Step 4: "What documents do I need?")
- [ ] Proactive messages do not appear if user is actively typing
- [ ] Each step's proactive message appears only once per session to avoid repetition
- [ ] User can disable proactive messages via a "Don't show tips" option

**Salesforce/Technical Notes:**
- Subscribe to LMS channel published by step navigation component
- Implement `hasShownProactiveMessage` map keyed by step number in `sessionStorage`
- Display message with subtle CSS animation (slide-in from top of chat area)
- Include admin-configurable proactive messages in `Application_Step__mdt` Custom Metadata

**Priority:** Medium
**Story Points:** 5

---

## US-030: Step 1 Personal Information Help

**Title:** Provide Help for Personal Information Fields

**As an** applicant on Step 1 (Personal Information),
**I want** Journey to explain specific fields or sections I have questions about,
**so that** I can accurately complete my personal information without confusion.

**Acceptance Criteria:**
- [ ] Journey can explain "Judicial Background" section: "This section asks about any criminal history. Answering 'yes' does not automatically disqualify you -- each situation is reviewed individually and confidentially."
- [ ] Journey can explain "Citizenship & Identification": "We collect this for federal reporting requirements and to determine eligibility for certain programs, financial aid, and visa sponsorship."
- [ ] Journey can explain "US Military Background": "Veteran or active-duty status may qualify you for military education benefits, Yellow Ribbon programs, or specialized tracks."
- [ ] Journey can explain "Emergency Contact": "This person will be contacted only in case of an emergency during your enrollment."
- [ ] Journey can explain "Work Experience": "Include healthcare-related work experience to strengthen your application."
- [ ] Journey answers in a reassuring, non-judgmental tone for sensitive topics (judicial, military)

**Salesforce/Technical Notes:**
- Create `Field_Help__c` custom object: Field_API_Name__c, Help_Text__c, Step__c (picklist), Sensitivity_Level__c
- Query help text dynamically based on keyword matching from user question
- Use sentiment-aware response templates for sensitive topics (pre-approved by compliance)
- Step context from US-028 ensures relevant help is returned for Step 1 queries

**Priority:** High
**Story Points:** 5

---

## US-031: Step 2 Academic History Help

**Title:** Provide Help for Academic History Section

**As an** applicant on Step 2 (Academic History),
**I want** Journey to help me understand what academic information is required,
**so that** I can accurately report my educational background.

**Acceptance Criteria:**
- [ ] Journey can explain what "post-secondary education" includes (any education after high school: college, university, trade school)
- [ ] Journey can answer: "Do I need to list all schools I attended?" (Yes, all post-secondary institutions)
- [ ] Journey can explain GPA requirements and how to calculate cumulative GPA if needed
- [ ] Journey can clarify: "What if I don't remember my exact graduation date?" (provide month/year estimate)
- [ ] Journey explains prerequisite course requirements and how to indicate completion status
- [ ] Journey helps with international education: "I studied outside the US -- how do I report that?" (reference WES or ECE credential evaluation)

**Salesforce/Technical Notes:**
- Create Knowledge article "Academic History FAQ" under Data Category: Application Help > Academic
- Include GPA calculator guidance or link to external GPA calculator tool
- Reference WES (World Education Services) and ECE (Educational Credential Evaluators) for international credentials
- Detect academic-related keywords in user query for intent matching

**Priority:** High
**Story Points:** 5

---

## US-032: Step 3 Employment History Help

**Title:** Provide Help for Employment History Section

**As an** applicant on Step 3 (Employment History),
**I want** Journey to explain what employment information is needed and why,
**so that** I can provide accurate and complete work history details.

**Acceptance Criteria:**
- [ ] Journey can explain why employment history is collected: "We want to understand your professional background, especially any healthcare experience that strengthens your application."
- [ ] Journey can answer: "How far back should I go?" (Include all relevant positions; at minimum the last 5 years or all healthcare experience)
- [ ] Journey can explain: "What counts as healthcare experience?" (clinical, administrative, volunteer work in healthcare settings)
- [ ] Journey helps with employment verification: "We may contact your employer to verify dates of employment."
- [ ] Journey clarifies hours: "Enter approximate weekly hours if exact figures aren't available."
- [ ] Journey addresses gaps: "Gaps in employment are normal. Just provide accurate dates for the positions you held."

**Salesforce/Technical Notes:**
- Store help content in Knowledge articles tagged with Data Category: Application Help > Employment
- Calculate total healthcare hours from `Employment__c` records if required for program eligibility
- Include tooltip integration in the Employment History LWC form component linking to Journey

**Priority:** Medium
**Story Points:** 3

---

## US-033: Step 4 Documents Help

**Title:** Provide Contextual Help for Document Uploads

**As an** applicant on Step 4 (Documents Required),
**I want** Journey to help me understand each document requirement and troubleshoot upload issues,
**so that** I upload the correct documents in the right format.

**Acceptance Criteria:**
- [ ] Journey can explain each document type when asked:
  - "What should my personal statement include?" (content guidance, length, format)
  - "What makes a good letter of recommendation?" (who to ask, what to request)
  - "Can I submit an unofficial transcript initially?" (yes for review; official required before enrollment)
- [ ] Journey detects if user has been on document step for > 5 minutes without uploads and proactively offers help
- [ ] Journey provides links to sample documents or templates if approved for sharing
- [ ] Journey troubleshoots upload errors: "What does 'file too large' mean?" (reduce size, convert format, try different browser)
- [ ] Journey confirms successful uploads: "I can see you've uploaded your resume -- nice work!"

**Salesforce/Technical Notes:**
- Implement proactive help trigger based on time-on-page tracking (e.g., > 5 minutes without `Document__c` insert)
- Use `@wire` to monitor document upload events via Platform Events (`Document_Uploaded__e`)
- Link to approved sample documents in Salesforce Files if available
- Include document-specific validation error messages from `Document_Requirement__c`

**Priority:** Medium
**Story Points:** 5

---

## US-034: Step 5 Transcript Request Help

**Title:** Provide Help for Official Transcript Requests

**As an** applicant on Step 5 (Request Official Transcripts),
**I want** Journey to guide me through requesting transcripts from my previous institutions,
**so that** I can complete this requirement correctly and on time.

**Acceptance Criteria:**
- [ ] Journey explains the transcript request process step-by-step
- [ ] Journey can answer: "What's the difference between official and unofficial transcripts?"
- [ ] Journey provides institution-specific guidance if the institution is in USAHS database (e.g., common ordering portals)
- [ ] Journey clarifies electronic vs. mailed transcripts and which formats USAHS accepts
- [ ] Journey explains timing: "Request transcripts as soon as possible -- processing can take 2-4 weeks"
- [ ] Journey tracks and reports which transcripts have been requested vs. received for the user's application

**Salesforce/Technical Notes:**
- Create `Institution__c` reference object with transcript ordering info and common vendor links
- Include common transcript vendors (Parchment, NSC) with direct URLs
- Store USAHS transcript receiving email/address in Custom Settings
- Query `Transcript_Request__c` records linked to Application to show request/receipt status

**Priority:** Medium
**Story Points:** 3

---

## US-035: Step 6 Review & Submit Help

**Title:** Provide Help for Final Review and Submission

**As an** applicant on Step 6 (Review & Submit),
**I want** Journey to help me review my complete application and understand the submission process,
**so that** I can submit with confidence.

**Acceptance Criteria:**
- [ ] Journey summarizes application completion status: "Your application is [X]% complete"
- [ ] Journey highlights any missing or incomplete items that will prevent submission
- [ ] Journey explains what happens after submission: "Your application will be reviewed by our admissions team within [X] weeks."
- [ ] Journey answers: "Can I edit my application after submitting?" (No; contact admissions for changes)
- [ ] Journey explains the certification statement the user is signing (honesty pledge, consent to background check)
- [ ] Journey celebrates successful submission: "Congratulations on submitting your application to [Program]! You'll receive a confirmation email shortly."

**Salesforce/Technical Notes:**
- Run validation check via `validateApplicationForSubmission(Id appId)` Apex method returning issues list
- If issues list is empty, enable "Submit" button in LWC; display issues to user if not
- Trigger confirmation email via Flow on `Application__c.Status__c` update to "Submitted"
- Set `Application__c.Submitted_Date__c = System.now()` on submission

**Priority:** Medium
**Story Points:** 5

---

# DOMAIN 7 -- DEADLINE & TIMELINE INFORMATION

---

## US-036: Program-Specific Application Deadlines

**Title:** Provide Application Deadline Information

**As a** prospective applicant,
**I want to** ask Journey about application deadlines for my program of interest,
**so that** I can plan my application timeline accordingly.

**Acceptance Criteria:**
- [ ] Journey provides program-specific deadlines when asked: "When is the deadline for the OTD program?"
- [ ] Journey explains if deadlines vary by campus location or start term
- [ ] Journey clarifies "priority" vs. "final" deadlines if applicable
- [ ] Journey shows upcoming deadlines in chronological order: "The next OTD deadline is [Date] for the [Term] [Year] cohort."
- [ ] Journey warns when deadlines are approaching: "The deadline for [Program] [Term] admission is in [X] days!"
- [ ] Journey explains what happens if a deadline is missed (rolling admissions, next available term)

**Salesforce/Technical Notes:**
- Create `Admission_Deadline__c` object: Program__c (lookup), Term__c, Deadline_Date__c (Date), Type__c (Priority/Final), Campus__c
- Query: `WHERE Deadline_Date__c >= TODAY ORDER BY Deadline_Date__c ASC`
- Include deadline reminders in automated email campaigns if applicable
- Cross-reference user's selected program to show most relevant deadlines first

**Priority:** High
**Story Points:** 5

---

## US-037: Rolling Admissions Explanation

**Title:** Explain Rolling Admissions Process

**As a** prospective applicant unfamiliar with rolling admissions,
**I want** Journey to explain how rolling admissions works at USAHS,
**so that** I understand when to apply and when to expect a decision.

**Acceptance Criteria:**
- [ ] Journey explains: "Rolling admissions means we review applications as they're received, rather than waiting for a single deadline."
- [ ] Journey clarifies: "The earlier you apply, the earlier you'll receive a decision and the better your chances of securing a spot."
- [ ] Journey notes: "Program seats are limited -- applying early is always recommended."
- [ ] Journey differentiates which programs use rolling vs. deadline-based admissions
- [ ] Journey provides typical decision turnaround: "Decisions are typically made within [X] weeks of receiving a complete application."

**Salesforce/Technical Notes:**
- Store admission type on `Program__c.Admission_Type__c` (picklist: Rolling, Deadline-Based, Hybrid)
- Create Knowledge article "What is Rolling Admissions?" for detailed explanation
- Include admission type context in personalized deadline responses

**Priority:** Medium
**Story Points:** 2

---

## US-038: Financial Aid Deadlines

**Title:** Provide Financial Aid Deadline Information

**As an** applicant seeking financial aid,
**I want** Journey to tell me about financial aid deadlines,
**so that** I don't miss important dates for FAFSA, scholarships, or institutional aid.

**Acceptance Criteria:**
- [ ] Journey provides FAFSA deadline guidance: "The FAFSA opens October 1 each year. Submit as early as possible for maximum aid consideration."
- [ ] Journey explains institutional aid deadlines if they differ from application deadlines
- [ ] Journey mentions scholarship application deadlines with specific dates
- [ ] Journey clarifies: "You can start your FAFSA before your application is complete. Use our school code: [XXXXXX]."
- [ ] Journey warns when financial aid deadlines are approaching (within 30 days)
- [ ] Journey explains consequences of missing aid deadlines (reduced aid availability, waitlist for funds)

**Salesforce/Technical Notes:**
- Store financial aid deadlines in `Financial_Aid_Deadline__c` or Custom Metadata `Financial_Aid_Dates__mdt`
- Include USAHS FAFSA school code in Custom Settings `Financial_Aid_Settings__c`
- Link to FAFSA website (studentaid.gov) in responses
- Tag financial aid Knowledge articles for AI retrieval

**Priority:** Medium
**Story Points:** 3

---

## US-039: Enrollment Term Start Dates

**Title:** Provide Program Start Date Information

**As an** admitted or prospective applicant,
**I want** Journey to tell me when programs start,
**so that** I can plan my schedule and transition to student life.

**Acceptance Criteria:**
- [ ] Journey provides start dates by program and term: "The OTD program begins May 11, 2026 for the Summer cohort."
- [ ] Journey lists upcoming start dates for the next 2-3 terms
- [ ] Journey explains orientation dates and requirements: "Orientation is mandatory and takes place [X days] before classes begin."
- [ ] Journey clarifies differences between campuses if start dates vary
- [ ] Journey helps with deferral: "Can I defer my start date to a later term?" (explains policy)
- [ ] Journey provides countdown: "Your program starts in [X] weeks!"

**Salesforce/Technical Notes:**
- Create `Term__c` object: Start_Date__c (Date), Orientation_Date__c (Date), Program__c (lookup), Campus__c
- Query future terms: `WHERE Start_Date__c >= TODAY ORDER BY Start_Date__c ASC`
- Include deferral policy in Knowledge article "Deferring Your Enrollment"
- Calculate countdown in LWC using JavaScript `Date` difference

**Priority:** Low
**Story Points:** 3

---

## US-040: Deadline Reminder for In-Progress Applicants

**Title:** Notify Applicants of Approaching Deadlines

**As an** authenticated applicant with an in-progress application,
**I want** Journey to remind me of approaching deadlines specific to my program,
**so that** I don't miss the submission window.

**Acceptance Criteria:**
- [ ] When an applicant opens Journey within 14 days of their program's deadline, a reminder banner appears
- [ ] Reminder text: "Your [Program] application deadline is [Date] -- that's [X] days away."
- [ ] If deadline has passed, Journey says: "The [Term] deadline for [Program] has passed. The next available deadline is [Date]."
- [ ] Reminder only appears once per session to avoid being intrusive
- [ ] Journey offers help: "Need help finishing up? I can tell you exactly what's left."

**Salesforce/Technical Notes:**
- Compare `Application__c.Program__c` with `Admission_Deadline__c.Deadline_Date__c` in Apex
- Calculate days remaining in controller; pass to LWC for conditional rendering
- Store "hasShownDeadlineReminder" in `sessionStorage` to prevent repeat display
- Include CTA button linking to next incomplete step

**Priority:** Medium
**Story Points:** 5

---

# DOMAIN 8 -- FINANCIAL AID QUESTIONS

---

## US-041: FAFSA Guidance

**Title:** Provide FAFSA Application Guidance

**As an** applicant seeking financial aid,
**I want** Journey to explain the FAFSA process,
**so that** I can successfully apply for federal financial aid.

**Acceptance Criteria:**
- [ ] Journey explains what FAFSA is: "The Free Application for Federal Student Aid determines your eligibility for federal grants, loans, and work-study programs."
- [ ] Journey provides USAHS school code: "Add our school code [XXXXXX] to your FAFSA so your information is sent to us."
- [ ] Journey walks through basic FAFSA steps (create FSA ID, gather documents, complete application)
- [ ] Journey answers: "When should I fill out the FAFSA?" (as early as October 1; before aid deadlines)
- [ ] Journey clarifies dependency status questions if asked
- [ ] Journey links to official FAFSA website: studentaid.gov

**Salesforce/Technical Notes:**
- Store school code in Custom Setting `Financial_Aid_Settings__c.School_Code__c`
- Create comprehensive Knowledge article "FAFSA Guide for USAHS Applicants"
- Include common FAFSA questions in AI training data / Knowledge base
- Link to external FAFSA resources with `target="_blank"` for external URLs

**Priority:** Medium
**Story Points:** 3

---

## US-042: Scholarship Information

**Title:** Provide Scholarship Opportunity Information

**As an** applicant seeking to reduce education costs,
**I want** Journey to tell me about available scholarships,
**so that** I can apply for financial awards I may qualify for.

**Acceptance Criteria:**
- [ ] Journey can list available scholarships with eligibility criteria and amounts
- [ ] Journey explains the application process for institutional scholarships
- [ ] Journey provides scholarship deadlines: "The merit scholarship deadline is [Date]."
- [ ] Journey answers: "Am I eligible for any scholarships?" (references user's GPA, program, and background if authenticated)
- [ ] Journey differentiates between merit-based, need-based, and program-specific scholarships
- [ ] Journey mentions external scholarship resources if internal options are limited

**Salesforce/Technical Notes:**
- Create `Scholarship__c` object: Name, Amount__c (Currency), Eligibility_Criteria__c (Long Text), Deadline__c (Date), Program__c (lookup)
- Query scholarships with active deadlines: `WHERE Deadline__c >= TODAY`
- For authenticated users, match eligibility criteria against `Application__c` and `Contact` data

**Priority:** Medium
**Story Points:** 5

---

## US-043: Payment Plan and Tuition Information

**Title:** Explain Tuition Costs and Payment Options

**As an** admitted or prospective student,
**I want** Journey to explain program tuition and available payment plan options,
**so that** I can financially plan for my education.

**Acceptance Criteria:**
- [ ] Journey provides tuition by program: "The OTD program tuition is approximately $[X] total, or $[X] per credit hour."
- [ ] Journey explains additional costs: fees, books, equipment, clinical supplies
- [ ] Journey explains available payment plans: monthly installments, deferred payment, employer reimbursement
- [ ] Journey clarifies payment deadlines relative to enrollment: "Tuition is due [X days] before the start of each term."
- [ ] Journey notes: "Tuition rates are subject to change. This estimate is based on current published rates."
- [ ] Journey offers: "Would you like to explore financial aid options to help cover costs?"

**Salesforce/Technical Notes:**
- Store tuition data on `Program__c`: Tuition_Total__c (Currency), Per_Credit_Rate__c (Currency), Additional_Fees__c
- Include disclaimer in response template about rate changes
- Link to official tuition page: include URL in Knowledge article
- Do NOT store or request payment card/banking information in chat

**Priority:** Medium
**Story Points:** 3

---

## US-044: Financial Aid Contact Escalation

**Title:** Connect User to Financial Aid Office

**As an** applicant with complex or personal financial aid questions,
**I want** Journey to connect me with a financial aid advisor,
**so that** I can get personalized help with my specific financial situation.

**Acceptance Criteria:**
- [ ] Journey recognizes when a question requires human expertise: "That's a great question about your specific aid package. Let me connect you with our financial aid team."
- [ ] Journey provides financial aid office contact: phone number, email, office hours
- [ ] Journey offers to create a callback request or support case for the financial aid team
- [ ] Journey can schedule a financial aid advising appointment if calendar integration exists
- [ ] Journey summarizes the user's question in any escalation handoff for context
- [ ] Journey confirms: "Is there anything else I can help with while you wait to hear from the team?"

**Salesforce/Technical Notes:**
- Create escalation Flow that inserts Case with RecordType "Financial Aid Inquiry"
- Include `Case.Description` populated with chat transcript summary
- Query `Business_Hours__c` to display current office availability
- Integrate with Salesforce Scheduler for appointment booking (if licensed)

**Priority:** Medium
**Story Points:** 5

---

## US-045: Loan and Deferment Information

**Title:** Provide Student Loan and Deferment Guidance

**As an** applicant considering financing options,
**I want** Journey to explain federal loan types and deferment options,
**so that** I understand my borrowing options and repayment timeline.

**Acceptance Criteria:**
- [ ] Journey explains federal loan types available to graduate students (Direct Unsubsidized, Grad PLUS)
- [ ] Journey provides typical annual loan limits for graduate programs
- [ ] Journey explains the difference between subsidized and unsubsidized loans
- [ ] Journey answers: "When do I start repaying my loans?" (grace period, deferment while enrolled)
- [ ] Journey provides information on loan forgiveness programs relevant to healthcare (e.g., PSLF)
- [ ] Journey directs detailed questions to the financial aid office for personalized counseling

**Salesforce/Technical Notes:**
- Create Knowledge article "Student Loans and Repayment at USAHS"
- Include links to Federal Student Aid resources (studentaid.gov)
- Do not provide personalized loan amount calculations in chat; direct to financial aid office
- Flag this topic for potential escalation to financial aid team

**Priority:** Low
**Story Points:** 3

---

# DOMAIN 9 -- CAMPUS & LOCATION INFORMATION

---

## US-046: Campus Locations Overview

**Title:** Provide Campus Location Information

**As a** prospective applicant,
**I want** Journey to tell me about USAHS campus locations,
**so that** I can choose a campus that's convenient for my situation.

**Acceptance Criteria:**
- [ ] Journey lists all campus locations: Austin TX, Dallas TX, Miami FL, San Marcos CA, St. Augustine FL
- [ ] Journey provides basic info for each campus: city, state, programs offered, campus highlights
- [ ] Journey can answer: "Which campus should I choose?" (recommends based on program availability, proximity)
- [ ] Journey explains campus-specific features or specialties if applicable
- [ ] Journey provides campus street addresses for each location
- [ ] Journey links to campus information pages for photos and virtual tours

**Salesforce/Technical Notes:**
- Create `Campus__c` object: Name, City__c, State__c, Address__c, Programs_Offered__c (multi-select), Description__c, Virtual_Tour_URL__c
- Query all campuses: `SELECT ... FROM Campus__c WHERE IsActive__c = TRUE ORDER BY Name`
- Include campus photos in Knowledge articles with embedded Salesforce Files

**Priority:** Medium
**Story Points:** 3

---

## US-047: Program Availability by Campus

**Title:** Show Which Programs Are Offered at Each Campus

**As a** prospective applicant,
**I want** Journey to tell me which programs are available at a specific campus,
**so that** I can apply to a campus that offers my desired program.

**Acceptance Criteria:**
- [ ] Journey can answer: "What programs are offered in Miami?" (lists all programs at that campus)
- [ ] Journey can reverse-answer: "Which campuses offer the OTD program?" (lists all campuses for that program)
- [ ] Journey notes if a program is only offered at select campuses
- [ ] Journey clarifies hybrid/online options that may not require campus attendance
- [ ] Journey explains any campus-specific admission differences or cohort sizes
- [ ] Response includes program delivery format (on-campus, hybrid, online) per campus

**Salesforce/Technical Notes:**
- Create junction object `Campus_Program__c` linking Campus__c and Program__c
- Include `Format__c` picklist (On-Campus, Hybrid, Online) on junction object
- Query: `SELECT Program__r.Name, Format__c FROM Campus_Program__c WHERE Campus__r.Name = :campusName`
- Support reverse query: `WHERE Program__r.Name = :programName`

**Priority:** Medium
**Story Points:** 3

---

## US-048: Online and Hybrid Program Information

**Title:** Explain Online and Hybrid Learning Options

**As a** prospective applicant who cannot relocate or prefers remote learning,
**I want** Journey to explain online and hybrid program options,
**so that** I can pursue my degree while managing other commitments.

**Acceptance Criteria:**
- [ ] Journey identifies which programs are available fully online
- [ ] Journey explains hybrid format: "Hybrid programs combine online coursework with periodic on-campus intensive sessions (typically 1-2 weekends per month or immersion weeks)."
- [ ] Journey clarifies technology requirements for online learning (reliable internet, computer specs, LMS access)
- [ ] Journey explains residency/immersion requirements for hybrid programs (how many on-campus days)
- [ ] Journey answers: "Can I complete the entire program online without visiting campus?"
- [ ] Journey notes any differences in tuition or fees for online vs. on-campus programs

**Salesforce/Technical Notes:**
- Add `Delivery_Format__c` picklist to `Program__c`: Online, On-Campus, Hybrid
- Include `Residency_Requirements__c` rich text field for hybrid program details
- Create Knowledge article "Online Learning at USAHS" with tech requirements

**Priority:** Low
**Story Points:** 3

---

## US-049: Campus Visit and Virtual Tour

**Title:** Provide Campus Visit and Tour Information

**As a** prospective applicant,
**I want** Journey to help me schedule a campus visit or find a virtual tour,
**so that** I can experience the campus before committing.

**Acceptance Criteria:**
- [ ] Journey can answer: "How can I visit the campus?" or "Do you have virtual tours?"
- [ ] Journey provides options: in-person campus visit, virtual tour, information session, open house
- [ ] Journey links to campus visit scheduling page or provides contact for scheduling
- [ ] Journey explains what to expect during a campus visit (length, what you'll see, who you'll meet)
- [ ] Journey offers virtual tour links for each campus for remote exploration
- [ ] Journey mentions upcoming open house or admitted student events with dates if scheduled

**Salesforce/Technical Notes:**
- Store event information in `Event__c` or Salesforce Campaign with type "Campus Visit" or "Open House"
- Link to scheduling tool (Salesforce Scheduler, Calendly, or external)
- Include virtual tour URLs in `Campus__c.Virtual_Tour_URL__c`
- Query upcoming events: `WHERE Event_Date__c >= TODAY AND Type__c = 'Open House'`

**Priority:** Low
**Story Points:** 3

---

## US-050: International Student Campus Guidance

**Title:** Provide Guidance for International Applicants Regarding Campus

**As an** international prospective applicant,
**I want** Journey to provide campus-specific guidance relevant to international students,
**so that** I understand visa, housing, and location considerations.

**Acceptance Criteria:**
- [ ] Journey can answer: "Which campus is best for international students?"
- [ ] Journey explains F-1 visa requirements and which campuses support international enrollment
- [ ] Journey provides information about campus-area housing resources
- [ ] Journey notes proximity to airports and public transportation for each campus
- [ ] Journey links to the international student services page or office contact
- [ ] Journey can answer: "Do you offer OPT/CPT for international students?"

**Salesforce/Technical Notes:**
- Add `International_Friendly__c` checkbox and `Visa_Support__c` text field to `Campus__c`
- Create Knowledge article "International Student Guide" with visa and housing info
- Include international student office contact in Custom Settings

**Priority:** Low
**Story Points:** 5

---

# DOMAIN 10 -- ESCALATION & HANDOFF

---

## US-051: Recognize Out-of-Scope Questions

**Title:** Identify Questions Journey Cannot Answer

**As** the Journey AI system,
**I need to** recognize when a question is outside my knowledge base or capabilities,
**so that** I can gracefully escalate to human support rather than providing inaccurate information.

**Acceptance Criteria:**
- [ ] Journey recognizes low-confidence responses and flags them internally (below confidence threshold)
- [ ] Journey does NOT fabricate, guess, or hallucinate answers for topics outside its knowledge
- [ ] Journey responds: "I'm not confident in my answer to that specific question. Let me connect you with someone who can help."
- [ ] Journey logs unrecognized questions in Salesforce for admissions team review
- [ ] Journey offers escalation options: live chat (if available), phone, email, callback request
- [ ] Journey thanks the user: "Thank you for your patience -- we want to make sure you get accurate information."

**Salesforce/Technical Notes:**
- Implement confidence threshold in LLM response evaluation (e.g., < 70% = escalate; configure in Custom Metadata)
- Create `Unanswered_Question__c` object: Question__c, Session_Id__c, User_Contact__c, Timestamp__c
- Run weekly Salesforce report on unrecognized questions to prioritize Knowledge base improvements
- Include confidence score in Apex method return for LWC to conditionally show escalation UI

**Priority:** High
**Story Points:** 5

---

## US-052: Connect to Admissions Advisor

**Title:** Offer Live Advisor Connection

**As an** applicant with a complex question that Journey cannot resolve,
**I want** Journey to offer to connect me with a live admissions advisor,
**so that** I can get personalized help from a human.

**Acceptance Criteria:**
- [ ] Journey offers: "Would you like me to connect you with an admissions advisor?"
- [ ] Journey displays advisor contact options: phone number, email address, live chat (if available)
- [ ] Journey shows current availability: "Our advisors are available Monday-Friday, 8am-6pm ET. It's currently [time]."
- [ ] If outside business hours, Journey offers: "Our office is currently closed. Would you like to schedule a callback?"
- [ ] Journey can transfer to Salesforce live chat if Omni-Channel Messaging is configured
- [ ] Journey confirms handoff: "I've connected you with our admissions team. They'll be with you shortly."

**Salesforce/Technical Notes:**
- Query `BusinessHours` object for current availability and timezone
- Integrate with Salesforce Omni-Channel for live chat routing if licensed
- Create quick action to launch phone dialer (tel: link) or email composer (mailto: link)
- Include advisor queue availability via Omni-Channel Status API

**Priority:** High
**Story Points:** 5

---

## US-053: Create Support Case/Ticket

**Title:** Generate Salesforce Case for Escalation

**As an** applicant whose question requires follow-up from the admissions team,
**I want** Journey to create a support case capturing my question and context,
**so that** an advisor can review and respond even after I leave the chat.

**Acceptance Criteria:**
- [ ] Journey can create a Case in Salesforce with one user confirmation click ("Yes, create a ticket")
- [ ] Case includes: user's question, condensed conversation transcript, contact info, application ID (if authenticated)
- [ ] Case is auto-assigned to appropriate queue based on question category (Admissions, Financial Aid, Technical Support)
- [ ] Journey confirms: "I've created a support ticket (#[CaseNumber]). You'll receive a response within [SLA timeframe]."
- [ ] Journey provides the case number for user reference
- [ ] User receives automated email confirmation of case creation with case details

**Salesforce/Technical Notes:**
- Use `@AuraEnabled` Apex method to insert Case: Subject, Description (transcript), ContactId, Application__c, Origin = "Journey AI Chat"
- Use Case Assignment Rules to route to correct queue based on `Case.Category__c`
- Trigger confirmation email via Flow on Case insert
- Return `Case.CaseNumber` to LWC for display in chat

**Priority:** High
**Story Points:** 5

---

## US-054: Callback Request Form

**Title:** Collect Callback Request Information

**As an** applicant who prefers a phone call over chat,
**I want** Journey to collect my callback information,
**so that** an advisor can call me at my convenience.

**Acceptance Criteria:**
- [ ] Journey asks: "When's the best time to call you?" with time slot options
- [ ] Journey collects: phone number (validates US format), preferred callback date/time, brief topic description
- [ ] For authenticated users, Journey pre-fills phone number from Contact record
- [ ] Journey creates a Task or Case in Salesforce for the admissions team with all callback details
- [ ] Journey confirms: "We'll call you at [number] around [time]. Look for a call from our admissions office."
- [ ] Journey sends callback confirmation email to user

**Salesforce/Technical Notes:**
- Create `Callback_Request__c` object or use Task with RecordType "Callback Request"
- Fields: Phone__c, Preferred_DateTime__c, Topic__c, Contact__c (lookup), Status__c
- Validate phone format in LWC: `(/^\+?1?\d{10}$/).test(phone)`
- Trigger Task assignment to admissions advisor via Flow

**Priority:** Medium
**Story Points:** 3

---

## US-055: Schedule Appointment with Advisor

**Title:** Enable Appointment Scheduling Through Journey

**As an** applicant who wants a formal meeting with an admissions advisor,
**I want** Journey to help me schedule an appointment,
**so that** I can have a dedicated, focused conversation about my application.

**Acceptance Criteria:**
- [ ] Journey offers: "Would you like to schedule a one-on-one meeting with an admissions advisor?"
- [ ] Journey shows available appointment types: phone call, video call, in-person campus visit
- [ ] Journey integrates with scheduling system to show available time slots
- [ ] Journey collects meeting purpose: "What would you like to discuss?" (program questions, application review, financial aid, campus visit)
- [ ] Journey confirms booking: "Your appointment is confirmed for [Date] at [Time] with [Advisor Name]."
- [ ] Journey sends calendar invite / confirmation email to user

**Salesforce/Technical Notes:**
- Integrate with Salesforce Scheduler (if licensed) or external tool (Acuity/Calendly)
- For external tools, embed scheduling link in chat via URL
- For Salesforce Scheduler: use `@AuraEnabled` method to query `ServiceResource` availability and create `ServiceAppointment`
- Include appointment details in confirmation email via Flow

**Priority:** Medium
**Story Points:** 5

---

## US-056: Emergency or Urgent Situation Handling

**Title:** Handle Emergency or Sensitive Disclosures Appropriately

**As** the Journey AI system,
**I need to** recognize when a user discloses an emergency or sensitive personal situation,
**so that** I can respond with appropriate care and direct them to proper resources.

**Acceptance Criteria:**
- [ ] Journey recognizes keywords or patterns indicating distress, emergency, or sensitive topics
- [ ] Journey responds with empathy: "I'm sorry to hear you're going through a difficult time."
- [ ] Journey provides crisis resources when appropriate (campus counseling, national hotlines)
- [ ] Journey does NOT attempt to provide counseling, legal, or medical advice
- [ ] Journey offers to connect the user with a human immediately
- [ ] All sensitive interactions are flagged for human review in Salesforce

**Salesforce/Technical Notes:**
- Implement keyword detection for crisis terms in Apex pre-processing
- Maintain list of crisis resources in Custom Metadata `Crisis_Resource__mdt`
- Create high-priority Case with `Priority = 'Urgent'` for flagged conversations
- Include content safety guidelines in LLM system prompt

**Priority:** High
**Story Points:** 5

---

## US-057: Multi-Channel Escalation Summary

**Title:** Provide Conversation Context on Escalation

**As an** admissions advisor receiving an escalated conversation,
**I want** to see a summary of the applicant's chat with Journey,
**so that** I can continue the conversation without making the applicant repeat themselves.

**Acceptance Criteria:**
- [ ] Escalation record includes: applicant name, program, application status, current step
- [ ] Escalation record includes: condensed conversation transcript (last 10 messages)
- [ ] Escalation record includes: Journey's assessment of the user's question/need
- [ ] Summary is automatically attached to the Case or Chat record
- [ ] Advisor can see the escalation reason (out-of-scope, user requested, sensitive topic)
- [ ] Summary format is concise and scan-friendly (not full raw transcript)

**Salesforce/Technical Notes:**
- Use LLM to generate conversation summary in Apex before creating Case
- Attach summary to `Case.Description` and raw transcript to `CaseComment` or Salesforce File
- Include `Application__c` lookup on Case for advisor to access full application
- Format summary as: "Topic: [X] | Question: [X] | Context: [X] | Suggested Action: [X]"

**Priority:** Medium
**Story Points:** 5

---

# DOMAIN 11 -- CONVERSATION HISTORY & SESSION MANAGEMENT

---

## US-058: Maintain Context Within Session

**Title:** Preserve Conversation Context During Active Session

**As an** applicant having a conversation with Journey,
**I want** Journey to remember what I've already said within our current conversation,
**so that** I don't have to repeat context and the responses are coherent and relevant.

**Acceptance Criteria:**
- [ ] Journey maintains full conversation history within the active browser session
- [ ] Journey references earlier messages: "As you mentioned earlier about your OTD interest..."
- [ ] Context includes: user's program interest, application step, previous questions asked
- [ ] Conversation context persists across page navigation within the same session
- [ ] Context window includes at least the last 20 message exchanges
- [ ] If context limit is exceeded, Journey summarizes older messages to stay within LLM token limits

**Salesforce/Technical Notes:**
- Store conversation array in component property and mirror to `sessionStorage` as JSON
- Pass conversation history to LLM API as message context (chat completion format)
- Implement context windowing: keep last 20 messages; summarize older ones via secondary LLM call if needed
- Include system prompt with user context (program, step, name) in every API call

**Priority:** High
**Story Points:** 5

---

## US-059: Clear Chat / Start New Conversation

**Title:** Allow User to Clear Chat and Start Fresh

**As an** applicant,
**I want** the option to clear my conversation with Journey and start a new one,
**so that** I can begin a new line of questioning without old context interfering.

**Acceptance Criteria:**
- [ ] "Clear conversation" or "New chat" button is available in the chat panel header or menu
- [ ] Clicking the button prompts confirmation: "Start a new conversation? This will clear your current chat history."
- [ ] On confirmation, conversation is cleared and Journey re-displays the welcome message
- [ ] Quick-action chips re-appear after clearing
- [ ] Cleared conversation is optionally logged for analytics before deletion
- [ ] User's authenticated context (name, program, step) is preserved even after clearing

**Salesforce/Technical Notes:**
- Implement "Clear" button in LWC header with `onclick` handler
- Archive conversation to `Chat_Session__c` before clearing for analytics (US-065)
- Reset `sessionStorage` conversation key; re-run `connectedCallback` initialization
- Preserve user context from `@wire` adapters (not stored in conversation)

**Priority:** Medium
**Story Points:** 3

---

## US-060: Handle Session Timeout

**Title:** Gracefully Handle Session Timeout

**As an** applicant whose session has timed out,
**I want** Journey to handle the timeout gracefully,
**so that** I understand what happened and can continue using the assistant.

**Acceptance Criteria:**
- [ ] If Experience Cloud session expires while chat is open, Journey displays: "Your session has timed out. Please log in again to continue."
- [ ] Journey provides a "Log In" link/button within the chat panel
- [ ] Conversation history is saved before session timeout where possible
- [ ] On re-login, Journey restores the conversation if within the same browser session
- [ ] Journey does not display confusing error messages or blank screens on timeout
- [ ] Timeout handling works correctly on both desktop and mobile

**Salesforce/Technical Notes:**
- Detect session expiration via Apex callout failure (401 response) in LWC error handler
- Use `sessionStorage` to persist conversation; restore on next authenticated session
- Implement `try-catch` around all `@wire` and imperative Apex calls
- Display timeout UI within the chat component (not a separate page)

**Priority:** Medium
**Story Points:** 5

---

## US-061: Persist Chat History Across Logins (Optional)

**Title:** Optionally Save Chat History Across Sessions

**As a** returning applicant,
**I want** the option to see my previous conversation history with Journey,
**so that** I can reference past answers and continue where I left off.

**Acceptance Criteria:**
- [ ] For authenticated users, conversation history is saved to Salesforce after session ends
- [ ] On next login, Journey offers: "Welcome back! Would you like to see your previous conversation?"
- [ ] User can choose to load previous history or start fresh
- [ ] Only the last 3 sessions are retained (older sessions are purged)
- [ ] Chat history shows timestamps for each previous session
- [ ] Guest users do not have cross-session history (session-only)

**Salesforce/Technical Notes:**
- Create `Chat_Session__c` object: Contact__c (lookup), Session_Start__c, Session_End__c, Transcript__c (Long Text Area)
- Create `Chat_Message__c` child object: Session__c (lookup), Role__c (User/Journey), Content__c, Timestamp__c
- Implement batch purge of sessions older than 90 days via scheduled Apex
- Query on login: `SELECT Id FROM Chat_Session__c WHERE Contact__c = :contactId ORDER BY Session_Start__c DESC LIMIT 3`

**Priority:** Low
**Story Points:** 5

---

## US-062: Export or Email Conversation Transcript

**Title:** Allow User to Export Chat Transcript

**As an** applicant,
**I want** to export or email my conversation with Journey to myself,
**so that** I can save important information for future reference.

**Acceptance Criteria:**
- [ ] "Email transcript" option is available in chat panel menu
- [ ] User can enter or confirm their email address for transcript delivery
- [ ] Transcript email includes: all messages, timestamps, any links or references provided
- [ ] Email is branded with USAHS styling and sent from a no-reply address
- [ ] Transcript export works for both authenticated and guest users (guest must enter email)
- [ ] "Copy to clipboard" option also available as alternative to email

**Salesforce/Technical Notes:**
- Use Salesforce Messaging (Single Email) via Apex to send transcript
- Build email template in Salesforce with merge fields for transcript content
- For guest users, collect email via LWC form input with validation
- Implement "Copy to Clipboard" using `navigator.clipboard.writeText()` in LWC

**Priority:** Low
**Story Points:** 5

---

# DOMAIN 12 -- ACCESSIBILITY & COMPLIANCE

---

## US-063: WCAG 2.1 AA Keyboard Navigation

**Title:** Ensure Full Keyboard Accessibility

**As an** applicant who navigates using a keyboard,
**I want** the Ask Journey chat panel to be fully operable via keyboard,
**so that** I can use the assistant without a mouse or touch screen.

**Acceptance Criteria:**
- [ ] "Ask Journey" button is focusable via Tab key and activated with Enter/Space
- [ ] Chat panel trap focus when open (Tab cycles within panel, does not escape to background)
- [ ] All interactive elements (close button, input field, send button, chips, links) are reachable via Tab
- [ ] Focus order follows logical reading order (top to bottom, left to right)
- [ ] Escape key closes the chat panel and returns focus to the "Ask Journey" button
- [ ] Visible focus indicator (outline) is present on all focused elements with sufficient contrast

**Salesforce/Technical Notes:**
- Implement focus trap using `lwc:dom="manual"` or JavaScript focus management
- Set `tabindex="0"` on custom interactive elements; use `-1` for programmatic focus
- Add `aria-modal="true"` to chat panel when open
- Test with keyboard-only navigation across Chrome, Firefox, Safari

**Priority:** High
**Story Points:** 5

---

## US-064: Screen Reader Support

**Title:** Ensure Screen Reader Compatibility

**As an** applicant using a screen reader,
**I want** the Ask Journey chat to be announced correctly and navigable,
**so that** I can interact with the assistant using assistive technology.

**Acceptance Criteria:**
- [ ] Chat panel has `role="dialog"` with `aria-label="Ask Journey AI Assistant"`
- [ ] New messages from Journey are announced via `aria-live="polite"` region
- [ ] Each message has appropriate role: user messages labeled "You said:", Journey messages labeled "Journey said:"
- [ ] Quick-action chips have `role="button"` and descriptive `aria-label`
- [ ] Loading/typing indicator has `aria-label="Journey is typing"` or equivalent
- [ ] Close button has `aria-label="Close Ask Journey chat"`

**Salesforce/Technical Notes:**
- Use SLDS-compliant ARIA attributes throughout the LWC template
- Implement `aria-live="polite"` on the message container for dynamic content updates
- Add `role="log"` to the conversation history container
- Test with NVDA (Windows) and VoiceOver (Mac/iOS)

**Priority:** High
**Story Points:** 3

---

## US-065: Color Contrast and Visual Accessibility

**Title:** Meet Color Contrast Requirements

**As an** applicant with low vision or color blindness,
**I want** the chat panel to have sufficient color contrast and visual clarity,
**so that** I can read all text and identify interactive elements.

**Acceptance Criteria:**
- [ ] All text meets WCAG 2.1 AA contrast ratio: 4.5:1 for normal text, 3:1 for large text
- [ ] Interactive elements (buttons, links, chips) have 3:1 contrast against adjacent colors
- [ ] Status indicators do not rely solely on color (include icons or text labels)
- [ ] Focus indicators have minimum 3:1 contrast against background
- [ ] Dark mode and light mode both meet contrast requirements
- [ ] Chat messages from user vs. Journey are distinguishable by position, color, AND label

**Salesforce/Technical Notes:**
- Audit all colors using contrast checker tool (WebAIM, Colour Contrast Analyser)
- Use SLDS design tokens for consistent, accessible colors
- Ensure branded colors (#00677F teal, #7B68EE purple) meet contrast when used with text
- Add redundant indicators (icon + color + position) for message attribution

**Priority:** Medium
**Story Points:** 3

---

## US-066: Text Resize and Zoom Support

**Title:** Support Text Resize Without Layout Breaking

**As an** applicant who increases browser text size,
**I want** the chat panel to remain usable when text is zoomed to 200%,
**so that** I can read content comfortably.

**Acceptance Criteria:**
- [ ] Chat panel is functional at 200% browser zoom
- [ ] Text reflows without horizontal scrolling at up to 200% zoom
- [ ] No content is clipped or hidden at increased text sizes
- [ ] Input field and send button remain accessible at all zoom levels
- [ ] Quick-action chips wrap appropriately at increased text sizes
- [ ] Chat panel responds to browser font size settings (respects `rem`/`em` units)

**Salesforce/Technical Notes:**
- Use relative units (`rem`, `em`) instead of fixed `px` for font sizes and spacing
- Test at 100%, 150%, and 200% zoom in all major browsers
- Use CSS `overflow-wrap: break-word` for long content in messages
- Implement `max-width: 100%` on all child elements within the panel

**Priority:** Medium
**Story Points:** 3

---

## US-067: Language and Translation Support

**Title:** Support Multi-Language Interaction

**As an** international applicant whose primary language is not English,
**I want** Journey to understand and optionally respond in my language,
**so that** I can get help even if my English is limited.

**Acceptance Criteria:**
- [ ] Journey can detect non-English input and respond in the same language (if supported by LLM)
- [ ] Journey offers a language selection option: "I can assist in Spanish and English. Which do you prefer?"
- [ ] Static UI text (labels, buttons, placeholders) supports internationalization (i18n)
- [ ] Quick-action chips are available in supported languages
- [ ] Journey notes when an answer is only available in English: "I have this information in English -- would you like me to translate it?"
- [ ] Language preference is stored for the session

**Salesforce/Technical Notes:**
- Use Salesforce Translation Workbench for static LWC labels
- Store language preference in `sessionStorage` and pass to LLM system prompt
- Supported languages: English (default), Spanish (Phase 1); additional languages in future phases
- Use Custom Labels for all user-facing strings in LWC

**Priority:** Low
**Story Points:** 8

---

## US-068: FERPA Compliance in Chat

**Title:** Ensure FERPA Compliance in AI Interactions

**As** the USAHS compliance team,
**I need** Journey to handle educational records and student data in compliance with FERPA,
**so that** the university avoids regulatory violations.

**Acceptance Criteria:**
- [ ] Journey does NOT disclose academic records, grades, or enrollment status to anyone other than the authenticated student
- [ ] Journey verifies authentication before providing any application-specific data
- [ ] Guest users can only receive general program/admissions information (no personal data)
- [ ] Journey's welcome message includes a privacy notice: "Your conversation is private and handled in accordance with our privacy policy."
- [ ] Chat transcripts containing PII are encrypted at rest and in transit
- [ ] Data retention policies are enforced (auto-purge after configurable period)

**Salesforce/Technical Notes:**
- Implement Salesforce Shield Platform Encryption on `Chat_Session__c` and `Chat_Message__c` fields
- Add field-level security to restrict access to chat records (only student and admissions roles)
- Include FERPA notice in LLM system prompt: "Do not disclose personal data to unauthenticated users."
- Configure auto-purge via scheduled Apex batch (delete sessions > 180 days)

**Priority:** High
**Story Points:** 5

---

# DOMAIN 13 -- ANALYTICS & FEEDBACK

---

## US-069: Thumbs Up/Down Response Rating

**Title:** Allow Users to Rate Individual Responses

**As an** applicant receiving answers from Journey,
**I want** to rate each response as helpful or not,
**so that** the university can improve Journey's accuracy and usefulness.

**Acceptance Criteria:**
- [ ] Each Journey response displays small thumbs-up and thumbs-down icons below the message
- [ ] Clicking thumbs-down optionally prompts: "How could this answer be better?" (free-text, 200 char max)
- [ ] Ratings are logged to Salesforce for analysis with message context
- [ ] Ratings do not interrupt the conversation flow (inline, non-modal)
- [ ] Aggregate rating data is available in Salesforce reports
- [ ] Icons use accessible labels: `aria-label="Mark as helpful"` / `aria-label="Mark as not helpful"`

**Salesforce/Technical Notes:**
- Create `Message_Rating__c` object: Session_Id__c, Message_Index__c, Rating__c (Positive/Negative), Feedback__c (Text), Created_Date__c
- Insert rating record via imperative Apex call on icon click
- Include message content in rating record for context
- Build report: "Journey Response Quality by Topic"

**Priority:** Medium
**Story Points:** 3

---

## US-070: Log Unanswered Questions for Review

**Title:** Capture Questions Journey Couldn't Answer

**As an** admissions team member,
**I want** to see a log of questions Journey couldn't answer or answered with low confidence,
**so that** I can update the Knowledge base and improve the assistant.

**Acceptance Criteria:**
- [ ] All questions where Journey's confidence was below threshold are logged automatically
- [ ] Log includes: question text, user context (program, step), timestamp, session ID
- [ ] Log includes Journey's attempted response (if any) for quality review
- [ ] Admissions team can access the log via a Salesforce List View or report
- [ ] Log entries can be marked as "Addressed" once Knowledge base is updated
- [ ] Weekly summary report is emailed to Knowledge base admin

**Salesforce/Technical Notes:**
- Use `Unanswered_Question__c` object from US-051
- Add fields: Attempted_Response__c (Long Text), Addressed__c (checkbox), Addressed_By__c (lookup User)
- Create List View: "Unaddressed Questions" filtered on `Addressed__c = FALSE`
- Schedule weekly email report via Salesforce Reporting

**Priority:** High
**Story Points:** 5

---

## US-071: Analytics Dashboard for Common Questions

**Title:** Report on Most Common Questions by Step and Program

**As an** admissions manager,
**I want** to see analytics on what questions applicants ask most frequently,
**so that** I can identify common pain points and improve the application process.

**Acceptance Criteria:**
- [ ] Dashboard shows top 20 most frequently asked questions across all sessions
- [ ] Questions can be filtered by: program, application step, date range, rating
- [ ] Dashboard shows question volume trends over time (daily, weekly, monthly)
- [ ] Dashboard highlights questions with lowest satisfaction ratings
- [ ] Data is refreshable and includes last 90 days by default
- [ ] Dashboard is accessible to admissions team with appropriate permission set

**Salesforce/Technical Notes:**
- Use Salesforce Reports and Dashboards (or CRM Analytics if licensed)
- Create report type on `Chat_Message__c` grouped by intent/topic category
- Implement topic classification in Apex: tag each question with a category before storing
- Build dashboard with bar charts (top questions), line charts (volume trend), and tables

**Priority:** Medium
**Story Points:** 5

---

## US-072: Session Analytics and Usage Metrics

**Title:** Track Journey Usage and Engagement Metrics

**As a** product owner,
**I want** to track how applicants use Journey (session count, duration, messages per session),
**so that** I can measure adoption and ROI.

**Acceptance Criteria:**
- [ ] Track total sessions per day/week/month
- [ ] Track average messages per session and session duration
- [ ] Track unique users vs. returning users
- [ ] Track conversion metrics: "Users who used Journey" vs. "Application completion rate"
- [ ] Track peak usage times (hour of day, day of week)
- [ ] All metrics available in Salesforce dashboard with date range filters

**Salesforce/Technical Notes:**
- Create `Chat_Session__c` fields: Message_Count__c (Number), Duration_Seconds__c (Number), Is_First_Session__c (Formula)
- Populate on session end via Apex trigger or LWC `disconnectedCallback()`
- Join `Chat_Session__c` with `Application__c` for conversion analysis
- Build executive dashboard with key KPIs

**Priority:** Medium
**Story Points:** 5

---

## US-073: Post-Conversation Satisfaction Survey

**Title:** Offer Post-Conversation Satisfaction Survey

**As an** applicant completing a conversation with Journey,
**I want** the opportunity to rate my overall experience,
**so that** the university can measure and improve the AI assistant.

**Acceptance Criteria:**
- [ ] When user closes chat after 3+ message exchanges, a brief survey prompt appears
- [ ] Survey includes: 1-5 star overall rating
- [ ] Survey includes: optional free-text comment field (500 char max)
- [ ] Survey only appears once per session (not on every close)
- [ ] Survey responses are logged and aggregated in analytics dashboard
- [ ] User can dismiss the survey without rating; dismissal is also logged

**Salesforce/Technical Notes:**
- Create `Survey_Response__c` object: Rating__c (Number 1-5), Comments__c (Text), Session__c (lookup), Dismissed__c (checkbox)
- Trigger survey modal in `closeChat()` method after checking message count > 3
- Calculate average satisfaction score in Salesforce formula or report
- Include NPS trend (Promoters 4-5, Passives 3, Detractors 1-2) in analytics dashboard

**Priority:** Low
**Story Points:** 5

---

## US-074: Escalation Volume and Resolution Reporting

**Title:** Report on Escalation Patterns and Resolution

**As an** admissions team lead,
**I want** to see metrics on how often Journey escalates to humans and how quickly those are resolved,
**so that** I can optimize staffing and Knowledge base coverage.

**Acceptance Criteria:**
- [ ] Report shows total escalations per period (daily, weekly, monthly)
- [ ] Report breaks down escalations by reason: out-of-scope, user-requested, sensitive topic, system error
- [ ] Report shows average time-to-resolution for escalated cases
- [ ] Report identifies programs/steps with highest escalation rates
- [ ] Report tracks escalation rate trend (should decrease as Knowledge base improves)
- [ ] Report is scheduled for weekly email delivery to team lead

**Salesforce/Technical Notes:**
- Use Case reporting with filter: `Origin = 'Journey AI Chat'`
- Include Case fields: Escalation_Reason__c, Resolution_Time__c (formula: Closed - Created), Category__c
- Create cross-filter report: Cases by Program and Application Step
- Schedule report for automated email delivery

**Priority:** Low
**Story Points:** 3

---

# DOMAIN 14 -- ADMIN & CONFIGURATION

---

## US-075: Update FAQ/Knowledge Base Without Developer

**Title:** Enable Admissions Team to Update Journey's Knowledge

**As an** admissions administrator,
**I want** to update Journey's answers to common questions without requiring developer assistance,
**so that** information stays current, accurate, and reflects the latest policies.

**Acceptance Criteria:**
- [ ] Admissions staff can create and edit Salesforce Knowledge articles via standard UI
- [ ] Knowledge articles are used as Journey's primary information source via RAG
- [ ] Changes to Knowledge articles are reflected in Journey's responses within 24 hours (or on next cache refresh)
- [ ] Article structure supports Q&A format: Question__c, Answer__c, Category__c, Program__c
- [ ] Admissions staff can preview how Journey will use an article (test query feature)
- [ ] Version history is maintained for all Knowledge articles

**Salesforce/Technical Notes:**
- Enable Salesforce Knowledge in the org with Article Types
- Create Data Category hierarchy: Programs > OTD, Nursing, Education, Certificates; Topics > Admissions, Financial Aid, Documents
- Implement RAG pipeline: on query, search Knowledge articles via SOSL, inject top results into LLM prompt
- Implement article publishing workflow with approval process for quality control

**Priority:** High
**Story Points:** 8

---

## US-076: Configure Quick-Action Chips

**Title:** Allow Admin Configuration of Suggested Questions

**As an** admissions administrator,
**I want** to modify the quick-action chips (suggested questions) shown in Journey,
**so that** I can promote timely topics like upcoming deadlines or new program announcements.

**Acceptance Criteria:**
- [ ] Quick-action chips are configurable via Custom Metadata or a Salesforce custom object (no code deployment needed)
- [ ] Admin can add, edit, remove, and reorder chips
- [ ] Admin can set chip visibility: Always, Authenticated Only, Guest Only
- [ ] Admin can set expiration dates for time-sensitive chips (e.g., "Deadline This Friday!")
- [ ] Changes take effect immediately without code deployment or site republishing
- [ ] Admin interface is user-friendly with clear field labels and help text

**Salesforce/Technical Notes:**
- Create `Journey_Quick_Action__mdt` Custom Metadata Type
- Fields: Label__c, Query_Text__c, Order__c (Number), Visibility__c (picklist), Expiration_Date__c (Date), Is_Active__c (checkbox)
- Query in LWC `connectedCallback()`: filter by visibility, expiration, and active status
- Refresh chip list on each chat panel open to pick up latest config

**Priority:** Medium
**Story Points:** 5

---

## US-077: Manage Deadline and Date Information

**Title:** Enable Admin Updates to Deadlines and Dates

**As an** admissions administrator,
**I want** to update application deadlines and term start dates that Journey references,
**so that** applicants always receive accurate timing information.

**Acceptance Criteria:**
- [ ] Deadlines are stored in Salesforce objects (not hardcoded in code or prompts)
- [ ] Admin can update deadlines via standard Salesforce record editing UI
- [ ] Journey automatically reflects updated deadlines in responses (no code change needed)
- [ ] Admin receives automated reminder to update deadlines when current ones are within 30 days of expiration
- [ ] Historical deadlines are retained for reporting and audit purposes
- [ ] Deadline changes can be made by admissions staff without developer involvement

**Salesforce/Technical Notes:**
- Use `Admission_Deadline__c` object from US-036
- Create List View "Manage Deadlines" for admissions team with all relevant fields
- Implement validation rule: `Deadline_Date__c >= TODAY` on insert (not update, to preserve history)
- Set up scheduled Flow to email admin when any deadline is within 30 days

**Priority:** High
**Story Points:** 3

---

## US-078: Review Escalated Conversations

**Title:** Provide Admin View of Escalated and Flagged Conversations

**As an** admissions team lead,
**I want** to review conversations that were escalated from Journey or flagged for quality,
**so that** I can ensure quality responses, identify training gaps, and improve the Knowledge base.

**Acceptance Criteria:**
- [ ] Admin dashboard/list view shows all escalated conversations in one place
- [ ] Each escalation record includes: original question, Journey's response, escalation reason, resolution status
- [ ] Admin can mark escalations as "Resolved" with notes on the action taken
- [ ] Admin can identify patterns in escalations (e.g., cluster of questions about financial aid)
- [ ] Escalation volume is tracked over time with trend indicators
- [ ] Admin can reassign escalated cases to specific team members

**Salesforce/Technical Notes:**
- Use Case object with RecordType "Journey Escalation"
- Create custom List View: `WHERE RecordType.Name = 'Journey Escalation' ORDER BY CreatedDate DESC`
- Build report showing escalation reasons, resolution times, and program/step breakdown
- Link to Domain 13 analytics dashboard for cross-referencing with usage data

**Priority:** Medium
**Story Points:** 5

---

## US-079: Journey System Health Monitoring

**Title:** Monitor Journey AI System Health and Performance

**As an** IT administrator,
**I want** to monitor Journey's system health, API status, and response performance,
**so that** I can quickly identify and resolve technical issues affecting applicant experience.

**Acceptance Criteria:**
- [ ] Dashboard shows Journey system status: Online, Degraded, Offline
- [ ] Dashboard shows LLM API response times (average, P95, P99) and error rates
- [ ] Alerts are sent via email if Journey becomes unavailable or response times exceed 5-second threshold
- [ ] Admin can view recent error logs for troubleshooting (last 100 errors)
- [ ] System health is checked automatically every 5 minutes via scheduled job
- [ ] Historical uptime data is retained for 12 months for SLA reporting

**Salesforce/Technical Notes:**
- Implement health check Apex class that calls LLM API with a lightweight test prompt
- Log results to `System_Health_Log__c`: Status__c, Response_Time_Ms__c, Error_Message__c, Timestamp__c
- Use Scheduled Apex (every 5 minutes) or Platform Events to trigger checks
- Configure Custom Notification or email alert via Salesforce Flow on failure detection
- Build Lightning dashboard with status indicators and response time charts

**Priority:** Low
**Story Points:** 5

---

# DEPENDENCIES & RISKS

---

## Salesforce Licensing Dependencies

| License/Feature | Requirement Level | Impact if Unavailable |
|-----------------|-------------------|----------------------|
| Experience Cloud (Digital Experiences) | **Required** | Cannot build the applicant portal |
| Einstein AI / Agentforce | Recommended | Must use external LLM via Apex HTTP callout |
| Salesforce Knowledge | **Required** | Cannot manage FAQ content without developer; severely limits admin self-service |
| Omni-Channel (Messaging) | Optional | No live chat handoff; escalation limited to Case/Callback |
| Salesforce Scheduler | Optional | No in-app appointment booking; fallback to external tool (Calendly/Acuity) |
| CRM Analytics (Einstein Analytics) | Optional | Basic reporting only via standard Reports & Dashboards |
| Salesforce Shield (Platform Encryption) | Recommended | Standard encryption only; may not meet strict FERPA/HIPAA requirements |
| Translation Workbench | Optional | No multi-language support for UI labels |

## LLM API Integration Considerations

| Consideration | Details | Mitigation |
|---------------|---------|------------|
| API Latency | External LLM calls add 1-3 seconds per response | Implement response caching for common queries; show typing indicator; consider async architecture |
| API Cost | Per-token pricing (Claude: ~$3-15/M tokens; GPT-4: ~$10-30/M tokens) | Monitor usage daily; implement rate limits per user; cache frequent answers |
| API Rate Limits | Provider-imposed limits may throttle during peak periods | Implement request queuing; configure fallback responses; consider multi-provider failover |
| Data Privacy (PII) | User queries containing personal data are sent to external API | Use enterprise/HIPAA-eligible API tiers; sign DPA with provider; anonymize PII in prompts where possible |
| Model Updates | LLM behavior may change with provider model updates | Pin to specific model version (e.g., `claude-3-sonnet-20241022`); test before upgrading |
| Availability | External API downtime affects Journey availability | Implement health checks (US-079); fallback to Knowledge-only mode if API unavailable |

## Data Privacy & FERPA Risks

| Risk | Description | Mitigation |
|------|-------------|------------|
| PII in Chat Logs | Conversation logs contain applicant personal information | Encrypt chat records (Shield); implement data retention policy; auto-purge after 180 days |
| Data Sharing with LLM | User queries sent to external AI provider | Enterprise API tier with DPA; minimize PII in prompts; anonymize where possible |
| Consent | Users unaware of AI data processing | Add privacy/consent notice in Journey welcome message; link to privacy policy |
| Access Control | Unauthorized access to other applicants' chat history | Role-based access (field-level security, sharing rules); applicant sees only their own records |
| Data Retention | Chat data stored indefinitely | Auto-purge scheduled Apex; configurable retention period in Custom Settings |

## Experience Cloud Configuration Prerequisites

| Prerequisite | Details |
|--------------|---------|
| Site Template | LWR (Lightning Web Runtime) or Aura site template configured and published |
| User Profiles | Guest User profile, Applicant User profile created with appropriate permissions |
| Permission Sets | `Journey_Chat_Access` permission set created and assigned to portal users |
| Page Layouts | Header/navigation region available for widget component placement |
| Custom Objects | `Application__c`, `Document__c`, `Program__c`, `Campus__c` deployed and populated |
| Knowledge Setup | Salesforce Knowledge enabled; Data Categories configured; initial articles created |
| Named Credentials | LLM API credentials stored securely; callout enabled for Apex |
| Connected App | If using external auth, connected app for API integration configured |

## Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| LLM Hallucination | Medium | High | Implement RAG (Knowledge articles as grounding truth); confidence thresholds; disclaim AI nature |
| Performance Degradation | Medium | Medium | Optimize Apex queries; implement caching (Platform Cache); async LLM calls; lazy load chat component |
| Scope Creep | High | Medium | Strict MVP definition; phased rollout; change request process for new domains |
| Integration Failures | Low | High | Retry logic (exponential backoff); graceful fallback to Knowledge-only; monitoring and alerting |
| User Adoption | Medium | Medium | User training/onboarding; marketing the feature; feedback loop for continuous improvement |
| Security Breach | Low | Critical | Salesforce Shield encryption; regular security audits; penetration testing; principle of least privilege |
| FERPA Violation | Low | Critical | Legal review of chat data handling; DPA with LLM provider; strict access controls; privacy notice |

---

# APPENDIX

---

## Glossary

| Term | Definition |
|------|------------|
| Journey | The AI assistant persona for USA Health Sciences OLA 2.0 |
| OLA 2.0 | Online Application version 2.0 |
| USAHS | University of St. Augustine for Health Sciences |
| LWC | Lightning Web Component (Salesforce front-end framework) |
| LWR | Lightning Web Runtime (modern Experience Cloud rendering engine) |
| LLM | Large Language Model (Claude, GPT, etc.) |
| RAG | Retrieval-Augmented Generation (grounding LLM with Knowledge data) |
| LMS | Lightning Message Service (cross-component communication) |
| FERPA | Family Educational Rights and Privacy Act |
| FAFSA | Free Application for Federal Student Aid |
| OTD | Occupational Therapy Doctorate |
| MSN | Master of Science in Nursing |
| DNP | Doctor of Nursing Practice |
| EdD | Doctor of Education |
| DPA | Data Processing Agreement |
| SLDS | Salesforce Lightning Design System |
| CSP | Content Security Policy |
| NPS | Net Promoter Score |
| SLA | Service Level Agreement |
| PII | Personally Identifiable Information |

## Story Cross-Reference Index

| Domain | Story Range | Count |
|--------|-------------|-------|
| 1. Widget Presence & Launch | US-001 -- US-006 | 6 |
| 2. Greeting & Orientation | US-007 -- US-011 | 5 |
| 3. Program Information | US-012 -- US-017 | 6 |
| 4. Application Status & Requirements | US-018 -- US-022 | 5 |
| 5. Document Guidance | US-023 -- US-027 | 5 |
| 6. Contextual In-Form Help | US-028 -- US-035 | 8 |
| 7. Deadline & Timeline Information | US-036 -- US-040 | 5 |
| 8. Financial Aid Questions | US-041 -- US-045 | 5 |
| 9. Campus & Location Information | US-046 -- US-050 | 5 |
| 10. Escalation & Handoff | US-051 -- US-057 | 7 |
| 11. Conversation History & Session | US-058 -- US-062 | 5 |
| 12. Accessibility & Compliance | US-063 -- US-068 | 6 |
| 13. Analytics & Feedback | US-069 -- US-074 | 6 |
| 14. Admin & Configuration | US-075 -- US-079 | 5 |
| **TOTAL** | | **78** |

## Related Documentation

- Salesforce Experience Cloud Developer Guide
- Salesforce Lightning Web Components Developer Guide
- Einstein Copilot / Agentforce Implementation Guide
- Anthropic Claude API Documentation
- WCAG 2.1 AA Guidelines (W3C)
- FERPA Compliance Checklist (US Department of Education)
- Salesforce Knowledge Implementation Guide
- Salesforce Shield Platform Encryption Guide

---

*Document Version: 2.0*
*Created: February 2026*
*Author: Product Management & Salesforce Architecture Team*
*Classification: Internal Use Only -- USAHS OLA 2.0 Project*
