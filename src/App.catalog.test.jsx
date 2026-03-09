import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, vi } from "vitest";
import App from "./App";
import { CATALOG_GROUPS, COMPONENT_GUIDES } from "./catalog/catalogMeta";

const originalClipboard = navigator.clipboard;

function setClipboard(writeText) {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
}

afterEach(() => {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: originalClipboard,
  });
  vi.restoreAllMocks();
});

describe("App catalog coverage", () => {
  it("renders sticky catalog index links for every component section", () => {
    render(<App />);

    const index = screen.getByRole("navigation", { name: /nyro catalog index/i });
    const links = within(index).getAllByRole("link");

    expect(links).toHaveLength(35);
    expect(within(index).getByRole("link", { name: "Button" })).toHaveAttribute("href", "#button");
    expect(within(index).getByRole("link", { name: "Modal" })).toHaveAttribute("href", "#modal");
    expect(within(index).getByRole("link", { name: "TextInput" })).toHaveAttribute("href", "#text-input");
    expect(within(index).getByRole("link", { name: "Grid" })).toHaveAttribute("href", "#grid");
    expect(within(index).getByRole("link", { name: "Link" })).toHaveAttribute("href", "#link");
    expect(within(index).getByRole("link", { name: "AuthLoginForm" })).toHaveAttribute("href", "#auth-login-form");
    expect(within(index).getByRole("link", { name: "DataTablePanel" })).toHaveAttribute("href", "#data-table-panel");
    expect(within(index).getByRole("link", { name: "ProfileSummaryCard" })).toHaveAttribute(
      "href",
      "#profile-summary-card",
    );

    CATALOG_GROUPS.forEach((group) => {
      group.items.forEach((item) => {
        expect(document.getElementById(item.id)).toBeInTheDocument();
      });
    });
  }, 60000);

  it("renders every component section heading in organized order", () => {
    render(<App />);

    const expectedHeadings = [
      "Button",
      "IconButton",
      "Alert",
      "Modal",
      "Spinner",
      "Tooltip",
      "TextInput",
      "TextArea",
      "Select",
      "Checkbox",
      "RadioButton",
      "Container",
      "Grid",
      "Stack",
      "Card",
      "Navbar",
      "Sidebar",
      "Breadcrumb",
      "Pagination",
      "Heading",
      "Text",
      "Badge",
      "Link",
      "AuthLoginForm",
      "AuthPasswordResetForm",
      "AppHeaderBar",
      "AppSidebarShell",
      "PageHeaderActions",
      "FilterToolbar",
      "DataTablePanel",
      "EmptyStatePanel",
      "ErrorStatePanel",
      "SettingsFormCard",
      "BillingPlanCard",
      "ProfileSummaryCard",
    ];

    expectedHeadings.forEach((heading) => {
      expect(screen.getByRole("heading", { name: heading, level: 3 })).toBeInTheDocument();
    });
  }, 60000);

  it("renders Nyro branding and guidance + copy controls for each component section", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /nyro's ui catalog/i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /nyro catalog index/i })).toBeInTheDocument();
    expect(screen.getByText("Use-case guidance")).toBeInTheDocument();
    expect(screen.getByText("Copy-ready snippets")).toBeInTheDocument();

    const sectionItems = CATALOG_GROUPS.flatMap((group) => group.items);
    const primaryCopyButtons = document.querySelectorAll('button[aria-label^="Copy snippet for "]');
    const usageCopyButtons = document.querySelectorAll('button[aria-label^="Copy usage snippet for "]');

    expect(document.querySelectorAll(".app-component-section")).toHaveLength(sectionItems.length);
    expect(document.querySelectorAll(".app-section-guide")).toHaveLength(sectionItems.length);
    expect(primaryCopyButtons).toHaveLength(sectionItems.length);
    expect(usageCopyButtons).toHaveLength(12);
    expect(screen.getByRole("button", { name: "Copy snippet for Button" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy snippet for ProfileSummaryCard" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Copy usage snippet for DataTablePanel" })).toBeInTheDocument();
  }, 60000);

  it("defines guidance metadata for each catalog section id", () => {
    const sectionItems = CATALOG_GROUPS.flatMap((group) => group.items);
    const patternIds = new Set([
      "auth-login-form",
      "auth-password-reset-form",
      "app-header-bar",
      "app-sidebar-shell",
      "page-header-actions",
      "filter-toolbar",
      "data-table-panel",
      "empty-state-panel",
      "error-state-panel",
      "settings-form-card",
      "billing-plan-card",
      "profile-summary-card",
    ]);

    expect(Object.keys(COMPONENT_GUIDES)).toHaveLength(sectionItems.length);
    sectionItems.forEach((item) => {
      const guide = COMPONENT_GUIDES[item.id];
      expect(guide).toBeDefined();
      expect(guide.whenToUse).toBeTruthy();
      expect(guide.recommendedFor).toBeTruthy();
      expect(guide.layoutRecommendation).toBeTruthy();
      expect(guide.snippetTitle).toBeTruthy();
      expect(guide.snippetCode).toBeTruthy();
      expect(guide.notes).toBeTruthy();

      if (patternIds.has(item.id)) {
        expect(guide.secondarySnippetTitle).toBeTruthy();
        expect(guide.secondarySnippetCode).toBeTruthy();
      }
    });
  });

  it("copies snippet text and shows success feedback", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard(writeText);
    render(<App />);

    const buttonSection = screen.getByRole("heading", { name: "Button", level: 3 }).closest(".app-component-section");
    await user.click(within(buttonSection).getByRole("button", { name: "Copy snippet for Button" }));

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText.mock.calls[0][0]).toContain('justify="flex-end"');
    expect(within(buttonSection).getByText("Snippet copied to clipboard.")).toBeInTheDocument();
  }, 60000);

  it("copies usage snippet text for composed patterns", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard(writeText);
    render(<App />);

    const profileSection = screen
      .getByRole("heading", { name: "ProfileSummaryCard", level: 3 })
      .closest(".app-component-section");
    await user.click(within(profileSection).getByRole("button", { name: "Copy usage snippet for ProfileSummaryCard" }));

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText.mock.calls[0][0]).toContain("ProfileSummaryCard");
    expect(within(profileSection).getAllByText("Snippet copied to clipboard.").length).toBeGreaterThan(0);
  }, 25000);

  it("shows copy failure feedback when clipboard write fails", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockRejectedValue(new Error("Clipboard denied"));
    setClipboard(writeText);
    render(<App />);

    const modalSection = screen.getByRole("heading", { name: "Modal", level: 3 }).closest(".app-component-section");
    await user.click(within(modalSection).getByRole("button", { name: "Copy snippet for Modal" }));

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(
      within(modalSection).getByText("Unable to copy automatically. Select and copy the snippet manually."),
    ).toBeInTheDocument();
  }, 25000);

  it("renders representative variant labels and key states", () => {
    render(<App />);

    const buttonSection = screen.getByRole("heading", { name: "Button", level: 3 }).closest(".app-component-section");
    const modalSection = screen.getByRole("heading", { name: "Modal", level: 3 }).closest(".app-component-section");
    const selectSection = screen.getByRole("heading", { name: "Select", level: 3 }).closest(".app-component-section");
    const gridSection = screen.getByRole("heading", { name: "Grid", level: 3 }).closest(".app-component-section");
    const profileSection = screen
      .getByRole("heading", { name: "ProfileSummaryCard", level: 3 })
      .closest(".app-component-section");

    expect(within(buttonSection).getByText("Button variant: danger")).toBeInTheDocument();
    expect(within(modalSection).getByText("Modal behavior: overlay off / esc off")).toBeInTheDocument();
    expect(within(selectSection).getByText("Select error message")).toBeInTheDocument();
    expect(within(gridSection).getByText("Grid gap: lg")).toBeInTheDocument();
    expect(within(profileSection).getByText("ProfileSummaryCard state: loading")).toBeInTheDocument();
    expect(screen.getByText("AuthLoginForm state: error")).toBeInTheDocument();
    expect(screen.getByText("DataTablePanel state: empty")).toBeInTheDocument();

    const loadingItem = screen.getByText("Button loading").closest(".app-demo-item");
    const firstPageItem = screen.getByText("Pagination boundary: first page").closest(".app-demo-item");

    expect(within(loadingItem).getByRole("button", { name: /loading/i })).toBeDisabled();
    expect(screen.getByLabelText("TextInput disabled")).toBeDisabled();
    expect(screen.getByText("TextInput error message")).toBeInTheDocument();
    expect(within(firstPageItem).getByRole("button", { name: /prev/i })).toBeDisabled();
  }, 60000);
});
