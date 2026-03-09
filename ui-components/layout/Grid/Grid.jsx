import React from "react";
import { cx } from "../../utils/cx";
import "./Grid.css";

const GAPS = {
  none: "0",
  sm: "var(--ui-space-2)",
  md: "var(--ui-space-4)",
  lg: "var(--ui-space-6)",
};

/*
 * Function: Creates grid layouts with fixed columns or responsive auto-fit behavior.
 * Usage: <Grid autoFit minColumnWidth="16rem">...</Grid>
 */
export default function Grid({
  as = "div",
  columns = 3,
  gap = "md",
  minColumnWidth = "15rem",
  autoFit = false,
  className,
  style,
  children,
  ...rest
}) {
  const Tag = as;
  const template = autoFit
    ? `repeat(auto-fit, minmax(${minColumnWidth}, 1fr))`
    : typeof columns === "number"
      ? `repeat(${columns}, minmax(0, 1fr))`
      : columns;

  const mergedStyle = {
    "--ui-grid-gap": GAPS[gap] || gap,
    gridTemplateColumns: template,
    ...style,
  };

  return (
    <Tag className={cx("ui-grid", className)} style={mergedStyle} {...rest}>
      {children}
    </Tag>
  );
}

