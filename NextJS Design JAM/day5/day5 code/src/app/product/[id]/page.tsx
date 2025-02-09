"use client"

import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import ProductGrid from "@/app/components/ProductGrid";
import Link from "next/link";
import Swal from "sweetalert2";
import { addToCart } from "@/app/actions/actions";
import { Product } from "../../../../types/product";

interface ProductPageProps {
  params: { id: string };
}

const getProduct = async (id: string) => {
  const query = groq`*[_type == "product" && _id == $id][0]{
    _id,
    title,
    description,
    price,
    productImage
  }`;
  return await client.fetch(query, { id });
};

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
  
// eslint-disable-next-line @next/next/no-async-client-component
export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="font-sans">
      <section className="flex items-center justify-between bg-[#f8f1e9] p-4 rounded-md shadow-sm">
        <div className="flex items-center lg:pl-24">
          <div className="flex items-center font-semibold text-black">
            <li className="flex">
              <p className="font-semibold text-[#898989]">Home &nbsp;</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 12 24"
              >
                <path
                  fill="black"
                  fillRule="evenodd"
                  d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414"
                ></path>
              </svg>
              <p className="text-[#898989]">&nbsp; Shop &nbsp;</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 12 24"
              >
                <path
                  fill="black"
                  fillRule="evenodd"
                  d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414"
                ></path>
              </svg>
            </li>
          </div>
          <div className="text-black ml-4 pl-4 font-semibold border-[#898989] border-l">
            {product.title}
          </div>
        </div>
      </section>

      <div className="flex flex-col lg:flex-row mt-10 gap-8 px-6">
        <div className="gap-2 ml-20 mt-4">
          {product.productImage && (
            <Image
              src={urlFor(product.productImage).url()}
              alt={product.title}
              priority
              width={450}
              height={500}
              className="w-[285px] h-[301px] object-cover"
            />
          )}
        </div>
        <div className="flex-1 mt-4 ml-4">
          <h1 className="text-2xl font-bold pb-4 text-gray-800">
            {product.title}
          </h1>
          <span className="text-lg font-semibold tracking-wide text-gray-500">
            ${product.price}
          </span>
          <div>
            <ul className="flex space-x-5 pt-4 font-[sans-serif]">
              <li className="flex items-center justify-center shrink-0 bg-[#FAF3EA] hover:bg-[#B88E2F] hover:text-white cursor-pointer text-base text-black p-[20px] h-12 rounded-md">
                L
              </li>
              <li className="flex items-center justify-center shrink-0 bg-[#FAF3EA] hover:bg-[#B88E2F] hover:text-white cursor-pointer text-base text-black px-[16px] h-12 rounded-md">
                XL
              </li>
              <li className="flex items-center justify-center shrink-0 bg-[#FAF3EA] hover:bg-[#B88E2F] hover:text-white  cursor-pointer text-base text-black px-[16px] h-12 rounded-md">
                XS
              </li>
            </ul>
          </div>
          <div className="mt-6">
            <span className="block font-medium text-gray-800 mb-2">
              Colors:
            </span>
            <div className="flex gap-2">
              {["#4A90E2", "#1C1C1C", "#B88E2F"].map((color) => (
                <div
                  key={color}
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
            <div className="mt-6 flex">
              <div>
                <div className="flex gap-2 items-center border border-gray-300 rounded-md bg-white px-3 py-2.5 w-max">
                  <button type="button" className="border-none outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-2.5 h-2.5"
                      viewBox="0 0 121.805 121.804"
                    >
                      <path
                        d="M7.308 68.211h107.188a7.309 7.309 0 0 0 7.309-7.31 7.308 7.308 0 0 0-7.309-7.309H7.308a7.31 7.31 0 0 0 0 14.619z"
                        data-original="#000000"
                      />
                    </svg>
                  </button>
                  <span className="text-gray-800 text-sm font-semibold px-3">
                    1
                  </span>
                  <button type="button" className="border-none outline-none">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-2.5 h-2.5"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M256 509.892c-19.058 0-34.5-15.442-34.5-34.5V36.608c0-19.058 15.442-34.5 34.5-34.5s34.5 15.442 34.5 34.5v438.784c0 19.058-15.442 34.5-34.5 34.5z"
                        data-original="#000000"
                      />
                      <path
                        d="M475.392 290.5H36.608c-19.058 0-34.5-15.442-34.5-34.5s15.442-34.5 34.5-34.5h438.784c19.058 0 34.5 15.442 34.5 34.5s-15.442 34.5-34.5 34.5z"
                        data-original="#000000"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <Link href={"/pages/cart"}>
                <button className="w-40 ml-4 py-2 border border-black text-gray-800 rounded-lg shadow-lg hover:bg-gray-100" onClick={(e) => handleAddToCart(e, product)}>
                  <p className="font-bold">Add To Cart</p>
                </button>
              </Link>
              <button className="px-4 py-2 border border-black text-gray-800  rounded-lg shadow-lg ml-4 hover:bg-gray-100">
                <p className="font-bold">+ Compare</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="px-24">
        <h1 className="text-[22px] md:text-[30px]  py-12 font-semibold">
            Description
        </h1>
        <h3 className="text-sm text-gray-800 text-justify">
            {product.description}
        </h3>
      </div>
      <div className="text-center mt-10 mx-auto text-[#333333]">
        <h1 className="text-[28px]">
          <strong>Related Products</strong>
        </h1>
      </div>

      <ProductGrid limit={4} />

        <div className="text-center mx-auto my-10">
            <button className="px-16 py-2 bg-white border border-[#B88E2F] text-[#B88E2F] hover:bg-yellow-700 hover:text-white">
              <Link href={"/pages/shop"}>Show More</Link>
            </button>
        </div>
    </div>
  );
}
