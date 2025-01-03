import { db } from "@/server";
import { auth } from "@/server/auth";
import { orders, productVariants } from "@/server/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";
import { cn, formatDateTime } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

const OrdersPage = async () => {
  const user = await auth();
  if (!user) redirect("/login");

  const userOrders = await db.query.orders.findMany({
    where: eq(orders.userID, user.user.id),
    with: {
      orderProduct: {
        with: {
          productVariants: { with: { variantImages: true } },
          order: true,
          products: true,
        },
      },
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Orders</CardTitle>
        <CardDescription>Check the status of your orders</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of your recent orders.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Order Number</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {userOrders.map((order) => {
              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>$ {order.total}</TableCell>
                  <Badge
                    className={
                      order.status === "succeeded"
                        ? "bg-green-700"
                        : "bg-secondary-foreground"
                    }
                  >
                    {order.status}
                  </Badge>
                  <TableCell>
                    {formatDateTime(order.created_at!).dateTime}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost">
                            <MoreHorizontal size={16} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>
                            <DialogTrigger>
                              <Button className="w-full" variant="ghost">
                                View Details
                              </Button>
                            </DialogTrigger>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Order Details #{order.id}</DialogTitle>
                        </DialogHeader>
                        <Card className="overflow-auto p-2 flex flex-col gap-4">
                          {order.orderProduct.map(
                            ({ products, productVariants, quantity }) => {
                              return (
                                <div
                                  className="flex items-center"
                                  key={products.id}
                                >
                                  <Image
                                    src={productVariants.variantImages[0].url}
                                    width={48}
                                    height={48}
                                    alt={products.title}
                                  />
                                  <div className="">
                                    <p>{products.title}</p>
                                    <p>{productVariants.productType}</p>
                                  </div>
                                  <div className="">
                                    <p>Price: $ {products.price}</p>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </Card>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default OrdersPage;
