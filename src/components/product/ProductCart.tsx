"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";
import { add, remove, removeAll } from "@/redux/features/cartSlice";
import Link from "next/link";
import { ProductCartSingle } from "./ProductCartSingle";
import { IProduct } from "@/redux/features/productSlice";

const ProductCart = () => {
  const dispatch = useAppDispatch();
  const cartProducts: Array<any> = useAppSelector(
    (state) => state.cartReducer.cartProducts
  );

  const totalCartProductSum = cartProducts.reduce(
    (accumulator, currentItem) => {
      const price = currentItem.price * currentItem.quantity;
      const total = accumulator + price;
      return parseFloat(total.toFixed(2));
    },
    0
  );
  const shippingCharge = 5;
  const tax = 10;

  const totalPrice = parseFloat(totalCartProductSum + shippingCharge + tax).toFixed(2);

  const hasCarts = cartProducts?.length;

  const checkout = () => {
    alert("Checkout successfull, total payble: $" + totalCartProductSum);
  };
  const removeCardProducts = () => {
    if (confirm("Are you sure?")) {
      dispatch(removeAll());
    }
  };
  return (
    <div className="bg-white lg:px-12">
      <div className="py-12 sm:py-12 ">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Shopping Cart
          </h1>

          {hasCarts ? (
            <button
              onClick={() => removeCardProducts()}
              className="bg-red-500 text-white px-4 rounded font-normal"
            >
              Remove Cart Products
            </button>
          ) : null}
        </div>

        <section
          className="grid mt-12"
          style={{ gridTemplateColumns: `${hasCarts ? "55% 45%" : "100%"}` }}
        >
          <div className="mb-16 scroll-mt-16 xl:scroll-mt-24">
            <h2 className="sr-only">Items in your shopping cart</h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {hasCarts ? (
                cartProducts.map((product: IProduct, productIdx: number) => (
                  <ProductCartSingle product={product} />
                ))
              ) : (
                <div className="text-center py-12">
                  <h1>No item selected!</h1>
                  <Link
                    href="/"
                    className="font-medium text-indigo-600 hover:text-indigo-500 pl-2"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
              )}
            </ul>
          </div>

          {/* Order summary */}
          {hasCarts ? (
            <div className="border-b border-t border-gray-200 sm:pl-6">
              <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
                <h2 className="mb-4">Order summary</h2>

                <div className="flow-root">
                  <dl className="-my-4 divide-y divide-gray-200 text-sm">
                    <div className="flex items-center justify-between py-4">
                      <dt className="text-gray-600">Subtotal</dt>
                      <dd className="font-medium text-gray-900">
                        ${totalCartProductSum}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <dt className="text-gray-600">Shipping</dt>
                      <dd className="font-medium text-gray-900">
                        ${shippingCharge}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <dt className="text-gray-600">Tax</dt>
                      <dd className="font-medium text-gray-900">${tax}</dd>
                    </div>
                    <div className="flex items-center justify-between py-4">
                      <dt className="text-base font-medium text-gray-900">
                        Order total
                      </dt>
                      <dd className="text-base font-medium text-gray-900">
                        ${totalPrice}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="mt-10">
                <button
                  type="button"
                  onClick={() => checkout()}
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Checkout
                </button>
              </div>

              <div className="mt-6 text-center text-sm text-gray-500">
                <p>
                  or
                  <Link
                    href="/"
                    className="font-medium text-indigo-600 hover:text-indigo-500 pl-2"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </p>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
};

export default ProductCart;
