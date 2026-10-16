# Abhishesh Portfolio

Abhishesh Ramadas Shet’s personal portfolio, featuring software and AI projects, professional experience, education, certifications, and contact details.

## Features

- Cinematic video welcome with sound enabled by the Enter Portfolio button.
- Responsive navigation, project showcases, and verified-source certification links.
- Downloadable résumé and GitHub/LinkedIn links.
- Custom SVG cursors, subtle motion, and reduced-motion support.
- Responsive layouts for small phones, tablets, and desktop screens.

## Local development

```sh
npm run dev
```

Open http://localhost:4173. Python 3 serves the static files. No JavaScript dependencies or compilation step are required.

```sh
npm run check
```

Checks the JavaScript syntax with Node.js.

## Deployment

Import this repository into Vercel. The included `vercel.json` serves `dist` and runs the JavaScript check during deployment. No environment variables are required.

## Structure

- `dist/index.html` — portfolio content and accessible markup.
- `dist/styles.css`, `dist/cinematic.css` — styling and responsive layouts.
- `dist/app.js` — welcome gate, video controls, navigation, and animations.
- `dist/assets/` — optimized images, welcome video, and SVG cursors.
- `dist/resume.pdf` — downloadable résumé.

Audio playback requires the initial Enter Portfolio click or tap. Playback also depends on device volume and browser permissions. The video resets when visitors leave and return to the hero section.

All rights reserved. Personal imagery, résumé, and portfolio content belong to Abhishesh Ramadas Shet.
