import React from "react";
import { Home, Users, CookingPot, ChefHat, HandHelping, Salad, Utensils, ChartLine } from "lucide-react"; // Import icons
import { Sidebar, SidebarDropdown, SidebarItem } from "../../components/ui";

const AdminSidebar = () => {
  return (
    <Sidebar title="Admin Dashboard" subtitle="Manage your system">
      {/* Sidebar Items */}
      <SidebarItem name="Home" icon={<Home size={20} />} to="/" />


      {/* Sidebar Dropdown */}
      <SidebarDropdown name="Users" icon={<Users size={20} />} open={true}>
        <SidebarItem name="Restaurant Managers" icon={<ChefHat size={20} />} to="/admin/restaurant-managers" />
        <SidebarItem name="Customers" icon={<Users size={20} />} to="/admin/customers" />
      </SidebarDropdown>

      <SidebarItem name="Restaurants" icon={<ChefHat size={20} />} to="/admin/restaurants" />

      <SidebarItem name="Food Categories" icon={<CookingPot size={20} />} to="/admin/food-categories" />
    </Sidebar>
  );
};

export default AdminSidebar;
