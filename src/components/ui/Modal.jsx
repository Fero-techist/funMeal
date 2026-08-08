import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({ children, open, className = "", onClose }) {
  const dialog = useRef();

  useEffect(() => {
    const dialogEl = dialog.current;
    if (!dialogEl) return;

    if (open) {
      if (!dialogEl.open) {
        dialogEl.showModal();
      }

      return;
    }

    if (dialogEl.open) {
      dialogEl.close();
    }
  }, [open]);

  return createPortal(
    <dialog
      ref={dialog}
      className={`modal ${className}`}
      onClose={onClose}
    >
      {children}
    </dialog>,
    document.getElementById("modal"),
  );
}
