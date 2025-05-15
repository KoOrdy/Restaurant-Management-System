import { useLocation, useParams } from "react-router";
import { Header, MenuItemCard, MenuTabs } from "../../../components/ui";
import { useState } from "react";
import { useGetRestaurantByIdForCustomer } from "../../../hooks/customer/useRestaurantHook";
import { showToast } from "../../../utils";

const MenuForGuest = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const { restaurantID } = useParams();
  const category = queryParams.get("category");

  console.log(restaurantID);
  

  const { categories, isLoading } = useGetRestaurantByIdForCustomer(restaurantID);
  const [activeTab, setActiveTab] = useState("");

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

  console.log(categories);
  

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
        {/* Menu Items */}
        <div className=" w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-5">
          {activeCategory?.map((item) => (
            <MenuItemCard
              key={item.id}
              image={item.imageUrl || "/default-image.webp"}
              title={item.name}
              description={item.description}
              price={item.price}
              availability={item.availability}
              onAdd={() => showToast("error", "You must book Table first.")}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuForGuest;
