# Personal Portfolio

A bold, fast, single-page portfolio built with plain HTML, CSS, and vanilla JavaScript. No frameworks and no build step. It deploys straight to GitHub Pages.

**Features:** light/dark mode (remembers the visitor's choice), sticky nav with active-section highlighting, mobile menu, scroll-reveal animations (turned off for users who prefer reduced motion), Formspree contact form, Open Graph tags for link previews, and accessible markup (skip link, labels, focus styles, keyboard navigation).

---

## Project structure

```
.
├── index.html            All page content and sections. Most of your edits happen here.
├── css/style.css         Colors, fonts, layout, light/dark themes, animations.
├── js/main.js            Theme toggle, mobile menu, scroll effects, contact form.
├── assets/
│   ├── profile.jpg       Your photo (4:5 portrait, 800×1000)
│   ├── project-*.jpg     Project images (desktop + phone mockups, 1200×750)
│   ├── bench/            "On the bench" photos of repairs and mods (4:5, 800×1000)
│   ├── certs/            Certification badge images (from your public Credly pages)
│   ├── resume.pdf        Placeholder resume (replace with yours, same name)
│   ├── og-image.png      Image shown when your link is shared (1200×630)
│   ├── favicon.svg/.png  Browser tab icon
│   └── apple-touch-icon.png  Icon for iPhone home screens
├── .nojekyll             Tells GitHub Pages to serve files exactly as they are
└── README.md
```

---

## Customize it

### 1. Replace the placeholders
Every placeholder is wrapped in square brackets. In VS Code, press **Ctrl+Shift+F** (Cmd+Shift+F on Mac) and search for `[` inside `index.html`. Comments starting with `EDIT:` mark each spot.

| Placeholder | What to put there |
|---|---|
| `[YOUR NAME]` | Your full name (title, hero, footer, alt text) |
| `[YN]` | Your initials (top-left logo) |
| `[YOUR ROLE]` | e.g. "Software Engineer", "Data Analyst", "UX Designer" |
| `[YOUR HEADLINE…]` | One punchy line about what you do |
| `[SHORT INTRO…]`, `[BIO PARAGRAPH …]` | Your intro and bio |
| `[YOUR SCHOOL]`, `[YOUR DEGREE]`, `[YOUR CITY…]` | About + timeline facts |
| `[YOUR EMAIL]` | Your email address |
| `[YOUR LINKEDIN USERNAME]` | The part after `linkedin.com/in/` |
| `[YOUR GITHUB USERNAME]` | Your GitHub username |
| `[SKILL]`, `[TECH]` | Your skills and project tech tags. Delete the extras. |
| `[PROJECT TITLE N]`, `[PROJECT DESCRIPTION…]` | Your project details |
| `[LIVE DEMO URL]`, `[REPO]` | Project links. Delete the "Live demo" link if a project has none. |
| `[START]`, `[END]`, `[JOB TITLE]`, … | Timeline entries |
| `[YOUR-FORM-ID]` | Your Formspree form ID (see step 4) |
| `[YOUR SITE URL]` | Your live URL, e.g. `https://janedoe.github.io/portfolio` (used for link previews) |

**Tip:** do a final search for `[` before you share the site, to make sure nothing is left.

### 2. Add your photo and project images
- **Photo:** replace `assets/profile.jpg`, keeping the same name. A 4:5 portrait around 800×1000 works best. Strip location data (EXIF) before uploading.
- **Projects:** save screenshots as `assets/project-name.jpg` (16:10 ratio, about 1200×750), then update the `src` in the project card. Update the `alt` text to describe the image. Never include real people's personal data in a screenshot.
- **Bench photos:** each `<figure class="print">` in the "On the bench" section is one photo. Add yours to `assets/bench/` (4:5 portrait, about 800×1000), strip location data, and crop out serial-number stickers and other people's info.
- **Keep images small:** compress them at [squoosh.app](https://squoosh.app) (aim for under 200 KB each).

### 3. Add your resume
Replace `assets/resume.pdf` with your own resume and keep the **same file name**. The "Download Resume" button will then serve your file.

### 4. Connect the contact form (Formspree, free)
1. Create a free account at [formspree.io](https://formspree.io).
2. Click **New Form**, give it a name, and choose the email where messages should arrive.
3. Copy the form ID (the code after `/f/` in the endpoint, e.g. `https://formspree.io/f/xyzabcde` → `xyzabcde`).
4. In `index.html`, replace `[YOUR-FORM-ID]` with it.
5. Deploy, then send yourself a test message. The first submission asks you to confirm your email.

Until you add the ID, the form shows a reminder instead of sending.

### 5. Add, remove, or reorder content
- **Projects:** copy an entire `<article class="project">…</article>` block to add a card, or delete one to remove it. The grid adjusts automatically.
- **Skills:** each `<li>` is one chip. Copy an `<article class="skill-card">` block to add a category.
- **Timeline:** each `<li class="timeline__item">` is one entry. Put the newest entry first.
- **Nav links:** if you remove a section, delete its link in the `<nav>` too.

### 6. Change colors and fonts (optional)
At the top of `css/style.css`:
- `--accent` is the main accent color for light mode, and the `[data-theme="dark"]` block has a lighter version for dark mode. For readable text, keep the light-mode accent fairly dark and the dark-mode accent fairly light. Also update the matching block under `@media (prefers-color-scheme: dark)`.
- `--font-display` and `--font-body` set the fonts. To switch fonts, pick new ones at [fonts.google.com](https://fonts.google.com), update the `<link>` in `index.html`, then update these two variables.

### 7. Link preview image (optional)
`assets/og-image.png` is a generic "Portfolio" card. To personalize it, make your own 1200×630 PNG (for example in Canva or Figma) and save it with the same name. After deploying, you can check the preview at [opengraph.xyz](https://www.opengraph.xyz).

---

## Preview locally
Double-click `index.html` to open it in your browser. Or, for an experience closer to the live site, run a tiny local server from this folder:

```bash
python -m http.server 8000
# then open http://localhost:8000
```

(Or use the **Live Server** extension in VS Code.)

---

## Deploy to GitHub Pages

### 1. Create a repo and push the code
1. Sign in at [github.com](https://github.com) and click **New repository** (the **+** in the top-right).
2. Name it:
   - `portfolio` (or anything you like), which makes your site live at `https://USERNAME.github.io/portfolio/`, **or**
   - `USERNAME.github.io` (your exact username), which makes your site live at `https://USERNAME.github.io/`. Recommended for a main portfolio.
3. Leave it **Public**, and do **not** add a README, .gitignore, or license (you already have files). Click **Create repository**.
4. In a terminal inside this folder, run (replace `USERNAME` and `REPO-NAME`):

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO-NAME.git
git push -u origin main
```

If Git asks you to sign in, follow the browser prompt. If it asks for a password, use a [personal access token](https://github.com/settings/tokens), not your account password. If Git asks who you are, first run:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### 2. Turn on GitHub Pages
1. In your repo on GitHub, open **Settings → Pages** (left sidebar).
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Under **Branch**, pick **main** and **/ (root)**, then click **Save**.

### 3. Get your live URL
After about 1–2 minutes, refresh **Settings → Pages**. A banner shows **"Your site is live at …"** with your URL:
- `https://USERNAME.github.io/REPO-NAME/` or
- `https://USERNAME.github.io/` (if you named the repo `USERNAME.github.io`)

You can follow the deployment in the repo's **Actions** tab. Then put this URL in `[YOUR SITE URL]` in `index.html`, and on your resume and LinkedIn.

**Updating the site later:**

```bash
git add .
git commit -m "Update projects"
git push
```

The live site refreshes within a minute or two. If you don't see changes, hard-refresh with Ctrl+Shift+R.

### 4. (Optional) Use a custom domain
1. Buy a domain from a registrar (e.g. Namecheap, Cloudflare, Porkbun).
2. In the repo, go to **Settings → Pages → Custom domain**, enter your domain (e.g. `www.janedoe.dev`), and click **Save**. GitHub adds a `CNAME` file to your repo; run `git pull` before your next push.
3. At your registrar, add DNS records:
   - **For `www.janedoe.dev`:** a `CNAME` record with host `www`, pointing to `USERNAME.github.io`.
   - **For the bare domain `janedoe.dev`:** four `A` records with host `@`, pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, and `185.199.111.153`.
4. DNS can take from a few minutes to 24 hours. Once GitHub shows the domain as verified, tick **Enforce HTTPS**.
5. Update `[YOUR SITE URL]` in `index.html` to your new domain.

See [GitHub's custom domain docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site) if you get stuck.

---

## Pre-launch checklist
- [ ] No `[` placeholders left in `index.html`
- [ ] Photo, project screenshots, and resume replaced
- [ ] Formspree ID added and a test message received
- [ ] All links open the right pages (GitHub, LinkedIn, demos)
- [ ] Checked on your phone, in both light and dark mode
- [ ] `[YOUR SITE URL]` updated so link previews work
