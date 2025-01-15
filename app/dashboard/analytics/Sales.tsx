import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TotalOrders } from "@/lib/inferTypes";
import Image from "next/image";
import placeholderUser from "@/public/placeholder-user.jpg";
const Sales = ({ totalOrders }: { totalOrders: TotalOrders[] }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>New Sales</CardTitle>
        <CardDescription>Here are your recent sales</CardDescription>
        <CardContent>
          <Table>
            <TableCaption>A list of your recent sales.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Item</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Image</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {totalOrders.map(({ order, products, quantity }) => (
                <TableRow key={order.id}>
                  {order.user ? (
                    <div className="flex gap-2 items-center">
                      <Image
                        src={order.user.image!}
                        width={25}
                        height={25}
                        alt={order.user.name!}
                        className="rounded-full h-8 w-8"
                      />
                      <TableCell>{order.user.name}</TableCell>
                    </div>
                  ) : (
                    <div className="flex gap-2 items-center justify-center">
                      <Image
                        src={placeholderUser}
                        width={25}
                        height={25}
                        alt="User not found"
                        className="rounded-full h-8 w-8"
                      />
                      <TableCell>User not found</TableCell>
                    </div>
                  )}
                  <TableCell>{products.title}</TableCell>
                  <TableCell>${products.price}</TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>{order.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </CardHeader>
    </Card>
  );
};

export default Sales;
