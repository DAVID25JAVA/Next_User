"use client";
import React, { useState } from "react";
import { sideBarLinks } from "../../public/assets";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

function Sidebar() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:hidden pl-5 pr-4 py-3 bg-white border-r border-gray-200">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-8 h-8 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
        >
          <MenuIcon />
        </button>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        />
      )}

      <div
        className={`
          fixed top-0 left-0 h-full w-56 bg-white z-50 px-3 py-4 border-r border-gray-200 overflow-y-auto transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:static md:translate-x-0 md:block md:h-full
        `}
      >
        <div className="md:hidden flex justify-end mb-3">
          <button
            onClick={() => setIsOpen(false)}
            className="text-xs text-gray-400 cursor-pointer bg-black w-5 h-5 rounded-full"
          >
            ✕
          </button>
        </div>

        {sideBarLinks?.map((i) => (
          <div
            key={i?.id}
            className={`${
              path === i?.path
                ? "bg-black text-white"
                : "text-gray-600 hover:bg-gray-100"
            } rounded-lg mb-1`}
          >
            <Link
              href={i?.path}
              onClick={() => setIsOpen(false)}
              className="focus:outline-none"
            >
              <p className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg">
                {i?.menuItems}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Sidebar;
