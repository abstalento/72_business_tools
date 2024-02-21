import React, { useEffect, useState } from "react";
import Image from "next/image";
import SideBar from "../../components/invoicegenerator/side-bar/SideBar";
import Router from "next/router";
import { useRouter } from "next/router";
import SaveDefault from "./save-default-popup/SaveDefaultPopUp";
import CurrencyPopUp from "./currency-popup/CurrencyPopup";
import BtoolsHeader from "../../container/72BTheader/BToolsHeader";
import PouchDB from "pouchdb";
import Service from "../../services/invoiceGenerator/service";
import FeedBackButton from "../../container/72FeedBackButton/feedBackButton";
const HomePage = () => {
  const [itemList, setItemList] = useState([
    {
      item: "",
      quality: "",
      rate: "",
      iGst: "",
      sGst: "",
      cGst: "",
      amount: "",
      netTotal: "",
    },
  ]);
  const [NetAmountTotal, setNetAmountTotal] = useState(0);
  const router = useRouter();
  const location = router.query.data ? JSON.parse(router.query.data) : null;
  const [stateDisable, setStateDisable] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [isPdfDownload, setIsPdfDownload] = useState(false);
  const [storePopUp, setStorePopUp] = useState(false);
  const [IsDiscount, setIsDiscount] = useState(false);
  const [isCess, setIsCess] = useState(false);
  const [isTax, setIsTax] = useState(false);
  const [isShipping, setIsShipping] = useState(false);
  const [storeDefault, SetStoreDefault] = useState();
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
  const [saveDefault, setSaveDefault] = useState(true);
  const [previewState] = useState(true);
  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNum: 0,
    billFrom: "",
    billTo: "",
    sellerGst: "",
    buyerGst: "",
    shipTo: "",
    shipOrBill: "true",
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
  const currentTime = new Date();
  const month = currentTime.getMonth() + 1;
  const day = currentTime.getDate();
  const year = currentTime.getFullYear();
  const newdate =
    day < 10
      ? year + "-" + "0" + month + "-" + "0" + day
      : year + "-" + "0" + month + "-" + day;

  const [bgColorCode, setBgColorCode] = useState("#FFA726");
  const [validationColour, setValidationColour] = useState(false);
  const [inputData, setInputData] = useState();
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
    labelItem: "ITEM (HSN/SAC)",
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
  const [currencySymbol, setCurrencySymbol] = useState("₹");
  const [currencyId, setCurrencyId] = useState("INR");
  const [currencyData, setCurrencyData] = useState({
    // currencySymbol:'₹',
    currencyId: "INR",
    currencyClose: false,
  });
  const itemListAdd = () => {
    setItemList([
      ...itemList,
      {
        item: "",
        quality: "",
        rate: "",
        iGst: "",
        sGst: "",
        cGst: "",
        amount: "",
      },
    ]);
  };
  const bgClrCode = (colorCode) => {
    setBgColorCode(colorCode);
  };
  const itemListOnCng = (event, index) => {
    const { name, value } = event.target;
    const val1 = value.replace(/[^\w\s]/gi, "");
    const val2 = val1.replace(/[^\S*@$]/gi, "");
    const val3 = value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1");
    const list = [...itemList];
    if (name === "rate" || name === "quality") {
      list[index][name] = val3;
    } else {
      if (value === " ") {
        list[index][name] = val2;
      } else {
        list[index][name] = value;
        // .replace(/[^\w\s]/gi, "");
      }
    }
    setItemList(list);
    const special = /^[ _0-9a-zA-Z\b]+$/;
    if (
      (value && name === "rate") || name === "quality"
        ? null
        : val3 && !value.match(special)
    ) {
    }
    setSaveDefault(false);
    // const getActiveData = JSON.parse(localStorage.getItem("activeData"));
    // if (getActiveData) {
    //   localStorage.setItem(
    //     "activeData",
    //     JSON.stringify({ ...getActiveData, itemList, isActive: true })
    //   );
    // } else {
    //   localStorage.setItem(
    //     "activeData",
    //     JSON.stringify({ ...getActiveData, itemList, isActive: true })
    //   );
    // }
    var db = new PouchDB("invoiceGenerator");
    db.get("invoiceActiveData", function (err, doc) {
      if (err) {
        var doc = {
          _id: "invoiceActiveData",
          data: { itemList, isActive: true },
        };
        db.put(doc);
      }
      db.put(
        {
          _id: doc._id,
          data: { ...doc.data, itemList, isActive: true },
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
  const subtotal = itemList
    .reduce(
      (total, item) => Number(total) + Number(item.quality) * Number(item.rate),
      0
    )
    .toFixed(2);

  const quantityTotal = itemList.reduce(
    (total, item) => Number(total) + Number(item.quality),
    0
  );

  const discountAmount =
    Number(subtotal) -
    (IsDiscount
      ? percentToAmount.discountPercentTOAmount
        ? Number((invoiceDetails.discount * subtotal) / 100)
        : Number(invoiceDetails.discount)
      : null);
  const percentageTotal = itemList
    .reduce(
      (total, item) =>
        Number(total) +
        Number(
          taxToGst
            ? Number(item.amount / 100) * Number(item.iGst)
            : (Number(item.amount) / 100) * Number(item.cGst) +
                (Number(item.amount) / 100) * Number(item.sGst)
        ),
      0
    )
    .toFixed(2);
  const sgstTotal = itemList.reduce(
    (total, item) =>
      Number(total) + Number((Number(item.amount) / 100) * Number(item.sGst)),
    0
  );
  const cGstTotal = itemList.reduce(
    (total, item) =>
      Number(total) + Number((Number(item.amount) / 100) * Number(item.cGst)),
    0
  );
  const IgstTotal = itemList.reduce(
    (total, item) =>
      Number(total) + Number((Number(item.amount) / 100) * Number(item.iGst)),
    0
  );

  const gstPercentageTotal = Number(percentageTotal) + Number(discountAmount);
  // const gstPercentageTotal = itemList
  const cessAmount =
    Number(gstPercentageTotal) +
    (isShipping ? Number(invoiceDetails.shipping) : null) +
    (isCess
      ? percentToAmount.cessPercentToAmount
        ? Number((invoiceDetails.cess * NetAmountTotal) / 100)
        : Number(invoiceDetails.cess)
      : null);
  const total = Number(cessAmount);

  if (typeof window !== "undefined") {
    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
      tx[i].setAttribute(
        "style",
        "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
      );
      tx[i].addEventListener("input", OnInput, false);
    }
    function OnInput() {
      this.style.height = 0;
      this.style.height = this.scrollHeight + "px";
    }
  } else {
  }

  const detailsOnCng = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    setInputData(name);
    setValidationColour(false);
    if (value === "") {
      setValidationColour(true);
    }
    const val1 = value.replace(/[^\w\s]/gi, "");
    const val2 = val1.replace(/[^\S*@$]/gi, "");

    let data = {
      ...invoiceDetails,
      [name]:
        name === "discount" ||
        name === "tax" ||
        name === "sGst" ||
        name === "cGst" ||
        name === "amountPaid"
          ? value.replace(/[^0-9.]/g, "")
          : name === "billDate" ||
            name === "dueDate" ||
            name === "poNumber" ||
            name === "invoiceNum" ||
            name === "billFrom" ||
            name === "billTo" ||
            name === "notes" ||
            name === "termsNCondition"||
            name==="shipTo"
          ? value
          : value === " "
          ? val2
          : val1,
    };
    setInvoiceDetails(data);

    // const getActiveData = JSON.parse(localStorage.getItem("activeData"));
    // if (getActiveData) {
    //   localStorage.setItem(
    //     "activeData",
    //     JSON.stringify({ ...getActiveData, data, isActive: true })
    //   );
    // } else {
    //   localStorage.setItem(
    //     "activeData",
    //     JSON.stringify({ ...getActiveData, data, isActive: true })
    //   );
    // }
    var db = new PouchDB("invoiceGenerator");
    db.get("invoiceActiveData", function (err, doc) {
      if (err) {
        var doc = {
          _id: "invoiceActiveData",
          data: { data, isActive: true },
        };
        db.put(doc);
      }
      db.put(
        {
          _id: doc._id,
          data: { ...doc.data, data, isActive: true },
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
    if (invoiceDetails.billFrom === "" && invoiceDetails.billTo === "") {
      setStateDisable(false);
    }
    setSaveDefault(false);
  };
  const labelOnChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setLabelDetails({ ...labelDetails, [name]: value });
    setSaveDefault(false);
    // const getActiveData = JSON.parse(localStorage.getItem("activeData"));
    // if (getActiveData) {
    //   localStorage.setItem(
    //     "activeData",
    //     JSON.stringify({ ...getActiveData, labelDetails, isActive: true })
    //   );
    // } else {
    //   localStorage.setItem(
    //     "activeData",
    //     JSON.stringify({ ...getActiveData, labelDetails, isActive: true })
    //   );
    // }
    var db = new PouchDB("invoiceGenerator");
    db.get("invoiceActiveData", function (err, doc) {
      if (err) {
        var doc = {
          _id: "invoiceActiveData",
          data: { labelDetails, isActive: true },
        };
        db.put(doc);
      }
      db.put(
        {
          _id: doc._id,
          data: { ...doc.data, labelDetails, isActive: true },
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
  const deleteItem = (index) => {
    const list = [...itemList];
    list.splice(index, 1);
    setItemList(list);
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
      // const getActiveData = JSON.parse(localStorage.getItem("activeData"));
      // if (getActiveData) {
      //   localStorage.setItem(
      //     "activeData",
      //     JSON.stringify({ ...getActiveData, images, isActive: true })
      //   );
      // } else {
      //   localStorage.setItem(
      //     "activeData",
      //     JSON.stringify({ ...getActiveData, images, isActive: true })
      //   );
      // }
      var db = new PouchDB("invoiceGenerator");
      db.get("invoiceActiveData", function (err, doc) {
        if (err) {
          var doc = {
            _id: "invoiceActiveData",
            data: { images, isActive: true },
          };
          db.put(doc);
        }
        db.put(
          {
            _id: doc._id,
            data: { ...doc.data, images, isActive: true },
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
  };
  const dateOnchange = (data) => {
    setStartDate(data);
    setInvoiceDetails({ ...invoiceDetails, billDate: data });
  };
  const handleCancel = () => {
    setImage({ profilePic: null, ImageUploaded: false });
    const images = {
      profilePic: null,
      ImageUploaded: false,
    };
    // const getActiveData = JSON.parse(localStorage.getItem("activeData"));
    // if (getActiveData) {
    //   localStorage.setItem(
    //     "activeData",
    //     JSON.stringify({ ...getActiveData, images, isActive: true })
    //   );
    // } else {
    //   localStorage.setItem(
    //     "activeData",
    //     JSON.stringify({ ...getActiveData, images, isActive: true })
    //   );
    // }
    var db = new PouchDB("invoiceGenerator");
    db.get("invoiceActiveData", function (err, doc) {
      if (err) {
        var doc = {
          _id: "invoiceActiveData",
          data: { images, isActive: true },
        };
        db.put(doc);
      }
      db.put(
        {
          _id: doc._id,
          data: { ...doc.data, images, isActive: true },
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

  useEffect(() => {
    // const getItem = JSON.parse(localStorage.getItem("invoiceDefault"));
    // const getHistory = JSON.parse(localStorage.getItem("InvoiceHistory"));
    // const getActiveData = JSON.parse(localStorage.getItem("activeData"));
    (async function Change() {
      const invoiceHistory = await Service.invoiceGeneratorHistory();
      const invoiceActiveData = await Service.invoiceGeneratorActiveData();
      const invoiceDefaultData = await Service.invoiceGeneratorDefaultData();
      const location = router.query.data ? JSON.parse(router.query.data) : "";
      if (location) {
        setItemList(location?.itemList);
        setInvoiceDetails(location?.itemDetails);
        setTaxToGst(location.taxTGst);
        setIsPdfDownload(location.isDownloaded);
        setImage({
          ...image,
          profilePic: location.uploadImage.profilePic,
          ImageUploaded: location.uploadImage.ImageUploaded,
        });
        setPercentToAmount({
          ...percentToAmount,
          discountPercentTOAmount: location.perTAmount.discountPercentTOAmount,
          taxPercentTOAmount: location.perTAmount.taxPercentTOAmount,
          sGstPercentTOAmount: location.perTAmount.sGstPercentTOAmount,
          cGstPercentTOAmount: location.perTAmount.cGstPercentTOAmount,
        });
        setLabelDetails({
          ...labelDetails,
          labelInvoice: location.detailsLabel.labelInvoice,
          labelAmount: location.detailsLabel.labelAmount,
          labelAmountPaid: location.detailsLabel.labelAmountPaid,
          labelBalanceDue: location.detailsLabel.labelBalanceDue,
          labelBillFrom: location.detailsLabel.labelBillFrom,
          labelBillTo: location.detailsLabel.labelBillTo,
          labelCGst: location.detailsLabel.labelCGst,
          labelDate: location.detailsLabel.labelDate,
          labelDiscount: location.detailsLabel.labelDiscount,
          labelDueDate: location.detailsLabel.labelDueDate,
          labelItem: location.detailsLabel.labelItem,
          labelNotes: location.detailsLabel.labelNotes,
          labelPaymentTerms: location.detailsLabel.labelPaymentTerms,
          labelPoNum: location.detailsLabel.labelPoNum,
          labelQuantity: location.detailsLabel.labelQuantity,
          labelRate: location.detailsLabel.labelRate,
          labelSGst: location.detailsLabel.labelSGst,
          labelShipTO: location.detailsLabel.labelShipTO,
          labelSubTotal: location.detailsLabel.labelSubTotal,
          labelIgst: location.detailsLabel.labelIgst,
          labelTermsNCon: location.detailsLabel.labelTermsNCon,
          labelTotal: location.detailsLabel.labelTotal,
        });
        setCurrencySymbol(location.currencyValue);
        setBgColorCode(location.colorValue);
        setIsDiscount(location.discountNeed);
        setIsTax(location.taxNeed);
        setIsShipping(location.shippingNeed);
      } else {
        if (!invoiceActiveData.data?.isActive) {
          if (invoiceDefaultData.data) {
            if (invoiceDefaultData.data.itemDetails.invoiceNum) {
              invoiceDefaultData.data.itemDetails.invoiceNum = invoiceHistory
                ?.data?.length
                ? invoiceHistory.data.length + 1
                : 1;
            }
            setItemList(invoiceDefaultData.data?.itemList);
            setInvoiceDetails(invoiceDefaultData.data?.itemDetails);
            setLabelDetails(invoiceDefaultData.data.detailsLabel);
            setPercentToAmount(invoiceDefaultData.data.perTAmount);
            setCurrencySymbol(invoiceDefaultData.data.currencyValue);
            setImage(invoiceDefaultData.data.uploadImage);
            setBgColorCode(invoiceDefaultData.data.bgColorValue);
            setIsDiscount(invoiceDefaultData.data.discountNeed);
            setIsTax(invoiceDefaultData.data.taxNeed);
            setIsShipping(invoiceDefaultData.data.shippingNeed);
          } else if (
            invoiceHistory.data?.length == undefined ||
            invoiceHistory.data?.length == 0
          ) {
            setInvoiceDetails({ ...invoiceDetails, invoiceNum: 1 });
          } else {
            setInvoiceDetails({
              ...invoiceDetails,
              invoiceNum: invoiceHistory.data?.length + 1,
            });
          }
        } else {
          if (invoiceActiveData.data?.invoiceDetails?.invoiceNum) {
            invoiceActiveData.data.invoiceDetails.invoiceNum = invoiceHistory
              .data?.length
              ? invoiceHistory.data.length + 1
              : 1;
          }
          setItemList(
            invoiceActiveData.data?.itemList
              ? invoiceActiveData.data?.itemList
              : itemList
          );
          setInvoiceDetails(
            invoiceActiveData.data?.data
              ? invoiceActiveData.data?.data
              : invoiceDetails
          );
          setLabelDetails(
            invoiceActiveData.data?.labelDetails
              ? invoiceActiveData.data?.labelDetails
              : labelDetails
          );
          setImage(
            invoiceActiveData.data?.images
              ? invoiceActiveData.data?.images
              : image
          );
        }
      }
    })();
  }, []);

  useEffect(() => {
    const NetAmountTotalState = itemList
      .reduce(
        (total, item) =>
          Number(total) +
          Number(
            taxToGst
              ? Number(item.amount) +
                  Number(item.amount / 100) * Number(item.iGst)
              : Number(item.amount) +
                  (Number(item.amount) / 100) * Number(item.cGst) +
                  (Number(item.amount) / 100) * Number(item.sGst)
          ),
        0
      )
      .toFixed(2);

    setNetAmountTotal(NetAmountTotalState);
  }, [itemList, taxToGst]);

  const CurrencyValue = (currencySymbols) => {
    setCurrencySymbol(currencySymbols);
  };
  const setCurrencyIdValue = (currencyIds) => {
    setCurrencyId(currencyIds);
  };
  const setClosePopUp = (closeCurrency) => {
    setCurrencyData({ ...currencyData, currencyClose: closeCurrency });
  };
  const openPopUp = (popupOpen) => {
    setCurrencyData({ ...currencyData, currencyClose: popupOpen });
  };
  const saveDetails = (data) => {
    SetStoreDefault(data);
  };
  const storeState = (data) => {
    setStorePopUp(data);
  };
  const closePopUp = (data) => {
    setStorePopUp(data);
  };
  const closeSavePopUp = (data) => {
    setStorePopUp(data);
    setSaveDefault(!data);
  };
  const discountdisplay = () => {
    setIsDiscount(true);
  };
  const closeDiscount = () => {
    setIsDiscount(false);
  };
  const cessDisplay = () => {
    setIsCess(true);
  };
  const closeCess = () => {
    setIsCess(false);
  };
  const shippingDisplay = () => {
    setIsShipping(true);
  };
  const closeShipping = () => {
    setIsShipping(false);
  };

  return (
    <>
      {currencyData.currencyClose ? (
        <div className="w-[80%]">
          <CurrencyPopUp
            myCurrencySymbol={CurrencyValue}
            myCurrencyId={setCurrencyIdValue}
            closeCurrencyPopUp={setClosePopUp}
          />
        </div>
      ) : null}
      {storePopUp ? (
        <SaveDefault
          colorValue={bgColorCode}
          defaultStore={storeDefault}
          action={closePopUp}
          actionSave={closeSavePopUp}
        />
      ) : null}
      <div className="flex flex-col h-[100vh] scrollBar">
        <div className="h-[5vh] pl-6 mb-2">
          {/* <Image width="86%" height="35px" src="/images/invoice-Logo.png" /> */}
          <BtoolsHeader Src="/images/GST One Pro.png" Height="40" Width="100" />
        </div>
        <div className="bg-[#E6E9ED] border-t-2 border-[#707070]/5 md:flex space-y-4 justify-end p-6">
          <div className="md:w-[60%] bg-white rounded-lg min-h-[100vh]">
            <div
              style={{ backgroundColor: bgColorCode }}
              className={`h-[200px] bg-[${bgColorCode}] opacity-[1] rounded-lg p-3 flex justify-between items-center`}
            >
              <div className="bg-white w-[50%] md:w-[47%] lg:w-[28%] xl:w-[20%] h-[175px] text-[12px] rounded-lg flex flex-col justify-center hover:cursor-pointer">
                {image.ImageUploaded ? (
                  <section className="w-[100%] relative">
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
                        className="h-[160px] w-[100%] rounded-sm"
                      />
                    </section>
                    <input
                      id="addProfilebtn"
                      className="opacity-0 absolute w-[170px] bottom-1 h-[175px] cursor-pointer"
                      type="file"
                      accept="image/*"
                      onChange={imageFileHandler}
                    />
                  </section>
                ) : (
                  <button
                    className=" w-[100%] flex flex-col cursor-pointer z-50"
                    onChange={imageFileHandler}
                  >
                    <span className="w-[95%] h-[100px] top-[75px] relative flex flex-col justify-center items-center cursor-pointer">
                      <Image
                        width="18%"
                        height="20px"
                        className=" h-[18px] cursor-pointer"
                        src="/icons/photo-camera.svg"
                      />
                      <label className="text-center text-[10px] relative top-[10px] cursor-pointer">
                        ADD YOUR COMPANY LOGO HERE
                      </label>
                    </span>
                    <input
                      id="addProfilebtn"
                      className="opacity-0 relative w-[170px] bottom-6 h-[175px] cursor-pointer"
                      type="file"
                      accept="image/*"
                      onChange={imageFileHandler}
                    />
                  </button>
                )}
              </div>
              <div className="h-[170px] flex flex-col justify-end items-end">
                <input
                  style={{ backgroundColor: bgColorCode }}
                  className="text-white focus:outline-none pb-[10px] w-[44%] md:w-[39%] xl:w-[30%] text-right font-[interSemiBold]"
                  value={labelDetails.labelInvoice}
                  name="labelInvoice"
                  onChange={labelOnChange}
                />
                <div
                  className={`h-[35px] w-[63%] flex justify-between items-center rounded-lg p-3 hover:border-green-400 bg-white border-[1px] `}
                >
                  <span className=" w-[20%]">#</span>
                  <input
                    id="invoiceNumber"
                    className="w-[65%] focus:outline-none text-end text-[12px]"
                    placeholder="Bill No"
                    value={invoiceDetails.invoiceNum}
                    name="invoiceNum"
                    onChange={detailsOnCng}
                  />
                </div>
              </div>
            </div>
            <div className="lg:flex justify-between pb-10  md:pr-4">
              <div className="w-[100%] lg:w-[60%]">
                <div className="lg:flex lg:flex-row flex flex-col  w-[100%] pt-3">
                  <div className="w-[90%] lg:w-[50%] pl-4">
                    <div
                      className={`border-2 hover:border-green-400 rounded-md flex flex-col text-[12px] w-[95%] min-h-[7vh] max-h-[10vh] md:h-[8vh]  lg:min-h-[47px] lg:max-h-[100%] lg:h-[7vh] xl:h-[7vh] p-1 mt-1 ${
                        validationColour && inputData === "billFrom"
                          ? "border-red-500"
                          : "border-[#707070]/25"
                      }`}
                    >
                      <input
                        className="w-[100%] font-[sfpro-regular-display] text-[12px] text-[#707070] h-[20px] focus:outline-none rounded-md"
                        value={labelDetails.labelBillFrom}
                        name="labelBillFrom"
                        onChange={labelOnChange}
                      />
                      <textarea
                        id="billFrom"
                        className={`w-[100%]  font-[sf-pro-medium] overflow-y-auto  text-[#232E38] resize-none focus:outline-none rounded-md `} //resize-billto
                        value={invoiceDetails.billFrom}
                        name="billFrom"
                        placeholder="Invoice from? (required)"
                        onChange={detailsOnCng}
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-[89%] pl-4 lg:pl-0 lg:w-[50%]">
                    <div className="border-2 hover:border-green-400 border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[96%] min-h-[7vh] max-h-[10vh] md:[6vh] xl:w-[94%] lg:h-[7vh] xl:h-[7vh]  p-1 mt-1">
                      <input
                        className="w-[100%] font-[sfpro-regular-display] text-[12px] text-[#707070] h-[31px] lg:h-[20px] focus:outline-none rounded-md"
                        value={labelDetails.labelSellerGst}
                        name="labelSellerGst"
                        onChange={labelOnChange}
                      />
                      <textarea
                        id="sellerGst"
                        className="w-[100%] resize-none font-[sf-pro-medium] text-[#232E38] h-[20px] overflow-hidden focus:outline-none rounded-md resize-ship"
                        value={invoiceDetails.sellerGst}
                        placeholder="Optional"
                        name="sellerGst"
                        role="textbox"
                        onChange={detailsOnCng}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="lg:flex lg:flex-row flex flex-col w-[100%]">
                  <div className="w-[90%] lg:w-[50%] pl-4">
                    <div
                      className={`border-2 hover:border-green-400 rounded-md flex flex-col text-[12px] w-[95%] min-h-[7vh] max-h-[10vh] md:h-[7vh] lg:h-[7vh] xl:h-[7vh] lg:min-h-[47px] lg:max-h-[100%] p-1 mt-1 ${
                        validationColour && inputData === "billTo"
                          ? "border-red-500"
                          : "border-[#707070]/25"
                      }`}
                    >
                      <input
                        className="w-[100%] font-[sfpro-regular-display] text-[12px] text-[#707070] h-[20px] focus:outline-none rounded-md"
                        value={labelDetails.labelBillTo}
                        name="labelBillTo"
                        onChange={labelOnChange}
                      />
                      <textarea
                        id="billTO"
                        className={`w-[100%] h-[20px] font-[sf-pro-medium] overflow-hidden text-[#232E38] resize-none focus:outline-none rounded-md `} //resize-billto
                        value={invoiceDetails.billTo}
                        name="billTo"
                        placeholder="Invoice To (required)"
                        onChange={detailsOnCng}
                      ></textarea>
                    </div>
                  </div>
                  <div className="w-[90%] pl-4 lg:pl-0 lg:w-[50%]">
                    <div className="border-2 hover:border-green-400 border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[96%] min-h-[7vh] max-h-[10vh] md:h-[6vh] h-[7vh] lg:h-[7vh] xl:w-[95%] lg:min-h-[47px] lg:max-h-[100%] p-1 mt-1">
                      <input
                        className="w-[100%] font-[sfpro-regular-display] text-[12px] text-[#707070] h-[20px] focus:outline-none rounded-md"
                        value={labelDetails.labelBuyerGst}
                        name="labelBuyerGst"
                        onChange={labelOnChange}
                      />
                      <textarea
                        id="buyerGst"
                        className="w-[100%] resize-none font-[sf-pro-medium] text-[#232E38] h-[20px] overflow-hidden focus:outline-none rounded-md resize-ship"
                        value={invoiceDetails.buyerGst}
                        name="buyerGst"
                        placeholder="Optional"
                        role="textbox"
                        onChange={detailsOnCng}
                      ></textarea>
                    </div>
                  </div>
                </div>

                <div className="lg:flex w-[100%]">
                  <div className="w-[94%] lg:w-[50%] pl-4">
                    <div
                      className={`hover:border-green-400 rounded-md flex flex-col text-[12px] w-[95%] min-h-[52px] max-h-[100%] p-1 mt-1 ${
                        validationColour && inputData === "billTo"
                          ? "border-red-500"
                          : "border-[#707070]/25"
                      }`}
                    >
                      <input
                        className="w-[100%] font-[sfpro-regular-display] text-[11px] pl-2 text-[#707070] h-[20px] focus:outline-none rounded-md"
                        value={labelDetails.labelShipOrBill}
                        readOnly
                        onChange={labelOnChange}
                      />
                      <div className="md:flex w-[50%] justify-between">
                        <label className="ml-6 w-[20%] text-[12px] text-gray-900 flex items-center font-[sfpro-regular-display]">
                          <input
                            type="radio"
                            name="shipOrBill"
                            value="true"
                            checked={invoiceDetails.shipOrBill === "true"}
                            onChange={detailsOnCng}
                            className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 mr-[10px] focus:ring-blue-500"
                          />
                          Yes
                        </label>
                        <label className="ml-6 w-[20%] align-le text-[12px] text-gray-900 flex items-center font-[sfpro-regular-display]">
                          <input
                            type="radio"
                            name="shipOrBill"
                            value="false"
                            checked={invoiceDetails.shipOrBill === "false"}
                            onChange={detailsOnCng}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 mr-[10px] focus:ring-blue-500"
                          />
                          No
                        </label>
                      </div>
                    </div>
                  </div>
                  {invoiceDetails.shipOrBill === "false" ? (
                    <div className="w-[90%] pl-4 mr-4 lg:pl-0 lg:mr-0 lg:w-[50%]">
                      <div className="border-2 hover:border-green-400 border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[96%] min-h-[47px] max-h-[100%] p-1 mt-1">
                        <input
                          className="w-[100%] font-[sfpro-regular-display] text-[12px] text-[#707070] h-[20px] focus:outline-none rounded-md"
                          value={labelDetails.labelShipTO}
                          name="labelShipTO"
                          onChange={labelOnChange}
                        />
                        <textarea
                          id="shipTO"
                          className="w-[100%] resize-none font-[sf-pro-medium] text-[#232E38] h-[20px] overflow-hidden focus:outline-none rounded-md resize-ship"
                          value={invoiceDetails.shipTo}
                          name="shipTo"
                          role="textbox"
                          placeholder="Ship To"
                          onChange={detailsOnCng}
                        ></textarea>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="w-[100%] lg:w-[40%] pl-4 lg:pl-0">
                <div className="w-[100%] lg:flex lg:flex-row flex flex-col flex-wrap justify-evenly pt-4 gap-y-1 lg:gap-y-0">
                  <div
                    className={`border-2 hover:border-green-400 rounded-md flex flex-col text-[12px] mb-1 w-[86%] h-[54px] lg:w-[45%] lg:h-[50px] p-1`}
                  >
                    <input
                      className="w-[100%] font-[sfpro-regular-display] text-[12px] text-[#707070] h-[20px] focus:outline-none rounded-md"
                      value={labelDetails.labelDate}
                      name="labelDate"
                      onChange={labelOnChange}
                    />
                    <div id="newDate">
                      <input
                        className="w-[100%] font-[sf-pro-medium] text-[#232E38] h-[20px] focus:outline-none rounded-md"
                        value={invoiceDetails.billDate}
                        onKeyDown={(e) => e.preventDefault()}
                        onKeyUp={(e) => e.preventDefault()}
                        type="date"
                        name="billDate"
                        onChange={detailsOnCng}
                      />
                    </div>
                  </div>
                  <div className="border-2 hover:border-green-400 border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[86%] h-[54px] lg:w-[45%] lg:h-[50px] p-1">
                    <input
                      className="w-[100%] font-[sfpro-regular-display] text-[12px] text-[#707070] h-[20px] focus:outline-none rounded-md"
                      value={labelDetails.labelPaymentTerms}
                      name="labelPaymentTerms"
                      onChange={labelOnChange}
                    />
                    <input
                      id="paymentTerms"
                      className="w-[100%] h-[20px] font-[sf-pro-medium] text-[#232E38] focus:outline-none rounded-md"
                      value={invoiceDetails.paymentTerms}
                      name="paymentTerms"
                      placeholder="(Optional)"
                      onChange={detailsOnCng}
                    />
                  </div>
                  <div
                    className={`border-2 hover:border-green-400  ${
                      validationColour && inputData === "dueDate"
                        ? "border-red-500"
                        : "border-[#707070]/25"
                    } rounded-md flex flex-col text-[12px] w-[86%] h-[54px] lg:w-[45%] lg:h-[50px] p-1`}
                  >
                    <input
                      className="w-[100%] font-[sfpro-regular-display] text-[12px] text-[#707070] h-[20px] focus:outline-none rounded-md"
                      value={labelDetails.labelDueDate}
                      name="labelDueDate"
                      onChange={labelOnChange}
                    />
                    <div id="AddDate">
                      <input
                        id="dueDate"
                        className="w-[100%] h-[20px] font-[sf-pro-medium] text-[#232E38] focus:outline-none rounded-md"
                        value={
                          invoiceDetails.billDate === "" ||
                          invoiceDetails.dueDate < invoiceDetails.billDate
                            ? " "
                            : invoiceDetails.dueDate
                        }
                        min={invoiceDetails.billDate}
                        type="date"
                        name="dueDate"
                        onKeyDown={(e) => e.preventDefault()}
                        onKeyUp={(e) => e.preventDefault()}
                        onChange={
                          invoiceDetails.billDate === "" ? null : detailsOnCng
                        }
                      />
                    </div>
                  </div>
                  <div className="border-2 hover:border-green-400 border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[86%] h-[54px] lg:w-[45%] lg:h-[50px] p-1">
                    <input
                      className="w-[100%] font-[sfpro-regular-display] text-[12px] text-[#707070] h-[20px] focus:outline-none rounded-md"
                      value={labelDetails.labelPoNum}
                      name="labelPoNum"
                      onChange={labelOnChange}
                    />
                    <input
                      id="poNumber"
                      className="w-[100%] h-[20px] font-[sf-pro-medium] text-[#232E38] focus:outline-none rounded-md"
                      value={invoiceDetails.poNumber}
                      name="poNumber"
                      placeholder="(Optional)"
                      onChange={detailsOnCng}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className=" w-full max-h-[100%] lg:overflow-x-hidden overflow-y-hidden md:overflow-x-auto">
              <div className="flex bg-[#232E38] pl-4 pr-3 rounded-lg w-[650px] xl:w-[97%] h-[30px] mx-auto">
                <div className="w-[21%] md:w-[47%]">
                  <input
                    id="TestlabelItem"
                    className="w-[46%] md:w-[61%] focus:outline-none truncate bg-[#232E38] text-white rounded-tl-md rounded-bl-md text-[10px] font-[sf-pro-medium] h-[30px]"
                    value={labelDetails.labelItem}
                    name="labelItem"
                    onChange={labelOnChange}
                  />
                </div>
                <div className="w-[15%] md:w-[30%] lg:w-[12%] xl:w-[15%]">
                  <input
                    id="TestlabelRate"
                    className="w-[80%] focus:outline-none truncate bg-[#232E38] text-white text-end text-[10px] font-[sf-pro-medium] h-[30px]"
                    value={labelDetails.labelRate}
                    name="labelRate"
                    onChange={labelOnChange}
                  />
                </div>
                <div className="w-[15%] md:w-[32%] lg:w-[26%] xl:w-[15%]">
                  <input
                    id="TestlabelQuantity"
                    className="w-[93%] md:w-[80%] focus:outline-none pl-2 truncate bg-[#232E38] text-white text-end text-[10px] font-[sf-pro-medium] h-[30px]"
                    value={labelDetails.labelQuantity}
                    name="labelQuantity"
                    onChange={labelOnChange}
                  />
                </div>

                <div className="w-[22%] md:w-[28%] lg:w-[28%] xl:w-[15%]">
                  <input
                    id="TestlabelAmount"
                    className="w-[88%] xl:w-[80%] focus:outline-none truncate bg-[#232E38] text-white text-end text-[10px] font-[sf-pro-medium] h-[30px]"
                    value={labelDetails.labelTabelTotal}
                    name="labelTabelTotal"
                    onChange={labelOnChange}
                  />
                </div>

                <div className="w-[16%] flex items-center">
                  {taxToGst ? (
                    <div className="flex items-center ml-2">
                      <input
                        id="TestlabelAmount"
                        className="w-[80%] pl-2 focus:outline-none truncate bg-[#232E38] text-white text-center text-[10px] font-[sf-pro-medium] h-[30px]"
                        value={labelDetails.labelIgst}
                        name="labelIgst"
                        onChange={labelOnChange}
                      />
                      <Image
                        id="swapDiscount"
                        width="15%"
                        height="10px"
                        className="h-[10px] cursor-pointer float-right"
                        onClick={() => setTaxToGst(false)}
                        src="/icons/swapWhite.svg"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center ml-3">
                      <input
                        id="TestlabelAmount"
                        className="w-[40%] focus:outline-none truncate bg-[#232E38] text-white text-center text-[10px] font-[sf-pro-medium] h-[30px]"
                        value={labelDetails.labelCGst}
                        name="labelCGst"
                        onChange={labelOnChange}
                      />
                      <input
                        id="TestlabelAmount"
                        className="w-[40%] focus:outline-none truncate bg-[#232E38] text-white text-center text-[10px] font-[sf-pro-medium] h-[30px]"
                        value={labelDetails.labelSGst}
                        name="labelSGst"
                        onChange={labelOnChange}
                      />
                      <Image
                        id="swapDiscount"
                        width="15%"
                        height="10px"
                        className="h-[10px] cursor-pointer float-right"
                        onClick={() => setTaxToGst(true)}
                        src="/icons/swapWhite.svg"
                      />
                    </div>
                  )}
                </div>
                <div className="w-[18%] md:w-[31%] lg:w-[24%] xl:w-[15%]">
                  <input
                    id="TestlabelAmount"
                    className="w-[80%] pl-7 float-right focus:outline-none truncate bg-[#232E38] text-white text-center text-[10px] font-[sf-pro-medium] h-[30px]"
                    value={labelDetails.labelNetTotal}
                    name="labelNetTotal"
                    onChange={labelOnChange}
                  />
                </div>
              </div>

              {itemList.map((item, index) => {
                return (
                  <div
                    key={index}
                    id={index}
                    className="pl-4 pb-1 border-[#707070]/25 pt-2 ml-1 flex w-[650px] xl:w-[100%] group"
                    
                  >
                    <textarea
                      id="item"
                      className={` w-[21%] md:w-[34%] xl:w-[40%] mr-[9px] border-2 focus:border-green-400 h-[33px] min-h-[33px] text-[12px] font-[sf-pro-medium] text-[#232E38] 
                      focus:outline-none p-2 rounded-lg border-[#707070]/25 overflow-hidden resize-none resize-item${index}`}
                      value={item.item}
                      name="item"
                      placeholder="Description of service or product..."
                      onChange={(event) => itemListOnCng(event, index)}
                    ></textarea>
                    <div
                      id={index}
                      className="w-[14%] xl:w-[10%] mr-[10px] h-[33px] text-right  text-[12px] rounded-lg border-[#707070]/25 flex items-center"
                    >
                      {/* <span className="absolute p-2">{currencySymbol}</span> */}
                      <input
                        id="rate"
                        type="number"
                        placeholder="0"
                        autoComplete="off"
                        className=" w-[100%] h-[33px] font-[sf-pro-medium] p-2 border-2 text-[#232E38] border-[#707070]/25 focus:border-green-400 focus:outline-none rounded-lg text-right text-[12px]"
                        value={item.rate}
                        name="rate"
                        onChange={(event) => itemListOnCng(event, index)}
                      />
                    </div>
                    <input
                      id="quality"
                      autoComplete="off"
                      type="number"
                      placeholder="1"
                      className="w-[15%] md:w-[17%] xl:w-[10%] mr-[10px] text-center h-[33px] text-[12px] focus:border-green-400 font-[sf-pro-medium] text-[#232E38] p-2 focus:outline-none rounded-lg border-2 border-[#707070]/25"
                      value={item.quality}
                      name="quality"
                      onChange={(event) => itemListOnCng(event, index)}
                    />
                    <div className="w-[16%] md:w-[18%] xl:w-[10%] mr-[10px] h-[33px] text-right text-[12px] focus:outline-none border-[#707070]/25 flex items-center border-2 rounded-lg">
                      {/* <span className="absolute p-2">{currencySymbol}</span> */}
                      <h1 className="h-[4vh] flex justify-center items-center text-[15px] pl-[3px]">
                        {currencySymbol}
                      </h1>
                      <input
                        className="w-[100%] h-[30px] font-[sf-pro-medium] text-[#232E38] border-2 p-2 focus:border-green-400 rounded-lg text-right text-[12px] focus:outline-none border-none"
                        readOnly
                        value={Number(
                          (item.amount = item.quality * item.rate)
                        ).toFixed(2)}
                        name="amount"
                      />
                    </div>

                    <div className="w-[17%] md:w-[15%] xl:w-[11%]">
                      {taxToGst ? (
                        <div className=" w-[90%] flex items-center mr-[15px] rounded-lg border-2">
                          <input
                            id="ipercent"
                            // id="quality"
                            autoComplete="off"
                            type="number"
                            className="w-[50%] h-[30px] p-1 text-end text-[12px] focus:border-green-400 font-[sf-pro-medium] text-[#232E38] focus:outline-none rounded-lg border-[#707070]/25"
                            value={item.iGst}
                            placeholder="0"
                            name="iGst"
                            onChange={(event) => itemListOnCng(event, index)}
                          />
                          <span className="font-[sf-pro-medium] text-[12px]">
                            %
                          </span>
                        </div>
                      ) : (
                        <div className="w-[96%] flex">
                          <div className="w-[42%] md:w-[60%] flex items-center rounded-lg border-2">
                            <input
                              id="cpercent"
                              // id="quality"
                              autoComplete="off"
                              placeholder="0"
                              type="number"
                              className=" w-[58%] h-[30px] p-[1px] text-[12px] text-center focus:border-green-400 font-[sf-pro-medium] text-[#232E38] focus:outline-none rounded-lg border-[#707070]/25"
                              value={item.cGst}
                              name="cGst"
                              onChange={(event) => itemListOnCng(event, index)}
                            />
                            <span className="font-[sf-pro-medium] text-[10px]">
                              %
                            </span>
                          </div>
                          <div className="w-[60%] ml-1 flex items-center rounded-lg border-2">
                            <input
                              id="spercent"
                              // id="quality"
                              autoComplete="off"
                              type="number"
                              placeholder="0"
                              className="w-[58%] h-[30px] p-[1px] text-[12px] text-center focus:border-green-400 font-[sf-pro-medium] text-[#232E38] focus:outline-none rounded-lg border-[#707070]/25"
                              value={item.sGst}
                              name="sGst"
                              onChange={(event) => itemListOnCng(event, index)}
                            />
                            <span className="font-[sf-pro-medium] text-[10px]">
                              %
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="w-[15%] md:w-[16%] xl:w-[12%] mr-[6px] h-[33px] text-right text-[12px] focus:outline-none border-[#707070]/25 flex items-center border-2  rounded-lg">
                      {/* <span className="absolute p-2">{currencySymbol}</span> */}
                      <h1 className="h-[4vh] flex justify-center items-center text-[15px] pl-[3px]">
                        {currencySymbol}
                      </h1>
                      <input
                        className="w-[100%] h-[30px] font-[sf-pro-medium] text-[#232E38] border-2 p-2 focus:border-green-400 rounded-lg text-right text-[12px] focus:outline-none border-none"
                        readOnly
                        value={Math.round(
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
                        name="amount"
                      />
                    </div>
                    {itemList.length > 1 && (
                      <div id={index} className="flex items-center">
                        <svg
                          viewBox="0 0 32 32"
                          id="delete"
                          onClick={() => deleteItem(index)}
                          className="hidden group-hover:block h-[13px] cursor-pointer text-[#989EA4] hover:text-[#009e74]"
                          xmlns="http://www.w3.org/2000/svg"
                          data-name="Layer 3"
                        >
                          <path
                            d="m18.828 16 4.586-4.586a2 2 0 1 0 -2.828-2.828l-4.586 4.586-4.586-4.586a2 2 0 0 0 -2.828 2.828l4.586 4.586-4.586 4.586a2 2 0 1 0 2.828 2.828l4.586-4.586 4.586 4.586a2 2 0 0 0 2.828-2.828z"
                            fill="currentColor"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pl-4 pr-6 mb-6 mt-2 flex justify-between w-[650px] xl:w-[100%]">
                <button
                  id="addItem"
                  style={{ backgroundColor: bgColorCode }}
                  className="rounded-md p-1 text-[12px] w-[22%] md:w-[22%] lg:w-[20%] xl:w-[13%] ml-1 flex items-center justify-around text-white opacity-[1]"
                  onClick={itemListAdd}
                >
                  <Image
                    width="16%"
                    height="10px"
                    className=""
                    src="/icons/plus.svg"
                  />
                  Add New Item
                </button>

                <div className="flex justify-between border-t-[1px] border-b-[1px] w-[75%] md:w-[67%] xl:w-[57%]">
                  <div className="flex items-center w-[70%]">
                    <input
                      className="text-[10px] mr-7 text-center w-[24%] text-[#232E38] font-[sf-pro-medium]   focus:outline-none"
                      value={labelDetails.labelSubTotal}
                      name="labelSubTotal"
                      onChange={labelOnChange}
                    />
                    <p className="text-[10px] font-[interSemiBold] w-[24%] mr-5 text-center truncate">
                      {quantityTotal}
                    </p>
                    <div className=" w-[27%] flex justify-end text-end items-center mr-5">
                      <div className="w-[100%] font-[interSemiBold] text-[10px] truncate">
                        {currencySymbol}
                        {Math.round(subtotal).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div className=" w-[45%] flex items-center justify-between">
                    <div className=" w-[55%] font-[interSemiBold] text-[10px] truncate">
                      {taxToGst ? (
                        <div className="flex justify-center">
                          <span className="w-[100%] truncate pl-5">
                            {currencySymbol}
                            {Math.round(IgstTotal).toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <div className=" flex space-x-1 font-[interSemiBold] text-[10px] truncate">
                          <span className=" w-[58%] ">
                            {currencySymbol}
                            {cGstTotal}
                          </span>
                          <span className="w-[58%] ">
                            {currencySymbol}
                            {sgstTotal}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="w-[58%] pr-3 text-end float-right font-[interSemiBold] text-[10px] truncate">
                      {currencySymbol}
                      {Math.round(Number(NetAmountTotal)).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pl-4 pr-2 flex justify-between">
              <div className="w-[53%] md:w-[60%] min-h-[150px] max-h-[100%] flex flex-col justify-end">
                <div className="border-2 hover:border-green-400 border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[96%] min-h-[50px] mb-2 max-h-[100%] p-1">
                  <input
                    className="w-[100%] font-[sfpro-regular-display] text-[12px] text-[#707070] h-[20px] focus:outline-none rounded-md"
                    value={labelDetails.labelNotes}
                    name="labelNotes"
                    onChange={labelOnChange}
                  />
                  <textarea
                    id="notes"
                    className="w-[100%] h-[20px] font-[sf-pro-medium] text-[#232E38] focus:outline-none rounded-md resize-none overflow-hidden resize-notes"
                    value={invoiceDetails.notes}
                    name="notes"
                    placeholder="Add any extra information"
                    onChange={detailsOnCng}
                  ></textarea>
                </div>
                <div className="border-2 hover:border-green-400 border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[96%] min-h-[50px] max-h-[100%] mb-2 p-1">
                  <input
                    className="w-[100%] font-[sfpro-regular-display] text-[12px] text-[#707070] h-[20px] focus:outline-none rounded-md"
                    value={labelDetails.labelTermsNCon}
                    name="labelTermsNCon"
                    onChange={labelOnChange}
                  />
                  <textarea
                    id="termsNCondition"
                    className="w-[100%] text-[12px] h-[20px] font-[sf-pro-medium] text-[#232E38] focus:outline-none rounded-md resize-none overflow-hidden resize-termsNcondition"
                    value={invoiceDetails.termsNCondition}
                    name="termsNCondition"
                    placeholder="Add terms like late fees payment methods delivery schedule etc..."
                    onChange={detailsOnCng}
                  ></textarea>
                </div>
              </div>

              <div className="w-[71%] md:w-[70%] lg:w-[33%] float-right text-right ">
                <div className="w-[44%] h-[30px] rounded-md flex justify-end items-center mr-7"></div>
                <div className="w-[100%] lg: flex font-[sfpro-regular-display] justify-end text-right text-[14px] mb-2 ">
                  {!IsDiscount ? (
                    <div
                      id="discount"
                      className="w-[43%] lg:w-[33%] xl:w-[30%] hover:cursor-pointer flex items-center"
                      onClick={discountdisplay}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-[10px] w-[20px]"
                        viewBox="0 0 11.296 11.296"
                      >
                        <path
                          id="plus"
                          d="M10.526,4.621H6.675V.77A.77.77,0,0,0,5.9,0H5.391a.77.77,0,0,0-.77.77V4.621H.77a.77.77,0,0,0-.77.77V5.9a.77.77,0,0,0,.77.77H4.621v3.851a.77.77,0,0,0,.77.77H5.9a.77.77,0,0,0,.77-.77V6.675h3.851a.77.77,0,0,0,.77-.77V5.391A.77.77,0,0,0,10.526,4.621Zm0,0"
                          fill={bgColorCode}
                        />
                      </svg>
                      <p style={{ color: bgColorCode }} className="">
                        Discount
                      </p>
                    </div>
                  ) : null}
                  {!isCess ? (
                    <div
                      id="cess"
                      className="w-[30%] lg:w-[24%] xl:w-[20%]  hover:cursor-pointer flex items-center"
                      onClick={cessDisplay}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-[10px] w-[20px]"
                        viewBox="0 0 11.296 11.296"
                      >
                        <path
                          id="plus"
                          d="M10.526,4.621H6.675V.77A.77.77,0,0,0,5.9,0H5.391a.77.77,0,0,0-.77.77V4.621H.77a.77.77,0,0,0-.77.77V5.9a.77.77,0,0,0,.77.77H4.621v3.851a.77.77,0,0,0,.77.77H5.9a.77.77,0,0,0,.77-.77V6.675h3.851a.77.77,0,0,0,.77-.77V5.391A.77.77,0,0,0,10.526,4.621Zm0,0"
                          fill={bgColorCode}
                        />
                      </svg>
                      <p style={{ color: bgColorCode }}>Cess</p>
                    </div>
                  ) : null}
                  {!isShipping ? (
                    <div
                      id="shipping"
                      className=" w-[43%] lg:w-[32%] xl:w-[30%] hover:cursor-pointer flex items-center"
                      onClick={shippingDisplay}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-[10px] w-[20px]"
                        viewBox="0 0 11.296 11.296"
                      >
                        <path
                          id="plus"
                          d="M10.526,4.621H6.675V.77A.77.77,0,0,0,5.9,0H5.391a.77.77,0,0,0-.77.77V4.621H.77a.77.77,0,0,0-.77.77V5.9a.77.77,0,0,0,.77.77H4.621v3.851a.77.77,0,0,0,.77.77H5.9a.77.77,0,0,0,.77-.77V6.675h3.851a.77.77,0,0,0,.77-.77V5.391A.77.77,0,0,0,10.526,4.621Zm0,0"
                          fill={bgColorCode}
                        />
                      </svg>
                      <p style={{ color: bgColorCode }}>Shipping</p>
                    </div>
                  ) : null}
                </div>
                {!IsDiscount ? null : (
                  <div className="w-[100%] flex group">
                    <div className="flex mb-2">
                      <input
                        className="w-[50%] text-right text-[12px] text-[#232E38] font-[sf-pro-medium] focus:outline-none pr-1 mr-1"
                        value={labelDetails.labelDiscount}
                        name="labelDiscount"
                        onChange={labelOnChange}
                      />
                      {percentToAmount.discountPercentTOAmount ? (
                        <label className="border-2 hover:border-green-400 w-[42%] h-[30px] rounded-md flex justify-between items-center p-2 mr-1">
                          <input
                            id="discountValue"
                            className="w-[70%] h-[22px] text-right font-[sf-pro-medium] text-[12px] focus:outline-none"
                            value={invoiceDetails.discount}
                            name="discount"
                            type="number"
                            autoComplete="off"
                            onChange={detailsOnCng}
                          />
                          <span className="font-[sf-pro-medium] text-[12px]">
                            %
                          </span>
                          <Image
                            width="12%"
                            height="10px"
                            id="swapDiscount"
                            className="w-[10%] cursor-pointer"
                            onClick={() =>
                              setPercentToAmount({
                                ...percentToAmount,
                                discountPercentTOAmount: false,
                              })
                            }
                            src="/icons/swap.svg"
                          />
                        </label>
                      ) : (
                        <label className="border-2 hover:border-green-400 w-[42%] h-[30px] rounded-md flex justify-between items-center p-2 mr-1">
                          <span className="font-[sf-pro-medium] text-[12px]">
                            {currencySymbol}
                          </span>
                          <input
                            id="discountAmount"
                            className="w-[70%] h-[22px] text-right font-[sf-pro-medium] text-[12px] focus:outline-none"
                            value={invoiceDetails.discount}
                            placeholder="0"
                            name="discount"
                            type="number"
                            autoComplete="off"
                            onChange={detailsOnCng}
                          />
                          <Image
                            width="12%"
                            height="10px"
                            className="w-[10%] cursor-pointer"
                            onClick={() =>
                              setPercentToAmount({
                                ...percentToAmount,
                                discountPercentTOAmount: true,
                              })
                            }
                            src="/icons/swap.svg"
                          />
                        </label>
                      )}
                      <svg
                        id="Layer_3"
                        viewBox="0 0 32 32"
                        onClick={closeDiscount}
                        className="w-[5%] hidden group-hover:block cursor-pointer text-[#989EA4] hover:text-[#009e74]"
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Layer 3"
                      >
                        <path
                          d="m18.828 16 4.586-4.586a2 2 0 1 0 -2.828-2.828l-4.586 4.586-4.586-4.586a2 2 0 0 0 -2.828 2.828l4.586 4.586-4.586 4.586a2 2 0 1 0 2.828 2.828l4.586-4.586 4.586 4.586a2 2 0 0 0 2.828-2.828z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                {!isCess ? null : (
                  <div className="w-[100%] flex group">
                    <div className="flex mb-2">
                      <input
                        className="w-[50%] text-right text-[12px] text-[#232E38] font-[sf-pro-medium] focus:outline-none pr-1 mr-1"
                        value={labelDetails.labelCess}
                        name="labelCess"
                        onChange={labelOnChange}
                      />
                      {percentToAmount.cessPercentToAmount ? (
                        <label className="border-2 hover:border-green-400 w-[42%] h-[30px] rounded-md flex justify-between items-center p-2 mr-1">
                          <input
                            id="cessValue"
                            placeholder="0"
                            // id="discount"
                            className="w-[70%] h-[22px] text-right font-[sf-pro-medium] text-[12px] focus:outline-none"
                            value={Number(invoiceDetails.cess)}
                            name="cess"
                            type="number"
                            autoComplete="off"
                            onChange={detailsOnCng}
                          />
                          <span className="font-[sf-pro-medium] text-[12px]">
                            %
                          </span>
                          <Image
                            width="12%"
                            height="10px"
                            id="swapDiscount"
                            className="w-[10%] cursor-pointer"
                            onClick={() =>
                              setPercentToAmount({
                                ...percentToAmount,
                                cessPercentToAmount: false,
                              })
                            }
                            src="/icons/swap.svg"
                          />
                        </label>
                      ) : (
                        <label className="border-2 hover:border-green-400 w-[42%] h-[30px] rounded-md flex justify-between items-center p-2 mr-1">
                          <span className="font-[sf-pro-medium] text-[12px]">
                            {currencySymbol}
                          </span>
                          <input
                            id="discountAmount"
                            placeholder="0"
                            className="w-[70%] h-[22px] text-right font-[sf-pro-medium] text-[12px] focus:outline-none"
                            value={Number(invoiceDetails.cess)}
                            name="cess"
                            type="number"
                            autoComplete="off"
                            onChange={detailsOnCng}
                          />
                          <Image
                            width="12%"
                            height="10px"
                            className="w-[10%] cursor-pointer"
                            onClick={() =>
                              setPercentToAmount({
                                ...percentToAmount,
                                cessPercentToAmount: true,
                              })
                            }
                            src="/icons/swap.svg"
                          />
                        </label>
                      )}
                      <svg
                        id="Layer_3"
                        viewBox="0 0 32 32"
                        onClick={closeCess}
                        className="w-[5%] hidden group-hover:block cursor-pointer text-[#989EA4] hover:text-[#009e74]"
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Layer 3"
                      >
                        <path
                          d="m18.828 16 4.586-4.586a2 2 0 1 0 -2.828-2.828l-4.586 4.586-4.586-4.586a2 2 0 0 0 -2.828 2.828l4.586 4.586-4.586 4.586a2 2 0 1 0 2.828 2.828l4.586-4.586 4.586 4.586a2 2 0 0 0 2.828-2.828z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {!isShipping ? null : (
                  <div className="w-[100%] group">
                    <div className="flex">
                      <input
                        className="w-[50%] text-right text-[12px] text-[#232E38] font-[sf-pro-medium] focus:outline-none pr-1 mr-1"
                        value={labelDetails.labelShipping}
                        name="labelShipping"
                        onChange={labelOnChange}
                      />
                      <label className="border-2 hover:border-green-400 w-[42%] h-[30px] rounded-md flex justify-between items-center p-2 mr-1">
                        <span className="font-[sf-pro-medium] text-[12px]">
                          {currencySymbol}
                        </span>
                        <input
                          id="shippingValue"
                          // id="discountAmount"
                          className="w-[70%] h-[22px] text-right font-[sf-pro-medium] text-[12px] focus:outline-none"
                          value={invoiceDetails.shipping}
                          name="shipping"
                          placeholder="0"
                          type="number"
                          autoComplete="off"
                          onChange={detailsOnCng}
                        />
                      </label>
                      <svg
                        id="Layer_3"
                        viewBox="0 0 32 32"
                        onClick={closeShipping}
                        className="w-[5%] hidden group-hover:block cursor-pointer text-[#989EA4] hover:text-[#009e74]"
                        xmlns="http://www.w3.org/2000/svg"
                        data-name="Layer 3"
                      >
                        <path
                          d="m18.828 16 4.586-4.586a2 2 0 1 0 -2.828-2.828l-4.586 4.586-4.586-4.586a2 2 0 0 0 -2.828 2.828l4.586 4.586-4.586 4.586a2 2 0 1 0 2.828 2.828l4.586-4.586 4.586 4.586a2 2 0 0 0 2.828-2.828z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </div>
                )}
                <div className="flex justify-between mb-1">
                  <input
                    className=" text-right text-[12px] w-[50%] text-[#232E38] font-[sf-pro-medium] focus:outline-none"
                    value={labelDetails.labelTotal}
                    name="labelTotal"
                    onChange={labelOnChange}
                  />
                  <p className="w-[43%] h-[30px] rounded-md  mr-4">
                    <span className=" font-[sf-pro-medium] text-[12px]">
                      {currencySymbol}
                    </span>
                    <span className="w-[100%] font-[sf-pro-medium] text-[12px]">
                      {Number(Math.round(total)).toFixed(2)}
                    </span>
                  </p>
                </div>
                <div className="flex justify-between mb-1">
                  <input
                    className="w-[50%] text-right text-[12px] text-[#232E38] font-[sf-pro-medium] focus:outline-none"
                    value={labelDetails.labelAmountPaid}
                    name="labelAmountPaid"
                    onChange={labelOnChange}
                  />
                  <label className="border-2 hover:border-green-400 w-[43%] h-[30px] rounded-md flex justify-between items-center p-2 mr-4">
                    <span className="font-[sf-pro-medium] text-[12px]">
                      {currencySymbol}
                    </span>
                    <input
                      id="amountPaid"
                      type="number"
                      autoComplete="off"
                      className="w-[70%] h-[22px] text-right font-[sf-pro-medium] text-[12px] focus:outline-none"
                      value={
                        (invoiceDetails.amountPaid =
                          invoiceDetails.amountPaid <= Number(total)
                            ? invoiceDetails.amountPaid
                            : "")
                      }
                      name="amountPaid"
                      onChange={detailsOnCng}
                    />
                  </label>
                </div>
                <div className="flex justify-between mb-2">
                  <input
                    className="text-right text-[12px] text-[#232E38] font-[sf-pro-medium] w-[50%] focus:outline-none"
                    value={labelDetails.labelBalanceDue}
                    name="labelBalanceDue"
                    onChange={labelOnChange}
                  />
                  <p className=" w-[43%] h-[30px] rounded-md  mr-4">
                    <span className="font-[sf-pro-medium] text-[12px]">
                      {currencySymbol}
                    </span>
                    <span className="font-[sfpro-semiBold] font-[100] text-[12px]">
                      {Math.round(total - invoiceDetails.amountPaid).toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="pl-6 md:w-[60%] sm:w-[70%] lg:w-[30%]">
            <SideBar
              detailsCallback={invoiceDetails}
              itemListCallBack={itemList}
              detailsLabelCallBack={labelDetails}
              colorValue={bgClrCode}
              imageData={image}
              backGroundcolor={bgColorCode}
              disableState={stateDisable}
              previewDisable={previewState}
              taxToGstState={taxToGst}
              perToAmount={percentToAmount}
              finalCurrencySymbol={currencySymbol}
              finalCurrencyId={currencyId}
              openCurrency={openPopUp}
              isEdit={location?.isEdit} // ? true : false
              editId={location?.id}
              balanceAmount={Number(
                Math.round(total - invoiceDetails.amountPaid)
              ).toFixed(2)}
              isDefault={saveDefault}
              pdfDownLoad={(data) => setIsPdfDownload(data)}
              pdfDownloadState={isPdfDownload}
              storeDetails={saveDetails}
              isStore={storeState}
              isdiscountNeed={IsDiscount}
              isTaxNeed={isTax}
              isCessNeed={isCess}
              isShippingNeed={isShipping}
            />
          </div>
        </div>
        <div>
          <FeedBackButton
            Src="/images/GST One Pro.png"
            Path="/"
            appName="InvoiceGenerator"
          />
        </div>
        <div className="p-3 text-center text-[12px] font-[sf-pro-medium] ">
          <span>© 2023 </span>
          <a href="https://alphabsolutions.com/">
            Alpha Business Solutions Pvt. Ltd.
          </a>
          All Rights Reserved.
        </div>
      </div>
    </>
  );
};

export default HomePage;
