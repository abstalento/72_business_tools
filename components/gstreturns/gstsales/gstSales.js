import Image from "next/image";
import { useEffect, useState } from "react";
import Service from "../../../services/gstreturns/service";

const GstSales = ({ gstId, salesValues, deleteData, useEffectCall, currencyValue,salesExportfile }) => {
  const [salesData, setSalesData] = useState([
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
  ]);

  const salesChange = (event, index) => {
    const { name, value } = event.target;
    const salesState = JSON.parse(JSON.stringify(salesData));
    salesState[index][name] =
      name == "salesBillCost" || name == "salesGstAmount"
        ? value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1")
        : name == "salesInvoiceDate" || name == "salesPaidDate"
          ? value
          : value.replace(/[^\w\s]/gi, "");
    salesValues(salesState, "gstSales");
    setSalesData(salesState);
  };

  const salesAdd = () => {
    setSalesData([
      ...salesData,
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
    ]);
  };

  const salesDelete = (data) => {
    deleteData(data, true);
  };
  useEffect(() => {
    (async function serviceCall() {
      await Service.gstReturnsHistory();
      const gstHistory = await Service.gstReturnsHistory();
      if (gstHistory.data) {
        setSalesData(gstHistory.data[gstId]["gstSales"]);
      }
    })();
  }, [gstId, useEffectCall]);


  const salesExport=()=>{
    salesExportfile(true)
  }

  return (
    <>
      <div className="md:hidden">
        <div className="w-full h-[55vh] flex justify-around items-center">
          <div className=" overflow-x-scroll scroll-smooth kanbanContentscroll w-[90%] h-[50vh]">
            <div className="w-[90rem] min-h-[50vh] mx-auto">
              <div className="bg-[#232E38] flex font-[sfpro-regular-display] text-[9px] text-white p-2">
                <p className="w-[5%]">S.No</p>
                <p className="w-[8%]">Sales Bill No</p>
                <p className="w-[8%]">Invoice Date</p>
                <p className="w-[35%] pl-2">Sales Company Name</p>
                <p className="w-[11%]">GSTIN NO</p>
                <p className="w-[9%] pl-3">BILL COST</p>
                <p className="w-[10%] pl-3">GST AMOUNT</p>
                <p className="w-[9%] pl-5">TOT. BILL</p>
                <p className="w-[9%] pl-2">PAID DATE</p>
                <p className="w-[8%] pl-3">PAY MODE</p>
                <Image
                  width="16%"
                  height="10px"
                  className=""
                  src="/icons/deleteheadgst.svg"
                />
              </div>
              <div className="max-h-[60vh] overflow-scroll scrollBar">
                {salesData?.map((value, index) => {
                  return (
                    <div className="flex font-[sf-pro-medium] text-[10px] pl-1 pt-3 space-x-4">
                      <p
                        className="bg-transparent border p-1 border-[#707070]/25 rounded-md w-[2%] pl-2 outline-none flex items-center"
                      // value={index}
                      >
                        {index}
                      </p>
                      <input
                        id="salesBill"
                        className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[7%] outline-none text-center"
                        value={value.salesBill}
                        placeholder="salesBill"
                        name="salesBill"
                        onChange={(event) => salesChange(event, index)}
                      />
                      <input
                        id="salesInvoiceDate"
                        className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[7.5%] pl-3 outline-none"
                        value={value.salesInvoiceDate}
                        type="date"
                        placeholder="salesInvoiceDate"
                        name="salesInvoiceDate"
                        onChange={(event) => salesChange(event, index)}
                      />
                      <input
                        id="saleCompanyName"
                        className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[28%] pl-3 outline-none"
                        value={value.saleCompanyName}
                        placeholder="saleCompanyName"
                        name="saleCompanyName"
                        onChange={(event) => salesChange(event, index)}
                      />
                      <input
                        id="salesGstInNo"
                        className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[13%] pl-3 outline-none text-center"
                        value={value.salesGstInNo}
                        placeholder="salesGstInNo"
                        name="salesGstInNo"
                        onChange={(event) => salesChange(event, index)}
                      />
                      <input
                        id="salesBillCost"
                        className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[8%] pl-3 outline-none text-center"
                        value={`${currencyValue} ${value.salesBillCost}`}
                        placeholder="salesBillCost"
                        name="salesBillCost"
                        onChange={(event) => salesChange(event, index)}
                      />
                      <input
                        id="salesGstAmount"
                        className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[8%] pl-3 outline-none text-center"
                        value={`${currencyValue} ${value.salesGstAmount}`}
                        placeholder="salesGstAmount"
                        name="salesGstAmount"
                        onChange={(event) => salesChange(event, index)}
                      />
                      <input
                        className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[9%] pl-3 outline-none text-center"
                        value={`${currencyValue}  ${Number(value.salesBillCost) + Number(value.salesGstAmount)
                          }/-`}
                        placeholder="salesTotalBill"
                        name="salesTotalBill"
                        readOnly
                      // onChange={(event) => salesChange(event, index)}
                      />
                      <input
                        id="salesPaidDate"
                        className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[7.5%] pl-3 outline-none"
                        value={
                          value.salesInvoiceDate === "" ||
                            value.salesPaidDate < value.salesInvoiceDate
                            ? " "
                            : value.salesPaidDate
                        }
                        type="date"
                        min={value.salesInvoiceDate}
                        placeholder="salesPaidDate"
                        name="salesPaidDate"
                        onChange={(event) => salesChange(event, index)}
                      />
                      <input
                        id="salesPayMode"
                        className=" bg-transparent border border-[#707070]/25 p-1 rounded-md w-[6.5%] pl-3 outline-none text-center"
                        value={value.salesPayMode}
                        placeholder="salesPayMode"
                        name="salesPayMode"
                        onChange={(event) => salesChange(event, index)}
                      />
                      <span
                        className={`ml-6 cursor-pointer`}
                        onClick={() =>
                          salesDelete(index)
                        }
                      >
                        <svg
                          id="Component_16_1"
                          data-name="Component 16 – 1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="35"
                          height="32"
                          viewBox="0 0 38 38"
                        // fill="currentColor"
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
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="pl-1 mt-3">
                <button
                  id="addItem"
                  className="rounded-md p-2 text-[10px] font-[sf-pro-medium] w-[7%] flex items-center justify-around bg-[#013B3B] text-white opacity-[1]"
                  onClick={salesAdd}
                >
                  <Image width="16%" height="10px" className="" src="/icons/plus.svg" />
                  Add New Item
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-around items-center h-[8vh] fixed bottom-[120px]">
          <div className="w-[90%] justify-end flex h-[8vh]">  
              <div onClick={salesExport} className="bg-[#4FAF04] h-[4rem] flex justify-center items-center rounded-full w-[4rem]">
                <img src="/icons/Icon download.svg" height={20} width={20} alt="download" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-[95%] md:block hidden sm:hidden min-h-[70vh] mx-auto mt-5">
        <div className="bg-[#232E38] flex font-[sfpro-regular-display] text-[9px] text-white p-2">
          <p className="w-[5%]">S.No</p>
          <p className="w-[8%]">Sales Bill No</p>
          <p className="w-[8%]">Invoice Date</p>
          <p className="w-[35%] pl-2">Sales Company Name</p>
          <p className="w-[11%]">GSTIN NO</p>
          <p className="w-[9%] pl-3">BILL COST</p>
          <p className="w-[10%] pl-3">GST AMOUNT</p>
          <p className="w-[9%] pl-5">TOT. BILL</p>
          <p className="w-[9%] pl-2">PAID DATE</p>
          <p className="w-[8%] pl-3">PAY MODE</p>
          <Image
            width="16%"
            height="10px"
            className=""
            src="/icons/deleteheadgst.svg"
          />
        </div>
        <div className="max-h-[60vh] overflow-scroll scrollBar">
          {salesData?.map((value, index) => {
            return (
              <div className="flex font-[sf-pro-medium] text-[10px] pl-1 pt-3 space-x-4">
                <p
                  className="bg-transparent border p-1 border-[#707070]/25 rounded-md w-[2%] pl-2 outline-none flex items-center"
                // value={index}
                >
                  {index+1}
                </p>
                <input
                  id="salesBill"
                  className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[7%] outline-none text-center"
                  value={value.salesBill}
                  placeholder="salesBill"
                  name="salesBill"
                  onChange={(event) => salesChange(event, index)}
                />
                <input
                  id="salesInvoiceDate"
                  className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[7.5%] pl-3 outline-none"
                  value={value.salesInvoiceDate}
                  type="date"
                  placeholder="salesInvoiceDate"
                  name="salesInvoiceDate"
                  onChange={(event) => salesChange(event, index)}
                />
                <input
                  id="saleCompanyName"
                  className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[28%] pl-3 outline-none"
                  value={value.saleCompanyName}
                  placeholder="saleCompanyName"
                  name="saleCompanyName"
                  onChange={(event) => salesChange(event, index)}
                />
                <input
                  id="salesGstInNo"
                  className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[13%] pl-3 outline-none text-center"
                  value={value.salesGstInNo}
                  placeholder="salesGstInNo"
                  name="salesGstInNo"
                  onChange={(event) => salesChange(event, index)}
                />
                <input
                  id="salesBillCost"
                  className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[8%] pl-3 outline-none text-center"
                  value={`${currencyValue} ${value.salesBillCost}`}
                  placeholder="salesBillCost"
                  name="salesBillCost"
                  onChange={(event) => salesChange(event, index)}
                />
                <input
                  id="salesGstAmount"
                  className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[8%] pl-3 outline-none text-center"
                  value={`${currencyValue} ${value.salesGstAmount}`}
                  placeholder="salesGstAmount"
                  name="salesGstAmount"
                  onChange={(event) => salesChange(event, index)}
                />
                <input
                  className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[9%] pl-3 outline-none text-center"
                  value={`${currencyValue}  ${Number(value.salesBillCost) + Number(value.salesGstAmount)
                    }/-`}
                  placeholder="salesTotalBill"
                  name="salesTotalBill"
                  readOnly
                // onChange={(event) => salesChange(event, index)}
                />
                <input
                  id="salesPaidDate"
                  className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[7.5%] pl-3 outline-none"
                  value={
                    value.salesInvoiceDate === "" ||
                      value.salesPaidDate < value.salesInvoiceDate
                      ? " "
                      : value.salesPaidDate
                  }
                  type="date"
                  min={value.salesInvoiceDate}
                  placeholder="salesPaidDate"
                  name="salesPaidDate"
                  onChange={(event) => salesChange(event, index)}
                />
                <input
                  id="salesPayMode"
                  className=" bg-transparent border border-[#707070]/25 p-1 rounded-md w-[6.5%] pl-3 outline-none text-center"
                  value={value.salesPayMode}
                  placeholder="salesPayMode"
                  name="salesPayMode"
                  onChange={(event) => salesChange(event, index)}
                />
                <span
                  className={`ml-6 cursor-pointer`}
                  onClick={() =>
                    salesDelete(index)
                  }
                >
                  <svg
                    id="Component_16_1"
                    data-name="Component 16 – 1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="35"
                    height="32"
                    viewBox="0 0 38 38"
                  // fill="currentColor"
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
                </span>
              </div>
            );
          })}
        </div>
        <div className="pl-1 mt-3">
          <button
            id="addItem"
            className="rounded-md p-2 text-[10px] font-[sf-pro-medium] w-[7%] flex items-center justify-around bg-[#013B3B] text-white opacity-[1]"
            onClick={salesAdd}
          >
            <Image width="16%" height="10px" className="" src="/icons/plus.svg" />
            Add New Item
          </button>
        </div>
      </div>
    </>
  );
};

export default GstSales;
