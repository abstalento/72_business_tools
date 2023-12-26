import { useState } from "react";
import FeedBackPage from "../../components/feedBackpage/feedBackPage";
import PayslipFooter from "../../components/payslip/footer/payslipfooter";
import PayslipHeader from "../../components/payslip/header/Payslipheader";
import Payslip from "../../components/payslip/payslipcontent/Content";

const Parent=()=>{
    const [colour,setColour]=useState()
    const colourChanger =(data)=>{
        setColour(data)
    }
    return(
        
        <div className="flex flex-col justify-center items-center  md:w-[123%] lg:w-full">
            {/* <FeedBackPage/> */}
            <PayslipHeader colourChangingHeader={colour}/>
            <Payslip callBackColour={colourChanger} />
            {/* <PayslipFooter/> */}
        </div>
    )
    
}
export default Parent;