import Image from "next/image";
import { useEffect, useState } from "react";
import Service from "../../../services/gstreturns/service";

const GstPurchase = ({ gstId, salesValues, deleteData, useEffectCall, currencyValue,ExportClick }) => {
  const [purchaseData, setPurchaseData] = useState([
    {
      purchaseBill: "",
      invoiceDate: "",
      purchaseCompanyName: "",
      gstInNo: "",
      billCost: "",
      gstAmount: "",
      totalBill: "",
      paidDate: "",
      payMode: ""
    },
  ]);

  const purchaseChange = (event, index) => {
    const { name, value } = event.target;
    const purchaseState = JSON.parse(JSON.stringify(purchaseData));
    purchaseState[index][name] =
      name == "billCost" || name == "gstAmount"
        ? value.replace(/[^0-9.]/g, "").replace(/(\..*?)\..*/g, "$1")
        : name == "invoiceDate" || name == "paidDate" ? value : value.replace(/[^\w\s]/gi, "");
    salesValues(purchaseState, "gstPurchase");
    setPurchaseData(purchaseState);
  };

  const purchaseAdd = () => {
    setPurchaseData([
      ...purchaseData,
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
    ]);
  };

  const purchaseDelete = (data) => {
    deleteData(data, true);
  };
  useEffect(() => {
    (async function serviceCall() {
      await Service.gstReturnsHistory();
      const gstHistory = await Service.gstReturnsHistory();
      if (gstHistory.data) {
        setPurchaseData(gstHistory.data[gstId]["gstPurchase"]);
      }
    })();
  }, [gstId, useEffectCall]);


  const mobileExportClick=()=>{
    ExportClick(true)
  }

  return (
    <>
      <div className="md:hidden">
        <div className="w-full h-[55vh] flex justify-around items-center">
          <div className=" overflow-x-scroll scroll-smooth kanbanContentscroll w-[90%] h-[50vh]">
            <div className="w-[90rem] md:min-h-[70vh] sm:min-h-[53vh] min-h-[53vh]  mx-auto">
              <div className="bg-[#232E38] flex font-[sf-pro-medium] text-[9px] text-white p-2">
                <p className="w-[5%]">S.No</p>
                <p className="w-[8%]">Purchase Bill No</p>
                <p className="w-[8%]">Invoice Date</p>
                <p className="w-[35%] pl-2">Purchase Company Name</p>
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
                {purchaseData?.map((value, index) => {
                  return (
                    <div className="flex font-[sf-pro-medium] text-[10px] pl-1 pt-3 space-x-4">
                      <p
                        className="bg-transparent border p-1 border-[#707070]/25 rounded-md w-[2%] pl-2 outline-none flex items-center"
                      // value={index}
                      >{index}</p>
                      <input
                        id="purchaseBill"
                        className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[7%] pl-3 outline-none"
                        value={value.purchaseBill}
                        placeholder="purchaseBill"
                        name="purchaseBill"
                        onChange={(event) => purchaseChange(event, index)}
                      />
                      <input
                        id="invoiceDate"
                        className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[7.5%] pl-3 outline-none"
                        value={value.invoiceDate}
                        type="date"
                        placeholder="invoiceDate"
                        name="invoiceDate"
                        onChange={(event) => purchaseChange(event, index)}
                      />
                      <input
                        id="purchaseCompanyName"
                        className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[28%] pl-3 outline-none"
                        value={value.purchaseCompanyName}
                        placeholder="purchaseCompanyName"
                        name="purchaseCompanyName"
                        onChange={(event) => purchaseChange(event, index)}
                      />
                      <input
                        id="gstInNo"
                        className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[13%] pl-3 outline-none text-center"
                        value={value.gstInNo}
                        placeholder="gstInNo"
                        name="gstInNo"
                        onChange={(event) => purchaseChange(event, index)}
                      />
                      <input
                        id="billCost"
                        className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[8%] pl-3 outline-none text-center"
                        value={`${currencyValue} ${value.billCost}`}
                        placeholder="billCost"
                        name="billCost"
                        onChange={(event) => purchaseChange(event, index)}
                      />
                      <input
                        id="gstAmount"
                        className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[8%] pl-3 outline-none text-center"
                        value={`${currencyValue} ${value.gstAmount}`}
                        placeholder="gstAmount"
                        name="gstAmount"
                        onChange={(event) => purchaseChange(event, index)}
                      />
                      <input
                        className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[9%] pl-3 outline-none text-center"
                        value={`${currencyValue}  ${Number(value.billCost) + Number(value.gstAmount)
                          }/-`}
                        placeholder="totalBill"
                        name="totalBill"
                      // onChange={(event) => purchaseChange(event, index)}
                      />
                      <input
                        id="purchaseDate"
                        className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[7.5%] pl-3 outline-none"
                        value={
                          value.invoiceDate === "" || value.paidDate < value.invoiceDate
                            ? " "
                            : value.paidDate
                        }
                        type="date"
                        min={value.invoiceDate}
                        placeholder="paidDate"
                        name="paidDate"
                        onChange={(event) => purchaseChange(event, index)}
                      />
                      <input
                        id="purchasePayMode"
                        className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[6.5%] pl-1 outline-none text-center"
                        value={value.payMode}
                        placeholder="payMode"
                        name="payMode"
                        onChange={(event) => purchaseChange(event, index)}
                      />
                      <span
                        className={`ml-6 cursor-pointer`}
                        onClick={() =>
                          purchaseDelete(index)
                        }
                      >
                        <svg
                          id="Component_16_1"
                          data-name="Component 16 – 1"
                          xmlns="http://www.w3.org/2000/svg"
                          width="35"
                          height="32"
                          viewBox="0 0 38 38"
                          fill="currentColor"
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
                  onClick={purchaseAdd}
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
            <div onClick={mobileExportClick} className="bg-[#4FAF04] h-[4rem] flex justify-center items-center rounded-full w-[4rem]">
              <img src="/icons/Icon download.svg" height={20} width={20} alt="download" />
            </div>
          </div>
        </div>
      </div>


      <div className="hidden sm:hiddem md:block">
        <div className="w-[95%] md:min-h-[70vh] sm:min-h-[53vh] min-h-[53vh]  mx-auto mt-5">
          <div className="bg-[#232E38] flex font-[sf-pro-medium] text-[9px] text-white p-2">
            <p className="w-[5%]">S.No</p>
            <p className="w-[8%]">Purchase Bill No</p>
            <p className="w-[8%]">Invoice Date</p>
            <p className="w-[35%] pl-2">Purchase Company Name</p>
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
            {purchaseData?.map((value, index) => {
              return (
                <div className="flex font-[sf-pro-medium] text-[10px] pl-1 pt-3 space-x-4">
                  <p
                    className="bg-transparent border p-1 border-[#707070]/25 rounded-md w-[2%] pl-2 outline-none flex items-center"
                  // value={index}
                  >{index+1}</p>
                  <input
                    id="purchaseBill"
                    className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[7%] pl-3 outline-none"
                    value={value.purchaseBill}
                    placeholder="purchaseBill"
                    name="purchaseBill"
                    onChange={(event) => purchaseChange(event, index)}
                  />
                  <input
                    id="invoiceDate"
                    className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[7.5%] pl-3 outline-none"
                    value={value.invoiceDate}
                    type="date"
                    placeholder="invoiceDate"
                    name="invoiceDate"
                    onChange={(event) => purchaseChange(event, index)}
                  />
                  <input
                    id="purchaseCompanyName"
                    className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[28%] pl-3 outline-none"
                    value={value.purchaseCompanyName}
                    placeholder="purchaseCompanyName"
                    name="purchaseCompanyName"
                    onChange={(event) => purchaseChange(event, index)}
                  />
                  <input
                    id="gstInNo"
                    className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[13%] pl-3 outline-none text-center"
                    value={value.gstInNo}
                    placeholder="gstInNo"
                    name="gstInNo"
                    onChange={(event) => purchaseChange(event, index)}
                  />
                  <input
                    id="billCost"
                    className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[8%] pl-3 outline-none text-center"
                    value={`${currencyValue} ${value.billCost}`}
                    placeholder="billCost"
                    name="billCost"
                    onChange={(event) => purchaseChange(event, index)}
                  />
                  <input
                    id="gstAmount"
                    className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[8%] pl-3 outline-none text-center"
                    value={`${currencyValue} ${value.gstAmount}`}
                    placeholder="gstAmount"
                    name="gstAmount"
                    onChange={(event) => purchaseChange(event, index)}
                  />
                  <input
                    className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[9%] pl-3 outline-none text-center"
                    value={`${currencyValue}  ${Number(value.billCost) + Number(value.gstAmount)
                      }/-`}
                    placeholder="totalBill"
                    name="totalBill"
                  // onChange={(event) => purchaseChange(event, index)}
                  />
                  <input
                    id="purchaseDate"
                    className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[7.5%] pl-3 outline-none"
                    value={
                      value.invoiceDate === "" || value.paidDate < value.invoiceDate
                        ? " "
                        : value.paidDate
                    }
                    type="date"
                    min={value.invoiceDate}
                    placeholder="paidDate"
                    name="paidDate"
                    onChange={(event) => purchaseChange(event, index)}
                  />
                  <input
                    id="purchasePayMode"
                    className="bg-transparent border border-[#707070]/25 p-1 rounded-md w-[6.5%] pl-1 outline-none text-center"
                    value={value.payMode}
                    placeholder="payMode"
                    name="payMode"
                    onChange={(event) => purchaseChange(event, index)}
                  />
                  <span
                    className={`ml-6 cursor-pointer`}
                    onClick={() =>
                      purchaseDelete(index)
                    }
                  >
                    <svg
                      id="Component_16_1"
                      data-name="Component 16 – 1"
                      xmlns="http://www.w3.org/2000/svg"
                      width="35"
                      height="32"
                      viewBox="0 0 38 38"
                      fill="currentColor"
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
              onClick={purchaseAdd}
            >
              <Image width="16%" height="10px" className="" src="/icons/plus.svg" />
              Add New Item
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default GstPurchase;
