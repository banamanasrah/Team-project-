import {
  HiCheck as CheckIcon,
  HiXMark as XMarkIcon,
  HiChevronRight as ChevronRightIcon,
} from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../hooks";
import { Link } from "react-router-dom";
import {
  removeProductFromTheCart,
  updateProductQuantity,
} from "../features/cart/cartSlice";
import toast from "react-hot-toast";

const Cart = () => {
  const { productsInCart, subtotal } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white mx-auto max-w-screen-2xl px-5 max-[400px]:px-3">
      <div className="pb-24 pt-16">
        <h1 className="text-3xl tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart
        </h1>
        <p className="mt-2 text-gray-500">
          Review your selected items before checkout.
        </p>

        {productsInCart.length === 0 ? (
          /* EMPTY STATE */
          <div className="mt-20 flex flex-col items-center justify-center py-20 border-t border-gray-200">
            <h2 className="text-2xl font-medium text-gray-900 mb-6">
              Your cart is empty
            </h2>
            <Link
              to="/"
              className="rounded-full shadow-sm transition-all px-10 py-3 text-lg font-bold"
              style={{
                backgroundColor: '#e5e7eb',
                color: '#000000',
                textDecoration: 'none'
              }}
            >
              Shop now
            </Link>
          </div>
        ) : (
          /* CART HAS ITEMS */
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                {productsInCart.map((product) => (
                  <li key={product.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <img
                        src={`/assets/${product.image}`}
                        alt={product.title}
                        className="h-24 w-24 object-cover object-center sm:h-48 sm:w-48 rounded-lg"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <h3 className="text-sm font-medium text-gray-700">
                            {product.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                          <p className="mt-1 text-sm font-bold text-gray-900">${product.price}</p>
                        </div>

                        <div className="mt-4 sm:mt-0">
                          <label className="text-sm text-gray-500">Qty: </label>
                          <input
                            type="number"
                            className="ml-2 w-12 border rounded text-center bg-white"
                            value={product?.quantity}
                            onChange={(e) => dispatch(updateProductQuantity({ id: product?.id, quantity: parseInt(e.target.value) }))}
                          />
                          <button
                            type="button"
                            className="ml-4 text-gray-400 hover:text-red-500"
                            onClick={() => {
                              dispatch(removeProductFromTheCart({ id: product?.id }));
                              toast.error("Removed from cart");
                            }}
                          >
                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Continue Shopping appears ONLY if cart has items */}
              <div className="mt-6">
                <Link to="/" className="text-sm font-medium text-gray-400 flex items-center hover:text-gray-600">
                  ← Continue Shopping
                </Link>
              </div>
            </section>

            {/* Order Summary */}
            <section
              className="mt-16 bg-white border border-gray-200 rounded-[2rem] px-6 py-10 sm:p-10 lg:col-span-5 lg:mt-0 shadow-sm"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-10">
                Order Summary
              </h2>

              <dl className="space-y-6">
                <div className="flex items-center justify-between text-gray-700">
                  <dt className="text-lg">Subtotal</dt>
                  <dd className="text-lg font-bold">${subtotal.toFixed(2)}</dd>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-700">
                  <dt className="text-lg">Delivery</dt>
                  <dd className="text-lg font-bold">
                    ${subtotal === 0 ? "0.00" : "5.00"}
                  </dd>
                </div>

                <div className="flex items-center justify-between pt-10">
                  <dt className="text-2xl font-bold text-gray-900">Total</dt>
                  <dd className="text-4xl font-black text-gray-900">
                    ${subtotal === 0 ? "0.00" : (subtotal + 5.0).toFixed(2)}
                  </dd>
                </div>
              </dl>

              {/* Proceed to Checkout Button */}
              <div className="mt-12">
                <Link
                  to="/checkout"
                  className="w-full flex items-center justify-center gap-2 rounded-full shadow-md transition-all"
                  style={{
                    backgroundColor: '#e5e7eb',
                    color: '#000000',
                    padding: '20px 24px',
                    fontSize: '20px',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    display: 'flex'
                  }}
                >
                  Proceed to Checkout
                  <ChevronRightIcon
                    className="h-6 w-6"
                    style={{ color: '#000000' }}
                  />
                </Link>
              </div>

              <div className="mt-8 flex items-start gap-2 text-xs text-gray-500 leading-relaxed">
                <CheckIcon className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                <p>
                  Nordic Assurance: Secure checkout and encrypted payments.
                  30-day hassle-free returns on all regular items.
                </p>
              </div>
            </section>
          </form>
        )}
      </div>
    </div>
  );
};

export default Cart;