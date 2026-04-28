import React from "react";
import ProductItem from "./ProductItem";
import { Product } from "../typings";

const ProductGrid = ({ products }: { products?: Product[] }) => {
  return (
    <div className="max-w-screen-2xl flex flex-wrap justify-between gap-y-8 mx-auto mt-12 px-5">
      {products && products.length > 0 ? (
        products.map((product: Product) => (
          <ProductItem key={product.id} {...product} />
        ))
      ) : (
        <p className="w-full text-center text-gray-500">No products found</p>
      )}
    </div>
  );
};

export default React.memo(ProductGrid);
