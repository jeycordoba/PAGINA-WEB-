# Project Log - 2026-04-12

## Objectives
- Update transformation stories in `index.html`.
- Global audit and correction of the founder's name spelling to "Jeniffer".
- Visual overhaul of the Sanctuary gallery with optimized assets.
- Performance optimization and redundant asset cleanup.

## Completed Tasks
- [x] **Add Rafael R. Testimonial**
    - Inserted as the 4th entry in `testimonialsData` in `index.html`.
    - Added English and Spanish translations in `translations.js`.
    - Configured male avatar for the new entry.
- [x] **Global Branding Correction: "Jeniffer"**
    - Performed a project-wide search and replace for "Jennifer" and "Jenifer".
    - Standardized spelling to **Jeniffer** (1 'n', 2 'f's) across all active files.
- [x] **Image Optimization & Updates**
    - **Index**: Replaced `unidad1.jpg` with optimized `unidad2.jpg` (12.7 MB -> 99 KB).
    - **UX**: Adjusted image positions for the leaf and brain icons in `index.html`.
    - **QHC**: Replaced pillar and anatomy stage images (`Stage 1-4`) with high-resolution `.webp` versions.
- [x] **Sanctuary Gallery Reorganization**
    - **Practice**: Added optimized `practice_1.webp` through `practice_7.webp`.
    - **Alignment**: Standardized portrait heights to 1500px for a clean masonry grid.
    - **Final Layout**: Implemented sequence `1, 5, 3, 6, 4, 7, 2`.
    - **Rituals**: Added 6 optimized assets and fixed `rituals_4` orientation.
    - **Healing**: Integrated optimized `healing_2.webp` through `healing_5.webp`.
    - **Default View**: Set **"The Practice"** as the active category on page load.
- [x] **Asset Cleanup (50.0 MB Saved)**
    - Performed a deep site-wide audit for unused assets.
    - Deleted **19 redundant files** (Original `.jpg`/`.png` and massive raw assets like `66.jpg`).
