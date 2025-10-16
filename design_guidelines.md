# Design Guidelines - 맛집찾아 (Restaurant Finder Service)

## Design Approach
**Reference-Based Approach** - Drawing inspiration from leading food discovery platforms (Yelp, Baemin, OpenTable) with a modern Korean web service aesthetic. The design balances vibrant food-industry appeal with professional credibility to attract users, food critics, and advertisers.

## Core Design Principles
1. **Food-First Visual Language** - Warm, appetizing aesthetics that evoke culinary excellence
2. **Trust & Credibility** - Professional presentation to attract quality critics and advertisers  
3. **Clear User Journeys** - Three distinct paths (users, critics, advertisers) with dedicated sections
4. **Conversion-Focused** - Strategic form placement and benefit communication

## Color Palette

### Light Mode
- **Primary**: 15 85% 50% (Vibrant orange-red, food/appetite appeal)
- **Secondary**: 25 75% 45% (Warm amber, premium feel)
- **Neutral Base**: 0 0% 98% (Soft white backgrounds)
- **Text Primary**: 0 0% 15% (Near black for readability)
- **Text Secondary**: 0 0% 45% (Mid gray)
- **Success/CTA**: 142 70% 45% (Fresh green)

### Dark Mode  
- **Primary**: 15 80% 55% (Slightly brighter orange-red)
- **Secondary**: 25 70% 50% (Warmed amber)
- **Background**: 0 0% 8% (Deep charcoal)
- **Surface**: 0 0% 12% (Elevated elements)
- **Text Primary**: 0 0% 95% (Off-white)
- **Text Secondary**: 0 0% 65% (Light gray)

## Typography

**Font Families:**
- Primary: 'Pretendard', -apple-system, sans-serif (Korean-optimized)
- Accent: 'Inter', sans-serif (for numbers/English)

**Type Scale:**
- Hero Headline: text-5xl md:text-6xl lg:text-7xl, font-bold
- Section Headers: text-3xl md:text-4xl lg:text-5xl, font-bold
- Subsection Headers: text-2xl md:text-3xl, font-semibold
- Body Large: text-lg md:text-xl, font-normal
- Body: text-base, font-normal
- Small/Caption: text-sm, font-medium

## Layout System

**Spacing Primitives:** Tailwind units 4, 6, 8, 12, 16, 20, 24
- Micro spacing (within components): p-4, gap-4
- Component spacing: p-6, gap-6  
- Section padding (mobile): py-12, px-4
- Section padding (desktop): py-20 md:py-24, px-6
- Major spacing: mt-16, mb-20

**Container Strategy:**
- Full-width sections with max-w-7xl inner containers
- Form containers: max-w-2xl for optimal readability
- Text content: max-w-4xl

**Grid Layouts:**
- Benefits/Features: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Statistics: grid-cols-2 md:grid-cols-4
- Forms: Single column, full-width inputs

## Component Library

### Navigation
- Sticky header with glass-morphism effect (backdrop-blur-lg bg-white/90)
- Logo + CTA button on right
- Mobile: Hamburger menu

### Hero Section (80vh)
- Split layout: Left (headline + subtext + primary CTA), Right (hero illustration/image)
- Gradient background overlay: from-primary/10 to-secondary/5
- No hero image - use food-themed illustration or icon pattern

### Form Components
**Three Distinct Form Sections:**

1. **Location Request Form** (위치 입력 폼)
   - Fields: Name (이름), Address (주소)
   - Benefit callouts above form (3 cards with icons)
   - Orange-red CTA button

2. **Food Critic Recruitment** (미식가 모집 폼)  
   - Fields: Name, Email, Phone
   - Qualification criteria displayed as checklist (식품 종사자, SNS 보유 etc.)
   - Benefits grid below form (4-6 items)
   - Amber/secondary colored CTA

3. **Advertiser Application** (광고주 모집 폼)
   - Fields: Company Name, Representative, Phone, Email
   - Positioned in footer area with dark background
   - Advertising benefits highlighted
   - Success/green CTA button

**Form Styling:**
- Input fields: Rounded-lg, border-2, focus:ring-2 focus:ring-primary
- Labels: font-medium, text-sm, mb-2
- Buttons: Rounded-lg, px-8, py-3, font-semibold, shadow-lg
- Form containers: bg-white dark:bg-surface, rounded-2xl, p-8, shadow-xl

### Benefits/Features Cards
- Icon (text-4xl) + Title (text-xl font-bold) + Description
- Rounded-xl, p-6, border or shadow
- Hover: transform scale-105, transition-all
- 3-column grid on desktop

### Statistics Section
- Large numbers (text-5xl font-bold, gradient text)
- Labels below (text-sm uppercase tracking-wide)
- 4-column layout, centered

### Footer
- Dark background (bg-neutral-900)
- Three columns: Company Info, Quick Links, Advertiser CTA
- Company details: 맛집찾아, 이재영 (개인정보책임자), 성북구 정릉로 77 국민대학교 경영관
- Social media icons
- Copyright text

### Admin Dashboard
- Sidebar navigation (fixed left, dark theme)
- Data tables with filters
- Tab system: Location Requests, Critic Applications, Ad Applications  
- Clean data display: alternating row colors, hover states
- Action buttons per row (view details, etc.)

## Page Structure (Landing Page)

**Section Order:**
1. Hero (headline + main CTA)
2. Why Use Our Service (앱 이용 혜택) - 3-4 benefit cards
3. Location Request Form + Supporting benefits
4. Food Critic Recruitment (미식가 모집)
   - Qualification criteria display
   - Benefits breakdown
   - Application form
5. Success Stories / Statistics
6. Footer with Advertiser Section (광고주 모집)

## Images

**Hero Section:**
- Illustration/pattern showing Korean food elements (bibimbap, tteokbokki icons)
- Alternative: Stylized map with restaurant pins
- Placement: Right side of hero, 40-50% width

**Section Dividers:**
- Subtle food-themed decorative elements (chopsticks, bowls as SVG patterns)

**Icons:**
- Use Heroicons for UI elements
- Custom food icons for benefits (location pin + fork, star + chef hat, etc.)

## Animations

**Minimal, purposeful animations:**
- Hero CTA: Subtle pulse effect
- Form submit: Loading spinner + success checkmark
- Card hover: Gentle lift (translateY(-4px))
- Page load: Fade-in sections with stagger (delay-100, delay-200)

## Accessibility

- Maintain WCAG AA contrast ratios
- Dark mode: Ensure form inputs have proper contrast (bg-surface with light borders)
- Focus indicators: ring-2 ring-primary ring-offset-2
- Keyboard navigation for all interactive elements
- Korean language support throughout

## Admin Page Styling

- Dark theme by default (bg-neutral-900)
- Data tables: Striped rows, hover:bg-neutral-800
- Login page: Centered card, max-w-md, primary colored submit button
- Responsive table: Horizontal scroll on mobile