# Ask Journey AI Assistant
## High-Level User Stories for Implementation
### University of St. Augustine for Health Sciences — OLA 2.0
### Salesforce Experience Cloud

---

# EXECUTIVE SUMMARY

| Metric | Value |
|--------|-------|
| **Total User Stories** | 28 |
| **Total Story Points** | 104 |
| **Estimated Sprints (2-week)** | 4-5 |
| **Domains Covered** | 14 |

## Release Plan

| Phase | Stories | Points | Focus |
|-------|---------|--------|-------|
| **MVP (Sprints 1-2)** | Journey LLM-01 to LLM-10 | 37 | Widget, greeting, program Q&A, in-form help |
| **Phase 2 (Sprints 3-4)** | Journey LLM-11 to LLM-20 | 40 | Status, documents, deadlines, escalation |
| **Phase 3 (Sprint 5)** | Journey LLM-21 to LLM-28 | 27 | Analytics, accessibility, admin tools |

---

# DOMAIN 1 — Widget Presence & Launch

## Journey LLM-01: Floating Chat Widget

**As an** applicant, **I want** a persistent "Ask Journey" button in the nav bar that opens a slide-in chat panel, **so that** I can access AI help on any step.

**Acceptance Criteria:**
- Button visible across all 6 application steps with branded styling
- Panel slides in from right (448x600px), closeable via X, backdrop click, or Escape key
- Panel state (open/closed/minimized) and conversation persist across step navigation
- Full-screen on mobile (<768px); icon-only button on small screens

**Technical Notes:** LWC in Experience Cloud header slot. Use `sessionStorage` for state persistence. Lightning Message Service for cross-component communication.

**Priority:** High | **Points:** 5

---

# DOMAIN 2 — Greeting & Orientation

## Journey LLM-02: Welcome Message & Quick Actions

**As an** applicant, **I want** Journey to greet me by name, show what it can help with, and offer clickable prompt chips, **so that** I can get started quickly.

**Acceptance Criteria:**
- Personalized greeting for authenticated users: "Hi [Name]! I'm Journey..."
- Capability list: programs, requirements, documents, status, advisor connection
- 4-6 quick-action chips: "What documents do I need?", "Tell me about the programs", "What are the deadlines?", "Campus locations?", "Check my application status" (auth only), "Talk to an advisor"
- Chips send as user message on click; collapse after first interaction
- Welcome shown once per session

**Technical Notes:** Apex controller `getApplicantContext()` for user context. Store chips in Custom Metadata for admin updates. `sessionStorage` flag for one-time welcome.

**Priority:** High | **Points:** 3

---

## Journey LLM-03: Returning User Recognition

**As a** returning applicant, **I want** Journey to recognize my in-progress application and offer to help me continue, **so that** I can resume quickly.

**Acceptance Criteria:**
- "Welcome back, [Name]! You left off on Step [X]." for saved applications
- Note if last visit was 30+ days ago
- Handle multiple applications: "Which one would you like to work on?"

**Technical Notes:** Query `Application__c.LastModifiedDate`. Compare against current date in Apex.

**Priority:** Medium | **Points:** 3

---

# DOMAIN 3 — Program Information

## Journey LLM-04: Program Q&A

**As a** prospective applicant, **I want** to ask Journey about OTD, Nursing, Education, and Certificate programs, **so that** I can choose the right fit.

**Acceptance Criteria:**
- General overview listing all 4 program categories on request
- Per-program answers: requirements, duration, tuition, campuses, career outcomes
- Program comparison: "Compare OTD and Nursing" returns structured side-by-side info
- Sourced from Salesforce Knowledge articles, not hardcoded

**Technical Notes:** Knowledge articles per program with Data Categories. RAG pattern: search Knowledge via SOSL, inject into LLM prompt. `Program__c` object for structured data.

**Priority:** High | **Points:** 5

---

# DOMAIN 4 — Application Status & Requirements

## Journey LLM-05: Application Status Check

**As an** authenticated applicant, **I want** to ask Journey my application status and what's left to complete, **so that** I know where I stand.

**Acceptance Criteria:**
- Shows current status: In Progress, Submitted, Under Review, Decision Made
- Lists all 6 steps with complete/incomplete indicators
- Highlights missing items: blank fields, missing documents, unsigned consents
- Provides program-specific estimated review timeline after submission

