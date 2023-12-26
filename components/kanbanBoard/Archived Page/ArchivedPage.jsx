import Createnewprojectpopup from "../createnewpopup/Createnewprojectpopup";
import { useState, useEffect, useContext } from "react";
import { v1 as uuid } from "uuid";
import PouchDB from "pouchdb";
import Router from "next/router";
import GlobalContext from "../Calender/GlobalContext";
import ComProjects from "../overview/Completed";
import Services from "../../../services/kanbanBoard/service";
import Deletepopup from "../createnewpopup/Deletepopup";
import RestorePopup from "../createnewpopup/RestorePopup";
import ArchiveCompleted from "./archivecomp";



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




const ArchivePage = ({ search, showModal, onClose, props,setUseEffectCall, sendvalue, projectUuid, sendCount, sendComCount, selectDate }) => {

  let asddas = new Date(selectDate);
  let month = asddas.getMonth()


  const { setSelectedCardValue, setSelectedCardId } = useContext(GlobalContext)

  const [allData, setAllData] = useState([]);
  const [TodoData, setTodoData] = useState(columnsFromBackend);
  const [pendStatusHistory, SetPendingCard] = useState([])
  const [statusHistory, setCompleted] = useState([])
  const [onUseEffectCallState, setUseEffectState] = useState(0)
  const [pendCount, setpendCount] = useState(0);
  const [todoDb, setToDoDb] = useState();
  const [protitle, setProTitle] = useState("");
  const [dbData, setData] = useState();
  const [showModalPopup, setShowModal] = useState(false)
  const [restoreID, setRestoeId] = useState()
  const [RestoreModal, setShowModalRestore] = useState(false)
  const [DeleteDAta, setDeleteDAta] = useState()
  //finalValue
  const [DeleteData, setDeleteData] = useState()
  const [results, setResults]=useState([])
  const [setModal, setModaltrue]=useState(false)
  // const navigate=useNavigate();
const [comCount,setComCount]=useState(0)
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



  const sendDeleteIdValue = (data) => {
    setDeleteData(data)
   
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

   
  }

  const onUseEffectCallFun=()=>{
    setUseEffectCall()
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

  const handleArchive = (index) => {
    console.log(index);
  }
  const HandleDelete = (data) => {
    setDeleteDAta(data)
    setShowModal(true)


  }

  const HandleRestore = (data) => {
    setShowModalRestore(true)
    setRestoeId(data)
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
    setUseEffectCall()
    setShowModalRestore(false)
    setUseEffectState((preState) => ++preState)
  }

  const callUseEffect = ()=>{
    setUseEffectState((preState) => ++preState)
  }

  const CallUseEffectRestore=()=>{
    setUseEffectState((preState) => ++preState)
  }

  useEffect(() => {

    (async function Change() {
      try {
        await Services.getKanbanBoardArchive();
        await Services.getKanbanBoardArchive();
        const kanbanBoardNewProjectHistory = await Services.getKanbanBoardArchive();
        setData(kanbanBoardNewProjectHistory.data)
        if (kanbanBoardNewProjectHistory.data) {
          const filterKanban = kanbanBoardNewProjectHistory.data.filter((data) => {
            let filterMonth = new Date(data.periodOfTask);
            let month = filterMonth.getMonth()
            let day = filterMonth.getFullYear()
            let myDate = month >= 9 ? day + '-' + (month + 1) : day + '-' + "0" + (month + 1)
            if (selectDate == myDate) {
              return data;
            }
          })
        }
        if (kanbanBoardNewProjectHistory.data) {
          if (selectDate) {
            const filterKanban = kanbanBoardNewProjectHistory.data.filter((data) => {
              let filterMonth = new Date(data.periodOfTask);
              let month = filterMonth.getMonth()
              let day = filterMonth.getFullYear()
              let myDate = month >= 9 ? day + '-' + (month + 1) : day + '-' + "0" + (month + 1)
              if (selectDate == myDate) {
                return data;
              }
            })
            let pendingProjects = [];
            let completedProjects = [];

            filterKanban.map((value) => {
              let isCompletedProject = false;
              let isTaskPresent = false;
              Object.entries(value.taskList).filter(([columnId, column], index) => {

                if (
                  value.taskList[columnId].name == "In Progress" ||
                  value.taskList[columnId].name == "To Do"
                ) {
                  if (value.taskList[columnId].items.length > 0) {
                    if (value.taskList[columnId].name !== "Completed") {
                      let isProjectPresent = pendingProjects.find(project => project.id === value.id);
                      if (!isProjectPresent) pendingProjects.push(value);
                      isTaskPresent = true;
                    }
                  }
                } else if (
                  !isTaskPresent &&
                  value.taskList[columnId].name === 'Completed' &&
                  value.taskList[columnId].items.length
                ) {
                  isCompletedProject = true;
                  isTaskPresent = true;
                } else if (!isTaskPresent) {
                  let isProjectPresent = pendingProjects.find(project => project.id === value.id);
                  if (!isProjectPresent) pendingProjects.push(value);
                  // pendingProjects.push(value);
                }

                if (isCompletedProject) {
                  let isProjectPresent = completedProjects.find(project => project.id === value.id);
                  if (!isProjectPresent) completedProjects.push(value);
                }
              });

              SetPendingCard(pendingProjects);
              setCompleted(completedProjects);

              sendCount(pendingProjects?.length)
              sendComCount(completedProjects?.length)
            });
          } else {

            let pendingProjects = [];
            let completedProjects = [];

            kanbanBoardNewProjectHistory.data.map((value) => {
              let isCompletedProject = false;
              let isTaskPresent = false;
              Object.entries(value.taskList).filter(([columnId, column], index) => {

                if (
                  value.taskList[columnId].name == "In Progress" ||
                  value.taskList[columnId].name == "To Do"
                ) {
                  if (value.taskList[columnId].items.length > 0) {
                    if (value.taskList[columnId].name !== "Completed") {
                      let isProjectPresent = pendingProjects.find(project => project.id === value.id);
                      if (!isProjectPresent) pendingProjects.push(value);
                      isTaskPresent = true;
                    }
                  }
                } else if (
                  !isTaskPresent &&
                  value.taskList[columnId].name === 'Completed' &&
                  value.taskList[columnId].items.length
                ) {
                  isCompletedProject = true;
                  isTaskPresent = true;
                } else if (!isTaskPresent) {
                  let isProjectPresent = pendingProjects.find(project => project.id === value.id);
                  if (!isProjectPresent) pendingProjects.push(value);
                  // pendingProjects.push(value);
                }

                if (isCompletedProject) {
                  let isProjectPresent = completedProjects.find(project => project.id === value.id);
                  if (!isProjectPresent) completedProjects.push(value);
                }
              });
              const filtered = pendingProjects.filter(order => order.projectName.toLowerCase().includes(search) || order.priority.toLowerCase().includes(search) || order.day.toLowerCase().includes(search));
              setResults(filtered)
              SetPendingCard(pendingProjects);
              setCompleted(completedProjects);

              sendCount(pendingProjects?.length)
              setpendCount(pendingProjects?.length)
              setComCount(completedProjects?.length)
              sendComCount(completedProjects?.length)
            });
          }
        }
      } catch (err) {
        alert(JSON.stringify(err))
      }
    })()


  }, [onUseEffectCallState, selectDate, !setModal,search])
  return (
    <>
    <div className="flex flex-col  justify-between">
    <div>
        {
          showModalPopup == true ? (<><Deletepopup DeleteData={DeleteDAta} sendDeleteId={sendDeleteIdValue} setCloseButton={setCloseButton} onUseEffectCall={onUseEffectCallState} /></>) : null
        }

      </div>
      <div>
        {
          RestoreModal == true ? <RestorePopup restoreId={restoreID} setCloseButton={setShowModalRestore} restoreIdData={restoreIdValue}  /> : null
        }

      </div>
      {
        dbData== undefined || dbData.length == 0 ?
          <div className="bg-[#f4f5fa] h-[80vh] w-full flex justify-center items-center ">
            <h1 className="md:text-[20px] font-[sfpro-bold] text-[15px] t ">No Project Found !</h1>
          </div> : <>
            {
              pendStatusHistory.length == 0 ? <></> : <>

                {
                  results?.length>0 ? <div class="flex flex-col scroll-smooth  ">
                 <div className="flex  items-center">
                    <h1
                      class="flex p-2 text-[18px] md:text-[22px] font-[sfpro-medium] ml-3.5 md:ml-8 text-gray-800"
                    >
                      Pending Projects
                    </h1>
                    <div className="md:hidden block">
                    <p className="text-white bg-[#773dfe] text-[12px] font-[sf-pro-medium] justify-center flex rounded-full w-6">
                        {pendCount}
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
                                class="md:w-[420px] w-[350px]  group cursor-pointer flex justify-around items-center text-justify h-[27vh] md:h-64 overflow-hidden rounded-2xl  bg-white  "
                              >

                                <div className="md:h-[31vh] h-[24vh] w-[88%] flex justify-between flex-col py-3 ">
                                  <div className="flex justify-between">
                                    <h1 className=" text-black text-lg font-[sfpro-bold] w-[67%]  ">{data.projectName}</h1>
                                    <div className={`${data.priority == 'Medium' ? 'rounded-full md:w-[28%] w-[20%] h-7 items-center text-[10px] md:text-[15px] flex justify-center font-[sfpro-medium] text-white bg-[#66BB6A]' : data.priority == 'Low' ? 'rounded-full md:w-[28%] w-[20%] h-7 items-center text-[11px] md:text-[15px] flex justify-center font-[sfpro-medium] text-white bg-[#fbbf24]' : "rounded-full md:w-[28%] w-[20%] h-7 items-center text-[11px] md:text-[15px] flex justify-center font-[sfpro-medium] text-white bg-[#EF5350]"}`}>
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


                </div> :   <div className="w-[100%] h-[50vh] flex justify-center items-center">
               <div className=" w-[40%] flex items-center justify-center h-[20vh]">
                   <h3>No results found</h3>
           
               </div>
              
               </div>
                }
              </>
            }
            <div className="">
              <ArchiveCompleted comCount={comCount} statusHistory={statusHistory} dbData={dbData} callUseEffect={callUseEffect} SearchValue={search} CallUseEffectRestore={CallUseEffectRestore}/>
            </div>
          </>
      }

    </div>

      
    </>
  )
}

export default ArchivePage
