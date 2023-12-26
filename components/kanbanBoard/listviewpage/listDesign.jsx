import React, { useState, useEffect, useContext } from "react";
import Createnewprojectpopup from "../createnewpopup/Createnewprojectpopup";
import GlobalContext from "../Calender/GlobalContext";
import Services from "../../../services/kanbanBoard/service";
import Archivedpopup from "../createnewpopup/Archivedpopup";
import PouchDB from "pouchdb";
// import Services from "../../../services/kanbanBoard/service";

const ListDesign = ({ search,callUseeffect ,pageChange,useEffectCall, onUseEffectCall, sendCount, sendComCount}) => {

    const { setSelectedCardValue, setSelectedCardId } = useContext(GlobalContext)

    const [pendingList, setPendingList] = useState([]);

    const [CompletedList, setCompletedList] = useState([]);

    const [ListDatas, setListDatas] = useState();

    const [title,settitle] = useState("pending")

    const [styleState, setStyleState] = useState('pending');

    const [isArchive,setIsArchive] = useState(false)
 const [archiveId, setArchiveId] = useState()
 const [dbData, setData] = useState();
 const [useEffectState, setUseEffectState] = useState(0)

    const archiveClick = (data) =>{
      setArchiveId(data.id)
      setIsArchive(!isArchive)
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
        onUseEffectCall()
      })

    
    }







    const HandleCompletedClick = (data) => {
        if (data === 'pending') {
            setListDatas(pendingList)
            settitle(data)
        } else {
            setListDatas(CompletedList)
            settitle(data)
        }
        setStyleState(data)
    }
    
    
    useEffect(() => {
        setListDatas(pendingList)
    }, [])

    useEffect(() => {

      (async function Change() {
        await Services.getKanbanBoardNewProjectHistory()
        await Services.getKanbanBoardNewProjectHistory()
        const kanbanBoardNewProjectHistory = await Services.getKanbanBoardNewProjectHistory()
        setData(kanbanBoardNewProjectHistory.data)
        if (kanbanBoardNewProjectHistory.data) {
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
                    if(value.taskList[columnId].name !== "Completed"){
                    let isProjectPresent = pendingProjects.find(project=>project.id===value.id); 
                    if(!isProjectPresent) pendingProjects.push(value);
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
                  let isProjectPresent = pendingProjects.find(project=>project.id===value.id); 
                    if(!isProjectPresent) pendingProjects.push(value);
                  // pendingProjects.push(value);
                }
    
                if (isCompletedProject) {
                  let isProjectPresent = completedProjects.find(project=>project.id===value.id); 
                  if(!isProjectPresent) completedProjects.push(value);
                }
              });
            setPendingList(pendingProjects);
            setCompletedList(completedProjects);
            setListDatas(title =='pending' ? pendingProjects : completedProjects)

            sendCount(pendingProjects?.length)
            sendComCount(completedProjects?.length)
          });
        }else {
          sendCount(0)
          sendComCount(0)
        }
      })()
    }, [callUseeffect,useEffectCall, useEffectState])

      
      const callUseEffects=()=>{
        setUseEffectState((preState) => ++preState)
        onUseEffectCall()
      }
  

    // let a = demo == '1':'2':demo == '8'?'3':'4'
    return (
      <>

{isArchive ?
        <Archivedpopup idArchive={archiveId} archiveClose={archiveClose} archive={archiveData}  callUseEffect={callUseEffects}/> : null }

<div className="bg-[#FFFFFF] h-[85vh] w-[92%] md:w-[95%]  rounded-[10px] ">
    

            <div className="flex justify-between rounded-t-[10px] items-center w-[100%] h-[5vh] md:h-[8vh]">
              
                    <div className={`${styleState == 'pending' ? 'duration-75 rounded-tl-[10px] flex items-center text-[#FFFFFF] pl-[10px] md:pl-[50px] bg-[#9e2aff] w-[80%] h-[6vh] lg:text-[15px]  md:h-[8vh]' : 'flex items-center rounded-tl-[10px] h-[6vh] md:h-[8vh] w-[25%] pl-[10px] xl:text-[22px] md:pl-[40px] bg-[#2A2A2A1A]'}`}>
                        <h1 onClick={() => HandleCompletedClick('pending')} className={`${styleState == 'completed' ? 'font-[sfpro-regular] xl:text-[22px] text-[13px] md:text-[25px] cursor-pointer lg:text-[15px] text-[#06060666] hover:text-[#9e2aff] ' : 'text-[#FFFFFF] xl:text-[22px] cursor-pointer text-[13px] lg:text-[15px]  md:text-[25px] hover:text-[#FFFFFF]   font-[sfpro-regular]'}`}>Pending Projects</h1>
                    </div>
                    <div className={`${styleState == 'completed' ? 'w-[80%] pl-[10px]  md:pl-[40px] rounded-tr-[10px] xl:h-[8vh]  h-[6vh] flex items-center bg-[#66BB6A]' : 'bg-[#2A2A2A1A] xl:text-[22px] w-[30%] lg:text-[15px] pl-[10px]  md:pl-[40px] rounded-tr-[10px] h-[6vh] md:h-[8vh] flex items-center'}`}>
                        <h1 onClick={() => HandleCompletedClick('completed')} className={`${styleState == 'completed' ? 'font-[sfpro-regular] text-[13px] md:text-[25px] cursor-pointer lg:text-[15px] text-[#FFFFFF] xl:text-[22px] ' : 'text-[#06060666] text-[13px] lg:text-[15px] md:text-[25px] hover:text-[#66BB6A] cursor-pointer  xl:text-[22px] font-[sfpro-regular]'}`}>Completed Projects</h1>
                
                </div>
            </div>
          <div className="w-full overflow-x-auto scrollBar ">
            <div className="w-[40rem] md:w-auto">
            <div className="h-[18vh] flex items-center justify-around w-full">
                <div className="flex  flex-row justify-between items-center rounded-[10px] w-[97%] h-[10vh] bg-[#F5F7F9]">
                  <div>
                  <div className="flex md:pl-[20px] pl-2 flex-row justify-between" >
                    <img
                                  src="../icons/archiveicon.svg"
                                  className="cursor-pointer"
                                  height={10}
                                  width={15}
                                  alt=""
                                />
                        <h1 className=" text-[12px] md:text-[20px] pl-2 md:pl-[79px] font-[sfpro-medium]">Task Title</h1>
                    </div>
                  </div>
                    <h1 className="text-[12px] md:text-[20px] font-[sfpro-medium]">Description</h1>
                    <h1 className="text-[12px] md:text-[20px] font-[sfpro-medium]">Dates</h1>
                    <h1 className="text-[12px] md:text-[20px] pr-2 md:pr-[111px] font-[sfpro-medium]">Priority</h1>
                </div>
            </div>
            <div className="max-h-[55vh] min-h-[22vh] w-full flex flex-wrap items-start overflow-y-auto scrollBar scroll-smooth justify-around">
                {
                    ListDatas?.length==0 ? 
                <div className="h-[50vh] w-full flex justify-center items-center">
                    <h1 className="text-[30px] font-[sfpro-bold]">There is no {title} data!</h1>
                </div>:<>
                {
                    ListDatas?.filter(data => data.projectName.toLowerCase().includes(search) || data.priority.toLowerCase().includes(search)).map((element) => (
                      <> 
                      
                      <div className="lg:ml-[30px] xl:ml-9 md:ml-9 md:mt-5 mt-[24px] ml-[11px]" onClick={() => archiveClick(element)}>
                          <img
                                  src="../icons/archiveicon.svg"
                                  className="cursor-pointer"
                                  height={10}
                                  width={15}
                                  alt=""
                                />
                          </div>

                          <div  className="flex cursor-pointer  flex-row justify-between items-center rounded-[10px] w-[92%] md:w-[95%] h-[10vh]" onClick={()=>{setSelectedCardId(element.id),pageChange(element)}}>
                          
                           <div className="flex justify-around items-center md:w-[20%] " >
                                <div className="md:w-[85%]  flex justify-between items-center " >
                              
                                <div className="w-[85%] flex justify-around items-center    overflow-y-scroll scrollBar font-[sfpro-regular] h-[15vh]">
                                <h1 className=" md:text-[20px] text-[13px] font-[sfpro-regular] w-[100%] ">{element.projectName}</h1>
                                </div>
                                </div>
                            </div>
                            <div className=" w-[25%] flex justify-center items-center  overflow-y-scroll scrollBar font-[sfpro-regular] h-[15vh] ">
                                <h1 className=" text-[15px] font-[sfpro-regular] ">{element.description}</h1>
                            </div>
                            <div className=" w-[22%] ">
                                <h1 className="md:text-[15px] text-[10px] font-[sfpro-regular]">{element.day}</h1>
                            </div>
                            <div className=" b flex justify-start items-baseline md:w-[15%] w-[12%] h-[6vh]">
                                <div className={`${element.priority=='Medium' ? ' md:text-[16px] text-[8px] rounded-full items-center w-[70%] h-6 flex justify-center text-white bg-[#66BB6A]' : element.priority=='Low' ? 'rounded-full w-[70%] h-6 flex md:text-[16px] text-[10px] items-center justify-center text-white bg-[#fbbf24]' : "rounded-full w-[70%] md:w-[70%] h-6 md:text-[16px] text-[10px] flex items-center justify-center text-white bg-[#EF5350]"}`}>
                            <p className="font-[sfpro-medium]">{element.priority}</p>
                            </div>
                            </div>
                            
                        </div>
                      </>
                        
                    ))
                }
                </>
                }

            </div>
            </div>
          </div>
            <div>
                {/* <Createnewprojectpopup/> */}
            </div>
        </div>

      </>
        

    )
}
export default ListDesign;