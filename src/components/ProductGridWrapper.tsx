import { useCallback, useEffect, useState } from "react";
import React, { ReactElement } from "react";
import axios from "axios";

interface Product {
  id: string;
  image: string;
  title: string;
  description?: string;
  category: string;
  price: number;
  popularity: number;
  stock: number;
}

const ProductGridWrapper = ({
  searchQuery = "",
  sortCriteria = "",
  category = "",
  page = 1,
  limit = 12,
  children,
}: {
  searchQuery?: string;
  sortCriteria?: string;
  category?: string;
  page?: number;
  limit?: number;
  children:
    | ReactElement<{ products: Product[] }>
    | ReactElement<{ products: Product[] }>[];
}) => {
  const [products, setProducts] = useState<Product[]>([]);

  const getFilteredProducts = useCallback(
    async (query: string, sort: string, cat: string, pageNum: number) => {
      try {
        // Build query params for FastAPI /products endpoint
        const params: Record<string, string | number> = {
          skip: (pageNum - 1) * limit,
          limit,
        };

        // Only pass category_name if it's not "All"
        if (cat && cat !== "All") {
          params.category_name = cat.replace(/-/g, " ");
        }

        if (query) {
          params.q = query;
        }

        // Map frontend sort labels → backend sort_by values
        if (sort === "price-low") params.sort_by = "price_asc";
        else if (sort === "price-high") params.sort_by = "price_desc";
        else params.sort_by = "newest";

        const response = await axios.get("http://localhost:8000/products", { params });

        // Normalize backend ProductWithCategoryResponse → frontend Product shape
        const normalized: Product[] = (
          Array.isArray(response.data) ? response.data : []
        ).map(
          (p: {
            id: number;
            title: string;
            description?: string;
            price: number;
            stock_quantity: number;
            category?: { id: number; name: string } | string;
            image_url?: string;
          }) => ({
            id: String(p.id),
            title: p.title,
            description: p.description ?? "",
            price: p.price,
            // Flatten nested category object to plain string
            category:
              p.category && typeof p.category === "object"
                ? (p.category as { name: string }).name
                : String(p.category ?? ""),
            // Backend field is stock_quantity; frontend expects stock
            stock: p.stock_quantity ?? 0,
            // Backend has no popularity field — default to 0
            popularity: 0,
            image: p.image_url ?? "",
          })
        );

        setProducts(normalized);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      }
    },
    [limit]
  );

  useEffect(() => {
    getFilteredProducts(searchQuery, sortCriteria, category, page);
  }, [searchQuery, sortCriteria, category, page, getFilteredProducts]);

  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { products } as any);
    }
    return child;
  });

  return <>{childrenWithProps}</>;
};

export default ProductGridWrapper;