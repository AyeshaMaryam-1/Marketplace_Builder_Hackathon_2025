"use client";

import Services from "@/app/components/services";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Product } from "../../../../types/product";
import {
  getCartItems,
  removeFromCart,
  updateCartQuantity,
} from "@/app/actions/actions";
import Swal from "sweetalert2";
import { urlFor } from "@/sanity/lib/image";
import { useRouter } from "next/navigation";

export default function Cart() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  const handleRemove = (id?: string) => {
    if (!id) return; // Ensure the ID is defined

    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        setCartItems(getCartItems());
        Swal.fire("Removed!", "Item has been removed.", "success");
      }
    });
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    // if (!id || quantity < 1) return; // Ensure valid ID and quantity

    updateCartQuantity(id, quantity); // Update localStorage cart
    // const updatedCart = JSON.parse(localStorage.getItem("cart") || "[]"); // Fetch updated cart
    setCartItems(getCartItems()); // Update state
  };

  const handleIncrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product) handleQuantityChange(id, product.inventory + 1);
  };

  const handleDecrement = (id: string) => {
    const product = cartItems.find((item) => item._id === id);
    if (product && product.inventory > 1)
      handleQuantityChange(id, product.inventory - 1);
  };

  const calculatedTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.inventory,
      0
    );
  };

  const router = useRouter();

  const handleProceed = () => {
    Swal.fire({
      title: "Proceed to Checkout?",
      text: "Please review your cart before checkout",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Success",
          "Your order has been successfully proceed",
          "success"
        );
        router.push("/pages/checkout");
        setCartItems([]);
      }
    });
  };

  return (
    <div className="cart">
      <div className="banner-container flex flex-col items-center overflow-hidden">
        <Image
          className="banner overflow-hidden"
          src="/banner.webp"
          alt="img"
          priority
          width={1440}
          height={316}
        />
        <div className="absolute mx-[620px] sm:mt-4 xl:mt-20">
          <Image
            className="mx-auto"
            src="/logo.png"
            alt="img"
            priority
            width={50}
            height={32}
          />
          <div className="justify-center items-center">
            <h1 className="text-[20px] md:text-[44px] text-center font-semibold">
              Cart
            </h1>
            <li className="flex ml-4">
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
              Cart
            </li>
          </div>
        </div>
      </div>

      <div className="lg:ml-10 lg:flex">
        <div className="p-4 mt-6 sm:ml-4 lg:ml-16">
          <div className="overflow-x-auto">
            {/* Table for larger screens (sm and up) */}
            <table className="hidden w-full border-collapse sm:table">
              <thead>
                <tr className="text-left bg-[#f8e9d8]">
                  <th className="p-4 text-gray-800 font-semibold">Product</th>
                  <th className="p-4 text-gray-800 font-semibold">Price</th>
                  <th className="p-4 text-gray-800 font-semibold">Quantity</th>
                  <th className="p-4 text-gray-800 font-semibold">Subtotal</th>
                  <th className="p-4"></th>
                </tr>
              </thead>
              <tbody>
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <tr key={item._id} className="border-b">
                      <td className="p-4 flex items-center space-x-4">
                        <div className="w-12 h-12 bg-[#f8e9d8] flex items-center justify-center rounded">
                          {item.productImage && (
                            <Image
                              src={urlFor(item.productImage).url()}
                              alt="Product Image"
                              width={50}
                              height={50}
                              className="rounded"
                            />
                          )}
                        </div>
                        <span className="text-gray-800">{item.title}</span>
                      </td>
                      <td className="p-4 text-gray-600">${item.price}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleDecrement(item._id)}
                            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded bg-gray-100 text-gray-700 hover:bg-red-200 hover:border-red-400"
                          >
                            −
                          </button>
                          <span className="w-8 text-center text-gray-800 font-semibold">
                            {item.inventory}
                          </span>
                          <button
                            onClick={() => handleIncrement(item._id)}
                            className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded bg-gray-100 text-gray-700 hover:bg-green-200 hover:border-green-400"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="p-4 text-gray-800">
                        ${(item.price * item.inventory).toLocaleString()}
                      </td>
                      <td className="p-4">
                        <button
                          className="text-yellow-500 hover:text-red-500"
                          onClick={() => handleRemove(item._id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={24}
                            height={24}
                            viewBox="0 0 1024 1024"
                          >
                            <path
                              fill="currentColor"
                              d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32m-200 0H360v-72h304z"
                            ></path>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-gray-600 p-4">
                      Your cart is empty
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Mobile View (Stacked Cards) */}
            <div className="sm:hidden">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white shadow-md rounded-lg p-4 mb-4 border border-gray-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-[#f8e9d8] flex items-center justify-center rounded">
                        {item.productImage && (
                          <Image
                            src={urlFor(item.productImage).url()}
                            alt="Product Image"
                            width={60}
                            height={60}
                            className="rounded"
                          />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-lg font-semibold text-gray-800">
                          {item.title}
                        </p>
                        <p className="text-gray-600">Price: ${item.price}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleDecrement(item._id)}
                          className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded bg-gray-100 text-gray-700 hover:bg-red-200 hover:border-red-400"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-gray-800 font-semibold">
                          {item.inventory}
                        </span>
                        <button
                          onClick={() => handleIncrement(item._id)}
                          className="w-7 h-7 flex items-center justify-center border border-gray-300 rounded bg-gray-100 text-gray-700 hover:bg-green-200 hover:border-green-400"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-lg font-semibold text-gray-800">
                        ${item.price * item.inventory}
                      </div>

                      <button
                        className="text-yellow-500 hover:text-red-500"
                        onClick={() => handleRemove(item._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 1024 1024"
                        >
                          <path
                            fill="currentColor"
                            d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32m-200 0H360v-72h304z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 p-4">
                  Your cart is empty
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-[#fdf4e3] p-6 mt-10 lg:mr-20 w-80 h-[400px] mx-6 sm:mx-40">
          <h2 className="text-xl font-bold text-gray-800 text-center pt-4 mb-12">
            Cart Totals
          </h2>
          <div className="flex justify-between items-center mb-4">
            <span className="text-black font-semibold pb-4">Subtotal</span>
            <span className="text-md text-gray-500">
              $ {calculatedTotal().toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-black font-semibold pb-4">Total</span>
            <span className="text-md text-gray-500">
              $ {calculatedTotal().toFixed(2)}
            </span>
          </div>
          <div className="pt-16">
            <button
              className="w-40 ml-12 center py-2 border border-gray-500 text-gray-800 rounded-lg hover:bg-[#B88E2F] hover:text-white hover:border-none"
              onClick={handleProceed}
            >
              Check Out
            </button>
          </div>
        </div>
      </div>
      <Services />
    </div>
  );
}
