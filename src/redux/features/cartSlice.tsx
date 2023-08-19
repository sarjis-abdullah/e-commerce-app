import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IProduct } from "./productSlice";

export interface cartState {
  value: number;
  cartProductsCount: number;
  cartProducts: Array<IProduct>;
};

const initialState: cartState = {
  value: 0,
  cartProducts: [],
  cartProductsCount: 0,
};

const isProductAlreadyInCart = (cartProducts: Array<IProduct>, newProduct: IProduct)=> cartProducts.find(item=> item.id === newProduct.id)

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    add: (state, action: PayloadAction<any>) => {
      const payload: any = {...action.payload}
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
            invidualTotal: parseFloat(item?.price) * newQty
          }
        })
      }else{
        ++state.cartProductsCount
        state.cartProducts = [...cartProducts, {...payload, quantity: 1, invidualTotal: payload.price}]
      }
    },
    decrement: (state, action: PayloadAction<any>) => {
      const payload: any = {...action.payload}
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
            invidualTotal: parseFloat(item.price) * newQty
          }
        }).filter(item => item != null) as IProduct[];
      }else{
        ++state.cartProductsCount
        state.cartProducts = [...cartProducts, {...payload, quantity: 1, invidualTotal: payload.price}]
      }
    },
    remove: (state, action: PayloadAction<any>) => {
      const payload: any = {...action.payload}
      const {cartProducts} = state
      --state.cartProductsCount
      state.cartProducts = cartProducts.filter(item=> item.id != payload?.id)
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
