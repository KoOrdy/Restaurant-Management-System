import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import { authRoutes } from "./auth.routes";
import { adminRoutes } from "./admin.routes";
import { managerRoutes } from "./manager.routes";
import { customerRoutes } from "./customer.routes";
import { errorRoutes } from "./error.routes";
import { publicRoutes } from "./public.routes";

const createAppRouter = (isLoggedIn, userRole) =>
  createBrowserRouter(
    createRoutesFromElements(
      <>
        {publicRoutes}
        {authRoutes(isLoggedIn)}
        {adminRoutes(isLoggedIn, userRole)}
        {managerRoutes(isLoggedIn, userRole)}
        {customerRoutes(isLoggedIn, userRole)}
        {errorRoutes}
      </>
    )
  );

export default createAppRouter;