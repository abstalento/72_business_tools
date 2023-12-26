import Image from "next/image";
import React from "react";
import deleteIcon from "../../public/images/trash.png";
const TaskAddEdit = ({
  inputFields,
  incresePomodoro,
  openNotes,
  openProject,
  closeDialog,
  addEditTask,
  isOpenProject,
  isOpenNotes,
  downArrow,
  upArrow,
  newTaskTemp,
  deleteCart,
  addTaskDialog
}) => {
  return (
    <div className="bg-white h-[30vh] p-2 pl-4 pr-4 rounded-2xl   flex flex-col justify-evenly w-full">
      <div>
        <input
          type="text"
          placeholder="What are you working on?"
          className="w-full text-[#555555] placeholder-[#E9E9E9] font-[sf-pro-bold] italic outline-none"
          name="taskName"
          value={newTaskTemp?.taskName}
          onChange={(event) => inputFields(event, "text")}
        />
      </div>
      <div>
        <p className="font-[sf-pro-regular] font-bold text-[13px]">
          Pomodoro Count
        </p>
      </div>
      <div className="flex w-[40%] md:w-[30%] justify-between">
        <div className="w-[40%] bg-[#F2F2F2] rounded-lg flex justify-center">
          <p>{newTaskTemp.pomodoroCount}</p>
        </div>
        {/* <input type="text"/> */}

     
        <div className="flex justify-around w-[70%] md:w-[50%]">
          <button
            className="w-[25px] h-[25px] border-[#70707070] border-2 
              flex items-center justify-center rounded-lg focus:outline-none focus:shadow-none"
            onClick={() => incresePomodoro("increase")}
          >
            <Image src={upArrow} width={10} height={10} />
          </button>
          <button
            className="w-[25px] h-[25px] border-[#70707070] border-2 
              flex items-center justify-center rounded-lg"
            onClick={() => incresePomodoro("decrease")}
          >
            <Image src={downArrow} width={10} height={10} />
          </button>
        </div>
      </div>
      <div className="flex w-[100%] justify-between">
        <div className="flex w-full">
          {isOpenNotes ? (
            <div
              className={`w-[50%] flex justify-between ${
                isOpenNotes ? "transition-opacity" : ""
              }`}
            >
              <input
                type="text"
                className="w-[60%] bg-[#F2F2F2] rounded-lg"
                name="notes"
                value={newTaskTemp?.notes}
                onChange={(event) => inputFields(event, "text")}
              />
              <div className="cursor-pointer">
                <p className="w-[40%] flex justify-center font-[sf-pro-medium]" onClick={openNotes}>
                  Cancel
                </p>
              </div>
            </div>
          ) : (
            <p className="cursor-pointer font-[sf-pro-medium]" onClick={openNotes}>+ Add Notes</p>
          )}
        </div>
        {/* <div className="flex w-full">
          {isOpenProject ? (
            <div className="w-full flex justify-evenly">
              <input type="text" className="w-[60%] bg-[#F2F2F2] rounded-lg" />
              <div>
                <p
                  className="w-[40%] flex justify-center"
                  onClick={openProject}
                >
                  Cancel
                </p>
              </div>
            </div>
          ) : (
            <p onClick={openProject}>+ Add Project</p>
          )}
        </div> */}
      </div>
      <div className="flex w-full justify-between">
        
        <div className="text-black text-opacity-40 cursor-pointer font-[sf-pro-medium]" onClick={deleteCart}> 
       
         {
          !addTaskDialog && "Delete" 
         }                           
        </div>
        <div className="flex justify-evenly w-[50%] md:w-[35%] items-center">
          <div className="text-black text-opacity-40 cursor-pointer font-[sf-pro-medium]" onClick={closeDialog}>
            Cancel
          </div>
          <div
            className="w-[65px] h-[30px] bg-[#0064FE] rounded-2xl
                 text-white flex items-center justify-center text-[14px] cursor-pointer font-[sf-pro-medium]"
            onClick={addEditTask}
          >
            Save
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskAddEdit;
