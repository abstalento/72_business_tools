import React, { useEffect, useState } from "react";
import * as Helpers from "../../utils/imageconverter/helpers";
import Image from "next/image";

import pin from "../../public/icons/pin.svg";
import Input from "../fileconvert/Input";
import Closefile from "../../public/icons/Close-button.svg";
const NO_OP = () => {};
let finalfile=[];
let fileArray = [];
let fileTotalSize=0;
// let lastImages=[];
export default function ImageToPdf(Props) {
  // return (
  //     <div className="flex items-center h-screen flex-col gap-5">
  //       {/* <h1 className="text-3xl text-red-500 font-semibold">Converter page</h1>
  //       <FileSelector/> */}

  //     </div>
  // );

  const [uploadedImages, setUploadedImages] = React.useState([]);
  const [state, setState] = React.useState();
  const [imageList, setImageList] = useState([]);
  const [cancelImage,setCancelImage]=useState(false)
  const [lastImages,setLastImages]=useState([])
  const [nameHandler,setNameHandler]=useState('')
  const units = ["bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  function niceBytes(x) {
    let l = 0,
      n = parseInt(x, 10) || 0;
    while (n >= 1024 && ++l) {
      n = n / 1024;
    }
    return n.toFixed(n < 10 && l > 0 ? 1 : 0) + units[l];
  }

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setImageList([...imageList, file]);
  };

  // let handleImageUpload = React.useCallback(
    const handleImageUpload = React.useCallback(
      (event) => {
        const fileList = event.target.files;
        
        if (fileList.length > 0) {
          const selectedFile = fileList[0];
          const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/raw', 'image/svg', 'image/psd'];
          fileTotalSize+=selectedFile.size;
          let lenFile=Math.round((fileTotalSize/1024));
          if(lenFile>=25*1024){
            fileTotalSize-=selectedFile.size;
            alert("File size exceeds the limit.");
          }
          else{
              if (allowedFormats.includes(selectedFile.type)) {
              // fileArray = [...fileArray, selectedFile];
              setState(niceBytes(selectedFile.size));
              // const fileToImagePromise = Helpers.fileToImageURL(selectedFile);
              // Promise.all([fileToImagePromise]).then((result) => {
              //   setUploadedImages(result);
              //   Props.uploadedImageFile(result);
              // });
              const isFileAlreadyAdded = fileArray.some(
                (file) => file.name === fileList[0].name && file.size === fileList[0].size
              );
              if(!isFileAlreadyAdded) {
                fileArray = [...fileArray, fileList[0]];
                finalfile=[fileList[0]];
                setLastImages([...fileArray])
                
                setState(niceBytes(fileList[0].size));
                // const fileToImagePromises = Helpers.fileToImageURL(fileArray[fileArray.length - 1]);
                const fileToImagePromises = lastImages.map(Helpers.fileToImageURL);
                setUploadedImages(finalfile);
                Promise.all(fileToImagePromises).then((result,index) => {
                  Props.uploadedImageFile(result);
                });
              }
            } else {
              alert('Please select a valid image file (PNG, JPEG, JPG, WEBP, GIF, RAW, SVG or PSD).');
            }
          }
          // if(fileArray.length>0){
          //   for(let i=0;i<fileArray.files.length;i++){
          //     let fileSize=fileArray.files.item[i].size;
          //   }
          // }
        }
        // const fileArray = fileList ? Array.from(fileList) : [];
        // let fileArray = []
        
        // const isFileAlreadyAdded = fileArray.some(
        //   (file) => file.name === fileList[0].name && file.size === fileList[0].size
        // );
        // if(!isFileAlreadyAdded) {
        //   fileArray = [...fileArray, fileList[0]];
        //   finalfile=[fileList[0]];
        //   lastImages=[...fileArray]
          
        //   setState(niceBytes(fileList[0].size));
        //   // const fileToImagePromises = Helpers.fileToImageURL(fileArray[fileArray.length - 1]);
        //   const fileToImagePromises = fileArray.map(Helpers.fileToImageURL);
        //   setUploadedImages(finalfile);
        //   Promise.all(fileToImagePromises).then((result,index) => {
        //     Props.uploadedImageFile(result);
        //   });
        // }
      },
      [setUploadedImages]
    );
  
  useEffect(() => {
    if (Props.useEffectState) {
      fileArray = []; 
      setUploadedImages([]);
    }
  }, [Props.useEffectState]);

  // const cleanUpUploadedImages = React.useCallback(() => {
  //   setUploadedImages([]);
  //   uploadedImages.forEach((image) => {
  //     URL.revokeObjectURL(image.src);
  //   });
  // }, [setUploadedImages, uploadedImages]);

  // const generatePdfFromImages = React.useCallback(() => {
  //   Helpers.generatePdfFromImages(uploadedImages);
  //   cleanUpUploadedImages();
  // }, [uploadedImages, cleanUpUploadedImages]);

  const handleFileClose = (index) => {
    const updatedImages = [...uploadedImages];
    // const removedFile = updatedImages.splice(index, 1)[0];
    // console.log(updatedImages)
    // const alpha=fileArray.find((el)=>console.log(el))
    const alpha=updatedImages.splice(index, 1);
    // lastImages.splice(index,1);
    console.log(alpha)
    let dan;
    for(let a in lastImages){
      const b=lastImages[a]!=alpha[index];
      if(!b)
      {
        dan=lastImages[a];
      }
    }
    // console.log(dan)
    const images=fileArray.filter((el)=>el.name!=dan.name)
    // console.log(images)
    // console.log(updatedImages)
    // Props.uploadedImageFile(lastImages);
    setNameHandler(dan?.name)
    setLastImages([...images])
    fileArray=[...images]
    
    if(lastImages.length!=0)
    {
      setCancelImage((el)=>!el)
    }
    else
    {
      setLastImages([]);
    }
    Props.idHandler(nameHandler)
    // console.log(uniqueIdentifier)
    // const fileDivToRemove = document.getElementById(uniqueIdentifier);
    // if (fileDivToRemove) {
      //   fileDivToRemove.remove();
      // }
      const fileToImagePromises = lastImages.map(Helpers.fileToImageURL);
      // setUploadedImages(finalfile);
      Promise.all(fileToImagePromises).then((result) => {
        Props.uploadedImageFile(result);
        // console.log(result)
      });
      setUploadedImages(updatedImages);
    };
    
    useEffect(()=>{
      const fileToImagePromises = lastImages.map(Helpers.fileToImageURL);
      Promise.all(fileToImagePromises).then((result) => {
        Props.uploadedImageFile(result);
        console.log(result)
      });
  },[lastImages])

  return (
    <>
      {uploadedImages.length > 0 ? (
        // uploadedImages.map((image) => (
        //   // <img key={image.src} src={image.src} className="uploaded-image" />
        //   <Input ImageName={image.name} ImageSize={state} />
        // ))
        // <Input
        //   ImageName={uploadedImages[uploadedImages.length - 1].name}
        //   ImageSize={state}
        // />

        uploadedImages.map((image, index) => (
          <div key={index} className="uploaded-file-container flex gap-3">
            <div className="uploaded-file-info">
              <Input
                ImageName={image.name}
                ImageSize={state}
              />
              
            </div>
            <div
                onClick={() => handleFileClose(index)}
                className="close-file-button relative top-3 bg-white w-5 h-5 bg-opacity-20 flex item-center justify-center float-right cursor-pointer"
              >
                <Image
                  src={Closefile}
                  //style={{ marginTop: "40px", zIndex: "10px" }}
                  width={20}
                  height={20}
                  alt="Close"
                />
              </div>
          </div>
        ))
      ) : (
        <>
        {!cancelImage || (lastImages.length==0) ? <div className="buttons-container">
          <label htmlFor="file-input">
            <div class="flex items-center">
           <div class="flex items-center bg-[#FFFFFF]/20 w-[15rem] md:w-72 h-12 rounded-md font-[sfpro-regular-display] text-white/60 bg-opacity-[35%]">
              <div className="px-2 w-full flex items-center">
                <div className="w-8 h-10">
                  <div className="relative top-3">
                    <Image
                      src={pin}
                      style={{ marginTop: "40px", zIndex: "10px" }}
                      width={20}
                      height={20}
                    />
                  </div>
                  {/* <input type="file" className="w-0 h-full text-sm opacity-0 block " /> */}
                </div>
                <div className="">
                  <p className="font-[sfpro-regular-display] text-white/60">
                    Choose file
                  </p>
                </div>
              </div>
              <div className="border-r-2 h-7 px-2"> </div>
              <p className="px-2">0.0MB</p>
            </div>
            <input
              id="file-input"
              type="file"
              accept="image/png, image/jpeg"
              onChange={handleImageUpload}
              style={{ display: "none" }}
              // multiple
            />
        {/* <div className="relative top-3 bg-white w-5 h-5 bg-opacity-10 flex item-center justify-center float-right">
              <Image
                src={Closefile}
                style={{ marginTop: "40px", zIndex: "10px" }}
                width={20}
                height={20}
              />
              </div> */}
              </div>
          </label>

  
              
          <br />
          {/* <button
          onClick={generatePdfFromImages}
          className="button"
          disabled={uploadedImages.length === 0}
        >
          Generate PDF
        </button> */}
        </div> : null}
        </>
      )}
    </>
  );
}
