import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import PropTypes from "prop-types";
import Image from "next/image";

const TodoDeletePopUp = ({ closeDeletePopup, deleteField,newTodo}) => {
  const [fullWidth] = useState(false);
  const [maxWidth] = useState("md");
  const [deleteContent, setDeleteContent] = useState();
  const deleteTodo = () => {
    newTodo(deleteField);
  };
  const closeDelete = () => {
    closeDeletePopup(false);
  };

  

  return (
    <>
      <div className="bg-[#080808] h-screen md:h-[115vh]  flex justify-around items-center z-50 absolute inset-0 bg-opacity-[0.8]"> 
      <div className="mx-auto w-[80%] rounded-lg md:w-[20%] lg:w-[30%] border-2 bg-white">
          <div className="pb-2 flex justify-evenly font-[sfpro-medium]">
            <h1 className="w-[65%] p-3 text-center font-[sfpro-medium] flex flex-col">
              {/* <span className="text-[#B72929]">Sure!</span>{" "} */}
              <span>
              Are you sure
              </span>
              <span>you want to delete this item?</span>
              {/* content from the list */}
            </h1>
          </div>
          <div className="flex justify-between mx-auto pb-6 w-[72%]">
            <button
              className="bg-[#00000099]/50 text-white h-11 font-[sfpro-medium] w-[47%] rounded-lg"
              onClick={closeDelete}
            >
              Cancel
            </button>
            <button
              id="saveYes"
              className={`bg-[#E90854] rounded-lg w-[47%] text-white font-[sfpro-medium]`}
              onClick={deleteTodo}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
     
    </>
  );
};
export default TodoDeletePopUp;