**Technical Notes:** Query `Application__c` for status. Apex validation method returns unmet requirements list. Review timelines from `Program__c.Typical_Review_Days__c`.

**Priority:** High | **Points:** 5

---

# DOMAIN 5 — Document Guidance

## Journey LLM-06: Document Requirements & Status

**As an** applicant, **I want** Journey to tell me what documents I need, how to upload them, and confirm receipt, **so that** my application materials are complete.

**Acceptance Criteria:**
- Program-specific document checklist with required vs. optional
- Format/size requirements: PDF preferred, max 10MB
- Upload instructions pointing to Step 4
- For authenticated users: shows which docs are uploaded, pending, or missing
- Transcript request guidance: official vs. unofficial, common vendors (Parchment, NSC)

**Technical Notes:** `Document_Requirement__c` by program. Join with `Document__c` for upload status. Knowledge article for transcript process.

**Priority:** High | **Points:** 5

---

# DOMAIN 6 — Contextual In-Form Help

## Journey LLM-07: Step-Aware Contextual Help

**As an** applicant, **I want** Journey to know which step I'm on and answer field-specific questions, **so that** I get relevant help without explaining my context.

**Acceptance Criteria:**
- Detects current step from URL/page context automatically
- Step 1: Explains Judicial Background, Citizenship, Military, Emergency Contact fields
- Step 2: Academic history, GPA, international education guidance
- Step 3: Employment history scope, healthcare experience definition
- Step 4: Document-specific help (personal statement tips, recommendation guidance)
- Step 5: Transcript request process and tracking
- Step 6: Submission review, post-submit expectations, edit policy
- Reassuring tone for sensitive topics (judicial, military)

**Technical Notes:** `@wire(CurrentPageReference)` for step detection. `Field_Help__c` object for field-level help content. Pass step context in every LLM prompt.

**Priority:** High | **Points:** 8

---

# DOMAIN 7 — Deadline & Timeline Information

## Journey LLM-08: Deadlines & Start Dates

**As a** prospective applicant, **I want** Journey to tell me application deadlines, financial aid dates, and program start dates, **so that** I can plan accordingly.

**Acceptance Criteria:**
- Program-specific application deadlines (priority vs. final)
- Rolling admissions explanation for applicable programs
- FAFSA deadline guidance with school code
- Upcoming term start dates and orientation info
- Proactive warning when deadline is within 14 days for in-progress applicants

**Technical Notes:** `Admission_Deadline__c` object. Custom Metadata for financial aid dates. Date comparison in Apex for deadline warnings.

**Priority:** High | **Points:** 5

---

# DOMAIN 8 — Financial Aid Questions

## Journey LLM-09: Financial Aid Guidance

**As an** applicant, **I want** Journey to answer questions about FAFSA, scholarships, tuition, loans, and payment plans, **so that** I can plan financially.

**Acceptance Criteria:**
- FAFSA process walkthrough with school code
- Available scholarships with eligibility and deadlines
- Tuition estimates per program (with disclaimer about rate changes)
- Loan types, repayment, and forgiveness info
- Payment plan options
- Escalate complex questions to financial aid office with contact info

**Technical Notes:** Knowledge articles for financial aid topics. `Scholarship__c` object for dynamic data. Financial aid office contact in Custom Settings. Escalation creates Case with RecordType "Financial Aid Inquiry".

**Priority:** Medium | **Points:** 3

---

# DOMAIN 9 — Campus & Location Information

## Journey LLM-10: Campus & Location Info

**As a** prospective applicant, **I want** Journey to answer questions about campus locations, program availability by campus, and online/hybrid options, **so that** I can choose the right setting.

**Acceptance Criteria:**
- Lists all campuses: Austin, Dallas, Miami, San Marcos, St. Augustine
- Which programs at which campus
- Online/hybrid program details and tech requirements
- Campus visit scheduling and virtual tour links
- International student campus guidance (visa support, housing)

**Technical Notes:** `Campus__c` object with `Campus_Program__c` junction. Virtual tour URLs on campus record. Link to scheduling tool for visits.

