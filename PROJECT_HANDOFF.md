# Abhishesh Portfolio — continuation handoff

Last updated: 6 November 2026. This document summarizes the prior build conversation and verified repository state. It is a practical handoff, not a verbatim chat transcript. The code and current Git/Vercel state take precedence if they change.

## Owner and goal

Abhishesh Ramadas Shet, Bengaluru, India. Build and maintain a cinematic personal software developer / AI portfolio inspired by https://vaibhav-create.vercel.app and https://github.com/VaibhavKhushalani/cinematic-portfolio, with its own content and design rather than an exact copy. Name pronunciation for generated speech: **uh-bhee-shesh**.

## Locations and services

- Local repository: `/Users/abhisheshramadasshet/3D Portfolio/abhishesh-portfolio`
- Parent workspace: `/Users/abhisheshramadasshet/3D Portfolio`
- Public GitHub: https://github.com/abhi0874/Abhishesh-Portfolio
- Git branch: `main`; remote: `origin`; repository made PUBLIC at the owner's request.
- Live site: https://abhishesh-portfolio-web.vercel.app/
- Vercel project: `abhishesh-portfolio-web`
- Vercel team slug: `abhishesh1`; team ID: `team_ceValEeMXKtsAFeqQbavqB1A`
- Vercel project ID: `prj_vdPZVJGuHpFmvLRfpipOLtMaQVnG`
- GitHub repository ID: `1422412275`.
- GitHub/Vercel authentication belongs to the owner and must be reconnected on a new account or machine. These IDs are identifiers, not credentials.

## Technology and file map

Plain HTML5, CSS3 and vanilla JavaScript. No React, Next.js, TypeScript, backend, database, API keys or runtime npm dependencies in THIS portfolio. Technologies listed in project cards describe those separate projects.

- `dist/index.html`: all page content, links, dialog, navigation, project cards, credentials and footer. Much of it is on long lines: use targeted edits and inspect diffs carefully.
- `dist/styles.css`: original/base styles.
- `dist/cinematic.css`: cinematic design and responsive overrides; later rules can override earlier rules. Inspect cascade before editing.
- `dist/app.js`: video lifecycle, entry gate, menus, scroll progress, India clock, reveal animations, canvas particles, footer text fitting and text-cursor spans.
- `dist/assets/intro-clean.mp4`: active welcome video, roughly 8.6 MB, with embedded audio. Preserve its approved timing.
- `hero-poster.webp`, `studio.webp`: poster and cinematic workspace imagery.
- `abhishesh-avatar.png`: cartoon avatar used in introduction.
- `abhishesh-workspace.jpg`: approved portrait/workspace image used in Who I Am.
- `cursor-default.svg`, `cursor-link.svg`, `cursor-text.svg`: small native cursor assets with blue edge glow.
- `dist/favicon.svg`, `dist/resume.pdf`: favicon and résumé.
- `package.json`: `npm run dev` invokes Python's HTTP server on port 4173 serving `dist`; `npm run check` invokes `node --check dist/app.js`.
- `vercel.json`: framework null, build `npm run check`, output `dist`, empty install command.
- Fonts: DM Sans main typography, Baloo 2 name styling; inspect CSS imports for complete font definitions.
- Browser APIs: IntersectionObserver, ResizeObserver, Canvas 2D, HTML dialog/video, matchMedia and document.fonts.

Run locally with `npm run dev` from the repository, then open http://localhost:4173. No compilation step or npm install is required. Python 3 and Node.js are needed. GitHub pushes automatically deploy the static site on Vercel.

## Current layout and content

See `CONTENT_INVENTORY.md` for a readable snapshot of every section and link, including all certification verification URLs. Keep the HTML authoritative.

Order: hero `#home`; introduction `#intro`; Who I Am `#about`; projects `#work`; experience `#experience`; toolkit `#skills`; education `#education`; certifications `#certifications`; contact `#contact`.

Header: Home, About (links to intro), My Projects, Experience, Education, Certifications, Contact. Small devices use Menu plus Contact. All header options have black pill styling, gold text, consistent hover animations.

10 projects total:
1. RAG Document Assistant (`#rag-project`)
2. CampusCompass (`#campus-project`)
3. ResolveFlow AI (`#resolveflow-project`) — featured on 3 November 2026, replacing Kutira's featured slot.
4. Kutira Kushala (`#kutira-project`) — first card in More to explore.
5. VeloceWay
6. Weather Sense
7. US Stock Tracker
8. GitHub Profile Analyzer
9. Job Application Tracker
10. Sheets Task Manager

