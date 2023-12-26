import React, { useState } from "react";
import { Dialog } from "@mui/material";
import PropTypes from "prop-types";
import Image from "next/image";
import PouchDB from "pouchdb";

const SaveDefault = (props) => {
  const [fullWidth] = useState(false);
  const [maxWidth] = useState("md");
  const [closesideBar, setsideBar] = useState(false);
  const saveDefaultValue = () => {
    // localStorage.setItem("invoiceDefault", JSON.stringify(props.defaultStore));
    var db = new PouchDB("invoiceGenerator");
    db.get("invoiceDefault", function (err, doc) {
      if (err) {
        var doc = {
          _id: "invoiceDefault",
          data: props.defaultStore,
        };
        db.put(doc);
      }
      db.put(
        {
          _id: doc._id,
          data: props.defaultStore,
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
    setsideBar(false);
    props.actionSave(closesideBar);
  };
  const closeStorePopUp = () => {
    setsideBar(false);
    props.action(closesideBar);
  };
  const closeStorePop = () => {
    setsideBar(false);
    props.action(closesideBar);
  };

  return (
    <>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={true}
        PaperProps={{
          style: {
            width: "30%",
            borderRadius: "12px",
          },
        }}
      >
        <div className="mx-auto w-[100%] border-2">
          <div className="flex items-center p-6 w-[96%]">
            <h1
              style={{ fontFamily: "sfpro-bold", fontSize: "113%" }}
              className="mx-auto"
            >
              SAVE DEFAULT
            </h1>
            <Image
              width="23px"
              height="15px"
              src="/icons/crossblue.svg"
              onClick={closeStorePop}
              className="hover:cursor-pointer"
            />
          </div>
          <div className="pb-2 flex justify-evenly">
            <h1
              style={{ width: "65%", fontFamily: "sfpro-medium" }}
              className=" p-3 text-center"
            >
              Do you want to make this invoice as the default template
            </h1>
          </div>
          <div
            style={{ width: "72%" }}
            className="flex justify-between mx-auto p-4 pb-6"
          >
            <button
              style={{ width: "47%", fontFamily: "sfpro-medium" }}
              className="bg-[#f4f5fa] h-11 rounded-lg border-2 border-[#DBDBDB6E]"
              onClick={closeStorePopUp}
            >
              No
            </button>
            <button
              id="saveYes"
              style={{ backgroundColor: props.colorValue }}
              className={`rounded-lg text-white bg-color4 w-[47%] font-[sfpro-medium] bg-[${props.colorValue}]`}
              onClick={saveDefaultValue}
            >
              Yes
            </button>
          </div>
        </div>
      </Dialog>
    </>
  );
};

SaveDefault.propTypes = {
  defaultStore: PropTypes.string.isRequired,
  actionSave: PropTypes.string.isRequired,
  action: PropTypes.string.isRequired,
  colorValue: PropTypes.string.isRequired,
};
export default SaveDefault;
