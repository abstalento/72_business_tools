import { Dialog } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import TodoPdfContent from "../pdfcontenttodo/pdfContentTodo";
import TodoPdfProvider from "../pdfprovidertodo/pdfProviderTodo";

const CompleteTodoList = ({completeValue, completeId, closepopUpData, completeProgress, finishedProgress}) => {
  const [fullWidth] = useState(false);
  const [maxWidth] = useState("md");
  const [inputValue, setInputValue] = useState();
  const [exportData, setExportData] = useState();
  const [todoList, setTodoList] = useState();

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInputValue(value);
    finishedProgress('finishedIn',value,completeId)
  };
  const closePopUp = () => {
    closepopUpData(false);
  };
  const addTodoList = () => {
    props.title(todoList, false);
  };
  const exportChange = (event) => {
    setExportData(event.target.value);
    const filterTodoList = props.datas.filter((data) => {
      if (event.target.value == "All" || event.target.value == undefined) {
        return props.datas;
      }
      return data.isComplete == event.target.value;
    });
    setTodoList(filterTodoList)
  };
  const pdfClick = () => {
    const filterTodoList = props.datas.filter((data) => {
      if (exportData == "All" || exportData == undefined) {
        return props.datas;
      }
      return data.isComplete == exportData;
    });
    props.closeExport(false);
  };
  const completeTodo = () => {
    
    completeProgress(completeValue,completeId)
  }
  useEffect(() => {
  }, []);
  return (
    <div className="bg-[#080808] h-screen md:h-[115vh] flex justify-around items-center z-50 absolute inset-0 bg-opacity-[0.8]">

<div className="mx-auto  border-2 w-[80%] rounded-lg md:w-[20%] lg:w-[30%] bg-white ">
        <div className="flex w-[100%] pt-2 justify-center">
          <h1
            className="font-[sf-pro-medium] w-[60%] text-center flex flex-col"
          >
            <span>
            Are you sure
            </span>
            <span> you want to {completeValue?.isComplete == 'progress' ? 'complete' :completeValue?.isComplete =='complete'?'Re-Open':''} this task?</span>
          </h1>
          <Image
            width="23px"
            height="10px"
            src="/icons/crossblue.svg"
            onClick={closePopUp}
            className="hover:cursor-pointer"
          />
        </div>
        <div className="py-2 flex justify-evenly">
          {/* <select
            className="bg-[#F6F6F6]/100 w-[60%] font-[sfpro-medium] rounded-md focus:outline-none p-2"
            name="exportData"
            value={exportData}
            onChange={exportChange}
          >
            <option hidden>Select Export</option>
            <option value="All">All</option>
            <option value="complete">Complete</option>
            <option value="progress">Progress</option>
          </select> */}
        {completeValue?.isComplete == 'progress' ? <input name="finishedIn" value={inputValue} onChange={handleOnChange} className="border-2 font-[sfpro-medium] text-[12px] text-center focus:outline-none w-[70%] border-[#70707080] p-1.5 rounded-sm" placeholder="*Enter the Finished Hours (02:00)"/> : null}
        </div>
        <div
          style={{ width: "72%" }}
          className="flex justify-between mx-auto p-4 pb-6"
        >
          <button
              id="saveYes"
              className={`bg-[#E90854] h-11 rounded-lg w-[100%] text-white font-[sfpro-medium]`}
              onClick={completeTodo}
            >
              Confirm
            </button>
        </div>
      </div>
    </div>
   

  );
};

export default CompleteTodoList;
