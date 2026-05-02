<claude-mem-context>
# Memory Context

# [___QX] recent context, 2026-05-02 12:58pm GMT+2

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security_alert 🔐security_note
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 50 obs (18,020t read) | 952,902t work | 98% savings

### May 1, 2026
1276 11:27p 🔵 QX Project Git State at Code Review Start
1277 " 🔵 QX Project Stack: Next.js Catalog App with Massive Radix UI Dependency Set
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
1304 9:46a 🔵 Gallery Section Structure in QX Catalog
1305 " 🔵 GalleryQX Component Current Layout Architecture
1306 " 🔵 Gallery Image Source Dimensions Audited
1307 " 🟣 GalleryQX Layout Refactored to 1 Large + 3 Small Schema
1308 9:47a 🔴 Lightbox src Reference Fixed to Use Sliced galleryImages Array
1309 " 🔵 Lint Results After Gallery Refactor: 0 New Errors
1310 9:48a 🔵 TypeScript Check: Only Pre-existing vitest Error, No New Errors from Gallery Refactor
1312 " ✅ Gallery content.json Image Order Adjusted for Thumbnail Slot Selection
1313 " ✅ Gallery Section Refactor Complete — Final State Confirmed
1311 " 🔵 Next.js Dev Server Live at localhost:3000 with Gallery Changes
1314 9:49a 🔄 GalleryQX Sizing Changed from Fixed Pixels to Fluid Aspect-Ratio
1315 12:26p 🔵 QX Catalog Project Structure — Visual Gallery Section Codebase Mapping
1316 12:27p 🔵 GalleryQX Image Pixel Dimensions Audited for 1440×960 Redesign
1317 12:28p 🟣 GalleryQX Redesigned to Fixed 1440×960 Canvas with Absolute Positioning
1318 12:29p ✅ GalleryQX Refactor Passes Lint and TypeScript — No New Errors
1319 " 🔵 Next.js Dev Server Running During GalleryQX Development Session
1320 " ✅ Production Build Initiated After GalleryQX Redesign — Thumbnail Manifest Updated
1321 12:30p 🔵 Production Build Succeeded but Dev Server Returns HTTP 500 on /catalog/QX
1322 " 🔵 Fresh Dev Server Started on Port 3001 to Bypass Port 3000 HTTP 500
1323 " 🔵 Fresh Dev Server Confirms /catalog/QX Returns HTTP 200 with GalleryQX Changes
1324 " ✅ GalleryQX 1440×960 Refactor Verified in Compiled CSS and Final Git Diff
1325 " 🔵 OverviewQX Already Uses 960px Min-Height Canvas Pattern — Consistent with GalleryQX Redesign
1326 12:34p 🔄 GalleryQX Layout Switched from Percentage-Based to Pixel-Based Positioning — Aligned with OverviewQX Pattern

Access 953k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>