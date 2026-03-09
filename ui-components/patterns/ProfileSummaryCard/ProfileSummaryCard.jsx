import React from "react";
import { Button } from "../../buttons/index.js";
import { Spinner } from "../../feedback/index.js";
import { Badge, Text } from "../../typography/index.js";
import { cx } from "../../utils/cx";

function getInitials(name) {
  if (!name) {
    return "NA";
  }

  const parts = name
    .split(" ")
    .map((part) => part.trim())
    .filter(Boolean)
    .slice(0, 2);

  if (parts.length === 0) {
    return "NA";
  }

  return parts.map((part) => part[0].toUpperCase()).join("");
}

/*
 * Function: Renders a profile summary card pattern with identity metadata and edit action.
 * Usage: <ProfileSummaryCard name="Alex Doe" email="alex@nyro.dev" />
 */
export default function ProfileSummaryCard({
  variant = "standard",
  state = "default",
  name = "Alex Nyro",
  email = "alex@nyro.dev",
  role = "Finance Admin",
  roleVariant = "brand",
  meta = [
    { label: "Team", value: "Operations" },
    { label: "Last active", value: "2 minutes ago" },
    { label: "Region", value: "APAC" },
  ],
  editLabel = "Edit profile",
  onEdit,
  className,
  style,
  ...rest
}) {
  const safeState = ["default", "loading", "empty"].includes(state) ? state : "default";
  const isLoading = safeState === "loading";
  const isEmpty = safeState === "empty";

  return (
    <section
      className={cx(
        "ui-pattern",
        "ui-pattern-profile",
        {
          "ui-pattern--compact": variant === "compact",
        },
        className,
      )}
      style={style}
      {...rest}
    >
      {isLoading ? <Spinner label="Loading profile" /> : null}

      {!isLoading && isEmpty ? (
        <>
          <Text weight="semibold">No profile selected</Text>
          <Text tone="muted">Pick a member to view role, activity, and account details.</Text>
        </>
      ) : null}

      {!isLoading && !isEmpty ? (
        <>
          <header className="ui-pattern-profile__header">
            <div className="ui-pattern-profile__identity">
              <div className="ui-pattern-profile__avatar" aria-hidden="true">
                {getInitials(name)}
              </div>
              <div>
                <p className="ui-pattern-profile__name">{name}</p>
                <p className="ui-pattern-profile__email">{email}</p>
              </div>
            </div>
            <Badge variant={roleVariant}>{role}</Badge>
          </header>

          <ul className="ui-pattern-profile__meta">
            {meta.map((item) => (
              <li key={item.label}>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </li>
            ))}
          </ul>

          <div className="ui-pattern__actions">
            <Button variant="outline" size={variant === "compact" ? "sm" : "md"} onClick={onEdit}>
              {editLabel}
            </Button>
          </div>
        </>
      ) : null}
    </section>
  );
}