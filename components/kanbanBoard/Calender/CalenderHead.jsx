import React, { useContext, useState } from "react";
import GlobalContext from "./GlobalContext";
import dayjs from 'dayjs'
import styles from "..//..//..//styles/kanbanBoard.module.css"
const CalenderHead = (props) => {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(
    dayjs().month()
  );

  
  const { monthIndex, setMonthIndex ,setSmallCalendarMonth } = useContext(GlobalContext)
  const [CalenderSearch, setCalenderSearch]=useState("")
  const [styleChange, setChangeColor]=useState('day')

 const [smallCalender, setSmallCalender]=useState()

 const handleChange=(e)=>{
  setSmallCalender(e.target.value)
  let newDate = new Date(e.target.value)
  let month = newDate.getMonth()
  setMonthIndex(month)
 }
 

  const handleSearch=(e)=>{
    setCalenderSearch(e.target.value)
  }
  function handlePrevMonth() {
    setMonthIndex(monthIndex - 1)
  }
  function handleNextMonth() {
    setMonthIndex(monthIndex + 1)
  }
  function handleReset() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }

 
   
  const refreshPage=()=> {
  setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  const setMonthChange=(data)=>{
    props.changingPath(data)
    if (data==="day") {
      
      setChangeColor(data)
    }
  }
  return (
    <header className="w-[100%] ">
      {/* <div className="flex justify-center">
      <div className="flex w-[90%] justify-between  items-center mt-5">
      <div>
            <h1 className=" text-[#080808] text-2xl font-[sfpro-bold]">Calender</h1>
      </div>

      <div className="bg-[#FFFFFF] w-[13%] text-[#9e2aff] font-[sfpro-medium] h-[6vh] rounded-sm flex items-center">
             <button onClick={handleReset} className="rounded-[4px] ml-2 border px-2 py-0.5 text-[#9e2aff] font-[sfpro-medium] border-[#9e2aff]">Today </button>
             <input type="date"
             id="insertDate"
             className={styles.datePickercalendar} onChange={handleChange}/>
      </div>

      <div className="w-[45%] flex bg-[#FFFFFF] p-2 rounded-[6px] border border-[#CDD4D9] ">
      <img src="../icons/Search-Icon.svg" alt="" className="w-4 opacity-[0.5]"  />
        <input type="search" name="search" id="" placeholder="Search by filter" className="bg-[#FFFFFF] w-[100%] ml-2 outline-none " onChange={handleSearch} />
      </div>
      <div className="flex w-[12%] justify-between">
        <button className="bg-white py-1 px-3  text-[#9e2aff] border font-[sfpro-medium] border-[#9e2aff] rounded-[4px]"  > Month</button>
        <button className={`${styleChange=='day' ? 'bg-[#E9E9E9] border text-[#09090999] font-[sfpro-medium] px-5 rounded-[4px]':'bg-[#E9E9E9] text-[#09090999] p-2 px-5 '}`} onClick={()=>setMonthChange("day")} >Day</button>
      </div>
      <div>
        <button className="bg-[#9e2aff] w-[90px] h-[5vh] text-[#FFFFFF] text-[15px] rounded-[3px] flex justify-evenly items-center" onClick={refreshPage}> 
        <img src="../icons/Referesh.svg" />
              Refresh</button>
      </div>
      </div>
      </div> */}
      <div className="flex justify-center mt-8">
      <div className="flex w-[90%] justify-between ">
        <button className="bg-[#FFFFFF] p-2 rounded-[4px] h-[6vh]" onClick={handlePrevMonth}>
          <span className="cursor-pointe items-center">
          <img src="../icons/LeftSide.svg" alt="" className="px-3 w-8 " />

          </span>

        </button>

        <div>
        <h1 className="text-[#00000087] font-[sfpro-medium]">
        {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
      </h1>
        </div>
        <button className="bg-[#FFFFFF] p-2 rounded-[4px]" onClick={handleNextMonth}>
          <span className="cursor-pointer items-center flex">
          <img src="../icons/RightSide.svg" alt="" className="px-3 w-8 " />
          </span>
        </button>
      </div>
      </div>
    </header>
  )
}
export default CalenderHead;