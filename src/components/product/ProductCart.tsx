"use client";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CheckIcon, ClockIcon } from "@heroicons/react/20/solid";
import { add, remove } from "@/redux/features/cartSlice";
// import { IProduct } from "@/redux/services/productApi";
import Link from "next/link";
interface IProduct {
  id: number;
  title: string;
  image: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: object;
  quantity: number;
}
const ProductCart = () => {
  const dispatch = useAppDispatch();
  const cartProducts: Array<IProduct> = useAppSelector(
    (state) => state.cartReducer.cartProducts
  );
  return (
    <div className="bg-white">
      <div className="px-4 py-12 sm:px-6 sm:py-12 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Shopping Cart
        </h1>

        <section
          className="grid mt-12"
          style={{ gridTemplateColumns: "55% 45%" }}
        >
          <div className="mb-16 scroll-mt-16 xl:scroll-mt-24">
            <h2 className="sr-only">Items in your shopping cart</h2>

            <ul
              role="list"
              className="divide-y divide-gray-200 border-b border-t border-gray-200"
            >
              {cartProducts?.length ? cartProducts.map((product: IProduct, productIdx: number) => (
                <li key={product.id} className="flex py-6 sm:py-10">
                  <div className="flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-24 w-24 rounded-lg object-cover object-center sm:h-32 sm:w-32"
                    />
                  </div>

                  <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div>
                      <div className="flex justify-between sm:grid sm:grid-cols-2">
                        <div className="pr-6">
                          <h3 className="text-sm">
                            <Link
                              href={`/product/${product.id}`}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.title}
                            </Link>
                          </h3>
                        </div>

                        <p className="text-right text-sm font-medium text-gray-900">
                          {product.price}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center sm:absolute sm:left-1/2 sm:top-0 sm:mt-0 sm:block">
                        <label
                          htmlFor={`quantity-${productIdx}`}
                          className="sr-only"
                        >
                          Quantity, {product.quantity}
                        </label>
                        <section className="flex gap-2">
                          <div>
                            <button className="px-4 bg-indigo-600 text-white">
                              -
                            </button>
                          </div>
                          <div>{product.quantity}</div>
                          <div>
                            <button onClick={()=> dispatch(add(product))} className="px-4 bg-indigo-600 text-white">
                              +
                            </button>
                          </div>
                        </section>

                        <button
                        onClick={()=> dispatch(remove(product))}
                          type="button"
                          className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
                        >
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              )) : <div className="text-center">
                <h1>No item selected!</h1>
                <Link
                  href="/"
                  className="font-medium text-indigo-600 hover:text-indigo-500 pl-2"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </Link>
                </div>}
            </ul>
          </div>

          {/* Order summary */}
          <div className="border-b border-t border-gray-200 sm:ml-32 sm:pl-6 lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:flex-col lg:justify-between lg:py-24">
            <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
              <h2 className="mb-4">Order summary</h2>

              <div className="flow-root">
                <dl className="-my-4 divide-y divide-gray-200 text-sm">
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-medium text-gray-900">$99.00</dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd className="font-medium text-gray-900">$5.00</dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-gray-600">Tax</dt>
                    <dd className="font-medium text-gray-900">$8.32</dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="text-base font-medium text-gray-900">
                      Order total
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      $112.32
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <div className="mt-10">
              <button
                type="submit"
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
        </section>
      </div>
    </div>
  );
};

export default ProductCart;
