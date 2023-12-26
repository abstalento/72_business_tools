import React, { useEffect, useState } from "react";
import Myimage from "../../components/todolistcomponents/Image/Image";
import Styles from "../../styles/Todolist.module.css";

export default function Sidebar({
  setShowModal,
  sidebar,
  Sideclick,
  arrayaddtodo,
}) {
  // const numbers = [1, 2, 3, 4, 5];
  // const length = numbers.length;
  // for (let i = 0; i < length; i++) {
  //   numbers[i] *= 2;
  // }

  //   const arrayud = [];
  //   const number = [];

  //   const length = arrayaddtodo.length;
  //   for (let i = 0; i < length; i++) {
  //     let doarray = arrayaddtodo[i].categorytype;

  //     arrayud.push(doarray);
  //     console.log(doarray, "doarray");
  //   }
  //   let unique = [...new Set(arrayud)];
  //   console.log(unique, "unique");

  //   const lefffngth = unique.length;

  //   for (let j = 0; j < lefffngth; j++) {
  //     let ffffbb = arrayaddtodo.filter((item) => item.categorytype === unique[j]);

  //     number.push(ffffbb);

  //   }
  // console.log(number[0].length, "legg");
  return (
    <div>
      <section className="Logo_Layout">
        {/* <div className={Styles.bgImage}>
      h-[75px] bg-[#52A9F9]
      <div className="flex flex-row  h-[75px] mt-[-6px] ">
        <div className="mt-[20px] ml-[28px]">
          <Myimage
            src="/todolistimages/library.svg"
            alt="LibraryLogo"
            width={60}
            height={35}
          />
        </div>
        <div>
          <div className="text-[#ffffff] mt-[20px] font-bold">
            {" "}
            To-Do List{" "}
          </div>
          <div className="text-[#ffffff] text-[10px] mt-[3px]">
            BY 72 BUSINESS TOOLS
          </div>
        </div>
      </div>
    </div> */}
      </section>
      <section className="NewList_Layout ">
        <div className="h-[150px]">
          <div className="flex flex-row ml-[18px] mt-[55px] ">
            <div
              className="ml-[20px] cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              <Myimage
                src="/todolistimages/newlisticon.svg"
                alt="New_List"
                width={30}
                height={75}
              />
            </div>
            <div
              className="text-[30px] font-semibold mt-[15px] ml-[35px] cursor-pointer"
              onClick={() => setShowModal(true)}
            >
              New List
            </div>
          </div>{" "}
        </div>
      </section>

      <section className="AllList_Layout">
        <div>
          {/* bg-[#0064FE] opacity-20  */}
          <div className={Styles.bgblue}>
            {" "}
            <div className="flex flex-row  space-x-4 h-[50px] mt-[-5px]">
              <div className="ml-[20px]">
                <Myimage
                  src="/todolistimages/newList.svg"
                  alt="New_List"
                  width={25}
                  height={50}
                />
              </div>
              <div className="text-[25px] text-[#0064FE] mt-[7px]">
                All List
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="NumberOfList_Layout">
        <div className="overflow-scroll no-scrollbar h-[70vh]">
          {sidebar.map((item, index) => {
            return (
              <div className="flex flex-row space-x-4 mt-[20px] ml-[20px]">
                <div>
                  <Myimage
                    src="/todolistimages/blacklibrary.svg"
                    alt="New_List"
                    width={25}
                    height={35}
                  />
                </div>
                <div className="text-[#000000] text-[14px] font-['Sf-pro-semibold'] mt-[5px] w-[195px]">
                  <button onClick={() => Sideclick(index)}>
                    {" "}
                    {item.categorytype}
                  </button>
                </div>
                <div>
                  <div className="bg-[#035BE1]  h-[28px] w-[25px] rounded-lg	 ml-[50px] mr-[25px]">
                    <div className="text-[#ffffff] ml-[8px]">{index + 1}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
