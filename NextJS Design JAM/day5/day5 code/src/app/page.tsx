import Image from "next/image";
import Link from "next/link";
// import ProductGrid from "@/app/components/ProductGrid";
import dynamic from "next/dynamic";

export default async function Home() {
  const ProductGrid = dynamic(() => import("@/app/components/ProductGrid"), { ssr: false });

  return (
    <div>
      <div className="flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center bg-white shadow-lg overflow-hidden">
          <Image
            className="w-full h-auto"
            src="/img1.webp"
            alt="img"
            priority
            width={1440}
            height={716.83}
          />
          <div className="main absolute mt-14 sm:mt-8 right-14 xl:w-[643px] xl:h-[443px] lg:w-[440px] lg:h-[340px] sm:w-[40%] sm:h-[15%] lg:px-14 sm:pl-6 sm:pt-4 sm:pr-4 md:pt-8 xl:pt-10 md:pr-10 bg-[#FFF3E3]">
            <h2 className="arrival lg:text-sm xl:text-lg font-medium sm:mt-2 sm:text-xs text-gray-600 uppercase">
              New Arrival
            </h2>
            <h1 className="collection lg:text-3xl xl:text-5xl sm:text-xl md:text-2xl font-bold text-[#B88E2F] xl:mt-4 lg:mt-3 sm:mt-2">
              Discover Our <br /> New Collection
            </h1>
            <p className="text lg:text-lg text-black xl:mt-6 lg:mt-4 sm:mt-2 sm:text-xs md:text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
              tellus, luctus nec ullamcorper mattis.
            </p>
            <button className="buy-button lg:px-12 lg:py-3 xl:mt-8 sm:mt-2 sm:text-xs lg:text-lg md:mt-6 sm:px-5 sm:py-2 bg-[#B88E2F] text-white hover:bg-yellow-700">
              BUY NOW
            </button>
          </div>
        </div>
      </div>
      <section className="text-center mx-auto text-[#333333] my-10">
        <h1 className="text-[28px]">
          <strong>Browse The Range</strong>
        </h1>
        <h3 className="mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </h3>
      </section>
      <div>
        <div className="font-[sans-serif] p-4 mx-auto lg:max-w-5xl sm:max-w-2xl max-w-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-md overflow-hidden cursor-pointer">
              <div className="w-full overflow-hidden">
                <Image
                  className="h-full w-full object-cover object-top hover:scale-110 transition-all"
                  src="/dining.webp"
                  alt="img"
                  width={381}
                  height={480}
                />
              </div>

              <div className="p-6">
                <div className="mb-6 flex items-center justify-center flex-wrap gap-4">
                  <h3 className="text-lg font-bold text-gray-800">Dining</h3>
                </div>
              </div>
            </div>

            <div className="rounded-md overflow-hidden cursor-pointer">
              <div className="w-full overflow-hidden">
                <Image
                  className="h-full w-full object-cover object-top hover:scale-110 transition-all"
                  src="/living.webp"
                  alt="img"
                  width={381}
                  height={480}
                />
              </div>

              <div className="p-6">
                <div className="mb-6 flex items-center justify-center flex-wrap gap-4">
                  <h3 className="text-lg font-bold text-gray-800">Living</h3>
                </div>
              </div>
            </div>

            <div className="rounded-md overflow-hidden cursor-pointer">
              <div className=" overflow-hidden">
                <Image
                  className="h-auto object-cover object-top hover:scale-110 transition-all"
                  src="/bedroom.webp"
                  alt="img"
                  width={381}
                  height={480}
                />
              </div>

              <div className="p-6">
                <div className="mb-6 flex items-center justify-center flex-wrap gap-4">
                  <h3 className="text-lg font-bold text-gray-800">Bedroom</h3>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="text-center mx-auto text-[#333333]">
          <h1 className="text-[28px]">
            <strong>Our Products</strong>
          </h1>
        </section>

        <div>
          <ProductGrid limit={8}/>

          <div className="text-center mx-auto my-10">
            <button className="px-16 py-2 bg-white border border-[#B88E2F] text-[#B88E2F] hover:bg-yellow-700 hover:text-white">
              <Link href={"/pages/shop"}>Show More</Link>
            </button>
          </div>

          <div>
            <Image
              className="h-auto object-cover object-top"
              src="/Inspirations.webp"
              alt="img"
              width={1760}
              height={734}
            />
          </div>
          <section className="text-center mx-auto text-[#333333] my-10">
            <h3 className="mx-auto">Share your setup with</h3>
            <h1 className="text-[28px]">
              <strong>#FuniroFurniture</strong>
            </h1>
          </section>
        </div>
        <Image
          className="h-auto object-cover object-top mb-10"
          src="/funiro.webp"
          alt="img"
          width={1799}
          height={721}
        />
      </div>
    </div>
  );
}