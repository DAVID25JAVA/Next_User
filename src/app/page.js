"use client";
import { getUsers } from "@/API/APi";
import Loader from "@/components/UI/Loader";
import Link from "next/link";
import { useEffect, useState } from "react";

function page() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetUser();
  }, []);

  const fetUser = async () => {
    setLoading(true);
    try {
      const res = await getUsers();
      if (res?.status == 200) {
        setData(res?.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return <div>Data not fount</div>;
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-5xl mx-auto sm:px-6 sm:py-8">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-400 mt-1">
            Manage your users from here
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs text-gray-400 mb-1">Total Users</p>
            <p className="text-2xl font-semibold text-gray-900">
              {data?.length}
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs text-gray-400 mb-1">Updated</p>
            <p className="text-2xl font-semibold text-gray-900">4</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <p className="text-xs text-gray-400 mb-1">Deleted</p>
            <p className="text-2xl font-semibold text-gray-900">2</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-900">All Users</h2>
            <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
              10 total
            </span>
          </div>

          {/* Table */}
          <div className="divide-y divide-gray-50">
            {data?.slice(0, 5).map((user, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50 transition duration-150"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-black text-white flex items-center justify-center text-xs font-bold  shrink-0">
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-800">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-400">{user.email}</p>
                  </div>
                </div>
                <Link
                  href={`/users/${user?.id}`}
                  className="text-xs font-medium bg-gray-100 hover:bg-black hover:text-white text-gray-600 px-4 py-1.5 rounded-xl transition duration-150 cursor-pointer"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
