import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";
import { ShopBanner } from "../components";
import ProductGrid from "../components/ProductGrid";
import ProductGridWrapper from "../components/ProductGridWrapper";

interface Product {
  id: string;
  image: string;
  title: string;
  category: string;
  price: number;
  popularity: number;
  stock: number;
}

interface LoaderData {
  category: string;
  products: Product[];
}

export const categoryLabelMap: Record<string, string> = {
  "home-living": "Home & Living",
  "electronics": "Electronics",
  "groceries-food": "Groceries & Food",
  "clothing-accessories": "Clothing & Accessories",
  "sports-outdoors": "Sports & Outdoors",
  "books-media": "Books & Media",
  "health-beauty": "Health & Beauty",
  "services": "Services",
};

export const shopCategoryLoader = async ({ params }: LoaderFunctionArgs): Promise<LoaderData> => {
  const categoryParam = params.category?.toLowerCase().trim() ?? "";

  const displayCategory = categoryParam
    ? categoryLabelMap[categoryParam] ?? categoryParam.replace(/-/g, " ")
    : "All";

  return {
    category: displayCategory,
    products: [],
  };
};

const Shop = () => {
  const { category } = useLoaderData() as LoaderData;

  return (
    <div className="max-w-screen-2xl mx-auto pt-10">
      <ShopBanner category={category} />

      <div className="mt-16 px-5 max-[400px]:px-3">
        <h2 className="text-black/90 text-5xl mb-12 text-center max-lg:text-4xl">
          {category}
        </h2>

        <ProductGridWrapper category={category}>
          <ProductGrid />
        </ProductGridWrapper>
      </div>
    </div>
  );
};

export default Shop;