import Link from "next/link";

export default function Footer() {
  return (
    <div className="sm:mx-2">
      <footer className="font-sans tracking-wide pb-4 px-6 sm:px-4">
        <hr className="mb-8 border-[#9F9F9F] -mx-6 sm:-mx-6" />
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-screen-lg ">
          <div>
            <h1 className="text-[28px] font-bold">Furniro</h1>
            <p className="text-[#9F9F9F] pt-4">
              400 University Drive Suite 200
              <br />
              Coral Gables, FL 33134 USA
            </p>
          </div>

          <div>
            <h4 className="text-[#9F9F9F] font-semibold text-lg mb-4">Links</h4>
            <ul className="space-y-4">
              <li className="hover:text-[#FFA726] text-black font-semibold text-[15px] transition-all">
                <Link href={"/"}>Home</Link>
              </li>
              <li className="hover:text-[#FFA726] text-black font-semibold text-[15px] transition-all">
                <Link href={"/pages/shop"}>Shop</Link>
              </li>
              <li className="hover:text-[#FFA726] text-black font-semibold text-[15px] transition-all">
                <Link href={"/pages/blog"}>Blog</Link>
              </li>
              <li className="hover:text-[#FFA726] text-black font-semibold text-[15px] transition-all">
                <Link href={"/pages/contact"}>Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#9F9F9F] font-semibold text-lg mb-4">Help</h4>
            <ul className="space-y-4">
              {["Payment Options", "Returns", "Privacy Policies"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="javascript:void(0)"
                      className="hover:text-[#FFA726] text-black font-semibold text-[15px] transition-all"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-[#9F9F9F] font-semibold text-lg mb-4">
              Newsletter
            </h4>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="text-[#9F9F9F] border-b border-black w-full sm:w-auto sm:flex-grow px-2 py-1"
              />
              <button className="border-b border-black px-4 py-1 hover:text-[#FFA726] transition-all">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        <hr className="mt-12 mb-6 border-[#9F9F9F]" />
        <p className="text-black font-semibold text-[15px] text-center ml-8 sm:text-left">
          2023 Furniro. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
