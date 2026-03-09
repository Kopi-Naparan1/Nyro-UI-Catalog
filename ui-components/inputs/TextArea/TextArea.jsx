import React, { useId } from "react";
import { cx } from "../../utils/cx";
import "./TextArea.css";

/*
 * Function: Renders a multiline text field with helper/error states.
 * Usage: <TextArea label="Notes" rows={4} />
 */
export default function TextArea({
  label,
  helperText,
  error,
  required = false,
  disabled = false,
  id,
  rows = 4,
  resize = "vertical",
  className,
  style,
  ...rest
}) {
  const generatedId = useId();
  const textAreaId = id || `ui-text-area-${generatedId}`;
  const helperId = helperText ? `${textAreaId}-helper` : undefined;
  const errorId = error ? `${textAreaId}-error` : undefined;

  return (
    <div className={cx("ui-field", className)} style={style}>
      {label ? (
        <label className="ui-field__label" htmlFor={textAreaId}>
          {label}
          {required ? <span className="ui-field__required">*</span> : null}
        </label>
      ) : null}
      <textarea
        id={textAreaId}
        className={cx("ui-text-area", {
          "ui-text-area--error": Boolean(error),
        })}
        required={required}
        disabled={disabled}
        rows={rows}
        style={{ resize }}
        aria-invalid={Boolean(error)}
        aria-describedby={[helperId, errorId].filter(Boolean).join(" ") || undefined}
        {...rest}
      />
      {helperText ? (
        <p id={helperId} className="ui-field__helper">
          {helperText}
        </p>
      ) : null}
      {error ? (
        <p id={errorId} className="ui-field__error">
          {error}
        </p>
      ) : null}
    </div>
  );
}

