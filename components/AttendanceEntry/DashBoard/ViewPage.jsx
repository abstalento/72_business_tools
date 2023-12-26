import React, { useContext, useEffect, useState } from "react";
import OverAllHeader from "../Header/Header";
import DashAttendance from "./DashBoardCal";
import { getMonthViewPage } from "./Utiless";
import dayjs from "dayjs";
import GlobalContext from "../../kanbanBoard/Calender/GlobalContext";
import { PDFViewer } from "@react-pdf/renderer";
import PdfContent from "../pdfcontiner/pdfContentattendance";
import Service from "../../../services/attendanceEntry/services";
import { App } from "./Calendar";
import { MonthlySheetCal } from "./MonthlySheetCal";
import { bgcolor, style } from "@mui/system";
import { red } from "@mui/material/colors";
import PdfProvider from "../pdfcontiner/pdfproviderattendance";
const AttendanceViewPages = ({ setMenuItemValue, setMenuItemValueDataa }) => {
  const [empDetails, setEmpDetails] = useState([]);
  const [currenMonth, setCurrentMonth] = useState(getMonthViewPage());
  const [monthIndexTarget, setMonthIndexTarget] = useState();
  const [calendarData, setCalendarDataValue] = useState([]);
  const [data, setData] = useState();
  const [monthAndYear, SetMonthAndYear] = useState();
  const { CalendarData, setCalendarData } = useContext(GlobalContext);
  const [pdfView, setPdfView] = useState(false);

  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [openDate, setOpenDateBar] = useState(false);
  var newdate = new Date();
  var month = newdate.getMonth();
  var date = newdate.getDate();
  var monthText = newdate.toLocaleString("en", { month: "long" });
  var year = newdate.getFullYear();
  var dateFormat = month >= 9 ? month + 1 : "0" + (month + 1);
  var format = year + "-" + dateFormat;

  const handleSearch = (event) => {

    const { value, name } = event.target
    // setDatas({ ...data, [name]: value })
    
     setData(value);
    // let val =event.target.value
    // setData(val.toLowerCase());

  };

  const handleSearchOpen = () => {
    setOpenSearchBar(!openSearchBar);
  };

  const handleDateOpen = () => {
    setOpenDateBar(!openDate);
  };

  const setMenuItemValueClose = () => {
    setMenuItemValueDataa();
  };

  const handleChange = (e) => {
    setMonthIndexTarget(e.target.value);
    let filterMonth = new Date(e.target.value);
    let month = filterMonth.getMonth() + 1;
    let year = filterMonth.getFullYear();
    let finalDate = year + " " + month;
    SetMonthAndYear(finalDate);
  };

  const calDatafromCalendar = (data) => {
    setCalendarData(data);
    setCalendarDataValue(data)
  };
  const attendanceMarked = (status) => {
    if (status == "present") {
      return (
        // <span className="rounded-lg w-[2.5rem] pl-3 pr-3 pt-3 pb-1.5  h-2  items-start bg-[#13BBEF]"></span>
     
         <span className="rounded-lg w-[1.5rem] pl-1 ml-1 pr-1 pt-3 pb-1.5  h-2 items-end bg-[#13BBEF]"></span>
      );
    } else if (status == "absent") {
      return (
        // <div className="rounded-lg w-[2.5rem] pl-3 pr-3 pt-3 pb-1.5  h-2  items-start bg-[#FF4A73]"></div>
 
         <div className="rounded-lg w-[1.5rem] pl-1 ml-1 pr-3 pt-3 pb-1.5  h-2  items-start bg-[#FF4A73]"></div>
      );
    } else if (status == "CL") {
      return (
        // <div className="rounded-lg w-[2.5rem] pl-3 pr-3 pt-3 pb-1.5  h-2  items-start bg-[#0B0BD5]"></div>
   
         <div className="rounded-lg w-[1.5rem] pl-1 ml-1 pr-3 pt-3 pb-1.5  h-2  items-start bg-[#0B0BD5]"></div>
      );
    } else if (status == "PL") {
      return (
        // <div className="rounded-lg w-[2.5rem] pl-3 pr-3 pt-3 pb-1.5  h-2  items-start bg-[#F10BF1]"></div>
 
       <div className="rounded-lg w-[1.5rem] pl-1 ml-1 pr-3 pt-3 pb-1.5  h-2  items-start bg-[#F10BF1]"></div>
      );
    } else if (status == "COM") {
      return (
        // <div className="rounded-lg w-[2.5rem] pl-3 pr-3 pt-3 pb-1.5  h-2  items-start bg-[#232E38]"></div>
 
         <div className="rounded-lg w-[1.5rem] pl-1 ml-1 pr-3 pt-3 pb-1.5  h-2  items-start bg-[#232E38]"></div>
      );
    } else if (status == "OFF") {
      return (
        // <div className="rounded-lg w-[2.5rem] pl-3 pr-3 pt-3 pb-1.5  h-2  items-start bg-[#E88605]"></div>
 
        <div className="rounded-lg w-[1.5rem] pl-1 ml-1 pr-3 pt-3 pb-1.5  h-2  items-start bg-[#E88605]"></div>
      );
    } else if (status == "PA") {
      return (
          
        <div className="rounded-lg w-[1.5rem] pl-1 ml-1 pr-3 pt-3 pb-1.5  h-2  items-start bg-[#760BF1]"></div>
      );
    } else if (status == "HA") {
      return (
        // <div className="rounded-lg w-[2.5rem] pl-3 pr-3 pt-3 pb-1.5  h-2  items-start bg-[#B50451]"></div>
  
        <div className="rounded-lg w-[1.5rem] pl-1 ml-1 pr-3 pt-3 pb-1.5  h-2  items-start bg-[#B50451]"></div>
      );
    }
  };
  const attendanceMarkedSunday = () => {
    return (
      <button className=" w-full h-full  bg-[#875FE899] items-center"></button>
    );
  };
  const handlePdfClick = () => {
    setPdfView(true);
  };

  const setMenuItem = () => {
    setMenuItemValue();
  };
  useEffect(() => {
    (async function Change() {
      try {
        await Service.getEmployeeDetails();
        await Service.getEmployeeDetails();
        await Service.getEmployeeDetails();
        const attendanceEntry = await Service.getEmployeeDetails();
        setEmpDetails(attendanceEntry.EmployeeDetails);
      } catch (err) {
        alert(JSON.stringify(err));
      }
    })();
  }, []);
  return (
    <div className="h-screen w-auto bg-[#fafafa] ">
      <div className=" md:h-[14vh]  max-h-[16vh] bg-[#E8E8E8] flex justify-start md:justify-center flex-col md:flex-row  items-center ">
        <div className="w-[100%] h-[7vh] flex items-center ">
          <div className="flex items-center w-[100%] h-[8vh] justify-evenly">
            <div className="md:hidden">
              <img
                src="/images/menu.png"
                className="w-7"
                onClick={setMenuItem}
              />
            </div>

            <div className=" w-[33%] lg:w-[13%] md:w-[21%] justify-around flex">
            {/* <div className=" w-[33%] lg:w-[13%] md:w-[10%] justify-around flex"> */}
              <h2 className="font-[sfpro-medium] "> Monthly Sheets</h2>
            </div>
            <div className="md:hidden">
              <img
                className="flex"
                src="../icons/CalenderPage.svg"
                onClick={handleDateOpen}
                alt=""
              />
            </div>
            {/* <div className="xl:flex lg:flex w-[40%] xl:w-[17%] lg:w-[22%] lg:justify-between h-[4vh] md:w-[17%] xl:h-[6vh] lg:h-[6vh] md:h-[6vh] justify-around hidden md:block"> */}
          
            <div className="xl:flex lg:flex w-[40%] xl:w-[17%] lg:w-[22%] lg:justify-between h-[4vh] md:w-[17%] xl:h-[6vh] lg:h-[6vh] md:h-[3vh] justify-around hidden md:flex">
              <input
                type="month"
                name=""
                id=""
                className="rounded-[6px] outline-none"
                onChange={handleChange}
                value={monthIndexTarget ? monthIndexTarget : format}
              />
              <img
                className="hidden lg:flex w-8"
                src="../icons/CalenderPage.svg"
                onClick={handlePdfClick}
                alt=""
              />
            </div>
            <div className=" w-[42%] h-[10vh] justify-between xl:flex hidden ">
              <div className="flex flex-col w-[100%]">
                <div className="flex">
                  <div className="flex xl:w-[16%] xl:h-[6vh] lg:w-[16%] lg:h-[5vh]  md:w-[20%] md:h-[5vh] justify-around items-center">
                    <div className="w-3 h-3 rounded-full bg-[#13BBEF]"></div>
                    <div>
                      <h4 className="font-[sfpro-regular] md:text-[10px] lg:text-[11px] xl:text-[13px]">
                        P - Present
                      </h4>
                    </div>
                  </div>
                  <div className="flex xl:w-[20%] ml-[7.5%] lg:w-[16%] lg:h-[5vh] justify-around xl:h-[6vh] md:w-[23%] md:h-[5vh]  items-center">
                    <div className="w-3 h-3 rounded-full bg-[#F10B0B]"></div>
                    <div>
                      <h4 className="font-[sfpro-regular] md:text-[10px] lg:text-[11px] xl:text-[13px]">
                        A - Absent
                      </h4>
                    </div>
                  </div>
                  <div className="flex xl:w-[26.5%]  justify-around xl:h-[6vh] lg:w-[30%] lg:h-[5vh]  items-center">
                    <div className="w-3 h-3 rounded-full bg-[#0B0BD5]"></div>
                    <div>
                      <h4 className="font-[sfpro-regular] md:text-[10px] lg:text-[11px] xl:text-[13px]">
                        CL - Casual Leave
                      </h4>
                    </div>
                  </div>
                  <div className="flex xl:w-[25%] ml-[0.3%] justify-around xl:h-[6vh] lg:w-[30%] lg:h-[5vh] items-center">
                    <div className="w-3 h-3 rounded-full bg-[#F10BF1]"></div>
                    <div>
                      <h4 className="font-[sfpro-regular] md:text-[10px] lg:text-[11px] xl:text-[13px]">
                        PL - Privilege Leave
                      </h4>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex xl:w-[25%]  xl:h-[3vh] justify-around items-center">
                    <div className="w-3 h-3 rounded-full bg-[#232E38]"></div>
                    <div>
                      <h4 className="font-[sfpro-regular] md:text-[10px] lg:text-[11px] xl:text-[13px]">
                        Com - Compensatory
                      </h4>
                    </div>
                  </div>
                  <div className="flex xl:w-[18%] justify-around xl:h-[3vh] mr-[0.4%]  items-center">
                    <div className="w-3 h-3 rounded-full bg-[#E88605]"></div>
                    <div>
                      <h4 className="font-[sfpro-regular] md:text-[10px] lg:text-[11px] xl:text-[13px]">
                        Off - Leave Off
                      </h4>
                    </div>
                  </div>
                  <div className="flex xl:w-[27.5%]  justify-around xl:h-[3vh]  items-center">
                    <div className="w-3 h-3 rounded-full bg-[#760BF1]"></div>
                    <div>
                      <h4 className="font-[sfpro-regular] md:text-[10px] lg:text-[11px] xl:text-[13px]">
                        PA - Half Day leave
                      </h4>
                    </div>
                  </div>
                  <div className="flex xl:w-[24%]  justify-around xl:h-[3vh]  items-center">
                    <div className="w-3 h-3 rounded-full bg-[#B50451]"></div>
                    <div>
                      <h4 className="font-[sfpro-regular] md:text-[10px] lg:text-[11px] xl:text-[13px]">
                        HA - Half Day Absent
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:hidden  ">
              <img
                src="../icons/Search-Icon.svg"
                alt=""
                className=" "
                onClick={handleSearchOpen}
              />
            </div>
            {/* <div className="xl:flex lg:flex lg:w-[46%] bg-[#FFFFFF] md:block hidden h-[4vh] w-[47%] md:h-[6vh] xl:w-[25%] md:w-[25%] xl:h[8vh] lg:h-[7vh] rounded-md p-1"> */}
            <div className="xl:flex lg:flex lg:w-[46%] bg-[#FFFFFF] md:flex hidden h-[4vh] w-[47%] md:h-[3vh] xl:w-[25%] md:w-[35%] xl:h[8vh] lg:h-[7vh] rounded-md p-1">
              <img
                src="../icons/Search-Icon.svg"
                alt=""
                className=" w-5 opacity-[0.4]"
              />
              <input
                type="search"
                name="title"
                value={data}
                onChange={handleSearch}
                placeholder="Search by Employee Name"
                className="w-[100%] outline-none ml-2"
              />
            </div>
          </div>
        </div>
        {openSearchBar ? (
          <div className=" w-[100%] h-[12vh] bg-[#E8E8E8] md:hidden flex justify-center items-center relative ">
            <input
              type="search"
              placeholder="Search by Employee Name"
              className="w-[85%] rounded-lg placeholder-amber-600 placeholder:p-3 h-[6vh] outline-none md:ml-1 text-sm"
              name="search"
              onChange={handleSearch}
            />
          </div>
        ) : (
          openDate && (
            <div className="bg-[#E8E8E8]  w-[100%] h-[10vh] md:hidden flex justify-center items-center relative ">
              <input
                type="month"
                name=""
                id=""
                className="rounded-[6px] w-[60%] h-[5vh] outline-none "
                onChange={handleChange}
                value={monthIndexTarget ? monthIndexTarget : format}
              />
            </div>
          )
        )}
      </div>

      <div
        className="w-full flex items-center  justify-around"
        onClick={setMenuItemValueClose}
      >
        <div className="flex overflow-x-scroll scroll-smooth lg:h-[84vh] xl:h-[90vh] kanbanContentscroll h-[100vh] scrollBar py-2 w-[94%] xl:w-[96%] rounded-md">
          <div className="flex flex-nowrap mb-[5px]">
            <div className="w-[100%] h-[90vh] flex items-center justify-center bg-[fafafa] flex-col">
              <div className=" w-[90rem]  h-[80vh] bg-[#ffffff] ">
                <div className="bg-[#232E38] flex font-[sfpro-regular-display] w-[100%] justify-between text-[11px] h-[8vh] text-white  items-center rounded-t-[10px]">
                  <div className="w-[28%]">
                    <div className="flex w-[full] ml-[10px]   gap-[20%]">
                      <p className="">No</p>
                      <p className="">EMP DETAILS</p>
                    </div>
                  </div>
                  <div className={`${CalendarData.length == 31 ? 'xl:w-[91%] pr-1' :CalendarData.length == 30 ? 'xl:w-[90%]' :CalendarData.length == 29 ? 'xl:w-[87%]' : CalendarData.length == 28 ? 'xl:w-[88%]': null}`}>
                    <MonthlySheetCal
                      attendanceMon={monthAndYear}
                      calData={calDatafromCalendar}
                    />
                  </div>

                  {/* <div>
                            <div title={`${dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}`} className="flex justify-center cursor-pointer">
                                <div className=" ">
                                    <div className="flex flex-row-reverse  text-white justify-items-center rounded-3xl">
                                        {currenMonth.map((row, i) => (
                                            console.log(row, "row"),
                                            <React.Fragment key={i} className="">
                                                {row.map((day, idx) => (
                                                    <DashAttendance day={day} key={idx} />
                                                ))}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div> */}
                </div>
                <div className="max-h-[68vh] overflow-scroll scrollBar mt-2">
                  {empDetails
                    .filter((dataValue) =>
                      dataValue.empName
                        .toLowerCase()
                        .includes(data == undefined ? "" : data.toLowerCase())
                    )
                    .map((users, index) => {
                      return (
                        <div className="flex  font-[sf-pro-medium] text-[14px] justify-around items-center w-[100%] border-b-2">
                          <div className="md:w-[24%] w-[20%] flex ">
                            <div className="flex md:w-[15%] w-[10%]">
                              <h3 className="flex items-center text-center px-4 ">
                                {index + 1}
                              </h3>
                            </div>
                            <div className="flex flex-col md:w-[75%] w-[80%]">
                              <h3 className="font-bold items-center ">
                                {users.empName}
                              </h3>

                              <h3 className="items-center">
                                {users.empID}-{users.designation}
                              </h3>
                            </div>
                          </div>
                          
                          <div className="flex justify-between items-center  lg:w-[80%] md:w-[75%] w-[73.5%]">
                          {/* <div className="flex justify-between items-center  w-[78%] "> */}
                            {calendarData?.map((cal, index) => {
                              return (
                                // <div className="flex justify-between  items-center border-x-2 border-opacity-10  align-center h-[8vh]">
                                 <div className="flex justify-between  items-center border-x-2 border-opacity-10  align-center h-[8vh] w-[10%] "> 
                                  {users.Attendance.map((data) =>
                                    data.date == cal.dateString
                                      ? attendanceMarked(data.status)
                                      : cal.dayName == "SUN"
                                      ? attendanceMarkedSunday()
                                      : ""
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className=" w-full flex justify-around items-center xl:hidden ">
                <div className="bg-[#EFEFEF] xl:h-10 h-10 w-[96%] xl:w-[96%] ">
                  <div className=" xl:w-[78%] xl:h-[10vh] h-10vh w-[78%] justify-between flex ">
                    <div className="flex flex-col w-[100%] ">
                      <div className="flex">
                        <div className="flex xl:w-[13%] w-[17%] ml-2  h-[6vh] justify-around items-center">
                          <div className="w-1 h-3 rounded-full bg-[#13BBEF]"></div>
                          {/* <div className="w-3 h-3 rounded-full bg-[#13BBEF]"></div> */}
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

      {/* {
                pdfView === false ? null :
                    <PDFViewer height={"800px"} width={"850px"} showToolbar={true}>
                        <PdfContent calendarData={calendarData} />
                    </PDFViewer>
            } */}
    </div>
  );
};

export default AttendanceViewPages;