**Priority:** Medium | **Points:** 3

---

# DOMAIN 10 — Escalation & Handoff

## Journey LLM-11: Human Escalation & Case Creation

**As an** applicant, **I want** Journey to recognize when it can't help and connect me to a human advisor, **so that** I always get an accurate answer.

**Acceptance Criteria:**
- Detects low-confidence answers; never fabricates information
- Offers: phone, email, live chat (if available), callback request, appointment scheduling
- Shows advisor availability and business hours
- Creates Salesforce Case with conversation summary, contact info, application ID
- Provides case number confirmation to user
- Logs unanswered questions for Knowledge base improvement

**Technical Notes:** Confidence threshold in LLM evaluation. Case insert via `@AuraEnabled` Apex. Assignment Rules for queue routing. `Unanswered_Question__c` for logging gaps.

**Priority:** High | **Points:** 5

---

## Journey LLM-12: Callback & Appointment Scheduling

**As an** applicant, **I want** to request a callback or schedule an advisor appointment through Journey, **so that** I can get help at a convenient time.

**Acceptance Criteria:**
- Collects: phone (validated), preferred time, topic
- Pre-fills phone for authenticated users
- Creates Task/Case for admissions team
- Appointment scheduling via Salesforce Scheduler or external tool (Acuity/Calendly)
- Confirmation message with details

**Technical Notes:** `Callback_Request__c` or Task with RecordType. Integrate Salesforce Scheduler if licensed, else embed external scheduling link.

**Priority:** Medium | **Points:** 3

---

## Journey LLM-13: Sensitive Situation Handling

**As** the Journey system, **I need** to handle emergency disclosures or distress appropriately, **so that** users are directed to proper resources.

**Acceptance Criteria:**
- Recognizes crisis/distress keywords
- Responds with empathy; provides crisis resources (counseling, hotlines)
- Never provides counseling, legal, or medical advice
- Flags interaction for immediate human review (high-priority Case)

**Technical Notes:** Keyword detection in Apex pre-processing. Crisis resources in Custom Metadata. High-priority Case creation with `Priority = 'Urgent'`.

**Priority:** High | **Points:** 3

---

## Journey LLM-14: Escalation Context Handoff

**As an** admissions advisor, **I want** to see a summary of the applicant's Journey conversation when receiving an escalation, **so that** they don't have to repeat themselves.

**Acceptance Criteria:**
- Case includes: applicant name, program, current step, condensed transcript (last 10 messages), escalation reason
- Summary auto-attached to Case description
- Application record linked for full context

**Technical Notes:** LLM-generated conversation summary in Apex. Attach to `Case.Description`. Link `Application__c` via lookup.

**Priority:** Medium | **Points:** 3

---

# DOMAIN 11 — Conversation History & Session Management

## Journey LLM-15: Session Context & Persistence

**As an** applicant, **I want** Journey to remember our conversation within the session and let me clear/restart if needed, **so that** I don't repeat myself.

**Acceptance Criteria:**
- Full conversation context maintained within browser session (last 20 messages)
- Context persists across page navigation within the session
- "New chat" button clears history and re-shows welcome/chips
- Graceful session timeout handling with "Log in again" prompt

**Technical Notes:** Conversation array in `sessionStorage`. Context windowing for LLM token limits. Detect session expiry via 401 in Apex error handler.

**Priority:** High | **Points:** 5

---

## Journey LLM-16: Cross-Session History & Export (Optional)

**As a** returning applicant, **I want** to optionally view past conversations and export transcripts, **so that** I can reference previous answers.

**Acceptance Criteria:**
- On login, offer to load last 3 session histories
- "Email transcript" option sends formatted conversation to user's email
- "Copy to clipboard" as alternative
- Guest users: session-only (no cross-session history)
- Auto-purge sessions older than 90 days

**Technical Notes:** `Chat_Session__c` and `Chat_Message__c` objects. Scheduled Apex batch for purge. Salesforce Single Email for transcript delivery.

**Priority:** Low | **Points:** 5

---

# DOMAIN 12 — Accessibility & Compliance

## Journey LLM-17: WCAG 2.1 AA Compliance

**As an** applicant using assistive technology, **I want** the chat widget to be fully accessible, **so that** I can use it regardless of ability.

