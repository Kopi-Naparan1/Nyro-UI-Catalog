import React from "react";
import { Button } from "../../buttons/index.js";
import { Alert } from "../../feedback/index.js";
import { Checkbox, TextInput } from "../../inputs/index.js";
import { Heading, Text } from "../../typography/index.js";
import { cx } from "../../utils/cx";

/*
 * Function: Renders a settings-form card pattern with sectioned content and save/cancel actions.
 * Usage: <SettingsFormCard onSubmit={(values) => console.log(values)} />
 */
export default function SettingsFormCard({
  variant = "standard",
  state = "default",
  title = "Workspace settings",
  description = "Update defaults for your workspace members.",
  submitLabel = "Save settings",
  cancelLabel = "Cancel",
  errorMessage = "Unable to save settings. Please review the form and try again.",
  onSubmit,
  onCancel,
  children,
  className,
  style,
  ...rest
}) {
  const safeState = ["default", "loading", "error"].includes(state) ? state : "default";
  const isLoading = safeState === "loading";
  const isError = safeState === "error";

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    onSubmit?.({
      workspaceName: String(formData.get("workspaceName") || ""),
      timezone: String(formData.get("timezone") || ""),
      weeklySummary: Boolean(formData.get("weeklySummary")),
    });
  };

  return (
    <form
      className={cx(
        "ui-pattern",
        "ui-pattern-settings",
        {
          "ui-pattern--compact": variant === "compact",
        },
        className,
      )}
      style={style}
      onSubmit={handleSubmit}
      {...rest}
    >
      <Heading as="h3" size={variant === "compact" ? "sm" : "md"}>
        {title}
      </Heading>
      <Text tone="muted">{description}</Text>

      {isError ? (
        <Alert variant="danger" title="Save failed" dismissible>
          {errorMessage}
        </Alert>
      ) : null}

      {children || (
        <>
          <section className="ui-pattern-settings__section">
            <h4>General</h4>
            <p>Workspace-level naming and timezone defaults.</p>
            <TextInput name="workspaceName" label="Workspace name" defaultValue="Nyro Finance" required disabled={isLoading} />
            <TextInput name="timezone" label="Timezone" defaultValue="UTC+08:00" required disabled={isLoading} />
          </section>

          <section className="ui-pattern-settings__section">
            <h4>Notifications</h4>
            <p>Control outbound summary and alert preferences.</p>
            <Checkbox
              name="weeklySummary"
              label="Send weekly admin summary"
              helperText="Every Monday at 9:00 AM"
              defaultChecked
              disabled={isLoading}
            />
          </section>
        </>
      )}

      <footer className="ui-pattern-settings__footer">
        <Button type="button" variant="ghost" onClick={onCancel} disabled={isLoading}>
          {cancelLabel}
        </Button>
        <Button type="submit" loading={isLoading}>
          {submitLabel}
        </Button>
      </footer>
    </form>
  );
}