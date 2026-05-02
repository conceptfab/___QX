<claude-mem-context>
# Memory Context

# [___QX] recent context, 2026-05-02 9:45am GMT+2

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security_alert 🔐security_note
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 28 obs (10,951t read) | 719,143t work | 98% savings

### May 1, 2026
1276 11:27p 🔵 QX Project Git State at Code Review Start
1277 " 🔵 QX Project Stack: Next.js Catalog App with Massive Radix UI Dependency Set
1278 " 🔵 Branch Diff: 15 Files Changed, 648 Insertions / 513 Deletions vs master
1279 " 🔵 Catalog Component Structure: 12 Files Including CatalogMotion and renderQxText
1280 11:28p 🔵 Full Dependency Inventory: Many Unused Packages in Catalog-Focused App
1281 " 🔵 CatalogNav: Duplicate JSX, Double setActiveSection Call, and Potentially Stale Effect Dependency
1282 " 🔵 HeroSection: descriptionPositionClasses Missing Vertical CSS, QX Logic Hardcoded Throughout 512-Line Component
1283 11:29p 🔵 globals.css: Debug Colors Left as Production Values in QX Theme
1284 " 🔵 FeaturesSection: Old Interactive Tab UI Removed, Feature Count Mismatch Bug Introduced
1285 " 🔵 AssemblySection CTA Buttons Are Non-Functional Dead UI
1286 " 🔵 DimensionsSection: Certifications Rendered Twice With Different Slicing
1287 " 🔵 Font Migration from Roboto+Sora to Lato; Calibre @font-face Orphaned
1288 " 🔵 PackshotsSection: Business Logic Hardcoded — 'R' in Model Code Means Height-Adjustable
1289 " 🔵 CatalogNav Refactor: Custom rAF Scroll Replaces scrollIntoView, Active State Logic Inverted
1290 11:31p 🔵 OverviewData and FeaturesData Types Have Unused Fields After Refactor
1291 " 🔵 Tailwind Config: Wrong Content Path Pattern and Unused Token Extensions
1292 " 🔵 Custom CSS Class Names Are Styling Hooks Only — No CSS Definitions Exist for Them
1293 11:32p 🔵 Code Review Complete: 38 Issues Found on stage_2 Branch
1294 11:42p 🔵 QX project already has full multi-catalog architecture in place
1295 11:48p 🔵 Landing page is a hardcoded redirect to QX — must be replaced with catalog index page
S1029 Brainstorming Q3/~5: what scope for layout types 2 and 3 — infrastructure-only with placeholders (A), design all 3 types now (B), or copy QX for types 2&3 with different CSS theme (C)? (May 1 at 11:52 PM)
S1030 Brainstorming Q4/~5: landing page catalog tile content — name+description, thumbnail, layout type tag, coming soon status, hover effect, and card ordering. (May 1 at 11:53 PM)
S1031 Brainstorming Q5/5 (final): component architecture for multi-layout support — per-layoutType folder isolation (A), universal components with layout props (B), or minimal change replacing catalogId checks with layoutType (C)? (May 1 at 11:55 PM)
S1032 Implementation design review started — Section 1/5: proposed folder architecture for multi-layout catalog system, awaiting user approval before coding begins. (May 1 at 11:56 PM)
S1033 Implementation design Section 2/5: config schema extension — new meta.layoutType field, TypeScript type CatalogLayoutType, dispatcher pattern in [catalogId]/page.tsx, validation in loader. (May 1 at 11:56 PM)
S1034 Implementation design Section 3/5: landing page component replacing permanentRedirect — markup sketch using existing variant-list-page CSS, getCatalogList() data, globalConfig fields. (May 1 at 11:57 PM)
### May 2, 2026
S1035 Implementation design Section 4/5: placeholder layout components for type2 and type3 — minimal page showing catalog meta + "Layout in preparation" message + back link to landing. (May 2 at 12:00 AM)
S1036 Implementation design Section 5/5: QX layout migration — dispatcher pattern in [catalogId]/page.tsx, CatalogPageQX.tsx composition, HeroQX.tsx cleanup removing all catalogId==='QX' hardcoding, rename of 8 remaining section components. (May 2 at 12:01 AM)
S1037 Multi-catalog infrastructure refactor + landing page — final verification and cleanup (May 2 at 12:01 AM)
1296 12:02a 🟣 Multi-catalog infrastructure design spec written to docs/
1297 12:04a 🟣 Section components moved to src/layouts/qx/ — AssemblySection rename failed, PackshotsSection not yet moved
1298 " 🟣 Layout migration complete: all 9 section components in src/layouts/qx/, CatalogLayoutType type added
1299 " 🟣 QX config.json migrated with layoutType field; CatalogConfig type auto-inherits new required field
1301 " 🔵 HeroQX.tsx still contains all isQx hardcodes after move — 6 spots to clean before component is QX-only
1303 " 🔴 Broken sibling imports in all 9 *QX.tsx files fixed — './renderQxText' etc. updated to '@/components/catalog/' path
1300 12:05a 🟣 loadCatalog gains layoutType validation guard — invalid catalogs return null with console warning
1302 " 🔵 All 9 moved QX section files have broken sibling imports pointing to old components/catalog/ neighbors
S1038 Hero slider per-slide customization — what fields can be configured per slide in QX layout (May 2 at 12:14 AM)
**Investigated**: - HeroQX.tsx internal structure: per-slide heroContent field usage (grep for description, heroContent, descriptionStyle)
    - Confirmed fields read per slide: brandLabel, collectionName, tagline, taglineLine2, ctaLabel — all with fallback to top-level content.json values
    - Confirmed layout variants are hardcoded by slide index (0-1=corner, 2=lift, 3+=centered), not data-driven

**Learned**: - HeroQX.tsx reads heroContent per slide with ?? fallback to top-level data for: brandLabel, collectionName, tagline, taglineLine2, ctaLabel
    - `description` and `descriptionStyle` fields exist in the HeroSlide type but are NOT rendered in QX layout — the render block was removed during refactor (it was guarded by `&& !isQx` so QX never showed it)
    - Slide layout variants (corner/lift/centered) are determined by slide index (currentIndex &lt; 2, currentIndex === 2, else), not by per-slide config
    - heroContentWrapperClassName and heroContentWrapperStyle are the two CSS hooks driven by index-based layout selection

**Completed**: - All multi-catalog infrastructure work from previous session fully verified: tsc clean, eslint 0 errors, build SUCCESS (6 static pages)
    - Link fixes confirmed applied to CatalogPageType2.tsx, CatalogPageType3.tsx, src/app/page.tsx (a → Link, import added)
    - memory/feedback_terse_execution.md and memory/MEMORY.md confirmed written
    - Answered user question about per-slide customization capabilities and limitations

**Next Steps**: User asked "co chcesz dodać?" — waiting for user response on whether to: (1) add description/caption rendering to QX slides, (2) add data-driven slide layout field (corner/centered/lift) to slider.json config, or (3) something else.


Access 719k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>