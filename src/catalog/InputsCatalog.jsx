import {
  Checkbox,
  RadioButton,
  Select,
  Stack,
  TextArea,
  TextInput,
} from "../../ui-components";
import { CatalogGroup, ComponentSection, DemoMatrix, DemoItem } from "./CatalogParts";

export default function InputsCatalog({ selectedPlan, setSelectedPlan }) {
  return (
    <CatalogGroup
      id="inputs"
      title="Inputs"
      description="Text, choice, and select controls with helper, error, disabled, and required states."
    >
      <ComponentSection
        id="text-input"
        title="TextInput"
        description="Default and state examples including adornments and validation."
      >
        <DemoMatrix title="TextInput states" singleColumn>
          <DemoItem label="TextInput default">
            <TextInput label="TextInput default" placeholder="Workspace name" />
          </DemoItem>
          <DemoItem label="TextInput helper text">
            <TextInput label="TextInput helper" helperText="Helper text is visible." />
          </DemoItem>
          <DemoItem label="TextInput prefix and suffix">
            <TextInput label="TextInput prefix/suffix" prefix="$" suffix="USD" placeholder="200" />
          </DemoItem>
          <DemoItem label="TextInput error">
            <TextInput label="TextInput error" error="TextInput error message" />
          </DemoItem>
          <DemoItem label="TextInput disabled">
            <TextInput label="TextInput disabled" disabled defaultValue="Disabled value" />
          </DemoItem>
          <DemoItem label="TextInput required">
            <TextInput label="TextInput required" required placeholder="Required field" />
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="text-area"
        title="TextArea"
        description="Resize modes and form states for multiline entry."
      >
        <DemoMatrix title="TextArea resize modes" singleColumn>
          <DemoItem label="TextArea resize vertical">
            <TextArea label="TextArea vertical" resize="vertical" placeholder="Vertical resize" />
          </DemoItem>
          <DemoItem label="TextArea resize horizontal">
            <TextArea label="TextArea horizontal" resize="horizontal" placeholder="Horizontal resize" />
          </DemoItem>
          <DemoItem label="TextArea resize both">
            <TextArea label="TextArea both" resize="both" placeholder="Both directions" />
          </DemoItem>
        </DemoMatrix>

        <DemoMatrix title="TextArea states" singleColumn>
          <DemoItem label="TextArea helper text">
            <TextArea label="TextArea helper" helperText="TextArea helper message" />
          </DemoItem>
          <DemoItem label="TextArea error">
            <TextArea label="TextArea error" error="TextArea error message" />
          </DemoItem>
          <DemoItem label="TextArea disabled">
            <TextArea label="TextArea disabled" disabled defaultValue="Disabled content" />
          </DemoItem>
          <DemoItem label="TextArea required">
            <TextArea label="TextArea required" required placeholder="Required notes" />
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="select"
        title="Select"
        description="Placeholder, disabled options, and validation states."
      >
        <DemoMatrix title="Select state coverage" singleColumn>
          <DemoItem label="Select controlled">
            <Select
              label="Select controlled"
              value={selectedPlan}
              onChange={(event) => setSelectedPlan(event.target.value)}
              options={[
                { label: "Starter", value: "starter" },
                { label: "Professional", value: "professional" },
                { label: "Enterprise", value: "enterprise" },
              ]}
            />
          </DemoItem>
          <DemoItem label="Select placeholder + disabled option">
            <Select
              label="Select placeholder"
              placeholder="Choose one"
              defaultValue=""
              options={[
                { label: "Available option", value: "available" },
                { label: "Disabled option", value: "disabled", disabled: true },
              ]}
            />
          </DemoItem>
          <DemoItem label="Select helper text">
            <Select
              label="Select helper"
              helperText="Select helper text"
              defaultValue="starter"
              options={[
                { label: "Starter", value: "starter" },
                { label: "Professional", value: "professional" },
              ]}
            />
          </DemoItem>
          <DemoItem label="Select error">
            <Select
              label="Select error"
              error="Select error message"
              defaultValue="starter"
              options={[
                { label: "Starter", value: "starter" },
                { label: "Professional", value: "professional" },
              ]}
            />
          </DemoItem>
          <DemoItem label="Select disabled">
            <Select
              label="Select disabled"
              disabled
              defaultValue="starter"
              options={[
                { label: "Starter", value: "starter" },
                { label: "Professional", value: "professional" },
              ]}
            />
          </DemoItem>
          <DemoItem label="Select required">
            <Select
              label="Select required"
              required
              defaultValue="starter"
              options={[
                { label: "Starter", value: "starter" },
                { label: "Professional", value: "professional" },
              ]}
            />
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="checkbox"
        title="Checkbox"
        description="Boolean states with helper/error/disabled/required combinations."
      >
        <DemoMatrix title="Checkbox states" singleColumn>
          <DemoItem label="Checkbox default">
            <Checkbox label="Checkbox default" />
          </DemoItem>
          <DemoItem label="Checkbox checked">
            <Checkbox label="Checkbox checked" defaultChecked />
          </DemoItem>
          <DemoItem label="Checkbox helper text">
            <Checkbox label="Checkbox helper" helperText="Checkbox helper text" />
          </DemoItem>
          <DemoItem label="Checkbox error">
            <Checkbox label="Checkbox error" error="Checkbox error message" />
          </DemoItem>
          <DemoItem label="Checkbox disabled">
            <Checkbox label="Checkbox disabled" disabled />
          </DemoItem>
          <DemoItem label="Checkbox required">
            <Checkbox label="Checkbox required" required />
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>

      <ComponentSection
        id="radio-button"
        title="RadioButton"
        description="Single-option radio fields composed into named groups."
      >
        <DemoMatrix title="RadioButton states" singleColumn>
          <DemoItem label="RadioButton default">
            <Stack direction="row" gap="sm" wrap>
              <RadioButton label="Radio monthly" name="billing-default" value="monthly" />
              <RadioButton label="Radio yearly" name="billing-default" value="yearly" />
            </Stack>
          </DemoItem>
          <DemoItem label="RadioButton selected">
            <Stack direction="row" gap="sm" wrap>
              <RadioButton
                label="Radio selected monthly"
                name="billing-selected"
                value="monthly"
                defaultChecked
              />
              <RadioButton label="Radio selected yearly" name="billing-selected" value="yearly" />
            </Stack>
          </DemoItem>
          <DemoItem label="RadioButton helper text">
            <RadioButton
              label="Radio helper"
              name="billing-helper"
              value="helper"
              helperText="Radio helper text"
            />
          </DemoItem>
          <DemoItem label="RadioButton error">
            <RadioButton
              label="Radio error"
              name="billing-error"
              value="error"
              error="Radio error message"
            />
          </DemoItem>
          <DemoItem label="RadioButton disabled">
            <RadioButton label="Radio disabled" name="billing-disabled" value="disabled" disabled />
          </DemoItem>
          <DemoItem label="RadioButton required">
            <RadioButton label="Radio required" name="billing-required" value="required" required />
          </DemoItem>
        </DemoMatrix>
      </ComponentSection>
    </CatalogGroup>
  );
}
