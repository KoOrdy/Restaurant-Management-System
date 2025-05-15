import { Route } from "react-router";
import { ProtectedRoute } from "../components/auth";
import { RootLayout } from "../pages/layouts";
import { ManageCustomersPage, ManageFoodCategoriesPage, ManageOrdersPage, ManageReservationsPage, ManageRestaurantManagersPage, ManageRestaurantsPage } from "../pages/admin";

export const adminRoutes = (isLoggedIn, userRole) => (
  <>
    <Route 
      path="/"
      element={
        <ProtectedRoute isAllowed={isLoggedIn && userRole == "admin"} redirectPath="/">
          <RootLayout />
        </ProtectedRoute>
      } 
  >
    <Route path="/admin/dashboard" element={<h1>Dashboard</h1>} />
    <Route path="/admin/restaurant-managers" element={<ManageRestaurantManagersPage />} />
    <Route path="/admin/customers" element={<ManageCustomersPage />} />
    <Route path="/admin/restaurants" element={<ManageRestaurantsPage />} />
    <Route path="/admin/food-categories" element={<ManageFoodCategoriesPage />} />
    <Route path="/admin/orders" element={<h1>Orders</h1>} />
    <Route path="/admin/reservations/:restaurantID" element={<ManageReservationsPage />} />
    <Route path="/admin/orders/:restaurantID" element={<ManageOrdersPage />} />
  </Route>
  </>
);