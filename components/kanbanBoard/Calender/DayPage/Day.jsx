import React from "react";

import dayjs from 'dayjs'
import { useContext } from "react";
import { useEffect } from "react";
import GlobalContext from "../GlobalContext";
import { useState } from "react";


const Day = ({ day  }) => {

    const [dayEvents, setDayEvents] = useState([])
    // const [show, setEventModal]=useState(false)

    // setEventModal


    const {
        setDaySelected,
        daySelected,
        setShowEventModal,
        filteredEvents,
        setSelectedEvent,
    } = useContext(GlobalContext);


    useEffect(() => {
        const events = filteredEvents.filter(
            (evt) =>
                dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
        );
        setDayEvents(events);
    }, [filteredEvents, day]);



    function getCurrentDay() {
        let date=daySelected.format("DD-MM-YY")
        return day.format("DD-MM-YY") === date ? 'text-[12px] p-1 text-center font-[sfpro-regular] bg-[#C4BFBF] rounded-md px-3 text-[#FFFFFF] text-[11px]' : ""
    }

    return (

        <div onClick={() => {
            setDaySelected(day);
         
          }}>
            <header className="flex  items-center ml-3 justify-center  ">

            <div className={`text-[12px] p-1 text-center font-[sfpro-regular] bg-[#FFFFFF] rounded-md px-3   ${getCurrentDay()} `}>

            <p  
                    >
                    {day.format("DD")}

                </p>
            <p className="flex text-[12px] font-[sfpro-regular]  ">
                    {day.format("ddd").toUpperCase()}
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

export default Day;