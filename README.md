# Belta — Production Interface

Generated under **PROL_BASE_v1.7.3** (production system) + **PROL_PROFESIONAL_v3** (plan) from the Belta Production Brief.

Stack: vanilla HTML5 / CSS3 / JavaScript. No frameworks, no build step, no dependencies (Google Fonts loaded via CDN link).

---

## 1. Project Structure

```
belta-site/
├── index.html              Home — hero, services overview, differentiators, process, reviews, CTA
├── services.html           Detailed services + FAQ (mandatory conversion modules)
├── contact.html            Contact form (→ WhatsApp) + direct contact methods
├── privacy-policy.html     Legal — placeholder content, ready for final copy
├── terms.html               Legal — placeholder content, ready for final copy
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/
│   │   └── style.css       Single stylesheet, token-based design system
│   ├── js/
│   │   └── main.js         Mobile nav, sticky header, FAQ accordion, WhatsApp form redirect, footer year
│   ├── images/
│   │   └── logo/           Client logo resources (see §3)
│   └── icons/               PROL official icon library references (see §4 — pending integration)
└── README.md                This file
```

Multi-page architecture per PROL_PROFESIONAL_v3 (3 primary pages: index, services, contact — legal pages don't count toward the limit).

---

## 2. Production Brief traceability

Every content decision traces back to `Belta_Production_Brief.md` and `Belta_Manual_de_Marca_1.docx`:

- **Primary service / hero / CTA:** lead generation via Google & Meta Ads, WhatsApp as the default contact channel (Desired Visitor Action).
- **Services list:** Meta Ads, Google Ads, TikTok Ads, UGC content, website creation, online store, community management — all six from the brief's "All Services".
- **Target audience call-outs:** car dealerships and health-sector marketers, per "Customer Segments".
- **Differentiators:** full-funnel / one-team positioning and CPL/leads/ROI focus, sourced from the brand manual's philosophy and tone-of-voice sections.
- **Reviews section:** included because the brief explicitly lists "Reseñas" as mandatory content, but no real testimonials were submitted — see §5.
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

- **Forms:** the contact form redirects to WhatsApp with a pre-filled message (no backend). The WhatsApp number (`+54 9 351 315-8317`) is centralized in `assets/js/main.js` (`WHATSAPP_NUMBER`) and in each `wa.me` link in the HTML.
- **Accessibility:** semantic HTML5 landmarks, skip link, visible focus states, keyboard-operable nav/FAQ, `prefers-reduced-motion` respected.
- **Performance:** no JS frameworks, no icon sprite build step, fonts loaded with `preconnect`, images pre-sized for their contexts.
- **SEO:** per-page metadata + Open Graph, canonical URLs, `robots.txt` + `sitemap.xml` included, legal pages set to `noindex, follow`.
