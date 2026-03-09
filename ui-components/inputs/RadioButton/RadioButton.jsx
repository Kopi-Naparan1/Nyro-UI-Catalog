import React, { useId } from "react";
import { cx } from "../../utils/cx";
import "./RadioButton.css";

/*
 * Function: Renders one radio option; combine multiple using the same name.
 * Usage: <RadioButton name="plan" value="pro" label="Pro" />
 */
export default function RadioButton({
  label,
  helperText,
  error,
  required = false,
  disabled = false,
  id,
  name,
  value,
  className,
  style,
  ...rest
}) {
  const generatedId = useId();
  const radioId = id || `ui-radio-${generatedId}`;
  const helperId = helperText ? `${radioId}-helper` : undefined;
  const errorId = error ? `${radioId}-error` : undefined;

  return (
    <div className={cx("ui-radio-field", className)} style={style}>
      <label className="ui-radio-field__row" htmlFor={radioId}>
        <input
          id={radioId}
          name={name}
          value={value}
          type="radio"
          className="ui-radio-field__control"
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={[helperId, errorId].filter(Boolean).join(" ") || undefined}
          {...rest}
        />
        <span className="ui-radio-field__label">{label}</span>
      </label>
      {helperText ? (
        <p id={helperId} className="ui-radio-field__helper">
          {helperText}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="ui-radio-field__error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

