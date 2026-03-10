# Spendlytics UI Catalog

Spendlytics UI Catalog is a React + Vite workspace for assembling personal-use website pages quickly with starter recipes, live theme controls, reusable section exports, and the original foundation component kit in the same app.

## Modes

The catalog now has three modes:

- `Studio`: the default workflow for assembling full pages from starter recipes, theme presets, editable section controls, and plain React/CSS export.
- `Website Sections`: 50 combined sections for marketing sites, content pages, pricing, social proof, dashboards, and visual interactions.
- `Foundation Kit`: the original primitives and SaaS/admin patterns for lower-level composition.

Each website section now includes:

- a live preview,
- a dedicated JSX snippet,
- a dedicated CSS snippet,
- and practical usage guidance.

Studio mode adds:

- starter page recipes for common site types,
- theme presets plus direct token editing,
- a composer for add / remove / duplicate / reorder,
- selected-section controls with live code generation,
- responsive viewport preview,
- local autosave,
- and page-level export for `LandingPage.jsx`, `LandingPage.css`, and `theme.css`.

## Website Section Coverage

The website catalog includes:

- Hero sections
- Scrolling / animation sections
- Feature sections
- Social proof
- Pricing
- Navigation
- Content sections
- Utility sections
- Dashboard combined components
- Visual interaction sections

## Foundation Coverage

The foundation kit still includes:

- Buttons
- Feedback
- Inputs
- Layout
- Navigation
- Typography
- SaaS/admin patterns

## Run locally

```bash
npm install
npm run dev
```

## Verification

```bash
npm test
npm run build
```

## Main files

- App shell and mode switching: `src/App.jsx`
- Studio workspace UI: `src/catalog/WebsiteStudio.jsx`
- Studio state, presets, and recipes: `src/catalog/websiteStudioState.js`
- Website sections metadata: `src/catalog/websiteCatalogMeta.js`
- Website code generation and export: `src/catalog/websiteSectionCodegen.js`
- Website section previews: `src/catalog/WebsiteSectionPreview.jsx`
- Website section renderer: `src/catalog/WebsiteCatalog.jsx`
- Foundation catalog renderer utilities: `src/catalog/CatalogParts.jsx`
- Reusable library package: `ui-components/`
- Architecture and roadmap: `docs/personal-website-studio-plan.md`

## Reusing the component library

The reusable package name remains `@spendlytics/ui-components`.

Copy the library into another project:

```bash
npm run setup:ui -- ../your-project
```

Or install it from the local path:

```bash
npm install ../spendlytics/ui-components
```

Then import from the package entrypoint:

```jsx
import { Button, Card, TextInput } from "@spendlytics/ui-components";
```
