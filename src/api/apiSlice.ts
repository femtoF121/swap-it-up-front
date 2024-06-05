import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_SERVER_URL}`, credentials: "include" }),
  endpoints: (builder) => ({
    //#region user
    login: builder.mutation({
      query: (credentials) => ({
        url: "/user/login",
        method: "POST",
        body: credentials,
      }),
    }),
    logout: builder.mutation<any, void>({
      query: () => ({
        url: "/user/logout",
        method: "DELETE",
      }),
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/user/register",
        method: "POST",
        body: credentials,
      }),
    }),
    changePassword: builder.mutation({
      query: (passwords) => ({
        url: "/user/ChangePassword",
        method: "POST",
        body: passwords,
      }),
    }),
    addDetails: builder.mutation({
      query: (details) => ({
        url: "/user/details",
        method: "POST",
        body: details,
      }),
    }),
    changeDetails: builder.mutation({
      query: (details) => {
        var bodyFormData = new FormData();
        for (const key in details) {
          bodyFormData.append(key, details[key]);
        }
        return {
          url: "/user/details",
          method: "PUT",
          body: bodyFormData,
          formData: true,
        };
      },
    }),
    getInfo: builder.query<any, void>({
      query: () => "/user",
    }),
    deleteUser: builder.mutation<any, void>({
      query: () => ({
        url: "/user",
        method: "DELETE",
      }),
    }),
    getDetails: builder.query<any, void>({
      query: () => "/user/details",
    }),
    getAvatar: builder.query<any, void>({
      query: (id) => ({ url: `/user/details/${id}/avatar`, responseHandler: (response) => response.text() }),
    }),
    //#endregion

    //#region item
    getItems: builder.query({
      query: (search = "", page = 1, perPage = 10) => `/items/others?Search=${search}&Page=${page}&PerPage=${perPage}`,
    }),
    getMyItems: builder.query<any, void>({
      query: () => "/items/own",
    }),
    getItem: builder.query({
      query: (id) => `/items/${id}`,
    }),
    changeItem: builder.mutation({
      query: (item) => {
        const id = item.id;
        delete item.id;
        return {
          url: `/items/${id}`,
          method: "PUT",
          body: item,
        };
      },
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
    }),
    addItem: builder.mutation({
      query: (item) => ({
        url: "/items",
        method: "POST",
        body: item,
      }),
    }),
    getItemPicture: builder.query<any, void>({
      query: (id) => `/items/pictures/${id}`,
    }),
    deleteItemPicture: builder.mutation({
      query: (id) => ({
        url: `/items/pictures/${id}`,
        method: "DELETE",
      }),
    }),
    addItemPicture: builder.mutation({
      query: (picture) => {
        const formData = new FormData();
        formData.append("file", picture);
        return {
          url: "/items/pictures",
          method: "POST",
          body: formData,
          formData: true,
        };
      },
    }),
    //#endregion

    //#region deals
    //#endregion

    //#region colors
    getColors: builder.query<any, void>({
      query: () => "/colors?PerPage=1000",
    }),
    addColor: builder.mutation({
      query: (color) => ({
        url: "/colors",
        method: "POST",
        body: color,
      }),
    }),
    deleteColor: builder.mutation({
      query: (name) => ({
        url: "/colors",
        method: "DELETE",
        body: name,
      }),
    }),
    //#endregion

    //#region category
    getCategories: builder.query<any, void>({
      query: () => "/categories?PerPage=1000",
    }),
    addCategory: builder.mutation({
      query: (name) => ({
        url: "/categories",
        method: "POST",
        body: name,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (name) => ({
        url: "/categories",
        method: "DELETE",
        body: name,
      }),
    }),
    //#endregion
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useGetInfoQuery,
  useLazyGetInfoQuery,
  useChangePasswordMutation,
  useGetDetailsQuery,
  useLazyGetDetailsQuery,
  useAddDetailsMutation,
  useChangeDetailsMutation,
  useDeleteUserMutation,
  useLazyGetAvatarQuery,

  useGetItemsQuery,
  useLazyGetItemsQuery,
  useGetMyItemsQuery,
  useGetItemQuery,
  useChangeItemMutation,
  useDeleteItemMutation,
  useAddItemMutation,
  useGetItemPictureQuery,
  useDeleteItemPictureMutation,
  useAddItemPictureMutation,

  useGetColorsQuery,
  useAddColorMutation,
  useDeleteColorMutation,

  useGetCategoriesQuery,
  useAddCategoryMutation,
  useDeleteCategoryMutation,
} = apiSlice;
