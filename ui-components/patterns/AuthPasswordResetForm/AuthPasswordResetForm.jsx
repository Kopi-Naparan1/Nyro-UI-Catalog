import React from "react";
import { Button } from "../../buttons/index.js";
import { Alert } from "../../feedback/index.js";
import { TextInput } from "../../inputs/index.js";
import { Stack } from "../../layout/index.js";
import { Text } from "../../typography/index.js";
import { cx } from "../../utils/cx";

/*
 * Function: Renders a password reset pattern with success and error status panels.
 * Usage: <AuthPasswordResetForm onSubmit={(payload) => console.log(payload)} />
 */
export default function AuthPasswordResetForm({
  variant = "standard",
  state = "default",
  title = "Reset your password",
  subtitle = "Enter your account email and we will send reset instructions.",
  submitLabel = "Send reset link",
  loadingLabel = "Sending...",
  errorMessage = "Unable to send reset instructions right now.",
  successMessage = "If this email exists, reset instructions are on the way.",
  showSuccess = false,
  onSubmit,
  onBackToLogin,
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
      email: String(formData.get("email") || ""),
    });
  };

  return (
    <form
      className={cx(
        "ui-pattern",
        "ui-pattern--auth-reset",
        {
          "ui-pattern--compact": variant === "compact",
        },
        className,
      )}
      style={style}
      onSubmit={handleSubmit}
      {...rest}
    >
      <Stack gap="sm">
        <h3 className="ui-pattern__title">{title}</h3>
        <p className="ui-pattern__description">{subtitle}</p>
      </Stack>

      {isError ? (
        <Alert variant="danger" title="Reset failed" dismissible>
          {errorMessage}
        </Alert>
      ) : null}
      {showSuccess ? (
        <Alert variant="success" title="Request sent" dismissible>
          {successMessage}
        </Alert>
      ) : null}

      <div className="ui-pattern-form">
        <TextInput
          name="email"
          type="email"
          label="Work email"
          placeholder="you@company.com"
          required
          disabled={isLoading}
        />
      </div>

      <div className="ui-pattern-form__footer">
        <button
          type="button"
          className="ui-pattern-link-button"
          onClick={onBackToLogin}
          disabled={isLoading}
        >
          Back to login
        </button>
        <Stack direction="row" gap="sm" align="center" wrap>
          <Text size="sm" tone="muted">
            Need help? Contact your workspace admin.
          </Text>
          <Button className="ui-pattern-form__submit" loading={isLoading} type="submit">
            {isLoading ? loadingLabel : submitLabel}
          </Button>
        </Stack>
      </div>
    </form>
  );
}