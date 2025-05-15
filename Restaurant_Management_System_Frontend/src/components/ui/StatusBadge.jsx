import { cva } from "class-variance-authority";
import clsx from "clsx";

const StatusBadgeVariants = cva(
  [
    "inline-flex",
    "items-center",
    "gap-2",
    "capitalize",
    "w-fit",
    "h-fit",
    "font-semibold",
    "border",
    "transition-colors",
  ],
  {
    variants: {
      variant: {
        success: [
          "text-green-800",
          "bg-green-100",
          "border-green-300",
          "hover:bg-green-200",
        ],
        warning: [
          "text-yellow-800",
          "bg-yellow-100",
          "border-yellow-300",
          "hover:bg-yellow-200",
        ],
        error: [
          "text-red-800",
          "bg-red-100",
          "border-red-300",
          "hover:bg-red-200",
        ],
        info: [
          "text-blue-800",
          "bg-blue-100",
          "border-blue-300",
          "hover:bg-blue-200",
        ],
        neutral: [
          "text-gray-800",
          "bg-gray-100",
          "border-gray-300",
          "hover:bg-gray-200",
        ],
      },
      size: {
        small: ["text-xs", "px-3", "py-1"],
        medium: ["text-sm", "px-4", "py-1.5"],
        large: ["text-base", "px-5", "py-2"],
      },
      shape: {
        square: "rounded-none",
        rounded: "rounded-lg",
        pill: "rounded-full",
      },
      fullWidth: {
        true: "w-full justify-center",
      },
    },
    defaultVariants: {
      variant: "neutral",
      size: "medium",
      shape: "rounded",
    },
  }
);

const StatusBadge = ({
  variant,
  size,
  shape,
  fullWidth,
  icon,
  children = "Unknown",
}) => {
  return (
    <div className={clsx(StatusBadgeVariants({ variant, size, shape, fullWidth }))}>
      {children}
      {icon && <span className="text-lg">{icon}</span>}
    </div>
  );
};

export default StatusBadge;
