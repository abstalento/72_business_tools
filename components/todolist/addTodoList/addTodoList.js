import { Dialog } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

const AddTodoList = (props) => {
  const [fullWidth] = useState(false);
  const [maxWidth] = useState("md");
  const [inputValue, setInputValue] = useState()
  const [todoList,setTodoList] = useState()

  const handleHeading = (event) => {
    const { name, value } = event.target;
    setInputValue(value)
    const obj = {
        todoName: name,
        todoValue: value
    }
    setTodoList(obj)
  }
  const closePopUp = () => {
    props.closeAdd(false)
  }
  const addTodoList = () => {
    props.title(todoList,false)
  }
  return (
    <div className="bg-[#080808] md:h-[120vh] h-screen  flex justify-around items-center z-50 absolute inset-0 bg-opacity-[0.8]">
 <div className="mx-auto w-[80%] rounded-lg  md:w-[30%] border-2 bg-white ">
        <div className="flex items-center p-6 w-[96%]">
          <h1
            style={{ fontFamily: "sfpro-bold", fontSize: "113%" }}
            className="mx-auto"
          >
            Add New List 
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
          {/* <h1 style={{ width: '55%', fontFamily: 'sfpro-medium' }} className=' p-3 text-center'>
              Do you want to add this as new SWOT list
            </h1> */}
          <input
            id="listInput"
            type="text"
            name="todoList"
            placeholder="Enter the list name"
            value={inputValue}
            onChange={handleHeading}
            className="h-[39px] text-sm outline-none rounded-md w-[55%] bg-[#F6F6F6]/100 border-[#00000033] pl-3 font-[sfpro-medium]"
            required
          />
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
          <button
            id="saveYes"
            //   disabled={inputValue? false : true}
            className={`rounded-lg bg-color4 w-[47%] font-[sfpro-medium] bg-[#E90854] text-white `} //${inputValue? null : 'cursor-not-allowed opacity-30'}
              onClick={todoList? addTodoList :null}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
   
  );
};

export default AddTodoList;
