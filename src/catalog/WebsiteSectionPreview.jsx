import { useMemo, useState } from "react";
import "./websitePreview.css";

const PREVIEW_LABELS = {
  scrolling: ["Launch faster", "Guide attention", "Create depth", "Stay readable", "Keep motion calm", "Build momentum"],
  feature: ["Clear hierarchy", "Reusable structure", "Responsive defaults", "Trust-building detail", "Layout flexibility", "Fast iteration"],
  social: ["Credible result", "Clear proof", "Specific outcome", "Trusted by teams", "Faster launch", "Better conversion"],
  content: ["Editorial structure", "Readable rhythm", "Compelling summary", "Deeper context", "Useful follow-up", "Practical advice"],
  utility: ["Process clarity", "Low friction", "Concrete steps", "Visible help", "Actionable next step", "Implementation-ready"],
  dashboard: ["Revenue overview", "Recent activity", "Team performance", "Pipeline health", "Account growth", "Operational rhythm"],
};

function buildPreviewItems(kind, count) {
  const source = PREVIEW_LABELS[kind] || PREVIEW_LABELS.feature;
  return Array.from({ length: count }, (_, index) => source[index % source.length]);
}

function getResolvedConfig(item, overrides) {
  return {
    ...item.defaultConfig,
    ...(overrides || {}),
  };
}

function SurfaceFrame({ kind, variant, item, config, mode = "catalog", themeStyle, children }) {
  const surfaceClassName = [
    "website-preview__surface",
    `website-preview__surface--${kind}`,
    `website-preview__surface--tone-${config.tone}`,
    `website-preview__surface--density-${config.density}`,
    `website-preview__surface--${variant}`,
    mode === "canvas" ? "website-preview__surface--canvas" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <div className={surfaceClassName} style={themeStyle}>
      {children}
    </div>
  );

  if (mode === "canvas") {
    return content;
  }

  return (
    <div className={`website-preview website-preview--${kind}`}>
      <div className="website-preview__meta">
        <span className="website-preview__kicker">{kind}</span>
        <div>
          <h4>{item.label}</h4>
          <p>{item.description}</p>
        </div>
      </div>
      <div className="website-preview__canvas">{content}</div>
    </div>
  );
}

function HeroPreview({ item, config, mode, themeStyle }) {
  const variant = item.preview.variant;

  return (
    <SurfaceFrame kind="hero" variant={variant} item={item} config={config} mode={mode} themeStyle={themeStyle}>
      <div className="website-preview__hero">
        <div className="website-preview__hero-copy">
          <span className="website-preview__eyebrow">{config.eyebrow}</span>
          <h3>{config.heading}</h3>
          <p>{config.body}</p>
          {variant === "email-signup" ? (
            <div className="website-preview__signup">
              <input type="email" placeholder="name@company.com" />
              <button type="button">{config.primaryCta}</button>
            </div>
          ) : (
            <div className="website-preview__actions">
              <button type="button" className="website-preview__button website-preview__button--primary">
                {config.primaryCta}
              </button>
              <button type="button" className="website-preview__button">
                {config.secondaryCta}
              </button>
            </div>
          )}
          {variant === "scrolling-brand-logos" ? (
            <div className="website-preview__logo-row">
              {["Northstar", "Aperture", "Atlas", "Meridian"].map((logo) => (
                <span key={logo}>{logo}</span>
              ))}
            </div>
          ) : null}
        </div>
        <div className="website-preview__hero-media" aria-hidden="true">
          <div className="website-preview__mockup" />
        </div>
      </div>
    </SurfaceFrame>
  );
}

function ScrollingPreview({ item, config, mode, themeStyle }) {
  const cards = buildPreviewItems("scrolling", config.itemCount);

  return (
    <SurfaceFrame kind="scrolling" variant={item.preview.variant} item={item} config={config} mode={mode} themeStyle={themeStyle}>
      <div className="website-preview__section-header">
        <span className="website-preview__eyebrow">{config.eyebrow}</span>
        <h3>{config.heading}</h3>
        <p>{config.body}</p>
      </div>
      <div className="website-preview__rail">
        {cards.map((card, index) => (
          <article key={`${card}-${index}`} className="website-preview__mini-card">
            <span>{index + 1}</span>
            <strong>{card}</strong>
          </article>
        ))}
      </div>
    </SurfaceFrame>
  );
}

