"use client";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {useAppSelector} from '@/redux/hooks';
import {
  MagnifyingGlassIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

const navigation = {
  other: [
    { name: "Shop", href: "/" },
    { name: "Cart", href: "/cart" },
  ],
};

function classNames(...classes: Array<string>) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const cartProductsCount = useAppSelector((state) => state.cartReducer.cartProductsCount);
  return (
    <div className="bg-white font-sans ">
      <header className="fixed w-full bg-white px-6 md:px-12 z-10">
        <nav
          aria-label="Top"
          className="mx-auto max-w-screen-2xl sm:px-6 lg:px-8"
        >
          <div className="">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex flex-1">
                <Link href="/" className="flex items-center gap-2">
                  <img
                    className="h-8 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt=""
                  />
                  <span>E-shopify</span>
                </Link>
              </div>

              {/* Flyout menus */}
              <Popover.Group className="absolute inset-x-0 bottom-0 sm:static sm:flex-1 sm:self-stretch">
                <div className="flex h-14 space-x-8 overflow-x-auto border-t px-4 pb-px sm:h-full sm:justify-center sm:overflow-visible sm:border-t-0 sm:pb-0">
                  {navigation.other.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </Popover.Group>

              <div className="flex flex-1 items-center justify-end">
                {/* Search */}
                {/* <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                  <span className="sr-only">Search</span>
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </a> */}

                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-8">
                  <Link href="/cart" className="group -m-2 flex items-center p-2">
                    <ShoppingBagIcon
                      className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                      {cartProductsCount}
                    </span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
