import StatusBar from "./StatusBar";
import OrderItemList from "./OrderItemList";
import StatusBadge from "./StatusBadge";
import Button from "./Button";
import { useSelector } from "react-redux";

const statusVariantMap = {
  Pending: "neutral",
  Preparing: "warning",
  Ready: "info",
  Delivered: "success",
  Cancelled: "error",
};

const OrderCard = ({ order, onEdit }) => {
  const { userId, role } = useSelector((state) => state.auth);  // Now inside a component

  const { id, customerName, status, totalAmount, orderItems } = order;
  const variant = statusVariantMap[status] || "neutral";

  return (
    <div
      className="
        flex flex-col justify-between
        bg-white p-4 sm:p-5 md:p-6 
        rounded-xl shadow-md border 
        space-y-4 
        w-full 
        h-full
        transition-all duration-200 ease-in-out
      "
    >
      <div className="flex justify-between items-start flex-wrap gap-2">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">Order #{id}</h2>
          <p className="text-sm text-gray-500">Customer: {customerName}</p>
        </div>
        <StatusBadge variant={variant}>{status}</StatusBadge>
      </div>

      <OrderItemList items={orderItems} />

      <div className="text-right font-semibold text-gray-800">
        Total: ${totalAmount}
      </div>

      <StatusBar currentStatus={status} />

      {userId && role == "manager" &&
        <div className="flex justify-end">
          <Button variant="secondary" onClick={onEdit}>
            Change Status
          </Button>
        </div>
      }
    </div>
  );
};

export default OrderCard;
