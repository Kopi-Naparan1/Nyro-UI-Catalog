# Nyro UI Components

Reusable React components for buttons, inputs, layout, navigation, feedback, and composed SaaS/admin patterns.

## Quick Start (This Project)

Import from the library entrypoint instead of deep file paths:

```jsx
import { Button, Card, TextInput, Modal } from "../ui-components";
```

The `ui-components/index.js` entrypoint auto-loads `styles/foundation.css`, so tokens/base styles are available without extra imports.

## Catalog Coverage

The demo app (`src/App.jsx`) now includes a full, ordered catalog that renders every declared variant scale plus key states:

1. Buttons: `Button`, `IconButton`
2. Feedback: `Alert`, `Modal`, `Spinner`, `Tooltip`
3. Inputs: `TextInput`, `TextArea`, `Select`, `Checkbox`, `RadioButton`
4. Layout: `Container`, `Grid`, `Stack`, `Card`
5. Navigation: `Navbar`, `Sidebar`, `Breadcrumb`, `Pagination`
6. Typography: `Heading`, `Text`, `Badge`, `Link`
7. Patterns: `AuthLoginForm`, `AuthPasswordResetForm`, `AppHeaderBar`, `AppSidebarShell`, `PageHeaderActions`, `FilterToolbar`, `DataTablePanel`, `EmptyStatePanel`, `ErrorStatePanel`, `SettingsFormCard`, `BillingPlanCard`, `ProfileSummaryCard`

Each component section demonstrates:

- enum-like prop scales (for example variants/sizes/tones/positions),
- key UX states (`loading`, `disabled`, `error`, `required`, boundary states),
- and representative structural options (for example header/footer, controlled/uncontrolled, collapsible behavior).

Pattern sections additionally provide:

- `variant` support (`standard`, `compact`),
- operational states (`default`, `loading`, `empty` or `error`),
- and both full-component and usage snippets for faster copy-paste adoption.

## Component Functions and Usage

### Buttons

- `Button`: Primary action button with variant, size, loading, and optional icons.
- `IconButton`: Compact icon-only action button with loading and `ariaLabel` support.

```jsx
<Button variant="primary" loading={isSaving}>Save</Button>
<IconButton ariaLabel="Open settings" variant="outline">?</IconButton>
```

### Feedback

- `Alert`: Inline status message (`info`, `success`, `warning`, `danger`) with optional dismiss button.
- `Modal`: Accessible dialog with escape close, overlay close, focus trap, and focus restore.
- `Spinner`: Loading indicator with screen-reader label.
- `Tooltip`: Hover/focus helper text attached to a trigger element.

```jsx
<Alert variant="success" dismissible>Saved successfully.</Alert>
<Modal open={open} onClose={() => setOpen(false)} title="Invite team">...</Modal>
<Spinner label="Loading data" />
<Tooltip content="Helpful tip"><button type="button">Hover me</button></Tooltip>
```

### Inputs

- `TextInput`: Label + helper/error + optional prefix/suffix.
- `TextArea`: Multi-line text input with helper/error states.
- `Select`: Dropdown with options list and optional placeholder.
- `Checkbox`: Boolean field with helper/error text.
- `RadioButton`: Single radio field (compose multiple with same `name`).

```jsx
<TextInput label="Workspace" helperText="Shown to teammates" />
<Select label="Plan" options={[{ label: "Starter", value: "starter" }]} />
<Checkbox label="Enable alerts" />
```

### Layout

- `Container`: Width-constrained wrapper with optional centering/padding.
- `Grid`: Responsive grid with fixed columns or `autoFit` mode.
- `Stack`: Flex-based vertical/horizontal spacing primitive.
- `Card`: Surface container with optional header/footer and elevation.

```jsx
<Container maxWidth="xl">
  <Grid autoFit minColumnWidth="18rem" gap="lg">
    <Card>...</Card>
  </Grid>
</Container>
```

### Navigation

- `Navbar`: Top app navigation with optional mobile collapse.
- `Sidebar`: Side navigation with controlled or uncontrolled collapse state.
- `Breadcrumb`: Current-location breadcrumb trail.
- `Pagination`: Page navigator with compact ellipsis logic.

