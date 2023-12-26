import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, Image, Link } from "@react-pdf/renderer";
import styles from "../../../utils/attendance/pdfStyle/attendancepdfViewPage";
import { getMonthViewPage } from "../DashBoard/Utiless";
import Service from "../../../services/attendanceEntry/services";

// import {logo} from "../../../public/images/Logo.png";

// Create styles
const PdfContent = ({ calendarData, Data, ComponentData }) => {
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
      return <View style={styles.attStatusPresent}></View>;
    } else if (status == "absent") {
      return <View style={styles.attStatusAbsent}></View>;
    } else if (status == "CL") {
      return <View style={styles.attStatusCL}></View>;
    } else if (status == "PL") {
      return <View style={styles.attStatusPL}></View>;
    } else if (status == "COM") {
      return <View style={styles.attStatusCOM}></View>;
    } else if (status == "OFF") {
      return <View style={styles.attStatusOFF}></View>;
    } else if (status == "PA") {
      return <View style={styles.attStatusPA}></View>;
    } else if (status == "HA") {
      return <View style={styles.attStatusHA}></View>;
    }
  };
  const attendanceMarkedSunday = () => {
    return <View style={styles.attStatusSunday}></View>;
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
       <View style={styles.header}>
          <View style={styles.headerChild}>
            <View style={styles.headerimagedev}>
              {" "}
              <Image src="images/Logo.png" style={styles.headerimage} />
            </View>
            <View style={styles.headerdev2}>
              {" "}
              <Text> Alpha Business Corporation </Text>{" "}
              <Text>Vannarpettai Tirunelveli, 627005.</Text>{" "}
            </View>
            <View style={styles.headerdev3}>
              {" "}
              <Text> Ph- +91 - 78 788 788 00</Text>{" "}
              <Text> E - connect@alpha.com</Text>
            </View>
            <View style={styles.headerdevParent}>
              <View style={styles.headerdev4}>
                <Text>Employee Monthly Sheet - Report</Text>
              </View>
            </View>
            <View style={styles.headerdev5} className="bg-black">
              <View style={styles.headerCalender}>
                <View>
                  <Text style={{ fontSize: "8px" }}>Month of Attendance</Text>{" "}
                </View>
                <View>
                  <Text style={{ fontSize: "13px" }}>
                    {formatted_month_year}
                  </Text>{" "}
                </View>
                <View style={styles.headerCal}>
                  <Text style={{ fontSize: "8px" }}>No. of Employee</Text>
                  <Text style={{ fontSize: "8px" }}>Date</Text>{" "}
                </View>
                <View style={styles.headerCale}>
                  <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                    {Data?.length}
                  </Text>{" "}
                  <Text style={{ fontSize: "9px" }}>{formatted_date}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          <View style={styles.bodycolor}>
            <View style={styles.bodyListColor}>
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
            <View style={styles.bodyListColor}>
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
        <View style={styles.tablebody}>
          <View style={styles.table}>
            <View style={styles.tablehead}>
              <View style={styles.tableheaddata}>
                <Text style={{ fontSize: "8px" }}>NO</Text>{" "}
                <Text style={{ fontSize: "8px" }}>EMP DETAILS</Text>
              </View>
              <View style={styles.calender}>
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
                <View style={styles.calhead}>
                  <View style={styles.calhead1}>
                    {calendarData.map((d) => (
                      <View style={styles.calhead2}>
                        <Text>{d.dayName}</Text>
                        <Text>{d.date}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.mapdata}>
              {Data?.map((employee, index) => {
                return (
                  <View style={styles.tabledata}>
                    <View style={styles.dayhead}>
                      <Text>{index + 1} </Text>
                      <View style={styles.details}>
                        <Text style={{ fontSize: "8px" }}>
                          {employee.empName}{" "}
                        </Text>
                        <Text style={{ fontSize: "8px" }}>
                          {employee.empID}-{employee.designation}{" "}
                        </Text>
                      </View>
                    </View>
                    {/* <View style={style.dayscount}>
                        <View style={style.present}></View>
                        <View style={style.absent}></View>
                        <View style={style.others}></View>
                      </View> */}
                    <View style={styles.attendanceHead}>
                      {calendarData.map((cal, index) => {
                        return (
                          <View style={styles.tablebodydata}>
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

        <View style={styles.footer} fixed={true}>
          <View style={styles.footer2}>
            <Text style={{ fontSize: "8px" }}>
              This list was maintained by using the 72 BT (Alpha Business
              Solutions) Product.
            </Text>
            <View style={styles.footerimagedev}>
              <Image src="images/72BTLogo.png" style={styles.footerimage} />
              <Image src="images/72Line.png" style={styles.line} />
              <Image src="images/ATLogo.png" style={styles.footerimage} />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default PdfContent;
