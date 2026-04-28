import {
  Button,
  Dropdown,
  ProductItem,
  QuantityInput,
} from "../components";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { addProductToTheCart } from "../features/cart/cartSlice";
import { useAppDispatch } from "../hooks";
import { formatCategoryName } from "../utils/formatCategoryName";
import { Product } from "../typings";
import toast from "react-hot-toast";

const SingleProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [singleProduct, setSingleProduct] = useState<Product | null>(null);

  const [color, setColor] = useState<string>("black");
  const [quantity, setQuantity] = useState<number>(1);

  const params = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  const colors = ["black", "red", "blue", "white", "green", "rose"];

  useEffect(() => {
    const fetchSingleProduct = async () => {
      const response = await fetch(
        `http://localhost:3000/products/${params.id}`
      );
      const data = await response.json();
      setSingleProduct(data);
    };

    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3000/products");
      const data = await response.json();
      setProducts(data);
    };

    fetchSingleProduct();
    fetchProducts();
  }, [params.id]);

  const handleAddToCart = () => {
    if (singleProduct) {
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
        })
      );
      toast.success("Product added to the cart");
    }
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-5">

      {/* MAIN PRODUCT SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-10">

        {/* LEFT IMAGE */}
        <div>
          <img
            src={`/assets/${singleProduct?.image}`}
            alt={singleProduct?.title}
            className="w-full object-contain rounded-xl"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col gap-5">

          {/* TITLE */}
          <h1 className="text-4xl font-bold">
            {singleProduct?.title}
          </h1>

          {/* PRICE */}
          <p className="text-2xl font-semibold text-black">
            ${singleProduct?.price}
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
          <Button
            mode="brown"
            text="Add to cart"
            onClick={handleAddToCart}
          />

          <p className="text-secondaryBrown text-sm">
            Delivery estimated on Friday, July 26
          </p>

          {/* DROPDOWNS (UNCHANGED) */}
          <Dropdown dropdownTitle="Description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Dropdown>

          <Dropdown dropdownTitle="Product Details">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Dropdown>

          <Dropdown dropdownTitle="Delivery Details">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
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