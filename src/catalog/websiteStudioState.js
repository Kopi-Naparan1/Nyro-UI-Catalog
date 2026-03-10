import { WEBSITE_SECTION_MAP } from "./websiteCatalogMeta";

export const STUDIO_STORAGE_KEY = "spendlytics-ui-studio-v2";

export const FONT_FAMILY_OPTIONS = [
  {
    id: "avenir-next",
    label: "Avenir Next",
    value: '"Avenir Next", "Segoe UI", sans-serif',
  },
  {
    id: "ibm-plex-sans",
    label: "IBM Plex Sans",
    value: '"IBM Plex Sans", "Segoe UI", sans-serif',
  },
  {
    id: "trebuchet-ms",
    label: "Trebuchet MS",
    value: '"Trebuchet MS", "Segoe UI", sans-serif',
  },
  {
    id: "source-serif",
    label: "Source Serif",
    value: '"Source Serif 4", Georgia, serif',
  },
  {
    id: "verdana",
    label: "Verdana",
    value: '"Verdana", "Segoe UI", sans-serif',
  },
];

export const RADIUS_PROFILES = [
  {
    id: "structured",
    label: "Structured",
    tokens: {
      radiusMd: "0.8rem",
      radiusLg: "1.1rem",
      radiusXl: "1.45rem",
    },
  },
  {
    id: "balanced",
    label: "Balanced",
    tokens: {
      radiusMd: "1rem",
      radiusLg: "1.5rem",
      radiusXl: "1.9rem",
    },
  },
  {
    id: "soft",
    label: "Soft",
    tokens: {
      radiusMd: "1.2rem",
      radiusLg: "1.8rem",
      radiusXl: "2.25rem",
    },
  },
];

export const SPACING_PROFILES = [
  {
    id: "tight",
    label: "Tight",
    tokens: {
      pageGap: "1.25rem",
      pagePadding: "clamp(0.9rem, 2.4vw, 1.5rem)",
    },
  },
  {
    id: "balanced",
    label: "Balanced",
    tokens: {
      pageGap: "1.75rem",
      pagePadding: "clamp(1rem, 3vw, 2rem)",
    },
  },
  {
    id: "airy",
    label: "Airy",
    tokens: {
      pageGap: "2.25rem",
      pagePadding: "clamp(1.25rem, 3.6vw, 2.5rem)",
    },
  },
];

export const THEME_PRESETS = [
  {
    id: "clean-slate",
    label: "Clean Slate",
    description: "Neutral SaaS styling with strong clarity and restrained accents.",
    tokens: {
      fontFamily: '"Avenir Next", "Segoe UI", sans-serif',
      pageBackground: "#f3f7fb",
      surface: "#ffffff",
      surfaceMuted: "#f8fafc",
      surfaceDark: "#0f172a",
      text: "#0f172a",
      textMuted: "#64748b",
      textOnDark: "#e2e8f0",
      accent: "#0f766e",
      accentContrast: "#ecfeff",
      border: "rgba(100, 116, 139, 0.18)",
      radiusMd: "1rem",
      radiusLg: "1.5rem",
      radiusXl: "1.9rem",
      pageGap: "1.75rem",
      pagePadding: "clamp(1rem, 3vw, 2rem)",
      shadowMd: "0 20px 40px rgba(15, 23, 42, 0.08)",
      shadowLg: "0 30px 64px rgba(15, 23, 42, 0.12)",
    },
  },
  {
    id: "signal-blue",
    label: "Signal Blue",
    description: "Sharper product-marketing palette with cooler contrast.",
    tokens: {
      fontFamily: '"IBM Plex Sans", "Segoe UI", sans-serif',
      pageBackground: "#eff6ff",
      surface: "#ffffff",
      surfaceMuted: "#f8fbff",
      surfaceDark: "#081120",
      text: "#0f172a",
      textMuted: "#475569",
      textOnDark: "#e6f2ff",
      accent: "#2563eb",
      accentContrast: "#eff6ff",
      border: "rgba(37, 99, 235, 0.14)",
      radiusMd: "0.95rem",
      radiusLg: "1.35rem",
      radiusXl: "1.8rem",
      pageGap: "1.5rem",
      pagePadding: "clamp(1rem, 3vw, 2.25rem)",
      shadowMd: "0 18px 36px rgba(37, 99, 235, 0.1)",
      shadowLg: "0 28px 56px rgba(8, 17, 32, 0.18)",
    },
  },
  {
    id: "ember-launch",
    label: "Ember Launch",
    description: "Warmer launch styling for campaign pages and higher-energy sections.",
    tokens: {
      fontFamily: '"Trebuchet MS", "Segoe UI", sans-serif',
      pageBackground: "#fff7ed",
      surface: "#fffdf8",
      surfaceMuted: "#fff8f1",
      surfaceDark: "#1c1917",
      text: "#1c1917",
      textMuted: "#57534e",
      textOnDark: "#fef7ed",
      accent: "#ea580c",
      accentContrast: "#fff7ed",
      border: "rgba(234, 88, 12, 0.16)",
      radiusMd: "1.1rem",
      radiusLg: "1.65rem",
      radiusXl: "2rem",
      pageGap: "1.8rem",
      pagePadding: "clamp(1rem, 3vw, 2.25rem)",
      shadowMd: "0 18px 36px rgba(234, 88, 12, 0.1)",
      shadowLg: "0 30px 60px rgba(28, 25, 23, 0.16)",
    },
  },
  {
    id: "midnight-ops",
    label: "Midnight Ops",
    description: "Dark product styling tuned for dashboards and technical products.",
    tokens: {
      fontFamily: '"Verdana", "Segoe UI", sans-serif',
      pageBackground: "#020617",
      surface: "#0f172a",
      surfaceMuted: "#111827",
      surfaceDark: "#020617",
      text: "#e2e8f0",
      textMuted: "#94a3b8",
      textOnDark: "#e2e8f0",
      accent: "#38bdf8",
      accentContrast: "#082f49",
      border: "rgba(148, 163, 184, 0.14)",
      radiusMd: "0.95rem",
      radiusLg: "1.35rem",
      radiusXl: "1.75rem",
      pageGap: "1.5rem",
      pagePadding: "clamp(1rem, 3vw, 2rem)",
      shadowMd: "0 16px 32px rgba(2, 6, 23, 0.28)",
      shadowLg: "0 28px 56px rgba(2, 6, 23, 0.34)",
    },
  },
];

