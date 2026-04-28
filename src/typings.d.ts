export interface Product {
  id: string;
  title: string;
  image: string;
  category: string;
  price: number;
  popularity: number;
  stock: number;

  // ✅ NEW FIELD (for product page description)
  description?: string;
}

export interface ProductInCart extends Product {
  quantity: number;
  size?: string;   // optional because you removed sizes UI
  color: string;
}

export interface User {
  id: number;           // FastAPI returns int (was string in json-server)
  email: string;
  role: string;
  is_active?: boolean;  // FastAPI field

  // Legacy fields from json-server (not returned by FastAPI, kept for UI compatibility)
  name?: string;
  lastname?: string;
  password?: string;
}

export interface Order {
  id: number;
  orderStatus: string;
  orderDate: string;

  data: {
    email: string;
  };

  products: ProductInCart[];

  subtotal: number;

  user: {
    id: number;
    email: string;
  };
}