import Image from "next/image";
import { useEffect, useState } from "react";
import Service from "../../../services/gstreturns/service";
import { v1 as uuid } from "uuid";

const GstHead = ({ activeGstData, headValue, gstId, useEffectCall, exportState, currencyValue }) => {
  const [activeGst, setActiveGst] = useState("gstSales");
  const [headCalculation, setHeadCalculation] = useState()
  const [salesErrorMsg, setSalesErrorMsg] = useState(false)
  const [purchaseErrorMsg, setPurchaseErrmsg] = useState(false)
  const [bothErrMsg,setBothErrMsg]=useState(false)
  const [headDatas, setHeadDatas] = useState({
    companyName: "",
    gstIn: "",
    contactNumber: "",
    date: ""
  })
  const currentTime = new Date();
  const month = currentTime.getMonth() + 1;
  const day = currentTime.getDate();
  const year = currentTime.getFullYear();
  const newdate = day < 10
    ? "0" + day + "-" + "0" + month + "-" + year
    : day + "-" + "0" + month + "-" + year;
  const activeClick = (data) => {
    setActiveGst(data);
    activeGstData(data)
  };

  // const headChange = (event) => {
  //   const { name, value } = event.target
  //   setHeadDatas({ ...headDatas, [name]: name == 'contactNumber' ? value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1") : value })
  //   headValue(name, value)
  // }

  const headChange = (event) => {
    const { name, value } = event.target;

    let sanitizedValue;

    if (name === "companyName") {
      sanitizedValue = value.replace(/[^A-Za-z]/g, "");
    }
    else {
      sanitizedValue = value;
    }

    setHeadDatas({ ...headDatas, [name]: sanitizedValue });
  }


  // const headChangeCompany=(event)=>{
  //   const { name, value } = event.target
  //   let c=0;
  //   // alert(headDatas.companyName);
  //   for(let i=0;i<value.length;i++){
  //     if(value[i]>=0 && value[i]<=9){
  //       c++;
  //     }
  //     setHeadDatas({...headDatas,[name]:value})
  //     headDatas.companyName.slice()
  //   }
  //   headValue(name, value)
  // }

  
  // const headChangeCompany = (event) => {
  //   const { name, value } = event.target;
  
  //   // Check if the field is companyName and remove numbers
  //   const sanitizedValue = name === 'companyName' ? value.replace(/[0-9]/g, '') : value;
  
  //   setHeadDatas((prevHeadDatas) => ({
  //     ...prevHeadDatas,
  //     [name]: name === 'companyName' ? sanitizedValue : prevHeadDatas[name],
  //   }));
  //   headValue(name, sanitizedValue);
  // };


//   const headChangeCompany = (event) => {
//     const { name, value } = event.target;
  
//     // Check if the field is companyName and remove non-alphabetic characters
//     const sanitizedValue = name === 'companyName' ? value.replace(/[^a-zA-Z]/g, '') : value;
  
//     setHeadDatas((prevHeadDatas) => ({
//         ...prevHeadDatas,
//         [name]: sanitizedValue,
//     }));
//     headValue(name, sanitizedValue);
// };

  const headChangeCompany = (event) => {
    const { name, value } = event.target;

    let sanitizedValue;

    if (name === "companyName") {
      sanitizedValue = value.replace(/[^A-Za-z]/g, "");
    }
    else {
      sanitizedValue = value;
    }

    setHeadDatas({ ...headDatas, [name]: sanitizedValue });
  };


  const salesGst = headCalculation?.gstSales
    .reduce((total, item) => Number(total) + Number(item.salesGstAmount), 0)

  const purchaseGst = headCalculation?.gstPurchase
    .reduce((total, item) => Number(total) + Number(item.gstAmount), 0)

  const payAmount = Number(salesGst) - Number(purchaseGst)

  const exportClick = () => {
    if (salesGst == 0 || purchaseGst == 0) {
      exportState(false)
    } else {
      exportState(true)
    }
  }




  useEffect(() => {
    (async function serviceCall() {
      await Service.gstReturnsHistory()
      const gstHistory = await Service.gstReturnsHistory();
      if (gstHistory.data) {
        setHeadDatas(gstHistory.data[gstId]);
        setHeadCalculation(gstHistory.data[gstId])
      }
    })();
  }, [gstId, useEffectCall])
  return (
    <div className="w-[95%] mx-auto">

      {/* Mobile View */}
      <div className="md:hidden lg:hidden block sm:block">
        <div className="flex mt-[15px] vh-[4.5vh] w-[100%] justify-between bg-[#232E380D] items-center">
          <div className="w-full">
            <button
              className={`font-[sfpro-regular-display] w-[50%] rounded-tl-[8px] ${activeGst == "gstSales"
                ? "bg-[#4FAF04] text-white"
                : "bg-[#4FAF0433]"
                } h-[4.5vh]`}
              onClick={() => activeClick("gstSales")}
            >
              SALES
            </button>
            <button
              id="purchase"
              className={`font-[sfpro-regular-display]  w-[50%] rounded-tr-[8px] ${activeGst == "gstPurchase"
                ? "bg-[#4FAF04] text-white"
                : "bg-[#4FAF0433]"
                } h-[4.5vh]`}
              onClick={() => activeClick("gstPurchase")}
            >
              PURCHASE
            </button>
          </div>
        </div>
        <div className="bg-white flex flex-row justify-around items-center w-full h-[10vh]">
          <div className="w-[90%] h-[10vh] flex flex-row justify-between items-center">

            <div className="h-[8vh] w-[25%] flex flex-col">
              <h1 className="text-[9px] w-[121%] text-[#707070]">SALES GST AMOUNT</h1>
              <div className="h-[6vh] w-full">
                <h1 className="h-[6vh] text-[15px] w-[100%] bg-[#F6F6F6] flex justify-center items-center">
                  {currencyValue}{salesGst}/-
                </h1>
              </div>
            </div>

            <span className="flex items-center">-</span>

            <div className="h-[8vh] w-[32%] flex flex-col">
              <h1 className="text-[9px] w-[120%] text-[#707070]">
                PURCHASE GST AMOUNT
              </h1>
              <div className="bg-red-400 h-[6vh] w-full">
                <h1 className="h-[6vh] w-[100%] text-[15px] bg-[#F6F6F6] flex justify-center items-center">
                  {currencyValue}{purchaseGst}/-
                </h1>
              </div>
            </div>

            <span className="flex items-center">=</span>

            <div className="h-[8vh] w-[25%] flex flex-col">
              <h1 className="text-[9px] font-[sf-pro-medium] text-[#707070]">
                GST NEED TO PAY
              </h1>
              <div className="bg-red-400 h-[6vh] w-full">
                <h1 className={`h-[6VH] w-[100%] text-[15px] bg-[#F6F6F6] flex justify-center items-center`}>
                  {currencyValue}{payAmount ? payAmount : 0}/-
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white h-[16vh] sm:h-[20vh] w-full flex flex-row justify-around items-center border-t-[2px] border-[#70707066]">

          <div className="w-[45%] h-[13vh]">
            <div className="w-full h-[13vh] justify-between flex flex-col">
              <div
                className={`border-2 focus:border-[#707070]/25 rounded-md flex flex-col text-[12px] w-full min-h-[46px] max-h-[100%]`}
              >
                <span className="text-[10px] mt-1 pl-2 font-[sf-pro-medium] text-[#707070]">
                  Company Name
                </span>
                <textarea
                      type="text"
                      id="companyName"
                      className="w-[100%] pl-2 resize-none h-[20px] block overflow-hidden font-[sf-pro-medium] text-[#232E38] focus:outline-none rounded-md resize-ta"
                      value={headDatas.companyName}
                      name="companyName"
                      placeholder="company name"
                      onChange={headChangeCompany}
                ></textarea>
              </div>
              <div
                className={`border-2 focus:border-[#707070]/25 rounded-md flex flex-col text-[12px] w-full min-h-[46px] max-h-[100%]`}
              >
                <span className="text-[10px] mt-1 pl-2 font-[sf-pro-medium] text-[#707070]">
                  Company GSTIN
                </span>
                <input
                  id="gstIn"
                  className="w-[100%] pl-2 resize-none h-[20px] block overflow-hidden font-[sf-pro-medium] text-[#232E38] focus:outline-none rounded-md resize-ta"
                  value={headDatas.gstIn}
                  name="gstIn"
                  placeholder="gstin"
                  onChange={headChange}
                />
              </div>
            </div>
          </div>

          <div className="w-[45%] h-[13vh]">
            <div className="w-full justify-between flex flex-col h-[13vh]">
              <div
                className={`border-2 focus:border-[#707070]/25 rounded-md flex flex-col text-[12px] w-full min-h-[46px] max-h-[100%]`}
              >
                <span className="text-[10px] mt-1 pl-2 font-[sf-pro-medium] text-[#707070]">
                  Contact Number
                </span>
                <input
                  id="contactNumber"
                  className="w-[100%] pl-2 resize-none h-[20px] block overflow-hidden font-[sf-pro-medium] text-[#232E38] focus:outline-none rounded-md resize-ta"
                  value={headDatas.contactNumber}
                  name="contactNumber"
                  placeholder="contact"
                  maxLength="10"
                  onChange={headChange}
                />
              </div>
              <div
                className={`border-2 focus:border-[#707070]/25 rounded-md flex flex-col text-[12px] w-full min-h-[46px] max-h-[100%]`}
              >
                <span className="text-[10px] mt-1 pl-2 font-[sf-pro-medium] text-[#707070]">
                  Select Month & Year
                </span>
                <input
                  id="month"
                  type='month'
                  className="w-[100%] pl-2 resize-none h-[20px] block overflow-hidden font-[sf-pro-medium] text-[#232E38] focus:outline-none rounded-md resize-ta"
                  value={headDatas.date}
                  name="date"
                  onChange={headChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* mobile view end */}

      <div className="hidden sm:hidden md:block">
        <div className=" mt-9 bg-white flex">
          <div className="bg-red w-[60%] border-r-[2px] border-[#70707066] ">
            <div className="flex w-[100%] justify-between bg-[#232E380D] items-center">
              <div className="w-[50%]">
                <button
                  className={`font-[sfpro-regular-display] w-[50%] rounded-tl-[8px] ${activeGst == "gstSales"
                    ? "bg-[#4FAF04] text-white"
                    : "bg-[#4FAF0433]"
                    } h-[5vh]`}
                  onClick={() => activeClick("gstSales")}
                >
                  SALES
                </button>
                <button
                  id="purchase"
                  className={`font-[sfpro-regular-display]  w-[50%] ${activeGst == "gstPurchase"
                    ? "bg-[#4FAF04] text-white"
                    : "bg-[#4FAF0433]"
                    } h-[5vh]`}
                  onClick={() => activeClick("gstPurchase")}
                >
                  PURCHASE
                </button>
              </div>
              {/* error */}
              <div className="w-[50%] h-[6vh] justify-end items-center flex">
                <div className="flex flex-row justify-end h-[5vh] w-[70%]">
                  <div className="h-[5vh] flex justify-end w-[30%]">
                    <div
                      id="export"
                      onClick={exportClick}
                      className=" w-[80%] flex justify-end items-center h-[36px] rounded-md"
                    >
                      <Image
                        title="Sales and purchase needed to do Export action"
                        width="35px"
                        height="27px"
                        src="/icons/ExportGstReturns.svg"
                        className="hover:cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
                {/* <div className="w-[200%]">
                  {
                    salesErrorMsg ?
                      <h1 className="w-full text-[13px]">Enter Sales Amounts</h1> :
                       purchaseErrorMsg? <h1 className="w-full text-[13px]">Enter Purchase Amounts</h1>:null
                  }
                </div>
                <div
                  id="export"
                  onClick={exportClick}
                  className=" w-[80%] flex justify-center items-center h-[36px] rounded-md"
                >
                  <Image
                    width="35px"
                    height="27px"
                    src="/icons/ExportGstReturns.svg"
                    className="hover:cursor-pointer"
                  />
                </div> */}
              </div>
            </div>
            <div className="w-[99%] mx-auto px-3 mt-3 mb-3 flex space-x-4">
              <div
                className={`border-2 focus:border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[36%] min-h-[46px] max-h-[100%]`}
              >
                <span className="text-[10px] mt-1 pl-2 font-[sf-pro-medium] text-[#707070]">
                  Company Name
                </span>
                <textarea
                  id="companyName"
                  className="w-[100%] pl-2 resize-none h-[20px] block overflow-hidden font-[sf-pro-medium] text-[#232E38] focus:outline-none rounded-md resize-ta"
                  value={headDatas.companyName}
                  name="companyName"
                  placeholder="company name"
                  onChange={headChange}
                ></textarea>
              </div>
              <div
                className={`border-2 focus:border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[29%] min-h-[46px] max-h-[100%]`}
              >
                <span className="text-[10px] mt-1 pl-2 font-[sf-pro-medium] text-[#707070]">
                  Company GSTIN
                </span>
                <input
                  id="gstIn"
                  className="w-[100%] pl-2 resize-none h-[20px] block overflow-hidden font-[sf-pro-medium] text-[#232E38] focus:outline-none rounded-md resize-ta"
                  value={headDatas.gstIn}
                  name="gstIn"
                  placeholder="gstin"
                  onChange={headChange}
                />
              </div>
              <div
                className={`border-2 focus:border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[15%] min-h-[46px] max-h-[100%]`}
              >
                <span className="text-[10px] mt-1 pl-2 font-[sf-pro-medium] text-[#707070]">
                  Contact Number
                </span>
                <input
                  id="contactNumber"
                  className="w-[100%] pl-2 resize-none h-[20px] block overflow-hidden font-[sf-pro-medium] text-[#232E38] focus:outline-none rounded-md resize-ta"
                  value={headDatas.contactNumber}
                  name="contactNumber"
                  placeholder="contact"
                  maxLength="10"
                  onChange={headChange}
                />
              </div>
              <div
                className={`border-2 focus:border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[15%] min-h-[46px] max-h-[100%]`}
              >
                <span className="text-[10px] mt-1 pl-2 font-[sf-pro-medium] text-[#707070]">
                  Select Month & Year
                </span>
                <input
                  id="month"
                  type='month'
                  className="w-[100%] pl-2 resize-none h-[20px] block overflow-hidden font-[sf-pro-medium] text-[#232E38] focus:outline-none rounded-md resize-ta"
                  value={headDatas.date}
                  name="date"
                  onChange={headChange}
                />
              </div>
            </div>
          </div>
          <div className="font-[sf-pro-medium] px-4 w-[40%] flex space-x-3">
            <div className="w-[30%] mt-1">
              <span className="text-[10px] text-[#707070]">SALES GST AMOUNT</span>
              <h1 className="h-[55px] text-[22px] w-[100%] bg-[#F6F6F6] mt-2 flex justify-center items-center">
                {currencyValue}{salesGst}/-
              </h1>
            </div>
            <span className="mt-4 flex items-center">-</span>
            <div className="w-[30%] mt-1">
              <span className="text-[10px] text-[#707070]">
                PURCHASE GST AMOUNT
              </span>
              <h1 className="md:mt-[8px] mt-0 h-[55px] w-[100%] text-[22px] bg-[#F6F6F6] mt-2 flex justify-center items-center">
                {currencyValue}{purchaseGst}/-
              </h1>
            </div>
            <span className="mt-4 flex items-center">=</span>
            <div className="w-[30%] mt-1">
              <span className="text-[9px] font-[sf-pro-medium] text-[#707070]">
                GST NEED TO PAY
              </span>
              <h1 className={`h-[55px] w-[100%] text-[22px] bg-[#F6F6F6] mt-2 flex justify-center items-center`}>
                {currencyValue}{payAmount ? payAmount : 0}/-
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GstHead;
