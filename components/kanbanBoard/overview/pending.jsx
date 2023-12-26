import Createnewprojectpopup from "../createnewpopup/Createnewprojectpopup";
import { useState, useEffect, useContext } from "react";
import ComProjects from "./Completed";
import { v1 as uuid } from "uuid";
import PouchDB from "pouchdb";
import Router from "next/router";
import GlobalContext from "../Calender/GlobalContext";
import Archivedpopup from "../createnewpopup/Archivedpopup";
import Services from "../../../services/kanbanBoard/service";



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




const PenProjects = ({ getSearchChange, search, SearchValueDataValue, closeSidebar, showModal, onClose, props, sendvalue, projectUuid, sendCount, sendComCount, selectDate }) => {


  let asddas = new Date(selectDate);
  let month = asddas.getMonth()


  const { setSelectedCardValue, setSelectedCardId } = useContext(GlobalContext)

  const [allData, setAllData] = useState([]);
  const [isArchive, setIsArchive] = useState(false)
  const [archiveId, setArchiveId] = useState()
  const [TodoData, setTodoData] = useState(columnsFromBackend);
  const [pendStatusHistory, SetPendingCard] = useState([])
  const [ComCountStatus, sendComCountStatus] = useState(0)
  const [statusHistory, setCompleted] = useState()
  const [useEffectState, setUseEffectState] = useState(0)
  const [countNumber, sendPendingStatus] = useState(0);
  const [searchValue, setToDoDb] = useState();
  const [sowModel, setSowModel] = useState(false);
  const [dbData, setData] = useState();
  const [constData, setConstData] = useState()
  // const navigate=useNavigate();
  const [editCardData, setEditCard] = useState();
  const [results, setResults] = useState([])
  const [cardId, setId]=useState()
  const [cardIndex, setCardIndex]=useState()
 
  const CreateTodoValue = (data) => {
    sendvalue(data)
  }

  const FilterData = (proname) => {

    setSelectedCardId(proname)
    projectUuid(proname)
  }

 
useEffect(()=>{
  setSelectedCardId()
},[countNumber==0])

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


  const archiveClick = (e,data) => {
    e.stopPropagation()
    setArchiveId(data.id)
    setIsArchive(true)
  }

  const editCard=(e, data,index)=>{
    e.stopPropagation()
       setEditCard(pendStatusHistory)
       setId(data)
       setCardIndex(index)
       setSowModel(true)

     
     
  } 

  const setEditCardCompleted=(data)=>{
    setEditCard(statusHistory)
    setId(data)

    setSowModel(true)
  }

  const archiveClose = (data) => {
    setIsArchive(false)
  }

  const archiveData = (data) => {
    let filterArray = []
    let archiveArray = []
    const filterKanban = dbData.filter((datas) => {
      if (datas.id == data) {
        var db = new PouchDB("KanbanBoardNewProject");
        db.get("kanbanBoardArchive", function (err, doc) {
          if (doc) {
            archiveArray = doc.data
            archiveArray.push(datas)
            db.get('kanbanBoardArchive').then(function (doc) {
              return db.put({
                _id: 'kanbanBoardArchive',
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
              _id: 'kanbanBoardArchive',
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
        db.get("kanbanBoardNewProjectHistory", function (err, doc) {
          if (doc) {

            filterArray.push(datas)
            db.get('kanbanBoardNewProjectHistory').then(function (doc) {
              return db.put({
                _id: 'kanbanBoardNewProjectHistory',
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
              _id: 'kanbanBoardNewProjectHistory',
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
        db.get("kanbanBoardNewProjectHistory", function (err, doc) {
          if (doc) {
            db.get('kanbanBoardNewProjectHistory').then(function (doc) {
              return db.remove({
                _id: 'kanbanBoardNewProjectHistory',
                _rev: doc._rev,
              });
            }).then(function (response) {
            }).catch(function (err) {
              console.log(err);
            });
          }
          else {
            db.put({
              _id: 'kanbanBoardNewProjectHistory',
              data: undefined
            }).then(function (response) {
              // handle response
            }).catch(function (err) {
              console.log(err);
            });
          }
        })
      }
      setIsArchive(false)
      setUseEffectState((preState) => ++preState)
    })
  }

 
  useEffect(() => {

    (async function Change() {
      try {
        await Services.getKanbanBoardNewProjectHistory()
        await Services.getKanbanBoardNewProjectHistory()
        const kanbanBoardNewProjectHistory = await Services.getKanbanBoardNewProjectHistory();
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
              setConstData(pendingProjects)
              SetPendingCard(pendingProjects);
              setCompleted(completedProjects);


              sendCount(pendingProjects?.length)
              sendComCount(completedProjects?.length)
              sendPendingStatus(pendingProjects?.length)
              sendComCountStatus(completedProjects?.length)
            });
          }
        } else {
          sendCount(0);
          sendComCount(0);

        }
      } catch (err) {
        alert(JSON.stringify(err))
      }
    })()









  }, [useEffectState, selectDate, ,search])

  useEffect(() => {
    setUseEffectState((preState) => ++preState)
  }, [])

  useEffect(()=>{
    setUseEffectState((preState) => ++preState)
  },[search])

  // const handleSearch=()=>{
  //   const filtered = pendStatusHistory?.filter(data => data.projectName.toLowerCase().includes(search));
  //   setResults(filtered)
  // }

  // useEffect(()=>{
  //   handleSearch()
  // },[search,getSearchChange.length==0])

  // const handleSearch=()=>{
  //   let clonedPendingData = [...pendStatusHistory]
  //   let searched=clonedPendingData.filter(element=>element.projectName.toLowerCase().includes(search.toLowerCase()))
  //   console.log(searched,"searchedsearchedsearched");

  //   if(search.length>0){
  //     SetPendingCard(searched)
  //   }else{
  //     console.log(pendStatusHistory,"pendStatusHistorypendStatusHistory")
  //     SetPendingCard(constData)
  //   }
  //   }



  const callUseEffects = () => {
    setUseEffectState((preState) => ++preState)
  }

  const callUseEffectCall = () => {
    setUseEffectState((preState) => ++preState)
  }
  return (
    <>

      <div className="flex flex-col  justify-between" onClick={() => { closeSidebar(false) }}>
        {isArchive ?
          <Archivedpopup idArchive={archiveId} archiveClose={archiveClose} archive={archiveData} callUseEffect={callUseEffects} /> : null}
        <div>
          {
            showModal || sowModel == true ? (<><Createnewprojectpopup cardIndex={cardIndex} cardId={cardId} isEdit={sowModel} editCardData={editCardData} closeModel={()=>setSowModel(false)} CloseButton={onClose} onUseEffectCall={onUseEffectCall} /></>) : null
          }

        </div>
        {
          dbData == undefined ?
            <div className="bg-[#f4f5fa] h-[80vh] w-full flex justify-center items-center">
              <h1 className="text-[20px] font-[sfpro-bold]  ">No Project Found !</h1>
            </div> : <>
              {
                pendStatusHistory?.length == 0 || pendStatusHistory == undefined ? <></> : <>
                  {
                    results?.length > 0 ? <div class="flex flex-col scroll-smooth ">
                      <div className="flex  items-center xl:mt-5">
                        <h1
                          class="flex p-2 text-[18px] md:text-[22px] font-[sfpro-medium] ml-3.5 md:ml-8 text-gray-800"
                        >
                          Pending Projects
                        </h1>
                        <div className="md:hidden block">
                          <p className="text-white bg-[#773dfe] text-[12px] font-[sf-pro-medium] justify-center flex rounded-full w-6">
                            {countNumber}
                          </p>
                        </div>
                      </div>
                      <div className="w-full flex items-center justify-around">
                        <div
                          class="flex overflow-x-scroll scroll-smooth kanbanContentscroll py-2 w-[90%] md:w-[94%]">
                          <div class="flex flex-nowrap mb-[5px]">
                            <div class="flex gap-6 flex-row-reverse ">
                              {results?.map((data, index) => {
                                return (
                                  <div key={index}
                                  id="div1"
                                    class="md:w-[420px] w-[350px] group cursor-pointer flex justify-around items-center text-justify h-[27vh] md:h-64 overflow-hidden rounded-2xl  bg-white  "
                                    onClick={() => { setSelectedCardValue(data.projectName), FilterData(data.id) }}
                                  >

                                    <div className="md:h-[31vh] h-[24vh] w-[88%] flex justify-between flex-col py-3 ">
                                      <div  className="flex  justify-between flex-col h-[20vh]">
                                        <div className="flex justify-between">
                                          <h1 className=" text-black font-[sfpro-bold] text-lg w-[67%] " >{data.projectName}</h1>
                                          <div className={`${data.priority == 'Medium' ? 'rounded-full md:w-[28%] w-[20%] text-[11px] md:text-[15px] h-7 items-center  flex justify-center font-[sfpro-medium] text-white bg-[#66BB6A]' : data.priority == 'Low' ? 'rounded-full md:w-[28%] w-[20%] h-7 items-center text-[11px] md:text-[15px] flex justify-center font-[sfpro-medium] text-white bg-[#fbbf24] ' : "rounded-full md:w-[28%] w-[20%] h-7 items-center text-[11px] md:text-[15px] flex justify-center font-[sfpro-medium] text-white bg-[#EF5350]"}`}>
                                            <p>{data.priority}</p>
                                          </div>
                                        </div >
                                        <div className="text-justify text-sm opacity-70 overflow-y-scroll scrollBar font-[sfpro-regular] h-[12vh] md:h-[15vh] w-[100%] text-black">
                                          <p className="w-full">{data.description}</p>
                                        </div>
                                      </div>
                                      <div className="flex flex-row justify-between items-center w-full">
                                        <div className="flex items-center ">
                                          <img src="../icons/Calendar.svg" alt="" />
                                          <p className="font-[sfpro-medium] opacity-[0.4] text-[14px] md:text-[16px]">{data.day}</p>
                                        </div>
                                        <div id="div2" className="flex items-center md:invisible  w-[13%] justify-between md:group-hover:visible" >
                                          <img src="/images/write.png"  
                                            className="cursor-pointer opacity-[0.8]"
                                           height={10}
                                            width={15}  alt=""
                                            onClick={(e) => editCard(e,data,index)}
                                            />
                                          <img
                                            id="retrieve"
                                            src="../icons/archiveicon.svg"
                                            className="cursor-pointer"
                                            height={10}
                                            width={15}
                                            alt=""
                                            onClick={(e) => archiveClick(e,data)}
                                          />
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
              <div className="">
                <ComProjects setEditCard={setEditCardCompleted} ComCountStatus={ComCountStatus} GetDataComplete={statusHistory} search={search} setSelectedCard={projectUuid} dbData={dbData} callUseEffectCall={callUseEffectCall} />
              </div>
            </>
        }
      </div>

    </>
  )
}

export default PenProjects
