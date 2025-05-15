import { Route } from "react-router";
import { RootLayout } from "../pages/layouts";

export const errorRoutes = (
    <Route path="/" element={<RootLayout />}>
      <Route
        path="/unauthorized"
        element={<h1>401 unauthorized</h1>}
      />
      <Route
        path="/forbidden"
        element={<h1>403 forbidden</h1>}
      />
      <Route
        path="/server-error"
        element={<h1>500 server-error</h1>}
      />
      <Route
        path="*"
        element={<h1>404 page not found</h1>}
      />
    </Route>
);