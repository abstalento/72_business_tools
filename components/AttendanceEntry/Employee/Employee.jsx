import React, { useContext, useEffect, useState, useRef } from "react";
import OverAllHeader from "../Header/Header";
import PouchDB from "pouchdb";
import Service from "../../../services/attendanceEntry/services";
import EmployeeDetails from "../EmployeeDetails/EmployeeDetails";
import { indexOf } from "lodash";
import FieldSetUp from "../FieldSet/FieldSetUp";
import GlobalContext from "../../kanbanBoard/Calender/GlobalContext";
const Employee = ({
  setAddEmployee,
  setMenuItem,
  setMenuItemValueDataaClose,
}) => {
  const { sendCountDB, setDbCount, setSendEmployee } =
    useContext(GlobalContext);
  const [useEffectstate, setUseEffect] = useState(false);
  const [onUseEffectCallState, setUseEffectState] = useState(0);
  const [dbDataEmpDetails, setdbDataEmpDetails] = useState([]);

  const [salaryPerMonth, setSalaryPerMonth] = useState();
  const [searchEmp, setSearchEmp] = useState();
  const [dbDataTypeOfEmp, setdbDataTypeOfEmp] = useState();
  const [dbDataPaymentMode, setdbDataPaymentMode] = useState();
  const [monthIndex, setMonthIndex] = useState();
  const [addField, setAddField] = useState(true);
  const [attendanceEntry, setAttendanceEntry] = useState([]);
  const [editIconChange, setEditIconChange] = useState(false);
  const [indexValue, setIndex] = useState();
  const input1 = useRef(null);
  const [isAdd, setisAdd] = useState(false);
  const [empPage, setEmpPage] = useState(false);
  const [useEffectState, setUseEffectStatee] = useState(0)
  const addEmployee = () => {
    setisAdd(true);
    setdbDataEmpDetails([
      ...dbDataEmpDetails,
      {
        companyName: "",
        empType: "",
        accNumber: "",
        empID: "",
        salary: "",
        IFSCCode: "",
        empName: "",
        paymentMode: "",
        deptName: "",
        bankAccType: "",
        designation: "",
        bankName: "",
        uploadProfile: "",
        doj: "",
        bankBranch: "",
        currencySymbol: "",
        panNumber: "",
        ESI: "",
        emailID: "",
        EMINumber: "",
        Attendance: [],
        isEdit: false,
      },
    ]);
  };

  useEffect(()=>{

    setSendEmployee(dbDataEmpDetails);

  },[dbDataEmpDetails])
  const search = (data) => {
    setSearchEmp(data);
  };
  const month = (data) => {
    setMonthIndex(data);
  };

  const handleChange = (event, index) => {
    const { name, value } = event.target;
    const list = [...dbDataEmpDetails];
    list[index][name] = value;
    setdbDataEmpDetails(list);
  };

  const NameKeyPress = (e, id, index) => {
    if (e.key == "Enter") {
      let dbData = [...dbDataEmpDetails];
      // console.log(dbData,"---Employeee.jsx")

      dbData[index].isEdit = !dbData[index].isEdit;
      setdbDataEmpDetails(dbData);
      setSendEmployee(dbData);
      let updateData = [...dbData];
      dbData.forEach((data, i) => {
        dbData[i].isEdit = true;
      });
      var db = new PouchDB("AttendanceEntryProject");
      db.get("EmployeeDetails", function (err, doc) {
        if (err) {
          var doc = {
            _id: "EmployeeDetails",
            EmployeeDetails: updateData,
          };
          db.put(doc);
        }
        db.put(
          {
            _id: doc._id,
            EmployeeDetails: updateData,
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
    }
    setUseEffectState((preState) => ++preState);
  };

  useEffect(() => {
    setdbDataEmpDetails([
      ...dbDataEmpDetails,
      {
        companyName: "",
        empType: "",
        accNumber: "",
        empID: "",
        salary: "",
        IFSCCode: "",
        empName: "",
        paymentMode: "",
        deptName: "",
        bankAccType: "",
        designation: "",
        bankName: "",
        uploadProfile: "",
        doj: "",
        bankBranch: "",
        currencySymbol: "",
        panNumber: "",
        ESI: "",
        emailID: "",
        EMINumber: "",
        Attendance: [],
        isEdit: true,
        contactNo: "",
        address: "",
      },
    ]);
  }, [setAddEmployee]);

  useEffect(() => {
    if (isAdd == true) {
      input1.current.focus();
    }
    setisAdd(false);
  }, [isAdd]);

  useEffect(() => {
    const sendDbCount = () => {
      setDbCount(dbDataEmpDetails?.length);
    };
    sendDbCount();
  }, [dbDataEmpDetails, useEffectstate]);
  useEffect(() => {
    (async function Change() {
      try {
        await Service.getEmployeeDetails();
        await Service.getEmployeeDetails();
        await Service.getEmployeeDetails();
        const attendanceEntry = await Service.getEmployeeDetails();
        setdbDataEmpDetails(attendanceEntry.EmployeeDetails);
        if (attendanceEntry.EmployeeDetails) {
          const filterAttendance = attendanceEntry.EmployeeDetails.filter(
            (data) => {
              let filterMonth = new Date(data.doj);
              let month = filterMonth.getMonth();
              let day = filterMonth.getFullYear();
              let myDate =
                month >= 9
                  ? day + "-" + (month + 1)
                  : day + "-" + "0" + (month + 1);
              if (monthIndex == myDate) {
                setdbDataEmpDetails([data]);
                return data;
              }
            }
          );
        }
      } catch (err) {
        alert(JSON.stringify(err));
      }
    })();
  }, [monthIndex]);

  useEffect(() => {
    (async function Change() {
      try {
        await Service.getAttendanceEntry();
        await Service.getAttendanceEntry();
        await Service.getAttendanceEntry();
        await Service.getAttendanceEntry();
        await Service.getAttendanceEntry();
        const AttendanceEntry = await Service.getAttendanceEntry();
        setdbDataTypeOfEmp(AttendanceEntry.typeofEmployee);
        setdbDataPaymentMode(AttendanceEntry.paymentMode);
        setAttendanceEntry(AttendanceEntry);
      } catch (err) {
        alert(JSON.stringify(err));
      }
    })();

  }, [useEffectState]);

  const handleDelete = (index) => {
    const deletData = [...dbDataEmpDetails];
    deletData.splice(index, 1);
    dbDataEmpDetails.splice(index, 1);
    setSendEmployee(deletData);
    var db = new PouchDB("AttendanceEntryProject");
    db.get("EmployeeDetails", function (err, doc) {
      if (err) {
        var doc = {
          _id: "EmployeeDetails",
          EmployeeDetails: deletData,
        };
        db.put(doc);
      }
      db.put(
        {
          _id: doc._id,
          EmployeeDetails: deletData,
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

    setUseEffect((prev) => !prev);
  };
  const handleEdit = (event, id, index) => {
    setEditIconChange(!editIconChange);
    let dbData = [...dbDataEmpDetails];
    dbData[index].isEdit = !dbData[index].isEdit;
    setIndex(index);
    setdbDataEmpDetails(dbData);
    setSendEmployee(dbData);
    var db = new PouchDB("AttendanceEntryProject");
    db.get("EmployeeDetails", function (err, doc) {
      if (err) {
        var doc = {
          _id: "EmployeeDetails",
          EmployeeDetails: dbData,
        };
        db.put(doc);
      }
      db.put(
        {
          _id: doc._id,
          EmployeeDetails: dbData,
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

  const setMenuItemValueData = () => {
    setMenuItem();
  };
  const setMenuItemValue = () => {
    setMenuItemValueDataaClose();
  };
  const handleAddValue = () => {
    setUseEffectStatee((preState) => ++preState)
    setAddField(!addField);
  
  };
  const cancelButton = () => {
    setAddField(true);
  };
  const updateButton = () => {
    setEmpPage(true);
  };
  return (
    <div className="w-auto h-screen">
      {addField == true ? (
        <>
          <OverAllHeader
            addEmployee={addEmployee}
            setMenuItemValue={setMenuItemValueData}
            searchValue={search}
            monthIndex={month}
          />
          <div
            className="w-full flex items-center justify-around"
            onClick={setMenuItemValue}
          >
            <div className="flex overflow-x-scroll scroll-smooth scrollBar py-2 w-[94%] xl:w-[98%] rounded-md">
              <div className=" w-[100%] h-[85vh] flex justify-center items-center bg-[#fafafa]">
                <div className="  h-[80vh] w-[100%] bg-[#FFFFFF] ">
                  <div class=" mx-auto  sm:px-8">
                    <div class="">
                      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                        <div class="inline-block min-w-full shadow-md rounded-lg ">
                          <table class="w-[180rem] leading-normal rounded-sm">
                            <thead className=" bg-[#232E38] rounded-xl">
                              <tr className="">
                                <th class="px-5 py-5 font-[sfpro-medium] bg-[#232E38] rounded-tl-md border-b-2 border-gray-200 text-[#fff] text-center  text-xs font-normal  uppercase tracking-wider">
                                  NO
                                </th>
                                <th class="px-10 py-3  border-b-2 border-gray-200 text-[#fff] font-normal text-xs  text-left  ">
                                  EMP. DETAILS
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 text-[#fff]  text-left  text-xs font-normal  uppercase tracking-wider">
                                  DATE OF JOIN
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 text-[#fff]  text-center text-xs font-normal  uppercase tracking-wider">
                                  TYPE OF EMPLOYEE
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 text-[#fff]  text-center text-xs font-normal  uppercase tracking-wider">
                                  SALARY (LPA)
                                </th>
                                <th class="px-8 py-3 border-b-2 border-gray-200 text-[#fff]  text-center  text-xs font-normal  uppercase tracking-wider">
                                  SALARY PER MONTH
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 text-[#fff]  text-center  text-xs font-normal  uppercase tracking-wider">
                                  MODE OF PAY
                                </th>
                                <th class="px-4 py-3 border-b-2 border-gray-200 text-[#fff]  text-center  text-xs font-normal  uppercase tracking-wider">
                                  PAN NUMBER
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 text-[#fff]  text-center  text-xs font-normal  uppercase tracking-wider">
                                  ESI ELIGIBILE
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 text-[#fff]  text-center  text-xs font-normal  uppercase tracking-wider">
                                  EMP. MAIL ID
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 text-[#fff]  text-center  text-xs font-normal  uppercase tracking-wider">
                                  EMI. NUMBER
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 text-[#fff]  text-center  text-xs font-normal  uppercase tracking-wider">
                                  ACCOUNT No.
                                </th>
                                <th class="px-5 py-3 border-b-2 border-gray-200 text-[#fff]  text-center  text-xs font-normal  uppercase tracking-wider">
                                  IFSC CODE
                                </th>
                                <th class="px-5 py-3  border-gray-200 text-[#fff]  text-center  text-xs font-normal  uppercase tracking-wider">
                                  CONTACT No.
                                </th>
                                <th class="px-5 py-3  border-gray-200 text-[#fff]  text-center text-xs font-normal  uppercase tracking-wider">
                                  ADDRESS
                                </th>
                                <th class="px-5   text-[#fff]  text-center  text-xs font-normal  uppercase tracking-wider">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="26"
                                    height="26"
                                    viewBox="0 0 22 22"
                                  >
                                    <g
                                      id="Group_18258"
                                      data-name="Group 18258"
                                      transform="translate(0 -4)"
                                    >
                                      #0d0d0d
                                      <rect
                                        id="Rectangle_7346"
                                        data-name="Rectangle 7346"
                                        width="22"
                                        className="group-hover:text-[#E90854]"
                                        height="35"
                                        rx="2"
                                        transform="translate(0 4)"
                                        fill="#232E38"
                                        opacity="0.8"
                                      />
                                      <path
                                        id="plus2"
                                        data-name="plus (2)"
                                        d="M10.983,5.2H6.359V.578A.578.578,0,0,0,5.2.578V5.2H.578a.578.578,0,0,0,0,1.156H5.2v4.625a.578.578,0,1,0,1.156,0V6.359h4.625a.578.578,0,1,0,0-1.156Zm0,0"
                                        transform="translate(5.404 9.5)"
                                        fill="#fff"
                                        stroke="#fff"
                                        stroke-width="1"
                                      />
                                    </g>
                                  </svg>
                                </th>
                                <th class="px-5  ">
                                  <img src="../icons/employeeedit.svg" alt=""  className=""/>
                                </th>
                                <th class="bg-[#232E38] px-8 rounded-tr-md">
                                  <img src="../icons/deletewhite.svg" alt="" className="w-3.5" />
                                </th>
                              </tr>
                            </thead>

                            <tbody className="">
                              {dbDataEmpDetails
                                ?.filter((datavalue) =>
                                  datavalue.empName
                                    .toLowerCase()
                                    .includes(
                                      searchEmp == undefined ? "" : searchEmp.toLowerCase()
                                    )
                                )
                                .map((user, index) => {
                                  return (
                                    <tr     onKeyPress={(e) =>
                                      user.empName && user.doj
                                        ? NameKeyPress(e, user.id, index)
                                        : null
                                    }>
                                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm" 
                                    >
                                        <div class="flex" >
                                          <div class="">
                                            <p class="text-gray-900 whitespace-no-wrap">
                                              {index + 1}
                                            </p>
                                          </div>
                                        </div>
                                      </td>
                                      <td class=" py-5 border-b flex flex-col border-gray-200 bg-white text-sm">
                                        <input
                                          maxLength={30}
                                          type="text"
                                          placeholder="Enter the Employee Name"
                                          className="outline-none focus:border-b-2 w-[80%]"
                                          name="empName"
                                          id="addemployee"
                                          value={user.empName}
                                          disabled={user.isEdit}
                                          ref={input1}
                                          onChange={(event) =>
                                            handleChange(event, index)
                                          }
                                        />
                                        <div className="flex ">
                                          <input
                                          maxLength={20}
                                            type="text"
                                            placeholder="Emp ID"
                                            className=" text-center outline-none focus:border-b-2 w-[50%]"
                                            name="empID"
                                            value={user.empID}
                                            disabled={user.isEdit}
                                            onChange={(event) =>
                                              handleChange(event, index)
                                            }
                                          />
                                          <input
                                            type="text"
                                            placeholder="Designation"
                                            className=" text-center outline-none focus:border-b-2"
                                            name="designation"
                                            value={user.designation}
                                            disabled={user.isEdit}
                                            onChange={(event) =>
                                              handleChange(event, index)
                                            }
                                          />
                                        </div>
                                      </td>
                                      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <input
                                          type="date"
                                          name="doj"
                                          id=""
                                          value={user.doj}
                                          disabled={user.isEdit}
                                          onChange={(event) =>
                                            handleChange(event, index)
                                          }
                                        />
                                      </td>
                                      <td class=" py-5 border-b border-gray-200 bg-white text-sm">
                                        <select
                                          className="w-[100%]  text-center  "
                                          name="empType"
                                          id=""
                                          disabled={user.isEdit}
                                          value={user.empType}
                                          onChange={(event) =>
                                            handleChange(event, index)
                                          }
                                        >
                                          <option disabled selected value="">
                                            Select
                                          </option>
                                          {dbDataTypeOfEmp?.map(
                                            (typeOfEmp, index) => {
                                              return (
                                                <option value={typeOfEmp.title}>
                                                  {typeOfEmp.title}
                                                </option>
                                              );
                                            }
                                          )}
                                        </select>
                                      </td>
                                      <td class=" py-5 border-b border-gray-200 bg-white text-sm text-right">
                                        <input
                                          type="text"
                                          placeholder="00 LPA"
                                          className=" text-center outline-none focus:border-b-2"
                                          name="salary"
                                          value={user.salary}
                                          disabled={user.isEdit}
                                          onChange={(event) =>
                                            handleChange(event, index)
                                          }
                                        />
                                      </td>
                                      <td className="border-b  border-gray-200 bg-white text-sm">
                                        <input
                                          type="text"
                                          placeholder="00000.00"
                                          className="  text-center outline-none focus:border-b-2"
                                          name="salaryPerMonth"
                                          value={(user.salary / 12).toFixed(0)}
                                          disabled={user.isEdit}
                                          onChange={(event) =>
                                            handleChange(event, index)
                                          }
                                        />
                                      </td>
                                      <td className="border-b  border-gray-200 bg-white text-sm">
                                        <select
                                          className="w-[90%] text-center outline-none "
                                          name="paymentMode"
                                          id=""
                                          disabled={user.isEdit}
                                          value={user.paymentMode}
                                          onChange={(event) =>
                                            handleChange(event, index)
                                          }
                                        >
                                          <option disabled selected value="">
                                            Select
                                          </option>
                                          {dbDataPaymentMode?.map(
                                            (paymentMode, index) => {
                                              return (
                                                <option
                                                  value={paymentMode.title}
                                                >
                                                  {paymentMode.title
                                                    ? paymentMode.title
                                                    : "Select"}
                                                </option>
                                              );
                                            }
                                          )}
                                        </select>
                                      </td>
                                      <td className="border-b  border-gray-200 bg-white text-sm">
                                        <input
                                          type="text"
                                          placeholder="Enter PAN No"
                                          className="text-center outline-none focus:border-b-2 "
                                          name="panNumber"
                                          value={user.panNumber}
                                          disabled={user.isEdit}
                                          onChange={(event) =>
                                            handleChange(event, index)
                                          }
                                        />
                                      </td>
                                      <td className="border-b  border-gray-200 bg-white text-sm">
                                        <select
                                          className="w-[90%] text-center outline-none"
                                          name="ESI"
                                          id=""
                                          value={user.ESI}
                                          disabled={user.isEdit}
                                          onChange={(event) =>
                                            handleChange(event, index)
                                          }
                                        >
                                          <option value="No">No</option>
                                          <option value="Yes">Yes</option>
                                        </select>
                                      </td>

                                      <td className="border-b  border-gray-200 bg-white text-sm">
                                        <input
                                          type="text"
                                          placeholder="Enter EMP. Mail ID "
                                          className="text-center outline-none focus:border-b-2 "
                                          name="emailID"
                                          value={user.emailID}
                                          disabled={user.isEdit}
                                          onChange={(event) =>
                                            handleChange(event, index)
                                          }
                                        />
                                      </td>

                                      <td className="border-b  border-gray-200 bg-white text-sm">
                                        <input
                                          type="text"
                                          placeholder="Enter EMI.NO"
                                          className="text-center outline-none focus:border-b-2"
                                          name="EMINumber"
                                          value={user.EMINumber}
                                          disabled={user.isEdit}
                                          onChange={(event) =>
                                            handleChange(event, index)
                                          }
                                        />
                                      </td>
                                      <td className="border-b  border-gray-200 bg-white text-sm">
                                        <input
                                          type="text"
                                          placeholder="Enter Account No"
                                          className="text-center outline-none focus:border-b-2"
                                          name="accNumber"
                                          value={user.accNumber}
                                          disabled={user.isEdit}
                                          onChange={(event) =>
                                            handleChange(event, index)
                                          }
                                        />
                                      </td>
                                      <td className="border-b  border-gray-200 bg-white text-sm">
                                        <input
                                          type="text"
                                          placeholder="Enter IFSC Code"
                                          className="text-center outline-none focus:border-b-2"
                                          name="IFSCCode"
                                          value={user.IFSCCode}
                                          disabled={user.isEdit}
                                          onChange={(event) =>
                                            handleChange(event, index)
                                          }
                                        />
                                      </td>

                                      <td className="border-b  border-gray-200 bg-white text-sm">
                                        <input
                                          type="text"
                                          placeholder="Enter Contact No."
                                          className="text-center outline-none focus:border-b-2 "
                                          name="contactNo"
                                          value={user.contactNo}
                                          disabled={user.isEdit}
                                          onChange={(event) =>
                                            handleChange(event, index)
                                          }
                                        />
                                      </td>
                                      <td className="border-b  border-gray-200 bg-white text-sm">
                                        <input
                                          type="text"
                                          placeholder="Enter Address"
                                          className="text-center outline-none focus:border-b-2 "
                                          name="address"
                                          value={user.address}
                                          disabled={user.isEdit}
                                          onChange={(event) =>
                                            handleChange(event, index)
                                          }
                                        />
                                      </td>
                                      <td className="px-5 border-b cursor-pointer  border-gray-200 bg-white text-sm">
                                        <div onClick={handleAddValue}>
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="26"
                                            height="26"
                                            viewBox="0 0 22 22"
                                          >
                                            <g
                                              id="Group_18258"
                                              data-name="Group 18258"
                                              transform="translate(0 -4)"
                                            >
                                              #0d0d0d
                                              <rect
                                                id="Rectangle_7346"
                                                data-name="Rectangle 7346"
                                                width="22"
                                                className="group-hover:text-[#E90854]"
                                                height="35"
                                                rx="2"
                                                transform="translate(0 4)"
                                                fill="#fff"
                                                opacity="0.8"
                                              />
                                              <path
                                                id="plus2"
                                                data-name="plus (2)"
                                                d="M10.983,5.2H6.359V.578A.578.578,0,0,0,5.2.578V5.2H.578a.578.578,0,0,0,0,1.156H5.2v4.625a.578.578,0,1,0,1.156,0V6.359h4.625a.578.578,0,1,0,0-1.156Zm0,0"
                                                transform="translate(5.404 9.5)"
                                                fill="#969696"
                                                stroke="#969696"
                                                stroke-width="1"
                                              />
                                            </g>
                                          </svg>
                                        </div>
                                      </td>
                                      <td className="px-5 border-b border-gray-200 cursor-pointer bg-white text-sm">
                                        {editIconChange &&
                                        indexValue == index ? (
                                          <img
                                            src="../icons/editBlue.svg"
                                            alt=""
                                            className=""
                                            onClick={(event) =>
                                              handleEdit(event, user.id, index)
                                            }
                                          />
                                        ) : (
                                          <img
                                            src="../icons/editgray.svg"
                                            alt=""
                                            onClick={(event) =>
                                              handleEdit(event, user.id, index)
                                            }
                                          />
                                        )}
                                      </td>
                                      <td className="px-5 border-b  cursor-pointer border-gray-200 bg-white text-sm">
                                        <img
                                          src="../icons/employeedelete.svg"
                                          alt=""
                                          className=""
                                          onClick={() => handleDelete(index)}
                                        />
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

             
              </div>
            </div>
          </div>
        </>
      ) : (
        <FieldSetUp
          isEdit={true}
          attendanceEntry={attendanceEntry}
          cancelButton={cancelButton}
          updateButton={handleAddValue}
        />
      )}
    </div>
  );
};
export default Employee;
