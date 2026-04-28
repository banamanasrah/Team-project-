import { Link } from "react-router-dom";
import { formatCategoryName } from "../utils/formatCategoryName";

interface ProductItemProps {
  id: string;
  image: string;
  title: string;
  category: string;
  price: number;
  popularity: number;
  stock: number;
}

const ProductItem = ({
  id,
  image,
  title,
  category,
  price,
  popularity,
  stock,
}: ProductItemProps) => {
  const product = { id, image, title, category, price, popularity, stock };

  return (
    <div className="w-[400px] flex flex-col gap-2 justify-center max-md:w-[300px]">
      {/* IMAGE */}
      <Link
        to={`/product/${id}`}
        state={{ product }}
        className="w-full h-[300px] overflow-hidden"
      >
        <img
          src={`/assets/${encodeURIComponent(image)}`}
          alt={title}
          className="w-full h-full object-cover"
        />
      </Link>

      {/* TITLE */}
      <Link
        to={`/product/${id}`}
        state={{ product }}
        className="text-black text-center text-3xl"
      >
        <h2>{title}</h2>
      </Link>

      {/* CATEGORY */}
      <p className="text-secondaryBrown text-center text-lg">
        {formatCategoryName(category)}
      </p>

      {/* PRICE */}
      <p className="text-black text-2xl text-center font-bold">${price}</p>

      {/* BUTTONS */}
      <div className="w-full flex flex-col gap-2">
        <Link
          to={`/product/${id}`}
          state={{ product }}
          className="bg-secondaryBrown text-white text-center h-12 flex items-center justify-center"
        >
          View product
        </Link>

        <Link
          to={`/product/${id}`}
          state={{ product }}
          className="border border-black text-black text-center h-12 flex items-center justify-center"
        >
          Learn more
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
