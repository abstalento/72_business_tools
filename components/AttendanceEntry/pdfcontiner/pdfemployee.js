import React, { useEffect, useState } from "react";
import { Document, Page, Text, View, Image, Link } from "@react-pdf/renderer";
import empstyle from "../../../utils/attendance/pdfStyle/pdfemployeedetails";
import { getMonthViewPage } from "../DashBoard/Utiless";
import Service from "../../../services/attendanceEntry/services";

// import {logo} from "../../../public/images/Logo.png";

// Create styles
const PdfContentEmployee = ({ calendarData, Data, ComponentData }) => {
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
      return <View style={empstyle.attStatusPresent}></View>;
    } else if (status == "absent") {
      return <View style={empstyle.attStatusAbsent}></View>;
    } else if (status == "CL") {
      return <View style={empstyle.attStatusCL}></View>;
    } else if (status == "PL") {
      return <View style={empstyle.attStatusPL}></View>;
    } else if (status == "COM") {
      return <View style={empstyle.attStatusCOM}></View>;
    } else if (status == "OFF") {
      return <View style={empstyle.attStatusOFF}></View>;
    } else if (status == "PA") {
      return <View style={empstyle.attStatusPA}></View>;
    } else if (status == "HA") {
      return <View style={empstyle.attStatusHA}></View>;
    }
  };
  const attendanceMarkedSunday = () => {
    return <View style={empstyle.attStatusSunday}></View>;
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
        
        size="A4"
        orientation="landscape"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <View>
          <View style={empstyle.header}>
            <View style={empstyle.headerChild}>
              <View style={empstyle.headerimagedev}>
                {" "}
                <Image src="images/Logo.png" style={empstyle.headerimage} />
              </View>
              <View style={empstyle.headerdev2}>
                {" "}
                <Text> Alpha Business Corporation </Text>{" "}
                <Text>Vannarpettai Tirunelveli, 627005.</Text>{" "}
              </View>
              <View style={empstyle.headerdev3}>
                {" "}
                <Text> Ph- +91 - 78 788 788 00</Text>{" "}
                <Text> E - connect@alpha.com</Text>
              </View>
              <View style={empstyle.headerdevParent}>
                <View style={empstyle.headerdev4}>
                  <Text>Employee Monthly Sheet - Report</Text>
                </View>
              </View>
              <View style={empstyle.headerdev5} className="bg-black">
                <View style={empstyle.headerCalender}>
                  <View>
                    <Text style={{ fontSize: "8px" }}>Month of Attendance</Text>{" "}
                  </View>
                  <View>
                    <Text style={{ fontSize: "13px" }}>
                      {formatted_month_year}
                    </Text>{" "}
                  </View>
                  <View style={empstyle.headerCal}>
                    <Text style={{ fontSize: "8px" }}>No. of Employee</Text>
                    <Text style={{ fontSize: "8px" }}>Date</Text>{" "}
                  </View>
                  <View style={empstyle.headerCale}>
                    <Text style={{ fontSize: "13px", fontWeight: "bold" }}>
                      {Data.length}
                    </Text>{" "}
                    <Text style={{ fontSize: "9px" }}>{formatted_date}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* {ComponentData == "Attendance" && (
            <View style={empstyle.body}>
              <View style={empstyle.bodycolor}>
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
          )} */}

          <View style={empstyle.tablebody}>
            <View style={empstyle.table}>
              <View style={empstyle.tablehead}>
                <View style={empstyle.tableheaddata}>
                  <Text style={{ fontSize: "6px" }}>NO</Text>{" "}
                  <Text style={{ fontSize: "6px" }}>EMP DETAILS</Text>
                  <Text style={{ fontSize: "6px" }}>DATE OF JOIN</Text>{" "}
                  <Text style={{ fontSize: "6px" }}>TYPE OF EMPLOYEE</Text>
                  <Text style={{ fontSize: "6px" }}>SALARY(LPA)</Text>
                  <Text style={{ fontSize: "6px" }}>SALARY PER MONTH</Text>
                  <Text style={{ fontSize: "6px" }}>MODE OF PAY</Text>
                  <Text style={{ fontSize: "6px" }}>PAN NUMBER</Text>
                  <Text style={{ fontSize: "6px" }}>ESI ELIGIBILE</Text>
                  <Text style={{ fontSize: "6px" }}>EMP. MAIL ID</Text>
                  <Text style={{ fontSize: "6px" }}>EMI. NUMBER</Text>
                  <Text style={{ fontSize: "6px" }}>ACCOUNT No</Text>
                  <Text style={{ fontSize: "6px" }}>IFSC CODE</Text>
                  <Text style={{ fontSize: "6px" }}>CONTACT No</Text>
                  <Text style={{ fontSize: "6px" }}>ADDRESS</Text>
                 
                </View>
              </View>
              <View style={empstyle.mapdata}>
                {Data?.map((employee, index) => {
                  return (
                    <View style={empstyle.tabledata}>
                      <View style={empstyle.dayhead}>
                        <Text style={{ fontSize: "7px" }} >
                          {index + 1}{" "}
                        </Text>
                        <View style={empstyle.details}>
                          <Text style={{ fontWeight: "bold",fontSize: "6px"  }}>
                            {employee.empName}{" "}
                          </Text>
                          <Text style={{ fontSize: "10px",fontSize: "6px"  }}>
                            {employee.empID}-{employee.designation}{" "}
                          </Text>
                        </View>
                        <Text style={{ fontSize: "6px",width:"5%"  }}>{employee.doj}</Text>                      
                        <Text style={{ fontSize: "6px",width:"10%"  }}>{employee.empType}</Text>
                        <Text style={{ fontSize: "6px",width:"5%"  }}>{employee.salary}</Text>
                        <Text style={{ fontSize: "6px",width:"8%"}}>{(employee.salary / 12).toFixed(0)}</Text> 
                        <Text style={{ fontSize: "6px",width:"5%"}}>{employee.paymentMode}</Text>
                        <Text style={{ fontSize: "6px",width:"5%"  }}>{employee.panNumber}</Text>               
                        <Text style={{ fontSize: "6px",width:"5%"  }}>{employee.ESI}</Text> 
                        <Text style={{ fontSize: "6px",width:"5%"  }}>{employee.emailID}</Text> 
                        <Text style={{ fontSize: "6px",width:"5%"  }}>{employee.EMINumber}</Text>
                        <Text style={{ fontSize: "6px",width:"5%"  }}>{employee.accNumber}</Text>
                        <Text style={{ fontSize: "6px",width:"5%"  }}>{employee.IFSCCode}</Text>
                        <Text style={{ fontSize: "6px" ,width:"5%" }}>{employee.contactNo}</Text>
                        <Text style={{ fontSize: "6px", width:"5%" }}>{employee.address}</Text>
                       
             
                 
                          
               
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </View>
        </View>

        <View style={empstyle.footer} fixed={true}>
          <View style={empstyle.footer2}>
            <Text style={{ fontSize: "8px" }}>
              This list was maintained by using the 72 BT (Alpha Business
              Solutions) Product.
            </Text>
            <View style={empstyle.footerimagedev}>
              <Image src="images/72BTLogo.png" style={empstyle.footerimage} />
              <Image src="images/72Line.png" style={empstyle.line} />
              <Image src="images/ATLogo.png" style={empstyle.footerimage} />
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default PdfContentEmployee;
