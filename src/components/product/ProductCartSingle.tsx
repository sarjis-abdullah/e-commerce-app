import React from "react";
import Link from "next/link";
import { useAppDispatch } from "@/redux/hooks";
import { add, remove, decrement } from "@/redux/features/cartSlice";
import { IProduct } from "@/redux/features/productSlice";
interface propsProduct {
  product: IProduct;
}

export const ProductCartSingle = ({ product }: propsProduct) => {
  const dispatch = useAppDispatch();
  return (
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
              <p className="text-sm text-gray-900 mt-2">${product.price}</p>
            </div>

            <p className="text-right text-sm font-medium text-gray-900">
              ${product.invidualTotal}
            </p>
          </div>

          <div className="mt-4 flex items-center sm:absolute sm:left-1/2 sm:top-0 sm:mt-0 sm:block">
            <label htmlFor={`quantity-${product.quantity}`} className="sr-only">
              Quantity, {product.quantity}
            </label>
            <section className="flex">
              <div>
                <button
                  // disabled={product.quantity < 2}
                  onClick={() => dispatch(decrement(product))}
                  className="px-4 bg-indigo-600 text-white rounded-tl-lg rounded-bl-lg"
                >
                  -
                </button>
              </div>
              <div className="px-4 bg-indigo-600 text-white border-r border-l">{product.quantity}</div>
              <div>
                <button
                  onClick={() => dispatch(add(product))}
                  className="px-4 bg-indigo-600 text-white rounded-tr-lg rounded-br-lg"
                >
                  +
                </button>
              </div>
            </section>

            <button
              onClick={() => dispatch(remove(product))}
              type="button"
              className="ml-4 text-sm font-medium text-indigo-600 hover:text-indigo-500 sm:ml-0 sm:mt-3"
            >
              <span>Remove</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};
