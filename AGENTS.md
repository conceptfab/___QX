<claude-mem-context>
# Memory Context

# [___QX] recent context, 2026-05-02 7:39pm GMT+2

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision 🚨security_alert 🔐security_note
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 50 obs (14,177t read) | 515,788t work | 97% savings

### May 2, 2026
1374 2:24p 🔵 section_ID Spacing Is Inconsistent Across QX Sections — Two Distinct Patterns
1375 2:25p 🔄 Standardized section_ID Spacing to mb-[120px] Pattern in DimensionsQX, VariantsQX, MaterialsQX
1376 " 🔵 GalleryQX section_ID Has No Description Paragraph — Only Label and Title
1377 2:26p ⚖️ Reverted section_ID Spacing Standardization — Pattern B Restored for DimensionsQX and VariantsQX
1378 " ⚖️ All QX Sections Standardized to Pattern B Compact Spacing
1379 2:27p 🔄 FeaturesQX and PackshotsQX section_ID Spacing Updated to Pattern B
1380 5:59p 🔄 PackshotsQX: removed fixed min-height, section height now content-driven
1381 " 🟣 PackshotsQX thumbnail aspect ratio changed from landscape 16/11 to portrait 4/5
1382 6:00p ✅ globals.css: added #packshots debug-geometry exemption for content-driven height
1383 6:02p ✅ PackshotsQX thumbnail aspect ratio iterated from 4/5 portrait to aspect-square (1:1)
1384 6:03p 🔄 PackshotsQX layout restructured from 12-col grid to stacked block layout
1385 6:05p ✅ PackshotsQX cards-block top margin simplified to uniform mt-10
1386 6:06p ✅ PackshotsQX group header: removed bottom border separator
1387 " ✅ PackshotsQX DefaultCard: removed rounded corners for sharp-edge cards
1388 6:08p 🔵 FeaturesQX still uses lg:min-h-[960px] and side-by-side grid layout
1389 " 🔵 FeaturesData type: sectionLabel + title + FeatureItem[] (icon, title, desc)
1390 " 🔄 FeaturesQX fully restructured: stacked layout, 3-col feature grid, portrait icon cards
1391 6:09p ✅ globals.css: added #features debug-geometry height exemption
1392 6:11p ✅ FeaturesQX icon area: constrained to max-w-[343px] square; #features CSS override removed
1393 6:15p 🔵 FeaturesQX content.json has 6 items with an undeclared `badge` field
1394 " ✅ FeaturesQX icon area aspect ratio: square → 3/5 portrait (343×572px)
1395 " ⚖️ FeaturesQX: lg:min-h-[960px] removed again — section height is content-driven (final decision)
1396 6:17p ✅ FeaturesQX icon size increased from 96px to 244px to fill portrait card area
S1121 Order codes count confirmed — assembly/content.json has exactly 5 order codes (May 2 at 6:32 PM)
S1122 ProductCodesQX debug geometry issue — user reporting section not matching 960px yellow debug box behavior; diagnosing why #codes section may not be picking up the debug CSS (May 2 at 6:32 PM)
S1123 globals.css debug geometry selectors confirmed — only cover and packshots have exemptions, all other sections including #codes are subject to 960px enforcement (May 2 at 6:32 PM)
S1128 AssemblyQX.tsx final state confirmed — 79 lines, clean steps-only layout (May 2 at 6:34 PM)
S1126 catalog-loader.ts audited — assembly data loading confirmed, orderCodes available through catalog.assembly (May 2 at 6:36 PM)
S1124 ProductCodesQX structure verified — inner div confirmed as first-child that debug CSS targets (May 2 at 6:36 PM)
S1125 ProductCodesQX structure re-read (duplicate) — no new findings (May 2 at 6:36 PM)
S1127 ProductCodesQX structure read again (3rd duplicate) — no new findings (May 2 at 6:36 PM)
S1130 DimensionsQX section structure examined — confirms stacked layout pattern and inner div structure for debug CSS comparison (May 2 at 6:37 PM)
S1129 MaterialsQX section structure examined for comparison with ProductCodesQX — investigating debug CSS matching (May 2 at 6:38 PM)
1397 6:47p 🔵 CatalogNav Width Investigation for 1440px Alignment Task
1398 6:48p 🔴 CatalogNav qx0 Desktop Padding Removed to Align with 1440px Section Containers
1399 " 🔵 ESLint Reports Only Pre-existing Errors — No Issues in Changed CatalogNav File
1400 " 🔄 AssemblyQX Content Extracted into New ProductCodesQX Section
1401 " 🔵 CatalogNav Default Variant Retains px-6 Desktop Padding — Only qx0 Variant Gets lg:px-0
1402 6:49p 🔴 CatalogNav qx0 Menu Items Refactored to justify-between with Right-Edge Alignment
1404 " 🟣 ProductCodesQX New Section Added — Renders Order Reference Table from AssemblyData
1403 6:50p 🟣 CatalogNav qx0 Menu Width Aligned to 1440px — Complete Final Diff Confirmed
1405 6:51p 🔵 @playwright/test Referenced in package-lock but Not Installed — Visual Testing Unavailable
1406 " 🔴 ProductCodesQX Section Min-Height Changed to Dynamic Viewport-Aware Value
1407 6:52p ✅ CatalogPageQX Gains Decorative 240px Footer; ProductCodesQX Reverts to Fixed 960px Min-Height
1409 " ✅ CatalogPageQX Footer Background Changed from White to Light Gray #f4f4f4
1410 " ✅ QX Config Removes "Cover" from Nav Sections — Hero No Longer Listed in CatalogNav
1411 " ✅ All session changes committed to git
1412 " 🔵 OverviewQX has split framer-motion import (minor code smell)
1413 " 🔵 ProductCodesQX receives AssemblyData but uses only orderCodes field
1408 6:53p ✅ Session Complete — Final State of All QX Catalog Changes Confirmed
1414 7:06p 🔵 CatalogNav DEFAULT_SECTIONS still includes "cover" entry after config.json removal
1415 " 🔵 AssemblyData type in catalog.ts confirmed to include orderCodes field
1416 " 🔵 npm run lint fails due to .next/ directory not excluded from ESLint scan
1417 " 🔵 TypeScript check fails: vitest not installed but test file imports it
1418 " 🔵 Production build succeeds — all session changes build clean
1419 " 🔵 Raw &lt;img&gt; with responsiveImg() helper is intentional pattern — not a bug
1420 7:07p 🔵 User questions why "Codes" section lacks its own folder
1421 " 🔵 AssemblyData embeds orderCodes — no separate codes/ data folder exists by design
1422 " 🔄 Codes section extracted from AssemblyData into standalone ProductCodesData domain
1423 7:21p 🔴 Dev server confirmed on port 3000 — /catalog/QX returns HTTP 200 OK after codes refactor

Access 516k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>