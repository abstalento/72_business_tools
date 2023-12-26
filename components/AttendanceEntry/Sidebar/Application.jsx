
import React, { useState,useContext }  from "react";
import ContextWrapper from "../../kanbanBoard/Calender/ContactWrapper";
import GlobalContext from "../../kanbanBoard/Calender/GlobalContext";
import Attendance from "../Attendance/Attendance";
import DashBoard from "../DashBoard/DashBoard";
import Employee from "../Employee/Employee";
// import Settings from "../Settings/Settings";
import CommonSideBar from "./sidebar";


const Application =({ViewPage, sendActiveComponents})=>{

    const { getDashPopup} = useContext(GlobalContext)
    const [activeComponent, setActiveComponent] = useState("DashBoard");

    const [ProjectTextColor, setProjectTextColor] = useState(false);
    const [userId, setUserId] = useState()
    const [OverviewTextColor, setOverviewTextColor] = useState('#3D5AFE');
 
    const [CalenderTextColor, setCalenderTextColor] = useState(false);
    const [ArchivedTextColor, setArchivedTextColor] = useState(false);
    const [addEmployee,setAddEmployee]=useState(false)
 
    const [saveData, setSaveData] = useState(false)
    const [menu, setMenu] = useState(false)
    const [setUseEffect, setUseEffectFun]=useState(0)
   //  const [popdata,setPopData]= useState(getDashPopup)



 const setMenuValue = () => {
   setMenu(!menu)

}
const setMenuItemValueDataa=()=>{
   setMenu(false)
}
    const handleTabClick = (component) => {
        switch (component) {
           case "DashBoard":
              setProjectTextColor(false);
              setOverviewTextColor(true);
              setCalenderTextColor(false);
            //   setArchivedTextColor(false)
  
              break;
           case "Attendance":
              setOverviewTextColor(false);
              setCalenderTextColor(false);
              setProjectTextColor(true);
            //   setArchivedTextColor(false)
              break;
           case "EmployeeDetails":
              setCalenderTextColor(true);
              setProjectTextColor(false);
              setOverviewTextColor(false);
            //   setArchivedTextColor(false)
              setSaveData(true);
              break;
  
         //   case "Settings":
         //      setCalenderTextColor(false);
         //      setProjectTextColor(false);
         //      setOverviewTextColor(false);
         //      setArchivedTextColor(true)
  
         //      break;
        }
  
        setActiveComponent(component);

        sendActiveComponents(component)
     };

     const sendEmployee=()=>{
      handleTabClick("EmployeeDetails")
      setAddEmployee(true)
     }

   //  console.log(activeComponent,"activeComponentactiveComponent")

     const renderComponent = {
        DashBoard:<DashBoard sendEmployee={sendEmployee} setMenuItem={setMenuValue} setMenuItemValueDataa={setMenuItemValueDataa} Attendances={activeComponent} onNext={() => setActiveComponent("DashBoard")} ViewPages={ViewPage} />  ,
        Attendance: <Attendance setMenuItem={setMenuValue} setMenuItemValueDataaClose={setMenuItemValueDataa} sendEmployee={sendEmployee} Attendances={activeComponent}  onNext={() => setActiveComponent("Attendance")}/>  ,
        EmployeeDetails: <Employee setMenuItem={setMenuValue}  setMenuItemValueDataaClose={setMenuItemValueDataa} setAddEmployee={addEmployee}  Attendances={activeComponent} onNext={() => setActiveComponent("EmployeeDetails")}/>,
      //   Settings: <Settings onNext={() => setActiveComponent("Settings")}/>,

        "": null,
     }
    return (
       <div className="">
        <CommonSideBar  onTabClick={handleTabClick}
            ProjectTextColor={ProjectTextColor}
            OverviewTextColor={OverviewTextColor}
            CalenderTextColor={CalenderTextColor}
            menuValue={menu}
            // ArchivedTextColor={ArchivedTextColor}
            >

        {renderComponent[activeComponent || ""]}
        </CommonSideBar>
       </div>
    )
}

export default Application;