import React, { useEffect, useState } from "react";
import Image from "next/image";
import SideBar from "../../components/billHive/side-bar/SideBar";
import { useRouter } from "next/router";
import CurrencyPopUp from "./currency-popup/CurrencyPopUp";
import SaveDefault from "./save-default-popup/SaveDefaultPopUp";
import BtoolsHeader from "../../container/72BTheader/BToolsHeader";
import PouchDB from "pouchdb";
import Service from "../../services/billHive/services";
import FeedBackButton from "../../container/72FeedBackButton/feedBackButton";
const HomePage = () => {
  const [itemList, setItemList] = useState([
    {
      item: "",
      quality: "",
      rate: "",
      amount: "",
    },
  ]);
  const router = useRouter();
  const location = router.query.data ? JSON.parse(router.query.data) : null;
  const [stateDisable, setStateDisable] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [isPdfDownload, setIsPdfDownload] = useState(false);
  const [storePopUp, setStorePopUp] = useState(false);
  const [IsDiscount, setIsDiscount] = useState(false);
  const [isTax, setIsTax] = useState(false);
  const [billHiveHistory, setBillHiveHistory] = useState({});
  const [billHiveActiveData, setBillHiveActiveData] = useState({});
  const [billHiveDefaultData, setBillHiveDefaultData] = useState({});
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
  });
  const [taxToGst, setTaxToGst] = useState(true);
  const [saveDefault, setSaveDefault] = useState(true);
  const [previewState] = useState(true);
  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNum: 0,
    billFrom: "",
    billTo: "",
    shipTo: "",
    billDate: "",
    dueDate: "",
    paymentTerms: "",
    poNumber: "",
    notes: "",
    termsNCondition: "",
    discount: "",
    tax: "",
    sGst: "",
    cGst: "",
    shipping: "",
    amountPaid: "",
    balanceDue: "",
  });
  const [showErrMSg, setShowErrMSg] = useState(false);
  const [messageToDisplay, setMessageToDisplay] = useState({
    imageOption:"Only jpg/jpeg and png files are allowed!"
  });

  const currentTime = new Date();
  const month = currentTime.getMonth() + 1;
  const day = currentTime.getDate();
  const year = currentTime.getFullYear();
  const newdate =
    day < 10
      ? year + "-" + "0" + month + "-" + "0" + day
      : year + "-" + "0" + month + "-" + day;

  const [click,setClick] = useState(false);
  const [bgColorCode, setBgColorCode] = useState("#FFA726");
  const [validationColour, setValidationColour] = useState(false);
  const [inputData, setInputData] = useState();
  const [labelDetails, setLabelDetails] = useState({
    labelInvoice: "INVOICE",
    labelBillFrom: "Bill From",
    labelBillTo: "Bill To",
    labelShipTO: "Ship To",
    labelDate: "Date",
    labelPaymentTerms: "Payment Terms",
    labelDueDate: "Due Date",
    labelPoNum: "PO Number",
    labelItem: "ITEM",
    labelQuantity: "QUANTITY",
    labelRate: "RATE",
    labelAmount: "AMOUNT",
    labelNotes: "Notes",
    labelTermsNCon: "Terms & Condition",
    labelSubTotal: "SUB TOTAL",
    labelDiscount: "DISCOUNT",
    labelTax: "SALES TAX",
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
  const [openPopup, setOpenPopup] = useState(false)
  const chgColorClk = (colorCode) => {
    setBgColorCode(colorCode)
  }
  const itemListAdd = () => {
    setItemList([
      ...itemList,
      {
        item: "",
        quality: "",
        rate: "",
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
        list[index][name] = value
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
      // alert("Please enter text only");
      // setErrorValidation(true);
    }
    setSaveDefault(false);
    // const getActiveData = JSON.parse(
    //   localStorage.getItem("billHiveActiveData")
    // );
    var db = new PouchDB("BillHive");
    db.get("billHiveActiveData", function (err, doc) {
      if (err) {
        var doc = {
          _id: "billHiveActiveData",
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
    // v)
    // if (getActiveData) {
    //   localStorage.setItem(
    //     "billHiveActiveData",
    //     JSON.stringify({ ...getActiveData, itemList, isActive: true })
    //   );
    // } else {
    //   localStorage.setItem(
    //     "billHiveActiveData",
    //     JSON.stringify({ ...getActiveData, itemList, isActive: true })
    //   );
    // }
  };
  const subtotal = itemList
    .reduce((total, item) => total + item.quality * item.rate, 0)
    .toFixed(2);

  const total = (
    Number(subtotal) +
    (taxToGst
      ? (percentToAmount.taxPercentTOAmount
        ? Number(
          (invoiceDetails.tax *
            (subtotal - (invoiceDetails.discount * subtotal) / 100)) /
          100
        )
        : Number(invoiceDetails.tax)) +
      (isShipping ? Number(invoiceDetails.shipping) : null) -
      (percentToAmount.discountPercentTOAmount
        ? Number((invoiceDetails.discount * subtotal) / 100)
        : Number(invoiceDetails.discount))
      : (percentToAmount.sGstPercentTOAmount
        ? Number(
          (invoiceDetails.sGst *
            (subtotal - (invoiceDetails.discount * subtotal) / 100)) /
          100
        )
        : Number(invoiceDetails.sGst)) +
      (percentToAmount.cGstPercentTOAmount
        ? Number(
          (invoiceDetails.cGst *
            (subtotal - (invoiceDetails.discount * subtotal) / 100)) /
          100
        )
        : Number(invoiceDetails.cGst)) +
      (isShipping ? Number(invoiceDetails.shipping) : null) -
      (percentToAmount.discountPercentTOAmount
        ? Number((invoiceDetails.discount * subtotal) / 100)
        : Number(invoiceDetails.discount)))
  ).toFixed(2);

  if (typeof window !== "undefined" && click== true) {
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
      console.log(this.scrollHeight,"this.scrollHeight")
    }
  } else {
    console.log("Say helloo")
  
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
        // name === 'invoiceNum' ||
        name === "discount" ||
          name === "tax" ||
          name === "sGst" ||
          name === "cGst" ||
          name === "amountPaid"
          ? value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1")
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

    // const getActiveData = JSON.parse(
    //   localStorage.getItem("billHiveActiveData")
    // );
    var db = new PouchDB("BillHive");
    db.get("billHiveActiveData", function (err, doc) {
      if (err) {
        var doc = {
          _id: "billHiveActiveData",
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
    // if (getActiveData) {
    //   localStorage.setItem(
    //     "billHiveActiveData",
    //     JSON.stringify({ ...getActiveData, data, isActive: true })
    //   );
    // } else {
    //   localStorage.setItem(
    //     "billHiveActiveData",
    //     JSON.stringify({ ...getActiveData, data, isActive: true })
    //   );
    // }
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
    // const getActiveData = JSON.parse(
    //   localStorage.getItem("billHiveActiveData")
    // );
    var db = new PouchDB("BillHive");
    db.get("billHiveActiveData", function (err, doc) {
      if (err) {
        var doc = {
          _id: "billHiveActiveData",
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
    // if (getActiveData) {
    //   localStorage.setItem(
    //     "billHiveActiveData",
    //     JSON.stringify({ ...getActiveData, labelDetails, isActive: true })
    //   );
    // } else {
    //   localStorage.setItem(
    //     "billHiveActiveData",
    //     JSON.stringify({ ...getActiveData, labelDetails, isActive: true })
    //   );
    // }
  };
  const deleteItem = (index) => {
    const list = [...itemList];
    list.splice(index, 1);
    setItemList(list);
  };
  const handleChange = (e) => {
    if (e.target.value.length > 16) {
      alert("Maximum limit reached (16 characters)");
      return;
    }
    // Continue updating state or performing other actions as needed
    setInvoiceDetails({
      ...invoiceDetails,
      [e.target.name]: e.target.value
    });
  };

  const validateFile = (fileObj) => {
    const docSize = fileObj.size / 1024 / 1024;
    // console.log(docSize, "-DOCSIZE");
    // console.log(fileObj.name.match(/(\.jpg|\.JPG)$/), "FILEOBJ");
    if (docSize < 1 && fileObj.name.match(/(\.jpg|\.JPG|\.png|\.PNG|\.jpeg|\.JPEG)$/)) {
      return true;
    } else {
      return false;
    }
  };

  const imageFileHandler = (e) => {
    const file = e.target.files &&  e.target.files[0];
    if (!file) {
      return;
    }
    let isValid = validateFile(file);

    if (isValid) {

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setImage({ ...image, profilePic: [reader.result], ImageUploaded: true });
      const images = {
        profilePic: [reader.result],
        ImageUploaded: true,
      };
      setShowErrMSg(false);

      // const getActiveData = JSON.parse(
      //   localStorage.getItem("billHiveActiveData")
      // );
      var db = new PouchDB("BillHive");
      db.get("billHiveActiveData", function (err, doc) {
        if (err) {
          var doc = {
            _id: "billHiveActiveData",
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
      // if (getActiveData) {
      //   localStorage.setItem(
      //     "billHiveActiveData",
      //     JSON.stringify({ ...getActiveData, images, isActive: true })
      //   );
      // } else {
      //   localStorage.setItem(
      //     "billHiveActiveData",
      //     JSON.stringify({ ...getActiveData, images, isActive: true })
      //   );
      // }
    };
  }
  else{
    handleCancel()
    setShowErrMSg(true);
    
  }
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
    // const getActiveData = JSON.parse(
    //   localStorage.getItem("billHiveActiveData")
    // );
    var db = new PouchDB("BillHive");
    db.get("billHiveActiveData", function (err, doc) {
      if (err) {
        var doc = {
          _id: "billHiveActiveData",
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
    // if (getActiveData) {
    //   localStorage.setItem(
    //     "billHiveActiveData",
    //     JSON.stringify({ ...getActiveData, images, isActive: true })
    //   );
    // } else {
    //   localStorage.setItem(
    //     "billHiveActiveData",
    //     JSON.stringify({ ...getActiveData, images, isActive: true })
    //   );
    // }
  };

  const keyUp = (event) => {
    setInputData(event.target.name);
    if (event.target.value > newdate) {
      setValidationColour(true);
      setInvoiceDetails({ ...invoiceDetails, billDate: "" });
    }
  };
  const keyDown = (event) => {
    const myYear =
      day < 10
        ? year + 10 + "-" + "0" + month + "-" + "0" + day
        : year + 10 + "-" + "0" + month + "-" + day;
    let value = event.target.value;
    setInputData(event.target.name);
    if (invoiceDetails.billDate === "") {
      setValidationColour(true);
      setInvoiceDetails({ ...invoiceDetails, dueDate: "" });
    } else {
      if (event.target.value < invoiceDetails.billDate) {
        setInvoiceDetails({ ...invoiceDetails, dueDate: "" });
        setValidationColour(true);
      } else if (event.target.value > myYear) {
        setInvoiceDetails({ ...invoiceDetails, dueDate: "" });
      }
    }
  };
  const keyUpDueData = (event) => {
    const myYear =
      day < 10
        ? year + 10 + "-" + "0" + month + "-" + "0" + day
        : year + 10 + "-" + "0" + month + "-" + day;

    if (event.target.value > myYear) {
      setInvoiceDetails({ ...invoiceDetails, dueDate: "" });
    }
  };

  useEffect(() => {
    // const getItem = JSON.parse(localStorage.getItem("billHiveDefault"));
    // const getHistory = JSON.parse(
    //   localStorage.getItem("billHiveInvoiceHistory")
    // );
    // const getActiveData = JSON.parse(
    //   localStorage.getItem("billHiveActiveData")
    // );
    (async function Change() {
      const billHiveHistory = await Service.getBillHiveHistory();

      const billHiveActiveData = await Service.getBillHiveActiveData();
      const billHiveDefaultData = await Service.getBillHiveDefaultData();
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
          labelTax: location.detailsLabel.labelTax,
          labelTermsNCon: location.detailsLabel.labelTermsNCon,
          labelTotal: location.detailsLabel.labelTotal,
          labelShipping:location.detailsLabel.labelShipping
        });
        setCurrencySymbol(location.currencyValue);
        setBgColorCode(location.colorValue);
        setIsDiscount(location.discountNeed);
        setIsTax(location.taxNeed);
        setIsShipping(location.shippingNeed);
      } else {
        if (!billHiveActiveData.data?.isActive) {
          if (billHiveDefaultData.data) {
            if (billHiveDefaultData.data.itemDetails.invoiceNum) {
              billHiveDefaultData.data.itemDetails.invoiceNum = billHiveHistory
                .data?.length
                ? billHiveHistory.data?.length + 1
                : 1;
            }
            setItemList(billHiveDefaultData.data?.itemList);
            setInvoiceDetails(billHiveDefaultData.data?.itemDetails);
            setLabelDetails(billHiveDefaultData.data.detailsLabel);
            setPercentToAmount(billHiveDefaultData.data.perTAmount);
            setCurrencySymbol(billHiveDefaultData.data.currencyValue);
            setImage(billHiveDefaultData.data.uploadImage);
            setBgColorCode(billHiveDefaultData.data.bgColorValue);
            setIsDiscount(billHiveDefaultData.data.discountNeed);
            setIsTax(billHiveDefaultData.data.taxNeed);
            setIsShipping(billHiveDefaultData.data.shippingNeed);
          } else if (
            billHiveHistory.data?.length == undefined ||
            billHiveHistory.data?.length == 0
          ) {
            setInvoiceDetails({ ...invoiceDetails, invoiceNum: 1 });
          } else {
            setInvoiceDetails({
              ...invoiceDetails,
              invoiceNum: billHiveHistory.data?.length + 1,
            });
          }
        } else {
          if (billHiveActiveData.data?.invoiceDetails?.invoiceNum) {
            billHiveActiveData.data.invoiceDetails.invoiceNum = billHiveHistory
              .data?.length
              ? billHiveHistory.data.length + 1
              : 1;
          }
          setItemList(
            billHiveActiveData.data?.itemList
              ? billHiveActiveData.data?.itemList
              : itemList
          );
          setInvoiceDetails(
            billHiveActiveData.data?.data ? billHiveActiveData.data?.data : invoiceDetails
          );
          setLabelDetails(
            billHiveActiveData.data?.labelDetails
              ? billHiveActiveData.data?.labelDetails
              : labelDetails
          );
          setImage(
            billHiveActiveData.data?.images
              ? billHiveActiveData.data?.images
              : image
          );
        }
      }
    })();
  }, []);
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
  const taxDisplay = () => {
    setIsTax(true);
  };
  const closeTax = () => {
    setIsTax(false);
  };
  const shippingDisplay = () => {
    setIsShipping(true);
  };
  const closeShipping = () => {
    setIsShipping(false);
  };
  const openPopupPdf = () => {
    setOpenPopup(true)
  }
  const handleClosePopup=()=>{
    setOpenPopup(false)
  }
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
          <BtoolsHeader Src="/images/btBillHive.png" Height="45" Width="100" />
        </div>
        {/* mobile res */}
        <div className="md:hidden lg:hidden block">
          <div className="bg-[#e6e9ed] w-full h-[185vh] flex justify-around items-center">
            <div className="h-[190vh] w-[90%] flex justify-around items-center">
              <div className="bg-white  rounded-[10px] h-auto w-full">
                <div style={{ backgroundColor: bgColorCode }} className={`bg-[${bgColorCode}] flex flex-row rounded-[10px] h-[30vh] w-full`}>
                  <div className="w-[50%] h-[30vh] flex justify-center items-center">
                    <div className="bg-white w-[80%] h-[130px] text-[12px] rounded-lg flex flex-col justify-center hover:cursor-pointer">
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
                            accept="image/png,image/jpeg"
                            onChange={imageFileHandler}
                          />
                          {
                      showErrMSg?(
                        <span>
                          <br />
      
                          <p className="text-[#FF1D1D] text-[10px]  w-40">
                            {messageToDisplay.imageOption}
                          </p>
                        </span>
                      ) : null
                    }
                        </section>
                      ) : (
                        <button
                          className=" w-[100%] flex flex-col cursor-pointer z-50"
                          // variant="text"
                          onChange={imageFileHandler}
                        >
                          <span className="w-[100%] h-[35px] top-[75px] relative flex flex-col justify-center items-center cursor-pointer">
                            <Image
                              width="18%"
                              height="18px"
                              className=" h-[18px] cursor-pointer"
                              src="/icons/photo-camera.svg"
                            />
                            <label className="text-center relative top-[10px] text-[10px] cursor-pointer">
                              ADD YOUR COMPANY LOGO HERE
                            </label>
                          </span>
                          <input
                            id="addProfilebtn"
                            className="opacity-0 relative w-[170px] bottom-6 h-[175px] cursor-pointer"
                            type="file"
                            accept="image/png,image/jpeg"
                            onChange={imageFileHandler}
                          />
                          {
                      showErrMSg?(
                        <span>
                          
      
                          <p className="text-[#FF1D1D] text-[10px]  w-40">
                            {messageToDisplay.imageOption}
                          </p>
                        </span>
                      ) : null
                    }
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="w-[50%] flex flex-col h-[30vh]">
                    <div className="w-full flex flex-col pt-[25px] items-center h-[20vh]">
                      <div className="text-[13px] text-white pl-2 pb-3 font-[sfpro-Regular]">
                        CHANGE THEME
                      </div>
                      <div className="w-[85%] bg-opacity-[80%] bg-white md:x-[36%] lg:w-[43%] xl:w-[32%] h-[58px] flex justify-evenly items-center rounded-lg flex-wrap mb-[15px] overflow-auto scrollBar">
                        <button
                          id="color1"
                          className="w-[23px] h-[23px] rounded-full bg-[#42A5F5]"
                          onClick={() => chgColorClk("#42A5F5")}
                        >
                          {bgColorCode == "#42A5F5" ?
                            <Image height={15} width={15} src="/icons/check.svg" /> : null}
                        </button>
                        <button
                          id="color2"
                          className="w-[23px] h-[23px] rounded-full bg-[#66BB6A]"
                          onClick={() => chgColorClk("#66BB6A")}
                        >
                          {bgColorCode == "#66BB6A" ?
                            <Image height={15} width={15} src="/icons/check.svg" /> : null}
                        </button>
                        <button
                          id="color3"
                          className="w-[23px] h-[23px] rounded-full bg-[#FFA726]"
                          onClick={() => chgColorClk("#FFA726")}
                        >
                          {bgColorCode == "#FFA726" ?
                            <Image height={15} width={15} src="/icons/check.svg" /> : null}
                        </button>
                        <button
                          id="color4"
                          className="w-[23px] h-[23px] rounded-full bg-[#EF5350]"
                          onClick={() => chgColorClk("#EF5350")}
                        >
                          {bgColorCode == "#EF5350" ?
                            <Image height={15} width={15} src="/icons/check.svg" /> : null}
                        </button>
                        <button
                          id="color5"
                          className="w-[23px] h-[23px] rounded-full bg-[#AB47BC]"
                          onClick={() => chgColorClk("#AB47BC")}
                        >
                          {bgColorCode == "#AB47BC" ?
                            <Image height={15} width={15} src="/icons/check.svg" /> : null}
                        </button>
                        <button
                          id="color6"
                          className="w-[23px] h-[23px] rounded-full bg-[#EC407A]"
                          onClick={() => chgColorClk("#EC407A")}
                        >
                          {bgColorCode == "#EC407A" ?
                            <Image height={15} width={15} src="/icons/check.svg" /> : null}
                        </button>
                        <button
                          id="color7"
                          className="w-[23px] h-[23px] rounded-full bg-[#7E57C2]"
                          onClick={() => chgColorClk("#7E57C2")}
                        >
                          {bgColorCode == "#7E57C2" ?
                            <Image height={15} width={15} src="/icons/check.svg" /> : null}
                        </button>
                        <button
                          id="color8"
                          className="w-[23px] h-[23px] rounded-full bg-[#009688]"
                          onClick={() => chgColorClk("#009688")}
                        >
                          {bgColorCode == "#009688" ?
                            <Image height={15} width={15} src="/icons/check.svg" /> : null}
                        </button>
                        <button
                          className="w-[23px] h-[23px] rounded-full bg-[#FF7043]"
                          onClick={() => chgColorClk("#FF7043")}
                        >
                          {bgColorCode == "#FF7043" ?
                            <Image height={15} width={15} src="/icons/check.svg" /> : null}
                        </button>
                        <button
                          id="colorBlack"
                          className="w-[23px] h-[23px] rounded-full bg-[#232E38]"
                          onClick={() => chgColorClk("#232E38")}
                        >
                          {bgColorCode == "#232E38" ?
                            <Image height={15} width={15} src="/icons/check.svg" /> : null}
                        </button>
                      </div>
                    </div>
                    <div className="w-full h-[15vh]">
                      <div className="h-[14vh] pr-[10px] flex flex-col justify-start items-end">
                        <input
                          style={{ backgroundColor: bgColorCode }}
                          className="text-white focus:outline-none w-full pb-[10px] text-right font-[interSemiBold]"
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
                  </div>
                </div>
                <div className="h-auto flex flex-col items-center w-full">
                  {/* inputs */}

                  <div className="h-[65vh] mt-[10px] flex justify-center w-full lg:block ">
                    <div className="bg-white flex flex-col justify-between mt-1 w-[90%] h-[full]">
                      <div
                        className={`border-2 focus:border-[#707070]/25 hover:border-green-400 rounded-md flex flex-col text-[12px] w-full min-h-[40px] max-h-[100%] p-1 ${validationColour && inputData === "billFrom"
                          ? "border-red-500"
                          : "border-[#707070]/25"
                          }`}
                      >
                        <input
                          className="w-[100%] h-[20px] font-[sfpro-regular-display] text-[12px] text-[#707070] focus:outline-none rounded-md"
                          value={labelDetails.labelBillFrom}
                          name="labelBillFrom"
                          onChange={labelOnChange}
                        />
                        <textarea
                          id="billFrom"
                          className="w-[100%] resize-none h-[20px] block overflow-hidden font-[sf-pro-medium] text-[#232E38] focus:outline-none rounded-md resize-ta"
                          value={invoiceDetails.billFrom}
                          name="billFrom"
                          placeholder="Invoice From"
                          onChange={detailsOnCng}
                        ></textarea>
                      </div>
                      <div
                        className={`border-2 hover:border-green-400 rounded-md flex flex-col text-[12px] w-full min-h-[50px] max-h-[100%] p-1 mt-1 ${validationColour && inputData === "billTo"
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
                          placeholder="Invoice To"
                          onChange={detailsOnCng}
                        ></textarea>
                      </div>
                      <div className="border-2 hover:border-green-400 border-[#707070]/25 rounded-md flex flex-col text-[12px] w-full min-h-[50px] max-h-[100%] p-1 mt-1">
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
                          placeholder="(Optional)"
                          onChange={detailsOnCng}
                        ></textarea>
                      </div>
                      <div
                        className={`border-2 hover:border-green-400 ${validationColour && inputData === "billDate"
                          ? "border-red-500"
                          : "border-[#707070]/25"
                          } rounded-md flex flex-col mt-[4px] text-[12px] mb-1 w-full h-[50px] p-1`}
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
                            // max={newdate}
                            // onKeyUp={keyUp}
                            id='newdate'
                            onKeyDown={(e) => e.preventDefault()}
                            onKeyUp={(e) => e.preventDefault()}
                            type="date"
                            name="billDate"
                            onChange={detailsOnCng}
                          />
                        </div>
                      </div>
                      <div
                        className={`border-2 hover:border-green-400  ${validationColour && inputData === "dueDate"
                          ? "border-red-500"
                          : "border-[#707070]/25"
                          } rounded-md flex flex-col text-[12px] w-full h-[50px] p-1`}
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
                      <div className="border-2 mt-[4px] hover:border-green-400 border-[#707070]/25 rounded-md flex flex-col text-[12px] w-full h-[50px] p-1">
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
                      <div className="border-2 mt-[4px] hover:border-green-400 border-[#707070]/25 rounded-md flex flex-col text-[12px] w-full h-[50px] p-1">
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
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
 
                  {/* inputs end */}
                  {/* map start */}
                  <div className="mt-5 h-[30vh] w-[90%]">
                    <div className="w-full  h-[20vh] pt-2 overflow-x-auto">
                      
                      <div className="w-[50rem]  rounded-lg bg-red-200">
                        <input
                          id="TestlabelItem"
                          className="w-[55%] focus:outline-none truncate bg-[#232E38] text-white rounded-tl-md rounded-bl-md text-[10px] font-[sf-pro-medium] h-[30px] pl-3"
                          value={labelDetails.labelItem}
                          name="labelItem"
                          onChange={labelOnChange}
                        />
                        <input
                          id="TestlabelQuantity"
                          className="w-[15%] focus:outline-none pl-2 truncate bg-[#232E38] text-white text-center text-[10px] font-[sf-pro-medium] h-[30px]"
                          value={labelDetails.labelQuantity}
                          name="labelQuantity"
                          onChange={labelOnChange}
                        />
                        <input
                          id="TestlabelRate"className="w-[15%] focus:outline-none pl-2 truncate bg-[#232E38] text-white text-center text-[10px] font-[sf-pro-medium] h-[30px]"
                          value={labelDetails.labelRate}
                          name="labelRate"
                          onChange={labelOnChange}
                        />
                        <input
                          id="TestlabelAmount"
                          className="w-[15%] focus:outline-none truncate bg-[#232E38] text-white text-center text-[10px] font-[sf-pro-medium] rounded-br-md rounded-tr-md h-[30px]"
                          value={labelDetails.labelAmount}
                          name="labelAmount"
                          onChange={labelOnChange}
                        />
                      </div>
                      <div>
                        {itemList.map((item, index) => {
                          return (
                            <div
                              key={index}
                              id={index}
                              className="pb-1 border-[#707070]/25 pt-2 flex w-[50rem] group"
                            >
                              <textarea
                                id="item"
                                className={`w-[62%] mr-[9px] border-2 focus:border-green-400 h-[33px] min-h-[33px] text-[12px] font-[sf-pro-medium] text-[#232E38] focus:outline-none p-2 rounded-lg border-[#707070]/25 overflow-hidden resize-none resize-item${index}`}
                                value={item.item}
                                name="item"
                                placeholder="Description of service or product..."
                                onChange={(event) => itemListOnCng(event, index)}
                              ></textarea>
                              <input
                                id="quality"
                                autoComplete="off"
                                placeholder="1"
                                type="number"
                                className="w-[14%] mr-[10px] h-[33px] text-[12px] focus:border-green-400 font-[sf-pro-medium] text-[#232E38] p-2 focus:outline-none rounded-lg border-2 border-[#707070]/25"
                                value={item.quality}
                                name="quality"
                                onChange={(event) => itemListOnCng(event, index)}
                              />
                              <div
                                id={index}
                                className="w-[14%] mr-[10px] h-[33px] text-right  text-[12px] rounded-lg border-[#707070]/25 flex items-center"
                              >
                                <span className="p-2">{currencySymbol}</span>
                                <input
                                  id="rate"
                                  placeholder="0"
                                  type="number"
                                  autoComplete="off"
                                  className="w-[100%] h-[33px] font-[sf-pro-medium] p-2 border-2 text-[#232E38] border-[#707070]/25 focus:border-green-400 focus:outline-none rounded-lg text-right text-[12px]"
                                  value={item.rate}
                                  name="rate"
                                  onChange={(event) => itemListOnCng(event, index)}
                                />
                              </div>
                              <div className="w-[18%] mr-[10px] h-[33px] text-right text-[12px] focus:outline-none border-[#707070]/25 flex items-center">
                                <span className="p-2">{currencySymbol}</span>
                                <input
                                  className="w-[100%] h-[33px] font-[sf-pro-medium] text-[#232E38] border-2 p-2 focus:border-green-400 rounded-lg text-right text-[12px] focus:outline-none"
                                  readOnly
                                  value={Number(
                                    (item.amount = item.quality * item.rate)
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
                      </div>
                    </div>
                    <div className="w-full mb-[20px] mt-[20px] pl-[20px]">
                      <button
                        id="addItem"
                        style={{ backgroundColor: bgColorCode }}
                        className="rounded-md p-2 text-[12px] w-[45%] flex items-center justify-around text-white opacity-[1]"
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
                    </div>
                  </div>
                  {/* map end */}
                  {/* total start */}
                  <div className="max-h-[38vh] w-[90%]">
                    <div className="max-h-[38vh] w-full">
                      <div className="w-full float-right text-right">
                        <div className="flex justify-between mb-2">
                          <input
                            className="text-right text-[12px] w-[50%] text-[#232E38] font-[sfpro-regular-display] focus:outline-none"
                            value={labelDetails.labelSubTotal}
                            name="labelSubTotal"
                            onChange={labelOnChange}
                          />
                          <div className=" w-[44%] h-[30px] rounded-md flex justify-end items-center mr-7">
                            {/* <span>$</span> */}
                            <p className="w-[94%] font-[sf-pro-medium] text-[12px] ">
                              {currencySymbol}
                              {subtotal}
                            </p>
                          </div>
                        </div>
                        <div className="w-[100%] flex font-[sfpro-regular-display] justify-end text-right text-[14px] mb-2">
                          {!IsDiscount ? (
                            <div
                              id="discount"
                              className="w-[30%] hover:cursor-pointer flex items-center"
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
                          {!isTax ? (
                            <div
                              id="tax"
                              className="w-[20%]  hover:cursor-pointer flex items-center"
                              onClick={taxDisplay}
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
                              <p style={{ color: bgColorCode }}>Tax</p>
                            </div>
                          ) : null}
                          {!isShipping ? (
                            <div
                              id="shipping"
                              className="w-[30%] hover:cursor-pointer flex items-center"
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
                                className="w-[50%] text-right text-[12px] text-[#232E38] font-[sf-pro-medium] focus:outline-none pr-1 mr-1 "
                                value={labelDetails.labelDiscount}
                                name="labelDiscount"
                                onChange={labelOnChange}
                              />
                              {percentToAmount.discountPercentTOAmount ? (
                                <label className="border-2 hover:border-green-400 w-[42%] h-[30px] rounded-md flex justify-between items-center p-2 mr-1">
                                  <input
                                    id="discountValue"
                                    // id="discount"
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
                                // <img/>
                              )}
                              <svg
                                id="Layer_3"
                                viewBox="0 0 32 32"
                                onClick={closeDiscount}
                                className="w-[7%] hidden group-hover:block cursor-pointer text-[#989EA4] hover:text-[#009e74]"
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
                        {!isTax ? null : (
                          <div className="w-[100%] flex group">
                            {taxToGst ? (
                              <div className="w-[100%] flex mb-2">
                                <div className="pr-1 w-[50%]">
                                  <input
                                    className="w-[50%]  text-right text-[12px] text-[#232E38] font-[sf-pro-medium] focus:outline-none"
                                    value={labelDetails.labelTax}
                                    name="labelTax"
                                    onChange={labelOnChange}
                                  />
                                  <Image
                                    width="10%"
                                    height="9px"
                                    id="shuffleTax"
                                    className="w-[6%] h-[10px] flex relative top-[10px] cursor-pointer"
                                    onClick={() => setTaxToGst(false)}
                                    src="/icons/shuffle.svg"
                                  />
                                </div>
                                {percentToAmount.taxPercentTOAmount ? (
                                  <label className="border-2 hover:border-green-400 w-[42%] h-[30px] rounded-md flex justify-between items-center p-2 mr-5 group-hover:mr-1">
                                    {/* <span>$</span> */}
                                    <input
                                      id="taxValue"
                                      // id="tax"
                                      className="w-[70%] h-[22px] text-right font-[sf-pro-medium] text-[12px] focus:outline-none"
                                      value={invoiceDetails.tax}
                                      placeholder="0"
                                      name="tax"
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
                                      id="taxSwap"
                                      className="w-[10%] cursor-pointer"
                                      onClick={() =>
                                        setPercentToAmount({
                                          ...percentToAmount,
                                          taxPercentTOAmount: false,
                                        })
                                      }
                                      src="/icons/swap.svg"
                                    />
                                  </label>
                                ) : (
                                  <label className="border-2 hover:border-green-400 w-[42%] h-[30px] rounded-md flex justify-between items-center p-2 mr-5 group-hover:mr-1">
                                    <span className="font-[sf-pro-medium] text-[12px]">
                                      {currencySymbol}
                                    </span>
                                    <input
                                      id="taxAmount"
                                      className="w-[70%] h-[22px] text-right font-[sf-pro-medium] text-[12px] focus:outline-none"
                                      value={invoiceDetails.tax}
                                      placeholder="0"
                                      name="tax"
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
                                          taxPercentTOAmount: true,
                                        })
                                      }
                                      src="/icons/swap.svg"
                                    />
                                  </label>
                                )}
                                <svg
                                  id="Layer_3"
                                  viewBox="0 0 32 32"
                                  onClick={closeTax}
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
                            ) : (
                              <div>
                                <div className="flex justify-between mb-2 ">
                                    <div className="w-[50%]">
                                    <input
                                      className="w-[50%] text-right text-[12px] text-[#232E38] font-[sf-pro-medium] focus:outline-none"
                                      value={labelDetails.labelSGst}
                                      name="labelSGst"
                                      onChange={labelOnChange}
                                    />
                                    <Image
                                      width="10%"
                                      height="9px"
                                      className="w-[6%] h-[10px] relative top-[10px] cursor-pointer"
                                      onClick={() => setTaxToGst(true)}
                                      src="/icons/shuffle.svg"
                                    />
                                   </div>
                                  {percentToAmount.sGstPercentTOAmount ? (
                                    <label className="border-2 hover:border-green-400 w-[42%] h-[30px] rounded-md flex justify-between items-center p-2 mr-5">
                                      {/* <span>$</span> */}
                                      <input
                                        id="sGstPercentage"
                                        className="w-[70%] h-[22px] text-right font-[sf-pro-medium] text-[12px] focus:outline-none"
                                        value={invoiceDetails.sGst}
                                        placeholder="0"
                                        name="sGst"
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
                                        id="swapSgstPercentage"
                                        className="w-[10%] cursor-pointer"
                                        onClick={() =>
                                          setPercentToAmount({
                                            ...percentToAmount,
                                            sGstPercentTOAmount: false,
                                          })
                                        }
                                        src="/icons/swap.svg"
                                      />
                                    </label>
                                  ) : (
                                    <label className=" border-2 w-[44%] hover:border-green-400 h-[30px] rounded-md flex justify-between items-center p-2 mr-5">
                                      <span className="font-[sf-pro-medium] text-[12px]">
                                        {currencySymbol}
                                      </span>
                                      <input
                                        id="sGstAmount"
                                        className="w-[70%] h-[22px] text-right font-[sf-pro-medium] text-[12px] focus:outline-none"
                                        value={invoiceDetails.sGst}
                                        placeholder="0"
                                        name="sGst"
                                        type="number"
                                        autoComplete="off"
                                        onChange={detailsOnCng}
                                      />
                                      <Image
                                        width="12%"
                                        height="10px"
                                        id=""
                                        className="w-[10%] cursor-pointer"
                                        onClick={() =>
                                          setPercentToAmount({
                                            ...percentToAmount,
                                            sGstPercentTOAmount: true,
                                          })
                                        }
                                        src="/icons/swap.svg"
                                      />
                                    </label>
                                  )}
                                </div>
                                <div className="flex justify-between mb-2">
                                  <input
                                    className="w-[50%] text-right text-[12px] text-[#232E38] font-[sf-pro-medium] focus:outline-none"
                                    value={labelDetails.labelCGst}
                                    name="labelCGst"
                                    onChange={labelOnChange}
                                  />
                                  {percentToAmount.cGstPercentTOAmount ? (
                                    <label className="border-2 w-[42%] hover:border-green-400 h-[30px] rounded-md flex justify-between items-center p-2 mr-5">
                                      {/* <span>$</span> */}
                                      <input
                                        id="cGstPercentage"
                                        className="w-[70%] h-[22px] text-right font-[sf-pro-medium] text-[12px] focus:outline-none"
                                        value={invoiceDetails.cGst}
                                        placeholder="0"
                                        name="cGst"
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
                                        id="swapCgstPercentage"
                                        className="w-[10%] cursor-pointer"
                                        onClick={() =>
                                          setPercentToAmount({
                                            ...percentToAmount,
                                            cGstPercentTOAmount: false,
                                          })
                                        }
                                        src="/icons/swap.svg"
                                      />
                                    </label>
                                  ) : (
                                    <label className="border-2 w-[42%] hover:border-green-400 h-[30px] rounded-md flex justify-between items-center p-2 mr-5">
                                      <span className="font-[sf-pro-medium] text-[12px]">
                                        {currencySymbol}
                                      </span>
                                      <input
                                        id="cGstAmount"
                                        className="w-[70%] h-[22px] text-right font-[sf-pro-medium] text-[12px] focus:outline-none"
                                        value={invoiceDetails.cGst}
                                        placeholder="0"
                                        name="cGst"
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
                                            cGstPercentTOAmount: true,
                                          })
                                        }
                                        src="/icons/swap.svg"
                                      />
                                    </label>
                                  )}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {!isShipping ? null : (
                          <div className="w-[100%] flex group">
                            <div className="flex mb-2">
                              <input
                                className="w-[50%] text-right text-[12px] text-[#232E38] font-[sf-pro-medium] focus:outline-none pr-1 mr-1"
                                value={labelDetails.labelShipping}
                                name="labelShipping"
                                onChange={labelOnChange}
                              />
                              <label className="border-2 hover:border-green-400 w-[42%] h-[30px] rounded-md flex justify-between items-center p-2 mr-6">
                                <span className="font-[sf-pro-medium] text-[12px]">
                                  {currencySymbol}
                                </span>
                                <input
                                  id="shippingValue"
                                  // id="discountAmount"
                                  className="w-[70%] h-[22px] text-right font-[sf-pro-medium] text-[12px] focus:outline-none"
                                  value={invoiceDetails.shipping}
                                  placeholder="0"
                                  name="shipping"
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
                        <div className="flex justify-between mb-2">
                          <input
                            className="text-right text-[12px] w-[50%] text-[#232E38] font-[sf-pro-medium] focus:outline-none"
                            value={labelDetails.labelTotal}
                            name="labelTotal"
                            onChange={labelOnChange}
                          />
                          <p className=" w-[44%] h-[30px] rounded-md truncate mr-7">
                            <span className=" font-[sf-pro-medium] text-[12px]">
                              {currencySymbol}
                            </span>
                            <span className=" w-[100%] font-[sf-pro-medium] text-[12px]">
                              {Math.round(total).toFixed(2)}
                            </span>
                          </p>
                        </div>
                        <div className="flex justify-between mb-2">
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
                          <p className=" w-[44%] h-[30px] rounded-md truncate mr-7">
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
                  {/* total end */}
                  <div className="w-[90%] h-[27vh]">
                    <div className="w-full min-h-[150px] max-h-[100%] flex flex-col">
                      <div className="border-2 hover:border-green-400 border-[#707070]/25 rounded-md flex flex-col text-[12px] w-full min-h-[50px] mb-2 max-h-[100%] p-1">
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
                      <div className="border-2 hover:border-green-400 border-[#707070]/25 rounded-md flex flex-col text-[12px] w-full min-h-[50px] max-h-[100%] mb-2 p-1">
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
                          placeholder="Add terms like late fees payment methods delivery scheduel etc..."
                          onChange={detailsOnCng}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" fixed flex items-center justify-end bottom-[142
                                    0px] top-[550px]  right-[22px] h-[10vh] w-full">
              <div onClick={openPopupPdf} style={{ backgroundColor: bgColorCode }} className={`bg-[${bgColorCode}] h-[4rem] flex justify-center items-center rounded-full w-[4rem]`}>
                <img src="/icons/Icon download.svg" height={20} width={20} alt="download" />
              </div>
            </div>
            {
              openPopup ? <><div className="h-[92rem] flex justify-end bg-opacity-[30%] bg-black items-end bottom-0 backdrop-blur-[2px] w-full  fixed ">
                <div className="bg-[#e6e9ed] pt-[23px] rounded-t-lg flex flex-col justify-center items-center h-[30vh] w-full">
                  <div className="flex justify-end pb-[10px] pr-[25px] w-full h-[6vh]">
                    <div className="flex w-[59%] items-center h-[6vh] flex-row justify-between">
                      <h1 className="text-[20px] font-[sfpro-bold]">Download</h1>
                      <Image onClick={handleClosePopup} src='/icons/Close-button.svg' height={20} width={20}></Image>
                    </div>
                  </div>
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
                    isShippingNeed={isShipping}
                  />
                </div>
              </div></> : null
            }


          </div>
        </div>
        {/* mobile res end*/}







        <div className="md:block hidden sm:hidden">
          <div className="bg-[#E6E9ED] border-t-2 border-[#707070]/5 md:flex space-y-4 justify-end p-6">
            <div className="md:w-[63%]  lg:w-[55%]  bg-white rounded-lg md:min-h-[100vh] sm:h-auto h-auto">
              <div
                style={{ backgroundColor: bgColorCode }}
                className={`h-[200px] bg-[${bgColorCode}] opacity-[1] rounded-lg p-3 flex justify-between items-center`}
              >
                <div className="bg-white w-[20%] h-[175px] text-[12px] rounded-lg flex flex-col justify-center hover:cursor-pointer">
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
                        accept="image/png,image/jpeg"
                        onChange={imageFileHandler}
                      />
                      {
                      showErrMSg?(
                        <span>
                          <br />
      
                          <p className="text-[#FF1D1D] text-[10px]  w-40">
                            {messageToDisplay.imageOption}
                          </p>
                        </span>
                      ) : null
                    }
                    </section>
                  ) : (
                    <button
                      className=" w-[100%] flex flex-col cursor-pointer z-50"
                      // variant="text"
                      onChange={imageFileHandler}
                    >
                      <span className="w-[100%] h-[35px] top-[75px] relative flex flex-col justify-center items-center cursor-pointer">
                        <Image
                          width="18%"
                          height="18px"
                          className=" h-[18px] cursor-pointer"
                          src="/icons/photo-camera.svg"
                        />
                        <label className="text-center relative top-[10px] text-[10px] cursor-pointer">
                          ADD YOUR COMPANY LOGO HERE
                        </label>
                      </span>
                      <input
                        id="addProfilebtn"
                        className="opacity-0 relative w-[170px] bottom-6 h-[175px] cursor-pointer"
                        type="file"
                        accept="image/png,image/jpeg"
                        onChange={imageFileHandler}
                      />
                      {
                      showErrMSg?(
                        <span>
                          <br />
      
                          <p className="text-[#FF1D1D] text-[10px]  w-40">
                            {messageToDisplay.imageOption}
                          </p>
                        </span>
                      ) : null
                    }
                    </button>
                  )}
                </div>
                <div className="h-[170px] flex flex-col justify-end items-end">
                  <input
                    style={{ backgroundColor: bgColorCode }}
                    className="text-white focus:outline-none pb-[10px] text-right font-[interSemiBold]"
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

                {/* lg responsive for 1 st part start*/}
              <div className=" justify-between pb-10 pr-4 lg:flex md:hidden ">
                <div className="w-[60%]">
                  <div className=" w-[100%]">
                    <div className="w-[100%] min-h-[60px] max-h-[100%] flex flex-wrap justify-evenly pt-4 md:pl-3 lg:pl-2">
                      <div
                        className={` border-2 focus:border-[#707070]/25 hover:border-green-400 rounded-md flex flex-col text-[12px] w-[45%] min-h-[40px] max-h-[100%] p-1 ${validationColour && inputData === "billFrom"
                          ? "border-red-500"
                          : "border-[#707070]/25"
                          }`}
                      >
                        <input
                          className="w-[100%] h-[20px] font-[sfpro-regular-display] text-[12px] text-[#707070] focus:outline-none rounded-md"
                          value={labelDetails.labelBillFrom}
                          name="labelBillFrom"
                          onChange={labelOnChange}
                        />
                        <textarea
                          id="billFrom"
                          className="w-[100%]  resize-none h-[20px] block overflow-hidden font-[sf-pro-medium] text-[#232E38] focus:outline-none rounded-md resize-ta"
                          value={invoiceDetails.billFrom}
                          name="billFrom"
                          placeholder="Invoice From"
                          onChange={detailsOnCng}
                          onMouseUp={()=>{setClick(true)}}
                          onMouseLeave={()=>{setClick(false)}}
                        ></textarea>
                      </div>
                      <input
                        className="w-[50%] h-[40px] focus:outline-none bg-transparent"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="flex w-[100%]">
                    <div className="w-[50%] md:pl-4 ">
                      <div
                        className={`border-2 hover:border-green-400 rounded-md flex flex-col text-[12px] w-[96%] min-h-[50px] max-h-[100%] p-1 mt-1 ${validationColour && inputData === "billTo"
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
                          placeholder="Invoice To"
                          onChange={detailsOnCng}
                        ></textarea>
                      </div>
                    </div>
                    <div className="w-[50%]">
                      <div className="border-2 hover:border-green-400 border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[96%] min-h-[50px] max-h-[100%] p-1 mt-1">
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
                          placeholder="(Optional)"
                          onChange={detailsOnCng}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[40%]">
                  <div className="w-[100%] flex flex-wrap justify-evenly pt-4">
                    <div
                      className={`border-2 hover:border-green-400 ${validationColour && inputData === "billDate"
                        ? "border-red-500"
                        : "border-[#707070]/25"
                        } rounded-md flex flex-col text-[12px] mb-1 w-[45%] h-[50px] p-1`}
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
                          // max={newdate}
                          // onKeyUp={keyUp}
                          id='newdate'
                          onKeyDown={(e) => e.preventDefault()}
                          onKeyUp={(e) => e.preventDefault()}
                          type="date"
                          name="billDate"
                          onChange={detailsOnCng}
                        />
                      </div>
                    </div>
                    <div className="border-2 hover:border-green-400 border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[45%] h-[50px] p-1">
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
                      className={`border-2 hover:border-green-400  ${validationColour && inputData === "dueDate"
                        ? "border-red-500"
                        : "border-[#707070]/25"
                        } rounded-md flex flex-col text-[12px] w-[45%] h-[50px] p-1`}
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
                    <div className="border-2 hover:border-green-400 border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[45%] h-[50px] p-1">
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
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* md responsive for 1 st part start*/}
              <div className=" justify-between pb-10 pr-4 md:flex lg:hidden ">
                <div className="w-[60%] flex flex-col justify-evenly">
                  <div className="flex w-[100%] ">
                    <div className="w-[98%] min-h-[50px] max-h-[100%] flex flex-wrap justify-evenly pt-2 md:pl-2 pr-2 lg:pl-2">
                      <div
                        className={` border-2 focus:border-[#707070]/25 hover:border-green-400 rounded-md flex flex-col text-[12px] w-[100%] min-h-[40px] max-h-[100%] p-1 ${validationColour && inputData === "billFrom"
                          ? "border-red-500"
                          : "border-[#707070]/25"
                          }`}
                      >
                        <input
                          className="w-[100%] h-[20px] font-[sfpro-regular-display] text-[12px] text-[#707070] focus:outline-none rounded-md"
                          value={labelDetails.labelBillFrom}
                          name="labelBillFrom"
                          onChange={labelOnChange}
                        />
                        <textarea
                          id="billFrom"
                          className="w-[100%] resize-none h-[20px] block overflow-hidden font-[sf-pro-medium] text-[#232E38] focus:outline-none rounded-md resize-ta"
                          value={invoiceDetails.billFrom}
                          name="billFrom"
                          placeholder="Invoice From"
                          onChange={detailsOnCng}
                        ></textarea>
                      </div>
                      {/* <input
                        className="w-[50%] h-[40px] focus:outline-none bg-transparent"
                        disabled
                      /> */}
                    </div>
                  </div>
                  <div className="flex w-[100%] pl-2">
                    <div className="w-[100%]">
                      <div
                        className={`border-2 hover:border-green-400 rounded-md flex flex-col text-[12px] w-[96%] min-h-[50px] max-h-[100%] p-1  ${validationColour && inputData === "billTo"
                          ? "border-red-500"
                          : "border-[#707070]/25"
                          }`}
                      >
                        <input
                          className="w-[100%] font-[sfpro-regular-display] text-[12px] text-[#707070] h-[20px] focus:outline-none rounded-md "
                          value={labelDetails.labelBillTo}
                          name="labelBillTo"
                          onChange={labelOnChange}
                         
                        />
                        <textarea
                          id="billTO"
                          className={`w-[100%] h-[20px] font-[sf-pro-medium] overflow-hidden  text-[#232E38] resize-none focus:outline-none rounded-md `} //resize-billto
                          value={invoiceDetails.billTo}
                          name="billTo"
                          placeholder="Invoice To"
                          onChange={detailsOnCng}
                          
                       
                        ></textarea>
                      </div>
                    </div>
                    
                  </div>

                  <div className="flex w-[100%] pl-2">
                    
                    <div className="w-[100%]">
                      <div className="border-2 hover:border-green-400 border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[96%] min-h-[100px] max-h-[100%] p-1 ">
                        <input
                          className="w-[100%] font-[sfpro-regular-display] text-[12px] text-[#707070] h-[20px] focus:outline-none rounded-md"
                          value={labelDetails.labelShipTO}
                          name="labelShipTO"
                          onChange={labelOnChange}
                        />
                        <textarea
                          id="shipTO"
                          className="w-[100%] resize-none font-[sf-pro-medium] text-[#232E38] h-[70px] overflow-hidden focus:outline-none rounded-md resize-ship"
                          value={invoiceDetails.shipTo}
                          name="shipTo"
                          role="textbox"
                          placeholder="(Optional)"
                          onChange={detailsOnCng}
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-[40%]">
                  <div className="w-[100%] flex flex-wrap justify-evenly pt-4 h-60">
                    <div
                      className={`border-2 hover:border-green-400 ${validationColour && inputData === "billDate"
                        ? "border-red-500"
                        : "border-[#707070]/25"
                        } rounded-md flex flex-col text-[12px]  w-[100%] h-[50px] p-1`}
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
                          // max={newdate}
                          // onKeyUp={keyUp}
                          id='newdate'
                          onKeyDown={(e) => e.preventDefault()}
                          onKeyUp={(e) => e.preventDefault()}
                          type="date"
                          name="billDate"
                          onChange={detailsOnCng}
                        />
                      </div>
                    </div>
                    <div className="border-2 hover:border-green-400 border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[100%] h-[50px] p-1">
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
                      className={`border-2 hover:border-green-400  ${validationColour && inputData === "dueDate"
                        ? "border-red-500"
                        : "border-[#707070]/25"
                        } rounded-md flex flex-col text-[12px] w-[100%] h-[50px] p-1`}
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
                    <div className="border-2 hover:border-green-400 border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[100%] h-[50px] p-1">
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
              {/* md responsive for 1 st part end*/}
              


               {/* map start */}
              <div className="mt-1  w-[100%] " >  
              <div className="w-full  pt-2 md:overflow-x-auto">
              <div className="w-[50rem] pl-2">
                <input
                  id="TestlabelItem"
                  className="w-[55%] md:w-[50%] focus:outline-none  bg-[#232E38] text-white rounded-tl-md rounded-bl-md text-[10px] font-[sf-pro-medium] h-[30px] pl-4"
                  value={labelDetails.labelItem}
                  name="labelItem"
                  onChange={labelOnChange}
                />
                <input
                  id="TestlabelQuantity"
                  className="w-[15%] md:w-[15%] focus:outline-none pl-2  bg-[#232E38] text-white text-center text-[10px] font-[sf-pro-medium] h-[30px]"
                  value={labelDetails.labelQuantity}
                  name="labelQuantity"
                  onChange={labelOnChange}
                />
                <input
                  id="TestlabelRate"
                  className="w-[16%] md:w-[16%] focus:outline-none bg-[#232E38] text-white text-center text-[10px] font-[sf-pro-medium] h-[30px]"
                  value={labelDetails.labelRate}
                  name="labelRate"
                  onChange={labelOnChange}
                />
                <input
                  id="TestlabelAmount"
                  className="w-[15%] md:w-[19%] focus:outline-none  bg-[#232E38] text-white text-center text-[10px] font-[sf-pro-medium] rounded-br-md rounded-tr-md h-[30px]"
                  value={labelDetails.labelAmount}
                  name="labelAmount"
                  onChange={labelOnChange}
                />
              </div>

              
              {itemList.map((item, index) => {
                return (
                  <div
                    key={index}
                    id={index}
                    className="pl-4 pb-1 border-[#707070]/25 pt-2 flex w-[50rem] group"
                  >
                    <textarea
                      id="item"
                      className={`w-[60%] md:w-[48%] mr-[9px] border-2 focus:border-green-400 h-[33px] min-h-[33px] text-[12px] font-[sf-pro-medium] text-[#232E38] focus:outline-none p-2 rounded-lg border-[#707070]/25 overflow-hidden resize-none resize-item${index}`}
                      value={item.item}
                      name="item"
                      placeholder="Description of service or product..."
                      onChange={(event) => itemListOnCng(event, index)}
                    ></textarea>
                    <input
                      id="quality"
                      autoComplete="off"
                      placeholder="1"
                      type="number"
                      className="w-[11%] md:w-[15%] mr-[10px] h-[33px] text-[12px] focus:border-green-400 font-[sf-pro-medium] text-[#232E38] p-2 focus:outline-none rounded-lg border-2 border-[#707070]/25"
                      value={item.quality}
                      name="quality"
                      onChange={(event) => itemListOnCng(event, index)}
                    />
                    <div
                      id={index}
                      className="w-[11%] md:w-[15%] mr-[10px] h-[33px] text-right  text-[12px] rounded-lg border-[#707070]/25 flex items-center"
                    >
                      <span className="p-2">{currencySymbol}</span>
                      <input
                        id="rate"
                        placeholder="0"
                        type="number"
                        autoComplete="off"
                        className="w-[100%]   h-[33px] font-[sf-pro-medium] p-2 border-2 text-[#232E38] border-[#707070]/25 focus:border-green-400 focus:outline-none rounded-lg text-right text-[12px]"
                        value={item.rate}
                        name="rate"
                        onChange={(event) => itemListOnCng(event, index)}
                      />
                    </div>
                    <div className="w-[14%] md:w-[20%] mr-[10px] h-[33px] text-right text-[12px] focus:outline-none border-[#707070]/25 flex items-center">
                      <span className="p-2">{currencySymbol}</span>
                      <input
                        className="w-[100%] h-[33px] font-[sf-pro-medium] text-[#232E38] border-2 p-2 focus:border-green-400 rounded-lg text-right text-[12px] focus:outline-none"
                        readOnly
                        value={Number(
                          (item.amount = item.quality * item.rate)
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
                          className="hidden group-hover:block h-[20px] cursor-pointer text-[#989EA4] hover:text-[#009e74]"
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
              
              <div className="pl-4 mb-6">
                <button
                  id="addItem"
                  style={{ backgroundColor: bgColorCode }}
                  className="rounded-md p-2 text-[12px] w-[14%] md:w-[30%] flex items-center justify-around text-white opacity-[1]"
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
              </div>
              </div>
              
              </div>
            {/* map end */}

              <div className="pl-4 pr-2 flex justify-between">
                <div className="w-[60%]  md:w-[50%] min-h-[150px] max-h-[100%] flex flex-col">
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
                  <div className="border-2 hover:border-green-400 border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[96%]  min-h-[50px] max-h-[100%] mb-2 p-1">
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
                      placeholder="Add terms like late fees payment methods delivery scheduel etc..."
                      onChange={detailsOnCng}
                    ></textarea>
                  </div>
                </div>

                <div className="w-[33%] lg:w-[40%] md:w-[50%] float-right text-right">
                  <div className="flex justify-between mb-2">
                    <input
                      className=" text-right text-[12px] lg:w-[50%] md:w-[45%] text-[#232E38] font-[sfpro-regular-display] focus:outline-none md:pr-1"
                      value={labelDetails.labelSubTotal}
                      name="labelSubTotal"
                      onChange={labelOnChange}
                    />
                    <div className=" lg:w-[45%] md:w-[50%] h-[30px] rounded-md flex justify-end items-center lg:mr-7 md:mr-3.5">
                      {/* <span>$</span> */}
                      <p className="w-[94%] font-[sf-pro-medium] text-[12px] truncate">
                        {currencySymbol}
                        {subtotal}
                      </p>
                    </div>
                  </div>
                  <div className="w-[100%] flex font-[sfpro-regular-display] justify-center text-right text-[14px] mb-2 ">
                    {!IsDiscount ? (
                      <div
                        id="discount"
                        className="w-[30%] hover:cursor-pointer flex items-center"
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
                    {!isTax ? (
                      <div
                        id="tax"
                        className="w-[20%]  hover:cursor-pointer flex items-center"
                        onClick={taxDisplay}
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
                        <p style={{ color: bgColorCode }}>Tax</p>
                      </div>
                    ) : null}
                    {!isShipping ? (
                      <div
                        id="shipping"
                        className="w-[30%] hover:cursor-pointer flex items-center"
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
                          className=" lg:w-[50%] md:w-[50%] text-right text-[12px] text-[#232E38] font-[sf-pro-medium] focus:outline-none md:pr-1"
                          value={labelDetails.labelDiscount}
                          name="labelDiscount"
                          onChange={labelOnChange}
                        />
                        {percentToAmount.discountPercentTOAmount ? (
                          <label className=" border-2 hover:border-green-400 lg:w-[45%] md:w-[50%] h-[30px] rounded-md flex justify-between items-center p-2 lg:mr-7 md:mr-3.5">
                            <input
                              id="discountValue"
                              // id="discount"
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
                          <label className="border-2 hover:border-green-400 w-[44%]  h-[30px] rounded-md flex justify-between items-center p-2 mr-1   md:mr-3 group-hover:mr-1">
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
                          // <img/>
                        )}
                        <svg
                          id="Layer_3"
                          viewBox="0 0 32 32"
                          onClick={closeDiscount}
                          className="w-[7%] hidden group-hover:block cursor-pointer text-[#989EA4] hover:text-[#009e74]"
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
                  {!isTax ? null : (
                    <div className="w-[100%] flex group">
                      {taxToGst ? (
                        <div className="w-[100%] flex mb-2">
                          <div className=" lg:w-[50%] md:w-[48%] lg:pr-2 md:pr-2">
                            <input
                              className="w-[50%] md:w-[75%] md:mr-0.5 text-right text-[12px] text-[#232E38] font-[sf-pro-medium] focus:outline-none"
                              value={labelDetails.labelTax}
                              name="labelTax"
                              onChange={labelOnChange}
                            />
                            <Image
                              width="10%"
                              height="9px"
                              id="shuffleTax"
                              className="w-[6%] h-[10px] flex relative top-[10px] cursor-pointer"
                              onClick={() => setTaxToGst(false)}
                              src="/icons/shuffle.svg"
                            />
                          </div>
                          {percentToAmount.taxPercentTOAmount ? (
                            <label className="border-2 hover:border-green-400 lg:w-[45%] md:w-[48%]  h-[30px] rounded-md flex justify-between items-center p-2 lg:mr-7 md:mr-3.5 group-hover:mr-1">
                              {/* <span>$</span> */}
                              <input
                                id="taxValue"
                                // id="tax"
                                className="w-[70%] h-[22px] text-right font-[sf-pro-medium] text-[12px] focus:outline-none"
                                value={invoiceDetails.tax}
                                placeholder="0"
                                name="tax"
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
                                id="taxSwap"
                                className="w-[10%] cursor-pointer"
                                onClick={() =>
                                  setPercentToAmount({
                                    ...percentToAmount,
                                    taxPercentTOAmount: false,
                                  })
                                }
                                src="/icons/swap.svg"
                              />
                            </label>
                          ) : (
                            <label className="border-2 hover:border-green-400 w-[42%] h-[30px] rounded-md flex justify-between items-center p-2 mr-5 group-hover:mr-1">
                              <span className="font-[sf-pro-medium] text-[12px]">
                                {currencySymbol}
                              </span>
                              <input
                                id="taxAmount"
                                className="w-[70%] h-[22px] text-right font-[sf-pro-medium] text-[12px] focus:outline-none"
                                value={invoiceDetails.tax}
                                placeholder="0"
                                name="tax"
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
                                    taxPercentTOAmount: true,
                                  })
                                }
                                src="/icons/swap.svg"
                              />
                            </label>
                          )}
                          <svg
                            id="Layer_3"
                            viewBox="0 0 32 32"
                            onClick={closeTax}
                            className="w-[7%] hidden group-hover:block cursor-pointer text-[#989EA4] hover:text-[#009e74]"
                            xmlns="http://www.w3.org/2000/svg"
                            data-name="Layer 3"
                          >
                            <path
                              d="m18.828 16 4.586-4.586a2 2 0 1 0 -2.828-2.828l-4.586 4.586-4.586-4.586a2 2 0 0 0 -2.828 2.828l4.586 4.586-4.586 4.586a2 2 0 1 0 2.828 2.828l4.586-4.586 4.586 4.586a2 2 0 0 0 2.828-2.828z"
                              fill="currentColor"
                            />
                          </svg>
                        </div>
                      ) : (
                        <div>
                          <div className="flex mb-2">
                            <div className=" lg:pr-0 md:pr-1 lg:w-[50%] md:w-[50%]">
                              <input
                                className=" w-[50%] text-right text-[12px] text-[#232E38] font-[sf-pro-medium] focus:outline-none"
                                value={labelDetails.labelSGst}
                                name="labelSGst"
                                onChange={labelOnChange}
                              />
                              <Image
                                width="10%"
                                height="9px"
                                className="w-[6%] h-[10px] relative top-[10px] cursor-pointer md:pr-2 lg:mr-2"
                                onClick={() => setTaxToGst(true)}
                                src="/icons/shuffle.svg"
                              />
                            </div>
                            {percentToAmount.sGstPercentTOAmount ? (
                              <label className="border-2 hover:border-green-400 lg:w-[45%] md:w-[50%] h-[30px] rounded-md flex justify-between items-center p-2 lg:mr-7 md:mr-3.5">
                                {/* <span>$</span> */}
                                <input
                                  id="sGstPercentage"
                                  className="w-[70%] h-[22px] text-right font-[sf-pro-medium] text-[12px] focus:outline-none"
                                  value={invoiceDetails.sGst}
                                  placeholder="0"
                                  name="sGst"
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
                                  id="swapSgstPercentage"
                                  className="w-[10%] cursor-pointer"
                                  onClick={() =>
                                    setPercentToAmount({
                                      ...percentToAmount,
                                      sGstPercentTOAmount: false,
                                    })
                                  }
                                  src="/icons/swap.svg"
                                />
                              </label>
                            ) : (
                              <label className="border-2 w-[44%] hover:border-green-400 h-[30px] rounded-md flex justify-between items-center p-2 mr-5 md:mr-3.5">
                                <span className="font-[sf-pro-medium] text-[12px]">
                                  {currencySymbol}
                                </span>
                                <input
                                  id="sGstAmount"
                                  className="w-[70%] h-[22px] text-right font-[sf-pro-medium] text-[12px] focus:outline-none"
                                  value={invoiceDetails.sGst}
                                  placeholder="0"
                                  name="sGst"
                                  type="number"
                                  autoComplete="off"
                                  onChange={detailsOnCng}
                                />
                                <Image
                                  width="12%"
                                  height="10px"
                                  id=""
                                  className="w-[10%] cursor-pointer"
                                  onClick={() =>
                                    setPercentToAmount({
                                      ...percentToAmount,
                                      sGstPercentTOAmount: true,
                                    })
                                  }
                                  src="/icons/swap.svg"
                                />
                              </label>
                            )}
                          </div>
                          <div className="flex mb-2 ">
                            <input
                              className=" lg:w-[50%] text-right md:w-[50%] text-[12px] text-[#232E38] font-[sf-pro-medium] focus:outline-none md:pr-2"
                              value={labelDetails.labelCGst}
                              name="labelCGst"
                              onChange={labelOnChange}
                            />
                            {percentToAmount.cGstPercentTOAmount ? (
                              <label className=" border-2 lg:w-[45%] md:w-[50%] hover:border-green-400 h-[30px] rounded-md flex justify-between items-center md:p-2  lg:mr-7 md:mr-3.5">
                                {/* <span>$</span> */}
                                <input
                                  id="cGstPercentage"
                                  className="w-[45%] h-[22px] text-right font-[sf-pro-medium] text-[12px] focus:outline-none"
                                  value={invoiceDetails.cGst}
                                  placeholder="0"
                                  name="cGst"
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
                                  id="swapCgstPercentage"
                                  className="w-[10%] cursor-pointer"
                                  onClick={() =>
                                    setPercentToAmount({
                                      ...percentToAmount,
                                      cGstPercentTOAmount: false,
                                    })
                                  }
                                  src="/icons/swap.svg"
                                />
                              </label>
                            ) : (
                              <label className="border-2 w-[42%] hover:border-green-400 h-[30px] rounded-md flex justify-between items-center p-2 mr-5">
                                <span className="font-[sf-pro-medium] text-[12px]">
                                  {currencySymbol}
                                </span>
                                <input
                                  id="cGstAmount"
                                  className="w-[70%] h-[22px] text-right font-[sf-pro-medium] text-[12px] focus:outline-none"
                                  value={invoiceDetails.cGst}
                                  placeholder="0"
                                  name="cGst"
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
                                      cGstPercentTOAmount: true,
                                    })
                                  }
                                  src="/icons/swap.svg"
                                />
                              </label>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {!isShipping ? null : (
                    <div className="w-[100%] flex group">
                      <div className="flex mb-2">
                        <input
                          className=" lg:w-[50%] md:w-[50%] text-right text-[12px] text-[#232E38] font-[sf-pro-medium] focus:outline-none lg:pr-1 md:pr-2"
                          value={labelDetails.labelShipping}
                          name="labelShipping"
                          onChange={labelOnChange}
                        />
                        <label className=" border-2 hover:border-green-400 lg:w-[45%] md:w-[50%] h-[30px] rounded-md flex justify-between items-center p-2 lg:mr-7 md:mr-3.5">
                          <span className="font-[sf-pro-medium] text-[12px]">
                            {currencySymbol}
                          </span>
                          <input
                            id="shippingValue"
                            // id="discountAmount"
                            className="w-[70%] h-[22px] text-right font-[sf-pro-medium] text-[12px] focus:outline-none"
                            value={invoiceDetails.shipping}
                            placeholder="0"
                            name="shipping"
                            type="number"
                            autoComplete="off"
                            onChange={detailsOnCng}
                          />
                        </label>
                        <svg
                          id="Layer_3"
                          viewBox="0 0 32 32"
                          onClick={closeShipping}
                          className="w-[7%] hidden group-hover:block cursor-pointer text-[#989EA4] hover:text-[#009e74]"
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
                  <div className="flex justify-between mb-2">
                    <input
                      className=" text-right text-[12px] lg:w-[50%] md:w-[50%] text-[#232E38] font-[sf-pro-medium] focus:outline-none md:pr-2"
                      value={labelDetails.labelTotal}
                      name="labelTotal"
                      onChange={labelOnChange}
                    />
                    <p className=" lg:w-[45%] md:w-[50%] h-[30px] rounded-md  lg:mr-7 md:mr-3.5">
                      <span className=" font-[sf-pro-medium] text-[12px]">
                        {currencySymbol}
                      </span>
                      <span className=" w-[100%] font-[sf-pro-medium] text-[12px]">
                        {Math.round(total).toFixed(2)}
                      </span>
                    </p>
                  </div>
                  <div className="flex justify-between mb-2">
                    <input
                      className="w-[50%] md:pr-2 text-right text-[12px] text-[#232E38] font-[sf-pro-medium] focus:outline-none"
                      value={labelDetails.labelAmountPaid}
                      name="labelAmountPaid"
                      onChange={labelOnChange}
                    />
                    <label className="border-2 hover:border-green-400 w-[43%] md:w-[44%] h-[30px] rounded-md flex justify-between items-center p-2 mr-4">
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
                    <p className=" w-[44%] h-[30px] rounded-md  mr-7">
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
            <div className="pl-6 md:w-[60%]   sm:w-[70%] lg:w-[30%]">
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
                isShippingNeed={isShipping}
              />
            </div>
          </div>
        </div>
        <div>
          <FeedBackButton Src="/images/btBillHive.png" Path="/" appName="BillHive" />
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