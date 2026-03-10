const SECTION_TONES = ["light", "dark", "accent"];
const SECTION_DENSITIES = ["comfortable", "compact"];
const SECTION_KINDS_WITH_ITEMS = new Set([
  "scrolling",
  "feature",
  "social",
  "content",
  "utility",
  "dashboard",
]);

const ITEM_LABELS_BY_KIND = {
  scrolling: ["Launch faster", "Guide attention", "Create depth", "Stay readable", "Keep motion calm", "Build momentum"],
  feature: ["Clear hierarchy", "Reusable structure", "Responsive defaults", "Trust-building detail", "Layout flexibility", "Fast iteration"],
  social: ["Customer proof", "Credible outcome", "Specific result", "Team confidence", "Better conversion", "Cleaner positioning"],
  content: ["Editorial structure", "Readable rhythm", "Compelling summary", "Clean grouping", "Deeper context", "Useful follow-up"],
  utility: ["Process clarity", "Low friction", "Concrete steps", "Visible help", "Actionable next step", "Implementation-ready"],
  dashboard: ["Revenue overview", "Recent activity", "Team performance", "Pipeline health", "Account growth", "Operational rhythm"],
};

const snippet = (strings, ...values) => String.raw({ raw: strings }, ...values).trim();

export function toComponentName(id) {
  return id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export function toRootClass(componentName) {
  return componentName.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

function jsxText(value) {
  return `{${JSON.stringify(String(value || ""))}}`;
}

function createCardLabels(kind, itemCount) {
  const source = ITEM_LABELS_BY_KIND[kind] || ITEM_LABELS_BY_KIND.feature;
  return Array.from({ length: itemCount }, (_, index) => source[index % source.length]);
}

function normalizeTone(value, fallback) {
  return SECTION_TONES.includes(value) ? value : fallback;
}

function normalizeDensity(value, fallback) {
  return SECTION_DENSITIES.includes(value) ? value : fallback;
}

function clampItemCount(kind, rawCount) {
  const fallback = kind === "hero" || kind === "navigation" || kind === "pricing" || kind === "visual" ? 3 : 4;
  const count = Number.isFinite(Number(rawCount)) ? Number(rawCount) : fallback;

  if (kind === "pricing") {
    return 3;
  }

  if (kind === "navigation" || kind === "hero" || kind === "visual") {
    return Math.min(4, Math.max(2, count));
  }

  return Math.min(6, Math.max(2, count));
}

export function createDefaultSectionConfig(item) {
  const defaultTone =
    item.kind === "dashboard" || item.kind === "visual"
      ? "dark"
      : item.kind === "hero" && item.variant === "gradient-animated"
        ? "accent"
        : "light";

  return {
    eyebrow: item.kind === "hero" ? "Website hero" : `${item.kind} section`,
    heading: item.label,
    body: item.description,
    primaryCta: item.kind === "hero" ? "Start free" : item.kind === "navigation" ? "Get started" : "Choose plan",
    secondaryCta: item.kind === "hero" ? "Book demo" : "Learn more",
    itemCount: clampItemCount(item.kind, 4),
    tone: defaultTone,
    density: "comfortable",
  };
}

export function normalizeSectionConfig(item, overrides = {}) {
  const defaults = item.defaultConfig || createDefaultSectionConfig(item);

  return {
    eyebrow: String(overrides.eyebrow ?? defaults.eyebrow ?? ""),
    heading: String(overrides.heading ?? defaults.heading ?? item.label ?? ""),
    body: String(overrides.body ?? defaults.body ?? item.description ?? ""),
    primaryCta: String(overrides.primaryCta ?? defaults.primaryCta ?? "Start free"),
    secondaryCta: String(overrides.secondaryCta ?? defaults.secondaryCta ?? "Learn more"),
    itemCount: clampItemCount(item.kind, overrides.itemCount ?? defaults.itemCount),
    tone: normalizeTone(overrides.tone ?? defaults.tone, defaults.tone),
    density: normalizeDensity(overrides.density ?? defaults.density, defaults.density),
  };
}

export function getControlSchemaForItem(item) {
  const controls = [
    {
      id: "heading",
      label: "Heading",
      type: "text",
    },
    {
      id: "body",
      label: "Body",
      type: "textarea",
    },
    {
      id: "tone",
      label: "Tone",
      type: "select",
      options: [
        { label: "Light", value: "light" },
        { label: "Dark", value: "dark" },
        { label: "Accent", value: "accent" },
      ],
    },
    {
      id: "density",
      label: "Density",
      type: "select",
      options: [
        { label: "Comfortable", value: "comfortable" },
        { label: "Compact", value: "compact" },
      ],
    },
  ];

  if (item.kind === "hero") {
    controls.unshift({
      id: "eyebrow",
      label: "Eyebrow",
      type: "text",
    });

    controls.push(
      {
        id: "primaryCta",
        label: "Primary CTA",
        type: "text",
      },
      {
        id: "secondaryCta",
        label: "Secondary CTA",
        type: "text",
      },
    );
  }

  if (SECTION_KINDS_WITH_ITEMS.has(item.kind)) {
    controls.push({
      id: "itemCount",
      label: "Item count",
      type: "range",
      min: 2,
      max: item.kind === "dashboard" ? 5 : 6,
    });
  }

  return controls;
}

function getSurfaceBackground(tone, kind) {
  if (kind === "hero") {
    if (tone === "accent") {
      return "linear-gradient(135deg, var(--studio-surface-dark), var(--studio-accent), color-mix(in srgb, var(--studio-accent) 72%, #14532d))";
    }

    if (tone === "light") {
      return "linear-gradient(135deg, color-mix(in srgb, var(--studio-accent) 10%, var(--studio-surface)), color-mix(in srgb, var(--studio-accent) 6%, var(--studio-surface-muted)))";
    }

    return "linear-gradient(135deg, var(--studio-surface-dark), color-mix(in srgb, var(--studio-surface-dark) 80%, var(--studio-accent)))";
  }

  if (tone === "accent") {
    return "linear-gradient(180deg, color-mix(in srgb, var(--studio-accent) 12%, var(--studio-surface)), color-mix(in srgb, var(--studio-accent) 5%, var(--studio-surface-muted)))";
  }

  if (tone === "dark") {
    return "var(--studio-surface-dark)";
  }

  return "linear-gradient(180deg, var(--studio-surface), var(--studio-surface-muted))";
}

function getForegroundColor(tone, kind) {
  if (kind === "hero") {
    return tone === "light" ? "var(--studio-text)" : "var(--studio-text-on-dark)";
  }

  return tone === "dark" ? "var(--studio-text-on-dark)" : "var(--studio-text)";
}

function getMutedColor(tone, kind) {
  if (kind === "hero") {
    return tone === "light"
      ? "color-mix(in srgb, var(--studio-text) 72%, var(--studio-text-muted))"
      : "color-mix(in srgb, var(--studio-text-on-dark) 76%, transparent)";
  }

  return tone === "dark"
    ? "color-mix(in srgb, var(--studio-text-on-dark) 72%, transparent)"
    : "var(--studio-text-muted)";
}

function getEyebrowColor(tone, kind) {
  if (kind === "hero") {
    return tone === "light" ? "var(--studio-accent)" : "color-mix(in srgb, var(--studio-accent-contrast) 82%, var(--studio-accent))";
  }

  return tone === "dark" ? "color-mix(in srgb, var(--studio-accent-contrast) 80%, var(--studio-accent))" : "var(--studio-accent)";
}

function getCardBackground(tone) {
  if (tone === "dark") {
    return "rgba(255, 255, 255, 0.05)";
  }

  if (tone === "accent") {
    return "color-mix(in srgb, var(--studio-accent) 4%, var(--studio-surface))";
  }

  return "var(--studio-surface)";
}

function getCardBorder(tone) {
  if (tone === "dark") {
    return "rgba(255, 255, 255, 0.1)";
  }

  return "var(--studio-border)";
}

function getSectionPadding(density, kind) {
  if (kind === "hero") {
    return density === "compact" ? "clamp(3rem, 6vw, 4.5rem) 1.25rem" : "clamp(4rem, 8vw, 6rem) 1.5rem";
  }

  return density === "compact" ? "1.5rem" : "clamp(2rem, 5vw, 4rem)";
}

function buildHeroComponentCode(componentName, config, variant) {
  const root = toRootClass(componentName);
  const logoLabels = ["Northstar", "Aperture", "Meridian", "Atlas"];

  const actionBlock =
    variant === "email-signup"
      ? snippet`
      <form className="${root}__form">
        <input type="email" placeholder="name@company.com" />
        <button type="submit">${jsxText(config.primaryCta)}</button>
      </form>
`
      : snippet`
      <div className="${root}__actions">
        <button className="${root}__button ${root}__button--primary">${jsxText(config.primaryCta)}</button>
        <button className="${root}__button ${root}__button--secondary">${jsxText(config.secondaryCta)}</button>
      </div>
`;

  const trustBlock =
    variant === "scrolling-brand-logos"
      ? snippet`
      <div className="${root}__logos" aria-label="Trusted by leading teams">
        {${JSON.stringify(logoLabels)}.map((logo) => <span key={logo}>{logo}</span>)}
      </div>
`
      : "";

  return snippet`
function ${componentName}() {
  return (
    <section className="${root}">
      <div className="${root}__inner">
        <div className="${root}__copy">
          <p className="${root}__eyebrow">${jsxText(config.eyebrow)}</p>
          <h1>${jsxText(config.heading)}</h1>
          <p>${jsxText(config.body)}</p>
${actionBlock}
${trustBlock}
        </div>
        <div className="${root}__media" aria-hidden="true">
          <div className="${root}__mockup" />
        </div>
      </div>
    </section>
  );
}
`;
}

function buildGenericSectionComponentCode(item, componentName, config) {
  const root = toRootClass(componentName);
  const labels = createCardLabels(item.kind, config.itemCount);
  const itemsLiteral = JSON.stringify(labels);

  if (item.kind === "navigation") {
    return snippet`
function ${componentName}() {
  return (
    <section className="${root}">
      <nav className="${root}__nav">
        <strong>Spendlytics UI</strong>
        <div className="${root}__links">
          <a href="#features">Features</a>
          <a href="#pricing">Pricing</a>
          <a href="#contact">Contact</a>
        </div>
        <button type="button" className="${root}__button">${jsxText(config.primaryCta)}</button>
      </nav>
    </section>
  );
}
`;
  }

  if (item.kind === "pricing") {
    const plans = JSON.stringify(["Starter", "Growth", "Scale"]);

    return snippet`
function ${componentName}() {
  const plans = ${plans};

  return (
    <section className="${root}">
      <div className="${root}__header">
        <p className="${root}__eyebrow">${jsxText(config.eyebrow)}</p>
        <h2>${jsxText(config.heading)}</h2>
        <p>${jsxText(config.body)}</p>
      </div>
      <div className="${root}__grid">
        {plans.map((plan, index) => (
          <article
            key={plan}
            className={index === 1 ? "${root}__card ${root}__card--featured" : "${root}__card"}
          >
            <strong>{plan}</strong>
            <span>{index === 0 ? "$19" : index === 1 ? "$49" : "$99"}</span>
            <button type="button">${jsxText(config.primaryCta)}</button>
          </article>
        ))}
      </div>
    </section>
  );
}
`;
  }

  if (item.kind === "visual") {
    return snippet`
function ${componentName}() {
  return (
    <section className="${root}">
      <div className="${root}__panel">
        <p className="${root}__eyebrow">${jsxText(config.eyebrow)}</p>
        <h2>${jsxText(config.heading)}</h2>
        <p>${jsxText(config.body)}</p>
      </div>
    </section>
  );
}
`;
  }

  return snippet`
function ${componentName}() {
  const items = ${itemsLiteral};

  return (
    <section className="${root}">
      <div className="${root}__header">
        <p className="${root}__eyebrow">${jsxText(config.eyebrow)}</p>
        <h2>${jsxText(config.heading)}</h2>
        <p>${jsxText(config.body)}</p>
      </div>
      <div className="${root}__grid">
        {items.map((itemLabel, index) => (
          <article key={\`\${itemLabel}-\${index}\`} className="${root}__card">
            <span>{index + 1}</span>
            <h3>{itemLabel}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
`;
}

function buildHeroCss(componentName, config) {
  const root = toRootClass(componentName);
  const textColor = getForegroundColor(config.tone, "hero");
  const mutedColor = getMutedColor(config.tone, "hero");
  const eyebrowColor = getEyebrowColor(config.tone, "hero");
  const buttonTextColor = config.tone === "light" ? "var(--studio-surface)" : "var(--studio-surface-dark)";

  return snippet`
.${root} {
  padding: ${getSectionPadding(config.density, "hero")};
  border-radius: var(--studio-radius-xl);
  background: ${getSurfaceBackground(config.tone, "hero")};
  color: ${textColor};
  box-shadow: var(--studio-shadow-lg);
}

.${root}__inner {
  width: min(1120px, 100%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(2rem, 5vw, 4rem);
  align-items: center;
}

.${root}__copy {
  display: grid;
  gap: 1rem;
}

.${root}__eyebrow,
.${root}__copy h1,
.${root}__copy p {
  margin: 0;
}

.${root}__eyebrow {
  color: ${eyebrowColor};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
}

.${root}__copy h1 {
  font-size: clamp(2.4rem, 5vw, 4.6rem);
  line-height: 0.96;
  letter-spacing: -0.04em;
}

.${root}__copy p {
  color: ${mutedColor};
}

.${root}__actions,
.${root}__logos,
.${root}__form {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.${root}__button,
.${root}__form button,
.${root}__form input,
.${root}__logos span {
  border-radius: 999px;
  padding: 0.9rem 1.1rem;
  font: inherit;
}

.${root}__button,
.${root}__form button {
  border: 0;
  cursor: pointer;
}

.${root}__button--primary,
.${root}__form button {
  background: var(--studio-accent);
  color: ${buttonTextColor};
}

.${root}__button--secondary {
  background: transparent;
  color: ${textColor};
  border: 1px solid ${getCardBorder(config.tone)};
}

.${root}__logos span {
  background: ${getCardBackground(config.tone)};
  border: 1px solid ${getCardBorder(config.tone)};
}

.${root}__mockup {
  min-height: 22rem;
  border-radius: var(--studio-radius-lg);
  border: 1px solid ${getCardBorder(config.tone)};
  background:
    radial-gradient(circle at 25% 25%, color-mix(in srgb, var(--studio-accent) 32%, transparent), transparent 25%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(15, 23, 42, 0.72));
}

@media (max-width: 900px) {
  .${root}__inner {
    grid-template-columns: 1fr;
  }
}
`;
}

function buildGenericSectionCss(item, componentName, config) {
  const root = toRootClass(componentName);
  const foreground = getForegroundColor(config.tone, item.kind);
  const muted = getMutedColor(config.tone, item.kind);
  const eyebrow = getEyebrowColor(config.tone, item.kind);
  const base = snippet`
.${root} {
  display: grid;
  gap: 1.25rem;
  padding: ${getSectionPadding(config.density, item.kind)};
  border-radius: var(--studio-radius-lg);
  background: ${getSurfaceBackground(config.tone, item.kind)};
  color: ${foreground};
  box-shadow: var(--studio-shadow-md);
}

.${root}__header,
.${root}__grid {
  display: grid;
  gap: 1rem;
}

.${root}__eyebrow,
.${root}__header h2,
.${root}__header p,
.${root}__card h3,
.${root}__card strong,
.${root}__card span,
.${root}__panel h2,
.${root}__panel p {
  margin: 0;
}

.${root}__eyebrow {
  color: ${eyebrow};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: 0.78rem;
}

.${root}__header p,
.${root}__card span {
  color: ${muted};
}
`;

  if (item.kind === "navigation") {
    return `${base}\n\n${snippet`
.${root}__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  flex-wrap: wrap;
}

.${root}__links {
  display: flex;
  gap: 0.85rem;
  flex-wrap: wrap;
}

.${root}__links a {
  color: ${muted};
  text-decoration: none;
}

.${root}__button {
  border: 0;
  border-radius: 999px;
  padding: 0.85rem 1rem;
  background: var(--studio-accent);
  color: var(--studio-accent-contrast);
  cursor: pointer;
}
`}`;
  }

  if (item.kind === "pricing") {
    return `${base}\n\n${snippet`
.${root}__grid {
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}

.${root}__card {
  display: grid;
  gap: 0.75rem;
  padding: 1.25rem;
  border-radius: var(--studio-radius-md);
  background: ${getCardBackground(config.tone)};
  border: 1px solid ${getCardBorder(config.tone)};
}

.${root}__card--featured {
  transform: translateY(-8px);
}

.${root}__card button {
  border: 0;
  border-radius: 999px;
  padding: 0.85rem 1rem;
  background: var(--studio-accent);
  color: var(--studio-accent-contrast);
  cursor: pointer;
}
`}`;
  }

  if (item.kind === "visual") {
    return `${base}\n\n${snippet`
.${root}__panel {
  max-width: 32rem;
  padding: 1.3rem;
  border-radius: var(--studio-radius-md);
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid ${getCardBorder(config.tone)};
  backdrop-filter: blur(14px);
}
`}`;
  }

  return `${base}\n\n${snippet`
.${root}__grid {
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}

.${root}__card {
  display: grid;
  gap: 0.75rem;
  padding: 1.2rem;
  border-radius: var(--studio-radius-md);
  background: ${getCardBackground(config.tone)};
  border: 1px solid ${getCardBorder(config.tone)};
}

.${root}__card span {
  display: inline-grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--studio-accent) 16%, ${config.tone === "dark" ? "transparent" : "white"});
  color: ${config.tone === "dark" ? "var(--studio-text-on-dark)" : "var(--studio-accent)"};
}
`}`;
}

