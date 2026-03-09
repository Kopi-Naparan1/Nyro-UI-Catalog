import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Checkbox from "../inputs/Checkbox/Checkbox";
import RadioButton from "../inputs/RadioButton/RadioButton";
import Select from "../inputs/Select/Select";
import TextArea from "../inputs/TextArea/TextArea";
import TextInput from "../inputs/TextInput/TextInput";

describe("Form controls", () => {
  it("links text input label and error states", () => {
    render(
      <TextInput
        label="Workspace"
        error="Workspace is required"
        helperText="Visible to your team"
      />,
    );

    const input = screen.getByLabelText(/workspace/i);
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText(/workspace is required/i)).toBeInTheDocument();
  });

  it("supports textarea, select, checkbox, and radio interactions", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(
      <div>
        <TextArea label="Notes" placeholder="Add notes" disabled />
        <Select
          label="Plan"
          onChange={onChange}
          defaultValue="starter"
          options={[
            { label: "Starter", value: "starter" },
            { label: "Pro", value: "pro" },
          ]}
        />
        <Checkbox label="Enable alerts" />
        <RadioButton label="Monthly" name="billing" value="monthly" />
      </div>,
    );

    expect(screen.getByLabelText(/notes/i)).toBeDisabled();

    await user.selectOptions(screen.getByLabelText(/plan/i), "pro");
    expect(onChange).toHaveBeenCalled();

    const checkbox = screen.getByLabelText(/enable alerts/i);
    await user.click(checkbox);
    expect(checkbox).toBeChecked();

    const radio = screen.getByLabelText(/monthly/i);
    await user.click(radio);
    expect(radio).toBeChecked();
  });
});

