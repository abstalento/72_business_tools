// import CompanyDetails from "../../components/AttendanceEntry/CompanyDetails/CompanyDetails"
import FieldSetUp from "../../components/AttendanceEntry/FieldSet/FieldSetUp"
import ContextWrapper from "../../components/kanbanBoard/Calender/ContactWrapper"
import LandingPages from "./landingpage"
import BtoolsFooter from "../../container/72BTfooter/BToolsFooter"
import BtoolsHeader from "../../container/72BTheader/BToolsHeader"
import EmployeeDetailsPopup from "../../components/AttendanceEntry/Popup/EmployeeDetailsPopup"
import { useContext } from "react"
import GlobalContext from "../../components/kanbanBoard/Calender/GlobalContext"

const AttendanceEntry=()=>{

    const {OpenPopupPage}=useContext(GlobalContext)

   
    return(
        <div className="">
        <ContextWrapper><LandingPages/> </ContextWrapper> 
       
         
        </div>
    )
}

export default AttendanceEntry