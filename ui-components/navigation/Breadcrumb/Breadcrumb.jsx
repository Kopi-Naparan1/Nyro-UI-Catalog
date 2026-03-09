import React from "react";
import { cx } from "../../utils/cx";
import "./Breadcrumb.css";

/*
 * Function: Renders a breadcrumb trail to show the current navigation path.
 * Usage: <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Settings", current: true }]} />
 */
export default function Breadcrumb({
  items = [],
  separator = "/",
  className,
  style,
  ...rest
}) {
  return (
    <nav className={cx("ui-breadcrumb", className)} style={style} aria-label="Breadcrumb" {...rest}>
      <ol className="ui-breadcrumb__list">
        {items.map((item, index) => {
          const isLast = index === items.length - 1 || item.current;

          return (
            <li key={`${item.label}-${index}`} className="ui-breadcrumb__item">
              {item.href && !isLast ? (
                <a className="ui-breadcrumb__link" href={item.href} onClick={item.onClick}>
                  {item.label}
                </a>
              ) : (
                <span className="ui-breadcrumb__current" aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}
              {!isLast ? <span className="ui-breadcrumb__separator">{separator}</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

