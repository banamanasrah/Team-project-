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
  id: string;
  name: string;
  lastname: string;
  email: string;
  role: string;
  password: string;
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