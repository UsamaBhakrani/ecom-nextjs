"use client";

import { VariantsWithProduct } from "@/lib/inferTypes";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { formatPrice } from "@/lib/formatPrice";
import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

type ProductTypes = {
  variants: VariantsWithProduct[];
};
const Products = ({ variants }: ProductTypes) => {
  const searchParams = useSearchParams();
  const paramTag = searchParams.get("tag");

  // Get filtered products based on tags
  const filteredProducts = useMemo(() => {
    if (paramTag && variants) {
      return variants.filter((variant) =>
        variant.variantTags.some((tag) => tag.tag === paramTag)
      );
    }
    return variants;
  }, [paramTag]);

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
      {filteredProducts.map((variant) => {
        return (
          <Link
            className="py-2"
            key={variant.id}
            href={`/products/${variant.id}?id=${variant.id}&productID=${variant.productID}&price=${variant.product.price}&title=${variant.product.title}&type=${variant.productType}&image=${variant.variantImages[0].url}`}
          >
            <Image
              src={variant.variantImages[0].url}
              width={720}
              height={480}
              alt={variant.product.title}
              loading="lazy"
              className="rounded-md pb-2"
            />
            <div className="flex justify-between">
              <div className="font-medium">
                <h2>{variant.product.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {variant.productType}
                </p>
              </div>
              <div className="">
                <Badge className="text-sm" variant="secondary">
                  {formatPrice(parseInt(variant.price))}
                  {/* {formatPrice(variant.product.price)} */}
                </Badge>
              </div>
            </div>
          </Link>
        );
      })}
    </main>
  );
};

export default Products;
