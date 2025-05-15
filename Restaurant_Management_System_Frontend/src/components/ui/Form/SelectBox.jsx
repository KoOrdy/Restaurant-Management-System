import { ChevronDown } from "lucide-react";
import React, { forwardRef } from "react";

const SelectBox = forwardRef(({ isError = false, children, ...rest }, ref) => {
  return (
    <div className="relative w-full">
      <select
        ref={ref}
        className={`w-full appearance-none rounded-lg bg-white px-3 py-2.5 pr-8 pl-3 text-base text-[#19355a] 
        outline-1 -outline-offset-1 focus:outline-2 focus:-outline-offset-2 
        sm:text-lg duration-75 ease-in-out
        ${isError ?
          "outline-red-300 focus:outline-red-600" : 
          "outline-gray-300 focus:outline-[#b38e19]"
        }
        `}
        {...rest}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 size-5 text-gray-500 sm:size-4" />
    </div>
  );
});

SelectBox.displayName = "SelectBox";

export default SelectBox;
