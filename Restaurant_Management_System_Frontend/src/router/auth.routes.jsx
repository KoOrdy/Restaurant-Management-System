import { Route } from "react-router";
import { ProtectedRoute } from "../components/auth";
import { RootLayout } from "../pages/layouts";
import { AuthLayout, LoginPage, RegisterPage } from "../pages/auth";

export const authRoutes = (isLoggedIn) => (
  <>
    <Route 
      path="/"
      element={
        <ProtectedRoute isAllowed={!isLoggedIn} redirectPath="/">
          <RootLayout />
        </ProtectedRoute>
      }
  >
    <Route element={<AuthLayout />}>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/choose-account" element={<RegisterPage />} />
    </Route>
  </Route>
  </>
);