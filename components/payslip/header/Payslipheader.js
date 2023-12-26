import Image from "next/image";
import { useRouter } from "next/router";
import BtoolsHeader from "../../../container/72BTheader/BToolsHeader";

const PayslipHeader = ({ colourChangingHeader }) => {

    const router = useRouter()
    const homeRoute = () => {
        router.push("/")
    }




    return (
        <div className="bg-[#FA754E] relative h-[66vh]  sm:h-[88vh] lg:h-[80vh] md:h-[68vh] w-full" style={{ backgroundColor: colourChangingHeader }}>
            <div className="bg-[#ffffff] md:pl-[85px] sm:pl-[85%] pt-1 h-[7vh] w-full">
                <BtoolsHeader Src="/images/payslipImg.png" Height="35" Width="98" />
            </div>
            <div className="h-[51%] sm:h-[50vh] md:h-[43vh] w-full flex flex-row justify-around sm:justify-center md::justify-center items-center sm:items-center  md:items-center">
                <div className="flex flex-row w-[85%] justify-around  md:justify-between sm:justify-between items-center sm:items-center md:items-end">
                    <div className=" flex flex-col md:pl-[65px] sm:pl-[30px]  w-[72%]  sm:h-[28vh]  md:h-[23vh] h-[20vh] justify-between items-start mb-[40px]">
                        <div className="text-[25px] w-[138%] flex justify-center md:justify-start sm:justify-start  md:text-[40px] sm:text-[30px] font-[sfpro-bold] text-[#FFFFFF] ">
                            <h1>Free Payslip Generator</h1>
                        </div>
                        <div className="w-[140%] text-[17px] flex justify-center text-center sm:text-left md:text-left sm:w-full md:w-full md:text-[23px] sm:text-[17px]  text-[#FFFFFF] md:flex md:justify-start sm:flex sm:justify-start flex-col items-start ">
                            <p className="font-[sfpro-thin]">Say goodbye to confusing and time-consuming payroll processes with our free payslip generator. 
                            Our user-friendly software allows you to create customized payslips in minutes.</p>
                            {/* <p className="font-[sfpro-thin]">
                                use and
                                customizable, this free tool will make payroll
                                smoother.
                            </p> */}
                        </div>
                    </div>
                    <div className=" flex  sm:block w-[29%] justify-end">
                        <div className="hidden sm:block">
                            <Image src="/images/image.png" height={300} width={400}/>
                        </div>

                    </div>
                </div>
            </div>
            {/* <Payslip/> */}
        </div>
    )
}
export default PayslipHeader;