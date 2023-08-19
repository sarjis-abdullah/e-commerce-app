"use client";
import { useState } from "react";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { HeartIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { add, decrement } from "@/redux/features/cartSlice";
import { useGetProductByIdQuery } from "@/redux/services/productApi";
import Spiner from "@/components/common/Spiner";
import RatingStar from "@/components/common/RatingStar";
import Link from "next/link";
import { IProduct } from "@/redux/features/productSlice";

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}
interface IProductId {
  id: number;
}

const ProductDetails = ({ id }: IProductId) => {
  const dispatch: any = useAppDispatch();
  const { isLoading, isFetching, data, error } = useGetProductByIdQuery({ id });
  const cartProducts = useAppSelector(
    (state) => state.cartReducer.cartProducts
  );

  const cartProduct = cartProducts.find((item) => item.id == id);
  const isProductInCart = cartProduct ? true : false;
  const product: IProduct = data as IProduct;
  if (!product?.title || isLoading) {
    return <Spiner />;
  }
  // console.log(data);
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
          {/* Image gallery */}
          <Tab.Group as="div" className="flex flex-col-reverse">
            {/* Image selector */}
            <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
              <Tab.List className="grid grid-cols-4 gap-6">
                <Tab className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4">
                  <>
                    <span className="absolute inset-0 overflow-hidden rounded-md">
                      <img
                        src={product.image}
                        alt=""
                        className="h-full w-full object-cover object-center"
                      />
                    </span>
                    <span
                      className={classNames(
                        "ring-indigo-500",
                        "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                      )}
                      aria-hidden="true"
                    />
                  </>
                </Tab>
              </Tab.List>
            </div>

            <Tab.Panels className="aspect-h-1 aspect-w-1 w-full">
              <Tab.Panel>
                <img
                  src={product.image}
                  alt={"product"}
                  className="h-full w-full object-cover object-center sm:rounded-lg"
                />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {product.title}
            </h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                ${product.price}
              </p>
              <div className="inline-flex mb-0 px-2 shadow-none outline-none transition-all duration-300 border rounded-lg">
                {product.category}
              </div>
            </div>

            {/* Reviews */}
            <div className="mt-3">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  <RatingStar rating={product.rating} />
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>

              <div
                className="space-y-6 text-base text-gray-700"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>

            <form className="mt-6">
              <div className="mt-10 flex">
                {!isProductInCart ? (
                  <button
                    onClick={() => dispatch(add(product))}
                    type="button"
                    className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                  >
                    Add to bag
                  </button>
                ) : (
                  <>
                    <section className="flex items-center">
                      <div>
                        <button
                          type="button"
                          // disabled={cartProduct.quantity < 2}
                          onClick={() => dispatch(decrement(product))}
                          className="px-6 py-2 bg-indigo-600 text-white rounded-tl-lg rounded-bl-lg"
                        >
                          -
                        </button>
                      </div>
                      <div className="px-10 py-2 font-medium bg-indigo-600 text-white border-r border-l">{cartProduct?.quantity}</div>
                      <div>
                        <button
                          type="button"
                          onClick={() => dispatch(add(product))}
                          className="px-6 py-2 bg-indigo-600 text-white rounded-tr-lg rounded-br-lg"
                        >
                          +
                        </button>
                      </div>
                      <div>
                        <Link
                          href={'/cart'}
                          className="px-8 py-2 text-indigo-600"
                        >
                          Cart <span aria-hidden="true"> →</span>
                        </Link>
                      </div>
                    </section>
                  </>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
