import { memo } from "react";

const SectionHeader = ({ title, description, className = "" }) => {
  return (
    <div className={`${className}`}>
      <h2 className="text-2xl sm:text-3xl font-bold text-[#1f1f23] leading-tight">
        {title}
      </h2>
      {description && (
        <p className="mt-1 text-base sm:text-lg text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
};

export default memo(SectionHeader);
