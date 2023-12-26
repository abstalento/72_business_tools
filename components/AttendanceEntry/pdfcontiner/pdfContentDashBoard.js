import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, Image, Link } from "@react-pdf/renderer";
import style from "../../../utils/attendance/pdfStyle/attendancepdfDashBoard";
import { getMonthViewPage } from "../DashBoard/Utiless";
import Service from "../../../services/attendanceEntry/services";

// import {logo} from "../../../public/images/Logo.png";

// Create styles
const PdfContentDashBoard = ({ calendarData, Data, ComponentData }) => {
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

  const attendanceMarked = (status) => {
    if (status == "present") {
      return <View style={style.attStatusPresent}></View>;
    } else if (status == "absent") {
      return <View style={style.attStatusAbsent}></View>;
    } else if (status == "CL") {
      return <View style={style.attStatusCL}></View>;
    } else if (status == "PL") {
      return <View style={style.attStatusPL}></View>;
    } else if (status == "COM") {
      return <View style={style.attStatusCOM}></View>;
    } else if (status == "OFF") {
      return <View style={style.attStatusOFF}></View>;
    } else if (status == "PA") {
      return <View style={style.attStatusPA}></View>;
    } else if (status == "HA") {
      return <View style={style.attStatusHA}></View>;
    }
  };
  const attendanceMarkedSunday = () => {
    return <View style={style.attStatusSunday}></View>;
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
          <View style={style.header}>
            <View style={style.headerChild}>
              <View style={style.headerimagedev}>
                {" "}
                <Image src="images/Logo.png" style={style.headerimage} />
              </View>
              <View style={style.headerdev2}>
                {" "}
                <Text> Alpha Business Corporation </Text>{" "}
                <Text>Vannarpettai Tirunelveli, 627005.</Text>{" "}
              </View>
              <View style={style.headerdev3}>
                {" "}
                <Text> Ph- +91 - 78 788 788 00</Text>{" "}
                <Text> E - connect@alpha.com</Text>
              </View>
              <View style={style.headerdevParent}>
                <View style={style.headerdev4}>
                  <Text>Employee Monthly Sheet - Report</Text>
                </View>
              </View>
              <View style={style.headerdev5} className="bg-black">
                <View style={style.headerCalender}>
                  <View>
                    <Text style={{ fontSize: "8px" }}>Month of Attendance</Text>{" "}
                  </View>
                  <View>
                    <Text style={{ fontSize: "13px" }}>
                      {formatted_month_year}
                    </Text>{" "}
                  </View>
                  <View style={style.headerCal}>
                    <Text style={{ fontSize: "8px" }}>No. of Employee</Text>
                    <Text style={{ fontSize: "8px" }}>Date</Text>{" "}
                  </View>
                  <View style={style.headerCale}>
                    <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                      {Data.length}
                    </Text>{" "}
                    <Text style={{ fontSize: "9px" }}>{formatted_date}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {ComponentData == "Attendance" && (
            <View style={style.body}>
              <View style={style.bodycolor}>
                <View style={style.bodyListColor}>
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
                <View style={style.bodyListColor}>
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
                    <Text style={{ fontSize: "10px" }}>
                      PL - Privilege Leave
                    </Text>
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
                    <Text style={{ fontSize: "10px" }}>
                      PA - Half Day leave
                    </Text>
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
                    <Text style={{ fontSize: "10px" }}>
                      HA - Half Day Absent
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          <View style={style.tablebody}>
            <View style={style.table}>
              <View style={style.tablehead}>
                <View style={style.tableheaddata}>
                  <Text style={{ fontSize: "8px" }}>NO</Text>{" "}
                  <Text style={{ fontSize: "8px" }}>EMP DETAILS</Text>
                  <Text style={{ fontSize: "8px" }}>WORKING DAYS</Text>{" "}
                  <Text style={{ fontSize: "8px" }}>PRESENT</Text>
                  <Text style={{ fontSize: "8px" }}>ABSENT</Text>
                  <Text style={{ fontSize: "8px" }}>CL DAYS</Text>
                  <Text style={{ fontSize: "8px" }}>OFF</Text>
                  <Text style={{ fontSize: "8px" }}>PL DAYS</Text>
                  <Text style={{ fontSize: "8px" }}>COM OFF DAYS</Text>
                  <Text style={{ fontSize: "8px" }}>PA DAYS</Text>
                  <Text style={{ fontSize: "8px" }}>HA DAYS</Text>
                  <Text style={{ fontSize: "8px" }}>
                    GROSS SALARY OF THE MONTH
                  </Text>
                  <Text style={{ fontSize: "8px" }}>
                    NET SALARY OF THE MONTH
                  </Text>
                </View>
              </View>
              <View style={style.mapdata}>
                {Data?.map((employee, index) => {
                  return (
                    <View style={style.tabledata}>
                      <View style={style.dayhead}>
                        <Text>
                          {index + 1}{" "}
                        </Text>
                        <View style={style.details}>
                          <Text style={{ fontSize: "8px" }}>
                            {employee.empName}{" "}
                          </Text>
                          <Text style={{ fontSize: "8px" }}>
                            {employee.empID}-{employee.designation}{" "}
                          </Text>
                        </View>
                        <Text>{28}</Text>
                       
                        <Text>{employee.totalPresent}</Text>
                        <Text>{employee.totalAbsent}</Text>
                        <Text>{employee.totalCL}</Text>
                        <Text>{employee.totalOff}</Text>
                        <Text>{employee.totalPL}</Text>
                        <View style={{ width: "3%" }}> <Text>{employee.totalCom}</Text> </View>
                       
                        <View style={{ width: "2%" }}> <Text>{employee.totalPA}</Text> </View>
                        <View style={{ width: "7%" }}> <Text>{employee.totalHA}</Text> </View>
                       
                        <View style={{ width: "10%" }}>
                     
                          <Text>{(employee.salary / 12).toFixed(0)}</Text>
                        </View>
                        <View style={{ width: "8%" }}>
                 
                          <Text>{employee.netSalary}</Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>

        <View style={style.footer} fixed={true}>
          <View style={style.footer2}>
            <Text style={{ fontSize: "8px" }}>
              This list was maintained by using the 72 BT (Alpha Business
              Solutions) Product.
            </Text>
            <View style={style.footerimagedev}>
              <Image src="images/72BTLogo.png" style={style.footerimage} />
              <Image src="images/72Line.png" style={style.line} />
              <Image src="images/ATLogo.png" style={style.footerimage} />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default PdfContentDashBoard;