```jsx
<Sidebar
  title="Workspace"
  defaultCollapsed
  items={[{ label: "Dashboard", href: "#", active: true }]}
/>
<Pagination currentPage={page} totalPages={12} onPageChange={setPage} />
```

### Typography

- `Heading`: Semantic heading with tone, size, alignment, and weight.
- `Text`: Body text primitive with size/tone/weight/truncate support.
- `Badge`: Small status/tag pill.
- `Link`: Styled anchor with tone/underline/external helpers.

```jsx
<Heading as="h2" size="md">Billing</Heading>
<Text tone="muted">Last synced 2 minutes ago.</Text>
<Badge variant="success">Active</Badge>
```

### Patterns

- `AuthLoginForm`, `AuthPasswordResetForm`: auth flows with loading and error handling.
- `AppHeaderBar`, `AppSidebarShell`, `PageHeaderActions`: app chrome and page-level scaffolding.
- `FilterToolbar`, `DataTablePanel`: filter/list page composition blocks.
- `EmptyStatePanel`, `ErrorStatePanel`: reusable operational state surfaces.
- `SettingsFormCard`, `BillingPlanCard`, `ProfileSummaryCard`: account and configuration building blocks.

```jsx
import {
  AuthLoginForm,
  FilterToolbar,
  DataTablePanel,
} from "@spendlytics/ui-components/patterns";
```

## Reusing in Other Projects

### Option 1: Copy with setup script (recommended)

From this repo root:

```bash
npm run setup:ui -- ../your-other-project
```

Custom destination path inside target project:

```bash
npm run setup:ui -- ../your-other-project src/ui-components
```

After copying, in the target project import from the copied entrypoint:

```jsx
import { Button, Card, TextInput } from "../ui-components";
```

### Option 2: Manual copy

Copy the `ui-components/` folder into your target project and import from its `index.js`.

### Option 3: Install as a local package (best for multiple projects)

This repo now includes [ui-components/package.json](./package.json), so you can install it directly from filesystem path in another project:

```bash
npm install ../nyro-ui-catalog/ui-components
```

Then import with the package name:

```jsx
import { Button, Card, TextInput } from "@spendlytics/ui-components";
```

Optional category import (smaller import surface):

```jsx
import { Button, IconButton } from "@spendlytics/ui-components/buttons";
```

Patterns category import:

```jsx
import { AppSidebarShell, PageHeaderActions } from "@spendlytics/ui-components/patterns";
```

## Publishing as a Library (GitHub Packages)

Recommended default for now: GitHub Packages. It is fast to set up from this repo and private-by-default to your GitHub org/user.

### Package naming

- Development/local package name (kept for compatibility): `@spendlytics/ui-components`
- Published GitHub package name: `@<github-owner>/ui-components`

The publish workflow automatically rewrites the package scope to your actual GitHub owner before publishing.

### First-time setup

1. Push this project to a GitHub repository.
2. Ensure GitHub Actions is enabled for that repository.
3. Run a manual publish from the Actions tab (`Publish UI Components`) or create a release tag:

```bash
git tag ui-components-v1.0.1
git push origin ui-components-v1.0.1
```

The workflow file is [`.github/workflows/publish-ui-components.yml`](../.github/workflows/publish-ui-components.yml).

### Install from another project

```bash
npm install @<github-owner>/ui-components --registry=https://npm.pkg.github.com
```

Then import:

```jsx
import { Button, Card } from "@<github-owner>/ui-components";
```

If needed, configure npm auth in the consuming project (`.npmrc`):

```text
@<github-owner>:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

## Setup Difficulty

Setup is now straightforward:

- Single entrypoint import (`ui-components/index.js`).
- One command copy script (`npm run setup:ui -- <target>`).
- Local package installation support (`npm install <path-to-ui-components>`).
- GitHub publish workflow for package releases.
- Foundation styles are auto-loaded when importing from the entrypoint.
- Pattern imports are available through `@spendlytics/ui-components/patterns`.

## Pattern Contribution Rules

- Include `variant` prop with `standard` and `compact`.
- Include operational state prop coverage (`default`, `loading`, `empty|error`) where applicable.
- Include both a full component snippet and a usage snippet in catalog metadata.
- Keep patterns dependency-free (compose from existing primitives + React only).

For broader public distribution later, you can add npmjs publishing as a second registry target.
