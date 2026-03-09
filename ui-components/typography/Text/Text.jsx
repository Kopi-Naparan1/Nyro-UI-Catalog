import React from "react";
import { cx } from "../../utils/cx";
import "./Text.css";

const SIZE_SCALE = ["xs", "sm", "md", "lg", "xl"];
const WEIGHT_SCALE = ["regular", "medium", "semibold", "bold"];
const TONE_SCALE = ["default", "muted", "subtle", "brand", "danger", "success"];

/*
 * Function: Renders body text with semantic tag, size, tone, and truncation options.
 * Usage: <Text tone="muted">Last updated 2m ago</Text>
 */
export default function Text({
  as = "p",
  size = "md",
  weight = "regular",
  tone = "default",
  truncate = false,
  className,
  style,
  children,
  ...rest
}) {
  const Tag = as;

  return (
    <Tag
      className={cx(
        "ui-text",
        `ui-text--size-${SIZE_SCALE.includes(size) ? size : "md"}`,
        `ui-text--weight-${WEIGHT_SCALE.includes(weight) ? weight : "regular"}`,
        `ui-text--tone-${TONE_SCALE.includes(tone) ? tone : "default"}`,
        {
          "ui-text--truncate": truncate,
        },
        className,
      )}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}

