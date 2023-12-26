import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
import SideBar from "../../../components/billHive/side-bar/SideBar";
import Router from "next/router";
import Image from "next/image";
import BtoolsHeader from '../../../container/72BTheader/BToolsHeader';
import BtoolsFooter from '../../../container/72BTfooter/BToolsFooter';

const PreView = (props) => {
  const [itemList, setItemList] = useState([
    {
      item: '',
      quality: 1,
      rate: 0,
      amount: 0
    }
  ])
// const router = useRouter();

  
  const [currencySymbol, setCurrencySymbol] = useState('₹')
  const [isPdfDownload, setIsPdfDownload] = useState(false)
  const [IsDiscount, setIsDiscount] = useState(false)
  const [isTax, setIsTax] = useState(false)
  const [isShipping, setIsShipping] = useState(false)
  const [location,setLocation] = useState({})
  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNum: '',
    billFrom: '',
    billTo: '',
    shipTo: '',
    billDate: '',
    dueDate: '',
    paymentTerms: '',
    poNumber: '',
    notes: '',
    termsNCondition: '',
    discount: '',
    tax: '',
    sGst: '',
    cGst: '',
    shipping: '',
    amountPaid: '',
    balanceDue: ''
  })
  const monthArray = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const current = new Date()
  const month = current.getMonth()
  const day = current.getDate()
  const year = current.getFullYear()
  const newdate =
  day < 10
  ? monthArray[month] + ' ' + '0' + day + ',' + ' ' + year
  : monthArray[month] + ' ' + day + ',' + ' ' + year
  function dateFormatter (date) {
    const bill = new Date(date)
    const month = bill.getMonth()
    const day = bill.getDate()
    const year = bill.getFullYear()
    const billDate =
      day < 10
        ? monthArray[month] + ' ' + '0' + day + ',' + ' ' + year
        : monthArray[month] + ' ' + day + ',' + ' ' + year
    return billDate
  }
  const [bgColorCode, setBgColorCode] = useState('#FFA726')
  const [image, setImage] = useState({
    profilePic: null,
    ImageUploaded: false
  })
  const [percentToAmount, setPercentToAmount] = useState({
    discountPercentTOAmount: true,
    taxPercentTOAmount: true,
    sGstPercentTOAmount: true,
    cGstPercentTOAmount: true
  })
  const [taxToGst, setTaxToGst] = useState(true)
  const [labelDetails, setLabelDetails] = useState({
    labelInvoice: 'INVOICE',
    labelBillFrom: 'Bill From',
    labelBillTo: 'Bill To',
    labelShipTO: 'Ship TO',
    labelDate: 'Date',
    labelPaymentTerms: 'Payment Terms',
    labelDueDate: 'Due Date',
    labelPoNum: 'PO Number',
    labelItem: 'ITEM',
    labelQuantity: 'Quality',
    labelRate: 'Rate',
    labelAmount: 'Amount',
    labelNotes: 'Notes',
    labelTermsNCon: 'Terms & Condition',
    labelSubTotal: 'SUBTOTAL',
    labelDiscount: 'DISCOUNT',
    labelTax: 'TAX',
    labelSGst: 'sGst',
    labelCGst: 'cGst',
    labelShipping: 'SHIPPING',
    labelTotal: 'TOTAL',
    labelAmountPaid: 'AMOUNT PAID',
    labelBalanceDue: 'BALANCE DUE'
  })

  const subtotal = itemList
    .reduce((total, item) => total + item.quality * item.rate, 0)
    .toFixed(2)
  const total = (
    Number(subtotal) +
    (taxToGst
      ? (percentToAmount.taxPercentTOAmount
          ? Number((invoiceDetails.tax * (subtotal - invoiceDetails.discount * subtotal / 100 )) / 100)
          : Number(invoiceDetails.tax)) + (isShipping ? Number(invoiceDetails.shipping) : null) -
        (percentToAmount.discountPercentTOAmount
          ? Number((invoiceDetails.discount * subtotal) / 100)
          : Number(invoiceDetails.discount))
      : (percentToAmount.sGstPercentTOAmount
          ? Number((invoiceDetails.sGst * (subtotal - invoiceDetails.discount * subtotal / 100 )) / 100)
          : Number(invoiceDetails.sGst)) +
        (percentToAmount.cGstPercentTOAmount
          ? Number((invoiceDetails.cGst * (subtotal - invoiceDetails.discount * subtotal / 100 )) / 100)
          : Number(invoiceDetails.cGst)) + (isShipping ? Number(invoiceDetails.shipping) : null) -
        (percentToAmount.discountPercentTOAmount
          ? Number((invoiceDetails.discount * subtotal) / 100)
          : Number(invoiceDetails.discount)))
  ).toFixed(2)

  const ref = React.createRef()
  const options = {
    orientation: 'landscape',
    unit: 'in',
    format: [7.2, 7.5]
  }
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
      shippingNeed: isShipping
    }
    Router.push({
        pathname: "/billHive",
        query: { data: JSON.stringify(userDetails) },
      });
  }

  useEffect(() => {
    // console.log(location, 'preview999999')
    let data = JSON.parse(localStorage.getItem('userDetails')?localStorage.getItem('userDetails'):'')
    setLocation(JSON.parse(localStorage.getItem('userDetails')?localStorage.getItem('userDetails'):''))
    if (data) {
      setInvoiceDetails(data.itemDetails)
      setItemList(data.itemList)
      setIsPdfDownload(data.isDownloaded)
      setBgColorCode(data.bgColorValue)
      setImage({
        ...image,
        ImageUploaded: data.imageUrl?.ImageUploaded,
        profilePic: data.imageUrl?.profilePic
      })
      setTaxToGst(data.taxTGst)
      setPercentToAmount({
        ...percentToAmount,
        discountPercentTOAmount:
        data.perTAmount.discountPercentTOAmount,
        taxPercentTOAmount: data.perTAmount.taxPercentTOAmount,
        sGstPercentTOAmount: data.perTAmount.sGstPercentTOAmount,
        cGstPercentTOAmount: data.perTAmount.cGstPercentTOAmount
      })
    
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
      labelShipping:data.detailsLabel.labelShipping
    })
    setCurrencySymbol(data.currencySymbol)
    setIsDiscount(data.discountNeed)
    setIsTax(data.taxNeed)
    setIsShipping(data.shippingNeed)
}
  }, [])
  return (
    <div className="flex flex-col h-[100vh]">
      <div className="h-[5vh] pl-6 mb-2">
        {/* <Image width="86%" height="40px" src="/images/invoice-Logo.png" /> */}
        <BtoolsHeader Src="/images/btBillHive.png" Height="35" Width="78"/>
      </div>
      <div className=" border-t-2 border-[#707070]/5 flex justify-around md:p-6 bg-slate-100">
        <div
          id="homeRoute"
          className="bg-black/80 h-[30px] w-[30px]  rounded-full xl:flex justify-center items-center hidden md:flex"
          onClick={homePageRoute}
        >
          <Image
          width="15%" height="14px"
            className="h-[14px] cursor-pointer hidden"
            src="/icons/back-arrow.svg"
          />
        </div>

        <div className="md:flex md:flex-row w-[100%] md:w-[80%] ">
          <div className="md:w-[67%] w-[60%] bg-white" ref={ref}>
            <div
              className={`min-h-[110px] max-h-[150px] opacity-[1] p-3 flex justify-between`}
            >
                {image.ImageUploaded
                  ? (
                  <section className=' w-[40%] md:w-[25%]'>
                    <img
                      src={image.profilePic}
                      alt=""
                      id="profilePic"
                      className="h-[135px] w-[100%] rounded-sm"
                    />
                  </section>
                    )
                  : (<div className='w-[25%]'></div>
                    )}
              <div className="h-[130px] md:pr-10 flex flex-col items-end justify-center md:w-[75%] w-[60%]">
                <p className="float-right text-[16px] font-[interSemiBold] truncate w-[30%] text-right">
                  {labelDetails.labelInvoice}
                </p>
                <div className="h-[35px] w-[63%] flex justify-between items-center rounded-lg p-3">
                  <input
                    className="w-[100%] focus:outline-none text-[#777777] bg-transparent text-end font-[sfpro-Regular] text-[12px] "
                    placeholder="Bill No"
                    value={`# ${invoiceDetails.invoiceNum}`}
                    name="invoiceNum"
                  />
                </div>
              </div>
            </div>
   
             {/* First part for lg responsive        */}
            <div className=" justify-between pb-10 pr-2 lg:flex sm:hidden md:hidden">
              <div className="h-[22%] w-[25%] md:w-[20%] xl:w-[69%] pl-5 flex flex-wrap justify-evenly pt-4">
                <div className=" border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[50%] p-1">
                  <input
                    className="w-[75%] h-[20px] truncate text-[#707070] focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                     value={`${labelDetails.labelBillFrom}:`}
                    name="labelBillFrom"
                  />
                  <p
                    className=" w-[75%] break-words focus:outline-none font-bold rounded-md font-[sfpro-Regular] text-[12px]"
                    value={invoiceDetails.billFrom}
                    name="billFrom"
                    placeholder="Who is this invoice from? (required)"
                  >{invoiceDetails.billFrom.split('\n')[0]}</p>
                  {invoiceDetails.billFrom.split('\n').map((value,index)=>{
                    return  <p
                    className=" w-[75%] break-words focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={invoiceDetails.billFrom}
                    name="billFrom"
                    placeholder="Who is this invoice from? (required)"
                  >{index > 0 ? value : null}</p>
                  })}
                </div>
                <input
                  className="w-[45%] h-[40px] focus:outline-none bg-transparent"
                  disabled
                />
                <div className=" border-[#707070]/25 mt-4 rounded-md flex flex-col text-[12px] w-[50%] p-1">
                  <input
                    className="w-[75%] truncate h-[20px] text-[#707070] focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={`${labelDetails.labelBillTo}:`}
                    name="labelBillTo"
                  />
                  <p
                    className="w-[75%] break-words font-bold focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={invoiceDetails.billTo}
                    name="billTo"
                    placeholder="Who is this invoice from? (required)"
                  >{invoiceDetails.billTo.split('\n')[0]}</p>
                  {invoiceDetails.billTo.split('\n').map((value,index)=>{
                    return  <p
                    className="w-[75%] break-words focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={invoiceDetails.billTo}
                    name="billTo"
                    placeholder="Who is this invoice from? (required)"
                  >{index > 0 ? value : null}</p>
                  })}
                </div>
               <div className={` border-[#707070]/25 mt-4 rounded-md flex flex-col w-[45%] p-1`}>
                  <input
                    className={`w-[75%] truncate h-[20px] focus:outline-none ${invoiceDetails.shipTo ? 'text-[#707070]':'text-white'} rounded-md font-[sfpro-Regular] text-[12px]`}
                    value={`${labelDetails.labelShipTO}:`}
                    name="labelShipTO"
                  />
                  <p
                    className={`w-[75%] break-words font-bold focus:outline-none rounded-md font-[sfpro-Regular] text-[12px] ${invoiceDetails.shipTo ? 'text-black':'text-white'}`}
                    value={invoiceDetails.shipTo}
                    name="shipTo"
                    placeholder="(Optional)"
                  >{invoiceDetails.shipTo.split('\n')[0]}</p>
                  {invoiceDetails.shipTo.split('\n').map((value,index)=>{
                    return  <p
                    className="w-[75%] break-words focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={invoiceDetails.shipTo}
                    name="shipTo"
                    placeholder="(Optional)"
                  >{index > 0 ? value : null}</p>
                  })}
                </div>
              </div>

              <div className="w-[70%] md:w-[90%] xl:w-[65%] flex flex-col items-end pt-4 md:pr-5">
                <div className=" border-[#707070]/25 flex justify-center rounded-md text-[12px] w-[85%] h-[33px] p-1">
                  <input
                    className="w-[50%] h-[20px] text-end text-[#707070] truncate focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={`${labelDetails.labelDate}:`}
                    name="labelDate"
                  />
                  <input
                    className="w-[60%] h-[20px] text-end pr-5 focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={invoiceDetails.billDate ? dateFormatter(invoiceDetails.billDate) : newdate}
                    name="billDate"
                  />
                </div>
               {invoiceDetails.dueDate ?  <div className=" border-[#707070]/25 flex justify-center rounded-md text-[12px] w-[85%] h-[33px] p-1">
                  <input
                    className="w-[50%] h-[20px] text-end text-[#707070] truncate focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={`${labelDetails.labelDueDate}:`}
                    name="labelDate"
                  />
                  <input
                    className="w-[60%] h-[20px] text-end pr-5 focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={dateFormatter(invoiceDetails.dueDate)}
                    name="billDate"
                  />
                </div> : null }

               {invoiceDetails.paymentTerms ?  <div className=" border-[#707070]/25 flex justify-center rounded-md text-[12px] w-[85%] p-1">
                  <input
                    className="w-[42%] h-[20px] text-end text-[#707070] truncate focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={`${labelDetails.labelPaymentTerms}:`}
                    name="labelDate"
                  />
                  <p
                    className="w-[50%] break-words text-end pr-2 indent-5 focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={invoiceDetails.paymentTerms}
                    name="billDate"
                  >{invoiceDetails.paymentTerms}</p>
                </div> : null }
              {invoiceDetails.poNumber ?   <div className=" border-[#707070]/25 flex justify-center rounded-md text-[12px] w-[85%] h-[33  px] p-1">
                  <input
                    className="w-[50%] h-[20px] text-end text-[#707070] truncate focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={`${labelDetails.labelPoNum}:`}
                    name="labelDate"
                  />
                  <input
                    className="w-[60%] h-[20px] text-end pr-5 focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={invoiceDetails.poNumber}
                    name="billDate"
                  />
                </div> : null }
                <div className="flex justify-between mb-2 w-[75%] rounded-sm bg-[#f2f3f5]">
                  <input
                    className=" w-[50%] pl-4 truncate bg-[#f2f3f5] rounded-sm focus:outline-none font-bold text-[12px]"
                    value={`${labelDetails.labelBalanceDue}:`}
                    name="labelBalanceDue"
                  />
                  <p className=" w-[62%] text-end pr-6 h-[30px] rounded-md truncate">
                    <span className="font-bold text-[12px]">{currencySymbol}</span>
                    <span className="font-bold text-[12px] truncate">
                      {Number(Math.round(total - invoiceDetails.amountPaid)).toFixed(2)}
                    </span>
                  </p>
                </div>

              </div>
            </div>

            {/* First part for md responsive        */}
            <div className="justify-between  pb-10 pr-2 flex-col md:flex sm:hidden lg:hidden ">
              <div className="h-[22%] w-[25%] md:w-[100%] xl:w-[69%] pl-5 flex flex-wrap justify-evenly pt-4 ">
                <div className=" border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[100%] p-1">
                  <input
                    className="w-[95%] h-[20px] truncate text-[#707070] focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                     value={`${labelDetails.labelBillFrom}:`}
                    name="labelBillFrom"
                  />
                  <p
                    className=" w-[95%] break-words focus:outline-none font-bold rounded-md font-[sfpro-Regular] text-[12px]"
                    value={invoiceDetails.billFrom}
                    name="billFrom"
                    placeholder="Who is this invoice from? (required)"
                  >{invoiceDetails.billFrom.split('\n')[0]}</p>
                  {invoiceDetails.billFrom.split('\n').map((value,index)=>{
                    return  <p
                    className=" w-[95%] break-words focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={invoiceDetails.billFrom}
                    name="billFrom"
                    placeholder="Who is this invoice from? (required)"
                  >{index > 0 ? value : null}</p>
                  })}
                </div>
                <input
                  className="w-[45%] h-[10px] focus:outline-none bg-transparent"
                  disabled
                />
                <div className=" border-[#707070]/25 mt-4 rounded-md flex flex-col text-[12px] w-[100%] p-1">
                  <input
                    className="w-[95%] truncate h-[20px] text-[#707070] focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={`${labelDetails.labelBillTo}:`}
                    name="labelBillTo"
                  />
                  <p
                    className="w-[95%] break-words font-bold focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={invoiceDetails.billTo}
                    name="billTo"
                    placeholder="Who is this invoice from? (required)"
                  >{invoiceDetails.billTo.split('\n')[0]}</p>
                  {invoiceDetails.billTo.split('\n').map((value,index)=>{
                    return  <p
                    className="w-[95%] break-words focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={invoiceDetails.billTo}
                    name="billTo"
                    placeholder="Who is this invoice from? (required)"
                  >{index > 0 ? value : null}</p>
                  })}
                </div>
               <div className={` border-[#707070]/25 mt-4 rounded-md flex flex-col w-[100%] p-1`}>
                  <input
                    className={`w-[95%] truncate h-[20px] focus:outline-none ${invoiceDetails.shipTo ? 'text-[#707070]':'text-white'} rounded-md font-[sfpro-Regular] text-[12px]`}
                    value={`${labelDetails.labelShipTO}:`}
                    name="labelShipTO"
                  />
                  <p
                    className={`w-[95%] break-words font-bold focus:outline-none rounded-md font-[sfpro-Regular] text-[12px] ${invoiceDetails.shipTo ? 'text-black':'text-white'}`}
                    value={invoiceDetails.shipTo}
                    name="shipTo"
                    placeholder="(Optional)"
                  >{invoiceDetails.shipTo.split('\n')[0]}</p>
                  {invoiceDetails.shipTo.split('\n').map((value,index)=>{
                    return  <p
                    className="w-[95%] break-words focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={invoiceDetails.shipTo}
                    name="shipTo"
                    placeholder="(Optional)"
                  >{index > 0 ? value : null}</p>
                  })}
                </div>
              </div>

              <div className="w-[70%] md:w-[100%] xl:w-[65%] flex flex-col items-end pt-4 md:pr-1 ">
                <div className=" border-[#707070]/25 flex justify-center rounded-md text-[12px] w-[85%] h-[33px] p-1">
                  <input
                    className="w-[50%] h-[20px] text-end text-[#707070] truncate focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={`${labelDetails.labelDate}:`}
                    name="labelDate"
                  />
                  <input
                    className="w-[60%] h-[20px] text-end pr-5 focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={invoiceDetails.billDate ? dateFormatter(invoiceDetails.billDate) : newdate}
                    name="billDate"
                  />
                </div>
               {invoiceDetails.dueDate ?  <div className=" border-[#707070]/25 flex justify-center rounded-md text-[12px] w-[85%] h-[33px] p-1">
                  <input
                    className="w-[50%] h-[20px] text-end text-[#707070] truncate focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={`${labelDetails.labelDueDate}:`}
                    name="labelDate"
                  />
                  <input
                    className="w-[60%] h-[20px] text-end pr-5 focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={dateFormatter(invoiceDetails.dueDate)}
                    name="billDate"
                  />
                </div> : null }

               {invoiceDetails.paymentTerms ?  <div className=" border-[#707070]/25 flex justify-center rounded-md text-[12px] w-[85%] p-1">
                  <input
                    className="w-[42%] h-[20px] text-end text-[#707070] truncate focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={`${labelDetails.labelPaymentTerms}:`}
                    name="labelDate"
                  />
                  <p
                    className="w-[50%] break-words text-end pr-2 indent-5 focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={invoiceDetails.paymentTerms}
                    name="billDate"
                  >{invoiceDetails.paymentTerms}</p>
                </div> : null }
              {invoiceDetails.poNumber ?   <div className=" border-[#707070]/25 flex justify-center rounded-md text-[12px] w-[85%] h-[33  px] p-1">
                  <input
                    className="w-[50%] h-[20px] text-end text-[#707070] truncate focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={`${labelDetails.labelPoNum}:`}
                    name="labelDate"
                  />
                  <input
                    className="w-[60%] h-[20px] text-end pr-5 focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={invoiceDetails.poNumber}
                    name="billDate"
                  />
                </div> : null }
                <div className="flex justify-between mb-2 w-[75%] rounded-sm bg-[#f2f3f5]">
                  <input
                    className=" w-[50%] pl-4 truncate bg-[#f2f3f5] rounded-sm focus:outline-none font-bold text-[12px]"
                    value={`${labelDetails.labelBalanceDue}:`}
                    name="labelBalanceDue"
                  />
                  <p className=" w-[62%] text-end pr-6 h-[30px] rounded-md truncate">
                    <span className="font-bold text-[12px]">{currencySymbol}</span>
                    <span className="font-bold text-[12px] truncate">
                      {Number(Math.round(total - invoiceDetails.amountPaid)).toFixed(2)}
                    </span>
                  </p>
                </div>

              </div>
            </div>

            <div className='min-h-[550px]'>
            <div className="md:pl-2 md:pr-1 rounded-lg md:max-w-[100%] ">
              <input
                value={'S.NO'}
                className="lg:w-[6%] md:w-[9%] focus:outline-none  pt-1  bg-black text-white rounded-tl-md rounded-bl-md font-[sfpro-Regular] text-[12px] h-[30px] pl-1"
              />
              <input
                className="w-[30%] lg:w-[35%] xl:w-[49%] focus:outline-none  pt-1 truncate bg-black text-white font-[sfpro-Regular] text-[12px] h-[30px] md:pl-4  pl-3"
                value={labelDetails.labelItem}
                name="labelItem"
              />
              <input
                className="w-[18%] md:w-[17%] lg:w-[15%] focus:outline-none pt-1 truncate bg-black text-white text-right font-[sfpro-Regular] text-[12px] h-[30px]"
                value={labelDetails.labelQuantity}
                name="labelQuantity"
              />
              <input
                className="w-[15%] md:w-[18%] lg:md:w-[15%]  md:focus:outline-none pt-1 truncate md:pl-4 lg:pl-1 bg-black text-white text-center font-[sfpro-Regular] text-[12px] h-[30px]"
                value={labelDetails.labelRate}
                name="labelRate"
              />
              <input
                className="w-[17%] md:w-[25%] lg:w-[20%] xl:w-[15%] focus:outline-none pt-1 pl-1 truncate bg-black text-white text-center font-[sfpro-Regular] text-[12px] rounded-br-md rounded-tr-md h-[30px]"
                value={labelDetails.labelAmount}
                name="labelAmount"
              />
            </div>
            {itemList.map((item, index) => {
              return (
                <div key={index} className="flex justify-between pr-2 group">
                  <div
                    key={index}
                    className="pl-4 pr-2 border-[#707070]/25 pt-2 flex justify-between w-[100%] group"
                  >
                    <input
                      className="w-[6%] md:w-[4%] text-right font-[sfpro-Regular] text-[12px]"
                      value={++index < 10 ? '0' + index : index}
                    />
                  <p className='w-[50%] md:w-[52%] lg:w-[40%] xl:w-[58%] break-all font-bold focus:outline-none p-2 pl-4 rounded-lg  border-[#707070]/25 font-[sfpro-Regular] text-[12px] '>
                    <span
                      className="font-bold"
                      value={item.item}
                      name="item"
                      placeholder="Description of service or product..."
                    >{item.item.split('\n')[0]}</span>
                    {item.item.split('\n').map((value,index)=>{
                      return  <span
                      className="text-[#777777] pl-1"
                      value={item.item}
                      name="item"
                      placeholder="Description of service or product..."
                    >{index > 0 ? value : null}</span>
                    })}
                  </p>
                    <input
                      className="w-[10%] truncate h-[33px] p-2 focus:outline-none rounded-lg  border-[#707070]/25 font-[sfpro-Regular] text-[12px]"
                      value={item.quality}
                      name="quality"
                    />
                    <div className="w-[25%] md:w-[27%] lg:w-[19%] xl:w-[12%] h-[33px] text-right text-[12px] focus:outline-none p-2 rounded-lg border-[#707070]/25 flex items-center">
                      <p className="w-[90%] h-[30px]  pt-1 text-center text-[12px] font-[sfpro-Regular]">
                        {currencySymbol}{Number(item.rate).toFixed(2)}
                      </p>
                    </div>
                    <div className="w-[28%] md:w-[28%] lg:w-[21%] xl:w-[14%] h-[33px] text-right text-[12px] focus:outline-none p-2 rounded-lg  border-[#707070]/25 flex items-center">
                      <p className="w-[100%] pr-1 pt-1 h-[30px]  text-right font-[sfpro-Regular] text-[12px]">
                        {currencySymbol}
                        {Number(
                          (item.amount = item.quality * item.rate)
                        ).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
            <div className="pl-6 pr-7 flex justify-end">
              <div className="w-[60%] md:w-[60%] xl:w-[33%] float-right pt-3 text-right">
               {isTax ?  <div className="flex justify-between mb-2">
                  <input
                    className="text-right w-[50%] truncate text-[#232E38]/50 focus:outline-none font-[sfpro-Regular] text-[12px]"
                    value={`${labelDetails.labelSubTotal}:`}
                    name="labelSubTotal"
                  />
                  <p className=" w-[44%] h-[30px] pr-4 rounded-md flex justify-end items-center">
                    <p className="w-[90%] truncate font-[interSemiBold] text-[12px]">
                    {currencySymbol}{subtotal}
                    </p>
                  </p>
                </div> : null }
               {IsDiscount ?  <div className="flex justify-between mb-2">
                {percentToAmount.discountPercentTOAmount ?  <input
                    className="w-[50%] text-right truncate text-[#232E38]/50 focus:outline-none font-[sfpro-Regular] text-[12px]"
                    value={`${labelDetails.labelDiscount} (${invoiceDetails.discount}%):`}
                    name="labelDiscount"
                  /> :
                  <input
                    className="w-[50%] text-right truncate text-[#232E38]/50 focus:outline-none font-[sfpro-Regular] text-[12px]"
                    value={`${labelDetails.labelDiscount}:`}
                    name="labelDiscount"
                  /> }
                  <label className=" w-[43%] h-[30px] rounded-md flex justify-between items-center p-2">
                    {percentToAmount.discountPercentTOAmount
                      ? (
                      <p className="w-[100%] pr-2 h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                        {currencySymbol}{Number(invoiceDetails.discount * subtotal / 100).toFixed(2)}
                      </p>
                        )
                      : (
                      <p className="w-[100%] pr-2 h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                        {currencySymbol}{Number(invoiceDetails.discount).toFixed(2)}
                      </p>
                        )}
                  </label>
                </div> : null }
             {isTax ?  <div> {taxToGst
                  ? (
                  <div className="flex justify-between mb-2">
                  {percentToAmount.taxPercentTOAmount ?   <input
                      className="w-[50%] text-right text-[#232E38]/50 focus:outline-none font-[sfpro-Regular] text-[12px]"
                      value={`${labelDetails.labelTax} (${invoiceDetails.tax}%):`}
                      name="labelTax"
                    /> :
                    <input
                      className="w-[50%] text-right text-[#232E38]/50 focus:outline-none font-[sfpro-Regular] text-[12px]"
                      value={`${labelDetails.labelTax}:`}
                      name="labelTax"
                    /> }
                    <label className=" w-[43%] h-[30px] rounded-md flex justify-between items-center p-2">
                      {percentToAmount.taxPercentTOAmount
                        ? (
                        <p className="w-[100%] pr-2 h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                          {currencySymbol}{Number(invoiceDetails.tax * (subtotal - invoiceDetails.discount * subtotal / 100 ) / 100).toFixed(2)}
                        </p>
                          )
                        : (
                        <p className="w-[100%] pr-2 h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                         {currencySymbol}{Number(invoiceDetails.tax).toFixed(2)}
                        </p>
                          )}
                    </label>
                  </div>
                    )
                  : (
                  <div>
                    <div className="flex justify-between mb-2">
                    {percentToAmount.sGstPercentTOAmount ?  <input
                        className="w-[50%] text-right focus:outline-none text-[#232E38]/50 truncate font-[sfpro-Regular] text-[12px]"
                        value={`${labelDetails.labelSGst} (${invoiceDetails.sGst}%):`}
                        name="labelSGst"
                      /> :
                      <input
                        className="w-[50%] text-right focus:outline-none text-[#232E38]/50 truncate font-[sfpro-Regular] text-[12px]"
                        value={`${labelDetails.labelSGst}:`}
                        name="labelSGst"
                      /> }
                      <label className=" w-[43%] h-[30px] rounded-md flex justify-between items-center p-2">
                        {percentToAmount.sGstPercentTOAmount
                          ? (
                          <p className="w-[100%] pr-2 h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                           {currencySymbol}{Number(invoiceDetails.sGst * (subtotal - invoiceDetails.discount * subtotal / 100 ) / 100).toFixed(2)}
                          </p>
                            )
                          : (
                          <p className="w-[100%] pr-2 h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                            {currencySymbol}{Number(invoiceDetails.sGst).toFixed(2)}
                          </p>
                            )}
                      </label>
                    </div>
                    <div className="flex justify-between mb-2">
                    {percentToAmount.cGstPercentTOAmount ? <input
                        className="w-[50%] text-right focus:outline-none text-[#232E38]/50 truncate font-[sfpro-Regular] text-[12px]"
                        value={`${labelDetails.labelCGst} (${invoiceDetails.cGst}%):`}
                        name="labelCGst"
                      /> :
                      <input
                        className="w-[50%] text-right focus:outline-none text-[#232E38]/50 truncate font-[sfpro-Regular] text-[12px]"
                        value={`${labelDetails.labelCGst}:`}
                        name="labelCGst"
                      /> }
                      <label className=" w-[43%] h-[30px] rounded-md flex justify-between items-center p-2">
                        {percentToAmount.cGstPercentTOAmount
                          ? (
                          <p className="w-[100%] pr-2 h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                           {currencySymbol}{Number(invoiceDetails.cGst * (subtotal - invoiceDetails.discount * subtotal / 100 ) / 100).toFixed(2)}
                          </p>
                            )
                          : (
                          <p className="w-[100%] pr-2 h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                            {currencySymbol}{Number(invoiceDetails.cGst).toFixed(2)}
                          </p>
                            )}
                      </label>
                    </div>
                  </div>
                    )} </div> : null }

{isShipping ?  <div className="flex justify-between mb-2">
                  <input
                    className="w-[50%] text-right truncate text-[#232E38]/50 focus:outline-none font-[sfpro-Regular] text-[12px]"
                    value={`${labelDetails.labelShipping}:`}
                    name="labelShipping"
                  /> 
                  <label className=" w-[43%] h-[30px] rounded-md flex justify-between items-center p-2">
                      <p className="w-[100%] pr-2 h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                        {currencySymbol}{Number(invoiceDetails.shipping).toFixed(2)}
                      </p>
                  </label>
                </div> 
                : null }

                <div className="flex justify-between mb-2">
                  <input
                    className="text-right w-[50%] truncate text-[#232E38]/50 focus:outline-none font-[sfpro-Regular] text-[12px]"
                    value={`${labelDetails.labelTotal}:`}
                    name="labelTotal"
                  />
                  <p className=" w-[44%] h-[30px] pr-4 rounded-md truncate">
                    <span className="font-[interSemiBold] text-[12px]">{currencySymbol}</span>
                    <span className="font-[interSemiBold] truncate text-[12px]">
                      {Number(Math.round(total)).toFixed(2)}
                    </span>
                  </p>
                </div>
             {invoiceDetails.amountPaid ?    <div className="flex justify-between mb-2">
                  <input
                    className="w-[50%] text-right focus:outline-none text-[#232E38]/50 font-[sfpro-Regular] text-[12px]"
                    value={`${labelDetails.labelAmountPaid}:`}
                    name="labelAmountPaid"
                  />
                  <label className=" w-[53%] pr-4 truncate h-[30px] rounded-md flex justify-between items-center p-2">
                    <p className="w-[100%] h-[22px] text-right truncate font-[interSemiBold] text-[12px]">
                    {currencySymbol}{Number(invoiceDetails.amountPaid).toFixed(2)}
                    </p>
                  </label>
                </div> : null }
              </div>
            </div>
            <div className="w-[60%] h-[150px] ml-7 flex flex-col justify-evenly">
               {invoiceDetails.notes ?  <div className=" border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[95%] h-[50px] p-1">
                  <input
                    className="w-[100%] h-[20px] truncate text-[#707070] focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={labelDetails.labelNotes}
                    name="labelNotes"
                  />
                  <input
                    className="w-[100%] h-[20px] truncate focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={invoiceDetails.notes}
                    name="notes"
                    placeholder="Add any extra information"
                  />
                </div> : null }
               {invoiceDetails.termsNCondition ?  <div className=" border-[#707070]/25 rounded-md flex flex-col text-[12px] w-[95%] h-[50px] p-1">
                  <input
                    className="w-[100%] h-[20px] text-[#707070] truncate focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={labelDetails.labelTermsNCon}
                    name="labelTermsNCon"
                  />
                  <input
                    className="w-[100%] h-[20px] truncate focus:outline-none rounded-md font-[sfpro-Regular] text-[12px]"
                    value={invoiceDetails.termsNCondition}
                    name="termsNCondition"
                    placeholder="Add terms like late fees payment methods delivery scheduel etc..."
                  />
                </div> : null }
              </div>
          </div>
          </div>
          <div className="pl-6 w-[40%]">
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
      {/* <div className="p-3 text-center text-[12px] font-[sfpro-Regular]">
        © 2022  Alpha Business Solutions Pvt. Ltd. All Rights Reserved.
      </div> */}
      <div>
        <BtoolsFooter/>
      </div>
    </div>
  )
}

export default PreView
