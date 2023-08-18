import Products from "@/components/product/Products";
import ProductFilters from "@/components/product/ProductFilters";
import BaseLayout from "@/components/layout/BaseLayout";
import React from "react";

const page = () => {
  return (
    <BaseLayout>
      <ProductFilters />
      <Products />
    </BaseLayout>
  );
};

export default page;
