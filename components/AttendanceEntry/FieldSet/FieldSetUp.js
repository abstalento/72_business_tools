import React, { useContext, useRef, useState } from "react";
import PouchDB from "pouchdb";
import ButtonAttendance from "../ButtonAttendance";
import InputAttendance from "../InputAttendance";
import MultipleInput from "../MultipleInput";
import ImageAttendance from "../ImageAttendance";
import EmployeeDetailsPopup from "../Popup/EmployeeDetailsPopup";
import { useEffect } from "react";
import GlobalContext from "../../kanbanBoard/Calender/GlobalContext";
import Service from "../../../services/attendanceEntry/services";

const FieldSetUp = (props) => {

    const { setOpenPopupPage } = useContext(GlobalContext)

    const [employeeDetailpage, setEmployeeDetailPage] = useState(false)
    const [employeeFieldset, setEmployeeFieldset] = useState(props.FullemployeeDetail)
    const [value, setvalue] = useState([])
    const [departmentName, setdepartmentName] = useState([{title: 'eddede', Name: 'departmentName'}])
    const [designationName, setdesignationName] = useState([])
    const [typeofEmployee, settypeofEmployee] = useState([])
    const [salaryMode, setsalaryMode] = useState([])
    const [paymentMode, setpaymentMode] = useState([])
    const [typeofBank, settypeofBank] = useState([])
    const [attendanceField, setattendanceField] = useState([])
    const [addField, setaddField] = useState([])
    const [addField1, setaddField1] = useState([])
    const [GetData, setGetData] = useState()
    const [dbData, setdbData] = useState([])
    const [atendanceFieldData, setAtendanceFieldData] = useState({})
    const [newField, setNewField] = useState()
    const [fieldObjModal, setFieldObjModal] = useState({})
    const [extraField, setExtrafield] = useState('')
    const [extraField1, setExtrafield1] = useState('')
    const [extraFieldData, setExtraFieldData] = useState([]);
    const [extraField1Data, setExtraField1Data] = useState([]);
    const [newFieldData, setNewFieldData] = useState()
    const [fieldObjData, setFieldObjData] = useState({})
    const [fieldObj, setFieldObj] = useState([])
    const [branchName, setBranchName] = useState({ branch: "" })


    // useEffect(() => {
    //     departmentName.push({title: 'eddede', Name: 'departmentName'})

    // }, [departmentName, designationName, typeofEmployee])

    const dataCollection = (data, name) => {
        console.log("handle add!", data, name)

        if (name == "departmentName") {
            setdepartmentName(data)

        } else if(name == "branchName"){
            setBranchName(data)
        }
        else if (name == "designationName") {
            setdesignationName(data)
        } else if (name == "typeofEmployee") {
            settypeofEmployee(data)
        } else if (name == "addField1") {
            setaddField1(data)
        } else if (name == "addField") {
            setaddField(data)
        } else if (name == "attendanceField") {
            setattendanceField(data)
        } else if (name == "typeofBank") {
            settypeofBank(data)
        } else if (name == "paymentMode") {
            setpaymentMode(data)

        } else if (name == "salaryMode") {
            setsalaryMode(data)
        } else if(extraField && name === extraField) {
            setExtraFieldData(data)
        } else if(extraField1 && name === extraField1) {
            setExtraField1Data(data)
        }
        else {
            let clone = { ...fieldObjData }
            Object.keys(clone).map(key => {
                if (key == name) {
                    clone[key] = data
                }
            })
            setFieldObjData(clone)
            setFieldObj(clone)
        }
    }


    const [fieldset, setFieldset] = useState({
        branchName: "",
        departmentName: [],
        designationName: [],
        typeofEmployee: [],
        salaryMode: [],
        paymentMode: [],
        typeofBank: [],
        attendanceField: [],
        addField: [],
        picture: [],

    });
    

    const [optionFieldSet, setOptionFieldset] = useState([])

    const handleSubmit = () => {
        setOptionFieldset([...optionFieldSet, fieldset])
        setEmployeeDetailPage(true)
    }

    const eventHandleChange = (event) => {
        const { value, name } = event.target;
    }

    const overallvaluse = (data) => {
        setvalue(data)
    }
    const handleChange = (e) => {
        const { name, value } = e.target
        setBranchName(value)
    }
    const handleChangeadd = (e, field) => {
        const { name, value } = e.target
        // if (props.isEdit) {
        //     Object.defineProperty(
        //         field, atendanceFieldData.fieldObjData,
        //         [value],
        //         Object.getOwnPropertyDescriptor(field, atendanceFieldData.fieldObjData, field)
        //     );
        //     delete atendanceFieldData.fieldObjData[field];
        //     atendanceFieldData.atendanceFieldData.fieldObjData[value]


        // } else if(!props.isEdit && props?.defaultEntries){
        //     console.log(field, atendanceFieldData)
        //     Object.defineProperty(
        //         field, atendanceFieldData.fieldObjData,
        //         [value],
        //         Object.getOwnPropertyDescriptor(field, atendanceFieldData.fieldObjData, field)
        //     );
        //     delete atendanceFieldData.fieldObjData[field];
        //     atendanceFieldData.atendanceFieldData.fieldObjData[value]

        //     let obj = { [value]: [] }
        //     setFieldObjModal(obj)
        //     if (name == 'field1') {
        //         setExtrafield(value)
        //     } else {
        //         setExtrafield1(value)
        //     }
        // } else {
            let obj = { [value]: [] }
            setFieldObjModal(obj)
            if (name == 'field1') {
                setExtrafield(value)
            } else {
                setExtrafield1(value)
            }
        // }

        console.log(obj)
        
        setNewField(value)

    }

    const onEditAttendanceEntry = (value) => {

    }
    const handleChangeaddNew = (e) => {
        const { name, value } = e.target
        setNewFieldData(value)
    }





    const handleSub = () => {
        var db = new PouchDB("AttendanceEntryProject");
        db.get("AttendanceEntry", function (err, doc) {
            if (err) {
                var doc = {
                    _id: "AttendanceEntry",
                    departmentName, designationName, typeofEmployee, salaryMode, addField1, addField, attendanceField,
                    typeofBank, paymentMode, fieldObjData,branchName
                };
                db.put(doc);
            }
            db.put(
                {
                    _id: doc._id,

                    departmentName, designationName, typeofEmployee, salaryMode, addField1, addField, attendanceField,
                    typeofBank, paymentMode, fieldObjData,branchName,

                    _rev: doc._rev,
                },
                function (err, response) {
                    if (err) {
                        return console.log(err, "err");
                    } else {
                        console.log(response, "ress");
                    }
                }
            );
        });
        setGetData(true)

        setEmployeeDetailPage(true)
        setOpenPopupPage(true)
        if (props?.isEdit) {
            props.updateButton(true)
           
        }
      
    }



    useEffect(() => {
        (async function Change() {
            try {
                await Service.getCompanyDetails();
                await Service.getCompanyDetails();
                await Service.getCompanyDetails();
                const CompanyDetails = await Service.getCompanyDetails();
                setdbData(CompanyDetails.CompanyModel.companyName)
                if (props?.isEdit || props?.defaultEntries) {
                    console.log(props.attendanceEntry,"dtaa999a");
                    setAtendanceFieldData(props.attendanceEntry)
                    Object.keys(props.attendanceEntry).map(key => {
                        if (props?.attendanceEntry?.[key]) {
                            dataCollection(props.attendanceEntry[key], key)
                        }
                    })
                    setFieldObjData(props.attendanceEntry.fieldObjData)
                }

            }
            catch (err) {
                alert(JSON.stringify(err))
            }
        })()

    }, [])

    const onFocusOutChange = (e) => {
        let fieldObjclone = { ...fieldObjData };
        let attendanceFieldDataClone = { ...atendanceFieldData }
        Object.keys(fieldObjModal).map(data => {
            fieldObjclone[data] = fieldObjModal[data]
        })
        attendanceFieldDataClone.fieldObjData = fieldObjclone; 
        console.log("focus out field object",fieldObjclone, attendanceFieldDataClone);
        setAtendanceFieldData(attendanceFieldDataClone)
        setFieldObjData(fieldObjclone)

    }
    const handleCancel = () => {
        setdepartmentName([])
        setdesignationName([])
        settypeofEmployee([])
        setsalaryMode([])
        setpaymentMode([])
        settypeofBank([])
        setattendanceField([])
        setaddField([])
        setaddField1([])
        setAtendanceFieldData([])
        setFieldObjData([])
        setBranchName([])
        props.cancelButton(true)
    }

    return (

        <>
            {
                employeeDetailpage ? (
                    <EmployeeDetailsPopup GetData={GetData} />
                ) :

                    <div className="justify-center items-center pt-5 pb-10 font-[sfpro] bg-[#FAFAFA] text-[#424242] text-[12px] md:h-[97vh] md:flex">
                        <div className="flex-col flex justify-center items-center m-auto w-[90%] ">
                            <div className="w-[95%] py-2 md:w-[90%] flex-col  justify-center items-center m-auto" >
                                <div className="flex">
                                    <ImageAttendance
                                        width="15px"
                                        height="15px"
                                        src="/icons/Time Square.svg"
                                        className=""
                                    />
                                    <h2 className="ml-2">Field Setup</h2>
                                </div>
                            </div>


                            <div className="w-[90%]   flex-col h-[80vh] scrollBar overflow-scroll justify-center items-center m-auto  pt-10 gap-1">
                                <div className="flex flex-col md:flex-row justify-between mb-4">
                                    <div className="flex-col flex gap-2 md:w-[47%]">
                                        <label className="font-[sfpro-bold]">Company Name</label>
                                        <div className="flex flex-row w-[100%]">
                                            <div className="w-[90%]">
                                                <InputAttendance
                                                    text='text'
                                                    readOnly
                                                    name='companyName'
                                                    value={dbData}
                                                    placeholder='Alpha Business Solution Pvt.Ltd'
                                                    className=' border-2 border-[#D5D5D5] pl-2 h-[37px] w-[98%] rounded-md'
                                                />
                                            </div>
                                            <div className="w-[10%]">
                                                {dbData.length > 0 ? <img className="xl:w-[40%] lg:w-[40%] w-[55%] mt-2" src="../icons/path2active.svg" alt="" width={15} height={15} /> : <img className="xl:w-[20%] lg:w-[40%]" src="../icons/path2inactive.svg" alt="" width={15} height={15} />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-col flex gap-2 md:w-[47%]">
                                        <label className="font-[sfpro-bold]">Branch Name*</label>
                                        <div className="flex flex-row w-[100%]">
                                            <div className="w-[92%]">
                                                <InputAttendance
                                                    type='text'
                                                    onChange={handleChange}
                                                    value={branchName.branch}
                                                    // value={fieldset.branchName}
                                                    name='branchName'
                                                    placeholder='Enter the Branch Name'
                                                    className=' border-2 border-[#D5D5D5] pl-2 h-[37px] w-[98%] rounded-md'
                                                />
                                            </div>
                                            <div className="w-[10%]">
                                               {branchName ?  <img className="xl:w-[40%] lg:w-[40%]  w-[55%] mt-2" src="../icons/path2active.svg" alt="" width={15} height={15} /> : <img className="xl:w-[40%] mt-2 lg:w-[40%]" src="../icons/path2inactive.svg" alt="" width={15} height={15} />  }
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between flex-col md:flex-row  mb-4">
                                    <div className="flex-col flex gap-2 md:w-[47%]">
                                        <label className="font-[sfpro-bold]">Department Name*</label>
                                        <div className="flex flex-row w-[100%]">
                                            <div className="w-[90%]">
                                                <MultipleInput
                                                    onChange={eventHandleChange}
                                                    value={value}
                                                    overallvaluse={overallvaluse}
                                                    dataCollection={dataCollection}
                                                    data={atendanceFieldData?.departmentName ? atendanceFieldData.departmentName : []}
                                                    isEdit={props.isEdit}
                                                    defaultEntries = {props.defaultEntries}
                                                    FieldName='departmentName'
                                                    placeholder='Enter the name of the Department'

                                                />
                                            </div>
                                            <div className="w-[10%]">
                                                {departmentName.length > 0 ? <img className="xl:w-[40%] w-[55%] mt-2" src="../icons/path2active.svg" alt="" width={15} height={15} /> : <img className="xl:w-[40%] mt-2" src="../icons/path2inactive.svg" alt="" width={15} height={15} />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-col flex gap-2 md:w-[47%]">
                                        <label className="font-[sfpro-bold]">Designation Name*</label>
                                        <div className="flex flex-row w-[100%]">
                                            <div className="w-[90%]">
                                                <MultipleInput
                                                    onChange={eventHandleChange}
                                                    dataCollection={dataCollection}
                                                    data={atendanceFieldData?.designationName ? atendanceFieldData.designationName : []}
                                                    isEdit={props.isEdit}
                                                    defaultEntries = {props.defaultEntries}
                                                    FieldName='designationName'
                                                    placeholder='Enter the name of the Department'

                                                />
                                            </div>
                                            <div className="w-[10%]">
                                                {designationName.length > 0 ? <img className="xl:w-[40%] w-[55%] mt-2" src="../icons/path2active.svg" alt="" width={15} height={15} /> : <img className="xl:w-[40%] mt-2" src="../icons/path2inactive.svg" alt="" width={15} height={15} />}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between flex-col md:flex-row  mb-4">
                                    <div className="flex-col flex gap-2 md:w-[47%]">
                                        <div><label className="font-[sfpro-bold]">Type of the Employee*</label></div>
                                        <div className="flex flex-row w-[100%]">
                                            <div className="w-[90%]">
                                                <MultipleInput
                                                    onChange={eventHandleChange}
                                                    dataCollection={dataCollection}
                                                    data={atendanceFieldData?.typeofEmployee ? atendanceFieldData.typeofEmployee : []}
                                                    isEdit={props.isEdit}
                                                    defaultEntries = {props.defaultEntries}
                                                    FieldName='typeofEmployee'
                                                    placeholder='Mention the types'
                                                />
                                            </div>
                                            <div className="w-[10%]">
                                                {typeofEmployee.length > 0 ? <img className="xl:w-[40%] w-[55%] mt-2" src="../icons/path2active.svg" alt="" width={15} height={15} /> : <img className="xl:w-[40%] mt-2" src="../icons/path2inactive.svg" alt="" width={15} height={15} />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-col flex gap-2 md:w-[47%]">
                                        <div><label className="font-[sfpro-bold]">Choose the Salary Mode*</label></div>
                                        <div className="flex flex-row w-[100%]">
                                            <div className="w-[90%]">
                                                <MultipleInput
                                                    onChange={eventHandleChange}
                                                    dataCollection={dataCollection}
                                                    data={atendanceFieldData?.salaryMode ? atendanceFieldData.salaryMode : []}
                                                    isEdit={props.isEdit}
                                                    defaultEntries = {props.defaultEntries}
                                                    FieldName='salaryMode'
                                                    placeholder='Enter the name of the Department'
                                                /></div>
                                            <div className="w-[10%]">
                                                {salaryMode.length > 0 ? <img className="xl:w-[40%] w-[55%] mt-2" src="../icons/path2active.svg" alt="" width={15} height={15} /> : <img className="xl:w-[40%] mt-2" src="../icons/path2inactive.svg" alt="" width={15} height={15} />}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between flex-col md:flex-row  mb-4">
                                    <div className="flex-col flex gap-2 md:w-[47%]">
                                        <div><label className="font-[sfpro-bold]">Payment Mode*</label></div>
                                        <div className="flex flex-row w-[100%]">
                                            <div className="w-[90%]">
                                                <MultipleInput
                                                    onChange={eventHandleChange}
                                                    dataCollection={dataCollection}
                                                    data={atendanceFieldData?.paymentMode ? atendanceFieldData.paymentMode : []}
                                                    isEdit={props.isEdit}
                                                    defaultEntries = {props.defaultEntries}
                                                    FieldName='paymentMode'
                                                    placeholder='Press + Sign to add more fields'
                                                /></div>
                                            <div className="w-[10%]">
                                                {paymentMode.length > 0 ? <img className="mt-2 xl:w-[40%]" src="../icons/path2active.svg" alt="" width={15} height={15} /> : <img className="mt-2 xl:w-[40%]" src="../icons/path2inactive.svg" alt="" width={15} height={15} />}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-col flex gap-2 md:w-[47%]">
                                        <div><label className="font-[sfpro-bold]">Bank Account Type*</label></div>
                                        <div className="flex flex-row w-[100%]">
                                            <div className="w-[90%]">
                                                <MultipleInput
                                                    onChange={eventHandleChange}
                                                    dataCollection={dataCollection}
                                                    data={atendanceFieldData?.typeofBank ? atendanceFieldData.typeofBank : []}
                                                    isEdit={props.isEdit}
                                                    defaultEntries = {props.defaultEntries}
                                                    FieldName='typeofBank'
                                                    placeholder='Press + Sign to add more fields'
                                                /></div>
                                            <div className="w-[10%]">
                                                {typeofBank.length > 0 ? <img className="mt-2 xl:w-[40%]" src="../icons/path2active.svg" alt="" width={15} height={15} /> : <img className="mt-2 xl:w-[40%]" src="../icons/path2inactive.svg" alt="" width={15} height={15} />}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between mb-4 flex-wrap">
                                    <div className="flex-col flex gap-2 md:w-[47%] w-[100%]">
                                        <div><label className="font-[sfpro-bold]">Attendance Field</label></div>
                                        <div className="flex flex-row w-[100%]  justify-between items-center">
                                            <div className="w-[90%]">
                                                <MultipleInput
                                                    onChange={eventHandleChange}
                                                    dataCollection={dataCollection}
                                                    data={atendanceFieldData?.attendanceField ? atendanceFieldData.attendanceField : []}
                                                    isEdit={props.isEdit}
                                                    defaultEntries = {props.defaultEntries}
                                                    FieldName='attendanceField'
                                                    placeholder='Press + Sign to add more fields'
                                                /></div>
                                            <div className="w-[10%]">
                                                {attendanceField.length > 0 ? <img className="md:w-[15px] w-[17px] xl:w-[22px]" src="../icons/path2active.svg" alt="" width={15} height={15} /> : <img className="md:w-[15px] w-[17px] xl:w-[22px]" src="../icons/path2inactive.svg" alt="" width={20} height={15} />}
                                            </div>
                                        </div>
                                    </div>
                                    {props.isEdit ? atendanceFieldData?.fieldObjData && Object.keys(atendanceFieldData?.fieldObjData).map(fieldKey => (

                                        <div className="flex-col flex gap-2 md:w-[47%] w-[100%] ">
                                            <div><input disabled={props.isEdit} onBlur={onFocusOutChange} type="text" className="font-[sfpro-bold]" value={fieldKey} placeholder="Add Extra Fields"></input>
                                            </div>
                                            <div className="flex flex-row w-[100%]">
                                                <div className="w-[90%]">
                                                    <MultipleInput
                                                        onChange={eventHandleChange}
                                                        dataCollection={dataCollection}
                                                        data={atendanceFieldData?.fieldObjData[fieldKey] ? atendanceFieldData.fieldObjData[fieldKey] : []}
                                                        isEdit={props.isEdit}
                                                        defaultEntries = {props.defaultEntries}
                                                        FieldName={fieldKey}
                                                        placeholder='Press + Sign to add more fields'
                                                    /></div>
                                                <div className="w-[10%]">
                                                    {Object.keys(fieldObjData).length > 0 ? <img className="mt-2 md:w-[15px] w-[17px] xl:w-[30px]" src="../icons/path2active.svg" alt="" width={20} height={15} /> : <img className="mt-2 xl:w-[30px] w-[17px] md:w-[15px]" src="../icons/path2inactive.svg" alt="" width={20} height={15} />}
                                                </div>
                                            </div>
                                        </div>

                                    )) : null}
                                            
                                        {(!props.isEdit || (props?.defaultEntries && !props.isEdit )) ? 
                                        <><div className="flex-col flex gap-2 md:w-[47%] w-[100%]">
                                            <div><input onBlur={onFocusOutChange} type="text" name="field1" className="font-[sfpro-bold]" placeholder="Add Extra Fields"  onChange={(e) => handleChangeadd(e, '')}></input>
                                            </div>
                                            <div className="flex flex-row w-[100%]">
                                                <div className="w-[90%]">
                                                    <MultipleInput
                                                        onChange={eventHandleChange}
                                                        dataCollection={dataCollection}
                                                        data={extraFieldData}
                                                        isEdit={props.isEdit}
                                                        defaultEntries = {props.defaultEntries}
                                                        FieldName={extraField}
                                                        placeholder='Press + Sign to add more fields'
                                                    /></div>
                                                <div className="w-[10%]">
                                                    {Object.keys(fieldObjData).length > 0 ? <img className="mt-2 w-[17px] md:w-[15px] xl:w-[22px]" src="../icons/path2active.svg" alt="" width={20} height={15} /> : <img className="mt-2 w-[17px] md:w-[15px] xl:w-[22px]" src="../icons/path2inactive.svg" alt="" width={20} height={15} />}
                                                </div>
                                            </div>
                                        </div>

                                            <div className="flex-col flex gap-2 md:w-[47%] w-[100%] mt-4">
                                                <div><input onBlur={onFocusOutChange} type="text" name="field2" className="font-[sfpro-bold] "  placeholder="Add Extra Fields" onChange={(e) => handleChangeadd(e, '')}></input>
                                                </div>
                                                <div className="flex flex-row w-[100%]">
                                                    <div className="w-[90%]">
                                                        <MultipleInput
                                                            onChange={eventHandleChange}
                                                            dataCollection={dataCollection}
                                                            data={extraField1Data}
                                                            isEdit={props.isEdit}
                                                            defaultEntries = {props.defaultEntries}
                                                            FieldName={extraField1}
                                                            placeholder='Press + Sign to add more fields'
                                                        /></div>
                                                    <div className="w-[10%]">
                                                        {Object.keys(fieldObjData).length > 0 ? <img className="mt-2 md:w-[15px] w-[17px] xl:w-[22px]" src="../icons/path2active.svg" 
                                                             alt="" width={20} height={15} /> : <img className="mt-2 md:w-[15px] w-[17px] xl:w-[22px]" src="../icons/path2inactive.svg" alt="" width={20} height={15} />}
                                                    </div>
                                                </div>
                                            </div></> : null

                                    }

                                </div>

                                <div className="flex justify-end mt-8">
                                    <div>
                                        <ButtonAttendance
                                            onClick={handleCancel}
                                            content={props.isEdit ? 'Cancel' :!props.isEdit || props.defaultEntries? 'Clear':null}
                                            className='bg-[#DBDBDB] mr-5 px-7 py-[5px] text-black text-[14px] font-[sfpro-medium] rounded-sm'
                                        />
                                    </div>
                                    

                                    <div>
                                        
                                        <ButtonAttendance
                                            isDisabled={departmentName.length>0 && designationName.length>0 &&  typeofEmployee.length>0 && salaryMode.length>0 && typeofBank.length>0 && paymentMode.length>0 && branchName.length>0?false:true}
                                            onClick={() => departmentName.length>0 && designationName.length>0 &&  typeofEmployee.length>0 && salaryMode.length>0 && typeofBank.length>0 && paymentMode.length>0 && branchName.length >0 ? handleSub(): null } 
                                            content={props.isEdit ? "Update" :(props?.defaultEntries || !props.isEdit)? 'Next':null}
                                            className={` ${departmentName.length>0 && designationName.length>0 &&  typeofEmployee.length>0 && salaryMode.length>0 && typeofBank.length>0 && paymentMode.length>0 && branchName.length>0 ? 'bg-[#4F46BA] cursor-pointer ' : 'bg-[#4F46BA]/25 cursor-not-allowed '}px-7 py-[5px] text-white text-[14px] font-[sfpro-medium] rounded-sm'`}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

            }
        </>
    )
}
export default FieldSetUp


