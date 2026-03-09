import React from "react";
import { cx } from "../../utils/cx";
import "./Container.css";

const MAX_WIDTHS = {
  xs: "30rem",
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  full: "100%",
  none: "none",
};

const PADDINGS = {
  none: "0",
  sm: "var(--ui-space-3)",
  md: "var(--ui-space-4)",
  lg: "var(--ui-space-6)",
};

/*
 * Function: Constrains layout width and horizontal padding for page sections.
 * Usage: <Container maxWidth="xl">...</Container>
 */
export default function Container({
  as = "div",
  maxWidth = "lg",
  padding = "md",
  center = true,
  className,
  style,
  children,
  ...rest
}) {
  const Tag = as;

  const mergedStyle = {
    "--ui-container-max-width": MAX_WIDTHS[maxWidth] || maxWidth,
    "--ui-container-padding": PADDINGS[padding] || padding,
    ...style,
  };

  return (
    <Tag
      className={cx(
        "ui-container",
        {
          "ui-container--center": center,
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

