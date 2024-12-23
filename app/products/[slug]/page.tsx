import { db } from "@/server";
import { products, productVariants } from "@/server/schema";
import { eq } from "drizzle-orm";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

const SingleProductPage = async ({ params, searchParams }: Params) => {
  const product = await db.query.productVariants.findMany({
    where: eq(productVariants.productID, parseInt(searchParams.productID)),
  });
  console.log(product);

  return <div>SingleProductPage</div>;
};

export default SingleProductPage;
