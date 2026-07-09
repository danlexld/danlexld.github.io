# Daniel's Personal Website

Built with [Astro](https://astro.build). Landing/about page plus a Markdown blog, deployed to GitHub Pages.

## Commands

Run from the project root:

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                         |
| `npm run dev`     | Start local dev server at `localhost:4321`   |
| `npm run build`   | Build the production site to `./dist/`       |
| `npm run preview` | Preview the production build locally         |

## Writing a blog post

Add a Markdown file to `src/content/blog/`, e.g. `my-post.md`:

```markdown
---
title: 'My Post'
description: 'What this post is about.'
pubDate: 2026-07-09
---

Post content here.
```

Optional frontmatter: `updatedDate`, `heroImage` (place images in `src/assets/`).

## Editing the site

- Landing page: `src/pages/index.astro`
- About page: `src/pages/about.astro`
- Header nav / footer: `src/components/Header.astro`, `src/components/Footer.astro`
- Site title & description: `src/consts.ts`

## Deploying to GitHub Pages

1. Create a GitHub repo and push this project to its `main` branch.
   - Repo named `<username>.github.io` → site lives at `https://<username>.github.io/`
   - Any other repo name → site lives at `https://<username>.github.io/<repo>/`
2. In the repo settings, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes the site. The action fills in the correct `site`/`base` URL automatically.
