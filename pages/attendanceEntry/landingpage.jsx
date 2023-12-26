import React, { useContext } from "react";
import { useState, useEffect } from "react";
import CompanyDetails from "../../components/AttendanceEntry/CompanyDetails/CompanyDetails";
import ViewPopup from "../../components/AttendanceEntry/DashBoard/Popup";
import FieldSetUp from "../../components/AttendanceEntry/FieldSet/FieldSetUp";
import PdfAttendance from "../../components/AttendanceEntry/pdfcontiner/pdfAttendance";
// import PdfContentAttendance from "../../components/AttendanceEntry/pdfcontiner/pdfAttendancePage";
import PdfContent from "../../components/AttendanceEntry/pdfcontiner/pdfContentattendance";
// import PdfContentAttendance from "../../components/AttendanceEntry/pdfcontiner/pdfContentAttendnacePage";
import PdfContentDashBoard from "../../components/AttendanceEntry/pdfcontiner/pdfContentDashBoard";
import PdfContentEmployee from "../../components/AttendanceEntry/pdfcontiner/pdfemployee";
import PdfProvider from "../../components/AttendanceEntry/pdfcontiner/pdfproviderattendance";
import EmployeeDetailsPopup from "../../components/AttendanceEntry/Popup/EmployeeDetailsPopup";
import Application from "../../components/AttendanceEntry/Sidebar/Application";
import GlobalContext from "../../components/kanbanBoard/Calender/GlobalContext";
import BtoolsFooter from "../../container/72BTfooter/BToolsFooter";
import BtoolsHeader from "../../container/72BTheader/BToolsHeader";
import Service from "../../services/attendanceEntry/services";
import EmployeeDetails from "../../components/AttendanceEntry/EmployeeDetails/EmployeeDetails";
import PouchDB from "pouchdb";

