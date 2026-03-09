import React from "react";
import { cx } from "../../utils/cx";
import "./Link.css";

const TONES = ["default", "brand", "muted", "danger"];

/*
 * Function: Renders a styled anchor link with tone, underline, and external options.
 * Usage: <Link href="https://react.dev" external>Docs</Link>
 */
export default function Link({
  href = "#",
  external = false,
  underline = "hover",
  tone = "brand",
  disabled = false,
  className,
  style,
  children,
  onClick,
  ...rest
}) {
  const resolvedTone = TONES.includes(tone) ? tone : "brand";
  const underlineMode =
    underline === true ? "always" : underline === false ? "none" : underline;

  const linkProps = external
    ? {
        target: "_blank",
        rel: "noopener noreferrer",
      }
    : {};

  const handleClick = (event) => {
    if (disabled) {
      event.preventDefault();
      return;
    }

    onClick?.(event);
  };

  return (
    <a
      href={href}
      className={cx(
        "ui-link",
        `ui-link--tone-${resolvedTone}`,
        `ui-link--underline-${underlineMode || "hover"}`,
        {
          "ui-link--disabled": disabled,
        },
        className,
      )}
      style={style}
      onClick={handleClick}
      aria-disabled={disabled || undefined}
      {...linkProps}
      {...rest}
    >
      {children}
    </a>
  );
}

