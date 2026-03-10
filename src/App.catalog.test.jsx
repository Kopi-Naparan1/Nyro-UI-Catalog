import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, vi } from "vitest";
import App from "./App";

const originalClipboard = navigator.clipboard;

function setClipboard(writeText) {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: { writeText },
  });
}

beforeEach(() => {
  window.localStorage.clear();
});

afterEach(() => {
  Object.defineProperty(navigator, "clipboard", {
    configurable: true,
    value: originalClipboard,
  });
  vi.restoreAllMocks();
});

describe("Spendlytics UI Catalog", () => {
  it("shows the studio workflow by default", () => {
    render(<App />);

    expect(screen.getByRole("heading", { name: /build a page, not just a section\./i, level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Starter Recipes", level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Theme Studio", level: 2 })).toBeInTheDocument();
    expect(screen.getByText("9 sections in page")).toBeInTheDocument();
  }, 30000);

  it("applies a different starter recipe in studio mode", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: /startup waitlist/i }));

    expect(screen.getByText("7 sections in page")).toBeInTheDocument();
    expect(screen.queryByText("9 sections in page")).not.toBeInTheDocument();
  }, 30000);

  it("copies the exported landing page jsx from studio mode", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard(writeText);
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Copy LandingPage.jsx" }));

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText.mock.calls[0][0]).toContain("export default function LandingPage()");
    expect(screen.getByText("Last copied: jsx")).toBeInTheDocument();
  }, 30000);

  it("filters website sections with search", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Website Sections" }));
    await user.type(screen.getByRole("searchbox", { name: /search sections/i }), "pricing");

    expect(screen.getByRole("heading", { name: "Pricing", level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /3 tier pricing cards/i, level: 3 })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /hero with headline, description, cta buttons, and image/i, level: 3 })).not.toBeInTheDocument();
  }, 30000);

  it("switches to foundation kit mode", async () => {
    const user = userEvent.setup();
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Foundation Kit" }));

    expect(screen.getByRole("heading", { name: "Buttons", level: 2 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Button", level: 3 })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Starter Recipes", level: 2 })).not.toBeInTheDocument();
  }, 30000);

  it("still copies jsx snippets for website sections", async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    setClipboard(writeText);
    render(<App />);

    await user.click(screen.getByRole("button", { name: "Website Sections" }));

    const section = screen
      .getByRole("heading", { name: /hero with headline, description, cta buttons, and image/i, level: 3 })
      .closest(".app-component-section");

    await user.click(within(section).getByRole("button", { name: "Copy JSX for HeroHeadlineImage" }));

    expect(writeText).toHaveBeenCalledTimes(1);
    expect(writeText.mock.calls[0][0]).toContain('import "./HeroHeadlineImage.css";');
    expect(within(section).getByText("Snippet copied to clipboard.")).toBeInTheDocument();
  }, 30000);
});
