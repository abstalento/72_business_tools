import React, { useContext, useEffect, useState } from "react";
import Day from "../../kanbanBoard/Calender/Day";
import GlobalContext from "../../kanbanBoard/Calender/GlobalContext";
import OverAllHeader from "../Header/Header";
import { getMonthAttendance } from "./utilss";
import DayAttendance from "./Week";
import dayjs from "dayjs";
import PouchDB from "pouchdb";
import Service from "../../../services/attendanceEntry/services";
import { App } from "../DashBoard/Calendar";
// import PdfContentAttendance from "../pdfcontiner/pdfContentAttendnacePage";

const Attendance = ({
  Attendances,
  sendEmployee,
  setMenuItem,
  setMenuItemValueDataaClose,
}) => {
  const { setSentCalenderData, setSentUseffectCall } =
    useContext(GlobalContext);
  const [currenMonth, setCurrentMonth] = useState(getMonthAttendance());
  const [Present, setPresent] = useState();
  const [AttendanceDetails, setAttendanceDetails] = useState([]);
  const [count, setCount] = useState();
  const [selectData, setSelectData] = useState();
  const [presentData, setPresentData] = useState();
  const [indexdata, setIndexData] = useState();
  const [attendanceType, setAttendanceType] = useState();
  const [overallIndex, setOverAllIndex] = useState();
  const [searchEmp, setSearchEmp] = useState();
  const [attMonth, setattMonth] = useState("");
  const [monYear, setMonYear] = useState();
  const [calendarData, setCalendarData] = useState([]);
  const getCurrent = () => {
    let data = 1 ? "color:white" : "";
  };
  const date = new Date();
  var day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let myDate =
    month >= 9
      ? day + "-" + month + "-" + year
      : day + "-" + "0" + month + "-" + year;
  let currentDate = `${myDate}`;
  let myMonth = month >= 9 ? month : "0" + month;
  let monthYear = myMonth + "-" + year;
  let formattedMonthAndYear = year + "-" + myMonth;

  const AttendanceStatus = async (data, index) => {
    let clonedAttendance = [...AttendanceDetails];
    if (clonedAttendance[index].Attendance.length > 0) {
      let attendanceIndex = clonedAttendance[index].Attendance.findIndex(
        (data) => data.date == currentDate
      );
      if (attendanceIndex >= 0) {
        clonedAttendance[index].Attendance[attendanceIndex].status = data;
      } else {
        clonedAttendance[index].Attendance.push({
          status: data,
          date: currentDate,
        });
      }
    } else {
      clonedAttendance[index].Attendance.push({
        status: data,
        date: currentDate,
      });
    }
    setAttendanceDetails(clonedAttendance);
    await NameKeyPress(clonedAttendance);
    setSentUseffectCall(clonedAttendance);
  };

  useEffect(()=>{
    setSentUseffectCall(AttendanceDetails);
  },[AttendanceDetails])
  const onTotalAttendanceCount = (attendance, monthYear) => {
    let totPresent = 0,
      totAbsent = 0,
      totPA = 0,
      totHA = 0;
    let clonedAttMonth = attMonth.split("-");
    let ReverseAttMonth = `${clonedAttMonth[1]}-${clonedAttMonth[0]}`;
    attendance.map((att) => {
      let data = att.date.includes(ReverseAttMonth);
      if (data) {
        if (att.status == "present") {
          totPresent = totPresent + 1;
        } else if (att.status == "absent") {
          totAbsent = totAbsent + 1;
        } else if (att.status == "PA") {
          totPresent = totPresent + 0.5;
        } else if (att.status == "HA") {
          totAbsent = totAbsent + 0.5;
        }
      }
    });
    return { presentCount: totPresent, absentCount: totAbsent };
  };
  const NameKeyPress = async (clonedAttendance) => {
    var db = new PouchDB("AttendanceEntryProject");
    db.get("EmployeeDetails", function (err, doc) {
      if (err) {
        var doc = {
          _id: "EmployeeDetails",
          EmployeeDetails: clonedAttendance,
        };
        db.put(doc);
      }
      db.put(
        {
          _id: doc._id,

          EmployeeDetails: clonedAttendance,

          _rev: doc._rev,
        },
        function (err, response) {
          if (err) {
            return console.log(err, "err");
          } else {
            console.log(response, "ress");
          }
        }
      );
    });
  };
  useEffect(() => {
    (async function Change() {
      try {
        await Service.getEmployeeDetails();
        await Service.getEmployeeDetails();
        const attendanceEntry = await Service.getEmployeeDetails();
        setAttendanceDetails(attendanceEntry.EmployeeDetails);
        monthfromHeader(formattedMonthAndYear);
      } catch (err) {
        alert(JSON.stringify(err));
      }
    })();
   
  }, []);
  const {
    setShowEventModal,
    daySelected,
    dispatchCalAttendance,
    selectedEvent,
  } = useContext(GlobalContext);
  const { monthIndex, showEventModal } = useContext(GlobalContext);

  const setWeekIndex = () => {
    let value = -7;
    getMonthAttendance(value);
  };
  const attendanceMapping = (index) => {
    let status;
    for (const element of AttendanceDetails[index].Attendance) {
      if (element.date == currentDate && formattedMonthAndYear == attMonth) {
        status = element.status;
        break;
      }
    }

    return status;
  };
  const handleSelector = (e) => {
    const { value } = e.target;
    setSelectData(value);
    setPresentData("");
    setAttendanceType("Selector");
  };

  const setSentCalenderDataValue = (data) => {
    setSentCalenderData(data);
  };
  const indexFunction = (data) => {
    setIndexData(data);
    setOverAllIndex(data);
  };
  const search = (data) => {
    setSearchEmp(data);
  };
  const monthfromHeader = (data) => {
    setattMonth(data);
  };
  const monthandYearFromHeader = (data) => {
    setMonYear(data);
  };
  const calDatafromCalendar = (data) => {
    setCalendarData(data);
  };
  const attendanceMarked = (status) => {
    if (status == "present") {
      return <img src="../icons/GreenCheck.svg" alt="" />;
    } else if (status == "absent") {
      return <img src="../icons/cross.svg" alt="" />;
    } else if (status == "CL") {
      return (
        <svg
          id="block"
          xmlns="http://www.w3.org/2000/svg"
          width="14.688"
          height="14.688"
          viewBox="0 0 14.688 14.688"
        >
          <g id="Group_18526" data-name="Group 18526">
            <path
              id="Path_34549"
              data-name="Path 34549"
              d="M7.344,0a7.344,7.344,0,1,0,7.344,7.344A7.344,7.344,0,0,0,7.344,0ZM4.456,2.966a5.235,5.235,0,0,1,5.778,0L2.969,10.234A5.246,5.246,0,0,1,4.456,2.966Zm5.775,8.755a5.235,5.235,0,0,1-5.778,0l7.265-7.265A5.246,5.246,0,0,1,10.232,11.722Z"
              fill="#0B0BD5"
            />
          </g>
        </svg>
      );
    } else if (status == "PL") {
      return (
        <svg
          id="block"
          xmlns="http://www.w3.org/2000/svg"
          width="14.688"
          height="14.688"
          viewBox="0 0 14.688 14.688"
        >
          <g id="Group_18526" data-name="Group 18526">
            <path
              id="Path_34549"
              data-name="Path 34549"
              d="M7.344,0a7.344,7.344,0,1,0,7.344,7.344A7.344,7.344,0,0,0,7.344,0ZM4.456,2.966a5.235,5.235,0,0,1,5.778,0L2.969,10.234A5.246,5.246,0,0,1,4.456,2.966Zm5.775,8.755a5.235,5.235,0,0,1-5.778,0l7.265-7.265A5.246,5.246,0,0,1,10.232,11.722Z"
              fill="#F10BF1"
            />
          </g>
        </svg>
      );
    } else if (status == "COM") {
      return (
        <svg
          id="block"
          xmlns="http://www.w3.org/2000/svg"
          width="14.688"
          height="14.688"
          viewBox="0 0 14.688 14.688"
        >
          <g id="Group_18526" data-name="Group 18526">
            <path
              id="Path_34549"
              data-name="Path 34549"
              d="M7.344,0a7.344,7.344,0,1,0,7.344,7.344A7.344,7.344,0,0,0,7.344,0ZM4.456,2.966a5.235,5.235,0,0,1,5.778,0L2.969,10.234A5.246,5.246,0,0,1,4.456,2.966Zm5.775,8.755a5.235,5.235,0,0,1-5.778,0l7.265-7.265A5.246,5.246,0,0,1,10.232,11.722Z"
              fill="#0087AA"
            />
          </g>
        </svg>
      );
    } else if (status == "Off") {
      return (
        <svg
          id="block"
          xmlns="http://www.w3.org/2000/svg"
          width="14.688"
          height="14.688"
          viewBox="0 0 14.688 14.688"
        >
          <g id="Group_18526" data-name="Group 18526">
            <path
              id="Path_34549"
              data-name="Path 34549"
              d="M7.344,0a7.344,7.344,0,1,0,7.344,7.344A7.344,7.344,0,0,0,7.344,0ZM4.456,2.966a5.235,5.235,0,0,1,5.778,0L2.969,10.234A5.246,5.246,0,0,1,4.456,2.966Zm5.775,8.755a5.235,5.235,0,0,1-5.778,0l7.265-7.265A5.246,5.246,0,0,1,10.232,11.722Z"
              fill="#E88605"
            />
          </g>
        </svg>
      );
    } else if (status == "PA") {
      return (
        <svg
          id="block"
          xmlns="http://www.w3.org/2000/svg"
          width="14.688"
          height="14.688"
          viewBox="0 0 14.688 14.688"
        >
          <g id="Group_18526" data-name="Group 18526">
            <path
              id="Path_34549"
              data-name="Path 34549"
              d="M7.344,0a7.344,7.344,0,1,0,7.344,7.344A7.344,7.344,0,0,0,7.344,0ZM4.456,2.966a5.235,5.235,0,0,1,5.778,0L2.969,10.234A5.246,5.246,0,0,1,4.456,2.966Zm5.775,8.755a5.235,5.235,0,0,1-5.778,0l7.265-7.265A5.246,5.246,0,0,1,10.232,11.722Z"
              fill="#760BF1"
            />
          </g>
        </svg>
      );
    } else if (status == "HA") {
      return (
        <svg
          id="block"
          xmlns="http://www.w3.org/2000/svg"
          width="14.688"
          height="14.688"
          viewBox="0 0 14.688 14.688"
        >
          <g id="Group_18526" data-name="Group 18526">
            <path
              id="Path_34549"
              data-name="Path 34549"
              d="M7.344,0a7.344,7.344,0,1,0,7.344,7.344A7.344,7.344,0,0,0,7.344,0ZM4.456,2.966a5.235,5.235,0,0,1,5.778,0L2.969,10.234A5.246,5.246,0,0,1,4.456,2.966Zm5.775,8.755a5.235,5.235,0,0,1-5.778,0l7.265-7.265A5.246,5.246,0,0,1,10.232,11.722Z"
              fill="#B50451"
            />
          </g>
        </svg>
      );
    }
  };
  const attendanceMarkedSunday = () => {
    return <div className=" w-full h-full  bg-[#875FE899]"></div>;
  };

  const addEmployee = () => {
    sendEmployee();
  };
  const setMenuItemValueData = () => {
    setMenuItem();
  };

  const setMenuItemValue = () => {
    setMenuItemValueDataaClose();
  };
  // const handlePresentClick = (data, data2) => {
  //   if (data2 == "present") {
  //     setSelectData("")
  //     setPresentData("present")
  //     setAttendanceType("present")
  //     setIndexOfButton(data)
  //     setOverAllIndex(data)
  //   } else {
  //     setSelectData("")
  //     setPresentData("absent")
  //     setAttendanceType("absent")
  //     setIndexOfButton(data)
  //     setOverAllIndex(data)
  //   }
  // const attendance = {
  //   present: "Present",
  //   absent: "absent",
  //   day: currentDate,
  // }
  //   if (data2 == "present" || data2 == "absent") {

  //     dispatchCalAttendance({ type: "push", payload: attendance });

  //   } else {
  //     dispatchCalAttendance({ type: "update", payload: attendance });
  //   }
  // }
  return (
    <div className="w-auto h-screen">
      <div>
        <OverAllHeader
          Attendances={Attendances}
          searchValue={search}
          setMenuItemValue={setMenuItemValueData}
          monthIndex={monthfromHeader}
          monthandYear={monthandYearFromHeader}
          addEmployee={addEmployee}
        />
      </div>
      <div
        className="w-full flex items-center justify-around"
        onClick={setMenuItemValue}
      >
        <div className="flex overflow-x-scroll scroll-smooth kanbanContentscroll scrollBar py-2 w-[94%] xl:w-[96%] rounded-xl">
          <div className="flex flex-nowrap mb-[5px]">
            <div className="xl:h-[90vh] lg:h-[85vh] md:h-[85vh] h-[88vh] w-full flex bg-[#fafafa] items-center flex-col justify-center ">
              <div className=" lg:w-[88rem] bg-[#ffffff] xl:w-[87rem] w-[80rem] md:[80rem] h-[85vh] pt-[25px] xl:h-[85vh]">
                <div className="bg-[#232E38] w-[100%] h-[7vh] flex font-[sfpro-regular-display] justify-between md:text-[10px] text-[9px] lg:text-[11px] xl:text-[11px] text-white xl:h-[8vh] items-center rounded-t-[10px]">
                  <div className="xl:w-[58%] w-[50%] flex justify-between items-center p-2">
                    <p className="xl:w-[5%] w-[5%] font-[sfpro-medium]">No.</p>
                    <p className="w-[36%] font-[sfpro-medium]">
                      EMP DETAILS
                    </p>
                    <p className="w-[25%]  font[sfpro-medium]">
                      STATUS
                    </p>
                  </div>

                  <div
                    className={`flex  w-[55%] justify-around  ${
                      calendarData.length == 3
                        ? "xl:w-[41%] justify-evenly"
                        : calendarData.length == 2
                        ? "xl:w-[44%]"
                        : calendarData.length == 1
                        ? "xl:w-[46%]"
                        : "xl:w-[70%]"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-center ${
                        calendarData.length == 2
                          ? ""
                          : calendarData.length == 0
                          ? "xl:w-[82%]"
                          : null
                      }`}
                    >
                      <div>
                        <App
                          sentCalenderData={setSentCalenderDataValue}
                          Attendances={Attendances}
                          attendanceMon={monYear}
                          calData={calDatafromCalendar}
                        />
                      </div>
                      {/* <div title={`${dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}`} className="flex  justify-center cursor-pointer">
                  <div className=" ">
                    <div className="flex flex-row-reverse  text-white justify-items-center rounded-3xl">
                      {currenMonth.map((row, i) => (
                        <React.Fragment key={i} className="">
                          {row.map((day, idx) => (
                            <DayAttendance day={day} key={idx} />
                          ))}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div> */}
                    </div>
                <div
                      className={`flex ${calendarData.length == 2 && "justify-between" } justify-evenly
                      ${
                        calendarData == 3
                          ? "w-[23%]"
                          : calendarData == 2
                          ? "w-[20%]"
                          : calendarData == 1
                          ? "w-[20%]"
                          : "w-[20%] "
                      }`}
                    >
                      <div className="">
                        {" "}
                        <img
                          src="../icons/Green.svg"
                          alt=""
                          className={`w-6 xl:w-8 xl:ml-[31px] mr-[34px] ${
                            calendarData.length == 3
                              ? ""
                              : calendarData.length == 2
                              ? ""
                              : calendarData.length == 0
                              ? "ml-[14px]"
                              : null
                          }`}
                        />
                      </div>
                      <div className="">
                        <img
                          src="../icons/Red.svg"
                          alt=""
                          className={`w-6 xl:w-8 ${
                            calendarData.length == 3
                              ? ""
                              : calendarData.length == 2
                              ? ""
                              : calendarData.length == 2
                              ? "xl:ml-[10px]"
                              : null
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="max-h-[69vh] overflow-scroll scrollBar mt-1 ">
                  {AttendanceDetails.filter((dataValue) =>
                    dataValue.empName
                      .toLowerCase()
                      .includes(searchEmp == undefined ? "" : searchEmp.toLowerCase())
                  ).map((employee, index) => {
                    return (
                      <div className="flex  xl:h-[10vh] items-center border-b-2 h-[10vh] md:text-[10px] text-[9px] lg:text-[11px] xl:text-[14px]">
                        <div className="flex w-[100%] h-[8vh]  items-center">
                          <div className="xl:h-[12vh] w-[3%]  flex justify-around items-center h-[12vh] border-x-2">
                            <p className="">{index + 1}</p>
                          </div>
                          <div className={`flex flex-col ${calendarData.length == 2 ? "xl:w-[37%] w-[30%] " : calendarData.length == 3 ? "w-[34%]"  : calendarData.length == 7 ?  "xl:w-[19%]" :calendarData.length == 0 && "w-[23%]" } h-[10vh] w-[25%] xl:w-[32%]  border-r-2   items-center justify-center `}>
                            <div className="">
                              {" "}
                              <h3 className="font-[sfpro-medium] text-center">
                                {employee.empName}{" "}
                              </h3>
                            </div>
                            <div className="px-5 text-center">
                              {employee.empID}-{employee.designation}{" "}
                            </div>
                          </div>

                          <div className={`flex w-[27%] h-[7vh]  ${  calendarData.length == 2 ? "xl:w-[42%] " : calendarData.length == 3 ?  "xl:w-[54%] w-[22%] " : calendarData.length == 7 ? "w-[23%]" : calendarData.length ==0 && "w-[37%]" }   justify-center items-center h-[7vh] rounded-md py-3`}>
                            <div>
                              <button
                                onClick={() =>
                                  AttendanceStatus("present", index)
                                }
                                className={`${
                                  attendanceMapping(index) == "present"
                                    ? "px-5  h-[7vh] bg-[#35BC05] font-[sfpro-regular] py-2 rounded-l-md text-[#ffffff]"
                                    : "px-5 h-[7vh] font-[sfpro-regular] bg-[#E5E5E5] py-2 rounded-l-md text-[#A4A7AA]"
                                }`}
                              >
                                Present
                              </button>
                            </div>
                            <div>
                              <button
                                onClick={() =>
                                  AttendanceStatus("absent", index)
                                }
                                className={`${
                                  attendanceMapping(index) == "absent"
                                    ? "px-5 h-[7vh] bg-[#FF2626] py-2 font-[sfpro-regular] text-[#ffffff]"
                                    : "px-5 h-[7vh] bg-[#F5F5F5] py-2 font-[sfpro-regular] text-[#A4A7AA]"
                                }`}
                              >
                                Absent
                              </button>
                            </div>
                            <div>
                              <select
                                name=""
                                id=""
                                onChange={(e) => {
                                  AttendanceStatus(e.target.value, index);
                                }}
                                className={`${
                                  attendanceMapping(index) == "CL"
                                    ? "bg-[#0B0BD5] text-[#FFFFFF] h-[7vh] px-5 font-[sfpro-regular] rounded-r-md outline-none"
                                    : attendanceMapping(index) == "PL"
                                    ? "bg-[#F10BF1] text-[#FFFFFF] h-[7vh] rounded-r-md px-5 font-[sfpro-regular] outline-none"
                                    : attendanceMapping(index) == "COM"
                                    ? "bg-[#0087AA] text-[#FFFFFF] h-[7vh] px-5 font-[sfpro-regular] rounded-r-md outline-none"
                                    : attendanceMapping(index) == "Off"
                                    ? "bg-[#E88605] text-[#FFFFFF] h-[7vh] font-[sfpro-regular] px-5 rounded-r-md outline-none"
                                    : attendanceMapping(index) == "PA"
                                    ? "bg-[#760BF1] text-[#FFFFFF] font-[sfpro-regular] h-[7vh] px-5 rounded-r-md outline-none"
                                    : attendanceMapping(index) == "HA"
                                    ? "bg-[#B50451] font-[sfpro-regular] text-[#FFFFFF] h-[7vh] px-5 rounded-r-md outline-none"
                                    : "bg-[#E5E5E5] font-[sfpro-regular] text-[#A4A4A4] h-[7vh] px-5 rounded-r-md outline-none"
                                }`}
                              >
                                <option
                                  className="bg-[#FFBF10] font-[sfpro-regular] text-[#232E38]"
                                  disabled
                                  selected
                                  value=""
                                >
                                  Others
                                </option>
                                <option
                                  className="bg-[#FFBF10] font-[sfpro-regular] text-[#232E38]"
                                  value="CL"
                                >
                                  CL
                                </option>
                                <option
                                  className="bg-[#FFBF10] font-[sfpro-regular] text-[#232E38]"
                                  value="PL"
                                >
                                  PL
                                </option>
                                <option
                                  className="bg-[#FFBF10] font-[sfpro-regular] text-[#232E38]"
                                  value="COM"
                                >
                                  COM
                                </option>
                                <option
                                  className="bg-[#FFBF10] font-[sfpro-regular] text-[#232E38]"
                                  value="Off"
                                >
                                  Off
                                </option>
                                <option
                                  className="bg-[#FFBF10] font-[sfpro-regular] text-[#232E38]"
                                  value="PA"
                                >
                                  PA
                                </option>
                                <option
                                  className="bg-[#FFBF10] font-[sfpro-regular] text-[#232E38]"
                                  value="HA"
                                >
                                  HA
                                </option>
                              </select>
                            </div>
                          </div>

                          {/*                       
                      {currenMonth.map((row, i) => (
                        <React.Fragment key={i} className="">
                          {row.map((day, idx) => (
                            <h5 className={`flex  text-[12px] justify-center font-[sfpro-regular]  ${getCurrent()}`}> {day.format("DD")}</h5>
                            // <DayAttendance day={day} key={idx} />
                          ))}
                        </React.Fragment>
                      ))} */}
<div className="justify-around flex w-[60%]"> 

  
<div
                            className={`flex items-center  w-[70%]  justify-between ${
                              calendarData.length == 3
                                ? "w-[40%]"
                                : calendarData.length == 2
                                ? "w-[22%]"
                                : calendarData.length == 0
                                ? "w-[68%]"
                                : null
                            }`}
                          >
                            {calendarData.map((cal, index) => {
                              return (
                                <div className="flex justify-center items-center w-[68%] xl:w-[80%] border-x-2 border-opacity-0 ">
                                  <div className="w-[100%]  h-[13vh] flex justify-center items-center ">
                                    {employee.Attendance.map((data) =>
                                      data.date == cal.dateString
                                        ? attendanceMarked(data.status)
                                        : cal.dayName == "SUN"
                                        ? attendanceMarkedSunday()
                                        : ""
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                            {/* <div className="flex flex-row justify-around items-center w-[95%] pl-[30px] gap-12 ml-3">
                       
                          <div className=" h-10 w-10 flex justify-around items-center">
                          
                            {
                              attendanceMapping(index) == "present" ? <img src="../icons/GreenCheck.svg" alt="" className="h-[3vh]"/> :
                                attendanceMapping(index) == "absent" ? <img src="../icons/cross.svg" alt="" className="h-[3vh]" /> :
                                  <img src="../icons/Block.svg" alt="" />
                            }
                          </div>
                         </div> */}
                          </div>
                          <div
                            className={`w-[5%] justify-evenly flex flex-row ${
                              calendarData.length == 3
                                ? "w-[10%]"
                                : calendarData.length == 2
                                ? "w-[10%]"
                                : calendarData.length == 1
                                ? "w-[10%]"
                                : "w-[10%]"
                            }`}
                          >
                            <div className=" p-8 xl:h-[12vh]  w-[45%] h-[10vh] border-r-2  text-center flex justify-evenly items-center">
                              <h3 className="font-[sfpro-bold]">
                                {
                                  onTotalAttendanceCount(
                                    employee.Attendance,
                                    monthYear
                                  ).presentCount
                                }
                              </h3>
                            </div>
                            <div className="p-8 xl:h-[12vh] h-[11vh] w-[50%] text-center flex justify-evenly items-center border-r-2">
                              <h3 className="font-[sfpro-bold]">
                                {
                                  onTotalAttendanceCount(
                                    employee.Attendance,
                                    monthYear
                                  ).absentCount
                                }
                              </h3>
                            </div>
                          </div>
  </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className=" xl:h-10 h-10 w-full flex justify-around items-center ">
                <div className="bg-[#EFEFEF] xl:h-10 h-10 w-[96%] xl:w-[96%] ">
                  <div className=" xl:w-[78%] xl:h-[10vh] h-10vh w-[78%] justify-between flex ">
                    <div className="flex flex-col w-[100%] ">
                      <div className="flex">
                        <div className="flex xl:w-[13%] w-[17%] ml-2  h-[6vh] justify-around items-center">
                          <div className="w-3 h-3 rounded-full bg-[#13BBEF]"></div>
                          <div>
                            <h4 className="font-[sfpro-regular] xl:text-[10px] text-[9px]">
                              P - Present
                            </h4>
                          </div>
                        </div>
                        <div className="flex xl:w-[13%] justify-around xl:h-[6vh] w-[17%] h-[6vh] items-center">
                          <div className="w-3 h-3 rounded-full bg-[#F10B0B]"></div>
                          <div>
                            <h4 className="font-[sfpro-regular] xl:text-[10px] text-[9px]">
                              A - Absent
                            </h4>
                          </div>
                        </div>
                        <div className="flex xl:w-[18%] w-[26%]  justify-around xl:h-[6vh] h-[6vh]  items-center">
                          <div className="w-3 h-3 rounded-full bg-[#0B0BD5]"></div>
                          <div>
                            <h4 className="font-[sfpro-regular] xl:text-[10px] text-[9px]">
                              CL - Casual Leave
                            </h4>
                          </div>
                        </div>
                        <div className="flex xl:w-[18%]  justify-around xl:h-[6vh] w-[27%] h-[6vh] items-center">
                          <div className="w-3 h-3 rounded-full bg-[#F10BF1]"></div>
                          <div>
                            <h4 className="font-[sfpro-regular] xl:text-[10px] text-[9px]">
                              PL - Privilege Leave
                            </h4>
                          </div>
                        </div>
                        <div className="flex xl:w-[18%]  xl:h-[6vh] w-[30%] h-[6vh] justify-around items-center ">
                          <div className="w-3 h-3 rounded-full bg-[#232E38]"></div>

                          <div>
                            <h4 className="font-[sfpro-regular] xl:text-[10px] text-[9px]">
                              Com - Compensatory
                            </h4>
                          </div>
                        </div>
                        <div className="flex xl:w-[14%] justify-around xl:h-[6vh] w-[33%] h-6vh mr-[0.4%]  items-center">
                          <div className="w-3 h-3 rounded-full bg-[#E88605]"></div>
                          <div>
                            <h4 className="font-[sfpro-regular] xl:text-[10px] text-[9px]">
                              Off - Leave Off
                            </h4>
                          </div>
                        </div>
                        <div className="flex xl:w-[18%]  justify-around xl:h-[6vh] w-[26%] h-6vh items-center">
                          <div className="w-3 h-3 rounded-full bg-[#760BF1]"></div>
                          <div>
                            <h4 className="font-[sfpro-regular] xl:text-[10px] text-[9px]">
                              PA - Half Day leave
                            </h4>
                          </div>
                        </div>
                        <div className="flex xl:w-[18%] w-[30%]  justify-around h-[6vh]  items-center">
                          <div className="w-3 h-3 rounded-full bg-[#B50451]"></div>
                          <div>
                            <h4 className="font-[sfpro-regular] xl:text-[10px] text-[9px]">
                              HA - Half Day Absent
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
