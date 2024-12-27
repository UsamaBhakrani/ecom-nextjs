"use client";

import { CartItem, useCartStore } from "@/store";
import { useState } from "react";
import { Button } from "../ui/button";
import { Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { redirect, useSearchParams } from "next/navigation";

const AddCart = () => {
  const { cart, addToCart } = useCartStore();
  const [quantity, setQuantity] = useState(1);
  const searchParams = useSearchParams();
  const id = Number(searchParams.get("id"));
  const productID = Number(searchParams.get("productID"));
  const type = searchParams.get("type");
  const title = searchParams.get("title");
  const image = searchParams.get("image");
  const price = Number(searchParams.get("price"));
  const [item, setItem] = useState<CartItem>({
    id: productID,
    variant: { variantID: id, quantity },
    image: image!,
    name: title + type!,
    price: price!,
  });

  if (!id || !productID || !type || !title || !image || !price) {
    toast.error("Product not found");
    return redirect("/");
  }

  return (
    <>
      <div className="flex items-center justify-stretch gap-4 mt-4">
        <Button
          onClick={() => {
            if (quantity > 1) {
              setQuantity(quantity - 1);
            }
          }}
          className="text-primary"
          variant="secondary"
        >
          <Minus size={18} strokeWidth={3} />
        </Button>
        <Button className="flex-1">Quantity: {quantity}</Button>
        <Button
          onClick={() => {
            setQuantity(quantity + 1);
          }}
          className="text-primary"
          variant="secondary"
        >
          <Plus size={18} strokeWidth={3} />
        </Button>
      </div>
      <Button
        className="my-4 mt-4"
        onClick={() => {
          toast.success(`Added ${title + " " + type} to your cart`);
          addToCart(item);
        }}
      >
        Add to Cart
      </Button>
    </>
  );
};

export default AddCart;
