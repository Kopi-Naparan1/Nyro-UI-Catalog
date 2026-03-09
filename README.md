# Nyro's UI Catalog

Nyro's UI Catalog is a React + Vite workspace for previewing reusable UI components and copying production-ready patterns for SaaS/admin interfaces.

## What this project includes

- Full catalog coverage for 35 sections:
  - 23 primitive component sections across Buttons, Feedback, Inputs, Layout, Navigation, and Typography.
  - 12 composed `Patterns` sections for SaaS/admin workflows.
- Per-section guidance blocks with:
  - `When to use`
  - `Recommended for`
  - `Layouting recommendation`
  - `Notes`
- One canonical copy-ready snippet per component section with one-click clipboard support.
- Patterns include two snippets per section: full component definition + direct usage snippet.
- Responsive catalog layout with sticky index navigation.

## Run locally

```bash
npm install
npm run dev
```

Build and preview:

```bash
npm run build
npm run preview
```

## Quality gates

```bash
npm test
npm run build
```

## Project workflow

- Component showcase app: `src/App.jsx`
- Catalog content + guidance source: `src/catalog/catalogMeta.js`
- Shared section renderer/snippet copy behavior: `src/catalog/CatalogParts.jsx`
- Catalog styling: `src/App.css`
- Reusable library package: `ui-components/`

## Reusing the component library

The reusable package name intentionally remains `@spendlytics/ui-components` for compatibility.
Composed patterns are available from `@spendlytics/ui-components/patterns`.

### Copy into another project

```bash
npm run setup:ui -- ../your-project
```

### Install from local path

```bash
npm install ../nyro-ui-catalog/ui-components
```

Then import:

```jsx
import { Button, Card, TextInput } from "@spendlytics/ui-components";
```

```jsx
import { AuthLoginForm, DataTablePanel } from "@spendlytics/ui-components/patterns";
```

## Notes

- Section ids/anchors are stable so in-page index links keep working.
- The catalog is optimized for quick implementation, not only visual reference.
- Pattern contribution baseline: every pattern should provide `variant` support (`standard`/`compact`) and operational state coverage (`default`, `loading`, `empty|error`) with full+usage snippets.
