import React from "react";
import { HiTrash as TrashIcon, HiCurrencyDollar as MoneyIcon } from "react-icons/hi2";
import { useAppDispatch, useAppSelector } from "../hooks";
import { removeProductFromTheCart } from "../features/cart/cartSlice";
import customFetch from "../axios/custom";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { checkCheckoutFormData } from "../utils/checkCheckoutFormData";

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

    try {
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
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex justify-center py-10 px-5 font-serif">
      <div className="w-full max-w-7xl bg-white rounded-[40px] shadow-xl p-10">

        <form
          onSubmit={handleCheckoutSubmit}
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        >
          {/* LEFT SIDE: CONTACT & SHIPPING */}
          <div>
            <div className="mb-10">
              <h2 className="text-black text-2xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-2">
                <label className="block text-black uppercase text-xs font-bold tracking-wide">Email</label>
                <input
                  type="email"
                  name="emailAddress"
                  className="input"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="mt-10 border-t border-gray-100 pt-10">
              <h2 className="text-black text-2xl font-bold mb-6">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
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

            {/* PAYMENT BOX */}
            <div className="mt-12 pt-10 border-t border-gray-100">
              <div
                style={{
                  backgroundColor: '#c9c5c58c',
                  padding: '24px',
                  borderRadius: '2.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px'
                }}
              >
                <MoneyIcon style={{ fontSize: '36px', color: '#000000' }} />
                <div style={{ color: '#000000' }}>
                  <h3 style={{ margin: '0', fontSize: '18px', fontWeight: 'bold' }}>
                    Payment: Cash on Delivery
                  </h3>
                  <p style={{ margin: '4px 0 0 0', fontSize: '14px', lineHeight: '1.5' }}>
                    Pay safely at your doorstep upon receiving the items. No upfront payment required.
                  </p>
                </div>
                <input type="hidden" name="paymentType" value="cash-on-delivery" />
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: ORDER SUMMARY */}
          <div className="mt-12 lg:mt-0">
            <div className="bg-white rounded-[40px] shadow-lg border border-gray-100 p-8 pt-10">

              {/* Order Summary Title - Now Inside the Box */}
              <div className="mb-8 pb-4 border-b border-gray-100">
                <h2 className="text-black text-2xl font-bold">Order Summary</h2>
              </div>

              {/* Product List */}
              <div className="space-y-8 mb-10 max-h-[400px] overflow-y-auto pr-2">
                {productsInCart.map((product) => (
                  <div key={product.id} className="flex gap-4 items-start">
                    <img
                      src={`/assets/${product.image}`}
                      className="w-20 h-20 object-cover rounded-xl"
                      alt={product.title}
                    />
                    <div className="flex-1">
                      <h4 className="text-black font-bold text-base">{product.title}</h4>
                      <p className="text-sm text-gray-500">{product.color}</p>
                      <p className="text-sm text-gray-500">Qty: {product.quantity}</p>
                    </div>
                    <div className="flex flex-col justify-between items-end h-20">
                      <button
                        type="button"
                        onClick={() => dispatch(removeProductFromTheCart({ id: product.id }))}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                      <span className="font-bold text-black">${product.price.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pricing Section: Subtotal -> Delivery -> Total */}
              <div className="border-t border-gray-100 pt-8 space-y-4">
                <div className="flex justify-between text-gray-700">
                  <span className="text-lg">Subtotal</span>
                  <span className="font-bold text-black">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700 pt-2">
                  <span className="text-lg">Delivery</span>
                  <span className="font-bold text-black">
                    ${subtotal ? "5.00" : "0.00"}
                  </span>
                </div>
                <div className="flex justify-between items-center pt-10 border-t border-gray-100">
                  <span className="text-2xl font-bold text-black">Total</span>
                  <span className="text-4xl font-black text-black">
                    ${subtotal ? (subtotal + 5.0).toFixed(2) : "0.00"}
                  </span>
                </div>
              </div>

              {/* Confirm Button & Terms */}
              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full bg-[#E5E7EB] py-5 rounded-full font-black text-black text-xl hover:bg-gray-300 transition-all shadow-md active:scale-[0.98]"
                >
                  Confirm Order
                </button>
                <div className="mt-6">
                  <p
                    style={{
                      color: '#000000',
                      fontSize: '12px',
                      textAlign: 'center',
                      fontWeight: '700',
                      letterSpacing: '0.1px'
                    }}
                  >
                    By placing your order, you agree to EyeOn's terms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>

      <style>{`
        .input {
          width: 100%;
          padding: 14px 18px;
          border-radius: 18px;
          border: 1px solid #E5E7EB;
          background-color: #F9FAFB;
          outline: none;
          font-size: 15px;
          transition: border-color 0.2s;
        }
        .input:focus {
          border-color: #67869A;
        }
      `}</style>
    </div>
  );
};

export default Checkout;