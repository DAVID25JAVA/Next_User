"use client";
import React, { useEffect, useState } from "react";
import { getUsers } from "@/API/APi";
import Loader from "@/components/UI/Loader";
import Link from "next/link";

// const ItemPerPage = 3;
function page() {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paginateData, setPaginateData] = useState([]);
  const [page, setPage] = useState(1);
//   const totalPage = Math.floor(userData.length / ItemPerPage);
  //   console.log(totalPage);

  useEffect(() => {
    fetData();
  }, []);

  const fetData = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      const data = res?.data;
      //   console.log(data);
      setUserData(data);
      setLoading(false);
    } catch (error) {
      console.log("User Error-->", error?.message);
      setLoading(false);
    }
  };

//   useEffect(() => {
//     setLoading(true)
//     let lastIndex = ItemPerPage * page;
//     let firstIndex = lastIndex - ItemPerPage;
//     let data = userData.slice(firstIndex, lastIndex);
//     console.log("Data-->", data);
//     setPaginateData(data);
//     setLoading(false)
//   }, [userData, page]);

  if (loading) {
    return <Loader />;
  }

//   console.log(page);

  return (
    <div className="sm:p-5">
      <div className="w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {userData?.map((i) => (
            <div key={i?.id} className="border border-gray-200 rounded-lg p-5">
              <div className="w-12 h-12 rounded-full border bg-black text-white flex items-center justify-center text-sm font-bold shrink-0">
                {i?.email.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-sm font-semibold text-gray-900">
                  {i?.name}
                </h2>
                <p className="text-sm text-gray-400">{i?.email}</p>
              </div>

              {/* Button */}
              <Link href={`/users/${i?.id}`}>
              <button className="mt-4 w-full cursor-pointer bg-black hover:bg-gray-800 active:scale-95 text-white text-sm font-medium py-2 rounded-xl transition duration-150">
                View
              </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {/* {paginateData.length > 0 && (
          <div className="flex justify-center items-center gap-5 mt-5">
            <button
              disabled={page == 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="cursor-pointer px-5 py-2 rounded-lg bg-black text-white"
            >
              Prev
            </button>
            <span>
              Page: {page}/{totalPage}
            </span>
            <button
              disabled={page == totalPage}
              onClick={() => setPage((prev) => prev + 1)}
              className="cursor-pointer px-5 py-2 rounded-lg bg-black text-white"
            >
              Next
            </button>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default page;
