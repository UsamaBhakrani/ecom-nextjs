import ReviewsForm from "./ReviewsForm";

const Reviews = async ({ productID }: { productID: number }) => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold mb-4">Product Reviews</h2>
      <div className="">
        <ReviewsForm />
      </div>
    </section>
  );
};

export default Reviews;
