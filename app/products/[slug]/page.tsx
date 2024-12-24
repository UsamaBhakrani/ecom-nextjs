import { db } from "@/server";
import { productVariants } from "@/server/schema";
import { eq } from "drizzle-orm";

export const generateStaticParams = async () => {
  const data = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: true,
    },
    orderBy: (productVariants, { desc }) => [desc(productVariants.id)],
  });

  if (data) {
    const slugID = data.map((variant) => ({
      slug: variant.id.toString(),
    }));
    return slugID;
  }
  return [];
};

const SingleProductPage = async ({ params }: { params: { slug: string } }) => {
  const variant = await db.query.productVariants.findFirst({
    where: eq(productVariants.id, parseInt(params.slug)),
    with: { product: true },
  });
  return (
    <main>
      <section>
        <div className="flex-1">
          <h1>Images</h1>
        </div>
        <div className="flex gap-2 flex-col flex-1">
          <h2>{variant?.product.description}</h2>
        </div>
      </section>
    </main>
  );
};

export default SingleProductPage;
