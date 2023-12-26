import { data } from "autoprefixer";
import { useState, useEffect, useContext } from "react";
import Service, { Services } from "../../../services/kanbanBoard/service";
import GlobalContext from "../Calender/GlobalContext";
import Archivedpopup from "../createnewpopup/Archivedpopup";
import PouchDB from "pouchdb";


const ComProjects = ({ search,ComCountStatus, GetDataComplete, setEditCard,setSelectedCard, dbData, callUseEffectCall }) => {
  const [CompletedData, setCompletedData] = useState(GetDataComplete)
  const [isArchive, setIsArchive] = useState(false)
  const [archiveId, setArchiveId] = useState()
  const [useEffectState, setUseEffectState] = useState(0)
  const [constData, setConstData] = useState(GetDataComplete)
  const [results, setResults] = useState([])
  const { setSelectedCardId } = useContext(GlobalContext)

  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let now = new Date();
  let todayDate = now.getDate();
  let hour = now.getHours()
  let minutes = now.getMinutes()
  let thisMonth = months[now.getMonth()]
  var ampm = hour >= 12 ? '   PM' : 'AM';
  hour = hour < 10 ? "0" + hour : hour
  minutes = minutes < 10 ? "0" + minutes : minutes


  const archiveClick = (e,data) => {
    e.stopPropagation()
    setArchiveId(data.id)
    setIsArchive(true)
  }
  const archiveClose = (data) => {
    setIsArchive(false)
  }

  //   useEffect(() => {
  //     (async function Change(){
  //         const kanbanBoardNewProjectHistory=await Services.getKanbanBoardNewProjectHistory();
  //         // console.log(kanbanBoardNewProjectHistory.data,"History")
  //         if(kanbanBoardNewProjectHistory.data == undefined){
  //           setCompletedData([])
  //         }else{
  //           setCompletedData(kanbanBoardNewProjectHistory.data)
  //         }    
  //     })()
  // },[])

  useEffect(() => {
    const filtered = GetDataComplete?.filter(order => order.projectName.toLowerCase().includes(search));
    setResults(filtered)
  }, [GetDataComplete])
  // useEffect(()=>{
  //   handleSearch()
  // },[search])


  // const handleSearch=()=>{
  //   let clonedPendingData = [...CompletedData]
  //   let searched=clonedPendingData.filter(element=>element.projectName.toLowerCase().includes(search.toLowerCase()))
  //   console.log(searched,"searchedsearchedsearched");

  //   if(search.length>0){
  //     setCompletedData(searched)
  //   }else{

  //     setCompletedData(constData)
  //   }
  //   }



  const editCard=(e, data,index)=>{
    e.stopPropagation()
       setEditCard(data)
   


     
     
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
      callUseEffectCall()
    })
  }






  const callUseEffects = () => {
    callUseEffectCall()
  }







  return (
    <>

      {isArchive ?
        <Archivedpopup idArchive={archiveId} archiveClose={archiveClose} archive={archiveData} callUseEffect={callUseEffects} /> : null}
      {
        GetDataComplete?.length == 0 || GetDataComplete == undefined ? <></> : <>

          {
            results?.length > 0 ? <div class="flex flex-col scroll-smooth  ">
              <div className="flex  items-center">
              <h1
                class="flex p-2 font-thin text-[18px] md:text-[22px] font-[sfpro-medium] ml-3.5 md:ml-6 text-gray-800"
              >
                Completed Projects
              </h1>
              <div className="md:hidden block">
                    <p className="text-white bg-[#773dfe] text-[12px] font-[sf-pro-medium] justify-center flex rounded-full w-6">
                        {ComCountStatus}
                      </p>
                    </div>
              </div>
             
              <div className=" w-full flex items-center justify-around">
                <div
                  class="flex overflow-x-scroll kanbanContentscroll py-2 scroll-smooth  w-[90%] md:w-[94%]">
                  <div
                    class="flex flex-nowrap mb-[5px]">
                    <div class=" flex gap-6 ">
                      {results?.map((data, index) => {
                        return (
                          <div
                          onClick={() => { setSelectedCardId(data.id), setSelectedCard(true) }}
                            class="md:w-[420px] w-[350px] group cursor-pointer flex justify-around items-center text-justify h-[27vh] md:h-64 overflow-hidden rounded-2xl  bg-white  "
                          >

                            <div className="md:h-[31vh] h-[24vh] w-[88%] flex justify-between flex-col py-3 ">
                              <div  className="flex  justify-between flex-col h-[20vh]">
                                <div className="flex justify-between">
                                  <h1 className=" text-black font-[sfpro-bold] text-lg w-[67%]  ">{data.projectName}</h1>
                                  <div className={`${data.priority == 'Medium' ? 'rounded-full md:w-[28%] w-[20%] h-7 items-center text-[11px] md:text-[15px] flex justify-center font-[sfpro-medium] text-white bg-[#66BB6A]' : data.priority == 'Low' ? 'rounded-full md:w-[28%] w-[20%] h-7 items-center text-[11px] md:text-[15px] flex justify-center font-[sfpro-medium] text-white bg-[#fbbf24] ' : "rounded-full md:w-[28%] w-[20%] h-7 items-center text-[11px] md:text-[15px] flex justify-center font-[sfpro-medium] text-white bg-[#EF5350]"}`}>
                                    <p>{data.priority}</p>
                                  </div>
                                </div >
                                <div className="text-justify text-sm opacity-70 overflow-y-scroll scrollBar font-[sfpro-regular] h-[13vh] md:h-[15vh] w-[100%] text-black">
                                  <p className="w-full">{data.description}</p>
                                </div>
                              </div>
                              <div className="flex flex-row justify-between items-center w-full">
                                <div className="flex items-center ">
                                  <img src="../icons/Calendar.svg" alt="" />
                                  <p className="font-[sfpro-medium] opacity-[0.4] text-[13px] md:text-[16px]">{data.day}</p>
                                </div>
                                <div className="flex items-center md:invisible  md:group-hover:visible" >
                              
                                  <img
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
    </>
  )
}
export default ComProjects;
