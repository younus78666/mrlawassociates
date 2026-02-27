# LOCAL SEO WEBSITE BUILD WORKFLOW
## Visual Process Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        PHASE 1: RESEARCH & STRATEGY                         │
│                           (Days 1-3)                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐  │
│  │   Business  │───▶│   Keyword   │───▶│   Content   │───▶│     URL     │  │
│  │   Analysis  │    │   Research  │    │   Strategy  │    │  Structure  │  │
│  └─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘  │
│         │                  │                  │                  │          │
│         ▼                  ▼                  ▼                  ▼          │
│    • Services         • Primary          • Homepage         • /           │
│    • Competitors        keywords         • Services         • /services/  │
│    • Target            • Secondary       • Locations        • /location/  │
│      audience            keywords        • Blog posts       • /blog/      │
│    • USPs              • Long-tail                                     │
│                          keywords                                         │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      PHASE 2: TECHNICAL FOUNDATION                          │
│                           (Days 4-5)                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐            │
│   │   Setup  │    │ Configure│    │   Base   │    │ Config   │            │
│   │  Domain  │───▶│ Hosting  │───▶│ Template │───▶│  Files   │            │
│   │   + SSL  │    │  + CDN   │    │          │    │          │            │
│   └──────────┘    └──────────┘    └──────────┘    └──────────┘            │
│        │               │               │               │                   │
│        ▼               ▼               ▼               ▼                   │
│   • HTTPS           • Vercel       • HTML5         • robots.txt          │
│   • WWW redirect    • Preconnect   • CSS Reset     • sitemap.xml         │
│   • Git Repo        • Security     • Viewport      • vercel.json         │
│                       Headers      • Charset       • site.webmanifest      │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                       PHASE 3: DESIGN SYSTEM & UX                           │
│                           (Days 6-7)                                        │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   ┌────────────┐    ┌────────────┐    ┌────────────┐    ┌────────────┐    │
│   │   Brand    │    │    CSS     │    │ Components │    │  UX/Access │    │
│   │  Identity  │───▶│   System   │───▶│   Library  │───▶│   ibility  │    │
│   └────────────┘    └────────────┘    └────────────┘    └────────────┘    │
│        │                 │                  │                  │            │
│        ▼                 ▼                  ▼                  ▼            │
│   • Colors          • Variables        • Buttons         • WCAG 2.1 AA   │
│   • Typography      • Typography       • Cards           • Mobile-first  │
│   • Logo            • Spacing          • Forms           • Touch targets │
│   • Max-width       • Shadows          • Tables          • Alt text      │
│                     • Grid                                    • ARIA       │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PHASE 4: CORE TEMPLATES DEVELOPMENT                      │
│                           (Days 8-12)                                       │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌─────────┐ │
│   │ Homepage  │  │  Service  │  │ Location  │  │   Blog    │  │Components│ │
│   │ Template  │  │ Template  │  │ Template  │  │ Template  │  │(Header/  │ │
│   └───────────┘  └───────────┘  └───────────┘  └───────────┘  │ Footer)  │ │
│        │              │              │              │          └─────────┘ │
│        ▼              ▼              ▼              ▼                       │
│   • Hero           • Breadcrumb  • Breadcrumb  • Header        • Sticky   │
│   • Services       • Overview    • Local info  • TOC           • Mobile   │
│   • USPs           • Features    • Services    • Author        • Footer   │
│   • Testimonials   • Process     • Map         • Content       • Sidebar  │
│   • FAQ            • Pricing     • Directions  • FAQ                        │
│   • CTA            • FAQ         • Local FAQ   • Related                    │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                     PHASE 5: CONTENT CREATION                               │
│                           (Days 13-20)                                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │      CONTENT BRIEFS           │
                    │   (Target Keywords + Outline) │
                    └───────────────────────────────┘
                                    │
           ┌────────────────────────┼────────────────────────┐
           │                        │                        │
           ▼                        ▼                        ▼
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│   HOMEPAGE      │      │  SERVICE PAGES  │      │ LOCATION PAGES  │
│   (Day 13)      │      │   (Days 14-16)  │      │   (Days 17-18)  │
├─────────────────┤      ├─────────────────┤      ├─────────────────┤
│ • H1 w/ keyword │      │ • 6 Services    │      │ • 3+ Locations  │
│ • Hero section  │      │ • 2000w each    │      │ • 1000w each    │
│ • Services      │      │ • Unique FAQs   │      │ • Local content │
│ • USP section   │      │ • Internal links│      │ • Maps embed    │
│ • Testimonials  │      │ • Schema markup │      │ • Schema geo    │
│ • FAQ           │      │                 │      │                 │
└─────────────────┘      └─────────────────┘      └─────────────────┘
           │                        │                        │
           └────────────────────────┼────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────────┐
                    │      BLOG POSTS               │
                    │      (Days 19-20)             │
                    ├───────────────────────────────┤
                    │ • 2 Pillar Posts              │
                    │ • 2500+ words each            │
                    │ • Executive summaries         │
                    │ • FAQ schema                  │
                    │ • Related posts               │
                    └───────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                     PHASE 6: ON-PAGE SEO                                    │
