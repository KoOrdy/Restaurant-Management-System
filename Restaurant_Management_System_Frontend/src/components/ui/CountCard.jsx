import { memo } from "react";

const CountCard = ({
  title,
  description,
  count,
  icon,
}) => {
  return (
    <div className="w-full h-fit bg-white shadow-md rounded-2xl overflow-hidden border border-gray-200 p-6 transition-all duration-300 ease-in-out transform hover:shadow-xl">
      <div className="flex items-center gap-4 max-lg:flex-wrap-reverse justify-between max-lg:justify-center">
        {/* Title and Description */}
        <div className="flex flex-col gap-2 max-w-xs">
          <h2 className="text-xl font-semibold text-black flex items-center gap-3">
            {icon && <div className="text-gray-500">{icon}</div>}
            {title}
          </h2>
          <p className="text-gray-600 text-sm leading-snug">{description}</p>
        </div>

        {/* Count Circle */}
        <div className="flex items-center justify-center w-auto h-auto min-w-16 min-h-16 p-5 bg-[#EF5B20] text-white rounded-full font-semibold text-2xl">
          {count}
        </div>
      </div>
    </div>
  );
};

export default memo(CountCard);
