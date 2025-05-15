import { memo } from "react";

const ActionCard = ({
  icon,
  iconBgColor,
  iconColor,
  title,
  description,
  children,
}) => {
  return (
    <div
      className="w-full h-full bg-white border border-gray-100 shadow-md rounded-2xl p-6 hover:shadow-xl transition-all duration-300 ease-in-out focus-within:ring-2 focus-within:ring-blue-500"
      role="region"
      aria-labelledby={`action-card-${title.replace(/\s+/g, "-").toLowerCase()}`}
    >
      <div className="h-full flex flex-col items-center justify-between">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className={`p-4 rounded-full ${iconBgColor} ${iconColor} transition-colors duration-300`}>
            {icon}
          </div>

          <h2
            id={`action-card-${title.replace(/\s+/g, "-").toLowerCase()}`}
            className="text-xl font-semibold text-gray-900"
          >
            {title}
          </h2>

          <p className="text-gray-600 text-base max-w-md">
            {description}
          </p>
        </div>
        {children && (
          <div className="w-full mt-4">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(ActionCard);
