import { useDeferredValue, useMemo, useState } from "react";
import {
  Badge,
  Button,
  Card,
  Container,
  Heading,
  Modal,
  Navbar,
  Stack,
  Text,
} from "../ui-components";
import { CATALOG_GROUPS, MODAL_SIZES } from "./catalog/catalogMeta";
import ButtonsCatalog from "./catalog/ButtonsCatalog";
import FeedbackCatalog from "./catalog/FeedbackCatalog";
import InputsCatalog from "./catalog/InputsCatalog";
import LayoutCatalog from "./catalog/LayoutCatalog";
import NavigationCatalog from "./catalog/NavigationCatalog";
import PatternsCatalog from "./catalog/PatternsCatalog";
import TypographyCatalog from "./catalog/TypographyCatalog";
import WebsiteCatalog from "./catalog/WebsiteCatalog";
import WebsiteStudio from "./catalog/WebsiteStudio.jsx";
import { WEBSITE_SECTION_COUNT, WEBSITE_SECTION_GROUPS } from "./catalog/websiteCatalogMeta";
import "./App.css";

const FOUNDATION_SECTION_COUNT = CATALOG_GROUPS.reduce((sum, group) => sum + group.items.length, 0);
const FILTER_OPTIONS = [
  { id: "studio", label: "Studio" },
  { id: "website", label: "Website Sections" },
  { id: "foundation", label: "Foundation Kit" },
];

function filterWebsiteGroups(groups, query) {
  if (!query) {
    return groups;
  }

  const searchQuery = query.trim().toLowerCase();

  return groups
    .map((group) => {
      const groupMatches = [group.title, group.description].some((value) => value.toLowerCase().includes(searchQuery));
      const items = groupMatches
        ? group.items
        : group.items.filter((item) =>
            [item.label, item.description, ...(item.keywords || [])].some((value) =>
              value.toLowerCase().includes(searchQuery),
            ),
          );

      return items.length ? { ...group, items } : null;
    })
    .filter(Boolean);
}

function EmptyCatalogState() {
  return (
    <Card bordered elevated padding="lg">
      <Stack gap="sm">
        <Heading as="h3" size="md">
          No sections matched this search
        </Heading>
        <Text tone="muted">
          Try a broader term like `hero`, `pricing`, `dashboard`, or `navigation`.
        </Text>
      </Stack>
    </Card>
  );
}

