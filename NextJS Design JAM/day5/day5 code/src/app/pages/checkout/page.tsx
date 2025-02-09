"use client";
import Services from "@/app/components/services";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Product } from "../../../../types/product";
import { getCartItems } from "@/app/actions/actions";
import { client } from "@/sanity/lib/client";
import Swal from "sweetalert2";

const Checkout = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [discount, setDiscount] = useState<number>(0);
  const [formValues, setformValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    company: "",
    zipCode: "",
    city: "",
    country: "",
    province: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    address: false,
    company: false,
    zipCode: false,
    city: false,
    country: false,
    province: false,
  });

  useEffect(() => {
    setCartItems(getCartItems());
    const appliedDiscount = localStorage.getItem("appliedDiscount");
    if (appliedDiscount) {
      setDiscount(Number(appliedDiscount));
    }
  }, []);

  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.inventory,
    0
  );
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformValues({
      ...formValues,
      [e.target.name]: e.target.value, 
    });
  };
  

  const validateForm = () => {
    const errors = {
      firstName: !formValues.firstName,
      lastName: !formValues.lastName,
      email: !formValues.email,
      phone: !formValues.phone,
      address: !formValues.address,
      company: !formValues.company,
      zipCode: !formValues.zipCode,
      city: !formValues.city,
      province: !formValues.province,
      country: !formValues.country,
    };
    setFormErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handlePlaceOrder = async () => {

    Swal.fire({
      title: "Processing your order...",
      text: "Please wait",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Proceed",
    }).then((result) => {
      if(result.isConfirmed){
        if (validateForm()) {
          localStorage.removeItem("appliedDiscount");
          Swal.fire(
            "Success",
            "Your order has been successfully processed!",
            "success"
          );
        } else {
          Swal.fire("Error!", "Please fill in all the required fields", "error");
        }
      }
    });

    const orderData = {
      _type: 'order',
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: formValues.email,
      phone: formValues.phone,
      address: formValues.address,
      company: formValues.company,
      zipCode: formValues.zipCode,
      city: formValues.city,
      province: formValues.province,
      country: formValues.country,
      cartItems: cartItems.map(item => ({
        _type: 'reference',
        _ref: item._id
      })),
      total: subTotal,  
      discount: discount, 
      orderDate: new Date().toISOString
    };

    try{
      await client.create(orderData);
      localStorage.removeItem("appliedDiscount");
    }
    catch (error) {
      console.error("Failed to create order", error);
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row items-center overflow-hidden">
        <Image
          className="banner relative flex flex-col -z-10 "
          src="/banner.webp"
          alt="img"
          priority
          width={1440}
          height={316}
        />
        <div className="absolute sm:mx-[200px] md:mx-[340px] lg:mx-[480px] xl:mx-[620px]">
          <Image
            className="mx-auto"
            src="/logo.webp"
            alt="img"
            priority
            width={50}
            height={32}
          />
          <h1 className="text-[20px] sm:text-[32px] md:text-[44px] text-center font-semibold">
            Checkout
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
            Checkout
          </li>
        </div>
      </div>
      {/* checkout form */}
      <div className="lg:flex my-16 mx-10 lg:mx-40 gap-40">
        <section>
          <h1 className="text-[28px] text-black mb-10">
            <strong>Billing details</strong>
          </h1>
          <div className="flex gap-8">
            <div>
              <label htmlFor="firstName" className="text-gray-800 text-sm">First Name</label>
              <br />
              <input
                type="text"
                name="firstName"
                className="w-[120px] rounded-md border py-3 px-4 mt-3 text-gray-800 text-sm outline-[#a91079]"
                value={formValues.firstName}
                onChange={handleInputChange}
              />
              {formErrors.firstName && (
                <p className="text-red-600 text-sm">First Name is required</p>
              )}
              <br />
            </div>
            <div>
              <label htmlFor="lastName" className="text-gray-800 text-sm">Last Name</label>
              <br />
              <input
                type="text"
                name="lastName"
                className="w-[120px] rounded-md border py-3 px-4 mt-3 text-gray-800 text-sm outline-[#a91079]"
                value={formValues.lastName}
                onChange={handleInputChange}
              />
              {formErrors.lastName && (
                <p className="text-red-600 text-sm">Last Name is required</p>
              )}
              <br />
            </div>
          </div>
          <div className="mt-6">
            <label htmlFor="company" className="text-gray-800 text-sm">
              Company Name (Optional)
            </label>
            <input
              type="text"
                name="company"
              className="w-full rounded-md border py-3 px-4 mt-3 text-gray-800 text-sm "
              value={formValues.company}
              onChange={handleInputChange}
            />
            <br />
            <br />
            <label htmlFor="country" className="text-gray-800 text-sm">Contry / Region</label>
            <input
              type="text"
                name="country"
              className="w-full rounded-md border py-3 px-4 mt-3 text-gray-800 text-sm "
              value={formValues.country}
              onChange={handleInputChange}
            />
            {formErrors.country && (
              <p className="text-red-600 text-sm">Country name is required</p>
            )}
            <br />
            <br />
            <label htmlFor="address" className="text-gray-800 text-sm">Street Address</label>
            <input
              type="text"
                name="address"
              className="w-full rounded-md border py-3 px-4 mt-3 text-gray-800 text-sm "
              value={formValues.address}
              onChange={handleInputChange}
            />
            {formErrors.address && (
              <p className="text-red-600 text-sm">Address is required</p>
            )}
            <br />
            <br />
            <label htmlFor="city" className="text-gray-800 text-sm">Town / City</label>
            <input
              type="text"
                name="city"
              className="w-full rounded-md border py-3 px-4 mt-3 text-gray-800 text-sm "
              value={formValues.city}
              onChange={handleInputChange}
            />
            {formErrors.city && (
              <p className="text-red-600 text-sm">City name is required</p>
            )}
            <br />
            <br />
            <label htmlFor="province" className="text-gray-800 text-sm">Province</label>
            <input
              type="text"
                name="province"
              placeholder="This is an optional"
              className="w-full rounded-md border py-3 px-4 mt-3 text-gray-800 text-sm "
              value={formValues.province}
              onChange={handleInputChange}
            />
            {formErrors.province && (
              <p className="text-red-600 text-sm">Province is required</p>
            )}
            <br />
            <br />
            <label htmlFor="zipCode" className="text-gray-800 text-sm">ZIP code</label>
            <input
              type="text"
                name="zipCode"
              className="w-full rounded-md border py-3 px-4 mt-3 text-gray-800 text-sm "
              value={formValues.zipCode}
              onChange={handleInputChange}
            />
            {formErrors.zipCode && (
              <p className="text-red-600 text-sm">Zip Code is required</p>
            )}
            <br />
            <br />
            <label htmlFor="phone" className="text-gray-800 text-sm">Phone</label>
            <input
              type="tel"
                name="phone"
              className="w-full rounded-md border py-3 px-4 mt-3 text-gray-800 text-sm "
              value={formValues.phone}
              onChange={handleInputChange}
            />
            {formErrors.phone && (
              <p className="text-red-600 text-sm">Phone number is required</p>
            )}
            <br />
            <br />
            <label htmlFor="email" className="text-gray-800 text-sm">Email address</label>
            <input
              type="email"
                name="email"
              className="w-full rounded-md border py-3 px-4 mt-3 text-gray-800 text-sm "
              value={formValues.email}
              onChange={handleInputChange}
            />
            {formErrors.email && (
              <p className="text-red-600 text-sm">Email is required</p>
            )}
            <br />
            <br />
            <input
              type="text"
              placeholder="Additional Information"
              className="w-full rounded-md border py-3 px-4 mt-4 text-gray-800 text-sm"
            />
            <br />
            <br />
          </div>
        </section>
        <div className="w-[460px]">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-32 mt-20 pb-6 border-b border-[#9F9F9F]">
              <div>
                <ul>
                  <li>
                    <h1 className="text-[24px] my-2 font-semibold">Product</h1>
                  </li>

                  {/* ✅ Loop through cart items */}
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <li
                        key={item._id}
                        className="text-[#9F9F9F] my-4 flex items-center"
                      >
                        {/* ✅ Product Title and Quantity */}
                        <div className="">
                          <p className="text-[#9F9F9F]">{item.title}</p>
                          {/* <p className="text-black">x {item.inventory}</p> */}
                        </div>

                        {/* ✅ Product Subtotal */}
                        <p className="ml-auto text-black">x {item.inventory}</p>
                      </li>
                    ))
                  ) : (
                    <li className="text-[#9F9F9F] my-4">No item in cart</li>
                  )}
                  <li className="font-semibold text-md">Subtotal</li>
                  <li className="font-semibold text-md">Discount</li>
                  <li className="font-semibold text-xl">Total</li>
                </ul>
              </div>

              {/* ✅ Each item also contributes to subtotal */}
              <div>
                <div className="ml-10 text-right">
                  <p className="text-[24px] my-2 font-semibold">Subtotal</p>

                  {/* ✅ Show subtotal for each item */}
                  {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                      <p key={item._id} className="my-4">
                        ${item.price * item.inventory}
                      </p>
                    ))
                  ) : (
                    <p className="my-4">Rs. 0</p>
                  )}

                  {/* ✅ Calculate overall subtotal manually */}
                  <p className="mt-1 my-2 font-bold text-md text-black">
                    $ {subTotal}
                  </p>
                  <p className="mt-1 my-2 font-bold text-md text-black">
                    $ {discount}
                  </p>
                  <p className="mt-1 my-2 font-bold text-xl text-[#B88E2F]">
                    $ {subTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <ul className="list-disc">
              <li>
                <h1 className="text-[24px] my-3 font-semibold">
                  Direct Bank Transfer
                </h1>
              </li>
            </ul>
            <p className="text-[#9F9F9F] text-justify">
              Make your payment directly into our bank account. Please use your
              Order ID as the payment reference. Your order will not be shipped
              until the funds have cleared in our account.
            </p>
            <ul className="list-disc text-[#9F9F9F] my-3">
              <li className="mb-3">Direct Bank Transfer</li>
              <li>Cash On Delivery</li>
            </ul>
            <p className="text-justify">
              Your personal data will be used to support your experience
              throughout this website, to manage access to your account, and for
              other purposes described in our <b>privacy policy.</b>
            </p>

            <button
              type="button"
              className="mx-auto text-black border border-black hover:bg-[#B88E2F] hover:text-white  hover:border-none tracking-wide rounded-lg text-sm px-4 py-3 flex items-center justify-center w-48 mt-10"
              onClick={handlePlaceOrder}
            >
              Place order
            </button>
          </div>
        </div>
      </div>
      <Services />
    </div>
  );
};
export default Checkout;
