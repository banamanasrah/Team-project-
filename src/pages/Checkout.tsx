
/*import { HiTrash as TrashIcon } from "react-icons/hi2";
import { Button } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removeProductFromTheCart } from "../features/cart/cartSlice";
import customFetch from "../axios/custom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { checkCheckoutFormData } from "../utils/checkCheckoutFormData";

/*
address: "Marka Markovic 22"
apartment: "132"
cardNumber: "21313"
city: "Belgrade"
company: "Bojan Cesnak"
country: "United States"
cvc: "122"
emailAddress: "kuzma@gmail.com"
expirationDate: "12312"
firstName: "Aca22"
lastName: "Kuzma"
nameOnCard: "Aca JK"
paymentType: "on"
phone: "06123123132"
postalCode: "11080"
region: "Serbia"
*/
/*
const paymentMethods = [
  { id: "credit-card", title: "Credit card" },
  { id: "paypal", title: "PayPal" },
  { id: "etransfer", title: "eTransfer" },
];

const Checkout = () => {
  const { productsInCart, subtotal } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCheckoutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const checkoutData = {
      data,
      products: productsInCart,
      subtotal: subtotal,
    };

    if (!checkCheckoutFormData(checkoutData)) return;

    let response;
    if (JSON.parse(localStorage.getItem("user") || "{}").email) {
      response = await customFetch.post("/orders", {
        ...checkoutData,
        user: {
          email: JSON.parse(localStorage.getItem("user") || "{}").email,
          id: JSON.parse(localStorage.getItem("user") || "{}").id,
        },
        orderStatus: "Processing",
        orderDate: new Date().toISOString(),
      });
    } else {
      response = await customFetch.post("/orders", {
        ...checkoutData,
        orderStatus: "Processing",
        orderDate: new Date().toLocaleDateString(),
      });
    }

    if (response.status === 201) {
      toast.success("Order has been placed successfully");
      navigate("/order-confirmation");
    } else {
      toast.error("Something went wrong, please try again later");
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="pb-24 pt-16 px-5 max-[400px]:px-3">
        <h2 className="sr-only">Checkout</h2>

        <form
          onSubmit={handleCheckoutSubmit}
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        >
          <div>
            <div>
              <h2 className="text-lg font-medium text-gray-900">
                Contact information
              </h2>

              <div className="mt-4">
                <label
                  htmlFor="email-address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email-address"
                    name="emailAddress"
                    autoComplete="email"
                    className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                    required={true}
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">
                Shipping information
              </h2>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                <div>
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="first-name"
                      name="firstName"
                      autoComplete="given-name"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="last-name"
                      name="lastName"
                      autoComplete="family-name"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="company"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="company"
                      id="company"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="address"
                      id="address"
                      autoComplete="street-address"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="apartment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Apartment, suite, etc.
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="apartment"
                      id="apartment"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                  >
                    City
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      autoComplete="address-level2"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Country
                  </label>
                  <div className="mt-1">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium text-gray-700"
                  >
                    State / Province
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      autoComplete="address-level1"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Postal code
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="postalCode"
                      id="postal-code"
                      autoComplete="postal-code"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="phone"
                      id="phone"
                      autoComplete="tel"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>
              </div>
            </div>
            

            {/* Payment *//*
            <div className="mt-10 border-t border-gray-200 pt-10">
              <h2 className="text-lg font-medium text-gray-900">Payment</h2>

              <fieldset className="mt-4">
                <legend className="sr-only">Payment type</legend>
                <div className="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0">
                  {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
                    <div key={paymentMethod.id} className="flex items-center">
                      {paymentMethodIdx === 0 ? (
                        <input
                          id={paymentMethod.id}
                          name="paymentType"
                          type="radio"
                          defaultChecked
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      ) : (
                        <input
                          id={paymentMethod.id}
                          name="paymentType"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                      )}

                      <label
                        htmlFor={paymentMethod.id}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {paymentMethod.title}
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
                <div className="col-span-4">
                  <label
                    htmlFor="card-number"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Card number
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="card-number"
                      name="cardNumber"
                      autoComplete="cc-number"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div className="col-span-4">
                  <label
                    htmlFor="name-on-card"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name on card
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      id="name-on-card"
                      name="nameOnCard"
                      autoComplete="cc-name"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div className="col-span-3">
                  <label
                    htmlFor="expiration-date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Expiration date (MM/YY)
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="expirationDate"
                      id="expiration-date"
                      autoComplete="cc-exp"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CVC
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      name="cvc"
                      id="cvc"
                      autoComplete="csc"
                      className="block w-full py-2 indent-2 border-gray-300 outline-none focus:border-gray-400 border border shadow-sm sm:text-sm"
                      required={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order summary *//*
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200">
                {productsInCart.map((product) => (
                  <li key={product?.id} className="flex px-4 py-6 sm:px-6">
                    <div className="flex-shrink-0">
                      <img
                        src={`/assets/${product?.image}`}
                        alt={product?.title}
                        className="w-20 rounded-md"
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm font-medium text-gray-700 hover:text-gray-800">
                            {product?.title}
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            {product?.color}
                          </p>
                          <p className="mt-1 text-sm text-gray-500">
                            {product?.size}
                          </p>
                        </div>

                        <div className="ml-4 flow-root flex-shrink-0">
                          <button
                            type="button"
                            className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                            onClick={() =>
                              dispatch(
                                removeProductFromTheCart({ id: product?.id })
                              )
                            }
                          >
                            <span className="sr-only">Remove</span>
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">
                          ${product?.price}
                        </p>

                        <div className="ml-4">
                          <p className="text-base">
                            Quantity: {product?.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${subtotal}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${subtotal ? 5 : 0}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">
                    ${subtotal ? subtotal / 5 : 0}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">
                    ${subtotal ? subtotal + 5 + subtotal / 5 : 0}
                  </dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <Button text="Confirm Order" mode="brown" />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Checkout;
*/
import { HiTrash as TrashIcon } from "react-icons/hi2";
import { Button } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removeProductFromTheCart } from "../features/cart/cartSlice";
import customFetch from "../axios/custom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { checkCheckoutFormData } from "../utils/checkCheckoutFormData";

