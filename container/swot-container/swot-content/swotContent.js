import { useEffect, useState } from "react";
import MyButton from "../../../components/swot-components/my-button/myButton";
import MyInput from "../../../components/swot-components/my-input/myInput";
import DefaultLayout from "../../../components/swot-components/swot-layout/layout";
import SwotSidebar from "../swot-sidebar/swotSidebar";
import PdfProvider from "../../../components/swot-components/swot-pdfProvider/swotPdfProvider";
import PdfContent from "../../../components/swot-components/pdf-content/pdfContent";
import { PDFViewer } from "@react-pdf/renderer";
import { useRouter } from "next/router";
import SwotAddListPopUp from "../../../components/swot-components/swot-addlist/SwotAddList";
import SwotDeletePopUp from "../../../components/swot-components/swot-deletePopup/SwotDelete";
import MyImage from "../../../components/swot-components/my-image/myImage";
import SwotListDelete from "../../../components/swot-components/swotListDelete/SwotListDelete";
import { Dialog, useForkRef } from "@mui/material";
import PouchDB from "pouchdb";
import Service from "../../../services/swotanalysis/service";

export default function SwotContent({
  getSwotData,
  swotUser,
  updateData,
  isUpdate,
  userid,
  sideBarRender,
  CloseSideBar
}) {
  const router = useRouter();
  // const [allUsers, setAllUsers] = useState([]);
  const [fullWidth] = useState(false);
  const [maxWidth] = useState("xl");
  const [isNewSwot, setIsNewSwot] = useState(false);
  const [callUseEffect, setCallUseEffect] = useState(0);
  const [isListDelete, setIsListDelete] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [localStore, setLocalStore] = useState(false);
  const [swotTitleEdit, setSwotTitleEdit] = useState(false);
  const [pdftrue, setPdftrue] = useState(false);
  const [update, setUpadte] = useState(false);
  const [deleteState, setDeleteState] = useState();
  const [updateId, setUpadteId] = useState();
  const [swotData, setSwotData] = useState({
    swotTitle: "",
    Strength: [
      {
        name: "",
        points: 0,
        defaultPoints: 10,
      },
    ],
    Weakness: [
      {
        name: "",
        points: 0,
        defaultPoints: 10,
      },
    ],
    Opportunities: [
      {
        name: "",
        points: 0,
        defaultPoints: 10,
      },
    ],
    Threats: [
      {
        name: "",
        points: 0,
        defaultPoints: 10,
      },
    ],
  });

  const [isActivated, setActivated] = useState(false);
  const [user, setUser] = useState();

  const addField = (data) => {

    const newData = { ...swotData };
    let obj = {
      name: "",
      points: 0,
      defaultPoints: 10,
    };
    // if (
    //   swotData[data][swotData[data]?.length - 1]?.name == "" &&
    //   swotData[data][swotData[data]?.length - 1]?.points == ""
    // ) {
      swotData[data].push(obj);
    
    // swotData[data].push(obj);
    setSwotData(newData);

    // setCallUseEffect((preState) => preState + 1);
    // setActivated(true);
  };

  useEffect(()=>{
    //  Object.keys(swotData).map(key=>{
    //     let array = [...swotData[key]]
    //     if(array.length>0){
    //       let filteredArray = array.filter(data=>data.name?.length>0)
    //       console.log(swotData,"filterrrrrrrrrrr");
    //       if (filteredArray.length==0) {
    //         setPdftrue(false)
    //       }else{
    //         setPdftrue(true)
    //       }
    //       //  if (!filteredArray.length==0) return setPdftrue(true)
         
       
         
    //     }
    //   })

      const resultData = swotData.Opportunities.filter((user)=>user.name!=="");
      const  StrengthData=swotData.Strength.filter((user)=>user.name!=="");
      const  ThreatsData=swotData.Threats.filter((user)=>user.name!=="");
      const  WeaknessData=swotData.Weakness.filter((user)=>user.name!=="");
      if (resultData.length==0 && StrengthData.length==0 && ThreatsData.length==0 && WeaknessData.length==0 ){
        setPdftrue(false)
        }else {
         setPdftrue(true)
        
        } 
      
  },[isActivated,swotData])


  const addData = (data) => {
    const newData = { ...swotData };
    newData[data.title][data.id][data.fieldName] = data.dataValue;
    const allUser = [];
    const getUsers = JSON.parse(localStorage.getItem("swotUsers"));
    // if (update) {
    //   const getUsers = JSON.parse(localStorage.getItem("swotUsers"));
    //   getUsers.splice(updateId, 1, newData);
    //   localStorage.setItem("swotUsers", JSON.stringify(getUsers));
    //   setSwotTitleEdit(false);
    //   setActivated(true);
    // } else {
    //   if (getUsers) {
    //     const getUsers = JSON.parse(localStorage.getItem("swotUsers"));
    //     getUsers.splice(getUsers.length - 1, 1, newData);
    //     localStorage.setItem("swotUsers", JSON.stringify(getUsers));
    //   } else {
    //     allUser.push(newData);
    //     localStorage.setItem("swotUsers", JSON.stringify(allUser));
    //   }
    // }

    var db = new PouchDB("swotAnalysis");
    db.get("swotHistory", function (err, doc) {
      if (err) {
        allUser.push(newData);
        var doc = {
          _id: "swotHistory",
          data: allUser,
        };
        db.put(doc);
        doc == undefined ||doc == null ||doc.data?.length == 0  ? setLocalStore(true): setLocalStore(false)
      }
      if (update) {
        doc.data.splice(updateId, 1, newData);
        setSwotTitleEdit(false);
      } else {
        doc.data.splice(doc.data.length - 1, 1, newData);
        doc == undefined ||doc == null ||doc.data?.length == 0 ? setLocalStore(true): setLocalStore(false)
      }
      db.put(
        {
          _id: doc._id,
          data: doc.data,
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
    setSwotData(newData);
    setActivated(true);
  };

  const editSwotTitle = () => {
    setSwotTitleEdit(true);
  };
  const deleteField = (id, title) => {
    // const newData = { ...swotData };
    // newData[title].splice(id, 1);

    setIsDelete(true);
    const obj = {
      deleteId: id,
      deleteTitle: title,
    };
    setDeleteState(obj);
    // setSwotData(newData);
    // setActivated(true);
  };
  const swotNewList = (data) => {
    const newData = { ...swotData };
    newData[data.deleteTitle].splice(data.deleteId, 1);
    setSwotData(newData);
    setIsDelete(false);
    setCallUseEffect((preState) => preState + 1);
    setActivated(true);
  };
  const closepopUpDelete = (data) => {
    setIsDelete(data);
  };
  const keyPressSwotTitle = (e) => {
    const { name, value } = e.target;
    const newData = { ...swotData };
    newData[name] = value;
    setSwotData({ ...swotData, [name]: value });
    setActivated(true);
    const allUser = [];

    if (e.key === "Enter") {
      (async function serviceCall() {
        const swotHistory = await Service.swotHistory();
        await Service.swotActiveData();
        const swotActive = await Service.swotActiveData();
        const getUsers = JSON.parse(localStorage.getItem("swotUsers"));
        // if (update) {
        //   const getUsers = JSON.parse(localStorage.getItem("swotUsers"));
        //   getUsers.splice(updateId, 1, getUser);
        //   localStorage.setItem("swotUsers", JSON.stringify(getUsers));
        //   setSwotTitleEdit(false);
        //   setActivated(true);
        // } else {
        //   if (getUsers) {
        //     const getUsers = JSON.parse(localStorage.getItem("swotUsers"));
        //     getUsers.splice(getUsers.length - 1, 1, newData);
        //     localStorage.setItem("swotUsers", JSON.stringify(getUsers));
        //   } else {
        //     allUser.push(newData);
        //     localStorage.setItem("swotUsers", JSON.stringify(allUser));
        //   }
        // }

        var db = new PouchDB("swotAnalysis");
        db.get("swotHistory", function (err, doc) {
          if (err) {
            allUser.push(newData);
            var doct = {
              _id: "swotHistory",
              data: allUser,
            };
            db.put(doct);

            // setLocalStore(doct)
          }

          if (update) {
            // const getUsers = JSON.parse(localStorage.getItem("swotUsers"));
            const getUser = JSON.parse(localStorage.getItem("swot"));
            // console.log(swotActive, "updateee");
            doc.data.splice(updateId, 1, swotActive.data.swotData);
            setSwotTitleEdit(false);
            setActivated(true);
          } else {
            doc.data.splice(doc.data.length - 1, 1, newData);
          }
          // setLocalStore(doc.data)
          db.put(
            {
              _id: doc._id,
              data: doc.data,
              _rev: doc._rev,
            },
            function (err, response) {
              if (err) {
                return console.log(err, "err");
              } else {
                console.log(response, "ress");
              }
              setActivated(true);
            }
          );
        });
        // await Service.swotHistory()
      })();
    }
  };
  const handleHeading = (e) => {
    const { name, value } = e.target;
    setSwotData({ ...swotData, [name]: value });
    setActivated(true);
  };

  const addList = () => {
    const allUser = [];
    const getUsers = JSON.parse(localStorage.getItem("swotUsers"));
    if (getUsers) {
      if (swotUser) {
        getUsers.map((elem, i) => {
          allUser.push(elem);
        });
        allUser.push(swotUser);
        localStorage.setItem("swotUsers", JSON.stringify(allUser));
      }
    } else {
      if (swotUser) {
        allUser.push(swotUser);
        localStorage.setItem("swotUsers", JSON.stringify(allUser));
      }
    }
    setSwotTitleEdit(false);
    setActivated(true);
    setSwotData({ ...swotData, swotTitle: "" });
  };

  const addNewSwot = () => {
    // localStorage.removeItem("swot");
    setSwotData({
      // swotTitle: "",
      Strength: [
        {
          name: "",
          points: 0,
          defaultPoints: 10,
        },
      ],
      Weakness: [
        {
          name: "",
          points: 0,
          defaultPoints: 10,
        },
      ],
      Opportunities: [
        {
          name: "",
          points: 0,
          defaultPoints: 10,
        },
      ],
      Threats: [
        {
          name: "",
          points: 0,
          defaultPoints: 10,
        },
      ],
    });
    setUpadte(false);
    setActivated(true);
    setIsNewSwot(true);
  };

  const handleSaveBtn=(e)=>{
    
    const { name, value } = e.target;
    const newData = { ...swotData };
    newData[name] = value;
    const allUser = [];
    // const getUsers = JSON.parse(localStorage.getItem("swotUsers"));
    // if (getUsers) {
    //   getUsers.map((elem, i) => {
    //     allUser.push(elem);
    //   });
    //   allUser.push(newData);
    //   localStorage.setItem("swotUsers", JSON.stringify(allUser));
    // } else {
    //   allUser.push(newData);
    //   localStorage.setItem("swotUsers", JSON.stringify(allUser));
    // }

    var db = new PouchDB("swotAnalysis");
    db.get("swotHistory", function (err, doc) {
      if (err) {
        allUser.push(newData);
        var doc = {
          _id: "swotHistory",
          data: allUser,
        };
        db.put(doc);
        doc == undefined ||doc == null ||doc.data?.length == 0  ? setLocalStore(true): setLocalStore(false)
      }
      if (doc) {
        doc.data.map((elem, i) => {
          allUser.push(elem);
        });
        allUser.push(newData);
        newData == undefined ||newData == null ||newData.data?.length == 0  ? setLocalStore(true): setLocalStore(false)
      }
      db.put(
        {
          _id: doc._id,
          data: allUser,
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
    setSwotData(newData);
    setActivated(true);
  }
  const handleKeyPress = (e) => {
  
    const { name, value } = e.target;
    const newData = { ...swotData };
    if (value) {
      if (e.key === "Enter" ) {
        newData[name] = value;
        const allUser = [];
        // const getUsers = JSON.parse(localStorage.getItem("swotUsers"));
        // if (getUsers) {
        //   getUsers.map((elem, i) => {
        //     allUser.push(elem);
        //   });
        //   allUser.push(newData);
        //   localStorage.setItem("swotUsers", JSON.stringify(allUser));
        // } else {
        //   allUser.push(newData);
        //   localStorage.setItem("swotUsers", JSON.stringify(allUser));
        // }

        var db = new PouchDB("swotAnalysis");
        db.get("swotHistory", function (err, doc) {
          if (err) {
            allUser.push(newData);
            var doc = {
              _id: "swotHistory",
              data: allUser,
            };
            db.put(doc);
            doc == undefined ||doc == null ||doc.data?.length == 0  ? setLocalStore(true): setLocalStore(false)
          }
          if (doc) {
            doc.data.map((elem, i) => {
              allUser.push(elem);
            });
            allUser.push(newData);
            newData == undefined ||newData == null ||newData.data?.length == 0  ? setLocalStore(true): setLocalStore(false)
          }
          db.put(
            {
              _id: doc._id,
              data: allUser,
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
        setSwotData(newData);
        setActivated(true);
      }
    }
  };
  const addTitle = (data, istrue) => {
    const newData = { ...swotData };
    newData[data.swotName] = data.swotValue;
    setSwotData({ ...swotData, [data.swotName]: data.swotValue });
    setIsNewSwot(istrue);
    setActivated(true);

    const allUser = [];
    const getUsers = JSON.parse(localStorage.getItem("swotUsers"));
    // if (getUsers) {
    //   getUsers.map((elem, i) => {
    //     allUser.push(elem);
    //   });
    //   allUser.push(newData);
    //   localStorage.setItem("swotUsers", JSON.stringify(allUser));
    // } else {
    //   allUser.push(newData);
    //   localStorage.setItem("swotUsers", JSON.stringify(allUser));
    // }
    var db = new PouchDB("swotAnalysis");
    db.get("swotHistory", function (err, doc) {
      if (err) {
        allUser.push(newData);
        var doc = {
          _id: "swotHistory",
          data: allUser,
        };
        db.put(doc);
        doc == undefined ||doc == null || doc.data?.length == 0 ? setLocalStore(true): setLocalStore(false)
      }
      if (doc) {
        doc.data.map((elem, i) => {
          allUser.push(elem);
        });
        allUser.push(newData);
        newData == undefined ||newData == null || newData.data?.length == 0 ? setLocalStore(true): setLocalStore(false)
      }
      db.put(
        {
          _id: doc._id,
          data: allUser,
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
  const closeAddSwotPopUp = (data) => {
    setIsNewSwot(data);
  };

  const listDeleteClick = () => {
    setIsListDelete(true);
  };

  const listDeleteId = (data) => {
    var db = new PouchDB("swotAnalysis");
    (async function serviceCall() {
      await Service.swotHistory();
      const swotHistory = await Service.swotHistory();
      // const usersData = JSON.parse(localStorage.getItem("swotUsers"));
      if (data || data == 0) {
        // usersData.splice(data, 1);
        swotHistory.data.splice(data, 1);
      } else {
        // usersData?.splice(usersData?.length - 1, 1);
        swotHistory?.data.splice(swotHistory?.data?.length - 1, 1);
      }
      // localStorage.setItem("swotUsers", JSON.stringify(usersData));
      db.get("swotHistory", function (err, doc) {
        if (err) {
          var doc = {
            _id: "swotHistory",
            data: swotHistory.data,
          };
          db.put(doc);
        }
        db.put(
          {
            _id: doc._id,
            data: swotHistory.data,
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
      setIsListDelete(false);
      // setActivated(false);
      setSwotData({
        swotTitle: "",
        Strength: [
          {
            name: "",
            points: 0,
            defaultPoints: 10,
          },
        ],
        Weakness: [
          {
            name: "",
            points: 0,
            defaultPoints: 10,
          },
        ],
        Opportunities: [
          {
            name: "",
            points: 0,
            defaultPoints: 10,
          },
        ],
        Threats: [
          {
            name: "",
            points: 0,
            defaultPoints: 10,
          },
        ],
      });
      await Service.swotHistory();
      if (!swotHistory?.data.length == 0) {
        let swotData = swotHistory?.data[swotHistory?.data?.length - 1];
        // localStorage.setItem(
        //   "swot",
        //   JSON.stringify(usersData[usersData?.length - 1])

        // );
        db.get("swotActiveData", function (err, doc) {
          if (err) {
            var doc = {
              _id: "swotActiveData",
              data: { swotData },
            };
            db.put(doc);
          }
          db.put(
            {
              _id: doc._id,
              data: { ...doc.data, swotData,data: null, update: false },
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
        setActivated(false);
      } else {
        setActivated(true);
      }
      setCallUseEffect((preState) => preState + 1);
      // setUpadteId("");
    })();
  };

  const deleteList = (data) => {
    setIsListDelete(data);
  };
  useEffect(() => {
    const usersData = JSON.parse(localStorage.getItem("swotUsers"));
    (async function serviceCall() {
      await Service.swotHistory();
      await Service.swotHistory();
      await Service.swotHistory();
      const swotHistory = await Service.swotHistory();

      swotHistory.data == undefined ||swotHistory.data == null ||swotHistory.data?.length == 0 ? setLocalStore(true): setLocalStore(false)
        
        
     
     
      getSwotData();
    })();

    
    if (isActivated) {
       let swotValue=swotData.Opportunities.filter((item)=>item.name!=="")
      // localStorage.setItem("swot", JSON.stringify(swotData));
      // Object.keys(swotData).map(key=>{
      //   let array = [...swotData[key]]
      //   if(array.length>0){
      //     let filteredArray = array.filter(data=>data.name.length>0)
      //     swotData[key] = filteredArray
      //   }
      // })
      // console.log(swotData,"ddddddd2222d");
      var db = new PouchDB("swotAnalysis");
      db.get("swotActiveData", function (err, doc) {
        if (err) {
          var doc = {
            _id: "swotActiveData",
            data: { swotData},
          };
          db.put(doc);
        }
        db.put(
          {
            _id: doc._id,
            data: { ...doc.data, swotData },
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
      setActivated(false);
    }

    
  }, [isActivated, swotData]);
















  useEffect(()=>{
    setActivated(true);
  },[])
  useEffect(() => {
    (async function serviceCall() {
      await Service.swotHistory();
      const swotactive = await Service.swotActiveData();
      try {
        // const getSwot = JSON.parse(localStorage.getItem("swot"));
        if (swotactive.data) {
          setSwotData(swotactive.data.swotData);
          getSwotData(swotUser);
          setUpadte(swotactive.data.update);
          setUpadteId(swotactive.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [updateData, callUseEffect]);
  return (
    <>
      {isListDelete ? (
        <SwotListDelete
          deleteId={updateId}
          closeListDelete={deleteList}
          listDelete={listDeleteId}
        />
      ) : null}
      {isDelete ? (
        <SwotDeletePopUp
          etePopUp
          datas={swotData}
          deleteField={deleteState}
          newSwot={swotNewList}
          closeDeletePopup={closepopUpDelete}
        />
      ) : null}
        
         {isNewSwot ? (
           <SwotAddListPopUp title={addTitle} action={closeAddSwotPopUp} />
      ) : null}
        
     
      <div className="h-[95vh] w-[100%] min-h-[95vh] bg-[#F5F5F5]/100 "   >
        {localStore ? (
            <div className='bg-[#000000] h-screen flex justify-around items-start  z-50 absolute inset-0 bg-opacity-[0.5]'> 
           <div
          className='mx-auto md:w-[80%] w-[84%] border-2 rounded-lg mt-10 '> 
           <div className="flex justify-between items-center w-[100%] md:p-3 p-1.5  bg-[#EF5350] rounded-md">
              <div className="flex items-center justify-between w-[100%] lg:w-[60%] md:w-[53%] ">
                <div className="flex items-center justify-around md:justify-between w-[100%] lg:w-[60%] rounded-md bg-white md:w-[50%]">
                  {/* <MyImage
                  width="25px"
                  height="20px"
                  src="/icons/Icon-list-box.svg"
                  onClick={editSwotTitle}
                  className="hover:cursor-pointer"
                /> */}

                  <MyInput
                    type="text"
                    name="swotTitle"
                    id="swotinput"
                    placeholder="Enter title to get started"
                    value={swotData.swotTitle}
                    onChange={handleHeading}
                    onKeyPress={(event) => handleKeyPress(event)}
                    className=" h-[40px] md:h-[30px] outline-none rounded-md w-[70%] lg:w-[100%]  md:w-[75%] focus:outline-none pl-3 font-[sfpro-medium]"
                  />
                  <div onClick={(event) =>{swotData.swotTitle? handleSaveBtn(event) : ""} } className={`md:hidden p-1 px-2  text-white rounded-md ${swotData.swotTitle&& "bg-[#EF5350]"}`}>
                    Save
                  </div>
                </div>
              </div>
              <div className="xl:flex items-center justify-end space-x-2 w-[48%]   md:w-[24%] hidden md:hidden lg:hidden ">
                <div className="flex w-[35%] justify-end space-x-2 group">
                  <div className=" w-[55%] h-[20px] rounded-md my-auto bg-white/10 text-white hidden">
                    <p className="text-[9px] top-1 relative flex justify-center items-center">
                      Add New
                    </p>
                  </div>
                  <div
                    className="bg-white w-[30%] flex justify-center items-center h-[30px] rounded-md cursor-not-allowed opacity-50"
                    // onClick={addNewSwot}
                  >
                    <MyImage
                      width="25px"
                      height="25px"
                      src="/icons/AddSwot.svg"
                      className="hover:cursor-pointer"
                    />
                  </div>
                </div>
                <PdfProvider
                  ButtonComponent={(props) => (
                    <div
                      // onClick={props.onClick}
                      className="bg-white w-[10%] flex justify-center items-center h-[30px] rounded-md cursor-not-allowed opacity-50"
                    >
                      <MyImage
                        width="25px"
                        height="25px"
                        src="/icons/Export.svg"
                        className="hover:cursor-pointer"
                      />
                    </div>
                  )}
                  disabled={swotData.swotTitle? false : true}
                  pdfDocument={
                    swotData.swotTitle ? <PdfContent datas={swotData} /> : <></>
                  }
                ></PdfProvider>
                <div
                  className="bg-white w-[10%] flex justify-center items-center h-[30px] rounded-md cursor-not-allowed opacity-50"
                  // onClick={listDeleteClick}
                >
                  <MyImage
                    width="25px"
                    height="25px"
                    src="/icons/deleteRed.svg"
                    
                    className="hover:cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>
           
        </div>
        ) : (
          <div className="flex justify-between items-center w-[100%] p-3 bg-[#EF5350]" onClick={CloseSideBar}>
            <div className="flex items-center justify-between w-[53%]">
              <div className="flex items-center md:w-[35%] w-[100%] rounded-md bg-white">
                {/* <MyImage
                width="25px"
                height="20px"
                src="/icons/Icon-list-box.svg"
                onClick={editSwotTitle}
                className="hover:cursor-pointer"
              /> */}

                <MyInput
                  // readOnly={update ? false : true}
                  type="text"
                  name="swotTitle"
                  placeholder="Select a list.."
                  maxText="20"
                  value={swotData.swotTitle}
                  onChange={handleHeading}
                  onKeyPress={keyPressSwotTitle}
                  className="h-[30px] outline-none rounded-md w-[85%] bg-transparent focus:outline-none pl-3 font-[sfpro-medium]"
                />
                {update && (
                  <div className="cursor-pointer flex items-center"> 

                 <MyImage
                    width="14px"
                    height="22px"
                    src="/icons/swotedit.svg"
                    className="cursor-pointer "
                  />
                  </div>
                 
                )}
              </div>
              <div className=" md:block hidden w-[30%] xl:flex justify-between"></div>
            </div>
            <div className="flex items-center justify-end space-x-2 w-[64%] xl:w-[24%] lg:w-[37%] md:w-[50%]">
              <div className="flex w-[55%] md:w-[35%] justify-end space-x-2 group">
                <div className=" w-[55%] h-[20px] rounded-md my-auto bg-white/10 text-white hidden group-hover:block">
                  <p className="text-[9px] top-1 relative flex justify-center items-center">
                    Add New
                  </p>
                </div>
                <div
                  className="bg-white w-[30%] flex justify-center items-center h-[30px] rounded-md cursor-pointer"
                  onClick={addNewSwot}
                >
                  <MyImage
                    width="25px"
                    height="25px"
                    src="/icons/AddSwot.svg"
                    className="hover:cursor-pointer"
                  />
                </div>
              </div>
              <PdfProvider
                ButtonComponent={(props) => (
                  <div
                    onClick={props.onClick}
                    className="bg-white w-[17%] md:w-[10%] flex justify-center items-center h-[30px] rounded-md cursor-pointer"
                  >
                    <MyImage
                      width="25px"
                      height="25px"
                      src="/icons/Export.svg"
                      className="hover:cursor-pointer"
                    />
                  </div>
                )}
                
                disabled={pdftrue ? false : true}
                pdfDocument={
                  swotData.swotTitle ? <PdfContent datas={swotData} /> : <></>
                }
              ></PdfProvider>
              <div

                className="bg-white w-[17%] md:w-[10%] flex justify-center items-center h-[30px] rounded-md cursor-pointer"
                id='deleteone'
                onClick={listDeleteClick}
              >
                <MyImage
                  width="25px"
                  height="25px"
                  src="/icons/deleteRed.svg"
                  className="hover:cursor-pointer"
                />
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-wrap mt-6 z-50 justify-center overflow-scroll scrollBar h-[85%]"  onClick={CloseSideBar}>
          <DefaultLayout
            data={swotData}
            styles="bg-[#35BC2C]"
            title="Strength"
            addField={addField}
            addData={addData}
            imageSrc="/icons/swotStrength.svg"
            deleteField={deleteField}
          />
          <DefaultLayout
            data={swotData}
            styles="bg-[#FF7043]"
            title="Weakness"
            addField={addField}
            addData={addData}
            deleteField={deleteField}
            imageSrc="/icons/swotWeakness.svg"
          />
          <DefaultLayout
            data={swotData}
            styles="bg-[#29B6F6]"
            title="Opportunities"
            addField={addField}
            addData={addData}
            deleteField={deleteField}
            imageSrc="/icons/swotopportunities.svg"
          />
          <DefaultLayout
            data={swotData}
            styles="bg-[#F52824]"
            title="Threats"
            addField={addField}
            addData={addData}
            deleteField={deleteField}
            imageSrc="/icons/swotthreat.svg"
          />
        </div>
      </div>
      {/* {swotData.swotTitle === "" ? null :  <PDFViewer height={"800px"} width={"850px"} showToolbar={true}>
            <PdfContent datas={swotData}/>
          </PDFViewer> } */}
    </>
  );
}
