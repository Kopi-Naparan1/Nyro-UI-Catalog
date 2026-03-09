import React, { useId } from "react";
import { cx } from "../../utils/cx";
import "./Select.css";

function normalizeOption(option) {
  if (typeof option === "string" || typeof option === "number") {
    return {
      label: option,
      value: String(option),
      disabled: false,
    };
  }

  return {
    label: option.label,
    value: option.value,
    disabled: Boolean(option.disabled),
  };
}

/*
 * Function: Renders a select dropdown with normalized option input formats.
 * Usage: <Select label="Plan" options={[{ label: "Starter", value: "starter" }]} />
 */
export default function Select({
  label,
  helperText,
  error,
  required = false,
  disabled = false,
  id,
  options = [],
  placeholder,
  className,
  style,
  ...rest
}) {
  const generatedId = useId();
  const selectId = id || `ui-select-${generatedId}`;
  const helperId = helperText ? `${selectId}-helper` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;

  return (
    <div className={cx("ui-field", className)} style={style}>
      {label ? (
        <label className="ui-field__label" htmlFor={selectId}>
          {label}
          {required ? <span className="ui-field__required">*</span> : null}
        </label>
      ) : null}
      <div className={cx("ui-select", { "ui-select--error": Boolean(error) })}>
        <select
          id={selectId}
          className="ui-select__control"
          required={required}
          disabled={disabled}
          aria-invalid={Boolean(error)}
          aria-describedby={[helperId, errorId].filter(Boolean).join(" ") || undefined}
          {...rest}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => {
            const normalized = normalizeOption(option);

            return (
              <option key={normalized.value} value={normalized.value} disabled={normalized.disabled}>
                {normalized.label}
              </option>
            );
          })}
        </select>
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

