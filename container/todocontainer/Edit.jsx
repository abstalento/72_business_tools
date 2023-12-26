import Myimage from "../../components/todolistcomponents/Image/Image";
export default function Edit({
  saveChange2,
  heading,
  categorytype,
  date,
  time,
  saveChange,
  sidebar,
  HandlelogUpdate,
  Updateclick,
  editdata,
  clearclick,
}) {
  return (
    <div>
      <div>
        <div className="border-solid border-t border-[#000000]  opacity-5 "></div>

        <div className="mt-[25px]">
          <textarea
            className="form-control block w-[63rem] px-3 py-1.5 text-base  font-normal  text-gray-700 bg-[#F9F9F9] bg-clip-padding border border-solid border-gray-300 rounded transitionease-in-outmt-[25px]
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none resize-none
      "
            rows="3"
            placeholder="Your message"
            name="heading"
            // value={heading}
            defaultValue={editdata}
            // onChange={saveChange}
            onChange={saveChange2}
            required
          ></textarea>

          <div className="flex flex-row space-x-[15px] mt-[30px]">
            <div>
              {" "}
              <div>
                {" "}
                <select
                  className=" mt-[5px]"
                  name="categorytype"
                  value={categorytype}
                  onChange={saveChange}
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
            </div>
            <div>
              <div
                className="flex flex-row cursor-pointer bg-[rgb(243,242,242)] p-[2px] border-2 border-[rgb(243,242,242)] rounded-lg ml-[50px]   hover:bg-white"
                onClick={() => HandlelogUpdate("High")}
              >
                <div>
                  <Myimage
                    src="/todolistimages/Redflag.svg"
                    alt="Redflag"
                    width={25}
                    height={15}
                  />
                </div>
                <div>
                  {" "}
                  <div className="inline text-[#000000] text-[15px] font-semibold">
                    High Priority
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                className="flex flex-row cursor-pointer bg-[rgb(243,242,242)] p-[2px] border-2 border-[rgb(243,242,242)] rounded-lg hover:bg-white"
                onClick={() => HandlelogUpdate("Medium")}
              >
                <div>
                  <Myimage
                    src="/todolistimages/yellowflag.svg"
                    alt="yellowflag"
                    width={25}
                    height={15}
                  />
                </div>
                <div>
                  {" "}
                  <div className="inline text-[#000000] text-[15px] font-semibold">
                    Medium Priority
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div
                className="flex flex-row cursor-pointer bg-[rgb(243,242,242)] p-[2px] border-2 border-[rgb(243,242,242)] rounded-lg hover:bg-white"
                onClick={() => HandlelogUpdate("Low")}
              >
                <div>
                  <Myimage
                    src="/todolistimages/greenflag.svg"
                    alt="greenflag"
                    width={25}
                    height={15}
                  />
                </div>
                <div>
                  {" "}
                  <div className="inline text-[#000000] text-[15px] font-semibold">
                    Low Priority
                  </div>
                </div>
              </div>
            </div>

            <div>
              <input
                type="date"
                name="date"
                className="bg-[#0A1B63] text-[#ffffff] p-[3px] border-2 rounded-lg"
                value={date}
                onChange={saveChange}
              />
            </div>
            <div>
              <input
                type="time"
                name="time"
                className="bg-[#63390A] text-[#ffffff] p-[3px] border-2 rounded-lg"
                value={time}
                onChange={saveChange}
              />
            </div>
            <div>
              {" "}
              <button
                className=" text-[#ffffff] bg-[#035BE1] p-[7px] rounded "
                type="button"
                onClick={() => Updateclick()}
              >
                Update
              </button>
            </div>
            <div>
              {" "}
              <button
                className="text-[#ffffff] bg-[#00000099] p-[7px] rounded"
                type="button"
                onClick={() => clearclick()}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        <div className="border-solid border-b border-[#000000] opacity-5"></div>
      </div>
    </div>
  );
}
