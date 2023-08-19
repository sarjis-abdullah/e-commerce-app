"use client";
import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/20/solid";
import { useGetCategoriesQuery } from "@/redux/services/categoryApi";
import { useGetProductsQuery } from "@/redux/services/productApi";
import { useAppDispatch } from "@/redux/hooks";
import { setProducts } from "@/redux/features/productSlice";

const filters = {
  category: [
    { value: "all-new-arrivals", label: "All New Arrivals", checked: false },
    { value: "tees", label: "Tees", checked: false },
    { value: "objects", label: "Objects", checked: false },
    { value: "sweatshirts", label: "Sweatshirts", checked: false },
    { value: "pants-and-shorts", label: "Pants & Shorts", checked: false },
  ],
};
const sortOptions = [
  { name: "Most Popular", href: "#", current: true },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
];

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductFilters() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const {data: products, isLoading: isProductLoading} = useGetProductsQuery({ searchQuery });
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetCategoriesQuery(null);
  const filterCategories: Array<string> = data as Array<string>;
  const handleCategoryOnchange = (e: Event) => {
    const value = `/category/${e.target.value}`;
    setSearchQuery(value);
  };
  
  const changeQuery = (q = "")=> {
    setSearchQuery(q);
    console.log(q, 123);
  }

  React.useEffect(() => {
    if (products) {
      dispatch(setProducts(products));
    }
  }, [products, dispatch]);

  return (
    <div className="bg-white">
      {/* Filters */}
      <Disclosure
        as="section"
        aria-labelledby="filter-heading"
        className="grid items-center border-b border-t border-gray-200"
      >
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>
        <div className="relative col-start-1 row-start-1 py-4">
          <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
            <div>
              <Disclosure.Button className="group flex items-center font-medium text-gray-700">
                <FunnelIcon
                  className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                Filters
              </Disclosure.Button>
            </div>
            <div className="pl-6">
              <button
                onClick={()=> changeQuery()}
                type="button"
                className="text-gray-500"
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
        <Disclosure.Panel className="border-t border-gray-200 py-10">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
            <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
              <fieldset>
                <legend className="block font-medium">Category</legend>
                <select
                  name="filterCategories"
                  onChange={handleCategoryOnchange}
                  className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md mt-1 py-2"
                >
                  <option disabled value="">
                    - please select -
                  </option>
                  {filterCategories?.length &&
                    filterCategories.map((item) => {
                      return (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      );
                    })}
                </select>
              </fieldset>
            </div>
          </div>
        </Disclosure.Panel>
        <div className="col-start-1 row-start-1 py-4">
          <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
            <Menu as="div" className="relative inline-block">
              <div className="flex">
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm"
                            )}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </Disclosure>
    </div>
  );
}
