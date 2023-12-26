import React, { useState } from "react";
import CustomSelect from "../../../components/ledger/CustomSelect";
import { useEffect } from "react";
import BtoolsHeader from "../../../container/72BTheader/BToolsHeader";
import { useRouter } from "next/router";
import Service from "../../../services/cashbookledger/services";
import PdfProvider from "../../../components/ledger/pdfprovider/Pdfproviderledger";
import Pdf from "../../../components/ledger/pdf/PDF";
import { CSVLink } from "react-csv";
import { PDFViewer } from "@react-pdf/renderer";
import _ from "lodash";
import MyImage from "../../../components/swot-components/my-image/myImage";
import Image from "next/image";
const reportstatement = () => {
  const router = useRouter();
  const [fromDate, setFromDate] = useState(new Date().toJSON().slice(0, 10));
  const [toDate, setToDate] = useState(new Date().toJSON().slice(0, 10));
  const [selectLedgerName, setSelectLedgerName] = useState("");
  const [ledgerData, setLedgerData] = useState([]);
  const [pdfdata, setPdfData] = useState(false)
  const [csvHeaderData, setCsvData] = useState([
    { label: 'Date', key: 'date' },
    { label: 'Description', key: 'description' },
    { label: 'Ledger Name', key: 'category' },
    { label: 'Invoice/Bill No', key: 'invoiceno' },
    { label: 'Company Name', key: 'companyname' },
    { label: 'Type', key: 'income' },
    { label: 'Expense', key: 'expense' },
    { label: 'Credit', key: 'credit' },
    { label: 'Amount', key: 'amount' },
    { label: 'Balance', key: 'balance' },

  ]);
  const [ledgerArray, setLedgerArray] = React.useState([]);
  const [orginalData, setOrginalData] = React.useState([]);
  const [selectDrop, setSelectDrop] = useState(["All"]);
  const [income, setIncome] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyNameArray, setCompanyNameArray] = useState([]);
  const [numbertoText, setNumberToText] = useState("");
  const [filterVal,setFilterVal]=useState("")
  const [dropDown, setDropDown] = useState([
    { label: "Expense", value: "expense" },
    { label: "Credit", value: "credit" },
  ]);
  const [showInputs, setshowInputs] = useState(false)
  const [downloadPopup, setDownloadPopup] = useState(false)
  const onFromdateChange = (e) => {
    let data = filterLedgerData(
      new Date(e.target.value).toJSON().slice(0, 10),
      toDate,
      selectLedgerName,
      income,
      companyName,
      orginalData
    );
    setLedgerData(data);
    setFromDate(new Date(e.target.value).toJSON().slice(0, 10));
  };
  const onTodateChange = (e) => {
    // console.log(new Date(e.target.value).toJSON().slice(0, 10),"to");
    let data = filterLedgerData(
      fromDate,
      new Date(e.target.value).toJSON().slice(0, 10),
      selectLedgerName,
      income,
      companyName,
      orginalData
    );
    setLedgerData(data);
    setToDate(new Date(e.target.value).toJSON().slice(0, 10));
  };

  const filterLedgerData = (
    fromdate,
    todate,
    ledgerName,
    income,
    companyName,
    arr
  ) => {
    let filteredArr = arr.filter(
      (data) =>
        new Date(data.date).getTime() >= new Date(fromdate).getTime() &&
        new Date(data.date).getTime() <= new Date(todate).getTime() &&
        data.category.toLowerCase().includes(ledgerName.toLowerCase()) &&
        data.income.toLowerCase().includes(income.toLowerCase()) &&
        data.companyname.toLowerCase().includes(companyName.toLowerCase())
    );
    return filteredArr;
  };
  const onCalculateData = (arr) => {
    let balance = 0;
    for (let index = 0; index < arr.length; index++) {
      let type = arr[index].income;
      if (type == "expense") {
        balance = balance - arr[index].expense;
        arr[index].balance = balance;
      } else {
        balance = balance + arr[index].credit;
        arr[index].balance = balance;
      }
    }
    return arr;
  };
  const handleAmount = (e) => {
    // console.log(e.target.value,'value');
    let data = filterLedgerData(
      fromDate,
      toDate,
      selectLedgerName,
      e.value,
      companyName,
      orginalData
    );
    let arr = onCalculateData(data);
    setLedgerData(arr);
    setIncome(e.value);
  };
  const handleCompanyName = (e) => {
    // console.log(e.target.value,"company");
    let data = filterLedgerData(
      fromDate,
      toDate,
      selectLedgerName,
      income,
      e.value,
      orginalData
    );
    let arr = onCalculateData(data);
    setLedgerData(arr);
    setCompanyName(e.value);
  };

  const associateCompanyNames = (data) => {
    let array = [];
    data.map((emp) => {
      array.push({ label: emp.companyname, value: emp.companyname });
    });
    var uniq = _.uniqBy(array, function (o) {
      return o.label;
    });
    return uniq;
  };

  useEffect(() => {
    (async function change() {
      try {
        const cashLedger = await Service.getcashLedgerHistory();
        // console.log(cashLedger.data, "cashLedger");
        if (cashLedger?.data) {
          const CompanyArray = associateCompanyNames(cashLedger.data);
          setCompanyNameArray(CompanyArray);
          setOrginalData(cashLedger.data);
          let data = filterLedgerData(
            fromDate,
            toDate,
            selectLedgerName,
            income,
            companyName,
            cashLedger.data
          );
          setLedgerData(data);
        } else {
          setLedgerData([]);
        }

      } catch (err) {
        alert(JSON.stringify(err));
      }
      await getLedgerEntryData();
    })();
  }, []);
  // useEffect(()=>{
  // setPdfData(true)
  // },[props.onClick]);
  const getLedgerEntryData = async () => {
    try {
      const ledgerEntry = await Service.getLedgerEntry();
      // console.log(ledgerEntry.data,"ledgerentry.........");
      if (ledgerEntry?.data) {
        setLedgerArray(ledgerEntry.data);
      } else {
        setLedgerArray([]);
      }
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };
  // const handlepdf=()=>{
  //   setPdfData(true)
  // }
  const dateFormatReport = (date) => {
    let current_datetime1 = new Date(date);
    let month = current_datetime1.getMonth() + 1;
    let day = current_datetime1.getDate();
    let year = current_datetime1.getFullYear();
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = `0${month}`;
    }
    let format = `${day}/${month}/${year}`;
    return format;
  };
  const onDropdownChange = (e) => {
    setFilterVal(e.value)
    let data = filterLedgerData(
      fromDate,
      toDate,
      e.value,
      income,
      companyName,
      orginalData
    );
    let arr = onCalculateData(data);
    setLedgerData(arr);
    setSelectLedgerName(e.value);
  };
  const handleLedger = (e) => {
    router.push({
      pathname: "/cashbookledger",
    });
  };
  const handleShowDropdown = () => {
    setshowInputs(true)
  }
  const closePopup = () => {
    setDownloadPopup(false)
  }
  const openPopup = () => {
    setDownloadPopup(true)
  }
  const closedropdown=()=>{
    setshowInputs(false)
  }
  return (
    <>
      <div className="flex flex-col scrollBar">
        <div className="w-[95%] flex justify-between">
          <BtoolsHeader
            Src="../icons/Cashledgerlogo.svg"
            Height="35"
            Width="100"
          />
          <div className="flex w-[7%]">
            <img
              src="../icons/ledgerexport.svg"
              className="w-8 h-8 cursor-pointer"
              onClick={(e) => handleLedger(e)}
            />
          </div>
        </div>
      </div>

      <div className="md:hidden sm:block">
        <div className='flex justify-around items-start mb-[50px] h-auto w-full'>
          <div className='bg-[#e9e9e9] mt-5  flex-col items-center rounded-[10px] flex justify-start w-[80%] h-auto'>
            <div className='bg-white border-[3px] border-solid flex flex-col justify-around items-center rounded-[10px] w-full h-[15vh]'>
              <div className="flex flex-col items-center justify-between w-[90%] h-[11vh]">
                <label>Total Amount</label>
                <div className="bg-[#e9e9e9] text-[25px] pl-[12px] rounded-[5px] w-full h-[60px] flex justify-start items-center">
                  {/* {currencySymbol} */}
                  {ledgerData.length > 0
                    ? ledgerData[ledgerData.length - 1]?.balance
                    : 0}
                </div>
                {
                  showInputs == false ? <>
                    <div className="w-full h-[8vh] flex justify-around absolute top-[145px] items-center">
                      <div onClick={handleShowDropdown} className='bg-[#fec334] flex justify-around items-center h-[7vh] w-[15%] rounded-[40px]'>
                        <img src='../images/plus.png' height={0} width={18} alt="plus" />
                      </div>
                    </div>
                  </> : null

                }
              </div>
            </div>
            {
              showInputs == true ? <>
                <div className='flex transition duration-150 ease-in-out justify-center h-[47vh] w-[90%] '>
                  <div className='flex flex-col justify-between w-[90%] h-[46vh]'>
                    <div className='flex justify-around items-center w-full h-[8vh]'>
                      <label className="text-xs font-[sfpro-regular]">From Date</label>
                      <input
                        type="date"
                        className="bg-white rounded-[6px] h-[5vh] w-full p-[6px]"
                        value={fromDate}
                        onChange={onFromdateChange}
                      />
                    </div>
                    <div className='flex justify-around items-center w-full h-[8vh]'>
                      <label className="text-xs mr-[12px] font-[sfpro-regular]">To Date</label>
                      <input
                        type="date"
                        className="bg-white rounded-[6px] h-[5vh] w-full p-[6px]"
                        value={toDate}
                        onChange={onTodateChange}
                      />
                    </div>
                    <div className='flex flex-col justify-start items-start w-full h-[8vh]'>
                      <h1 className="text-xs font-[sfpro-regular]">Select Ledger</h1>
                      <CustomSelect
                        title={"Ledger"}
                        onCustomSelect={onDropdownChange}
                        IsAddnew={false}
                        isAll={true}
                        data={ledgerArray}
                        Width={"100%"}
                        Height={"6vh"}
                      />
                    </div>
                    <div className='flex mt-2 flex-col justify-start items-start w-full h-[8vh]'>
                      <h1 className="text-xs font-[sfpro-regular]" >Select Income/Expense</h1>
                      <CustomSelect
                        title={"Select Income/Expense"}
                        onCustomSelect={handleAmount}
                        IsAddnew={false}
                        isAll={true}
                        data={dropDown}
                        Width={"100%"}
                        Height={"6vh"}
                      />
                    </div>
                    <div className='flex mt-2 flex-col justify-start items-start w-full h-[8vh]'>
                      <h1 className="text-xs font-[sfpro-regular]">Company Name</h1>
                      <CustomSelect
                        data={companyNameArray}
                        title={"Company Name"}
                        isAll={true}
                        IsAddnew={false}
                        onCustomSelect={handleCompanyName}
                        Width={"100%"}
                        Height={"6vh"}
                      />
                    </div>
                    <div className="flex justify-end items-center w-full h-[6vh]">
                        <button onClick={closedropdown} className="h-[4vh] rounded-[5px] mt-2 w-[30%] font-semibold text-white bg-[#f87171]">Close</button>
                    </div>
                  </div>
                </div>
              </> : null
            }
          </div>
        </div>
      </div>


      <div className="sm:hidden hidden md:block">
        <div className="bg-[#F6F6F6] border-t-2 border-[#707070]/5  p-6 flex">
          <div className="w-[80%] h-32 bg-[#fbfbfb] border-r-2">
            <div className="flex justify-start  bg-[#232E380D] w-full h-[40px]">
              <p className=" p-3">Report</p>
            </div>

            <div className="flex flex-row justify-around h-[60px] mt-3">
              <div className="border border-[#707070] bg-white border-opacity-25 rounded-lg p-1 flex flex-col">
                <label className="text-xs">From Date</label>
                <input
                  type="date"
                  className="bg-white p-[6px] outline-none"
                  value={fromDate}
                  onChange={onFromdateChange}
                />
              </div>
              <div className="border border-[#707070] bg-white border-opacity-25 rounded-lg p-1 flex flex-col">
                <label className="text-xs">To Date</label>
                <input
                  type="date"
                  className="bg-white p-[6px] outline-none"
                  value={toDate}
                  onChange={onTodateChange}
                />
              </div>
              <CustomSelect
                title={"Ledger"}
                onCustomSelect={onDropdownChange}
                IsAddnew={false}
                isAll={true}
                data={ledgerArray}
                Width={"150px"}
              />

              <CustomSelect
                title={"Select Income/Expense"}
                onCustomSelect={handleAmount}
                IsAddnew={false}
                isAll={true}
                data={dropDown}
                Width={"180px"}
              />

              <div>
                <CustomSelect
                  data={companyNameArray}
                  title={"Company Name"}
                  isAll={true}
                  IsAddnew={false}
                  onCustomSelect={handleCompanyName}
                  Width={"180px"}
                  Height={"57px"}
                />
              </div>

              <div className="flex justify-center">
                <PdfProvider
                  ButtonComponent={(props) => (
                    <button
                      id="pdfdownload"
                      className={`bg-[#fbfbfb] p-1   rounded-md flex justify-center items-center`}
                      onClick={props.onClick}
                    >
                      <img src={"../icons/clpdf.svg"} className="pb-[4px]" alt="icon" />
                    </button>
                  )}
                  disabled={!!(ledgerData == "")}
                  pdfDocument={
                    ledgerData.description === "" ? null : (
                      <Pdf
                        ledgerData={ledgerData}
                        type={income}
                        fromDate={fromDate}
                        toDate={toDate}
                      />
                    )
                  }

                ></PdfProvider>
                <div className="bg-[#fbfbfb] p-1  
                rounded-md flex justify-center items-center">
                  <CSVLink filename={"ledger.csv"} data={ledgerData} headers={csvHeaderData}><button
                  >
                    <img src="../icons/csv.svg" className="" alt="icon" />
                  </button></CSVLink>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[20%] bg-white p-2 flex justify-center">
            <div className="flex flex-col">
              <label>Total Amount</label>
              <div className="bg-[#fbfbfb] w-[236px] h-[60px] text-lg flex justify-center items-center">
                {ledgerData.length > 0
                  ? ledgerData[ledgerData.length - 1]?.balance
                  : 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex justify-center items-center h-[50vh] w-full">
          <div className="overflow-y-scroll  h-[45vh] w-[90%]">
            <div className=" w-[100rem] p-2 sm:p-2">
              <div className="bg-[#232E38] flex font-[sfpro-regular-display]  rounded-t-md text-[9px] text-white p-2 sm:p-2">
                <p className="w-[3%] text-xs text-center">S.No</p>
                <p className="w-[8%] text-xs text-center">Date</p>
                <p className="w-[8%] text-xs text-center">Ledger</p>
                <p className="w-[8%] text-xs text-center">Bill No</p>
                <p className="w-[11%] text-xs text-center">Company Name</p>
                <p className="w-[25%] text-xs text-center">Descriptions</p>
                <p className="w-[10%] text-xs  text-center">Reference</p>
                <p className="w-[9%] text-xs  text-center">Expense</p>
                <p className="w-[9%] text-xs  text-center">Credit</p>
                <p className="w-[9%] text-xs  text-center">Balance</p>
              </div>
              {ledgerData && ledgerData.length > 0
                ? ledgerData.map((value, index) => {
                  return (
                    <div className="flex  w-full my-5  space-x-3">
                      <input disabled value={index+1} className="flex justify-center items-center bg-white text-black w-[3%] h-[34px] border rounded-lg text-sm px-[2px] ml-3  text-center"/>
                        
                      <input disabled value={dateFormatReport(value.date)} className="flex justify-center items-center bg-white text-black w-[8%] h-[34px] px-[2px] border rounded-lg text-xs  text-center"/>
                      
                      <input disabled value= {value.category} className="flex justify-center items-center bg-white text-black w-[8%] h-[34px] px-[2px] border rounded-lg text-sm text-center"/>
                       
                      <input disabled value={value.invoiceno} className="flex justify-center items-center bg-white text-black w-[8%] h-[34px] px-[2px] border rounded-lg text-xs text-center"/>
                   
                      <input disabled value= {value.companyname} className="flex justify-center items-center bg-white text-black w-[11%] h-[34px] px-[2px] border-[#707070] border border-opacity-25 rounded-lg text-xs text-center"/>
                      <input disabled value={value.description}
                        className="flex justify-center items-center bg-white text-black w-[25%] h-[34px] px-[2px] border rounded-lg text-xs text-center"
                      />
                      <input disabled value={value.reference} className="flex justify-center items-center bg-white text-black w-[10%] h-[34px] px-[2px] border rounded-lg text-xs text-center"/>
                      <input disabled value={value.expense} className="flex justify-center items-center bg-white text-black w-[9%] h-[34px] px-[2px] border rounded-lg text-xs text-center"/>
                      <input disabled value={value.credit} className="flex justify-center items-center bg-white text-black w-[9%] h-[34px] px-[2px] border rounded-lg text-xs text-center"/>
                      <input disabled value={value.balance} className="flex justify-center items-center bg-white text-black w-[9%] h-[34px] px-[2px] border rounded-lg text-xs text-center"/>
                    </div>
                  );
                })
                : null}

              {/* 
               */}
            </div>
          </div>
        </div>
        <div className=" fixed flex items-center justify-end bottom-[142
                                    0px] top-[550px]  right-[22px] h-[10vh] w-full">
          <div onClick={openPopup} className="bg-[#fec334] h-[4rem] flex justify-center items-center rounded-full w-[4rem]">
            <img src="/icons/Icon download.svg" height={20} width={20} alt="download" />
          </div>
        </div>
        {
          downloadPopup == true ?
            <div className="bg-[#000000] backdrop-blur-[2px] flex items-end h-[100vh] fixed bottom-0 bg-opacity-[30%] w-full">
              <div className="bg-white h-[30vh] rounded-t-[20px] flex justify-around items-center w-full">
                <div className="h-[25vh] flex flex-col w-[80%]">
                  <div className="flex justify-end  w-full h-[6vh]">
                    <div className="flex w-[66%] items-center h-[6vh] flex-row justify-between">
                      <h1 className="text-[20px] font-[sfpro-bold]">Download</h1>
                      <Image onClick={closePopup} src='/icons/Close-button.svg' height={20} width={20}></Image>
                    </div>
                  </div>
                  <div className="h-[19vh] flex items-center justify-around w-full">
                    <div className="flex h-[19vh] w-full justify-around items-center flex-col">
                      <div className="flex w-[80%] justify-between">
                        <PdfProvider
                          ButtonComponent={(props) => (
                            <button
                              id="pdfdownload"
                              className={`bg-[#fbfbfb] pb-[5px]  rounded-md flex justify-center items-center`}
                              onClick={props.onClick}
                            >
                              <img src={"../icons/clpdf.svg"} className="h-[9vh]" alt="icon" />
                            </button>
                          )}
                          disabled={!!(ledgerData == "")}
                          pdfDocument={
                            ledgerData.description === "" ? null : (
                              <Pdf
                                ledgerData={ledgerData}
                                type={income}
                                fromDate={fromDate}
                                toDate={toDate}
                              />
                            )
                          }

                        ></PdfProvider>
                        <div className="bg-[#fbfbfb]  
                     rounded-md flex justify-around items-center">
                          <CSVLink filename={"ledger.csv"} data={ledgerData} headers={csvHeaderData}><button
                          >
                            <img src="../icons/csv.svg" className="h-[9vh]" alt="icon" />
                          </button></CSVLink>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div> : null
        }
      </div>

      <div className="sm:hidden hidden md:block">
        <div className="px-6 p-2 sm:px-0 sm:p-2 md:px-4">
          <div className="bg-[#232E38] flex font-[sfpro-regular-display]  rounded-t-md text-[9px] text-white p-2 sm:p-2 mt-5">
            <p className="w-[3%] text-xs text-center">S.No</p>
            <p className="w-[8%] text-xs text-center">Date</p>
            <p className="w-[8%] text-xs text-center">Ledger</p>
            <p className="w-[8%] text-xs text-center">Bill No</p>
            <p className="w-[11%] text-xs text-center">Company Name</p>
            <p className="w-[25%] text-xs text-center">Descriptions</p>
            <p className="w-[10%] text-xs  text-center">Reference</p>
            <p className="w-[9%] text-xs  text-center">Expense</p>
            <p className="w-[9%] text-xs  text-center">Credit</p>
            <p className="w-[9%] text-xs  text-center">Balance</p>
          </div>
          {ledgerData && ledgerData.length > 0
            ? ledgerData.map((value, index) => {
              return (
                <div className="flex  w-full my-5  space-x-3">
                  <input disabled value={index+1} className="flex justify-center items-center text-black bg-white w-[3%] h-[34px] border rounded-lg text-sm px-[2px] ml-3  text-center"/>
                   

                  <input disabled value={dateFormatReport(value.date)} className="flex justify-center items-center px-[2px] bg-white text-black w-[8%] h-[34px] border rounded-lg text-xs  text-center"/>
                    
                  
                  <input disabled value={value.category} className="flex justify-center items-center px-[2px] bg-white text-black w-[8%] h-[34px] border rounded-lg text-sm text-center"/>
                   
                  
                  <input disabled value={value.invoiceno} className="flex justify-center items-center px-[2px] bg-white text-black w-[8%] h-[34px] border rounded-lg text-xs text-center"/>
                   
                  <input disabled value={value.companyname} className="flex justify-center items-center px-[2px] bg-white text-black w-[11%] h-[34px] border-[#707070] border border-opacity-25  rounded-lg text-xs text-center"/>
                  
                 
                  <input disabled value={value.description}
                    className="flex justify-center items-center bg-white text-black w-[25%] h-[34px] px-[2px] border rounded-lg text-xs text-center"
                    type="text"
                  />
                  

                  <input disabled value={value.reference} className="flex justify-center items-center bg-white text-black w-[10%] h-[34px] px-[2px] border rounded-lg text-xs text-center"/>
                  
                 

                  <input disabled value={value.expense} className="flex justify-center items-center bg-white text-black w-[9%] h-[34px] px-[2px] border rounded-lg text-xs text-center"/>
                   
                  
                  <input disabled value={value.credit} className="flex justify-center items-center bg-white text-black w-[9%] h-[34px] px-[2px] border rounded-lg text-xs text-center"/>
                 
                  <input disabled value={value.balance} className="flex justify-center items-center bg-white text-black w-[9%] h-[34px] px-[2px] border rounded-lg text-xs text-center"/>
                   
               </div>
              );
            })
            : null}
          {/* {ledgerData.length > 0 && <PDFViewer height={"800px"} width={"850px"} showToolbar={true}>
            <Pdf
              ledgerData={ledgerData}
              type={income}
              fromDate={fromDate}
              toDate={toDate}
            />
          </PDFViewer>} */}
        </div>
      </div>

    </>
  );
};

export default reportstatement;
