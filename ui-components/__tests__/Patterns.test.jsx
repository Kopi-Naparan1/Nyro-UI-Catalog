import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  AppHeaderBar,
  AppSidebarShell,
  AuthLoginForm,
  AuthPasswordResetForm,
  BillingPlanCard,
  DataTablePanel,
  EmptyStatePanel,
  ErrorStatePanel,
  FilterToolbar,
  PageHeaderActions,
  ProfileSummaryCard,
  SettingsFormCard,
} from "../patterns/index.js";

describe("Patterns smoke render", () => {
  it("renders all composed pattern exports", () => {
    render(
      <div>
        <AuthLoginForm />
        <AuthPasswordResetForm />
        <AppHeaderBar />
        <AppSidebarShell />
        <PageHeaderActions />
        <FilterToolbar />
        <DataTablePanel />
        <EmptyStatePanel />
        <ErrorStatePanel />
        <SettingsFormCard />
        <BillingPlanCard />
        <ProfileSummaryCard />
      </div>,
    );

    expect(screen.getByRole("heading", { name: /sign in to your workspace/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /reset your password/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /revenue dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /recent invoices/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /workspace settings/i })).toBeInTheDocument();
  });
});

describe("AuthLoginForm", () => {
  it("submits values and supports loading/error states", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();

    const { rerender } = render(<AuthLoginForm onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/email/i), "admin@nyro.dev");
    await user.type(screen.getByLabelText(/password/i), "password123");
    await user.click(screen.getByRole("button", { name: /sign in/i }));

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit.mock.calls[0][0]).toMatchObject({
      email: "admin@nyro.dev",
      password: "password123",
      rememberMe: true,
    });

    rerender(<AuthLoginForm state="loading" />);
    const loadingButton = screen.getByRole("button", { name: /signing in/i });
    expect(loadingButton).toBeDisabled();

    rerender(<AuthLoginForm state="error" />);
    expect(screen.getByText(/authentication failed/i)).toBeInTheDocument();
  });
});

describe("FilterToolbar", () => {
  it("calls apply and clear callbacks with current values", async () => {
    const user = userEvent.setup();
    const onApplyFilters = vi.fn();
    const onClearFilters = vi.fn();

    const { rerender } = render(<FilterToolbar onApplyFilters={onApplyFilters} onClearFilters={onClearFilters} />);

    await user.type(screen.getByLabelText("Search"), "invoice");
    await user.selectOptions(screen.getByLabelText("Status"), "paid");
    await user.click(screen.getByRole("button", { name: "Apply" }));

    expect(onApplyFilters).toHaveBeenCalledWith({
      search: "invoice",
      status: "paid",
    });

    await user.click(screen.getByRole("button", { name: "Clear" }));
    expect(onClearFilters).toHaveBeenCalledTimes(1);

    rerender(<FilterToolbar state="loading" />);
    expect(screen.getByRole("button", { name: "Apply" })).toBeDisabled();
  });
});

describe("DataTablePanel", () => {
  it("renders table rows, empty state, and pagination callback", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    const { rerender } = render(
      <DataTablePanel
        currentPage={2}
        totalPages={4}
        rows={[
          { id: "INV-2001", invoice: "INV-2001", owner: "L. Tran", status: "Paid", amount: "$600" },
        ]}
        onPageChange={onPageChange}
      />,
    );

    expect(screen.getByText("INV-2001")).toBeInTheDocument();

    const panel = screen.getByRole("heading", { name: /recent invoices/i }).closest("section");
    await user.click(within(panel).getByRole("button", { name: "3" }));
    expect(onPageChange).toHaveBeenCalledWith(3);

    rerender(<DataTablePanel state="empty" rows={[]} />);
    expect(screen.getByText(/no invoices to display/i)).toBeInTheDocument();

    rerender(<DataTablePanel state="loading" />);
    expect(screen.getByText(/loading table records/i)).toBeInTheDocument();
  });
});
