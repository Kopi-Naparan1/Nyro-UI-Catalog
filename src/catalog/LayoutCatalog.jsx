import {
  Badge,
  Card,
  Container,
  Grid,
  Stack,
  Text,
  Heading,
} from "../../ui-components";
import { CatalogGroup, ComponentSection, DemoMatrix, DemoItem } from "./CatalogParts";
import {
  CARD_PADDINGS,
  CONTAINER_MAX_WIDTHS,
  CONTAINER_PADDINGS,
  GRID_GAPS,
  STACK_DIRECTIONS,
  STACK_GAPS,
} from "./catalogMeta";

export default function LayoutCatalog() {
  return (
    <CatalogGroup
      id="layout"
      title="Layout"
      description="Core layout primitives for width, spacing, alignment, and compositional surfaces."
    >
      <ComponentSection
        id="container"
        title="Container"
        description="Max-width scale, padding scale, and centering behavior."
      >
        <DemoMatrix title="Container maxWidth scale" singleColumn>
          {CONTAINER_MAX_WIDTHS.map((maxWidth) => (
            <DemoItem key={maxWidth} label={`Container maxWidth: ${maxWidth}`}>
              <div className="app-layout-track">
                <Container maxWidth={maxWidth} padding="sm" className="app-layout-sample">
                  <Text as="span" size="sm">{`maxWidth=${maxWidth}`}</Text>
                </Container>
              </div>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="Container padding scale" singleColumn>
          {CONTAINER_PADDINGS.map((padding) => (
            <DemoItem key={padding} label={`Container padding: ${padding}`}>
              <div className="app-layout-track">
                <Container maxWidth="md" padding={padding} className="app-layout-sample">
                  <Text as="span" size="sm">{`padding=${padding}`}</Text>
                </Container>
              </div>
            </DemoItem>
          ))}
          <DemoItem label="Container center: false">
            <div className="app-layout-track">
              <Container maxWidth="sm" center={false} className="app-layout-sample">
                <Text as="span" size="sm">center=false</Text>
              </Container>
            </div>
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="grid"
        title="Grid"
        description="Fixed columns, auto-fit behavior, and named gap scale."
      >
        <DemoMatrix title="Grid fixed columns" singleColumn>
          {[2, 3, 4].map((columns) => (
            <DemoItem key={columns} label={`Grid columns: ${columns}`}>
              <Grid columns={columns} gap="sm">
                <div className="app-cell">A</div>
                <div className="app-cell">B</div>
                <div className="app-cell">C</div>
                <div className="app-cell">D</div>
              </Grid>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="Grid auto-fit" singleColumn>
          <DemoItem label="Grid autoFit with minColumnWidth=12rem">
            <Grid autoFit minColumnWidth="12rem" gap="md">
              <div className="app-cell">Item 1</div>
              <div className="app-cell">Item 2</div>
              <div className="app-cell">Item 3</div>
              <div className="app-cell">Item 4</div>
            </Grid>
          </DemoItem>
        </DemoMatrix>

        <DemoMatrix title="Grid gap scale" singleColumn>
          {GRID_GAPS.map((gap) => (
            <DemoItem key={gap} label={`Grid gap: ${gap}`}>
              <Grid columns={3} gap={gap}>
                <div className="app-cell">One</div>
                <div className="app-cell">Two</div>
                <div className="app-cell">Three</div>
              </Grid>
            </DemoItem>
          ))}
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="stack"
        title="Stack"
        description="Direction, gap, and wrapping behavior coverage."
      >
        <DemoMatrix title="Stack direction scale" singleColumn>
          {STACK_DIRECTIONS.map((direction) => (
            <DemoItem key={direction} label={`Stack direction: ${direction}`}>
              <Stack direction={direction} gap="sm">
                <Badge variant="neutral">One</Badge>
                <Badge variant="brand">Two</Badge>
                <Badge variant="success">Three</Badge>
              </Stack>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="Stack gap scale" singleColumn>
          {STACK_GAPS.map((gap) => (
            <DemoItem key={gap} label={`Stack gap: ${gap}`}>
              <Stack direction="row" gap={gap} wrap>
                <Badge variant="neutral">Gap</Badge>
                <Badge variant="warning">{gap}</Badge>
                <Badge variant="brand">Example</Badge>
              </Stack>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="Stack wrap behavior" singleColumn>
          <DemoItem label="Stack wrap: false">
            <div className="app-scroll-x">
              <Stack direction="row" gap="sm">
                {Array.from({ length: 8 }).map((_, index) => (
                  <Badge key={`nowrap-${index}`} variant="neutral">{`Item ${index + 1}`}</Badge>
                ))}
              </Stack>
            </div>
          </DemoItem>
          <DemoItem label="Stack wrap: true">
            <Stack direction="row" gap="sm" wrap>
              {Array.from({ length: 8 }).map((_, index) => (
                <Badge key={`wrap-${index}`} variant="success">{`Item ${index + 1}`}</Badge>
              ))}
            </Stack>
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="card"
        title="Card"
        description="Padding scale and appearance combinations for composed surfaces."
      >
        <DemoMatrix title="Card padding scale">
          {CARD_PADDINGS.map((padding) => (
            <DemoItem key={padding} label={`Card padding: ${padding}`}>
              <Card padding={padding} bordered>
                <Text as="span" size="sm">{`padding=${padding}`}</Text>
              </Card>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="Card appearance states">
          <DemoItem label="Card bordered">
            <Card bordered>
              <Text as="span">Bordered card</Text>
            </Card>
          </DemoItem>
          <DemoItem label="Card elevated">
            <Card bordered elevated>
              <Text as="span">Elevated card</Text>
            </Card>
          </DemoItem>
          <DemoItem label="Card interactive">
            <Card bordered interactive>
              <Text as="span">Interactive card</Text>
            </Card>
          </DemoItem>
        </DemoMatrix>

        <DemoMatrix title="Card header and footer" singleColumn>
          <DemoItem label="Card with header and footer">
            <Card
              bordered
              header={<Heading as="h4" size="xs">Card header</Heading>}
              footer={<Text as="span" size="sm" tone="muted">Card footer</Text>}
            >
              <Text>Card body content</Text>
            </Card>
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>
    </CatalogGroup>
  );
}
