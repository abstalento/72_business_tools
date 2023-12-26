import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import imageCompression from "browser-image-compression";
import { saveAs } from "file-saver";
import ImageSetting from "../imageupload/imageSetting";
import DragAndDrop from "../draganddrop/dragAndDrop";
// import imageSize from "image-size";
// import gst from "../../public/images"
import ReloadImage from "../../public/icons/reload.svg"
import Image from "next/image";
import SettingImg from "../../public/icons/settings.svg";

const FILETYPE = ["JPG", "PNG", "GIF", "JPEG"];

const DragDrop = () => {
  const [file, setFile] = useState("");
  const [fileSizes, setFileSize] = useState("");
  const fileUpload = async (files) => {
    setFile(files);
    // saveAs(files, files.name)

    // convert image size to mb
    // let size ={}
    // const sizeOf = require("image-size");
    // sizeOf("images/avatar.png", function (err, dimensions) {
    // });
    // let dimension = size(file)
  };
  const fileSize = (event) => {
    const { value } = event.target;

    // if (value < file.size / 1024) setFileSize(value);
  };
  const convertImageSize = async () => {
    const convertOption = {
      maxSizeMB: 1,
      maxWidthOrHeight: 2048,
      useWebWorker: true,
      maxIteration: 10,
    };
    try {
      const compressFile = await imageCompression(file, convertOption);
      setFile(compressFile)
      saveAs(compressFile, "image.jpg");
    } catch (err) {
      console.log(err);
      // alert('please choose an image')
    }
  };

  const downloadImage = () => {
    saveAs(file, "image.jpg");
  };
  const reloadFile = () => {
    setFile()
  }
  return (
    <div className="flex flex-col justify-center items-center w-[100%]">
      <div className="w-[60%] bg-[#0C1E4E]/40 bg-opacity-40 h-[402px] flex flex-col justify-center items-center rounded-2xl">
        <div className="w-[90%] flex justify-end">
        <div onClick={reloadFile} className="bg-white w-6 h-6  bg-opacity-20 flex item-center justify-center rounded-[4px] float-right ">
          <Image height="10px" width="20px" src={ReloadImage}/></div>
        </div>
        <div className="w-[90%] mt-4">
          <FileUploader 
            handleChange={fileUpload}
            name="file"
            types={FILETYPE}
            maxSize={5}
            className=""
          >
            <DragAndDrop filename={file}/>
          </FileUploader>
        </div>
        <div className="w-[88%] flex items-center font-[sfpro-Display-medium] text-white justify-start h-[10vh] ">
          <Image src={SettingImg} height="17px" width="18px"/>
          <p className="ml-1">Your Image Settings</p>
        </div>
        <section className="w-[93%] flex">
          <div className="flex w-[90%] justify-evenly">
            <section className="flex w-[26%] justify-around items-center">
              <p className="text-white opacity-[0.8]">File Size</p>
              <ImageSetting />
            </section>
            <section className="flex w-[26%] justify-around items-center">
              <p className="text-white opacity-[0.8]">Height</p>
              <ImageSetting />
            </section>
            <section className="flex items-center">
              <p className="text-white opacity-[0.8]">X</p>
            </section>
            <section className="flex w-[26%] justify-around items-center">
              <p className="text-white opacity-[0.8]">Width</p>
              <ImageSetting />
            </section>
          </div>
          <section className={`flex w-[20%] justify-end ${file ? null : ' cursor-not-allowed'}`}>
            <button onClick={convertImageSize} className={`bg-white/10 text-white w-[90%] h-[45px] rounded-lg ${file ? null : 'opacity-10 cursor-not-allowed'}`}>
              Convert
            </button>
            {/* <button onClick={downloadImage}>Downloads</button> */}
          </section>
        </section>
        {/* <div>
        <input type="text" name="" id="" onChange={fileSize} />
        <select name="" id="">
          <option value="">KB</option>
          <option value="">MB</option>
        </select>
      </div> */}
      </div>
      {/* <img src={file} className="" alt="" id="id" /> */}
      {/* <button onClick={downloadImage}>Downloads</button>

      <button onClick={convertImageSize}>Convert Image</button> */}

      {/* <ImageSetting /> */}
    </div>
  );
};

export default DragDrop;
