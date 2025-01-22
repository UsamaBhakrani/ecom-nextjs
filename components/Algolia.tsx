"use client";

import { InstantSearchNext } from "react-instantsearch-nextjs";
import { Hits, SearchBox } from "react-instantsearch";
import searchClient from "@/lib/algoliaClient";
import Link from "next/link";
import Image from "next/image";
import { Card } from "./ui/card";

const Algolia = () => {
  return (
    <InstantSearchNext indexName="products" searchClient={searchClient}>
      <div className="">
        <SearchBox
          classNames={{
            input:
              "h-full w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            submitIcon: "hidden",
            form: "relative h-10 mb-4",
            resetIcon: "hidden",
          }}
        />
        <Card className="">
          <Hits hitComponent={Hit} className="rounded-md" />
        </Card>
      </div>
    </InstantSearchNext>
  );
};

function Hit({
  hit,
}: {
  hit: {
    objectID: string;
    id: string;
    price: number;
    title: string;
    productType: string;
    variantImages: string;
    _highlightResult: {
      title: {
        value: string;
        matchLevel: string;
        fullyHighlighted: boolean;
        matchedWords: string[];
      };
      objectID: {
        value: string;
        matchLevel: string;
        fullyHighlighted: boolean;
        matchedWords: string[];
      };
    };
  };
}) {
  if (hit._highlightResult.title.matchLevel === "none") {
    return null;
  }
  return (
    <div className="">
      <Link
        href={`/products/${hit.objectID}?id=${hit.objectID}&productID=${hit.id}&price=${hit.price}&title=${hit.title}&type=${hit.productType}&image=${hit.variantImages[0]}&variantID=${hit.objectID}`}
      >
        <div className="">
          <Image
            src={hit.variantImages}
            alt={hit.title}
            width={100}
            height={100}
          />
        </div>
      </Link>
    </div>
  );
}

export default Algolia;
