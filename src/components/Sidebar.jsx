"use client";
import React from "react";
import { sideBarLinks } from "../../public/assets";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar() {
  const path = usePathname();

  console.log("Path-->", path);

  return (
    <div className="w-56 h-full border-r border-gray-200 px-3 py-4 overflow-y-auto">
      {sideBarLinks?.map((i) => (
        <div
          key={i?.id}
          className={`${
            path == i?.path
              ? "bg-black text-white "
              : "bg-gray-100 hover:bg-gray-100 "
          } rounded-lg`}
        >
          <Link href={i?.path} className="focus:outline-none">
            <p className="flex items-center gap-5 px-3 py-2.5 mb-1 rounded-lg text-base font-medium ">
              {i?.menuItems}
            </p>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
