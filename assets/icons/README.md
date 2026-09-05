# Icon Library — Pending Integration

This project references icons from **PROL's official icon library** (see `03__ICON_LIBRARY.md`) by their standardized file paths, following the folder structure and naming conventions defined in that specification.

Per PROL_BASE §5.8 / §5.13 and the Icon Library's own rules, **no icon files have been generated, recreated, or approximated** for this delivery — the official SVG files were not included in this project's context.

## What needs to happen before publishing

Copy the following files from PROL's official icon library into this `assets/icons/` folder, preserving the exact same paths. No HTML, CSS, or JS changes are required — every reference already points to the correct standardized location.

| Path | Used in |
|---|---|
| `communication/whatsapp.svg` | Floating contact button, header/footer CTA, contact page |
| `communication/email.svg` | Contact page |
| `communication/location.svg` | Contact page |
| `communication/contact.svg` | Homepage — Differentiators |
| `business/briefcase.svg` | Homepage & Services — Google & Meta Ads |
| `business/users.svg` | Homepage & Services — Community Management |
| `business/team.svg` | Homepage & Services — Differentiators |
| `business/settings.svg` | Homepage & Services — Differentiators |
| `social/tiktok.svg` | Homepage & Services — TikTok Ads |
| `documents/file.svg` | Homepage & Services — Contenido UGC |
| `ecommerce/cart.svg` | Homepage & Services — Tienda Online |
| `navigation/arrow-right.svg` | Homepage — service card links |
| `ui/check.svg` | Homepage — Differentiators |
| `ui/check-circle.svg` | Hero trust strip |
| `ui/external-link.svg` | Homepage & Services — Sitios Web |

Until these files are added, the corresponding `<img>` elements will not render an icon (they carry empty `alt=""` since all of them are decorative/supporting, so this does not break accessibility or layout — cards and sections remain fully readable without the icon).

Do not substitute these with generated, AI-created, or third-party icons — use only the official PROL icon library files.
