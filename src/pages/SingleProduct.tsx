import { Button, Dropdown, ProductItem, QuantityInput } from "../components";
import { useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { addProductToTheCart } from "../features/cart/cartSlice";
import { useAppDispatch } from "../hooks";
import { formatCategoryName } from "../utils/formatCategoryName";
import { Product } from "../typings";
import toast from "react-hot-toast";

const SingleProduct = () => {
  const location = useLocation();
  const [products, setProducts] = useState<Product[]>([]);
  const [singleProduct, setSingleProduct] = useState<Product | null>(
    (location.state as { product?: Product })?.product || null,
  );

  const [color, setColor] = useState<string>("#D3D3D3");
  const [quantity, setQuantity] = useState<number>(1);

  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const colors = ["#FFB6C1", "#ADD8E6", "#D3D3D3", "#FFFFE0"];

  // Normalize backend response → frontend Product shape
  const normalizeProduct = (p: {
    id: number;
    title: string;
    description?: string;
    price: number;
    stock_quantity: number;
    category?: { id: number; name: string } | string;
    image_url?: string;
  }): Product => ({
    id: String(p.id),
    title: p.title,
    description: p.description ?? "",
    price: p.price,
    category:
      p.category && typeof p.category === "object"
        ? (p.category as { name: string }).name
        : String(p.category ?? ""),
    stock: p.stock_quantity ?? 0,
    popularity: 0,
    image: p.image_url ?? "",
  });

  useEffect(() => {
    const fetchSingleProduct = async () => {
      if (!params.id) return;
      try {
        const response = await fetch(`http://localhost:8000/products/${params.id}`);
        if (!response.ok) {
          console.error("Failed to fetch single product", response.status);
          return;
        }
        const data = await response.json();
        setSingleProduct(normalizeProduct(data));
      } catch (error) {
        console.error("Error fetching single product:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8000/products?limit=6");
        if (!response.ok) {
          console.error("Failed to fetch products", response.status);
          return;
        }
        const data = await response.json();
        setProducts(Array.isArray(data) ? data.map(normalizeProduct) : []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (!singleProduct) {
      fetchSingleProduct();
    }
    fetchProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  const handleAddToCart = () => {
    if (singleProduct) {
      try {
        dispatch(
          addProductToTheCart({
            id: singleProduct.id + color,
            image: singleProduct.image,
            title: singleProduct.title,
            category: singleProduct.category,
            price: singleProduct.price,
            quantity,
            color,
            popularity: singleProduct.popularity,
            stock: singleProduct.stock,
          }),
        );
        toast.success("Product added to the cart");
      } catch (error) {
        toast.error("Failed to add product to cart");
        console.error("Error adding to cart:", error);
      }
    } else {
      toast.error("Product not loaded yet");
    }
  };

  const productDescription =
    singleProduct?.description ||
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, assumenda!";

  return (
    <div className="max-w-screen-2xl mx-auto px-5">
      {/* MAIN PRODUCT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">
        {/* LEFT IMAGE */}
        <div>
          <img
            src={`/assets/${encodeURIComponent(singleProduct?.image || "")}`}
            alt={singleProduct?.title || "Product image"}
            className="w-full object-contain rounded-xl"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col gap-5">
          {/* TITLE */}
          <h1 className="text-4xl font-bold">
            {singleProduct?.title || "Loading product..."}
          </h1>

          {/* PRICE */}
          <p className="text-2xl font-semibold text-black">
            ${singleProduct?.price ?? "00"}
          </p>

          {/* CATEGORY */}
          <p className="text-secondaryBrown text-sm">
            {formatCategoryName(singleProduct?.category || "")}
          </p>

          {/* COLORS (CIRCLES) */}
          <div className="flex items-center gap-3 mt-2">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-7 h-7 rounded-full border-2 ${
                  color === c ? "border-black" : "border-transparent"
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          {/* QUANTITY */}
          <QuantityInput
            value={quantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setQuantity(parseInt(e.target.value))
            }
          />

          {/* ADD TO CART */}
          <Button mode="brown" text="Add to cart" onClick={handleAddToCart} />

          <p className="text-secondaryBrown text-sm">
            Delivery estimated on Friday, July 26
          </p>

          {/* DROPDOWNS (UNCHANGED) */}
          <Dropdown dropdownTitle="Description">{productDescription}</Dropdown>
          <Dropdown dropdownTitle="Product Details">{productDescription}</Dropdown>
          <Dropdown dropdownTitle="Delivery Details">
            Delivered within 3–5 working days. Secure packaging included.
          </Dropdown>
        </div>
      </div>

      {/* SIMILAR PRODUCTS (UNCHANGED) */}
      <div>
        <h2 className="text-black/90 text-5xl mt-24 mb-12 text-center">
          Similar Products
        </h2>

        <div className="flex flex-wrap justify-between gap-5">
          {products.slice(0, 3).map((product) => (
            <ProductItem key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
