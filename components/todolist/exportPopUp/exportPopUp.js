import { Dialog } from "@mui/material";
import Image from "next/image";
import { useEffect, useState } from "react";
import TodoPdfContent from "../pdfcontenttodo/pdfContentTodo";
import TodoPdfProvider from "../pdfprovidertodo/pdfProviderTodo";

const ExportTodoList = (props) => {
  const [fullWidth] = useState(false);
  const [maxWidth] = useState("md");
  const [inputValue, setInputValue] = useState();
  const [exportData, setExportData] = useState();
  const [todoList, setTodoList] = useState();

  const handleHeading = (event) => {
    const { name, value } = event.target;
    setInputValue(value);
    const obj = {
      todoName: name,
      todoValue: value,
    };
  };
  const closePopUp = () => {
    props.closepopUp(false);
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
  const completeDownload = () => {
    props.closeExport(false)
  }
  useEffect(() => {
    //   console.log(props.datas);
    //  const u = props.datas.find((data)=>
    //     data.isComplete == 'complete'
    //   )
    //   console.log(u,'uuu');
  }, []);
  return (
    <div className="bg-[#080808] h-screen  md:h-[115vh] flex justify-around items-center z-50 absolute inset-0 bg-opacity-[0.8]">


<div className="mx-auto w-[80%] rounded-lg  md:w-[30%] border-2 bg-white">
        <div className="flex items-center p-6 w-[100%]">
          <h1
            style={{ fontFamily: "sfpro-bold", fontSize: "113%" }}
            className="mx-auto"
          >
            Select the export list
          </h1>
          <Image
            width="23px"
            height="15px"
            src="/icons/crossblue.svg"
            onClick={closePopUp}
            className="hover:cursor-pointer"
          />
        </div>
        <div className="pb-2 flex justify-evenly">
          <select
            className="bg-[#F6F6F6]/100 w-[60%] font-[sfpro-medium] rounded-md focus:outline-none p-2"
            name="exportData"
            value={exportData}
            onChange={exportChange}
          >
            <option hidden>Select Export</option>
            <option value="All">All</option>
            <option value="complete">Complete</option>
            <option value="progress">Progress</option>
          </select>
        </div>
        <div
          style={{ width: "72%" }}
          className="flex justify-between mx-auto p-4 pb-6"
        >
          <button
            style={{ width: "47%", fontFamily: "sfpro-medium" }}
            className="bg-[#00000099]/50 text-white h-11 rounded-lg border-2 border-[#DBDBDB6E]"
            onClick={closePopUp}
          >
            Cancel
          </button>
          <TodoPdfProvider
            ButtonComponent={(props) => (
              <button
                id="exportSave"
                //   disabled={inputValue? false : true}
                className={`rounded-lg bg-color4 w-[47%] font-[sfpro-medium] ${todoList?.length > 0 ? 'bg-[#E90854] cursor-pointer' : 'bg-[#E90854]/30 cursor-not-allowed'} text-white `} //${inputValue? null : 'cursor-not-allowed opacity-30'}
                onClick={props.onClick}
              >
                Confirm
              </button>
            )}
            disabled={!!(!todoList?.length > 0)}
            pdfDocument={
              todoList?.length > 0 ? <TodoPdfContent datas={todoList} action={exportData}/> : <></>
            }
            onDownloadComplete={completeDownload}
          ></TodoPdfProvider>
        </div>
      </div>
    </div>
     
  
  );
};

export default ExportTodoList;
