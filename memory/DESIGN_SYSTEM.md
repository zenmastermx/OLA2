# Dark Glassmorphism Design System
## Reusable UI Design Prompt for AI Agents

---

# QUICK START PROMPT

Copy this prompt to start any new project with this design style:

> "Build this application using a **dark glassmorphism UI design** with the following specifications:
>
> - **Background:** Near-black (#0A0E14) with dark navy cards (#11161F)
> - **Cards:** Semi-transparent with 12-24px backdrop blur, thin white/5 borders, 16px border radius
> - **Primary Color:** Teal (#00677F) for buttons, links, and accents
> - **Secondary Color:** Purple (#7B68EE) for gradients and special elements
> - **Success/Progress:** Green (#739600)
> - **Warning/Alerts:** Orange (#FF6B35)
> - **Typography:** Bold uppercase headings (Montserrat), Inter for body text
> - **Effects:** Subtle teal glow on hover (box-shadow), smooth 0.3s transitions
> - **Icons:** Lucide React
> - **Components:** Shadcn/UI with Tailwind CSS
>
> The overall feel should be: **modern, professional, futuristic, enterprise-grade dashboard**"

---

# COLOR PALETTE

## Backgrounds
| Name | Hex | Usage |
|------|-----|-------|
| Primary Background | #0A0E14 | Page background, body |
| Card Background | #11161F | Cards, modals, dropdowns |
| Glass Effect | rgba(10, 14, 20, 0.6) | Overlays with backdrop-blur |
| Input Background | rgba(0, 0, 0, 0.2) | Form inputs |

## Primary Colors
| Name | Hex | Usage |
|------|-----|-------|
| Primary Teal | #00677F | Buttons, links, primary actions |
| Primary Hover | #135163 | Hover states for primary |
| Light Teal | #A1D8E0 | Icons, focus rings, subtle accents |

## Accent Colors
| Name | Hex | Usage |
|------|-----|-------|
| Purple | #7B68EE | Secondary actions, gradients, AI features |
| Success Green | #739600 | Progress bars, success states, completion |
| Warning Orange | #FF6B35 | Deadlines, warnings, alerts |
| Error Red | #A4493D | Errors, destructive actions |

## Text Colors
| Name | Hex | Usage |
|------|-----|-------|
| Primary Text | #FFFFFF | Headings, important text |
| Secondary Text | #94A3B8 | Descriptions, body text |
| Muted Text | #64748B | Labels, placeholders |
| Disabled Text | #475569 | Disabled states |

## Borders
| Name | Value | Usage |
|------|-------|-------|
| Default Border | rgba(255, 255, 255, 0.05) | Card borders, dividers |
| Subtle Border | rgba(255, 255, 255, 0.1) | More visible borders |
| Hover Border | rgba(0, 103, 127, 0.3) | Hover states |
| Focus Border | #A1D8E0 | Focus states |

---

# CARD DESIGN (Glassmorphism)

## CSS Implementation
```css
.glass-card {
  background: rgba(17, 22, 31, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  border-color: rgba(0, 103, 127, 0.3);
  box-shadow: 0 0 30px rgba(0, 103, 127, 0.1);
}
```

## Tailwind Classes
```
bg-[#11161F]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6 
hover:border-[#00677F]/30 hover:shadow-[0_0_30px_rgba(0,103,127,0.1)] 
transition-all duration-300
```

---

# TYPOGRAPHY

## Font Families
- **Headings:** 'Montserrat' or 'League Gothic' (bold, impactful)
- **Body:** 'Inter' or system font stack

## Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap');
```

## Size Hierarchy
| Element | Size | Weight | Style |
|---------|------|--------|-------|
| Page Title | text-4xl to text-5xl | Bold | Uppercase, white |
| Section Title | text-2xl | Bold | White |
| Card Label | text-xs | Medium | Uppercase, tracking-wider, slate-500 |
| Large Numbers | text-4xl to text-5xl | Bold | White |
| Body Text | text-sm to text-base | Normal | slate-300 |
| Small Label | text-xs | Normal | slate-500 |

---

# BUTTONS

## Primary Button
```
bg-[#00677F] hover:bg-[#135163] text-white 
rounded-xl px-6 py-3 font-medium
shadow-[0_0_20px_rgba(0,103,127,0.3)] 
hover:shadow-[0_0_30px_rgba(0,103,127,0.5)]
transition-all duration-300
```

## Secondary/Outline Button
```
bg-transparent border border-white/10 text-slate-300 
hover:bg-white/5 hover:text-white 
rounded-xl px-6 py-3 font-medium
transition-all duration-300
```

## Ghost Button
```
bg-transparent text-slate-400 
hover:text-white hover:bg-white/5 
rounded-xl px-4 py-2
transition-all duration-300
```

## Gradient Button (Special CTA)
```
bg-gradient-to-r from-[#00677F]/20 to-[#7B68EE]/20 
border border-[#00677F]/30 hover:border-[#A1D8E0]
text-white rounded-full px-4 py-2
transition-all duration-300
```

---

# FORM INPUTS

## Standard Input
```
h-12 w-full bg-black/20 border border-white/10 rounded-xl px-4 
text-white placeholder:text-slate-600 
focus:border-[#A1D8E0] focus:ring-1 focus:ring-[#A1D8E0] focus:outline-none
transition-all duration-300
```

## Input with Icon
```jsx
<div className="relative">
  <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
  <input className="pl-12 h-12 w-full bg-black/20 border border-white/10 rounded-xl ..." />
</div>
```

## Select/Dropdown
```
h-12 bg-black/20 border border-white/10 rounded-xl px-4 
text-white appearance-none cursor-pointer
focus:border-[#A1D8E0]
```

---

# BADGES & PILLS

## Base Style
```
rounded-full px-3 py-1 text-xs font-medium inline-flex items-center gap-1
```

## Color Variants
| Type | Classes |
|------|---------|
| Teal | bg-[#00677F]/10 border border-[#00677F]/30 text-[#00677F] |
| Purple | bg-[#7B68EE]/10 border border-[#7B68EE]/30 text-[#7B68EE] |
| Green | bg-[#739600]/10 border border-[#739600]/30 text-[#739600] |
| Orange | bg-[#FF6B35]/10 border border-[#FF6B35]/30 text-[#FF6B35] |

---

# STAT CARDS

## Layout Structure
```
┌─────────────────────────────┐
│  LABEL TEXT            [icon]│  ← text-xs uppercase text-slate-500
│                              │
│  72%                         │  ← text-4xl font-bold text-white
│  Description text            │  ← text-sm text-slate-400
│  ████████░░░░                │  ← Progress bar (optional)
└─────────────────────────────┘
```

## Implementation
```jsx
<div className="glass-card rounded-2xl p-6">
  <div className="flex items-center justify-between mb-4">
    <span className="text-xs uppercase tracking-wider text-slate-500">Label</span>
    <Icon className="w-5 h-5 text-[#00677F]" />
  </div>
  <p className="text-4xl font-bold text-white mb-1">72%</p>
  <p className="text-sm text-slate-400">Description text</p>
</div>
```

---

# NAVIGATION BAR

## Container Style
```
fixed top-0 left-0 right-0 z-50 
backdrop-blur-xl bg-[#0A0E14]/80 
border-b border-white/5
```

## Contents Layout
```
┌────────────────────────────────────────────────────────┐
│  [Logo]              [Nav Items]    [CTA] [Avatar] [⚙] │
└────────────────────────────────────────────────────────┘
```

## User Avatar
```
w-10 h-10 rounded-full 
bg-gradient-to-br from-[#00677F] to-[#7B68EE] 
flex items-center justify-center
```

---

# MODALS & OVERLAYS

## Backdrop
```
fixed inset-0 z-50 bg-black/40 backdrop-blur-sm
```

## Modal Container
```
relative max-w-md w-full mx-auto 
bg-[#11161F] border border-white/10 rounded-2xl 
shadow-2xl overflow-hidden
animate-slide-up
```

## Slide Up Animation
```css
@keyframes slide-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-slide-up {
  animation: slide-up 0.3s ease-out forwards;
}
```

---

# ANIMATIONS & EFFECTS

## Glow Effect
```css
/* Default */
box-shadow: 0 0 20px rgba(0, 103, 127, 0.3);

/* Hover */
box-shadow: 0 0 30px rgba(0, 103, 127, 0.5);
```

## Pulse Glow (for important elements)
```css
@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(0, 245, 255, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(0, 245, 255, 0.6);
  }
}

.animate-pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite;
}
```

## Float Animation
```css
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}
```

---

# PAGE LAYOUT TEMPLATE

```jsx
<div className="min-h-screen bg-[#0A0E14]">
  {/* Navigation */}
  <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-[#0A0E14]/80 border-b border-white/5">
    <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      {/* Logo, Nav Items, User */}
    </div>
  </nav>

  {/* Main Content */}
  <main className="pt-24 pb-12 px-4">
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <h1 className="text-4xl font-bold text-white uppercase mb-2">
        Page Title
      </h1>
      <p className="text-slate-400 mb-8">
        Subtitle or description text
      </p>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard />
        <StatCard />
        <StatCard />
      </div>

      {/* Main Content Card */}
      <div className="bg-[#11161F]/80 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
        {/* Content */}
      </div>
    </div>
  </main>
</div>
```

---

# TECH STACK

| Category | Technology |
|----------|------------|
| Framework | React 18+ |
| Styling | Tailwind CSS |
| UI Components | Shadcn/UI |
| Icons | Lucide React |
| Fonts | Google Fonts (Montserrat, Inter) |
| Animations | CSS Keyframes + Tailwind |

---

# ICON USAGE (Lucide React)

```jsx
import { 
  Sparkles,    // AI/Magic features
  Clock,       // Time/Deadlines
  FileText,    // Documents
  User,        // User/Profile
  Settings,    // Settings
  ChevronRight,// Navigation arrows
  Check,       // Success/Checkmarks
  X,           // Close/Cancel
  Send,        // Submit/Send
  Sun,         // Light mode
  Moon,        // Dark mode
  GraduationCap, // Education
  Building,    // Campus/Institution
} from "lucide-react";

// Standard sizes
<Icon className="w-4 h-4" />  // Small (16px)
<Icon className="w-5 h-5" />  // Medium (20px)
<Icon className="w-6 h-6" />  // Large (24px)
```

---

# RESPONSIVE BREAKPOINTS

| Breakpoint | Width | Usage |
|------------|-------|-------|
| Mobile (default) | < 640px | Single column, stacked layouts |
| sm | >= 640px | 2-column grids |
| md | >= 768px | 3-column grids, show secondary elements |
| lg | >= 1024px | Full layouts, sidebars |
| xl | >= 1280px | Max-width containers |

## Common Patterns
```
hidden sm:block          // Hide on mobile, show on sm+
grid-cols-1 md:grid-cols-3  // Stack on mobile, 3-col on md+
text-sm md:text-base     // Smaller text on mobile
px-4 md:px-6 lg:px-8     // Progressive padding
```

---

# CHECKLIST FOR NEW BUILDS

- [ ] Set background color to #0A0E14
- [ ] Import Google Fonts (Montserrat, Inter)
- [ ] Install Lucide React for icons
- [ ] Set up Tailwind with custom colors
- [ ] Create glass-card CSS class
- [ ] Add glow animations
- [ ] Use rounded-xl or rounded-2xl for all cards
- [ ] Apply backdrop-blur to overlays
- [ ] Use teal (#00677F) as primary action color
- [ ] Ensure all interactive elements have hover states
- [ ] Test dark mode appearance
- [ ] Verify responsive behavior on mobile

---

# EXAMPLE COMPONENTS

## AI Assistant Button
```jsx
<button className="bg-gradient-to-r from-[#00677F]/20 to-[#7B68EE]/20 
                   border border-[#00677F]/30 hover:border-[#A1D8E0] 
                   rounded-full px-4 py-2 flex items-center gap-2 
                   text-white transition-all">
  <Sparkles className="w-4 h-4 text-[#A1D8E0]" />
  <span>Ask AI</span>
</button>
```

## Progress Circle
```jsx
<div className="relative w-20 h-20">
  <svg className="w-20 h-20 transform -rotate-90">
    <circle cx="40" cy="40" r="36" stroke="#1E293B" strokeWidth="8" fill="none" />
    <circle cx="40" cy="40" r="36" stroke="#00677F" strokeWidth="8" fill="none"
            strokeDasharray={`${percentage * 2.26} 226`} strokeLinecap="round" />
  </svg>
  <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">
    {percentage}%
  </span>
</div>
```

## Status Badge
```jsx
<span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium
                 bg-[#739600]/10 border border-[#739600]/30 text-[#739600]">
  <Check className="w-3 h-3" />
  Complete
</span>
```

---

*Design System v1.0 - Dark Glassmorphism Dashboard*
*Created for consistent UI across all builds*
