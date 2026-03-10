import { useEffect, useMemo, useReducer } from "react";
import { Badge, Button, Card, Heading, Stack, Text } from "../../ui-components";
import { WEBSITE_SECTION_GROUPS, WEBSITE_SECTION_MAP } from "./websiteCatalogMeta";
import { buildPageBundle, buildSectionBundle } from "./websiteSectionCodegen";
import {
  FONT_FAMILY_OPTIONS,
  RADIUS_PROFILES,
  restoreStudioState,
  SPACING_PROFILES,
  studioReducer,
  STARTER_PAGE_RECIPES,
  STUDIO_STORAGE_KEY,
  THEME_PRESETS,
} from "./websiteStudioState";
import WebsiteSectionPreview from "./WebsiteSectionPreview";
import "./websiteStudio.css";

async function copyText(value) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(value);
    return;
  }

  if (typeof document === "undefined") {
    throw new Error("Clipboard is unavailable");
  }

  const textarea = document.createElement("textarea");
  textarea.value = value;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!copied) {
    throw new Error("Manual copy failed");
  }
}

function createThemeStyle(theme) {
  return {
    "--studio-font-family": theme.fontFamily,
    "--studio-page-background": theme.pageBackground,
    "--studio-surface": theme.surface,
    "--studio-surface-muted": theme.surfaceMuted,
    "--studio-surface-dark": theme.surfaceDark,
    "--studio-text": theme.text,
    "--studio-text-muted": theme.textMuted,
    "--studio-text-on-dark": theme.textOnDark,
    "--studio-accent": theme.accent,
    "--studio-accent-contrast": theme.accentContrast,
    "--studio-border": theme.border,
    "--studio-radius-md": theme.radiusMd,
    "--studio-radius-lg": theme.radiusLg,
    "--studio-radius-xl": theme.radiusXl,
    "--studio-page-gap": theme.pageGap,
    "--studio-page-padding": theme.pagePadding,
    "--studio-shadow-md": theme.shadowMd,
    "--studio-shadow-lg": theme.shadowLg,
  };
}

function filterLibraryGroups(groups, query) {
  if (!query.trim()) {
    return groups;
  }

  const normalized = query.trim().toLowerCase();

  return groups
    .map((group) => {
      const items = group.items.filter((item) =>
        [item.label, item.description, ...(item.keywords || [])].some((value) => value.toLowerCase().includes(normalized)),
      );

      return items.length ? { ...group, items } : null;
    })
    .filter(Boolean);
}

function getActiveProfileId(theme, profiles) {
  return (
    profiles.find((profile) =>
      Object.entries(profile.tokens).every(([key, value]) => theme[key] === value),
    )?.id || "custom"
  );
}

function getActiveFontFamilyId(theme) {
  return FONT_FAMILY_OPTIONS.find((option) => option.value === theme.fontFamily)?.id || "custom";
}

function StudioField({ label, children, hint }) {
  return (
    <label className="website-studio__field">
      <span className="website-studio__field-label">{label}</span>
      {children}
      {hint ? <span className="website-studio__field-hint">{hint}</span> : null}
    </label>
  );
}

function ControlField({ field, value, onChange }) {
  if (field.type === "textarea") {
    return (
      <StudioField key={field.id} label={field.label}>
        <textarea value={value} rows={4} onChange={(event) => onChange(field.id, event.target.value)} />
      </StudioField>
    );
  }

  if (field.type === "select") {
    return (
      <StudioField key={field.id} label={field.label}>
        <select value={value} onChange={(event) => onChange(field.id, event.target.value)}>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </StudioField>
    );
  }

  if (field.type === "range") {
    return (
      <StudioField key={field.id} label={field.label} hint={`Current: ${value}`}>
        <input
          type="range"
          min={field.min}
          max={field.max}
          value={value}
          onChange={(event) => onChange(field.id, Number(event.target.value))}
        />
      </StudioField>
    );
  }

  return (
    <StudioField key={field.id} label={field.label}>
      <input type="text" value={value} onChange={(event) => onChange(field.id, event.target.value)} />
    </StudioField>
  );
}

function RecipeCard({ state, dispatch }) {
  return (
    <Card bordered elevated padding="lg">
      <Stack gap="sm">
        <Heading as="h2" size="sm">
          Starter Recipes
        </Heading>
        <Text size="sm" tone="muted">
          Start from a proven flow, then replace only the sections you do not want.
        </Text>
        <div className="website-studio__recipe-grid">
          {STARTER_PAGE_RECIPES.map((recipe) => (
            <button
              key={recipe.id}
              type="button"
              className={
                state.recipeId === recipe.id
                  ? "website-studio__recipe-button website-studio__recipe-button--active"
                  : "website-studio__recipe-button"
              }
              onClick={() => dispatch({ type: "apply-recipe", recipeId: recipe.id })}
            >
              <strong>{recipe.label}</strong>
              <span>{recipe.description}</span>
            </button>
          ))}
        </div>
      </Stack>
    </Card>
  );
}

