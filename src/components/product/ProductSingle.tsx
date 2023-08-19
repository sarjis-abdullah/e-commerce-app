"use client";
import Link from "next/link";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { IProduct } from "@/redux/services/productApi";
import { add } from "@/redux/features/cartSlice";
import { StarIcon, EyeIcon } from "@heroicons/react/20/solid";
import RatingStar from '@/components/common/RatingStar';

interface propsProduct {
  product: IProduct;
}
const ProductSingle = ({ product }: propsProduct) => {
  const dispatch = useAppDispatch();
  function classNames(...classes: Array<string>) {
    return classes.filter(Boolean).join(" ");
  }
  return (
    <figure>
      <div
        key={product.id}
        className="group relative border-b border-r border-gray-200 p-4 sm:p-6"
      >
        {/* <Link href={"product/" + product.id}> */}
        <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover object-center"
          />
        </div>
        {/* </Link> */}
        <div className="pb-4 pt-10 text-center">
          <h3 className="text-sm font-medium text-gray-900 max-lines">
            {product.title}
          </h3>
          <div className="mt-3 flex flex-col items-center">
            <p className="sr-only">{product.rating.rate} out of 5 stars</p>
            <div className="flex items-center">
            <RatingStar rating={product.rating}/>
            </div>
          </div>
          <p className="mt-4 text-base font-medium text-gray-900">
            ${product.price}
          </p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => dispatch(add(product))}
              className="rounded-md border border-transparent bg-indigo-600 px-4 py-1 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Add to bag
            </button>
            <Link href={"product/" + product.id}>
                <EyeIcon className="h-5 w-5 flex-shrink-0"></EyeIcon>
              </Link>
          </div>
        </div>
      </div>
    </figure>
  );
};

export default ProductSingle;
