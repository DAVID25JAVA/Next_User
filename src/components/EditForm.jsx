import { updateUser } from "@/API/APi";
import React from "react";
import toast from "react-hot-toast";

function EditForm({ data, setEditData, setIsShow, setData }) {
  const handleEdit = async () => {
    if (!data?.email.includes("@")) {
      toast.error("Invalid email");
      return;
    }

    if (!data?.name?.trim()) {
      toast.error("Name is required");
      return;
    }
    
    let payload = {
      name: data?.name,
      email: data?.email,
    };
    setData((prev) => ({ ...prev, ...payload }));
    setIsShow(false);
    try {
      const res = await updateUser(data?.id, payload);
      console.log("Edit--->", res);
    } catch (error) {
      console.log("Edit error--->", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 ">
      <div className="w-full max-w-sm bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
        <div className="flex flex-col items-center text-center gap-2 py-4">
          <div className="w-16 h-16 rounded-2xl bg-black text-white flex items-center justify-center text-lg font-bold">
            {data?.name?.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-base font-semibold text-gray-900">
            Edit Profile
          </h2>
          <p className="text-xs text-gray-400">Update name and email below</p>
        </div>

        <div className="border-t border-gray-100 my-4" />

        <div className="space-y-3 mb-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 px-1">
              Name
            </label>
            <input
              type="text"
              value={data?.name}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Enter name"
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-black focus:bg-white transition duration-150"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-500 px-1">
              Email
            </label>
            <input
              type="email"
              value={data?.email}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="Enter email"
              className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-black focus:bg-white transition duration-150"
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => {
              setEditData({ ...data });
              setIsShow(false);
            }}
            className="flex-1 cursor-pointer bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-600 text-sm font-medium py-2.5 rounded-2xl transition duration-150"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleEdit();
            }}
            className="flex-1 cursor-pointer bg-black hover:bg-gray-800 active:scale-95 text-white text-sm font-medium py-2.5 rounded-2xl transition duration-150"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditForm;
