import { lazy } from "react";

import { Route } from "./components";

import { RoutesEnum } from "@/enums";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("@/pages/home"));
const Error404Page = lazy(() => import("@/pages/404"));

export const router = createBrowserRouter([
  {
    path: RoutesEnum.HOME,
    Component: () => <Route component={Home} />,
    errorElement: <Error404Page />,
  },
]);
