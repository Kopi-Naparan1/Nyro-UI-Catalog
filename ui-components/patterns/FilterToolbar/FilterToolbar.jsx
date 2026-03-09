import React, { useState } from "react";
import { Button } from "../../buttons/index.js";
import { Spinner } from "../../feedback/index.js";
import { Select, TextInput } from "../../inputs/index.js";
import { Text } from "../../typography/index.js";
import { cx } from "../../utils/cx";

const DEFAULT_OPTIONS = [
  { label: "All statuses", value: "all" },
  { label: "Draft", value: "draft" },
  { label: "Submitted", value: "submitted" },
  { label: "Paid", value: "paid" },
];

/*
 * Function: Renders a filter toolbar pattern with search, select, and apply/clear actions.
 * Usage: <FilterToolbar onApplyFilters={(values) => console.log(values)} />
 */
export default function FilterToolbar({
  variant = "standard",
  state = "default",
  searchValue,
  statusValue,
  statusOptions = DEFAULT_OPTIONS,
  searchPlaceholder = "Search by invoice, customer, or owner",
  dateSlot,
  onSearchChange,
  onStatusChange,
  onApplyFilters,
  onClearFilters,
  className,
  style,
  ...rest
}) {
  const safeState = ["default", "loading", "empty"].includes(state) ? state : "default";
  const isLoading = safeState === "loading";
  const isEmpty = safeState === "empty";

  const isSearchControlled = typeof searchValue === "string";
  const isStatusControlled = typeof statusValue === "string";

  const [internalSearchValue, setInternalSearchValue] = useState("");
  const [internalStatusValue, setInternalStatusValue] = useState(statusOptions[0]?.value || "all");

  const resolvedSearchValue = isSearchControlled ? searchValue : internalSearchValue;
  const resolvedStatusValue = isStatusControlled ? statusValue : internalStatusValue;

  const handleSearchChange = (event) => {
    const next = event.target.value;
    if (!isSearchControlled) {
      setInternalSearchValue(next);
    }
    onSearchChange?.(next);
  };

  const handleStatusChange = (event) => {
    const next = event.target.value;
    if (!isStatusControlled) {
      setInternalStatusValue(next);
    }
    onStatusChange?.(next);
  };

  const handleApply = () => {
    onApplyFilters?.({ search: resolvedSearchValue, status: resolvedStatusValue });
  };

  const handleClear = () => {
    if (!isSearchControlled) {
      setInternalSearchValue("");
    }
    if (!isStatusControlled) {
      setInternalStatusValue(statusOptions[0]?.value || "all");
    }

    onClearFilters?.();
  };

  return (
    <section
      className={cx(
        "ui-pattern",
        "ui-pattern-toolbar",
        {
          "ui-pattern--compact": variant === "compact",
        },
        className,
      )}
      style={style}
      {...rest}
    >
      <div className="ui-pattern-toolbar__row">
        <TextInput
          label="Search"
          value={resolvedSearchValue}
          onChange={handleSearchChange}
          placeholder={searchPlaceholder}
          disabled={isLoading}
        />
        <Select
          label="Status"
          value={resolvedStatusValue}
          onChange={handleStatusChange}
          options={statusOptions}
          disabled={isLoading}
        />
        <div className="ui-pattern-toolbar__slot">
          <p className="ui-pattern-toolbar__slot-label">Date range</p>
          {dateSlot || <Text tone="muted">Last 30 days</Text>}
        </div>
        <div className="ui-pattern-toolbar__actions">
          <Button variant="ghost" size={variant === "compact" ? "sm" : "md"} onClick={handleClear} disabled={isLoading}>
            Clear
          </Button>
          <Button size={variant === "compact" ? "sm" : "md"} onClick={handleApply} disabled={isLoading}>
            Apply
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="ui-pattern__actions">
          <Spinner inline size="sm" label="Applying filters" />
          <Text size="sm" tone="muted">
            Updating results...
          </Text>
        </div>
      ) : null}
      {isEmpty ? (
        <Text size="sm" tone="muted">
          No filter values are active yet.
        </Text>
      ) : null}
    </section>
  );
}