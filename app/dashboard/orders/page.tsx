import { db } from "@/server";
import { auth } from "@/server/auth";
import { orders } from "@/server/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

const OrdersPage = async () => {
  const user = await auth();
  if (!user) return { redirect: "/login" };

  const userOrders = await db.query.orders.findMany({
    where: eq(orders.userID, user.user.id),
    with: {
      // orderProduct: {
      //   with: {
      //     product: true,
      //     productVariants: true,
      //   },
      // },
    },
  });
  return <div>OrdersPage</div>;
};

export default OrdersPage;
