"use client";
import Link from "next/link";
import React from "react";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { add } from "@/redux/features/cartSlice";
interface IProduct {
  product: {
    id: number;
    imageSrc: string;
    imageAlt: string;
    name: string;
    color: string;
    price: string;
    href: string;
  };
}
const ProductSingle = ({ product }: IProduct) => {
  const dispatch = useAppDispatch();

  return (
    <figure>
      <Link href={"product/" + product.id}>
        <div className="relative">
          <div className="relative h-72 w-full overflow-hidden rounded-lg">
            <img
              src={product.imageSrc}
              alt={product.imageAlt}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="relative mt-4">
            <h3 className="text-sm font-medium text-gray-900">
              {product.name}
            </h3>
            <p className="mt-1 text-sm text-gray-500">{product.color}</p>
          </div>
          <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
            />
            <p className="relative text-lg font-semibold text-white">
              {product.price}
            </p>
          </div>
        </div>
      </Link>
      {/* <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
      <p className="mt-1 text-lg font-medium text-gray-900">{product.price}</p> */}
      <div className="mt-6">
        <button onClick={() => dispatch(add(product))} className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full">
          Add to bag
        </button>
        {/* <a
          href={product.href}
          className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
        >
          Add to bag<span className="sr-only">, {product.name}</span>
        </a> */}
      </div>
    </figure>
  );
};

export default ProductSingle;
