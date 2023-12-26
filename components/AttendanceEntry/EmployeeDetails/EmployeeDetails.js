import React from "react";
import { useState, useEffect } from "react";
import ButtonAttendance from "../ButtonAttendance";
import FieldSetUp from "../FieldSet/FieldSetUp";
import ImageAttendance from "../ImageAttendance";
import InputAttendance from "../InputAttendance";
import Service from "../../../services/attendanceEntry/services";
import PouchDB from "pouchdb";

const EmployeeDetails = (props) => {
    const [showFieldsetupPage, setShowFieldsetupPage] = useState(false)
    const [employeeDetail, setEmployeeDetail] = useState({})
    const [dbData, setdbData] = useState()

   
    useEffect(()=>{
        console.log(props.companyFullDetail,"employeeDetail")
        setEmployeeDetail(props.companyFullDetail)
    },[])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeDetail({
            ...employeeDetail,
            [name]: value
        })
    }
    const handleSubmit = () => {
        // var db = new PouchDB("AttendanceEntryProject");
        // db.get("CompanyDetails", function (err, doc) {
        //     if (err) {
        //         var doc = {
        //             _id: "CompanyDetails",
        //             CompanyModel: employeeDetail,
        //         };
        //         db.put(doc);
        //     }
        //     db.put(
        //         {
        //             _id: doc._id,
        //             CompanyModel: employeeDetail,
        //             _rev: doc._rev,
        //         },
        //         function (err, response) {
        //             if (err) {
        //                 return console.log(err, "err");
        //             } else {
        //                 console.log(response, "ress");
        //             }
        //         }
        //     );
        // });
        props.companydetailsCallback(true,employeeDetail)
        // setShowFieldsetupPage(true)
    }
    // useEffect(() => {
    //     (async function Change() {
    //         await Service.getCompanyDetails()
    //         await Service.getCompanyDetails()
    //         await Service.getCompanyDetails()
    //         const CompanyDetails = await Service.getCompanyDetails();
    //         setdbData(CompanyDetails.CompanyModel)
    //     })()
    // }, [])
    return (
        <>
            {
                // showFieldsetupPage ? (
                //     <FieldSetUp FullemployeeDetail={employeeDetail} isEdit = {false}/>
                // ) : (
                    <div className="flex justify-center items-center h-[85vh]">
                        <div className="w-[88%] md:w-[50%] lg:w-[40%] xl:w-[30%] rounded-xl flex justify-center items-center" style={{ boxShadow: '1px 1px 30px rgb(79, 70, 186,0.3)' }}>
                            <div className=" w-[80%] mt-6">
                                <div className="flex justify-center">
                                    <div>
                                        <ImageAttendance
                                            width="70px"
                                            height="70px"
                                            src="/icons/Group 18529.svg"
                                            className=""
                                        />
                                    </div>
                                    <div className="flex-col mt-2">
                                        <h1 className="text-[22px] font-[sfpro-semibold]">Employee Details</h1>
                                        <p className="text-[10px]">Helps to build the organization</p>
                                    </div>
                                </div>
                                <div className="flex justify-center items-center pb-10">
                                    <div className="flex-col justify-center items-center w-[100%]">
                                        <div className=" border-b border-[#70707040] py-2 pt-5">
                                            <InputAttendance
                                                type="text"
                                                name='companyName'
                                                readOnly
                                                onChange={handleChange}
                                                value={employeeDetail.companyName}
                                                placeholder="*Company Name"
                                                aria-label="Full name"
                                                className='appearance-none outline-none text-[12px] font-[sfpro-medium] placeholder-[#232E38] bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" '
                                            />
                                        </div>
                                        <div className=" border-b border-[#70707040] py-2 pt-7">
                                            <InputAttendance
                                                type="text"
                                                readOnly
                                                onChange={handleChange}
                                                name='companyCategory'
                                                value={employeeDetail.companyCategory}
                                                placeholder="*Company Category"
                                                aria-label="Full name"
                                                className='appearance-none outline-none text-[12px] font-[sfpro-medium] placeholder-[#232E38] bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" '
                                            />
                                        </div>
                                        <div className=" border-b border-[#70707040] py-2 pt-7">
                                            <InputAttendance
                                                type="number"
                                                onChange={handleChange}
                                                value={employeeDetail.numberOfEmployee}
                                                name='numberOfEmployee'
                                                placeholder="*Enter the number of Employee"
                                                aria-label="Full name"
                                                className='appearance-none outline-none text-[12px] font-[sfpro-medium] placeholder-[#232E38] bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" '
                                            />
                                        </div>
                                        <div className=" border-b border-[#70707040] py-2 pt-7">
                                            <InputAttendance
                                                type="text"
                                                name='companyLocation'
                                                onChange={handleChange}
                                                value={employeeDetail.companyLocation}
                                                placeholder="*Location"
                                                aria-label="Full name"
                                                className='appearance-none outline-none text-[12px] font-[sfpro-medium] placeholder-[#232E38] bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" '
                                            />
                                        </div>
                                        <div className=" pt-7">
                                            <ButtonAttendance
                                                content='Next'
                                                onClick={() => employeeDetail.numberOfEmployee && employeeDetail.companyLocation ? handleSubmit() : null}
                                                className={`${employeeDetail.numberOfEmployee && employeeDetail.companyLocation ? 'bg-[#4F46BA] cursor-pointer' : 'bg-[#4F46BA]/25 cursor-not-allowed'} w-[100%] p-3 text-white text-[20px] font-[sfpro-medium] rounded-md`}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                // )
            }
        </>
    )
}
export default EmployeeDetails