import ProductType from "@/components/ProductType";
import { db } from "@/server";
import { productVariants } from "@/server/schema";
import { eq } from "drizzle-orm";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/formatPrice";
import ProductPicker from "@/components/ProductPicker";
import ProductCarousel from "@/components/ProductCarousel";
import Reviews from "@/components/reviews/Reviews";
import { getReviewAverage } from "@/lib/utils";
import Stars from "@/components/reviews/Stars";
import AddCart from "@/components/cart/AddCart";

export const revalidate = 60;

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
    with: {
      product: {
        with: {
          reviews: true,
          productVariants: {
            with: { variantImages: true, variantTags: true },
          },
        },
      },
    },
  });

  if (variant) {
    const reviewAverage = getReviewAverage(
      variant?.product.reviews.map((r) => r.rating)
    );
    return (
      <main>
        <section className="flex flex-col lg:flex-row gap-4 lg:gap-12">
          <div className="flex-1">
            <ProductCarousel variants={variant.product.productVariants} />
          </div>
          <div className="flex flex-col flex-1">
            <h2 className="text-2xl font-bold">{variant?.product.title}</h2>
            <div>
              <ProductType variants={variant?.product.productVariants} />
              <Stars
                rating={reviewAverage}
                totalReviews={variant.product.reviews.length}
              />
            </div>
            <Separator className="my-2" />
            <p className="text-2xl py-2 font-medium">
              {formatPrice(variant.product.price)}
            </p>
            <div
              dangerouslySetInnerHTML={{ __html: variant.product.description }}
            />
            <p className="text-secondary-foreground font-medium my-2">
              Available Colors
            </p>
            <div className="flex gap-4">
              {variant.product.productVariants.map((prodVariant) => (
                <ProductPicker
                  key={prodVariant.id}
                  productID={variant.productID}
                  productType={prodVariant.productType}
                  id={prodVariant.id}
                  color={prodVariant.color}
                  price={variant.product.price}
                  title={variant.product.title}
                  image={prodVariant.variantImages[0].url}
                />
              ))}
            </div>
            <AddCart />
          </div>
        </section>
        <Reviews productID={variant.productID} />
      </main>
    );
  }
};

export default SingleProductPage;
