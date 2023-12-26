import React, { useContext, useState, useEffect } from "react";
import GlobalContext from "../../kanbanBoard/Calender/GlobalContext";
import OverAllHeader from "../Header/Header";
import ViewPopup from "./Popup";
import AttendanceViewPages from "./ViewPage";
import Service from "../../../services/attendanceEntry/services";
import Head from "next/head";
const DashBoard = ({ Attendances, ViewPages, sendEmployee,setMenuItem, setMenuItemValueDataa}) => {
    const { setOpenViewPopup, setSelectedemployee, setDashBoardData ,getDashPopup,setGetDashPopup} = useContext(GlobalContext)
    // const {getDashPopup,setGetDashPopup } = useContext(GlobalContext)
    const [searchEmp, setSearchEmp] = useState()
    const [empDetails, setEmpDetails] = useState([])
    const [getValue,setGetValue]=useState(false)
    


    const search = (data) => {
        let val=data.toLowerCase()
        setSearchEmp(val)
       
    }
 
    const month = (data) => {
        let date = new Date(data)
        let monthValue = date.getMonth() + 1
        let year = date.getFullYear()
        let myMonth = monthValue >= 9 ? monthValue : ("0" + monthValue)
        let finalData = myMonth + '-' + year
        calculatePresentAbsent(finalData, empDetails)
    }
    const calculatePresentAbsent = (finalData, empDetails) => {
        let cloneEmpDetails = [...empDetails]
        cloneEmpDetails.map((emp) => {
            let totPresent = 0, totAbsent = 0, totCL = 0, totOff = 0, totPL = 0, totCom = 0, totPA = 0, totHA = 0
            emp.Attendance.map((att) => {
                let data = att.date.includes(finalData)
                if (data) {
                    if (att.status == 'present') {
                        totPresent = totPresent + 1
                    }
                    else if (att.status == 'absent') {
                        totAbsent = totAbsent + 1
                    }
                    else if (att.status == 'CL') {
                        totCL = totCL + 1
                    }
                    else if (att.status == 'OFF') {
                        totOff = totOff + 1
                    }
                    else if (att.status == 'PL') {
                        totPL = totPL + 1
                    }
                    else if (att.status == 'COM') {
                        totCom = totCom + 1
                    }
                    else if (att.status == 'PA') {
                        totPA = totPA + 1
                    }
                    else {
                        totHA = totHA + 1
                    }
                }
            })
            let monthlySalary = Math.round((emp.salary / 12))
            let daySalary = Math.round((monthlySalary / 26))
            emp.totalPresent = totPresent + (totHA * 0.5) + (totPA * 0.5)
            emp.totalAbsent = totAbsent + (totHA * 0.5) + (totPA * 0.5)
            emp.totalCL = totCL
            emp.totalOff = totOff
            emp.totalPL = totPL
            emp.totalCom = totCom
            emp.totalPA = totPA
            emp.totalHA = totHA
            emp.netSalary = monthlySalary - (emp.totalAbsent * daySalary).toFixed(0)
        })
        setDashBoardData(cloneEmpDetails)
        setEmpDetails(cloneEmpDetails)
       
    }
    const addEmployee = () => {
        sendEmployee()
    };

    const setMenuItemValueData=()=>{
        setMenuItem()
      
    }

    const sendEmployeeDetails=(data,index)=>{
      
        setSelectedemployee(data)
        setOpenViewPopup(true)
        setGetValue(true)
       
    }

    const setMenuItemValue=()=>{
        setMenuItemValueDataa()
    }
    useEffect(() => {
        (async function Change() {
            try {
             
                await Service.getEmployeeDetails();
                await Service.getEmployeeDetails();
                await Service.getEmployeeDetails();
                const attendanceEntry = await Service.getEmployeeDetails();
                setEmpDetails(attendanceEntry.EmployeeDetails)
                var newdate = new Date()
                var month = newdate.getMonth()
                var year = newdate.getFullYear()
                var dateFormat = month >= 9 ? (month + 1) : "0" + (month + 1)
                var format = dateFormat + "-" + year
                calculatePresentAbsent(format, attendanceEntry.EmployeeDetails?attendanceEntry.EmployeeDetails:"")
        
            } catch (err) {
                alert(JSON.stringify(err))
            }
        })()
    }, [getDashPopup])
    return (
        <>
            {
                ViewPages == true ? <AttendanceViewPages  setMenuItemValue={setMenuItemValueData}  setMenuItemValueDataa={setMenuItemValue}/> : <div className=" w-[100%] h-screen" >
                    <OverAllHeader addEmployee={addEmployee} setMenuItemValue={setMenuItemValueData} Attendances={Attendances} searchValue={search} monthIndex={month} />
                    <div className="w-full flex items-center justify-around" onClick={setMenuItemValue}>

                    <div className="flex overflow-x-scroll scroll-smooth scrollBar py-2 w-[94%] xl:w-[98%] rounded-md">
              <div className=" w-[100%] h-[85vh] flex justify-center items-center bg-[#fafafa]">
                <div className="  h-[80vh] w-[100%] bg-[#FFFFFF] ">
                  <div class=" mx-auto  sm:px-8">
                    <div class="">
                      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div class="inline-block min-w-full shadow-md rounded-lg ">
                          <table class="w-[120rem] leading-normal rounded-sm">
                            <thead className=" bg-[#232E38] rounded-xl">
                              <tr className="">
                                <th class="px-5 py-5 font-[sfpro-medium] bg-[#232E38] rounded-tl-md border-b-2 border-gray-200 text-[#fff] text-center  text-xs font-normal  uppercase tracking-wider">
                                  NO
                                </th>
                                <th class="px-10 py-3  border-b-2 border-gray-200 text-[#fff] font-normal text-xs  text-left  ">
                                  EMP. DETAILS
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 text-[#fff]  text-left  text-xs font-normal  uppercase tracking-wider">
                                BASE DAYS
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 text-[#fff]  text-center text-xs font-normal  uppercase tracking-wider">
                                PRESENT
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 text-[#fff]  text-center text-xs font-normal  uppercase tracking-wider">
                                ABSENT
                                </th>
                                <th class="px-8 py-3 border-b-2 border-gray-200 text-[#fff]  text-center  text-xs font-normal  uppercase tracking-wider">
                                CL DAYS
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 text-[#fff]  text-center  text-xs font-normal  uppercase tracking-wider">
                                 OFF
                                </th>
                                <th class="px-4 py-3 border-b-2 border-gray-200 text-[#fff]  text-center  text-xs font-normal  uppercase tracking-wider">
                                PL DAYS
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 text-[#fff]  text-center  text-xs font-normal  uppercase tracking-wider">
                                COM OFF DAYS
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 text-[#fff]  text-center  text-xs font-normal  uppercase tracking-wider">
                                PA DAYS
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 text-[#fff]  text-center  text-xs font-normal  uppercase tracking-wider">
                                HA DAYS
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 text-[#fff]  text-center  text-xs font-normal  uppercase tracking-wider">
                                GROSS SALARY OF THE MONTH
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 text-[#fff]  text-center  text-xs font-normal  uppercase tracking-wider">
                                NET SALARY OF THE MONTH
                                </th>
                                <th class="px-5 py-3  border-gray-200 text-[#fff]  text-center  text-xs font-normal  uppercase tracking-wider rounded-tr-md">
                                REPORTS
                                </th>
                              </tr>
                            </thead>

                            <tbody className="">
                              {empDetails?.filter(data => data.empName.toLowerCase().includes(searchEmp == undefined ? "" : searchEmp)).map((value, index) => {
                                  return (
                                    <tr >
                                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm" 
                                    >
                                        <div class="flex" >
                                          <div class="">
                                            <p class="text-gray-900 whitespace-no-wrap">
                                              {index + 1}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      <td class=" py-5 border-b flex flex-col border-gray-200 bg-white text-left text-sm">
                                         {value.empName}
                                        <div className="flex  ">
                                        {value.empID}-{value.designation}
                                        </div>
                                      </td>
                                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
                                        {26}
                                      </td>
                                      <td class=" py-5 border-b border-gray-200 bg-white text-sm text-center">
                                      {value.totalPresent}
                                      </td>
                                      <td class=" py-5 border-b border-gray-200 bg-white text-sm text-center">
                                      {value.totalAbsent}
                                      </td>
                                      <td className="border-b  border-gray-200 bg-white text-sm text-center">
                                      {value.totalCL}
                                      </td>
                                      <td className="border-b  border-gray-200 bg-white text-sm text-center">
                                      {value.totalOff}
                                      </td>
                                      <td className="border-b  border-gray-200 bg-white text-sm text-center">
                                      {value.totalPL}
                                      </td>
                                      <td className="border-b  border-gray-200 bg-white text-sm text-center">
                                      {value.totalCom}
                                      </td>

                                      <td className="border-b  border-gray-200 bg-white text-sm text-center">
                                      {value.totalPA}
                                      </td>

                                      <td className="border-b  border-gray-200 bg-white text-sm text-center">
                                      {value.totalHA}
                                      </td>
                                      <td className="border-b  border-gray-200 bg-white text-sm text-center">
                                      {(value.salary / 12).toFixed(0)}
                                      </td>
                                      <td className="border-b  border-gray-200 bg-white text-sm text-center">
                                      {value.netSalary}
                                      </td>

                                      <td className="border-b  border-gray-200 bg-white text-sm text-center">
                                      <button className="bg-[#456FF8] px-3 py-1 rounded-md text-white" onClick={()=>sendEmployeeDetails(value,index)}>View</button>
                                      </td>
                                     
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

             
              </div>
            </div>



                        
                        {/* <div className="flex overflow-x-scroll scroll-smooth kanbanContentscroll py-2 w-[94%] xl:w-[97%] rounded-md">
                            <div className="flex flex-nowrap mb-[5px]" >
                                <div className="flex items-center justify-center bg-[#fafafa] w-[full]">
                                    <div className="md:w-[96%] h-[86vh] md:h-[85vh] xl:w-[105rem] flex items-center justify-center">
                                        <div className="w-[100%] h-[80vh] bg-[#ffffff] md:h-[75vh]">
                                            <div className="bg-[#232E38] h-[7vh] w-[100%] lg:gap-10  md:h-[8vh]  gap-10  flex font-[sfpro-regular-display] justify-between text-[9px] md:text-[11px] text-white  p-2 items-center rounded-t-[10px]">
                                                <p className="md:w-[5%] xl:w-[3%] w-[2%] font-[sfpro-medium] text-center">No</p>
                                                <p className="md:w-[30%] xl:w-[28%] w-[24%] font-[sfpro-medium] text-center">EMP DETAILS</p>
                                                <p className="md:w-[15%] w-[9rem] xl:w-[20%] lg:w-[18%] font-[sfpro-medium] text-center ">BASE DAYS</p>
                                                <p className="md:w-[10%] xl:w-[18%] w-[6rem] font-[sfpro-medium] text-center">PRESENT</p>
                                                <p className="md:w-[10%] xl:w-[12%] w-[5rem] font-[sfpro-medium] text-center">ABSENT</p>
                                                <p className="md:w-[10%] w-[8%] font-[sfpro-medium] text-center">CL DAYS</p>
                                                <p className="md:w-[10%] xl:w-[11%] w-[10%] font-[sfpro-medium] text-center">OFF</p>
                                                <p className="md:w-[10%] w-[10%] font-[sfpro-medium] text-center">PL DAYS</p>
                                                <p className="md:w-[10%] w-[10%] font-[sfpro-medium] text-center">COM OFF DAYS</p>
                                                <p className="md:w-[10%]  w-[10%] font-[sfpro-medium] text-center">PA DAYS</p>
                                                <p className="md:w-[10%] w-[10%] font-[sfpro-medium] text-center">HA DAYS</p>
                                                <p className="md:w-[30%] w-[23%] font-[sfpro-medium] text-center">GROSS SALARY OF THE MONTH</p>
                                                <p className="md:w-[30%] w-[20%] font-[sfpro-medium] text-center">NET SALARY OF THE MONTH</p>
                                                <p className="md:w-[7%] w-[8%] lg:w-[5%] font-[sfpro-medium] text-center">REPORTS</p>
                                            </div>
                                            <div className="max-h-[72vh] overflow-scroll scrollBar mt-2">
                                                {
                                                    empDetails?.filter(data => data.empName.toLowerCase().includes(searchEmp == undefined ? "" : searchEmp)).map((value, index) => {
                                                      
                                                        return (
                                                            <div className="flex lg:gap-11 md:gap-12 gap-6 w-[100%] font-[sf-pro-medium]  text-[11px] md:text-[14px] justify-between p-1 border-b-2 items-center text-center">
                                                                <p className="md:w-[5%] w-[2%] font-[sfpro-regular] text-center">{index + 1}  </p>
                                                                <div className="md:w-[21rem] w-[18%] lg:w-[21rem]">
                                                                    <h3 className="font-[sfpro-medium] text-center font-bold md:w-[100%]">{value.empName}</h3>
                                                                    <p className="text-[11px] font-[sfpro-regular] text-center md:w-[100%]">{value.empID}-{value.designation}</p>
                                                                </div>
                                                                <div className="md:w-[15%] xl:w-[28%] w-[14%]">
                                                                    <h3 className="font-[sfpro-regular] items-center ml-3 xl:w-[78%]">{26}</h3>
                                                                </div>
                                                                <div className="md:w-[10%] xl:w-[10%] w-[8%]">
                                                                    <h3 className="font-[sfpro-regular] items-center">{value.totalPresent}</h3>
                                                                </div>
                                                                <div className="md:w-[10%] w-[10%]">
                                                                    <h3 className="font-[sfpro-regular] items-center ">{value.totalAbsent}</h3>
                                                                </div>
                                                                <div className="md:w-[10%] w-[10%]">
                                                                    <h3 className="font-[sfpro-regular] items-center ">{value.totalCL}</h3>
                                                                </div>
                                                                <div className="md:w-[10%] w-[8%]">
                                                                    <h3 className="font-[sfpro-regular] items-center ">{value.totalOff}</h3>
                                                                </div>
                                                                <div className="md:w-[10%] w-[6rem]">
                                                                    <h3 className="font-[sfpro-regular] items-center">{value.totalPL}</h3>
                                                                </div>
                                                                <div className="md:w-[10%] w-[9rem]">
                                                                    <h3 className="font-[sfpro-regular] items-center ">{value.totalCom}</h3>
                                                                </div>
                                                                <div className="md:w-[10%] w-[10%]">
                                                                    <h3 className="font-[sfpro-regular] items-center ">{value.totalPA}</h3>
                                                                </div>
                                                                <div className="md:w-[10%] w-[10%]">
                                                                    <h3 className="font-[sfpro-regular] items-center">{value.totalHA}</h3>
                                                                </div>
                                                                <div className="md:w-[25%] w-[22%]">
                                                                    <h3 className="font-[sfpro-regular] items-center text-center ">{(value.salary / 12).toFixed(0)}</h3>
                                                                </div>
                                                                <div className="md:w-[25%] w-[12%]">
                                                                    <h3 className="font-[sfpro-regular] items-center text-center ">{value.netSalary}</h3>

                                                                </div>
                                                                <div className="md:w-[7%] w-[7%]" >
                                                                    <button className="bg-[#456FF8] px-3 py-1 rounded-md text-white" onClick={()=>sendEmployeeDetails(value)}>View</button>
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            </div>
                             */}
                            
                            </div>
                </div>
            }
        </>
    )
}
export default DashBoard;