import { Button, IconButton } from "../../ui-components";
import { CatalogGroup, ComponentSection, DemoMatrix, DemoItem } from "./CatalogParts";
import { BUTTON_VARIANTS, BUTTON_SIZES } from "./catalogMeta";
import { toTitleCase } from "./format";

export default function ButtonsCatalog() {
  return (
    <CatalogGroup
      id="buttons"
      title="Buttons"
      description="Actions with variant, size, loading, disabled, and icon-slot coverage."
    >
      <ComponentSection
        id="button"
        title="Button"
        description="Covers all Button variants, sizes, and interaction states."
      >
        <DemoMatrix title="Button variants" description="All declared Button variants.">
          {BUTTON_VARIANTS.map((variant) => (
            <DemoItem key={variant} label={`Button variant: ${variant}`}>
              <Button variant={variant}>{toTitleCase(variant)}</Button>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="Button sizes" description="Small, medium, and large size scale.">
          {BUTTON_SIZES.map((size) => (
            <DemoItem key={size} label={`Button size: ${size}`}>
              <Button size={size}>{`Size ${size}`}</Button>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="Button states and slots" singleColumn>
          <DemoItem label="Button loading">
            <Button loading>Loading</Button>
          </DemoItem>
          <DemoItem label="Button disabled">
            <Button disabled>Disabled</Button>
          </DemoItem>
          <DemoItem label="Button fullWidth">
            <div className="app-fixed-width">
              <Button fullWidth>Full width action</Button>
            </div>
          </DemoItem>
          <DemoItem label="Button icon slots">
            <Button startIcon={<span>*</span>} endIcon={<span>{">"}</span>}>
              Icon slots
            </Button>
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="icon-button"
        title="IconButton"
        description="Compact icon actions with variant, size, and loading/disabled states."
      >
        <DemoMatrix title="IconButton variants">
          {BUTTON_VARIANTS.map((variant) => (
            <DemoItem key={variant} label={`IconButton variant: ${variant}`}>
              <IconButton variant={variant} ariaLabel={`IconButton ${variant}`}>
                {variant.slice(0, 1).toUpperCase()}
              </IconButton>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="IconButton sizes">
          {BUTTON_SIZES.map((size) => (
            <DemoItem key={size} label={`IconButton size: ${size}`}>
              <IconButton size={size} ariaLabel={`IconButton size ${size}`}>
                {size.toUpperCase()}
              </IconButton>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="IconButton states" singleColumn>
          <DemoItem label="IconButton loading">
            <IconButton ariaLabel="IconButton loading" loading>
              L
            </IconButton>
          </DemoItem>
          <DemoItem label="IconButton disabled">
            <IconButton ariaLabel="IconButton disabled" disabled>
              D
            </IconButton>
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>
    </CatalogGroup>
  );
}
