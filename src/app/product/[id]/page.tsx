import ProductDetails from "@/components/product/ProductDetails";
import BaseLayout from "@/components/layout/BaseLayout";

export default function Page({ params }: { params: { id: number } }) {
  return (
    <BaseLayout>
      <ProductDetails id={params.id} />
    </BaseLayout>
  );
}
