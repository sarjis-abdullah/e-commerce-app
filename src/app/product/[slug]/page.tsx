import ProductDetails from "@/components/product/ProductDetails";
import BaseLayout from "@/components/layout/BaseLayout";

export default function Page({ params }: { params: { slug: string } }) {
  return (
    <BaseLayout>
      <ProductDetails />
    </BaseLayout>
  );
}
