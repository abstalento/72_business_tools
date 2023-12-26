import React from "react";

export default function Delete({ Closeedit, Deleteokay }) {
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className="relative w-auto my-4 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none pl-[50px] pr-[70px]">
            {/*body*/}
            <div className="relative  flex-auto">
              <p className="my-4 ml-[90px] text-[#000000] font-semibold opacity-15 text-lg leading-relaxed">
                Really !
              </p>
              <p className="my-2  text-[#000000] font-semibold opacity-75 text-lg leading-relaxed">
                {" "}
                You want to delete this To-Do
              </p>
            </div>
            {/*footer*/}
            <div className="flex justify-end p-6 ">
              <div>
                {" "}
                <button
                  className="text-[#ffffff] bg-[#00000099] font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150 mr-[48px]"
                  type="button"
                  onClick={() => Closeedit()}
                >
                  Cancel
                </button>
              </div>
              <div>
                {" "}
                <button
                  className=" text-[#ffffff] bg-[#035BE1] font-bold uppercase text-sm px-6 py-2 rounded "
                  type="button"
                  onClick={() => Deleteokay()}
                >
                  Okay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}
