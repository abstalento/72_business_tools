import Myimage from "../../components/todolistcomponents/Image/Image";
import Styles from "../../styles/Todolist.module.css";

export default function Addnewtodolist({
  closeModel,
  sidebar,
  heading,
  categorytype,
  piority,
  date,
  time,
  Savetodo,
  handleAddtodo,
  Handlelog,
}) {
  return (
    <div>
      <div className="border-solid border-t border-[#000000]  opacity-5 "></div>

      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none  ">
        <div className="relative w-auto my-4 mx-auto max-w-3xl">
          {/* bg-white */}
          <div
            className="border-0 rounded-lg shadow-lg relative flex flex-col bg-[white] outline-none focus:outline-none mt-[56px] min-w-fit pb-[20px] "
            style={{
              paddingLeft: "25px",
              paddingRight: "371px",
              position: "relative",
              marginLeft: "-130px",
            }}
          >
            {/*content*/}
            <div className="absoulte ml-[35px]  ">
              <p className="text-[#000000] text-[25px] font-semibold pt-[15px]">
                Add New To-Do List
              </p>
              <textarea
                className="form-control block w-[63rem] px-3 py-1.5 text-base  font-normal  text-gray-700 bg-[#F9F9F9] bg-clip-padding border border-solid border-gray-300 rounded transitionease-in-outmt-[25px]
        focus:text-gray-700 focus:bg-white focus:outline-none resize-none mt-[15px]"
                rows="3"
                name="heading"
                value={heading}
                onChange={handleAddtodo}
              ></textarea>

              {/* <div className="flex items-center justify-end p-8 "></div> */}

              <div className="flex flex-row  content-between space-x-[15px] mt-[30px] ">
                <div>
                  {" "}
                  <div>
                    {" "}
                    <select
                      className="mt-[5px]"
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
                </div>
                <div>
                  <div
                    className="flex flex-row cursor-pointer bg-[rgb(243,242,242)] p-[2px] border-2 border-[rgb(243,242,242)] rounded-lg  hover:bg-[#BDBDBD]"
                    onClick={() => Handlelog("High")}
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
                    className="flex flex-row cursor-pointer bg-[rgb(243,242,242)] p-[2px] border-2 border-[rgb(243,242,242)] rounded-lg hover:bg-[#BDBDBD]"
                    onClick={() => Handlelog("Medium")}
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
                    className="flex flex-row cursor-pointer bg-[rgb(243,242,242)] p-[2px] border-2 border-[rgb(243,242,242)] rounded-lg hover:bg-[#BDBDBD]"
                    onClick={() => Handlelog("Low")}
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
                  <style jsx>{`
                    input[type="date"]::-webkit-calendar-picker-indicator {
                      position: relative;
                      right: 118px;
                    }

                    input::-webkit-datetime-edit {
                      position: relative;
                      left: 10px;
                    }

                    input::-webkit-datetime-edit-fields-wrapper {
                      position: relative;
                      left: 10px;
                    }
                  `}</style>{" "}
                  <input
                    type="date"
                    name="date"
                    className="bg-[#0A1B63] text-[#ffffff] p-[5px] border-2 rounded-lg"
                    value={date}
                    onChange={handleAddtodo}
                  />
                </div>
                <div>
                  {/* <style jsx>{`
                    input[type="time"]::-webkit-calendar-picker-indicator {
                      position: relative;
                      right: 18px;
                    }
                  `}</style> */}
                  <input
                    type="time"
                    name="time"
                    className="bg-[#63390A] text-[#ffffff] p-[5px] border-2 rounded-lg"
                    value={time}
                    onChange={handleAddtodo}
                  />
                </div>
                <div>
                  {" "}
                  <button
                    className=" text-[#ffffff] bg-[#035BE1] px-2 py-2 rounded "
                    type="button"
                    onClick={() => Savetodo()}
                  >
                    ADD
                  </button>
                </div>
                <div>
                  {" "}
                  <button
                    className="text-[#ffffff] bg-[#00000099]  px-2 py-2 rounded"
                    type="button"
                    onClick={() => closeModel()}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-solid border-b border-[#000000] opacity-5"></div>
      {/* <div className="opacity-25 fixed inset-0 z-40 bg-black"></div> */}
      <div className={Styles.AddtonewtolistModelBg}></div>
    </div>
  );
}
