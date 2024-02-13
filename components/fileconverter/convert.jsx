import Image from "next/image";
import { useEffect, useState } from "react";
import Addfile from "../fileconvert/Addfile";
import Input from "../fileconvert/Input";
import Output from "../fileconvert/Output";
import arrow from "../../public/icons/arrow.svg";
import download from "../../public/icons/Download.svg";
import ImageToPdf from "../imageconverter/imagetopdf";
import ProgressBar from "../progressbar/progressBar";
import React from "react";
import ReloadImage from "../../public/icons/reload.svg";
import downloadLite from "../../public/icons/DownloadLite.svg";
//import Closefile from "../../public/icons/Close-button.svg";

import * as Helpers from "../../utils/imageconverter/helpers";
import { green } from "@material-ui/core/colors";
import { blueGrey } from "@mui/material/colors";

export default function Convert(props) {
  const [addfile, setAddfile] = useState(["btn"]);
  const [callUseEffect, setCallUseEffect] = useState(false);
  const [uploadedImageData, setUploadedImagesData] = useState([]);
  const [pdfUrl, setPdfUrl] = useState("");
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [divId,setDivId]=useState("")

  const [fileChosen, setFileChosen] = useState(false);

  const handleAdd = () => {
    setAddfile([...addfile,` btn${addfile.length}`]);
    setCallUseEffect(false);
    setProgressPercentage(0);
  };

  const cleanUpUploadedImages = React.useCallback(() => {
    setUploadedImagesData([]);
    uploadedImageData.forEach((image) => {
      URL.revokeObjectURL(image.src);
    });
  }, [setUploadedImagesData, uploadedImageData]);

  const generatePdfFromImages = React.useCallback(() => {
    let url = Helpers.generatePdfFromImages(uploadedImageData);
    setPdfUrl(url);
    if (url) {
      // setProgressPercentage(100)
      handleProgressBar();
    }
    // cleanUpUploadedImages();
  }, [uploadedImageData, cleanUpUploadedImages]);

  const uploadedImage = (e) => {
    setUploadedImagesData(e);
    setFileChosen(true);
  };

  const downloadPDF = () => {
    if (typeof window !== "undefined") {
      window.open(pdfUrl, "_blank");
    }
   
  };

  const reloadFile = () => {
    setPdfUrl();
    setAddfile(["btn"]);
    setUploadedImagesData([]);
    setCallUseEffect([]);
    setProgressPercentage(0);
  };

  // const uploadedImage = (e) => {
  //   setUploadedImagesData(e);
  //   setFileChosen(true); // Set fileChosen to true when a file is chosen
  // };

  // const closeFile = () => {
  //   setUploadedImagesData([]);
  //   setFileChosen(false); // Set fileChosen to false when closing the file
  //   // Add any other necessary cleanup logic
  // };

  const handleProgressBar = () => {
    var elem = document.getElementById("progressBar");
    var elemA = document.getElementById("progressBarNum");
    //  console.log(elem,"handleProgressBar")
    var width = 5;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
        //  elem.innerHTML= null;
        elemA.innerHTML = null;
      } else {
        width++;
        elem.style.width = width + "%";
        elemA.innerHTML = width * 1 + "%";
        // document.getElementById(elem.innerHTML)
      }
    }
  };
  const deleteHandler=(val)=>{
    console.log(val)
    if(divId!="")
    {
      const fileDivToRemove = document.getElementById(divId);
      if (fileDivToRemove) {
        // Remove nested elements if needed
        while (fileDivToRemove && fileDivToRemove.innerHTML.trim() === "" && fileDivToRemove.firstChild) {
          fileDivToRemove.removeChild(fileDivToRemove.firstChild);
        }
  
        fileDivToRemove.remove();
      }
    }
    setDivId(val)
  }
