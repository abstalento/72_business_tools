import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "../../../styles/kanbanBoard.module.css"
import { useSlotProps } from "@mui/base";
import { stubString } from "lodash";
import Service from "../../../services/kanbanBoard/service";
import PouchDB from "pouchdb";
function AddNewPopup() {
    const [task, setTask] = useState({
        projectName: '',
        priority: '',
        taskTitle: '',
        description: '',
        periodOfTask: '',
        attachment: '',
        color:'#FFC107'
    });
    const [taskHistory, setTaskHistory] = useState([]);
    const setImage = useRef();
    const [selectImage, setSelectImage] = useState(null);
    const [CreateObjectURl, setCreateObjectURl] = useState(null);
    const [showImage, setshowImage] = useState(false);
    const [closeButton, setCloseButton] = useState(false);
    const [imageName,setImageName]=useState("")
    const [dbData,setdbData]=useState()
    const handleChange = (e) => {
        const { name, value } = e.target
        setTask({
            ...task,
            [name]: value
        })
    };
    const handleSubmit = () => {
        setTaskHistory([...taskHistory, {task}])
        let taskArray = []
        var db = new PouchDB("KanbanBoard");
        db.get("kanbanBoardHistory", function (err, doc) {
          if (err) {
            taskArray.push(task)
            var doc = {
              _id: "kanbanBoardHistory",
              data: taskArray,
            };
            db.put(doc);
          }
          if(doc){
            taskArray = doc.data
            taskArray.push(task)
          }
          db.put(
            {
              _id: doc._id,
              data: taskArray,
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
    useEffect(() => {
        (async function Change(){
            const kanbanBoardHistory=await Service.getKanbanBoardHistory();
            setdbData(kanbanBoardHistory.data)
        })()
    },[])
    const handleClear = () => {
        setTask({
            projectName: '',
            priority: '',
            taskTitle: '',
            description: '',
            periodOfTask: '',
            attachment: '',
            color:''
        })
        setImageName('')
    }
    const uploadImage = () => {
        setImage.current.click()
    }

    const HandleFileSelect = (event) => {
        const fileObj = event.target.files && event.target.files[0];
        setImageName(fileObj.name)
        if (!fileObj) {
            return;
        }
        let isValid = validateFile(fileObj)
        if (isValid) {
            setSelectImage(fileObj)
            setCreateObjectURl(URL.createObjectURL(fileObj))
        }
        setshowImage(true)
    }

    const validateFile = (fileObj) => {
        const docSize = fileObj.size / 1024 / 1024;
        if (docSize < 1 && fileObj.name.match(/(\.jpg|\.JPG|\.png|\.PNG)$/)) {
            return true;
        } else {
            return false;
        }
    }
    const close = () => {
        setCloseButton(true)
    }
    const handleChangeColor = (event) => {
        const {name,value} = event.target;
            setTask({...task,priority:value})
    }
    useEffect(()=>{
        setTask({...task,attachment:CreateObjectURl})
    },[CreateObjectURl])
    return (
        <>
            {!closeButton ? (
                <div>
                    <div className="bg-[#080808] h-screen  flex justify-around items-center absolute inset-0 z-50 bg-opacity-[0.5]">
                        <div className="bg-white flex justify-around items-center w-[38%] h-[64vh] rounded-2xl">
                            <div className="h-[58vh] w-[91%] flex flex-col justify-between">
                                <div className="flex justify-between w-full">
                                    <h2 className="font-[sfpro-bold] text-[13px] w-[90%]">Add New Task</h2>
                                    <div>
                                        <Image
                                            width="20px"
                                            height="25px"
                                            src="/icons/Close-button.svg"
                                            className="hover:cursor-pointer"
                                            onClick={close}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <div>
                                        <label className="font-[sfpro-bold] text-[13px]">Project Name</label>
                                    </div>
                                    <div>
                                        <input type="text" className="font-normal text-[12px] outline-none p-[18px] h-[4vh] w-[115%] bg-[#F9F9F9] rounded-lg"
                                            name="projectName"
                                            value={task.projectName}
                                            placeholder="Eg.Kanban Board"
                                            onChange={handleChange}
                                           
                                        />
                                    </div>
                                    <div className="bg-[#F9F9F9] flex justify-between items-center w-[34%] rounded-lg outline-none p-[6px] font-[sfpro] text-[12px]">
                                        <div>
                                            <label className="w-[50%] text-[12px] font-[sfpro-bold]">Choose Priority</label>
                                        </div>
                                        <div>
                                            <select className={`rounded-lg outline-none ${task.priority == 'Low' ? 'bg-[#FFC107] text-white' : task.priority == 'Medium' ? 'bg-[#66BB6A] text-white' : task.priority=="High" ? 'bg-[#EF5350] text-white' : 'bg-[#FFC107] text-white'} h-[22px] w-[75px] p-1 font-[sfpro] text-[12px]`} name="priority" value={task.priority} onChange={handleChangeColor}>
                                                <option className="bg-white text-black" value="Low">Low</option>
                                                <option className="bg-white text-black" value="Medium">Medium</option>
                                                <option className="bg-white text-black" value="High">High</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <div>
                                        <label className="font-[sfpro-bold] text-[13px]">Task Title</label>
                                    </div>
                                    <div className="w-[75%]">
                                        <input type="text" className="font-normal text-[12px] h-[5vh] w-full p-[10px] bg-[#F9F9F9] rounded-lg outline-none"
                                            name="taskTitle"
                                            value={task.taskTitle}
                                            placeholder=""
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-start w-full">
                                    <div>
                                        <label className="font-[sfpro-bold] text-[13px]">Descriptions</label>
                                    </div>
                                    <div className="w-[75%]">
                                        <textarea className="p-[10px] font-normal text-[12px] w-full h-[15vh] bg-[#F9F9F9] rounded-lg outline-none overflow-hidden resize-none"
                                            name="description"
                                            value={task.description}
                                            placeholder=""
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center w-full">
                                    <div>
                                        <label className="font-[sfpro-bold] text-[13px]">Period of Task</label>
                                    </div>
                                    <div className="flex justify-between w-[75%]">
                                        <div className=" flex gap-2 items-center p-[10px] w-[180px] h-[5vh] bg-[#F9F9F9] rounded-lg outline-none">
                                            <Image
                                                width="20px"
                                                height="25px"
                                                src="/images/Calendar-silhoutte.png"
                                                className="hover:cursor-pointer"
                                            />
                                            <input type="date" min='1997-01-01' max='2030-12-13' 
                                                name="periodOfTask"
                                                value={task.periodOfTask}
                                                className={styles.datePickerselect} placeholder="01-JAN-2022"
                                                onChange={handleChange} />
                                                

                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center w-full">
                                    <div>
                                        <label className="font-[sfpro-bold] text-[13px]">Attachment</label>
                                    </div>
                                    <div className="flex justify-between w-[75%]" onClick={uploadImage} >
                                        <div className="flex gap-2 items-center p-[10px] w-full h-[5vh] bg-[#F9F9F9] rounded-lg outline-none">
                                            <Image
                                                width="20px"
                                                height="25px"
                                                src="/icons/Upload_image.svg"
                                                className="hover:cursor-pointer"

                                            />
                  
                                            {/* <h2 className="font-normal text-[12px]">Upload Image {imageName}</h2>   */}
                                            <input type='file' ref={setImage} onChange={HandleFileSelect} className="hidden" accept="image/*" name="attachment"></input>
                                            {imageName?
                                                
                                                    <h2 className="font-normal text-[12px]">{imageName}</h2> :

                                                    <h2 className="font-normal text-[12px]">Upload Image</h2> 
                                                
                                            } 
                                        </div>
                                    </div>
                                </div>
                                <div className="flex justify-end gap-5 w-full" >
                                    <button className="bg-black bg-opacity-1 text-white rounded w-[150px] h-[34px] font-[sfpro] text-[12px]" onClick={handleClear}>Clear</button>
                                    <button className={`${task.projectName && task.priority && task.taskTitle && task.description && task.periodOfTask &&task.color ? 'bg-[#3D5AFE] cursor-pointer':'bg-[#3D5AFE]/25 cursor-not-allowed'} text-white rounded w-[150px] h-[34px]  font-[sfpro] text-[12px]`} 
                                    onClick={()=>task.projectName && task.priority && task.taskTitle && task.description && task.periodOfTask && task.color ? handleSubmit() : null}>Add New Task</button>
                                
                                    
                                    
                                </div>

                                {/* {
                                (showImage==true)?(<><Image className="h-10 w-10" src={CreateObjectURl} /></>):
                                (<><p>No Image</p></>)
                            } */}
                            </div>
                        </div>
                    </div>
                </div>


            ) : null}
        </>
    )
}
export default AddNewPopup;