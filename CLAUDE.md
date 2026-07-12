# Daniel Thiel — Personal Website (daniel-thiel-muenchen.de)

## Owner & purpose

- Daniel Thiel is a **Rechtsreferendar am OLG München** (zweites Staatsexamen ~mid-2028). He is **not a developer** — explain technical things plainly, guide him click-by-click through external UIs (registrar, GitHub settings, Search Console), and verify his configuration from here instead of assuming he got it right. He usually writes German; answer in German then.
- The site is his **personal brand**: a German learning-in-public blog about law, aimed at being found by search engines and recommended by AI assistants before he enters the job market (~2028).
- Additional context persists in the Claude auto-memory directory for this project (index: `MEMORY.md` there). Keep it updated as facts change.

## Tech & deploy

- Astro static site, entirely German (`lang="de"`), no cookies/analytics/backend.
- Repo `danlexld/danlexld.github.io`, deploys via GitHub Actions on push to `main` (`.github/workflows/deploy.yml`), live ~30–60 s later at **https://daniel-thiel-muenchen.de**. Old URL, `www.`, and the IDN variant `daniel-thiel-münchen.de` all 301-redirect here (IDN redirect is http-only — registrar limitation, expected).
- On this Windows machine, prefix the PATH before any node/npm/npx call:
  `$env:PATH = "C:\Program Files\nodejs;$env:PATH"`
- Verify work honestly: `npm run build`, check the dev server, and after pushing poll the live URL (`curl.exe`) until the change is actually served.
- The root `CNAME` file was auto-committed by GitHub — leave it. Registrar for both domains is checkdomain.de; the Google Search Console TXT record there must stay.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, and `astro dev logs`. **Restart it after config changes or new content files** — it goes stale across sessions and 404s new posts.

## Blog post workflow (the core loop)

1. Daniel drops source material (any format) into **`notizen/`** in the repo root, or pastes notes. **The entire folder is gitignored — private source material must never be committed** (`*.docx`/`*.pdf` are additionally ignored repo-wide as a safety net). `git add -A` is therefore safe; keep it that way. Look in `notizen/` when he references a Skript or notes by name.
2. **Copyright triage before writing:** His own notes → free to rework. Third-party material (Ausbildungsskripte with named authors, textbooks) → never reproduce structure, wording, or footnotes; write a fully independent post with its own narrative — only the legal rules themselves (§§, published case law) are free. Tell him explicitly how you handled it.
3. Write the German draft in his established voice — read the existing posts in `src/content/blog/` first: learning-in-public, Referendar perspective, du-Form, plain language ("auch für Nicht-Juristen"), narrative hook instead of Lehrbuch-Gliederung, often a "Was ich mir merke" close. Every legal-topic post ends with the italic **"keine Rechtsberatung"** disclaimer after a `---` rule.
4. **Legal accuracy is your job too:** his materials sometimes cite outdated law (e.g. pre-2017 sources missing § 611a BGB) or garbled citations — verify norms, drop shaky citations, and **flag every substantive addition for his review**. He is the lawyer; it publishes under his name.
5. **Verschwiegenheitspflicht:** never include recognizable details from real proceedings at his Stationen. Abstract concepts, published decisions, and exam technique only.
6. Frontmatter: `title`, `description` (one strong sentence — it becomes the Google snippet), `pubDate`, `category` (Rechtsgebiet label shown on the blog index, e.g. "Zivilprozessrecht", "Arbeitsrecht", "In eigener Sache"). Filename = URL slug: short, lowercase, hyphenated, question-shaped where possible (SEO: narrow questions beat broad overviews). Post conventions the CSS relies on: a "## Was ich mir merke" heading followed by **exactly one paragraph** renders as the tinted panel; the closing `---` + italic paragraph renders as the disclaimer note; reading time is computed at build from word count.
7. Preview on the dev server, hand him the localhost link with review notes — **do not push until he approves the text.** Then commit, push, confirm the live URL, and optionally remind him to request indexing in the Search Console.

## Design system ("Juristisch-editorial")

- Tokens in `src/styles/global.css`: paper `#faf8f5`, ink navy (`--black` = 27,42,74), **gold `#b08d3e` decorative only** (fails text contrast — use bronze `--accent: #8a6d2f` for interactive text), warm grays. Lora serif for headings/wordmark (self-hosted at build via Astro fonts — keep it that way, GDPR), Atkinson body.
- Recurring patterns (per the 2026-07-11 Claude Design handoff, `notizen/Website design improvement.zip` has the full spec): 3px gold top bar on every page; header with brand+tagline left, nav right, gold underline on the active page; gold rule motif 76×3 (desktop) / 56×3 (mobile); bronze small-caps kickers; numbered post lists with gold Lora numerals; drop-cap on an article's first paragraph; "Was ich mir merke" panel on `--panel` tint; two-column footer. Favicon is a Justitia scale (gold on navy).
- OG image and favicons are generated from inline SVG via sharp (use Georgia — Lora isn't available to librsvg). Visually verify generated images by reading the PNG before shipping.
- A Claude Design project **"Daniel Thiel — Website"** holds the synced design system. His Claude Design exports are self-unpacking HTML bundles: extract the JSON from the `__bundler/template` and `__bundler/manifest` script tags (gunzip compressed assets) instead of opening them in a browser.

## SEO / discoverability (in place — maintain, don't rebuild)

- Person JSON-LD on the homepage (`jobTitle: Rechtsreferendar`, `worksFor: OLG München`, `sameAs`: GitHub + LinkedIn) — **update the jobTitle when he passes the 2. Examen (~2028)**. BlogPosting JSON-LD in the blog layout.
- robots.txt welcomes all crawlers incl. AI bots; sitemap auto-generated; Google Search Console (domain property) and Bing Webmaster Tools are verified and fed.
- `/impressum` and `/datenschutz` are noindex, footer-linked, and contain his real address. The Datenschutzerklärung's claims (no cookies, no analytics, no third-party embeds, no forms) **must be revised before any such feature is added**.
- Homepage sidebar "Aktuell" names his current Station — keep it accurate as his Stationen change.
- GitHub is deliberately not linked visibly (empty profile, weak signal for a lawyer) — it stays only in the Person schema.

## Gotchas

- Windows PowerShell 5.1 mangles non-ASCII (ä, ·, —) in HTTP responses — match ASCII substrings when verifying pages.
- Anything DNS/domain-fresh fails first with **stale negative caches** (GitHub Pages check, Google verification, local resolver). The config is usually already correct: verify externally (8.8.8.8, authoritative NS, DENIC RDAP), then wait 1–2 h and retry before changing anything.
- Build exit codes can be nonzero due to PS 5.1 stderr wrapping even when the build succeeded — read the output, not just the code.

## Open items

- Real photo of Daniel: the design handoff specifies framed portrait slots (1px navy border, 12px padding, small-caps caption) on the homepage hero right column and the Über-mich page left column — build them in when he provides a photo.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
