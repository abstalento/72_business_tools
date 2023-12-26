import React from "react";
import Image from "next/image";
import { useState } from "react";
function Archivedpopup(props)

{
    const [closeButton,setCloseButton]=useState(false)
    const closeArchive=(data)=>{
        props.archiveClose(data)
    }

    const archivedClick = () => {
        props.archive(props.idArchive)
        props.callUseEffect()
        props.callUseEffect()
    }
    return(
        <>
        {!closeButton?(
        <div className="bg-[#080808] h-screen  flex justify-around items-center z-50 absolute inset-0 bg-opacity-[0.8]">
            <div className="bg-white flex justify-around items-center lg:w-[30%] w-[60%] xl:w-[20%] md:w-[20%] h-[25vh] rounded-md">
                <div className=" h-[75%] w-[88%] flex flex-col">
                                <div className="flex justify-end h-[20px] w-full">
                                    <Image
                                        width="20px"
                                        height="25px"
                                        src="/icons/Close-button.svg"
                                        className="hover:cursor-pointer"
                                        onClick={()=>closeArchive(false)}
                                        />
                                </div>
                                <div className="flex justify-around items-center text-center">
                                    <h2 className="font-semibold">Are you sure want to archive<br/> the project?</h2>
                                </div>
                                <div className="flex justify-center items-center mt-6" onClick={archivedClick}>
                                    <button className="bg-[#693DFE] cursor-pointer text-white rounded w-[140px] h-[30px]  font-[sfpro] text-[14px]">Archive</button>
                                </div>

                </div>
            </div>
        </div>
        ):null}
        </>
    )
}
export default Archivedpopup;