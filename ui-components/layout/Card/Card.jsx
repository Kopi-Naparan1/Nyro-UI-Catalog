import React from "react";
import { cx } from "../../utils/cx";
import "./Card.css";

const PADDINGS = {
  none: "0",
  sm: "var(--ui-space-3)",
  md: "var(--ui-space-4)",
  lg: "var(--ui-space-6)",
};

/*
 * Function: Provides a surface container with optional header, footer, and elevation.
 * Usage: <Card bordered elevated>Content</Card>
 */
export default function Card({
  as = "article",
  padding = "md",
  bordered = true,
  elevated = false,
  interactive = false,
  header,
  footer,
  className,
  style,
  children,
  ...rest
}) {
  const Tag = as;

  return (
    <Tag
      className={cx(
        "ui-card",
        {
          "ui-card--bordered": bordered,
          "ui-card--elevated": elevated,
          "ui-card--interactive": interactive,
        },
        className,
      )}
      style={{
        "--ui-card-padding": PADDINGS[padding] || padding,
        ...style,
      }}
      {...rest}
    >
      {header ? <div className="ui-card__header">{header}</div> : null}
      <div className="ui-card__body">{children}</div>
      {footer ? <div className="ui-card__footer">{footer}</div> : null}
    </Tag>
  );
}

