import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface cartState {
  value: number;
  cartProductsCount: number;
  cartProducts: Array<productItem>;
};
export interface productItem {
  id: number;
  title: string;
  price: never;
  description: string;
  category: string;
  image: string;
  rating: object;
  quantity: number;
};

const initialState: cartState = {
  value: 0,
  cartProducts: [],
  cartProductsCount: 0,
};

const isProductAlreadyInCart = (cartProducts: Array<productItem>, newProduct: productItem)=> cartProducts.find(item=> item.id === newProduct.id)

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action) => {
      const payload = {...action.payload}
      const {cartProducts} = state
      if (isProductAlreadyInCart(cartProducts, payload)) {
        state.cartProducts = cartProducts.map(item=> {
          return {
            ...item,
            quantity: item.quantity + 1
          }
        })
      }else{
        ++state.cartProductsCount
        state.cartProducts = [...cartProducts, {...payload, quantity: 1}]
      }
    },
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, increment, decrement, incrementByAmount } = cartSlice.actions;

export default cartSlice.reducer;
