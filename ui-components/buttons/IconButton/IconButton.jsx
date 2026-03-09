import React from "react";
import { cx } from "../../utils/cx";
import "./IconButton.css";

const VARIANTS = ["primary", "secondary", "outline", "ghost", "danger"];
const SIZES = ["sm", "md", "lg"];

/*
 * Function: Renders a compact icon-only button for toolbar or utility actions.
 * Usage: <IconButton ariaLabel="Open settings">?</IconButton>
 */
export default function IconButton({
  variant = "ghost",
  size = "md",
  ariaLabel = "Icon button",
  loading = false,
  disabled = false,
  className,
  style,
  children,
  type = "button",
  ...rest
}) {
  const resolvedVariant = VARIANTS.includes(variant) ? variant : "ghost";
  const resolvedSize = SIZES.includes(size) ? size : "md";

  return (
    <button
      type={type}
      className={cx(
        "ui-icon-button",
        `ui-icon-button--${resolvedVariant}`,
        `ui-icon-button--${resolvedSize}`,
        {
          "ui-icon-button--loading": loading,
        },
        className,
      )}
      style={style}
      aria-label={ariaLabel}
      aria-busy={loading || undefined}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? <span className="ui-icon-button__spinner" aria-hidden="true" /> : children}
    </button>
  );
}