function FeaturePreview({ item, config, mode, themeStyle }) {
  const [activeTab, setActiveTab] = useState("analytics");
  const cards = buildPreviewItems("feature", config.itemCount);
  const isTabs = item.preview.variant === "tabs";
  const tabs = [
    { id: "analytics", label: "Analytics" },
    { id: "automation", label: "Automation" },
    { id: "governance", label: "Governance" },
  ];

  return (
    <SurfaceFrame kind="feature" variant={item.preview.variant} item={item} config={config} mode={mode} themeStyle={themeStyle}>
      <div className="website-preview__section-header">
        <span className="website-preview__eyebrow">{config.eyebrow}</span>
        <h3>{config.heading}</h3>
        <p>{config.body}</p>
      </div>
      {isTabs ? (
        <div className="website-preview__tabs">
          <div className="website-preview__tab-list">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                className={activeTab === tab.id ? "website-preview__tab website-preview__tab--active" : "website-preview__tab"}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="website-preview__tab-panel">Focused content panel for {activeTab}.</div>
        </div>
      ) : (
        <div className="website-preview__feature-grid">
          {cards.map((feature, index) => (
            <article key={`${feature}-${index}`} className="website-preview__mini-card">
              <span>{index + 1}</span>
              <strong>{feature}</strong>
              <p>Clean starter pattern</p>
            </article>
          ))}
        </div>
      )}
    </SurfaceFrame>
  );
}

