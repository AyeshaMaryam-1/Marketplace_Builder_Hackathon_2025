import Image from "next/image";

export default function Services() {
  return (
    <div className="max-w-[1348px] mx-auto bg-[#FAF3EA] mt-8 min-h-[400px] md:min-h-[300px] lg:min-h-[300px]">
      <ul className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-6 sm:px-12 lg:px-16 py-12 md:py-16 lg:py-32">
        <li className="flex items-center">
          <Image
            className="logo"
            src="/g1.png"
            alt="High Quality"
            width={60}
            height={60}
          />
          <div className="ml-6">
            <h2 className="text-lg md:text-xl font-semibold text-[#242424]">
              High Quality
            </h2>
            <h3 className="text-sm md:text-base text-[#9F9F9F]">
              Crafted from top materials
            </h3>
          </div>
        </li>
        <li className="flex items-center">
          <Image
            className="logo"
            src="/g2.png"
            alt="Warranty Protection"
            width={60}
            height={60}
          />
          <div className="ml-6">
            <h2 className="text-lg md:text-xl font-semibold text-[#242424]">
              Warranty Protection
            </h2>
            <h3 className="text-sm md:text-base text-[#9F9F9F]">
              Over 2 years
            </h3>
          </div>
        </li>
        <li className="flex items-center">
          <Image
            className="logo"
            src="/g3.png"
            alt="Free Shipping"
            width={60}
            height={60}
          />
          <div className="ml-6">
            <h2 className="text-lg md:text-xl font-semibold text-[#242424]">
              Free Shipping
            </h2>
            <h3 className="text-sm md:text-base text-[#9F9F9F]">
              Order over $150
            </h3>
          </div>
        </li>
        <li className="flex items-center">
          <Image
            className="logo"
            src="/g4.png"
            alt="24/7 Support"
            width={60}
            height={60}
          />
          <div className="ml-6">
            <h2 className="text-lg md:text-xl font-semibold text-[#242424]">
              24 / 7 Support
            </h2>
            <h3 className="text-sm md:text-base text-[#9F9F9F]">
              Dedicated support
            </h3>
          </div>
        </li>
      </ul>
    </div>
  );
}
