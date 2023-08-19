import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cartSlice';
import productReducer from './features/productSlice';
import { productApi } from "./services/productApi";
import { categoryApi } from "./services/categoryApi";

export const store = configureStore({
  reducer: {
    cartReducer,
    productReducer,
    [productApi.reducerPath]: productApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([productApi.middleware, categoryApi.middleware]),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch