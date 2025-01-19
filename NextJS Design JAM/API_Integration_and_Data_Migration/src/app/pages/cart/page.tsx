"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Cart() {
  // Example cart data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Asgaard Sofa",
      price: 250000,
      quantity: 1,
      image: "/sofa1.png",
    },
  ]);

  // Function to update quantity and subtotal dynamically
  const handleQuantityChange = (id: number, newQuantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: newQuantity, subtotal: item.price * newQuantity }
          : item
      )
    );
  };

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="cart">
      <div className="banner-container flex flex-col items-center overflow-hidden">
        <Image
          className="banner overflow-hidden"
          src="/banner.png"
          alt="img"
          width={1440}
          height={316}
        />
        <div className="absolute mx-[620px] sm:mt-4 xl:mt-20">
          <Image className="mx-auto" 
            src="/logo.png"
            alt="img"
            width={50}
            height={32}/>
          <div className="justify-center items-center">
            <h1 className="text-[20px] md:text-[44px] text-center font-semibold">Cart</h1>
            <li className="flex ml-4"><p className="font-semibold">Home</p> 
              <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 12 24">
                  <path fill="black" fillRule="evenodd" d="M10.157 12.711L4.5 18.368l-1.414-1.414l4.95-4.95l-4.95-4.95L4.5 5.64l5.657 5.657a1 1 0 0 1 0 1.414"></path>
              </svg>Cart
            </li>
          </div>
        </div>
      </div>

      <div className="lg:ml-10 lg:flex">
      <div className="lg:ml-10 lg:flex">
  <div className="p-4 mt-6 sm:ml-4 lg:ml-16">
    {/* Wrapper for responsiveness */}
    <div className="overflow-hidden">
      <table className="hidden w-full border-collapse sm:table">
        <thead>
          <tr className="text-left bg-[#f8e9d8]">
            <th className="p-8 text-gray-800 font-semibold">Product</th>
            <th className="p-4 text-gray-800 font-semibold">Price</th>
            <th className="p-4 text-gray-800 font-semibold">Quantity</th>
            <th className="p-4 text-gray-800 font-semibold">Subtotal</th>
            <th className="p-4"></th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id}>
              <td className="p-4 mt-4 flex items-center space-x-4">
                <div className="w-16 h-16 bg-[#f8e9d8] flex items-center justify-center">
                  <Image
                    src={item.image}
                    alt="Product Image"
                    width={60}
                    height={60}
                  />
                </div>
                <span className="text-gray-800">{item.name}</span>
              </td>
              <td className="p-4 text-gray-600">Rs. {item.price.toLocaleString()}</td>
              <td className="p-4">
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  className="w-12 h-8 border border-gray-300 text-center"
                  onChange={(e) => handleQuantityChange(item.id, +e.target.value)}
                />
              </td>
              <td className="p-4 text-gray-800 font-semibold">
                Rs. {(item.price * item.quantity).toLocaleString()}
              </td>
              <td className="p-4">
                <button
                  className="text-yellow-500 hover:text-red-500"
                  onClick={() =>
                    setCartItems((prevItems) =>
                      prevItems.filter((cartItem) => cartItem.id !== item.id)
                    )
                  }
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
          ))}
        </tbody>
      </table>

      {/* Vertical layout for small screens */}
      <div className="sm:hidden">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="mb-4 p-4 border rounded-md shadow-sm bg-[#fdf4e3]"
          >
            <div className="flex items-center mb-4 space-x-4">
              <div className="w-16 h-16 bg-[#fff] flex items-center justify-center">
                <Image
                  src={item.image}
                  alt="Product Image"
                  width={60}
                  height={60}
                />
              </div>
              <div className="flex-1">
                <p className="text-gray-800 font-semibold">{item.name}</p>
              </div>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Price:</span>
              <span className="text-gray-800">Rs. {item.price.toLocaleString()}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Quantity:</span>
              <input
                type="number"
                value={item.quantity}
                min="1"
                className="w-16 h-8 border border-gray-300 text-center"
                onChange={(e) => handleQuantityChange(item.id, +e.target.value)}
              />
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="text-gray-800 font-semibold">
                Rs. {(item.price * item.quantity).toLocaleString()}
              </span>
            </div>
            <div className="text-right">
              <button
                className="text-yellow-500 hover:text-red-500"
                onClick={() =>
                  setCartItems((prevItems) =>
                    prevItems.filter((cartItem) => cartItem.id !== item.id)
                  )
                }
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
        ))}
      </div>
    </div>
  </div>
</div>

        <div className="bg-[#fdf4e3] p-6 mt-10 lg:mr-20 w-80 sm:mx-40">
          <h2 className="text-xl font-bold text-gray-800 text-center pt-4 mb-12">
            Cart Totals
          </h2>
          <div className="flex justify-between items-center mb-4">
            <span className="text-black font-semibold pb-4">Subtotal</span>
            <span className="text-md text-gray-500">
              Rs. {subtotal.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="text-black font-semibold pb-4">Total</span>
            <span className="text-md text-gray-500">
              Rs. { subtotal.toLocaleString()}
            </span>
          </div>
          <Link href={"/pages/checkout"}>
            <button className="w-40 ml-12 center py-2 border border-gray-500 text-gray-800 rounded-lg hover:bg-[#B88E2F] hover:text-white hover:border-none">
              Check Out
            </button>
          </Link>
        </div>
      </div>
      <div className="max-w-[1348px] md:h-[270px] bg-[#FAF3EA] mt-8"> 
        <ul className="flex flex-col grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-screen-xl px-16 py-28">
          <li className="ml-6 lg:ml-10 flex">
            <Image className="logo mt-1" 
              src="/g1.png"
              alt="img"
              width={60}
              height={60}/>
            <div>
              <h2 className="text-[20px] ml-8 font-semibold text-[#242424]">High Quality</h2>
              <h3 className="ml-8 w-[580px] text-[#9F9F9F]">crafted from top materials</h3>
            </div>
          </li>
          <li className="ml-6 lg:ml-14 flex">
            <Image className="logo mt-1" 
              src="/g2.png"
              alt="img"
              width={60}
              height={60}/>
            <div>
              <h2 className="text-[20px] ml-8 font-semibold text-[#242424]">Warranty Protection</h2>
              <h3 className="ml-8 w-[580px] text-[#9F9F9F]">Over 2 years</h3>
            </div>
          </li>
          <li className="ml-6 lg:ml-20 flex">
            <Image className="logo mt-1" 
              src="/g3.png"
              alt="img"
              width={60}
              height={60}/>
            <div>
              <h2 className="text-[20px] ml-8 font-semibold text-[#242424]">Free Shipping</h2>
              <h3 className="ml-8 w-[480px] text-[#9F9F9F]">Order over 150 $</h3>
            </div>
          </li>
          <li className="ml-6 lg:ml-10 flex">
            <Image className="logo mt-1" 
              src="/g4.png"
              alt="img"
              width={60}
              height={60}/>
            <div>
              <h2 className="text-[20px] ml-8 font-semibold text-[#242424]">24 / 7 Support</h2>
              <h3 className="text-[#9F9F9F] ml-8">Dedicated support</h3>
            </div>
          </li>  
        </ul>
      </div>
    </div>
  );
}