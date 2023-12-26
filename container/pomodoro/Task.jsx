import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import removeChar from "../../utils/removeChar";
import moduleStyle from "../../styles/Dialog.module.css";
import PouchDB from "pouchdb";
import Edit from "../../public/images/pomoEdit.png";
import upArrow from "../../public/images/arrowUp.png";
import downArrow from "../../public/images/downArrow.png";
import TaskAddEdit from "../../components/pomodoro/Taskaddedit";
import edit from "../../public/images/edit.png";
import deleteIcon from "../../public/images/trash.png";
import DeleteAllTask from "./Deletealltask";
import Services from "../../services/pomodoro/services";
const Task = ({
  timeType,
  isTimerFinished,
  changeTimerFalse,
  isIncreasePomodoro,
  falseTimeFinished,
  sendUpdateActCount,
  promodoCount,
  useEffectCallData,
  chatContainer,
  report,
  sendSelectedCard,
  time,
  sendCallUseEffect,
  btnClickDataValue,
  sendCallSettingPage,
  typeTimer,
  sendSelectedobj
}) => {
  const [task, setTask] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
  const [selectedCardData,sendSelectedCardData]=useState()
  const [addTaskDialog, setAddTaskDialog] = useState(false);
  const [newTaskTemp, setNewTaskTemp] = useState({
    taskName: "",
    pomodoroCount: 0,
    notes: "",
    taskId: 1,

  }); 
  const [isTaskAdd, setIsTaskAdd] = useState(false);
  const [isEditClick, setIsEditClick] = useState(false);
  const [isOpenNotes, setIsOpenNotes] = useState(false);
  const [isOpenProject, setIsOpenProject] = useState(false);
  const [isDeleteAll, setIsDeleteAll] = useState(false);
  const [useEffectCall, setUseEffectState] = useState(false);
 const [useEffectCallDelete, setSendUseEffectCall]=useState()
  const [count, setCount]=useState([])
  const [setting, setSetting] = useState(0)
  useEffect(()=>{
     
    if (!useEffectCallDelete) {
      task?.filter((item)=>item.taskId.toString().includes(selectedTask.taskId)).map((value)=>{
        setSelectedTask(value)
      })
    }else {
      setSelectedTask([])
    }
   
      
    
  },[task,isTaskAdd,useEffectCallDelete])
  //  change pomodoro number for selected task

useEffect(()=>{
  sendCallSettingPage(true)
  let settingData = JSON.parse(localStorage.getItem("setting"));
  setSetting(settingData?.pomodoro)
},[])

useEffect(()=>{


  if (btnClickDataValue=="STOP") {
    const updatedTask = task?.map((obj) => {
      if (obj.taskId === selectedTask.taskId) {
        // let timeValue = time.replace(":",".")
        //  console.log(promodoCount.pomodoro,timeValue,parseInt(timeValue), parseFloat(timeValue),"hekkooooooooooo");
       let  pomodoro = promodoCount?.pomodoro? promodoCount.pomodoro :setting
      //  let originalTime = pomodoro, runningTime = timeValue
      //  let seconds = originalTime*60-runningTime*60
        obj.timeCount.push({[pomodoro]:diff(time,`${pomodoro} : 00`)})
          
     
        
      }
      return obj;
    });

    setTask(updatedTask);
  }




},[btnClickDataValue])

function diff(start, end) {
  start = start.split(":");
  end = end.split(":");
  var startDate = new Date(0, 0, 0, start[0], start[1], 0);
  var endDate = new Date(0, 0, 0, end[0], end[1], 0);
  var diff = endDate.getTime() - startDate.getTime();
  var hours = Math.floor(diff / 1000 / 60 / 60);
  diff -= hours * 1000 * 60 * 60;
  var minutes = Math.floor(diff / 1000 / 60);

  return (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes;

}
  const changePomodoroCount = () => {
    
    const updatedTask = task?.map((obj) => {
      if (obj.taskId === selectedTask.taskId) {
        obj.act = parseInt(obj.act) + 1;  
       let  pomodoro = promodoCount?.pomodoro? promodoCount.pomodoro :setting
       if(time == '1:0'){
        time = '0:0'
       }
        obj.timeCount.push({[pomodoro]:diff(time,`${pomodoro}:00`)})
        
      }
      return obj;
    });

     
    setTask(updatedTask);
    setIsTaskAdd(true);
    falseTimeFinished();
    // changeTimerFalse();
  };

  // Edit task btn
  const edittask = (editData) => {
    setIsEditClick(true);
    setNewTaskTemp(editData);
    // setAddTaskDialog(!addTaskDialog);
  };

  const date = new Date();

let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();

// This arrangement can be altered based on how we want the date's format to appear.
let currentDate = `${day}-${month}-${year}`;

  // add new task
  const addEditTask = () => {

    if (newTaskTemp.pomodoroCount !== 0 && newTaskTemp.taskName !== "") {
      if (isEditClick) {
        const editTask = task.map((obj) => {
          if (obj.taskId === newTaskTemp.taskId) return newTaskTemp;
          else return obj;
        });
        setTask(editTask);
      } else {
        const newTask = {
          ...newTaskTemp,
          taskId: task ? task?.length + 1 : 1,
          act: 0,
          Date:currentDate,
          timeCount:[]

         
        };
      
        if (task) setTask([...task, newTask]);
        else setTask([newTask]);
      }
      setNewTaskTemp({});
      setIsTaskAdd(true);
      closeDialog();
    } else {
      alert("Bring task name or Increase pomodoro count");
    }

    setUseEffectState((preState) => !preState);
  };

  const sendCallUseEffectCall=(data)=>{

    sendCallUseEffect(data)

   


  }


  

  // change the task to complete
  const markFinishedTask = (event, completedTask) => {

    event.stopPropagation();
    const finished = task.map((obj) => {
      if (obj.taskId === completedTask.taskId) {
        // let  pomodoro = promodoCount?.pomodoro ? promodoCount.pomodoro :setting
        // obj.timeCount.push({[pomodoro]:time})
        // obj.timeCount.push({[promodoCount.pomodoro]:time})
        let changeFinished = {
          ...obj,
          finished: obj?.finished ? false : true,
          pomodoro:promodoCount?.pomodoro ?promodoCount?.pomodoro   :setting
        };
        return changeFinished;
      } else return obj;
    });
    setTask(finished);
    
    setIsTaskAdd(true);
    useEffectCallData(true)
  };

  // DeleteTask
  const deleteTask = (deleteTask) => {
    const deletetask = task.filter((obj) => {
      if (obj.taskId !== deleteTask.taskId) return obj;
    });
    setIsTaskAdd(true);
    setTask(deletetask);
    closeDialog();
  };

  const sendUseEffectCall=(data)=>{
    setSendUseEffectCall(!useEffectCallDelete)
  }
  // newTask input fields
  const inputFields = (event, type) => {
    let { value, name } = event.target;
    if (type === "number") value = removeChar(value);
    setNewTaskTemp({ ...newTaskTemp, [name]: value });
  };

  // closeDialog
  const closeDialog = () => {
    setAddTaskDialog(false);
    setIsEditClick(false);
  };

  // Increase ponodoro count while adding task
  const incresePomodoro = (type) => {
    switch (type) {
      case "increase":
        setNewTaskTemp({
          ...newTaskTemp,
          pomodoroCount: newTaskTemp.pomodoroCount + 1,
        });
        break;
      case "decrease":
        if (newTaskTemp.pomodoroCount >= 0 && newTaskTemp.pomodoroCount !== 0)
          setNewTaskTemp({
            ...newTaskTemp,
            pomodoroCount: newTaskTemp.pomodoroCount - 1,
          });
        break;
    }
  };

  // open add notes
  const openNotes = (event) => {
    setIsOpenNotes(!isOpenNotes);
  };
  // open add project
  const openProject = () => setIsOpenProject(!isOpenProject);

  // close DeleteAllDialog
  const closeDeleteAll = () => setIsDeleteAll(false);

  // callWhen the add new task button click
  useEffect(() => {
  
    if (isTaskAdd) {
      var db = new PouchDB("Pomodoro");
      db.get("Pomodoro", function (err, doc) {
        if (err) {
          var doc = {
            _id: "Pomodoro",
            Data: task,
          };
          db.put(doc);
        }
        db.put(
          {
            _id: doc._id,
            Data: task,
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
      setIsTaskAdd(false);
      setUseEffectState((preState) => !preState);
    }
   

 
   
    // if () {
    //   localStorage.setItem("taskHistory", JSON.stringify(task));
     
    // }
  }, [isTaskAdd]);

  useEffect(()=>{
  
    const scrollToMyRef = () => {
 
      const scroll =
        chatContainer.current?.scrollHeight -
        chatContainer.current?.clientHeight;
      chatContainer.current?.scrollTo(0, scroll);
    };
    scrollToMyRef()
    scrollToMyRef()
  },[newTaskTemp])



  useEffect(() => {
    if (isTimerFinished) {
      changePomodoroCount();
    }
  }, [isTimerFinished, isIncreasePomodoro]);

  useEffect(() => {
    // let oldLocalData;

   
      (async function Change() {
        try {
          await Services.getPomodoro();
          await Services.getPomodoro();
          await Services.getPomodoro();
          await Services.getPomodoro();
          await Services.getPomodoro();
          const pomodoro = await Services.getPomodoro();
          setTask(pomodoro.Data)
        
        } catch (err) {
          alert(JSON.stringify(err));
        }
      })();
    
   
    // if(isDeleteAll)
    // try {
    //   oldLocalData = JSON.parse(localStorage.getItem("taskHistory"));
    //   setTask(oldLocalData);
    // } catch (error) {
    //   console.error(error);
    // }
  }, [isDeleteAll,useEffectCall,isTaskAdd]);
  return (
    <>
      <div className="pt-4 h-[43vh]">
        <div className="flex flex-col items-center ">
          <p className="text-white opacity-50 font-[Sf-pro-semibold] ">
            {Object.keys(selectedTask).length === 0
              ? "#0"
              : `#${selectedTask.act}/${selectedTask.pomodoroCount}`}
          </p>
          <p className="text-white font-[Sf-pro-semibold] text-justify ">
            {Object.keys(selectedTask).length === 0
              ? "Time to focus!"
              : selectedTask.taskName}
          </p>
        </div>
        <div className="h-[13vh] flex flex-col justify-evenly">
          <div className="flex justify-between">
            <p className="text-white font-[Sf-pro-semibold]">Tasks</p>
            {
            !report &&
             <Image
            
              src={Edit}
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={() => {
                task?.length>0 && setIsDeleteAll(true);
              }}
            />
                             }
            
            {/* <p className="text-white">edit</p> */}
          </div>
          <div className="bg-white w-full h-[2px]"></div>
        </div>
        <div className="overflow-scroll scrollBar" >
          <div
            
            className={`${
              isEditClick? "h-[35vh]" :
              task && task.length !== 0
                ? task.length === 1
                  ? "h-[13vh]"
                  : task.length === 2
                  ? "h-[23vh]"
                  : "h-[36vh]"
                : "h-[0vh]"
            } flex-col `}
          >
            {task?.map((obj, index) => {
            
              return (
                <>
                  {isEditClick && newTaskTemp.taskId === obj.taskId ? (
                    <TaskAddEdit
                    
                      deleteCart={() => deleteTask(obj)}
                      inputFields={inputFields}
                      incresePomodoro={incresePomodoro}
                      openNotes={openNotes}
                      openProject={openProject}
                      closeDialog={closeDialog}
                      addEditTask={addEditTask}
                      isOpenProject={isOpenProject}
                      isOpenNotes={isOpenNotes}
                      downArrow={downArrow}
                      upArrow={upArrow}
                      newTaskTemp={newTaskTemp}
                    />
                  ) : (
                    <div
                      key={index}
                      className="flex w-full p-2 cursor-pointer  "
                      onClick={(event) => {
                        event.stopPropagation();
                        setSelectedTask(obj);
                        sendSelectedCard(true)
                      
                        sendSelectedCardData(index)
                      }}
                    >
                      <div
                        className={`flex w-full justify-between items-center pl-4 pr-4 
                      rounded-xl bg-white  ${selectedCardData == index ? "border-x-8 border-x-yellow-300" : "border-none"} min-h-[10vh] `}
                      >
                        <div className="flex items-center flex-col pt-[10px] w-[100%] ">
                          <div className="flex items-center  w-[100%]">
                            <div
                              className={` flex w-[15px] justify-center
                               h-[15px] rounded-full text-white text-xs items-center ${
                                 obj.finished ? "bg-[#4BAE4F]" : "bg-slate-500"
                               }`}
                            >
                              <p
                                className=""
                                onClick={(event) =>
                                  {markFinishedTask(event, obj)
                                    sendCallUseEffectCall(true)
                                    sendSelectedobj(obj)
                                  }
                                }
                              >
                                ✓
                              </p>
                            </div>
                            <p
                              className={`${
                                obj?.finished ? "line-through" : ""
                              } text-black pl-5 font-[sf-pro-semibold] text-justify w-[100%]`}
                            >
                              {obj.taskName}
                            </p>
                          </div>
                          <div>
                            <p className="text-black font-[sf-pro-regular] text-justify mt-2">
                              {obj.notes}
                            </p>
                          </div>
                        </div>
                        <div className="flex w-[20%]  md:w-[18%] justify-around items-center">
                          <p className="text-black medium font-[sf-pro-medium]">
                            {obj.act}/{obj.pomodoroCount}
                            
                            
                          </p>
                          {
                            !report &&
                             <p className="">
                            {/* <Image
                               onClick={() => edittask(obj, selectedTask)}
                               src={edit}
                               width={15}
                               height={15}
                             />
                             <Image
                               src={deleteIcon}
                               width={15}
                               height={15}
                               onClick={() => deleteTask(obj)}
                             /> */}
                              <img
                          src="/images/dots.png"
                          className="w-6"
                          onClick={() => edittask(obj, selectedTask)}
                        />
                            </p>
                          }
                      
                          {/* <button className="text-black">Edit</button> */}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })}
          </div>
        </div>
        <div
          className={`${
            addTaskDialog ? "h-[30vh]" : "h-[15vh]"
          } flex items-center`}
        >
          {addTaskDialog ? (
            <TaskAddEdit
            addTaskDialog={addTaskDialog}
              inputFields={inputFields}
              incresePomodoro={incresePomodoro}
              openNotes={openNotes}
              openProject={openProject}
              closeDialog={closeDialog}
              addEditTask={addEditTask}
              isOpenProject={isOpenProject}
              isOpenNotes={isOpenNotes}
              downArrow={downArrow}
              upArrow={upArrow}
              newTaskTemp={newTaskTemp}
            />
          ) : (
            <button
              className="bg-black bg-opacity-25 border-dashed w-full h-[8vh] border-2
             border-white border-opacity-25 text-white text-opacity-60 rounded-xl "
              onClick={() => {
                setAddTaskDialog(!addTaskDialog);
                setIsEditClick(false);
                setNewTaskTemp({
                  taskName: "",
                  pomodoroCount: 0,
                  notes: "",
                  taskId: 0,
                });
              }}
            >
              + Add Task
            </button>
          )}
        </div>
        {/* <DialogTask isOpen={addTaskDialog} close={closeDialog}>
          <div>
            <div>
              <p>Timer Setup</p>
            </div>
            <hr style={{ borderTop: "dashed 2px" }} />
            <div>
              <p>Task Name :</p>
              <input
                type="text"
                name="taskName"
                value={newTaskTemp?.taskName}
                onChange={(event) => inputFields(event, "text")}
              />
            </div>
            <div>
              <p>Pomodoro Count :</p>
              <input
                type="text"
                name="pomodoroCount"
                value={newTaskTemp?.pomodoroCount}
                onChange={(event) => inputFields(event, "number")}
              />
            </div>
            <div>
              <p>Task Descriptions :</p>
              <input
                type="text"
                name="notes"
                value={newTaskTemp?.notes}
                onChange={(event) => inputFields(event, "text")}
              />
            </div>
            <div className="flex">
              <button
                className={`${isEditClick ? "block" : "hidden"}`}
                onClick={deleteTask}
              >
                {isEditClick ? "Delete" : ""}
              </button>
              <button onClick={addEditTask}>
                {isEditClick ? "Edit" : "Add"}
              </button>
            </div>
          </div>
        </DialogTask> */}
        {addTaskDialog ? (
          // <div className="bg-white h-[30vh] p-4 rounded-2xl flex flex-col justify-evenly">
          //   <div>
          //     <input
          //       type="text"
          //       placeholder="What are you working on?"
          //       className="w-full text-black text-opacity-40 font-[sf-pro-regular] italic outline-none"
          //       name="taskName"
          //       value={newTaskTemp?.taskName}
          //       onChange={(event) => inputFields(event, "text")}
          //     />
          //   </div>
          //   <div>
          //     <p className="font-[sf-pro-regular] font-bold text-[13px]">
          //       Pomodoro Count
          //     </p>
          //   </div>
          //   <div className="flex w-[60%]">
          //     <div className="w-[20%] bg-[#F2F2F2] rounded-lg flex justify-center">
          //       <p>{newTaskTemp.pomodoroCount}</p>
          //     </div>
          //     {/* <input type="text"/> */}
          //     <div className="flex justify-evenly w-[20%]">
          //       <button
          //         className="w-[25px] h-[25px] border-[#70707070] border-2
          //     flex items-center justify-center rounded-lg"
          //         onClick={() => incresePomodoro("increase")}
          //       >
          //         <Image src={upArrow} width={10} height={10} />
          //       </button>
          //       <button
          //         className="w-[25px] h-[25px] border-[#70707070] border-2
          //     flex items-center justify-center rounded-lg"
          //         onClick={() => incresePomodoro("decrease")}
          //       >
          //         <Image src={downArrow} width={10} height={10} />
          //       </button>
          //     </div>
          //   </div>
          //   <div className="flex w-[100%] justify-between">
          //     <div className="flex w-full">
          //       {isOpenNotes ? (
          //         <div
          //           className={`w-full flex justify-evenly ${
          //             isOpenNotes ? "transition-opacity" : ""
          //           }`}
          //         >
          //           <input
          //             type="text"
          //             className="w-[60%] bg-[#F2F2F2] rounded-lg"
          //             name="notes"
          //             value={newTaskTemp?.notes}
          //             onChange={(event) => inputFields(event, "text")}
          //           />
          //           <div>
          //             <p
          //               className="w-[40%] flex justify-center"
          //               onClick={openNotes}
          //             >
          //               Cancel
          //             </p>
          //           </div>
          //         </div>
          //       ) : (
          //         <p onClick={openNotes}>+ Add Notes</p>
          //       )}
          //     </div>
          //     <div className="flex w-full">
          //       {isOpenProject ? (
          //         <div className="w-full flex justify-evenly">
          //           <input
          //             type="text"
          //             className="w-[60%] bg-[#F2F2F2] rounded-lg"
          //           />
          //           <div>
          //             <p
          //               className="w-[40%] flex justify-center"
          //               onClick={openProject}
          //             >
          //               Cancel
          //             </p>
          //           </div>
          //         </div>
          //       ) : (
          //         <p onClick={openProject}>+ Add Project</p>
          //       )}
          //     </div>
          //   </div>
          //   <div className="flex w-full justify-end">
          //     <div className="flex justify-evenly w-[35%] items-center">
          //       <div
          //         className="text-black text-opacity-40"
          //         onClick={closeDialog}
          //       >
          //         Cancel
          //       </div>
          //       <div
          //         className="w-[65px] h-[30px] bg-[#0064FE] rounded-2xl
          //        text-white flex items-center justify-center text-[14px]"
          //        onClick={addEditTask}
          //       >
          //         Save
          //       </div>
          //     </div>
          //   </div>
          // </div>
          <div className="pb-4">
            {/* <TaskAddEdit
              inputFields={inputFields}
              incresePomodoro={incresePomodoro}
              openNotes={openNotes}
              openProject={openProject}
              closeDialog={closeDialog}
              addEditTask={addEditTask}
              isOpenProject={isOpenProject}
              isOpenNotes={isOpenNotes}
              downArrow={downArrow}
              upArrow={upArrow}
              newTaskTemp={newTaskTemp}
            /> */}
          </div>
        ) : (
          ""
        )}
        <DeleteAllTask open={isDeleteAll} close={closeDeleteAll} sendUseEffectCall={sendUseEffectCall} />
      </div>
    </>
  );
};

export default Task;
