import ProductDetails from "@/components/product/ProductDetails";
import ProductFilters from "@/components/product/ProductFilters";
import BaseLayout from "@/components/layout/BaseLayout";
import React from "react";

const page = () => {
  return (
    <BaseLayout>
      <ProductFilters />
      <ProductDetails />
    </BaseLayout>
  );
};

export default page;
