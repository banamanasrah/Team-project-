import { useCallback, useEffect, useState } from "react";
import React, { ReactElement } from "react";
import axios from "axios";

interface Product {
  id: string;
  image: string;
  title: string;
  category: string;
  price: number;
  popularity: number;
  stock: number;
}

const normalize = (str: string) =>
  str.toLowerCase().replace(/&/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

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
        const response = await axios.get("http://localhost:3000/products");
        let allProducts: Product[] = Array.isArray(response.data)
          ? response.data
          : [];

        // Filter by category (case-insensitive)
        if (cat) {
          allProducts = allProducts.filter(
            (p) => normalize(p.category) === normalize(cat)
          );
        }

        // Filter by search query (case-insensitive)
        if (query) {
          allProducts = allProducts.filter((p) =>
            p.title.toLowerCase().includes(query.toLowerCase())
          );
        }

        // Sort
        if (sort === "price-low") {
          allProducts.sort((a, b) => a.price - b.price);
        } else if (sort === "price-high") {
          allProducts.sort((a, b) => b.price - a.price);
        } else if (sort === "popularity") {
          allProducts.sort((a, b) => b.popularity - a.popularity);
        }

        // Pagination
        const startIndex = (pageNum - 1) * limit;
        const paginatedProducts = allProducts.slice(
          startIndex,
          startIndex + limit
        );

        setProducts(paginatedProducts);
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