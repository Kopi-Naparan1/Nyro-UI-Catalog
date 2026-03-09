import React from "react";
import { Button } from "../../buttons/index.js";
import { Spinner } from "../../feedback/index.js";
import { Stack } from "../../layout/index.js";
import { Badge, Heading, Text } from "../../typography/index.js";
import { cx } from "../../utils/cx";

/*
 * Function: Renders a page header pattern with actions, status badge, and loading/empty states.
 * Usage: <PageHeaderActions title="Invoices" onPrimaryAction={() => {}} />
 */
export default function PageHeaderActions({
  variant = "standard",
  state = "default",
  title = "Revenue dashboard",
  subtitle = "Track collections, cash flow, and account health.",
  badgeLabel = "Updated 2m ago",
  badgeVariant = "brand",
  primaryActionLabel = "Create report",
  secondaryActionLabel = "Export CSV",
  onPrimaryAction,
  onSecondaryAction,
  actions,
  className,
  style,
  ...rest
}) {
  const safeState = ["default", "loading", "empty"].includes(state) ? state : "default";
  const isLoading = safeState === "loading";
  const isEmpty = safeState === "empty";

  return (
    <section
      className={cx(
        "ui-pattern",
        "ui-pattern-page-header",
        {
          "ui-pattern--compact": variant === "compact",
        },
        className,
      )}
      style={style}
      {...rest}
    >
      <div className="ui-pattern-page-header__meta">
        <div className="ui-pattern-page-header__title-row">
          <Heading as="h3" size={variant === "compact" ? "sm" : "md"}>
            {title}
          </Heading>
          <Badge size="sm" variant={badgeVariant}>
            {badgeLabel}
          </Badge>
        </div>
        <Text className="ui-pattern-page-header__subtitle">{subtitle}</Text>

        {isLoading ? (
          <Stack direction="row" gap="sm" align="center">
            <Spinner inline size="sm" label="Loading page header" />
            <Text size="sm" tone="muted">
              Fetching latest summary...
            </Text>
          </Stack>
        ) : null}
        {isEmpty ? (
          <Text size="sm" tone="muted">
            No records match the current filter set.
          </Text>
        ) : null}
      </div>

      {actions || (
        <div className="ui-pattern__actions">
          <Button variant="outline" size={variant === "compact" ? "sm" : "md"} onClick={onSecondaryAction} disabled={isLoading}>
            {secondaryActionLabel}
          </Button>
          <Button size={variant === "compact" ? "sm" : "md"} onClick={onPrimaryAction} disabled={isLoading}>
            {primaryActionLabel}
          </Button>
        </div>
      )}
    </section>
  );
}