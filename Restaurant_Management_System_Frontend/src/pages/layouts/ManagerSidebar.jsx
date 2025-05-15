import React from "react";
import { Home, Users, CookingPot, ChefHat, HandHelping, Salad, Utensils, ChartLine, Pizza, Armchair, NotebookPen, MessageSquare } from "lucide-react"; // Import icons
import { Sidebar, SidebarDropdown, SidebarItem } from "../../components/ui";

const ManagerSidebar = () => {
  return (
    <Sidebar title="Manager Dashboard" subtitle="Manage your resaurant">
      {/* Sidebar Items */}
      <SidebarItem name="Home" icon={<Home size={20} />} to="/" />


      <SidebarItem name="Resturant Tables " icon={<Armchair size={20} />} to="/manager/tables" />

      <SidebarItem name="Menu Items" icon={<Pizza size={20} />} to="/manager/menu-items" />

      <SidebarItem name="Reservations" icon={<NotebookPen size={20} />} to="/manager/reservations" />

      <SidebarItem name="Orders" icon={<CookingPot size={20} />} to="/manager/orders" />

      <SidebarItem name="Chats" icon={<MessageSquare size={20} />} to="/manager/chat" />
    </Sidebar>
  );
};

export default ManagerSidebar;
