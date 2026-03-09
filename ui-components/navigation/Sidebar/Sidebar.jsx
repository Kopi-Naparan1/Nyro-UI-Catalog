import React, { useState } from "react";
import { cx } from "../../utils/cx";
import "./Sidebar.css";

/*
 * Function: Renders a collapsible side navigation menu for app sections.
 * Usage: <Sidebar title="Workspace" items={items} defaultCollapsed />
 */
export default function Sidebar({
  items = [],
  title,
  collapsed,
  defaultCollapsed = false,
  onToggle,
  position = "left",
  className,
  style,
  ...rest
}) {
  const isControlled = typeof collapsed === "boolean";
  const [internalCollapsed, setInternalCollapsed] = useState(defaultCollapsed);
  const isCollapsed = isControlled ? collapsed : internalCollapsed;

  const handleToggle = () => {
    const next = !isCollapsed;

    if (!isControlled) {
      setInternalCollapsed(next);
    }

    onToggle?.(next);
  };

  return (
    <aside
      className={cx(
        "ui-sidebar",
        `ui-sidebar--${position === "right" ? "right" : "left"}`,
        {
          "ui-sidebar--collapsed": isCollapsed,
        },
        className,
      )}
      style={style}
      {...rest}
    >
      <div className="ui-sidebar__header">
        {title ? <h2 className="ui-sidebar__title">{title}</h2> : null}
        <button
          type="button"
          className="ui-sidebar__toggle"
          onClick={handleToggle}
          aria-label="Toggle sidebar"
        >
          {isCollapsed ? "Expand" : "Collapse"}
        </button>
      </div>

      <nav className="ui-sidebar__nav" aria-label={title || "Sidebar"}>
        <ul className="ui-sidebar__list">
          {items.map((item, index) => (
            <li key={`${item.label}-${index}`} className="ui-sidebar__item">
              <a
                href={item.href || "#"}
                onClick={item.onClick}
                className={cx("ui-sidebar__link", {
                  "ui-sidebar__link--active": item.active,
                })}
              >
                {item.icon ? <span className="ui-sidebar__icon">{item.icon}</span> : null}
                <span className="ui-sidebar__label">{item.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
