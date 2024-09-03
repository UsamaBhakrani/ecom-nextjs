"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

interface ProductColumn {
  title: string;
  image: string;
  price: number;
  id: number;
  variants: any;
}

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
  },
];
