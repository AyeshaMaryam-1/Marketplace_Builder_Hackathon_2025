"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import { Product } from "../../../types/product";
import { allProducts } from "@/sanity/lib/queries";
import { urlFor } from "@/sanity/lib/image";
import { addToCart } from "../actions/actions";
import { useSearch } from "../context/searchContext";
import Swal from "sweetalert2";

interface ProductsProps {
  limit?: number; // Optional prop to limit the number of products
  enablePagination?: boolean; // Prop to control pagination
  sortOption?: string;
}

const ProductGrid: React.FC<ProductsProps> = ({
  limit,
  enablePagination = false,
  sortOption,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [products, setProducts] = useState<Product[]>([]);
  const { searchQuery } = useSearch();

  useEffect(() => {
    async function fetchProducts() {
      const fetchedProducts: Product[] = await client.fetch(allProducts);

      // Apply the limit if provided
      const limitedProducts = limit
        ? fetchedProducts.slice(0, limit)
        : fetchedProducts;
      setProducts(limitedProducts);
    }
    fetchProducts();
  }, [limit]);

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Sorting Logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "a-z") {
      return (a.title ?? "").localeCompare(b.title ?? ""); // Sort in alphabetical order
    } else if (sortOption === "z-a") {
      return (b.title ?? "").localeCompare(a.title ?? ""); // Sort in reverse alphabetical order
    } else if (sortOption === "price") {
      return a.price - b.price; // Sort by Price (Low to High)
    }
    return 0; // Default order (no sorting)
  });

  // Apply pagination only if enablePagination is true
  const displayedProducts = enablePagination
    ? sortedProducts.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
      )
    : sortedProducts;

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    Swal.fire({
      position: "center",
      icon: "success",
      title: `${product.title} added to cart`,
      showConfirmButton: false,
      timer: 1000,
    });
    addToCart(product);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ml-4 py-8 px-4 sm:mx-auto md:ml-10">
      {displayedProducts.length > 0 ? (
        displayedProducts.map((product) => (
          <div
            key={product._id}
            className="relative tracking-wide group w-[285px] h-[446px] bg-white shadow-md overflow-hidden hover:-translate-y-2 transition-all"
          >
            <Link href={`/product/${product._id}`}>
              {/* Product Image */}
              <div className="relative">
                {product.productImage && (
                  <Image
                    src={urlFor(product.productImage).url()}
                    alt={"product image"}
                    width={285}
                    height={301}
                    loading="lazy"
                    className="w-[285px] h-[301px] object-cover"
                  />
                )}
              </div>
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  className="bg-white text-[#B88E2F] py-4 px-12 font-lg font-bold mb-3"
                  onClick={(e) => handleAddToCart(e, product)}
                >
                  Add to cart
                </button>
                <div className="flex mt-4 gap-4 font-semibold">
                  <button className="flex gap-1 text-white text-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={18}
                      height={18}
                      viewBox="0 0 24 24"
                      className="mt-1"
                    >
                      <path
                        fill="currentColor"
                        d="M17.5 3.25a2.75 2.75 0 1 1-1.451 5.086a1 1 0 0 1-.089.052l-6.713 3.48a3 3 0 0 1 0 .264l.013.008l6.416 3.802a2.75 2.75 0 1 1-.912 1.784L8.42 13.968a2.75 2.75 0 1 1 .008-3.928l6.415-3.326A2.75 2.75 0 0 1 17.5 3.25"
                      ></path>
                    </svg>
                    Share
                  </button>
                  <button className="flex gap-1 text-white text-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 32 32"
                      className="mt-1"
                    >
                      <path
                        fill="currentColor"
                        d="M11.41 26.59L7.83 23H28v-2H7.83l3.58-3.59L10 16l-6 6l6 6zM28 10l-6-6l-1.41 1.41L24.17 9H4v2h20.17l-3.58 3.59L22 16z"
                      ></path>
                    </svg>
                    Compare
                  </button>
                  <button className="flex gap-1 text-white text-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 256 256"
                      className="mt-1"
                    >
                      <path
                        fill="currentColor"
                        d="M178 40c-20.65 0-38.73 8.88-50 23.89C116.73 48.88 98.65 40 78 40a62.07 62.07 0 0 0-62 62c0 70 103.79 126.66 108.21 129a8 8 0 0 0 7.58 0C136.21 228.66 240 172 240 102a62.07 62.07 0 0 0-62-62m-50 174.8c-18.26-10.64-96-59.11-96-112.8a46.06 46.06 0 0 1 46-46c19.45 0 35.78 10.36 42.6 27a8 8 0 0 0 14.8 0c6.82-16.67 23.15-27 42.6-27a46.06 46.06 0 0 1 46 46c0 53.61-77.76 102.15-96 112.8"
                      ></path>
                    </svg>
                    Like
                  </button>
                </div>
              </div>
              {/* Product Details */}
              <div className="p-6 h-40 bg-[#F4F5F7]">
                <h3 className="text-lg font-bold text-gray-800">
                  {product.title}
                </h3>
                <h3 className="text-sm text-gray-800">
                  {product.description?.substring(0, 58)}...
                </h3>
                <div className="flex items-center space-x-2 mt-2">
                  <p className="text-lg font-bold text-gray-800">
                    ${product.price}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        // No results found message
        <div className="col-span-full flex flex-col justify-center items-center py-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            className="text-gray-600 m-2"
          >
            <path
              fill="currentColor"
              d="M7 20.616q-1.671 0-2.835-1.165Q3 18.286 3 16.616q0-1.672 1.165-2.836Q5.329 12.616 7 12.616t2.836 1.164T11 16.616q0 1.67-1.164 2.835Q8.67 20.616 7 20.616m13.446-.462l-6.284-6.285q-.27.231-.645.443t-.701.327q-.108-.21-.234-.413t-.259-.368q1.258-.523 2.083-1.667T15.23 9.5q0-1.971-1.38-3.351t-3.35-1.38T7.149 6.15T5.769 9.5q0 .304.051.615q.051.31.115.594q-.22.012-.488.095t-.481.167q-.089-.313-.143-.694T4.769 9.5q0-2.398 1.667-4.064Q8.102 3.769 10.5 3.769t4.065 1.667T16.23 9.5q0 1.075-.376 2.028t-.957 1.657l6.256 6.261zM5.244 18.917L7 17.161l1.75 1.756l.552-.546l-1.756-1.755l1.756-1.756l-.546-.546L7 16.069l-1.756-1.755l-.546.545l1.756 1.756l-1.756 1.756z"
            />
          </svg>
          <p className="text-2xl font-semibold text-gray-700">
            No Results Found
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Try adjusting your search or filter to find what you&apos;re looking for.
          </p>
        </div>
      )}

      {/* Render pagination controls only if pagination is enabled */}
      {enablePagination && (
        <ul className="flex space-x-5 ml-0 sm:ml-[300px] lg:ml-0 xl:ml-[640px] py-10 justify-center font-[sans-serif]">
          {[...Array(Math.ceil(products.length / productsPerPage))].map(
            (_, index) => (
              <li
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={`flex items-center justify-center shrink-0 px-[20px] h-12 rounded-md cursor-pointer text-base ${
                  currentPage === index + 1
                    ? "bg-[#B88E2F] text-white"
                    : "bg-[#FAF3EA] text-black hover:bg-[#B88E2F] hover:text-white"
                }`}>
                {index + 1}
              </li>
            ))}
          <li
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(products.length / productsPerPage))
              )
            }
            className={`flex items-center justify-center shrink-0 px-[20px] h-12 rounded-md cursor-pointer text-base ${
              currentPage === Math.ceil(products.length / productsPerPage)
                ? "opacity-50 cursor-not-allowed"
                : "bg-[#FAF3EA] text-black hover:bg-[#B88E2F] hover:text-white"
            }`}>
            Next
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProductGrid;
