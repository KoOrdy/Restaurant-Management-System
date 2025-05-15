import { Route } from "react-router";
import { ProtectedRoute } from "../components/auth";
import { RootLayout } from "../pages/layouts";
import { ChatPage, ManageMenuItemsPage, ManageOrdersPage, ManageReservationsPage, TablesPage } from "../pages/manager";

export const managerRoutes = (isLoggedIn, userRole) => (
  <>
    <Route 
      path="/"
      element={
        <ProtectedRoute isAllowed={isLoggedIn && userRole == "manager"} redirectPath="/">
          <RootLayout />
        </ProtectedRoute>
      } 
  >
    <Route path="/manager/dashboard" element={<h1>dashboard</h1>} />

    
    <Route path="/manager/tables" element={<TablesPage />} />

    <Route path="/manager/menu-items" element={<ManageMenuItemsPage />} />

    <Route path="/manager/reservations" element={<ManageReservationsPage />} />

    <Route path="/manager/orders" element={<ManageOrdersPage />} />

    <Route path="/manager/chat" element={<ChatPage />} />
  </Route>
  </>
);