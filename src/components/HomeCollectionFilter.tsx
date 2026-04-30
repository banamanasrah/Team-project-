import { useEffect, useState } from "react";
import axios from "axios";

interface Category {
  id: number;
  name: string;
}

const HomeCollectionFilter = ({
  setCategory,
  activeCategory,
}: {
  setCategory: (category: string) => void;
  activeCategory: string;
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/categories/")
      .then((res) => setCategories(Array.isArray(res.data) ? res.data : []))
      .catch(() => setCategories([]));
  }, []);

  return (
    <div className="max-w-screen-2xl flex items-center justify-between mx-auto mt-24 px-5">
      <ul className="flex gap-6 flex-wrap text-lg">
        {/* "All" pill always shown */}
        <li
          onClick={() => setCategory("All")}
          className={`
            px-5 py-2 rounded-full cursor-pointer transition
            ${
              activeCategory === "All"
                ? "bg-secondaryBrown text-white"
                : "bg-gray-200 text-black hover:bg-gray-300"
            }
          `}
        >
          All
        </li>

        {categories.length === 0 ? (
          // Graceful empty state — no crash, just a subtle hint
          <li className="px-5 py-2 text-gray-400 italic text-base">
            No categories yet
          </li>
        ) : (
          categories.map((cat) => (
            <li
              key={cat.id}
              onClick={() => setCategory(cat.name)}
              className={`
                px-5 py-2 rounded-full cursor-pointer transition
                ${
                  activeCategory === cat.name
                    ? "bg-secondaryBrown text-white"
                    : "bg-gray-200 text-black hover:bg-gray-300"
                }
              `}
            >
              {cat.name}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default HomeCollectionFilter;