
import Image from "next/image";
import React, { useRef } from "react";

import downArrow from "../../public/images/downArrow.png";

const ImageSetting = () => {
  const openRef = useRef();
  return (
    <div className="flex  w-[120px] h-[40px] items-center rounded-lg text-white bg-gray-600 bg-opacity-40">
      <input type="text" className="w-[60px] bg-transparent focus:outline-none pl-2" />
      <p>|</p>
      <div className="flex w-[50px]">
        <select
          id="select"
          ref={openRef}
          className="bg-transparent appearance-none w-[50px] ml-1 opacity-[0.8] text-[13px] focus:outline-none"
        >
          <option className="bg-[#707070] text-[13px] opacity-[0.8]" value="">Kb</option>
          <option className="bg-[#707070] text-[13px] opacity-[0.8]" value="">Mb</option>
        </select>
        <Image
        className=""
          src={downArrow}
          width={10}
          height={10}
          onClick={() => {
            openRef
          }}
        />
      </div>
    </div>
  );
};

export default ImageSetting;
