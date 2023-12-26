import React, { useContext }  from "react";
import { useState,useEffect} from "react";
import GlobalContext from "../../kanbanBoard/Calender/GlobalContext";
import dayjs from 'dayjs'
import Service from "../../../services/attendanceEntry/services";

const DayAttendance =({day})=>{
const [daySelected, setDaySelected]=useState(dayjs())
const [dbDataEmpDetails,setdbDataEmpDetails]=useState()
    function getCurrentDayClass() {
        // return daySelected.format("DD-MM-YYYY") == dbDataEmpDetails ? <img src="..//icons/Tick.svg"></img>
          // : "";
        // return day.format("DD") == dbDataEmpDetails ? <img src="..//icons/Tick.svg"></img>
        //   : "";   
      }
      // useEffect(() => {
      //   (async function Change() {
      //     try {
      //       await Service.getEmployeeDetails();
      //       await Service.getEmployeeDetails();
      //       await Service.getEmployeeDetails();
      //       const attendanceEntry = await Service.getEmployeeDetails();
      //       // setdbDataEmpDetails(attendanceEntry.EmployeeDetails)
      //       if(attendanceEntry.EmployeeDetails)
      //       {
      //         attendanceEntry.EmployeeDetails.filter(data=>data.Attendance)
      //       }

      //     } catch (err) {
      //       alert(JSON.stringify(err))
      //     }
      //   })()
      // }, [])

    return (
        <div onClick={() => {
            setDaySelected(day);
         
          }}>
            <header className="flex  items-center justify-center p-2  flex-row-reverse">

            <div className={`text-[12px]  text-center font-[sfpro-regular] rounded-md px-2`}>

            <p  className="font-[sfpro-regular]">
                  {day.format("ddd").toUpperCase()}

                </p>
            <p className={`flex  text-[12px] justify-center font-[sfpro-regular]  ${getCurrentDayClass()}`}>

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

export default DayAttendance;