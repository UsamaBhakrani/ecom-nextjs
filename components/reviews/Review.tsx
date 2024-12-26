"use client";
import { ReviewsWithUser } from "@/lib/inferTypes";
import { motion } from "framer-motion";
import { Card } from "../ui/card";
import Image from "next/image";
import { formatDateTime } from "@/lib/utils";
import Stars from "./Stars";

export default function Review({ reviews }: { reviews: any[] }) {
  return (
    <motion.div className="flex flex-col gap-4">
      {reviews.map((review) => {
        return (
          <Card key={review.id} className="p-4">
            <div className="flex gap-2 items-center">
              <Image
                className="rounded-full"
                width={32}
                height={32}
                alt={review.user.name!}
                src={review?.user.image}
              />
              <div className="">
                <p className="text-sm font-bold">{review.user.name}</p>
                <div className="flex items-center gap-2">
                  <Stars rating={review.rating} />
                  <p className="text-xs text-bold text-muted-foreground">
                    {formatDateTime(review.created_at!).dateTime}
                  </p>
                </div>
              </div>
            </div>
            <p className="py-2 font-medium">{review.comment}</p>
          </Card>
        );
      })}
    </motion.div>
  );
}
