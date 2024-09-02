"use client";

import { productsSchema } from "@/types/dashboardTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import FormError from "../auth/FormError";
import FormSuccess from "../auth/FormSuccess";
import { DollarSign } from "lucide-react";
import Tiptap from "./TipTap";

const ProductForm = () => {
  const form = useForm<z.infer<typeof productsSchema>>({
    resolver: zodResolver(productsSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
    mode: "onChange",
  });

  function onSubmit(values: z.infer<typeof productsSchema>) {
    // execute(values);
    console.log(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Add Product</CardTitle>
        <CardDescription>Add a New Product</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Chicken Karahi"
                      disabled={status === "executing"}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>This is your product title.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <div className="flex items-center gap-4">
                    {!form.getValues("description") ? (
                      <div className="font-bold">Description </div>
                    ) : (
                      <Image
                        className="rounded-full"
                        // src={form.getValues("description")!}
                        alt="User Image"
                        width={42}
                        height={42}
                      />
                    )}
                    <UploadButton
                      className="scale-75 ut-button:ring-primary ut-button:bg-primary/75 hover:ut-button:bg-primary/100 ut-button:transition-all ut-button:duration-500 ut-label:hidden ut-allowed-content:hidden"
                      endpoint="avatarUploader"
                      content={{
                        button({ ready }) {
                          if (ready) {
                            return "Upload Avatar";
                          }
                          return "Choose an Image";
                        },
                      }}
                      onUploadBegin={() => setAvatarUploading(true)}
                      onClientUploadComplete={(res) => {
                        form.setValue("image", res[0].url!);
                        setAvatarUploading(false);
                      }}
                      onUploadError={(error: Error) => {
                        form.setError("image", {
                          type: "validate",
                          message: error.message,
                        });
                        setAvatarUploading(false);
                        return;
                      }}
                    />
                  </div>
                  <FormControl>
                    <Input
                      type="hidden"
                      placeholder="User Image"
                      disabled={status === "executing"}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Tiptap val={field.value} />
                    {/* <Input
                      placeholder="Chicken Karahi with a pinch of bell peppers"
                      disabled={status === "executing"}
                      {...field}
                    /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Price</FormLabel>
                  <FormDescription>This is your product Price</FormDescription>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <DollarSign
                        size={36}
                        className="p-2 bg-muted rounded-md"
                      />
                      <Input
                        min={0}
                        step="0.1"
                        type="number"
                        placeholder="Your price in USD"
                        disabled={status === "executing"}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormError message={error} />
            <FormSuccess message={success} /> */}
            <Button disabled={status === "executing"} type="submit">
              Upload Product
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
