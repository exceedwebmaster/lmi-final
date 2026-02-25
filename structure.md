# Folder Architecture

## High-Level Structure

LMI/
│
├── assets/
├── css/
├── images/
├── js/
├── components/
├── html/
├── index.html

---

## Root File

### index.html
- Homepage entry point.
- Loads global CSS, JS, and Bootstrap.
- Links to other pages.

---

## /html

Contains full-page HTML files.

Example:
- about.html
- contact.html
- enclosures.html
- wardrobe-doors.html
- mirrors-frames.html
- organizers.html

Purpose:
Keeps the root directory clean and organized.

---

## /components

Reusable HTML sections.

Examples:
- header.html
- footer.html
- navbar.html
- hero.html
- cta.html

Purpose:
Prevents repeating the same layout code across pages.
Improves maintainability.

---

## /css

All styling files.

Examples:
- main.css (global styles)
- components.css (component-specific styles)
- pages.css (optional page-specific styles)

Purpose:
Centralized styling and separation of layout from content.

---

## /js

All JavaScript files.

Examples:
- main.js (global scripts)
- components.js (load reusable components)
- page-specific scripts (optional)

Purpose:
Handles UI interactions and dynamic behaviors.

---

## /images

Organized by section.

images/
├── about/
├── contact/
├── enclosures/
├── global/
├── index/
├── mirrors+frames/
├── organizers/
├── resources/
├── room-dividers/
├── specialty-products/
├── wardrobe-doors/
└── wine-rooms/

Purpose:
Keeps product visuals organized and scalable.

---

## /assets

Non-image resources.

Examples:
- fonts/
- icons/
- documents/
- videos/

Purpose:
Stores static resources not related to styling or scripting.

---

# Architecture Philosophy

- Modular
- Scalable
- Clean separation of concerns
- Easy to maintain
- Production-ready structure