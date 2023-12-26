
import dayjs from 'dayjs'
import React, { useState } from "react";

const DashAttendance=({day})=>{
    const [daySelected, setDaySelected]=useState(dayjs())

   const sendValue=()=>{

     day.format("DD")==10 ? 'bg-white': ""
   }
   function getCurrentDayClass() {
    return day.format("DD") == 12 ? "bg-blue-600 text-[#FFFFFF] text-center rounded-full w-7"
      : "";

    
  }
    return (
        <div onClick={() => {
            setDaySelected(day);
            sendValue()
          }}>
            <header className="flex  items-center justify-center ">

            <div className={`text-[12px]  text-center font-[sfpro-regular] rounded-md px-1.5`}>

            <p  
                    >
                  {day.format("ddd").toUpperCase()}

                </p>
            <p className={`flex text-[12px] justify-center font-[sfpro-regular] ${getCurrentDayClass()}`}
            >

            {day.format("DD")}
                 
                </p>       
            </div>
            </header>
        
            {/* {
                show ? <div
                >  {dayEvents.map((data, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedEvent(data) }
                            className={` text-white pl-1 w-[90%]  text-sm rounded flex justify-center `}> 
                            <p className="bg-black">{data.title}</p>
                        
                        </div>
                    ))}
                </div> :null
            } */}
            


        </div>
    )
}

export default DashAttendance;