export const STARTER_PAGE_RECIPES = [
  {
    id: "saas-homepage",
    label: "SaaS Homepage",
    description: "A balanced default for product sites: hero, proof, features, pricing, FAQ, contact.",
    sectionIds: [
      "sticky-navbar",
      "hero-product-screenshot",
      "partner-logos-grid",
      "three-column-feature-grid",
      "feature-tabs-component",
      "testimonial-card-grid",
      "three-tier-pricing-cards",
      "faq-accordion",
      "contact-form-section",
    ],
  },
  {
    id: "startup-waitlist",
    label: "Startup Waitlist",
    description: "A lean launch flow built around signup, proof, and a simple feature story.",
    sectionIds: [
      "mobile-slide-in-menu",
      "hero-email-signup",
      "partner-logos-grid",
      "feature-cards-with-hover-animation",
      "testimonial-slider",
      "newsletter-signup-section",
      "contact-form-section",
    ],
  },
  {
    id: "agency-landing",
    label: "Agency Landing",
    description: "Service-oriented layout with proof, process, team, and contact.",
    sectionIds: [
      "navbar-with-dropdown-menu",
      "hero-split-layout",
      "alternating-feature-layout",
      "step-by-step-process-section",
      "testimonial-card-grid",
      "team-member-grid",
      "contact-form-section",
    ],
  },
  {
    id: "pricing-first",
    label: "Pricing First",
    description: "Lead users quickly from positioning into plan comparison and objections.",
    sectionIds: [
      "sticky-navbar",
      "hero-headline-image",
      "pricing-toggle-monthly-yearly",
      "three-tier-pricing-cards",
      "pricing-table-comparison",
      "testimonial-card-grid",
      "faq-accordion",
      "contact-form-section",
    ],
  },
  {
    id: "dashboard-marketing",
    label: "Dashboard Marketing",
    description: "For products that need to show real UI and operational depth early.",
    sectionIds: [
      "sticky-navbar",
      "hero-product-screenshot",
      "stats-cards-section",
      "dashboard-layout-with-sidebar",
      "data-table-with-sorting",
      "activity-feed",
      "testimonial-card-grid",
      "three-tier-pricing-cards",
    ],
  },
];

const DEFAULT_RECIPE_ID = STARTER_PAGE_RECIPES[0].id;
const DEFAULT_THEME_PRESET_ID = THEME_PRESETS[0].id;

function createComposerSection(sectionId, config = {}) {
  return {
    id: `composer-${Math.random().toString(36).slice(2, 10)}`,
    sectionId,
    config: { ...config },
  };
}

function getRecipeById(recipeId) {
  return STARTER_PAGE_RECIPES.find((recipe) => recipe.id === recipeId) || STARTER_PAGE_RECIPES[0];
}

export function getThemePresetById(presetId) {
  return THEME_PRESETS.find((preset) => preset.id === presetId) || THEME_PRESETS[0];
}

export function createComposerSectionsFromRecipe(recipeId) {
  return getRecipeById(recipeId).sectionIds.map((sectionId) => {
    const item = WEBSITE_SECTION_MAP[sectionId];
    return createComposerSection(sectionId, item.defaultConfig);
  });
}

export function createInitialStudioState() {
  const recipe = getRecipeById(DEFAULT_RECIPE_ID);
  const themePreset = getThemePresetById(DEFAULT_THEME_PRESET_ID);
  const sections = createComposerSectionsFromRecipe(recipe.id);

  return {
    recipeId: recipe.id,
    themePresetId: themePreset.id,
    theme: { ...themePreset.tokens },
    viewport: "desktop",
    sectionSearch: "",
    sections,
    selectedSectionId: sections[0]?.id || null,
    lastCopiedAsset: null,
  };
}

