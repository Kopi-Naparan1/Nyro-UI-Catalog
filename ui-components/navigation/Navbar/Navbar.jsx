import React, { useState } from "react";
import { cx } from "../../utils/cx";
import "./Navbar.css";

/*
 * Function: Renders a top navigation bar with brand, links, and optional actions.
 * Usage: <Navbar brand="Nyro" items={[{ label: "Home", href: "/" }]} />
 */
export default function Navbar({
  brand,
  items = [],
  actions,
  sticky = false,
  collapsibleOnMobile = true,
  className,
  style,
  ...rest
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className={cx(
        "ui-navbar",
        {
          "ui-navbar--sticky": sticky,
        },
        className,
      )}
      style={style}
      {...rest}
    >
      <div className="ui-navbar__inner">
        <div className="ui-navbar__brand">{brand}</div>

        {collapsibleOnMobile ? (
          <button
            type="button"
            className="ui-navbar__menu-toggle"
            aria-expanded={menuOpen}
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        ) : null}

        <nav
          className={cx("ui-navbar__nav", {
            "ui-navbar__nav--open": !collapsibleOnMobile || menuOpen,
          })}
          aria-label="Primary"
        >
          {items.map((item, index) => (
            <a
              key={`${item.label}-${index}`}
              className={cx("ui-navbar__link", {
                "ui-navbar__link--active": item.active,
              })}
              href={item.href || "#"}
              onClick={item.onClick}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {actions ? <div className="ui-navbar__actions">{actions}</div> : null}
      </div>
    </header>
  );
}

