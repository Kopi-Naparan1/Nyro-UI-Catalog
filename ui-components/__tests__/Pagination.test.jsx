import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "../navigation/Pagination/Pagination";

describe("Pagination", () => {
  it("renders compact range with ellipsis and calls onPageChange", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(<Pagination currentPage={5} totalPages={10} onPageChange={onPageChange} siblingCount={1} />);

    expect(screen.getAllByText("...").length).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("button", { name: "5" })).toHaveAttribute("aria-current", "page");

    await user.click(screen.getByRole("button", { name: "6" }));
    expect(onPageChange).toHaveBeenCalledWith(6);

    await user.click(screen.getByRole("button", { name: /next/i }));
    expect(onPageChange).toHaveBeenCalledWith(6);
  });

  it("disables previous button on first page", () => {
    render(<Pagination currentPage={1} totalPages={3} onPageChange={vi.fn()} />);

    expect(screen.getByRole("button", { name: /prev/i })).toBeDisabled();
  });

  it("clamps invalid page values to a safe single-page state", () => {
    render(<Pagination currentPage={-9} totalPages={0} onPageChange={vi.fn()} siblingCount={-4} />);

    expect(screen.getByRole("button", { name: "1" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: /prev/i })).toBeDisabled();
    expect(screen.getByRole("button", { name: /next/i })).toBeDisabled();
  });
});
