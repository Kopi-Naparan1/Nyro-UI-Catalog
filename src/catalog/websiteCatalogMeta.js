import {
  buildWebsiteGuide,
  createDefaultSectionConfig,
  getControlSchemaForItem,
} from "./websiteSectionCodegen";

const GUIDE_META_BY_KIND = {
  hero: {
    whenToUse: "Use when the first screen must explain the value quickly and direct the next click.",
    recommendedFor: "Product launches, SaaS homepages, landing pages, and service pages.",
    layoutRecommendation: "Lead with a tight content block, one dominant CTA, and one supporting visual.",
  },
  scrolling: {
    whenToUse: "Use when motion helps browsing, emphasis, or narrative flow.",
    recommendedFor: "Marketing sections, storytelling sequences, and animated brand moments.",
    layoutRecommendation: "Keep motion slow, purposeful, and easy to ignore when the user wants to read.",
  },
  feature: {
    whenToUse: "Use when you need repeatable product explanation blocks.",
    recommendedFor: "Feature pages, comparison sections, and product tours.",
    layoutRecommendation: "Let spacing and hierarchy carry the layout before adding heavier effects.",
  },
  social: {
    whenToUse: "Use when a decision point needs more trust and customer proof.",
    recommendedFor: "Pricing pages, launches, sales pages, and product homepages.",
    layoutRecommendation: "Keep attribution clear and avoid turning proof sections into visual noise.",
  },
  pricing: {
    whenToUse: "Use when users are comparing plans, tiers, or billing options.",
    recommendedFor: "Pricing pages, billing hubs, and upgrade flows.",
    layoutRecommendation: "Support the most likely choice visually, but preserve fair comparison across all plans.",
  },
  navigation: {
    whenToUse: "Use when the page or product needs orientation, persistent actions, or route structure.",
    recommendedFor: "Marketing sites, application shells, and mobile navigation flows.",
    layoutRecommendation: "Keep labels short, keep the primary action obvious, and simplify aggressively on mobile.",
  },
  content: {
    whenToUse: "Use when editorial content or list-building needs a clear visual frame.",
    recommendedFor: "Blogs, resource hubs, newsletters, and editorial pages.",
    layoutRecommendation: "Use one dominant story or form per section and let supporting content stay subordinate.",
  },
  utility: {
    whenToUse: "Use when users need support content, a process explanation, or a direct contact path.",
    recommendedFor: "Support pages, about pages, onboarding flows, and service sites.",
    layoutRecommendation: "Utility sections should reduce friction quickly and never compete with the core pitch.",
  },
  dashboard: {
    whenToUse: "Use when the design shifts from marketing surfaces into operational product UI.",
    recommendedFor: "Dashboards, admin tools, analytics products, and finance interfaces.",
    layoutRecommendation: "Prioritize grouping, density control, and readable contrast before decorative styling.",
  },
  visual: {
    whenToUse: "Use when the section needs stronger atmosphere or a standout interaction cue.",
    recommendedFor: "Campaign pages, premium landing pages, and high-impact CTA zones.",
    layoutRecommendation: "Let the effect frame the message. If the effect becomes the only thing you notice, it is too strong.",
  },
};

function createWebsiteItem(config) {
  const item = {
    ...config,
    preview: { kind: config.kind, variant: config.variant },
    guideMeta: GUIDE_META_BY_KIND[config.kind],
  };

  item.defaultConfig = createDefaultSectionConfig(item);
  item.controls = getControlSchemaForItem(item);
  item.guide = buildWebsiteGuide(item, item.defaultConfig);

  return item;
}

function createGroup(id, title, description, items) {
  return { id, title, description, items };
}

