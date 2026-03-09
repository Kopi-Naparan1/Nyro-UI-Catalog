# UI Components

Reusable React components for buttons, inputs, layout, navigation, and feedback.

## Quick Start (This Project)

Import from the library entrypoint instead of deep file paths:

```jsx
import { Button, Card, TextInput, Modal } from "../ui-components";
```

The `ui-components/index.js` entrypoint auto-loads `styles/foundation.css`, so tokens/base styles are available without extra imports.

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
npm install ../Spendlytics/ui-components
```

Then import with the package name:

```jsx
import { Button, Card, TextInput } from "@spendlytics/ui-components";
```

Optional category import (smaller import surface):

```jsx
import { Button, IconButton } from "@spendlytics/ui-components/buttons";
```

## Publishing as a Library (GitHub Packages)

Recommended default for now: GitHub Packages. It is fast to set up from this repo and private-by-default to your GitHub org/user.

### Package naming

- Development/local package name: `@spendlytics/ui-components`
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

For broader public distribution later, you can add npmjs publishing as a second registry target.
