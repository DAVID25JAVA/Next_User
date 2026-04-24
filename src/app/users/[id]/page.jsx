"use client";
import React, { useEffect, useState } from "react";
import { deleteUse, getUserById } from "@/API/APi";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/UI/Loader";
import EditForm from "@/components/EditForm";

function page() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [isShow, setIsShow] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetchUserById(id);
  }, [id]);

  const fetchUserById = async (id) => {
    setLoading(true);
    try {
      const res = await getUserById(id);
      if (res?.status == 200) {
        setData(res?.data);
        setEditData(res?.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    router.push("/users");
    try {
      await deleteUse(id);
    } catch (error) {
      console.log("Error-->", error);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-base md:text-xl text-gray-800 font-semibold">
          User not found.
        </p>
      </div>
    );
  }

  const initials = data?.name
    ? data.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col items-center text-center gap-3 py-4">
          <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center text-lg font-bold">
            {initials}
          </div>
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              {data?.name}
            </h2>
            <p className="text-sm text-gray-400 mt-0.5">{data?.email}</p>
          </div>
          <span className="text-xs font-medium bg-gray-100 text-gray-500 px-3 py-1 rounded-full">
            User
          </span>
        </div>

        <div className="border-t border-gray-100 my-4" />

        <div className="space-y-2 mb-5">
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5">
            <span className="text-xs text-gray-400">Name</span>
            <span className="text-xs font-medium text-gray-700">
              {data?.name}
            </span>
          </div>
          <div className="flex items-center justify-between bg-gray-50 rounded-xl px-4 py-2.5">
            <span className="text-xs text-gray-400">Email</span>
            <span className="text-xs font-medium text-gray-700">
              {data?.email}
            </span>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setEditData({ ...data });  
              setIsShow(true);
            }}
            className="flex-1 cursor-pointer bg-black hover:bg-gray-800 active:scale-95 text-white text-sm font-medium py-2.5 rounded-2xl transition duration-150"
          >
            Update
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 cursor-pointer text-center bg-red-50 hover:bg-red-100 active:scale-95 text-red-500 text-sm font-medium py-2.5 rounded-2xl transition duration-150"
          >
            Delete
          </button>
        </div>
      </div>

      {isShow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            onClick={() => setIsShow(false)}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          />
          {/* Form on top */}
          <div className="relative z-10 w-full max-w-sm mx-4">
            <EditForm
              data={editData}
              setIsShow={setIsShow}
              setEditData={setEditData}
              setData={setData}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