export function restoreStudioState() {
  if (typeof window === "undefined") {
    return createInitialStudioState();
  }

  try {
    const raw = window.localStorage.getItem(STUDIO_STORAGE_KEY);

    if (!raw) {
      return createInitialStudioState();
    }

    const parsed = JSON.parse(raw);
    const fallback = createInitialStudioState();
    const themePreset = getThemePresetById(parsed.themePresetId || DEFAULT_THEME_PRESET_ID);
    const restoredSections = Array.isArray(parsed.sections)
      ? parsed.sections
          .filter((section) => WEBSITE_SECTION_MAP[section.sectionId])
          .map((section) => ({
            id: String(section.id || `composer-${Math.random().toString(36).slice(2, 10)}`),
            sectionId: section.sectionId,
            config: {
              ...WEBSITE_SECTION_MAP[section.sectionId].defaultConfig,
              ...(section.config || {}),
            },
          }))
      : fallback.sections;

    return {
      ...fallback,
      recipeId: parsed.recipeId || "custom",
      themePresetId: themePreset.id,
      theme: { ...themePreset.tokens, ...(parsed.theme || {}) },
      viewport: ["desktop", "tablet", "mobile"].includes(parsed.viewport) ? parsed.viewport : fallback.viewport,
      sectionSearch: typeof parsed.sectionSearch === "string" ? parsed.sectionSearch : "",
      sections: restoredSections.length ? restoredSections : fallback.sections,
      selectedSectionId:
        restoredSections.find((section) => section.id === parsed.selectedSectionId)?.id || restoredSections[0]?.id || fallback.selectedSectionId,
      lastCopiedAsset: null,
    };
  } catch {
    return createInitialStudioState();
  }
}

function moveItem(list, fromIndex, toIndex) {
  const copy = [...list];
  const [moved] = copy.splice(fromIndex, 1);
  copy.splice(toIndex, 0, moved);
  return copy;
}

function markCustomRecipe(state) {
  return {
    ...state,
    recipeId: "custom",
  };
}

export function studioReducer(state, action) {
  switch (action.type) {
    case "apply-recipe": {
      const sections = createComposerSectionsFromRecipe(action.recipeId);
      return {
        ...state,
        recipeId: action.recipeId,
        sections,
        selectedSectionId: sections[0]?.id || null,
      };
    }

    case "set-theme-preset": {
      const preset = getThemePresetById(action.presetId);
      return {
        ...state,
        themePresetId: preset.id,
        theme: { ...preset.tokens },
      };
    }

    case "update-theme-token": {
      return {
        ...state,
        themePresetId: "custom",
        theme: {
          ...state.theme,
          [action.key]: action.value,
        },
      };
    }

    case "update-theme-tokens": {
      return {
        ...state,
        themePresetId: "custom",
        theme: {
          ...state.theme,
          ...action.tokens,
        },
      };
    }

    case "set-viewport":
      return {
        ...state,
        viewport: action.viewport,
      };

    case "set-section-search":
      return {
        ...state,
        sectionSearch: action.value,
      };

    case "add-section": {
      const item = WEBSITE_SECTION_MAP[action.sectionId];
      const nextSection = createComposerSection(action.sectionId, item.defaultConfig);
      const sections = [...state.sections, nextSection];

      return {
        ...markCustomRecipe(state),
        sections,
        selectedSectionId: nextSection.id,
      };
    }

    case "select-section":
      return {
        ...state,
        selectedSectionId: action.sectionId,
      };

    case "update-section-config": {
      const sections = state.sections.map((section) =>
        section.id === action.sectionId
          ? {
              ...section,
              config: {
                ...section.config,
                [action.key]: action.value,
              },
            }
          : section,
      );

      return {
        ...markCustomRecipe(state),
        sections,
      };
    }

    case "duplicate-section": {
      const source = state.sections.find((section) => section.id === action.sectionId);

      if (!source) {
        return state;
      }

      const sections = [];

      state.sections.forEach((section) => {
        sections.push(section);

        if (section.id === action.sectionId) {
          sections.push(createComposerSection(section.sectionId, section.config));
        }
      });

      return {
        ...markCustomRecipe(state),
        sections,
      };
    }

    case "remove-section": {
      const sections = state.sections.filter((section) => section.id !== action.sectionId);
      const selectedSectionId =
        state.selectedSectionId === action.sectionId ? sections[0]?.id || null : state.selectedSectionId;

      return {
        ...markCustomRecipe(state),
        sections,
        selectedSectionId,
      };
    }

    case "move-section": {
      const index = state.sections.findIndex((section) => section.id === action.sectionId);
      const nextIndex = index + action.direction;

      if (index < 0 || nextIndex < 0 || nextIndex >= state.sections.length) {
        return state;
      }

      return {
        ...markCustomRecipe(state),
        sections: moveItem(state.sections, index, nextIndex),
      };
    }

    case "reset-studio":
      return createInitialStudioState();

    case "mark-copy":
      return {
        ...state,
        lastCopiedAsset: action.asset,
      };

    default:
      return state;
  }
}
