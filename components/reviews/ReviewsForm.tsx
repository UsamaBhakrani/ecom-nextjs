"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSearchParams } from "next/navigation";
import { reviewsSchema } from "@/types/dashboardTypes";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
const ReviewsForm = () => {
  const searchParams = useSearchParams();
  const productID = Number(searchParams.get("productID"));

  const form = useForm<z.infer<typeof reviewsSchema>>({
    resolver: zodResolver(reviewsSchema),
    defaultValues: {
      comment: "",
      rating: 0,
    },
  });

  const onSubmit = (values: z.infer<typeof reviewsSchema>) => {
    console.log(values);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <div className="w-full">
          <Button className="font-medium w-full" variant="secondary">
            Leave a review
          </Button>
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave your review</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="How would you describe this product?"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leave your rating</FormLabel>
                  <FormControl>
                    <Input type="hidden" placeholder="Star Rating" {...field} />
                  </FormControl>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((value) => {
                      return (
                        <motion.div
                          key={value}
                          className="relative cursor-pointer"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.8 }}
                        >
                          <Star
                            key={value}
                            onClick={() => form.setValue("rating", value)}
                            className={cn(
                              "text-primary bg-transparent transition-all duration-300 ease-in-out",
                              form.getValues("rating") >= value
                                ? "text-primary"
                                : "text-muted"
                            )}
                          />
                        </motion.div>
                      );
                    })}
                  </div>
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit">
              Add Review
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};

export default ReviewsForm;
