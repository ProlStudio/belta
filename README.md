# Belta — Production Interface

Generated under **PROL_BASE_v1.7.3** (production system) + **PROL_PROFESIONAL_v3** (plan) from the Belta Production Brief.

Stack: vanilla HTML5 / CSS3 / JavaScript. No frameworks, no build step, no dependencies (Google Fonts loaded via CDN link).

---

## 1. Project Structure

```
belta-site/
├── index.html              Home — hero, services overview, differentiators, process, reviews, CTA
├── services.html           Detailed services + FAQ (mandatory conversion modules)
├── packages.html           Pricing/packages page (added Sept 2026 — see §7)
├── contact.html            Contact form (→ Google Sheets + WhatsApp) + direct contact methods
├── privacy-policy.html     Legal — placeholder content, ready for final copy
├── terms.html               Legal — placeholder content, ready for final copy
├── robots.txt
├── sitemap.xml
├── vercel.json              Clean URLs config (see §8) — required for hosting on Vercel
├── google-apps-script/
│   └── Code.gs              Apps Script for the Google Sheets lead log (see §7)
├── assets/
│   ├── css/
│   │   └── style.css       Single stylesheet, token-based design system
│   ├── js/
│   │   └── main.js         Mobile nav, sticky header, FAQ accordion, contact form (Sheets + WhatsApp), footer year
│   ├── images/
│   │   └── logo/           Client logo resources (see §3)
│   └── icons/               PROL official icon library references (see §4 — pending integration)
└── README.md                This file
```

