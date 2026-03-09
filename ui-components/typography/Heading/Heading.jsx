import React from "react";
import { cx } from "../../utils/cx";
import "./Heading.css";

const SIZE_SCALE = ["xs", "sm", "md", "lg", "xl", "display"];
const WEIGHT_SCALE = ["regular", "medium", "semibold", "bold"];
const ALIGN_SCALE = ["left", "center", "right", "justify"];
const TONE_SCALE = ["default", "muted", "subtle", "brand", "danger", "success"];

/*
 * Function: Renders semantic headings with configurable size, tone, and weight.
 * Usage: <Heading as="h2" size="md">Billing</Heading>
 */
export default function Heading({
  as = "h2",
  size = "lg",
  weight = "semibold",
  align = "left",
  tone = "default",
  className,
  style,
  children,
  ...rest
}) {
  const Tag = as;

  return (
    <Tag
      className={cx(
        "ui-heading",
        `ui-heading--size-${SIZE_SCALE.includes(size) ? size : "lg"}`,
        `ui-heading--weight-${WEIGHT_SCALE.includes(weight) ? weight : "semibold"}`,
        `ui-heading--align-${ALIGN_SCALE.includes(align) ? align : "left"}`,
        `ui-heading--tone-${TONE_SCALE.includes(tone) ? tone : "default"}`,
        className,
      )}
      style={style}
      {...rest}
    >
      {children}
    </Tag>
  );
}

