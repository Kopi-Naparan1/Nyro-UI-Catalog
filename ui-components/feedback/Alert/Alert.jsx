import React, { useState } from "react";
import { cx } from "../../utils/cx";
import "./Alert.css";

const VARIANTS = ["info", "success", "warning", "danger"];

/*
 * Function: Shows contextual feedback messages and can optionally be dismissible.
 * Usage: <Alert variant="success" dismissible>Saved.</Alert>
 */
export default function Alert({
  variant = "info",
  title,
  dismissible = false,
  onClose,
  className,
  style,
  children,
  ...rest
}) {
  const [visible, setVisible] = useState(true);

  const resolvedVariant = VARIANTS.includes(variant) ? variant : "info";

  if (!visible) {
    return null;
  }

  const handleClose = () => {
    setVisible(false);
    onClose?.();
  };

  return (
    <div
      role="alert"
      className={cx("ui-alert", `ui-alert--${resolvedVariant}`, className)}
      style={style}
      {...rest}
    >
      <div className="ui-alert__content">
        {title ? <p className="ui-alert__title">{title}</p> : null}
        {children ? <div className="ui-alert__body">{children}</div> : null}
      </div>
      {dismissible ? (
        <button
          type="button"
          className="ui-alert__close"
          aria-label="Close alert"
          onClick={handleClose}
        >
          x
        </button>
      ) : null}
    </div>
  );
}

