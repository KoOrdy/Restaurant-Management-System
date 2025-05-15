import { Route } from "react-router";
import { RootLayout } from "../pages/layouts";
import { HomePage, MenuForGuestPage, RestaurantsPage, RestaurantTablesPage } from "../pages/public";

export const publicRoutes = (
  <Route path="/" element={<RootLayout />}>
    <Route index element={<HomePage />} />
    <Route path="/home" element={<HomePage />} />
    <Route path="/restaurants">
      <Route index element={<RestaurantsPage />} />
      <Route path=":restaurantID/menu" element={<MenuForGuestPage />} />
      <Route path=":restaurantID/tables" element={<RestaurantTablesPage />} />
    </Route>
  </Route>
);
