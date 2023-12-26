import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import PropTypes from "prop-types";
import Image from "next/image";

const SwotDeletePopUp = ({ datas, deleteField, newSwot, closeDeletePopup }) => {
  const [fullWidth] = useState(false);
  const [maxWidth] = useState("md");
  const [deleteContent, setDeleteContent] = useState();
  const deleteSwot = () => {
    const newData = { ...datas };
    newSwot(deleteField);
  };
  const closeDelete = () => {
    closeDeletePopup(false);
  };

  useEffect(() => {
    const content = { ...datas };
    setDeleteContent(
      content[deleteField.deleteTitle][deleteField.deleteId].name
    );
  }, []);

  return (
    <>
       <div className='bg-[#000000] h-screen flex justify-around items-center z-50 absolute inset-0 bg-opacity-[0.5]'> 
       <div className="mx-auto lg:w-[30%] 2xl:w-[25%] md:w-[30%] w-[84%] border-2 rounded-lg bg-white">
          {/* <div className="flex items-center justify-end py-6 w-[96%]">
            <h1
              style={{ fontFamily: "sfpro-bold", fontSize: "113%" }}
              className="mx-auto"
            >
              Delete{" "}
              <span className="text-[#2C9C25]">{deleteField.deleteTitle}</span>
            </h1>
            <Image
              width="23px"
              height="15px"
              src="/icons/crossblue.svg"
              onClick={closeDelete}
              className="hover:cursor-pointer"
            />
          </div> */}
          <div className="pb-2 flex justify-evenly font-[sfpro-medium]">
            <h1 className="w-[65%] p-3 text-center font-[sfpro-medium] flex flex-col">
              {/* <span className="text-[#B72929]">Sure!</span>{" "} */}
              <span>
                {" "}
                Do you want to delete this List from{" "}
                <u className="text-[#35BC2C]">{deleteField?.deleteTitle}</u>
              </span>
              {/* content from the list */}
            </h1>
          </div>
          <div className="flex justify-between mx-auto p-4 pb-6 w-[72%]">
            <button
              className="bg-[#00000099]/50 text-white h-11 font-[sfpro-medium] w-[47%] rounded-lg"
              onClick={closeDelete}
            >
              Cancel
            </button>
            <button
              id="saveYes"
              className={`rounded-lg w-[47%] text-white font-[sfpro-medium] bg-[#B72929]`}
              onClick={deleteSwot}
            >
              Yes
            </button>
          </div>
        </div>
        </div>
     
    
    </>
  );
};
export default SwotDeletePopUp;
