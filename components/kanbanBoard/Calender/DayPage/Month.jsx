import React from "react";
import Day from "./Day";


const Month =({month , sendEvents})=>{

    

    const setEventModal=(data)=>{
           
        sendEvents(data)
    }

    return (
       <div className="w-[100%] flex ">
           <div className="flex  overflow-x-scroll scroll-smooth scrollBar cursor-pointer">
            {month.map((row, i)=>(
                <div key={i} className="flex ">
                 {row.map((day, idx)=>(
                    <Day day={day} key={idx} setEventModal={setEventModal} />
                 ))}

                </div>

            ))}

        </div>
       </div>
    )
}

export default Month;