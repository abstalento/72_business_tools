import React, { useEffect, useState } from "react";
import * as Helpers from "../../utils/imageconverter/helpers";
import Image from "next/image";

import pin from "../../public/icons/pin.svg";
import Input from "../fileconvert/Input";
const NO_OP = () => {};
let fileArray = [];
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

  let handleImageUpload = React.useCallback(
    (event) => {
      const fileList = event.target.files;

      // const fileArray = fileList ? Array.from(fileList) : [];
      // let fileArray = []
      fileArray = [...fileArray, fileList[0]];
      setState(niceBytes(fileList[0].size));
      // const fileToImagePromises = Helpers.fileToImageURL(fileArray[fileArray.length - 1]);
      const fileToImagePromises = fileArray.map(Helpers.fileToImageURL);
      Promise.all(fileToImagePromises).then((result) => {
        setUploadedImages(result);
        Props.uploadedImageFile(result);
      });
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

  return (
    <>
      {uploadedImages.length > 0 ? (
        // uploadedImages.map((image) => (
        //   // <img key={image.src} src={image.src} className="uploaded-image" />
        //   <Input ImageName={image.name} ImageSize={state} />
        // ))
        <Input
          ImageName={uploadedImages[uploadedImages.length - 1].name}
          ImageSize={state}
        />
      ) : (
        <div className="buttons-container">
          <label htmlFor="file-input">
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
          </label>
          <br />
          {/* <button
          onClick={generatePdfFromImages}
          className="button"
          disabled={uploadedImages.length === 0}
        >
          Generate PDF
        </button> */}
        </div>
      )}
    </>
  );
}
