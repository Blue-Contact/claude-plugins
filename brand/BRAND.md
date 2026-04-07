# Blue Contact Brand Guide for Artifacts

> **IMPORTANT:** Before generating ANY visual output (React dashboards, PPTX slides, PDF reports, HTML pages), read `brand/brand.json` to load the official brand tokens. Do NOT hardcode color values — always reference the brand config.

## Quick Reference

### Primary Colors
| Token | Hex | Use |
|-------|-----|-----|
| Contact Blue | `#006AFF` | Primary brand color. Charts, buttons, links, hero stats, headlines. |
| Graphite | `#2A3A57` | Primary text, headings, dark UI elements. |
| Clear Sky | `#334669` | Secondary text, muted labels, supporting chart elements. |
| Seafoam | `#12C7B4` | Accent color. Secondary chart series, highlights, call-to-action contrast. |

### Brand Gradient
- **From:** `#1A94FF` → **To:** `#006AFF`
- CSS: `linear-gradient(135deg, #1A94FF 0%, #006AFF 100%)`
- Use for: hero banners, title bars, gradient backgrounds, logo accent areas.

### Semantic / UI Colors
| Token | Hex | Use |
|-------|-----|-----|
| Success | `#00C864` | Positive values, growth indicators, good coverage |
| Danger | `#DB4646` | Negative values, low coverage, errors |
| Hazard | `#FF9A1F` | Warnings, moderate values, alerts |
| Eggshell | `#E4E9F5` | Subtle backgrounds, card surfaces, borders, modal overlays |

### Chart Palette (in order of use)
1. `#006AFF` — Contact Blue (always first)
2. `#1994FF` — Light Blue
3. `#12C7B4` — Seafoam
4. `#334669` — Clear Sky
5. `#FF9A1F` — Hazard (for variety)
6. `#00C864` — Success (for variety)

## How to Apply Branding by Artifact Type

### React / JSX Dashboards
```jsx
// Always define brand constants at the top of the component
const BRAND = {
  blue: '#006AFF',
  lightBlue: '#1994FF',
  seafoam: '#12C7B4',
  graphite: '#2A3A57',
  clearSky: '#334669',
  success: '#00C864',
  danger: '#DB4646',
  hazard: '#FF9A1F',
  eggshell: '#E4E9F5',
  white: '#FFFFFF',
  gradient: 'linear-gradient(135deg, #1A94FF 0%, #006AFF 100%)',
};

// Chart palette for Recharts
const CHART_COLORS = [BRAND.blue, BRAND.lightBlue, BRAND.seafoam, BRAND.clearSky, BRAND.hazard, BRAND.success];
```

**Styling rules for React artifacts:**
- Header/title bar: Use `BRAND.gradient` as background with white text
- Stat cards: White background, `BRAND.blue` for the big number, `BRAND.graphite` for labels
- Tab active state: `BRAND.blue` border-bottom or background
- Charts: Use `CHART_COLORS` array; Recharts `fill` and `stroke` should use brand tokens
- Tooltips: `BRAND.graphite` background, white text
- Footer: Include "Data provided by Blue Contact" in `BRAND.clearSky` text
- Coverage indicators: Success (>80%), Hazard (50-80%), Danger (<50%)
- Card borders/separators: `BRAND.eggshell`
- Body text: `BRAND.graphite` — never pure black

**Logo in React artifacts:**
- Read the SVG file from `brand/logos/icon-gradient.svg`
- Convert to a base64 data URI and embed as an `<img>` in the header
- Minimum size: 24x24px in headers; give adequate clear space

### PPTX Presentations
- Title slide background: Blue Contact gradient (#1A94FF → #006AFF)
- Title text: White, bold
- Content slide accent: Contact Blue (#006AFF) for headers and chart elements
- Body text: Graphite (#2A3A57)
- Chart colors: Follow the chart palette order above
- Footer on every slide: "Data provided by Blue Contact" in Clear Sky (#334669)
- Include the Blue Contact logo (horizontal gradient) on title and closing slides

### PDF Reports
- Header bar: Blue Contact gradient
- Section headers: Contact Blue (#006AFF)
- Body text: Graphite (#2A3A57)
- Table headers: Contact Blue background, white text
- Table alternating rows: Eggshell (#E4E9F5)
- Charts: Follow chart palette
- Footer: "Data provided by Blue Contact · bluecontact.com"

## Typography Guidance

The brand typeface is **FF Clan** but this is not available in web contexts. Use the fallback stack:
```
'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
```

- **Headlines:** Bold/Black weight, can use uppercase with generous letter-spacing
- **Stat callouts:** Black weight, Contact Blue color, large size (2rem+)
- **Body text:** Regular/Medium weight, Graphite color
- **Labels/captions:** Medium weight, Clear Sky color, smaller size

## Logo Usage Rules

1. The symbol (chain-link icon) may be used alone.
2. The logotype (text "BLUE CONTACT") must NEVER appear without the symbol.
3. Give the logo clear space equal to at least half the icon width on all sides.
4. On light backgrounds: use the gradient or single-color blue version.
5. On dark backgrounds: use the white version.
6. Never place the gradient logo on colored or mid-tone backgrounds.

## Attribution

Every artifact MUST include attribution text: **"Data provided by Blue Contact"**
- In dashboards: footer area
- In presentations: bottom of every slide
- In reports: page footer
- Include the date of data pull wherever possible