- [x] **Deployment & Git**
    - Pushed all finalized changes to GitHub `main` branch.
    - Successfully deployed production build to Vercel: [green-ambiance.vercel.app](https://green-ambiance.vercel.app).

## 2026-04-13
### Objectives
- Fix visual assets and layout inconsistencies.
- Correct aspect ratio and background issues in QHC session images.
- Align mobile layout of the 4 Pillars section with the desktop version.

### Completed Tasks
- [x] **High-Resolution Image Asset Update**
    - Replaced `stage2.webp` with `stage2.png` in `QHC.html`.
    - Standardized image height to `h-[320px]` (matching Stage 3) to ensure timeline consistency and correct 16:9 ratio display.
- [x] **4 Pillars Mobile Layout Correction**
    - Adjusted `index.html` positioning for the Meditation (Mudra) image.
    - Switched from absolute bottom anchoring to percentage-based top positioning (`top-[52%]`) to ensure visual engagement with the main Yoga image on mobile screens across various device widths.
    - Maintained desktop layout consistency using responsive utility classes.
- [x] **Documentation Management**
    - Updated `tasks.md` with new progress logs and date-based markers.

## 2026-04-16
### Objectives
- Replace the legacy ebook resource with the new "Volver a Ti" PDF.
- Enhance visual presentation of the Sanctuary Library section.
- Refine the user experience in the resource download flow.

### Completed Tasks
- [x] **New Ebook Resource Integration**
    - Substituted the placeholder PDF with **"E-BOOK VOLVER A TI.pdf"**.
    - Updated `api/send.js` to correctly map `ebook1` to the new filename and updated email subjects.
- [x] **Premium Visual Asset Generation**
    - Created a custom-branded book cover for **"Volver a Ti"** featuring Jeniffer CÃ³rdoba as the author.
    - Generated high-quality vertical and horizontal mockups for selection.
- [x] **Sanctuary Library UI Update**
    - Implemented the **Vertical Mockup** for the first ebook card.
    - Applied a **`scale-110` zoom effect** and increased container width to **`max-w-[280px]`** for better prominence.
    - Refined the CSS transition flow for smoother hover states.
- [x] **Lead Magnet Localization**
    - Updated `translations.js` with new titles and descriptions for "Volver a Ti" in both Spanish and English.
    - Restored the original marketing subtext above the download triggers.
- [x] **Modal UI Finetuning**
    - Increased font size of **"Tu Regalo"** tag (10px -> 16px).
    - Increased ebook title in modal (**"id=modalEbookName"**) to 24px.
    - Enlarged form labels (**Name/Email**) to 12px for better readability.
- [x] **Asset Pruning & Live Deployment**
    - Deleted the obsolete `campoUnificadoEbook.pdf`.
    - Configured **GoDaddy DNS settings** (A/CNAME records) to point the custom domain to Vercel's edge network.
    - Verified SSL certification and successfully launched the live production site.
    - Committed changes and synchronized the repository with the live environment.

## 2026-04-19
### Objectives
- Update the ebook target file to the latest high-resolution version.
- Refine email delivery logic and translation strings.

### Completed Tasks
- [x] **Latest Ebook Version Deployment**
    - Updated `api/send.js` to point to **`JC_Volver_a_ti.pdf`**.
    - Replaced the previous 2.9MB file with the new 57MB higher-quality resource.
    - Updated English translations in the backend from "Return to You" to **"Return to Yourself"** for a more profound resonance.
- [x] **Repository Maintenance**
    - Pushed all finalized changes to GitHub.
    - Verified proper asset mapping and file availability in the production path.

## 2026-04-30
### Objectives
- Redesign the Lead Magnet E-book section to an inline layout instead of a modal popup.

### Completed Tasks
- [x] **Inline Lead Magnet Form**
    - Removed the modal popup functionality for downloading the E-book.
    - Implemented a two-column layout showing the E-book image on the left and the download form on the right.
    - Adjusted the layout from full-page width to a contained, rounded card design to improve visual balance.
    - Enhanced the copy to clearly state it's a "Recurso Gratuito" with punchy Spanish (Colombia) copywriting.
    - Maintained exact same backend functionality for email delivery and MailerLite integration.

### Completed Tasks - About Page
- [x] **Journey Milestone Addition**
    - Added new "Dec 2026" milestone for "CertificaciÃ³n Facilitador en RespiraciÃ³n Funcional & Breathwork - Felipe Galvis".
    - Added link to Respira Group (https://go.respira.group/).
    - Handled translation integration in `translations.js`.

- [x] **Relocate Founder Section (index.html)**
    - Moved the "About Jeniffer" (Founder) section to be the first content section immediately below the Hero.
    - Cleaned up stray tags and ensured section spacing remains consistent.

- [x] **Update Practice Title (translations.js)
    - Changed 'Sanación Cuántica' to 'Coaching - Sanación Cuántica' in the transformation practices section of the homepage.
    - Updated English translation to 'Coaching - Quantum Healing' for consistency.

- [x] **Site-wide Branding Rebranding: QHC to Coaching**
    - Renamed QHC.html to Coaching.html.
    - Updated the page title/tooltip to Coaching // JC.
    - Swapped the navigation menu order: Yoga now appears before Coaching across all active pages.
    - Standardized menu labels from Healing to Coaching.
    - Updated the contact form dropdown to include Coaching - Quantum Healing.
    - Synchronized all internal links to reference the new Coaching.html destination.

- [x] **Code Modularization & Repository Management**
    - Created `webElements.html` as a central repository for reusable or shelved UI sections.
    - Migrated the "4 Pillars" (Bonding Unity) section from `index.html` to `webElements.html`.
    - Migrated the "Quantum Healer" diagram section from `Coaching.html` to `webElements.html`.
    - Cleaned up production pages by removing these shelved sections to optimize current layout.

- [x] **Modularize Session Anatomy Experience**
    - Migrated the detailed "Anatomy of a Session" timeline from `Coaching.html` to a dedicated `session.html` landing page.
    - Replaced the original section in `Coaching.html` with a concise, performance-optimized summary CTA linking to the new page.
    - Created `session.html` with a clean, content-first layout and standard navigation/footer.
    - Added localization support for the new page title, summary copy, and CTA buttons in `translations.js`.
    - Verified the site-wide navigation logic and tooltips for consistency.
- [x] **Yoga Page Asset & Layout Refinement**
    - **Asset Standardization**: Renamed all yoga practice images to semantic names (`yogaPracticeVinyasa`, `yogaTeens`, etc.) to prevent future naming conflicts.
    - **Kids/Teens Section**: Fixed limb-clipping issues by implementing responsive heights (`h-[400px] md:h-[550px]`) and centering the compositions.
    - **FAQ Section**: Replaced the image with `practice_3.webp` and adjusted `object-bottom` to prioritize the subjects over the sky.
    - **"Why Yoga?" Section**: Updated the main visual to `yogaWhy.jpg` (optimized from high-res source 131.jpg) and adjusted framing to `object-bottom`.
- [x] **Hero Carousel Restructuring**
    - **Coaching.html**: Moved the premium 3-image carousel from Yoga to Coaching as corrected by the user. Implemented Ken Burns zoom effect and standardized assets to `coachingHero1-3`.
    - **Yoga.html**: Implemented a new, high-performance 9-image carousel using specific high-res assets (`138, 139, 145, 159, 161, 170, 179, 191, 198`).
    - **Sequence Control**: Applied a custom loading sequence: `7, 8, 4, 1, 2, 3, 9, 5, 6`.
    - **Visual Depth**: Darkened the hero overlay to **60% black** and removed blur for maximum clarity of the new assets.
- [x] **Sanctuary Gallery Cleanup**
    - Removed redundant `rituals_6.webp` image from the Rituals category in `sanctuary.html`.

- [x] **Visual Refinements**
    - Adjusted the yoga hero overlay opacity from 60% back to 40% for better brightness.
    - Added the detailed "Acompañamiento 1 a 1" section to `Coaching.html`.
    - Integrated a 4-step roadmap ("Tu Camino: Paso a Paso") with hover effects and expansive layout.
    - Optimized and integrated a new high-res portrait (`coaching1on1.jpg`).
    - Refined layout: Balanced image aspect ratio, removed redundant buttons, and widened the steps grid for better flow.
    - Added comprehensive localized content (ES/EN) to `translations.js`.
    - Implemented a high-impact Call-to-Action linking to the contact page.
