import React from "react";
import { cx } from "../../utils/cx";
import "./Pagination.css";

function createPagination(currentPage, totalPages, siblingCount) {
  const totalPageNumbers = siblingCount * 2 + 5;

  if (totalPages <= totalPageNumbers) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftDots = leftSibling > 2;
  const showRightDots = rightSibling < totalPages - 1;

  if (!showLeftDots && showRightDots) {
    const leftRange = Array.from({ length: 3 + siblingCount * 2 }, (_, index) => index + 1);
    return [...leftRange, "dots", totalPages];
  }

  if (showLeftDots && !showRightDots) {
    const rightRange = Array.from(
      { length: 3 + siblingCount * 2 },
      (_, index) => totalPages - (2 + siblingCount * 2) + index,
    );
    return [1, "dots", ...rightRange];
  }

  const middleRange = Array.from(
    { length: rightSibling - leftSibling + 1 },
    (_, index) => leftSibling + index,
  );

  return [1, "dots", ...middleRange, "dots-end", totalPages];
}

function toSafeInteger(value, fallback) {
  const numericValue = Number(value);

  if (!Number.isFinite(numericValue)) {
    return fallback;
  }

  return Math.floor(numericValue);
}

/*
 * Function: Renders page controls and ellipsis ranges for large page counts.
 * Usage: <Pagination currentPage={page} totalPages={12} onPageChange={setPage} />
 */
export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  siblingCount = 1,
  className,
  style,
  ...rest
}) {
  const safeTotalPages = Math.max(1, toSafeInteger(totalPages, 1));
  const safeSiblingCount = Math.max(0, toSafeInteger(siblingCount, 1));
  const safeCurrentPage = Math.min(
    Math.max(toSafeInteger(currentPage, 1), 1),
    safeTotalPages,
  );
  const pages = createPagination(safeCurrentPage, safeTotalPages, safeSiblingCount);

  const setPage = (page) => {
    if (page >= 1 && page <= safeTotalPages && page !== safeCurrentPage) {
      onPageChange?.(page);
    }
  };

  return (
    <nav className={cx("ui-pagination", className)} style={style} aria-label="Pagination" {...rest}>
      <button
        type="button"
        className="ui-pagination__button"
        disabled={safeCurrentPage === 1}
        onClick={() => setPage(safeCurrentPage - 1)}
      >
        Prev
      </button>
      <ul className="ui-pagination__list">
        {pages.map((page, index) => {
          if (typeof page !== "number") {
            return (
              <li key={`${page}-${index}`} className="ui-pagination__dots" aria-hidden="true">
                ...
              </li>
            );
          }

          return (
            <li key={page}>
              <button
                type="button"
                className={cx("ui-pagination__button", {
                  "ui-pagination__button--active": page === safeCurrentPage,
                })}
                aria-current={page === safeCurrentPage ? "page" : undefined}
                onClick={() => setPage(page)}
              >
                {page}
              </button>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        className="ui-pagination__button"
        disabled={safeCurrentPage === safeTotalPages}
        onClick={() => setPage(safeCurrentPage + 1)}
      >
        Next
      </button>
    </nav>
  );
}
