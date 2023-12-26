import React, { useEffect, useState } from "react";
import SideButton from "../../billHive/side-button/SideButton";
import Router from "next/router";
import Image from "next/image";
import PdfProvider from "../../billHive/pdf-provider/pdfProvider";
import PdfContent from "../../billHive/pdf-content/PdfContent";
import { PDFViewer } from "@react-pdf/renderer";
import PouchDB from "pouchdb";
import Service from "../../../services/billHive/services";
function SideBar(props) {
  const {
    detailsLabelCallBack,
    detailsCallback,
    itemListCallBack,
    previewDisable,
    imageData,
    taxToGstState,
    perToAmount,
    finalCurrencySymbol,
    finalCurrencyId,
    balanceAmount,
    editId,
    backGroundcolor,
    pdfDownloadState,
    isDefault,
    isEdit,
    colorValue,
    pdfDownLoad,
    openCurrency,
    storeDetails,
    isStore,
    isdiscountNeed,
    isTaxNeed,
    isShippingNeed,
  } = props;


  const [bgColor, setBgColor] = useState("#FFA726");
  const [myHistory, setMyHistory] = useState({});
  const [isInvoiceDefault, setIsInvoiceDefault] = useState(isDefault);
  const [isPdfDownload, setIsPdfDownload] = useState(false);
  const chgColorClk = (colorCode) => {
    setBgColor(colorCode);
    setIsInvoiceDefault(true);
    colorValue(colorCode);
  };
  const previewRoute = () => {
    const userDetails = {
      itemList: itemListCallBack,
      itemDetails: detailsCallback,
      bgColorValue: bgColor,
      imageUrl: imageData,
      taxTGst: taxToGstState,
      perTAmount: perToAmount,
      detailsLabel: detailsLabelCallBack,
      currencySymbol: finalCurrencySymbol,
      editInvoice: editId,
      isEdit: isEdit,
      isDownloaded: pdfDownloadState,
      discountNeed: isdiscountNeed,
      taxNeed: isTaxNeed,
      shippingNeed: isShippingNeed,
    };
    Router.push({
      pathname: "/billHive/preview-page/PreViewPage",
    });
    localStorage.setItem('userDetails',JSON.stringify(userDetails) )
  };
  const downloadPdf = (data) => {
    setIsPdfDownload(data);
    pdfDownLoad(data);
  };

  const historyRoute = () => {
    const historyList = [];
    const userDetails = {
      itemList: itemListCallBack,
      itemDetails: detailsCallback,
      colorValue: bgColor,
      uploadImage: imageData,
      taxTGst: taxToGstState,
      perTAmount: perToAmount,
      detailsLabel: detailsLabelCallBack,
      currencyValue: finalCurrencySymbol,
      balance: balanceAmount,
      isDownloaded: isPdfDownload,
      discountNeed: isdiscountNeed,
      taxNeed: isTaxNeed,
      shippingNeed: isShippingNeed,
    };
    // const isHistoryAvail = JSON.parse(
    //   localStorage.getItem("billHiveInvoiceHistory")
    // );
    // if (isHistoryAvail) {
    //   if (isEdit) {
    //     userDetails.isDownloaded = isHistoryAvail[editId]?.isDownloaded;
    //     isHistoryAvail.splice(editId, 1, userDetails);
    //     historyList.push(...isHistoryAvail);
    //   } else {
    //     historyList.push(...isHistoryAvail, userDetails);
    //   }
    // } else {
    //   historyList.push(userDetails);
    // }
    // localStorage.setItem("billHiveInvoiceHistory", JSON.stringify(historyList));

    var db = new PouchDB("BillHive");
    db.get("BillHiveHistory", function (err, doc) {
      if (err) {
        historyList.push(userDetails);
        var doc = {
          _id: "BillHiveHistory",
          data: historyList,
        };
        db.put(doc);
      }
      if (isEdit) {
        // userDetails.isDownloaded = doc[editId]?.isDownloaded;
        doc.data.splice(editId, 1, userDetails);
        historyList.push(...doc.data);
      } else {
        historyList.push(...doc.data, userDetails);
      }
      db.put(
        {
          _id: doc._id,
          data: historyList,
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
      pathname: "/billHive/history-page/HistoryPage",
      query: { data: JSON.stringify(userDetails) },
    });
  };

  const historyRouteView = () => {
    const userDetails = {
      itemList: itemListCallBack,
      itemDetails: detailsCallback,
      colorValue: bgColor,
      uploadImage: imageData,
      taxTGst: taxToGstState,
      perTAmount: perToAmount,
      detailsLabel: detailsLabelCallBack,
      currencyValue: finalCurrencySymbol,
      balance: balanceAmount,
    };
    Router.push({
      pathname: "/billHive/history-page/HistoryPage",
    });
  };
  const currencyPopUpOpen = () => {
    openCurrency(true);
  };
  const colorPickerChange = (event) => {
    setIsInvoiceDefault(true);
    if (event.target.value !== "#ffffff") {
      setBgColor(event.target.value);
      colorValue(event.target.value);
    } else {
      alert("White color is not allowed");
      setBgColor("#FFA726");
      colorValue("#FFA726");
    }
  };

  const saveDefault = () => {
    const userDetails = {
      itemList: itemListCallBack,
      itemDetails: detailsCallback,
      bgColorValue: bgColor,
      uploadImage: imageData,
      taxTGst: taxToGstState,
      perTAmount: perToAmount,
      detailsLabel: detailsLabelCallBack,
      currencyValue: finalCurrencySymbol,
      balance: balanceAmount,
      isDownloaded: false,
      discountNeed: isdiscountNeed,
      taxNeed: isTaxNeed,
      shippingNeed: isShippingNeed,
    };
    storeDetails(userDetails);
    isStore(true);
  };

  const OnNavigateToPDFRender = () => {
    navigation("/pdfRender", {
      state: {
        itemList: itemListCallBack,
        itemDetails: detailsCallback,
        bgColorValue: bgColor,
        imageUrl: imageData,
        taxTGst: taxToGstState,
        perTAmount: perToAmount,
        detailsLabel: detailsLabelCallBack,
        currencySymbol: finalCurrencySymbol,
        discountNeed: isdiscountNeed,
        taxNeed: isTaxNeed,
        shippingNeed: isShippingNeed,
      },
    });
  };

  useEffect(() => {
    // const getDefault = JSON.parse(localStorage.getItem("billHiveDefault"));
    // const getHistory = JSON.parse(
    //   localStorage.getItem("billHiveInvoiceHistory")
    // );
    (async function Change() {
      const getHistory = await Service.getBillHiveHistory();
      const getDefault = await Service.getBillHiveDefaultData();
      setMyHistory(getHistory.data);
      if (getDefault.data == null) {
        if (!isDefault) {
          setIsInvoiceDefault(!isDefault);
        } else {
          setIsInvoiceDefault(props?.isDefault);
        }
      } else {
        setIsInvoiceDefault(!isDefault);
        setIsPdfDownload(pdfDownloadState);
      }
      if (pdfDownloadState) {
        setIsPdfDownload(pdfDownloadState);
      }
      if (backGroundcolor) {
        setBgColor(backGroundcolor);
      }
    })();
  }, [backGroundcolor, props]);

  return (
    <div>
      <div>
        <div className="sm:hidden hidden md:block lg:block">
          <div
            style={{ backgroundColor: bgColor }}
            className={`mb-2 w-[43%] md:w-[40%] lg:w-[50%] xl:w-[36%] h-[38px] flex items-center justify-evenly bg-[${bgColor}] opacity-40 rounded-lg`}//SEND VIA MAIL
          >
            <Image
              width={"15%"}
              height={"38px"}
              className=""
              src="/icons/email.svg"
            />
            <SideButton btnValue="COMING SOON" className="text-[#FFFFFF]" />
          </div>
        </div>
        <div className="sm:hidden hidden md:block lg:block">
          {previewDisable ? (
            <div
              className={`mb-2 w-[43%] md:w-[40%] lg:w-[50%] xl:w-[36%] h-[38px] flex items-center justify-evenly bg-[#232E38] ${detailsCallback.billFrom === "" || detailsCallback.billTo === ""
                  ? "opacity-40"
                  : "opacity-90"
                } rounded-lg`}
            >
              <Image
                width="15%"
                height="38px"
                className={` ${detailsCallback.billFrom === ""
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                  }`}
                src="/icons/eye.svg"
              />
              <button
                id="previewButton"
                disabled={
                  !!(
                    detailsCallback.billFrom === "" ||
                    detailsCallback.billTo === ""
                  )
                }
                className={`w-[65%] text-[#FFFFFF] text-[12px] font-[sfpro-Regular] h-[35px] ${detailsCallback.billFrom === "" || detailsCallback.billTo === ""
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                  }`}
                onClick={previewRoute}
              >
                PREVIEW BILL
              </button>
            </div>
          ) : null}
        </div>
        <div
          className={`mb-10 w-[10rem] md:w-[40%] lg:w-[50%] xl:w-[36%] md:h-[38px] sm:h-[50px] h-[50px] flex items-center justify-evenly bg-[#FFFFFF] ${detailsCallback.billFrom === "" || detailsCallback.billTo === ""
              ? "opacity-40"
              : null
            } rounded-lg`}
        >
          {" "}
          <PdfProvider
            ButtonComponent={(props) => (
              <button
                id="PDFdownload"
                style={{ color: bgColor }}
                onClick={props.onClick}
                disabled={detailsCallback.billFrom === ""}
                className={`w-[73%] font-semibold text-[${bgColor}] ${detailsCallback.billFrom === "" ||
                    detailsCallback.billTo === ""
                    ? "cursor-not-allowed"
                    : null
                  } text-[12px] h-[25px] flex justify-between items-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16.772"
                  height="15.924"
                  viewBox="0 0 16.772 20.924"
                  className={`cursor-pointer ${detailsCallback.billFrom === "" ||
                      detailsCallback.billTo === ""
                      ? "cursor-not-allowed"
                      : null
                    }`}
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
                        fill={bgColor}
                      />
                      <path
                        id="Path_6"
                        data-name="Path 6"
                        d="M106.47,16.638a.835.835,0,0,0,.589.247.825.825,0,0,0,.589-.247l5.721-5.721a.843.843,0,0,0,0-1.185l-.792-.792a.843.843,0,0,0-1.185,0l-2.941,2.944V.836A.839.839,0,0,0,107.616,0H106.5a.835.835,0,0,0-.836.836V11.888L102.72,8.944a.843.843,0,0,0-1.185,0l-.792.792a.843.843,0,0,0,0,1.185Z"
                        transform="translate(-98.666 0)"
                        fill={bgColor}
                      />
                    </g>
                  </g>
                </svg>
                DOWNLOAD
              </button>
            )}
            disabled={
              !!(
                detailsCallback.billFrom === "" || detailsCallback.billTo === ""
              )
            }
            pdfDocument={
              detailsCallback.billFrom ? (
                <PdfContent
                  {...props}
                  location={{
                    itemList: itemListCallBack,
                    itemDetails: detailsCallback,
                    bgColorValue: bgColor,
                    imageUrl: imageData,
                    taxTGst: taxToGstState,
                    perTAmount: perToAmount,
                    detailsLabel: detailsLabelCallBack,
                    currencySymbol: finalCurrencySymbol,
                    discountNeed: isdiscountNeed,
                    taxNeed: isTaxNeed,
                    shippingNeed: isShippingNeed,
                  }}
                />
              ) : (
                // <PdfRender/>
                <></>
              )
            }
            invoiceId={detailsCallback}
            isdwnLoad={(data) => downloadPdf(data)}
          ></PdfProvider>
        </div>
        <div className="sm:hidden hidden md:block lg:block">
          {previewDisable ? (
            <div>
              {isInvoiceDefault ? (
                <div
                  id="saveDefault"
                  style={{ color: bgColor }}
                  className="h-[40px] cursor-pointer font-[sfpro-Regular] text-[14px] lg:w-[41%] w-[40%] md:w-[46%] p-2 border-[#989EA4] border-b-[1px] mb-3"
                  onClick={saveDefault}
                >
                  SAVE DEFAULT
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <div className="sm:hidden hidden md:block lg:block">
        {previewDisable ? (
          <div className="text-[10px] pl-2 pb-3 font-[sfpro-Regular]">
            CHANGE THEME
          </div>
        ) : null}
      </div>
      <div className="sm:hidden hidden md:block lg:block">
        {previewDisable ? (
          <div className="w-[38%]  md:x-[36%] lg:w-[43%] xl:w-[32%] h-[58px] flex justify-evenly flex-wrap mb-[15px] overflow-auto scrollBar">
            <button
              id="color1"
              className="w-[23px] h-[23px] rounded-full bg-[#42A5F5]"
              onClick={() => chgColorClk("#42A5F5")}
            >
              {bgColor == "#42A5F5" ?
                <Image height={15} width={15} src="/icons/check.svg" /> : null}
            </button>
            <button
              id="color2"
              className="w-[23px] h-[23px] rounded-full bg-[#66BB6A]"
              onClick={() => chgColorClk("#66BB6A")}
            >
              {bgColor == "#66BB6A" ?
                <Image height={15} width={15} src="/icons/check.svg" /> : null}
            </button>
            <button
              id="color3"
              className="w-[23px] h-[23px] rounded-full bg-[#FFA726]"
              onClick={() => chgColorClk("#FFA726")}
            >
              {bgColor == "#FFA726" ?
                <Image height={15} width={15} src="/icons/check.svg" /> : null}
            </button>
            <button
              id="color4"
              className="w-[23px] h-[23px] rounded-full bg-[#EF5350]"
              onClick={() => chgColorClk("#EF5350")}
            >
              {bgColor == "#EF5350" ?
                <Image height={15} width={15} src="/icons/check.svg" /> : null}
            </button>
            <button
              id="color5"
              className="w-[23px] h-[23px] rounded-full bg-[#AB47BC]"
              onClick={() => chgColorClk("#AB47BC")}
            >
              {bgColor == "#AB47BC" ?
                <Image height={15} width={15} src="/icons/check.svg" /> : null}
            </button>
            <button
              id="color6"
              className="w-[23px] h-[23px] rounded-full bg-[#EC407A]"
              onClick={() => chgColorClk("#EC407A")}
            >
              {bgColor == "#EC407A" ?
                <Image height={15} width={15} src="/icons/check.svg" /> : null}
            </button>
            <button
              id="color7"
              className="w-[23px] h-[23px] rounded-full bg-[#7E57C2]"
              onClick={() => chgColorClk("#7E57C2")}
            >
              {bgColor == "#7E57C2" ?
                <Image height={15} width={15} src="/icons/check.svg" /> : null}
            </button>
            <button
              id="color8"
              className="w-[23px] h-[23px] rounded-full bg-[#009688]"
              onClick={() => chgColorClk("#009688")}
            >
              {bgColor == "#009688" ?
                <Image height={15} width={15} src="/icons/check.svg" /> : null}
            </button>
            <button
              className="w-[23px] h-[23px] rounded-full bg-[#FF7043]"
              onClick={() => chgColorClk("#FF7043")}
            >
              {bgColor == "#FF7043" ?
                <Image height={15} width={15} src="/icons/check.svg" /> : null}
            </button>
            <button
              id="colorBlack"
              className="w-[23px] h-[23px] rounded-full bg-[#232E38]"
              onClick={() => chgColorClk("#232E38")}
            >
              {bgColor == "#232E38" ?
                <Image height={15} width={15} src="/icons/check.svg" /> : null}
            </button>
          </div>
        ) : null}
      </div>
      <div>
        {previewDisable ? (
          <div className="h-[75px] flex flex-col justify-between">
            <div className="sm:hidden hidden md:block lg:block">
              <input
                className="w-[17%] lg:w-[21%] xl:w-[15%] font-[sfpro-Regular] pl-2 text-[12px] bg-transparent"
                value="Currency:"
              />
              <select
                id="currencyPopUp"
                className={
                  "text-[12px] bg-transparent font-[sfpro-Regular] cursor-pointer"
                }
                onClick={currencyPopUpOpen}
              >
                <option>
                  {finalCurrencyId}({finalCurrencySymbol})
                </option>
              </select>
            </div>
            <div
              id="history"
              style={{ backgroundColor: bgColor }}
              className={`lg:w-[40%] w-[10rem] sm:h-[50px] h-[50px] rounded-lg font-[sfpro-Regular] text-white md:h-[38px] flex justify-evenly items-center ${detailsCallback.billFrom === "" || detailsCallback.billTo === ""
                  ? "opacity-40"
                  : "opacity-90"
                }`}
              onClick={
                detailsCallback.billFrom === "" || detailsCallback.billTo === ""
                  ? historyRouteView
                  : historyRoute
              }
            >
              {/* <img className="h-[19px]" src="/icons/history (1).svg" /> */}
              <Image
                width="20%"
                height="24px"
                className="h-[24px] w-[15%]"
                src="/icons/history (1).svg"
              />
              <button className={"text-[14px] w-[50%] cursor-pointer pl-1"}>
                HISTORY
              </button>
              {!myHistory?.length == null || !myHistory?.length == 0 ? (
                <span className="w-[15%] font-[sfpro-Regular] text-center bg-white text-black h-[24px] rounded-full">
                  {myHistory.length}
                </span>
              ) : null}
            </div>
          </div>
        ) : null}
        {/* {detailsCallback.billFrom === "" || detailsCallback.billTo === "" ? null :  <PDFViewer height={"800px"} width={"650px"} showToolbar={true}>
            <PdfContent  location={{
                    itemList: itemListCallBack,
                    itemDetails: detailsCallback,
                    bgColorValue: bgColor,
                    imageUrl: imageData,
                    taxTGst: taxToGstState,
                    perTAmount: perToAmount,
                    detailsLabel: detailsLabelCallBack,
                    currencySymbol: finalCurrencySymbol,
                    discountNeed: isdiscountNeed,
                    taxNeed: isTaxNeed,
                    // cessNeed: isCessNeed,
                    shippingNeed: isShippingNeed,
                  }}/>
          </PDFViewer> } */}
      </div>
    </div>
  );
}

export default SideBar;
