import React, { useContext, useEffect, useState } from "react";
import DayHead from "./DayHead";

import { getMonth } from "../util";
// import Month from "./Month";
import GlobalContext from "../GlobalContext";
import PreviousMap from "postcss/lib/previous-map";



const DayPage = (props) => {

    const [currenMonth, setCurrentMonth] = useState(getMonth())

    const { monthIndex } = useContext(GlobalContext)

    useEffect(() => {

        setCurrentMonth(getMonth(monthIndex))

    }, [monthIndex])

   const changeValue=(data)=>{
     
        props.sendValue(data)
        
    }


    return (
        <div className="h-screen w-auto bg-[#F5F7F9]">
            <DayHead changeValue={changeValue} />
         
        
        </div>
    )
}

export default DayPage;