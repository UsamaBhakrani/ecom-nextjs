"use client";

import { variantSchema } from "@/types/dashboardTypes";
import { useFieldArray, useFormContext } from "react-hook-form";
import { z } from "zod";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UploadDropzone } from "@/app/api/uploadthing/upload";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { Reorder } from "framer-motion";
import { useState } from "react";

const VariantImages = () => {
  const { getValues, control, setError } =
    useFormContext<z.infer<typeof variantSchema>>();

  const { fields, remove, append, update, move } = useFieldArray({
    control,
    name: "variantImages",
  });

  const [active, setActive] = useState(0);

  return (
    <div>
      <FormField
        control={control}
        name="variantImages"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Variant Images</FormLabel>
            <FormControl>
              <UploadDropzone
                className="ut-allowed-content:text-secondary-foreground ut-label:text-primary ut-upload-icon:text-primary/50 hover:bg-primary/50 transition-all duration-500 ease-in-out border-secondary ut-button:bg-primary/75 ut-button:ut-readying:bg-secondary"
                endpoint="variantUploader"
                onBeforeUploadBegin={(files) => {
                  files.map((file) =>
                    append({
                      name: file.name,
                      size: file.size,
                      url: URL.createObjectURL(file),
                    })
                  );
                  return files;
                }}
                onClientUploadComplete={(files) => {
                  const images = getValues("variantImages");
                  images.map((field, imgIndex) => {
                    if (field.url.search("blob:") === 0) {
                      const image = files.find(
                        (img) => img.name === field.name
                      );
                      if (image) {
                        update(imgIndex, {
                          url: image.url,
                          size: image.size,
                          name: image.name,
                          key: image.key,
                        });
                      }
                    }
                  });
                  return;
                }}
                onUploadError={(error) => {
                  setError("variantImages", {
                    type: "validate",
                    message: error.message,
                  });
                  return;
                }}
                config={{ mode: "auto" }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <div className="rounded-md overflow-x-auto">
        <Table className="my-4">
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Image</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <Reorder.Group
            as="tbody"
            values={fields}
            onReorder={(e) => {
              const activeItem = fields[active];
              e.map((item, index) => {
                if (item === activeItem) {
                  move(active, index);
                  setActive(index);
                  return;
                }
                return;
              });
            }}
          >
            {fields.map((field, index) => {
              return (
                <Reorder.Item
                  as="tr"
                  value={field}
                  id={field.id}
                  key={field.id}
                  onDragStart={() => setActive(index)}
                  className={cn(
                    field.url.search("blob:") === 0
                      ? "animate-pulse transition-all"
                      : "",
                    "text-sm font-bold text-muted-foreground hover:text-primary"
                  )}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{field.name}</TableCell>
                  <TableCell>
                    {(field.size / (1024 * 1024)).toFixed(2)} MB
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <Image
                        src={field.url}
                        alt={field.name}
                        className="rounded-md"
                        width={72}
                        height={48}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      className="scale-75"
                      variant="destructive"
                      onClick={(e) => {
                        e.preventDefault();
                        remove(index);
                      }}
                    >
                      <Trash className="w-4" />
                    </Button>
                  </TableCell>
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        </Table>
      </div>
    </div>
  );
};

export default VariantImages;
