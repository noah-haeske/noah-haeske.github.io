# Home page: three versions

Everything else on the site (research, projects, coursework, resume, and all
project pages) is shared between them and was not touched.

| File | What it is |
| --- | --- |
| `index.html` | **Balanced.** The original hero layout with the portrait swapped for the cold flow clip running in a captioned frame, the light spec strip, then three work cards with larger media (one of them video). Portrait moved down to the about block. |
| `index-media.html` | **Media-first.** Compact title bar, then a full-bleed wall of four project tiles (two video), a dark spec plate, three media-led cards, and a six-frame contact sheet. |
| `index-classic.html` | **The previous home page**, byte for byte. |

Each page links to the other two from the footer fine print
("Layout: balanced · media · classic"). Delete those
`<span class="layout-switch">…</span>` lines when you no longer want them public.

## Switching which one is the home page

```
cat index-media.html > index.html      # media-first becomes the home page
cat index-classic.html > index.html    # back to the original
```

Keep a copy of whichever `index.html` you are replacing first, or use git:
the original home page is still what is committed, so `git checkout -- index.html`
always gets it back.

## Files added

- `assets/css/home-media.css` — styles for both new layouts. The balanced rules
  are in the block at the bottom of the file; everything above it belongs to the
  media-first page. Loaded only by `index.html` and `index-media.html`.
- `assets/js/media-home.js` — loads each video when it scrolls into view, pauses
  it when it leaves, and falls back to the poster frame under
  `prefers-reduced-motion` or data-saver.
- `assets/img/frl_coldflow_poster2.jpg` — a sharper poster frame from the cold flow video.
- `assets/img/frl_launch_poster2.jpg` — the ignition frame from the launch video;
  the old poster was a blurred frame. Used by the media-first page.

The original posters and every other asset are untouched.
