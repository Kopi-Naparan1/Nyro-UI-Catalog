# Use Nyro UI Components in Another Project (Step by Step)

This guide shows the simplest ways to use the `ui-components` library in another project folder. Follow Option 1 unless you have a reason to do otherwise.

## Before You Start

- You have Node.js and npm installed.
- Your target project is a React app (Vite, CRA, Next, etc.).
- You know the path to your target project folder.

## Option 1 (Recommended): Copy the Library into Your Project

This uses the built-in setup script and is the easiest to maintain locally.

1. Open a terminal at the root of this repo: `C:\Users\Admin\Downloads\PROGRAMMING\2026\Nyro_UI_Catalogs`
2. Run the copy command, pointing at your target project folder.

```bash
npm run setup:ui -- ..\your-project
```

If you want the components in a custom subfolder inside the target project:

```bash
npm run setup:ui -- ..\your-project src\ui-components
```

3. In your target project, import components from the copied folder.

```jsx
import { Button, Card, TextInput } from "../ui-components";
```

If you copied into `src/ui-components`, import like this instead:

```jsx
import { Button, Card, TextInput } from "./ui-components";
```

4. Load the foundation styles once near your app entrypoint (usually `src/main.jsx` or `src/index.jsx`).

```jsx
import "../ui-components/styles/foundation.css";
```

If you copied into `src/ui-components`, use:

```jsx
import "./ui-components/styles/foundation.css";
```

5. Start your target project and verify.

```bash
npm run dev
```

You should see the components render with proper styling.

## Option 2: Install as a Local Package (Good for Multiple Projects)

This keeps `ui-components` in this repo, but lets your other project depend on it.

1. In your target project folder, install the local package:

```bash
npm install ..\Nyro_UI_Catalogs\ui-components
```

2. Import using the package name:

```jsx
import { Button, Card, TextInput } from "@spendlytics/ui-components";
```

3. Load the foundation styles once:

```jsx
import "@spendlytics/ui-components/styles/foundation.css";
```

4. Start the target project and verify:

```bash
npm run dev
```

## Option 3: Manual Copy (Only If You Prefer It)

1. Copy the entire `ui-components/` folder into your target project.
2. Import from the copied `index.js` and load the CSS as shown in Option 1.

## Common Fixes

- If styles look missing, confirm `foundation.css` is imported once.
- If imports fail, double-check the relative path from your file to `ui-components`.
- If you see React version warnings, ensure your target project uses React 18+.

## Quick Checklist

- `ui-components` is inside your target project or installed via path.
- Your imports match the location you copied or installed.
- `foundation.css` is loaded once.
- The app runs without module-not-found errors.
