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
  invidualTotal: number;
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
          if (payload.id != item.id) {
            return item
          }
          const newQty = item.quantity + 1
          return {
            ...item,
            quantity: newQty,
            invidualTotal: Number(newQty * item.price).toFixed(2)
          }
        })
      }else{
        ++state.cartProductsCount
        state.cartProducts = [...cartProducts, {...payload, quantity: 1, invidualTotal: payload.price}]
      }
    },
    decrement: (state, action) => {
      const payload = {...action.payload}
      const {cartProducts} = state
      if (isProductAlreadyInCart(cartProducts, payload)) {
        state.cartProducts = cartProducts.map(item=> {
          if (payload.id != item.id) {
            return item
          }
          const newQty = item.quantity - 1
          if (newQty == 0) {
            --state.cartProductsCount
            return null
          }
          return {
            ...item,
            quantity: newQty,
            invidualTotal: Number(newQty * item.price).toFixed(2)
          }
        }).filter(item => item != null)
      }else{
        ++state.cartProductsCount
        state.cartProducts = [...cartProducts, {...payload, quantity: 1, invidualTotal: payload.price}]
      }
    },
    remove: (state, action) => {
      const payload = {...action.payload}
      const {cartProducts} = state
      --state.cartProductsCount
      state.cartProducts = cartProducts.filter(item=> item.id != payload.id)
    },
    removeAll: (state) => {
      state.cartProductsCount = 0
      state.cartProducts = []
    },
  },
});

// Action creators are generated for each case reducer function
export const { add, remove, decrement, removeAll } = cartSlice.actions;

export default cartSlice.reducer;
