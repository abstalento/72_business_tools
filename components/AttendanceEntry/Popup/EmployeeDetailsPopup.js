import React, { useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import InputAttendance from "../InputAttendance";
import ButtonAttendance from "../ButtonAttendance";
import Service from "../../../services/attendanceEntry/services";
import PouchDB from "pouchdb";
import { v1 as uuid } from "uuid";
import CurrencyPopUp from "../../../pages/billHive/currency-popup/CurrencyPopUp";
import GlobalContext from "../../kanbanBoard/Calender/GlobalContext";
import { indexOf } from "lodash";

function EmployeeDetailsPopup(props) {
  const { setChangeDashBoard } = useContext(GlobalContext);
  const [isCurrency, setIsCUrrency] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState("₹");
  const [currencyId, setCurrencyId] = useState("INR");

  const [empDetails, setEmpDetails] = useState({
    companyName: "",
    empType: "",
    accNumber: "",
    empID: "",
    salary: "",
    IFSCCode: "",
    empName: "",
    paymentMode: "",
    deptName: "",
    bankAccType: "",
    designation: "",
    bankName: "",
    uploadProfile: "",
    doj: "",
    bankBranch: "",
    currencySymbol: currencySymbol,
    panNumber: "",
    ESI: "",
    emailID: "",
    EMINumber: "",
    Attendance: [],
    isEdit: true,
    id: indexOf(empDetails),
  });
  const [showImage, setshowImage] = useState(false);
  const [imageName, setImageName] = useState("");
  const [selectImage, setSelectImage] = useState(null);
  const [createObjectURl, setCreateObjectURl] = useState(null);
  const fileUpload = useRef();
  const [showImageTag, setShowImageTag] = useState(true);
  const [dbDataDept, setdbDataDept] = useState();
  const [dbDataTypeOfEmp, setdbDataTypeOfEmp] = useState();
  const [dbDataPaymentMode, setdbDataPaymentMode] = useState();
  const [dbDataBankAccType, setdbDataBankAccType] = useState();
  const [dbData, setdbData] = useState();
  const [image, setImage] = useState({
    profilePic: null,
    ImageUploaded: false,
  });
  const [file, setFile] = useState({ uploadFile: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpDetails({ ...empDetails, [name]: value, id: uuid() });
  };
  const handleClear = () => {
    setEmpDetails({
      companyName: "",
      empType: "",
      accNumber: "",
      empID: "",
      salary: "",
      IFSCCode: "",
      empName: "",
      paymentMode: "",
      deptName: "",
      bankAccType: "",
      designation: "",
      bankName: "",
      uploadProfile: "",
      doj: "",
      bankBranch: "",
      currencySymbol: "",
    });
    setCreateObjectURl("");
    setShowImageTag(true);
  };

  const imageFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setImage({ ...image, profilePic: [reader.result], ImageUploaded: true });
      const images = {
        profilePic: [reader.result],
        ImageUploaded: true,
      };
    };
  };

  const handleCancel = () => {
    setImage({ profilePic: null, ImageUploaded: false });
    const images = {
      profilePic: null,
      ImageUploaded: false,
    };
  };
  const uploadPhoto = () => {
    fileUpload.current.click();
  };

  //     const imageFileHandler = (e) => {
  //         const file = e.target.files[0];
  //         const reader = new FileReader();
  //         reader.readAsDataURL(file);

  //         reader.onloadend = function (e) {
  //           setImage({ ...image, profilePic: [reader.result], ImageUploaded: true });
  //           const images = {
  //             profilePic: [reader.result],
  //             ImageUploaded: true,
  //           };
  //           var db = new PouchDB("AttendanceEntryProject");
  //       db.get("EmployeeDetails", function (err, doc) {
  //         if (err) {
  //           var doc = {
  //             _id: "EmployeeDetails",
  //             data: { images, isActive: true },
  //           };
  //           db.put(doc);
  //         }
  //         db.put(
  //           {
  //             _id: doc._id,
  //             data: { ...doc.data, images, isActive: true },
  //             _rev: doc._rev,
  //           },
  //           function (err, response) {
  //             if (err) {
  //               return console.log(err, "err");
  //             } else {
  //               console.log(response, "ress");
  //             }
  //           }
  //         );
  //       });
  //     };
  //   };

  //   const handleCancel = () => {
  //     setImage({ profilePic: null, ImageUploaded: false });
  //     const images = {
  //       profilePic: null,
  //       ImageUploaded: false,
  //     };

  // const handleFileSelect = (e) => {
  //   const file = e.target.files[0];
  //       const reader = new FileReader();
  //       reader.readAsDataURL(file);

  //       reader.onloadend = function (e) {
  //           setImage({ ...image, profilePic: [reader.result], ImageUploaded: true });
  //           const images = {
  //               profilePic: [reader.result],
  //               ImageUploaded: true,
  //           };
  //       }
  // };

  const handleFileSelect = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }
    let isValid = validateFile(fileObj);
    if (isValid) {
    

      const data = new FileReader();
      data.addEventListener("load", () => {
        // setImage(data.result)
        setCreateObjectURl(data.result);
      });
      data.readAsDataURL(fileObj);
    }
    setShowImageTag(false);
  };
  

  const validateFile = (fileObj) => {
    const docSize = fileObj.size / 1024 / 1024;
    if (
      docSize < 1 &&
      fileObj.name.match(/(\.jpg|\.JPG|\.png|\.PNG|\.JPEG|\.jpeg)$/)
    ) {
      return true;
    } else {
      return false;
    }
  };
  const deleteImage = () => {
    setImage({ profilePic: null, ImageUploaded: false });
    const images = {
      profilePic: null,
      ImageUploaded: false,
    };
  };
  useEffect(() => {
    setEmpDetails({ ...empDetails, uploadProfile: createObjectURl });
  }, [createObjectURl]);

  const handleSave = () => {
    var array = [];
    var db = new PouchDB("AttendanceEntryProject");
    db.get("EmployeeDetails", function (err, doc) {
      if (err) {
        array.push(empDetails);
        var doc = {
          _id: "EmployeeDetails",
          EmployeeDetails: array,
        };
        db.put(doc);
      }
      if (doc) {
        array = doc.EmployeeDetails;
        array.push(empDetails);
      }
      db.put(
        {
          _id: doc._id,
          EmployeeDetails: array,
          _rev: doc._rev,
        },
        function (err, response) {
          if (err) {
            return console.log(err, "err");
          } else {
            console.log(response, "res");
          }
        }
      );
    });

    setChangeDashBoard(true);
  };

  useEffect(() => {
    (async function Change() {
      try {
        await Service.getAttendanceEntry();
        await Service.getAttendanceEntry();
        await Service.getAttendanceEntry();
        const AttendanceEntry = await Service.getAttendanceEntry();
        setdbDataDept(AttendanceEntry.departmentName);
        setdbDataTypeOfEmp(AttendanceEntry.typeofEmployee);
        setdbDataPaymentMode(AttendanceEntry.paymentMode);
        setdbDataBankAccType(AttendanceEntry.typeofBank);
      } catch (err) {
        alert(JSON.stringify(err));
      }
      
    } 
    )();
  }, [props.GetData]);

  useEffect(() => {
    (async function Change() {
      try {
        await Service.getCompanyDetails();
        await Service.getCompanyDetails();
        await Service.getCompanyDetails();
        const CompanyDetails = await Service.getCompanyDetails();
        setdbData(CompanyDetails.CompanyModel.companyName);
      } catch (err) {
        alert(JSON.stringify(err));
      }
    })();
  }, []);

  const currencyClick = () => {
    setIsCUrrency(true);
  };
  const CurrencyValue = (currencySymbols) => {
    setCurrencySymbol(currencySymbols);
  };
  const setCurrencyIdValue = (currencyIds) => {
    setCurrencyId(currencyIds);
  };
  const setClosePopUp = (closeCurrency) => {
    setIsCUrrency(closeCurrency);
  };
  return (
    <>
      {isCurrency ? (
        <CurrencyPopUp
          myCurrencySymbol={CurrencyValue}
          myCurrencyId={setCurrencyIdValue}
          closeCurrencyPopUp={setClosePopUp}
        />
      ) : null}
      <div className="bg-[#707070] h-screen flex justify-around items-center z-50 absolute inset-0 bg-opacity[0.8]">
        <div className="bg-[#FFFFFF] h-[80vh] md:h-[77vh] w-[87%] md:w-[80%] xl:w-[60%] flex-col justify-around items-center rounded-xl ">
          <div className="bg-[#232E38] h-[5vh] w-full flex pl-3 ">
            <div className="pt-2">
              <Image width="20px" height="20px" src="/icons/Empdetails.svg" />
            </div>
            <div className="pt-1 ml-1 ">
              <h1 className="text-white">Employee Details</h1>
            </div>
          </div>
          <div className="flex justify-center items-center mt-4 font-[sfpro] text-[12px] scrollBar overflow-scroll">
            <div className="h-[70vh] w-[94%]">
              <div className="flex justify-around flex-wrap gap-3 items-center flex-col md:flex-row ">
                <div className="flex flex-col gap-2 w-[90%] md:w-[31%]">
                  <h1>
                    Company Name <sup>*</sup>
                  </h1>
                  <InputAttendance
                    id="CompName"
                    type="text"
                    name="companyName"
                    placeholder="Alpha Business Solution Pvt.Ltd.,"
                    className="h-[5vh] border-2 border-[#D5D5D5] rounded pl-2 w-full"
                    onChange={handleChange}
                    value={dbData}
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-2  w-[90%] md:w-[31%]">
                  <h1>
                    Type of Employee <sup>*</sup>
                  </h1>
                  <select
                    className="h-[5vh]  w-full border-2 border-[#D5D5D5] rounded pl-2"
                    name="empType"
                    onChange={handleChange}
                  >
                    <option disabled selected value="">
                      Choose Employee Type
                    </option>
                    {dbDataTypeOfEmp?.map((empType, index) => {
                      return <option>{empType.title}</option>;
                    })}
                  </select>
                </div>
                <div className="flex flex-col gap-2 w-[90%] md:w-[31%]">
                  <h1>
                    Account Number <sup>*</sup>
                  </h1>
                  <InputAttendance
                    id="AccNumber"
                    type="text"
                    name="accNumber"
                    placeholder=""
                    className="h-[5vh] w-full border-2 border-[#D5D5D5] rounded"
                    onChange={handleChange}
                    value={empDetails.accNumber}
                  />
                </div>
                <div className="flex flex-col gap-2  w-[90%] md:w-[31%]">
                  <h1>
                    Employee ID <sup>*</sup>
                  </h1>
                  <InputAttendance
                    id="EmpId"
                    type="text"
                    name="empID"
                    placeholder=""
                    className="h-[5vh]  w-full border-2 border-[#D5D5D5] rounded"
                    onChange={handleChange}
                    value={empDetails.empID}
                  />
                </div>
                <div className="flex flex-col gap-2 w-[90%] md:w-[31%]">
                  <h1>
                    Currency<sup>*</sup>
                  </h1>
                  <select
                    id="currencyPopUp"
                    className={
                      "text-[12px] h-[5vh] rounded  border-2 border-solid border-[#D5D5D5] bg-transparent font-[sf-pro-medium] cursor-pointer outline-none"
                    }
                    onClick={currencyClick}
                  >
                    <option>
                      {currencyId}({currencySymbol})
                    </option>
                  </select>
                </div>
                <div className="flex flex-col gap-2  w-[90%] md:w-[31%]">
                  <h1>
                    Salary(LPA)<sup>*</sup>
                  </h1>
                  <div className="border-2 flex h-[5vh] justify-between items-center border-[#D5D5D5] rounded">
                    <h1 className="h-[4vh] flex justify-center items-center text-[15px] pl-[3px]">
                      {currencySymbol}
                    </h1>
                    <InputAttendance
                      id="salary"
                      type="text"
                      name="salary"
                      placeholder=""
                      className="h-[4vh] pl-[4px] outline-none  w-full "
                      onChange={handleChange}
                      value={empDetails.salary}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2  w-[90%] md:w-[31%]">
                  <h1>
                    Employee Name <sup>*</sup>
                  </h1>
                  <InputAttendance
                    id="empName"
                    type="text"
                    name="empName"
                    placeholder=""
                    className="h-[5vh]  w-full border-2 border-[#D5D5D5] rounded"
                    onChange={handleChange}
                    value={empDetails.empName}
                  />
                </div>
                <div className="flex flex-col gap-2  w-[90%] md:w-[31%]">
                  <h1>
                    Payment Mode<sup>*</sup>
                  </h1>
                  <select
                    className="h-[5vh]  w-full border-2 border-[#D5D5D5] rounded pl-2"
                    name="paymentMode"
                    onChange={handleChange}
                  >
                    <option disabled selected value="">
                      Choose Payment Type
                    </option>
                    {dbDataPaymentMode?.map((payment, index) => {
                      return <option>{payment.title}</option>;
                    })}
                  </select>
                </div>
                <div className="flex flex-col gap-2  w-[90%] md:w-[31%]">
                  <h1>
                    IFSC Code <sup>*</sup>
                  </h1>
                  <InputAttendance
                    id="ifsc"
                    type="text"
                    name="IFSCCode"
                    placeholder=""
                    className="h-[5vh]  w-full border-2 border-[#D5D5D5] rounded"
                    onChange={handleChange}
                    value={empDetails.IFSCCode}
                  />
                </div>
              </div>
              <div>
                <div className=" mt-3 gap-3 flex flex-col md:flex-row">
                  <div className="flex justify-around h-[20vh] w-[100%] md:w-[76%] flex-wrap items-center gap-3">
                    <div className="flex flex-col gap-2 w-[90%] md:w-[46%]">
                      <h1>
                        Department Name<sup>*</sup>
                      </h1>
                      <select
                        className="h-[5vh] w-full border-2 border-[#D5D5D5] rounded pl-2"
                        name="deptName"
                        onChange={handleChange}
                      >
                        <option disabled selected value="">
                          Choose Department Name
                        </option>
                        {dbDataDept?.map((dept, index) => {
                          return <option>{dept.title}</option>;
                        })}
                      </select>
                    </div>
                    <div className="flex flex-col gap-1  w-[90%] md:w-[46%] md:mr-2">
                      <h1>
                        Bank Account Type<sup>*</sup>
                      </h1>
                      <select
                        className="h-[5vh] w-full  border-2 border-[#D5D5D5] rounded pl-2"
                        name="bankAccType"
                        onChange={handleChange}
                      >
                        <option disabled selected value="">
                          Choose Account Type
                        </option>
                        {dbDataBankAccType?.map((bankType, index) => {
                          return <option>{bankType.title}</option>;
                        })}
                      </select>
                    </div>
                    <div className="flex flex-col gap-2  w-[90%] md:w-[46%]">
                      <h1>
                        Designation <sup>*</sup>
                      </h1>
                      <InputAttendance
                        id="empdesignation"
                        type="text"
                        name="designation"
                        placeholder=""
                        className="h-[5vh]  w-full  border-2 border-[#D5D5D5] rounded"
                        onChange={handleChange}
                        value={empDetails.designation}
                      />
                    </div>
                    <div className="flex flex-col gap-2  w-[90%] md:w-[46%] md:mr-2">
                      <h1>
                        Bank Name<sup>*</sup>
                      </h1>
                      <InputAttendance
                        id="bankName"
                        type="text"
                        name="bankName"
                        placeholder=""
                        className="h-[5vh] w-full  border-2 border-[#D5D5D5] rounded"
                        onChange={handleChange}
                        value={empDetails.bankName}
                      />
                    </div>
                  </div>

                  <div className="flex justify-around items-center h-[16vh]  mt-[146px] md:mt-6 w-[90%] md:ml-0 ml-[16px] md:w-[36%] border-[3px] border-[#D5D5D5] border-dotted rounded-xl">
                    <div className="flex justify-between w-[100%]" onClick={uploadPhoto}>
                                        {
                                            showImageTag == false ? (<> 
                                             
                                              <img className="h-[15.5vh] w-full rounded-[10px] object-cover"   src={empDetails.uploadProfile} />
                                              
                                              <input
                                                            type="file"
                                                            ref={fileUpload}
                                                            onChange={handleFileSelect}
                                                            className="hidden"
                                                            accept="image/*"
                                                            name="uploadProfile"
                                                            value={file.uploadFile}
                                                            // value={empDetails.uploadProfile}
                                                            id="" />
                                                         {/* <Image
                                                            width="20px"
                                                            height="25px"
                                                            src={empDetails.uploadProfile}
                                                            className="hover:cursor-pointer cursor-pointer"
                                                        /> */}
                                              {/* <span
                                                id="TestCross"
                                                onClick={handleCancel}
                                                className=" cursor-pointer  "
                                              >
                                                <Image  className="" height={18} width={20} src="/icons/trash-bin.svg" />
                                              </span>  */}
                                              
                                              </>)
                                             : (<>
                                                <div  className='flex flex-row gap-5 w-[100%] h-[15vh] items-center justify-around '>
                                                    <div className="flex flex-col gap-2 items-center pl-4">
                                                      
                                                        <Image
                                                            width="20px"
                                                            height="25px"
                                                            src="/icons/Upload_image.svg"
                                                            className="hover:cursor-pointer cursor-pointer"
                                                        />
                                                        <input
                                                            type="file"
                                                            ref={fileUpload}
                                                            onChange={handleFileSelect}
                                                            className="hidden"
                                                            accept="image/*"
                                                            name="uploadProfile"
                                                            value={file.uploadFile}
                                                            // value={empDetails.uploadProfile}
                                                            id="" />
                                                        <h2>Upload</h2>
                                                      
                                          
                                                        
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <h1 className="font-bold">Upload Profile</h1>
                                                        <p>Only jpg,png,jpeg image format supported</p>
                                                        {/* <p>240x240 pixels @72 DPI,<br />Maximum size of 1MB.</p> */}
                                                    </div>
                                                </div>
                                            </>)
                                        }
                             

                                    </div>

                    {/* <div className="flex justify-between w-[100%]" onClick={uploadPhoto}>
                      {
                     
                          <>
                            <img
                              src="/images/AvatarImage.png"
                              className="cursor-pointer"
                            ></img>
                            <input
                              type="file"
                              ref={fileUpload}
                              onChange={handleFileSelect}
                              className="hidden"
                              accept="image/*"
                              name="uploadFile"
                              value={file.uploadFile}
                            />

                           
                          </>
                        
                      }
                    </div> */}
                    
                  </div>
                </div>
                <div className="flex pr-1 flex-col md:flex-row">
                  <div className="flex items-center justify-around w-[100%] md:w-[83%] mt-2  md:pr-4 md:flex-row flex-col">
                    <div className="flex flex-col gap-2 w-[91%] md:w-[46%] md:mr-5">
                      <h1>
                        Date of Join<sup>*</sup>
                      </h1>
                      <InputAttendance
                        id="doj"
                        type="date"
                        name="doj"
                        placeholder=""
                        className="h-[5vh] w-full border-2 border-[#D5D5D5] rounded"
                        onChange={handleChange}
                        value={empDetails.doj}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-[90%] md:w-[46%] md:mr-2">
                      <h1>
                        Bank Branch Location<sup>*</sup>
                      </h1>
                      <InputAttendance
                        id="bankBranch"
                        type="text"
                        name="bankBranch"
                        placeholder=""
                        className="h-[5vh] w-full border-2 border-[#D5D5D5] rounded"
                        onChange={handleChange}
                        value={empDetails.bankBranch}
                      />
                    </div>
                  </div>
                  <div className="flex md:justify-around w-[100%] md:w-[38%] justify-end">
                    <div className="flex mt-8 w-[42%]">
                      <ButtonAttendance
                        className=" font-bold h-[5vh] w-[118px] border-[2px] rounded bg-[#DBDBDB] text-black"
                        onClick={handleClear}
                        content="Clear"
                      />
                    </div>
                    <div className="flex mt-8 w-[42%]">
                      <ButtonAttendance
                        className={`${
                          empDetails.doj
                            ? "bg-[#4F46BA] cursor-pointer"
                            : "bg-[#4F46BA]/25 cursor-not-allowed"
                        } items-center h-[5vh] w-[118px] border-[2px] rounded  text-white`}
                        onClick={() => (empDetails.doj ? handleSave() : null)}
                        content="Save"
                      />

                      {/* empDetails.empType && empDetails.accNumber && empDetails.empID && empDetails.salary && empDetails.IFSCCode && empDetails.empName && empDetails.paymentMode && empDetails.deptName && empDetails.bankAccType && empDetails.designation && empDetails.bankName && empDetails.uploadProfile && empDetails.doj && empDetails.bankBranch && empDetails.currencySymbol  */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EmployeeDetailsPopup;
