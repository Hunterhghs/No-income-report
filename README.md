# No Income Source & Wealth Inequality

**Wealth Concentration Is Manufacturing a Population Without Income** — an H Heuristics research report.

A single long-form digital report assessing the structural risk of "no income source" under rising wealth concentration, the 2050 headcount, and a three-lever response: portable digital income (gig/digital economy), a $500-a-month cost floor (affordable living), and policy stabilizers (UBI, automation taxes, reskilling).

## Deploy

Static site. GitHub Pages will serve `index.html` from the repository root (or a `main`/`gh-pages` branch).

- `index.html` — the report
- `assets/styles.css` — design system + layout
- `assets/app.js` — Chart.js figures, scroll-spy TOC, reading progress

Chart.js is bundled locally (`assets/vendor/chart.umd.min.js`), so there is no third-party script dependency. Fonts load from Google Fonts, which requires an internet connection on the viewer's side.

## Data notes

- Figures sourced to Brookings, UBS, UN, ILO, IMF, NBER, Upwork, McKinsey, WEF, Stockton SEED, GiveDirectly, and the WTO are labeled with their source.
- The **1.5–2.0 billion (2050)** headcount and the **$500-a-month** budget are the author's inferences/models, not published figures, and are labeled as such in the report.
