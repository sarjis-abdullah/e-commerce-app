import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "../services/productApi";

export interface productState {
  products: Array<productItem>;
};
export interface productItem {
  id: number;
  title: string;
  price: never;
  description: string;
  category: string;
  image: string;
  rating?: {
    count: number,
    rate: number,
  };
  quantity: number;
};

const initialState: productState = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<productItem[]>) => {
      state.products = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProducts } = productSlice.actions;

export default productSlice.reducer;
