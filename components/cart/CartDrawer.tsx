"use client";

import { useCartStore } from "@/store";
import { ShoppingBagIcon } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
const CartDrawer = () => {
  const { cart } = useCartStore();
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
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Are you absolutely sure?</DrawerTitle>
          <DrawerDescription>This action cannot be undone.</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <Button>Checkout</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CartDrawer;
