export default function AddtodoModel({
  closeModel,
  sidebar,
  heading,
  categorytype,
  piority,
  Savetodo,
  handleAddtodo,
}) {
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none pl-[150px] pr-[70px]">
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <p className="my-4 text-slate-500 text-lg leading-relaxed">
                <div class="flex justify-center">
                  <div class="mb-3 xl:w-96">
                    <label
                      for="exampleFormControlTextarea1"
                      class="form-label inline-block mb-2 text-gray-700"
                    >
                      Heading
                    </label>
                    <textarea
                      class="
        form-control
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                      rows="3"
                      placeholder="Your message"
                      name="heading"
                      value={heading}
                      onChange={handleAddtodo}
                    ></textarea>
                  </div>
                </div>
              </p>

              <div className="flex flex-row place-content-between">
                <div>
                  {" "}
                  <p> Category Type </p>
                  <select
                    className="border-2 border-solid border-black mt-[12px]"
                    name="categorytype"
                    value={categorytype}
                    onChange={handleAddtodo}
                  >
                    {sidebar.map((item) => {
                      return (
                        <option name="ddd" value={item.categorytype}>
                          {item.categorytype}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  {" "}
                  <p>Piority</p>
                  <select
                    className="border-2 border-solid border-black mt-[12px]"
                    name="piority"
                    value={piority}
                    onChange={handleAddtodo}
                  >
                    <option name="display01" value="High">
                      High
                    </option>
                    <option name="display02" value="Medium">
                      Medium
                    </option>
                    <option name="display03" value="Low">
                      Low
                    </option>
                  </select>
                </div>
              </div>
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-8 ">
              <button
                className="text-[#ffffff] bg-[#00000099] font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => closeModel()}
              >
                Close
              </button>
              <button
                className=" text-[#ffffff] bg-[#035BE1] active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded "
                type="button"
                onClick={() => Savetodo()}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed top-[150px]	z-40 bg-black"></div>
    </div>
  );
}
