import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import pants from "../assets/pants.jpg";
import skinCare from "../assets/skinCare.jpg";
import electronics from "../assets/electronics.jpg";
import accessories from "../assets/accessories.jpg";
import videoManInStore from "../assets/videoManInStore.mp4";
import { ProductItem } from "../components";
import { Product } from "../typings";
import customFetch from "../axios/custom";

const sliderImages = [accessories, pants, skinCare, electronics];
const backgroundPositions = ["center", "center", "bottom", "center"];

const categoryMap = [
  { label: "Home & Living", slug: "home-living" },
  { label: "Electronics", slug: "electronics" },
  { label: "Groceries & Food", slug: "groceries-food" },
  { label: "Clothing & Accessories", slug: "clothing-accessories" },
  { label: "Services", slug: "services" },
];

const Landing = () => {
  const navigate = useNavigate();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [trendingProducts, setTrendingProducts] = useState<Product[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Fetch 3 newest/trending products
    customFetch.get("/products/?limit=3")
      .then((res) => {
        const normalized: Product[] = (Array.isArray(res.data) ? res.data : []).map((p: any) => ({
          id: String(p.id),
          title: p.title,
          description: p.description ?? "",
          price: p.price,
          category: p.category && typeof p.category === "object" ? p.category.name : String(p.category ?? ""),
          stock: p.stock_quantity ?? 0,
          popularity: 0,
          image: p.image_url ?? "",
        }));
        setTrendingProducts(normalized);
      })
      .catch((err) => console.error("Error fetching trending products:", err));
  }, []);

  return (
    <div className="p-6 space-y-12">
      {/* HERO SECTION (SLIDER) */}
      <div
        className="relative rounded-2xl overflow-hidden h-[420px] flex items-center px-10"
        style={{
          backgroundImage: `url(${sliderImages[currentSlideIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: backgroundPositions[currentSlideIndex],
          transition: "background-image 0.5s ease-in-out",
        }}
      >
        <div className="flex flex-col items-start" style={{ width: 427, padding: 0, gap: 12 }}>
          <div className="flex flex-col items-start" style={{ width: 427 }}>
            <h1
              className="tracking-[-0.03em] text-[#1A1C2D]"
              style={{
                fontWeight: 790,
                fontSize: 88.6378,
                lineHeight: "106px",
                margin: 0,
              }}
            >
              Everything
            </h1>
            <h2
              className="tracking-[-0.03em] text-[#1A1C2D]"
              style={{
                fontWeight: 790,
                fontSize: 38.6477,
                lineHeight: "46px",
                margin: 0,
              }}
            >
              You Need, All in One Place
            </h2>
          </div>
          <p
            className="tracking-[-0.03em] text-white"
            style={{
              width: 427,
              fontWeight: 600,
              fontSize: 16,
              lineHeight: "20px",
              margin: 0,
            }}
          >
            Shop quality products and discover trusted services across multiple categories.
          </p>
        </div>
      </div>

      {/* CATEGORY ROW */}
      <div className="flex flex-wrap gap-3 justify-center">
        {categoryMap.map((cat) => (
          <button
            key={cat.slug}
            className="py-3 px-7 rounded-full bg-secondaryBrown/10 text-[#111111] font-medium transition duration-200 hover:bg-secondaryBrown/20"
            onClick={() => navigate(`/shop/${cat.slug}`)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* SALES BANNER (VIDEO) */}
      <div className="rounded-2xl overflow-hidden">
        <video width="100%" height="250" autoPlay muted loop className="w-full rounded-2xl">
          <source src={videoManInStore} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* PRODUCTS SECTION - تم إرجاع الـ Grid الأصلي 100% */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        {trendingProducts.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            image={product.image}
            title={product.title}
            category={product.category}
            price={product.price}
            popularity={product.popularity}
            stock={product.stock}
          />
        ))}
      </div>

      {/* MORE BUTTON */}
      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/shop/all")}
          className="py-3 px-7 rounded-full bg-secondaryBrown/10 text-[#111111] font-medium transition duration-200 hover:bg-secondaryBrown/20"
        >
          Explore More
        </button>
      </div>

      {/* FEATURE SECTION */}
      <div className="bg-[var(--bg-soft)] rounded-xl p-10 text-center border border-[var(--border)]">
        <h2 className="text-2xl font-semibold">Modern Shopping Experience</h2>
        <p className="text-gray-400 mt-2">Clean design, fast browsing, and easy checkout.</p>
      </div>

      {/* FOLLOW SECTION */}
      <div className="text-center text-sm text-gray-500">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-lg font-semibold text-[#8b8dff] hover:text-[#c7c9ff] cursor-pointer transition-colors"
        >
          EyeOn
        </button>
      </div>
    </div>
  );
};

export default Landing;