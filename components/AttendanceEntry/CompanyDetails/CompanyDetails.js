import React, { useEffect, useState } from "react";
import ButtonAttendance from "../ButtonAttendance";
import EmployeeDetails from "../EmployeeDetails/EmployeeDetails";
import ImageAttendance from "../ImageAttendance";
import InputAttendance from "../InputAttendance";

const CompanyDetails = (props) => {
    const [companyDetails,setCompanyDetails] = useState({
        companyName :'',
        companyCategory:'',
        contactNumber:'',
        mailId:'',
        numberOfEmployee:'',
        companyLocation:'',

    })
    const [error, setError] = useState(null);
   
    const [companyModel,setCompanyModel] =useState([])
    // const [showEmployeePage,setShowEmployeePage] = useState(false)

    const handleChange =(e)=>{
        const { name, value } = e.target;
        if(name == 'mailId'){
            validate(e,name)
        }
            setCompanyDetails({
                ...companyDetails,
                [name]: value
            })
        
       
    }
    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }
    const validate = (event,name) => {
        if (!isValidEmail(event.target.value)) {
            setError('Please Enter Valid Email Address ');
          } else {
            setError(null);
          }
      }

    const handleSubmit = ()=>{
        setCompanyModel([...companyModel,companyDetails])
        // setShowEmployeePage(true)
        props.companydetailsCallback(true,companyDetails)
    
    }

    return (

            <>

                {
                    // showEmployeePage ? (
                    //     <EmployeeDetails companyFullDetail = {companyDetails}/> 
                    // ) : (
                    <> <div className="flex justify-center items-center h-[86vh] md:h-[90vh] lg:h-[85vh] xl:h-[85vh]">
                    <div className=" xl:w-[29%] lg:w-[40%] w-[88%] md:w-[50%] lg:h-[75vh] md:h-[74vh] h-[63vh] rounded-xl " style={{boxShadow:'1px 1px 30px rgb(79, 70, 186,0.3)'}}>
                        <div className=" flex w-[100%] relative justify-center">
                            <div className="absolute bottom-[-43px]">
                                <ImageAttendance
                                    width="60px"
                                    height="60px"
                                    src="/icons/Group 18529.svg"
                                    className=""
                                />
                            </div>
                        </div>
                        <div className="flex mt-10 justify-center items-center">
                            <div className="flex-col">
                                <h1 className="text-[22px] font-[sfpro-semibold]">Company Details</h1>
                                <p className="text-[10px] text-center">Helps to improve the setup</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center p-8">
                        <div className="flex-col justify-center items-center w-[90%] ">
                        <div className=" border-b border-[#70707040] py-2 pt-5 ">
                            <InputAttendance
                            type="text" 
                            onChange={handleChange}
                            name='companyName'
                            value={companyDetails.companyName}
                            placeholder="*Company Name" 
                            aria-label="Full name"
                            className='appearance-none outline-none text-[12px] font-[sfpro-medium] placeholder-[#232E38] bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" '
                            />
                        </div>
                        <div className=" border-b border-[#70707040] py-2 pt-7">
                            <InputAttendance
                            type="text" 
                            onChange={handleChange}
                            name='companyCategory'
                            value={companyDetails.companyCategory}
                            placeholder="*Company Category" 
                            aria-label="Full name"
                            className='appearance-none outline-none text-[12px] font-[sfpro-medium] placeholder-[#232E38] bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" '
                            />
                        </div>
                        <div className=" border-b border-[#70707040] py-2 pt-7">
                            <InputAttendance
                            type="number"
                            id="contactNumber"
                            onChange={handleChange}
                            value={companyDetails.contactNumber} 
                            name='contactNumber'
                            maxText={10}
                            // pattern="[1-9]{1}[0-9]{9}"
                            placeholder="*Contact Number" 
                            aria-label="Full name"
                            className='appearance-none outline-none text-[12px] font-[sfpro-medium] placeholder-[#232E38] bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" '
                            />
                        </div>
                        <div className={`border-b ${error ? "border-red-600" : "border-[#70707040]"}  py-2 pt-7`}>
                            <InputAttendance
                            type="email"
                            onChange={handleChange}
                            name='mailId'
                            value={companyDetails.mailId} 
                            placeholder="*Mail Id" 
                            aria-label="Full name"
                            className={`appearance-none outline-none text-[12px] font-[sfpro-medium]  placeholder-[#232E38] bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none`} 
                            />
                            
                           
                        </div>
                        {error && <h2 style={{color: 'red', fontSize:"11px", position:"absolute"}}>{error}</h2>}
                        
                        <div className=" pt-7">
                            <ButtonAttendance
                            content='Create'
                            onClick={()=>companyDetails.companyName && companyDetails.companyCategory && companyDetails.contactNumber && companyDetails.mailId && !error ?handleSubmit():null}
                            className={`${companyDetails.companyName && companyDetails.companyCategory && companyDetails.contactNumber && companyDetails.mailId && !error ? 'bg-[#4F46BA] cursor-pointer' : 'bg-[#4F46BA]/25 cursor-not-allowed'} w-[100%] p-3 text-white text-[20px] font-[sfpro-medium] rounded-md`}
                            />
                        </div>
                        </div>
                        </div>
                    </div>
                </div></>
                // )
                }

       
        </>
    )
}
export default CompanyDetails