import { lazy } from "react";

import { Route } from "./components";

import { RoutesEnum } from "@/enums";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("@/pages/home"));
const SignInPage = lazy(() => import("@/pages/auth/sign-in"));
const SignUpPage = lazy(() => import("@/pages/auth/sign-up"));
const AddItemPage = lazy(() => import("@/pages/add-item"));
const Error404Page = lazy(() => import("@/pages/404"));

export const router = createBrowserRouter([
  {
    path: RoutesEnum.HOME,
    Component: () => <Route component={Home} />,
    errorElement: <Error404Page />,
  },
  {
    path: RoutesEnum.SIGN_IN,
    Component: () => <Route component={SignInPage} />,
    errorElement: <Error404Page />,
  },
  {
    path: RoutesEnum.SIGN_UP,
    Component: () => <Route component={SignUpPage} />,
    errorElement: <Error404Page />,
  },
  {
    path: RoutesEnum.ADD_ITEM,
    Component: () => <Route component={AddItemPage} />,
    errorElement: <Error404Page />,
  },
]);
