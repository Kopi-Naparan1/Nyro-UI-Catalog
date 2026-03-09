import React from "react";
import { cx } from "../../utils/cx";
import "./Spinner.css";

const SIZES = {
  sm: "1rem",
  md: "1.5rem",
  lg: "2rem",
};

/*
 * Function: Shows a loading indicator with an accessible status label.
 * Usage: <Spinner label="Loading dashboard" />
 */
export default function Spinner({
  size = "md",
  label = "Loading",
  inline = false,
  className,
  style,
  ...rest
}) {
  const resolvedSize = SIZES[size] || size;

  return (
    <span
      className={cx(
        "ui-spinner",
        {
          "ui-spinner--inline": inline,
        },
        className,
      )}
      style={{ "--ui-spinner-size": resolvedSize, ...style }}
      role="status"
      aria-live="polite"
      {...rest}
    >
      <span className="ui-spinner__dot" aria-hidden="true" />
      <span className="ui-visually-hidden">{label}</span>
    </span>
  );
}