export function buildSectionBundle(item, overrides = {}, options = {}) {
  const config = normalizeSectionConfig(item, overrides);
  const componentName = options.componentName || toComponentName(item.id);
  const sectionComponentCode =
    item.kind === "hero"
      ? buildHeroComponentCode(componentName, config, item.variant)
      : buildGenericSectionComponentCode(item, componentName, config);
  const cssCode =
    item.kind === "hero"
      ? buildHeroCss(componentName, config)
      : buildGenericSectionCss(item, componentName, config);
  const jsxCode = options.includeImport === false
    ? sectionComponentCode
    : `import "./${componentName}.css";\n\n${sectionComponentCode}`;

  return {
    componentName,
    config,
    jsxCode,
    cssCode,
    sectionComponentCode,
  };
}

export function buildWebsiteGuide(item, overrides = {}) {
  const { componentName, jsxCode, cssCode } = buildSectionBundle(item, overrides);

  return {
    whenToUse: item.guideMeta.whenToUse,
    recommendedFor: item.guideMeta.recommendedFor,
    layoutRecommendation: item.guideMeta.layoutRecommendation,
    notes: item.note,
    snippets: [
      {
        key: "jsx",
        title: `${componentName}.jsx`,
        code: jsxCode,
        buttonLabel: `Copy JSX for ${componentName}`,
      },
      {
        key: "css",
        title: `${componentName}.css`,
        code: cssCode,
        buttonLabel: `Copy CSS for ${componentName}`,
      },
    ],
  };
}

