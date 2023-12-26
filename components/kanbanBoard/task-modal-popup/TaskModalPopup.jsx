import React, { useEffect, useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";
import attachment from "../../../public/images/attachment.png";

const FILETYPE = ["JPG", "PNG", "GIF", "JPEG"];
const INIIAL_STATE = {
  listData: [{ title: "", summary: "", link: "" }],
};

export default function TaskModalPopup(props) {
  const [state, setState] = useState(INIIAL_STATE);
  const [showModal, setShowModal] = React.useState(false);
  const [selectedBackground, setSelectedBackground] = useState("");
  const [file, setFile] = useState("");
  const [selectedMedia, setSelectedMedia] = useState(false);

  const updateState = (updatedState = state) =>
    setState((prevState) => ({ ...prevState, ...updatedState }));

  const fileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader?.readAsDataURL(file);
    reader.onloadend = function (e) {
      setFile(reader.result);
    };
  };
  const uploadDocument = async () => {
    setSelectedMedia(true);
  };

  const handleBoardTitle = (event, index) => {
    const choicesState = [...state.listData];
    if (!choicesState[index]) choicesState[index] = {};
    choicesState[index][event.target.name] = event.target.value;
    updateState({ listData: choicesState });
  };

  const saveList = (index) => {
    // setShowModal(false);
    props.saveCallback([{ state, file }], index);
  };

  const deleteImg = () => {
    setFile("");
  };


  useEffect(() => {
    let data = props.renderDetails;
  }, []);
  return (
    <>
      {state.listData?.map((id, index) => (
        <div key={id}>
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative  my-6 mx-auto max-w-3xl w-[34%]">
                <div className="border-0 rounded-lg p-3 shadow-lg relative flex flex-col w-[100%] bg-white outline-none focus:outline-none">
                  <label className="form-label inline-block text-xs my-1 mx-3 text-black font-[sfpro-regular-display] opacity-50 ml-[40px]">
                    Title of the Task
                  </label>
                  <div className="flex justify-center">
                    <input
                      type="text"
                      className="form-control
        block
        px-3
        mx-3
        w-[85%]
        py-1.5
        text-xs
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        font-[sfpro-medium]
        rounded
        transition
        ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-blue-60  first-letter:0 focus:outline-none mb-2
      "
                      id="exampleFormControlInput1"
                      name="title"
                      onChange={(e) => handleBoardTitle(e, index)}
                      placeholder="Example label"
                    />
                  </div>
                  <label className="form-label font-[sfpro-medium] inline-block text-xs mt-2 mx-3 text-black opacity-40 ml-[38px]">
                    Summary
                  </label>
                  <div className="flex flex-col mx-auto justify-center w-[85%] h-40 border border-solid border-gray-300">
                    <textarea
                      type="text"
                      name="summary"
                      className="h-36 resize-none
        form-control
        block
        px-3
        
        py-1.5
        text-xs
        font-[sfpro-regular-display]
        text-gray-700
         bg-clip-padding
        rounded
        transition
        w-[100%]
        ease-in-out
        focus:text-gray-700 focus:outline-none
      "
                      id="exampleFormControlInput1"
                      onChange={(e) => handleBoardTitle(e, index)}
                      placeholder="Detail Explanation"
                    />
                    <div className="text-right p-1 text-[8px] text-black/40 border-t w-[95%] mx-auto font-[sfpro-regular-display] ">
                      100
                    </div>
                  </div>

                  <div className="flex justify-around mt-5 w-[90%] mx-auto text-xs">
                    <div className="ml-6 flex justify-between w-[15%] cursor-pointer text-[9.8px]">
                      <Image
                        width="12px"
                        height="18px"
                        src="/icons/swotedit.svg"
                        className="hover:cursor-pointer"
                      />
                      <h1 className="font-[sfpro-medium]">Check List</h1>
                    </div>
                    <div className="flex justify-between w-[10%] text-[9.8px] cursor-pointer">
                      <Image
                        width="12px"
                        height="18px"
                        src="/icons/swotedit.svg"
                        className="hover:cursor-pointer"
                      />
                      <h1 className="font-[sfpro-medium]">Label</h1>
                    </div>
                    <div
                      className="cursor-pointer flex justify-between w-[22%] text-[9.8px] items-center"
                      onClick={uploadDocument}
                    >
                      <Image
                        width="12px"
                        height="18px"
                        src="/icons/swotedit.svg"
                        className="hover:cursor-pointer"
                      />
                      <h1 className="font-[sfpro-medium]">Media Attachment</h1>
                    </div>
                    <div className="cursor-pointer flex justify-between w-[14%] text-[9.8px]">
                      <Image
                        width="12px"
                        height="18px"
                        src="/icons/swotedit.svg"
                        className="hover:cursor-pointer"
                      />
                      <h1 className="font-[sfpro-medium]">Add Date</h1>
                    </div>
                  </div>
                  {selectedMedia ? (
                    <div className="flex flex-col w-[100%]">
                      <p className=" mt-6 ml-10 mb-2 text-lg font-[sfpro-medium]">
                        Add media to your task
                      </p>
                      <div className="w-[100%] flex flex-col items-center">
                        {/* <FileUploader
                        handleChange={fileUpload}
                        name="file"
                        types={FILETYPE}
                        maxSize={5}
                        className=""
                      > */}
                        {!file ? (
                          <div className="w-[85%] bg-[#F4F5FA] h-[100px] flex rounded">
                            <div className=" w-[45%] flex flex-col  items-center justify-center mx-auto">
                              <input
                                id="file-upload"
                                className=" cursor-pointer opacity-0 z-10 h-32 w-[80%] absolute"
                                type="file"
                                accept="image/*"
                                onChange={fileUpload}
                              />
                              <Image
                                width="12px"
                                height="18px"
                                src="/icons/swotedit.svg"
                                className="hover:cursor-pointer"
                              />
                              <div className="text-[14px] text-black font-[sfpro-medium] text-center opacity-40">
                                Add Media
                              </div>

                              <div>
                                <p className="text-[12px] text-black font-[sfpro-regular-display] text-center opacity-40">
                                  (Ex: .jpeg, .png, .bmp, etc.)
                                </p>
                              </div>
                              {/* <div className="text-center text-[10px] font-[sfpro-regular-display] text-black opacity-[0.4] w-[32%] mx-auto">
                                Max upload Size 10MB
                              </div> */}
                            </div>
                          </div>
                        ) : (
                          <div className="w-[100%] text-black flex justify-center pr-2 ">
                            {/* {file} */}

                            <img src={file} className="h-[150px] w-fit mr-2" />
                            <div
                              className="w-[15%] cursor-pointer"
                              onClick={deleteImg}
                            >
                              <img
                                className="z-50 h-[15px] bg-black hover:bg-red-600 rounded-lg border-none"
                                src="/icons/x-mark.svg"
                              />
                            </div>
                          </div>
                        )}
                        {/* </FileUploader> */}
                        <div className="w-[80%] mx-auto flex items-center justify-between py-3">
                          <hr className="w-[45%]"></hr>
                          <p className="text-xs text-black/50 font-[sfpro-medium]">
                            OR
                          </p>
                          <hr className="w-[45%]"></hr>
                        </div>
                        <div className="w-[85%] rounded mx-auto p-2 bg-[#F4F5FA] flex items-center justify-between">
                          <Image
                            width="12px"
                            height="18px"
                            src="/icons/swotedit.svg"
                            className="hover:cursor-pointer"
                          />
                          <input
                            type="text"
                            name="link"
                            className="w-[94%] bg-[#F4F5FA] outline-none font-[sfpro-regular-display]"
                            onChange={(e) => handleBoardTitle(e, index)}
                            placeholder="Paste the link"
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {/*footer*/}
                  <div className="flex justify-center w-[100%] mx-auto p-6 border-solid">
                    <div className="w-[40%] float-right">
                      <button
                        className="text-white rounded w-[85%] h-[34px] bg-[#42424280] opacity-100 font-bold px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                      // onClick={props.clearCallback(false)}
                      >
                        Clear
                      </button>
                    </div>
                    <div className="w-[40%]">
                      <button
                        className="bg-[#1A9F93] w-[85%] h-[34px]  text-white active:bg-[#1A9F93] font-bold text-sm px-6 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={(e) => saveList(index)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
          {/* ) : null} */}
        </div>
      ))}
    </>
  );
}
