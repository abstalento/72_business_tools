

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import styles from "..//..//..//styles/kanbanBoard.module.css"
import { useSlotProps } from "@mui/base";
import Service, { Services } from "../../../services/kanbanBoard/service";
import PouchDB from "pouchdb";
import { v1 as uuid } from "uuid";


// const itemsOfTodo=[
// ]
// const columnsFromBackend = {
//   [uuid()]: {
//     name: "To Do Pending",
//     items: itemsOfTodo
//   },
// }
let itemsOfTodo = [];
const columnsFromBackend = {
    [uuid()]: {
        name: "To Do",
        items: itemsOfTodo
    },
    [uuid()]: {
        name: "In Progress",
        items: itemsOfTodo
    },
    [uuid()]: {
        name: "Completed",
        items: itemsOfTodo
    },
};
function Createnewprojectpopup(props) {


    // function getDisplayDate(year, month, day) {

    //     today = new Date();
    //     today.setHours(0);
    //     today.setMinutes(0);
    //     today.setSeconds(0);
    //     today.setMilliseconds(0);
    //     compDate = new Date(year,month-1,day); // month - 1 because January == 0
    //     diff = today.getTime() - compDate.getTime(); // get the difference between today(at 00:00:00) and the date
    //     if (compDate.getTime() == today.getTime()) {
    //         return "Today";
    //     } else if (diff <= (24 * 60 * 60 *1000)) {
    //         return "Yesterday";
    //     } else { 
    //         return compDate.toDateString(); // or format it what ever way you want
    //     }


    // }






    //get month date time
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let now = new Date();
    let todayDate = now.getDate();

    //   now.setDate(now.getDate() - 1)


    let hour = now.getHours() % 12 || 12;
    let minutes = now.getMinutes()
    // let times =now.toLocaleTimeString('en-US')
    let thisMonth = months[now.getMonth()]
    var ampm = hour >= 12 ? '   AM' : 'PM';
    // if(hour>12){
    //     hour=hour=-12
    //     ampm="PM"
    // }
    hour = hour < 10 ? "0" + hour : hour
    minutes = minutes < 10 ? "0" + minutes : minutes




    // const [TodoData,setTodoData]=useState(columnsFromBackend)
    const [task, setTask] = useState({
        id: uuid(),
        projectName: '',
        priority: 'Low',
        description: '',
        periodOfTask: '',
        color: '#FFC107',
        day: `${thisMonth} ${todayDate}th last Update at ${hour}.${minutes} ${ampm}`
    })

   
    const [taskHistory, setTaskHistory] = useState([])
    const [callUseEffect, setCallUseEffect] = useState(true)
    const [closeButton, setCloseButton] = useState(false)
    const [dbData, setdbData] = useState()

    const handleChange = (e) => {
        const { name, value } = e.target
        setTask({
            ...task,
            [name]: value
        })


    }

    useEffect(()=>{
        if (props.isEdit) {

            let CardData= props.editCardData?.filter((card)=>card.id == props.cardId.id)
            CardData?.map((card)=> {
                setTask({
                    id: card.id,
                    projectName:card.projectName,
                    priority: card.priority,
                    description:card.description,
                    periodOfTask: card.periodOfTask,
                    color: '#FFC107',
                    day:card.day,
                    taskList:card.taskList
                 })
            }
                
            
           )
        }else{
            setTask({
                id: uuid(),
                projectName: '',
                priority: 'Low',
                description: '',
                periodOfTask: '',
                color: '#FFC107',
                day: `${thisMonth} ${todayDate}th last Update at ${hour}.${minutes} ${ampm}`
            })
        }
         
    },[props.editCardData])
 




   const updateProject=()=>{
    var db = new PouchDB("KanbanBoardNewProject");
    db.get("kanbanBoardNewProjectHistory", function (err, doc) {
    //   if (err) {
    //     var doc = {
    //       _id: "kanbanBoardNewProjectHistory",
    //       data: taskArray,
    //     };
    //     db.put(doc);

    //   }
      let cloneData = [...doc.data]
    //   const data= cloneData.splice(props.cardIndex, 1,task);
      const filteredData = cloneData.filter(data=>data.id != task.id)
       filteredData.push(task)
      db.put(
        {
          _id: doc._id,
          data: filteredData,
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
    })
    // db.get("kanbanBoardNewProjectHistory", function (err, doc) {
        // if (doc) {
        //     db.get('kanbanBoardNewProjectHistory').then(function (doc) {
        //         return db.put({
        //             _id: 'kanbanBoardNewProjectHistory',
        //             _rev: doc._rev,
        //             data: taskArray
        //         });
        //     }).then(function (response) {
        //         // handle response
        //     }).catch(function (err) {
        //         console.log(err);
        //     });
        // } else {
    
            // db.put({
            //     _id: 'kanbanBoardNewProjectHistory',
            //     data: taskArray
            // }).then(function (response) {
            //     // handle response
            // }).catch(function (err) {
            //     console.log(err);
            // });
        // }
    // })

    setCallUseEffect(!callUseEffect)
    props.onUseEffectCall(callUseEffect)
    props.closeModel(false)
   }



    const handleSubmit = () => {

        setTaskHistory([...taskHistory, task])
        let taskArray = []
        task.taskList = columnsFromBackend
        var db = new PouchDB("KanbanBoardNewProject");
        taskArray.push(task)
        db.get("kanbanBoardNewProjectHistory", function (err, doc) {
            if (doc) {
                taskArray = doc.data
                taskArray.push(task)
                db.get('kanbanBoardNewProjectHistory').then(function (doc) {
                    return db.put({
                        _id: 'kanbanBoardNewProjectHistory',
                        _rev: doc._rev,
                        data: taskArray
                    });
                }).then(function (response) {
                    // handle response
                }).catch(function (err) {
                    console.log(err);
                });
            } else {


                db.put({
                    _id: 'kanbanBoardNewProjectHistory',
                    data: taskArray
                }).then(function (response) {
                    // handle response
                }).catch(function (err) {
                    console.log(err);
                });
            }
        })

        setCallUseEffect(!callUseEffect)
        props.onUseEffectCall(callUseEffect)
        props.CloseButton(true)

    }





    // useEffect(() => {
    //     (async function Change(){
    //         const kanbanBoardNewProjectHistory=await Services.getKanbanBoardNewProjectHistory();
    //         console.log(kanbanBoardNewProjectHistory.data,"History")
    //         setdbData(kanbanBoardNewProjectHistory.data)
    //     })()
    // },[])
    // console.log(dbData,"Database Data")
    const handleClear = () => {
        setTask({
            projectName: '',
            priority: '',
            description: '',
            periodOfTask: ''
        })
    }
    const onclose = () => {
        props.CloseButton(true)
        props.closeModel(false)
    }


    const handleChangeColor = (event) => {
        const { name, value } = event.target;
        setTask({ ...task, priority: value })
    }
    return (
        <>
            {!closeButton ? (
                <div className="bg-[#080808] h-screen  flex justify-around items-center z-50 absolute inset-0 bg-opacity-[0.8]">
                    <div className=" bg-white flex justify-around w-[90%] items-center md:w-[40%] h-[40vh] md:h-[50vh] rounded-2xl">
                        <div className="h-[90%] w-[90%] flex flex-col justify-between">
                            <div className="flex justify-between w-full">
                                <h2 className="font-[sfpro-bold] text-[13px] md:w-[90%]">Create New Project</h2>
                                <div>
                                    <Image
                                        width="20px"
                                        height="25px"
                                        src="/icons/Close-button.svg"
                                        className="hover:cursor-pointer"
                                        onClick={onclose}
                                    />
                                </div>
                            </div>

                            <div className="flex justify-between items-center w-full">
                                <div>
                                    <label className="font-[sfpro-bold] text-[10px] md:text-[13px]">Project Name</label>
                                </div>
                                <div className=" w-[35%] md:w-[38%]">
                                    <input type="text" className="placeholder:p-2 font-[sfpro] text-[10px] md:text-[12px] outline-none  md:p-[20px] h-[4vh] md:w-[120%] bg-[#F9F9F9] rounded-lg"
                                        name="projectName"
                                        value={task.projectName}
                                        placeholder="Eg.Kanban Board"
                                        onChange={handleChange}
                                        maxLength={34}
                                    />
                                </div>
                                <div className="bg-[#F9F9F9] flex justify-between items-center w-[37%] md:w-[28%] rounded-lg outline-none p-[3px] md:p-[8px] font-[sfpro] text-[12px]">
                                    <div>
                                        <label className="md:w-[50%] text-[10px] md:text-[12px] font-[sfpro-bold] flex"> Priority</label>
                                    </div>
                                    <div >
                                        <select className={`rounded outline-none ${task.priority == "Low" ? 'bg-[#FFC107] w-[80%] md:w-[100%] text-white' : task.priority == "High" ? 'bg-[#EF5350] w-[80%] md:w-[100%] text-white' : task.priority == "Medium" ? 'bg-[#66BB6A] w-[80%] md:w-[100%] text-white' : 'bg-[#FFC107] w-[80%] md:w-[100%] text-white'} md:h-[22px] md:w-[75px] p-1 font-[sfpro] text-[10px] md:text-[12px] `} name="priority" onChange={handleChangeColor}>
                                            <option className="bg-white text-black" value="Low">Low</option>
                                            <option className="bg-white text-black" value="Medium">Medium</option>
                                            <option className="bg-white text-black" value="High">High</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between items-start w-full">
                                <div>
                                    <label className="font-[sfpro-bold] text-[10px] md:text-[13px]">Descriptions</label>
                                </div>
                                <div className="w-[76%] xl:w-[75%] 2xl:w-[76%] ">
                                    <textarea className=" font-[sfpro] text-[12px] w-full p-[18px] md:h-[15vh] bg-[#F9F9F9] rounded-lg outline-none overflow-hidden resize-none"
                                        name="description"
                                        value={task.description}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="flex justify-between items-center w-full">
                                <div>
                                    <label className="font-[sfpro-bold] text-[10px] md:text-[13px]">Period of Task</label>
                                </div>
                                <div className="flex justify-between w-[76%] xl:w-[75%] 2xl:w-[76%] ">
                                    <div className=" flex gap-2 items-center p-[5px] md:p-[20px] md:w-[180px] h-[5vh] bg-[#F9F9F9] rounded-lg outline-none ">
                                        <Image
                                            width="20px"
                                            height="25px"
                                            src="/images/Calendar-silhoutte.png"
                                            className="hover:cursor-pointer"
                                        />
                                        {/* <h2 className="font-[sfpro] text-[12px]">01 JAN 2022</h2>
                                    <input type="date" className="hidden" ref={SelectDate}></input> */}
                                        <input
                                            name="periodOfTask"
                                            value={task.periodOfTask}
                                            type="date"
                                            id="addDate"
                                            min='1997-01-01'
                                            max='2030-12-13'
                                            onChange={handleChange}
                                            className={styles.datePickerselect}
                                            placeholder="01-JAN-2023"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-5 w-full" >
                                <button className="bg-black bg-opacity-1 text-white rounded w-[150px] h-[34px] font-[sfpro] text-[12px]" onClick={handleClear}>Clear</button>
                                <button className={`${task.projectName && task.priority && task.description && task.periodOfTask && task.color ? ' bg-[#773dfe] cursor-pointer' : 'bg-[#773dfe]/25 cursor-not-allowed'} text-white rounded w-[150px] h-[34px]  font-[sfpro] text-[12px]`}
                                    onClick={() => task.projectName && task.priority && task.description && task.periodOfTask && task.color && !props.isEdit ? handleSubmit() : props.isEdit?updateProject(): null}>{props.isEdit? 'Update':'Create New Project'}</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    )
}
export default Createnewprojectpopup;