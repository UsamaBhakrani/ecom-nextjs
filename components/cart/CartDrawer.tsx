"use client";

import { useCartStore } from "@/store";
import { ShoppingBagIcon } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import CartItems from "./CartItems";
import CartMessage from "./CartMessage";
import Payment from "./Payment";
const CartDrawer = () => {
  const { cart, checkoutProgress, setCheckoutProgress } = useCartStore();
  return (
    <Drawer>
      <DrawerTrigger>
        <div className="relative px-2">
          <AnimatePresence>
            {cart.length > 0 && (
              <motion.span
                animate={{ scale: 1, opacity: 1 }}
                initial={{ opacity: 0, scale: 0 }}
                exit={{ scale: 0, opacity: 0 }}
                className="absolute flex items-center justify-center -top-1 -right-0.5 h-4 w-4 dark:bg-primary bg-primary text-white rounded-full text-xs font-bold"
              >
                {cart.length}
              </motion.span>
            )}
            <ShoppingBagIcon />
          </AnimatePresence>
        </div>
      </DrawerTrigger>
      <DrawerContent className="min-h-50vh">
        <DrawerHeader>
          <DrawerTitle className="flex items-center justify-center">
            <CartMessage />
          </DrawerTitle>
        </DrawerHeader>
        <div className="overflow-auto p-4">
          {checkoutProgress === "cart-page" && <CartItems />}
          {checkoutProgress === "payment-page" && <Payment />}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
