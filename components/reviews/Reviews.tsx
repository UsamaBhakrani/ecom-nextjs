import { db } from "@/server";
import Review from "./Review";
import ReviewsForm from "./ReviewsForm";
import { desc, eq } from "drizzle-orm";
import { reviews } from "@/server/schema";

const Reviews = async ({ productID }: { productID: number }) => {
  const data = await db.query.reviews.findMany({
    with: {
      user: true,
    },
    where: eq(reviews.productID, productID),
    orderBy: [desc(reviews.created_at)],
  });

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
      <div className="flex gap-2 lg:gap-12 justify-stretch lg:flex-row flex-col">
        <div className="flex-1">
          <Review reviews={data} />
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <ReviewsForm />
        </div>
      </div>
    </section>
  );
};

export default Reviews;
