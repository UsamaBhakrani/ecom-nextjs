import Algolia from "@/components/Algolia";
import Products from "@/components/products";
import { db } from "@/server";

export const revalidate = 60 * 60;

export default async function Home() {
  const data = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: true,
    },
    orderBy: (productVariants, { desc }) => [desc(productVariants.id)],
  });

  return (
    <main>
      <Algolia />
      <Products variants={data} />
    </main>
  );
}