function App() {
  const [scope, setScope] = useState("studio");
  const [websiteSearch, setWebsiteSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState("md");
  const [modalCloseOnOverlayClick, setModalCloseOnOverlayClick] = useState(true);
  const [modalCloseOnEsc, setModalCloseOnEsc] = useState(true);
  const [page, setPage] = useState(4);
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [controlledSidebarCollapsed, setControlledSidebarCollapsed] = useState(false);
  const deferredWebsiteSearch = useDeferredValue(websiteSearch);

  const visibleWebsiteGroups = useMemo(
    () => filterWebsiteGroups(WEBSITE_SECTION_GROUPS, deferredWebsiteSearch),
    [deferredWebsiteSearch],
  );
  const activeGroups = scope === "website" ? visibleWebsiteGroups : scope === "foundation" ? CATALOG_GROUPS : [];
  const activeSectionCount =
    scope === "website"
      ? visibleWebsiteGroups.reduce((sum, group) => sum + group.items.length, 0)
      : scope === "foundation"
        ? FOUNDATION_SECTION_COUNT
        : WEBSITE_SECTION_COUNT;
  const navItems = activeGroups.map((group, index) => ({
    label: group.title,
    href: `#${group.id}`,
    active: index === 0,
  }));

  const openModalExample = (size, closeOnOverlayClick = true, closeOnEsc = true) => {
    const safeSize = MODAL_SIZES.includes(size) ? size : "md";
    setModalSize(safeSize);
    setModalCloseOnOverlayClick(closeOnOverlayClick);
    setModalCloseOnEsc(closeOnEsc);
    setModalOpen(true);
  };

  return (
    <div className="app-catalog">
      <Navbar
        sticky
        brand={<span className="app-brand">Spendlytics UI Catalog</span>}
        items={navItems}
        actions={
          <Badge variant="brand">
            {scope === "studio"
              ? "Studio workflow"
              : scope === "website"
                ? `${WEBSITE_SECTION_COUNT} website sections`
                : `${FOUNDATION_SECTION_COUNT} foundation sections`}
          </Badge>
        }
      />

      <Container maxWidth="xl" padding="lg" className="app-main">
        <Stack gap="lg">
          <section id="overview" className="app-overview">
            <Stack gap="md">
              <div className="app-overview__meta">
                <Heading as="h1" size="display" weight="bold">
                  {scope === "studio"
                    ? "Build a page, not just a section."
                    : "Website sections first. Foundation kit included."}
                </Heading>
                <Text size="lg" tone="muted">
                  {scope === "studio"
                    ? "Use starter recipes, theme presets, section controls, and plain React/CSS export to assemble full pages with minimal cleanup."
                    : "Browse combined website sections with JSX and CSS snippets, then drop into the lower-level foundation kit when you need primitives and SaaS/admin building blocks."}
                </Text>
              </div>

              <div className="app-overview__stats">
                <Badge variant="success" pill>
                  {WEBSITE_SECTION_COUNT} combined website sections
                </Badge>
                <Badge variant="warning" pill>
                  {scope === "studio" ? "Starter recipes + export" : "JSX + CSS per section"}
                </Badge>
                <Badge variant="brand" pill>
                  {FOUNDATION_SECTION_COUNT} reusable foundation pieces
                </Badge>
              </div>

              <div className="app-toolbar">
                <div className="app-scope-toggle" role="tablist" aria-label="Catalog mode">
                  {FILTER_OPTIONS.map((option) => (
                    <button
                      key={option.id}
                      type="button"
                      className={scope === option.id ? "app-scope-toggle__button app-scope-toggle__button--active" : "app-scope-toggle__button"}
                      onClick={() => setScope(option.id)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>

                {scope === "website" ? (
                  <label className="app-search">
                    <span className="app-search__label">Search sections</span>
                    <input
                      type="search"
                      value={websiteSearch}
                      onChange={(event) => setWebsiteSearch(event.target.value)}
                      placeholder="hero, pricing, dashboard, navigation..."
                    />
                  </label>
                ) : scope === "studio" ? (
                  <Text size="sm" tone="muted">
                    Studio mode keeps everything local and focuses on recipe selection, theming, page composition, and clean export.
                  </Text>
                ) : (
                  <Text size="sm" tone="muted">
                    Foundation kit mode keeps the original primitives and app patterns available.
                  </Text>
                )}
              </div>
            </Stack>
          </section>

          {scope === "studio" ? (
            <WebsiteStudio />
          ) : (
            <div className="app-catalog-layout">
              <nav className="app-index" aria-label={scope === "website" ? "Website catalog index" : "Foundation catalog index"}>
                <div className="app-index__inner">
                  <Heading as="h2" size="xs" tone="muted">
                    {scope === "website" ? `${activeSectionCount} visible sections` : `${FOUNDATION_SECTION_COUNT} foundation sections`}
                  </Heading>
                  {activeGroups.map((group) => (
                    <div key={group.id} className="app-index__group">
                      <Text as="p" size="xs" weight="semibold" className="app-index__group-label">
                        {group.title}
                      </Text>
                      <ul className="app-index__list">
                        {group.items.map((item) => (
                          <li key={item.id}>
                            <a href={`#${item.id}`} className="app-index__link">
                              {item.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </nav>

              <div className="app-catalog-content">
                {scope === "website" ? (
                  activeGroups.length ? (
                    <WebsiteCatalog groups={activeGroups} />
                  ) : (
                    <EmptyCatalogState />
                  )
                ) : (
                  <>
                    <ButtonsCatalog />
                    <FeedbackCatalog
                      modalSize={modalSize}
                      modalCloseOnOverlayClick={modalCloseOnOverlayClick}
                      modalCloseOnEsc={modalCloseOnEsc}
                      openModalExample={openModalExample}
                    />
                    <InputsCatalog selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} />
                    <LayoutCatalog />
                    <NavigationCatalog
                      page={page}
                      setPage={setPage}
                      controlledSidebarCollapsed={controlledSidebarCollapsed}
                      setControlledSidebarCollapsed={setControlledSidebarCollapsed}
                    />
                    <TypographyCatalog />
                    <PatternsCatalog />
                  </>
                )}
              </div>
            </div>
          )}
        </Stack>
      </Container>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        size={modalSize}
        closeOnOverlayClick={modalCloseOnOverlayClick}
        closeOnEsc={modalCloseOnEsc}
        title={`Modal demo (${modalSize})`}
        footer={
          <Stack direction="row" gap="sm" justify="flex-end">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Close
            </Button>
            <Button onClick={() => setModalOpen(false)}>Confirm</Button>
          </Stack>
        }
      >
        <Stack gap="sm">
          <Text>{`closeOnOverlayClick=${modalCloseOnOverlayClick ? "true" : "false"}`}</Text>
          <Text>{`closeOnEsc=${modalCloseOnEsc ? "true" : "false"}`}</Text>
        </Stack>
      </Modal>
    </div>
  );
}

export default App;
