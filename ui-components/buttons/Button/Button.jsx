import React from "react";
import { cx } from "../../utils/cx";
import "./Button.css";

const VARIANTS = ["primary", "secondary", "outline", "ghost", "danger"];
const SIZES = ["sm", "md", "lg"];

/*
 * Function: Renders a styled action button with variants, sizes, icons, and loading support.
 * Usage: <Button variant="primary">Save</Button>
 */
export default function Button({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  startIcon,
  endIcon,
  disabled = false,
  type = "button",
  className,
  style,
  children = "Button",
  ...rest
}) {
  const resolvedVariant = VARIANTS.includes(variant) ? variant : "primary";
  const resolvedSize = SIZES.includes(size) ? size : "md";
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      className={cx(
        "ui-button",
        `ui-button--${resolvedVariant}`,
        `ui-button--${resolvedSize}`,
        {
          "ui-button--full-width": fullWidth,
          "ui-button--loading": loading,
        },
        className,
      )}
      style={style}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading ? <span className="ui-button__spinner" aria-hidden="true" /> : null}
      {!loading && startIcon ? <span className="ui-button__icon">{startIcon}</span> : null}
      <span className="ui-button__label">{children}</span>
      {!loading && endIcon ? <span className="ui-button__icon">{endIcon}</span> : null}
    </button>
  );
}

