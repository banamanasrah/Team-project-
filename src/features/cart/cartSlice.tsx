import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// ✅ أضفنا هذا التعريف لحل مشكلة التايب سكريبت
export interface ProductInCart {
  id: string | number;
  title?: string;
  price: number;
  quantity: number;
  image?: string;
  stock?: number;
}

type CartState = {
  productsInCart: ProductInCart[];
  subtotal: number;
};

const initialState: CartState = {
  productsInCart: [],
  subtotal: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToTheCart: (state, action: PayloadAction<ProductInCart>) => {
      const product = state.productsInCart.find(
        (product) => product.id === action.payload.id
      );
      if (product) {
        state.productsInCart = state.productsInCart.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              quantity: product.quantity + action.payload.quantity,
            };
          }
          return product;
        });
      } else {
        state.productsInCart.push(action.payload);
      }
      cartSlice.caseReducers.calculateTotalPrice(state);
    },
    removeProductFromTheCart: (
      state,
      action: PayloadAction<{ id: string | number }>
    ) => {
      state.productsInCart = state.productsInCart.filter(
        (product) => product.id !== action.payload.id
      );
      cartSlice.caseReducers.calculateTotalPrice(state);
    },
    updateProductQuantity: (
      state,
      action: PayloadAction<{ id: string | number; quantity: number }>
    ) => {
      state.productsInCart = state.productsInCart.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            quantity: action.payload.quantity,
          };
        }
        return product;
      });
      cartSlice.caseReducers.calculateTotalPrice(state);
    },
    calculateTotalPrice: (state) => {
      state.subtotal = state.productsInCart.reduce(
        (acc, product) => acc + (product.price * product.quantity),
        0
      );
    },
    /** Clear the entire cart after a successful checkout. */
    clearCart: (state) => {
      state.productsInCart = [];
      state.subtotal = 0;
    },
  },
});

export const {
  addProductToTheCart,
  removeProductFromTheCart,
  updateProductQuantity,
  calculateTotalPrice,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;