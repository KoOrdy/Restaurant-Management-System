// components/RestaurantManagerCard.jsx
import { UserCircle2 } from "lucide-react";

const RestaurantManagerCard = ({ restaurant, onSelect, isSelected }) => {
  const { restaurantName, managerId, managerName, imageUrl } = restaurant;

  return (
    <div
      onClick={() => onSelect(managerId)}
      className={`flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all border ${
        isSelected ? "bg-blue-100 border-blue-400" : "hover:bg-gray-100 border-transparent"
      }`}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={managerName}
          className="w-12 h-12 rounded-full object-cover"
        />
      ) : (
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          <UserCircle2 className="w-8 h-8 text-gray-400" />
        </div>
      )}
      <div className="flex flex-col">
        <span className="text-sm font-semibold">{managerName}</span>
        <span className="text-xs text-gray-500">#{managerId}</span>
        <span className="text-xs text-gray-600">{restaurantName}</span>
      </div>
    </div>
  );
};

export default RestaurantManagerCard;
