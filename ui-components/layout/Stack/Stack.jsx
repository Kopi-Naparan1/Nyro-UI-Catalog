import React from "react";
import { cx } from "../../utils/cx";
import "./Stack.css";

const DIRECTIONS = ["row", "column", "row-reverse", "column-reverse"];
const GAPS = {
  none: "0",
  sm: "var(--ui-space-2)",
  md: "var(--ui-space-4)",
  lg: "var(--ui-space-6)",
};

/*
 * Function: Creates vertical or horizontal flex layouts with consistent spacing.
 * Usage: <Stack direction="row" gap="sm">...</Stack>
 */
export default function Stack({
  as = "div",
  direction = "column",
  gap = "md",
  align = "stretch",
  justify = "flex-start",
  wrap = false,
  className,
  style,
  children,
  ...rest
}) {
  const Tag = as;

  const mergedStyle = {
    "--ui-stack-gap": GAPS[gap] || gap,
    alignItems: align,
    justifyContent: justify,
    ...style,
  };

  return (
    <Tag
      className={cx(
        "ui-stack",
        `ui-stack--${DIRECTIONS.includes(direction) ? direction : "column"}`,
        {
          "ui-stack--wrap": wrap,
        },
        className,
      )}
      style={mergedStyle}
      {...rest}
    >
      {children}
    </Tag>
  );
}

