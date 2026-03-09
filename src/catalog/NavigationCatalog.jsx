import {
  Badge,
  Breadcrumb,
  Button,
  Navbar,
  Pagination,
  Sidebar,
  Stack,
} from "../../ui-components";
import { CatalogGroup, ComponentSection, DemoMatrix, DemoItem } from "./CatalogParts";
import { SIDEBAR_ITEMS } from "./catalogMeta";

export default function NavigationCatalog({
  page,
  setPage,
  controlledSidebarCollapsed,
  setControlledSidebarCollapsed,
}) {
  return (
    <CatalogGroup
      id="navigation"
      title="Navigation"
      description="Navigation shells and wayfinding components with state and boundary examples."
    >
      <ComponentSection
        id="navbar"
        title="Navbar"
        description="Sticky/non-sticky and collapsible/non-collapsible examples."
      >
        <DemoMatrix title="Navbar sticky states" singleColumn>
          <DemoItem label="Navbar sticky: false">
            <div className="app-nav-preview">
              <Navbar
                sticky={false}
                brand="Preview brand"
                items={[
                  { label: "Home", href: "#" },
                  { label: "Reports", href: "#" },
                ]}
                actions={<Button size="sm">Action</Button>}
              />
            </div>
          </DemoItem>
          <DemoItem label="Navbar sticky: true">
            <div className="app-nav-preview">
              <Navbar
                sticky
                brand="Sticky preview"
                items={[
                  { label: "Overview", href: "#" },
                  { label: "Settings", href: "#" },
                ]}
                actions={<Badge variant="brand">Sticky</Badge>}
              />
            </div>
          </DemoItem>
        </DemoMatrix>

        <DemoMatrix title="Navbar mobile collapse options" singleColumn>
          <DemoItem label="Navbar collapsibleOnMobile: true">
            <div className="app-nav-preview">
              <Navbar
                brand="Collapsible"
                collapsibleOnMobile
                items={[
                  { label: "Link 1", href: "#" },
                  { label: "Link 2", href: "#" },
                ]}
              />
            </div>
          </DemoItem>
          <DemoItem label="Navbar collapsibleOnMobile: false">
            <div className="app-nav-preview">
              <Navbar
                brand="Always visible"
                collapsibleOnMobile={false}
                items={[
                  { label: "Link 1", href: "#" },
                  { label: "Link 2", href: "#" },
                ]}
              />
            </div>
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="sidebar"
        title="Sidebar"
        description="Left/right positioning plus controlled and uncontrolled collapse."
      >
        <DemoMatrix title="Sidebar positions">
          <DemoItem label="Sidebar position: left">
            <div className="app-sidebar-demo">
              <Sidebar title="Left sidebar" items={SIDEBAR_ITEMS} position="left" />
            </div>
          </DemoItem>
          <DemoItem label="Sidebar position: right">
            <div className="app-sidebar-demo">
              <Sidebar title="Right sidebar" items={SIDEBAR_ITEMS} position="right" />
            </div>
          </DemoItem>
        </DemoMatrix>

        <DemoMatrix title="Sidebar collapse control" singleColumn>
          <DemoItem label="Sidebar controlled collapse">
            <Stack gap="sm">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setControlledSidebarCollapsed((previous) => !previous)}
              >
                Toggle controlled sidebar
              </Button>
              <div className="app-sidebar-demo">
                <Sidebar
                  title="Controlled sidebar"
                  items={SIDEBAR_ITEMS}
                  collapsed={controlledSidebarCollapsed}
                  onToggle={setControlledSidebarCollapsed}
                />
              </div>
            </Stack>
          </DemoItem>
          <DemoItem label="Sidebar uncontrolled collapse">
            <div className="app-sidebar-demo">
              <Sidebar title="Uncontrolled sidebar" items={SIDEBAR_ITEMS} defaultCollapsed />
            </div>
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="breadcrumb"
        title="Breadcrumb"
        description="Default and custom separator styles for location hints."
      >
        <DemoMatrix title="Breadcrumb variants" singleColumn>
          <DemoItem label="Breadcrumb default separator">
            <Breadcrumb
              items={[
                { label: "Home", href: "#" },
                { label: "Workspace", href: "#" },
                { label: "Current", current: true },
              ]}
            />
          </DemoItem>
          <DemoItem label="Breadcrumb custom separator">
            <Breadcrumb
              separator=">"
              items={[
                { label: "Home", href: "#" },
                { label: "Billing", href: "#" },
                { label: "Invoices", current: true },
              ]}
            />
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="pagination"
        title="Pagination"
        description="Sibling count variation plus boundary and interactive page control."
      >
        <DemoMatrix title="Pagination siblingCount scale" singleColumn>
          {[0, 1, 2].map((siblingCount) => (
            <DemoItem key={siblingCount} label={`Pagination siblingCount: ${siblingCount}`}>
              <Pagination
                currentPage={7}
                totalPages={20}
                siblingCount={siblingCount}
                onPageChange={() => undefined}
              />
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="Pagination boundary behavior" singleColumn>
          <DemoItem label="Pagination boundary: first page">
            <Pagination currentPage={1} totalPages={6} onPageChange={() => undefined} />
          </DemoItem>
          <DemoItem label="Pagination boundary: last page">
            <Pagination currentPage={6} totalPages={6} onPageChange={() => undefined} />
          </DemoItem>
          <DemoItem label="Pagination interactive example">
            <Pagination currentPage={page} totalPages={12} siblingCount={1} onPageChange={setPage} />
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>
    </CatalogGroup>
  );
}
