import { lazy } from "react";

import { Route } from "./components";

import { RoutesEnum } from "@/enums";
import { createBrowserRouter } from "react-router-dom";

const Home = lazy(() => import("@/pages/home"));
const SignInPage = lazy(() => import("@/pages/auth/sign-in"));
const SignUpPage = lazy(() => import("@/pages/auth/sign-up"));
const AddItemPage = lazy(() => import("@/pages/add-item"));
const EditItemPage = lazy(() => import("@/pages/edit-item"));
const ItemDetailsPage = lazy(() => import("@/pages/item-details"));
const SettingsPage = lazy(() => import("@/pages/settings"));
const MyItemsPage = lazy(() => import("@/pages/my-items"));
const MyDealsPage = lazy(() => import("@/pages/my-deals"));
const ChatsPage = lazy(() => import("@/pages/chats"));
const ProfilePage = lazy(() => import("@/pages/profile"));
const AdminPage = lazy(() => import("@/pages/admin"));
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
  {
    path: RoutesEnum.EDIT_ITEM,
    Component: () => <Route component={EditItemPage} />,
    errorElement: <Error404Page />,
  },
  {
    path: RoutesEnum.ITEM,
    Component: () => <Route component={ItemDetailsPage} />,
    errorElement: <Error404Page />,
  },
  {
    path: RoutesEnum.SETTINGS,
    Component: () => <Route component={SettingsPage} />,
    errorElement: <Error404Page />,
  },
  {
    path: RoutesEnum.MY_ITEMS,
    Component: () => <Route component={MyItemsPage} />,
    errorElement: <Error404Page />,
  },
  {
    path: RoutesEnum.MY_DEALS,
    Component: () => <Route component={MyDealsPage} />,
    errorElement: <Error404Page />,
  },
  {
    path: RoutesEnum.CHATS,
    Component: () => <Route component={ChatsPage} />,
    errorElement: <Error404Page />,
  },
  {
    path: RoutesEnum.PROFILE,
    Component: () => <Route component={ProfilePage} />,
    errorElement: <Error404Page />,
  },
  {
    path: RoutesEnum.ADMIN,
    Component: () => <Route component={AdminPage} />,
    errorElement: <Error404Page />,
  },
  {
    path: "*",
    element: <Error404Page />,
  },
]);
