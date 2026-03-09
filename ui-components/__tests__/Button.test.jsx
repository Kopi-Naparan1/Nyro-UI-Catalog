import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../buttons/Button/Button";
import IconButton from "../buttons/IconButton/IconButton";

describe("Button", () => {
  it("shows loading state and disables interactions", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    );

    const button = screen.getByRole("button", { name: /save/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");

    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});

describe("IconButton", () => {
  it("supports aria label and loading state", () => {
    render(
      <IconButton ariaLabel="Open settings" loading>
        ?
      </IconButton>,
    );

    const button = screen.getByRole("button", { name: /open settings/i });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
  });
});

