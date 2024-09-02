import ProductForm from "@/components/product/ProductForm";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const AddProductPage = async () => {
  const session = await auth();
  if (session?.user.role !== "admin") return redirect("/dashboard/settings");

  return <ProductForm />;
};

export default AddProductPage;
