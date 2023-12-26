import React from "react";
import Image from "next/image";
import { useState } from "react";
function Deletepopup(props){
    
    const closePopup=()=>{
        props.setCloseButton(false)
    }

    const DeleteId=()=>{
        props.sendDeleteId(props.DeleteData)
  
    }
    return(
        <>
        <div className="bg-[#080808] h-screen  flex justify-around items-center z-50 absolute inset-0 bg-opacity-[0.8]">
            <div className="bg-white flex justify-around items-center lg:w-[30%] w-[60%] xl:w-[20%] md:w-[20%] h-[25vh] rounded-md">
                <div className=" h-[75%] w-[88%] flex flex-col">
                                <div className="flex justify-end h-[20px] w-full">
                                    <Image
                                        width="20px"
                                        height="25px"
                                        src="/icons/Close-button.svg"
                                        className="hover:cursor-pointer"
                                        onClick={closePopup}
                                        />
                                </div>
                                <div className="flex-col justify-around items-center text-center">
                                    <h2 className="font-semibold">Are you sure want to delete?</h2>
                                    <p className="text-[9px] mt-3"><sup>*</sup>Once deleted you can't retrieve back</p>
                                </div>
                                <div className="flex justify-center items-center mt-5">
                                    <button className="bg-[#BC0101] cursor-pointer text-white rounded w-[150px] h-[30px]  font-[sfpro] text-[14px]" onClick={DeleteId}>Delete</button>
                                </div>

                </div>
            </div>
        </div>
        </>
    )
}
export default Deletepopup;