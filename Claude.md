# Shreeja Digital Agency - Storyboard Website Development Guide

**Project Type:** Highly Animated & Interactive Storyboard Website  
**Build Tool:** Claude Code (Terminal/VS Code)  
**Framework:** React 18+ / Next.js (Recommended) or HTML/CSS/JS  
**Status:** Ready for Development

---

## 📋 PROJECT OVERVIEW

Build a captivating, fully-animated storyboard website that tells Shreeja's transformation story through:
- **Parallax scrolling effects** with layered depth
- **Interactive story stages** revealing services progressively
- **Smooth transitions & micro-interactions** throughout
- **Brand-consistent visuals** using Shreeja's creative & playful aesthetic
- **High performance** with optimized animations

**Key References:**
- Oak Harbor Web Designs (animation quality, flow)
- Oui Digital (layout sophistication, conversion focus)

---

## 🎨 BRAND GUIDELINES

### Color Palette
```
Primary Orange:     #FF6B35  (Bold, energetic, action-oriented)
Primary Navy:       #001F3F  (Professional, trustworthy, grounded)
Accent Orange:      #FF8C5A  (Lighter, secondary emphasis)
Navy Dark:          #000B1A  (Deepest shadows, contrast)
Neutral Light:      #F5F5F5  (Backgrounds, surfaces)
Neutral Dark:       #1A1A1A  (Text, depth)
Success Green:      #06B6D4  (Highlights, CTAs - optional accent)
```

### Typography
- **Display Font:** Space Grotesk (Bold headlines, hero text)
- **Primary Font:** Poppins (Body, subheadings, UI)
- **Fallback:** Inter (System fallback)
- **Font Weights:** 600 (headings), 500 (subheadings), 400 (body)

