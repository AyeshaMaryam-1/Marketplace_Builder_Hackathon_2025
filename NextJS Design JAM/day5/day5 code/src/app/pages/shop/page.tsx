"use client"

import Image from "next/image";
import React, { useState } from "react";
import Services from "@/app/components/services";
import ProductGrid from "@/app/components/ProductGrid";

export default function Shop() {
  const [sortOption, setSortOption] = useState("default");

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center overflow-hidden">
        <Image
          className="banner w-full max-w-full overflow-hidden"
          src="/banner.webp"
          alt="img"
          priority
          width={1440}
          height={316}
        />
        <div className=" absolute sm:mx-[200px] md:mx-[340px] lg:mx-[480px] xl:mx-[620px]">
          <Image
            className="mx-auto"
            src="/logo.webp"
            alt="img"
            priority
            width={50}
            height={32}
          />
          <h1 className="text-[20px] sm:text-[32px] md:text-[44px] text-center font-semibold">
            Shop
          </h1>
          <li className="flex ">
            <p className="font-semibold">Home</p>
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
            Shop
          </li>
        </div>
      </div>

      <div className="lg:flex items-center justify-between bg-[#f8f1e9] p-4 rounded-md shadow-sm">
        {/* Filter and View Options */}
        <div className="flex items-center sm:pl-14 xl:pl-24">
          <div className="flex items-center font-semibold text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={21}
              height={21}
              viewBox="0 0 21 21"
            >
              <path
                fill="none"
                stroke="black"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.5 4a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1m12 2h-11m-2 0h-3m4 8a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1m12 2h-11m-2 0h-3m12-7a1 1 0 0 1 1 1v2a1 1 0 0 1-2 0v-2a1 1 0 0 1 1-1m-1 2h-11m16 0h-3"
              ></path>
            </svg>
            <span className="pl-2">Filter</span>
          </div>
          <div className="flex space-x-2">
            <div className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M7 11a4 4 0 1 0 0-8a4 4 0 0 0 0 8m10 0a4 4 0 1 0 0-8a4 4 0 0 0 0 8m-6 6a4 4 0 1 1-8 0a4 4 0 0 1 8 0m6 4a4 4 0 1 0 0-8a4 4 0 0 0 0 8"
                ></path>
              </svg>
            </div>
            <div className="p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 16 16"
              >
                <path
                  fill="currentColor"
                  d="M3 4.5h10a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2m0 1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zM1 2a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 2m0 12a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 14"
                ></path>
              </svg>
            </div>
          </div>
          <div className="text-black ml-4 pl-4 border-[#898989] border-l">
            Showing 1-8 of 24 results
          </div>
        </div>

        {/* Show and Sort Options */}
        <div className="flex sm:ml-14 lg:ml-0 items-center space-x-4 lg:mr-20 gap-6">
          <div className="flex items-center">
            <span className="text-black mr-2">Show</span>
            <input
              type="number"
              defaultValue="16"
              className="w-12 p-1 text-center text-[#898989] focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
          <div className="flex items-center">
            <span className="text-black mr-2">Sort by</span>
            <select className="p-1 text-[#898989] focus:outline-none focus:ring-2 focus:ring-gray-400" 
            value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="default">Default</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      </div>

      <div>
        <ProductGrid enablePagination={true} sortOption={sortOption} />
      </div>
      <Services />
    </div>
  );
}