const LandingPages = () => {
  const { OpenViewPopup, setOpenViewPopup } = useContext(GlobalContext);
  const { getDashPopup,setGetDashPopup} = useContext(GlobalContext)
  const { OpenPopupPage, changeDashBoard, CalendarData, sendCountDB, dashBoardData, sentCalenderData, sendEmployee, sentUseffectCall } = useContext(GlobalContext);
  const [ViewPage, setViewPage] = useState(false);
  const [ComponentData, SetActiveComponentData] = useState();
  const [dbData, setdbData] = useState(false);
  const [empDetails, setEmpDetails] = useState([]);
  const [isEmployee, setIsEmployee] = useState(false)
  const [isFielsSetup, setIsFielsSetup] = useState(false)
  const [employeeDetail,setEmployeeDetail] = useState([])
  const [companyDetails,setCompanyDetails] = useState({
    companyName :'',
    companyCategory:'',
    contactNumber:'',
    mailId:'',
    numberOfEmployee:'',
    companyLocation:'',

})
const [attendanceEntry,setAttendanceEntry] = useState({})
const [showEmployeePage,setShowEmployeePage] = useState(false)
  const handleViewPage = (data) => {
    setViewPage((prev) => !prev);
  };
  const activeComponentData = (data) => {
    SetActiveComponentData(data);
  };
  
  // console.log(changeDashBoard,"changeDashBoardchangeDashBoard")

  useEffect(() => {
    (async function Change() {
      try {
        await Service.getEmployeeDetails();
        await Service.getEmployeeDetails();
        await Service.getEmployeeDetails();
        const companyData = await Service.getCompanyDetails();
        const fieldSetUpData = await Service.getAttendanceEntry();

        setAttendanceEntry({
          "departmentName": [
              {
                  "title": "D1oooo",
                  "Name": "departmentName"
              }
          ],
          "designationName": [
              {
                  "title": "Empl1",
                  "Name": "designationName"
              }
          ],
          "typeofEmployee": [
              {
                  "title": "T1",
                  "Name": "typeofEmployee"
              }
          ],
          "salaryMode": [
              {
                  "title": "Sal1",
                  "Name": "salaryMode"
              }
          ],
          "addField1": [],
          "addField": [],
          "attendanceField": [],
          "typeofBank": [
              {
                  "title": "Bank1",
                  "Name": "typeofBank"
              }
          ],
          "paymentMode": [
              {
                  "title": "P1",
                  "Name": "paymentMode"
              }
          ],
          "fieldObjData": {},
          "branchName": "TVL",
          "_id": "AttendanceEntry",
          "_rev": "2-079f3d08aa6af4e873bed92fd4c635b1"
      })

        const AttendanceEntry = await Service.getEmployeeDetails();
        setEmpDetails(AttendanceEntry.EmployeeDetails);
     
        AttendanceEntry.EmployeeDetails == undefined
        ? setdbData(true)
        : setdbData(false);

          // console.log(companyData,'companyDatacompanyData')
          if (companyData?.CompanyModel && companyData?.CompanyModel?.mailId && companyData?.CompanyModel?.contactNumber) {
            setShowEmployeePage(true)
            setCompanyDetails(companyData.CompanyModel)
            if(companyData?.CompanyModel?.numberOfEmployee && companyData?.CompanyModel?.companyLocation){
              setShowEmployeePage(false)
              setIsFielsSetup(true)
              setdbData(false)
              setEmployeeDetail(companyData.CompanyModel)
              if (AttendanceEntry?.EmployeeDetails) {
                setIsFielsSetup(false)
                      // setdbData(true)
                    } 
            }
          }
        
       

        // if (companyData?.CompanyModel && companyData?.CompanyModel?.numberOfEmployee && companyData?.CompanyModel?.companyLocation) {
        //   setEmployeeDetail(companyData.CompanyModel)
        //   setdbData(false)
        //   setIsFielsSetup(true)
        //   if (fieldSetUpData?.typeofBank && fieldSetUpData?.paymentMode && fieldSetUpData?.departmentName && fieldSetUpData?.designationName && fieldSetUpData?.typeofEmployee && fieldSetUpData?.salaryMode) {
        //     setIsEmployee(true)
        //     if (AttendanceEntry?.EmployeeDetails) {
        //       setdbData(false)
        //     } else {
        //       //  redirectInto employeedetails
        //       setdbData(true)
        //       setIsEmployee(true)
        //     }
        //   } else {
        //     setdbData(true)
        //     setIsFielsSetup(true)
        //     // redirectInto fieldSetup
        //   }
        // } else {
        //   setdbData(true)
        // }


      } catch (err) {
        alert(JSON.stringify(err));
      }
    })();
  }, [ComponentData, ViewPage,changeDashBoard]);

  const onHandleCompanydetail=(status,companyobj)=>{
    setShowEmployeePage(status)
    handleSubmit(companyobj)
    setCompanyDetails(companyobj)
  }

  const onHandleEmployee =(status,employeeInfo)=>{
  setShowEmployeePage(false)
  setIsFielsSetup(status)
  handleSubmit(employeeInfo)
  setdbData(false)
  setEmployeeDetail(employeeInfo)
  }

  const handleSubmit = (details) => {
    var db = new PouchDB("AttendanceEntryProject");
    db.get("CompanyDetails", function (err, doc) {
        if (err) {
            var doc = {
                _id: "CompanyDetails",
                CompanyModel: details,
            };
            db.put(doc);
        }
        db.put(
            {
                _id: doc._id,
                CompanyModel: details,
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
    // setShowFieldsetupPage(true)
}

  return (
    <>
      {
        <div className="md:h-screen flex flex-col justify-between">
          {dbData == true ? (
            <>
              <div className="flex justify-between items-center">
                <BtoolsHeader
                  Src="../icons/AttendanceEntrylogo.svg"
                  Height="50"
                  Width="83"
                />

                {
                  changeDashBoard && <div className="md:w-[24%] lg:w-[10%] 2xl:w-[6%]  xl:w-[6%] w-[25%]  flex justify-around items-center">
                    {/* <img src="../icons/AutoSave.svg" alt="" className="" /> */}
                    {/* <h3>Auto Save</h3> */}
                    {ViewPage ? (
                      <img
                        src="../icons/ExportWhite.svg"
                        alt=""
                        className="md:w-9 cursor-pointer"
                        onClick={() => handleViewPage(true)}
                      />
                    ) : (
                      <img

                        src="../icons/ExportIcon.svg"
                        alt=""
                        className="w-9 cursor-pointer"
                        onClick={() => handleViewPage(true)}
                      />
                    )}
                    {
                      !ViewPage && (
                        <PdfProvider
                          ButtonComponent={(props) => (
                            <div
                              onClick={props.onClick}
                              className="bg-white w-[42%] lg:w-[34%] md:w-[20%] xl:w-[40%] flex justify-center items-center h-[30px] rounded-md cursor-pointer"
                            >
                              <img
                                src="../icons/ExportYello.svg"
                                alt=""
                                className="md:w-9 w-9 cursor-pointer font-[sfpro-regular]"
                              />
                            </div>
                          )}
                          disabled={dashBoardData?.length > 0 ? false : true}
                          pdfDocument={
                            <PdfContentDashBoard Data={dashBoardData} ComponentData={ComponentData} />}
                        ></PdfProvider>
                      )
                    }

                    {
                      ViewPage && (
                        <PdfProvider
                          ButtonComponent={(props) => (
                            <div
                              onClick={props.onClick}
                              className="bg-white w-[42%] lg:w-[34%] md:w-[20%] xl:w-[40%] flex justify-center items-center h-[30px] rounded-md cursor-pointer"
                            >
                              <img
                                src="../icons/ExportYello.svg"
                                alt=""
                                className="md:w-9 w-9 cursor-pointer font-[sfpro-regular]"
                              />
                            </div>
                          )}
                          // disabled={empDetails.length>0 ? false :true}
                          pdfDocument={
                            <PdfContent Data={empDetails} calendarData={CalendarData} />}
                        ></PdfProvider>
                      )
                    }
                  </div>
                }

              </div>
              <div className="">
                {OpenViewPopup ? (
                  <ViewPopup handleClose={() => setOpenViewPopup(false)} />
                 
                ) : null}

                {getDashPopup?(
                  <Application
                    ViewPage={ViewPage}
                    sendActiveComponents={activeComponentData}
                  />
                ) : null}

                {changeDashBoard ? (
                  <Application
                    ViewPage={ViewPage}
                    sendActiveComponents={activeComponentData}
                  />
                ) : OpenPopupPage? (
                  <EmployeeDetailsPopup />
                ) :showEmployeePage?(
                  <EmployeeDetails companyFullDetail = {companyDetails} companydetailsCallback = {onHandleEmployee}></EmployeeDetails>
                ): 
                (
                  <CompanyDetails companydetailsCallback = {onHandleCompanydetail} />
                )}
              </div>
              <div>{OpenViewPopup ? "" : <BtoolsFooter />}</div>
            </>
          ):
         isFielsSetup?(
           <><div className="flex justify-between items-center">
            <BtoolsHeader
            Src="../icons/AttendanceEntrylogo.svg"
            Height="50"
            Width="83"
          /></div>
            <FieldSetUp FullemployeeDetail={employeeDetail} attendanceEntry={attendanceEntry}  isEdit = {false} defaultEntries = {true}/>
            </>
          ):
          (
            <>
              <div className="flex justify-between items-center">
                <BtoolsHeader
                  Src="../icons/AttendanceEntrylogo.svg"
                  Height="50"
                  Width="83"
                />
                {
                  ComponentData == undefined && (
                    <div className="md:w-[24%] lg:w-[10%] xl:w-[6%] w-[25%] flex justify-content justify-around items-center">
                      {/* <img src="../icons/AutoSave.svg" alt="" className="" /> */}
                      {/* <h3>Auto Save</h3> */}
                      {ViewPage ? (
                        <img
                          src="../icons/ExportWhite.svg"
                          alt=""
                          className="md:w-9 w-9 cursor-pointer"
                          onClick={() => handleViewPage(true)}
                        />
                      ) : (
                        <img
                          src="../icons/ExportIcon.svg"
                          alt=""
                          className="w-9  cursor-pointer"
                          onClick={() => handleViewPage(true)}
                        />
                      )}

                      {
                        ViewPage ? (
                          <PdfProvider
                            ButtonComponent={(props) => (
                              <div
                                onClick={props.onClick}
                                className="bg-white w-[42%] md:w-[20%] lg:w-[34%] xl:w-[40%] flex justify-center items-center h-[30px] rounded-md cursor-pointer"
                              >
                                <img
                                  src="../icons/ExportYello.svg"
                                  alt=""
                                  className="md:w-9 w-9 cursor-pointer font-[sfpro-regular]"
                                />
                              </div>
                            )}
                            disabled={empDetails?.length > 0 ? false : true}
                            pdfDocument={
                              <PdfContent Data={empDetails} calendarData={CalendarData} />}
                          ></PdfProvider>
                        ) : !ViewPage && (
                          <PdfProvider
                            ButtonComponent={(props) => (
                              <div
                                onClick={props.onClick}
                                className="bg-white w-[42%] lg:w-[34%] md:w-[20%] xl:w-[40%] flex justify-center items-center h-[30px] rounded-md cursor-pointer"
                              >
                                <img
                                  src="../icons/ExportYello.svg"
                                  alt=""
                                  className="md:w-9 w-9 cursor-pointer font-[sfpro-regular]"
                                />
                              </div>
                            )}
                            disabled={dashBoardData?.length > 0 ? false : true}
                            pdfDocument={
                              <PdfContentDashBoard Data={dashBoardData} ComponentData={ComponentData} />}
                          ></PdfProvider>
                        )
                      }

                    </div>
                  )
                }
                {ComponentData == "DashBoard" ? (
                  <div className="md:w-[24%] lg:w-[10%] 2xl:w-[6%] xl:w-[6%] w-[25%] flex justify-around items-center">
                    {/* <img src="../icons/AutoSave.svg" alt="" className="" /> */}
                    {/* <p>Auto Save</p> */}
                    {ViewPage ? (
                      <img
                        src="../icons/ExportWhite.svg"
                        alt=""
                        className="md:w-9 w-9 cursor-pointer"
                        onClick={() => handleViewPage(true)}
                      />
                    ) : (
                      <img
                        src="../icons/ExportIcon.svg"
                        alt=""
                        className="w-9 cursor-pointer"
                        onClick={() => handleViewPage(true)}
                      />
                    )}
                    {
                      !ViewPage && (
                        <PdfProvider
                          ButtonComponent={(props) => (
                            <div
                              onClick={props.onClick}
                              className="bg-white w-[42%] lg:w-[34%] md:w-[20%] xl:w-[40%] flex justify-center items-center h-[30px] rounded-md cursor-pointer"
                            >
                              <img
                                src="../icons/ExportYello.svg"
                                alt=""
                                className="md:w-9 w-9 cursor-pointer font-[sfpro-regular]"
                              />
                            </div>
                          )}
                          disabled={dashBoardData?.length == 0 ? true : false}
                          pdfDocument={
                            <PdfContentDashBoard Data={dashBoardData} ComponentData={ComponentData} />}
                        ></PdfProvider>
                      )
                    }

                    {
                      ViewPage && (
                        <PdfProvider
                          ButtonComponent={(props) => (
                            <div
                              onClick={props.onClick}
                              className="bg-white w-[42%] lg:w-[34%] md:w-[20%] xl:w-[40%] flex justify-center items-center h-[30px] rounded-md cursor-pointer"
                            >
                              <img
                                src="../icons/ExportYello.svg"
                                alt=""
                                className="md:w-9 w-9 cursor-pointer font-[sfpro-regular]"
                              />
                            </div>
                          )}
                          disabled={empDetails?.length > 0 ? false : true}
                          pdfDocument={
                            <PdfContent Data={empDetails} calendarData={CalendarData} />}
                        ></PdfProvider>
                      )
                    }

                  </div>
                ) : ComponentData == "Attendance" ? (
                  <div className="md:w-[25%] lg:w-[10%] xl:w-[6%]  w-[25%]  flex justify-around items-center" title="Export">
                    {/* <img src="../icons/AutoSave.svg" alt="" className="" /> */}
                    {/* <h3>Auto Save</h3> */}
                   
                    <PdfProvider
                      ButtonComponent={(props) => (
                        <div
                          onClick={props.onClick}
                          className="bg-white w-[42%] lg:w-[34%] md:w-[20%] xl:w-[40%] flex justify-center items-center h-[30px] rounded-md cursor-pointer"
                        >
                          <img
                            src="../icons/ExportYello.svg"
                            alt=""
                            className="md:w-9 w-9 cursor-pointer font-[sfpro-regular]"
                          />
                        </div>
                      )}
                      disabled={sentUseffectCall?.length > 0 ? false : true}
                      pdfDocument={
                        <PdfAttendance Data={sentUseffectCall} calendarData={sentCalenderData} />}
                    ></PdfProvider>
                  </div>
                ) : ComponentData == "EmployeeDetails" && (
                  <div className="md:w-[17%] w-[24%] lg:w-[6%] flex justify-around items-center " title="Export">
                    {/* <img src="../icons/AutoSave.svg" alt="" className="" /> */}
                    {/* <h3>Auto Save</h3> */}
                  
                    <PdfProvider
                      ButtonComponent={(props) => (
                        <div
                          onClick={props.onClick}
                          className="bg-white w-[42%] lg:w-[34%] md:w-[30%] xl:w-[40%] flex justify-center items-center h-[30px] rounded-md cursor-pointer"
                        >
                          <img
                            src="../icons/ExportYello.svg"
                            alt=""
                            className="md:w-9  w-9 cursor-pointer font-[sfpro-regular]"
                          />
                        </div>
                      )}
                      disabled={sendEmployee?.length > 0 ? false : true}
                      pdfDocument={
                        <PdfContentEmployee Data={sendEmployee} calendarData={CalendarData} />}
                    ></PdfProvider>
                  </div>
                )

                }
              </div>

              {OpenViewPopup ? (
                <ViewPopup handleClose={() => setOpenViewPopup(false)} />
              ) : null}
              <Application
                ViewPage={ViewPage}
                sendActiveComponents={activeComponentData}
              />
              <div>{OpenViewPopup ? "" : <BtoolsFooter />}</div>
            </>
          )}
        </div>
      }
    </>
  );
};

export default LandingPages;