### Logo Usage
- **Primary:** Full logo (Shreeja mark + text) - use at hero, footer
- **Mark Only:** The geometric "S" shape - use as favicon, accent elements
- **Logo Color:** Preserve orange (#FF6B35) and navy (#001F3F)
- **Min Size:** 120px width for legibility
- **Clear Space:** 20px minimum around logo

---

## 🛠 TECHNICAL STACK

### Recommended Setup
```bash
# Next.js + Tailwind (Fastest development)
npx create-next-app@latest shreeja-agency --typescript --tailwind

# OR React + Vite (Lightweight alternative)
npm create vite@latest shreeja-agency -- --template react-ts

# OR Plain HTML/CSS/JS (No build step required)
```

### Key Libraries
```json
{
  "framer-motion": "^10+",          // Smooth animations & parallax
  "gsap": "^3.12+",                 // Advanced timeline animations
  "react-scroll": "^1.8+",          // Smooth scroll handling
  "lenis": "^1+",                   // High-performance smooth scroll
  "tailwindcss": "^3.3+",           // Utility-first styling
  "clsx": "^2+",                    // Conditional className utility
  "lucide-react": "^0.263+"         // Modern icon library
}
```

### Development Tools
- **VS Code Extensions:** ES7+ React/Redux, Tailwind CSS IntelliSense
- **Browser:** Chrome DevTools (Performance tab for animation optimization)
- **Lighthouse:** Monitor performance, accessibility, SEO

---

## 📐 DESIGN SYSTEM & VARIABLES

### CSS Custom Properties (Root Variables)
```css
:root {
  /* Colors */
  --primary-orange: #FF6B35;
  --primary-navy: #001F3F;
  --accent-orange: #FF8C5A;
  --navy-dark: #000B1A;
  --light-bg: #F5F5F5;
  --dark-text: #1A1A1A;
  --cyan-accent: #06B6D4;
  
  /* Typography */
  --font-display: 'Space Grotesk', sans-serif;
  --font-primary: 'Poppins', sans-serif;
  --font-fallback: 'Inter', sans-serif;
  
  /* Spacing */
  --spacing-xs: 0.5rem;
  --spacing-sm: 1rem;
  --spacing-md: 2rem;
  --spacing-lg: 4rem;
  --spacing-xl: 6rem;
  --spacing-2xl: 8rem;
  
  /* Border Radius */
  --radius-sm: 0.5rem;
  --radius-md: 1rem;
  --radius-lg: 2rem;
  --radius-full: 9999px;
  
  /* Z-Index Scale */
  --z-dropdown: 10;
  --z-fixed: 20;
  --z-sticky: 30;
  --z-modal: 40;
  
  /* Animation Timing */
  --duration-fast: 200ms;
  --duration-base: 300ms;
  --duration-slow: 500ms;
  --easing-ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --easing-elastic: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### Tailwind Configuration (tailwind.config.js)
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        shreeja: {
          orange: '#FF6B35',
          'orange-light': '#FF8C5A',
          navy: '#001F3F',
          'navy-dark': '#000B1A',
          cyan: '#06B6D4',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
};
```

---

## 🎬 ANIMATION STRATEGY

### Parallax System
- **Background layers:** Move at 0.3-0.5x scroll speed
- **Mid-ground layers:** Move at 0.7-0.9x scroll speed
- **Foreground elements:** Move at 1x scroll speed (normal)
- **Text/UI:** Stay at 1x (no parallax to preserve readability)

### Scroll Triggers
- **Hero entrance:** Fade-in + scale (0.9 → 1)
- **Section cards:** Slide-in from sides + opacity
- **Counter animations:** Trigger at 80% viewport visibility
\
\

'- **Video/rich media:** Use Intersection Observer for play/pause

### Micro-interactions
- **Buttons:** Hover scale (1 → 1.05), active press down (0.95)
- **Cards:** Shadow lift on hover, color transition 200ms
- **Links:** Underline animation on hover
- **Scroll hints:** Bounce animation (pulse effect)

### Performance Optimization
- Use `transform` & `opacity` only (GPU-accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Implement `will-change: transform` on frequently animated elements
- Debounce scroll events, use `requestAnimationFrame`
- Lazy-load images with `loading="lazy"`

---

## 📄 PAGE STRUCTURE & CONTENT

### 1. Hero Section (100vh)
```
├─ Background parallax layers (shapes, gradients)
├─ Logo (fixed/sticky in header)
├─ Hero headline: "Transform Your Digital Vision"
├─ Subheading: "Creative solutions for modern brands"
├─ CTA Button: "Start Your Story"
└─ Scroll hint (animated chevron/arrow)
```

### 2. Storyboard Sections (5 stages)
Each section follows alternating left/right layout:

**Stage 1: Discovery**
- Visual: Animated brain/lightbulb icon
- Headline: "Understanding Your Vision"
- Bullet points: Research, strategy, goals
- Animation: Fade-in on scroll, icon pulse

**Stage 2: Strategy**
- Visual: Animated roadmap/timeline
- Headline: "Mapping the Path Forward"
- Bullet points: Planning, milestones, KPIs

**Stage 3: Design**
- Visual: Animated design tools/wireframe
- Headline: "Crafting Digital Experiences"
- Bullet points: UI/UX, brand consistency, accessibility

**Stage 4: Development**
- Visual: Animated code/terminal screen
- Headline: "Building with Precision"
- Bullet points: Technology, performance, scalability

**Stage 5: Launch & Growth**
- Visual: Animated rocket/upward graph
- Headline: "Launch & Scale"
- Bullet points: Deployment, optimization, analytics

### 3. Results/Impact Section
- Grid of stat cards with counters
- Testimonial carousel (optional)
- Before/after case study cards

### 4. Services Showcase
- Grid of service cards (6-9 services)
- Hover animations revealing descriptions
- Icon + title + short copy per service

### 5. CTA Section
- Large headline: "Ready to Transform?"
- Input field for email
- Secondary CTA: "Schedule a Call"

### 6. Footer
- Logo (Shreeja mark)
- Quick links
- Contact info
- Social media links
- Copyright

---

## 🏗 COMPONENT ARCHITECTURE

### React/Next.js Structure
```
src/
├─ components/
│  ├─ Hero.jsx              // Hero section with parallax
│  ├─ StoryCard.jsx         // Individual storyboard card
│  ├─ StoryboardSection.jsx // Container for all stages
│  ├─ ResultsSection.jsx    // Stats & metrics
│  ├─ ServicesGrid.jsx      // Service cards showcase
│  ├─ CTASection.jsx        // Call-to-action
│  ├─ Navigation.jsx        // Header/nav bar
│  ├─ Footer.jsx
│  └─ shared/
│     ├─ Button.jsx         // Reusable button
│     ├─ Card.jsx           // Card wrapper
│     └─ IconComponent.jsx  // SVG icon wrapper
├─ hooks/
│  ├─ useParallax.js        // Custom parallax hook
│  ├─ useScrollTrigger.js   // Scroll animation trigger
│  └─ useCountUp.js         // Counter animation hook
├─ styles/
│  ├─ globals.css           // Global styles
│  ├─ animations.css        // All animations
│  └─ variables.css         // CSS variables
├─ utils/
│  ├─ animations.js         // Animation utilities
│  └─ constants.js          // Config & constants
└─ pages/
   ├─ index.jsx             // Main page
   └─ api/                  // API routes (if needed)
```

---

## 🎯 FEATURE PRIORITY & ROADMAP

### Phase 1: Foundation (Week 1)
- [ ] Project setup (Next.js or React + Vite)
- [ ] Install & configure dependencies
- [ ] Set up Tailwind with Shreeja theme
- [ ] Create Hero section with logo
- [ ] Basic Navigation bar
- [ ] Footer component

### Phase 2: Core Storyboard (Week 2)
- [ ] Build 5 story stages (cards, content, icons)
- [ ] Implement basic scroll animations
- [ ] Parallax layer system
- [ ] Story card alternating layout

### Phase 3: Advanced Animations (Week 3)
- [ ] Smooth scrolling (Lenis or native smooth-scroll)
- [ ] Section reveal animations
- [ ] Counter animations for stats
- [ ] Hover micro-interactions on cards
- [ ] Button animations & states

### Phase 4: Interactive Features (Week 4)
- [ ] Services grid with hover reveal
- [ ] CTA email input with validation
- [ ] Testimonial carousel (optional)
- [ ] Case study modal/lightbox (optional)
- [ ] Dark mode toggle (optional)

### Phase 5: Optimization & Polish (Week 5)
- [ ] Performance audits (Lighthouse)
- [ ] Image optimization & lazy loading
- [ ] SEO optimization (meta tags, structured data)
- [ ] Mobile responsiveness testing
- [ ] Cross-browser testing

---

## 🚀 DEVELOPMENT WORKFLOW WITH CLAUDE CODE

### Step 1: Initialize Project
```bash
# Terminal in VS Code
npx create-next-app@latest shreeja --typescript --tailwind --eslint

# OR for React + Vite
npm create vite@latest shreeja -- --template react-ts
cd shreeja && npm install
```

### Step 2: Configure Claude Integration
1. Open project in Claude Code (VS Code)
2. Create `.claude.json` at root:
```json
{
  "projectName": "Shreeja Digital Agency",
  "description": "Animated storyboard website with parallax effects",
  "stack": ["Next.js", "React 18", "Tailwind CSS", "Framer Motion"],
  "brandColors": {
    "primary": "#FF6B35",
    "secondary": "#001F3F"
  }
}
```

### Step 3: Build Components (Ask Claude Code to build)
Example prompts to use with Claude Code:

**For Hero Section:**
> "Create a Hero component with the Shreeja logo, headline 'Transform Your Digital Vision', parallax background shapes (animated orange and navy), and a CTA button. Use Framer Motion for animations."

**For Storyboard Card:**
> "Build a StoryCard component that alternates left/right layout. Include: number badge, headline, description text, bullet points, and an animated icon placeholder. Add scroll-triggered fade-in animation."

**For Animations:**
> "Create a custom useParallax hook that detects scroll position and applies transform: translateY based on viewport depth (0.3x speed). Implement useScrollTrigger hook for on-scroll animations with Intersection Observer."

### Step 4: Iterative Development
- Build small, testable components
- Test animations in browser (DevTools Performance tab)
- Refine based on performance metrics
- Get Claude Code to refactor & optimize

### Step 5: Deployment
```bash
# For Next.js
npm run build
npm start

# Deploy to Vercel (recommended)
npm i -g vercel
vercel
```

---

## 💡 KEY PROMPTS FOR CLAUDE CODE

### Component Development
```
"Build [ComponentName] using React hooks. 
Requirements: [list features]
Styling: Use Tailwind CSS with Shreeja colors (#FF6B35, #001F3F)
Animations: Implement [specific animation]
Type: [TypeScript/JavaScript]"
```

### Animation Implementation
```
"Create a [animation type] animation using Framer Motion.
Trigger: [scroll/click/hover]
Duration: [milliseconds]
Easing: [ease function]
Make sure it's GPU-accelerated (use transform & opacity only)"
```

### Optimization Request
```
"Audit this component for performance issues.
Check: animation smoothness, bundle size, render efficiency
Suggest: optimizations using React.memo, useCallback, Intersection Observer
Implement: the top 3 improvements"
```

---

## 🎨 DESIGN TOKENS FOR DEVELOPMENT

### Colors in Use
- **CTAs & Highlights:** #FF6B35 (Shreeja Orange)
- **Professional Sections:** #001F3F (Shreeja Navy)
- **Backgrounds:** #F5F5F5 (Light) or #000B1A (Dark)
- **Accents/Links:** #06B6D4 (Cyan)
- **Hover States:** Lighten/darken by 10%

### Spacing Scale
- xs: 8px
- sm: 16px
- md: 32px
- lg: 64px
- xl: 96px

### Typography Hierarchy
- H1: 48-56px, 600 weight (Space Grotesk)
- H2: 32-40px, 600 weight (Space Grotesk)
- H3: 24-28px, 600 weight (Poppins)
- Body: 16px, 400 weight (Poppins)
- Small: 14px, 400 weight (Poppins)

### Border Radius
- Buttons/small elements: 8px
- Cards/large elements: 16px
- Circular: 50%

---

## 🔍 QUALITY CHECKLIST

Before launching, verify:

- [ ] Logo displays correctly (all sizes, light/dark)
- [ ] Colors match brand (#FF6B35, #001F3F exact)
- [ ] Typography uses Poppins & Space Grotesk
- [ ] All animations use GPU-accelerated properties
- [ ] Parallax smooth on 60fps (DevTools Performance)
- [ ] Mobile responsive (tested on iPhone, Android)
- [ ] Accessibility score 90+ (Lighthouse)
- [ ] Performance score 90+ (Lighthouse)
- [ ] SEO score 100 (meta, og tags, schema)
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)
- [ ] Image optimization (WebP, lazy loading)
- [ ] No console errors/warnings
- [ ] CTA elements have clear focus states
- [ ] Touch-friendly (min 44px tap targets)

---

## 🔗 USEFUL RESOURCES

- **Framer Motion Docs:** https://www.framer.com/motion/
- **GSAP:** https://greensock.com/gsap/
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Web Animations Perf:** https://web.dev/animations-guide/
- **Shreeja Brand Assets:** Keep logo at `/public/shreeja-logo.png`

---

## 📝 NOTES FOR YOUR DEVELOPMENT

1. **Logo Integration:** Embed Shreeja logo at top-left (sticky) and footer. Use the mark as favicon.
2. **Color Consistency:** Use #FF6B35 (orange) for all primary CTAs and highlights.
3. **Tone:** Keep copy playful but professional—match "creative & playful" brand personality.
4. **Animation Restraint:** More isn't better; prioritize UX clarity over flashiness.
5. **Accessibility:** All animated elements must have `prefers-reduced-motion` fallback.
6. **Mobile-First:** Design for mobile first, then enhance for desktop.

---

## 🎯 SUCCESS METRICS

Once launched, track:
- ✅ Page load time < 3 seconds
- ✅ Animation frame rate 60 FPS (consistently)
- ✅ Mobile Lighthouse score > 90
- ✅ Scroll smoothness rated "smooth" by users
- ✅ CTA click-through rate target: 8%+
- ✅ Bounce rate < 40%

---

**Ready to build?** Start with Claude Code terminal and ask: "Initialize Shreeja Digital Agency website project with Next.js, Tailwind, and Framer Motion. Create Hero component first."

Good luck! 🚀