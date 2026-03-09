import React, { useState } from "react";
import { Sidebar } from "../../navigation/index.js";
import { Stack } from "../../layout/index.js";
import { Heading, Text } from "../../typography/index.js";
import { cx } from "../../utils/cx";

const DEFAULT_ITEMS = [
  { label: "Dashboard", href: "#", active: true, icon: "DB" },
  { label: "Transactions", href: "#", icon: "TX" },
  { label: "Budgets", href: "#", icon: "BG" },
  { label: "Settings", href: "#", icon: "ST" },
];

/*
 * Function: Renders a shell layout pattern with sidebar navigation and content region.
 * Usage: <AppSidebarShell><YourContent /></AppSidebarShell>
 */
export default function AppSidebarShell({
  variant = "standard",
  title = "Workspace",
  sidebarItems = DEFAULT_ITEMS,
  headerTitle = "Operations dashboard",
  headerActions,
  collapsed,
  defaultCollapsed = false,
  onToggle,
  children,
  className,
  style,
  ...rest
}) {
  const isControlled = typeof collapsed === "boolean";
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isCollapsed = isControlled ? collapsed : internalCollapsed;

  const handleToggle = (next) => {
    if (!isControlled) {
      setInternalCollapsed(next);
    }

    onToggle?.(next);
  };

  return (
    <div
      className={cx(
        "ui-pattern-shell",
        {
          "ui-pattern-shell--collapsed": isCollapsed,
          "ui-pattern--compact": variant === "compact",
        },
        className,
      )}
      style={style}
      {...rest}
    >
      <div className="ui-pattern-shell__sidebar">
        <Sidebar
          title={title}
          items={sidebarItems}
          collapsed={isCollapsed}
          onToggle={handleToggle}
        />
      </div>

      <div className="ui-pattern-shell__content">
        <header className="ui-pattern-shell__header">
          <Heading as="h2" size={variant === "compact" ? "sm" : "md"}>
            {headerTitle}
          </Heading>
          {headerActions || null}
        </header>

        <div className="ui-pattern-shell__body">
          {children || (
            <Stack gap="sm">
              <Text tone="muted">Main content area for tables, charts, or forms.</Text>
              <Text tone="subtle">Use this shell to standardize app navigation and page layout.</Text>
            </Stack>
          )}
        </div>
      </div>
    </div>
  );
}