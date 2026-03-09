import React from "react";
import { Button } from "../../buttons/index.js";
import { Spinner } from "../../feedback/index.js";
import { Heading, Link, Text } from "../../typography/index.js";
import { cx } from "../../utils/cx";

/*
 * Function: Renders an error-state panel pattern with retry and optional support link.
 * Usage: <ErrorStatePanel onRetry={reloadData} />
 */
export default function ErrorStatePanel({
  variant = "standard",
  state = "error",
  title = "Something went wrong",
  description = "We could not load the requested data.",
  retryLabel = "Try again",
  supportLabel = "Contact support",
  supportHref = "#",
  onRetry,
  className,
  style,
  ...rest
}) {
  const safeState = ["default", "loading", "error"].includes(state) ? state : "error";
  const isLoading = safeState === "loading";

  return (
    <section
      className={cx(
        "ui-pattern",
        "ui-pattern-error",
        {
          "ui-pattern--compact": variant === "compact",
        },
        className,
      )}
      style={style}
      {...rest}
    >
      {isLoading ? (
        <Spinner label="Retrying request" />
      ) : (
        <>
          <div className="ui-pattern-error__icon" aria-hidden="true">
            !
          </div>
          <Heading as="h3" size={variant === "compact" ? "sm" : "md"}>
            {title}
          </Heading>
          <Text tone="muted">{description}</Text>
          <div className="ui-pattern__actions">
            <Button variant="danger" size={variant === "compact" ? "sm" : "md"} onClick={onRetry}>
              {retryLabel}
            </Button>
            {supportHref ? (
              <Link href={supportHref} tone="brand" underline="hover">
                {supportLabel}
              </Link>
            ) : null}
          </div>
        </>
      )}
    </section>
  );
}