export function buildThemeCss(theme) {
  return snippet`
:root {
  --studio-font-family: ${theme.fontFamily};
  --studio-page-background: ${theme.pageBackground};
  --studio-surface: ${theme.surface};
  --studio-surface-muted: ${theme.surfaceMuted};
  --studio-surface-dark: ${theme.surfaceDark};
  --studio-text: ${theme.text};
  --studio-text-muted: ${theme.textMuted};
  --studio-text-on-dark: ${theme.textOnDark};
  --studio-accent: ${theme.accent};
  --studio-accent-contrast: ${theme.accentContrast};
  --studio-border: ${theme.border};
  --studio-radius-md: ${theme.radiusMd};
  --studio-radius-lg: ${theme.radiusLg};
  --studio-radius-xl: ${theme.radiusXl};
  --studio-page-gap: ${theme.pageGap};
  --studio-page-padding: ${theme.pagePadding};
  --studio-shadow-md: ${theme.shadowMd};
  --studio-shadow-lg: ${theme.shadowLg};
}
`;
}

export function buildPageBundle(sectionEntries, sectionRegistry, theme) {
  const bundles = sectionEntries.map((entry, index) => {
    const item = sectionRegistry[entry.sectionId];
    const componentName = `${toComponentName(entry.sectionId)}Section${index + 1}`;
    return buildSectionBundle(item, entry.config, { componentName, includeImport: false });
  });

  const pageComponentSource = bundles.map((bundle) => bundle.sectionComponentCode).join("\n\n");
  const pageUsage = bundles.map((bundle) => `      <${bundle.componentName} />`).join("\n");
  const pageJsxCode = snippet`
import "./theme.css";
import "./LandingPage.css";

${pageComponentSource}

export default function LandingPage() {
  return (
    <main className="studio-page">
${pageUsage}
    </main>
  );
}
`;
  const pageCssCode = snippet`
.studio-page {
  min-height: 100vh;
  margin: 0;
  padding: var(--studio-page-padding);
  display: grid;
  gap: var(--studio-page-gap);
  background: var(--studio-page-background);
  font-family: var(--studio-font-family);
  color: var(--studio-text);
}

body {
  margin: 0;
  background: var(--studio-page-background);
  font-family: var(--studio-font-family);
  color: var(--studio-text);
}

* {
  box-sizing: border-box;
}

.studio-page button,
.studio-page input {
  font: inherit;
}

${bundles.map((bundle) => bundle.cssCode).join("\n\n")}
`;

  return {
    pageJsxCode,
    pageCssCode,
    themeCssCode: buildThemeCss(theme),
  };
}
