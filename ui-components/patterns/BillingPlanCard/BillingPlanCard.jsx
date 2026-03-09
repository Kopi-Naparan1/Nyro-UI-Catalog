import React from "react";
import { Button } from "../../buttons/index.js";
import { Spinner } from "../../feedback/index.js";
import { Badge, Heading, Text } from "../../typography/index.js";
import { cx } from "../../utils/cx";

/*
 * Function: Renders a billing-plan summary card with feature list and actions.
 * Usage: <BillingPlanCard onPrimaryAction={upgradePlan} />
 */
export default function BillingPlanCard({
  variant = "standard",
  state = "default",
  planName = "Professional",
  statusLabel = "Active",
  statusVariant = "success",
  price = "$49",
  billingCycle = "per workspace / month",
  features = ["Unlimited members", "Priority support", "Advanced analytics"],
  primaryActionLabel = "Upgrade plan",
  secondaryActionLabel = "Manage billing",
  onPrimaryAction,
  onSecondaryAction,
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
        "ui-pattern-billing",
        {
          "ui-pattern--compact": variant === "compact",
        },
        className,
      )}
      style={style}
      {...rest}
    >
      {isLoading ? <Spinner label="Loading billing plan" /> : null}

      {!isLoading && isEmpty ? (
        <>
          <Heading as="h3" size={variant === "compact" ? "sm" : "md"}>
            No active plan
          </Heading>
          <Text tone="muted">Assign a billing plan to unlock usage analytics and controls.</Text>
          <Button onClick={onPrimaryAction}>Assign plan</Button>
        </>
      ) : null}

      {!isLoading && !isEmpty ? (
        <>
          <div className="ui-pattern-billing__top">
            <div>
              <Heading as="h3" size={variant === "compact" ? "sm" : "md"}>
                {planName}
              </Heading>
              <p className="ui-pattern-billing__price">{price}</p>
              <p className="ui-pattern-billing__cycle">{billingCycle}</p>
            </div>
            <Badge variant={statusVariant}>{statusLabel}</Badge>
          </div>

          <ul className="ui-pattern-billing__features">
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>

          <div className="ui-pattern__actions">
            <Button variant="outline" size={variant === "compact" ? "sm" : "md"} onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
            <Button size={variant === "compact" ? "sm" : "md"} onClick={onPrimaryAction}>
              {primaryActionLabel}
            </Button>
          </div>
        </>
      ) : null}
    </section>
  );
}