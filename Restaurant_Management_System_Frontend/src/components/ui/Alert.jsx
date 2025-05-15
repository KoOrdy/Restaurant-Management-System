import { useState } from "react";
import { X } from "lucide-react";

const Alert = ({
  type = "default",
  icon,
  title,
  description,
  children,
  dismissible = true,
}) => {
  const [isHidden, setIsHidden] = useState(false);

  const closeAlert = () => setIsHidden(true);

  const alertStyles = {
    info: "bg-blue-50 text-blue-800 border-blue-300",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-300",
    error: "bg-red-50 text-red-800 border-red-300",
    success: "bg-green-50 text-green-800 border-green-300",
    default: "bg-gray-50 text-gray-800 border-gray-300",
  };

  if (isHidden) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`${alertStyles[type]} relative w-full p-5 border shadow-md rounded-2xl hover:shadow-xl transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-blue-500`}
    >
      <div className="flex items-start gap-4">
        <div className="pt-1">{icon}</div>

        <div className="flex-1">
          <h4 className="text-base font-semibold leading-snug">{title}</h4>
          {children ? (
            <div className="mt-1 text-sm leading-relaxed">{children}</div>
          ) : description ? (
            <p className="mt-1 text-sm font-medium text-gray-700">{description}</p>
          ) : null}
        </div>

        {dismissible && (
          <button
            onClick={closeAlert}
            aria-label="Close alert"
            className="text-gray-500 hover:text-gray-800 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
