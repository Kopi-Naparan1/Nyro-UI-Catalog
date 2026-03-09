import React from "react";
import { Button } from "../../buttons/index.js";
import { Spinner } from "../../feedback/index.js";
import { Heading, Text } from "../../typography/index.js";
import { cx } from "../../utils/cx";

/*
 * Function: Renders an empty-state panel pattern with primary and secondary actions.
 * Usage: <EmptyStatePanel title="No projects" primaryActionLabel="Create project" />
 */
export default function EmptyStatePanel({
  variant = "standard",
  state = "empty",
  icon = "0",
  title = "Nothing here yet",
  description = "Add your first item to get started.",
  primaryActionLabel = "Create item",
  secondaryActionLabel = "Learn more",
  onPrimaryAction,
  onSecondaryAction,
  className,
  style,
  ...rest
}) {
  const safeState = ["default", "loading", "empty"].includes(state) ? state : "empty";
  const isLoading = safeState === "loading";

  return (
    <section
      className={cx(
        "ui-pattern",
        "ui-pattern-empty",
        {
          "ui-pattern--compact": variant === "compact",
        },
        className,
      )}
      style={style}
      {...rest}
    >
      {isLoading ? (
        <Spinner label="Loading empty state" />
      ) : (
        <>
          <div className="ui-pattern-empty__icon" aria-hidden="true">
            {icon}
          </div>
          <Heading as="h3" size={variant === "compact" ? "sm" : "md"}>
            {title}
          </Heading>
          <Text tone="muted">{description}</Text>
          <div className="ui-pattern__actions">
            <Button size={variant === "compact" ? "sm" : "md"} onClick={onPrimaryAction}>
              {primaryActionLabel}
            </Button>
            {secondaryActionLabel ? (
              <Button variant="ghost" size={variant === "compact" ? "sm" : "md"} onClick={onSecondaryAction}>
                {secondaryActionLabel}
              </Button>
            ) : null}
          </div>
        </>
      )}
    </section>
  );
}