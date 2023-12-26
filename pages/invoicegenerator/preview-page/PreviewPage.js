import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Router from "next/router";
import Image from "next/image";
import SideBar from "../../../components/invoicegenerator/side-bar/SideBar";
import BtoolsFooter from "../../../container/72BTfooter/BToolsFooter";
import BtoolsHeader from "../../../container/72BTheader/BToolsHeader";

const PreView = ({ users }) => {
  const [itemList, setItemList] = useState([
    {
      item: "",
      quality: 1,
      rate: 0,
      iGst: 0,
      sGst: 0,
      cGst: 0,
      amount: 0,
      netTotal: 0,
    },
  ]);
  const [currencySymbol, setCurrencySymbol] = useState("₹");
  const [isPdfDownload, setIsPdfDownload] = useState(false);
  const [IsDiscount, setIsDiscount] = useState(false);
  const [isCess, setIsCess] = useState(false);
  const [isTax, setIsTax] = useState(false);
  const [isShipping, setIsShipping] = useState(false);
  const [location,setLocation] = useState({})
  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNum: "",
    billFrom: "",
    billTo: "",
    sellerGst: "",
    buyerGst: "",
    shipTo: "",
    shipOrBill: "",
    billDate: "",
    dueDate: "",
    paymentTerms: "",
    poNumber: "",
    notes: "",
    termsNCondition: "",
    discount: "",
    Igst: "",
    sGst: "",
    cGst: "",
    cess: "",
    shipping: "",
    amountPaid: "",
    balanceDue: "",
  });
  const monthArray = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const current = new Date();
  const month = current.getMonth();
  const day = current.getDate();
  const year = current.getFullYear();
  const newdate =
    day < 10
      ? monthArray[month] + " " + "0" + day + "," + " " + year
      : monthArray[month] + " " + day + "," + " " + year;
  function dateFormatter(date) {
    const bill = new Date(date);
    const month = bill.getMonth();
    const day = bill.getDate();
    const year = bill.getFullYear();
    const billDate =
      day < 10
        ? monthArray[month] + " " + "0" + day + "," + " " + year
        : monthArray[month] + " " + day + "," + " " + year;
    return billDate;
  }
  const [bgColorCode, setBgColorCode] = useState("#FFA726");
  const [image, setImage] = useState({
    profilePic: null,
    ImageUploaded: false,
  });
  const [percentToAmount, setPercentToAmount] = useState({
    discountPercentTOAmount: true,
    taxPercentTOAmount: true,
    sGstPercentTOAmount: true,
    cGstPercentTOAmount: true,
    cessPercentToAmount: true,
  });
  const [taxToGst, setTaxToGst] = useState(true);
  const [labelDetails, setLabelDetails] = useState({
    labelInvoice: "INVOICE",
    labelBillFrom: "Bill From",
    labelBillTo: "Bill To",
    labelShipTO: "Ship To",
    labelSellerGst: "SELLER GSTIN",
    labelBuyerGst: "BUYER GSTIN",
    labelShipOrBill: "Is Shipping Address Similar to Billing Address?",
    labelDate: "Date",
    labelPaymentTerms: "Payment Terms",
    labelDueDate: "Due Date",
    labelPoNum: "PO Number",
    labelItem: "ITEM(HSN/SAC)",
    labelQuantity: "QUANTITY",
    labelTabelTotal: "TOTAL",
    labelRate: "RATE",
    labelAmount: "TOTAL",
    labelNetTotal: "NET TOTAL",
    labelNotes: "Notes",
    labelTermsNCon: "Terms & Condition",
    labelSubTotal: "SUB TOTAL",
    labelDiscount: "DISCOUNT",
    labelIgst: "IGST",
    labelCess: "CESS",
    labelSGst: "SGST",
    labelCGst: "CGST",
    labelShipping: "SHIPPING",
    labelTotal: "TOTAL",
    labelAmountPaid: "AMOUNT PAID",
    labelBalanceDue: "BALANCE DUE",
  });

  const subtotal = itemList
    .reduce((total, item) => total + item.quality * item.rate, 0)
    .toFixed(2);

  const quantityTotal = itemList.reduce(
    (total, item) => Number(total) + Number(item.quality),
    0
  );

  const NetAmountTotal = itemList
    .reduce((total, item) => Number(total) + Number(item.netTotal), 0)
    .toFixed(2);

  const discountAmount =
    Number(subtotal) -
    (IsDiscount
      ? percentToAmount.discountPercentTOAmount
        ? Number((invoiceDetails.discount * subtotal) / 100)
        : Number(invoiceDetails.discount)
      : null);
      const percentageTotal = itemList.reduce(
        (total, item) => Number(total) + Number(
          (taxToGst
            ? 
              Number(item.amount / 100) * Number(item.iGst)
            : 
              (Number(item.amount) / 100) * Number(item.cGst) +
              (Number(item.amount) / 100) * Number(item.sGst))
        ),
        0
      )
      .toFixed(2);
  const gstPercentageTotal = (Number(percentageTotal) + Number(discountAmount))

  const cessAmount =
    Number(gstPercentageTotal) +
    (isShipping ? Number(invoiceDetails.shipping) : null) +
    (isCess
      ? percentToAmount.cessPercentToAmount
        ? Number((invoiceDetails.cess * NetAmountTotal) / 100)
        : Number(invoiceDetails.cess)
      : null);

      const sgstTotal = itemList.reduce(
        (total, item) => Number(total) + Number(
              (Number(item.amount) / 100) * Number(item.sGst)
        ),
        0
      )
      const cGstTotal = itemList.reduce(
        (total, item) => Number(total) + Number(
              (Number(item.amount) / 100) * Number(item.cGst)
        ),
        0
      )
      const IgstTotal = itemList.reduce(
        (total, item) => Number(total) + Number(
              (Number(item.amount) / 100) * Number(item.iGst)
        ),
        0
      )
  const total = Number(cessAmount)

  const ref = React.createRef();
  const options = {
    orientation: "landscape",
    unit: "in",
    format: [7.2, 7.5],
  };
  const homePageRoute = () => {
    const userDetails = {
      itemList,
      itemDetails: invoiceDetails,
      taxTGst: taxToGst,
      perTAmount: percentToAmount,
      uploadImage: image,
      detailsLabel: labelDetails,
      currencyValue: currencySymbol,
      isEdit: location.isEdit,
      id: location.editInvoice,
      colorValue: bgColorCode,
      isDownloaded: isPdfDownload,
      discountNeed: IsDiscount,
      taxNeed: isTax,
      shippingNeed: isShipping,
    };
    Router.push({
      pathname: "/invoicegenerator",
      query: { data: JSON.stringify(userDetails) },
    });
  };
  useEffect(() => {
    // const location = router.query.data ? JSON.parse(router.query.data) : "";
    let data = JSON.parse(localStorage.getItem('userDetails')?localStorage.getItem('userDetails'):'')
    setLocation(JSON.parse(localStorage.getItem('userDetails')?localStorage.getItem('userDetails'):''))
    if (data) {
      setInvoiceDetails(data.itemDetails);
      setItemList(data.itemList);
      setIsPdfDownload(data.isDownloaded);
      setBgColorCode(data.bgColorValue);
      setImage({
        ...image,
        ImageUploaded: data.imageUrl?.ImageUploaded,
        profilePic: data.imageUrl?.profilePic,
      });
      setTaxToGst(data.taxTGst);
      setPercentToAmount({
        ...percentToAmount,
        discountPercentTOAmount: data.perTAmount.discountPercentTOAmount,
        taxPercentTOAmount: data.perTAmount.taxPercentTOAmount,
        sGstPercentTOAmount: data.perTAmount.sGstPercentTOAmount,
        cGstPercentTOAmount: data.perTAmount.cGstPercentTOAmount,
        cessPercentToAmount: data.perTAmount.cessPercentToAmount,
      });
      setLabelDetails({
        ...labelDetails,
        labelInvoice: data.detailsLabel.labelInvoice,
        labelAmount: data.detailsLabel.labelAmount,
        labelAmountPaid: data.detailsLabel.labelAmountPaid,
        labelBalanceDue: data.detailsLabel.labelBalanceDue,
        labelBillFrom: data.detailsLabel.labelBillFrom,
        labelBillTo: data.detailsLabel.labelBillTo,
        labelCGst: data.detailsLabel.labelCGst,
        labelDate: data.detailsLabel.labelDate,
        labelDiscount: data.detailsLabel.labelDiscount,
        labelDueDate: data.detailsLabel.labelDueDate,
        labelItem: data.detailsLabel.labelItem,
        labelNotes: data.detailsLabel.labelNotes,
        labelPaymentTerms: data.detailsLabel.labelPaymentTerms,
        labelPoNum: data.detailsLabel.labelPoNum,
        labelQuantity: data.detailsLabel.labelQuantity,
        labelRate: data.detailsLabel.labelRate,
        labelSGst: data.detailsLabel.labelSGst,
        labelShipTO: data.detailsLabel.labelShipTO,
        labelSubTotal: data.detailsLabel.labelSubTotal,
        labelTax: data.detailsLabel.labelTax,
        labelTermsNCon: data.detailsLabel.labelTermsNCon,
        labelTotal: data.detailsLabel.labelTotal,
      });
      setCurrencySymbol(data.currencySymbol);
      setIsDiscount(data.discountNeed);
      setIsCess(data.cessNeed);
      setIsTax(data.taxNeed);
      setIsShipping(data.shippingNeed);
    }
  }, []);
  return (
    <div className="flex flex-col h-[100vh]  min-w-min lg:w-full">
      <div className="h-[5vh] pl-6 mb-2">
        {/* <Image width="86%" height="40px" src="/images/invoice-Logo.png" /> */}
        <BtoolsHeader Src="/images/GST One Pro.png" Height="35" Width="78" />
      </div>
      <div className="bg-[#E6E9ED] border-t-2 border-[#707070]/5 flex justify-around p-6">
        <div
          id="homeRoute"
          className="bg-black/80 cursor-pointer h-[30px] w-[30px] rounded-full  justify-center items-center absolute left-[45px] top-[85px] flex md:flex"
          onClick={homePageRoute}
        >
          <Image
            width="15%"
            height="14px"
            className="h-[14px] cursor-pointer"
            src="/icons/back-arrow.svg"
          />
        </div>
        <div className="flex flex-col w-64 lg:flex lg:flex-row  md:w-[80%]">
          <div className="w-full  lg:w-[67%] lg:bg-white md:bg-white"ref={ref} >
            <div
              className={`min-h-[110px] max-h-[150px] opacity-[1] p-3 flex justify-between`}
            >
              {image.ImageUploaded ? (
                <section className="w-[25%]">
                  <img
                    src={image.profilePic}
                    alt=""
                    id="profilePic"
                    className="h-[135px] w-[100%] rounded-sm"
                  />
                </section>
              ) : (
                <div className="w-[25%]"></div>
              )}
              <div className="h-[130px] pr-10 flex flex-col items-end justify-center w-[60%]">
                <p className="float-right text-[16px] font-[interSemiBold] truncate w-[70%] md:w-[30%] text-right">
                  {labelDetails.labelInvoice}
                </p>
                <div className="h-[35px] w-[63%] flex justify-between items-center rounded-lg p-3">
                  <input
                    className="w-[100%] focus:outline-none text-[#777777] bg-transparent text-end font-[sf-pro-medium] text-[12px] "
                    placeholder="Bill No"
                    value={`# ${invoiceDetails.invoiceNum}`}
                    name="invoiceNum"
                  />
                </div>
              </div>
            </div>
            <div className=" flex justify-between pb-10  md:pr-2">
              <div className="h-[20%] w-[45%] md:w-[50%] pl-1 md:pl-5 flex flex-wrap justify-evenly pt-4">
                <div className="  border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[100%] p-3">
                  <input
                    className="w-[100%] h-[20px] truncate text-[#707070] focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                    value={`${labelDetails.labelBillFrom}:`}
                    name="labelBillFrom"
                  />
                  <p
                    className="w-[100%] break-words focus:outline-none font-bold rounded-md font-[sf-pro-medium] text-[12px]"
                    value={invoiceDetails.billFrom}
                    name="billFrom"
                    placeholder="Who is this invoice from? (required)"
                  >
                    {invoiceDetails.billFrom.split("\n")[0]}
                  </p>
                  {invoiceDetails.billFrom.split("\n").map((value, index) => {
                    return (
                      <p
                        className="w-[60%] break-words focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                        value={invoiceDetails.billFrom}
                        name="billFrom"
                        placeholder="Who is this invoice from? (required)"
                      >
                        {index > 0 ? value : null}
                      </p>
                    );
                  })}
                </div>
                {/* <input
                  className="w-[45%] h-[40px] focus:outline-none bg-transparent"
                  disabled
                /> */}
                <div className=" border-[#707070]/25 mt-4 rounded-md flex flex-col text-[12px] w-[45%]">
                  <input
                    className="w-[100%] truncate h-[20px] text-[#707070] focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                    value={`${labelDetails.labelBillTo}:`}
                    name="labelBillTo"
                  />
                  <p
                    className="w-[100%] break-words font-bold focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                    value={invoiceDetails.billTo}
                    name="billTo"
                    placeholder="Who is this invoice from? (required)"
                  >
                    {invoiceDetails.billTo.split("\n")[0]}
                  </p>
                  {invoiceDetails.billTo.split("\n").map((value, index) => {
                    return (
                      <p
                        className="w-[100%] break-words focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                        value={invoiceDetails.billTo}
                        name="billTo"
                        placeholder="Who is this invoice from? (required)"
                      >
                        {index > 0 ? value : null}
                      </p>
                    );
                  })}
                </div>
                <div
                  className={` border-[#707070]/25 mt-4 rounded-md flex flex-col w-[48%] md:w-[45%] p-1`}
                >
                  <input
                    className={`w-[100%] truncate h-[20px] focus:outline-none ${
                      invoiceDetails.shipTo ? "text-[#707070]" : "text-white"
                    } rounded-md font-[sf-pro-medium] text-[12px]`}
                    value={`${labelDetails.labelShipTO}:`}
                    name="labelShipTO"
                  />
                  <p
                    className={`w-[100%] break-words font-bold focus:outline-none rounded-md font-[sf-pro-medium] text-[12px] ${
                      invoiceDetails.shipTo ? "text-black" : "text-white"
                    }`}
                    value={invoiceDetails.shipTo}
                    name="shipTo"
                    placeholder="(Optional)"
                  >
                    {invoiceDetails.shipTo.split("\n")[0]}
                  </p>
                  {invoiceDetails.shipTo.split("\n").map((value, index) => {
                    return (
                      <p
                        className="w-[100%] break-words focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                        value={invoiceDetails.shipTo}
                        name="shipTo"
                        placeholder="(Optional)"
                      >
                        {index > 0 ? value : null}
                      </p>
                    );
                  })}

                </div>
              </div>

              <div className="w-[50%] lg:w-[80%] xl:w-[65%] flex flex-col items-end pt-4  md:pr-5">
                {invoiceDetails.billDate ? (
                  <div className=" border-[#707070]/25 flex justify-center rounded-md text-[12px] w-[130%] md:w-[85%] h-[33px] p-1">
                    <input
                      className="w-[50%] h-[20px] text-end text-[#707070] truncate focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                      value={`${labelDetails.labelDate}:`}
                      name="labelDate"
                    />
                    <input
                      className="w-[60%] h-[20px] text-end pr-5 focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                      value={dateFormatter(invoiceDetails.billDate)}
                      name="billDate"
                    />
                  </div>
                ) : null}
                {invoiceDetails.dueDate ? (
                  <div className=" border-[#707070]/25 flex justify-center rounded-md text-[12px] w-[130%] md:w-[85%] h-[33px] p-1">
                    <input
                      className="w-[50%] h-[20px] text-end text-[#707070] truncate focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                      value={`${labelDetails.labelDueDate}:`}
                      name="labelDate"
                    />
                    <input
                      className="w-[60%] h-[20px] text-end pr-5 focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                      value={dateFormatter(invoiceDetails.dueDate)}
                      name="billDate"
                    />
                  </div>
                ) : null}

                {invoiceDetails.paymentTerms ? (
                  <div className=" border-[#707070]/25 flex justify-center rounded-md text-[12px] w-[130%] md:w-[85%] p-1">
                    <input
                      className="w-[44%] h-[20px] text-end text-[#707070] truncate focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                      value={`${labelDetails.labelPaymentTerms}:`}
                      name="labelDate"
                    />
                    <p
                      className="w-[50%] break-words text-end pr-2 indent-5 focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                      value={invoiceDetails.paymentTerms}
                      name="billDate"
                    >
                      {invoiceDetails.paymentTerms}
                    </p>
                  </div>
                ) : null}
                {invoiceDetails.poNumber ? (
                  <div className=" border-[#707070]/25 flex justify-center rounded-md text-[12px] w-[130%] md:w-[85%] h-[33  px] p-1">
                    <input
                      className="w-[50%] h-[20px] text-end text-[#707070] truncate focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                      value={`${labelDetails.labelPoNum}:`}
                      name="labelDate"
                    />
                    <input
                      className="w-[60%] h-[20px] text-end pr-5 focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                      value={invoiceDetails.poNumber}
                      name="billDate"
                    />
                  </div>
                ) : null}
                {invoiceDetails.buyerGst ? (
                  <div className=" border-[#707070]/25 flex justify-center rounded-md text-[12px] w-[130%] md:w-[85%] h-[33  px] p-1">
                    <input
                      className="w-[50%] h-[20px] text-end text-[#707070] truncate focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                      value={`${labelDetails.labelBuyerGst}:`}
                      name="labelBuyerGst"
                    />
                    <input
                      className="w-[60%] h-[20px] text-end pr-5 focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                      value={invoiceDetails.buyerGst}
                      name="buyerGst"
                    />
                  </div>
                ) : null}
                {invoiceDetails.sellerGst ? (
                  <div className=" border-[#707070]/25 flex justify-center rounded-md text-[12px] w-[130%] md:w-[85%] h-[33px] p-1">
                    <input
                      className="w-[50%] h-[20px] text-end text-[#707070] truncate focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                      value={`${labelDetails.labelSellerGst}:`}
                      name="labelSellerGst"
                    />
                    <input
                      className="w-[60%] h-[20px] text-end pr-5 focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                      value={invoiceDetails.sellerGst}
                      name="sellerGst"
                    />
                  </div>
                ) : null}

                <div className="flex justify-between mb-2 w-[100%]  rounded-sm bg-[#f2f3f5]">
                  <input
                    className=" w-[50%] pl-4 truncate bg-[#f2f3f5] rounded-sm focus:outline-none font-bold text-[12px]"
                    value={`${labelDetails.labelBalanceDue}:`}
                    name="labelBalanceDue"
                  />
                  <p className=" w-[62%] text-end pr-6 h-[30px] rounded-md truncate">
                    <span className="font-bold text-[12px]">
                      {currencySymbol}
                    </span>
                    <span className="font-bold text-[12px] truncate">
                      {Number(
                        Math.round(total - invoiceDetails.amountPaid)
                      ).toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className=" min-h-[550px]">
              <div className="scroll-smooth w-full">
              <div className="flex bg-[#232E38] pl-4 pr-3  rounded-lg w-[650px] lg:w-[96%] md:w-[96%]  h-[30px] mx-auto">
                <div className="w-[10%] lg:w-[13%] xl:w-[10%]">
                  <input
                    value={"NO."}
                    className="w-[100%] focus:outline-none   pt-1 truncate bg-[#232E38] text-white text-[10px] rounded-tl-md rounded-bl-md font-[sf-pro-medium] h-[30px] pl-3"
                  />
                </div>
                <div className="w-[23%] lg:w-[39%] md:w-[39%] xl:w-[23%]">
                  <input
                    id="TestlabelItem"
                    className="w-[100%] md:w-[100%] focus:outline-none  bg-[#232E38] text-white rounded-tl-md rounded-bl-md text-[10px] font-[sf-pro-medium] h-[30px] pl-3"
                    value={labelDetails.labelItem}
                    name="labelItem"
                  />
                </div>
                <div className="w-[34%] lg:w-[10%] xl:w-[15%]">
                  <input
                    id="TestlabelRate"
                    className="w-[80%] focus:outline-none truncate bg-[#232E38] text-white text-end text-[10px] font-[sf-pro-medium] h-[30px]"
                    value={labelDetails.labelRate}
                    name="labelRate"
                  />
                </div>
                <div className="w-[29%] lg:w-[29%] xl:w-[15%]">
                  <input
                    id="TestlabelQuantity"
                    className="w-[80%] focus:outline-none pl-2 truncate bg-[#232E38] text-white text-end text-[10px] font-[sf-pro-medium] h-[30px]"
                    value={labelDetails.labelQuantity}
                    name="labelQuantity"
                  />
                </div>

                <div className="w-[26%] lg:w-[24%] xl:w-[15%]">
                  <input
                    id="TestlabelAmount"
                    className="w-[80%] focus:outline-none truncate bg-[#232E38] text-white text-end text-[10px] font-[sf-pro-medium] h-[30px]"
                    value={labelDetails.labelTabelTotal}
                    name="labelTabelTotal"
                  />
                </div>

                <div className="w-[26%] md:w-[17%] flex items-center">
                  {taxToGst ? (
                    <div className="flex items-center justify-end">
                      <input
                        id="TestlabelAmount"
                        className="w-[80%] pl-2 focus:outline-none truncate bg-[#232E38] text-white text-center text-[10px] font-[sf-pro-medium] h-[30px]"
                        value={labelDetails.labelIgst}
                        name="labelIgst"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center justify-end">
                      <input
                        id="TestlabelAmount"
                        className="w-[40%] focus:outline-none truncate bg-[#232E38] text-white text-center text-[10px] font-[sf-pro-medium] h-[30px]"
                        value={labelDetails.labelCGst}
                        name="labelCGst"
                      />
                      <input
                        id="TestlabelAmount"
                        className="w-[40%] focus:outline-none truncate bg-[#232E38] text-white text-center text-[10px] font-[sf-pro-medium] h-[30px]"
                        value={labelDetails.labelSGst}
                        name="labelSGst"
                      />
                    </div>
                  )}
                </div>
                <div className="w-[29%] lg:w-[24%] xl:w-[15%]">
                  <input
                    id="TestlabelAmount"
                    className="w-[80%] float-right focus:outline-none truncate bg-[#232E38] text-white text-center text-[10px] font-[sf-pro-medium] h-[30px]"
                    value={labelDetails.labelNetTotal}
                    name="labelNetTotal"
                  />
                </div>
              </div>
              {itemList.map((item, index) => {
                return (
                  <div
                    key={index}
                    id={index}
                    className=" pl-4 pb-1 border-[#707070]/25 pt-2 flex lg:w-[100%] group w-[650px] md:w-[100%]"
                  >
                    <input
                      className="w-[6%] text-right font-[sf-pro-medium] text-[12px]"
                      value={++index < 10 ? "0" + index : index}
                    />

                    <p className=" w-[47%] lg:w-[29%] md:w-[29%]  xl:w-[28%] ...break-all font-bold focus:outline-none p-2 pl-9 font-[sf-pro-medium] text-[12px] ">
                      <span className="font-bold" value={item.item} name="item">
                        {item.item.split("\n")[0]}
                      </span>
                      {item.item.split("\n").map((value, index) => {
                        return (
                          <span
                            className="text-[#777777] pl-1"
                            value={item.item}
                            name="item"
                            placeholder="Description of service or product..."
                          >
                            {index > 0 ? value : null}
                          </span>
                        );
                      })}
                    </p>
                    <div
                      id={index}
                      className="w-[12%] lg:w-[14%]   md:w-[14%] xl:w-[10%] mr-[10px] h-[33px] text-right  text-[12px] rounded-lg border-[#707070]/25 flex items-center"
                    >
                      <p className="w-[100%] h-[33px] font-[sf-pro-medium] p-2 text-[#232E38] border-[#707070]/25 focus:border-green-400 focus:outline-none rounded-lg text-right text-[12px]">
                        {currencySymbol}
                        {Number(item.rate).toFixed(2)}
                      </p>
                    </div>
                    <input
                      id="quality"
                      autoComplete="off"
                      type="number"
                      className="w-[9%] mr-[10px] pr-6 md:pr-1 text-center md:text-start  h-[33px] text-[12px] focus:border-green-400 font-[sf-pro-medium] text-[#232E38] p-2 focus:outline-none rounded-lg border-[#707070]/25"
                      value={item.quality}
                      name="quality"
                    />
                    <div className="w-[15%] md:w-[15%] mr-[10px] h-[33px] text-right text-[12px] focus:outline-none border-[#707070]/25 flex items-center">
                      <p className=" w-[100%] h-[33px] pr-5 font-[sf-pro-medium] text-[#232E38]  p-2 focus:border-green-400 rounded-lg text-right text-[12px] focus:outline-none">
                        {currencySymbol}
                        {Number(
                          (item.amount = item.quality * item.rate)
                        ).toFixed(2)}
                      </p>
                    </div>

                    <div className="w-[11%] lg:w-[18%] xl:w-[11%]">
                      {taxToGst ? (
                        <div className="w-[100%] mr-[15px] rounded-lg ">
                          <p
                            type="number"
                            className=" w-[100%] h-[34px] lg:ml-[17px] flex justify-center items-center p-1  text-[12px] font-[sf-pro-medium] text-[#232E38]"
                            value={item.iGst}
                            name="Igst"
                          >{`${item.iGst}%`}</p>
                        </div>
                      ) : (
                        <div className="w-[96%] flex">
                          <div className=" w-[55%] pl-2 flex items-center rounded-lg ">
                            <p
                              type="number"
                              className="w-[58%] h-[34px] p-[1px] flex items-center text-[12px] font-[sf-pro-medium] text-[#232E38]"
                              value={item.cGst}
                              name="cGst"
                            >{`${item.cGst}%`}</p>
                          </div>
                          <div className=" w-[55%] ml-1 pl-2 flex rounded-lg ">
                            <p
                              type="number"
                              className="w-[58%] h-[34px] p-[1px] flex items-center text-[12px] font-[sf-pro-medium] text-[#232E38]"
                              value={item.sGst}
                              name="sGst"
                            >{`${item.sGst}%`}</p>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className=" w-[17%] lg:w-[21%] xl:w-[15%] pr-5  h-[33px] text-center lg:pr-1 text-[12px] focus:outline-none border-[#707070]/25 flex justify-end">
                      <p className=" w-[100%]  h-[33px] font-[sf-pro-medium] text-[#232E38] p-2 focus:border-green-400 rounded-lg text-right   text-[12px] focus:outline-none">
                        {currencySymbol}
                        {Math.round(
                          Number(
                            (item.netTotal = taxToGst
                              ? Number(item.amount) +
                                Number(item.amount / 100) * Number(item.iGst)
                              : Number(item.amount) +
                                (Number(item.amount) / 100) *
                                  Number(item.cGst) +
                                (Number(item.amount) / 100) * Number(item.sGst))
                          )
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}

              <div className=" pl-4 pr-6 md:pr-3 mb-6 mt-2 flex justify-end w-[950px] lg:w-[100%] md:w-[100%]">
                <div className=" flex justify-between border-t-[1px] border-b-[1px] lg:w-[65%] md:w-[65%] xl:w-[63%] w-[57%]">
                  <div className=" flex w-[79%] md:w-[85%]">
                    <input
                      className="text-[10px] text-center lg:text-start w-[24%]  lg:w-[20%] md:w-[55%]  xl:w-[35%] text-[#232E38] font-[sf-pro-medium]  focus:outline-none"
                      value={labelDetails.labelSubTotal}
                      name="labelSubTotal"
                    />
                    <p className=" text-[10px] pl-2 font-[interSemiBold] w-[20%] mr-7 md:mr-1 text-end lg:text-start">
                      {quantityTotal}
                    </p>
                    <div className=" w-[69%] lg:w-[40%] xl:w-[65%] flex justify-end text-end items-center">
                      {/* <span>$</span> */}
                      <div className="w-[100%] pl-3 bg-white font-[interSemiBold] text-[10px]">
                        {currencySymbol}
                        {Math.round(subtotal).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className=" w-[75%] flex items-center justify-between">
                   <div className="w-[70%] ml-1 space-x-1 font-[interSemiBold] text-[10px] truncate">
                  {taxToGst ? <div className=" flex justify-center items-center">
                    <span className=" w-[100%] truncate text-center pl-5">{currencySymbol}{Math.round(IgstTotal).toFixed(2)}</span>
                  </div> :
                   <div className=" flex space-x-1 font-[interSemiBold] text-[10px]">
                    <span className=" w-[48%] text-end">{currencySymbol}{cGstTotal}</span>
                    <span className="w-[48%] text-center">{currencySymbol}{sgstTotal}</span>
                  </div> 
                  }
                  
                </div>
                    <div className=" w-[53%] text-center pr-1 font-[interSemiBold] text-[10px] truncate">
                      {currencySymbol}
                      {Math.round(Number(NetAmountTotal)).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
              </div>

              <div className="pl-6 pr-7 flex justify-end">
                <div className="w-[91%] md:w-[70%] lg:w-[52%] xl:w-[33%] float-right pt-3 text-right ">
                  {isTax ? (
                    <div className="flex justify-between mb-2 ">
                      <input
                        className=" text-center w-[50%] truncate text-[#232E38]/50 focus:outline-none font-[sf-pro-medium] text-[12px]"
                        value={`${labelDetails.labelSubTotal}:`}
                        name="labelSubTotal"
                      />
                      <p className=" w-[44%] h-[30px] pr-4 rounded-md flex justify-end items-center ">
                        <p className="w-[85%] truncate font-[interSemiBold] text-[12px]">
                          {currencySymbol}
                          {Math.round(Number(subtotal)).toFixed(2)}
                        </p>
                      </p>
                    </div>
                  ) : null}
                  {IsDiscount ? (
                    <div className="flex justify-between mb-2">
                      {percentToAmount.discountPercentTOAmount ? (
                        <input
                          className="w-[50%] text-right truncate text-[#232E38]/50 focus:outline-none font-[sf-pro-medium] text-[12px]"
                          value={`${labelDetails.labelDiscount} (${invoiceDetails.discount}%):`}
                          name="labelDiscount"
                        />
                      ) : (
                        <input
                          className="w-[50%] text-right truncate text-[#232E38]/50 focus:outline-none font-[sf-pro-medium] text-[12px]"
                          value={`${labelDetails.labelDiscount}:`}
                          name="labelDiscount"
                        />
                      )}
                      <label className=" w-[43%] h-[30px] rounded-md flex justify-between items-center p-2">
                        {percentToAmount.discountPercentTOAmount ? (
                          <p className="w-[100%] pr-2 h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                            {currencySymbol}
                            {Number(
                              (invoiceDetails.discount * subtotal) / 100
                            ).toFixed(2)}
                          </p>
                        ) : (
                          <p className="w-[100%] pr-2 h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                            {currencySymbol}
                            {Number(invoiceDetails.discount).toFixed(2)}
                          </p>
                        )}
                      </label>
                    </div>
                  ) : null}
                  {isCess ? (
                    <div className="flex justify-between mb-2">
                      {percentToAmount.cessPercentToAmount ? (
                        <input
                          className="w-[50%] text-right truncate text-[#232E38]/50 focus:outline-none font-[sf-pro-medium] text-[12px]"
                          value={`${labelDetails.labelCess} (${invoiceDetails.cess}%):`}
                          name="labelCess"
                        />
                      ) : (
                        <input
                          className="w-[50%] text-right truncate text-[#232E38]/50 focus:outline-none font-[sf-pro-medium] text-[12px]"
                          value={`${labelDetails.labelCess}:`}
                          name="labelCess"
                        />
                      )}
                      <label className=" w-[43%] h-[30px] rounded-md flex justify-between items-center p-2">
                        {percentToAmount.cessPercentToAmount ? (
                          <p className="w-[100%] pr-2 h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                            {currencySymbol}
                            {Number(
                              (invoiceDetails.cess * subtotal) / 100
                            ).toFixed(2)}
                          </p>
                        ) : (
                          <p className="w-[100%] pr-2 h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                            {currencySymbol}
                            {Number(invoiceDetails.cess).toFixed(2)}
                          </p>
                        )}
                      </label>
                    </div>
                  ) : null}
                  {isTax ? (
                    <div>
                      {taxToGst ? (
                        <div className="flex justify-between mb-2">
                          {percentToAmount.taxPercentTOAmount ? (
                            <input
                              className="w-[50%] text-right text-[#232E38]/50 focus:outline-none font-[sf-pro-medium] text-[12px]"
                              value={`${labelDetails.labelTax} (${invoiceDetails.tax}%):`}
                              name="labelTax"
                            />
                          ) : (
                            <input
                              className="w-[50%] text-right text-[#232E38]/50 focus:outline-none font-[sf-pro-medium] text-[12px]"
                              value={`${labelDetails.labelTax}:`}
                              name="labelTax"
                            />
                          )}
                          <label className=" w-[43%] h-[30px] rounded-md flex justify-between items-center p-2">
                            {percentToAmount.taxPercentTOAmount ? (
                              <p className="w-[100%] pr-2 h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                                {currencySymbol}
                                {Number(
                                  (invoiceDetails.tax *
                                    (subtotal -
                                      (invoiceDetails.discount * subtotal) /
                                        100)) /
                                    100
                                ).toFixed(2)}
                              </p>
                            ) : (
                              <p className="w-[100%] pr-2 h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                                {currencySymbol}
                                {Number(invoiceDetails.tax).toFixed(2)}
                              </p>
                            )}
                          </label>
                        </div>
                      ) : (
                        <div>
                          <div className="flex justify-between mb-2">
                            {percentToAmount.sGstPercentTOAmount ? (
                              <input
                                className="w-[50%] text-right focus:outline-none text-[#232E38]/50 truncate font-[sf-pro-medium] text-[12px]"
                                value={`${labelDetails.labelSGst} (${invoiceDetails.sGst}%):`}
                                name="labelSGst"
                              />
                            ) : (
                              <input
                                className="w-[50%] text-right focus:outline-none text-[#232E38]/50 truncate font-[sf-pro-medium] text-[12px]"
                                value={`${labelDetails.labelSGst}:`}
                                name="labelSGst"
                              />
                            )}
                            <label className=" w-[43%] h-[30px] rounded-md flex justify-between items-center p-2">
                              {percentToAmount.sGstPercentTOAmount ? (
                                <p className="w-[100%] pr-2 h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                                  {currencySymbol}
                                  {Number(
                                    (invoiceDetails.sGst *
                                      (subtotal -
                                        (invoiceDetails.discount * subtotal) /
                                          100)) /
                                      100
                                  ).toFixed(2)}
                                </p>
                              ) : (
                                <p className="w-[100%] h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                                  {currencySymbol}
                                  {invoiceDetails.sGst}
                                </p>
                              )}
                            </label>
                          </div>
                          <div className="flex justify-between mb-2">
                            {percentToAmount.cGstPercentTOAmount ? (
                              <input
                                className="w-[50%] text-right focus:outline-none text-[#232E38]/50 truncate font-[sf-pro-medium] text-[12px]"
                                value={`${labelDetails.labelCGst} (${invoiceDetails.cGst}%):`}
                                name="labelCGst"
                              />
                            ) : (
                              <input
                                className="w-[50%] text-right focus:outline-none text-[#232E38]/50 truncate font-[sf-pro-medium] text-[12px]"
                                value={`${labelDetails.labelCGst}:`}
                                name="labelCGst"
                              />
                            )}
                            <label className=" w-[43%] h-[30px] rounded-md flex justify-between items-center p-2">
                              {percentToAmount.cGstPercentTOAmount ? (
                                <p className="w-[100%] pr-2 h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                                  {currencySymbol}
                                  {Number(
                                    (invoiceDetails.cGst *
                                      (subtotal -
                                        (invoiceDetails.discount * subtotal) /
                                          100)) /
                                      100
                                  ).toFixed(2)}
                                </p>
                              ) : (
                                <p className="w-[100%] pr-2 h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                                  {currencySymbol}
                                  {Number(invoiceDetails.cGst).toFixed(2)}
                                </p>
                              )}
                            </label>
                          </div>
                        </div>
                      )}{" "}
                    </div>
                  ) : null}

                  {isShipping ? (
                    <div className="flex justify-between mb-2">
                      <input
                        className="w-[50%] text-right truncate text-[#232E38]/50 focus:outline-none font-[sf-pro-medium] text-[12px]"
                        value={`${labelDetails.labelShipping}:`}
                        name="labelShipping"
                      />
                      <label className=" w-[43%] h-[30px] rounded-md flex justify-between items-center p-2">
                        <p className="w-[100%] pr-2 h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                          {currencySymbol}
                          {Number(invoiceDetails.shipping).toFixed(2)}
                        </p>
                      </label>
                    </div>
                  ) : null}

                  <div className="flex justify-between mb-2">
                    <input
                      className="text-right w-[50%] truncate text-[#232E38]/50 focus:outline-none font-[sf-pro-medium] text-[12px]"
                      value={`${labelDetails.labelTotal}:`}
                      name="labelTotal"
                    />
                    <p className=" w-[44%] h-[30px] pr-4 rounded-md truncate">
                      <span className="font-[interSemiBold] text-[12px]">
                        {currencySymbol}
                      </span>
                      <span className="font-[interSemiBold] truncate text-[12px]">
                        {Number(Math.round(total)).toFixed(2)}
                      </span>
                    </p>
                  </div>
                  {invoiceDetails.amountPaid ? (
                    <div className="flex justify-between mb-2">
                      <input
                        className="w-[50%] text-right focus:outline-none text-[#232E38]/50 font-[sf-pro-medium] text-[12px]"
                        value={`${labelDetails.labelAmountPaid}:`}
                        name="labelAmountPaid"
                      />
                      <label className=" w-[53%] pr-4 truncate h-[30px] rounded-md flex justify-between items-center p-2">
                        <p className="w-[100%] h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                          {currencySymbol}
                          {Number(invoiceDetails.amountPaid).toFixed(2)}
                        </p>
                      </label>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="w-[60%] h-[150px] ml-7 flex flex-col justify-evenly">
                {invoiceDetails.notes ? (
                  <div className=" border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[95%] h-[50px] p-1">
                    <input
                      className="w-[100%] h-[20px] truncate text-[#707070] focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                      value={labelDetails.labelNotes}
                      name="labelNotes"
                    />
                    <input
                      className="w-[100%] h-[20px] truncate focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                      value={invoiceDetails.notes}
                      name="notes"
                      placeholder="Add any extra information"
                    />
                  </div>
                ) : null}
                {invoiceDetails.termsNCondition ? (
                  <div className=" border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[95%] h-[50px] p-1">
                    <input
                      className="w-[100%] h-[20px] text-[#707070] truncate focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                      value={labelDetails.labelTermsNCon}
                      name="labelTermsNCon"
                    />
                    <input
                      className="w-[100%] h-[20px] truncate focus:outline-none rounded-md font-[sf-pro-medium] text-[12px]"
                      value={invoiceDetails.termsNCondition}
                      name="termsNCondition"
                      placeholder="Add terms like late fees payment methods delivery scheduel etc..."
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <div className="lg:pl-6 lg:w-[40%] mt-2 lg:mt-0">
            <SideBar
              detailsCallback={invoiceDetails}
              itemListCallBack={itemList}
              detailsLabelCallBack={labelDetails}
              previewSideBtnClr={location.bgColorValue}
              targetPdf={ref}
              optionPdf={options}
              imageData={image}
              taxToGstState={taxToGst}
              perToAmount={percentToAmount}
              finalCurrencySymbol={currencySymbol}
              editId={location?.editInvoice}
              isEdit={location?.isEdit} // ? true : false
              backGroundcolor={bgColorCode}
              pdfDownLoad={(data) => setIsPdfDownload(data)}
              isdiscountNeed={IsDiscount}
              isTaxNeed={isTax}
              isShippingNeed={isShipping}
            />
          </div>
        </div>
      </div>
      {/* <div className="p-3 text-center text-[12px] font-[sf-pro-medium]">
        © 2022 Alpha Business Solutions Pvt. Ltd. All Rights Reserved.
      </div> */}
      <div>
        <BtoolsFooter />
      </div>
    </div>
  );
};

export default PreView;
