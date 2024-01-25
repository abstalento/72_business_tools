import { useRef } from "react";
import PayslipFooter from "../footer/payslipfooter";
import Image from "next/image";
import CurrencyPopUp from "../../../pages/billHive/currency-popup/CurrencyPopUp";
import { PDFViewer } from "@react-pdf/renderer";
import PdfContent from "../pdfcontentpayslip/Pdfcontentpayslip";
import React, { useState, useEffect } from 'react';

const Payslip = (props) => {
  const [pdfPayslipData, setPdfPaySlipData] = useState([]);
  const [payListDatas, setPayListDatas] = useState({
    companyName: "",
    companyAddress: "",
    secondLine: "",
    cityPin: "",
    country: "",
    employeeName: "",
    payPeriod: "",
    lossOfPay: "",
    employeeID: "",
    paidDays: "",
    payDate: "",
    basicPayCost: "",
    rentAllowance: "",
    incomeTax: "",
    pfAmount: "",
    joiningDate:"",
    contact:""
  });
  // console.log(payListDatas,"payListDataspayListDatas");

  const [paySummaryAdditionalList, setPaySummaryAdditionalList] = useState([]);

  const [addEarningsAdditional, setAddEarningsAdditional] = useState([]);

  const [addDeductionsAdditional, setAddDeductionsAdditional] = useState([]);
  // console.log(addDeductionsAdditional,"addDeductionsAdditional");

  const [selectedImage, setSelectedImage] = useState(null);

  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [currencySymbol, setCurrencySymbol] = useState("₹");
  const [currencyId, setCurrencyId] = useState("INR");
  const [isCurrency, setIsCUrrency] = useState(false);

  const [showImageTag, setShowImageTag] = useState(true);

  const [earningCalculations, setEarningsCalculations] = useState(0);

  const [deductionCalculations, setDeductionsCalculations] = useState(0);

  const [earningsadditionaltotal, setEarningsAdditionalTotal] = useState();

  const [deducationadditionaltotal, setDeductionAdditionalTotal] = useState();

  const [monthandyear, setMonthAndYear] = useState("");
  // console.log(monthandyear,"monthandyear");
  const [numberInText, setNumberInText] = useState("");
  // console.log(numberInText,"num text");

  const [messageToDisplay, setMessageToDisplay] = useState({
    image: "Please Upload Image",
    companyName: "Enter Company Name",
    employeeName: "Enter Employee Name",
    employeeID: "Enter Employee Id",
    payDays: "Enter PaidDays",
    companyAddress: "Enter Company Address",
    companyPin: "Enter Company Pin",
    imageOption:"Only jpg/jpeg and png files are allowed!",
    joiningDate:"Select the Joining Date"
  });

  const [showMessage, setShowMessage] = useState(false);

  const [colourChanging, setColourChanging] = useState("#FA754E");

  const [showTick, setShowTick] = useState("#FF7043");

  const [showErrMSg, setShowErrMSg] = useState(false);

  const [scrollTop, setScrollTop] = useState();
  const fileUpload = useRef();

  var newdate = new Date();
  var month = newdate.getMonth();
  var date = newdate.getDate();
  var monthText = newdate.toLocaleString("en", { month: "long" });
  var year = newdate.getFullYear();
  const fullDate = year + "-" + month + "-" + date;
  // const fullDate=date+"-"+month+"-"+year
  // console.log(month+1,"date");
  const showdefault = monthText + "-" + year;
  const yearDate = year + "-" + (month + 1);
  const valueofdate = payListDatas.payPeriod;
  const valuedate = year + "-" + (month + 1) + "-" + "0" + "1";
  const nochange = valueofdate + "-" + "0" + "1";
  const paidDaysCalculate = payListDatas.paidDays - 31;
  const finalValue = Math.abs(paidDaysCalculate);

  const [image, setImage] = useState({
    profilePic: null,
    ImageUploaded: false,
  });

  const generateslip = (data) => {
    setShowMessage(true);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 570, left: 0, behavior: "smooth" });
    }
  };
  useEffect(() => {
    overAllClick();
  }, [
    payListDatas.basicPayCost,
    payListDatas.rentAllowance,
    payListDatas.incomeTax,
    payListDatas.pfAmount,
    addDeductionsAdditional.value,
    addEarningsAdditional.value,
  ]);

  const handleConver = (value) => {
    const month = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let u = value.split("-");
    // console.log(u[1],"u");
    if (u[1] >= 10) {
      let i = value.split("-")[1] - 1;
      let value1 = month[i] + "-" + u[0];
      setMonthAndYear(value1);
    } else {
      let i = value.split("-")[1].toString().split("")[1] - 1;
      let value2 = month[i] + "-" + u[0];
      setMonthAndYear(value2);
    }

    // console.log(u[0],month[i],'date');
  };
  // Functions

  // const paySlipData = (event) => {
  //   const { name, value } = event.target;



  //   // const value = event.target
  //   // const val1 = value.replace(/[^\w\s]/gi, "");
  //   // const val2 = val1.replace(/[^\S*@$]/gi, "");
  //   setPayListDatas({ ...payListDatas, [name]: value });
  //   // setPayListDatas({ ...payListDatas, [name]: name === "employeeName" || name === "companyName" ? val2 : name === "lossOfPay" || name === "paidDays" ? value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1") : value });

  //   if (name == "payPeriod") {
  //     handleConver(value);
  //   }
  // };
  // const onAddAdditionalField = () => {
  //   setPaySummaryAdditionalList((prevState) =>
  //     prevState.concat({ title: "", value: "" })
  //   );
  // };

  const paySlipData = (event) => {
    const { name, value } = event.target;
  
    let sanitizedValue;
  
    if (name === "employeeName" || name === "companyName") {
      sanitizedValue = value.replace(/[^A-Za-z]/g, "");
    }
    else if (name === "contact" || name === "cityPin") {
      sanitizedValue = value.replace(/[^0-9]/g, "");
    }
     else {
      sanitizedValue = value;
    }
  
    setPayListDatas({ ...payListDatas, [name]: sanitizedValue });
  
    if (name === "payPeriod") {
      handleConver(value);
    }
  };
  
  const onAddAdditionalField = () => {
    setPaySummaryAdditionalList((prevState) =>
      prevState.concat({ title: "", value: "" })
    );
  };
  

  const handleEmployeePay = (event, index) => {
    const { value, name } = event.target;
    // console.log(value,name,"name and value")
    const list = [...paySummaryAdditionalList];
    list[index][name] = value;
    setPaySummaryAdditionalList(list);
  };

  const handleRefresh = (data) => {
    window.location.reload();
  };
  const uploadPhoto = () => {
    fileUpload.current.click();
  };
  const handleFileSelect = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    let isValid = validateFile(fileObj);
    if (isValid) {
      setSelectedImage(fileObj);
      setCreateObjectURL(URL.createObjectURL(fileObj));
      let value = false;
      setShowImageTag(value);
      setShowErrMSg(false);
    } else {
      setShowErrMSg(true);
    }
  };

  const validateFile = (fileObj) => {
    const docSize = fileObj.size / 1024 / 1024;
    // console.log(docSize, "-DOCSIZE");
    // console.log(fileObj.name.match(/(\.jpg|\.JPG)$/), "FILEOBJ");
    if (docSize < 1 && fileObj.name.match(/(\.jpg|\.JPG|\.png|\.PNG)$/)) {
      return true;
    } else {
      return false;
    }
  };
  // const handlePaySummaryData = (event, index) => {

  // }
  // EarningsAdditionalAdd
  const handleChangeAdditional = (event, index) => {
    const { value, name } = event.target;
    const list = [...addEarningsAdditional];
    list[index][name] = value;
    setAddEarningsAdditional(list);
  };
  // DeductionAddingData
  const handleChangeDeduction = (event, index) => {
    const { value, name } = event.target;
    const list = [...addDeductionsAdditional];
    list[index][name] = value;
    setAddDeductionsAdditional(list);
  };

  const addEarnongsOrDeductions = (name) => {
    // const { name } = event.target;
    if (name == "AddEarnings") {
      setAddEarningsAdditional((prevState) =>
        prevState.concat({ title: "", value: "" })
      );
    } else if (name == "AddDeductions") {
      setAddDeductionsAdditional((prevState) =>
        prevState.concat({ title: "", value: "" })
      );
    }
  };

  const overAllClick = () => {
    addingDataEarnings();
    addingDataExpense();
    earningsAdditionalCalculate();
    deductionsAdditionalCalculation();
  };

  //    calculations
  const addingDataEarnings = () => {
    if (addEarningsAdditional && earningsadditionaltotal) {
      let data1 = Number(payListDatas.rentAllowance);
      let data2 = Number(payListDatas.basicPayCost);
      let data3 = Number(earningsadditionaltotal);
      let addingEarnings = data1 + data2 + data3;
      setEarningsCalculations(addingEarnings);
    } else {
      let data1 = Number(payListDatas.rentAllowance);
      let data2 = Number(payListDatas.basicPayCost);
      let addingEarnings = data1 + data2;
      setEarningsCalculations(addingEarnings);
    }
    // console.log(addingEarnings,"addingEarnings");
  };

  const addingDataExpense = () => {
    if (addEarningsAdditional && deducationadditionaltotal) {
      let data1 = Number(payListDatas.incomeTax);
      let data2 = Number(payListDatas.pfAmount);
      let data3 = Number(deducationadditionaltotal);
      let addingExpense = data1 + data2 + data3;
      setDeductionsCalculations(addingExpense);
    } else {
      let data1 = Number(payListDatas.incomeTax);
      let data2 = Number(payListDatas.pfAmount);
      let addingExpense = data1 + data2;
      setDeductionsCalculations(addingExpense);
    }
  };

  const earningsAdditionalCalculate = () => {
    let earningsReduce = addEarningsAdditional.reduce(
      (total, item) => Number(total) + Number(item.value),
      0
    );
    setEarningsAdditionalTotal(earningsReduce);
    addingDataEarnings();
  };

  const deductionsAdditionalCalculation = () => {
    let earningsReduce = addDeductionsAdditional.reduce(
      (total, item) => Number(total) + Number(item.value),
      0
    );
    setDeductionAdditionalTotal(earningsReduce);
    addingDataExpense();
  };

  const handleDeletePaySummary = (index) => {
    const remove = [...paySummaryAdditionalList];
    remove.splice(index, 1);
    setPaySummaryAdditionalList(remove);
    // console.log(index,"remove");
  };
  const handleDeleteIncome = (index) => {
    const remove = [...addEarningsAdditional];
    remove.splice(index, 1);
    // let remove=addEarningsAdditional.splice(index,1)
    setAddEarningsAdditional(remove);
    // console.log(index,"remove");
    addingDataEarnings();
  };
  const handleDeleteExpense = (index) => {
    const remove = [...addDeductionsAdditional];
    remove.splice(index, 1);
    // let remove=addEarningsAdditional.splice(index,1)
    setAddDeductionsAdditional(remove);
  };
  const deleteImage = () => {
    setCreateObjectURL(null);
    setShowImageTag(true);
  };
  const handleChangeColour = (data) => {
    setColourChanging(data);
    setShowTick(data);
    props.callBackColour(data);
  };

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
  const imageFileHandler = (e) => {
    const fileObj = e.target.files && e.target.files[0];
    if (!fileObj) {
      return;
    }

    let isValid = validateFile(fileObj);
    

    if (isValid) {
      // const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(fileObj);

      reader.onloadend = function (e) {
        setImage({
          ...image,
          profilePic: [reader.result],
          ImageUploaded: true,
        });

        setShowErrMSg(false);
      };
    }
    else{
      handleCancel()
      setShowErrMSg(true);
      
    }
  };
  const handleCancel = () => {
    setImage({ profilePic: null, ImageUploaded: false });
    const images = {
      profilePic: null,
      ImageUploaded: false,
    };
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
      {/*Parent overall Div */}
      <div
        onClick={overAllClick}
        className="flex relative top-[-5rem] md:top-[-2rem] lg:top-[-130px] h-full flex-col 
        justify-center rounded-[15px] pt-[45px] scroll-smooth lg:w-[85%] w-[88%] bg-[#F9F9F9]"
      >
        {/* Image and date display prnt div */}
        <div className="w-full flex justify-center md:pb-[4rem]">
          <div className="flex w-[80%] sm:flex-row md:flex-row sm:w-[80%] md:w-[80%] sm:h-[30vh] md:h-[30vh] items-start justify-between">
            <div className="sm:w-[55%] md:w-[55%] w-[60%] flex flex-row items-center">
              <div className="md:w-[40%] md:h-[220px] w-[73%] h-[131px] sm:w-[73%] sm:h-[131px]  text-[12px] rounded-[1.5rem] flex flex-col  border-[2px] border-dashed justify-center border-black hover:cursor-pointer">
                {image.ImageUploaded ? (
                  <section className="w-[100%] md:h-[225px] h-[131px] relative">
                    <section>
                      <span
                        id="TestCross"
                        onClick={handleCancel}
                        className=" cursor-pointer hover:bg-white"
                      >
                        <img
                          className="z-50 relative top-[10px] left-[4px] h-[15px] bg-black hover:bg-red-600 rounded-lg border-none"
                          src="/icons/x-mark.svg"
                        />
                      </span>
                      <img
                        src={image.profilePic}
                        alt=""
                        id="profilePic"
                        className="md:h-[208px] h-[105px] sm:h-[105px] w-[100%] rounded-sm"
                      />
                    </section>
                    <input
                      id="addProfilebtn"
                      className="opacity-0 absolute w-[170px] bottom-1 h-[175px] cursor-pointer"
                      type="file"
                      accept="image/png,image/jpeg"
                      onChange={imageFileHandler}
                    />
                    {
                      showErrMSg?(
                        <span>
                          <br />
      
                          <p className="text-[#FF1D1D] text-[13px]">
                            {/* {messageToDisplay.imageOption} */}
                          </p>
                        </span>
                      ) : null
                    }
                  </section>
                     
                ) : 
                (
                  <button
                    className=" w-[100%] flex flex-col cursor-pointer z-50"
                    // variant="text"
                    onChange={imageFileHandler}
                  >
                    <span className="w-[100%] h-[35px] md:h-[45px]  top-[100px] lg:top-[70px] relative flex flex-col justify-center items-center cursor-pointer">
                      <Image
                        width="18%"
                        height="18px"
                        className=" h-[18px] cursor-pointer"
                        src="/icons/photo-camera.svg"
                      />
                      <label className="text-center relative top-[10px] text-[10px]">
                        ADD YOUR COMPANY LOGO HERE
                      </label>
                    </span>
                    {/* <img
                        src={image.profilePic}
                        alt=""
                        id="profilePic"
                        className="md:h-[208px] h-[105px] sm:h-[105px] w-[100%] rounded-sm"
                      /> */}
                    <input
                      id="addProfilebtn"
                      className="opacity-0 relative w-[170px] bottom-6 h-[175px] cursor-pointer"
                      type="file"
                      accept="image/png,image/jpeg"
                      onChange={imageFileHandler}
                    />
                    {!image.ImageUploaded && showMessage ? (
                      <span>
                        <br />
                        <br />
                        <p className="text-[#FF1D1D] text-[13px]">
                          {messageToDisplay.image}
                        </p>
                      </span>
                    ) : null}
                    
                    {
                      showErrMSg?(
                        <span>
                          {/* <br /> */}
                          <br className="sm:hidden" />
                        
                          <p className="text-[#FF1D1D] lg:mt-[2.5rem] mt-[-3rem] text-[13px]">
                            {messageToDisplay.imageOption}
                          </p>
                        </span>
                      ) : null
                    }
                  </button>
                )}
              </div>
              <div className="hidden sm:hidden md:block">
                <div className="pl-10 md:mb-[2px] flex flex-col h-[13vh] justify-between">
                  <h1 className="font-[sfpro-bold] text-[25px]">Upload Logo</h1>
                  <div className="font-[sfpro-medium]">
                    <h1>240 x 240 pixels @ 72 DPI,</h1>
                    <h1
                      className={`${
                        showErrMSg == true ? "text-[#ff681d]" : null
                      }`}
                    >
                      {" "}
                      Maximum size of 1MB.
                    </h1>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between sm:h-[30vh] md:h-[30vh] h-[15vh] sm:w-[20%] md:w-[20%] w-[50%]">
              <div className="">
                <h1 className="sm:text-[20px] md:text-[20px] text-[12px] text-[#161616] font-[sfpro-medium]">
                  Payslip For the Month
                </h1>
                <h1
                  style={{ color: colourChanging }}
                  className={`sm:text-[20px] md:text-[20px] text-[15px] text-[#FA754E] font-[sfpro-bold] font-bold`}
                >
                  {monthandyear ? monthandyear : showdefault}
                </h1>
              </div>
              <div className=""></div>
              <div className="w-full flex flex-col justify-between md:h-[15vh] sm:h-[15vh] h-[10vh]">
                <h1 className="font-bold font-[sfpro-bold] sm:pt-5 md:pt-5 pt-2 ">
                  Change Theme Colour
                </h1>
                <div className="flex flex-row justify-between w-[86%]">
                  <div
                    onClick={() => handleChangeColour("#42A5F5")}
                    id="col1"
                    className="bg-[#42A5F5] w-[23px] h-[23px] rounded-full flex items-center justify-center"
                  >
                    {showTick === "#42A5F5" ? (
                      <>
                        <Image height={15} width={15} src="/icons/check.svg" />
                      </>
                    ) : (
                      <>{null}</>
                    )}
                  </div>
                  <div
                    onClick={() => handleChangeColour("#66BB6A")}
                    id="col2"
                    className="bg-[#66BB6A] w-[23px] h-[23px] rounded-full flex items-center justify-center"
                  >
                    {showTick === "#66BB6A" ? (
                      <>
                        <Image height={15} width={15} src="/icons/check.svg" />
                      </>
                    ) : (
                      <>{null}</>
                    )}
                  </div>
                  <div
                    onClick={() => handleChangeColour("#FFA726")}
                    id="col3"
                    className="bg-[#FFA726] w-[23px] h-[23px] rounded-full flex items-center justify-center"
                  >
                    {showTick === "#FFA726" ? (
                      <>
                        <Image height={15} width={15} src="/icons/check.svg" />
                      </>
                    ) : (
                      <>{null}</>
                    )}
                  </div>
                  <div
                    onClick={() => handleChangeColour("#EF5350")}
                    id="col4"
                    className="bg-[#EF5350] w-[23px] h-[23px] rounded-full flex items-center justify-center"
                  >
                    {showTick === "#EF5350" ? (
                      <>
                        <Image height={15} width={15} src="/icons/check.svg" />
                      </>
                    ) : (
                      <>{null}</>
                    )}
                  </div>
                  <div
                    onClick={() => handleChangeColour("#AB47BC")}
                    id="col5"
                    className="bg-[#AB47BC] w-[23px] h-[23px] rounded-full flex items-center justify-center"
                  >
                    {showTick === "#AB47BC" ? (
                      <>
                        <Image height={15} width={15} src="/icons/check.svg" />
                      </>
                    ) : (
                      <>{null}</>
                    )}
                  </div>
                </div>
                <div className="w-full hidden sm:block md:block">
                  <div className="flex flex-row justify-between w-[86%]">
                    <div
                      onClick={() => handleChangeColour("#EC407A")}
                      id="col6"
                      className="bg-[#EC407A] w-[23px] h-[23px] rounded-full flex items-center justify-center"
                    >
                      {showTick === "#EC407A" ? (
                        <>
                          <Image
                            height={15}
                            width={15}
                            src="/icons/check.svg"
                          />
                        </>
                      ) : (
                        <>{null}</>
                      )}
                    </div>
                    <div
                      onClick={() => handleChangeColour("#7E57C2")}
                      id="col7"
                      className="bg-[#7E57C2] w-[23px] h-[23px] rounded-full flex items-center justify-center"
                    >
                      {showTick === "#7E57C2" ? (
                        <>
                          <Image
                            height={15}
                            width={15}
                            src="/icons/check.svg"
                          />
                        </>
                      ) : (
                        <>{null}</>
                      )}
                    </div>
                    <div
                      onClick={() => handleChangeColour("#009688")}
                      id="col8"
                      className="bg-[#009688] w-[23px] h-[23px] rounded-full flex items-center justify-center"
                    >
                      {showTick === "#009688" ? (
                        <>
                          <Image
                            height={15}
                            width={15}
                            src="/icons/check.svg"
                          />
                        </>
                      ) : (
                        <>{null}</>
                      )}
                    </div>
                    <div
                      onClick={() => handleChangeColour("#FF7043")}
                      id="col9"
                      className="bg-[#FF7043] w-[23px] h-[23px] rounded-full flex items-center justify-center"
                    >
                      {showTick === "#FF7043" ? (
                        <>
                          <Image
                            height={15}
                            width={15}
                            src="/icons/check.svg"
                          />
                        </>
                      ) : (
                        <>{null}</>
                      )}
                    </div>
                    <div
                      onClick={() => handleChangeColour("#232E38")}
                      id="col10"
                      className="bg-[#232E38] w-[23px] h-[23px] rounded-full flex items-center justify-center"
                    >
                      {showTick === "#232E38" ? (
                        <>
                          {" "}
                          <Image
                            height={15}
                            width={15}
                            src="/icons/check.svg"
                          />
                        </>
                      ) : (
                        <>{null}</>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* company details prnt div */}
        <div className="w-full min-h-[35vh md:max-h-[38vh] sm:max-h-[60vh] lg:mt-[20px] lg:pb-[260px] md:mt-[20px] md:pb-[260px] max-h-[60vh] xs:border-none border-dashed border-b-2 flex justify-center ">
          {/* company details input prnt div */}
          <div className="flex flex-row w-[80%] mt-[50px] justify-between">
            <div className=" flex sm:flex-col md:flex-row flex-col justify-between w-full sm:w-full">
              {/* company details input div */}
              <div className="flex flex-col w-full ">
                <div className="mb-5">
                  <input
                    type="text"
                    value={payListDatas.companyName}
                    id="comname"
                    maxLength={50}
                    onChange={paySlipData}
                    placeholder="Company Name*"
                    name="companyName"
                    className=" outline-none pl-[20px] text-justify bg-[#FFFFFF] placeholder-[#424242] font-[sfpro-medium] sm:text-[18px] md:text-[18px] text-[15px]  sm:w-full md:w-[80%] w-full p-[10px] rounded-[5px] "
                  />
                  {!payListDatas.companyName && showMessage ? (
                    <span>
                      <p className="text-[#FF1D1D] text-[13px]">
                        {messageToDisplay.companyName}
                      </p>
                    </span>
                  ) : null}
                </div>
                <div className="mb-5">
                  <input
                    type="text"
                    value={payListDatas.companyAddress}
                    id="comadd"
                    maxLength={40}
                    onChange={paySlipData}
                    name="companyAddress"
                    placeholder="Company Address*"
                    className=" pl-[20px] bg-[#FFFFFF] outline-none placeholder-[#424242] font-[sfpro-medium]  sm:text-[18px] md:text-[18px] text-[15px] sm:w-full md:w-[80%] w-full p-[10px] rounded-[5px] "
                  />
                  {!payListDatas.companyAddress && showMessage ? (
                    <span>
                      <p className="text-[#FF1D1D] text-[13px]">
                        {messageToDisplay.companyAddress}
                      </p>
                    </span>
                  ) : null}
                </div>
                <input
                  type="text"
                  value={payListDatas.secondLine}
                  maxLength={40}
                  id="secline"
                  onChange={paySlipData}
                  name="secondLine"
                  placeholder="Second Line"
                  className=" outline-none pl-[20px] bg-[#FFFFFF] placeholder-[#424242] font-[sfpro-medium] mb-5 sm:text-[18px] md:text-[18px] text-[15px] sm:w-full md:w-[80%] w-full p-[10px] rounded-[5px] "
                />
              </div>
              {/* company details second set div right */}
              <div className="flex flex-col w-full justify-end md:justify-start  md:mt-[67px]">
                <input
                  type="text"
                  maxLength={6}
                  value={payListDatas.cityPin}
                  id="citypin"
                  onChange={paySlipData}
                  name="cityPin"
                  placeholder="City Pin code*"
                  className=" outline-none pl-[20px] placeholder-[#424242] bg-[#FFFFFF] font-[sfpro-medium] sm:text-[18px] md:text-[18px] text-[15px] sm:w-full md:w-[80%] w-full p-[10px] rounded-[5px]"
                />
                <div className="w-[80%]">
                  {!payListDatas.cityPin && showMessage ? (
                    <span>
                      <p className="text-[#FF1D1D] text-[13px]">
                        {messageToDisplay.companyPin}
                      </p>
                    </span>
                  ) : null}
                </div>
                <input
                  type="text"
                  value={payListDatas.country}
                  id="country"
                  onChange={paySlipData} 
                  name="country"
                  placeholder="Country"
                  className=" outline-none pl-[20px] placeholder-[#424242] mt-5 bg-[#FFFFFF] font-[sfpro-medium] mb-5 sm:text-[18px] md:text-[18px] text-[15px] sm:w-full  md:w-[80%] w-full p-[10px] rounded-[5px]"
                />
              </div>
            </div>
          </div>
        </div>
        {/* company details end div */}
        {/* employe details parent overall div */}
        <div className="w-full h-50vh border-dashed lg:pt-12px sm:pt-100px border-b-2 xs:pt-[5rem] flex justify-center flex-col items-center">
          {/* employe details heading div */}
          <div className=" flex justify-start items-center sm:text-[25px] md:text-[25px] text-[20px]  font-[sfpro-bold] w-[80%] ">
            <h1 className="flex flex-row sm:h-[10vh] md:h-[10vh] h-[8vh] justify-around items-center">
              {" "}
              Employee Pay Summary<p className="text-[#FF0303] xs:text-xs">*</p>
            </h1>
          </div>
          {/* employe details input prnt div */}
          <div className="bg-[#ffffff] flex-wrap rounded-[5px] pt-[30px] h-auto flex justify-center mb-10 w-[80%] md:w-[90%] xs:w-[90%]">
            {/* employe details input fields */}
            <div className=" flex sm:flex-wrap md:flex-wrap  md:flex-row sm:flex-col flex-col justify-between w-[95%] h-auto items-center">
              {/* inputs cato  heading  */}
              <div className=" flex flex-col justify-around sm:w-full md:w-[45%] w-full">
                {/* input one */}
                <div className="flex flex-row w-full justify-around items-center mb-5">
                  <div className="w-[39%] font-[sfpro-regular] sm:text-[20px] md:text-[20px] text-[15px] flex justify-start items-center">
                    <label htmlFor="EmployeeName" className="text-[#535353]">
                      Employee Name
                    </label>
                  </div>
                  <div className="flex w-[55%] items-center justify-end">
                    <p className="text-[20px]">:</p>
                    <div className="w-[96%] pl-4">
                      <input
                        maxLength={50}
                        value={payListDatas.employeeName}
                        onChange={paySlipData}
                        placeholder="Eg.Sahaya Raj"
                        type="text"
                        className=" outline-none pl-[12px] bg-[#2E2E2E0D] p-[10px] w-[89%]  rounded-[5px]"
                        name="employeeName"
                        id="EmployeeName"
                      />
                      {!payListDatas.employeeName && showMessage ? (
                        <span>
                          <p className="text-[#FF1D1D] text-[13px]">
                            {messageToDisplay.employeeName}
                          </p>
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row w-full justify-around items-center mb-5">
                  <div className="w-[39%] font-[sfpro-regular] sm:text-[20px] md:text-[20px] text-[15px] flex justify-start items-center">
                    <label htmlFor="JoiningDate" className="text-[#535353]">
                      Joining Date
                    </label>
                  </div>
                  <div className="flex w-[55%] items-center justify-end">
                    <p className="text-[20px]">:</p>
                    <div className="w-[96%] pl-4">
                      <input
                        maxLength={50}
                        value={payListDatas.joiningDate}
                        onChange={paySlipData}
                        type="Date"
                        className=" outline-none pl-[12px] bg-[#2E2E2E0D] p-[10px] w-[89%]  rounded-[5px]"
                        name="joiningDate"
                        id="joiningDate"
                      />
                      {!payListDatas.joiningDate && showMessage ? (
                        <span>
                          <p className="text-[#FF1D1D] text-[13px]">
                            {messageToDisplay.joiningDate}
                          </p>
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                {/* input two */}
                <div className="flex flex-row w-full justify-around items-center mb-5">
                  <div className="w-[39%] font-[sfpro-regular]  sm:text-[20px] md:text-[20px] text-[15px] flex justify-start items-center">
                    <label htmlFor="PayPeriod" className="text-[#535353]">
                      Pay Period
                    </label>
                  </div>
                  <div className="flex w-[56%] items-center justify-end">
                    <p className="text-[20px]">:</p>
                    <div className="w-[95%] pl-4">
                      <input
                        placeholder="Eg. 2450/-"
                        value={
                          payListDatas.payPeriod
                            ? payListDatas.payPeriod
                            : yearDate
                        }
                        onChange={paySlipData}
                        type="month"
                        className=" pl-[15px] pr-3 outline-none bg-[#2E2E2E0D] p-[10px] w-[89%] rounded-[5px]"
                        name="payPeriod"
                        id="PayPeriod"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row w-full justify-around items-center mb-5">
                  <div className="w-[39%] font-[sfpro-regular]  sm:text-[20px] md:text-[20px] text-[15px] flex justify-start items-center">
                    <label htmlFor="LossofPayDays" className="text-[#535353]">
                      Loss of Pay Days
                    </label>
                  </div>
                  <div className="flex w-[55%] items-center justify-end">
                    <p className="text-[20px]">:</p>
                    <div className="w-[96%] pl-4">
                      <input
                        placeholder="Eg.02"
                        value={
                          (payListDatas.lossOfPay =
                            payListDatas.lossOfPay > 31
                              ? ""
                              : payListDatas.lossOfPay)
                        }
                        onChange={paySlipData}
                        type="number"
                        className=" outline-none w-[89%] pl-[12px] bg-[#2E2E2E0D] p-[10px]  rounded-[5px]"
                        name="lossOfPay"
                        id="LossofPayDays"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* deduction container parent */}
              <div className=" flex flex-col justify-around md:w-[48%] sm:w-full w-full">
                {/* input one */}
                <div className="flex flex-row w-full items-center justify-around mb-5">
                  <div className="sm:w-[35%] md:w-[38%] w-[44%]  sm:text-[20px] md:text-[20px] text-[15px] font-[sfpro-regular] flex justify-start items-center ">
                    <label htmlFor="Employee ID :" className="text-[#535353]">
                      Employee ID
                    </label>
                  </div>
                  <div className="flex sm:w-[52%] md:w-[60%] w-[58%]  items-center ">
                    <p className="text-[20px]">:</p>
                    <div className="w-[85%] pl-4">
                      <input
                        placeholder="Eg.12345"
                        maxLength={25}
                        value={payListDatas.employeeID}
                        onChange={paySlipData}
                        type="text"
                        className=" outline-none bg-[#2E2E2E0D] p-[10px] sm:w-[107%] md:w-[92%] w-[100%] pl-3 rounded-[5px]"
                        name="employeeID"
                        id="EmployeeID"
                      />

                      {!payListDatas.employeeID && showMessage ? (
                        <span>
                          <p className="text-[#FF1D1D] text-[13px]">
                            {messageToDisplay.employeeID}
                          </p>
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row w-full items-center justify-around mb-5">
                  <div className="sm:w-[35%] md:w-[38%] w-[44%]  sm:text-[20px] md:text-[20px] text-[15px] font-[sfpro-regular] flex justify-start items-center ">
                    <label htmlFor="Contact  :" className="text-[#535353]">
                      Contact 
                    </label>
                  </div>
                  <div className="flex sm:w-[52%] md:w-[60%] w-[58%]  items-center ">
                    <p className="text-[20px]">:</p>
                    <div className="w-[85%] pl-4">
                      <input
                      
                        placeholder="Eg.91234 56789"
                        maxLength={10}
                        value={payListDatas.contact}
                        onChange={paySlipData}
                        type="tel"
                        className=" outline-none bg-[#2E2E2E0D] p-[10px] sm:w-[107%] md:w-[92%] w-[100%] pl-3 rounded-[5px]"
                        name="contact"
                        id="EmployeeContact"
                      />

                    </div>
                  </div>
                </div>
                {/* input two */}
                <div className="flex flex-row w-full items-center justify-around mb-5">
                  <div className="sm:w-[35%] md:w-[38%] w-[44%] font-[sfpro-regular] sm:text-[20px] md:text-[20px] text-[15px] flex justify-start items-center">
                    <label htmlFor="Paid Days" className="text-[#535353]">
                      Paid Days
                    </label>
                  </div>
                  <div className="flex sm:w-[52%] md:w-[60%] w-[58%] items-center">
                    <p className="text-[20px]">:</p>
                    <div className=" w-[85%] pl-4">
                      <input
                        placeholder="Eg.22"
                        max={30}
                        value={
                          (payListDatas.paidDays =
                            payListDatas.paidDays > 31
                              ? ""
                              : payListDatas.paidDays)
                        }
                        onChange={paySlipData}
                        type="number"
                        className=" outline-none sm:w-[107%] md:w-[92%] w-[100%] bg-[#2E2E2E0D] pl-3 p-[10px]  rounded-[5px]"
                        name="paidDays"
                        id="PaidDays"
                      />
                      {!payListDatas.paidDays && showMessage ? (
                        <span>
                          <p className="text-[#FF1D1D] text-[13px]">
                            {messageToDisplay.payDays}
                          </p>
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="flex flex-row w-full items-center justify-around mb-5">
                  <div className="sm:w-[35%] md:w-[38%] w-[44%] font-[sfpro-regular] sm:text-[20px] md:text-[20px] text-[15px] flex justify-start items-center ">
                    <label htmlFor="Pay Date" className="text-[#535353]">
                      Pay Date
                    </label>
                  </div>
                  <div className="flex sm:w-[52%] md:w-[60%] w-[58%] items-center">
                    <p className="text-[20px]">:</p>
                    <div className=" w-[85%] pl-4">
                      <input
                        placeholder="Eg. 2450/-"
                        value={payListDatas.payDate}
                        min={nochange}
                        onChange={paySlipData}
                        type="date"
                        className=" outline-none bg-[#2E2E2E0D] pl-3 sm:h-[6vh] md:h-[6vh] h-[5vh] pr-3 sm:w-[107%] md:w-[92%] w-[100%] rounded-[5px]"
                        name="payDate"
                        id="PayDate"
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* additional */}
              <div className="hidden sm:hidden w-full md:block ">
                <div
                  className="flex flex-col justify-between w-[93%] 
                                    items-center h-auto md:flex-wrap sm:flex-wrap sm:flex-row md:flex-row "
                >
                  {paySummaryAdditionalList.map((additionList, index) => (
                    <div
                      id={index}
                      className="flex flex-row w-[45%] items-center justify-around mb-5 "
                    >
                      
                        <input
                          onChange={(event) => handleEmployeePay(event, index)}
                          value={additionList.title}
                          placeholder="Enter Text"
                          id={`text${index}`}
                          type="text"
                          name="title"
                          className="text-[black] outline-none pl-[1px] w-[35%] font-[sfpro-regular] text-[20px] "
                        />
                     
                      <div id={index} className="flex w-[34%] items-center">
                        <p className="text-[20px]">:</p>
                        <div
                          id={index}
                          className=" w-[95%] justify-between  flex flex-row pl-4"
                        >
                          <input
                            onChange={(event) =>
                              handleEmployeePay(event, index)
                            }
                            value={additionList.value}
                            id={`secondone${index}`}
                            type="text"
                            className=" outline-none bg-[#2E2E2E0D] pl-10 h-[6vh] w-[90] rounded-[5px]"
                            name="value"
                          />
                        </div>
                      </div>
                      <div className="relative left-[60px]">
                        <Image
                          src="/icons/remove.svg"
                          className="cursor-pointer"
                          id="deleteadditional"
                          onClick={() => handleDeletePaySummary(index)}
                          height={20}
                          width={17}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* additional 2*/}
              <div className=" flex items-start flex-col md:hidden justify-start w-full h-auto">
                {paySummaryAdditionalList.map((additionList, index) => (
                  <div id={index} className=" flex mb-[20px] h-[5vh] w-[100%]">
                    <div className=" h-[5vh] w-[45%]">
                      <input
                        onChange={(event) => handleEmployeePay(event, index)}
                        placeholder="Enter Text"
                        value={additionList.title}
                        type="text"
                        name="title"
                        id={`text${index}`}
                        className="text-[black] outline-none h-[5vh] w-full"
                      />
                    </div>
                    <div
                      id={index}
                      className=" flex justify-between flex-row h-[5vh] w-[55%]"
                    >
                      <p className="text-[20px]">:</p>
                      <input
                        onChange={(event) => handleEmployeePay(event, index)}
                        type="text"
                        value={additionList.value}
                        id={`secondone${index}`}
                        className=" outline-none bg-[#2E2E2E0D] w-[84%] id={`text${index}`}  rounded-[5px]"
                        name="value"
                      />
                    </div>
                    <div className="h-[5vh] justify-center flex items-center">
                      <Image
                        src="/icons/remove.svg"
                        className="cursor-pointer"
                        id="deleteadditional"
                        onClick={() => handleDeletePaySummary(index)}
                        height={20}
                        width={20}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-[95%] flex pb-9 items-center justify-start sm:items-start sm:justify-start md:items-start md:justify-start">
              <div
                style={{ backgroundColor: colourChanging }}
                onClick={onAddAdditionalField}
                className="bg-[#FA754E] cursor-pointer sm:w-[45%]21qw md:w-[23%] w-full sm:h-[6vh] md:h-[6vh] h-[5vh] flex justify-center items-center text-[#FFFFFF] rounded-[5px]"
              >
                <Image
                  name="AddEarnings"
                  className="cursor-pointer"
                  height={15}
                  width={15}
                  src="/icons/Pathpayslip.svg"
                />
                <button
                  id="additional"
                  className="pl-2 text-[13px] sm:text-[16px] md:text-[16px]"
                  name="AddEarnings"
                >
                  Add another field
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* income details parent div */}
        <div className=" w-full md:w-full  flex justify-center flex-col items-center ">
          {/* details heading div */}
          <div className="  flex justify-between items-center  sm:text-[25px] md:text-[25px] text-[20px] font-[sfpro-bold] w-[80%] h-[10vh]">
            <h3 className="flex flex-row sm:w-[50%] md:w-[29%] w-[85%]">
              Income Details<p className="text-[#FF0303] xs:text-xs">*</p>
            </h3>
            <div className="text-[20px] flex justify-around font-[sfpro-medium] items-center">
              <h6
                onClick={currencyClick}
                className="sm:text-[17px] md:text-[17px] text-[13px] rounded-[5px] p-[5px] xs:text-xs"
              >
                {" "}
                Choose currency:
              </h6>
              <div>
                <select
                  id="currencyPopUp"
                  className={
                    "sm:text-[17px] md:text-[17px] text-[13px] outline-none bg-transparent font-[sfpro-Regular] cursor-pointer"
                  }
                  onClick={currencyClick}
                >
                  <option>
                    {currencyId}({currencySymbol})
                  </option>
                </select>
              </div>
            </div>
          </div>
          {/* details input parent div */}
          <div className="flex justify-center pt-[10px] mb-[45px] sm:mb-[45px] md:mb-0 md:pb-[40px] bg-[#ffffff] xs:w-[90%] h-auto rounded-[5px]  w-[80%] md:w-[90%] ">
            {/* input container */}
            <div className=" flex sm:flex-col md:flex-row flex-col justify-between w-[95%] h-auto items-center">
              {/* inputs cato  heading  */}
              <div className=" flex flex-col border-b-[2px] border-dashed sm:border-dashed md:border-none sm:pb-[20px] md:pb-[0] justify-around sm:w-full md:w-[50%] w-full">
                <div className="w-[39%] text-[20px] flex font-[sfpro-medium]  justify-start items-center">
                  <h1 className="w-full pl-2 text-[22px] mb-7">Earnings</h1>
                </div>

                {/* input one */}
                <div className="flex flex-row w-full justify-around items-center mb-5">
                  <div className="w-[39%] font-[sfpro-regular] sm:text-[20px] md:text-[20px] text-[15px] flex justify-start items-center">
                    <label htmlFor="Basic Pay Cost" className="text-[#535353]">
                      Basic Pay Cost
                    </label>
                  </div>
                  <div className="flex w-[55%] items-center justify-end">
                    <p className="text-[20px]">:</p>
                    <div className="w-[96%] flex items-center pl-4">
                      <input
                        onFocus={() => addingDataEarnings()}
                        value={payListDatas.basicPayCost}
                        onChange={paySlipData}
                        placeholder="Eg.1,00,000.00"
                        type="number"
                        className=" outline-none pl-[12px] 
                                             bg-[#2E2E2E0D] p-[10px] w-[86%] rounded-[5px]"
                        name="basicPayCost"
                        id="BasicPayCost"
                      />

                      <h1 className="pl-[10px] text-[20px]">
                        {currencySymbol}
                      </h1>
                    </div>
                  </div>
                </div>
                {/* input two */}
                <div className="flex flex-row w-full justify-around items-center mb-5">
                  <div className="w-[39%] font-[sfpro-regular]  sm:text-[20px] md:text-[20px] text-[15px] flex justify-start items-center">
                    <label htmlFor="Rent Allowance" className="text-[#535353]">
                      Rent Allowance
                    </label>
                  </div>
                  <div className="flex w-[55%] items-center justify-end">
                    <p className="text-[20px]">:</p>
                    <div className="w-[96%] flex items-center pl-4">
                      <input
                        onFocus={() => addingDataEarnings()}
                        placeholder="Eg. 2450/-"
                        value={payListDatas.rentAllowance}
                        onChange={paySlipData}
                        type="number"
                        className=" outline-none pl-[12px] 
                                            bg-[#2E2E2E0D] p-[10px] w-[86%] rounded-[5px]"
                        name="rentAllowance"
                        id="RentAllowance"
                      />

                      <h1 className="pl-[10px] text-[20px]">
                        {currencySymbol}
                      </h1>
                    </div>
                  </div>
                </div>
                {/* additional */}
                {addEarningsAdditional.map((additionList, index) => (
                  <div
                    key={index}
                    className="flex flex-row w-full justify-around items-center mb-5"
                  >
              
                      <input
                        type="text"
                        onChange={(event) =>
                          handleChangeAdditional(event, index)
                        }
                        key={index}
                        onFocus={earningsAdditionalCalculate}
                        // onBlur={addAdditionalData}
                        //  onClick={addingData}
                        value={additionList.title}
                        placeholder="Enter Text"
                        className=" outline-none pl-[0px] text-left bg-[#2e2e2e00] p-[10px] w-[39%] font-[sfpro-regular]  sm:text-[20px] md:text-[20px] text-[15px] rounded-[5px]"
                        name="title"
                      />
                    
                    <div className="flex w-[55%] items-center justify-end">
                      <p className="text-[20px]">:</p>
                      <div className="w-[88%] flex items-center pl-4">
                        <input
                          onChange={(event) =>
                            handleChangeAdditional(event, index)
                          }
                          value={additionList.value}
                          type="number"
                          key={index}
                          onBlur={earningsAdditionalCalculate}
                          onFocus={() => addingDataEarnings()}
                          placeholder="Eg. 2450/-"
                          // onFocus={earningsAdditionalCalculate}
                          className=" outline-none pl-[12px] bg-[#2E2E2E0D] p-[10px] w-full rounded-[5px]"
                          name="value"
                        />
                        <h1 className="pl-[5px] text-[20px]">
                          {currencySymbol}
                        </h1>
                      </div>
                      <div>
                        <Image
                          src="/icons/remove.svg"
                          className="cursor-pointer"
                          id="deleteearnings"
                          onClick={() => handleDeleteIncome(index)}
                          height={17}
                          width={20}
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <div
                  onClick={() => addEarnongsOrDeductions("AddEarnings")}
                  name="AddEarnings"
                  style={{ backgroundColor: colourChanging }}
                  className="bg-[#FA754E] cursor-pointer w-full sm:h-[6vh] md:h-[6vh] sm:w-[45%] md:w-[45%] h-[5vh] flex justify-center items-center text-[#FFFFFF] rounded-[5px]"
                >
                  <Image
                    name="AddEarnings"
                    className="cursor-pointer"
                    height={15}
                    width={15}
                    src="/icons/Pathpayslip.svg"
                  />
                  <button
                    className="pl-2 text-[13px] sm:text-[16px] md:text-[16px]"
                    id="AddEarnings"
                    name="AddEarnings"
                  >
                    Add Earnings
                  </button>
                </div>
                <div className="md:hidden">
                  <div className="h-[10vh] flex justify-center items-center">
                    <div className=" flex justify-center rounded-[5px] bg-[#E9E9E9] h-[6vh] items-center  w-full">
                      <div className="flex justify-between items-center w-[95%]">
                        <div className="text-[20px] font-[sfpro-regular] font-bold">
                          <h1 className="text-[#535353] text-[15px] w-[150%] sm:text-[20px] sm:w-full">
                            Gross Earnings
                          </h1>
                        </div>
                        <div className="pl-[40px] sm:w-[55%] w-[100%]">
                          <div className="bg-white flex items-center  rounded-[5px] h-[4vh] w-full">
                            <h1 className="text-[15px] pl-[15px] font-[sfpro-regular] font-bold">
                              {currencySymbol}
                              {earningCalculations}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* deduction container parent */}
              <div className=" flex flex-col sm:w-full md:w-[45%] w-full">
                <div className="w-[84%] text-[20px] flex justify-start font-[sfpro-medium] items-center">
                  <h1
                    className="w-full mt-[25px] md:mt-0 pl-4 text-[22px]  
                                    mb-7"
                  >
                    Deductions
                  </h1>
                </div>
                {/* input one */}
                <div className="flex flex-row w-full justify-around mb-5">
                  <div className="w-[25%]  sm:text-[20px] md:text-[20px] text-[15px] font-[sfpro-regular] flex justify-start items-center ">
                    <label htmlFor="Income Tax" className="text-[#535353]">
                      Income Tax
                    </label>
                  </div>
                  <div className="flex w-[60%] items-center ">
                    <p className="text-[20px]">:</p>
                    <div className="w-[91%] flex items-center pl-4">
                      <input
                        onFocus={addingDataExpense}
                        placeholder="Eg. 2450/-"
                        value={payListDatas.incomeTax}
                        onChange={paySlipData}
                        type="number"
                        className=" outline-none
                                              bg-[#2E2E2E0D] p-[10px] w-full pl-3 rounded-[5px]"
                        name="incomeTax"
                        id="IncomeTax"
                      />

                      <h1 className="pl-[10px] text-[20px]">
                        {currencySymbol}
                      </h1>
                    </div>
                  </div>
                </div>
                {/* input two */}
                <div className="flex flex-row w-full justify-around mb-5">
                  <div className="w-[25%] font-[sfpro-regular] sm:text-[20px] md:text-[20px] text-[15px] flex justify-start items-center">
                    <label htmlFor="PF Amount" className="text-[#535353]">
                      PF Amount
                    </label>
                  </div>
                  <div className="flex w-[60%] items-center">
                    <p className="text-[20px]">:</p>
                    <div className=" w-[91%] flex items-center pl-4">
                      <input
                        onFocus={addingDataExpense}
                        placeholder="Eg. 2450/-"
                        value={payListDatas.pfAmount}
                        onChange={paySlipData}
                        type="number"
                        className=" outline-none bg-[#2E2E2E0D] pl-3 p-[10px] w-full rounded-[5px]"
                        name="pfAmount"
                        id="PFAmount"
                      />

                      <h1 className="pl-[10px] text-[20px]">
                        {currencySymbol}
                      </h1>
                    </div>
                  </div>
                </div>
                {/* additional */}
                {addDeductionsAdditional.map((additionList, index) => (
                  <div
                    key={index}
                    className="flex flex-row w-[97%] justify-around items-center mb-5"
                  >
                    
                      <input
                        value={additionList.title}
                        onChange={(event) =>
                          handleChangeDeduction(event, index)
                        }
                        // onBlur={addDeductionsData}
                        placeholder="Enter Text"
                        type="text"
                        className=" w-[45%] font-[sfpro-regular]  text-[20px] outline-none pl-[17px] bg-[#2e2e2e00] text-left  h-[7vh]  rounded-[5px]"
                        name="title"
                        id="Rent Allowance"
                      />
                    
                    <div className="flex w-[69%] items-center justify-end">
                      <p className="text-[20px]">:</p>
                      <div className="w-full pl-3.5 flex items-center">
                        <input
                          value={additionList.value}
                          onChange={(event) =>
                            handleChangeDeduction(event, index)
                          }
                          onBlur={deductionsAdditionalCalculation}
                          onFocus={() => addingDataEarnings()}
                          type="number"
                          placeholder="Eg. 2450/-"
                          max={9}
                          className=" outline-none pl-[17px] bg-[#2E2E2E0D] h-[6vh] w-full rounded-[5px] "
                          name="value"
                          id="Rent Allowance"
                        />
                        <h1 className="pl-[5px] pr-[12px] text-[20px]">
                          {currencySymbol}
                        </h1>
                      </div>
                    </div>
                    <div>
                      <Image
                        src="/icons/remove.svg"
                        id="deletededuction"
                        className="cursor-pointer"
                        onClick={() => handleDeleteExpense(index)}
                        height={20}
                        width={20}
                      />
                    </div>
                  </div>
                ))}
                <div
                  onClick={() => addEarnongsOrDeductions("AddDeductions")}
                  name="AddDeductions"
                  style={{ backgroundColor: colourChanging }}
                  className=" cursor-pointer bg-[#FA754E] sm:w-[45%] w-full md:w-[45%] sm:h-[6vh] md:h-[6vh] h-[5vh] flex justify-center items-center text-[#FFFFFF] rounded-[5px]"
                >
                  <Image
                    name="AddDeductions"
                    className="cursor-pointer"
                    height={15}
                    width={15}
                    src="/icons/Pathpayslip.svg"
                  />
                  <button
                    className="pl-2 text-[13px] sm:text-[16px] md:text-[16px]"
                    id="addDeductions"
                    name="AddDeductions"
                  >
                    Add Deductions
                  </button>
                </div>
                <div className="md:hidden">
                  <div className="h-[10vh] flex justify-center items-center">
                    <div className=" flex justify-center rounded-[5px] bg-[#E9E9E9] h-[6vh] items-center  w-full">
                      <div className="flex justify-between items-center w-[95%]">
                        <div className="text-[20px] font-[sfpro-regular] font-bold">
                          <h1 className="text-[#535353] text-[15px] w-[150%] sm:text-[20px] sm:w-full">
                            Total Deductions
                          </h1>
                        </div>
                        <div className="pl-[40px] sm:w-[55%] w-[100%]">
                          <div className="bg-white flex items-center  rounded-[5px] h-[4vh] w-full">
                            <h1 className="text-[15px] pl-[15px] font-[sfpro-regular] font-bold">
                              {currencySymbol}
                              {deductionCalculations}
                            </h1>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 2 */}
        <div className="hidden md:block">
          <div className="h-[25vh] flex justify-center items-center ">
            <div className=" flex justify-center rounded-[5px] bg-[#E9E9E9] h-[10vh] items-center  w-[80%] md:w-[90%] lg:w-[80%]">
              <div className=" w-full h-[10vh]  flex justify-around ">
                <div className="flex flex-row w-[40%] items-center">
                  <div className="text-[20px] font-[sfpro-regular] font-bold">
                    <label htmlFor="Gross Earnings" className="text-[#535353]">
                      Gross Earnings
                    </label>
                  </div>
                  <div className="pl-[40px] lg:pl-[40px] md:pl-[13px]">
                    <div className="bg-white flex items-center  rounded-[5px] h-[6vh] w-[15rem] lg:w-[15rem] md:w-[11rem]">
                      <h1 className="text-[15px] pl-[15px] font-[sfpro-regular] font-bold">
                        {currencySymbol}
                        {earningCalculations}
                      </h1>
                    </div>
                    {/* <input type="text" value={earningCalculations} readOnly className="h-[6vh] bg-[#FFFFFF] font-[sfpro-regular] pl-5 font-bold  w-[140%] rounded-[5px] " name="" id="Gross Earnings" /> */}
                  </div>
                </div>
                <div className="flex flex-row w-[40%] items-center">
                  <div className="text-[20px] font-[sfpro-regular] font-bold">
                    <h1 className="text-[#535353] w-[10rem] md:w-[8rem]">
                      Total Deductions
                    </h1>
                    {/* <label htmlFor="Total Deductions" >Total Deductions</label> */}
                  </div>
                  <div className="pl-[40px] md:pl-0">
                    <div className="bg-white flex items-center  rounded-[5px] h-[6vh] w-[15rem] md:w-[11rem]">
                      <h1 className="text-[15px] pl-[15px]  font-[sfpro-regular] font-bold">
                        {currencySymbol}
                        {deductionCalculations}
                      </h1>
                    </div>
                    {/* <input type="text" value={deductionCalculations} readOnly className="h-[6vh] pl-5 font-[sfpro-regular] font-bold bg-[#FFFFFF] w-[140%] rounded-[5px] " name="" id="Total Deductions" /> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PayslipFooter
        handleClick={handleRefresh}
        handlegenerateslip={generateslip}
        earningsvalue={earningCalculations}
        deductionvalue={deductionCalculations}
        payList={payListDatas}
        imageoutput={image}
        earningsAdditionals={addEarningsAdditional}
        deductionsAdditional={addDeductionsAdditional}
        paysummary={paySummaryAdditionalList}
        defaultDate={showdefault}
        monthandyear={monthandyear}
        colourchanger={colourChanging}
        currencyData={currencySymbol}
      />
      {/* {
                payListDatas.basicPayCost === "" ? null :
                    <PDFViewer height={"800px"} width={"850px"} showToolbar={true}>
                        <PdfContent data={payListDatas} imageoutput={createObjectURL} earningsvalue={earningCalculations} deductionvalue={deductionCalculations} earningsAdditionals={addEarningsAdditional} deductionsAdditional={addDeductionsAdditional} paysummary={paySummaryAdditionalList} defaultDate={showdefault} monthandyear={monthandyear} colourchanger={colourChanging} />
                    </PDFViewer>
            }  */}
    </>
  );
};
export default Payslip;
