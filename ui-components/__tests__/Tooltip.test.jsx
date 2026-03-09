import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Tooltip from "../feedback/Tooltip/Tooltip";

describe("Tooltip", () => {
  it("shows on hover/focus and hides on leave", async () => {
    render(
      <Tooltip content="Helpful tip" delay={0}>
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: /trigger/i });
    const wrapper = trigger.closest(".ui-tooltip__trigger");
    const bubble = screen.getByRole("tooltip");

    expect(bubble).not.toHaveClass("ui-tooltip__bubble--visible");

    fireEvent.mouseEnter(trigger);
    await waitFor(() => {
      expect(bubble).toHaveClass("ui-tooltip__bubble--visible");
    });

    expect(wrapper).toHaveAttribute("aria-describedby", bubble.id);

    fireEvent.mouseLeave(trigger);
    await waitFor(() => {
      expect(bubble).not.toHaveClass("ui-tooltip__bubble--visible");
    });

    fireEvent.focus(trigger);
    await waitFor(() => {
      expect(bubble).toHaveClass("ui-tooltip__bubble--visible");
    });

    fireEvent.blur(trigger);
    await waitFor(() => {
      expect(bubble).not.toHaveClass("ui-tooltip__bubble--visible");
    });
  });
});

