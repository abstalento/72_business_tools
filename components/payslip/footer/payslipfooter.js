import { useEffect, useState } from "react"
var converter = require('number-to-words');
import Image from "next/image";
import PdfProvider from "../pdfproviderpayslip/Pdfproviderpayslip" //"../pdfproviderpayslip/pdfproviderpayslip";
import PdfContent from "../pdfcontentpayslip/Pdfcontentpayslip";


const PayslipFooter = (props) => {

    const [ountPutCalculation, setOutPutCalculation] = useState(0)
    const [numbertoText, setNumberToText] = useState("")
    const [allData, setAllData] = useState({})
    // const amountInWords = numWords(ountPutCalculation)


    const handleRefresh = (event) => {
        const { name } = event.target
        props.handleClick(name)
    }

    const handlePaySlipGenerator = (data) => {
        props.handlegenerateslip(data)
    }
    useEffect(() => {

        if (props.earningsvalue || props.deductionvalue) {
            let earnings = Number(props.earningsvalue) - Number(props.deductionvalue)
            let value = Math.abs(earnings)
            setOutPutCalculation(value)

            let amountInWords = converter.toWords(value)
            setNumberToText(amountInWords)
        }
        setAllData(props.payList)
        //   console.log(props.payList,"paylist");
    }, [props])

    // console.log(props.colourchanger,"colourchangercolourchangercolourchanger");

    return (
        <div className="  sm:h-[60vh] md:h-[60vh] h-[45vh] w-full">
            <div className="flex flex-col justify-center items-center bg-[#000000] sm:h-[60vh] md:h-[60vh] h-[40vh] w-full" >
                <div className="w-full flex flex-col justify-between items-center h-[80%]">
                    <div className=" bg-[#ffffff] rounded-[5px] h-[40vh] w-[85%] flex flex-col justify-center items-center">
                        <div className=" w-full flex flex-col justify-between items-center h-[22vh] md:h-[30vh] sm:h-[30vh]">
                            <h1 className="sm:text-[30px] md:text-[30px] text-[22px] font-[sfpro-regular] " >Total Net Payable : {props.currencyData}{Number(ountPutCalculation).toFixed(2)}</h1>
                            <h1 className="text-[16px] font-[sfpro-regular] ">Rupees in Words: - {numbertoText==""?"Zero":numbertoText} Only</h1>
                            <h1 className="sm:text-[18px] md:text-[18px] text-[10px] font-[sfpro-regular] ">( Total Net Payable = Gross Earnings - Total Deductions )</h1>
                            <div className="flex flex-row justify-between sm:w-[60%] md:w-[40%] w-[85%]" > 
                                <PdfProvider
                                    ButtonComponent={(props) => (

                                        <button name="Generate Payslip" 
                                        onClick={()=>allData.employeeName !== "" && allData.employeeID !== "" 
                                        && allData.companyName !=="" && allData.paidDays !== ""  ? 
                                        props.onClick() : handlePaySlipGenerator()} 
                                        className="bg-[#00A663] rounded-[5px] sm:w-[220px] md:w-[220px] w-[117px] text-[#FFFFFF] sm:text-[22px] md:text-[22px] text-[15px] text-center h-[5vh] md:h-[7vh] sm:h-[7vh]">
                                            Generate Payslip</button>

                                    )}
                                    disabled={!!(props?.payList?.companyName === "" || props?.payList?.companyName == undefined)}
                                    pdfDocument={
                                        props?.payList?.employeeName ? <PdfContent data={props.payList}
                                            imageoutput={props.imageoutput} earningsvalue={props.earningsvalue}
                                            deductionvalue={props.deductionvalue} earningsAdditionals={props.earningsAdditionals}
                                            deductionsAdditional={props.deductionsAdditional} paysummary={props.paysummary}
                                            defaultDate={props.defaultDate} monthandyear={props.monthandyear}
                                            colourchanger={props.colourchanger} currencySymbol={props.currencyData}/> : <></>
                                    }
                                ></PdfProvider>
                                <div onClick={handleRefresh} className="bg-[#F0483F] rounded-[5px] cursor-pointer sm:w-[220px] md:w-[220px] w-[117px] text-[#FFFFFF] flex justify-center items-center  sm:text-[22px] md:text-[22px] text-[15px] text-center h-[5vh] md:h-[7vh] sm:h-[7vh]">
                                    <Image height={20} width={20} className="pt-5" src="/icons/refresh.svg" />
                                    <button name="Reset" className="pl-3 pt-[17px] cursor-pointer pb-5"  > Reset</button>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between items-center sm:w-[44%] md:w-[44%] w-[85%] md:h-[2vh] sm:h-[2vh] h-[10vh] ">
                        <h1 className="text-[#ffffff] text-[10px] sm:text-[16px] md:text-[16px]">Give feedback What do you experience with our product ?</h1>
                        <button className="w-[220px] sm:h-[6vh] md:h-[6vh] h-[4vh] bg-[#FFFFFF] rounded-[5px] text-[#0A0A0A] font-[sfpro-bold] cursor-not-allowed">FEEDBACK</button>
                    </div>
                </div>
            </div>
            <footer className="p-3 text-xs font-[sfpro-medium] bg-white text-center ">
                © 2023,{" "}
                <a href="https://alphabsolutions.com/">
                    Alpha Business Solutions Pvt. Ltd.
                </a>{" "}
                All Rights Reserved.
            </footer>
        </div>
    )
}
export default PayslipFooter;