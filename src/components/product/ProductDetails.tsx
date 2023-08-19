"use client";
import { useState } from "react";
import { Disclosure, RadioGroup, Tab } from "@headlessui/react";
import { StarIcon } from "@heroicons/react/20/solid";
import { HeartIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { add } from "@/redux/features/cartSlice";
import { useGetProductByIdQuery, IProduct } from "@/redux/services/productApi";
import Spiner from "@/components/common/Spiner";
import RatingStar from "@/components/common/RatingStar";

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}
interface IProductId {
  id: number;
}

const ProductDetails = ({ id }: IProductId) => {
  const dispatch: any = useAppDispatch();
  const { isLoading, isFetching, data, error } = useGetProductByIdQuery({ id });
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
              <div
                className="inline-flex mb-0 px-2 shadow-none outline-none transition-all duration-300 border rounded-lg"
              >
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
                <button
                  onClick={() => dispatch(add(product))}
                  type="button"
                  className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                >
                  Add to bag
                </button>
              </div>
            </form>

            <section aria-labelledby="details-heading" className="mt-12">
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="divide-y divide-gray-200 border-t">
                {/* <Disclosure as="div" key={detail.name}>
                    {({ open }) => (
                      <>
                        <h3>
                          <Disclosure.Button className="group relative flex w-full items-center justify-between py-6 text-left">
                            <span
                              className={classNames(
                                open ? "text-indigo-600" : "text-gray-900",
                                "text-sm font-medium"
                              )}
                            >
                              {detail.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="block h-6 w-6 text-indigo-400 group-hover:text-indigo-500"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="block h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel
                          as="div"
                          className="prose prose-sm pb-6"
                        >
                          <ul role="list">
                            {detail.items.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure> */}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
