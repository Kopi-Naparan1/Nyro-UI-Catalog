import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Sidebar from "../navigation/Sidebar/Sidebar";

const ITEMS = [{ label: "Dashboard", href: "#" }];

describe("Sidebar", () => {
  it("toggles internal state in uncontrolled mode", async () => {
    const user = userEvent.setup();

    render(<Sidebar title="Workspace" items={ITEMS} defaultCollapsed />);

    const toggleButton = screen.getByRole("button", { name: /toggle sidebar/i });
    expect(toggleButton).toHaveTextContent(/expand/i);

    await user.click(toggleButton);
    expect(toggleButton).toHaveTextContent(/collapse/i);
  });

  it("uses controlled state when collapsed is provided", async () => {
    const user = userEvent.setup();
    const onToggle = vi.fn();

    const { rerender } = render(
      <Sidebar title="Workspace" items={ITEMS} collapsed onToggle={onToggle} />,
    );

    const toggleButton = screen.getByRole("button", { name: /toggle sidebar/i });
    expect(toggleButton).toHaveTextContent(/expand/i);

    await user.click(toggleButton);
    expect(onToggle).toHaveBeenCalledWith(false);
    expect(toggleButton).toHaveTextContent(/expand/i);

    rerender(
      <Sidebar title="Workspace" items={ITEMS} collapsed={false} onToggle={onToggle} />,
    );

    expect(toggleButton).toHaveTextContent(/collapse/i);
  });
});
