import Createnewprojectpopup from "../createnewpopup/Createnewprojectpopup";
import { useState, useEffect, useContext } from "react";
import { v1 as uuid } from "uuid";
import PouchDB from "pouchdb";
import Router from "next/router";
import GlobalContext from "../Calender/GlobalContext";
import Services from "../../../services/kanbanBoard/service";
import Deletepopup from "../createnewpopup/Deletepopup";
import RestorePopup from "../createnewpopup/RestorePopup";



const itemsOfTodo = [

]

const columnsFromBackend = {
  [uuid()]: {
    name: "To Do",
    items: itemsOfTodo
  },
  [uuid()]: {
    name: "Pending",
    items: itemsOfTodo
  },
  [uuid()]: {
    name: "Completed",
    items: itemsOfTodo
  },

}




const ArchiveCompleted = ({statusHistory,comCount,dbData,SearchValue, callUseEffect,CallUseEffectRestore}) => {

  let asddas = new Date();
  let month = asddas.getMonth()


  const { setSelectedCardValue, setSelectedCardId } = useContext(GlobalContext)

  
  const [allData, setAllData] = useState([]);
  const [TodoData, setTodoData] = useState(columnsFromBackend);
  const [pendStatusHistory, SetPendingCard] = useState([])
  // const [statusHistory, setCompleted] = useState([])
  const [onUseEffectCallState, setUseEffectState] = useState(0)
  const [defaultData, setDefaultData] = useState();
  const [todoDb, setToDoDb] = useState();
  const [protitle, setProTitle] = useState("");
  // const [dbData, setData] = useState();
  const [showModalPopup, setShowModal] = useState(false)
  const [RestoreModal, setShowModalRestore] = useState(false)
  const [DeleteDAta, setDeleteDAta] = useState()
  const [restoreID, setRestoeId] = useState()
  //finalValue
  const [DeleteData, setDeleteData] = useState()
  const [results, setResults]=useState([])
  const [setModal, setModaltrue]=useState(false)
  // const navigate=useNavigate();


  const CreateTodoValue = (data) => {
    sendvalue(data)
  }

  const FilterData = (proname) => {

    setSelectedCardId(proname)
    projectUuid(proname)
  }
  const setCloseButton = (data) => {
    setShowModal(data)

  }

  const HandleDelete = (data) => {
    setDeleteDAta(data)
    setShowModal(true)


  }

  const HandleRestore = (data) => {
    setShowModalRestore(true)
    setRestoeId(data)
  }


  const sendDeleteIdValue = (data) => {
   
   
    setModaltrue(true)

    let newTasks=dbData.filter(task=> task.id !== data)

    var db = new PouchDB("KanbanBoardNewProject");
    db.get("kanbanBoardArchive", function (err, doc) {
      if (doc) {
        db.get('kanbanBoardArchive').then(function (doc) {
          return db.put({
            _id: 'kanbanBoardArchive',
            _rev: doc._rev,
            data: newTasks
          });
        }).then(function (response) {
        }).catch(function (err) {
          console.log(err);
        });
      }
      else {
        db.put({
          _id: 'kanbanBoardArchive',
          data: newTasks
        }).then(function (response) {
          // handle response
        }).catch(function (err) {
          console.log(err);
        });
      }
    })
    setShowModal(false)
    setUseEffectState((preState) => ++preState)
    callUseEffect()
  }


  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let now = new Date();
  let todayDate = now.getDate();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  let thisMonth = months[now.getMonth()]
  var ampm = hour >= 12 ? '   PM' : 'AM';
  hour = hour < 10 ? "0" + hour : hour
  minutes = minutes < 10 ? "0" + minutes : minutes


  const onUseEffectCall = (data) => {
    setUseEffectState((preState) => ++preState)
  }


  const restoreIdValue = (data) => {
    let filterArray = []
      let archiveArray = []
    const filterKanban = dbData.filter((datas) => {
  
      if (datas.id == data) {
        var db = new PouchDB("KanbanBoardNewProject");
        db.get("kanbanBoardNewProjectHistory", function (err, doc) {
          if (doc) {
            archiveArray = doc.data
            archiveArray.push(datas)
            db.get('kanbanBoardNewProjectHistory').then(function (doc) {
              return db.put({
                _id: 'kanbanBoardNewProjectHistory',
                _rev: doc._rev,
                data: archiveArray
              });
            }).then(function (response) {
            }).catch(function (err) {
              console.log(err);
            });
          } else {
            archiveArray.push(datas)
            db.put({
              _id: 'kanbanBoardNewProjectHistory',
              data: archiveArray
            }).then(function (response) {
              // handle response
            }).catch(function (err) {
              console.log(err);
            });
          }
        })
      }
      else {
        var db = new PouchDB("KanbanBoardNewProject");
        db.get("kanbanBoardArchive", function (err, doc) {
          if (doc) {
            filterArray.push(datas)
            db.get('kanbanBoardArchive').then(function (doc) {
              return db.put({
                _id: 'kanbanBoardArchive',
                _rev: doc._rev,
                data: filterArray
              });
            }).then(function (response) {
            }).catch(function (err) {
              console.log(err);
            });
          }
          else {
            db.put({
              _id: 'kanbanBoardArchive',
              data: filterArray
            }).then(function (response) {
              // handle response
            }).catch(function (err) {
              console.log(err);
            });
          }
        })
      }
      if (dbData.length == 1) {
        var db = new PouchDB("KanbanBoardNewProject");
        db.get("kanbanBoardArchive", function (err, doc) {
          if (doc) {
            db.get('kanbanBoardArchive').then(function (doc) {
              return db.remove({
                _id: 'kanbanBoardArchive',
                _rev: doc._rev,
              });
            }).then(function (response) {
            }).catch(function (err) {
              console.log(err);
            });
          }
          else {
            db.put({
              _id: 'kanbanBoardArchive',
              data: undefined
            }).then(function (response) {
              // handle response
            }).catch(function (err) {
              console.log(err);
            });
          }
        })
      }

    })

    setShowModalRestore(false)
    setUseEffectState((preState) => ++preState)
    CallUseEffectRestore()
  }
  
  useEffect(()=>{
    const filtered = statusHistory.filter(order => order.projectName.toLowerCase().includes(SearchValue)||  order.priority.toLowerCase().includes(SearchValue) || order.day.toLowerCase().includes(SearchValue));
    setResults(filtered)
  },[statusHistory])
  return (
    <>

   
<div>
        {
          showModalPopup == true ? (<><Deletepopup DeleteData={DeleteDAta} sendDeleteId={sendDeleteIdValue} setCloseButton={setCloseButton} onUseEffectCall={onUseEffectCallState} /></>) : null
        }

      </div>
      <div>
        {
          RestoreModal == true ? <RestorePopup restoreId={restoreID} setCloseButton={setShowModalRestore} restoreIdData={restoreIdValue} onUseEffectCall={onUseEffectCallState} /> : null
        }

      </div>
      
        
           <>
            {
              statusHistory.length == 0 ? <></> : <>

               {
                results?.length >0 ?  <div class="flex flex-col scroll-smooth ">
               <div className="flex  items-center">
              <h1
                class="flex p-2 font-thin text-[18px] md:text-[22px] font-[sfpro-medium] ml-3.5 md:ml-6 text-gray-800"
              >
                Completed Projects
              </h1>
              <div className="md:hidden block">
                    <p className="text-white bg-[#773dfe] text-[12px] font-[sf-pro-medium] justify-center flex rounded-full w-6">
                        {comCount}
                      </p>
                    </div>
              </div>
                <div className="w-full flex items-center justify-around">
                  <div
                    class="flex overflow-x-scroll scroll-smooth kanbanContentscroll py-2 w-[90%] md:w-[94%]">
                    <div
                      class="flex flex-nowrap mb-[5px]">
                      <div class="flex gap-6 flex-row-reverse ">
                        {results?.map((data, index) => {
                          return (
                            <div key={index}
                              class="md:w-[420px] w-[350px] group cursor-pointer flex justify-around items-center text-justify h-[27vh] md:h-64 overflow-hidden rounded-2xl  bg-white  "
                            >

                              <div className="md:h-[31vh] h-[24vh] w-[88%] flex justify-between flex-col py-3 ">
                                <div className="flex justify-between">
                                  <h1 className=" text-black text-lg font-[sfpro-bold] w-[67%]  ">{data.projectName}</h1>
                                  <div className={`${data.priority == 'Medium' ? 'rounded-full  h-7 items-center md:w-[28%] w-[20%] text-[11px] md:text-[15px] flex justify-center font-[sfpro-medium] text-white bg-[#66BB6A]' : data.priority == 'Low' ? 'rounded-full  h-7 items-center md:w-[28%] w-[20%] text-[11px] md:text-[15px] flex justify-center font-[sfpro-medium] text-white bg-[#fbbf24]' : "rounded-full md:w-[28%] w-[20%] text-[11px] md:text-[15px] h-7 items-center text-[15px] flex justify-center font-[sfpro-medium] text-white bg-[#EF5350]"}`}>
                                    <p>{data.priority}</p>
                                  </div>
                                </div >
                                <div className="text-justify text-sm opacity-70 overflow-y-scroll scrollBar font-[sfpro-regular] h-[12vh] md:h-[15vh] w-[100%] text-black">
                                  <p className="w-full">{data.description}</p>
                                </div>
                                <div className="flex flex-row justify-between items-center w-full">
                                  <div className="flex items-center ">
                                    <img src="../icons/Calendar.svg" alt="" />
                                    <p className="font-[sfpro-medium] opacity-[0.4] text-[13px] md:text-[16px]">{data.day}</p>
                                  </div>
                                  <div className="flex items-center md:invisible md:group-hover:visible" onClick={() => HandleDelete(data.id)}>
                                    <svg
                                      id="deleteButton"
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="MuiSvgIcon-root text-[#999999] h-[25px] group-hover:block hover:text-[#e10918] cursor-pointer"
                                      focusable="false"
                                      viewBox="0 0 24 24"
                                      aria-hidden="true"
                                    >
                                      <path
                                        d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                                        fill="currentColor"
                                      ></path>
                                    </svg>

                                  </div>
                                  <div className="md:invisible md:group-hover:visible" onClick={() => HandleRestore(data.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                                    </svg>
                                  </div>
                                </div>
                              </div >
                            </div>

                          )
                        })}

                      </div>

                    </div>
                  </div>
                </div>


              </div> : <div className="w-[100%] h-[50vh] flex justify-center items-center">
               <div className=" w-[40%] flex items-center justify-center h-[20vh]">
                   <h3>No results found</h3>
           
               </div>
              
               </div>
               }
              </>
            }
          </>
      
    </>
  )
}

export default ArchiveCompleted
