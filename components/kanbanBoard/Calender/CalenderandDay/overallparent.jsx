import React from "react";
import Calender from "../calender";
import ContextWrapper from "../ContactWrapper";
import DayPage from "../DayPage/DayPage";


const CalenderParent=()=>{

    return (
        <div>
          
       <ContextWrapper><Calender/></ContextWrapper>
        <ContextWrapper><DayPage/></ContextWrapper>

        </div>
    )
}

export default CalenderParent;