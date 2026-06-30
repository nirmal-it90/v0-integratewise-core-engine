# Webflow Site Enhancement Guide

Complete guide to enhancing your Webflow site based on the 36-page marketing site specification.

## 🎯 Overview

This guide helps you transform your existing Webflow site into a comprehensive 36-page marketing website for IntegrateWise OS, following the specifications in `V0_LANDING_SITE_PROMPT.md`.

## 📋 Prerequisites

1. **Webflow API Key** - Already integrated ✅
2. **Webflow Site** - Your existing site
3. **Node.js & pnpm** - For running scripts

## 🚀 Quick Start

### Step 1: Audit Your Current Site

```bash
cd apps/integratewise-webhooks
export WEBFLOW_API_KEY=your-api-key-here
pnpm install
pnpm webflow:audit
```

This will:
- List all your Webflow sites
- Show existing collections
- Identify what's missing
- Generate recommendations

### Step 2: Review Enhancement Plan

```bash
# Get your site ID from the audit, then:
pnpm webflow:enhance <site-id>
```

This generates a detailed enhancement plan showing:
- Required CMS collections
- All 36 pages needed
- Component requirements
- Design system specifications

## 📚 Required CMS Collections

Create these collections in Webflow Designer:

### 1. Blog Posts
- **Slug**: `blog-posts`
- **Fields**:
  - Title (Plain Text, Required)
  - Slug (Plain Text, Required)
  - Excerpt (Plain Text)
  - Content (Rich Text)
  - Author (Plain Text)
  - Published Date (Date)
  - Featured Image (Image Reference)
  - Engine Stage (Option)
  - Hat (Option)
  - Industry (Option)

### 2. Case Studies
- **Slug**: `case-studies`
- **Fields**:
  - Title (Plain Text, Required)
  - Slug (Plain Text, Required)
  - Company (Plain Text)
  - Industry (Option)
  - Pain (Plain Text)
  - Outcome (Plain Text)
  - Engine Stages (Option - Multi)
  - Hat (Option)
  - Stats (Rich Text)
  - Testimonial (Rich Text)
  - Featured Image (Image Reference)

### 3. Testimonials
- **Slug**: `testimonials`
- **Fields**:
  - Quote (Rich Text, Required)
  - Author (Plain Text)
  - Role (Plain Text)
  - Company (Plain Text)
  - Hat (Option)
  - Engine Stage (Option)
  - Avatar (Image Reference)

### 4. Team Members
- **Slug**: `team-members`
- **Fields**:
  - Name (Plain Text, Required)
  - Role (Plain Text)
  - Bio (Rich Text)
  - Photo (Image Reference)
  - LinkedIn (Link)
  - Twitter (Link)

## 📄 Required Pages (36 Total)

### Core Pages (22)
1. `/` - Home
2. `/how-it-works` - How It Works
3. `/engine-stages` - Engine Stages Overview (optional)
4. `/engine-stages/load` - Load
5. `/engine-stages/normalize` - Normalize
6. `/engine-stages/think` - Think
7. `/engine-stages/act` - Act
8. `/engine-stages/govern` - Govern
9. `/engine-stages/repeat` - Repeat
10. `/roles` - Roles Overview
11. `/roles/visionary` - Visionary
12. `/roles/missionary` - Missionary
13. `/roles/practitioner` - Practitioner
14. `/roles/passenger` - Passenger
15. `/use-cases` - Use Cases
16. `/architecture` - Architecture
17. `/security` - Security & Governance
18. `/integrations` - Integrations
19. `/case-studies` - Case Studies
20. `/pricing` - Pricing
21. `/blog` - Blog
22. `/contact` - Contact / Demo
23. `/about` - About

### Practitioner Domain Pages (13)
24. `/practitioners/research`
25. `/practitioners/development`
26. `/practitioners/marketing`
27. `/practitioners/sales`
28. `/practitioners/finance`
29. `/practitioners/strategy`
30. `/practitioners/customer-success`
31. `/practitioners/employee-relations`
32. `/practitioners/freelancers`
33. `/practitioners/institutions`
34. `/practitioners/educators`
35. `/practitioners/management`
36. `/practitioners/students`

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#0066FF → #0044CC)
- **Secondary**: Slate grays for text
- **Accent**: Green (success), Orange (warnings)
- **Style**: Clean, professional, enterprise SaaS

### Typography
- **Font**: Inter or similar modern sans-serif
- **Headings**: Bold, clear hierarchy
- **Body**: Readable, 16px base size

### Components
Create these reusable components in Webflow:

1. **Navbar** (sticky)
   - Logo
   - Navigation links with dropdowns
   - CTA button

