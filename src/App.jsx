import { useState } from "react";
import {
  Badge,
  Breadcrumb,
  Button,
  Container,
  Heading,
  Modal,
  Navbar,
  Stack,
  Text,
} from "../ui-components";
import { CATALOG_GROUPS, BREADCRUMB_ITEMS, MODAL_SIZES, NAV_ITEMS } from "./catalog/catalogMeta";
import ButtonsCatalog from "./catalog/ButtonsCatalog";
import FeedbackCatalog from "./catalog/FeedbackCatalog";
import InputsCatalog from "./catalog/InputsCatalog";
import LayoutCatalog from "./catalog/LayoutCatalog";
import NavigationCatalog from "./catalog/NavigationCatalog";
import PatternsCatalog from "./catalog/PatternsCatalog";
import TypographyCatalog from "./catalog/TypographyCatalog";
import "./App.css";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState("md");
  const [modalCloseOnOverlayClick, setModalCloseOnOverlayClick] = useState(true);
  const [modalCloseOnEsc, setModalCloseOnEsc] = useState(true);
  const [page, setPage] = useState(4);
  const [selectedPlan, setSelectedPlan] = useState("professional");
  const [controlledSidebarCollapsed, setControlledSidebarCollapsed] = useState(false);

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
        brand={<span className="app-brand">Nyro&apos;s UI Catalog</span>}
        items={NAV_ITEMS}
        actions={<Badge variant="brand">Copy-ready patterns</Badge>}
      />

      <Container maxWidth="xl" padding="lg" className="app-main">
        <Stack gap="lg">
          <section id="overview" className="app-overview">
            <Stack gap="md">
              <Breadcrumb items={BREADCRUMB_ITEMS} />
              <Heading as="h1" size="display" weight="bold">
                Nyro&apos;s UI Catalog
              </Heading>
              <Text size="lg" tone="muted">
                Browse every component with use-case guidance, layouting recommendations, and copy-paste snippets for
                SaaS and admin interfaces.
              </Text>
              <Stack direction="row" gap="sm" wrap>
                <Badge variant="success" pill>
                  Use-case guidance
                </Badge>
                <Badge variant="warning" pill>
                  Copy-ready snippets
                </Badge>
                <Badge variant="brand" pill>
                  Responsive catalog layout
                </Badge>
              </Stack>
            </Stack>
          </section>

          <div className="app-catalog-layout">
            <nav className="app-index" aria-label="Nyro catalog index">
              <div className="app-index__inner">
                <Heading as="h2" size="xs" tone="muted">
                  Component index
                </Heading>
                {CATALOG_GROUPS.map((group) => (
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
            </div>
          </div>
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
