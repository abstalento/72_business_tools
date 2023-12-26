import { useEffect, useState } from "react";
import BtoolsHeader from "../../../container/72BTheader/BToolsHeader";
import Calender from "../Calender/calender";
import ContextWrapper from "../Calender/ContactWrapper";
import EventModal from "../Calender/EventModal";
import CommonPage from "../Common-Page/CommonPage";
import OverHeader from "../overview/overviewhead";
import Projects from "../projects/projects";
import ArchivePage from "../Archived Page/ArchivedPage";
import ArchiveHeader from "../Archived Page/archiveHead";
import Services from "../../../services/kanbanBoard/service";
import React, { useContext } from "react";
// import GlobalContext from "./GlobalContext";
import dayjs from 'dayjs'
import styles from "..//..//..//styles/kanbanBoard.module.css"
//import { BrowserRouter,Router,Route,Routes } from "react-router-dom";
// import { BrowserRouter,Router,Route,Routes } from "react-router-dom";
import CalenderHead from "../Calender/CalenderHead";
import GlobalContext from "../Calender/GlobalContext";
import SmallCalendar from "./smallCal";
import { getMonth } from "../Calender/util";

const NewApplication = (props) => {




   //   <Router>
   //   <Routes>
   //     <Route path="../projects/projects" element={<Projects />} />
   //   </Routes>
   // </Router>
const {selectedCardId} =useContext(GlobalContext)
   const [activeComponent, setActiveComponent] = useState("Overview");

   const [ProjectTextColor, setProjectTextColor] = useState(false);
   const [userId, setUserId] = useState()
   const [OverviewTextColor, setOverviewTextColor] = useState('#3D5AFE');

   const [CalenderTextColor, setCalenderTextColor] = useState(false);
   const [ArchivedTextColor, setArchivedTextColor] = useState(false);

   const [saveData, setSaveData] = useState(false)

   const [setUseEffect, setUseEffectFun] = useState(0)
   //overhead

   const [search, setSearch] = useState("");
   const [getSearch, setSearchValue] = useState("");
   const [showModal, setShowModal] = useState(false);
   const [grid, setGrid] = useState(true);
   const [selectDate, setSelect] = useState();
   const [selectDay, setSelectedDay] = useState();
   const [dbData, setDbData] = useState()
   const [SearchValueData, setSearchValueData] = useState(false)
  const [dateValue, setDate]=useState(false)
   const [dbDataValue, setDbDataValue] = useState()
   const [menu, setMenu] = useState(false)

   var newdate = new Date()
   var month = newdate.getMonth()
   var date = newdate.getDate()
   var monthText = newdate.toLocaleString('en', { month: 'long' })
   var year = newdate.getFullYear()
   var dateFormat = month >= 9 ? (month + 1) : "0" + (month + 1)
   var format = year + "-" + dateFormat


   const { monthIndex, setMonthIndex, setSmallCalendarMonth } = useContext(GlobalContext)
   const [CalenderSearch, setCalenderSearch] = useState("")
   const [styleChange, setChangeColor] = useState()
   const [array, setArray] = useState()
   const [arrayCom, setComArray] = useState()


   const [ArchivePenarray, setArchiveArray] = useState()
   const [ArchiveComarrayCom, setArchiveComComArray] = useState()

   const sendCountLengths = (data) => {
      setArray(data)
   }
const dateData=()=>{
   setDate(!dateValue)
}

// const setCloseDate=()=>{
//    setDate(false)
// }
   const sendComCountLengths = (data) => {
      setComArray(data)
   }

   const sendCountLength = (data) => {
      setArchiveArray(data)
   }

   const sendComCountLength = (data) => {
      setArchiveComComArray(data)
   }




   const handleChange = (e) => {
      setSelect(e.target.value)


   }

   const handleChangeDate = (e) => {
      setSelectedDay(e.target.value)
   }
   const searchBtn = () => {
      setSearch(getSearch)
      setSearchValueData(true)

   }

   //  const projectUuid = (data) => {
   //     props.projectId(data)
   //  }

   const sendvalue = () => {
      props.projectId(data)
   }


   let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
   let now = new Date();
   let thisMonth = months[now.getMonth()]

   useEffect(() => {
      (async function Change() {
         await Services.getKanbanBoardNewProjectHistory()
         await Services.getKanbanBoardNewProjectHistory()
         const kanbanBoardNewProjectHistory = await Services.getKanbanBoardNewProjectHistory()
         if (kanbanBoardNewProjectHistory.data) {
            setDbData(kanbanBoardNewProjectHistory.data)
         } else {
            setDbData()
         }
      })()


   }, [array, arrayCom])

   const setUseEffectCall = () => {
      setUseEffectFun((preState) => ++preState)
   }
   useEffect(() => {
      (async function Change() {
         await Services.getKanbanBoardArchive()
         await Services.getKanbanBoardArchive()
         const kanbanBoardNewProjectHistory = await Services.getKanbanBoardArchive()
         if (kanbanBoardNewProjectHistory.data) {
            setDbDataValue(kanbanBoardNewProjectHistory.data)
         } else {
            setDbDataValue()
            setArchiveArray(0)
            setArchiveComComArray(0)
         }
      })()
   }, [ArchivePenarray, setUseEffect])




   //calender

   const [currentMonthIdx, setCurrentMonthIdx] = useState(
      dayjs().month()
   );
 

  
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    useEffect(() => {
      setCurrentMonth(getMonth(currentMonthIdx));
    }, [currentMonthIdx]);
  
    const {
    
      setDaySelected,
      daySelected,
    } = useContext(GlobalContext);
  
  
    function handlePrevMonth() {
      setCurrentMonthIdx(currentMonthIdx - 1);
    }
    function handleNextMonth() {
      setCurrentMonthIdx(currentMonthIdx + 1);
    }
    function getDayClass(day) {
      const format = "DD-MM-YY";
      const nowDay = dayjs().format(format);
      const currDay = day.format(format);
      const slcDay = daySelected && daySelected.format(format);
      if (nowDay === currDay) {
        return "bg-blue-500 rounded-full text-white";
      } else if (currDay === slcDay) {
        return "bg-blue-100 rounded-full text-blue-600 font-bold";
      } else {
        return "";
      }
    }







   useEffect(() => {
      setCurrentMonthIdx(monthIndex);
    }, [monthIndex]);
  

   const [changingPath, setChangingPath] = useState("Calender")

   const handleChangeValue = (e) => {
      let newDate = new Date(e.target.value)
      let month = newDate.getMonth()
      setMonthIndex(monthIndex + 1)
   }



   function handleReset() {
      setMonthIndex(
         monthIndex === dayjs().month()
            ? monthIndex + Math.random()
            : dayjs().month()
      );
   }

   const setMenuValue = () => {
      setMenu(!menu)
   }
   const closeSidebar = () => {
      setMenu(false)
   }

   const refreshPage = () => {
      setMonthIndex(
         monthIndex === dayjs().month()
            ? monthIndex + Math.random()
            : dayjs().month()
      );
   }
   const setMonthChange = (data) => {
      setChangingPath(data)
      if (data === "day") {

         setChangeColor(data)
      } else {
         setChangeColor(data)
      }
   }




   const handleTabClick = (component) => {
      switch (component) {
         case "Overview":
            setProjectTextColor(false);
            setOverviewTextColor(true);
            setCalenderTextColor(false);
            setArchivedTextColor(false)

            break;
         case "Projects":
            setOverviewTextColor(false);
            setCalenderTextColor(false);
            setProjectTextColor(true);
            setArchivedTextColor(false)
            break;
         case "Calender":
            setCalenderTextColor(true);
            setProjectTextColor(false);
            setOverviewTextColor(false);
            setArchivedTextColor(false)
            setSaveData(true);
            break;

         case "Archived":
            setCalenderTextColor(false);
            setProjectTextColor(false);
            setOverviewTextColor(false);
            setArchivedTextColor(true)

            break;
      }

      setActiveComponent(component);
   };

   const projectIdValue = (data) => {
      setUserId(data)
      handleTabClick('Projects')
   }

   useEffect(()=>{
      if (selectedCardId==undefined) {
         handleTabClick('Overview')
      }else{
         handleTabClick('Projects')
      }
     
   },[selectedCardId])
   const backPage = (data) => {
      handleTabClick("Overview")
   }
   const renderComponent = {


      Overview: <OverHeader onNext={() => setActiveComponent("Overview")} closeSidebar={closeSidebar} showModalPopup={showModal} setShowModalClose={() => setShowModal(false)} projectUuidData={projectIdValue} searchValue={getSearch} sendCountLength={sendCountLengths} sendComCountLength={sendComCountLengths} selectDateValue={selectDate} sendGrid={grid} SearchValueData={SearchValueData} getSearch={getSearch} />,
      Projects: <Projects setclosemenuitem={closeSidebar} userData={userId} backPage={backPage} onNext={() => setActiveComponent("Projects")} />,
      Calender: <><Calender closemenuitem={closeSidebar} changingPath={changingPath} onNext={() => setActiveComponent("Calender")} /> <EventModal saveData={saveData} /></>,
      Archived: <ArchiveHeader onNext={() => setActiveComponent("Archived")} clodeMenuitem={closeSidebar} showModalPopup={showModal} setShowModalClose={() => setShowModal(false)} setUseEffectCall={setUseEffectCall} gridValue={grid} projectUuidData={projectIdValue} searchValue={getSearch} sendCountLength={sendCountLength} sendComCountLength={sendComCountLength} selectDayValue={selectDay} sendGrid={grid} />,
      "": null,
   };

   return (
      <div className="">
         {
            activeComponent == "Projects" ? <div> <BtoolsHeader Src="../icons/KanbanBoardLogo.svg" Height="50" Width="83" /> </div> : ""
         }


         {activeComponent == 'Overview' ?

            <div className=" " >
               <div className="flex justify-between bg-[#FFFFFF] border-[#B9B9B9] items-center">

                  <BtoolsHeader Src="../icons/KanbanBoardLogo.svg" Height="50" Width="83" />
                  <div className=" md:flex md:items-center md:justify-around lg:w-[126px] md:w-[10%] hidden">
                     <input type="month" className="w-full cursor-pointer outline-none font-[sfpro-medium] bg-[#F4F5FA] p-1.5 rounded-[7px]" onChange={handleChange} value={selectDate ? selectDate : format} readOnly={dbData == undefined ? true : false} ></input>
                  </div>
                  <div className="hidden md:block">
                     <img alt="btLineLogo" src="/icons/lineIcon.svg" className="h-10  " />
                  </div>
                  <div className="lg:flex lg:items-center   lg:w-[10%] xl:w-[25%] lg:justify-between hidden ">
                     <div className="flex  xl:w-[53%] ">
                        <img src="../icons/check-circle.svg" alt="" className="w-4 " />
                     
                        <h2 className="flex text-[#000000] ml-1 font-[sfpro-medium] ">{arrayCom ? arrayCom : 0} <span className="lg:hidden md:hidden xl:block ml-1"> Projects Completed</span> </h2>
                     </div>
                     <div className="flex ">
                        <img src="../icons/sandclock.svg" alt="" className="w-4" />

                        <h2 className="text-[#000000] flex ml-2 font-[sfpro-medium]">{array ? array : 0} <span className="lg:hidden md:hidden xl:block ml-1">Projects Pending</span> </h2>
                     </div>
                  </div>
                  <div className="block md:hidden">

                     <div className=" bg-[#F4F5FA]  p-1 ">



                        {
                           grid == true ? <div className="flex items-center"> <div onClick={() => { setGrid(true) }} className="">
                              <img src="../icons/GridViewBlue.svg" alt="" className="w-8 " />
                           </div>

                              <div className=" flex ml-2" onClick={() => setGrid(false)}  >
                                 <img src="../icons/ListViewWhite.svg" alt="" className="w-8" />
                              </div></div> : ""
                        }

                        {
                           grid == false ? <div className="flex items-center  "><div onClick={() => setGrid(true)} className="">
                              <img src="../icons/GridViewWhite.svg" alt="" className="w-8" />
                           </div>

                              <div className="ml-2" onClick={() => setGrid(false)}  >
                                 <img src="../icons/ListViewBlue.svg" alt="" className="w-8 " />
                              </div> </div> : ""
                        }


                     </div>

                  </div>
                  <div className="bg-[#F4F5FA] opacity-1 md:h-10 md:w-[25%] md:flex md:rounded-md items-center hidden " >
                     <img src="../icons/Search-Icon.svg" alt="" className="md:px-2 md:w-8 md:opacity-[0.4] w-3 ml-2  md:block" />
                     <input type="search" placeholder="Search projects...." readOnly={dbData == undefined ? true : false} className="md:w-full outline-none border-none bg-[#F4F5FA] text-[#000000] ml-2  w-[100%]" name="search" onChange={(e) => setSearchValue(e.target.value.toLowerCase())} />
                     <button className="bg-[#9e2aff] text-[#FFFFFF] rounded-md md:py-0.5 md:px-5 hidden md:block font-[sfpro-regular] mr-2" onClick={searchBtn}>Search</button>
                  </div>

                  <div className="md:bg-[#F4F5FA] xl:w-[6.5%] 2xl:w-[5.5%] md:w-[11%] lg:w-[8.5%] md:h-[6vh] md:flex md:rounded-md md:justify-around md:cursor-pointer hidden">



                     {
                        grid == true ? <div className="flex items-center"> <div onClick={() => setGrid(true)} className="">
                           <img src="../icons/GridViewBlue.svg" alt="" className="w-8 " />
                        </div>

                           <div className=" flex ml-2" onClick={() => setGrid(false)}  >
                              <img src="../icons/ListViewWhite.svg" alt="" className="w-8" />
                           </div></div> : ""
                     }

                     {
                        grid == false ? <div className="flex items-center  "><div onClick={() => setGrid(true)} className="">
                           <img src="../icons/GridViewWhite.svg" alt="" className="w-8" />
                        </div>

                           <div className="ml-2" onClick={() => setGrid(false)}  >
                              <img src="../icons/ListViewBlue.svg" alt="" className="w-8 " />
                           </div> </div> : ""
                     }


                  </div>
                  <div className="flex items-center md:mr-5 mr-4 md:w-[12%] md:h-[5vh] rounded-[5px] font-[sfpro-regular] w-[9%] h-[4.2vh] bg-[#9e2aff] justify-evenly cursor-pointer" onClick={() => setShowModal(true)}>
                     <div className="hidden md:block">
                        <h1 className="text-[#FFFFFF] font-[sfpro-regular] lg:text-[12px] md:text-[9px] xl:text-[15px]">Create New Project </h1>
                     </div>
                     <div>
                        <img src="../icons/createplus.svg" alt="" />
                     </div>
                  </div>
               </div>

               <div className="min-h-[7vh] max-h-[10vh] w-[100%] items-center flex justify-center bg-[#FFFFFF] md:hidden">

                  <div className="w-[90%] items-center flex justify-between  h-[6vh] ">
                     <div className="w-[10%] " >
                        {
                           menu ?  <img src="/images/closedark.png" width="20" onClick={setMenuValue}/> :<img src="/images/menu.png" className="w-[88%]" onClick={setMenuValue} ></img>
                        }
                     
                        
                     </div>
                    <div className="w-[30%]"> 
                    <input type="month" className="w-full cursor-pointer outline-none font-[sfpro-medium] bg-[#F4F5FA] p-1 rounded-[7px]" onChange={handleChange} value={selectDate ? selectDate : format} readOnly={dbData == undefined ? true : false} ></input>

                    </div>

                     <div className="bg-[#F4F5FA] opacity-1 flex rounded-md items-center p-1 w-[50%]  " >
                        <img src="../icons/Search-Icon.svg" alt="" className="md:px-2 md:w-8 md:opacity-[0.4] w-3 ml-2  md:block" />
                        <input type="search" placeholder="Search projects...." readOnly={dbData == undefined ? true : false} className="md:w-full outline-none border-none bg-[#F4F5FA] text-[#000000] ml-2  w-[100%]" name="search" onChange={(e) => setSearchValue(e.target.value.toLowerCase())} />
                        <button className="bg-[#9e2aff] text-[#FFFFFF] rounded-md md:py-0.5 md:px-5 hidden md:block font-[sfpro-regular] mr-2" onClick={searchBtn}>Search</button>
                     </div>
                  </div>
               </div>

            </div> : ""}


         {activeComponent == 'Archived' ? <div className="md:flex ">
            <div>
               <BtoolsHeader Src="../icons/KanbanBoardLogo.svg" Height="50" Width="83" />
            </div>
            <div className="hidden md:flex md:w-[85%] md:justify-around md:items-center">
               <div className=" flex items-center justify-around  w-[15%]">
                  <input type="month" className="w-full cursor-pointer outline-none font-[sfpro-medium] bg-[#F4F5FA] p-1.5 rounded-[7px]" readOnly={dbDataValue == undefined ? true : false} onChange={handleChangeDate} value={selectDay ? selectDay : format}  ></input>
               </div>
               <div className="">
                  <img alt="btLineLogo" src="/icons/lineIcon.svg" className="h-10  " />
               </div>
               <div className="flex items-center lg:w-[21%] xl:w-[30%] w-[30%]  justify-around">
                  <div className="flex  xl:w-[50%]  ">
                     <img src="../icons/check-circle.svg" alt="" className="w-4" />

                     <h2 className=" text-[#000000] flex ml-1 font-[sfpro-medium] ">{ArchiveComarrayCom ? ArchiveComarrayCom : 0}  <span className="lg:hidden md:hidden xl:block ml-1"> Projects Completed</span> </h2>
                  </div>
                  <div className="flex  ">
                     <img src="../icons/sandclock.svg" alt="" className="w-4" />

                     <h2 className="text-[#000000] flex ml-2 font-[sfpro-medium]">{ArchivePenarray ? ArchivePenarray : 0}<span className="lg:hidden md:hidden xl:block ml-1">Projects Pending</span></h2>
                  </div>
               </div>
               <div className="bg-[#F4F5FA] opacity-1 h-10 lg:w-[60%] w-[50%] xl:w-[50%] flex rounded-md items-center" >
                  <img src="../icons/Search-Icon.svg" alt="" className="px-2 w-8 opacity-[0.4]" />
                  <input type="search" placeholder="Search projects...." className="w-full outline-none border-none bg-[#F4F5FA] text-[#000000]" name="search" readOnly={dbDataValue == undefined ? true : false} onChange={(e) => setSearchValue(e.target.value.toLowerCase())} />
                  <button className="bg-[#9e2aff] text-[#FFFFFF] rounded-md py-0.5 px-5 font-[sfpro-regular] mr-2" onClick={searchBtn}>Search</button>
               </div>
            </div>
            <div className="w-[100%] flex justify-center h-[7vh] md:hidden">
               <div className=" flex justify-between items-center w-[90%] h-[6vh]"> 
               <div className=" " >
                       {
                           menu ?  <img src="/images/closedark.png" width="20" onClick={setMenuValue}/> :<img src="/images/menu.png" width="25"  onClick={setMenuValue} ></img>
                        }
                     </div>
                    <div className="w-[30%]">
                    <input type="month" className="w-full cursor-pointer outline-none font-[sfpro-medium] bg-[#F4F5FA] p-1.5 rounded-[7px]" readOnly={dbDataValue == undefined ? true : false} onChange={handleChangeDate} value={selectDay ? selectDay : format}  ></input>
                      </div>
                     
                     <div className="bg-[#F4F5FA] opacity-1 h-9 w-[50%] flex rounded-md items-center" >
                  <img src="../icons/Search-Icon.svg" alt="" className="px-2 w-7 opacity-[0.4]" />
                  <input type="search" placeholder="Search projects...." className="w-full outline-none border-none bg-[#F4F5FA] text-[#000000]" name="search" readOnly={dbDataValue == undefined ? true : false} onChange={(e) => setSearchValue(e.target.value.toLowerCase())} />
                 
               </div>
               </div>
                </div>
         </div> : ""}

         {activeComponent == "Calender" ? <div>

            <div className="md:flex md:items-center flex items-center ">
               <div>
                  <BtoolsHeader Src="../icons/KanbanBoardLogo.svg" Height="50" Width="83" />
               </div>
               <div className=" hidden md:w-[90%] lg:items-center md:flex justify-evenly">
                  <div>
                     <h1 className=" text-[#080808] text-2xl font-[sfpro-bold]">Calender</h1>
                  </div>

                  <div className="bg-[#FFFFFF] lg:w-[23%] xl:w-[18%] 2xl:w-[16%]  text-[#9e2aff] font-[sfpro-medium] rounded-sm flex items-center justify-between ">
                     <button className="rounded-[4px] p-1 px-2 border  text-[#9e2aff] font-[sfpro-medium] border-[#9e2aff]" onClick={handleReset}>Today </button>
                     <p className="text-[#00000087] font-[sfpro-medium] cursor-pointer  flex" onClick={dateData}>
                      {dayjs(new Date(dayjs().year(), currentMonthIdx)).format(
                                "MMMM YYYY"
                       )}
                        {
                           dateValue ? <img src="../icons/LeftSide.svg" alt="" className="px-3 rotate-90 w-8 cursor-pointer " /> :  <img src="../icons/RightSide.svg" alt="" className="cursor-pointer rotate-90 px-3 w-8 " />
                        } 
                        </p>
                     {/* <input type="date"
                        id="insertDate"
                        className={styles.datePickercalendar} onChange={handleChangeValue} /> */}
                        {
                           dateValue && <div className="absolute cursor-pointer z-40 top-[51px] w-[15%] "><SmallCalendar setCloseDate={()=>setDate(false)}/>    </div>
                        }
                       {/* <div className="">  </div> */}
                  </div>
                  <div className="w-[45%] xl:w-[45%] flex  justify-around lg:w-[30%]">
                     {/* <img src="../icons/Search-Icon.svg" alt="" className="w-4 opacity-[0.5]" />
                     <input type="search" name="search" id="" disabled placeholder="Search by filter" className="bg-[#FFFFFF] w-[100%] outline-none ml-2" /> */}
                  </div>
                  <div className="flex w-[12%] xl:w-[13%] lg:w-[18%] justify-between">
                     <button className={`${styleChange == 'Calender' ? "bg-white py-1 px-3  text-[#9e2aff] border font-[sfpro-medium] border-[#9e2aff] rounded-[4px] " : styleChange == 'day' ? " py-1 px-3 bg-[#E9E9E9] text-[#9e2aff] border font-[sfpro-medium] rounded-[4px]" : "bg-white py-1 px-3  text-[#9e2aff] border font-[sfpro-medium] border-[#9e2aff] rounded-[4px]"}`} onClick={() => setMonthChange("Calender")}> Month</button>
                     <button className={`${styleChange == 'day' ? 'bg-white py-1 px-5  text-[#9e2aff] border font-[sfpro-medium] border-[#9e2aff] rounded-[4px] ' : styleChange == 'Calender' ? " bg-[#E9E9E9] text-[#9e2aff] border font-[sfpro-medium] rounded-[4px]  py-1 px-5" : "py-1 px-5 bg-[#E9E9E9] text-[#9e2aff] border font-[sfpro-medium] rounded-[4px]"}`} onClick={() => setMonthChange("day")} >Day</button>
                  </div>
                  <div>
                     <button onClick={refreshPage} className="bg-[#9e2aff] w-[90px] lg:h-[4.5vh] h-[5vh] text-[#FFFFFF] text-[15px] rounded-[3px] flex justify-evenly items-center">
                        <img src="../icons/Referesh.svg" />
                        Refresh</button>
                  </div>

               </div>
               <div className="md:hidden  w-[46%]">
                  <div className="flex w-[100%] justify-around">
                     <button className={`${styleChange == 'Calender' ? "bg-white py-1 px-3  text-[#9e2aff] border font-[sfpro-medium] border-[#9e2aff] rounded-[4px] " : styleChange == 'day' ? " py-1 px-3 bg-[#E9E9E9] text-[#9e2aff] border font-[sfpro-medium] rounded-[4px]" : "bg-white py-1 px-3  text-[#9e2aff] border font-[sfpro-medium] border-[#9e2aff] rounded-[4px]"}`} onClick={() => setMonthChange("Calender")}> Month</button>
                     <button className={`${styleChange == 'day' ? 'bg-white py-1 px-5  text-[#9e2aff] border font-[sfpro-medium] border-[#9e2aff] rounded-[4px] ' : styleChange == 'Calender' ? " bg-[#E9E9E9] text-[#9e2aff] border font-[sfpro-medium] rounded-[4px]  py-1 px-5" : "py-1 px-5 bg-[#E9E9E9] text-[#9e2aff] border font-[sfpro-medium] rounded-[4px]"}`} onClick={() => setMonthChange("day")} >Day</button>
                  </div>

               </div>
            </div>

            <div className=" flex items-center justify-center  md:hidden h-[6vh]   w-[100%]">
              <div className=" items-center flex justify-between h-[6vh] w-[90%] ">
              <div className="w-[20%] " >
                       {
                           menu ?  <img src="/images/closedark.png" width="20" onClick={setMenuValue}/> :<img src="/images/menu.png" className="w-[38%]" onClick={setMenuValue} ></img>
                        }
                     </div>
                     <div> 
                        <h1 className="text-[20px] font-[sfpro-bold]">Calender</h1>
                     </div>
                     <div className="">
                     <button onClick={refreshPage} className="bg-[#9e2aff] w-[80px] h-[4.5vh] text-[#FFFFFF] text-[15px] rounded-[3px] flex justify-evenly items-center">
                        <img src="../icons/Referesh.svg" />
                        Refresh</button>
                  </div>
                </div>
            </div>
         </div> : ""}
         {
            activeComponent == ""
         }
         <CommonPage
            onTabClick={handleTabClick}
            ProjectTextColor={ProjectTextColor}
            OverviewTextColor={OverviewTextColor}
            CalenderTextColor={CalenderTextColor}
            ArchivedTextColor={ArchivedTextColor}
            menu={menu}
         >
            {renderComponent[activeComponent || ""]}

         </CommonPage>
      </div>

   );
};

export default NewApplication;
