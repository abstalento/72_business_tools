import FileOut from "./Fileout";
import FileUp from "./FileUpload";
import React, { useState } from "react";
import Image from "next/image";
import arrow from "../../public/icons/arrow.svg";
import ReloadImage from "../../public/icons/reload.svg";
import { createWorker } from "tesseract.js";
import ReadText from "text-from-image";
import { ToastContainer, toast } from "react-toastify";
import ProgressBar from "../../components/progressbar/progressBar";

const ImageConvert = (props) => {
  const [image, setImage] = useState("");
  const [convertImage, setConvertImage] = useState();
  const [isLoad, setIsLoad] = useState(false);

  const [progressPercentage, setProgressPercentage] = useState(0);
  const finalTextDetails = (e) => {
    setConvertImage("");
    setImage(e);
    setProgressPercentage(0);
    
  };

  const handleProgressBar = () => {
    var elem = document.getElementById("progressBar");
    var elemA = document.getElementById("progressBarNum");
    //  console.log(elem,"handleProgressBar")
    var width = 5;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
          elem.innerHTML= null;
          elemA.innerHTML = null;
          
      } else {
        width++;
        elem.style.width = width + "%";
        elemA.innerHTML = width * 1 + "%";
      
        // document.getElementById(elem.innerHTML)
      }
    }
  };

  const imageConvertClick = () => {
    // const ImageConverts = (img) => {
    // setIsLoad(true);
    //   toast.info("Hang on  Minute Image Converting!", {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    //  ReadText(`${image}`)
    //     .then((text) => {
    //       setConvertImage(text);
    //       toast.success("Image Converted Sucessfully  !", {
    //         position: toast.POSITION.TOP_RIGHT,
    //       });
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    const worker = createWorker({
      logger: (m) => console.log(m),
    });
    // toast.info("Hang on  Minute Image Converting!", {
    //   position: toast.POSITION.TOP_RIGHT,
    // });
    (async () => {
      await worker.load();
      await worker.loadLanguage("eng");
      await worker.initialize("eng");
      const {
        data: { text },
      } = await worker.recognize(`${image}`);
      handleProgressBar();
      setConvertImage(text);
      toast.success("Image Converted Sucessfully  !", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setProgressPercentage(100);
      await worker.terminate();
    })();
  };
  const reloadFile = () => {
    setImage("");
    setConvertImage("");
    
  };

  return (
    <>
      <div className="items-center justify-around w-[285px] flex flex-col sm:w-[540px] sm:flex-col sm:items-center md:w-[768px] lg:w-[1024px] lg:flex-row xl:w-[1280px] xl:flex-row 2xl:w-[1536px] 2xl:flex-row pb-5">
        {/* <ImageText /> */}
        <FileUp finalText={finalTextDetails} uploadImage={convertImage} />
        <div className="h-[150px] flex flex-col justify-center items-center">
          <div
            className={`text-sm flex w-28 justify-center bg-[#FFFFFF]/20 rounded-md text-opacity-60 bg-opacity-[50%] hover:bg-[#0064FE] ${
              image == "" || image == undefined
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
          >
            <button
              onClick={
                image == "" || image == undefined ? null : imageConvertClick
              }
              className={`text-opacity-60 text-white px-2 py-2 font-[sf-pro-medium] ${
                image == "" || image == undefined
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              id="convertbutton"
            >
              Convert
            </button>
            <Image src={arrow} width={20} height={20} alt="arrow" />
          </div>
          {/* <div>
          <Image src={arrow} width={30} height={30} alt="arrow" />
        </div> */}
        </div>
        <FileOut textOut={convertImage} loadState={isLoad} />
      </div>

      <div className="mb-4 ml-[7%] flex justify-center">
        <span
          id="progressBarNum"
          class="text-sm font-medium text-blue-700 dark:text-white"
        > 
         {
           convertImage == ""
           ?" 0%": null
         }
        </span>
        <div className="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 w-2/5 ">
          <div
            id="progressBar"
            className={`h-2.5 rounded-full ${
              convertImage
              ? "bg-blue-600"
              : "bg-gray-700"

            }` }
            style={{ width: "1%" }}
          ></div>
        </div>

        {/* <ProgressBar
       completedData={progressPercentage}
       bgValue="#00DF06"
       style="w-[80%] mx-auto"
       heightValue="6px"
     /> */}
      </div>
    </>
  );
};

export default ImageConvert;