ResolveFlow links: https://github.com/abhi0874/resolveflow-ai and https://resolveflow-ai-rosy.vercel.app/demo. It uses Next.js, FastAPI, LangGraph, PostgreSQL/pgvector, classification and cited response drafting with human approval. Its public recruiter demo uses synthetic data and precomputed responses; do not describe it as a deployed full production backend or live Gemini workflow. Latest README should be checked before changing claims.

A GitHub lookup also found `DocRAG` and https://docrag-orpin.vercel.app, while the portfolio's older RAG card still uses its existing RAG-Agent URL. This was outside the ResolveFlow change: verify with the owner before treating them as the same project.

Experience: MindMatrix.io, Software Developer Intern, February–May 2026, remote. Owner supplied four bullets covering Kotlin/Jetpack Compose; Android Studio, Google Cloud Labs and Google AI Studio; UI/UX through debugging; Firebase/testing/Android workflows. Preserve the supplied wording in HTML.

Who I Am: four owner-approved bullet points covering software/AI & ML background, full-stack web/mobile/AI tools, answers/navigation/local-maker projects, and using ChatGPT/Gemini/Claude while testing before shipping. See inventory for exact wording.

Education and certifications are separate sections. Certification sources include Oracle, Google/Coursera, Meta, freeCodeCamp and Anthropic/Skilljar. Exact URLs and supplied dates are in HTML/inventory. Do not make up missing verification links. Course certificates are grouped in a disclosure.

## Design decisions to preserve

- Cinematic warm dark workspace hero and contact backgrounds; cream introduction and white Who I Am.
- Green-toned projects; toolkit through certifications match contact's dark warm brown/near-black theme.
- Accent gold approximately `#e9a044`; footer name uses same gold as “something”.
- No moving text ribbon/marquee. No “Portfolio 2026” label. Project heading is “MY PROJECTS”, never “Selected projects/work”.
- Footer “Let's build something” and full name each fit on one line, filling available width via measured font fitting. Keep responsive behavior and avoid horizontal overflow.
- Footer has GitHub and LinkedIn brand icons, a résumé document icon, and All rights reserved.
- The name font should match the rounded hero/video-section name styling; the earlier Chewy-style experiment was rejected.
- Small default/link/text cursor styles, white edge with subtle blue glow; no separate circular cursor halo. Default cursor tilted a little right (18-degree SVG rotation in prior implementation).
- Text cursor applies only to actual inline text fragments, not blank space in a paragraph or section. Links/buttons remain pointer cursors. Touch devices should not gain desktop cursor effects.
- About image is the approved realistic workspace portrait, not the full-body cartoon. Signature must be legible against it.

## Video and interaction requirements

- Entry dialog appears once per full page load/reload. It does not return when navigating or revisiting hero.
- Enter Portfolio is the deliberate click/tap that starts video WITH audio. Browser gesture requirements mean audible autoplay without this action cannot be guaranteed.
- `playWelcome()` sets playsInline, muted=false, volume=1 and calls play inside the gesture.
- No mute/unmute option; preserve play/pause button, modestly enlarged.
- Hero active threshold is 25% visibility. Leaving resets currentTime to 0; re-entering starts from the beginning. Manual pause/resume within hero preserves position.
- Hidden page pauses; returning resynchronizes; video end resets and repeats while allowed. Load failure falls back to poster.
- Original audio sync was preferred after an attempted adjustment; that adjustment was reverted. Do not offset or replace audio without a new request.
- Mobile yellow outline fix: `enter(event)` moves focus to Scroll to explore only for keyboard/assistive activation (`event.detail===0 && !event.pointerType`). Touch/mouse entry must not force a gold focus box. Keep accessible keyboard focus styling.
- Current app cache query: `app.js?v=entry-focus-fix` (verify HTML before editing).
- Respect reduced-motion settings; user entry explicitly enables welcome playback.

## Current résumé

Owner source: `/Users/abhisheshramadasshet/Downloads/Abhishesh_Portfolio_Resume.pdf`.
Deployed as `dist/resume.pdf`. SHA256:
`403b48dc5456ce33f7fbbf76beaa9f29f5cb56b59d10e516f7e13bc39789e603`.
Download href: `resume.pdf?v=403b48dc5456`; display download filename: `Abhishesh-Ramadas-Shet-Resume.pdf`.

