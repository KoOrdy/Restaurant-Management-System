import { CookingPot } from "lucide-react";
import Button from "./Button";
import { truncateText } from "../../utils";
import { useSelector } from "react-redux";

const MenuItemCard = ({ image, title, description, price, availability, onAdd }) => {
  const { userId, role } = useSelector((state) => state.auth);

  return (
    <div className="group max-w-sm w-full bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden border border-gray-100">
      <div className="w-full h-48 bg-gray-50 relative overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5 space-y-3 text-center">
        <h3 className="text-xl font-semibold text-gray-800 truncate">{title}</h3>
        <p className="text-gray-500 text-sm line-clamp-2">{truncateText(description, 80)}</p>
        <p className="text-lg font-bold text-green-600">${price}</p>

        <div className="mt-4 w-full">
          {userId && role === "customer" ? (
            availability == 1 ? (
              <Button icon={<CookingPot />} fullWidth size="md" onClick={onAdd}>
                Add to My Order
              </Button>
            ) : (
              <Button icon={<CookingPot />} variant="error" disabled fullWidth size="md" onClick={onAdd}>
                Out of Stock
              </Button>
            )
          ) : (
            <Button fullWidth={true} disabled variant="success">
              Login as Customer
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};


export default MenuItemCard;
