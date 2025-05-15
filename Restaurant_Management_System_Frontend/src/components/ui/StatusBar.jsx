import clsx from "clsx";
import {
  Clock,
  UtensilsCrossed,
  CheckCheck,
  Truck,
} from "lucide-react";

const ORDER_STAGES = [
  { label: "Pending", icon: Clock },
  { label: "Preparing", icon: UtensilsCrossed },
  { label: "Ready", icon: CheckCheck },
  { label: "Delivered", icon: Truck },
];

const StatusBar = ({ currentStatus }) => {
  const currentIndex = ORDER_STAGES.findIndex((stage) => stage.label === currentStatus);

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-start sm:justify-between gap-6 sm:gap-8 mt-6 w-full">
      {ORDER_STAGES.map((stage, index) => {
        const isActive = index <= currentIndex;
        const Icon = stage.icon;

        return (
          <div key={stage.label} className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3 w-full sm:w-auto">
            {/* Circle with icon */}
            <div
              className={clsx(
                "w-12 h-12 rounded-full flex items-center justify-center border-2 transition-colors",
                isActive
                  ? "bg-green-500 border-green-500 text-white"
                  : "bg-gray-200 border-gray-300 text-gray-400"
              )}
            >
              <Icon size={24} />
            </div>

            {/* Label */}
            <div className={clsx("text-base font-semibold", isActive ? "text-green-600" : "text-gray-400")}>
              {stage.label}
            </div>

            {/* Line Connector (horizontal only on larger screens) */}
            {index !== ORDER_STAGES.length - 1 && (
              <div
                className={clsx(
                  "hidden sm:block h-1 flex-1 rounded-full",
                  isActive && index < currentIndex ? "bg-green-500" : "bg-gray-300"
                )}
                style={{ minWidth: "70px", maxWidth: "150px" }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StatusBar;
