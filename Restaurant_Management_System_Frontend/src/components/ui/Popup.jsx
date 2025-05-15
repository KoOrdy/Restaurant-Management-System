import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Popup = ({ isOpen, closeModal, title, description, children }) => {
  const panelRef = useRef(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, closeModal]);

  // Close on ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeModal]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-1 rtl:font-cario ltr:font-noto">
      <div
        ref={panelRef}
        className="max-h-[700px] max-w-[600px] w-full min-w-88 overflow-auto bg-white rounded-2xl p-4 shadow-md transform transition duration-300 scale-100 opacity-100"
      >
        {title && <h2 className="text-lg font-bold capitalize">{title}</h2>}
        {description && <p className="text-gray-500">{description}</p>}
        <div className="mt-4">{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Popup;
