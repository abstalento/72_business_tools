import { Dialog } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import Service from "../../../services/gstreturns/service";
import { CSVLink } from "react-csv";
import GstPdfProvider from "../gstpdfprovider/gstPdfProvider";
import GstSalesContent from "../gstpdfcontent/gstSalesExport";
import GstPurchaseContent from "../gstpdfcontent/gstPurchaseExport";

const ExportGstReturns = ({ closepopUp, gstId, activeState, currencyValue }) => {
  const [fullWidth] = useState(false);
  const [maxWidth] = useState("md");
  const [csvData, setCsvData] = useState([]);
  const [headCalculation, setHeadCalculation] = useState();
  const [inputValue, setInputValue] = useState();
  const [exportData, setExportData] = useState();
  const [todoList, setTodoList] = useState();



  const closePopUp = () => {
    closepopUp(false);
  };
  const exportCsvClick = () => {
    closepopUp(false);
  };
  const exportChange = (event) => {
    setExportData(event.target.value);
    // const filterTodoList = props.datas.filter((data) => {
    //   if (event.target.value == "All" || event.target.value == undefined) {
    //     return props.datas;
    //   }
    //   return data.isComplete == event.target.value;
    // });
    // setTodoList(filterTodoList)
  };
  const pdfClick = () => {
    const filterTodoList = props.datas.filter((data) => {
      if (exportData == "All" || exportData == undefined) {
        return props.datas;
      }
      return data.isComplete == exportData;
    });
    props.closeExport(false);
  };
  const completeDownload = () => {
    closepopUp(false);
  };
  useEffect(() => {
    (async function serviceCall() {
      await Service.gstReturnsHistory();
      const gstHistory = await Service.gstReturnsHistory();
      let gstDatas = [];
      if (gstHistory.data) {
        setHeadCalculation(gstHistory.data[gstId]);
        const salesGstCalc = gstHistory.data[gstId]["gstSales"].reduce(
          (total, item) => Number(total) + Number(item.salesGstAmount),
          0
        );

        const purchaseGstCalc = gstHistory.data[gstId]["gstPurchase"].reduce(
          (total, item) => Number(total) + Number(item.gstAmount),
          0
        );

        const payAmount = Number(salesGstCalc) - Number(purchaseGstCalc);

        const csvSales = gstHistory.data[gstId]["gstSales"].map((value) => {
          const {
            salesBill,
            salesInvoiceDate,
            saleCompanyName,
            salesGstInNo,
            salesBillCost,
            salesGstAmount,
            salesTotalBill,
            salesPaidDate,
            salesPayMode,
          } = value;
          gstHistory.data[gstId]["gstPurchase"].map((value) => {
            const {
              purchaseBill,
              invoiceDate,
              purchaseCompanyName,
              gstInNo,
              billCost,
              gstAmount,
              paidDate,
              payMode,
            } = value;
            gstDatas.push({
              purchaseBill,
              invoiceDate,
              purchaseCompanyName,
              gstInNo,
              billCost,
              gstAmount,
              paidDate,
              payMode,
              salesBill,
              salesInvoiceDate,
              saleCompanyName,
              salesGstInNo,
              salesBillCost,
              salesGstAmount,
              salesTotalBill,
              salesPaidDate,
              salesPayMode,
              salesGstCalc,
              purchaseGstCalc,
              payAmount,
            });
          });
          setCsvData([...csvData, ...gstDatas]);
        });
      }
    })();
  }, [gstId]);
  return (
    <div className="w-full fixed bottom-0 items-center flex justify-center bg-opacity-[10%] bg-black h-[100vh]">
    <div className="w-[80%] md:w-[25%] sm:w-[80%] bg-white rounded-[12px]">
      <div className="mx-auto w-[100%] border-2">
        <div className="flex items-center p-6 w-[100%]">
          <h1
            style={{ fontFamily: "sfpro-bold", fontSize: "113%" }}
            className="mx-auto"
          >
            Select the export list
          </h1>
          <Image
            width="23px"
            height="15px"
            src="/icons/crossblue.svg"
            onClick={closePopUp}
            className="hover:cursor-pointer"
          />
        </div>
        <div className="pb-2 flex justify-evenly">
          <select
            className="bg-[#F6F6F6]/100 w-[60%] font-[sfpro-medium] focus:outline-none p-2"
            name="exportData"
            value={exportData}
            onChange={exportChange}
          >
            <option hidden>Select Export</option>
            <option className="bg-[#7070704D]/10" value="CSV">CSV</option>
            <option className="bg-[#7070704D]/10" value="PDF">PDF</option>
          </select>
        </div>
        <div
          style={{ width: "72%" }}
          className="flex justify-between mx-auto p-4 pb-6"
        >
          <button
            style={{ width: "47%", fontFamily: "sfpro-medium" }}
            className="bg-[#00000099]/50 text-white h-11 rounded-lg border-2 border-[#DBDBDB6E]"
            onClick={closePopUp}
          >
            Cancel
          </button>
          {exportData == "CSV" ? (
            <CSVLink data={csvData} className="flex w-[47%] justify-center">
              <button
                id="exportSave"
                disabled={exportData == "CSV" ? false : true}
                className={`rounded-lg bg-color4 w-[100%] font-[sfpro-medium] ${
                  exportData == "CSV"
                    ? "bg-[#4FAF04] cursor-pointer"
                    : "bg-[#4FAF04]/30 cursor-not-allowed"
                } text-white `} //${inputValue? null : 'cursor-not-allowed opacity-30'}
                onClick={exportCsvClick}
              >
                Confirm
              </button>
            </CSVLink>
          ) : // <button
          //   id="exportSave"
          //   className={`rounded-lg bg-color4 w-[47%] font-[sfpro-medium] ${
          //     todoList?.length > 0
          //       ? "bg-[#4FAF04] cursor-pointer"
          //       : "bg-[#4FAF04]/30 cursor-not-allowed"
          //   } text-white `} //${inputValue? null : 'cursor-not-allowed opacity-30'}
          // >
          //   Confirm
          // </button>
          exportData == "PDF" ? (
            <GstPdfProvider
              ButtonComponent={(props) => (
                <button
                  id="exportSave"
                  // disabled="false"
                  className={`rounded-lg bg-color4 w-[47%] font-[sfpro-medium] ${
                    headCalculation
                      ? "bg-[#4FAF04] cursor-pointer"
                      : "bg-[#4FAF04]/30 cursor-not-allowed"
                  } text-white `} //${inputValue? null : 'cursor-not-allowed opacity-30'}
                  onClick={props.onClick}
                >
                  Confirm
                </button>
              )}
              // disabled={!!(headCalculation.companyName===""?false:true)}
              disabled={headCalculation ? false : true}
              fileName = {'GstReturns'}
              pdfDocument={
                headCalculation ? <GstSalesContent datas={headCalculation} currencySymbol={currencyValue} content="Sales" /> : (
                  <></>
                )
                //action={exportData}
              }
              onDownloadComplete={completeDownload}
            ></GstPdfProvider>
          ) : (
            <button
              id="exportSave"
              // disabled="false"
              className={`rounded-lg bg-color4 w-[47%] font-[sfpro-medium] bg-[#4FAF04]/30 cursor-not-allowed text-white `} //${inputValue? null : 'cursor-not-allowed opacity-30'}
              // onClick={props.onClick}
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ExportGstReturns;
