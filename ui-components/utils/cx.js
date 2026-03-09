export function cx(...inputs) {
  const classes = [];

  const push = (value) => {
    if (!value) return;

    if (typeof value === "string") {
      classes.push(value);
      return;
    }

    if (Array.isArray(value)) {
      value.forEach(push);
      return;
    }

    if (typeof value === "object") {
      Object.entries(value).forEach(([key, enabled]) => {
        if (enabled) {
          classes.push(key);
        }
      });
    }
  };

  inputs.forEach(push);

  return classes.join(" ");
}

