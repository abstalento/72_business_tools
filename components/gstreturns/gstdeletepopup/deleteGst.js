import React, { useEffect, useState } from "react";
import { Dialog } from "@mui/material";
import PropTypes from "prop-types";
import Image from "next/image";

const GstDeletePopUp = ({ closeDeletePopup, idValue,deleteState}) => {
  const [fullWidth] = useState(false);
  const [maxWidth] = useState("md");
  const [deleteContent, setDeleteContent] = useState();
  const deleteVal = () => {
    deleteState(idValue);
  };
  const closeDelete = () => {
    closeDeletePopup(false);
  };

  

  return (
    <>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={true}
        PaperProps={{
          style: {
            width: "25%",
            borderRadius: "12px",
          },
        }}
      >
        <div className="mx-auto w-[100%] border-2 p-3">
          <div className="pb-2 flex justify-evenly font-[sfpro-medium]">
            <h1 className="w-[65%] p-3 text-center font-[sfpro-medium] flex flex-col">
              {/* <span className="text-[#B72929]">Sure!</span>{" "} */}
              <span>
              Are you sure 
              </span>
              <span>to remove this bill</span>
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
              className={`bg-[#4FAF04] rounded-lg w-[47%] text-white font-[sfpro-medium]`}
              onClick={deleteVal}
            >
              Confirm
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};
export default GstDeletePopUp;
