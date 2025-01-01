import getStripe from "@/lib/getStripe";
import { useCartStore } from "@/store";
import { Elements } from "@stripe/react-stripe-js";
import { motion } from "framer-motion";
import PaymentForm from "./PaymentForm";

const stripe = getStripe();
const Payment = () => {
  const { cart } = useCartStore();
  const totalPrice = cart.reduce((acc, item) => {
    return (acc + item.price * item.variant.quantity) * 100;
  }, 0);
  return (
    <motion.div>
      <Elements
        stripe={stripe}
        options={{ mode: "payment", currency: "usd", amount: totalPrice }}
      >
        <PaymentForm totalPrice={totalPrice} />
      </Elements>
    </motion.div>
  );
};

export default Payment;
