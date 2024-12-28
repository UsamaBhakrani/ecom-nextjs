"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatPrice } from "@/lib/formatPrice";
import { CartItem, useCartStore } from "@/store";
import { MinusCircle, PlusCircle } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lottie from "lottie-react";
import emptyCart from "@/public/empty-box1.json";
import { Button } from "../ui/button";
const CartItems = () => {
  const { cart, addToCart, removeFromCart } = useCartStore();
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.price * item.variant.quantity,
      0
    );
  }, [cart]);

  const priceInLetters = useMemo(() => {
    return [...totalPrice.toFixed(2).toString()].map((letter) => {
      return { letter, id: Math.random() };
    });
  }, [totalPrice]);

  return (
    <motion.div className="flex flex-col items-center">
      {cart.length === 0 && (
        <div className="flex flex-col w-full items-center justify-center">
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-2xl text-muted-foreground text-center">
              Your cart is empty
            </h2>
            <Lottie animationData={emptyCart} className="h-64" />
          </motion.div>
        </div>
      )}
      {cart.length > 0 && (
        <div className="h-80 overflow-y-auto">
          <Table className="max-w-2xl mx-auto">
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Quantity</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cart.map((item) => {
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{formatPrice(item.price)}</TableCell>
                    <TableCell>
                      <div>
                        <Image
                          src={item.image}
                          alt={item.name}
                          priority
                          height={48}
                          width={48}
                          className="rounded-md"
                        />
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-between">
                        <MinusCircle
                          className="cursor-pointer hover:text-muted-foreground duration-300 transition-colors"
                          size={14}
                          onClick={() =>
                            removeFromCart({
                              ...item,
                              variant: {
                                quantity: 1,
                                variantID: item.variant.variantID,
                              },
                            })
                          }
                        />
                        <p className="text-md font-bold">
                          {item.variant.quantity}
                        </p>
                        <PlusCircle
                          className="cursor-pointer hover:text-muted-foreground duration-300 transition-colors"
                          size={14}
                          onClick={() =>
                            addToCart({
                              ...item,
                              variant: {
                                quantity: 1,
                                variantID: item.variant.variantID,
                              },
                            })
                          }
                        />
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
      {cart.length > 0 && (
        <motion.div className="flex items-center justify-center overflow-hidden relative my-4">
          <span className="text-md">Total: $</span>
          <AnimatePresence mode="popLayout">
            {priceInLetters.map((letter, index) => (
              <motion.div key={letter.id}>
                <motion.span
                  className="text-md inline-block"
                  initial={{ y: 20 }}
                  animate={{ y: 0 }}
                  exit={{ y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {letter.letter}
                </motion.span>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
      <Button disabled={cart.length === 0} className="max-w-md w-full">
        Checkout
      </Button>
    </motion.div>
  );
};

export default CartItems;
