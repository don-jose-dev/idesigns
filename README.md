# iDesigns Landing Page

A static, single-page marketing site for the iDesigns interior design studio. The layout follows the Vaishnavi Interiors inspiration shared in the project brief and is implemented with vanilla HTML, CSS, and JavaScript.

## Features
- Sticky header with contact top bar and responsive navigation.
- Hero, services, process, reviews, and consultation sections matching the supplied content plan.
- Scroll-triggered reveal animations with graceful fallbacks for older browsers.
- Floating WhatsApp and call-to-action buttons for quick contact.

## Project Structure
```
.
├── index.html          # Page markup and section content
├── assets/
│   ├── css/
│   │   └── styles.css  # Global styles, layout, and animation rules
│   └── js/
│       └── main.js     # Navigation, animation triggers, and CTA logic
└── AGENTS.md           # Repository contribution guidelines
```

## Getting Started
1. Serve the site locally with any static file server. For example:
   ```bash
   npx http-server .
   ```
2. Open `http://127.0.0.1:8080` (port may vary) in your browser to preview the page.

## Development Workflow
- Update content within `index.html`, styles in `assets/css/styles.css`, and interaction logic in `assets/js/main.js`.
- Keep new imagery in `assets/img/` (create the folder if it does not exist) and reference them with relative paths.
- Run the formatting check before committing:
  ```bash
  npx prettier --check index.html assets/css/styles.css assets/js/main.js
  ```

## License
This project is provided as-is for demonstration purposes. Update this section if a formal license is required.
