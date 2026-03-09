import { Alert, Button, Spinner, Text, Tooltip } from "../../ui-components";
import { CatalogGroup, ComponentSection, DemoMatrix, DemoItem } from "./CatalogParts";
import {
  ALERT_VARIANTS,
  MODAL_BEHAVIORS,
  MODAL_SIZES,
  SPINNER_SIZES,
  TOOLTIP_POSITIONS,
} from "./catalogMeta";
import { toTitleCase } from "./format";

export default function FeedbackCatalog({
  modalSize,
  modalCloseOnOverlayClick,
  modalCloseOnEsc,
  openModalExample,
}) {
  return (
    <CatalogGroup
      id="feedback"
      title="Feedback"
      description="System status, load indicators, tooltips, and modal interaction behavior."
    >
      <ComponentSection
        id="alert"
        title="Alert"
        description="All variants plus no-title and dismissible configurations."
      >
        <DemoMatrix title="Alert variants" singleColumn>
          {ALERT_VARIANTS.map((variant) => (
            <DemoItem key={variant} label={`Alert variant: ${variant}`}>
              <Alert variant={variant} title={`${toTitleCase(variant)} alert`}>
                {`Alert body for ${variant}`}
              </Alert>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="Alert structure variants" singleColumn>
          <DemoItem label="Alert without title">
            <Alert variant="info">No title provided, body content only.</Alert>
          </DemoItem>
          <DemoItem label="Alert dismissible">
            <Alert variant="success" title="Dismissible alert" dismissible>
              Dismiss button is enabled.
            </Alert>
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="modal"
        title="Modal"
        description="Modal size scale and close behavior combinations."
      >
        <DemoMatrix title="Modal size examples" description="Open a modal configured with each size.">
          {MODAL_SIZES.map((size) => (
            <DemoItem key={size} label={`Modal size: ${size}`}>
              <Button variant="outline" onClick={() => openModalExample(size, true, true)}>
                {`Open modal size ${size}`}
              </Button>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix
          title="Modal close behaviors"
          description="Behavior combinations for overlay click and escape handling."
          singleColumn
        >
          {MODAL_BEHAVIORS.map((behavior) => (
            <DemoItem key={behavior.label} label={behavior.label}>
              <Button
                variant="ghost"
                onClick={() => openModalExample("md", behavior.closeOnOverlayClick, behavior.closeOnEsc)}
              >
                Open behavior demo
              </Button>
            </DemoItem>
          ))}
          <DemoItem label="Modal current behavior state">
            <Text as="span" tone="muted">
              {`Current: size=${modalSize}, overlay=${modalCloseOnOverlayClick ? "on" : "off"}, esc=${
                modalCloseOnEsc ? "on" : "off"
              }`}
            </Text>
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="spinner"
        title="Spinner"
        description="All named spinner sizes and inline/block usage."
      >
        <DemoMatrix title="Spinner sizes">
          {SPINNER_SIZES.map((size) => (
            <DemoItem key={size} label={`Spinner size: ${size}`}>
              <Spinner size={size} label={`Spinner size ${size}`} />
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="Spinner layout modes" singleColumn>
          <DemoItem label="Spinner block mode">
            <Spinner label="Block spinner" />
          </DemoItem>
          <DemoItem label="Spinner inline mode">
            <Text as="span">
              Loading indicator <Spinner inline label="Inline spinner" /> inline with text.
            </Text>
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="tooltip"
        title="Tooltip"
        description="Position, delay, and disabled behavior examples."
      >
        <DemoMatrix title="Tooltip positions" scroll>
          {TOOLTIP_POSITIONS.map((position) => (
            <DemoItem key={position} label={`Tooltip position: ${position}`}>
              <Tooltip content={`Tooltip ${position}`} position={position}>
                <button type="button" className="app-plain-trigger">
                  {toTitleCase(position)}
                </button>
              </Tooltip>
            </DemoItem>
          ))}
        </DemoMatrix>

        <DemoMatrix title="Tooltip behavior examples" singleColumn>
          <DemoItem label="Tooltip delay example">
            <Tooltip content="Delayed tooltip (600ms)" delay={600}>
              <button type="button" className="app-plain-trigger">
                Delayed trigger
              </button>
            </Tooltip>
          </DemoItem>
          <DemoItem label="Tooltip disabled example">
            <Tooltip content="Disabled tooltip" disabled>
              <button type="button" className="app-plain-trigger">
                Disabled tooltip
              </button>
            </Tooltip>
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>
    </CatalogGroup>
  );
}
