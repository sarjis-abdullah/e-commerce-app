import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IProduct {
  id: number;
  title: string;
  image: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: object;
  quantity: number;
  invidualTotal: number;
};

export const productApi = createApi({
  reducerPath: "productApi",
  refetchOnFocus: true,
  baseQuery: fetchBaseQuery({
    baseUrl: "https://fakestoreapi.com/",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], { searchQuery: string }>({
      query: ({ searchQuery }) => `products${searchQuery}`,
    }),
    getProductById: builder.query<IProduct, { id: number }>({
      query: ({ id }) => `products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productApi;