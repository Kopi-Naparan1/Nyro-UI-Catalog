import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal from "../feedback/Modal/Modal";

describe("Modal", () => {
  it("has proper dialog attributes", () => {
    render(
      <Modal open title="Share workspace">
        Body content
      </Modal>,
    );

    const dialog = screen.getByRole("dialog", { name: /share workspace/i });
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toBeInTheDocument();
  });

  it("closes via close button, overlay click, and escape", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();

    const { rerender } = render(
      <Modal open title="Invite" onClose={onClose}>
        Content
      </Modal>,
    );

    await user.click(screen.getByRole("button", { name: /close modal/i }));
    expect(onClose).toHaveBeenCalledTimes(1);

    const overlay = document.querySelector(".ui-modal__overlay");
    await user.pointer({ keys: "[MouseLeft>]", target: overlay });
    expect(onClose).toHaveBeenCalledTimes(2);

    await user.keyboard("{Escape}");
    expect(onClose).toHaveBeenCalledTimes(3);

    rerender(
      <Modal open={false} title="Invite" onClose={onClose}>
        Content
      </Modal>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("traps focus and restores previous focus when closed", async () => {
    const user = userEvent.setup();

    const { rerender } = render(
      <div>
        <button type="button">Open trigger</button>
        <Modal open={false} title="Focus test">
          <button type="button">Action</button>
        </Modal>
      </div>,
    );

    const openTrigger = screen.getByRole("button", { name: /open trigger/i });
    openTrigger.focus();
    expect(openTrigger).toHaveFocus();

    rerender(
      <div>
        <button type="button">Open trigger</button>
        <Modal open title="Focus test">
          <button type="button">Action</button>
        </Modal>
      </div>,
    );

    const closeButton = screen.getByRole("button", { name: /close modal/i });
    const actionButton = screen.getByRole("button", { name: /action/i });

    expect(closeButton).toHaveFocus();

    await user.keyboard("{Tab}");
    expect(actionButton).toHaveFocus();

    await user.keyboard("{Tab}");
    expect(closeButton).toHaveFocus();

    rerender(
      <div>
        <button type="button">Open trigger</button>
        <Modal open={false} title="Focus test">
          <button type="button">Action</button>
        </Modal>
      </div>,
    );

    expect(openTrigger).toHaveFocus();
  });
});
