import Image from "next/image";
import SearchBox from "../../components/homepage/search/SearchBox";
import logo from "../../public/images/72BT Logo.png";
import React, { useState } from "react";
import Business from "./BusinessTool";

export default function Landingpagetop({ onSearchCallback, dropDown }) {
  const [searchData, setSearchData] = useState("");
  const [dropdownData, setDropdownData] = useState("All");
  const onSearchChange = (value) => {
    setSearchData(value);
    onSearchCallback(value);
  };

  const onDropDownCall = (value) => {
    setDropdownData(value);
  };
  return (
    <div className=" flex justify-center items-center flex-col">
      <div className="pl-5 w-full bg-white h-10 fixed top-0 z-10 pt-1">
        <Image src="/images/72BT Logo.png" height="35" width="90" className="w-8 h-4" alt="72"></Image>
      </div>
      <div className="lg:h-[45vh]  md:h-[45vh] sm:h-[45vh] h-[40vh] w-full bg-[#6038B2]">
        <div className="bg-[url('../public/MaskGroup.png')] bg-[length:100%] h-[100%] 3xl:pt-[160px] pt-[70px]">
          <h3 className="text-[14px] text-center sm:text-md lg:text-3xl md:text-[20px] text-white font-['Sf-pro-semibold'] py-2">
            Get the most from your business with our tools
          </h3>
          <div className="flex justify-center items-center">
            <p className="md:w-[69%] sm:w-[58%] lg:w-[42%] w-[78%] text-center text-[16px] lg:text-[18px] md:text-[20px] sm:text-[15px] font-[sfpro-regular-display] text-white opacity-80">
              The ultimate Swiss army knife of business tools for businesses and
              individuals.<br/> And its completely
              <span className="text-[#ffa726] font-bold ml-1">FREE</span>
            </p>
          </div>
          {/* <div className="flex justify-center">
            <p className="w-[42%] text-sm text-center font-['sf-pro-light'] text-white opacity-80 py-2   lg:text-3xl md:text-lg lg:w-[50%] xl:w-[60%] sm:w-[100%] sm:text-xs ">
            The perfect Swiss army knife of business tools for businesses and individuals. And its completely <span className="text-red-600">FREE</span>
            </p>
          </div> */}
          <SearchBox
            onSearchCallback={onSearchChange}
            onDropCallback={dropDown}
          />
        </div>
      </div>
    </div>
  );
}
