import React, { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import Image from "next/image";
import Router from "next/router";
import PouchDB from "pouchdb";
import Service from "../../../services/billHive/services";

const HistoryPage = (props) => {
  const [localStoreData, setLocalStoreData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [getMyItem, setGetMyItem] = useState();
  const [callUseEffect, setCallUseEffect] = useState(0);
  const [historyBill,setHistoryBill]= useState({})

  const [csvData, setCsvData] = useState([]);

  const homePageRoute = (datas, i) => {
    datas.isEdit = true;
    datas.id = i;
    let data = datas.itemDetails
    let images = datas.uploadImage
    let labelDetails = datas.detailsLabel
    let itemList = datas.itemList
    // console.log(data,'data');
    var db = new PouchDB("BillHive");
    db.get("billHiveActiveData", function (err, doc) {
      if (err) {
        var doc = {
          _id: "billHiveActiveData",
          data: { isActive: true },
        };
        db.put(doc);
      }
      db.put(
        {
          _id: doc._id,
          data: { ...doc.data, isActive: true, data , images, labelDetails, itemList},
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
    Router.push({
      pathname: "/billHive",
      query: { data: JSON.stringify(datas) },
    });
  };
  const homePageNewInvoice = () => {
    // const getActiveData = JSON.parse(
    //   localStorage.getItem("billHiveActiveData")
    // );
    // if (getActiveData) {
    //   localStorage.setItem(
    //     "billHiveActiveData",
    //     JSON.stringify({ ...getActiveData, isActive: false })
    //   );
    // } else {
    //   localStorage.setItem(
    //     "billHiveActiveData",
    //     JSON.stringify({ ...getActiveData, isActive: false })
    //   );
    // }
    var db = new PouchDB("BillHive");
    db.get("billHiveActiveData", function (err, doc) {
      if (err) {
        var doc = {
          _id: "billHiveActiveData",
          data: { isActive: false },
        };
        db.put(doc);
      }
      db.put(
        {
          _id: doc._id,
          data: { ...doc.data, isActive: false },
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
    Router.push({
      pathname: "/billHive",
    });
  };
  const deleteInvoice = (data, index) => {
    if (confirm("Are you sure you want to delete this invoice?") === true) {
      localStoreData.splice(index, 1);
      // localStorage.setItem("billHiveInvoiceHistory", JSON.stringify(localStoreData));
      var db = new PouchDB("BillHive");
      db.get("BillHiveHistory", function (err, doc) {
        if (err) {
          return console.log(err);
        }
        db.put(
          {
            _id: doc._id,
            data: localStoreData,
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
      setCallUseEffect((pre) => ++pre);
    }
  };

  const invoiceSearch = (e) => {
    const mySearch = searchData.filter(
      (value) =>
        value.itemDetails.billTo
          .toLowerCase()
          .indexOf(e.target.value.toLowerCase()) >= 0
    );
    setLocalStoreData(mySearch);
  };


  const  sampleDataSet=(billHiveHistory)=>{
    
    // console.log(billHiveHistory.data,"billGIHEeDATA")
    const invoiceData = [];
    setGetMyItem(billHiveHistory.data);
    if (billHiveHistory.data) {
      setLocalStoreData(billHiveHistory.data);
      setSearchData(billHiveHistory.data);
      billHiveHistory.data.map((gitem) => {
        const { currencyValue, itemDetails, itemList,balance } = gitem;
        const {
          amountPaid,
          balanceDue,
          billDate,
          billFrom,
          billTo,
          cGst,
          discount,
          dueDate,
          invoiceNum,
          notes,
          paymentTerms,
          poNumber,
          sGst,
          shipTo,
          tax,
          termsNCondition,
        } = itemDetails;
        itemList.map((value) => {
          const { amount, item, quality, rate } = value;
          invoiceData.push({
            currencyValue,
            amountPaid,
            balance,
            billDate,
            billFrom,
            billTo,
            cGst,
            discount,
            dueDate,
            invoiceNum,
            notes,
            paymentTerms,
            poNumber,
            sGst,
            shipTo,
            tax,
            termsNCondition,
            amount,
            item,
            quality,
            rate,
        
          });
        });
      });
      setCsvData([...csvData, ...invoiceData]);
    }
  }
  useEffect(() => {
    // const getItem = JSON.parse(localStorage.getItem("billHiveInvoiceHistory"));
  
   (async function Change(){
    await Service.getBillHiveHistory()
  let billHive=await Service.getBillHiveHistory()
    sampleDataSet(billHive)
  })();
  }, [callUseEffect]);
  return (
    <div className="h-[100vh] flex flex-col items-center bg-[#E6E9ED] justify-center">
      <div className="w-[84%] md:w-[57%] lg:w-[45%] mx-auto bg-white p-5 min-h-[70vh] overflow-y-scroll scrollBar flex flex-col justify-between rounded-lg">
        <div>
          <div className="text-[20px] pb-5 text-center font-bold">History</div>
          <div className="pb-5 w-[98%]">
            We automatically save any invoices that you draft to your devices.
          </div>
          <div className="flex justify-between pb-5">
            <div className="flex pl-2 items-center rounded-md border-2 bg-[#E6E9ED] w-[100%] h-[40px]">
              <Image
                width="23%"
                height="28px"
                className="h-[18px] pr-5"
                src="/icons/Search-Icon.svg"
              />
              <input
                id="Testsearch"
                className="bg-[#E6E9ED] w-[100%] focus:outline-none"
                placeholder="search"
                onChange={invoiceSearch}
              />
            </div>
          </div>
          {!getMyItem?.length == null || !getMyItem?.length == 0 ? (
            <div className="flex flex-wrap pb-5 mx-auto w-[98%]">
              {localStoreData.map((data, index) => {
                return (
                  <div
                    key={index}
                    id="invoiceDetails"
                    className="group flex flex-col mr-[20px] w-[35%] lg:w-[28%] xl:w-[20%] h-[125px] mb-4 rounded-lg border-2 border-[#009e74] bg-[#F1FAF9]"
                  >
                    <div
                      id={index}
                      className={`w-[100%] pt-2 pb-[10px] h-[30px] p-[7px] flex ${
                        data.isDownloaded ? "justify-end" : "justify-between"
                      } items-center`}
                    >
                      {!data.isDownloaded && (
                        <span className="text-[12px] pl-1 font-[sfpro-Regular]">
                          DRAFT
                        </span>
                      )}
                      <svg
                      id="deleteButton"
                        xmlns="http://www.w3.org/2000/svg"
                        className="MuiSvgIcon-root text-[#515254]/60 hidden h-[15px] group-hover:block hover:text-[#e10918] cursor-pointer"
                        onClick={() => deleteInvoice(data, index)}
                        focusable="false"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    <div
                      className="h-[90px] cursor-pointer"
                      onClick={() => homePageRoute(data, index)}
                    >
                      <h1 className="font-[interSemiBold] text-[14px] text-center truncate mb-1">
                        {data.currencyValue}
                        {data.balance}
                      </h1>
                      <p className="text-center truncate font-[sfpro-Regular] text-[12px] mb-1 p-2">
                        {data.itemDetails.billTo}
                      </p>
                      <p className="text-center font-[sfpro-Regular] text-[12px]">
                        {data.itemDetails.billDate}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="h-[30vh] flex justify-center font-[sfpro-Regular] text-[#000]/50 items-center">
              NO INVOICE FOUND
            </div>
          )}
        </div>
        <div>
          <div className="flex justify-between float-right w-[78%] md:w-[72%] lg:w-[53%] xl:w-[40%]">
            <div
              className={`${
                !getMyItem?.length == null || !getMyItem?.length == 0
                  ? "text-[#009e74]"
                  : "text-[#009e74]/30"
              } w-[48%] h-[40px] rounded-3xl flex items-center justify-evenly border-2`}
            >
              {!getMyItem?.length == null || !getMyItem?.length == 0 ? (
                <CSVLink
                  data={csvData}
                  className="flex w-[100%] justify-center "
                >
                  <button
                    id="TestexportInvoice"
                    disabled={
                      !getMyItem?.length == null || !getMyItem?.length == 0
                        ? false
                        : true
                    }
                    className="text-[#009e74] w-[90%] text-[10px] flex justify-evenly"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-[15px] "
                      width="16.772"
                      height="20.924"
                      viewBox="0 0 16.772 20.924"
                    >
                      <g id="download-arrow" transform="translate(-53.357)">
                        <g
                          id="Group_13"
                          data-name="Group 13"
                          transform="translate(53.357)"
                        >
                          <path
                            id="Path_5"
                            data-name="Path 5"
                            d="M69.3,466.114H54.193a.839.839,0,0,0-.836.836v1.116a.839.839,0,0,0,.836.836h15.1a.839.839,0,0,0,.836-.836V466.95A.825.825,0,0,0,69.3,466.114Z"
                            transform="translate(-53.357 -447.979)"
                            fill="#009e74"
                          />
                          fill="#ffa726"
                          <path
                            id="Path_6"
                            data-name="Path 6"
                            d="M106.47,16.638a.835.835,0,0,0,.589.247.825.825,0,0,0,.589-.247l5.721-5.721a.843.843,0,0,0,0-1.185l-.792-.792a.843.843,0,0,0-1.185,0l-2.941,2.944V.836A.839.839,0,0,0,107.616,0H106.5a.835.835,0,0,0-.836.836V11.888L102.72,8.944a.843.843,0,0,0-1.185,0l-.792.792a.843.843,0,0,0,0,1.185Z"
                            transform="translate(-98.666 0)"
                            fill="#009e74"
                          />
                        </g>
                      </g>
                    </svg>
                    EXPORT INVOICE
                  </button>
                </CSVLink>
              ) : (
                <button
                  className={`text-[#009e74]/30 w-[90%] text-[10px] flex justify-evenly ${
                    !getMyItem?.length == null || !getMyItem?.length == 0
                      ? "cursor-pointer"
                      : "cursor-not-allowed"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-[15px] text-[#009e74]/30"
                    width="16.772"
                    height="20.924"
                    viewBox="0 0 16.772 20.924"
                  >
                    <g id="download-arrow" transform="translate(-53.357)">
                      <g
                        id="Group_13"
                        data-name="Group 13"
                        transform="translate(53.357)"
                      >
                        <path
                          id="Path_5"
                          data-name="Path 5"
                          d="M69.3,466.114H54.193a.839.839,0,0,0-.836.836v1.116a.839.839,0,0,0,.836.836h15.1a.839.839,0,0,0,.836-.836V466.95A.825.825,0,0,0,69.3,466.114Z"
                          transform="translate(-53.357 -447.979)"
                          fill="currentColor"
                        />
                        <path
                          id="Path_6"
                          data-name="Path 6"
                          d="M106.47,16.638a.835.835,0,0,0,.589.247.825.825,0,0,0,.589-.247l5.721-5.721a.843.843,0,0,0,0-1.185l-.792-.792a.843.843,0,0,0-1.185,0l-2.941,2.944V.836A.839.839,0,0,0,107.616,0H106.5a.835.835,0,0,0-.836.836V11.888L102.72,8.944a.843.843,0,0,0-1.185,0l-.792.792a.843.843,0,0,0,0,1.185Z"
                          transform="translate(-98.666 0)"
                          fill="currentColor"
                        />
                      </g>
                    </g>
                  </svg>
                  EXPORT INVOICE
                </button>
              )}
            </div>
            <div className="w-[48%] rounded-3xl border-2 text-[12px] bg-[#009e74] text-white text-center flex items-center justify-center">
              <button
                id="newInvoice"
                className="text-[10px]"
                onClick={homePageNewInvoice}
              >
                NEW INVOICE
              </button>
              
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
