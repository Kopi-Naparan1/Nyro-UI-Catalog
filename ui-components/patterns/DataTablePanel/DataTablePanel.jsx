import React from "react";
import { Spinner } from "../../feedback/index.js";
import { Pagination } from "../../navigation/index.js";
import { Button, IconButton } from "../../buttons/index.js";
import { Heading, Text } from "../../typography/index.js";
import { cx } from "../../utils/cx";
import EmptyStatePanel from "../EmptyStatePanel/EmptyStatePanel";

const DEFAULT_COLUMNS = [
  { key: "invoice", label: "Invoice" },
  { key: "owner", label: "Owner" },
  { key: "status", label: "Status" },
  { key: "amount", label: "Amount" },
];

const DEFAULT_ROWS = [
  { id: "INV-1001", invoice: "INV-1001", owner: "A. Cruz", status: "Paid", amount: "$1,250.00" },
  { id: "INV-1002", invoice: "INV-1002", owner: "S. Khan", status: "Pending", amount: "$890.00" },
  { id: "INV-1003", invoice: "INV-1003", owner: "T. Miller", status: "Draft", amount: "$420.00" },
];

/*
 * Function: Renders a data-table panel pattern with loading/empty states and pagination.
 * Usage: <DataTablePanel columns={columns} rows={rows} onPageChange={setPage} />
 */
export default function DataTablePanel({
  variant = "standard",
  state = "default",
  title = "Recent invoices",
  summary = "3 of 3 invoices shown",
  columns = DEFAULT_COLUMNS,
  rows = DEFAULT_ROWS,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  onRefresh,
  onExport,
  emptyTitle = "No invoices to display",
  emptyDescription = "Try widening your date range or removing filters.",
  className,
  style,
  ...rest
}) {
  const safeState = ["default", "loading", "empty"].includes(state) ? state : "default";
  const isLoading = safeState === "loading";
  const isEmpty = safeState === "empty" || rows.length === 0;

  return (
    <section
      className={cx(
        "ui-pattern",
        "ui-pattern-table",
        {
          "ui-pattern--compact": variant === "compact",
        },
        className,
      )}
      style={style}
      {...rest}
    >
      <header className="ui-pattern-table__header">
        <div>
          <Heading as="h3" size={variant === "compact" ? "sm" : "md"}>
            {title}
          </Heading>
          <p className="ui-pattern-table__summary">{summary}</p>
        </div>
        <div className="ui-pattern__actions">
          <IconButton ariaLabel="Refresh table" variant="ghost" size={variant === "compact" ? "sm" : "md"} onClick={onRefresh}>
            R
          </IconButton>
          <Button variant="outline" size={variant === "compact" ? "sm" : "md"} onClick={onExport}>
            Export
          </Button>
        </div>
      </header>

      {isLoading ? (
        <div className="ui-pattern-table__loading">
          <Spinner label="Loading table records" />
        </div>
      ) : null}

      {!isLoading && isEmpty ? (
        <div className="ui-pattern-table__empty">
          <EmptyStatePanel
            variant={variant}
            title={emptyTitle}
            description={emptyDescription}
            primaryActionLabel="Create invoice"
          />
        </div>
      ) : null}

      {!isLoading && !isEmpty ? (
        <>
          <div className="ui-pattern-table__wrap">
            <table className="ui-pattern-table__table">
              <thead>
                <tr>
                  {columns.map((column) => (
                    <th key={column.key}>{column.label}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.id || row.invoice || `row-${index}`}>
                    {columns.map((column) => (
                      <td key={`${row.id || index}-${column.key}`}>
                        {typeof column.render === "function" ? column.render(row) : row[column.key]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <footer className="ui-pattern-table__footer">
            <Text size="sm" tone="muted">
              Page {currentPage} of {Math.max(1, totalPages)}
            </Text>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              siblingCount={1}
              onPageChange={onPageChange}
            />
          </footer>
        </>
      ) : null}
    </section>
  );
}