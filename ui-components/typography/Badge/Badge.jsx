import React from "react";
import { cx } from "../../utils/cx";
import "./Badge.css";

const VARIANTS = ["neutral", "brand", "success", "warning", "danger"];
const SIZES = ["sm", "md", "lg"];

/*
 * Function: Displays a small status label/chip with tone and size variants.
 * Usage: <Badge variant="success">Active</Badge>
 */
export default function Badge({
  variant = "neutral",
  size = "md",
  pill = false,
  className,
  style,
  children,
  ...rest
}) {
  return (
    <span
      className={cx(
        "ui-badge",
        `ui-badge--${VARIANTS.includes(variant) ? variant : "neutral"}`,
        `ui-badge--${SIZES.includes(size) ? size : "md"}`,
        {
          "ui-badge--pill": pill,
        },
        className,
      )}
      style={style}
      {...rest}
    >
      {children}
    </span>
  );
}

