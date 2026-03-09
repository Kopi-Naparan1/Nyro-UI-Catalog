import React from "react";
import { Button, IconButton } from "../../buttons/index.js";
import { Navbar } from "../../navigation/index.js";
import { Badge } from "../../typography/index.js";
import { cx } from "../../utils/cx";

const DEFAULT_ITEMS = [
  { label: "Overview", href: "#", active: true },
  { label: "Reports", href: "#" },
  { label: "Settings", href: "#" },
];

/*
 * Function: Renders an app header bar pattern with nav links and utility actions.
 * Usage: <AppHeaderBar onPrimaryAction={() => {}} />
 */
export default function AppHeaderBar({
  variant = "standard",
  brand = "Nyro Admin",
  items = DEFAULT_ITEMS,
  statusLabel = "Live",
  primaryActionLabel = "Create report",
  userActionLabel = "Open user menu",
  sticky = false,
  collapsibleOnMobile = true,
  onPrimaryAction,
  onUserAction,
  actions,
  className,
  style,
  ...rest
}) {
  const resolvedActions =
    actions || (
      <>
        <Badge variant="success" size="sm">
          {statusLabel}
        </Badge>
        <Button size={variant === "compact" ? "sm" : "md"} onClick={onPrimaryAction}>
          {primaryActionLabel}
        </Button>
        <IconButton ariaLabel={userActionLabel} variant="ghost" size={variant === "compact" ? "sm" : "md"} onClick={onUserAction}>
          U
        </IconButton>
      </>
    );

  return (
    <div
      className={cx(
        "ui-pattern-headerbar",
        {
          "ui-pattern--compact": variant === "compact",
        },
        className,
      )}
      style={style}
      {...rest}
    >
      <Navbar
        sticky={sticky}
        collapsibleOnMobile={collapsibleOnMobile}
        brand={<span className="ui-pattern-headerbar__brand">{brand}</span>}
        items={items}
        actions={resolvedActions}
      />
    </div>
  );
}