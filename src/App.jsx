import { useState } from "react";
import {
  Alert,
  Badge,
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  Container,
  Grid,
  Heading,
  IconButton,
  Link as UiLink,
  Modal,
  Navbar,
  Pagination,
  RadioButton,
  Select,
  Sidebar,
  Spinner,
  Stack,
  Text,
  TextArea,
  TextInput,
  Tooltip,
} from "../ui-components";
import "./App.css";

const NAV_ITEMS = [
  { label: "Overview", href: "#overview", active: true },
  { label: "Components", href: "#components" },
  { label: "Forms", href: "#forms" },
  { label: "Navigation", href: "#navigation" },
];

const SIDEBAR_ITEMS = [
  { label: "Dashboard", href: "#", icon: "DB", active: true },
  { label: "Transactions", href: "#", icon: "TX" },
  { label: "Budgets", href: "#", icon: "BG" },
  { label: "Settings", href: "#", icon: "ST" },
];

const BREADCRUMB_ITEMS = [
  { label: "Home", href: "#" },
  { label: "Design system", href: "#" },
  { label: "Component catalog", current: true },
];

function Section({ title, description, children, id }) {
  return (
    <Card id={id} elevated bordered padding="lg" className="app-section">
      <Stack gap="sm">
        <Heading as="h2" size="md">
          {title}
        </Heading>
        <Text tone="muted">{description}</Text>
      </Stack>
      <div className="app-section__content">{children}</div>
    </Card>
  );
}

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(4);
  const [selectedPlan, setSelectedPlan] = useState("professional");

  return (
    <div className="app-catalog">
      <Navbar
        sticky
        brand={<span className="app-brand">Spendlytics UI</span>}
        items={NAV_ITEMS}
        actions={
          <>
            <Badge variant="brand">v1.0</Badge>
            <Button size="sm">Sign in</Button>
          </>
        }
      />

      <Container maxWidth="xl" padding="lg" className="app-main">
        <Stack gap="lg">
          <section id="overview">
            <Stack gap="md">
              <Breadcrumb items={BREADCRUMB_ITEMS} />
              <Heading as="h1" size="display" weight="bold">
                Reusable UI Components Catalog
              </Heading>
              <Text size="lg" tone="muted">
                Neutral defaults with token-driven styling so each product needs only small tweaks.
              </Text>
              <Stack direction="row" gap="sm" wrap>
                <Badge variant="brand" pill>
                  Accessible by default
                </Badge>
                <Badge variant="success" pill>
                  Responsive layouts
                </Badge>
                <Badge variant="warning" pill>
                  CSS variables ready
                </Badge>
              </Stack>
            </Stack>
          </section>

          <Grid autoFit minColumnWidth="20rem" gap="lg">
            <Section
              id="components"
              title="Buttons + Feedback"
              description="Variants, loading states, inline icons, and dismissible alerts."
            >
              <Stack gap="md">
                <Stack direction="row" gap="sm" wrap>
                  <Button>Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                </Stack>

                <Stack direction="row" gap="sm" wrap>
                  <Button loading>Processing</Button>
                  <Button startIcon={<span>^</span>} endIcon={<span>{"->"}</span>}>
                    With icons
                  </Button>
                  <IconButton ariaLabel="Favorite" variant="outline">
                    *
                  </IconButton>
                  <IconButton ariaLabel="Settings" variant="secondary" loading />
                </Stack>

                <Alert variant="info" title="Information">
                  You can theme these components by overriding CSS variables in your app scope.
                </Alert>
                <Alert variant="success" title="Saved" dismissible>
                  Your design token overrides were applied.
                </Alert>
              </Stack>
            </Section>

            <Section
              id="forms"
              title="Form Controls"
              description="Label linkage, helper/error messaging, and controlled/uncontrolled support."
            >
              <Stack gap="md">
                <TextInput
                  label="Workspace name"
                  placeholder="Acme Spendlytics"
                  helperText="Shown in top navigation."
                  prefix="@"
                />
                <TextInput
                  label="Budget threshold"
                  type="number"
                  suffix="USD"
                  error="Threshold is required"
                />
                <Select
                  label="Pricing plan"
                  value={selectedPlan}
                  onChange={(event) => setSelectedPlan(event.target.value)}
                  options={[
                    { label: "Starter", value: "starter" },
                    { label: "Professional", value: "professional" },
                    { label: "Enterprise", value: "enterprise" },
                  ]}
                />
                <TextArea
                  label="Notes"
                  rows={3}
                  placeholder="Anything your team should know..."
                  helperText="Markdown is not required."
                />
                <Checkbox label="Enable weekly digest" defaultChecked helperText="Delivered every Monday." />
                <Stack direction="row" gap="md">
                  <RadioButton name="period" value="monthly" label="Monthly" defaultChecked />
                  <RadioButton name="period" value="yearly" label="Yearly" />
                </Stack>
              </Stack>
            </Section>

            <Section
              id="navigation"
              title="Navigation + Layout"
              description="Container, grid, stack, sidebar, and pagination patterns for app shells."
            >
              <Stack gap="md">
                <div className="app-sidebar-demo">
                  <Sidebar title="Workspace" items={SIDEBAR_ITEMS} />
                </div>

                <Pagination currentPage={page} totalPages={12} onPageChange={setPage} siblingCount={1} />

                <Stack direction="row" gap="sm" wrap>
                  <Tooltip content="Inline loading indicator" position="top">
                    <button type="button" className="app-plain-trigger">
                      Hover me
                    </button>
                  </Tooltip>
                  <Spinner inline label="Loading dashboard" />
                  <UiLink href="https://react.dev" external underline="always">
                    Read docs
                  </UiLink>
                </Stack>
              </Stack>
            </Section>
          </Grid>

          <Section
            title="Modal + Typography"
            description="Dialog accessibility plus semantic text primitives with tone and size control."
          >
            <Stack gap="md">
              <Stack direction="row" gap="sm" wrap>
                <Button onClick={() => setModalOpen(true)}>Open modal</Button>
                <Heading as="h3" size="sm" tone="brand">
                  Heading component
                </Heading>
                <Text as="span" tone="subtle">
                  Supporting text with tone="subtle"
                </Text>
              </Stack>

              <Card padding="md" bordered>
                <Stack gap="sm">
                  <Heading as="h4" size="xs" tone="muted">
                    Card header
                  </Heading>
                  <Text>
                    Use <code>Container</code>, <code>Grid</code>, and <code>Stack</code> together to compose page
                    sections quickly.
                  </Text>
                </Stack>
              </Card>
            </Stack>
          </Section>
        </Stack>
      </Container>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Share component library"
        footer={
          <Stack direction="row" gap="sm" justify="flex-end">
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setModalOpen(false)}>Share</Button>
          </Stack>
        }
      >
        <Text>
          Invite your team to review this catalog. All components are built with neutral defaults and easy token
          overrides.
        </Text>
      </Modal>
    </div>
  );
}

export default App;


