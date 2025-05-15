import { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = forwardRef(({ isError = false, icon, type, ...rest }, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  const handleDateClick = (event) => {
    if (type === "date" || type === "time") {
      event.target.showPicker?.(); // Optional chaining in case showPicker isn't supported
    }
  };

  return (
    <div className="relative w-full">
      {icon && (
        <span className="absolute inset-y-0 left-3 flex items-center text-gray-500">
          {icon}
        </span>
      )}

      <input
        ref={ref}
        type={inputType}
        onClick={handleDateClick}
        className={`
          block w-full rounded-xl px-3 py-2.5 text-base sm:text-lg bg-white text-[#19355a] outline-1 -outline-offset-1 
          placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 duration-75 ease-in-out
          ${icon ? "pl-10" : ""}  
          ${isError ? "outline-red-300 focus:outline-red-600" : "outline-gray-300 focus:outline-[#A61B2B]"}
        `}
        {...rest}
        autoComplete="autoComplete"
      />

      {type === "password" && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 ltr:right-3 rtl:left-3 flex items-center text-gray-500 cursor-pointer"
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      )}
    </div>
  );
});

Input.displayName = "input";

export default Input;