export const WEBSITE_SECTION_GROUPS = [
  createGroup("website-hero", "Hero", "First-screen sections for landing pages and launches.", [
    createWebsiteItem({
      id: "hero-headline-image",
      kind: "hero",
      variant: "headline-image",
      label: "Hero with headline, description, CTA buttons, and image",
      description: "Balanced two-column hero with supporting visual.",
      note: "Use as the default starting point when you need a reliable, conversion-friendly hero.",
      keywords: ["hero", "headline", "image", "cta"],
      recommendedNext: ["feature-cards-with-hover-animation", "testimonial-card-grid", "three-tier-pricing-cards"],
    }),
    createWebsiteItem({
      id: "hero-gradient-animated",
      kind: "hero",
      variant: "gradient-animated",
      label: "Hero with background gradient animation",
      description: "Atmospheric hero with CSS-only motion.",
      note: "Keep the gradient slow so the hero stays professional instead of noisy.",
      keywords: ["hero", "gradient", "animation"],
      recommendedNext: ["horizontal-scrolling-cards", "feature-tabs-component", "animated-gradient-background-section"],
    }),
    createWebsiteItem({
      id: "hero-video-background",
      kind: "hero",
      variant: "video-background",
      label: "Hero with video background",
      description: "Product loop behind an overlay and content column.",
      note: "Use a short silent loop and always protect text contrast with an overlay.",
      keywords: ["hero", "video", "background"],
      recommendedNext: ["video-testimonial-section", "feature-comparison-grid", "contact-form-section"],
    }),
    createWebsiteItem({
      id: "hero-product-screenshot",
      kind: "hero",
      variant: "product-screenshot",
      label: "Hero with product screenshot",
      description: "Product-led hero that makes the UI itself the proof.",
      note: "Best when the interface is visually strong enough to sell the product.",
      keywords: ["hero", "product", "screenshot"],
      recommendedNext: ["stats-cards-section", "feature-tabs-component", "dashboard-layout-with-sidebar"],
    }),
    createWebsiteItem({
      id: "hero-scrolling-brand-logos",
      kind: "hero",
      variant: "scrolling-brand-logos",
      label: "Hero with scrolling brand logos",
      description: "Headline plus a moving trust strip.",
      note: "Only use if the logos genuinely increase credibility for this audience.",
      keywords: ["hero", "logos", "trust"],
      recommendedNext: ["testimonial-card-grid", "three-column-feature-grid", "faq-accordion"],
    }),
    createWebsiteItem({
      id: "hero-email-signup",
      kind: "hero",
      variant: "email-signup",
      label: "Hero with email signup form",
      description: "Lead capture built directly into the hero.",
      note: "One field is usually enough for top-of-funnel signup sections.",
      keywords: ["hero", "signup", "email"],
      recommendedNext: ["partner-logos-grid", "feature-cards-with-hover-animation", "newsletter-signup-section"],
    }),
    createWebsiteItem({
      id: "hero-split-layout",
      kind: "hero",
      variant: "split-layout",
      label: "Split hero (text left, image right)",
      description: "Editorial hero with room for richer storytelling.",
      note: "Good for services, product tours, and pages that need more context.",
      keywords: ["hero", "split", "editorial"],
      recommendedNext: ["alternating-feature-layout", "step-by-step-process-section", "contact-form-section"],
    }),
  ]),
  createGroup("website-scrolling", "Scrolling", "Motion-focused sections for reveals, rails, and narrative emphasis.", [
    createWebsiteItem({ id: "horizontal-scrolling-cards", kind: "scrolling", variant: "horizontal-cards", label: "Horizontal scrolling card section", description: "Scrollable rail for curated content cards.", note: "Use when cards are browsable and do not need a strict reading order.", keywords: ["scroll", "cards", "horizontal"], recommendedNext: ["feature-cards-with-hover-animation", "testimonial-card-grid"] }),
    createWebsiteItem({ id: "infinite-logo-carousel", kind: "scrolling", variant: "infinite-logo-carousel", label: "Infinite logo carousel", description: "Continuous logo strip for credibility.", note: "Keep the speed low and the spacing generous.", keywords: ["logo", "carousel", "trust"], recommendedNext: ["testimonial-card-grid", "three-tier-pricing-cards"] }),
    createWebsiteItem({ id: "scroll-reveal-section", kind: "scrolling", variant: "scroll-reveal", label: "Scroll reveal animation section", description: "Cards or blocks that reveal into view.", note: "Good for feature rows or product storytelling steps.", keywords: ["scroll", "reveal", "animation"], recommendedNext: ["three-column-feature-grid", "feature-tabs-component"] }),
    createWebsiteItem({ id: "parallax-scrolling-section", kind: "scrolling", variant: "parallax", label: "Parallax scrolling section", description: "Depth effect with layered backgrounds.", note: "Use sparingly. One memorable parallax section is enough on most pages.", keywords: ["parallax", "depth"], recommendedNext: ["testimonial-slider", "animated-gradient-background-section"] }),
    createWebsiteItem({ id: "sticky-scrolling-storytelling-section", kind: "scrolling", variant: "sticky-storytelling", label: "Sticky scrolling storytelling section", description: "Pinned intro with scrolling steps.", note: "Fits onboarding stories and transformation-led product narratives.", keywords: ["sticky", "storytelling", "steps"], recommendedNext: ["step-by-step-process-section", "feature-tabs-component"] }),
    createWebsiteItem({ id: "animated-number-counter-section", kind: "scrolling", variant: "animated-counter", label: "Animated number counter section", description: "Animated metrics row for impact stats.", note: "Reserve this for metrics that are actually meaningful to the buyer.", keywords: ["counter", "stats", "metrics"], recommendedNext: ["stats-cards-section", "testimonial-card-grid"] }),
    createWebsiteItem({ id: "marquee-text-scrolling-banner", kind: "scrolling", variant: "marquee-text", label: "Marquee text scrolling banner", description: "High-energy moving banner for key claims.", note: "Best for campaigns and launches, not for every page.", keywords: ["marquee", "banner"], recommendedNext: ["hero-gradient-animated", "animated-gradient-background-section"] }),
    createWebsiteItem({ id: "stacked-cards-scroll-animation", kind: "scrolling", variant: "stacked-cards", label: "Stacked cards scroll animation", description: "Layered cards with a sense of depth.", note: "Use for process or roadmap content that benefits from stacked visuals.", keywords: ["stacked", "cards"], recommendedNext: ["timeline-section", "step-by-step-process-section"] }),
  ]),
  createGroup("website-features", "Features", "Product explanation sections built for clarity and repetition.", [
    createWebsiteItem({ id: "three-column-feature-grid", kind: "feature", variant: "three-column-grid", label: "3 column feature grid", description: "Three-up feature layout for concise value points.", note: "A strong default for product pages that need quick scanning.", keywords: ["feature", "grid"], recommendedNext: ["testimonial-card-grid", "three-tier-pricing-cards"] }),
    createWebsiteItem({ id: "feature-cards-with-hover-animation", kind: "feature", variant: "hover-cards", label: "Feature cards with hover animation", description: "Card grid with subtle movement on interaction.", note: "Keep the hover lift small and the shadows restrained.", keywords: ["feature", "hover"], recommendedNext: ["testimonial-slider", "faq-accordion"] }),
    createWebsiteItem({ id: "alternating-feature-layout", kind: "feature", variant: "alternating-layout", label: "Alternating feature layout (image/text)", description: "Alternating rows for longer feature storytelling.", note: "Alternate only when the visuals add real meaning.", keywords: ["feature", "alternating"], recommendedNext: ["video-testimonial-section", "contact-form-section"] }),
    createWebsiteItem({ id: "feature-tabs-component", kind: "feature", variant: "tabs", label: "Feature tabs component", description: "Tabbed feature switcher with focused content area.", note: "Limit the number of tabs so the section stays legible.", keywords: ["feature", "tabs"], recommendedNext: ["pricing-table-comparison", "faq-accordion"] }),
    createWebsiteItem({ id: "feature-comparison-grid", kind: "feature", variant: "comparison-grid", label: "Feature comparison grid", description: "Matrix for comparing features or packages.", note: "Use when comparison clarity matters more than marketing atmosphere.", keywords: ["feature", "comparison"], recommendedNext: ["pricing-table-comparison", "contact-form-section"] }),
  ]),
  createGroup("website-social", "Social Proof", "Credibility sections for quotes, customer stories, and proof.", [
    createWebsiteItem({ id: "testimonial-slider", kind: "social", variant: "slider", label: "Testimonial slider", description: "Single-quote carousel with manual controls.", note: "Manual controls matter if the section rotates between quotes.", keywords: ["testimonial", "slider"], recommendedNext: ["three-tier-pricing-cards", "faq-accordion"] }),
    createWebsiteItem({ id: "testimonial-card-grid", kind: "social", variant: "card-grid", label: "Testimonial card grid", description: "Static testimonial grid for faster scanning.", note: "Usually the safest format for proof near pricing.", keywords: ["testimonial", "grid"], recommendedNext: ["three-tier-pricing-cards", "pricing-toggle-monthly-yearly"] }),
    createWebsiteItem({ id: "video-testimonial-section", kind: "social", variant: "video-testimonial", label: "Video testimonial section", description: "Video testimonial paired with visible quote content.", note: "Do not hide the message behind the play button.", keywords: ["testimonial", "video"], recommendedNext: ["contact-form-section", "feature-comparison-grid"] }),
    createWebsiteItem({ id: "avatar-testimonial-carousel", kind: "social", variant: "avatar-carousel", label: "Avatar testimonial carousel", description: "Avatar-driven quote switcher with light motion.", note: "Use short quotes so the carousel remains snappy.", keywords: ["testimonial", "avatar"], recommendedNext: ["three-tier-pricing-cards", "contact-form-section"] }),
  ]),
  createGroup("website-pricing", "Pricing", "Pricing components for comparison, hierarchy, and billing cadence.", [
    createWebsiteItem({ id: "three-tier-pricing-cards", kind: "pricing", variant: "three-tier", label: "3 tier pricing cards", description: "Classic three-plan pricing layout.", note: "Feature one plan visually, but preserve honest comparison.", keywords: ["pricing", "cards"], recommendedNext: ["testimonial-card-grid", "faq-accordion"] }),
    createWebsiteItem({ id: "pricing-table-comparison", kind: "pricing", variant: "comparison-table", label: "Pricing table comparison", description: "Table layout for detailed plan comparison.", note: "Use only when buyers really need the extra detail.", keywords: ["pricing", "table"], recommendedNext: ["faq-accordion", "contact-form-section"] }),
    createWebsiteItem({ id: "pricing-toggle-monthly-yearly", kind: "pricing", variant: "toggle", label: "Pricing toggle (monthly/yearly)", description: "Billing cadence switcher with pricing emphasis.", note: "Place the savings message close to the yearly option.", keywords: ["pricing", "toggle"], recommendedNext: ["three-tier-pricing-cards", "testimonial-card-grid"] }),
  ]),
  createGroup("website-navigation", "Navigation", "Navigation patterns for websites and products.", [
    createWebsiteItem({ id: "sticky-navbar", kind: "navigation", variant: "sticky-navbar", label: "Sticky navbar", description: "Persistent top nav for long pages.", note: "Keep sticky headers compact to avoid crowding the viewport.", keywords: ["navigation", "navbar"], recommendedNext: ["hero-headline-image", "hero-product-screenshot"] }),
    createWebsiteItem({ id: "navbar-with-dropdown-menu", kind: "navigation", variant: "dropdown-menu", label: "Navbar with dropdown menu", description: "Top nav with a grouped links panel.", note: "Dropdowns should simplify the nav, not make it more confusing.", keywords: ["navigation", "dropdown"], recommendedNext: ["hero-split-layout", "feature-tabs-component"] }),
    createWebsiteItem({ id: "mobile-slide-in-menu", kind: "navigation", variant: "mobile-slide-menu", label: "Mobile slide-in menu", description: "Off-canvas mobile drawer menu.", note: "Keep the first-level menu short and obvious.", keywords: ["navigation", "mobile"], recommendedNext: ["hero-email-signup", "contact-form-section"] }),
    createWebsiteItem({ id: "sidebar-navigation", kind: "navigation", variant: "sidebar", label: "Sidebar navigation", description: "Vertical navigation for workspaces and apps.", note: "Best for applications, not simple brochure sites.", keywords: ["navigation", "sidebar"], recommendedNext: ["dashboard-layout-with-sidebar", "stats-cards-section"] }),
  ]),
  createGroup("website-content", "Content", "Editorial and email capture sections for content-driven pages.", [
    createWebsiteItem({ id: "blog-preview-grid", kind: "content", variant: "blog-grid", label: "Blog preview grid", description: "Preview cards for recent or featured posts.", note: "Keep image ratios and card spacing consistent.", keywords: ["content", "blog"], recommendedNext: ["featured-article-with-smaller-articles", "newsletter-signup-section"] }),
    createWebsiteItem({ id: "featured-article-with-smaller-articles", kind: "content", variant: "featured-article", label: "Featured article with smaller articles", description: "One dominant article plus supporting reads.", note: "Good when one story matters more than the rest.", keywords: ["content", "editorial"], recommendedNext: ["newsletter-signup-section", "contact-form-section"] }),
    createWebsiteItem({ id: "newsletter-signup-section", kind: "content", variant: "newsletter-signup", label: "Newsletter signup section", description: "Compact signup section with a focused form.", note: "The value proposition should be clearer than the form label.", keywords: ["content", "newsletter"], recommendedNext: ["testimonial-card-grid", "partner-logos-grid"] }),
  ]),
  createGroup("website-utility", "Utility", "Supportive sections for FAQs, process, teams, and contact.", [
    createWebsiteItem({ id: "faq-accordion", kind: "utility", variant: "faq", label: "FAQ accordion", description: "Expandable support and objection handling section.", note: "Group related questions and keep the answers direct.", keywords: ["utility", "faq"], recommendedNext: ["contact-form-section", "pricing-table-comparison"] }),
    createWebsiteItem({ id: "step-by-step-process-section", kind: "utility", variant: "process", label: "Step-by-step process section", description: "Process section for service or onboarding flows.", note: "Use a short number of steps and one outcome per step.", keywords: ["utility", "process"], recommendedNext: ["timeline-section", "contact-form-section"] }),
    createWebsiteItem({ id: "timeline-section", kind: "utility", variant: "timeline", label: "Timeline section", description: "Timeline layout for launches and milestones.", note: "Use it only when chronology matters.", keywords: ["utility", "timeline"], recommendedNext: ["step-by-step-process-section", "contact-form-section"] }),
    createWebsiteItem({ id: "team-member-grid", kind: "utility", variant: "team-grid", label: "Team member grid", description: "Grid of team cards with roles and avatars.", note: "Keep the cards consistent so the people stay the focus.", keywords: ["utility", "team"], recommendedNext: ["testimonial-card-grid", "contact-form-section"] }),
    createWebsiteItem({ id: "partner-logos-grid", kind: "utility", variant: "partner-logos", label: "Partner logos grid", description: "Static logo grid for partner or client proof.", note: "A static grid is often cleaner than animation in dense pages.", keywords: ["utility", "logos"], recommendedNext: ["testimonial-card-grid", "newsletter-signup-section"] }),
    createWebsiteItem({ id: "contact-form-section", kind: "utility", variant: "contact-form", label: "Contact form section", description: "Contact block for service, support, or sales pages.", note: "Minimize the fields unless you truly need qualification.", keywords: ["utility", "contact"], recommendedNext: [] }),
  ]),
  createGroup("website-dashboard", "Dashboard", "Combined product UI patterns for stats, tables, and application layouts.", [
    createWebsiteItem({ id: "stats-cards-section", kind: "dashboard", variant: "stats-cards", label: "Stats cards section", description: "Metric cards for product dashboards.", note: "Great for KPI rows and overview surfaces.", keywords: ["dashboard", "stats"], recommendedNext: ["activity-feed", "data-table-with-sorting"] }),
    createWebsiteItem({ id: "activity-feed", kind: "dashboard", variant: "activity-feed", label: "Activity feed", description: "Recent updates and events feed.", note: "Make the event language concrete and recent.", keywords: ["dashboard", "activity"], recommendedNext: ["stats-cards-section", "profile-summary-card"] }),
    createWebsiteItem({ id: "data-table-with-sorting", kind: "dashboard", variant: "data-table", label: "Data table with sorting", description: "Basic table for operational records.", note: "Use a simple table before building a full grid system.", keywords: ["dashboard", "table"], recommendedNext: ["activity-feed", "dashboard-layout-with-sidebar"] }),
    createWebsiteItem({ id: "profile-summary-card", kind: "dashboard", variant: "profile-summary", label: "Profile summary card", description: "Compact account or user summary card.", note: "Useful in account pages, side panels, and admin views.", keywords: ["dashboard", "profile"], recommendedNext: ["activity-feed", "team-member-grid"] }),
    createWebsiteItem({ id: "dashboard-layout-with-sidebar", kind: "dashboard", variant: "dashboard-layout", label: "Dashboard layout with sidebar", description: "App shell with persistent sidebar and content area.", note: "Use this when the product actually needs persistent dense navigation.", keywords: ["dashboard", "layout"], recommendedNext: ["stats-cards-section", "data-table-with-sorting"] }),
  ]),
  createGroup("website-visual", "Visual", "Higher-impact visual treatments for standout moments.", [
    createWebsiteItem({ id: "glassmorphism-card-grid", kind: "visual", variant: "glassmorphism-grid", label: "Glassmorphism card grid", description: "Translucent card treatment for premium moments.", note: "Use sparingly so it still feels intentional.", keywords: ["visual", "glass"], recommendedNext: ["hero-gradient-animated", "feature-cards-with-hover-animation"] }),
    createWebsiteItem({ id: "hover-reveal-cards", kind: "visual", variant: "hover-reveal", label: "Hover reveal cards", description: "Cards that reveal deeper content on hover.", note: "The default state should still communicate enough value.", keywords: ["visual", "hover"], recommendedNext: ["feature-cards-with-hover-animation", "contact-form-section"] }),
    createWebsiteItem({ id: "three-d-tilt-card-effect", kind: "visual", variant: "tilt-card", label: "3D tilt card effect", description: "Mouse-responsive card with a subtle tilt response.", note: "Keep the motion restrained or it becomes a gimmick.", keywords: ["visual", "tilt"], recommendedNext: ["hero-product-screenshot", "feature-cards-with-hover-animation"] }),
    createWebsiteItem({ id: "floating-elements-hero-section", kind: "visual", variant: "floating-elements", label: "Floating elements hero section", description: "Hero treatment with floating chips and subtle motion.", note: "The floating chips should frame the copy, not fight it.", keywords: ["visual", "floating"], recommendedNext: ["hero-gradient-animated", "animated-gradient-background-section"] }),
    createWebsiteItem({ id: "animated-gradient-background-section", kind: "visual", variant: "animated-gradient", label: "Animated gradient background section", description: "Atmospheric section with a slow gradient shift.", note: "Best used as a standout CTA zone, not everywhere.", keywords: ["visual", "gradient"], recommendedNext: ["contact-form-section", "newsletter-signup-section"] }),
  ]),
];

export const WEBSITE_SECTION_MAP = Object.fromEntries(
  WEBSITE_SECTION_GROUPS.flatMap((group) => group.items.map((item) => [item.id, item])),
);

export const WEBSITE_SECTION_COUNT = WEBSITE_SECTION_GROUPS.reduce((sum, group) => sum + group.items.length, 0);
