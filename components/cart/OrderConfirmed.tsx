"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useCartStore } from "@/store";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import orderConfirmed from "@/public/order-confirmed.json";
const OrderConfirmed = () => {
  const { setCheckoutProgress } = useCartStore();
  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-2xl font-medium">Thank you for your purchase</h2>
      <Link href={"/dashboard/orders"}>
        <Button onClick={() => setCheckoutProgress("cart-page")}>
          View your order
        </Button>
      </Link>
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Lottie className="h-48 my-4" animationData={orderConfirmed} />
      </motion.div>
    </div>
  );
};

export default OrderConfirmed;
