import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Alert from "../feedback/Alert/Alert";

describe("Alert", () => {
  it("dismisses when close button is clicked", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    render(
      <Alert title="Saved" dismissible onClose={onClose}>
        Data synced.
      </Alert>,
    );

    expect(screen.getByRole("alert")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /close alert/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });
});