2. **HeroSection**
   - Headline
   - Subheadline
   - Primary & Secondary CTAs
   - Visual/animation

3. **FeatureSection**
   - Single feature highlight
   - Pain/Cost/Solution/Outcome format
   - Engine Stage badge
   - Hat badge

4. **FeaturesListSection**
   - 3-column grid
   - Pain/Solution format
   - Icons

5. **HowItWorksSection**
   - Step-by-step layout
   - 6 Engine Stages
   - Visual flow

6. **BenefitsSection**
   - Bullet list format
   - Icons
   - Clear value props

7. **StatsSection**
   - Metrics bar
   - Large numbers
   - Labels

8. **TestimonialSection**
   - Quote cards
   - Author info
   - Avatar

9. **CTASection**
   - Headline
   - CTA button
   - Secondary link

10. **GallerySection**
    - Before/After visuals
    - Image comparison

11. **FAQSection**
    - Accordion format
    - Expandable Q&A

12. **LogoListSection**
    - Trusted by logos
    - Grid layout

13. **Footer**
    - Multi-column links
    - Social links
    - Legal links

## 📝 Content Population

### Populate Testimonials

```bash
# After creating the testimonials collection in Webflow:
pnpm webflow:content-generator <site-id> <collection-id> testimonials
```

### Populate Case Studies

```bash
pnpm webflow:content-generator <site-id> <collection-id> case-studies
```

### Populate Blog Posts

```bash
pnpm webflow:content-generator <site-id> <collection-id> blog-posts
```

## 🔧 Implementation Checklist

### Phase 1: Foundation
- [ ] Audit existing site
- [ ] Create CMS collections
- [ ] Set up design system (colors, fonts)
- [ ] Create reusable components

### Phase 2: Core Pages
- [ ] Home page with all sections
- [ ] How It Works page
- [ ] Navigation structure
- [ ] Footer component

### Phase 3: Engine Stages
- [ ] All 6 Engine Stage pages
- [ ] Consistent layout and messaging
- [ ] Visual diagrams/illustrations

### Phase 4: Roles
- [ ] Roles overview page
- [ ] 4 individual hat pages
- [ ] Role-specific content

### Phase 5: Practitioners
- [ ] All 13 Practitioner domain pages
- [ ] Domain-specific content
- [ ] Use case examples

### Phase 6: Support Pages
- [ ] Architecture page
- [ ] Security page
- [ ] Integrations page
- [ ] Pricing page
- [ ] Contact page
- [ ] About page

### Phase 7: Content
- [ ] Populate CMS collections
- [ ] Add testimonials
- [ ] Create case studies
- [ ] Write blog posts
- [ ] Add team members

### Phase 8: Polish
- [ ] SEO metadata for all pages
- [ ] Form handlers (contact, demo)
- [ ] Analytics setup
- [ ] Mobile responsiveness
- [ ] Performance optimization

## 🎯 Key Messaging Principles

1. **Pain-First**: Every section starts with the problem
2. **Engine Stage Badges**: Show which stage each feature relates to
3. **Hat Badges**: Show which role benefits
4. **Real Numbers**: Use specific stats (hours, percentages)
5. **Traceable**: Everything connects back to the Goal Cascade

## 📊 Page Specifications

Each page follows a specific structure. See `V0_LANDING_SITE_PROMPT.md` for detailed specifications for:
- Section order
- Content requirements
- Component usage
- Messaging guidelines

## 🔗 Integration Points

### Forms
- Contact form → Webhook endpoint
- Demo request → Webhook endpoint
- Newsletter signup → Webhook endpoint

### CMS
- Blog posts → Dynamic pages
- Case studies → Dynamic pages
- Testimonials → Reusable across pages

## 🚨 Important Notes

1. **Collections must be created in Webflow Designer** - The API can't create collections, only items
2. **Pages should be created in Webflow Designer** - Use the API to populate content
3. **Design system should be set up first** - Colors, fonts, spacing
4. **Components should be reusable** - Create symbols for repeated elements
5. **Mobile-first design** - Ensure all pages are responsive

## 📞 Next Steps

1. Run the audit script to see current state
2. Review the enhancement plan
3. Create missing collections in Webflow Designer
4. Build page structure
5. Populate content using the scripts
6. Apply design system
7. Test and iterate

## 🎉 Success Criteria

Your site is complete when:
- ✅ All 36 pages exist and are accessible
- ✅ All CMS collections are created and populated
- ✅ Navigation structure is clear and functional
- ✅ Design system is consistently applied
- ✅ All forms are connected to webhooks
- ✅ SEO metadata is set for all pages
- ✅ Site is mobile-responsive
- ✅ Content matches the specification

---

**Need Help?** Check the Webflow API documentation or run the audit script to see what's missing.
