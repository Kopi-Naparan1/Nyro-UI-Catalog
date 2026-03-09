import React from "react";
import { Button } from "../../buttons/index.js";
import { Alert } from "../../feedback/index.js";
import { Checkbox, TextInput } from "../../inputs/index.js";
import { Stack } from "../../layout/index.js";
import { Text } from "../../typography/index.js";
import { cx } from "../../utils/cx";

/*
 * Function: Renders a login form pattern with remember-me and auth action links.
 * Usage: <AuthLoginForm onSubmit={(values) => console.log(values)} />
 */
export default function AuthLoginForm({
  variant = "standard",
  state = "default",
  title = "Sign in to your workspace",
  subtitle = "Use your admin credentials to continue.",
  errorMessage = "Invalid email or password. Please try again.",
  submitLabel = "Sign in",
  loadingLabel = "Signing in...",
  forgotPasswordLabel = "Forgot password?",
  createAccountLabel = "Create account",
  rememberMeLabel = "Remember me on this device",
  showRememberMe = true,
  onSubmit,
  onForgotPassword,
  onCreateAccount,
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
      email: String(formData.get("email") || ""),
      password: String(formData.get("password") || ""),
      rememberMe: Boolean(formData.get("rememberMe")),
    });
  };

  return (
    <form
      className={cx(
        "ui-pattern",
        "ui-pattern--auth-login",
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
        <Alert variant="danger" title="Authentication failed" dismissible>
          {errorMessage}
        </Alert>
      ) : null}

      <div className="ui-pattern-form">
        <TextInput
          name="email"
          type="email"
          label="Email"
          placeholder="you@company.com"
          required
          disabled={isLoading}
        />
        <TextInput
          name="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          required
          disabled={isLoading}
        />

        {showRememberMe ? (
          <Checkbox
            name="rememberMe"
            label={rememberMeLabel}
            defaultChecked
            disabled={isLoading}
          />
        ) : null}

        {children}
      </div>

      <div className="ui-pattern-form__footer">
        <button
          type="button"
          className="ui-pattern-link-button"
          onClick={onForgotPassword}
          disabled={isLoading}
        >
          {forgotPasswordLabel}
        </button>

        <Stack direction="row" gap="sm" align="center" wrap>
          <Text size="sm" tone="muted">
            New here?
          </Text>
          <button
            type="button"
            className="ui-pattern-link-button"
            onClick={onCreateAccount}
            disabled={isLoading}
          >
            {createAccountLabel}
          </button>
          <Button className="ui-pattern-form__submit" loading={isLoading} type="submit">
            {isLoading ? loadingLabel : submitLabel}
          </Button>
        </Stack>
      </div>
    </form>
  );
}