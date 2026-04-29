import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import pants from "../assets/pants.jpg";
import skinCare from "../assets/skinCare.jpg";
import electronics from "../assets/electronics.jpg";
import accessories from "../assets/accessories.jpg";
import videoManInStore from "../assets/videoManInStore.mp4";
import phonecase from "../assets/phonecase.png";
import top from "../assets/top.png";
import headphones from "../assets/HeadPhones.png";

const sliderImages = [accessories, pants, skinCare, electronics];
const backgroundPositions = ["center", "center", "bottom", "center"];

const categoryMap = [
  { label: "Home & Living", slug: "home-living", path: "/shop/home-living" },
  { label: "Electronics", slug: "electronics", path: "/shop/electronics" },
  { label: "Groceries & Food", slug: "groceries-food", path: "/shop/groceries-food" },
  { label: "Clothing & Accessories", slug: "clothing-accessories", path: "/shop/clothing-accessories" },
  { label: "Services", slug: "services", path: "/services" },
];

const Landing = () => {
  const navigate = useNavigate();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % sliderImages.length);
    }, 15000);
    return () => clearInterval(timer);
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
            onClick={() => navigate(cat.path)}
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

      {/* PRODUCTS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button
          onClick={() => navigate("/product/1", { state: { product: { id: "1", title: "Stylish Top", price: 20, category: "clothing-accessories", image: top, popularity: 0, stock: 10 } } })}
          className="bg-[var(--bg-soft)] p-4 rounded-xl border border-[var(--border)] text-center cursor-pointer hover:shadow-lg transition-shadow"
        >
          <img src={top} className="h-40 mx-auto object-contain" alt="Stylish Top" />
          <h3 className="mt-3 font-semibold">Stylish Top</h3>
          <p className="text-gray-400">20.00 JOD</p>
        </button>

        <button
          onClick={() => navigate("/product/2", { state: { product: { id: "2", title: "Phone Case", price: 20, category: "clothing-accessories", image: phonecase, popularity: 0, stock: 10 } } })}
          className="bg-[var(--bg-soft)] p-4 rounded-xl border border-[var(--border)] text-center cursor-pointer hover:shadow-lg transition-shadow"
        >
          <img src={phonecase} className="h-40 mx-auto object-contain" alt="Phone Case" />
          <h3 className="mt-3 font-semibold">Phone Case</h3>
          <p className="text-gray-400">20.00 JOD</p>
        </button>

        <button
          onClick={() => navigate("/product/101", { state: { product: { id: "101", title: "Headphones", price: 20, category: "electronics", image: headphones, popularity: 0, stock: 10 } } })}
          className="bg-[var(--bg-soft)] p-4 rounded-xl border border-[var(--border)] text-center cursor-pointer hover:shadow-lg transition-shadow"
        >
          <img src={headphones} className="h-40 mx-auto object-contain" alt="Headphones" />
          <h3 className="mt-3 font-semibold">Headphones</h3>
          <p className="text-gray-400">20.00 JOD</p>
        </button>
      </div>

      {/* MORE BUTTON */}
      <div className="flex justify-center">
        <button
          onClick={() => navigate("/shop/home-living")}
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