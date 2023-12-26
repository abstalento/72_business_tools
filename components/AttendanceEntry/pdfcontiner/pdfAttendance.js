import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, Image, Link } from "@react-pdf/renderer";
import attstyles from "../../../utils/attendance/pdfStyle/attendancepdfstyle";
import { getMonthViewPage } from "../DashBoard/Utiless";
import Service from "../../../services/attendanceEntry/services";

// import {logo} from "../../../public/images/Logo.png";

// Create attstyles
const PdfAttendance = ({ calendarData, Data, ComponentData }) => {
  const [currenMonth, setCurrentMonth] = useState(getMonthViewPage());


  {
    /* <Image src="images/Logo.png" style={style.headerimage}/> */
  }
  // const [Data, setData] = useState([])


  // const [calendarData,setCalendarData]=useState()
  const [calData, setCalData] = useState([]);

  const months = [
    "JANUARY",
    "FEBRAURY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
  ];
  const month = [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC",
  ];
  let current_datetime = new Date();
  let formatted_month_year =
    months[current_datetime.getMonth()] + "-" + current_datetime.getFullYear();
  let formatted_date =
    (current_datetime.getDate() > 9
      ? current_datetime.getDate()
      : "0" + current_datetime.getDate()) +
    "-" +
    month[current_datetime.getMonth()] +
    "-" +
    current_datetime.getFullYear();

//   const attendanceMarked = (status) => {
//     if (status == "present") {
//       return <View style={attstyles.attStatusPresent}></View>;
//     } else if (status == "absent") {
//       return <View style={attstyles.attStatusAbsent}></View>;
//     } else if (status == "CL") {
//       return <View style={attstyles.attStatusCL}></View>;
//     } else if (status == "PL") {
//       return <View style={attstyles.attStatusPL}></View>;
//     } else if (status == "COM") {
//       return <View style={attstyles.attStatusCOM}></View>;
//     } else if (status == "OFF") {
//       return <View style={attstyles.attStatusOFF}></View>;
//     } else if (status == "PA") {
//       return <View style={attstyles.attStatusPA}></View>;
//     } else if (status == "HA") {
//       return <View style={attstyles.attStatusHA}></View>;
//     }
//   };



const attendanceMarked = (status) => {
    if (status == 'present') {
      return (<View >  <Image src="images/7-Check.png" alt=""  style={{width:"13px", marginLeft:"10px"}} /></View>)
    } else if (status == 'absent') {
      return (<View >  <Image src="images/cross.png" alt=""  style={{width:"8px", marginLeft:"10px"}} /></View>)
    } else if(status=="CL") {
      return (<View >  <Image src="images/block.png" alt=""  style={{width:"8px", marginLeft:"10px"}} /></View>)
    }
    else if(status=="PL") {
      return (<View >  <Image src="images/block.png" alt=""  style={{width:"8px", marginLeft:"10px"}} /></View>)
    }
    else if(status=="Off") {
      return (<View >  <Image src="images/block.png" alt=""  style={{width:"8px", marginLeft:"10px"}} /></View>)
    }
    else if(status=="PA") {
      return (<View >  <Image src="images/block.png" alt=""  style={{width:"8px", marginLeft:"10px"}} /></View>)
    }
    else if(status=="HA") {
      return (<View >  <Image src="images/block.png" alt=""  style={{width:"8px", marginLeft:"10px"}} /></View>)
    }
    else if(status=="COM") {
      return (<View >  <Image src="images/block.png" alt=""  style={{width:"8px", marginLeft:"10px"}} /></View>)
    }

  }
  const attendanceMarkedSunday = () => {
    return <View style={attstyles.attStatusSunday}></View>;
  };
  // useEffect(() => {
  //   (async function Change() {
  //     try {
  //       await Service.getEmployeeDetails();
  //       await Service.getEmployeeDetails();
  //       await Service.getEmployeeDetails();
  //       const attendanceEntry = await Service.getEmployeeDetails();
  //       setData(attendanceEntry.EmployeeDetails)
  //     } catch (err) {
  //       alert(JSON.stringify(err))
  //     }
  //   })()
  // }, [])

  return (
    <Document>
      <Page
        age
        size="A4"
        orientation="landscape"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
       <View>
       <View style={attstyles.header}>
          <View style={attstyles.headerChild}>
            <View style={attstyles.headerimagedev}>
              {" "}
              <Image src="images/Logo.png" style={attstyles.headerimage} />
            </View>
            <View style={attstyles.headerdev2}>
              {" "}
              <Text> Alpha Business Corporation </Text>{" "}
              <Text>Vannarpettai Tirunelveli, 627005.</Text>{" "}
            </View>
            <View style={attstyles.headerdev3}>
              {" "}
              <Text> Ph- +91 - 78 788 788 00</Text>{" "}
              <Text> E - connect@alpha.com</Text>
            </View>
            <View style={attstyles.headerdevParent}>
              <View style={attstyles.headerdev4}>
                <Text>Employee Monthly Sheet - Report</Text>
              </View>
            </View>
            <View style={attstyles.headerdev5} className="bg-black">
              <View style={attstyles.headerCalender}>
                <View>
                  <Text style={{ fontSize: "8px" }}>Month of Attendance</Text>{" "}
                </View>
                <View>
                  <Text style={{ fontSize: "13px" }}>
                    {formatted_month_year}
                  </Text>{" "}
                </View>
                <View style={attstyles.headerCal}>
                  <Text style={{ fontSize: "8px" }}>No. of Employee</Text>
                  <Text style={{ fontSize: "8px" }}>Date</Text>{" "}
                </View>
                <View style={attstyles.headerCale}>
                  <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                    {Data.length}
                  </Text>{" "}
                  <Text style={{ fontSize: "9px" }}>{formatted_date}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={attstyles.body}>
          <View style={attstyles.bodycolor}>
            <View style={attstyles.bodyListColor}>
              <View
                style={{
                  backgroundColor: "#13BBEF",
                  width: "12%",
                  height: "1.5vh",
                  borderRadius: "2px",
                }}
              ></View>
              <View>
                {" "}
                <Text style={{ fontSize: "10px" }}>P - Present</Text>
              </View>
            </View>
            <View style={attstyles.bodyListColor}>
              <View
                style={{
                  backgroundColor: "#F10B0B",
                  width: "12%",
                  height: "1.5vh",
                  borderRadius: "2px",
                }}
              ></View>
              <View>
                {" "}
                <Text style={{ fontSize: "10px" }}>A - Absent</Text>
              </View>
            </View>
            <View
              style={{
                width: "13%",
                justifyContent: "space-around",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#0B0BD5",
                  width: "8%",
                  height: "1.5vh",
                  borderRadius: "2px",
                }}
              ></View>
              <View>
                {" "}
                <Text style={{ fontSize: "10px" }}>CL - Casual Leave</Text>
              </View>
            </View>
            <View
              style={{
                width: "14%",
                justifyContent: "space-around",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#F10BF1",
                  width: "8%",
                  height: "1.5vh",
                  borderRadius: "2px",
                }}
              ></View>
              <View>
                {" "}
                <Text style={{ fontSize: "10px" }}>PL - Privilege Leave</Text>
              </View>
            </View>
            <View
              style={{
                width: "15%",
                justifyContent: "space-around",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#232E38",
                  width: "8%",
                  height: "1.5vh",
                  borderRadius: "2px",
                }}
              ></View>
              <View>
                {" "}
                <Text style={{ fontSize: "10px" }}>Com - Compensatory</Text>
              </View>
            </View>
            <View
              style={{
                width: "12%",
                justifyContent: "space-around",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#E88605",
                  width: "9%",
                  height: "1.5vh",
                  borderRadius: "2px",
                }}
              ></View>
              <View>
                {" "}
                <Text style={{ fontSize: "10px" }}>Off - Leave Off</Text>
              </View>
            </View>
            <View
              style={{
                width: "13%",
                justifyContent: "space-around",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#760BF1",
                  width: "8%",
                  height: "1.5vh",
                  borderRadius: "2px",
                }}
              ></View>
              <View>
                {" "}
                <Text style={{ fontSize: "10px" }}>PA - Half Day leave</Text>
              </View>
            </View>
            <View
              style={{
                width: "14%",
                justifyContent: "space-around",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#B50451",
                  width: "8%",
                  height: "1.5vh",
                  borderRadius: "2px",
                }}
              ></View>
              <View>
                {" "}
                <Text style={{ fontSize: "10px" }}>HA - Half Day Absent</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={attstyles.tablebody}>
          <View style={attstyles.table}>
            <View style={attstyles.tablehead}>
              <View style={attstyles.tableheaddata}>
                <Text style={{ fontSize: "8px" }}>NO</Text>{" "}
                <Text style={{ fontSize: "8px" }}>EMP DETAILS</Text>
              </View>
              <View style={attstyles.calender}>
                {/* {currenMonth.map((row, i) => (
                  <React.Fragment key={i} >
                    {row.map((day, idx) => (
                      <View style={style.days}>
                        <Text>{day.format("ddd").toUpperCase()}</Text>
                        <Text> {day.format("DD")}</Text>
                      </View>
                    ))}
                  </React.Fragment>

                ))} */}
                <View style={attstyles.calhead}>
                  <View style={attstyles.calhead1}>
                    {calendarData?.map((d) => (
                      <View style={attstyles.calhead2}>
                        <Text>{d.dayName}</Text>
                        <Text>{d.date}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
            <View style={attstyles.mapdata}>
              {Data?.map((employee, index) => {
                return (
                  <View style={attstyles.tabledata}>
                    <View style={attstyles.dayhead}>
                      <Text>{index + 1} </Text>
                      <View style={attstyles.details}>
                        <Text style={{ fontSize: "8px",textAlign:"left" }}>
                          {employee.empName}{" "}
                        </Text>
                        <Text style={{ fontSize: "8px",textAlign:"left" }}>
                          {employee.empID}-{employee.designation}{" "}
                        </Text>
                      </View>
                    </View>
                    {/* <View style={style.dayscount}>
                        <View style={style.present}></View>
                        <View style={style.absent}></View>
                        <View style={style.others}></View>
                      </View> */}
                    <View style={attstyles.attendanceHead}>
                    
                   
                      {calendarData?.map((cal, index) => {
                        return (
                          <View style={attstyles.tablebodydata}>
                            {employee.Attendance.map((data) =>
                              data.date == cal.dateString
                                ? attendanceMarked(data.status)
                                : cal.dayName == "SUN"
                                ? attendanceMarkedSunday()
                                : ""
                            )}
                          </View>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        </View>
       </View>

        <View style={attstyles.footer} fixed={true}>
          <View style={attstyles.footer2}>
            <Text style={{ fontSize: "8px" }}>
              This list was maintained by using the 72 BT (Alpha Business
              Solutions) Product.
            </Text>
            <View style={attstyles.footerimagedev}>
              <Image src="images/72BTLogo.png" style={attstyles.footerimage} />
              <Image src="images/72Line.png" style={attstyles.line} />
              <Image src="images/ATLogo.png" style={attstyles.footerimage} />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default PdfAttendance;
