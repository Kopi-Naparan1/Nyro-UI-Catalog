import React, { useId } from "react";
import { cx } from "../../utils/cx";
import "./TextInput.css";

/*
 * Function: Renders a text input with label, validation, and optional prefix/suffix.
 * Usage: <TextInput label="Workspace" placeholder="Acme" />
 */
export default function TextInput({
  label,
  helperText,
  error,
  required = false,
  disabled = false,
  id,
  type = "text",
  placeholder,
  prefix,
  suffix,
  className,
  style,
  ...rest
}) {
  const generatedId = useId();
  const inputId = id || `ui-text-input-${generatedId}`;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;

  return (
    <div className={cx("ui-field", className)} style={style}>
      {label ? (
        <label className="ui-field__label" htmlFor={inputId}>
          {label}
          {required ? <span className="ui-field__required">*</span> : null}
        </label>
      ) : null}
      <div
        className={cx("ui-text-input", {
          "ui-text-input--error": Boolean(error),
          "ui-text-input--disabled": disabled,
          "ui-text-input--with-prefix": Boolean(prefix),
          "ui-text-input--with-suffix": Boolean(suffix),
        })}
      >
        {prefix ? <span className="ui-text-input__adornment">{prefix}</span> : null}
        <input
          id={inputId}
          type={type}
          className="ui-text-input__control"
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={[helperId, errorId].filter(Boolean).join(" ") || undefined}
          {...rest}
        />
        {suffix ? <span className="ui-text-input__adornment">{suffix}</span> : null}
      </div>
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

