import { Badge, Heading, Link as UiLink, Text } from "../../ui-components";
import { CatalogGroup, ComponentSection, DemoMatrix, DemoItem } from "./CatalogParts";
import {
  BADGE_SIZES,
  BADGE_VARIANTS,
  HEADING_ALIGNS,
  HEADING_SIZES,
  HEADING_TONES,
  HEADING_WEIGHTS,
  LINK_TONES,
  LINK_UNDERLINES,
  TEXT_SIZES,
  TEXT_TONES,
  TEXT_WEIGHTS,
} from "./catalogMeta";
import { toTitleCase } from "./format";

export default function TypographyCatalog() {
  return (
    <CatalogGroup
      id="typography"
      title="Typography"
      description="Text hierarchy and link semantics with complete tone, size, and style coverage."
    >
      <ComponentSection
        id="heading"
        title="Heading"
        description="All heading sizes, weights, alignments, and tones."
      >
        <DemoMatrix title="Heading size scale" singleColumn>
          {HEADING_SIZES.map((size) => (
            <DemoItem key={size} label={`Heading size: ${size}`}>
              <Heading as="h4" size={size}>{`Heading ${size}`}</Heading>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="Heading weight scale">
          {HEADING_WEIGHTS.map((weight) => (
            <DemoItem key={weight} label={`Heading weight: ${weight}`}>
              <Heading as="h4" size="sm" weight={weight}>{`Weight ${weight}`}</Heading>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="Heading align scale" singleColumn>
          {HEADING_ALIGNS.map((align) => (
            <DemoItem key={align} label={`Heading align: ${align}`}>
              <div className="app-align-preview">
                <Heading as="h4" size="sm" align={align}>
                  {`Aligned ${align}`}
                </Heading>
              </div>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="Heading tone scale">
          {HEADING_TONES.map((tone) => (
            <DemoItem key={tone} label={`Heading tone: ${tone}`}>
              <Heading as="h4" size="sm" tone={tone}>{`${toTitleCase(tone)} tone`}</Heading>
            </DemoItem>
          ))}
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="text"
        title="Text"
        description="Body text size, weight, tone, and truncation behavior."
      >
        <DemoMatrix title="Text size scale">
          {TEXT_SIZES.map((size) => (
            <DemoItem key={size} label={`Text size: ${size}`}>
              <Text size={size}>{`Text size ${size}`}</Text>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="Text weight scale">
          {TEXT_WEIGHTS.map((weight) => (
            <DemoItem key={weight} label={`Text weight: ${weight}`}>
              <Text weight={weight}>{`Text weight ${weight}`}</Text>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="Text tone scale">
          {TEXT_TONES.map((tone) => (
            <DemoItem key={tone} label={`Text tone: ${tone}`}>
              <Text tone={tone}>{`Text tone ${tone}`}</Text>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="Text truncate" singleColumn>
          <DemoItem label="Text truncate: true">
            <div className="app-truncate-preview">
              <Text truncate>
                This text is intentionally long to demonstrate truncation behavior when horizontal space is constrained.
              </Text>
            </div>
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="badge"
        title="Badge"
        description="Badge variants, size scale, and pill style toggles."
      >
        <DemoMatrix title="Badge variants">
          {BADGE_VARIANTS.map((variant) => (
            <DemoItem key={variant} label={`Badge variant: ${variant}`}>
              <Badge variant={variant}>{toTitleCase(variant)}</Badge>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="Badge sizes">
          {BADGE_SIZES.map((size) => (
            <DemoItem key={size} label={`Badge size: ${size}`}>
              <Badge size={size} variant="brand">{`Size ${size}`}</Badge>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="Badge pill states">
          <DemoItem label="Badge pill: false">
            <Badge variant="neutral">Default shape</Badge>
          </DemoItem>
          <DemoItem label="Badge pill: true">
            <Badge variant="neutral" pill>
              Pill shape
            </Badge>
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="link"
        title="Link"
        description="Link tone scale, underline modes, and external/disabled examples."
      >
        <DemoMatrix title="Link tone scale" dense>
          {LINK_TONES.map((tone) => (
            <DemoItem key={tone} label={`Link tone: ${tone}`}>
              <UiLink href="#" tone={tone}>{`Tone ${tone}`}</UiLink>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="Link underline modes" dense>
          {LINK_UNDERLINES.map((underline) => (
            <DemoItem key={underline} label={`Link underline: ${underline}`}>
              <UiLink href="#" underline={underline}>{`Underline ${underline}`}</UiLink>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="Link behavior states" dense>
          <DemoItem label="Link external: true">
            <UiLink href="https://react.dev" external>
              External link
            </UiLink>
          </DemoItem>
          <DemoItem label="Link disabled: true">
            <UiLink href="https://react.dev" disabled>
              Disabled link
            </UiLink>
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>
    </CatalogGroup>
  );
}
