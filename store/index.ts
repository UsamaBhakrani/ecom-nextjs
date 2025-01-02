import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export type Variant = {
  variantID: number;
  quantity: number;
};

export type CartItem = {
  name: string;
  image: string;
  id: number;
  variant: Variant;
  price: number;
};

export type CartState = {
  cart: CartItem[];
  checkoutProgress: "cart-page" | "payment-page" | "confirmation-page";
  cartOpen: boolean;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
  setCartOpen: (val: boolean) => void;
  setCheckoutProgress: (
    val: "cart-page" | "payment-page" | "confirmation-page"
  ) => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      cart: [],
      cartOpen: false,
      setCartOpen: (val) => set(() => ({ cartOpen: val })),
      clearCart: () => set({ cart: [] }),
      checkoutProgress: "cart-page",
      setCheckoutProgress: (val) => set(() => ({ checkoutProgress: val })),
      addToCart: (item) =>
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem.variant.variantID === item.variant.variantID
          );
          if (existingItem) {
            const updatedCart = state.cart.map((cartItem) => {
              if (cartItem.variant.variantID === item.variant.variantID) {
                return {
                  ...cartItem,
                  variant: {
                    ...cartItem.variant,
                    quantity: cartItem.variant.quantity + item.variant.quantity,
                  },
                };
              }
              return cartItem;
            });
            return { cart: updatedCart };
          } else {
            return {
              cart: [
                ...state.cart,
                {
                  ...item,
                  variant: {
                    variantID: item.variant.variantID,
                    quantity: item.variant.quantity,
                  },
                },
              ],
            };
          }
        }),
      removeFromCart: (item) =>
        set((state) => {
          const updatedCart = state.cart.map((cartItem) => {
            if (cartItem.variant.variantID === item.variant.variantID) {
              return {
                ...cartItem,
                variant: {
                  ...cartItem.variant,
                  quantity: cartItem.variant.quantity - 1,
                },
              };
            }
            return cartItem;
          });
          return {
            cart: updatedCart.filter(
              (cartItem) => cartItem.variant.quantity > 0
            ),
          };
        }),
    }),
    { name: "cart-storage" }
  )
);