function ThemeCard({ state, dispatch }) {
  const activeFontFamilyId = getActiveFontFamilyId(state.theme);
  const activeRadiusProfileId = getActiveProfileId(state.theme, RADIUS_PROFILES);
  const activeSpacingProfileId = getActiveProfileId(state.theme, SPACING_PROFILES);

  return (
    <Card bordered elevated padding="lg">
      <Stack gap="sm">
        <Heading as="h2" size="sm">
          Theme Studio
        </Heading>
        <Text size="sm" tone="muted">
          Set the visual direction once, then let the entire page adapt.
        </Text>

        <div className="website-studio__preset-grid">
          {THEME_PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              className={
                state.themePresetId === preset.id
                  ? "website-studio__preset-button website-studio__preset-button--active"
                  : "website-studio__preset-button"
              }
              onClick={() => dispatch({ type: "set-theme-preset", presetId: preset.id })}
            >
              <strong>{preset.label}</strong>
              <span>{preset.description}</span>
            </button>
          ))}
        </div>

        <div className="website-studio__theme-grid">
          <StudioField label="Font direction">
            <select
              value={activeFontFamilyId}
              onChange={(event) => {
                const option = FONT_FAMILY_OPTIONS.find((entry) => entry.id === event.target.value);

                if (option) {
                  dispatch({ type: "update-theme-token", key: "fontFamily", value: option.value });
                }
              }}
            >
              {FONT_FAMILY_OPTIONS.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
              <option value="custom">Custom</option>
            </select>
          </StudioField>
          <StudioField label="Corner style">
            <select
              value={activeRadiusProfileId}
              onChange={(event) => {
                const profile = RADIUS_PROFILES.find((entry) => entry.id === event.target.value);

                if (profile) {
                  dispatch({ type: "update-theme-tokens", tokens: profile.tokens });
                }
              }}
            >
              {RADIUS_PROFILES.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.label}
                </option>
              ))}
              <option value="custom">Custom</option>
            </select>
          </StudioField>
          <StudioField label="Page rhythm">
            <select
              value={activeSpacingProfileId}
              onChange={(event) => {
                const profile = SPACING_PROFILES.find((entry) => entry.id === event.target.value);

                if (profile) {
                  dispatch({ type: "update-theme-tokens", tokens: profile.tokens });
                }
              }}
            >
              {SPACING_PROFILES.map((profile) => (
                <option key={profile.id} value={profile.id}>
                  {profile.label}
                </option>
              ))}
              <option value="custom">Custom</option>
            </select>
          </StudioField>
          <StudioField label="Accent">
            <input
              type="color"
              value={state.theme.accent}
              onChange={(event) => dispatch({ type: "update-theme-token", key: "accent", value: event.target.value })}
            />
          </StudioField>
          <StudioField label="Page background">
            <input
              type="color"
              value={state.theme.pageBackground}
              onChange={(event) => dispatch({ type: "update-theme-token", key: "pageBackground", value: event.target.value })}
            />
          </StudioField>
          <StudioField label="Surface">
            <input
              type="color"
              value={state.theme.surface}
              onChange={(event) => dispatch({ type: "update-theme-token", key: "surface", value: event.target.value })}
            />
          </StudioField>
          <StudioField label="Dark surface">
            <input
              type="color"
              value={state.theme.surfaceDark}
              onChange={(event) => dispatch({ type: "update-theme-token", key: "surfaceDark", value: event.target.value })}
            />
          </StudioField>
        </div>
      </Stack>
    </Card>
  );
}

