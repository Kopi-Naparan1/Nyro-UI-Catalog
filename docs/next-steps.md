# Next Steps to Publish UI Components

1. **Confirm the build output is up to date**  
   - Run `npm run ui:build` from this repo root whenever you edit any components. The workflow also runs it, but keeping the local `ui-components/dist` directory current helps you verify mistakes before pushing.

2. **Prepare the publishable package**  
   - Run `npm run ui:prepare:github -- <github-owner>` and use your actual GitHub user/org (for example `npm run ui:prepare:github -- kopi-naparan1`). That script edits `ui-components/package.json` to:
     - scope the package as `@<github-owner>/ui-components`
     - point `main`, `module`, and `exports` at `ui-components/dist`
     - set `files` to `["dist", "styles", "README.md"]`
   - Do **not** commit that `package.json` change. It’s only for the publish step and the workflow reverts it automatically on the runner.

3. **Commit and push your work**  
   - `git add package.json package-lock.json .github/workflows/publish-ui-components.yml scripts/build-ui-components.mjs scripts/prepare-ui-package-for-github.mjs ui-components/README.md` plus any other files you edited.  
   - `git commit -m "Prepare UI components for GitHub Packages"`  
   - `git push origin main` (or your feature branch)

4. **Trigger the GitHub workflow**  
   - On GitHub, go to **Actions > Publish UI Components** and click **Run workflow**.  
   - Alternatively, push a tag like `ui-components-v1.0.0`: `git tag ui-components-v1.0.0 && git push origin ui-components-v1.0.0`. Pushing the tag triggers the workflow and also updates the package version from the tag name.
   - The workflow already runs `npm run ui:build`, `npm test`, and the `ui:prepare:github` script before calling `npm publish ./ui-components` against `https://npm.pkg.github.com`.

5. **Authentication for consumers**  
   - Any project that installs the scoped package needs an `.npmrc` with:

     ```text
     @<github-owner>:registry=https://npm.pkg.github.com
     //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
     ```

   - Consumers can set `GITHUB_TOKEN` or a personal access token with `write:packages` scope (but not commit it to source).

6. **Repeat for future releases**  
   - Update components or version, run `npm run ui:build`, push, and trigger the workflow/tag again. Each run publishes a fresh package to GitHub Packages without any extra manual steps.

If anything fails (build error, publish rejection), send me the terminal output and I can help debug the specific step.
