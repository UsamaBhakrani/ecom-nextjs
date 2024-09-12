"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "../ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { deleteProduct } from "@/server/actions/deleteProduct";
import { toast } from "sonner";
import { useAction } from "next-safe-action/hooks";
import Link from "next/link";
import { VariantsWithImagesTags } from "@/lib/inferTypes";
import { ProductVariant } from "./ProductVariant";

interface ProductColumn {
  title: string;
  image: string;
  price: number;
  id: number;
  variants: VariantsWithImagesTags[];
}

export const ActionCell = ({ row }: { row: Row<ProductColumn> }) => {
  const product = row.original;

  const { execute, status } = useAction(deleteProduct, {
    onSuccess: (data) => {
      if (data?.success) toast.success(data.success);
      if (data?.error) toast.error(data.error);
    },
  });

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 w-8 p-0" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="dark:focus:bg-primary focus:bg-primary/50 cursor-pointer">
          <Link
            className="scale-100"
            href={`/dashboard/add-product?id=${product.id}`}
          >
            Edit Product
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => execute(product)}
          className="dark:focus:bg-destructive focus:bg-destructive/50 cursor-pointer"
        >
          Delete Product
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "variants",
    header: "Variants",
    cell: ({ row }) => {
      const variants = row.getValue("variants") as VariantsWithImagesTags[];

      return (
        <div>
          {variants.map((variant) => {
            return (
              <div key={variant.id}>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span>
                        <ProductVariant
                          editMode={true}
                          productID={variant.productID}
                          variant={variant}
                        >
                          <div
                            key={variant.id}
                            className="h-5 w-5 rounded-full"
                            style={{ backgroundColor: variant.color }}
                          />
                        </ProductVariant>
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{variant.productType}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            );
          })}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <ProductVariant productID={row.original.id} editMode={false}>
                  <span className="text-purple-500 cursor-pointer">
                    <PlusCircle className="w-4 h-4" />
                  </span>
                </ProductVariant>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new variant</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-PK", {
        currency: "PKR",
        style: "currency",
      }).format(price);
      return <div className="font-md text-xs">{formatted}</div>;
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const cellImage = row.getValue("image") as string;
      const cellTitle = row.getValue("title") as string;
      return (
        <div>
          <Image
            src={cellImage}
            alt={cellTitle}
            className="w-12 h-12 rounded-md"
            width={100}
            height={100}
          />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ActionCell,
  },
];
