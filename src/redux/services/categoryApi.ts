import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com/",
  }),
  endpoints: (builder) => ({
    getCategories: builder.query<Array<string>, null>({
      query: () => "products/categories",
    })
  }),
});

export const { useGetCategoriesQuery } = categoryApi;