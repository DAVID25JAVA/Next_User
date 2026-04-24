import Link from "next/link";
import React from "react";

function Navbar() {
  return (
    <div className="p-3 border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="max-w-8xl sm:px-3 mx-auto w-full 2xl:container ">
        <Link href={'/'} className=" flex items-center gap-2 focus:outline-none">
        <span className="w-10 h-10 bg-black flex items-center justify-center rounded-lg">
          <span className="uppercase text-white text-base font-bold">n</span>
        </span>
          <span className="text-base sm:text-lg uppercase font-semibold">Nextusers</span>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;