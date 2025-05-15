import { Route } from "react-router";
import { ProtectedRoute } from "../components/auth";
import { RootLayout } from "../pages/layouts";
import { MenuPage } from "../pages/customer";

export const customerRoutes = (isLoggedIn, userRole) => (
  <>
    <Route 
      path="/"
      element={
        <ProtectedRoute isAllowed={isLoggedIn && userRole == "customer"} redirectPath="/">
          <RootLayout />
        </ProtectedRoute>
      } 
  >
      <Route path="/customer/restaurants/:restaurantID/menu" element={<MenuPage />} />
  </Route>
  </>
);