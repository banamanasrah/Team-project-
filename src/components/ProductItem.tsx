import { useNavigate } from "react-router-dom";

interface ProductItemProps {
  id: string | number;
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
  price,
}: ProductItemProps) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(`/product/${id}`)}
      className="bg-[var(--bg-soft)] p-4 rounded-xl border border-[var(--border)] text-center cursor-pointer hover:shadow-lg transition-shadow w-full"
    >
      {/* عرض الصورة بنفس الارتفاع القديم h-40 */}
      <div className="h-40 w-full flex items-center justify-center overflow-hidden">
        <img
          src={image || "https://placehold.co/400x600?text=No+Image"}
          className="h-full mx-auto object-contain"
          alt={title}
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/400x600?text=Image+Not+Found";
          }}
        />
      </div>

      {/* العنوان والسعر بنفس التنسيق القديم حرفياً */}
      <h3 className="mt-3 font-semibold text-[#1A1C2D]">{title}</h3>
      <p className="text-gray-400 font-medium">{Number(price).toFixed(2)} JOD</p>
    </button>
  );
};

export default ProductItem;