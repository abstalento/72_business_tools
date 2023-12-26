import React from "react";
import Image from "next/image";
import { useState } from "react";
//Image
import Search from "./SearchBox";
// E:\Business tool\72_bt_landingpage\public\images\Search Icon@2x.png

export default function SearchBox(props) {
  // const [searchField, setSearchField] = useState("");

  const [dropDown, setDropDown] = useState([
    "All",
    "Finance",
    "Productivity",
    "Management",
  ]);
  const [selectValue, setSelectValue] = useState("Select Category");
  const [handleShow, sethandleShow] = useState(false);
  const [handleArrow, setHandlearrow] = useState(false);
  const handleDropdownChange = (value) => {
    sethandleShow(false);
    setSelectValue(value);
    setHandlearrow(false);
    props.onDropCallback(value);
  };

  const handleChange = (e) => {
    let regexSpeChar = e.target.value.replace(/[^a-zA-Z0-9]/g, "");
    props.onSearchCallback(regexSpeChar);
    // setSearchField(e.target.value);
  };

  return (
    <>
      <div className="flex justify-center items-center lg:w-[73%] xl:w-[64%] md:w-[60%] sm:w-[60%] w-[310px] mx-auto mt-[18px] shadow-md border-[5px] border-white   h-10 border-r-2 rounded-lg bg-white bg-opacity-[100%] relative pr-2">
        <button
          id="dropdownDefault"
          data-dropdown-toggle="dropdown"
          className="text-[#000000] text-opacity-[60%] focus:outline-none focus:ring-blue-300 font-[sfpro-medium] rounded-lg sm:text-[9px] text-[8px] lg:text-sm md:text-[10px] text-sm px-4 py-2.5 text-center inline-flex items-center w-[200px]"
          type="button"
          onClick={() => sethandleShow((prevState) => !prevState)}
        >
          {selectValue && selectValue !== "All"
            ? selectValue
            : "All"}
          <svg
            className={`ml-2 w-4 h-4  ${handleShow ? "rotate-180" : ""}`}
            onClick={() => setHandlearrow((prevState) => !prevState)}
            aria-hidden="true"
            fill="#000000"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        {handleShow ? (
          <div
            id="dropdown"
            className="z-10 w-44 bg-white  rounded-[7px] border-[#50505029] divide-y divide-gray-100 shadow absolute top-[40px] left-0"
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDefault"
            >
              {dropDown.map((value, index) => (
                <li key={index}>
                  <div
                    onClick={() => handleDropdownChange(value)}
                    className="font-['sf-pro-medium'] bg-white text-[#000000] text-[12px] text-opacity-[100%] block py-2 px-4 hover:cursor-pointer dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {value}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
        <div></div>
        <input
          type="text"
          className="w-[100%] sm:text-[9px] lg:text-[15px] md:text-[15px] text-[9px] md:h-[3vh] sm:h-[4vh] lg:h-[4vh] font-['sf-pro-medium'] indent-2 outline-none border-l bg-white"
          placeholder="Search for the apps what you are looking for"
          onChange={handleChange}
        />
        {/* <img
          src={"../images/Search Icon.png"}
          alt="search"
          className="bg-white pr-4"
        /> */}
      </div>
    </>
  );
}
