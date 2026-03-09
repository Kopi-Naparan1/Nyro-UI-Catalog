import React, { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { cx } from "../../utils/cx";
import "./Modal.css";

const SIZES = ["sm", "md", "lg", "xl"];
const FOCUSABLE_SELECTOR = [
  "a[href]:not([tabindex='-1'])",
  "button:not([disabled]):not([tabindex='-1'])",
  "input:not([type='hidden']):not([disabled]):not([tabindex='-1'])",
  "select:not([disabled]):not([tabindex='-1'])",
  "textarea:not([disabled]):not([tabindex='-1'])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

/*
 * Function: Displays an accessible dialog overlay for focused workflows.
 * Usage: <Modal open={open} onClose={closeModal} title="Share">...</Modal>
 */
export default function Modal({
  open = false,
  onClose,
  title,
  size = "md",
  closeOnOverlayClick = true,
  closeOnEsc = true,
  footer,
  className,
  style,
  children,
  ...rest
}) {
  const labelId = useId();
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    if (!open) {
      return undefined;
    }

    previousFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusWithinModal = () => {
      const modalNode = modalRef.current;
      if (!modalNode) {
        return;
      }

      const focusableElements = Array.from(modalNode.querySelectorAll(FOCUSABLE_SELECTOR));

      if (focusableElements.length > 0) {
        focusableElements[0].focus();
        return;
      }

      modalNode.focus();
    };

    focusWithinModal();

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && closeOnEsc) {
        onClose?.();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const modalNode = modalRef.current;
      if (!modalNode) {
        return;
      }

      const focusableElements = Array.from(modalNode.querySelectorAll(FOCUSABLE_SELECTOR));

      if (focusableElements.length === 0) {
        event.preventDefault();
        modalNode.focus();
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first || !modalNode.contains(active)) {
          event.preventDefault();
          last.focus();
        }

        return;
      }

      if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;

      if (previousFocusRef.current?.isConnected) {
        previousFocusRef.current.focus();
      }
    };
  }, [closeOnEsc, onClose, open]);

  if (!open) {
    return null;
  }

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget && closeOnOverlayClick) {
      onClose?.();
    }
  };

  const modal = (
    <div className="ui-modal__overlay" onMouseDown={handleOverlayClick}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? labelId : undefined}
        tabIndex={-1}
        ref={modalRef}
        className={cx(
          "ui-modal",
          `ui-modal--${SIZES.includes(size) ? size : "md"}`,
          className,
        )}
        style={style}
        {...rest}
      >
        <div className="ui-modal__header">
          {title ? (
            <h2 id={labelId} className="ui-modal__title">
              {title}
            </h2>
          ) : null}
          <button
            type="button"
            className="ui-modal__close"
            aria-label="Close modal"
            onClick={() => onClose?.()}
          >
            x
          </button>
        </div>
        <div className="ui-modal__body">{children}</div>
        {footer ? <div className="ui-modal__footer">{footer}</div> : null}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