function SocialPreview({ item, config, mode, themeStyle }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const testimonials = useMemo(
    () => buildPreviewItems("social", Math.max(2, config.itemCount)),
    [config.itemCount],
  );

  return (
    <SurfaceFrame kind="social" variant={item.preview.variant} item={item} config={config} mode={mode} themeStyle={themeStyle}>
      <div className="website-preview__section-header">
        <span className="website-preview__eyebrow">{config.eyebrow}</span>
        <h3>{config.heading}</h3>
        <p>{config.body}</p>
      </div>
      <div className="website-preview__social">
        <article className="website-preview__quote-card">
          <p>"{testimonials[activeIndex]} made the page feel more credible immediately."</p>
          <strong>Avery Ross</strong>
          <span>Founder</span>
        </article>
        <div className="website-preview__quote-controls">
          {testimonials.map((quote, index) => (
            <button
              key={quote}
              type="button"
              className={index === activeIndex ? "website-preview__dot website-preview__dot--active" : "website-preview__dot"}
              onClick={() => setActiveIndex(index)}
              aria-label={`Show testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </SurfaceFrame>
  );
}

function PricingPreview({ item, config, mode, themeStyle }) {
  const [billing, setBilling] = useState("monthly");

  return (
    <SurfaceFrame kind="pricing" variant={item.preview.variant} item={item} config={config} mode={mode} themeStyle={themeStyle}>
      <div className="website-preview__section-header">
        <span className="website-preview__eyebrow">{config.eyebrow}</span>
        <h3>{config.heading}</h3>
        <p>{config.body}</p>
      </div>
      {item.preview.variant === "toggle" ? (
        <div className="website-preview__toggle-wrap">
          <div className="website-preview__toggle">
            {["monthly", "yearly"].map((value) => (
              <button
                key={value}
                type="button"
                className={billing === value ? "website-preview__toggle-button website-preview__toggle-button--active" : "website-preview__toggle-button"}
                onClick={() => setBilling(value)}
              >
                {value}
              </button>
            ))}
          </div>
          <div className="website-preview__pricing-chip">{billing === "monthly" ? "$29 / month" : "$290 / year"}</div>
        </div>
      ) : (
        <div className="website-preview__pricing-grid">
          {["Starter", "Growth", "Scale"].map((plan, index) => (
            <article key={plan} className={index === 1 ? "website-preview__price-card website-preview__price-card--featured" : "website-preview__price-card"}>
              <strong>{plan}</strong>
              <span>{index === 0 ? "$19" : index === 1 ? "$49" : "$99"}</span>
              <button type="button" className="website-preview__price-action">
                {config.primaryCta}
              </button>
            </article>
          ))}
        </div>
      )}
    </SurfaceFrame>
  );
}

function NavigationPreview({ item, config, mode, themeStyle }) {
  const [drawerOpen, setDrawerOpen] = useState(item.preview.variant === "mobile-slide-menu");

  return (
    <SurfaceFrame kind="navigation" variant={item.preview.variant} item={item} config={config} mode={mode} themeStyle={themeStyle}>
      <div className="website-preview__nav">
        <strong>Spendlytics UI</strong>
        <div className="website-preview__nav-links">
          <span>Features</span>
          <span>Pricing</span>
          <span>Contact</span>
        </div>
        <button
          type="button"
          className="website-preview__button website-preview__button--primary"
          onClick={() => setDrawerOpen((current) => !current)}
        >
          {config.primaryCta}
        </button>
      </div>
      {item.preview.variant === "mobile-slide-menu" && drawerOpen ? <div className="website-preview__drawer">Slide-in menu preview</div> : null}
    </SurfaceFrame>
  );
}

function ContentPreview({ item, config, mode, themeStyle }) {
  const cards = buildPreviewItems("content", config.itemCount);

  return (
    <SurfaceFrame kind="content" variant={item.preview.variant} item={item} config={config} mode={mode} themeStyle={themeStyle}>
      <div className="website-preview__section-header">
        <span className="website-preview__eyebrow">{config.eyebrow}</span>
        <h3>{config.heading}</h3>
        <p>{config.body}</p>
      </div>
      <div className={item.preview.variant === "featured-article" ? "website-preview__articles website-preview__articles--featured" : "website-preview__articles"}>
        {cards.map((card, index) => (
          <article key={`${card}-${index}`} className="website-preview__article">
            <div className="website-preview__thumb" />
            <strong>{card}</strong>
          </article>
        ))}
      </div>
    </SurfaceFrame>
  );
}

function UtilityPreview({ item, config, mode, themeStyle }) {
  const [openIndex, setOpenIndex] = useState(0);
  const items = buildPreviewItems("utility", config.itemCount);

  return (
    <SurfaceFrame kind="utility" variant={item.preview.variant} item={item} config={config} mode={mode} themeStyle={themeStyle}>
      <div className="website-preview__section-header">
        <span className="website-preview__eyebrow">{config.eyebrow}</span>
        <h3>{config.heading}</h3>
        <p>{config.body}</p>
      </div>
      {item.preview.variant === "faq" ? (
        <div className="website-preview__faq">
          {items.map((question, index) => (
            <article key={`${question}-${index}`} className="website-preview__faq-item">
              <button type="button" onClick={() => setOpenIndex(index)}>
                {question}?
              </button>
              {openIndex === index ? <p>Yes. The markup is intentionally simple and easy to adapt.</p> : null}
            </article>
          ))}
        </div>
      ) : (
        <div className="website-preview__feature-grid">
          {items.map((step, index) => (
            <article key={`${step}-${index}`} className="website-preview__mini-card">
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </article>
          ))}
        </div>
      )}
    </SurfaceFrame>
  );
}

function DashboardPreview({ item, config, mode, themeStyle }) {
  const cards = buildPreviewItems("dashboard", config.itemCount);

  return (
    <SurfaceFrame kind="dashboard" variant={item.preview.variant} item={item} config={config} mode={mode} themeStyle={themeStyle}>
      <div className={item.preview.variant === "dashboard-layout" ? "website-preview__dashboard website-preview__dashboard--layout" : "website-preview__dashboard"}>
        {cards.map((card, index) => (
          <article key={`${card}-${index}`} className="website-preview__dash-card">
            <strong>{card}</strong>
            <p>Operational UI block</p>
          </article>
        ))}
      </div>
    </SurfaceFrame>
  );
}

function VisualPreview({ item, config, mode, themeStyle }) {
  return (
    <SurfaceFrame kind="visual" variant={item.preview.variant} item={item} config={config} mode={mode} themeStyle={themeStyle}>
      <div className="website-preview__visual-stage">
        <div className="website-preview__glass-panel">
          <span className="website-preview__eyebrow">{config.eyebrow}</span>
          <strong>{config.heading}</strong>
          <p>{config.body}</p>
        </div>
      </div>
    </SurfaceFrame>
  );
}

export default function WebsiteSectionPreview({ item, config: configOverrides, themeStyle, mode = "catalog" }) {
  const config = getResolvedConfig(item, configOverrides);

  switch (item.preview.kind) {
    case "hero":
      return <HeroPreview item={item} config={config} mode={mode} themeStyle={themeStyle} />;
    case "scrolling":
      return <ScrollingPreview item={item} config={config} mode={mode} themeStyle={themeStyle} />;
    case "feature":
      return <FeaturePreview item={item} config={config} mode={mode} themeStyle={themeStyle} />;
    case "social":
      return <SocialPreview item={item} config={config} mode={mode} themeStyle={themeStyle} />;
    case "pricing":
      return <PricingPreview item={item} config={config} mode={mode} themeStyle={themeStyle} />;
    case "navigation":
      return <NavigationPreview item={item} config={config} mode={mode} themeStyle={themeStyle} />;
    case "content":
      return <ContentPreview item={item} config={config} mode={mode} themeStyle={themeStyle} />;
    case "utility":
      return <UtilityPreview item={item} config={config} mode={mode} themeStyle={themeStyle} />;
    case "dashboard":
      return <DashboardPreview item={item} config={config} mode={mode} themeStyle={themeStyle} />;
    case "visual":
      return <VisualPreview item={item} config={config} mode={mode} themeStyle={themeStyle} />;
    default:
      return null;
  }
}