**Acceptance Criteria:**
- Full keyboard navigation: Tab focus, Enter/Space activation, Escape to close
- Focus trap when panel is open; visible focus indicators
- Screen reader support: `role="dialog"`, `aria-live="polite"` for new messages, labeled buttons
- WCAG AA color contrast (4.5:1 normal text, 3:1 large text) in both themes
- Functional at 200% browser zoom without horizontal scroll

**Technical Notes:** SLDS-compliant ARIA attributes. Focus management in LWC. Relative units (`rem`/`em`) for sizing. Test with NVDA and VoiceOver.

**Priority:** High | **Points:** 5

---

## Journey LLM-18: FERPA Compliance & Privacy

**As** the compliance team, **I need** Journey to handle student data per FERPA, **so that** the university avoids regulatory violations.

**Acceptance Criteria:**
- No personal/application data disclosed to unauthenticated users
- Privacy notice in welcome message
- Chat transcripts encrypted at rest (Shield)
- Auto-purge after configurable retention period
- LLM system prompt enforces: "Do not disclose personal data to unauthenticated users"

**Technical Notes:** Shield Platform Encryption on chat objects. Field-level security restricting access. Scheduled Apex purge (180 days default). Consent language in Custom Metadata.

**Priority:** High | **Points:** 5

---

## Journey LLM-19: Multi-Language Support

**As an** international applicant, **I want** Journey to detect and respond in my language, **so that** I can get help even with limited English.

**Acceptance Criteria:**
- Detect non-English input; respond in same language if LLM supports it
- Language selector: English (default), Spanish (Phase 1)
- Static UI labels support i18n via Translation Workbench
- Language preference stored for session

**Technical Notes:** Language preference in `sessionStorage`, passed to LLM system prompt. Salesforce Custom Labels for UI strings.

**Priority:** Low | **Points:** 5

---

# DOMAIN 13 — Analytics & Feedback

## Journey LLM-20: Response Rating

**As an** applicant, **I want** to rate Journey's responses (thumbs up/down), **so that** the team can improve answer quality.

**Acceptance Criteria:**
- Thumbs up/down icons on each Journey message
- Thumbs-down optionally prompts brief feedback text
- Ratings logged to Salesforce with message context
- Non-intrusive; doesn't interrupt conversation

**Technical Notes:** `Message_Rating__c` object. Imperative Apex insert on click. Accessible labels on icons.

**Priority:** Medium | **Points:** 2

---

## Journey LLM-21: Unanswered Question Log

**As an** admissions team member, **I want** to review questions Journey couldn't answer, **so that** I can update the Knowledge base.

**Acceptance Criteria:**
- Auto-logged when confidence below threshold
- Includes: question, attempted response, user context, timestamp
- List View for unaddressed questions; markable as "Addressed"
- Weekly summary report emailed to KB admin

**Technical Notes:** `Unanswered_Question__c` from Journey LLM-11. List View filtered on `Addressed__c = FALSE`. Scheduled report via Salesforce Reporting.

**Priority:** High | **Points:** 3

---

## Journey LLM-22: Usage & Engagement Dashboard

**As a** product owner, **I want** analytics on Journey usage (sessions, duration, top questions, satisfaction, escalation rates), **so that** I can measure ROI.

**Acceptance Criteria:**
- Tracks: sessions/day, messages/session, unique users, peak times
- Top 20 questions by frequency; filterable by program, step, date
- Satisfaction trend (from ratings)
- Escalation volume and resolution time trend
- Conversion: Journey users vs. application completion rate
- Available as Salesforce dashboard

**Technical Notes:** `Chat_Session__c` with aggregation fields. Standard Reports & Dashboards (or CRM Analytics). Topic classification in Apex for question categorization.

**Priority:** Medium | **Points:** 5

---

## Journey LLM-23: Post-Chat Satisfaction Survey

**As an** applicant finishing a chat, **I want** to optionally rate my overall experience, **so that** USAHS can measure assistant quality.

**Acceptance Criteria:**
- 1-5 star rating prompt on chat close (only after 3+ messages)
- Optional comment field
- Dismissible; shown once per session
- Aggregated in analytics dashboard

