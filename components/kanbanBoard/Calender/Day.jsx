import dayjs from "dayjs";
import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "./GlobalContext";
import Services from "../../../services/kanbanBoard/service";
export default function Day({ day, rowIdx }) {
  const [dayEvents, setDayEvents] = useState([]);


  // const { monthIndex, setMonthIndex  } = useContext(GlobalContext)

  const [filteredEvents, setfilteredEvents]=useState([])

  const { setSelectedCardValue, setSelectedCardId } = useContext(GlobalContext)
 
  useEffect(() => {
    const events = filteredEvents.filter(
      (evt) =>
        dayjs(evt.periodOfTask).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvents(events);
  }, [filteredEvents, day]);

  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? "bg-blue-600 text-[#FFFFFF] text-center rounded-full w-7"
      : "";
  }


  useEffect(() => {
    (async function Change(){
        const kanbanBoardNewProjectHistory=await Services.getKanbanBoardNewProjectHistory();
        if(kanbanBoardNewProjectHistory.data == undefined){
          setfilteredEvents([])
        }else{
          setfilteredEvents(kanbanBoardNewProjectHistory.data) 
           
  
        
        }    
        
    })()
   
      

   
},[])








  // function DayClass() {
  //   return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY"): "";
  // }
  return (
    // <div className="flex items-center">
    <div className="w-[100%] pt-5">
      <header className="flex flex-col over ">
        {rowIdx === 0 && (
          <p className="text-sm font-[sfpro-bold]  text-[#00000087]  ">
            {day.format("ddd").toUpperCase()}
          </p>
        )}
        <p onClick={() => {

        }}
          className={`text-sm font-[sfpro-bold] border-[#E9E9E9] border-t-2 w-[96%] ${getCurrentDayClass()}`}
        >
          {day.format("DD")}
          
        </p>

     
      
      </header>
      <div
        className="flex flex-col  justify-between overflow-y-auto scrollBar  p-0 md:p-[10px] cursor-pointer h-[15vh]"
      >
        {dayEvents.map((data, idx) => (

    

          <div
            key={idx}
            className={`${data.priority == 'High' ? `bg-[#EF5350] text-white pl-1 w-[90%] mb-[5px]  text-sm rounded flex justify-center ` : data.priority == 'Low' ? `bg-[#FFC107] mb-[5px] text-white pl-1 w-[90%]  text-sm rounded flex justify-center `:`bg-[#66BB6A] text-white pl-1 w-[90%]  mb-[5px] text-sm rounded flex justify-center `}`}
          >
            <p className="w-[100%] p-0 md:text-[15px] text-[9.5px] md:p-[10px] text-left text-sm font-[sfpro-light] text-[#FFFFFF]" onClick={()=>setSelectedCardId(data.id)}>{data.projectName}</p>

        
            
    
            
          </div>
        ))}
      </div>


    </div>
    // </div>
  );
}