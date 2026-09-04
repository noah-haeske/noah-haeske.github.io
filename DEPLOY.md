# Getting the site online

GitHub web upload, then a custom domain. No command line, no git install.

Two phases. **Phase 1 gets you a live public URL in about 10 minutes** — that alone
satisfies the USP requirement. Phase 2 puts your own domain in front of it and can happen
later without touching the files.

---

## Phase 1 — live on GitHub Pages

### 1. GitHub account

If you don't have one, sign up at [github.com](https://github.com). Pick a username you'd
be happy having on a resume — it becomes part of the fallback URL.

### 2. Create the repository

Top right **+** → **New repository**.

- **Repository name:** `<your-username>.github.io` — use your actual username, exactly.
  (Example: if you're `nhaeske`, the repo is `nhaeske.github.io`.)
- **Public** — required. Private repos don't publish on the free tier, and USP requires
  the site be publicly accessible.
- Leave "Add a README" **unchecked** and skip .gitignore and license.
- **Create repository.**

### 3. Upload the files

On the empty repo page, click **uploading an existing file**.

Open your `PortfolioSite` folder. Select **everything inside it** — the five `.html`
files, `404.html`, `robots.txt`, `README.md`, `DEPLOY.md`, and the `assets` folder — and
drag them onto the browser window.

> **Select the contents, not the folder.** If you drag `PortfolioSite` itself, everything
> lands one level too deep and the site won't load.

Wait for all files to finish uploading — the `assets/video` files are the biggest at
around 3 MB total, so give it a moment. Then scroll down and click **Commit changes**.

### 4. Turn on Pages

In the repo: **Settings** → **Pages** (left sidebar).

Under **Build and deployment**:
- Source: **Deploy from a branch**
- Branch: **main**, folder: **/ (root)**
- **Save**

### 5. Check it

Wait 1–2 minutes. GitHub shows a banner with your URL:
`https://<your-username>.github.io`

**Open it in a private/incognito window.** This is the step people skip. If it loads
without you being signed in, it is genuinely public. If it 404s, wait another minute —
the first build is the slow one.

Click through all five tabs, download the resume, and press play on both videos.

---

## Phase 2 — your own domain

### 6. Buy it

Roughly $10–15/year. [Cloudflare Registrar](https://domains.cloudflare.com) sells at cost
with no markup on renewal; [Porkbun](https://porkbun.com) and
[Namecheap](https://namecheap.com) are also fine. Avoid registrars with a cheap first year
and an expensive renewal.

Something like `noahhaeske.com`. Short, your name, `.com` if it's free.

### 7. Point the DNS at GitHub

In your registrar's DNS settings, add these records. Delete any parking-page records they
created by default.

**Four A records** — host/name `@` (or blank, depending on the registrar):

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**One CNAME record** — host `www`, value `<your-username>.github.io` (with the trailing
dot if your registrar wants one).

Optionally add four AAAA records on `@` for IPv6. GitHub recommends keeping the A records
either way:

```
2606:50c0:8000::153
2606:50c0:8001::153
2606:50c0:8002::153
2606:50c0:8003::153
```

### 8. Tell GitHub about the domain

Back in **Settings → Pages → Custom domain**, type your domain and **Save**.

GitHub adds a `CNAME` file to the repo automatically. Don't create that file yourself —
letting GitHub write it avoids a mismatch.

### 9. Wait, then force HTTPS

GitHub runs a DNS check. It usually clears in minutes but the docs allow up to 24 hours.
Once the check passes, the **Enforce HTTPS** checkbox becomes available — tick it. Your
certificate is issued automatically and free.

Until that box is ticked, the site is served over plain HTTP. Don't hand out the link
before then.

### 10. Verify and submit

- Load the domain in a private window
- Load `www.` + your domain — it should redirect to the apex
- Confirm the padlock in the address bar
- Submit the URL to USP

---

## Updating the site later

Same repo, no ceremony:

1. Edit the file on your computer.
2. In the repo, navigate to that file → pencil icon → paste the new content → **Commit**.

Or for a bigger change: **Add file → Upload files**, drag the changed files in, commit.
Uploading a file with an existing name replaces it.

The site rebuilds in under a minute. Hard-refresh (Ctrl+Shift+R) if you still see the old
version — that's browser cache, not a failed deploy.

---

## If something breaks

**Page loads but has no styling.** The `assets` folder didn't upload, or it landed in a
subfolder. Check the repo file list — you should see `index.html` and `assets/` side by
side at the top level, not inside a `PortfolioSite` folder.

**Images work locally but 404 online.** A capitalization mismatch. GitHub's servers are
case-sensitive; Windows is not, which is why it worked on your machine. I checked all 28
file references before handing this over, so this should not happen — but it's the usual
cause if it does.

**Custom domain shows someone else's site or a GitHub 404.** DNS hasn't propagated. Give
it a few hours. Check your records at [dnschecker.org](https://dnschecker.org).

**"Enforce HTTPS" is greyed out.** The DNS check hasn't passed yet. Wait, then reload the
Pages settings page.

---

Sources: [Managing a custom domain for your GitHub Pages
site](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)
· [Securing your GitHub Pages site with
HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)
