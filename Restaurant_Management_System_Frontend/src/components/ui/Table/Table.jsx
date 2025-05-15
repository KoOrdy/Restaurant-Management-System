import { memo } from "react";
import NoDataMessage from "./NoDataMessage";

const Table = ({ columns, children }) => {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-md border border-gray-300">
      {/* Desktop Table */}
      <div className="hidden lg:block w-full">
        <div
          className="min-w-full rounded-md overflow-hidden"
          role="table"
          aria-label="Data table"
        >
          {/* Header */}
          <div
            className="flex bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-sm font-semibold uppercase sticky top-0 z-10"
            role="row"
          >
            {columns.map((column, index) => (
              <div
                key={index}
                role="columnheader"
                className="py-4 px-6 flex-1 whitespace-nowrap border-b border-gray-300"
              >
                {column}
              </div>
            ))}
          </div>

          {/* Body */}
          <div
            className="divide-y divide-gray-100 text-gray-700"
            role="rowgroup"
          >
            {children}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="block lg:hidden divide-y divide-gray-100">
        {children ? (
          <div className="space-y-4 px-2 py-4">{children}</div>
        ) : (
          <NoDataMessage />
        )}
      </div>
    </div>
  );
};

export default memo(Table);
