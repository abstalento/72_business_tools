import React, { useEffect, useRef, useState } from "react";
import styles from "../../../styles/kanbanBoard.module.css"
import Image from "next/image";
import { usePreviousProps } from "@mui/utils";
import { render } from "react-dom";
import Service from "../../../services/kanbanBoard/service";
import PouchDB from "pouchdb";

const FILETYPE = ["JPG", "PNG", "GIF", "JPEG"];
var INIIAL_STATE = {
    listData: [{ projectName: "", taskTitle: "", description: "", periodOfTask: "", priority: "Low", attachment:""}],
};

const TaskPopUp = (props) => {

    const [state, setState] = useState(INIIAL_STATE);
    const [file, setFile] = useState();
    const [close, setClose] = useState(false)
    const setImage = useRef()
    const [imagefile,setImagefile] = useState('')
    
    const updateState = (updatedState = state) =>
        setState((prevState) => ({ ...prevState, ...updatedState }));
        
    const fileUpload = (event,index) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader?.readAsDataURL(file);
        // console.log(reader,file.name);
        reader.onloadend = function (e) {
            setFile(reader.result);
            const choicesState = [...state.listData];
            if (!choicesState[index]) choicesState[index] = {};
            choicesState[index][event.target.name] = reader.result;
            updateState({ listData: choicesState });
        };
        const image = file.name;
        setImagefile(image)
    };

    const handleBoardTitle = (event, index) => {
        const choicesState = [...state.listData];
        if (!choicesState[index]) choicesState[index] = {};
        choicesState[index][event.target.name] = event.target.value;
        updateState({ listData: choicesState });
    };

    
    const saveList = () => {
                {
            Object.entries(props.columnDetails).map(([columnId, column], index) => {
                if (index == props.index) {
                    props.saveCallback([{state}], column.name, columnId, index);
                }
            
            })
           
        }
        setState( {
            listData: [{ projectName: "", taskTitle: "", description: "", periodOfTask: "", priority: "Low", attachment:""}],
        })
        setImagefile('') 
        // let taskArray = []

        // var db = new PouchDB("KanbanBoard");
        // db.get("kanbanBoardHistory", function (err, doc) {
        //   if (err) {
        //     taskArray.push(state.listData[0])
        //     var doc = {
        //       _id: "kanbanBoardHistory",
        //       data: taskArray,
        //     };
        //     db.put(doc);
        //   }
        //   if(doc){
        //     taskArray = doc.data
        //     taskArray.push(state.listData[0])
        //   }
        //   db.put(
        //     {
        //       _id: doc._id,
        //       data: taskArray,
        //       _rev: doc._rev,
        //     },
        //     function (err, response) {
        //       if (err) {
        //         return console.log(err, "err");
        //       } else {
        //         console.log(response, "ress");
        //       }
        //     }
        //   );
        // });
    };

    const uploadImage =()=>{
        setImage.current.click()
    }
    
    useEffect(() => {

        // (async function Change(){
        //     const kanbanBoardHistory=await Service.getKanbanBoardHistory();
        //     console.log(kanbanBoardHistory,'History')
        //     setDbData(kanbanBoardHistory.data)
        // })()
        let data = props.renderDetails
       
        if(props.openPopUp){
            setState( {
                listData: [{ projectName: data.projectName, taskTitle: data.taskTitle, description: data.description, periodOfTask: data.periodOfTask, priority: data.priority, attachment:data.attachment}],
            })
            setImagefile(data.attachment)
        }else {
            setState( {
                listData: [{ projectName: props.projectTitle, taskTitle: "", description: "", periodOfTask: "", priority: "Low", attachment:""}],
            })
            setImagefile('')
        }
        
    },[props.openPopUp])
    

    // useEffect(() => {
    //     let data = props.renderDetails;
    //     console.log(props.renderDetails, "props", state.listData);
    // }, []);
   
    const handleClear=()=>{
        setState( {
            listData: [{ projectName: "", taskTitle: "", description: "", periodOfTask: "", priority: "", attachment:""}],
        })
        setImagefile('')  
    }
    return (
        <div>
            <div>
                {
                    state.listData?.map((id, index) => (
                        <div key={id}>
                            <>
                                <div className="bg-[#080808] h-full  flex justify-around items-center absolute z-50 inset-0 bg-opacity-[0.8]">
                                    <div className="bg-white flex justify-around items-center w-[90%] md:w-[40%] h-[60vh] md:h-[70vh] rounded-2xl">
                                        <div className="h-[50vh] md:h-[65vh] w-[88%] flex flex-col justify-between">
                                            <div className="flex justify-between w-full">
                                                <h2 className="font-[sfpro-bold] text-[12px] w-[90%]">Add New Task</h2>
                                                <div>
                                                    <Image
                                                        width="20px"
                                                        height="25px"
                                                        src="/icons/Close-button.svg"
                                                        className="hover:cursor-pointer"
                                                        onClick={()=>props.closePopup()}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center w-full">
                                                <div>
                                                    <label className="font-[sfpro-bold] text-[12px]">Project Name</label>
                                                </div>
                                                <div>
                                                    <input type="text" className="font-[sfpro] text-[12px] outline-none mr-2 md:p-[18px] h-[4vh] xl:w-[170px] 2xl:w-[187px] bg-[#F9F9F9] rounded-lg"
                                                        name="projectName"
                                                        id="projectName"
                                                        readOnly
                                                        autoComplete="off"
                                                        value={state.listData[0].projectName}
                                                        placeholder="Eg : Kanban Board"
                                                        onChange={(e) => handleBoardTitle(e, index)}
                                                    />
                                                </div>
                                                <div className="bg-[#F9F9F9] flex justify-between items-center w-[24%] md:w-[28%] rounded-lg outline-none md:p-[8px] font-[sfpro] text-[12px]">
                                                    <div>
                                                        <label className="md:w-[50%] text-[12px] font-[sfpro-bold] hidden md:block">Priority</label>
                                                    </div>
                                                    <div>
                                                        <select value={state.listData[0].priority} id="priority" className={`rounded outline-none md:h-[22px] md:w-[75px] md:p-1  
                                                        ${state.listData[0].priority == 'High' ? "bg-[#ef5350] text-white " : state.listData[0].priority == 'Low' ? 'bg-[#ffc107] text-white' : state.listData[0].priority == "Medium" ? 'bg-[#66bb6a] text-white' : "bg-[#ffc107] text-white"}`} name="priority" onChange={(e) => handleBoardTitle(e, index)}>
                                                            <option className="bg-white text-black" value="Low">Low</option>
                                                            <option className="bg-white text-black" value="Medium">Medium</option>
                                                            <option className="bg-white text-black" value="High">High</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center w-full">
                                                <div>
                                                    <label className="font-[sfpro-bold] text-[12px]">Task Title</label>
                                                </div>
                                                <div className="w-[75%]">
                                                    <input type="text" className="font-[sfpro] text-[12px] h-[5vh] w-full p-[10px] bg-[#F9F9F9] rounded-lg outline-none"
                                                        name="taskTitle"
                                                        id="taskTitle"
                                                        autoComplete="off"
                                                        value={state.listData[0].taskTitle}
                                                        placeholder=""
                                                        onChange={(e) => handleBoardTitle(e, index)}
                                                    />
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-start w-full">
                                                <div>
                                                    <label className="font-[sfpro-bold] text-[12px]">Descriptions</label>
                                                </div>
                                                <div className="w-[75%]">
                                                    <textarea 
                                                    className="p-[10px] font-[sfpro] text-[12px] w-full  md:h-[15vh] bg-[#F9F9F9] rounded-lg outline-none overflow-hidden resize-none"
                                                    id="desc"  
                                                    name="description"
                                                        value={state.listData[0].description}
                                                        placeholder=""
                                                        onChange={(e) => handleBoardTitle(e, index)}
                                                    ></textarea>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center w-full">
                                                <div>
                                                    <label className="font-[sfpro-bold] text-[12px]">Period of Task</label>
                                                </div>
                                                <div className="flex justify-between w-[75%]">
                                                    <div className=" flex gap-2 items-center p-[10px] w-[180px] h-[5vh] bg-[#F9F9F9] rounded-lg outline-none">
                                                        <Image
                                                            width="20px"
                                                            height="25px"
                                                            src="/images/Calendar-silhoutte.png"
                                                            className="hover:cursor-pointer"
                                                        />
                                                        <input type="date" 
                                                            id="displayDate"
                                                            name="periodOfTask"
                                                            min='1997-01-01'
                                                            max='2030-12-13'
                                                            value={state.listData[0].periodOfTask}
                                                            className={styles.datePickerselect} 
                                                            placeholder="01-JAN-2022"
                                                            onChange={(e) => handleBoardTitle(e, index)} />

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex justify-between items-center w-full">
                                                <div>
                                                    <label className="font-[sfpro-bold] text-[12px]">Attachment</label>
                                                </div>
                                                <div className="flex justify-between w-[75%] cursor-pointer" onClick={uploadImage}>
                                                    <div className="flex gap-2 items-center p-[10px] w-full h-[5vh] bg-[#F9F9F9] rounded-lg outline-none">
                                                        <Image
                                                            width="20px"
                                                            height="25px"
                                                            src="/icons/Upload_image.svg"
                                                            className="hover:cursor-pointer"

                                                        />
                                                        {/* <h2 className="font-[sfpro] text-[12px]">Upload Image</h2> */}
                                                        <input type='file' id="fileUpload" ref={setImage} onChange={(e)=>fileUpload(e,index)} className='opacity-0 w-2 cursor-pointer' accept="image/*" name="attachment"></input>
                                                        {
                                                            imagefile ?
                                                        
                                                        <h2 className="font-[sfpro] text-[12px] cursor-pointer truncate">{imagefile}</h2>:
                                                        <h2 className="font-[sfpro] text-[12px] cursor-pointer">Upload Image</h2>

                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex justify-end gap-5 w-full" >
                                                <button className="bg-black bg-opacity-1 text-white rounded w-[150px] h-[34px] font-[sfpro] text-[12px]" onClick={handleClear}>Clear</button>
                                                {/* <input type='button' name="clear" value='Clear' className="bg-black bg-opacity-1 text-white rounded w-[150px] h-[34px] font-[sfpro] text-[12px]" onClick={handleClear}/> */}
                                                {/* <button className="bg-black bg-opacity-1 text-white rounded w-[150px] h-[34px] font-[sfpro] text-[12px]" onClick={()=>{props.clearPopup(state)}}>Clear</button> */}
                                                <button id="addTask" className={`${state.listData[0].projectName && state.listData[0].priority && state.listData[0].taskTitle && state.listData[0].description && state.listData[0].periodOfTask  ? 'bg-[#773dfe] cursor-pointer' : 'bg-[#773dfe]/25 cursor-not-allowed'} text-white rounded w-[150px] h-[34px]  font-[sfpro] text-[12px]`}
                                                onClick={(e) =>state.listData[0].projectName && state.listData[0].priority && state.listData[0].taskTitle && 
                                                    state.listData[0].description && state.listData[0].periodOfTask ?
                                                     saveList(index)  : null}>{ props.renderDetails ? "Update" : "Add New Task"}</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default TaskPopUp;