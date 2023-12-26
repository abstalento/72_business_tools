import React from "react";

const TitleComponent = ({head, content, nav}) => {
    return(
        <div className=" sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px] h-[215px] flex flex-col items-center justify-center mx-auto">
            <div className="text-[60px] font-[sfpro-regular-display] tracking-[1.0px] text-center text-[#FFCC41] opacity-100 leading-10">{head}</div>
            <div className="text-center text-[65px] tracking-normal mt-0 text-[#FAFDFD] opacity:1 font-[sfpro-medium]">{content}</div>
            <div className="text-center text-[12px] font-[sfpro-regular-display] flex items-center text-[#FAFDFD]/40 w-[300px] mx-auto">{nav}</div>
        </div>
    )
}

export default TitleComponent