On 18 October, exact bytes were verified against source, local copy, GitHub contents API, and Vercel download. Earlier Intern_HPE.pdf and Software_Engineer_Intern_Stripe.pdf are superseded. Future replacement requests mean update the portfolio copy locally, GitHub and Vercel; don't alter unrelated personal PDFs. Hash-version the link to avoid stale browser downloads.

## Release workflow

1. Inspect working tree and intended changes; preserve unrelated edits.
2. `npm run check` and `git diff --check`; verify relevant content/links and browser behavior if applicable.
3. Commit scoped changes and push `origin main` when authorized. User has consistently requested synchronized PC/GitHub/Vercel portfolio updates.
4. Check automatic Vercel production build is Ready. Avoid duplicate manual deployments when Git integration already built it.
5. Fetch public URL and verify expected HTML/assets. For binary résumé compare bytes or SHA256.

Previously working CLI: `npx --yes vercel@64.3.1 --scope team_ceValEeMXKtsAFeqQbavqB1A list abhishesh-portfolio-web --non-interactive`. `gh` was authenticated as `abhi0874`. Verify current auth rather than assume it transfers to a new ChatGPT account. `.vercel/project.json` holds local linkage and is ignored. No environment variables are required by the portfolio. Never print or commit authentication files.

Recent commits before this handoff:
- `f8718ee`: feature ResolveFlow and move Kutira to grid; production Ready, public HTML matched local.
- `a7a76ac`: updated current résumé.
- `9ac04df`: touch-entry focus outline fix.
- `21b5fb6`: older HPE résumé replacement (superseded).
- `cd8e534`: exclude local Vercel env files from uploads.
- `0e9d1b4`: initial published portfolio.

## Verification evidence and limits

Earlier implementation tested responsive widths 280, 390, 768, 844, 1024, 1440 and 1920 without horizontal overflow; menu navigation, gate, video reset/pause/unmuted state, certifications disclosure, anchors, fonts/images and console errors. These are HISTORICAL checks, not proof for future modifications or every physical device.

The focus fix had targeted logic checks for mouse/touch/keyboard and syntax checks. A browser retest was blocked by automatic approval review citing a prior usage-limit restriction; do not bypass any current tool restriction. The user subsequently confirmed it was done. ResolveFlow change had syntax/content checks and exact live HTML verification, not a fresh full visual/device test.

19 October Germany verification:
- Authenticated Vercel CLI: firewall Not configured; no IP blocks; Attack Mode Off; Bot Protection Off; AI Bots Allow; OWASP Off; automatic mitigations Active.
- Globalping HTTPS GET tests from Falkenstein/Hetzner, Nuremberg/netcup and Nuremberg/Hetzner all returned 200 OK with actual portfolio HTML and valid TLS (about 328–331 ms).
- Measurement ID: `2ke6Zpd9REcuYH3wC00021LWE`. This may expire; don't rely on it remaining available.
- This did NOT test JavaScript rendering, video/audio playback, residential/mobile networks or every German provider. Full browser playback from Germany was requested but remained UNVERIFIED because no German browser/proxy session was available. Do not claim that task was completed.
- Earlier Safari “server cannot be found” issue resolved for the user without a website change.

`VERIFICATION.md`, preview screenshots and generation prompts may exist locally but are ignored and are not required to run a clone. Never cite historical screenshots as evidence for new changes.

## Cleanup history

An old unrelated Vercel project `abhishesh-portfolio` (ID `prj_s8yBqjg1RH7VasTmvhes8O6BXGHQ`, associated with deleted repo ID `1417549964`) was deleted with explicit owner permission. The ACTIVE project is `abhishesh-portfolio-web`; don't confuse the names.

`/Users/abhisheshramadasshet/code-reviewer` was a separate abandoned Next.js/React/AI project. Only node_modules and Finder metadata remained, no references from other checked local projects or running processes. Deleted at owner's request (~192 MB). It was unrelated to this portfolio.

## How to resume in a fresh chat

Open the repository folder in the coding assistant and say:

> Continue maintaining my portfolio. Read AGENTS.md, PROJECT_HANDOFF.md and CONTENT_INVENTORY.md first, then inspect the current Git state. Preserve my existing design and audio/video behavior. My live site is https://abhishesh-portfolio-web.vercel.app/ and repo is https://github.com/abhi0874/Abhishesh-Portfolio. My next requested change is: [describe it].

A new chat account has no old chat memory. These files and the repository supply context; GitHub/Vercel access may need separate authentication. A regular chat without filesystem tools needs the files uploaded or repository content provided.