useEffect(()=>{
  deleteHandler(divId);
},[divId])


  return (
    <div className="flex justify-center flex-col items-center">
      <div className=" w-[100%] sm:w-[640px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px]">
        <div className="rounded-xl bg-[#0C1E4E] border border-white/20 w-[90%] sm:w-[600px] md:w-[688px] lg:w-[800px] xl:w-[1000px] 2xl:w-[1000px] mx-auto bg-opacity-[40%] p-4 flex flex-col leading-normal">
          <div className="flex justify-end w-[98%]">
            <div className="flex w-[55%] justify-end cursor-pointer">
              <div
                onClick={reloadFile}
                className="bg-white w-6 h-6  bg-opacity-20 flex item-center justify-center rounded-[4px] float-right "
              >
                <Image height="10px" width="18px" src={ReloadImage} />
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between h-[220px] p-5">
            <div
              className="flex flex-col scrollPdf overflow-x-hidden overflow-auto overflow-y-auto 
            "
            >
              <p className="font-[sfpro-regular-display] text-white/60 mb-4 text-xs">
                File size should not exceeds 25MB.
              </p>
              {addfile.map((index) => {
                return (

                  <div key={index} className="h-10 pb-1 mb-5 z-10 " id={divId!="" ? divId : ""}>
                    {/* mb-10 z-10 */}
                    {/* <Input /> */}
                    <ImageToPdf
                      uploadedImageFile={uploadedImage}
                      emptyUrl={uploadedImageData}
                      useEffectState={callUseEffect}
                      idHandler={deleteHandler}
                    />
                  </div>
                );
              })}
              {!uploadedImageData?.length == 0 ? (
                <Addfile handleAdd={handleAdd} />
              ) : null}
            </div>

            {/* {fileChosen && (
          <div
            onClick={closeFile}
            className="relative top-3 bg-white w-5 h-5 bg-opacity-10 flex item-center justify-center float-right cursor-pointer"
          >
            <Image src={Closefile} width={20} height={20} />
          </div>
        )} */}



            {/* <div className="xl:mt-2 relative top-[90px] rotate-90 md:rotate-0 ">
              <Image src={arrow} width="30px" alt="arrow" />
            </div> */}
            {/* <div class="flex items-center bg-[#FFFFFF]/20 bg-opacity-[35%] font-[sfpro-regular-display] w-72 h-12 rounded-md text-white/60 px-3"> */}
            <button
              id="downloadbutton"
              onClick={pdfUrl ? downloadPDF : null}
              title={
                uploadedImageData?.length === 0 || uploadedImage == undefined
                  ? null
                  : "Your File is ready Please Click to download!"
              }
              disabled={
                uploadedImageData?.length === 0 || uploadedImage == undefined
              }
              className={`flex items-center justify-center ${
                pdfUrl
                  ? "text-white/80 bg-green-500 xl:w-72 w-[15rem] h-12 rounded-md px-3"
                  : "text-white/10  bg-[#FFFF]/10 xl:w-72 w-[15rem] h-12 rounded-md px-3"
              } `}
            >
              Download Pdf
              {pdfUrl ? (
                <Image src={download} width="30px" alt="arrow" />
              ) : (
                <Image src={downloadLite} width="30px" alt="arrow" />
              )}
            </button>
          </div>
          <div className="text-sm flex flex-col justify-center items-center mt-6 ">
            <button
              onClick={generatePdfFromImages}
              disabled={uploadedImageData?.length === 0}
              id="convertbutton"
              className={`${
                !uploadedImageData?.length == 0
                  ? "bg-[#FFFFFF]/20 text-white/60 hover:bg-[#0064FE] hover:text-white"
                  : "bg-[#FFFFFF]/10 cursor-not-allowed text-white/10"
              } bg-[#FFFFFF]/20 cursor-pointer rounded-lg bg-opacity-[50%] font-[sfpro-regular-display] w-32 px-2 py-2`}
            >
              Convert
            </button>
          </div>
          <div className="mt-10">
            {/* <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">  
        <div id="progressBar" className=" text-xs font-medium text-blue-100 text-end p-0.5 h-3.5 leading-none rounded-full"
            style={{ width: pdfUrl? '1%':'0',backgroundColor: pdfUrl? 'Green':'rgb(55 65 81)'}}>
            {pdfUrl?'1': null}
        </div>    
       </div> */}

            <span
              id="progressBarNum"
              class="text-sm font-medium text-blue-700 dark:text-white"
            > 
              {pdfUrl ? "1%" : "0%"}
            </span>
            <div class="w-full rounded-full h-2.5 dark: bg-[#FFFF]/10 ">
              
              <div
                id="progressBar"
                class="bg-blue-600 h-2.5 rounded-full "
                style={{
                  width: pdfUrl ? "1%" : "0%",
                  backgroundColor: pdfUrl ? "rgb(34 197 94)" : "rgb(55 65 81)",
                }}
              ></div>
            </div>

            {/* <div id="progressBar" class="w-1 bg-green"  onClick={handleProgressBar}>0%</div> */}

            {/* <ProgressBar
              completedData={progressPercentage}
              bgValue="#00DF06"
              style="w-[80%] mx-auto"
              heightValue="6px"
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
