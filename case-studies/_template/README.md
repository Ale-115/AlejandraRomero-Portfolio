# UX/UI Case Study Template

Each Digital Experience project lives in its own folder with two files:

```
case-studies/<project>/index.html   ← page shell (copy nomad/index.html, change <title>, description, noscript link)
case-studies/<project>/content.js   ← all the project content (window.CASE_STUDY)
case-studies/<project>/assets/      ← optimized images: name-800.jpg + name-1600.jpg
```

Shared files (do not duplicate per project):

- `_template/case-study.css` — layout and components (`cs-` classes)
- `_template/case-study.js` — renders content.js into the page
- `_template/projects.js` — project order + prev/next navigation. Set `page` when a project's folder exists.

## content.js

```js
window.CASE_STUDY = {
  slug: 'nomad',                 // must match projects.js
  title: 'Nomad',
  status: 'academic',            // implemented | concept | academic | progress | awaiting-dev
  nav: true,                     // optional sticky index of sections (labels: section.navLabel || kicker)
  statusLabel: '',               // optional custom badge text
  hero: { statement, type, role, timeline, team, tools: [], image, imageAlt, links: [{ label, href }],
          award: { label, href },     // optional recognition badge next to the status
          app: { url, fit?: { width, height }, hint?, buttonLabel? } },  // live app or Figma prototype on the right instead of the hero image (fit only for local pages)
  sections: {
    overview, challenge, role, research, strategy,
    architecture, wireframes, ui, final, outcome
    // each: { title?, kicker?, intro?, blocks: [...] }
  }
};
```

Sections always render in the order above and are numbered automatically.
Leave a section out (or give it no content) and it disappears.

## Block types

| type | fields |
|---|---|
| `text` | heading?, body (string or array), list? |
| `split` | image {src, alt}, heading?, body?, list?, reverse? |
| `image` | src, alt, title?, caption?, bleed? (wider than the column) |
| `gallery` | items [{src, alt, title?, caption?}], columns? (2 or 3) |
| `points` | heading?, items [{title, text?, why?, whyLabel?}] — numbered decisions |
| `stats` | items [{value, label}], source? |
| `callout` | text, label?, tone? (blue, lilac, pink, cream, outline) |
| `palette` | heading?, colors [{hex, name?}] |
| `team` | heading?, members [{name, role?, me?}] |
| `compare` | before {src, alt, label?}, after {src, alt, label?} — design evolution |
| `prototype` | url (Figma prototype link or a local page such as `app/index.html`), title?, caption?, buttonLabel?, fit? ({width, height, background?}: scale a fixed-size page to fit), bare? (no card or frame), height? (CSS height of the embed) — embedded on desktop, button on phones |
| `steps` | heading?, items [{title, text?, tools?}] — simple numbered workflow |
| `sources` | heading?, items [{label, href, note?}] — linked references (research) |
| `todo` | note — placeholder, only visible with `?draft` in the URL |

Image `src` is a base path (`assets/journey-map`) and loads `-800.jpg` / `-1600.jpg`;
a full filename (`assets/photo.png`) also works. Images open in a lightbox on click.

## Content rules

Only use information you can back up. Anything unconfirmed goes in a `todo`
block so it never shows on the live site. Use `status` to say clearly whether
the work is implemented, a concept, in progress or awaiting development.
