# CLAUDE.md

Personal portfolio for Gabriel Estrada (GitHub: Wabski), deployed with GitHub Pages from `main` (repo root) at https://wabski.github.io.

Note: this repo is public and served as-is. Everything here, including this file and HTML comments, is visible to anyone. Don't add private repo paths, credentials, or personal details beyond what the site already shows.

## Rules
- Plain HTML/CSS/vanilla JS only. No frameworks, no build step, no new dependencies.
- Relative asset paths only (`assets/...`, `css/...`), never a leading `/`.
- Keep the `[PLACEHOLDER]` + `<!-- EDIT: ... -->` convention in `index.html` for anything still unfilled.
- Theme colors are defined in three places in `css/style.css` (`:root`, `[data-theme="dark"]`, and the `prefers-color-scheme: dark` fallback). Change all three together.
- Project images: 16:10 (1200×750), compressed JPG under ~200 KB, in `assets/`.
- Projects from private repos get a `.project__note` ("Private repo…") instead of a GitHub link, so recruiters never hit a 404.
- Only describe work the user did (check commit authorship before writing "My part" lines).

## Design direction
The user explicitly wants nothing that looks like a typical AI-generated site. The look is a print shop (his family business): neutral newsprint background, ink-black type, Bianchi celeste accent (he cycles): `--accent-fill` #7DD3C6 for big color areas (primary button, name's print plate, highlighter, focus shadow) and `--accent` #08695F deep celeste for small text in light mode (celeste is too light to read on paper; dark mode uses #7DD3C6 for both), halftone dots, registration/crop marks, CMYK color bar, rubber-stamp label, hard offset-shadow buttons, square corners. Fonts: Archivo (wide, heavy headings), IBM Plex Sans (body), IBM Plex Mono (labels).
Avoid: orange/terracotta accents on warm cream (reads as Claude's palette; the user rejected it), purple/indigo accents, Inter/Space Grotesk, pill buttons with glow shadows, frosted-glass headers, blurred gradient blobs, grid backgrounds, rounded card grids, pill tags, pulsing status dots, mouse scroll icons, cute sentence headings ("A little about me.").
Scroll animations are in `css/style.css` section 6 plus `main.js` section 4; every hidden start state is scoped to `html.js` and switched off under `prefers-reduced-motion`. When regenerating `assets/og-image.png` or the favicons, use the same palette.

## Facts confirmed with the user
- BMS Ermitaño capstone: team of 5; Gabriel is Lead / Full-stack Developer (per the repo README Authors list). His commits use gabbrielwayne@gmail.com under several author names ("Gabriel:3", "Wabski", "gabs"), so match on that email, not the GitHub login.
- LinkedIn: https://www.linkedin.com/in/gabriel-wayne-estrada/
- His focus on both team projects is the mobile front end (BMS resident portal; Wingman from Figma wireframes to deployed). Project images are desktop+phone mockups built from screenshots. Never use screenshots that show real residents' personal data (PH Data Privacy Act).

## Still to fill in
Resume PDF, school start/graduation years, years for the family-business jobs. The user is undecided on a role, so the site targets OJT in IT support or web development. Don't add MedVantage (the user didn't work on it).

## Tooling notes (this machine)
- GitHub CLI is installed but may not be on PATH: `"C:\Program Files\GitHub CLI\gh.exe"`. The user is signed in as Wabski. Their projects are team repos owned by a collaborator, so list them with `gh api "user/repos?affiliation=owner,collaborator,organization_member"`.
- Visual checks: headless Chrome at `C:\Program Files\Google\Chrome\Application\chrome.exe --headless=new --screenshot`. Chrome enforces a 500px minimum window width, so to test phone widths, load the page in a 375px `<iframe>` (with `--allow-file-access-from-files`). Reveal animations need a tall window or `--virtual-time-budget`.
- Ask before committing or pushing. Pushing to `main` updates the live site.
