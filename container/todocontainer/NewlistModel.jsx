import React from "react";

export default function NewlistModel({
  Task,
  SaveNewlistModel,
  value,
  handleCategory,
  newlistvalidation,
  newListinputfield,
  newListinputfieldClick,
  validationString,
  validationSpecialchar,
  btndisable,
  emptyvaluevalidate,
}) {
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none pl-[70px] pr-[70px] pt-[60px] pb-[15px]">
            {/*body*/}
            <div className="relative p-3 flex-auto">
              <div className="my-2 text-[#000000] text-lg leading-relaxed">
                <div className="text-[#000000] font-[sf-pro-regular] text-[25px] opacity-[8] absoulte mt-[-37px] ml-[30px]">
                  {" "}
                  Create New List
                </div>

                <div
                  className={
                    newListinputfield
                      ? "absoulte mt-[20px] text-[#000000]  text-[15px] font-semibold rounded-md  focus:outline-none border-2 border-solid border-[#000000] opacity-20"
                      : "absoulte mt-[20px] text-[#000000]  text-[15px] font-semibold rounded-md  focus:outline-none "
                  }
                >
                  <input
                    type="text"
                    // placeholder={newListinputfield ? "Enter List Name" : null}
                    className="w-[32vh] h-[45px] "
                    placeholder=" Enter List Name"
                    name="categorytype"
                    value={value}
                    onChange={handleCategory}
                    onClick={() => {
                      newListinputfieldClick();
                    }}
                  ></input>
                </div>
              </div>

              {emptyvaluevalidate ? (
                <p className="text-[#F44336] text-[12px]">
                  * Empty Value Not Validate
                </p>
              ) : null}
              {validationString ? (
                <p className="text-[#F44336] text-[12px]">
                  * Maximum 25 characters allowed *
                </p>
              ) : null}

              {validationSpecialchar ? (
                <p className="text-[#F44336] text-[12px]">
                  * Special characters allowed *
                </p>
              ) : null}
            </div>
            {/*footer*/}
            <div className="flex justify-end p-4 ">
              <div>
                {" "}
                <button
                  className="text-[#ffffff] rounded bg-[#00000099] font-bold px-6 py-2 text-sm outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150 mr-[75px]"
                  type="button"
                  onClick={() => Task()}
                >
                  Cancel
                </button>
              </div>
              <div>
                {" "}
                <button
                  // className={
                  //   newlistvalidation
                  //     ? "text-[#ffffff] bg-[#035BE1] font-bold uppercase text-sm px-6 py-2 rounded  "
                  //     : "bg-[red] "
                  // }
                  disabled={btndisable ? true : false}
                  className={
                    btndisable
                      ? "text-[#ffffff] bg-[#035BE1] font-bold  text-sm px-6 py-2 rounded opacity-20"
                      : "text-[#ffffff] bg-[#035BE1] font-bold  text-sm px-6 py-2 rounded"
                  }
                  type="button"
                  onClick={() => SaveNewlistModel()}
                >
                  Done
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
