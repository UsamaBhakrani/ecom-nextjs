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

const CartItems = () => {
  const { cart, addToCart, removeFromCart } = useCartStore();
  const totalPrice = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.price * item.variant.quantity,
      0
    );
  }, [cart]);

  return (
    <div>
      {cart.length === 0 && <div className="">Cart is empty</div>}
      {cart.length > 0 && (
        <Table>
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
      )}
    </div>
  );
};

export default CartItems;
