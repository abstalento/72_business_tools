import GstHead from "../../components/gstreturns/gsthead/gstHead";
import GstSales from "../../components/gstreturns/gstsales/gstSales";
import BtoolsHeader from "../../container/72BTheader/BToolsHeader";
import Image from "next/image";
import PouchDB from "pouchdb";
import { useEffect, useState } from "react";
import GstPurchase from "../../components/gstreturns/gstpurchase/gstPurchase";
import GstDeletePopUp from "../../components/gstreturns/gstdeletepopup/deleteGst";
import ExportGstReturns from "../../components/gstreturns/gstexportpopup/exportPopup";
import BtoolsFooter from "../../container/72BTfooter/BToolsFooter";
import Service from "../../services/gstreturns/service";
import { PDFViewer } from "@react-pdf/renderer";
import GstSalesContent from "../../components/gstreturns/gstpdfcontent/gstSalesExport";
import GstPurchaseContent from "../../components/gstreturns/gstpdfcontent/gstPurchaseExport";
import CurrencyPopUp from "../billHive/currency-popup/CurrencyPopUp";
import { v1 as uuid } from "uuid";

const GstReturns = () => {
  const [listNumber, setListNumber] = useState(1);
  const [deleteId, setDeleteId] = useState();
  const [currencySymbol,setCurrencySymbol] = useState('₹')
  const [currencyId,setCurrencyId] = useState('INR')
  const [isCurrency,setIsCUrrency] = useState(false)
  const [isDelete, setIsDelete] = useState(false);
  const [sortState, setSortState] = useState(true);
  const [updateId, setUpdateId] = useState(0);
  const [isExport, setIsExport] = useState(false);
  const [gstHistory, setGstHistory] = useState();
  const [gstDatas, setGstDatas] = useState({
    gstTitle: "page 1",
    companyName: "",
    gstIn: "",
    contactNumber: "",
    date: "",
    Id:uuid(),

    gstSales: [
      {
        salesBill: "",
        salesInvoiceDate: "",
        saleCompanyName: "",
        salesGstInNo: "",
        salesBillCost: "",
        salesGstAmount: "",
        salesTotalBill: "",
        salesPaidDate: "",
        salesPayMode: "",
      },
    ],
    gstPurchase: [
      {
        purchaseBill: "",
        invoiceDate: "",
        purchaseCompanyName: "",
        gstInNo: "",
        billCost: "",
        gstAmount: "",
        totalBill: "",
        paidDate: "",
        payMode: "",
      },
    ],
  });
  const [gstActive, setGstActive] = useState("gstSales");
  const activeGst = (data) => {
    setGstActive(data);
  };

  const listclick = (data) => {
    setUpdateId(data);
  };
  
  const listChange = (event) => {
    const { name, value } = event.target;
    const gstDatasState = JSON.parse(JSON.stringify(gstHistory));
    gstDatasState[updateId][name] = value;
    setGstHistory(gstDatasState);
    var db = new PouchDB("gstReturns");
    db.get("gstReturnsHistory", function (err, doc) {
      if (err) {
        var doct = {
          _id: "gstReturnsHistory",
          data: gstDatasState,
        };
        db.put(doct);
      }
      db.put(
        {
          _id: doc._id,
          data: gstDatasState,
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
  };

  const addList = () => {
    const newData = { ...gstDatas };
    let allUser = [];
    newData["gstTitle"] = `page ${
      gstHistory?.length == undefined ? 1 : gstHistory?.length + 1
    }`;
    var db = new PouchDB("gstReturns");
    db.get("gstReturnsHistory", function (err, doc) {
      if (err) {
        allUser.push(newData);
        var doc = {
          _id: "gstReturnsHistory",
          data: allUser,
        };
        db.put(doc);
        setListNumber((preState) => ++preState);
      }
      if (doc) {
        allUser = doc.data;
        allUser.push(newData);
        setListNumber((preState) => ++preState);
      }
      db.put(
        {
          _id: doc._id,
          data: allUser,
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
  };

  const historyData = (data, title) => {
    const gstDatasState = JSON.parse(JSON.stringify(gstHistory));
    gstDatasState[updateId][title] = data;
    setGstHistory(gstDatasState);
    var db = new PouchDB("gstReturns");
    db.get("gstReturnsHistory", function (err, doc) {
      if (err) {
        var doct = {
          _id: "gstReturnsHistory",
          data: gstDatasState,
        };
        db.put(doct);
      }
      db.put(
        {
          _id: doc._id,
          data: gstDatasState,
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
    setListNumber((preState) => ++preState);
  };

  const deleteValue = (data, state) => {
    setDeleteId(data);
    setIsDelete(state);
  };

  const closeDelete = (data) => {
    setIsDelete(data);
  };

  const deleteClick = (data) => {
    const gstDatasState = JSON.parse(JSON.stringify(gstHistory));
    gstDatasState[updateId][gstActive].splice(data, 1);
    setIsDelete(false);
    var db = new PouchDB("gstReturns");
    db.get("gstReturnsHistory", function (err, doc) {
      if (err) {
        var doct = {
          _id: "gstReturnsHistory",
          data: gstDatasState,
        };
        db.put(doct);
        setListNumber((preState) => ++preState);
      }

      db.put(
        {
          _id: doc._id,
          data: gstDatasState,
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
      setListNumber((preState) => ++preState);
    });
  };

  const headData = (title, value) => {
    const gstDatasState = JSON.parse(JSON.stringify(gstHistory));
    gstDatasState[updateId][title] = value;
    setGstHistory(gstDatasState);
    var db = new PouchDB("gstReturns");
    db.get("gstReturnsHistory", function (err, doc) {
      if (err) {
        var doct = {
          _id: "gstReturnsHistory",
          data: gstDatasState,
        };
        db.put(doct);
      }
      db.put(
        {
          _id: doc._id,
          data: gstDatasState,
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
  };

  const exportValue = (data) => {
    setIsExport(data);
  };

  const ExportClick=(data)=>{
    setIsExport(data);
  }
  const salesExportfile=(data)=>{
    setIsExport(data);
  }
  const closeExport = (data) => {
    setIsExport(data);
  };

  const currencyClick = ()=>{
    setIsCUrrency(true)
  }
  const CurrencyValue = (currencySymbols) => {
    setCurrencySymbol(currencySymbols);
  };
  const setCurrencyIdValue = (currencyIds) => {
    setCurrencyId(currencyIds)
  };
  const setClosePopUp = (closeCurrency) => {
    setIsCUrrency(closeCurrency)
  };

  const sortClick = () => {
    gstHistory.sort((a, b) => {
      let ele1 = a.gstTitle;
      let ele2 = b.gstTitle;
      if (sortState == true) {
        setSortState(false);
        if (ele1.toLowerCase() < ele2.toLowerCase()) {
          return -1;
        }
        if (ele1.toLowerCase() > ele2.toLowerCase()) {
          return 1;
        }
        return 0;
      } else {
        setSortState(true);
        if (ele2.toLowerCase() < ele1.toLowerCase()) {
          return -1;
        }
        if (ele2.toLowerCase() > ele1.toLowerCase()) {
          return 1;
        }
        return 0;
      }
    });
    var db = new PouchDB("gstReturns");
    db.get("gstReturnsHistory", function (err, doc) {
      if (err) {
        var doct = {
          _id: "gstReturnsHistory",
          data: gstHistory,
        };
        db.put(doct);
      }
      db.put(
        {
          _id: doc._id,
          data: gstHistory,
          _rev: doc._rev,
        },
        function (err, response) {
          if (err) {
            return console.log(err, "err");
          } else {
            console.log(response, 'ress');
          }
        }
      );
    });
    setListNumber((preState) => ++preState);
  }
  useEffect(() => {
    (async function serviceCall() {
      await Service.gstReturnsHistory();
      const gstHistory = await Service.gstReturnsHistory();
      if (gstHistory.data) {
        setGstHistory(gstHistory.data);
      } else {
        var db = new PouchDB("gstReturns");
        let allUser = [];
        db.get("gstReturnsHistory", function (err, doc) {
          allUser.push(gstDatas);
          if (err) {
            var doct = {
              _id: "gstReturnsHistory",
              data: allUser,
            };
            db.put(doct);
          }
          db.put(
            {
              _id: "gstReturnsHistory",
              data: allUser,
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
        setListNumber((preState) => ++preState);
      }
    })();
  }, [listNumber]);
  return (
    <div>
      {isCurrency ? <CurrencyPopUp myCurrencySymbol={CurrencyValue}
            myCurrencyId={setCurrencyIdValue}
            closeCurrencyPopUp={setClosePopUp}/> : null}
      <div className="flex justify-between items-center pr-2">
        <BtoolsHeader Src="/images/gstReturnsLogo.png" Height="35" Width="80" />
        <div>
              {/* <input
                className="w-[35%] font-[sf-pro-medium] pl-2 text-[12px] bg-transparent"
                value="Currency:"
              /> */}
              <span
                className="w-[35%] font-[sf-pro-medium] pl-2 text-[12px] bg-transparent mr-5"
              >Currency</span>
              <select
                id="currencyPopUp"
                className={
                  "text-[12px] bg-transparent font-[sf-pro-medium] cursor-pointer outline-none"
                }
                onClick={currencyClick}
              >
                <option>
                  {currencyId}({currencySymbol})
                </option>
              </select>
        </div>
      </div>
      <div className="bg-[#F6F6F6] h-[100vh] border border-t">
        <div>
          <GstHead
            activeGstData={activeGst}
            gstId={updateId}
            headValue={headData}
            useEffectCall={listNumber}
            exportState={exportValue}
            currencyValue={currencySymbol}
          />
        </div>
        <div>
          <div>
            {isDelete ? (
              <GstDeletePopUp
                idValue={deleteId}
                deleteState={deleteClick}
                closeDeletePopup={closeDelete}
              />
            ) : null}
            {isExport ? (
              <ExportGstReturns  closepopUp={closeExport} gstId={updateId} activeState={gstActive} currencyValue={currencySymbol}/>
            ) : null}
            {gstActive == "gstSales" ? (
              <GstSales
                useEffectCall={listNumber}
                gstId={updateId}
                salesValues={historyData}
                deleteData={deleteValue}
                currencyValue={currencySymbol}
                salesExportfile={salesExportfile}
              />
            ) : (
              <GstPurchase
                useEffectCall={listNumber}
                gstId={updateId}
                salesValues={historyData}
                deleteData={deleteValue}
                currencyValue={currencySymbol}
                ExportClick={ExportClick}
              />
            )}
          </div>
          <div className="w-[95%] mx-auto mt-5 mb-2">
            <div className="bg-white flex">
              <button
                className="bg-[#005A5A] p-1 px-3 rounded-l-md text-white font-[sf-pro-medium]"
                onClick={addList}
              >
                +
              </button>
              <button className="bg-[#013B3B] px-3 p-1 text-white font-[sf-pro-medium] flex items-center" onClick={sortClick}>
              <Image
                  width="15px"
                  height="13px"
                  src= {sortState ? "/icons/gstAToZ.svg" : "/icons/gstZToA.svg"}
                  className="hover:cursor-pointer"
                />
              </button>
              <div className="flex max-w-[100%] scrollBar overflow-scroll overflow-y-auto">
                {gstHistory?.map((value, index) => {
                  return (
                    <input
                      value={`${value.gstTitle}`}
                      name="gstTitle"
                      maxLength="8"
                      className={`w-24 pl-4 ${
                        updateId == index ? "bg-[#2E2E2E33]" : "bg-white"
                      } cursor-pointer text-[14px] outline-none p-1 font-[sf-pro-medium]`}
                      onClick={() => listclick(index)}
                      onChange={listChange}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* {gstHistory ? (
          <PDFViewer height={"800px"} width={"850px"} showToolbar={true}>
            <GstSalesContent datas={gstHistory[0]} currencySymbol={currencySymbol}/>
          </PDFViewer>
        ) : null} */}
        <BtoolsFooter />
      </div>
    </div>
  );
};

export default GstReturns;
