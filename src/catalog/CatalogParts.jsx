import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Card, Heading, Text, Stack } from "../../ui-components";
import { COMPONENT_GUIDES } from "./catalogMeta";

const COPY_RESET_DELAY_MS = 2500;

async function copySnippetText(snippetCode) {
  if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(snippetCode);
    return;
  }

  if (typeof document === "undefined") {
    throw new Error("Clipboard is unavailable");
  }

  const textarea = document.createElement("textarea");
  textarea.value = snippetCode;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  const copied = document.execCommand("copy");
  document.body.removeChild(textarea);

  if (!copied) {
    throw new Error("Manual copy failed");
  }
}

export function CatalogGroup({ id, title, description, children }) {
  return (
    <section id={id} className="app-group" aria-labelledby={`${id}-heading`}>
      <Stack gap="md">
        <div className="app-group__header">
          <Heading id={`${id}-heading`} as="h2" size="lg" tone="brand">
            {title}
          </Heading>
          <Text tone="muted">{description}</Text>
        </div>
        {children}
      </Stack>
    </section>
  );
}

export function ComponentSection({
  id,
  title,
  description,
  guide: guideOverride,
  children,
  lazy = false,
  lazyRootMargin = "240px 0px",
  lazyPlaceholder = null,
}) {
  const guide = guideOverride || COMPONENT_GUIDES[id];
  const [copyStateBySnippet, setCopyStateBySnippet] = useState({});
  const copyResetTimers = useRef({});
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(!lazy);
  const shouldRenderDetails = !lazy || isVisible;

  const snippetCards = useMemo(() => {
    if (!shouldRenderDetails || !guide) {
      return [];
    }

    const cards = Array.isArray(guide.snippets)
      ? guide.snippets
      : [
          {
            key: "primary",
            title: guide.snippetTitle,
            code: guide.snippetCode,
            buttonLabel: `Copy snippet for ${title}`,
          },
          ...(guide.secondarySnippetCode
            ? [
                {
                  key: "secondary",
                  title: guide.secondarySnippetTitle || "Usage snippet",
                  code: guide.secondarySnippetCode,
                  buttonLabel: `Copy usage snippet for ${title}`,
                },
              ]
            : []),
        ];

    return cards.filter((item) => item?.title && item?.code);
  }, [guide, shouldRenderDetails, title]);
 
  useEffect(() => {
    return () => {
      Object.values(copyResetTimers.current).forEach((timeoutId) => clearTimeout(timeoutId));
      copyResetTimers.current = {};
    };
  }, []);

  useEffect(() => {
    if (!lazy || isVisible) {
      return;
    }

    if (typeof window === "undefined" || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: lazyRootMargin },
    );

    const node = sectionRef.current;

    if (node) {
      observer.observe(node);
    } else {
      setIsVisible(true);
    }

    return () => observer.disconnect();
  }, [isVisible, lazy, lazyRootMargin]);

  const handleCopySnippet = async (snippetKey, snippetCode) => {
    if (!snippetCode) {
      return;
    }

    try {
      await copySnippetText(snippetCode);
      setCopyStateBySnippet((previous) => ({
        ...previous,
        [snippetKey]: "success",
      }));
    } catch {
      setCopyStateBySnippet((previous) => ({
        ...previous,
        [snippetKey]: "error",
      }));
    }

    if (copyResetTimers.current[snippetKey]) {
      clearTimeout(copyResetTimers.current[snippetKey]);
    }

    copyResetTimers.current[snippetKey] = setTimeout(() => {
      setCopyStateBySnippet((previous) => ({
        ...previous,
        [snippetKey]: "idle",
      }));
    }, COPY_RESET_DELAY_MS);
  };

  const getCopyMessage = (snippetKey) => {
    const copyState = copyStateBySnippet[snippetKey] || "idle";

    if (copyState === "success") {
      return "Snippet copied to clipboard.";
    }

    if (copyState === "error") {
      return "Unable to copy automatically. Select and copy the snippet manually.";
    }

    return "Ready to copy.";
  };

  const fallback = lazyPlaceholder || <div className="app-lazy-placeholder" aria-hidden="true" />;

  return (
    <section
      id={id}
      ref={sectionRef}
      className="app-component-section"
      aria-labelledby={`${id}-title`}
      aria-busy={lazy && !isVisible}
    >
      <Card bordered elevated padding="lg">
        <Stack gap="md">
          <header className="app-component-section__header">
            <Heading id={`${id}-title`} as="h3" size="md">
              {title}
            </Heading>
            <Text tone="muted">{description}</Text>
          </header>
          {shouldRenderDetails && guide ? (
            <section className="app-section-guide" aria-label={`${title} usage guidance`}>
              <div className="app-section-guide__facts">
                <article className="app-section-guide__fact">
                  <Text as="p" size="xs" weight="semibold" className="app-section-guide__label">
                    When to use
                  </Text>
                  <Text as="p" size="sm">
                    {guide.whenToUse}
                  </Text>
                </article>
                <article className="app-section-guide__fact">
                  <Text as="p" size="xs" weight="semibold" className="app-section-guide__label">
                    Recommended for
                  </Text>
                  <Text as="p" size="sm">
                    {guide.recommendedFor}
                  </Text>
                </article>
                <article className="app-section-guide__fact">
                  <Text as="p" size="xs" weight="semibold" className="app-section-guide__label">
                    Layouting recommendation
                  </Text>
                  <Text as="p" size="sm">
                    {guide.layoutRecommendation}
                  </Text>
                </article>
                <article className="app-section-guide__fact">
                  <Text as="p" size="xs" weight="semibold" className="app-section-guide__label">
                    Notes
                  </Text>
                  <Text as="p" size="sm">
                    {guide.notes}
                  </Text>
                </article>
              </div>

              {snippetCards.map((snippetCard) => {
                const copyState = copyStateBySnippet[snippetCard.key] || "idle";

                return (
                  <article key={snippetCard.key} className="app-section-snippet" aria-label={`${title} copy snippet`}>
                    <header className="app-section-snippet__header">
                      <Text as="p" weight="semibold">
                        {snippetCard.title}
                      </Text>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCopySnippet(snippetCard.key, snippetCard.code)}
                        aria-label={snippetCard.buttonLabel}
                      >
                        Copy snippet
                      </Button>
                    </header>
                    <pre className="app-section-snippet__code">
                      <code>{snippetCard.code}</code>
                    </pre>
                    <Text
                      as="p"
                      size="sm"
                      tone={copyState === "error" ? "danger" : "muted"}
                      role="status"
                      aria-live="polite"
                      className="app-section-snippet__status"
                    >
                      {getCopyMessage(snippetCard.key)}
                    </Text>
                  </article>
                );
              })}
            </section>
          ) : null}
          <div className="app-component-section__content">{shouldRenderDetails ? children : fallback}</div>
        </Stack>
      </Card>
    </section>
  );
}

export function DemoMatrix({
  title,
  description,
  children,
  dense = false,
  singleColumn = false,
  scroll = false,
}) {
  const matrixClassName = [
    "app-matrix__grid",
    dense ? "app-matrix__grid--dense" : "",
    singleColumn ? "app-matrix__grid--single" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article className="app-matrix" aria-label={title}>
      <header className="app-matrix__header">
        <Text as="p" weight="semibold">
          {title}
        </Text>
        {description ? (
          <Text as="p" size="sm" tone="muted">
            {description}
          </Text>
        ) : null}
      </header>
      <div className={scroll ? "app-scroll-x" : undefined}>
        <div className={matrixClassName}>{children}</div>
      </div>
    </article>
  );
}

export function DemoItem({ label, children }) {
  return (
    <div className="app-demo-item">
      <Text as="p" size="sm" weight="medium" className="app-demo-item__label">
        {label}
      </Text>
      <div className="app-demo-item__body">{children}</div>
    </div>
  );
}
