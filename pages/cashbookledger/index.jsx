import React, { useState } from "react";
import Image from "next/image";
import BtoolsHeader from "../../container/72BTheader/BToolsHeader";
import CustomSelect from "../../components/ledger/CustomSelect";
import CreateLedger from "../../container/ledger/createledger";
import PouchDB from "pouchdb";
import CurrencyPopUp from "../billHive/currency-popup/CurrencyPopUp";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Service from "../../services/cashbookledger/services";
export default function Ledger(props) {
  const router = useRouter();
  // const [showNavBar, setShowNavBar] = useState(false);
  // const [handleShow, sethandleShow] = useState(false);
  // const [handleArrow, setHandlearrow] = useState(false);
  const [Modal, setModal] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState("₹");
  const [currencyId, setCurrencyId] = useState("INR");
  const [ledgerData, setLedgerData] = useState([]);
  const [selectincomeexp, setSelectIncomeExp] = useState(["expense", "credit"]);
  const [isCurrency, setIsCUrrency] = useState(false);
  const [ledgerArray, setLedgerArray] = React.useState([]);
  const [showInputs, setShowInputs] = useState(false);
  const [descShow, setDescShow] = useState(false);
  const [referShow, setreferShow] = useState(false);

  const handleClick = () => {
    // console.log(Modal)
    setModal(!Modal);
  };
  const Income = () => {
    setSelectIncomeExp(selectincomeexp);
  };

  const CurrencyValue = (currencySymbols) => {
    setCurrencySymbol(currencySymbols);
  };
  const currencyClick = () => {
    setIsCUrrency(true);
  };
  const setCurrencyIdValue = (currencyIds) => {
    setCurrencyId(currencyIds);
  };
  const setClosePopUp = (closeCurrency) => {
    setIsCUrrency(closeCurrency);
  };

  const [ledger, setLedger] = useState({
    date: new Date().toJSON().slice(0, 10),
    description: "",
    category: "",
    invoiceno: "",
    companyname: "",
    income: "",
    expense: 0,
    credit: 0,
    amount: "",
    balance: 0,
  });
  const [dropDown, setDropDown] = useState([
    { label: "Expense", value: "expense" },
    { label: "Credit", value: "credit" },
  ]);

  const handlePopupClose = () => {
    handleClick();
  };

  const ledgerChange = (e) => {
    let { name, value } = e.target;
    // console.log(name,value);
    if (name == "amount") {
      value = parseInt(value);
    }

    setLedger({ ...ledger, [name]: value });
  };
  const onHandleExpenseCreditChange = (e) => {
    setLedger({ ...ledger, income: e.value });
  };
  var ledgerCalculation = async function (ledger) {
    let totalCredit = ledger.credit,
      totalExpense = ledger.expense,
      balance = 0;
    if (ledgerData.length > 0) {
      ledgerData.map((ledge) => {
        totalCredit = totalCredit + ledge.credit;
        totalExpense = totalExpense + ledge.expense;
      });
    }
    balance = totalCredit - totalExpense;
    return balance;
  };
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
  const handleSave = async () => {
    if (ledger.income == "expense") {
      ledger.expense = ledger.amount;
      ledger.credit = 0;
    } else {
      ledger.credit = ledger.amount;
      ledger.expense = 0;
    }
    let balance = await ledgerCalculation(ledger);
    ledger.balance = balance;
    let array = [...ledgerData, ledger];
    setLedgerData(array);
    var db = new PouchDB("cashLedger");
    db.get("cashLedgerHistory", function (err, doc) {
      if (err) {
        var doc = {
          _id: "cashLedgerHistory",
          data: array,
        };
        db.put(doc);
      }
      db.put(
        {
          _id: doc._id,
          data: array,
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
    onClear();
    setShowInputs(false);
  };
  const onClear = () => {
    setLedger({
      date: ledger.date,
      category: ledger.category,
      description: ledger.description,
      invoiceno: "",
      companyname: "",
      income: ledger.income,
      expense: 0,
      credit: 0,
      amount: "",
      balance: 0,
    });
  };

  useEffect(() => {
    (async function change() {
      try {
        const cashLedger = await Service.getcashLedgerHistory();
        if (cashLedger?.data) {
          setLedgerData(cashLedger.data);
        } else {
          setLedgerData([]);
        }
      } catch (err) {
        alert(JSON.stringify(err));
      }
      await getLedgerEntryData();
    })();
  }, []);

  const getLedgerEntryData = async () => {
    try {
      const ledgerEntry = await Service.getLedgerEntry();
      if (ledgerEntry?.data) {
        setLedgerArray(ledgerEntry.data);
      } else {
        setLedgerArray([]);
      }
    } catch (err) {
      alert(JSON.stringify(err));
    }
  };

  const onAddLedgerEntry = (ledgerName) => {
    let array = [...ledgerArray];
    array.push(ledgerName);
    updateLedgerDB(array, "LedgerEntry", "LedgerEntry");
    setModal(false);
  };

  const updateLedgerDB = (array, dbName, fileName) => {
    var db = new PouchDB(dbName);
    db.get(fileName, function (err, doc) {
      if (err) {
        var doc = {
          _id: fileName,
          data: array,
        };
        db.put(doc);
      }
      db.put(
        {
          _id: doc._id,
          data: array,
          _rev: doc._rev,
        },
        function (err, response) {
          if (err) {
            if (array.length > 0) {
              setLedgerArray(array);
            }
            return console.log(err, "err");
          } else {
            if (dbName == "LedgerEntry") {
              setLedgerArray(array);
            } else {
              setLedgerData(array);
            }
          }
        }
      );
    });
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

  const onDeleteLedger = (index) => {
    let array = [...ledgerData];
    array.splice(index, 1);
    let arr = onCalculateData(array);
    updateLedgerDB(arr, "cashLedger", "cashLedgerHistory");
  };

  const handleReport = (e) => {
    router.push({
      pathname: "/cashbookledger/reportstatement",
    });
  };
  const onDropdownChange = (e) => {
    if (e.value == "addNew") {
      setModal(!Modal);
    } else {
      setLedger({ ...ledger, category: e.label });
    }
  };
  const onDisableProp = () => {
    return ledger.income !== "" &&
      ledger.category !== "" &&
      ledger.companyname !== "" &&
      ledger.amount > 0
      ? false
      : true;
  };
  const onHandleInputChange = (e, index, fieldName) => {
    let array = [...ledgerData];
    array[index][fieldName] = e.target.value;
    // console.log(array, "updatedArrayupdatedArray");
    updateLedgerDB(array, "cashLedger", "cashLedgerHistory");
    // setDescShow(false)
  };
  const handleShowInputs = () => {
    setShowInputs(true);
  };
  const closeDropdowns = () => {
    setShowInputs(false);
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

      <div className="flex justify-between w-[100%]">
        <div className="w-[98%] flex justify-between">
          <BtoolsHeader
            Src="../icons/Cashledgerlogo.svg"
            Height="35"
            Width="100"
          />
          <div className="flex">
            <input
              className="w-[30%] font-[sf-pro-medium] md:pl-2 text-[12px] bg-transparent"
              value="Currency:"
            />
            <select
              id="currencyPopUp"
              className={
                "text-[12px] bg-transparent my-2 font-[sf-pro-medium] cursor-pointer outline-none"
              }
              onClick={currencyClick}
            >
              <option>
                {currencyId}({currencySymbol})
              </option>
            </select>
            <img
              src="../icons/ledgerreport.svg"
              className="pt-1 w-9 h-9 cursor-pointer"
              onClick={(e) => handleReport(e)}
            />
          </div>
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex justify-around items-start mb-[25px] h-auto w-full">
          <div className="bg-[#e9e9e9] mt-5  flex-col items-center rounded-[10px] flex justify-start w-[80%] h-[65vh]">
            <div className="bg-white border-[3px] border-solid flex flex-col justify-around items-center rounded-[10px] w-full h-[14vh]">
              <div className="w-[90%] mt-1 justify-start flex items-start">
                <h1>Net Balance</h1>
              </div>
              <div className="bg-[#e9e9e9] mb-[12px] pl-2 rounded-[5px] flex items-center text-[25px] h-[7vh] w-[90%]">
                {currencySymbol}
                {ledgerData.length > 0
                  ? ledgerData[ledgerData.length - 1]?.balance
                  : 0}
              </div>
              {showInputs == false ? (
                <>
                  <div className="w-full h-[8vh] flex justify-around absolute top-[145px] items-center">
                    <div
                      onClick={handleShowInputs}
                      className="bg-[#fec334] flex justify-around items-center h-[7vh] w-[15%] rounded-[40px]"
                    >
                      <img
                        src="../images/plus.png"
                        height={0}
                        width={18}
                        alt="plus"
                      />
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            {showInputs == true ? (
              <>
                <div className="flex transition duration-150 ease-in-out justify-center h-[47vh] w-[90%] ">
                  <div className="flex flex-col justify-between w-[90%] h-[48vh]">
                    <div className="flex justify-around items-center w-full h-[6.6vh]">
                      <input
                        type="date"
                        className="bg-white pl-[13px] pr-[12px] rounded-[5px] w-full font-[sf-pro-regular] text-[#232E38] text-sm text-opacity-100 h-[5vh]"
                        id="selectdate"
                        name="date"
                        onChange={ledgerChange}
                        value={ledger.date}
                      />
                    </div>
                    <div className="flex justify-around items-center w-full h-[5.6vh]">
                      <CustomSelect
                        title={"Ledger"}
                        onCustomSelect={onDropdownChange}
                        IsAddnew={true}
                        isAll={false}
                        data={ledgerArray}
                        Width={"100%"}
                        Height={"5vh"}
                      />
                    </div>
                    <div className="flex justify-around items-center w-full h-[6.6vh]">
                      <input
                        type="text"
                        className="bg-white pl-[13px] text-sm rounded-[5px] outline-none w-full h-[5vh]"
                        id="billno"
                        placeholder="Enter Bill No"
                        name="invoiceno"
                        onChange={ledgerChange}
                        value={ledger.invoiceno}
                      />
                    </div>
                    <div className="flex justify-around items-center w-full h-[6.6vh]">
                      <input
                        type="text"
                        className="bg-white pl-[13px] text-sm rounded-[5px] outline-none w-full h-[5vh]"
                        id="companyname"
                        placeholder="Enter the Company Name"
                        value={ledger.companyname}
                        name="companyname"
                        onChange={ledgerChange}
                      />
                    </div>
                    <div className="flex justify-around items-center w-full h-[6.6vh]">
                      <CustomSelect
                        title={"Select Income/Expense"}
                        onCustomSelect={onHandleExpenseCreditChange}
                        id="expinc"
                        IsAddnew={false}
                        isAll={false}
                        data={dropDown}
                        Width={"100%"}
                        Height={"5vh"}
                      />
                    </div>
                    <div className="flex justify-around items-center w-full h-[6.6vh]">
                      <div className="border bg-white border-[#707070] border-opacity-25 rounded-lg flex flex-col w-full h-[5vh]">
                        <div className="flex pl-[13px] justify-center items-center">
                          {currencySymbol}
                          <input
                            type="number"
                            placeholder="0"
                            className="bg-white rounded-lg outline-none h-[4.6vh] w-full"
                            id="amount"
                            value={ledger.amount}
                            name="amount"
                            onChange={ledgerChange}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full mb-[3px] h-[5vh] flex justify-between items-center">
                      <div>
                        <button
                          onClick={closeDropdowns}
                          className="bg-red-400 p-1 text-white w-24 h-[5vh] rounded-md"
                        >
                          {" "}
                          Cancel
                        </button>
                      </div>
                      <div className="flex justify-center items-center">
                        <button
                          disabled={onDisableProp()}
                          className={`bg-[#375CEC] p-1 text-white w-24 h-[5vh] rounded-md flex justify-center items-center ${
                            ledger.income === "" || ledger.category === ""
                              ? "opacity-40"
                              : null
                          }`}
                          id="save"
                          onClick={onDisableProp() == true ? null : handleSave}
                        >
                          <img
                            src="../icons/save.svg"
                            className="w-5 h-5 mr-2"
                            alt="icon"
                          />
                            Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      
      <div className="hidden sm:hidden md:hidden xl:block 2xl:hidden">
        <div className=" border-t-2 border-[#707070]/5  p-6 flex md:flex-row sm:flex-col">
          <div className=" h-40 w-[100%] justify-between bg-[#fbfbfb] border-r-2">
            <div className="flex justify-start ">
              <button
                className="bg-[#232E380D] p-3 font-[SpaceGrotesk-bold]"
                id="create"
                onClick={handleClick}
              >
                +Create Ledger{" "}
              </button>
            </div>

            <div className="flex items-center justify-around  w-[100%]">
              <div className="flex flex-row justify-around w-[80%] h-[60px]  ">
                <div className="border bg-[#fbfbfb] border-[#707070] border-opacity-25 rounded-lg p-[4px] h-[60px] flex flex-col">
                  <label className="text-xs text-[#707070] font-[sfpro-medium] text-opacity-100">
                    Select date
                  </label>
                  <input
                    type="date"
                    className="bg-[#fbfbfb] font-[sf-pro-regular] text-[#232E38] text-sm text-opacity-100 h-[37px]"
                    id="selectdate"
                    name="date"
                    onChange={ledgerChange}
                    value={ledger.date}
                  />
                </div>
                <CustomSelect
                  title={"Ledger"}
                  onCustomSelect={onDropdownChange}
                  IsAddnew={true}
                  isAll={false}
                  data={ledgerArray}
                  Width={"180px"}
                />

                <div className="border border-[#707070] border-opacity-25 rounded-lg p-[4px] flex flex-col ">
                  <label className="text-xs my-1 text-[#707070] font-[sfpro-medium] text-opacity-100">
                    Invoice/Receipt No
                  </label>
                  <input
                    type="text"
                    className="bg-[#fbfbfb] text-sm outline-none h-7"
                    id="billno"
                    placeholder="Enter Bill No"
                    name="invoiceno"
                    onChange={ledgerChange}
                    value={ledger.invoiceno}
                  />
                </div>

                <div className="border border-[#707070] border-opacity-25 rounded-lg p-[4px] flex flex-col ">
                  <label className="text-xs text-[#707070] font-[sfpro-medium]  text-opacity-100">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="bg-[#fbfbfb] text-sm outline-none h-7"
                    id="companyname"
                    placeholder="Enter the Company Name"
                    value={ledger.companyname}
                    name="companyname"
                    onChange={ledgerChange}
                  />
                </div>

                {/* Expense /Credit */}
                {/* <div className='border border-[#707070] border-opacity-25 rounded-lg p-2 flex flex-col '>
                <label className='text-xs text-[#707070] font-[sfpro-medium] text-opacity-100'>Select Income/Expense</label>
                <select className='outline-none bg-[#fbfbfb] rounded-lg ' value={ledger.income} name='income' onChange={ledgerChange}>
                  <option >Select</option>
                  <option value={'expense'}>Expense</option>
                  <option value={'credit'}>Credit</option>
                </select>
              </div> */}
                <CustomSelect
                  title={"Select Income/Expense"}
                  onCustomSelect={onHandleExpenseCreditChange}
                  id="expinc"
                  IsAddnew={false}
                  isAll={false}
                  data={dropDown}
                  Width={"180px"}
                />

                <div className="border border-[#707070] border-opacity-25 rounded-lg p-2 flex flex-col  w-[96px] h-[59px]">
                  <label className="text-xs text-[#707070] font-[sfpro-medium] text-opacity-100">
                    Amount
                  </label>
                  <div className="flex">
                    {currencySymbol}
                    <input
                      type="number"
                      placeholder="0"
                      className="bg-[#fbfbfb] outline-none w-[77px]"
                      id="amount"
                      value={ledger.amount}
                      name="amount"
                      onChange={ledgerChange}
                    />
                  </div>
                </div>
              </div>

              <div className=" bg-white w-[20%] h-fit mr-4 flex flex-col">
                <div className="flex justify-around">
                  <label className="text-[#707070] font-[sfpro-medium] text-opacity-100 mt-2">
                    Balance Amount
                  </label>
                  <div className="bg-[#fbfbfb] text-[#232E38] font-[sfpro-medium] font-bold text-opacity-100  mt-2 text-lg flex justify-center items-center">
                    {currencySymbol}
                    {ledgerData.length > 0
                      ? ledgerData[ledgerData.length - 1]?.balance
                      : 0}
                  </div>
                </div>
                <div className="flex justify-center items-center mt-4">
                  <button
                    disabled={onDisableProp()}
                    className={`bg-[#375CEC] p-1 text-white w-24 h-11 mb-2 rounded-md flex justify-center items-center ${
                      ledger.income === "" || ledger.category === ""
                        ? "opacity-40"
                        : null
                    }`}
                    id="save"
                    onClick={onDisableProp() == true ? null : handleSave}
                  >
                    <img
                      src="../icons/save.svg"
                      className="w-5 h-5"
                      alt="icon"
                    />
                    <p className={`pl-1`}>Save</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* System view */}
      <div className="hidden sm:hidden md:hidden xl:hidden 2xl:block ">
        <div className="bg-[#F6F6F6] border-t-2 border-[#707070]/5  p-6 flex md:flex-row sm:flex-col">
          <div className="w-[80%] h-32 bg-[#fbfbfb] border-r-2">
            <div className="flex justify-start pb-3">
              <button
                className="bg-[#232E380D] p-3 font-[SpaceGrotesk-bold]"
                id="create"
                onClick={handleClick}
              >
                +Create Ledger{" "}
              </button>
            </div>

            <div className="flex lg:flex-row justify-around h-[60px]  ">
              <div className="border bg-white border-[#707070] border-opacity-25 rounded-lg p-[4px] h-[60px] flex flex-col">
                <label className="text-xs text-[#707070] font-[sfpro-medium] text-opacity-100">
                  Select date
                </label>
                <input
                  type="date"
                  className="bg-white outline-none font-[sf-pro-regular] text-[#232E38] text-sm text-opacity-100 h-[37px]"
                  id="selectdate"
                  name="date"
                  onChange={ledgerChange}
                  value={ledger.date}
                />
              </div>
              <CustomSelect
                title={"Ledger"}
                onCustomSelect={onDropdownChange}
                IsAddnew={true}
                isAll={false}
                data={ledgerArray}
                Width={"180px"}
              />

              <div className="border bg-white border-[#707070] border-opacity-25 rounded-lg p-[4px] flex flex-col ">
                <label className="text-xs my-1 text-[#707070] font-[sfpro-medium] text-opacity-100">
                  Invoice/Receipt No
                </label>
                <input
                  type="text"
                  className="bg-white text-sm outline-none h-7"
                  id="billno"
                  placeholder="Enter Bill No"
                  name="invoiceno"
                  onChange={ledgerChange}
                  value={ledger.invoiceno}
                />
              </div>

              <div className="bg-white border border-[#707070] border-opacity-25 rounded-lg p-[4px] flex flex-col ">
                <label className="text-xs text-[#707070] font-[sfpro-medium] my-1 text-opacity-100">
                  Company Name
                </label>
                <input
                  type="text"
                  className="bg-white text-sm outline-none h-7"
                  id="companyname"
                  placeholder="Enter the Company Name"
                  value={ledger.companyname}
                  name="companyname"
                  onChange={ledgerChange}
                />
              </div>

              {/* Expense /Credit */}
              {/* <div className='border border-[#707070] border-opacity-25 rounded-lg p-2 flex flex-col '>
                <label className='text-xs text-[#707070] font-[sfpro-medium] text-opacity-100'>Select Income/Expense</label>
                <select className='outline-none bg-[#fbfbfb] rounded-lg ' value={ledger.income} name='income' onChange={ledgerChange}>
                  <option >Select</option>
                  <option value={'expense'}>Expense</option>
                  <option value={'credit'}>Credit</option>
                </select>
              </div> */}
              <CustomSelect
                title={"Select Income/Expense"}
                onCustomSelect={onHandleExpenseCreditChange}
                id="expinc"
                IsAddnew={false}
                isAll={false}
                data={dropDown}
                Width={"180px"}
              />

              <div className="bg-white border border-[#707070] border-opacity-25 rounded-lg p-2 flex flex-col  w-[96px] h-[59px]">
                <label className="text-xs text-[#707070] font-[sfpro-medium] text-opacity-100">
                  Amount
                </label>
                <div className="flex">
                  {currencySymbol}
                  <input
                    type="number"
                    placeholder="0"
                    className="bg-white outline-none w-[77px]"
                    id="amount"
                    value={ledger.amount}
                    name="amount"
                    onChange={ledgerChange}
                  />
                </div>
              </div>

              <div className="flex justify-center items-center">
                <button
                  disabled={onDisableProp()}
                  className={`bg-[#375CEC] p-1 text-white w-24 h-11 rounded-md flex justify-center items-center ${
                    ledger.income === "" || ledger.category === ""
                      ? "opacity-40"
                      : null
                  }`}
                  id="save"
                  onClick={onDisableProp() == true ? null : handleSave}
                >
                  <img src="../icons/save.svg" className="w-5 h-5" alt="icon" />
                  Save
                </button>
              </div>
            </div>
          </div>
          <div className="w-[20%] bg-white p-2  flex justify-center">
            <div className="flex flex-col">
              <label className="text-[#707070] font-[sfpro-medium] text-opacity-100">
                Balance Amount
              </label>
              <div className="bg-[#fbfbfb] text-[#232E38] font-[sfpro-medium] font-bold text-opacity-100 xl:w-[236px] h-[60px] text-lg flex justify-center items-center">
                {currencySymbol}
                {ledgerData.length > 0
                  ? ledgerData[ledgerData.length - 1]?.balance
                  : 0}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:hidden md:hidden lg:block  xl:hidden">
        <div className=" border-t-2 border-[#707070]/5  p-6 flex md:flex-row sm:flex-col">
          <div className="w-[80%] h-32 bg-[#fbfbfb] border-r-2">
            <div className="flex justify-start pb-3">
              <button
                className="bg-[#232E380D] p-3 font-[SpaceGrotesk-bold]"
                id="create"
                onClick={handleClick}
              >
                +Create Ledger{" "}
              </button>
            </div>

            <div className="flex flex-col justify-around h-[25vh]  ">
              <div className="flex  justify-around">
                <div className="border bg-[#fbfbfb] border-[#707070] border-opacity-25 rounded-lg p-[4px]  w-[22%] flex flex-col">
                  <label className="text-xs text-[#707070] font-[sfpro-medium] text-opacity-100">
                    Select date
                  </label>
                  <input
                    type="date"
                    className="bg-[#fbfbfb] font-[sf-pro-regular] text-[#232E38] text-sm text-opacity-100 h-[37px]"
                    id="selectdate"
                    name="date"
                    onChange={ledgerChange}
                    value={ledger.date}
                  />
                </div>
                <CustomSelect
                  title={"Ledger"}
                  onCustomSelect={onDropdownChange}
                  IsAddnew={true}
                  isAll={false}
                  data={ledgerArray}
                  Width={"180px"}
                />
                <CustomSelect
                  title={"Select Income/Expense"}
                  onCustomSelect={onHandleExpenseCreditChange}
                  id="expinc"
                  IsAddnew={false}
                  isAll={false}
                  data={dropDown}
                  Width={"180px"}
                />
              </div>

              <div className="flex  justify-around">
                <div className="border border-[#707070] border-opacity-25 rounded-lg p-[4px] flex flex-col ">
                  <label className="text-xs text-[#707070] font-[sfpro-medium] text-opacity-100">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="bg-[#fbfbfb] text-sm outline-none h-7"
                    id="companyname"
                    placeholder="Enter the Company Name"
                    value={ledger.companyname}
                    name="companyname"
                    onChange={ledgerChange}
                  />
                </div>

                {/* Expense /Credit */}
                {/* <div className='border border-[#707070] border-opacity-25 rounded-lg p-2 flex flex-col '>
                <label className='text-xs text-[#707070] font-[sfpro-medium] text-opacity-100'>Select Income/Expense</label>
                <select className='outline-none bg-[#fbfbfb] rounded-lg ' value={ledger.income} name='income' onChange={ledgerChange}>
                  <option >Select</option>
                  <option value={'expense'}>Expense</option>
                  <option value={'credit'}>Credit</option>
                </select>
              </div> */}

                <div className="border border-[#707070] border-opacity-25 rounded-lg p-[4px] flex flex-col  w-[23%]">
                  <label className="text-xs my-1 text-[#707070] font-[sfpro-medium] text-opacity-100">
                    Invoice/Receipt No
                  </label>
                  <input
                    type="text"
                    className="bg-[#fbfbfb] text-sm outline-none h-7"
                    id="billno"
                    placeholder="Enter Bill No"
                    name="invoiceno"
                    onChange={ledgerChange}
                    value={ledger.invoiceno}
                  />
                </div>

                <div className="border border-[#707070] border-opacity-25 rounded-lg p-2 flex flex-col  w-[178px] h-[59px]">
                  <label className="text-xs text-[#707070] font-[sfpro-medium] text-opacity-100">
                    Amount
                  </label>
                  <div className="flex">
                    {currencySymbol}
                    <input
                      type="number"
                      placeholder="0"
                      className="bg-[#fbfbfb] outline-none w-[77px]"
                      id="amount"
                      value={ledger.amount}
                      name="amount"
                      onChange={ledgerChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[20%] bg-white p-2 flex flex-col justify-center">
            <div className="flex flex-col">
              <label className="text-[#707070] font-[sfpro-medium] text-opacity-100">
                Balance Amount
              </label>
              <div className="bg-[#fbfbfb] text-[#232E38] font-[sfpro-medium] font-bold text-opacity-100 xl:w-[236px] h-[60px] text-lg flex justify-center items-center">
                {currencySymbol}
                {ledgerData.length > 0
                  ? ledgerData[ledgerData.length - 1]?.balance
                  : 0}
              </div>
            </div>

            <div className="flex justify-center items-center">
              <button
                disabled={onDisableProp()}
                className={`bg-[#375CEC] p-1 text-white w-24 h-11 rounded-md flex justify-center items-center ${
                  ledger.income === "" || ledger.category === ""
                    ? "opacity-40"
                    : null
                }`}
                id="save"
                onClick={onDisableProp() == true ? null : handleSave}
              >
                <img src="../icons/save.svg" className="w-5 h-5" alt="icon" />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:hidden md:block lg:hidden">
        <div className=" h-[27vh] border-t-2 border-[#707070]/5  p-6 flex md:flex-row ">
          <div className="w-[80%] h-[33vh] bg-[#fbfbfb] border-r-2">
            <div className="flex justify-start pb-3">
              <button
                className="bg-[#232E380D] p-3 font-[SpaceGrotesk-bold]"
                id="create"
                onClick={handleClick}
              >
                +Create Ledger{" "}
              </button>
            </div>

            <div className="flex flex-col justify-around h-[22vh] ">
              <div className="flex justify-around">
                <div className="border bg-[#fbfbfb] border-[#707070] border-opacity-25 rounded-lg p-[4px] h-[60px] flex flex-col">
                  <label className="text-xs text-[#707070] font-[sfpro-medium] text-opacity-100">
                    Select date
                  </label>
                  <input
                    type="date"
                    className="bg-[#fbfbfb] font-[sf-pro-regular] text-[#232E38] text-sm text-opacity-100 h-[37px]"
                    id="selectdate"
                    name="date"
                    onChange={ledgerChange}
                    value={ledger.date}
                  />
                </div>
                <CustomSelect
                  title={"Ledger"}
                  onCustomSelect={onDropdownChange}
                  IsAddnew={true}
                  isAll={false}
                  data={ledgerArray}
                  Width={"150px"}
                />

                <CustomSelect
                  title={"Select Income/Expense"}
                  onCustomSelect={onHandleExpenseCreditChange}
                  id="expinc"
                  IsAddnew={false}
                  isAll={false}
                  data={dropDown}
                  Width={"150px"}
                />
              </div>
              <div className="flex  justify-around">
                <div className="border border-[#707070] border-opacity-25 rounded-lg p-[4px] flex flex-col  w-[23%] ">
                  <label className="text-xs text-[#707070] font-[sfpro-medium] text-opacity-100">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="bg-[#fbfbfb] text-xs outline-none  "
                    id="companyname"
                    placeholder="Enter the Company Name"
                    value={ledger.companyname}
                    name="companyname"
                    onChange={ledgerChange}
                  />
                </div>

                {/* Expense /Credit */}
                {/* <div className='border border-[#707070] border-opacity-25 rounded-lg p-2 flex flex-col '>
                <label className='text-xs text-[#707070] font-[sfpro-medium] text-opacity-100'>Select Income/Expense</label>
                <select className='outline-none bg-[#fbfbfb] rounded-lg ' value={ledger.income} name='income' onChange={ledgerChange}>
                  <option >Select</option>
                  <option value={'expense'}>Expense</option>
                  <option value={'credit'}>Credit</option>
                </select>
              </div> */}

                <div className="border border-[#707070] border-opacity-25 rounded-lg p-[2px] flex flex-col w-[27%] ">
                  <label className="text-xs my-1 text-[#707070] font-[sfpro-medium] text-opacity-100">
                    Invoice/Receipt No
                  </label>
                  <input
                    type="text"
                    className="bg-[#fbfbfb] text-sm outline-none "
                    id="billno"
                    placeholder="Enter Bill No"
                    name="invoiceno"
                    onChange={ledgerChange}
                    value={ledger.invoiceno}
                  />
                </div>

                <div className="border border-[#707070] border-opacity-25 rounded-lg p-2 flex flex-col  w-[150px] h-[59px]">
                  <label className="text-xs text-[#707070] font-[sfpro-medium] text-opacity-100">
                    Amount
                  </label>
                  <div className="flex">
                    {currencySymbol}
                    <input
                      type="number"
                      placeholder="0"
                      className="bg-[#fbfbfb] outline-none w-[77px]"
                      id="amount"
                      value={ledger.amount}
                      name="amount"
                      onChange={ledgerChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[20%] bg-white ml-2 flex justify-around flex-col mt-12 h-[20vh] ">
            <div className="flex flex-col">
              <label className="text-[#707070] font-[sfpro-medium] text-opacity-100">
                Balance Amount
              </label>
              <div className="bg-[#fbfbfb] text-[#232E38] font-[sfpro-medium] font-bold text-opacity-100 xl:w-[236px]  text-lg flex justify-center items-center">
                {currencySymbol}
                {ledgerData.length > 0
                  ? ledgerData[ledgerData.length - 1]?.balance
                  : 0}
              </div>
            </div>
            <div className="flex justify-center items-center">
              <button
                disabled={onDisableProp()}
                className={`bg-[#375CEC] p-1 text-white w-24 h-11 rounded-md flex justify-center items-center ${
                  ledger.income === "" || ledger.category === ""
                    ? "opacity-40"
                    : null
                }`}
                id="save"
                onClick={onDisableProp() == true ? null : handleSave}
              >
                <img src="../icons/save.svg" className="w-5 h-5" alt="icon" />
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden sm:block block">
        <div className="w-full flex justify-around items-center h-auto">
          <div className="w-[98%] overflow-scroll h-auto">
            <div className="w-[100rem] p-2">
              <div className="bg-[rgb(35,46,56)] flex font-[sfpro-medium]  rounded-t-md text-[9px] text-white p-2 mt-5">
                <p className="w-[2%] text-[#FFFFFF] text-xs text-center ">
                  S.No
                </p>
                <p className="w-[8%] text-[#FFFFFF] text-xs text-center">
                  Date
                </p>
                <p className="w-[8%] text-[#FFFFFF] text-xs text-center">
                  Ledger
                </p>
                <p className="w-[8%] text-[#FFFFFF] text-xs text-center">
                  Bill No
                </p>
                <p className="w-[11%] text-[#FFFFFF] text-xs text-center">
                  Company Name
                </p>
                <p className="w-[25%] text-[#FFFFFF] text-xs text-center">
                  Descriptions
                </p>
                <p className="w-[10%] text-[#FFFFFF] text-xs  text-center">
                  Reference
                </p>
                <p className="w-[9%] text-[#FFFFFF] text-xs  text-center">
                  Expense
                </p>
                <p className="w-[9%] text-[#FFFFFF] text-xs  text-center">
                  Credit
                </p>
                <p className="w-[9%] text-[#FFFFFF] text-xs  text-center">
                  Balance
                </p>
                <div className="w-[1%]">
                  <Image
                    width="16%"
                    height="20px"
                    className=""
                    src="/icons/ledgerdel.svg"
                  />
                </div>
              </div>
              {ledgerData && ledgerData.length > 0
                ? ledgerData.map((value, index) => {
                    return (
                      <div className="  flex  w-full mt-5 font-[sfpro-Regular] space-x-2">
                        <div className="text-black flex justify-center items-center w-[2%] h-[34px] px-[2px] border rounded-lg text-sm  ml-3">
                          {index + 1}
                        </div>
                        <div className="flex justify-center items-center text-black w-[8%] h-[34px] border rounded-lg text-xs">
                          {dateFormatReport(value.date)}
                        </div>
                        <div className="flex justify-center items-center text-black w-[8%] h-[34px] px-[2px] border rounded-lg text-sm">
                          {value.category}
                        </div>
                        <div className="flex justify-center items-center text-black w-[8%] h-[34px] px-[2px] border rounded-lg text-xs">
                          {value.invoiceno}
                        </div>
                        <div
                          className="flex justify-center items-center text-black w-[11%] h-[34px] border-[#707070] px-[2px]
                       border border-opacity-25 bg-white rounded-lg text-xs"
                        >
                          {value.companyname}
                        </div>

                        {descShow == true ? (
                          <input
                            className=" flex justify-center items-center text-black w-[25%] h-[34px] px-[2px] border rounded-lg text-xs indent-1"
                            type="text"
                            onChange={(e) =>
                              onHandleInputChange(e, index, "description")
                            }
                            value={value.description}
                            onMouseOut={() => {
                              setDescShow(false);
                            }}
                          />
                        ) : (
                          <div
                            className="flex justify-center items-center overflow-hidden text-black w-[25%] h-[34px] px-[2px] border rounded-lg text-xs indent-1 resize-none "
                            onClick={() => {
                              setDescShow(true);
                            }}
                          >
                            {value.description}
                          </div>
                        )}

                        {referShow ? (
                          <input
                            className=" flex justify-center items-center text-black w-[10%] h-[34px] px-[2px] border rounded-lg text-xs indent-1"
                            onChange={(e) =>
                              onHandleInputChange(e, index, "reference")
                            }
                            value={value.reference}
                            onMouseOut={() => {
                              setreferShow(false);
                            }}
                          />
                        ) : (
                          <div
                            className="flex justify-center items-center text-black  w-[10%] h-[34px] px-[2px] border rounded-lg text-xs indent-1"
                            onClick={() => {
                              setreferShow(true);
                            }}
                          >
                            {value.reference}
                          </div>
                        )}

                        <div className="flex justify-center items-center text-black w-[9%] h-[34px] px-[2px] border rounded-lg text-xs">
                          {currencySymbol}
                          {value.expense}
                        </div>
                        <div className="flex justify-center items-center text-black w-[9%] h-[34px] px-[2px] border rounded-lg text-xs">
                          {currencySymbol}
                          {value.credit}
                        </div>
                        <div className="flex justify-center items-center text-black w-[8%] h-[34px] px-[2px] border rounded-lg text-xs ">
                          {value.balance}
                        </div>
                        <div className="flex justify-center">
                          <div onClick={() => onDeleteLedger(index)}>
                            <svg
                              id="Component_16_1"
                              data-name="Component 16 – 1"
                              xmlns="http://www.w3.org/2000/svg"
                              width="35"
                              height="32"
                              viewBox="0 0 38 38"
                            >
                              <g id="Group_18229" data-name="Group 18229">
                                <rect
                                  id="Rectangle_7337"
                                  data-name="Rectangle 7337"
                                  width="38"
                                  height="38"
                                  rx="3"
                                  fill="#fbfbfb"
                                />
                              </g>
                              <g
                                id="trash"
                                transform="translate(10.343 7.526)"
                                opacity="0.4"
                                className="hover:text-[#e10918] text-black"
                                fill="currentColor"
                              >
                                <path
                                  id="Path_4"
                                  className="hover:text-[#e10918] text-black"
                                  fill="currentColor"
                                  data-name="Path 4"
                                  d="M200.349,154.072H189.468a1.08,1.08,0,0,1-1.078-1.008l-.934-13.88a1.08,1.08,0,0,1,1.078-1.152h12.748a1.081,1.081,0,0,1,1.078,1.152l-.934,13.88A1.08,1.08,0,0,1,200.349,154.072Zm3.076-18.065h-16.9a.024.024,0,0,1-.026-.026v-2.956a.024.024,0,0,1,.026-.026h16.9a.024.024,0,0,1,.026.026v2.953A.026.026,0,0,1,203.426,136.007Z"
                                  transform="translate(-186.5 -131.043)"
                                />
                                <path
                                  id="Path_5"
                                  data-name="Path 5"
                                  d="M347.857,60.311h-9.031a.024.024,0,0,1-.026-.026V56.926a.024.024,0,0,1,.026-.026h9.031a.024.024,0,0,1,.026.026v3.359A.026.026,0,0,1,347.857,60.311Z"
                                  transform="translate(-334.882 -56.9)"
                                />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </div>
      </div>

      <div className="sm:hidden hidden md:block">
        <div className="w-full flex flex-col justify-around items-center p-2 xl:pt-2 md:pt-[60px] ">
          <div className="bg-[rgb(35,46,56)] w-[100%] flex font-[sfpro-medium] space-x-2 rounded-t-md text-[9px] text-white p-3 mt-5">
            <div className="w-[2%] text-[#FFFFFF] text-xs text-center">
              S.No
            </div>
            <div className="w-[8%] text-[#FFFFFF] text-xs text-center">
              Date
            </div>
            <div className="w-[8%] text-[#FFFFFF] text-xs text-center">
              Ledger
            </div>
            <div className="w-[8%] text-[#FFFFFF] text-xs text-center">
              Bill No
            </div>
            <div className="w-[15%] text-[#FFFFFF] text-xs text-center">
              Company Name
            </div>
            <div className="w-[25%] text-[#FFFFFF] text-xs text-center">
              Descriptions
            </div>
            <div className="w-[10%] text-[#FFFFFF] text-xs  text-center">
              Reference
            </div>
            <div className="w-[9%] text-[#FFFFFF] text-xs  text-center">
              Expense
            </div>
            <div className="w-[9%] text-[#FFFFFF] text-xs  text-center">
              Credit
            </div>
            <div className="w-[8%] text-[#FFFFFF] text-xs  text-center">
              Balance
            </div>
            <div className="w-[1%]">
              <Image
                width="10%"
                height="16px"
                className=""
                src="/icons/ledgerdel.svg"
              />
            </div>
          </div>
          <div className="max-h-[58vh] overflow-scroll w-[100%] scrollBar">
            {ledgerData && ledgerData.length > 0
              ? ledgerData.map((value, index) => {
                  return (
                    <div className="flex  w-full mt-5 font-[sfpro-Regular]">
                      <div className="w-[100%] flex space-x-2">
                        <div className=" text-black flex justify-center items-center w-[2%]  h-[34px] px-[2px] border rounded-lg text-sm  ml-3">
                          {index + 1}
                        </div>
                        <div className="flex justify-center items-center text-black w-[8%] h-[34px] px-[2px] border rounded-lg text-xs">
                          {dateFormatReport(value.date)}
                        </div>
                        <div className="flex justify-center items-center text-black w-[8%] h-[34px] px-[2px] border rounded-lg text-sm">
                          {value.category}
                        </div>
                        <div className="flex justify-center items-center text-black w-[8%] h-[34px] px-[2px] border rounded-lg text-xs">
                          {value.invoiceno}
                        </div>
                        <div
                          className="flex justify-center items-center text-black w-[11%] h-[34px] px-[2px] border-[#707070] 
              border border-opacity-25  rounded-lg text-xs"
                        >
                          {value.companyname}
                        </div>

                        {descShow == true ? (
                          <textarea
                            className="flex justify-center items-center overflow-hidden text-black w-[25%] h-[34px] px-[2px] border rounded-lg text-xs indent-1 resize-none "
                            type="text"
                            onChange={(e) =>
                              onHandleInputChange(e, index, "description")
                            }
                            value={value.description}
                            onMouseOut={() => {
                              setDescShow(false);
                            }}
                          ></textarea>
                        ) : (
                          <div
                            className="flex justify-center items-center overflow-hidden text-black w-[25%] h-[34px] px-[2px] border rounded-lg text-xs indent-1 resize-none "
                            onClick={() => {
                              setDescShow(true);
                            }}
                          >
                            {value.description}
                          </div>
                        )}


                        {referShow ? (
                          <input
                            className="flex justify-center items-center text-black  w-[10%] h-[34px] px-[2px] border rounded-lg text-xs indent-1 "
                            onChange={(e) =>
                              onHandleInputChange(e, index, "reference")
                            }
                            value={value.reference}
                            onMouseOut={() => {
                              setreferShow(false);
                            }}
                          />
                        ) : (
                          <div
                            className="flex justify-center items-center text-black  w-[10%] h-[34px] px-[2px] border rounded-lg text-xs indent-1"
                            onClick={() => {
                              setreferShow(true);
                            }}
                          >
                            {value.reference}
                          </div>
                        )}

                        <div className="flex justify-center items-center text-black w-[9%] h-[34px] px-[2px] border rounded-lg text-xs">
                          {currencySymbol}
                          {value.expense}
                        </div>
                        <div className="flex justify-center items-center text-black w-[9%] h-[34px] px-[2px] border rounded-lg text-xs">
                          {currencySymbol}
                          {value.credit}
                        </div>
                        <div className="flex justify-center items-center text-black w-[8%] h-[34px] px-[2px] border rounded-lg text-xs ">
                          {value.balance}
                        </div>
                        <div className="flex justify-center cursor-pointer w-[2%]">
                          <div onClick={() => onDeleteLedger(index)}>
                            <svg
                              id="Component_16_1"
                              data-name="Component 16 – 1"
                              xmlns="http://www.w3.org/2000/svg"
                              width="35"
                              height="32"
                              viewBox="0 0 38 38"
                            >
                              <g id="Group_18229" data-name="Group 18229">
                                <rect
                                  id="Rectangle_7337"
                                  data-name="Rectangle 7337"
                                  width="38"
                                  height="38"
                                  rx="3"
                                  fill="#fbfbfb"
                                />
                              </g>
                              <g
                                id="trash"
                                transform="translate(10.343 7.526)"
                                opacity="0.4"
                                className="hover:text-[#e10918] text-black"
                                fill="currentColor"
                              >
                                <path
                                  id="Path_4"
                                  className="hover:text-[#e10918] text-black"
                                  fill="currentColor"
                                  data-name="Path 4"
                                  d="M200.349,154.072H189.468a1.08,1.08,0,0,1-1.078-1.008l-.934-13.88a1.08,1.08,0,0,1,1.078-1.152h12.748a1.081,1.081,0,0,1,1.078,1.152l-.934,13.88A1.08,1.08,0,0,1,200.349,154.072Zm3.076-18.065h-16.9a.024.024,0,0,1-.026-.026v-2.956a.024.024,0,0,1,.026-.026h16.9a.024.024,0,0,1,.026.026v2.953A.026.026,0,0,1,203.426,136.007Z"
                                  transform="translate(-186.5 -131.043)"
                                />
                                <path
                                  id="Path_5"
                                  data-name="Path 5"
                                  d="M347.857,60.311h-9.031a.024.024,0,0,1-.026-.026V56.926a.024.024,0,0,1,.026-.026h9.031a.024.024,0,0,1,.026.026v3.359A.026.026,0,0,1,347.857,60.311Z"
                                  transform="translate(-334.882 -56.9)"
                                />
                              </g>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              : null}
          </div>
        </div>
      </div>
      {Modal ? (
        <CreateLedger
          Popover={Modal}
          onClose={handlePopupClose}
          onSave={onAddLedgerEntry}
        />
      ) : null}
      {/* </div> */}
      {/* {console.log(Modal)} */}
    </>
  );
}
