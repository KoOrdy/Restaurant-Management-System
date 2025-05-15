import { useLocation, useParams } from "react-router";
import { Button, Header, MenuItemCard, MenuTabs, SectionHeader } from "../../../components/ui";
import { useState } from "react";
import { useGetRestaurantByIdForCustomer } from "../../../hooks/customer/useRestaurantHook";
import { Minus, Plus, TrashIcon } from "lucide-react";
import { showToast } from "../../../utils";
import { useManageCustomerOrders } from "../../../hooks/customer/useOrderHook";

const Menu = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { restaurantID } = useParams();
  const category = queryParams.get("category");

  const { categories, isLoading } = useGetRestaurantByIdForCustomer(restaurantID);
  const [activeTab, setActiveTab] = useState("");
  const [orderItems, setOrderItems] = useState([]);

  const { makeOrder, isMakingOrder } = useManageCustomerOrders();


  if (isLoading) {
    return <div className="p-10 text-center text-lg">Loading menu...</div>;
  }

  const tabNames = categories?.map((cat) => cat.name) || [];

  if (!activeTab && tabNames.length > 0) {
    setActiveTab(tabNames[0]);
  }

  const activeCategory =
    category === "all" || category == null
      ? categories?.flatMap((cat) => cat.menuItems || [])
      : categories?.find((cat) => cat.name === category)?.menuItems;

  // Add or increase quantity
  const handleAddToOrder = (item) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...prev, { ...item, quantity: 1 }];
      }
    });
  };

  // Decrease quantity
  const handleDecrease = (id) => {
    setOrderItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove item
  const handleDelete = (id) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
  };

  const calculateTotal = () => {
    return orderItems
      .reduce((acc, item) => acc + parseFloat(item.price) * item.quantity, 0)
      .toFixed(2);
  };



  const handleMakeOrder = () => {
    const orderPayload = orderItems.map(item => ({
      menuItemId: item.id,
      quantity: item.quantity
    }));
  
    const reservationId = queryParams.get("reservationID");
  
    if (!reservationId) {
      return showToast("error", "Reservation ID is missing in the URL.");
    }
  
    makeOrder({
      restaurantId: restaurantID,
      reservationId,
      orderItems: orderPayload
    });
  };
  

  return (
    <div className="px-4 sm:px-8 md:px-16 py-10 space-y-8">
      {/* Header */}
      <Header
        heading="Check Our Yummy Menu"
        subtitle="Choose everything you want — your selection will be registered at your restaurant table."
      />

      {/* Menu Tabs */}
      <MenuTabs tabs={tabNames} activeTab={activeTab} onTabChange={setActiveTab} />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Order Section */}
        <div className="lg:w-1/4 w-full sticky top-10 h-full">
          <SectionHeader title="Your Order" />
          {orderItems.length > 0 ? (
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-4">
              {orderItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center border-b pb-2 last:border-b-0"
                >
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-500 truncate w-48">
                      {item.description}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Button
                        size="sm"
                        icon={<Minus className="w-full h-full" />}
                        onClick={() => handleDecrease(item.id)}
                      />
                      <span>{item.quantity}</span>
                      <Button
                        size="sm"
                        icon={<Plus className="w-full h-full" />}
                        onClick={() => handleAddToOrder(item)}
                      />
                      <Button
                        variant="error"
                        size="sm"
                        icon={<TrashIcon className="w-full h-full" />}
                        onClick={() => handleDelete(item.id)}
                      />
                    </div>
                  </div>
                  <span className="text-green-600 font-semibold">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="flex justify-between pt-4 border-t font-semibold text-lg">
                <span>Total</span>
                <span className="text-green-700">${calculateTotal()}</span>
              </div>
              <Button 
                fullWidth 
                onClick={handleMakeOrder} 
                isLoading={isMakingOrder} 
                variant="success"
              >
                Confirm Order
              </Button>

            </div>
          ) : (
            <div className="text-lg text-gray-500">
              Your order is empty. Start adding items to your order!
            </div>
          )}
        </div>


        {/* Menu Items */}
        <div className="lg:w-3/4 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {activeCategory?.map((item) => (
            <MenuItemCard
              key={item.id}
              image={item.imageUrl || "/default-image.webp"}
              title={item.name}
              description={item.description}
              price={item.price}
              availability={item.availability}
              onAdd={() => handleAddToOrder(item)}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Menu;
