"use client";
import React from "react";
import ProductSingle from "./ProductSingle";
import { useGetProductsQuery } from "@/redux/services/productApi";
import Spiner from '@/components/common/Spiner';
import { useAppDispatch } from "@/redux/hooks";
import { setProducts } from "@/redux/features/productSlice";
import {useAppSelector} from '@/redux/hooks';

const Products = () => {
  const {
    isLoading,
    isFetching,
    data: products,
    error,
  } = useGetProductsQuery({searchQuery: ""});

  const dispatch = useAppDispatch();
  const stateProducts = useAppSelector((state) => state.productReducer.products);

  React.useEffect(() => {
    if (products?.length) {
      dispatch(setProducts(products));
    }
  }, [products, dispatch]);

  if (isLoading) {
    return <Spiner />;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-xl font-bold text-gray-900">
          Favourite shopping of last months
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {stateProducts?.length &&
            stateProducts.map((product) => (
              <ProductSingle key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
