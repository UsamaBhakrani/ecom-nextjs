"use client";

import { VariantsWithImagesTags } from "@/lib/inferTypes";
import { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProductVariantProps {
  editMode: boolean;
  productID: number;
  variant: VariantsWithImagesTags;
  children: ReactNode;
}

const ProductVariant = ({
  editMode,
  productID,
  variant,
  children,
}: ProductVariantProps) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProductVariant;
