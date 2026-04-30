/**
 * cartApi.ts
 * Thin wrapper around the backend cart endpoints.
 * Keeps API logic out of components and Redux slices.
 */
import customFetch from "../axios/custom";

export interface BackendCartItem {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  product: {
    id: number;
    title: string;
    description: string;
    price: number;
    stock_quantity: number;
    image_url: string | null;
    category_id: number;
    category: { id: number; name: string };
  };
}

export interface BackendCart {
  id: number;
  user_id: number;
  items: BackendCartItem[];
}

/** Returns true when a JWT token is stored (user is logged in). */
export const isLoggedIn = () => !!localStorage.getItem("access_token");

/** GET /cart/ — fetch the current user's persistent cart. */
export const fetchCart = (): Promise<BackendCart> =>
  customFetch.get("/cart/").then((r) => r.data);

/**
 * POST /cart/items — add (or merge) a product into the backend cart.
 * Throws an AxiosError with a `detail` string if the stock is insufficient.
 */
export const addToBackendCart = (
  product_id: number,
  quantity: number
): Promise<BackendCart> =>
  customFetch.post("/cart/items", { product_id, quantity }).then((r) => r.data);

/**
 * POST /orders/checkout — create an order from the current cart.
 * Backend atomically snapshots prices, decrements stock, and clears the cart.
 */
export const checkout = (
  shipping_address: string,
  payment_method: string
): Promise<{ id: number; total_price: number; status: string }> =>
  customFetch
    .post("/orders/checkout", { shipping_address, payment_method })
    .then((r) => r.data);

/**
 * DELETE /cart/items/{product_id} — remove a specific item from the backend cart.
 */
export const removeFromBackendCart = (
  product_id: number
): Promise<BackendCart> =>
  customFetch.delete(`/cart/items/${product_id}`).then((r) => r.data);

/**
 * DELETE /cart/ — clear all items from the backend cart.
 */
export const clearBackendCart = (): Promise<BackendCart> =>
  customFetch.delete("/cart/").then((r) => r.data);
