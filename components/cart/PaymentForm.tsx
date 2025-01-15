"use client";

import { useCartStore } from "@/store";
import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Button } from "../ui/button";
import { FormEvent, useState } from "react";
import { createPaymentIntent } from "@/server/actions/createPaymentIntent";
import { useAction } from "next-safe-action/hooks";
import { createOrder } from "@/server/actions/createOrder";
import { toast } from "sonner";

const PaymentForm = ({ totalPrice }: { totalPrice: number }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { cart, setCheckoutProgress, clearCart } = useCartStore();

  const { execute, status } = useAction(createOrder, {
    onSuccess: (data) => {
      if (data.error) {
        toast.error(data.error);
        setIsLoading(false);
        setErrorMessage(data.error);
      }
      if (data.success) {
        toast.success(data.success);
        setIsLoading(false);
        setErrorMessage("");
        clearCart();
        setCheckoutProgress("confirmation-page");
      }
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setIsLoading(false);
      setErrorMessage(submitError.message!);
      return;
    }

    const { data } = await createPaymentIntent({
      amount: totalPrice,
      currency: "usd",
      cart: cart.map((item) => ({
        quantity: item.variant.quantity,
        productID: item.id,
        title: item.name,
        price: item.price,
        image: item.image,
      })),
    });

    if (data?.error) {
      setIsLoading(false);
      setErrorMessage(data.error);
      return;
    }
    if (data?.success) {
      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret: data.success.clientSecret!,
        redirect: "if_required",
        confirmParams: {
          return_url: "http://localhost.com",
          receipt_email: data.success.user!,
        },
      });
      if (error) {
        setErrorMessage(error.message!);
        setIsLoading(false);
        return;
      } else {
        setIsLoading(false);
        execute({
          status: "pending",
          total: totalPrice,
          paymentIntentID: data.success.paymentIntentID,
          products: cart.map((item) => ({
            productID: item.id,
            variantID: item.variant.variantID,
            quantity: item.variant.quantity,
          })),
        });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <AddressElement options={{ mode: "shipping" }} />
      <Button
        className="max-w-2xl my-4 w-full"
        disabled={!stripe || !elements || isLoading}
      >
        {isLoading ? "Processing..." : `Pay $${totalPrice}`}
      </Button>
    </form>
  );
};

export default PaymentForm;
