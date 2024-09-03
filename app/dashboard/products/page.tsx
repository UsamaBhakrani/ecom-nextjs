import { db } from "@/server";
import placeHolder from "@/public/placeholder_small.jpg";
import { DataTable } from "@/components/product/DataTable";
import { columns } from "@/components/product/Columns";

const ProductsPage = async () => {
  const allProducts = await db.query.products.findMany({
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
