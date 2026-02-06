import { useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

interface DialogProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  backdropCloseDisable?: boolean;
}

const Dialog: React.FC<DialogProps> = ({
  open,
  onClose,
  children,
  size = "md",
  backdropCloseDisable = false,
}) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      document.body.classList.add("dialog-open");
    } else {
      document.body.style.overflow = "auto";
      document.body.classList.remove("dialog-open");
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !backdropCloseDisable) {
        onClose();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("dialog-open");
    };
  }, [open, backdropCloseDisable, onClose]);

  const sizeClasses = useMemo(
    () => ({
      xs: "w-[300px] max-w-full h-auto ",
      sm: "w-[450px] max-w-full h-auto",
      md: "w-[650px] max-w-full h-auto",
      lg: " w-[800px] max-w-full h-auto",
      xl: "w-[1000px] max-w-full h-auto",
    }),
    []
  );

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center  z-50"
          role="dialog"
          aria-modal="true"
        >
          {!backdropCloseDisable && (
            <div
              className="absolute inset-0 bg-black/50 z-0"
              onClick={onClose}
            ></div>
          )}

              {/* <div
            className={`absolute inset-0 ${
              backdropCloseDisable ? "bg-black/20" : "bg-black/50"
            } backdrop-blur-sm z-0`}
            onClick={() => !backdropCloseDisable && onClose()}
          ></div> */}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`card p-6 rounded-lg shadow-xl relative z-10 ${sizeClasses[size]} max-h-[95vh] overflow-y-auto scroll-container`}
          >
            <div
              onClick={onClose}
              className="absolute top-2 right-2 cursor-pointer rounded-full bg-gray-200 p-1 hover:bg-gray-300"
            >
              <X size={20} className="text-gray-700" />
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Dialog;
