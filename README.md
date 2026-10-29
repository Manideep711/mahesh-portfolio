# Mahesh Portfolio — Client Handoff

Demo: https://mahesh-client-preview.prettyridge13.chatgpt.site

## Included
- React portfolio source, styling, portrait assets, and resume.
- Production static website ready for a static hosting provider.
- Scroll-controlled hero spotlight and parallax, Subject chapter and marker highlights, horizontal projects, alternating Toolkit movement, and draggable-hand contact interaction.
- Lenis smooth scrolling integrated with GSAP and reduced-motion handling.

## Run the source
Requires Node.js 22.12 or newer.

npm ci
npm run dev

Use the localhost URL printed by Vite.

npm run build
npm run preview

## Deploy
Extract Mahesh-Portfolio-Deploy.zip and upload its contents to a static host. index.html must be at the site root. Do not open index.html directly from the filesystem; use an HTTP server.

For GitHub Pages at /MAHESH/, rebuild with GITHUB_PAGES=1. In PowerShell:
$env:GITHUB_PAGES='1'
npm run build

## Edit content
src/Editorial.jsx: biography, education, projects, contact links and interactions.
src/Editorial.css: layout and visual styles.
src/useSmoothScroll.js: Lenis integration.
public/profile-photo.jpeg and public/portrait-cutout.webp: portrait assets.
public/Mahesh-Babu-Sanka-Resume-2026.pdf: resume.

## Important handoff notes
The contact form retains the existing FormSubmit endpoint for lucky90595812@gmail.com. Actual email delivery and account activation have not been verified. Verify this before relying on form submissions; direct email and social links are provided.
Project visuals are illustrative compositions, not screenshots of the linked applications.
The hero cutout was prepared using AI-assisted background extraction from the supplied portrait.
Production build passes. Vite reports a bundle-size advisory; it does not prevent deployment.
The hosted demo is a separately managed preview, not a transfer of hosting ownership or a custom domain. Hosting/account transfer should be agreed separately.

The source package excludes Git history, credentials, local dependencies, and the preview hosting account configuration.
