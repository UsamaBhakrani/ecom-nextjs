import { db } from "@/server";
import { productVariants } from "@/server/schema";
import { eq } from "drizzle-orm";

const SingleProductPage = async ({
  searchParams,
  params,
}: SearchParamProps) => {
  const product = await db.query.productVariants.findMany({
    where: eq(
      productVariants.productID,
      parseInt(searchParams?.productID as string)
    ),
  });
  console.log(product);

  return <div>SingleProductPage</div>;
};

export default SingleProductPage;
