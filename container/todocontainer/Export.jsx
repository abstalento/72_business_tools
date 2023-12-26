import React from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDocument } from "./Pdfdesign";
import { Pdfprogress } from "./Pdfprogress";
import Myimage from "../../components/todolistcomponents/Image/Image";
import { useState } from "react";
export default function Export({
  cancelExport,
  arrayaddtodo,
  setStatusType,
  statustype,
  Hidestatustype,
  setHideStatustype,
  hideexportbtn,
  setHideexportbtn,
  exportButtonpdf,
  setExportButtonpdf,
}) {
  const [pdfstatus, setStatus] = useState({ statusType: "" });
  // const [pdfeditlayout, setPdfeditlayout] = useState(null);
  const [optionLayout, setOptionLayout] = useState(false);

  const [buttonLayout, setButtonLayout] = useState(false);
  const [padding, setPadding] = useState(true);
  const [iconLayout, setIconLayout] = useState(true);
  // const [statustype, setStatusType] = useState(null);
  const [selectmode, setSelectmode] = useState(true);
  //TaskCompleted Array

  const [taskcompleted, setTaskcompleted] = useState([]);
  const [progressarray, setProgressArray] = useState([]);
  const onChangePdf = (event) => {
    setStatus(event.target.value);
  };
  // console.log(pdfstatus, "pdfstatus");
  const Pdfclick = () => {
    alert(pdfstatus);
  };
  //Completed Array

  const completedTask = arrayaddtodo.filter(
    (a, i) => a.taskstatus == "completed"
  );

  const ProgressTask = arrayaddtodo.filter(
    (a, i) => a.taskstatus == "Progress"
  );
  //Dropdown

  const dropdownClick = () => {
    setIconLayout(!iconLayout);
    setOptionLayout(!optionLayout);
    setButtonLayout(!buttonLayout);
    setPadding(!padding);
    setTaskcompleted(completedTask);
    setProgressArray(ProgressTask);
    // console.log(taskcompleted, "completedTasknnn");
    // console.log(progressarray, "ProgressTask");
  };

  const Statusclick = (content) => {
    // alert(content);

    let comp;

    if (content === "CompltedPdf") {
      setExportButtonpdf(true);
    } else {
      setExportButtonpdf(false);
    }
    setHideexportbtn(false);
    setHideStatustype(true);
    // setExportButtonpdf(!exportButtonpdf);
    setSelectmode(false);
    setStatusType(!statustype);
    setIconLayout(!iconLayout);
    setOptionLayout(!optionLayout);
    setButtonLayout(!buttonLayout);
    setPadding(!padding);
    // console.log(NumberLayout.length, "NumberLayout");
  };

  //Number layout
  return (
    <div>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}

          <div
            className={
              padding
                ? "border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none pl-[60px] pr-[90px] pt-[60px] pb-[20px]"
                : "border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none pl-[60px] pr-[90px] pt-[60px] pb-[120px] "
            }
          >
            {/*body*/}
            <div className="relative p-3 flex-auto">
              <div className="my-2 text-[#000000] text-lg leading-relaxed">
                <div className="text-[#000000]  text-[25px] opacity-[50] absoulte mt-[-37px] ml-[44px] font-[sf-pro-regular]">
                  {" "}
                  Export - To Do List
                </div>
                {/* <div className="absoulte mt-[20px]">
                  {" "}
                  <input
                    type="text"
                    placeholder="Enter List Name"
                    className="border-2 border-solid"
                    name="categorytype"
                  ></input>
                </div> */}
                {/* <select
                  className="border-2 border-solid border-black mt-[12px]"
                  name="statusType"
                  value={setStatus.statusType}
                  onChange={onChangePdf}
                >
                  <option name="statusType" value="Completed">
                    Completed
                  </option>
                  <option name="statusType" value="Progress">
                    Progress
                  </option>
                </select> */}
              </div>
            </div>
            <div>
              <div className="container flex mx-auto mt-[10px]">
                <div
                  className="flex border-solid border-[3px] border-[#00000033] ml-[25px] cursor-pointer"
                  onClick={() => {
                    dropdownClick();
                  }}
                >
                  <div className="pr-[75px] py-2 w-64 bg-[#F9F8F8]">
                    {selectmode ? (
                      <div className="text-[15px]  font-[sf-pro-regular] text-[#000000] opacity-20">
                        Select the mode
                      </div>
                    ) : null}

                    {Hidestatustype ? (
                      <div>
                        {" "}
                        {statustype ? (
                          <div className="text-[15px]  font-[sf-pro-regular] text-[#000000] ">
                            Completed To Do
                          </div>
                        ) : (
                          <div className="text-[15px]  font-[sf-pro-regular] text-[#000000] ">
                            On Progress To Do
                          </div>
                        )}
                      </div>
                    ) : null}
                  </div>
                  <div className="flex items-center justify-center  bg-[#F9F8F8]">
                    {iconLayout ? (
                      <Myimage
                        src="/todolistimages/exportrightarrow.png"
                        alt="Right_arrow"
                        width={25}
                        height={15}
                      />
                    ) : (
                      <Myimage
                        src="/todolistimages/exportdownarrow.png"
                        alt="Down_arrow"
                        width={20}
                        height={10}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div>
              {optionLayout ? (
                <div>
                  <div className="border-2 border-solid border-r border-b  border-l bg-[#F9F8F8] border-[#00000033] absolute ml-[26px] w-[61%] h-[100px]">
                    <div
                      className="cursor-pointer  font-[sf-pro-regular] pt-[12px] pl-[15px] text-[#000000]  hover:text-[#2A94FD]  "
                      onClick={() => Statusclick("CompltedPdf")}
                    >
                      Completed To Do
                    </div>
                    <div
                      className="cursor-pointer  font-[sf-pro-regular] pt-[15px] pl-[15px] text-[#000000]   hover:text-[#2A94FD]"
                      onClick={() => Statusclick("ProgressPdf")}
                    >
                      On Progress To Do
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            {/* <div>
              <PDFDownloadLink
                document={<PdfDocument arrayaddtodo={arrayaddtodo} />}
                fileName="todolist.pdf"
                style={{
                  textDecoration: "none",
                  padding: "10px",
                  color: "#4a4a4a",
                  backgroundColor: "#f2f2f2",
                  border: "1px solid #4a4a4a",
                }}
              >
                <button // }
                  className=" text-[#ffffff] bg-[red] font-bold uppercase text-sm px-6 py-2 rounded "
                  type="button"
                >
                  PDF
                </button>
              </PDFDownloadLink>
            </div> */}
            {/*footer*/}
            {buttonLayout ? null : (
              <div>
                {" "}
                <div className="flex justify-end p-4 mt-[20px] ">
                  <div>
                    {" "}
                    <button
                      className="text-[#ffffff] bg-[#00000099] text-[20px] rounded font-[sf-pro-regular] px-6 py-3 text-sm outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150 mr-[48px]"
                      type="button"
                      onClick={() => cancelExport()}
                    >
                      Cancel
                    </button>
                  </div>
                  <div>
                    {hideexportbtn ? (
                      <div>
                        <button // }
                          className=" text-[#ffffff] bg-[#0064FE] text-[20px] font-[sf-pro-regular] text-sm px-6 py-3 rounded "
                          type="button"
                          onClick={() => alert("Validation")}
                        >
                          Done
                        </button>
                      </div>
                    ) : (
                      <div>
                        {exportButtonpdf ? (
                          <PDFDownloadLink
                            document={
                              <PdfDocument taskcompleted={taskcompleted} />
                            }
                            fileName="Completedtodolist.pdf"
                            style={{
                              textDecoration: "none",
                              padding: "10px",
                              color: "#4a4a4a",
                              backgroundColor: "#f2f2f2",
                              // border: "1px solid #4a4a4a",
                            }}
                          >
                            <button // }
                              className="text-[#ffffff] text-[20px] bg-[#0064FE]  font-[sf-pro-regular] text-sm px-6 py-3 rounded"
                              type="button"
                            >
                              Done
                            </button>
                          </PDFDownloadLink>
                        ) : (
                          <div>
                            <PDFDownloadLink
                              document={
                                <Pdfprogress progressarray={progressarray} />
                              }
                              fileName="Progresstodolist.pdf"
                              style={{
                                textDecoration: "none",
                                padding: "10px",
                                color: "#4a4a4a",
                                backgroundColor: "#f2f2f2",
                                // border: "1px solid #4a4a4a",
                              }}
                            >
                              <button // }
                                className=" text-[#ffffff] text-[20px] bg-[#0064FE]  font-[sf-pro-regular] text-sm px-6 py-3 rounded "
                                type="button"
                              >
                                Done
                              </button>
                            </PDFDownloadLink>
                          </div>
                        )}
                        {/* <button
                      // className={
                      //   newlistvalidation
                      //     ? "text-[#ffffff] bg-[#035BE1] font-bold uppercase text-sm px-6 py-2 rounded  "
                      //     : "bg-[red] "
                      // }
                      className="text-[#ffffff] bg-[#035BE1] font-bold uppercase text-sm px-6 py-2 rounded "
                      type="button"
                      onClick={() => {
                        Pdfclick();
                      }}
                    >
                      Done
                    </button> */}
                      </div>
                    )}{" "}
                  </div>

                  {/* {pdfeditlayout ? <div>Completed</div> : <div>Progress</div>} */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}
