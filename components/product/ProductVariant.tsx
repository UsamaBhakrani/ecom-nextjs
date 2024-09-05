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
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { variantSchema } from "@/types/dashboardTypes";
import { useAction } from "next-safe-action/hooks";

interface ProductVariantProps {
  editMode: boolean;
  productID?: number;
  variant?: VariantsWithImagesTags;
  children: ReactNode;
}

const ProductVariant = ({
  editMode,
  productID,
  variant,
  children,
}: ProductVariantProps) => {
  // Form initialized
  const form = useForm<z.infer<typeof variantSchema>>({
    resolver: zodResolver(variantSchema),
    defaultValues: {
      tags: [],
      variantImages: [],
      color: "#00000",
      editMode,
      id: undefined,
      productID,
      productType: "",
    },
  });

  // const { execute, status } = useAction(createVariant, {
  //   onSuccess: (data) => {},
  // });

  function onSubmit(values: z.infer<typeof variantSchema>) {
    // execute(values);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{editMode ? "Edit" : "Create"} your variant</DialogTitle>
          <DialogDescription>
            Manage your product variants here. You can add tags, images and more
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="purple" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductVariant;