│                           (Days 21-24)                                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐         │
│  │   META TAGS     │    │    SCHEMA       │    │ INTERNAL LINKS  │         │
│  │                 │    │    MARKUP       │    │                 │         │
│  └─────────────────┘    └─────────────────┘    └─────────────────┘         │
│         │                      │                      │                     │
│         ▼                      ▼                      ▼                     │
│  ┌─────────────┐        ┌─────────────┐        ┌─────────────┐             │
│  │ • Title     │        │ • Org       │        │ • Home→Svc  │             │
│  │ • Desc      │        │ • LocalBiz  │        │ • Svc→Loc   │             │
│  │ • Canonical │        │ • Service   │        │ • Blog→Svc  │             │
│  │ • OG Tags   │        │ • Blog      │        │ • Footer    │             │
│  │ • Twitter   │        │ • FAQ       │        │ • Bread-    │             │
│  └─────────────┘        │ • Breadcrumb│        │   crumbs    │             │
│                         └─────────────┘        └─────────────┘             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PHASE 7: LOCAL SEO                                       │
│                           (Days 25-26)                                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   ┌────────────────┐    ┌────────────────┐    ┌────────────────┐           │
│   │  GOOGLE BUSINESS│    │  CITATIONS     │    │   REVIEWS      │           │
│   │    PROFILE      │    │                │    │                │           │
│   └────────────────┘    └────────────────┘    └────────────────┘           │
│          │                     │                     │                      │
│          ▼                     ▼                     ▼                      │
│   • Claim/Verify          • 10 Directories      • Review Request           │
│   • Complete 100%         • Industry sites      • Email Template           │
│   • Add Services          • Local chambers      • On Website               │
│   • Upload Photos         • Consistent NAP      • Respond All              │
│   • Seed Q&A              • Monitor listings    • 5+ Per Month             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                    PHASE 8: QUALITY ASSURANCE                               │
│                           (Days 27-29)                                      │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐       │
│  │SCREAMING FROG│  │   SEMRUSH   │  │ UBERSUGGEST │  │ USER TESTING│       │
│  │    AUDIT     │  │   AUDIT     │  │   AUDIT     │  │             │       │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘       │
│        │                │                │                │                │
│        ▼                ▼                ▼                ▼                │
│   • 0 404 Errors    • Health >90%    • Score >80    • Mobile Test        │
│   • 0 Duplicate     • No Crawl       • Speed Check  • Form Test          │
│     Titles            Errors         • Backlinks    • CTA Test           │
│   • All Alt Text    • CWV Passing    • Content Gap  • Speed Test         │
│   • No Broken       • Mobile OK                       • Accessibility     │
│     Links                                                             │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      PHASE 9: LAUNCH                                        │
│                           (Day 30)                                          │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐    ┌──────────┐            │
│   │  SITEMAP │    │ ANALYTICS│    │  SOFT    │    │ OFFICIAL │            │
│   │  SUBMIT  │───▶│   CHECK  │───▶│  LAUNCH  │───▶│  LAUNCH  │            │
│   └──────────┘    └──────────┘    └──────────┘    └──────────┘            │
│        │               │               │               │                   │
│        ▼               ▼               ▼               ▼                   │
│   • GSC Submit      • GA Working    • Team Review   • Go Public         │
│   • Bing Submit     • GTM Check     • Client Review • Social Post       │
│   • Verify Index    • Events OK     • Fix Issues    • Email List        │
│                       • Real-time                     • Monitor           │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                   PHASE 10: POST-LAUNCH & GROWTH                            │
│                      (Month 2-3 & Ongoing)                                  │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│   WEEKLY TASKS                    MONTHLY TASKS                            │
│   ┌─────────────────────┐        ┌─────────────────────┐                   │
│   │ • 2-4 Blog Posts    │        │ • Content Audit     │                   │
│   │ • 1 Service Update  │        │ • Backlink Audit    │                   │
│   │ • 5 Citations       │        │ • Competitor Check  │                   │
│   │ • 1-2 Reviews       │        │ • Analytics Review  │                   │
│   │ • Screaming Frog    │        │ • Update Content    │                   │
│   │ • Keyword Tracking  │        │ • Schema Updates    │                   │
│   └─────────────────────┘        └─────────────────────┘                   │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## QUALITY GATES (Must Pass Before Next Phase)

```
Phase 1 → Phase 2: Keywords approved, URL structure finalized
Phase 2 → Phase 3: Hosting works, SSL active, base template ready
Phase 3 → Phase 4: Design system complete, components built
Phase 4 → Phase 5: All templates responsive, schema templates ready
Phase 5 → Phase 6: Content 100% complete, Grammarly checked
Phase 6 → Phase 7: All SEO elements implemented, validated
Phase 7 → Phase 8: GBP verified, 10 citations submitted
Phase 8 → Phase 9: All audits pass (90%+ scores)
Phase 9 → Phase 10: Site indexed, analytics working, 0 errors
```

---

## DECISION TREE

```
Is this a new site or redesign?
│
├─► NEW SITE
│   │
│   ├─► Do you have content?
│   │   ├─► YES → Start with Phase 1
│   │   └─► NO → Write content first (hire writer)
│   │
│   └─► What's your timeline?
│       ├─► 2 weeks → Build 5 pages max
│       ├─► 1 month → Follow full blueprint
│       └─► 2+ months → Add advanced features
│
└─► REDESIGN
    │
    ├─► Keep URLs same?
    │   ├─► YES → 301 redirects not needed
    │   └─► NO → Create 301 redirect map
    │
    └─► What's broken?
        ├─► Traffic dropped → Content audit first
        ├─► Slow speed → Technical audit first
        └─► No leads → UX/conversion audit first
```

---

## SUCCESS METRICS FLOW

```
Week 1-2: Foundation
└─► Goals: Site structure ready, design approved

Week 3-4: Content
└─► Goals: 10+ pages published, 2000+ words each

Month 2: Launch & Initial SEO
└─► Metrics: Indexed pages >20, 0 errors

Month 3: Growth
└─► Metrics: Top 10 rankings for 5+ keywords

Month 6: Authority
└─► Metrics: 50+ backlinks, DA increase 5+

Month 12: Dominance
└─► Metrics: Top 3 for primary keywords, 100+ leads
```

---

**Use this workflow to track progress and ensure nothing is missed!**
