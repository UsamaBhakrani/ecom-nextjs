import { db } from "@/server";
import placeHolder from "@/public/placeholder_small.jpg";
import { DataTable } from "@/components/product/DataTable";
import { columns } from "@/components/product/Columns";
import { variantImages } from "@/server/schema";

const ProductsPage = async () => {
  const allProducts = await db.query.products.findMany({
    with: { productVariants: { with: { variantImages: true } } },
    orderBy: (products, { desc }) => [desc(products.id)],
  });

  if (!allProducts) throw new Error("No products found");

  const dataTable = allProducts.map((product) => {
    return {
      id: product.id,
      title: product.title,
      price: product.price,
      variants: [],
      image: placeHolder.src,
    };
  });

  if (!dataTable) throw new Error("No data found");

  return (
    <div>
      <DataTable data={dataTable} columns={columns} />
    </div>
  );
};

export default ProductsPage;
