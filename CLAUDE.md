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

## Still to fill in
Photo, resume PDF, BMS screenshot (`assets/project-bms.jpg`), school start/graduation years, years for the family-business jobs. The user is undecided on a role, so the site targets OJT in IT support or web development. Don't add MedVantage (the user didn't work on it).

## Tooling notes (this machine)
- GitHub CLI is installed but may not be on PATH: `"C:\Program Files\GitHub CLI\gh.exe"`. The user is signed in as Wabski. Their projects are team repos owned by a collaborator, so list them with `gh api "user/repos?affiliation=owner,collaborator,organization_member"`.
- Visual checks: headless Chrome at `C:\Program Files\Google\Chrome\Application\chrome.exe --headless=new --screenshot`. Chrome enforces a 500px minimum window width, so to test phone widths, load the page in a 375px `<iframe>` (with `--allow-file-access-from-files`). Reveal animations need a tall window or `--virtual-time-budget`.
- Ask before committing or pushing. Pushing to `main` updates the live site.
