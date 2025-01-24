"use client";

import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { useRouter, useSearchParams } from "next/navigation";

const ProductTags = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

  const setFilter = (tag: string) => {
    if (tag) {
      router.push(`?tag=${tag}`);
    }
    if (!tag) {
      router.push(`/`);
    }
  };

  return (
    <div className="flex justify-center items-center gap-4 my-12">
      <Badge
        onClick={() => setFilter("")}
        className={cn(
          "cursor-pointer hover:opacity-100,",
          tag === "all" && tag ? "opacity-100" : "opacity-50"
        )}
      >
        All
      </Badge>
      <Badge
        onClick={() => setFilter("blue")}
        className={cn(
          "cursor-pointer bg-blue-500 hover:bg-blue-600 hover:opacity-100,",
          tag === "blue" && tag ? "opacity-100" : "opacity-50"
        )}
      >
        Blue
      </Badge>
      <Badge
        onClick={() => setFilter("green")}
        className={cn(
          "cursor-pointer bg-green-500 hover:bg-green-600 hover:opacity-100,",
          tag === "green" && tag ? "opacity-100" : "opacity-50"
        )}
      >
        Green
      </Badge>
      <Badge
        onClick={() => setFilter("purple")}
        className={cn(
          "cursor-pointer bg-purple-500 hover:bg-purple-600 hover:opacity-100,",
          tag === "purple" && tag ? "opacity-100" : "opacity-50"
        )}
      >
        Purple
      </Badge>
    </div>
  );
};

export default ProductTags;
