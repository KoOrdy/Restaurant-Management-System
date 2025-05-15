import { memo } from "react";
import { cva } from "class-variance-authority";
import clsx from "clsx";

const ButtonVariants = cva(
  "inline-flex items-center justify-center relative font-semibold border-0 transition-colors duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer",
  {
    variants: {
      variant: {
        primary: "bg-[#EF5B20] text-white hover:bg-[#d94e1b]", // vibrant red (appetizing)
        secondary: "bg-[#F29F05] text-white hover:bg-[#cc8604]", // golden yellow
        info: "bg-[#3772FF] text-white hover:bg-[#265ecc]", // bright blue
        warning: "bg-[#F46036] text-white hover:bg-[#d44b25]", // orange
        error: "bg-[#990000] text-white hover:bg-[#7a0000]", // deep red
        success: "bg-[#3FA34D] text-white hover:bg-[#2e813b]", // earthy green
        danger: "bg-[#D7263D] text-white hover:bg-[#A61B2B]", // wine red
        cancel: "bg-[#B0B0B0] text-black hover:bg-[#999999]", // neutral gray
        black: "bg-[#1f1f23] text-white hover:bg-[#3A3A3A]", // clean dark
        outline:
          "bg-transparent border-2 border-[#EF5B20] text-[#EF5B20] hover:bg-[#EF5B20] hover:text-white", // outline red
      },
      size: {
        xs: "text-xs px-2 py-1 h-6",
        sm: "text-sm px-3 py-1.5 h-8",
        md: "text-base px-4 py-2 h-11",
        lg: "text-lg px-6 py-3 h-12",
        xl: "text-xl px-8 py-4 h-14",
      },
      shape: {
        square: "rounded-none",
        rounded: "rounded-lg",
        pill: "rounded-full",
      },
      fullWidth: {
        true: "w-full",
        false: "w-auto",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
      shape: "rounded",
    },
  }
);

const Button = ({
  size = "lg",
  variant = "primary",
  shape = "rounded",
  fullWidth = false,
  isLoading = false,
  icon,
  children,
  ...rest
}) => {
  const iconSizeMap = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-7 h-7",
  };

  const iconSize = iconSizeMap[size ?? "lg"];

  return (
    <button
      className={clsx(ButtonVariants({ variant, size, shape, fullWidth }))}
      disabled={isLoading || rest.disabled}
      aria-busy={isLoading}
      aria-disabled={isLoading}
      {...rest}
    >
      <div className="flex items-center justify-center gap-2">
        {isLoading && (
          <svg
            className={clsx("animate-spin", iconSize)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.372 0 0 5.372 0 12h4z"
            />
          </svg>
        )}

        {children && <span>{children}</span>}

        {!isLoading && icon && <span className={clsx(iconSize)}>{icon}</span>}
      </div>
    </button>
  );
};

export default memo(Button);
