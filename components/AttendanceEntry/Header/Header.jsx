import React from "react"
import { useContext } from "react"
import { useState } from "react"
import GlobalContext from "../../kanbanBoard/Calender/GlobalContext"

const OverAllHeader = ({ Attendances, addEmployee, sendEmployee,searchValue, monthIndex, monthandYear,setMenuItemValue }) => {
    const [monthIndexTarget, setMonthIndexTarget] = useState()
    var newdate = new Date()
    var month = newdate.getMonth()
    var date = newdate.getDate()
    var monthText = newdate.toLocaleString('en', { month: 'long' })
    var year = newdate.getFullYear()
    var dateFormat = month >= 9 ? (month + 1) : "0" + (month + 1)
    var format = year + "-" + dateFormat

    const [openSearchBar, setOpenSearchBar]=useState(false)
    const [openDate, setOpenDateBar]=useState(false)
    const AddEmployee = () => {
        addEmployee()
    
    }
    const handleSearch = (e) => {
        const value = e.target.value
        searchValue(value)
    }

    const setMenuItem=()=>{
        setMenuItemValue()


    }

    const handleSearchOpen=()=>{
         setOpenSearchBar(!openSearchBar)


    }

    const handleDateOpen=()=>{
        setOpenDateBar(!openDate)
    }
    const handleChange = (e) => {
        monthIndex((e.target.value))
        //To set current month calendar
        setMonthIndexTarget(e.target.value)
        if (Attendances == "Attendance") {
            let filterMonth = new Date(e.target.value)
            let month = filterMonth.getMonth()+1
            let day = filterMonth.getFullYear()
            let finalDate=year +" "+ month
            monthandYear(finalDate)
        }
    }
    return (
        <div className="md:w-[full] md:h-[11vh] flex-col bg-[#E8E8E8] flex justify-center items-center">
            <div className="w-[100%] md:h-[10vh] h-[7vh]  flex  items-center">
                <div className="flex items-center w-[100%] md:h-[8vh] justify-evenly">
                    <div className="flex  w-[21%] md:w-[14%] xl:w-[8%] text-sm justify-between items-center">
                       <div className="md:hidden">
                       <img src="/images/menu.png" className="w-7" onClick={setMenuItem}/>
                       </div>
                        {
                            Attendances == "Attendance" ? <img src="../icons/Attendance.svg" alt="" /> : Attendances == "DashBoard" ? <img src="../icons/DashBoard.svg" alt="" /> : <img src="../icons/EmployeeDetails.svg" alt="" />
                        }
                        <h2 className="font-[sfpro-medium] hidden md:block"> {Attendances == "Attendance" ? "Attendance" : "Employees"}</h2>
                    </div>
                    <div className="xl:flex md:w-[23%] xl:w-[19%] xl:gap-0 w-[10%] justify-around hidden md:flex md:gap-2">
                        <input type="month" name="" id="" className="rounded-[6px] outline-none flex" onChange={handleChange} value={monthIndexTarget ? monthIndexTarget : format} />
                        <img src="../icons/CalenderPage.svg" alt="" />
                    </div>
                    <div className="flex border-l-2 border-r-2 border-[#CDD4D9] md:w-[24%] xl:w-[18%] w-[20%] h-[4vh] text-sm md:h-[5vh] lg:w-[20%] justify-center">
                        <div className="flex justify-around w-[47%]  md:w-[85%] xl:w-[58%] lg:w-[76%] items-center hover:bg-[#760BF1] hover:text-white rounded-md" onClick={AddEmployee}>
                            <img src="../icons/add-user.svg" alt="" className="font-bold" />
                            <button className="font-[sfpro-medium] cursor-pointer hidden md:flex"> Add New Employee</button>
                           
                        </div>
                    </div>
                    <div className="flex  w-[25%] justify-between md:hidden">
                    <img src="../icons/CalenderPage.svg" alt="" onClick={handleDateOpen}  />
                    <img src="../icons/Search-Icon.svg" alt="" className=" cursor-pointer "  onClick={handleSearchOpen} />
                    </div>
                    <div className="xl:flex md:flex lg:flex  bg-[#FFFFFF] hidden md:pl-[20px] pl-2 md:w-[32%] md:h-[6vh] lg:w-[37%] xl:w-[44%] w-[50%]  h-[4vh]  rounded-md p-1">
                        <img src="../icons/Search-Icon.svg" alt="" className=" cursor-pointer md:w-5 w-3 opacity-[0.4]" />
                        <input type="search" placeholder="Search by Employee Name" className="w-[100%] outline-none md:ml-1 text-sm" name="search" onChange={handleSearch} />
                    </div>
                </div>
            </div>
          
                    {
                       openSearchBar? 
                       <div className=" w-[100%] h-[10vh] md:hidden flex justify-center items-center">
                             <input type="search" placeholder="Search by Employee Name" className="w-[85%] rounded-lg placeholder-amber-600 placeholder:p-3 h-[6vh] outline-none md:ml-1 text-sm" name="search" onChange={handleSearch} />
                       </div>
                              :openDate && <div className= " w-[100%] h-[10vh] md:hidden flex justify-center items-center ">
                                 <input type="month" name="" id="" className="rounded-[6px] w-[60%] h-[5vh] outline-none " onChange={handleChange} value={monthIndexTarget ? monthIndexTarget : format} />
                          </div>
                    }
          
        </div>
    )
}

export default OverAllHeader;