Multi-page architecture per PROL_PROFESIONAL_v3 (4 primary pages as of Sept 2026: index, services, packages, contact — legal pages don't count toward the limit).

---

## 2. Production Brief traceability

Every content decision traces back to `Belta_Production_Brief.md` and `Belta_Manual_de_Marca_1.docx`:

- **Primary service / hero / CTA:** lead generation via Google & Meta Ads, WhatsApp as the default contact channel (Desired Visitor Action).
- **Services list:** Meta Ads, Google Ads, TikTok Ads, UGC content, website creation, online store, community management — all six from the brief's "All Services".
- **Target audience call-outs:** car dealerships and health-sector marketers, per "Customer Segments".
- **Differentiators:** full-funnel / one-team positioning and CPL/leads/ROI focus, sourced from the brand manual's philosophy and tone-of-voice sections.
- **Reviews section:** included because the brief explicitly lists "Reseñas" as mandatory content, but no real testimonials were submitted — see §5. Since Sept 2026 it no longer has its own nav tab (replaced by "Paquetes" per client request) but still lives on the homepage at `index.html#resenas`, reachable via footer/scroll — nothing was deleted, only unlinked from the primary nav.
- **Packages/pricing:** added Sept 2026 from a client-supplied draft (`Belta_Paquetes_Draft.html`) — content and prices are the client's own, adapted into the site's existing `.pricing-*` design-system components rather than the draft's inline styles. See §7.
- **Design system:** colors (`#040F26` navy, `#05ADC9` turquoise, `#22C7A7` green) and typography (Poppins / Inter) taken directly from the brand manual.

No business claims, statistics, certifications, or testimonials were invented anywhere in the project.

---

## 3. Client Resources used

| Resource | Source | Used as |
|---|---|---|
| `Logo (1).png` | Client submission | `assets/images/logo/belta-icon-navy.png` (header/footer mark) + resized favicons (`favicon-16x16.png`, `favicon-32x32.png`, `apple-touch-icon.png`, `belta-icon-navy-512.png` for Open Graph) |

**Note on the wordmark:** the client did not submit an isolated horizontal-lockup file usable in a live header — only the composite brand-manual sheet showing all lockup variants together (`ChatGPT Image 9 ago 2026...png`), which is manual documentation, not a usable production asset. Per PROL_BASE §5.8 (no recreating visual resources), the header/footer instead pairs the real icon file with the wordmark set in **Poppins ExtraBold with wide tracking** — the exact typographic treatment the brand manual itself specifies for the "BELTA" logotype. This is a CSS text implementation, not a generated graphic.

**Action for production:** when Belta provides an isolated horizontal-lockup PNG/SVG, replace `.brand` markup's `<img>` + `<span class="brand-word">` with the single logo file — no CSS/structural changes needed elsewhere.

No photography was received (the "Photography" field in the intake contained a duplicate of the logo icon) — no photographic imagery is used anywhere in the site, per the Visual Resource Policy.

---

## 4. Pending Production Resources (Standardized Placeholders)

| Item | Status | Action needed |
|---|---|---|
| **Icon library SVGs** | Referenced by standard path, not included in this delivery | Copy files from PROL's official icon library into `assets/icons/` — see `assets/icons/README.md` for the exact file list |
| **Legal content** (Privacy Policy, Terms) | Structural placeholder text in place, clearly marked | Replace bracketed `[Contenido pendiente de carga]` paragraphs with final legal copy |
| **Real testimonials** | Placeholder cards with visibly fake content ("Nombre pendiente" / dashed border) | Replace with real client testimonials once Belta provides them |
| **Domain** | Client has none yet | `belta.com.ar` used as a placeholder canonical/OG domain — update all `<link rel="canonical">` and `og:url`-equivalent references once the real domain is registered |

None of the above prevented generating a structurally complete, production-ready project — all required sections, pages, and components exist and are ready for resource replacement without restructuring.

---

## 5. Open flags carried over from the Production Brief

These require a decision from Belta before final publication (documented in the Production Brief's "Production Observations"):

1. The referenced PDF with additional business context was never received.
2. The contact email is shared with LeadRise (another PROL client) — confirm whether that's intentional for this site.
3. No real testimonials exist yet, despite "Reseñas" being a required section — the current section is a clearly-marked placeholder.

---

## 6. Technical notes

- **Forms:** the contact form redirects to WhatsApp with a pre-filled message, and (once configured — see §7) also logs the lead to a Google Sheet. The WhatsApp number (`+54 9 351 342-6418`) is centralized in `assets/js/main.js` (`WHATSAPP_NUMBER`) and in each `wa.me` link in the HTML.
- **Accessibility:** semantic HTML5 landmarks, skip link, visible focus states, keyboard-operable nav/FAQ, `prefers-reduced-motion` respected.
- **Performance:** no JS frameworks, no icon sprite build step, fonts loaded with `preconnect`, images pre-sized for their contexts.
- **SEO:** per-page metadata + Open Graph, canonical URLs, `robots.txt` + `sitemap.xml` included, legal pages set to `noindex, follow`.

---

## 7. September 2026 revision round

Client-requested changes, applied across the site:

- **Nav:** "Reseñas" replaced by "Paquetes" in the primary nav and footer nav on every page (the Reseñas section itself stays on the homepage, just unlinked from the top nav — see §2).
- **New page — `packages.html`:** built from the client's `Belta_Paquetes_Draft.html` reference. Kept the draft's content and hierarchy (4 tiers: Pack Meta, Pack Google, Full Funnel — featured, Scale) but rebuilt it with the site's own `.pricing-*` components in `style.css` instead of the draft's inline styles, so it matches the rest of the site's design system. Every "Consultar" CTA points to `contact.html`, not WhatsApp, per the draft's own foot-note instruction.
- **Contact updated everywhere:** WhatsApp number is now `+54 9 351 342-6418` and email is `digitallbelta@gmail.com` (header/footer CTAs, contact page, floating WhatsApp button, `mailto:` links).
- **Contact form:** added "Rubro / industria" (dropdown: Automotor, Salud, Construcción, Inmobiliario, Otro — matching the site's own stated verticals) and "Ciudad o zona" (free text) fields. Both are required, alongside the existing Nombre, Empresa and Servicio de interés fields.
- **Contact section contrast fix:** the contact form card is white-on-white against the plain `.section` background, which is the most likely source of the "no contrastan bien" report — added `.section--soft` (off-white) to that section so the white form card and the navy contact-info card both read with clear separation.
- **Lead destinations:** the form still redirects to WhatsApp with the message pre-filled (now including rubro and zona), and additionally does a `fetch()` to a Google Apps Script Web App that appends the lead as a row in a Google Sheet.
  - **Placeholder sheet (provisional):** PROL created [`Clientes Belta - Formularios enviados`](https://docs.google.com/spreadsheets/d/1gQ450gzZFKb8a8qV_c832e3sA9zQ3LIjeuBkDI3wIbM/edit) to use until Belta shares their definitive sheet. Note for whoever picks this up: **the spreadsheet link itself is not what goes into the code** — `GOOGLE_SHEETS_ENDPOINT` needs the URL you get after deploying `google-apps-script/Code.gs` as a Web App from *inside* that sheet's Apps Script editor (Extensiones → Apps Script → Implementar). Full click-by-click steps are in `Code.gs`'s header comment. Pasting the raw `docs.google.com/.../edit` link there would silently do nothing (the fetch uses `mode:'no-cors'`, so it fails quietly instead of throwing an error).
  - **Still pending:** deploying the script (needs a human to click through Google's authorization screen — can't be scripted) and pasting the resulting `.../exec` URL into `assets/js/main.js`. Until that's done, `GOOGLE_SHEETS_ENDPOINT` stays empty and the form keeps working exactly as before (WhatsApp only) — no lead is lost either way. When Belta's real sheet arrives, repeat the same deploy steps there and swap the URL.
- **WhatsApp alert on new lead:** stubbed as a commented-out example (CallMeBot) inside `Code.gs`, since no WhatsApp-alert provider or credentials were supplied. Needs Belta to pick a provider before it can be turned on.
- **Footer signature removed:** the "creado por PROL" / infrastructure credit line was removed from the footer on every page, per explicit client instruction. **Flag for PROL:** this is a deviation from PROL_BASE's standard footer requirement (§ mandatory footer groups) — it costs PROL a backlink/attribution on every delivered site. Worth a quick internal conversation about whether this should be a standard negotiable in future contracts, but the removal itself was executed as instructed.
- **Brand-color consistency:** the small trust/stat badges (hero "+3 años de experiencia", etc.) and the "check" icons used across differentiators/services now use a CSS-only `.check-dot` / plain "✓" treatment in the brand gradient, instead of depending on icon-library files that were never delivered (see `assets/icons/README.md`).
- **Header layout bug (post-delivery fix):** the centered-logo grid trick had `.brand` (column 2) placed *before* the nav/CTA (columns 1 and 3) in the HTML. CSS Grid's auto-placement treats a "backwards" column jump as a signal to start a new row, so the logo silently landed on its own row above the nav — not visible in the review pass, only caught from a client screenshot. Fixed by adding explicit `grid-row: 1` to `.brand`, `.primary-nav__list`, `.header-cta` and `.nav-toggle` in `style.css`. Worth remembering for any future header built with this same out-of-DOM-order grid-column pattern.
- **Packages page contrast bug (post-delivery fix):** `.pricing-card`'s default background (`rgba(255,255,255,0.04)`, meant to sit on a dark section) was placed inside a plain white `.section`, making the three non-featured cards' white/light text unreadable. Fixed by adding `section--navy` to that section (reusing the same convention as the homepage's Diferenciales block) instead of touching the card's own CSS.
- **Site-wide low-contrast paragraph bug (post-delivery fix):** a bare `<p>` tag always matches the global rule `p { color: var(--text-on-light-muted) }` (dark gray) unless something more specific overrides it — inheriting a section's dark background color does NOT override a direct match, that's a common CSS specificity trap. Four spots relied on the section's color instead of setting their own and ended up with dark-gray-on-navy text: the secondary-page hero subtitle (`.page-hero p` — contact, services, packages), the home hero's visual-card blurb (`.hero-visual-card p`), and both the footer tagline and copyright line (`.footer-brand p`, `.footer-bottom p` — every page). Fixed by adding an explicit `color: var(--text-on-dark-muted)` to each of those four selectors in `style.css`. Good pattern to check first on any future low-contrast report: is a `<p>` (or other bare tag) relying on inherited color instead of an explicit rule for its context.

---

## 8. Clean URLs (Vercel)

The client will host on Vercel, at least for now. `vercel.json` sets `"cleanUrls": true` and `"trailingSlash": false`: Vercel serves `services.html` when the visitor requests `/services` (no extension), and 308-redirects anyone who lands on `/services.html` to the clean version — good for SEO (no duplicate-content URLs) and no visible `.html` anywhere.

Every internal link in every page (`nav`, footer, CTA buttons, service-card links) was rewritten to the extension-less, root-relative form (`href="/services"`, `href="/"` for home, anchors preserved: `href="/services#google-meta-ads"`). Canonical tags, `sitemap.xml` and `robots.txt` were updated the same way.

**Important constraint for future edits:** every page loads its CSS/JS/images with a *relative* path (`assets/css/style.css`, not `/assets/css/style.css`). That only resolves correctly because `trailingSlash` is `false` — a URL like `/services` (no trailing slash) treats `services` as a file, so `assets/...` resolves back up to the site root. If anyone ever flips `trailingSlash` to `true`, every relative asset path breaks (the browser would look for `/services/assets/...`, which doesn't exist). Don't change that setting without also switching every asset reference to a root-relative path (`/assets/...`).

If the domain ever moves off Vercel, this same "hide `.html` in the URL" outcome needs a different mechanism: an `.htaccess` rewrite on Apache/cPanel hosting, or a `try_files` rule on Nginx — `vercel.json` only does anything on Vercel.
