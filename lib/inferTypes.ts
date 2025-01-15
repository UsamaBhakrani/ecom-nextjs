import type {
  BuildQueryResult,
  DBQueryConfig,
  ExtractTablesWithRelations,
} from "drizzle-orm";
import * as schema from "@/server/schema";

type Schema = typeof schema;
type TSchema = ExtractTablesWithRelations<Schema>;

export type IncludeRelation<TableName extends keyof TSchema> = DBQueryConfig<
  "one" | "many",
  boolean,
  TSchema,
  TSchema[TableName]
>["with"];

export type InferResultType<
  TableName extends keyof TSchema,
  With extends IncludeRelation<TableName> | undefined = undefined
> = BuildQueryResult<
  TSchema,
  TSchema[TableName],
  {
    with: With;
  }
>;

export type VariantsWithImagesTags = InferResultType<
  "productVariants",
  { variantImages: true; variantTags: true }
>;

export type ProductsWithVariants = InferResultType<
  "products",
  { productVariants: true }
>;

export type VariantsWithProduct = InferResultType<
  "productVariants",
  { variantImages: true; variantTags: true; product: true }
>;

export type ReviewsWithUser = InferResultType<
  "reviews",
  {
    user: true;
  }
>;

export type TotalOrders = InferResultType<
  "orderProduct",
  {
    order: { with: { user: true } };
    products: true;
    productVariants: {
      with: { variantImages: true };
    };
  }
>;

export type UsersWithReviews = {
  id: number;
  rating: number;
  userID: string;
  productID: number;
  comment: string;
  created_at: Date;
  updated_at: Date;
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: null;
    image: string;
    password: null;
    twoFactorEnabled: boolean;
    role: string;
    created_at: null;
    updated_at: null;
    last_login_at: null;
  };
};
