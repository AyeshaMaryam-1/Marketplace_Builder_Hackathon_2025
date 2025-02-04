import Metadata from "@/app/components/metadata";
import Services from "@/app/components/services";
import Image from "next/image";

export default function Blog() {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center overflow-hidden">
        <Image
          className="banner"
          src="/banner.png"
          alt="img"
          width={1440}
          height={316}
        />
        <div className="absolute sm:mx-[200px] md:mx-[340px] lg:mx-[480px] xl:mx-[620px]">
          <Image
            className="mx-auto"
            src="/logo.png"
            alt="img"
            width={50}
            height={32}
          />
          <h1 className="text-[20px] sm:text-[32px] md:text-[44px] text-center font-semibold">
            Blog
          </h1>
          <li className="flex ml-2 ">
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
            Blog
          </li>
        </div>
      </div>

      <div className="lg:flex m-20">
        <div>
          <Image
            className="banner"
            src="/blog1.png"
            alt="img"
            width={817}
            height={500}
          />
          <Metadata/>
        </div>

        <div className="sm:ml-10 lg:ml-16 sm:mt-8 lg:mt-0">
          <div className="flex max-lg:w-full">
            <div className="flex xl:w-80 max-xl:w-full px-4 py-3 rounded-xl outline outline-transparent border focus-within:border-blue-600 focus-within:bg-transparent transition-all">
              <input
                type="text"
                placeholder=""
                className="w-full text-sm bg-transparent rounded outline-none pr-2"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="black"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"
                ></path>
              </svg>
            </div>
          </div>
          {/* Categories */}
          <h1 className="text-[26px] pl-10 py-6 font-semibold">Categories</h1>
          <div className="flex">
            <div>
              <ul className="pl-10">
                <li className=" text-[#9F9F9F] pt-5">Crafts</li>
                <br />
                <li className=" text-[#9F9F9F] pt-5">Design</li>
                <br />
                <li className=" text-[#9F9F9F] pt-5">Handmade</li>
                <br />
                <li className=" text-[#9F9F9F] pt-5">Interior</li>
                <br />
                <li className=" text-[#9F9F9F] pt-5">Wood</li>
                <br />
              </ul>
            </div>
            <div>
              <ul className="text-[#9F9F9F] pl-32">
                <li className="pt-5">2</li>
                <li className="pt-11">8</li>
                <li className="pt-11">7</li>
                <li className="pt-11">1</li>
                <li className="pt-11">6</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* content */}
      <div className="xl:flex">
        <div className="mx-20">
          <h1 className="text-[30px] py-4 font-semibold">
            Going all-in with millennial design
          </h1>
          <p className="sm:w-[620px] md:w-[748px] lg:w-[817px] text-[#9F9F9F] text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus
            mauris vitae ultricies leo integer malesuada nunc. In nulla posuere
            sollicitudin aliquam ultrices. Morbi blandit cursus risus at
            ultrices mi tempus imperdiet. Libero enim sed faucibus turpis in.
            Cursus mattis molestie a iaculis at erat. Nibh cras pulvinar mattis
            nunc sed blandit libero. Pellentesque elit ullamcorper dignissim
            cras tincidunt. Pharetra et ultrices neque ornare aenean euismod
            elementum.
          </p>
          <button className="mt-10 font-semibold border-b border-black tracking-wider pb-2">
            Read more
          </button>
          <Image
            className="mt-14"
            src="/blog2.png"
            alt="img"
            width={817}
            height={500}
          />
          <Metadata/>
        </div>

        <div className="ml-20 md:ml-10 lg:ml-20 w-[260px]">
          <h1 className="text-[26px]  pt-8 font-semibold">Recent Posts</h1>
          <ul className="">
            <li className="flex">
              <Image
                className="mt-8"
                src="/post1.png"
                alt="img"
                width={80}
                height={80}
              />
              <div className="pl-4 pt-8">
                <h2 className="font-semibold tracking-wider">
                  Going all-in with millennial design
                </h2>
                <h3 className="text-[#9F9F9F] text-[14px]">03 Aug 2022</h3>
              </div>
            </li>
            <li className="flex">
              <Image
                className="mt-8"
                src="/post2.png"
                alt="img"
                width={80}
                height={80}
              />
              <div className="pl-4 pt-8">
                <h2 className="font-semibold tracking-wider">
                  Exploring new ways of decorating
                </h2>
                <h3 className="text-[#9F9F9F] text-[14px]">03 Aug 2022</h3>
              </div>
            </li>
            <li className="flex">
              <Image
                className="mt-8"
                src="/post3.png"
                alt="img"
                width={80}
                height={80}
              />
              <div className="pl-4 pt-8">
                <h2 className="font-semibold tracking-wider">
                  Handmade pieces that took time to make
                </h2>
                <h3 className="text-[#9F9F9F] text-[14px]">03 Aug 2022</h3>
              </div>
            </li>
            <li className="flex">
              <Image
                className="mt-8"
                src="/post4.png"
                alt="img"
                width={80}
                height={80}
              />
              <div className="pl-4 pt-8">
                <h2 className="font-semibold tracking-wider">
                  Modern home in Milan
                </h2>
                <h3 className="text-[#9F9F9F] text-[14px]">03 Aug 2022</h3>
              </div>
            </li>
            <li className="flex">
              <Image
                className="mt-8"
                src="/post5.png"
                alt="img"
                width={80}
                height={80}
              />
              <div className="pl-4 pt-8">
                <h2 className="font-semibold tracking-wider">
                  Colorful office redesign
                </h2>
                <h3 className="text-[#9F9F9F] text-[14px]">03 Aug 2022</h3>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-20">
        <h1 className="text-[30px] py-6 font-semibold">
          Exploring new ways of decorating
        </h1>
        <p className="sm:w-[620px] md:w-[748px] lg:w-[817px] text-[#9F9F9F] text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris
          vitae ultricies leo integer malesuada nunc. In nulla posuere
          sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices
          mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis
          molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit
          libero. Pellentesque elit ullamcorper dignissim cras tincidunt.
          Pharetra et ultrices neque ornare aenean euismod elementum.
        </p>
        <button className="mt-10 font-semibold border-b border-black tracking-wider pb-2">
          Read more
        </button>
        <Image
          className="mt-14"
          src="/blog3.png"
          alt="img"
          width={817}
          height={500}
        />
        <Metadata/>
      </div>

      <div className="mx-20">
        <h1 className="text-[30px] py-6 font-semibold">
          Handmade pieces that took time to make
        </h1>
        <p className="sm:w-[620px] md:w-[748px] lg:w-[817px] text-[#9F9F9F] text-justify">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris
          vitae ultricies leo integer malesuada nunc. In nulla posuere
          sollicitudin aliquam ultrices. Morbi blandit cursus risus at ultrices
          mi tempus imperdiet. Libero enim sed faucibus turpis in. Cursus mattis
          molestie a iaculis at erat. Nibh cras pulvinar mattis nunc sed blandit
          libero. Pellentesque elit ullamcorper dignissim cras tincidunt.
          Pharetra et ultrices neque ornare aenean euismod elementum.
        </p>
        <button className="mt-10 font-semibold border-b border-black tracking-wider pb-2">
          Read more
        </button>
      </div>
      <ul className="flex space-x-5 pt-8 justify-center font-[sans-serif]">
        <li className="flex items-center justify-center shrink-0 bg-[#FAF3EA] hover:bg-[#B88E2F] hover:text-white cursor-pointer text-base text-black p-[20px] h-12 rounded-md">
          1
        </li>
        <li className="flex items-center justify-center shrink-0 bg-[#FAF3EA] hover:bg-[#B88E2F] hover:text-white cursor-pointer text-base text-black px-[20px] h-12 rounded-md">
          2
        </li>
        <li className="flex items-center justify-center shrink-0 bg-[#FAF3EA] hover:bg-[#B88E2F] hover:text-white  cursor-pointer text-base text-black px-[20px] h-12 rounded-md">
          3
        </li>
        <li className="flex items-center justify-center shrink-0 bg-[#FAF3EA] hover:bg-[#B88E2F] hover:text-white  cursor-pointer text-base text-black px-[20px] h-12 rounded-md">
          Next
        </li>
      </ul>
      <Services />
    </div>
  );
}