**Technical Notes:** `Survey_Response__c` object. Trigger in `closeChat()`. Calculate NPS in reports.

**Priority:** Low | **Points:** 3

---

# DOMAIN 14 — Admin & Configuration

## Journey LLM-24: Knowledge Base Management

**As an** admissions admin, **I want** to update Journey's answers by editing Salesforce Knowledge articles, **so that** info stays current without developers.

**Acceptance Criteria:**
- Knowledge articles are Journey's primary source (via RAG)
- Admins create/edit articles via standard Salesforce UI
- Changes reflected within 24 hours
- Article publishing workflow for quality control
- Data Categories: Programs (OTD, Nursing, Education, Certificates), Topics (Admissions, Financial Aid, Documents)

**Technical Notes:** Salesforce Knowledge with Data Categories. RAG pipeline: SOSL search -> inject into LLM prompt. Approval Process for article publishing.

**Priority:** High | **Points:** 5

---

## Journey LLM-25: Quick-Action Chip Configuration

**As an** admissions admin, **I want** to add, edit, and reorder the suggested question chips, **so that** I can promote timely topics.

**Acceptance Criteria:**
- Configurable via Custom Metadata (no code deploy)
- Add/edit/remove/reorder chips
- Visibility rules: Always, Auth Only, Guest Only
- Expiration dates for time-sensitive chips
- Changes take effect immediately

**Technical Notes:** `Journey_Quick_Action__mdt` Custom Metadata Type. Query on panel open in `connectedCallback()`.

**Priority:** Medium | **Points:** 3

---

## Journey LLM-26: Deadline & Date Management

**As an** admissions admin, **I want** to update deadlines and dates that Journey references, **so that** applicants get accurate timing.

**Acceptance Criteria:**
- Deadlines in Salesforce objects, not hardcoded
- Editable via standard Salesforce UI
- Journey auto-reflects changes
- Automated reminder when deadlines approach expiration
- Historical deadlines retained for reporting

**Technical Notes:** `Admission_Deadline__c` object. List View for management. Scheduled Flow for expiration reminders.

**Priority:** High | **Points:** 3

---

## Journey LLM-27: Escalation Review & Management

**As an** admissions team lead, **I want** to review escalated conversations and track resolution, **so that** I can improve quality and identify training gaps.

**Acceptance Criteria:**
- List View of all Journey escalations (Cases with Origin = "Journey AI Chat")
- Includes: question, response, reason, resolution status
- Markable as resolved with notes
- Pattern identification via reporting

**Technical Notes:** Case RecordType "Journey Escalation". Custom List View. Report on escalation reasons and trends.

**Priority:** Medium | **Points:** 3

---

## Journey LLM-28: System Health Monitoring

**As an** IT admin, **I want** to monitor Journey's uptime and LLM API performance, **so that** I can resolve issues quickly.

**Acceptance Criteria:**
- Dashboard: Online/Degraded/Offline status
- LLM response times and error rates
- Email alert if unavailable or response > 5 seconds
- Auto-check every 5 minutes
- 12-month history for SLA reporting

**Technical Notes:** Scheduled Apex health check. `System_Health_Log__c` object. Custom Notification or Flow email on failure.

**Priority:** Low | **Points:** 3

---

# DEPENDENCIES & RISKS

## Licensing

| License | Required? | Fallback |
|---------|-----------|----------|
| Experience Cloud | **Required** | — |
| Salesforce Knowledge | **Required** | Manual FAQ in LLM prompt (not scalable) |
| Einstein AI / Agentforce | Recommended | External LLM via Apex callout |
| Omni-Channel | Optional | Case/callback only (no live chat) |
| Salesforce Scheduler | Optional | External tool (Calendly/Acuity) |
| Shield Encryption | Recommended | Standard encryption |

## Key Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| LLM hallucination | High | RAG with Knowledge articles; confidence thresholds |
| API latency (1-3s) | Medium | Caching; typing indicator; async calls |
| FERPA violation | Critical | Encryption; access controls; privacy notice; DPA with LLM provider |
| Scope creep | Medium | Strict MVP; phased rollout |

---

*Document Version: 2.1 (High-Level)*
*February 2026 | USAHS OLA 2.0 Project*
