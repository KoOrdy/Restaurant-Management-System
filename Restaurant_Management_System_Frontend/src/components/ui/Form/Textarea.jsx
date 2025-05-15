import { cva } from "class-variance-authority";

// Define the base styles and variants for the Textarea component
const textareaVariants = cva(
  "block w-full rounded-lg px-3 py-1.5 text-base sm:text-lg bg-white text-[#19355a] outline-1 -outline-offset-1 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 duration-75 ease-in-out",
  {
    variants: {
      intent: {
        default: "outline-gray-300 focus:outline-[#b38e19]",
        error: "outline-red-300 focus:outline-red-600",
      },
    },
    defaultVariants: {
      intent: "default",
    },
  }
);

// Textarea component definition
const Textarea = ({ isError = false, intent, className, ...rest }) => {
  // Determine the intent based on the `isError` prop (backward compatibility)
  const resolvedIntent = isError ? "error" : intent;

  // Generate class names using cva
  const textareaClassName = textareaVariants({ intent: resolvedIntent, className });

  return (
    <textarea
      className={textareaClassName}
      {...rest}
    />
  );
};

Textarea.displayName = "textarea";

export default Textarea;
