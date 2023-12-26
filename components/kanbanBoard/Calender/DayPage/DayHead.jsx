import React, { useContext, useEffect, useState } from "react";
import GlobalContext from "../GlobalContext";
import { getMonth } from "../util";
import styles from "..//..//..//..//styles/kanbanBoard.module.css";
import dayjs from 'dayjs';
import Month from "./Month";
import ProgressDesign from "./progressbar";
import Services from "../../../../services/kanbanBoard/service";




const DayHead = (props) => {

  const [dayEvents, setDayEvents] = useState([])

  const [show, setEventModal] = useState(false)

  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);
  let selectedDay = daySelected.format('YYYY-MM-DD')

  const [eventsModal, setEventModalValue] = useState(false)





  // const [development, setDevelopment] = useState([
  //   {
  //   title: "Development",
  //   discription: "Status Update - Sept 16 ' We are largely on trach as we completed Q1...", priority: "Medium"
  // },
  // {
  //   title: "Launch Experiment",
  //   discription: "Status Update - Sept 16 ' We are largely on trach as we completed Q1...", priority: "Medium"
  // }],[{
  //   title: "Development",
  //   discription: "Status Update - Sept 16 ' We are largely on trach as we completed Q1...", priority: "Medium"
  // },
  // {
  //   title: "Launch Experiment",
  //   discription: "Status Update - Sept 16 ' We are largely on trach as we completed Q1...", priority: "Medium"
  // }]);


  const [development, setDevelopment] = useState([])
  const [currenMonth, setCurrentMonth] = useState(getMonth())


  const { monthIndex, setMonthIndex } = useContext(GlobalContext)


  const [selectedMonthEvents, setSelectedMonthEvents] = useState(false)

  const [colorChange, setColorChange] = useState('Calender')

  const sendEvents = (data) => {
    setSelectedMonthEvents(data)
  }

  useEffect(() => {

    setCurrentMonth(getMonth(monthIndex))

  }, [monthIndex])



  const PrevMonth = () => {

    setMonthIndex(monthIndex - 1)
  }

  const NextMonth = () => {

    setMonthIndex(monthIndex + 1)
  }


  function handleReset() {
    setMonthIndex(

      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );

  }

  function Refresh() {
    setMonthIndex(
      monthIndex === dayjs().month()
        ? monthIndex + Math.random()
        : dayjs().month()
    );
  }
  const handleChange = (e) => {
    let newDate = new Date(e.target.value)
    let month = newDate.getMonth()
    setMonthIndex(month)
  }
  const setMonthDayChange = (data) => {
    props.changeValue(data)

    if (data === 'Calender') {

      setColorChange(data)

    }
  }



  useEffect(() => {

    (async function Change() {
      await Services.getKanbanBoardNewProjectHistory()
      await Services.getKanbanBoardNewProjectHistory()
      const kanbanBoardNewProjectHistory = await Services.getKanbanBoardNewProjectHistory();
      // setDevelopment(kanbanBoardNewProjectHistory.data)

      if (kanbanBoardNewProjectHistory.data) {
        const filterKanban = kanbanBoardNewProjectHistory.data.filter((data) => {
          if (selectedDay == data.periodOfTask) {
            return data;
          }
        });
        setDevelopment(filterKanban)
      }
    })()
  }, [selectedDay])

  function progressBar(data) {
    if (data) {

      let pendingTaskCount = 0;
      let completedTaskCount = 0;
      let totalTaskCount = 0;

      Object.entries(data).filter(([columnId, column], index) => {
        if (data[columnId].name == "To Do" || data[columnId].name == "In Progress") {
          pendingTaskCount += data[columnId].items.length
        } else if (data[columnId].name == "Completed") {
          completedTaskCount += data[columnId].items.length
        }

        totalTaskCount += data[columnId].items.length;
      });
      return Math.round(completedTaskCount == 0 && totalTaskCount == 0 ? 0 : (completedTaskCount / totalTaskCount) * 100)
    }
  }







  return (
    <div className="mt-3">
        
      <div>
        <h1 className="text-[#00000087] justify-center h-[6vh] flex font-[sfpro-medium]">
          {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
        </h1>
      </div>
      <div className=" flex justify-center ">
        <div className="flex w-[90%] justify-between items-center">
          <div className="flex  ">
            <button onClick={PrevMonth} className="bg-[#FFFFFF] rounded-md h-[6vh] md:h-[7vh] px-2">
              <img src="../icons/LeftSide.svg" alt="" className="px-3 w-8 " />
            </button>
          </div>
          <div className="md:w-[90%] w-[68%] lg:w-[84%] xl:w-[90%]  " >
            <Month month={currenMonth} sendEvents={sendEvents} />
          </div>
          <div>
            <button onClick={NextMonth} className="bg-[#FFFFFF] rounded-md h-[6vh] md:h-[7vh] px-2">
              <img src="../icons/RightSide.svg" alt="" className="px-3 w-8 " />
            </button>
          </div>
        </div>
      </div>
      {
        development.length == 0 ?
          <div className="bg-[#f4f5fa] h-[100vh] w-full flex justify-center items-center">
            <h1 className="md:text-[30px]  font-[sfpro-bold]  ">There are no plans on this date !</h1>
          </div> : <>
            <div className="w-full flex justify-around h-[100vh] items-center">
              <div className=" h-[93vh] bg-slate-600 max-w-[90%] rounded-[25px] flex overflow-x-scroll scroll-smooth scrollBar hide-scroll-bar ">
                <div className="flex flex-nowrap">
                  {development.map((value) => {
                    return <div className="w-[410px] ">
                      <div className="bg-white flex items-center justify-around h-[12vh] border-r-[2px] border-b-[2px] border-opacity-[0.4] border-[#707070] w-full">
                        <div className="flex h-[12vh] w-[80%] flex-row justify-between items-center">
                          <h1 className="text-[20px] font-[sfpro-medium]">{value.projectName}</h1>
                          <div className="flex w-[49%] flex-row justify-between items-center">
                            <div className="bg-[#E2E2E2] rounded-full w-[77%] h-[1.5vh]">
                              <div className="bg-[#9e2aff]  h-[1.5vh] rounded-full" style={{ width: `${progressBar(value.taskList)}%` }}>
                              </div>
                            </div>
                            <h1 className="text-[15px] font-[sfpro-medium]">{progressBar(value.taskList)}%</h1>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white pt-5  h-[81vh] flex items-start justify-around border-r-[2px] border-opacity-[0.4] border-[#707070] w-full">
                        <div className="w-[80%] h-[72vh] overflow-y-auto scrollBar scroll-smooth">
                          {Object.entries(value.taskList).map(([columnId, column], index) => {
                            return column.items.map((ele) => {
                              return <div className="flex pb-6 flex-row justify-between items-start">
                                <div className="w-[71%]">
                                  <h1 className="text-[19px] w-[85%] truncate font-[sfpro-medium]">{ele.taskTitle}</h1>
                                  <h2 className="font-[sfpro-medium] w-[100%] text-[13px]">{ele.description}</h2>
                                </div>
                                <div className={`${ele.priority == 'Medium' ? 'rounded-full w-[30%] h-6 flex justify-around items-center text-white bg-[#66BB6A]' : ele.priority == 'Low' ? 'rounded-full w-[30%] h-6 flex justify-around items-center text-white bg-[#fbbf24]' : "rounded-full w-[30%] h-6 flex justify-around items-center text-white bg-[#EF5350]"}`}>
                                  <h1 className="text-[white] text-[15px] font-[sfpro-medium]">{ele.priority}</h1>
                                </div>
                              </div>
                            })
                          })}


                        </div>
                      </div>
                    </div>
                  })}
                </div>
              </div>
            </div>
          </>
      }


      {/* list */}

      {/* </div> */}

      {/* </div> */}


    </div>
  )
}

export default DayHead;