const paymentMethods = [
  { id: "credit-card", title: "Credit card" },
  { id: "paypal", title: "PayPal" },
  { id: "etransfer", title: "eTransfer" },
];

const Checkout = () => {
  const { productsInCart, subtotal } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleCheckoutSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const checkoutData = {
      data,
      products: productsInCart,
      subtotal: subtotal,
    };

    if (!checkCheckoutFormData(checkoutData)) return;

    let response;
    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.email) {
      response = await customFetch.post("/orders", {
        ...checkoutData,
        user: {
          email: user.email,
          id: user.id,
        },
        orderStatus: "Processing",
        orderDate: new Date().toISOString(),
      });
    } else {
      response = await customFetch.post("/orders", {
        ...checkoutData,
        orderStatus: "Processing",
        orderDate: new Date().toLocaleDateString(),
      });
    }

    if (response.status === 201) {
      toast.success("Order has been placed successfully");
      navigate("/order-confirmation");
    } else {
      toast.error("Something went wrong, please try again later");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex justify-center py-10 px-5 font-serif">
      <div className="w-full max-w-6xl bg-white rounded-[40px] shadow-xl p-10">

        <form
          onSubmit={handleCheckoutSubmit}
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        >
          {/* LEFT SIDE */}
          <div>

            {/* CONTACT */}
            <div>
              <h2 className="text-black text-xl font-semibold">
                Contact Information
              </h2>

              <div className="mt-4">
                <label className="block text-black uppercase text-xs font-bold tracking-wide mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  className="w-full px-4 py-3 rounded-[15px] border border-gray-200 bg-[#F9FAFB] outline-none"
                  required
                />
              </div>
            </div>

            {/* SHIPPING */}
            <div className="mt-10 border-t pt-10">
              <h2 className="text-black text-xl font-semibold">
                Shipping Information
              </h2>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">

                <input name="firstName" placeholder="First Name" className="input" required />
                <input name="lastName" placeholder="Last Name" className="input" required />
                <input name="company" placeholder="Company" className="input sm:col-span-2" required />
                <input name="address" placeholder="Address" className="input sm:col-span-2" required />
                <input name="apartment" placeholder="Apartment" className="input sm:col-span-2" required />
                <input name="city" placeholder="City" className="input" required />

                <select name="country" className="input" required>
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Jordan</option>
                </select>

                <input name="region" placeholder="State / Province" className="input" required />
                <input name="postalCode" placeholder="Postal Code" className="input" required />
                <input name="phone" placeholder="Phone" className="input sm:col-span-2" required />

              </div>
            </div>

            {/* PAYMENT */}
            <div className="mt-10 border-t pt-10">
              <h2 className="text-black text-xl font-semibold">Payment</h2>

              <div className="flex gap-6 mt-4">
                {paymentMethods.map((method, i) => (
                  <label key={method.id} className="flex items-center gap-2 text-black">
                    <input
                      type="radio"
                      name="paymentType"
                      defaultChecked={i === 0}
                    />
                    {method.title}
                  </label>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-4 gap-4">
                <input name="cardNumber" placeholder="Card Number" className="input col-span-4" required />
                <input name="nameOnCard" placeholder="Name on Card" className="input col-span-4" required />
                <input name="expirationDate" placeholder="MM/YY" className="input col-span-3" required />
                <input name="cvc" placeholder="CVC" className="input" required />
              </div>
            </div>

          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-black text-xl font-semibold">Order Summary</h2>

            <div className="mt-4 bg-white rounded-[30px] shadow-lg border p-5">

              {productsInCart.map((product) => (
                <div key={product.id} className="flex gap-4 mb-5">

                  <img
                    src={`/assets/${product.image}`}
                    className="w-20 rounded-md"
                  />

                  <div className="flex-1">
                    <h4 className="text-black font-medium">{product.title}</h4>
                    <p className="text-sm text-gray-500">{product.color}</p>
                    <p className="text-sm text-gray-500">
                      Quantity: {product.quantity}
                    </p>
                  </div>

                  <div className="flex flex-col justify-between items-end">
                    <button
                      onClick={() =>
                        dispatch(removeProductFromTheCart({ id: product.id }))
                      }
                      className="text-gray-400 hover:text-black"
                    >
                      <TrashIcon />
                    </button>

                    <p className="text-black font-semibold">
                      ${product.price}
                    </p>
                  </div>

                </div>
              ))}

              {/* TOTAL */}
              <div className="border-t pt-5 space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${subtotal ? 5 : 0}</span>
                </div>

                <div className="flex justify-between">
                  <span>Taxes</span>
                  <span>${subtotal ? subtotal / 5 : 0}</span>
                </div>

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>
                    ${subtotal ? subtotal + 5 + subtotal / 5 : 0}
                  </span>
                </div>
              </div>

              {/* BUTTON */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full bg-[#e5e7eb] py-3 rounded-full font-semibold"
                >
                  Confirm Order
                </button>
              </div>

            </div>
          </div>

        </form>
      </div>

      {/* 🔥 GLOBAL INPUT STYLE */}
      <style>{`
        .input {
          width: 100%;
          padding: 12px 16px;
          border-radius: 15px;
          border: 1px solid #e5e7eb;
          background: #f9fafb;
          outline: none;
          font-size: 14px;
        }
      `}</style>
    </div>
  );
};

export default Checkout;