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
import { DollarSign } from "lucide-react";
import Tiptap from "./TipTap";
import { useAction } from "next-safe-action/hooks";
import { createProduct } from "@/server/actions/createProduct";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getProduct } from "@/server/actions/getProduct";
import { useEffect } from "react";

const ProductForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editMode = searchParams.get("id");

  // Check if product already exists in Db
  const checkIfProductAlreadyExists = async (id: number) => {
    if (editMode) {
      const data = await getProduct(id);
      if (data.error) {
        toast.error(data.error);
        router.push("/dashboard/products");
        return;
      }
      if (data.success) {
        const id = parseInt(editMode);
        form.setValue("title", data.success.title);
        form.setValue("description", data.success.description);
        form.setValue("price", data.success.price);
        form.setValue("id", id);
      }
    }
  };

  useEffect(() => {
    if (editMode) {
      checkIfProductAlreadyExists(parseInt(editMode));
    }
  }, []);

  // Form initialized
  const form = useForm<z.infer<typeof productsSchema>>({
    resolver: zodResolver(productsSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
    mode: "onChange",
  });

  // Safe Action to create product on the server
  const { execute, status } = useAction(createProduct, {
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("Product created successfully!");
        setTimeout(() => {
          router.push("/dashboard/products");
        }, 2000);
      }
      if (data?.error) {
        toast.error("Error creating product");
      }
    },
    onError: (error) => {
      console.error(error);
    },
    // onExecute: () => {
    //   toast.loading("Creating new product");
    // },
  });

  function onSubmit(values: z.infer<typeof productsSchema>) {
    execute(values);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">
          {editMode ? "Edit Product" : "Create Product"}
        </CardTitle>
        <CardDescription>
          {editMode ? "Make changes to existing product" : "Add a new product"}
        </CardDescription>
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
            <Button
              disabled={
                status === "executing" ||
                !form.formState.isValid ||
                !form.formState.isDirty
              }
              type="submit"
            >
              {editMode ? "Save Changes" : "Create Product"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ProductForm;
