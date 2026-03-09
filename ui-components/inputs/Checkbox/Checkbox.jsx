import React, { useId } from "react";
import { cx } from "../../utils/cx";
import "./Checkbox.css";

/*
 * Function: Renders a checkbox input with label, helper text, and error support.
 * Usage: <Checkbox label="Enable alerts" defaultChecked />
 */
export default function Checkbox({
  label,
  helperText,
  error,
  required = false,
  disabled = false,
  id,
  className,
  style,
  ...rest
}) {
  const generatedId = useId();
  const checkboxId = id || `ui-checkbox-${generatedId}`;
  const helperId = helperText ? `${checkboxId}-helper` : undefined;
  const errorId = error ? `${checkboxId}-error` : undefined;

  return (
    <div className={cx("ui-check-field", className)} style={style}>
      <label className="ui-check-field__row" htmlFor={checkboxId}>
        <input
          id={checkboxId}
          type="checkbox"
          className="ui-check-field__control"
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={[helperId, errorId].filter(Boolean).join(" ") || undefined}
          {...rest}
        />
        <span className="ui-check-field__label">{label}</span>
      </label>
      {helperText ? (
        <p id={helperId} className="ui-check-field__helper">
          {helperText}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="ui-check-field__error">
          {error}</p>
      ) : null}
    </div>
  );
}

