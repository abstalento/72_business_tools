import React from "react";
import Image from "next/image";

const DragAndDrop = ({filename}) => {
  return (
    <div className="w-[100%] h-[200px] flex rounded-xl border-[2px] border-dashed opacity-[0.41] mx-auto">
     {!filename ?
       <div className=" w-[45%] flex flex-col space-y-1 items-center justify-center mx-auto">
        <div className="text-[10px] text-white font-[sfpro-regular-display] text-center">
          Drag & Drop file here
        </div>
        <div className="text-center text-[10px] text-white/40 tracking-normal text-black font-[sfpro-medium]">
          Or
        </div>
        <div className="flex w-[20%] bg-white/50 p-1 rounded-sm justify-between">
          <Image
            width="10%"
            height="5px"
            className=""
            src="/images/uploadIcon.png"
          />
          <span className="text-[10px] text-white">Choose File</span>
        </div>
        <div className="text-center text-[10px] font-[sfpro-regular-display] text-white opacity-[0.4] w-[32%] mx-auto">
          Max upload Size 10MB
        </div>
      </div>  :
      <div className="w-[100%] text-white flex justify-center items-center">
        {filename?.name}
      </div>
}
    </div>
  );
};

export default DragAndDrop;
