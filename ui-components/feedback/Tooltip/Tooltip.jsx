import React, { cloneElement, isValidElement, useEffect, useId, useState } from "react";
import { cx } from "../../utils/cx";
import "./Tooltip.css";

const POSITIONS = ["top", "bottom", "left", "right"];

function mergeDescribedBy(existing, id) {
  if (!id) {
    return existing;
  }

  if (!existing) {
    return id;
  }

  const values = new Set(`${existing} ${id}`.trim().split(/\s+/));
  return Array.from(values).join(" ");
}

/*
 * Function: Shows helper text on hover/focus for a trigger element.
 * Usage: <Tooltip content="More info"><button type="button">Hover</button></Tooltip>
 */
export default function Tooltip({
  content,
  position = "top",
  delay = 120,
  disabled = false,
  className,
  style,
  children,
  ...rest
}) {
  const [visible, setVisible] = useState(false);
  const [pendingTimeout, setPendingTimeout] = useState(null);
  const tooltipId = useId();
  const resolvedPosition = POSITIONS.includes(position) ? position : "top";
  const safeDelay = Number.isFinite(delay) ? Math.max(delay, 0) : 120;

  useEffect(() => {
    return () => {
      if (pendingTimeout !== null) {
        clearTimeout(pendingTimeout);
      }
    };
  }, [pendingTimeout]);

  if (!children || !content) {
    return children ?? null;
  }

  const clearPending = () => {
    if (pendingTimeout !== null) {
      clearTimeout(pendingTimeout);
      setPendingTimeout(null);
    }
  };

  const show = () => {
    if (disabled) {
      return;
    }

    clearPending();

    const timeoutId = setTimeout(() => {
      setVisible(true);
      setPendingTimeout(null);
    }, safeDelay);

    setPendingTimeout(timeoutId);
  };

  const hide = () => {
    clearPending();
    setVisible(false);
  };

  const dismissOnEscape = (event) => {
    if (event.key === "Escape") {
      hide();
    }
  };

  const trigger = isValidElement(children)
    ? cloneElement(children, {
        className: cx("ui-tooltip__trigger", children.props.className),
        "aria-describedby": visible && !disabled
          ? mergeDescribedBy(children.props["aria-describedby"], tooltipId)
          : children.props["aria-describedby"],
        onMouseEnter: (event) => {
          children.props.onMouseEnter?.(event);

          if (!event.defaultPrevented) {
            show();
          }
        },
        onMouseLeave: (event) => {
          children.props.onMouseLeave?.(event);

          if (!event.defaultPrevented) {
            hide();
          }
        },
        onFocus: (event) => {
          children.props.onFocus?.(event);

          if (!event.defaultPrevented) {
            show();
          }
        },
        onBlur: (event) => {
          children.props.onBlur?.(event);

          if (!event.defaultPrevented) {
            hide();
          }
        },
        onKeyDown: (event) => {
          children.props.onKeyDown?.(event);

          if (!event.defaultPrevented) {
            dismissOnEscape(event);
          }
        },
      })
    : (
      <span
        className="ui-tooltip__trigger"
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        onKeyDown={dismissOnEscape}
        aria-describedby={visible && !disabled ? tooltipId : undefined}
      >
        {children}
      </span>
    );

  return (
    <span className={cx("ui-tooltip", className)} style={style} {...rest}>
      {trigger}
      <span
        id={tooltipId}
        role="tooltip"
        className={cx(
          "ui-tooltip__bubble",
          `ui-tooltip__bubble--${resolvedPosition}`,
          {
            "ui-tooltip__bubble--visible": visible && !disabled,
          },
        )}
      >
        {content}
      </span>
    </span>
  );
}
