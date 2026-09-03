# Noah Haeske — Engineering Portfolio

Static site. No build step, no dependencies. Plain HTML, one CSS file, one JS file.

```
index.html              About / landing page
research.html           Research overview
research-cassette.html  Imperial College London — passive diagnostic cassette
research-ctc.html       UF IMG — lateral filter array microfluidics
projects.html           Florida Rocket Lab + engineering work
coursework.html         Major, courses, distinctions, involvement
resume.html             CV download + featured sections
assets/css/style.css    All styling (design tokens at the top)
assets/js/main.js       Mobile nav + scroll reveal
assets/img/             Project images, headshot, video posters
assets/video/           Cold flow and launch clips (H.264 MP4, web-optimized)
assets/docs/            Resume and print portfolio PDFs
```

Total repo size is around 6 MB, well inside GitHub Pages limits. The videos were
re-encoded from the originals — 14 MB `.mov` became a 2.5 MB MP4, and the 10.7 MB launch
clip became 0.6 MB. Both use `preload="none"`, so neither downloads until someone presses
play.

---

## Before you publish — TODO

All placeholders are filled. What's left is verification and optional additions.

1. **Read the figure captions on `research-ctc.html`.** I wrote them by interpreting the
   images — the CTC/leukocyte distinction in Fig. 2 and the ball-valve sequence in Fig. 3.
   Correct anything I got wrong about the science.

2. **Confirm the PI names and departments.** Sourced from the group websites:
   - Prof. Firat Güder — Department of Bioengineering, Imperial College London
   - Prof. Z. Hugh Fan — Interdisciplinary Microsystems Group, Dept. of Mechanical &
     Aerospace Engineering, University of Florida

   If a postdoc or PhD student supervised you day-to-day, consider naming them too.

3. **Confirm the lab imagery is cleared for a public site.** You said it is. Worth a
   sentence to Prof. Fan anyway, since this page ends up linked from the CUR website.

4. **LinkedIn / GitHub.** Commented-out slots in the contact block of `index.html`.

5. **Minor, scholarships, competition placements.** Commented-out slot in `coursework.html`.

6. **Optional, would strengthen Projects:** an Ansys stress plot from the bracket
   optimization and a screenshot of the Python dashboard. Commented placeholders are in
   `projects.html`. Right now the page shows the hardware but not the analysis.

---

## Deploying

**See `DEPLOY.md`** for the step-by-step web-upload walkthrough and custom domain setup.
The condensed git version is below.

### Git version

1. Create a repo. If you name it `<your-username>.github.io`, the site lives at that
   domain directly. Any other name puts it at `<your-username>.github.io/<repo-name>/`.

2. Push this folder's contents to the repo root:

   ```bash
   cd PortfolioSite
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git push -u origin main
   ```

3. In the repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   branch `main`, folder `/ (root)`. Save.

4. Wait ~1 minute, then load the URL GitHub shows you. **Open it in a private window** to
   confirm it is publicly accessible — USP requires this, and it is the requirement people
   most often miss.

### Custom domain (optional)

Buy a domain, add a file named `CNAME` at the repo root containing just the domain
(`noahhaeske.com`, no `https://`), then point these DNS records at GitHub:

```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
CNAME www  <your-username>.github.io
```

Then set the domain under Settings → Pages and tick **Enforce HTTPS**.

---

## USP e-portfolio requirements — status

| Requirement | Where | Status |
|---|---|---|
| Clickable tab: About | `index.html` | Done |
| Clickable tab: Research | `research.html` | Done |
| Clickable tab: Coursework | `coursework.html` | Done |
| Clickable tab: CV/Resume | `resume.html` | Done |
| Headshot | `index.html` hero | Done |
| Summary sentence/quote + longer blurb | `index.html` | Done |
| Research interests | `index.html` | Done |
| Dedicated page per research project | `research-cassette.html`, `research-ctc.html` | Done |
| Project title | Both research pages | Done |
| PI name | Both research pages, spec strip | Done — verify |
| Institution + department | Both research pages, spec strip | Done — verify |
| Time affiliated | Both research pages, spec strip | Done |
| Research focus, narrative form | Both research pages | Done |
| Project responsibilities, narrative form | Both research pages | Done |
| Media conveying project information | Cassette page: 8 figures. IMG page: 3 figures. Projects: photo + 2 videos | Done |
| Major | `coursework.html` | Done |
| Course list | `coursework.html`, from both transcripts | Done |
| Distinctions / involvement | `coursework.html` | Done |
| Resume/CV download button (PDF) | `resume.html`, hero, footer | Done |
| Featured CV sections (2–3) | `resume.html` — experience, skills, leadership | Done |
| Contact section with UFL email | Every page, plus footer | Done |
| Publicly accessible | GitHub Pages | **After you deploy** |

---

## Editing notes

- **Colors and spacing** live in the `:root` block at the top of `assets/css/style.css`.
  Changing `--accent` recolors the whole site. It is currently the crimson from your
  thermal plots, so the figures and the branding match.
- **Adding a project:** copy `research-cassette.html`, change the content, add a card to
  `research.html` or `projects.html`. Nothing is generated, so what you edit is what ships.
- **The spec strip** (`<dl class="spec">`) is the four-column metadata bar. It carries the
  required project fields on research pages and the design targets on the cassette page.
  It is the one visual motif borrowed from your print portfolio — keep using it.
- **`.reveal`** on any element fades it in on scroll. Harmless to add or remove.
