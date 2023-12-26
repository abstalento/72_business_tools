import React, { useState } from "react";
import Myimage from "../../components/todolistcomponents/Image/Image";
import Styles from "../../styles/Todolist.module.css";
import Date from "../../components/todolistcomponents/Datetime/Datetime";
import AddtodoModel from "./AddtodoModel";

export default function Table() {
  const [todomodel, setTodomodel] = useState(false);
  const closeModel = () => {
    setTodomodel(false);
  };
  return (
    <div>
      <section className="Heading_Layout">
        <div className={Styles.bgTableblue}>
          <div className="text-[#ffffff] text-[75px]">
            <div className="mt-[50px] ml-[70px] absolute">To-Do List</div>
            <div className="mt-[170px] ml-[85px] absolute text-[20px] ">
              <Date></Date>
            </div>
          </div>
        </div>
      </section>
      <section className="Search_Export_Layout">
        <div className={Styles.bgblueSearchexport}>
          <div>
            <div className="flex flex-row justify-around">
              <div>
                <div class="container flex mx-auto mt-[10px]">
                  <div class="flex border-2 rounded">
                    <button class="flex items-center justify-center px-4 bg-[#ffffff]">
                      <Myimage
                        src="/todolistimages/search.svg"
                        alt="Search_Icon"
                        width={25}
                        height={20}
                      />{" "}
                    </button>
                    <input
                      type="text"
                      class="px-4 py-2 w-80"
                      placeholder="Search"
                    />
                  </div>
                </div>
              </div>

              <div>
                {" "}
                <div class="container flex mx-auto  mt-[10px]">
                  <div class="flex">
                    <span class="flex items-center justify-center px-[6px] py-1 text-blue-100 rounded bg-[#035BE1] absolute ml-[70px]">
                      <Myimage
                        src="/todolistimages/export.svg"
                        alt="exportIcon"
                        width={25}
                        height={15}
                        className="ml-[15px]"
                      />{" "}
                      <button className="text-[#ffffff]">Export</button>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="Numberoflist_Layout"></section>
      <section className="AddTodo_Layout">
        <div>
          <div className="border-solid border-t-2    border-[#000000]  opacity-5"></div>
          <div className="h-[70px]">
            <div class="container flex mx-auto">
              <div class="flex">
                <div className="ml-[100px] mt-[7px]">
                  <span class="flex items-center justify-center">
                    <Myimage
                      src="/todolistimages/newlisticon.svg"
                      alt="New_List"
                      width={30}
                      height={75}
                    />
                    <button
                      className="text-[#ffffff] bg-[#0064FE] px-[10px] py-1 ml-[15px] rounded"
                      onClick={() => setTodomodel(true)}
                    >
                      Add To-Do
                    </button>
                  </span>
                  {todomodel ? (
                    <AddtodoModel closeModel={closeModel}></AddtodoModel>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
          <div className="border-solid border-b-2 border-[#000000]  opacity-5"></div>
        </div>
      </section>
    </div>
  );
}
