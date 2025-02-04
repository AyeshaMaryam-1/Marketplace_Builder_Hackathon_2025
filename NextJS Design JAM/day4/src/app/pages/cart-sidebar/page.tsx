"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { Product } from "../../../../types/product";
import {
  getCartItems,
  removeFromCart,
  updateCartQuantity,
} from "@/app/actions/actions";
import { urlFor } from "@/sanity/lib/image";

interface ShoppingCartProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ isOpen, setIsOpen }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Function to refresh cart from localStorage
  const refreshCart = () => {
    setCartItems(getCartItems());
  };

  // Load cart on sidebar open
  useEffect(() => {
    if (isOpen) {
      refreshCart();
    }
  }, [isOpen]);

  // Listen for cart updates across tabs/pages
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "cartItems") {
        refreshCart();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Remove item from cart
  const handleRemove = (id: string) => {
    Swal.fire({
      title: "Remove this item?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, remove it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(id);
        refreshCart(); // Update cart immediately
        localStorage.setItem("cartItemsUpdated", Date.now().toString()); // Notify other components
        Swal.fire("Removed!", "Item has been deleted.", "success");
      }
    });
  };

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.inventory,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-screen sm:h-[450px] w-full sm:w-80 bg-white shadow-lg rounded-lg p-6 transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-red-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={30}
            height={30}
            viewBox="0 0 16 16"
          >
            <g fill="#828282">
              <path
                fillRule="evenodd"
                d="M6.146 8.146a.5.5 0 0 1 .708 0L8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10L6.146 8.854a.5.5 0 0 1 0-.708"
              ></path>
              <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"></path>
            </g>
          </svg>
        </button>
      </div>

      {/* Cart Items Container with Scrollbar */}
      <div className="mt-4 space-y-6 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center space-x-4 border-b pb-4"
            >
              {item.productImage && (
                <Image
                  className="rounded-lg bg-gray-100"
                  src={urlFor(item.productImage).url()}
                  alt={"Product Image"}
                  width={40}
                  height={40}
                  style={{ objectFit: "cover" }}
                />
              )}
              <div className="flex-1">
                <h3 className="text-sm font-medium text-gray-800">
                  {item.title}
                </h3>
                <p className="text-sm">
                  {item.inventory} x
                  <span className="text-[#B88E2F] font-semibold ml-1">
                    $ {item.price.toLocaleString()}
                  </span>
                </p>
              </div>
              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item._id)}
                className="text-gray-500 hover:text-red-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M19.1 4.9C15.2 1 8.8 1 4.9 4.9S1 15.2 4.9 19.1s10.2 3.9 14.1 0s4-10.3.1-14.2m-4.3 11.3L12 13.4l-2.8 2.8l-1.4-1.4l2.8-2.8l-2.8-2.8l1.4-1.4l2.8 2.8l2.8-2.8l1.4 1.4l-2.8 2.8l2.8 2.8z"
                  />
                </svg>
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-600 text-center">Your cart is empty</p>
        )}
      </div>

      {/* Subtotal */}
      <div className="flex bottom-0 justify-between items-center mt-6">
        <h4 className="text-gray-600 font-medium">Subtotal</h4>
        <h4 className="text-[#B88E2F] font-bold text-lg">
          Rs. {subtotal.toLocaleString()}
        </h4>
      </div>
    </div>
  );
};

export default ShoppingCart;
