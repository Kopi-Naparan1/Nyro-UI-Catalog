# Personal Website Studio Plan

## Goal

Turn the catalog into a personal website assembly tool with this workflow:

1. Choose a proven page recipe.
2. Set the visual direction once.
3. Tweak a few section-level controls.
4. Reorder or swap sections.
5. Export plain React and plain CSS.
6. Hand-edit only the last mile.

The target is speed, not a generic site builder.

## Product Principles

- Keep output simple: plain React components and plain CSS files only.
- Prefer strong defaults over unlimited configuration.
- Make full-page assembly faster than browsing isolated sections.
- Preserve the existing foundation catalog instead of replacing it.
- Keep everything local-first for personal use.
- Avoid runtime dependencies in generated code.

## Shipped Architecture

### App shell

- `src/App.jsx`
- Owns the top-level mode switch:
  - `Studio`
  - `Website Sections`
  - `Foundation Kit`
- Studio is the default mode because it is the shortest path to a usable page.

### Website section registry

- `src/catalog/websiteCatalogMeta.js`
- Each section definition now carries:
  - `id`
  - `kind`
  - `variant`
  - `label`
  - `description`
  - `note`
  - `keywords`
  - `recommendedNext`
  - `preview`
  - `guideMeta`
  - `defaultConfig`
  - `controls`
  - `guide`
- This keeps the catalog, Studio composer, and export pipeline driven from the same source of truth.

### Code generation

- `src/catalog/websiteSectionCodegen.js`
- Generates:
  - section JSX
  - section CSS
  - section guides
  - page-level export bundles
- Export contract:
  - `LandingPage.jsx`
  - `LandingPage.css`
  - `theme.css`

### Studio state

- `src/catalog/websiteStudioState.js`
- Owns:
  - theme presets
  - font/radius/spacing profiles
  - starter page recipes
  - initial state
  - localStorage restore
  - reducer logic for composer and theme actions

### Studio UI

- `src/catalog/WebsiteStudio.jsx`
- Provides:
  - recipe picker
  - theme controls
  - section library
  - composer
  - selected-section editor
  - export controls
  - responsive preview viewport switch

### Preview layer

- `src/catalog/WebsiteSectionPreview.jsx`
- `src/catalog/websitePreview.css`
- Renders live previews for every website section kind.
- Consumes section config overrides and theme tokens.

## State Model

Studio state intentionally stays small:

- `recipeId`
- `themePresetId`
- `theme`
- `viewport`
- `sectionSearch`
- `sections`
- `selectedSectionId`
- `lastCopiedAsset`

Each composer section stores:

- `id`
- `sectionId`
- `config`

## Stability Guardrails

To reduce breakage risk, the current implementation follows these rules:

- The Website catalog and Foundation kit remain separate modes instead of being rewritten into the Studio flow.
- Section config is normalized before export so generated code stays valid.
- Composer sections clone config objects rather than sharing references.
- The Studio uses `localStorage` only for user workspace state, not for catalog definitions.
- Generated code does not depend on app-only runtime helpers.
- Windows filename ambiguity was removed by renaming `websiteStudio.js` to `websiteStudioState.js`.

## Verification Strategy

Automated coverage should protect the highest-risk paths:

- Studio renders by default.
- Starter recipe switching updates the composer state.
- Studio export copy works.
- Website catalog search still works.
- Foundation kit mode still works.
- Website snippet copy still works.

Manual spot checks should focus on:

- desktop / tablet / mobile preview widths
- theme token changes in preview surfaces
- copy-pasted exported code in a clean React file
- section order and duplication behavior

## What Is Intentionally Not In Scope

- accounts
- cloud sync
- collaboration
- drag-anything-anywhere page builders
- runtime visual builder dependencies
- AI-generated layouts or copy

Those features add complexity without improving the personal-use workflow enough yet.

## Recommended Next Phases

### Phase 1: Finish the Studio foundation

- Add page JSON import back into the Studio UI.
- Add downloadable file export in addition to clipboard copy.
- Add section-level content presets for pricing, testimonials, FAQ, and team cards.

### Phase 2: Make customization more useful

- Add more curated controls per section kind:
  - alignment
  - media side
  - CTA visibility
  - trust strip visibility
  - card emphasis
- Keep controls curated, not fully freeform.

### Phase 3: Improve production confidence

- Add contrast warnings for clearly unsafe theme combinations.
- Add reduced-motion preview mode.
- Add overflow checks for mobile preview.

### Phase 4: Improve reuse

- Add saved page snapshots beyond autosave.
- Add starter packs by site type:
  - SaaS
  - agency
  - waitlist
  - docs
  - dashboard marketing

## Implementation Notes

When extending this system, prefer:

- metadata additions over one-off component branching
- reducer actions over scattered local UI state
- token-based styling over per-section CSS duplication
- export simplicity over builder cleverness

The core standard is: if a feature makes the exported React/CSS harder to understand, it is probably the wrong feature.
