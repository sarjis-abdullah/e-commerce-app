"use client";
import React, { Fragment } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon, FunnelIcon } from "@heroicons/react/20/solid";
import { useGetCategoriesQuery } from "@/redux/services/categoryApi";
import { useGetProductsQuery } from "@/redux/services/productApi";
import { useAppDispatch } from "@/redux/hooks";
import { setProducts } from "@/redux/features/productSlice";

export default function ProductFilters() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("");
  const [selectedSort, setSelectedSort] = React.useState("asc");
  const sortByList: Array<object> = [
    { title: "Ascending", code: "asc" },
    { title: "Descending", code: "desc" },
  ];
  const { data: products, isLoading: isProductLoading } = useGetProductsQuery({
    searchQuery,
  });
  const dispatch = useAppDispatch();
  const { data, error, isLoading } = useGetCategoriesQuery(null);
  const filterCategories: Array<string> = data as Array<string>;
  const handleCategoryOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = `/category/${e.target.value}`;
    setSelectedCategory(e.target.value);
    if (selectedSort != "") {
      value += "?sort=" + selectedSort;
    }
    setSearchQuery(value);
  };
  const handleSortOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = `?sort=${e.target.value}`;
    setSelectedSort(e.target.value);
    if (selectedCategory != "") {
      value = `/category/${selectedCategory}` + value;
    }
    setSearchQuery(value);
  };

  const removeFilter = (q = "") => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedSort("asc");
  };

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
            {filterCategories?.length && selectedCategory && (
              <div className="pl-6">
                <button
                  onClick={() => removeFilter()}
                  type="button"
                  className="text-gray-500"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>
        <Disclosure.Panel className="border-t border-gray-200 py-10">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
            <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
              <fieldset>
                <legend className="block font-medium">Category</legend>
                <select
                  name="filterCategories"
                  onChange={handleSortOnchange}
                  value={selectedSort}
                  className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md mt-1 py-2 capitalize"
                >
                  {sortByList.map((item) => {
                    return (
                      <option key={item.code} value={item.code}>
                        {item.title}
                      </option>
                    );
                  })}
                </select>
              </fieldset>
              <fieldset>
                <legend className="block font-medium">Category</legend>
                <select
                  name="filterCategories"
                  onChange={handleCategoryOnchange}
                  value={selectedCategory}
                  className="shadow-sm focus:ring-black focus:border-black block w-full sm:text-sm border-gray-300 rounded-md mt-1 py-2 capitalize"
                >
                  <option disabled value="">
                    Select category
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
          <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8"></div>
        </div>
      </Disclosure>
    </div>
  );
}
