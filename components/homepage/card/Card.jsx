import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
export default function Card(props) {
  const router = useRouter()
  const {title} = router.query
  const handleClick=(path)=>{
   router.push(path)

  }
   return (
    <>
      <div className="flex   ">
        <div className="flex  gap-3  my-2 ">
          <div className="rounded-2xl  border w-[315px] h-[90px] bg-white flex flex-row" onClick={()=>handleClick(props.path)}>
            <div className={props.style}>
              
              <div className="flex justify-center cursor-pointer items-center w-[100%] h-12">
                <Image src={props.image} alt="image" className=" text-center" />
              </div>
            </div>
            <div className={`w-3/4 flex ${props?.divStyle}`}>
              <button disabled={props?.disable} className="flex flex-col justify-center" 
              
              >
                <p className="font-['Sf-pro-semibold'] text-[16px] text-black opacity-100">
                  {props.title}
                </p>
                <p className="text-sm font-['Sf-pro-light'] text-black text-left pr-[4px]">
                  {props.description}
                </p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

