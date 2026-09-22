# Jesus Embassy Kaduna — RCCG Website


<ul>
            <li>Jesus Embassy Kaduna Province 5 Headquarters, Redemption Road Gwari Avenue, Beside U.B.A Kakuri Kaduna</li>
            <li>+234 701 613 1188</li>

A clean, modern, static website for **Jesus Embassy Kaduna**, a parish of the
**Redeemed Christian Church of God (RCCG)**. Built with plain HTML5, CSS3,
and vanilla JavaScript — no build step, no framework — so it can be edited
by hand and deployed directly to GitHub Pages.

## ⚠️ Before you publish this site

This project ships with **placeholder content and images everywhere real
church information wasn't supplied**. Search the codebase for square
brackets — `[ADD ...]` — and replace every one of them with confirmed,
official information before the site goes live. Do not publish with
placeholder text still in place. See "What still needs to be added" below.

## Project structure

```
/
├── index.html            Home
├── about.html             Our story, vision, mission, beliefs, leadership
├── services.html          Sunday / midweek / prayer / Bible study / special services
├── ministries.html        Filterable ministry directory
├── events.html            Upcoming & past events
├── media.html             Watch live, sermon archive, videos, audio
├── gallery.html           Filterable photo grid with lightbox
├── news.html              News & announcements list
├── news-article.html      Template for a single news article — duplicate per story
├── connect.html           Visitor info, prayer request, testimony, join a ministry,
│                          house fellowship finder
├── contact.html           Contact details, map, contact form
│
├── css/
│   ├── style.css          Design tokens, layout, and component styles
│   └── responsive.css     Tablet & mobile breakpoints
│
├── js/
│   ├── main.js            Nav toggle, footer year, demo form handling
│   ├── gallery.js         Gallery filtering + lightbox
│   └── events.js          Events tabs, sermon/news/fellowship search & filter
│
├── assets/
│   ├── images/
│   │   ├── logo/          rccg-logo.png, rccg-favicon.png/.ico
│   │   ├── hero/          Page banner images
│   │   ├── pastors/       Leadership photos
│   │   ├── services/      Service photos
│   │   ├── ministries/    Ministry photos
│   │   ├── events/        Event photos
│   │   ├── gallery/       Gallery photos
│   │   └── news/          News photos
│   └── icons/             (reserved — most icons are inline SVG in the HTML)
│
└── README.md
```

All paths in every page use **relative references** (`./css/style.css`,
`./assets/images/...`) so the site works correctly both locally and once
deployed to a GitHub Pages project site.

## Replacing the RCCG logo

Every page currently uses a **placeholder logo** at
`assets/images/logo/rccg-logo.png` (a labelled circle reading "RCCG LOGO —
ADD OFFICIAL LOGO HERE") and a matching placeholder favicon at
`assets/images/logo/rccg-favicon.png` / `.ico`.

To add the real logo:
1. Save the official RCCG logo as `assets/images/logo/rccg-logo.png`
   (square image, transparent background recommended).
2. Save a square version for the favicon as
   `assets/images/logo/rccg-favicon.png` (512×512px recommended), and
   regenerate `rccg-favicon.ico` from it using any favicon generator.
3. Keep the same filenames and every page updates automatically — no other
   changes are needed.

## Replacing photos

Every photo on the site is a labelled placeholder ("ADD CHURCH PHOTO HERE" /
"IMAGE GOES HERE" / "PASTOR PHOTO — ADD IMAGE HERE") sized to the exact
aspect ratio the real photo should use. To replace one:

1. Find the image file in `assets/images/<section>/` (filenames match their
   purpose, e.g. `hero-main.jpg`, `pastor-01.jpg`, `service-sunday.jpg`,
   `ministry-youth.jpg`, `gallery-01.jpg`).
2. Replace it with a real photo **using the exact same filename**, and the
   new photo will appear on the site automatically.
3. Try to match the original placeholder's aspect ratio for the cleanest
   crop (ratios are noted in each placeholder image).

## Editing text content

All editable text is written in plain HTML and wrapped in `[ADD ...]` or
`[ADD OFFICIAL ...]` placeholders, or flagged with a dashed "Editable
content area" note. Open the relevant `.html` file in any text/code editor
and replace the bracketed text directly — no build step required.

Key things to confirm with church leadership before launch:
- Church address, phone number, email, and WhatsApp number
- Service days/times and short descriptions (`index.html`, `services.html`)
- Official welcome message (`index.html`, `connect.html`)
- Church history, vision, mission, and doctrinal statement (`about.html`)
- Pastor/leader names, titles, and biographies (`about.html`)
- Facebook Live / YouTube links (`index.html`, `media.html`, footer — every
  link marked `data-editable-link`)
- Social media URLs (`data-editable-link="facebook"`, `"instagram"`, etc.)
- Google Maps embed (replace the `.map-frame` placeholder text with a real
  `<iframe src="https://www.google.com/maps/embed?...">`)
- Actual ministries active at the church (`ministries.html` — remove any
  that don't apply)
- Real events, sermons, and news articles (replace all `[ADD ...]` fields)
- House fellowship locations, if applicable (`connect.html`) — remove the
  section entirely if the church does not run house fellowships

## Forms

The Prayer Request, Testimony, Join a Ministry, and Contact forms currently
show a front-end "submitted" confirmation only (see `data-demo-form` in
`js/main.js`) — **they do not send data anywhere yet.** Before launch,
connect them to a real service, for example:
- [Formspree](https://formspree.io) or [Netlify Forms](https://www.netlify.com/platform/core/forms/) (add their required `action`/attributes to each `<form>`)
- A custom backend endpoint
- A simple `mailto:` fallback for very low traffic

## Deploying to GitHub Pages

1. Create a new GitHub repository and push this entire folder to it:
   ```bash
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`,
   branch `main`, folder `/ (root)`.
4. Save. GitHub will publish the site at
   `https://<your-username>.github.io/<your-repo>/`.
5. Because every path in this project is relative, the site will work
   correctly at that sub-path with no further changes.

## Browser support & accessibility notes

- Fully responsive from small phones through desktop (see `css/responsive.css`).
- Keyboard-accessible navigation, skip-to-content link, and visible focus states.
- Respects `prefers-reduced-motion`.
- Semantic HTML with a proper heading hierarchy, descriptive `alt` text
  (including on placeholders, so it's obvious what to replace), and
  per-page Open Graph metadata for social sharing.

## Fonts

The site loads **Fraunces** (headings) and **Work Sans** (body text) from
Google Fonts via `<link>` tags in each page's `<head>`. No local font files
are bundled — an internet connection is required to load the exact
typefaces (a system serif/sans fallback is defined for offline viewing).