function LibraryCard({ state, dispatch }) {
  const visibleGroups = useMemo(
    () => filterLibraryGroups(WEBSITE_SECTION_GROUPS, state.sectionSearch),
    [state.sectionSearch],
  );

  return (
    <Card bordered elevated padding="lg">
      <Stack gap="sm">
        <Heading as="h2" size="sm">
          Section Library
        </Heading>
        <Text size="sm" tone="muted">
          Add sections into the composer as needed. The current page stays local to your browser.
        </Text>
        <StudioField label="Find a section">
          <input
            type="search"
            value={state.sectionSearch}
            onChange={(event) => dispatch({ type: "set-section-search", value: event.target.value })}
            placeholder="hero, pricing, dashboard..."
          />
        </StudioField>
        <div className="website-studio__library">
          {visibleGroups.map((group) => (
            <section key={group.id} className="website-studio__library-group">
              <div className="website-studio__library-group-header">
                <strong>{group.title}</strong>
                <span>{group.items.length}</span>
              </div>
              <div className="website-studio__library-items">
                {group.items.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="website-studio__library-item"
                    onClick={() => dispatch({ type: "add-section", sectionId: item.id })}
                  >
                    <span>{item.label}</span>
                    <small>{item.description}</small>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      </Stack>
    </Card>
  );
}

function ComposerCard({ state, dispatch }) {
  return (
    <Card bordered elevated padding="lg">
      <Stack gap="sm">
        <Heading as="h2" size="sm">
          Page Composer
        </Heading>
        <Text size="sm" tone="muted">
          Reorder, duplicate, and remove sections until the page flow feels right.
        </Text>
        <div className="website-studio__composer-list">
          {state.sections.map((section, index) => {
            const item = WEBSITE_SECTION_MAP[section.sectionId];
            const isActive = section.id === state.selectedSectionId;

            return (
              <div
                key={section.id}
                className={isActive ? "website-studio__composer-item website-studio__composer-item--active" : "website-studio__composer-item"}
              >
                <button
                  type="button"
                  className="website-studio__composer-main"
                  onClick={() => dispatch({ type: "select-section", sectionId: section.id })}
                >
                  <span className="website-studio__composer-index">{index + 1}</span>
                  <div>
                    <strong>{item.label}</strong>
                    <small>{section.config.heading}</small>
                  </div>
                </button>
                <div className="website-studio__composer-actions">
                  <button type="button" onClick={() => dispatch({ type: "move-section", sectionId: section.id, direction: -1 })}>
                    Up
                  </button>
                  <button type="button" onClick={() => dispatch({ type: "move-section", sectionId: section.id, direction: 1 })}>
                    Down
                  </button>
                  <button type="button" onClick={() => dispatch({ type: "duplicate-section", sectionId: section.id })}>
                    Duplicate
                  </button>
                  <button type="button" onClick={() => dispatch({ type: "remove-section", sectionId: section.id })}>
                    Remove
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Stack>
    </Card>
  );
}

function SelectedSectionCard({ section, dispatch }) {
  if (!section) {
    return (
      <Card bordered elevated padding="lg">
        <Text tone="muted">Select a section in the composer to customize it.</Text>
      </Card>
    );
  }

  const item = WEBSITE_SECTION_MAP[section.sectionId];

  const copySelectedAsset = async (asset) => {
    const bundle = buildSectionBundle(item, section.config);
    const source = asset === "jsx" ? bundle.jsxCode : bundle.cssCode;
    await copyText(source);
    dispatch({ type: "mark-copy", asset: `selected ${asset}` });
  };

  return (
    <Card bordered elevated padding="lg">
      <Stack gap="sm">
        <Heading as="h2" size="sm">
          Selected Section
        </Heading>
        <Text size="sm" tone="muted">
          Edit the key values here. The preview and generated code update from these settings.
        </Text>
        <Badge variant="brand" pill>
          {item.label}
        </Badge>
        <div className="website-studio__controls-grid">
          {item.controls.map((field) => (
            <ControlField
              key={field.id}
              field={field}
              value={section.config[field.id]}
              onChange={(key, value) => dispatch({ type: "update-section-config", sectionId: section.id, key, value })}
            />
          ))}
        </div>
        <div className="website-studio__copy-row">
          <Button size="sm" variant="outline" onClick={() => copySelectedAsset("jsx")}>
            Copy selected JSX
          </Button>
          <Button size="sm" variant="outline" onClick={() => copySelectedAsset("css")}>
            Copy selected CSS
          </Button>
        </div>
        {item.recommendedNext?.length ? (
          <div className="website-studio__recommendations">
            <Text as="p" size="sm" weight="semibold">
              Recommended next sections
            </Text>
            <div className="website-studio__recommendation-list">
              {item.recommendedNext.map((sectionId) => (
                <button
                  key={sectionId}
                  type="button"
                  className="website-studio__recommendation"
                  onClick={() => dispatch({ type: "add-section", sectionId })}
                >
                  {WEBSITE_SECTION_MAP[sectionId]?.label || sectionId}
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </Stack>
    </Card>
  );
}

function ExportCard({ state, dispatch }) {
  const pageBundle = useMemo(
    () => buildPageBundle(state.sections, WEBSITE_SECTION_MAP, state.theme),
    [state.sections, state.theme],
  );

  const copyAsset = async (asset) => {
    const source =
      asset === "jsx"
        ? pageBundle.pageJsxCode
        : asset === "css"
          ? pageBundle.pageCssCode
          : asset === "theme"
            ? pageBundle.themeCssCode
            : JSON.stringify({ theme: state.theme, sections: state.sections }, null, 2);

    await copyText(source);
    dispatch({ type: "mark-copy", asset });
  };

  return (
    <Card bordered elevated padding="lg">
      <Stack gap="sm">
        <Heading as="h2" size="sm">
          Export
        </Heading>
        <Text size="sm" tone="muted">
          Export a plain React page and CSS bundle so you only tweak the last mile manually.
        </Text>
        <div className="website-studio__copy-row">
          <Button size="sm" onClick={() => copyAsset("jsx")}>
            Copy LandingPage.jsx
          </Button>
          <Button size="sm" variant="outline" onClick={() => copyAsset("css")}>
            Copy LandingPage.css
          </Button>
          <Button size="sm" variant="outline" onClick={() => copyAsset("theme")}>
            Copy theme.css
          </Button>
          <Button size="sm" variant="ghost" onClick={() => copyAsset("json")}>
            Copy page JSON
          </Button>
        </div>
        <Text size="sm" tone="muted">
          {state.lastCopiedAsset ? `Last copied: ${state.lastCopiedAsset}` : "Nothing copied yet."}
        </Text>
      </Stack>
    </Card>
  );
}

export default function WebsiteStudio() {
  const [state, dispatch] = useReducer(studioReducer, undefined, restoreStudioState);
  const activeSection = state.sections.find((section) => section.id === state.selectedSectionId) || null;
  const themeStyle = useMemo(() => createThemeStyle(state.theme), [state.theme]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      STUDIO_STORAGE_KEY,
      JSON.stringify({
        recipeId: state.recipeId,
        themePresetId: state.themePresetId,
        theme: state.theme,
        viewport: state.viewport,
        sectionSearch: state.sectionSearch,
        sections: state.sections,
        selectedSectionId: state.selectedSectionId,
      }),
    );
  }, [state]);

  return (
    <div className="website-studio">
      <div className="website-studio__sidebar">
        <RecipeCard state={state} dispatch={dispatch} />
        <ThemeCard state={state} dispatch={dispatch} />
        <LibraryCard state={state} dispatch={dispatch} />
        <ComposerCard state={state} dispatch={dispatch} />
        <SelectedSectionCard section={activeSection} dispatch={dispatch} />
        <ExportCard state={state} dispatch={dispatch} />
      </div>

      <div className="website-studio__preview-column">
        <Card bordered elevated padding="lg">
          <Stack gap="sm">
            <div className="website-studio__preview-header">
              <div>
                <Heading as="h2" size="sm">
                  Studio Preview
                </Heading>
                <Text size="sm" tone="muted">
                  Assemble the page here, then export the React and CSS bundle.
                </Text>
              </div>
              <div className="website-studio__viewport-switch">
                {["desktop", "tablet", "mobile"].map((viewport) => (
                  <button
                    key={viewport}
                    type="button"
                    className={
                      state.viewport === viewport
                        ? "website-studio__viewport-button website-studio__viewport-button--active"
                        : "website-studio__viewport-button"
                    }
                    onClick={() => dispatch({ type: "set-viewport", viewport })}
                  >
                    {viewport}
                  </button>
                ))}
              </div>
            </div>

            <div className="website-studio__preview-badges">
              <Badge variant="success" pill>
                {state.sections.length} sections in page
              </Badge>
              <Badge variant="brand" pill>
                {THEME_PRESETS.find((preset) => preset.id === state.themePresetId)?.label || "Custom theme"}
              </Badge>
              <Badge variant="warning" pill>
                Auto-saved locally
              </Badge>
            </div>

            <div className={`website-studio__viewport website-studio__viewport--${state.viewport}`}>
              <div className="website-studio__theme-scope" style={themeStyle}>
                <main className="website-studio__page">
                  {state.sections.map((section) => (
                    <WebsiteSectionPreview
                      key={section.id}
                      item={WEBSITE_SECTION_MAP[section.sectionId]}
                      config={section.config}
                      themeStyle={themeStyle}
                      mode="canvas"
                    />
                  ))}
                </main>
              </div>
            </div>

            <div className="website-studio__utility-row">
              <Button variant="ghost" onClick={() => dispatch({ type: "reset-studio" })}>
                Reset workspace
              </Button>
              <Text size="sm" tone="muted">
                Reset reloads the default recipe and theme preset.
              </Text>
            </div>
          </Stack>
        </Card>
      </div>
    </div>
  );
}
