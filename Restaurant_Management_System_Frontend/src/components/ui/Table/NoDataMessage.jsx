import { FolderOpen } from 'lucide-react';

const NoDataMessage = ({
  title = "No data found",
  message = "Try adjusting your filters or add a new data",
  className = "",
}) => {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center space-y-2 p-10 ${className} transition-all`}
      role="alert"
      aria-live="assertive"
    >
      <FolderOpen className="text-3xl text-gray-400 animate-pulse" />
      <span className="font-semibold text-lg text-gray-700">{title}</span>
      <p className="text-sm text-gray-500">{message}</p>
    </div>
  );
};

export default NoDataMessage;
