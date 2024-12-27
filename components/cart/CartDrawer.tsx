"use client";

import { useCartStore } from "@/store";
import { ShoppingBagIcon } from "lucide-react";

const CartDrawer = () => {
  const { cart } = useCartStore();
  return (
    <div>
      <ShoppingBagIcon />
    </div>
  );
};

export default CartDrawer;
