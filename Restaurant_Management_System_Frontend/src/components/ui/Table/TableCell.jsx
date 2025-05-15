import { Copy } from "lucide-react";
import clsx from "clsx";
import { showToast } from "../../../utils";

const TableCell = ({ label, children, className = "", ...rest }) => {
  
  const handleCopy = (e) => {
    e.stopPropagation();

    const content = children?.toString().trim();

    if (!content) return;

    navigator.clipboard.writeText(content)
      .then(() => {
        showToast("success", "copy success");
      })
      .catch(() => {
        showToast("error", "copy error");
      });
  };

  return (
    <div
      role="cell"
      className={clsx(
        "flex-1 relative py-4 px-5 border-b border-gray-200 text-gray-700 block lg:table-cell",
        "lg:border-0 select-none max-lg:hover:bg-gray-200 group transition-all",
        className
      )}
      {...rest}
    >
      {label && <span className="lg:hidden font-semibold block text-gray-900">{label}:</span>}
      
      <div className="flex items-center gap-2">
        {children}
        {(typeof children === "string" || typeof children === "number") && children !== "" && (
          <button
            onClick={handleCopy}
            className="w-5 h-5 hidden group-hover:flex items-center justify-center focus:outline-none active:scale-90 cursor-pointer transition-all"
            aria-label="Copy to clipboard"
            aria-describedby="copy-info"
          >
            <Copy className="w-5 h-5 text-gray-500 hover:text-gray-700 focus:text-gray-900 transition-colors" />
          </button>
        )}
      </div>
    </div>
  );
};

export default TableCell;
