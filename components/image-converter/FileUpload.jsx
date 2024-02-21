import { useEffect, useState } from "react";
import ReadText from "text-from-image";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";
import ReloadImage from "../../public/icons/reload.svg";
const FileUp = (Props) => {
  // useEffect(() => {
  // }, []);
 

  const [image, setImage] = useState({
    file: "",
  });

  const MAX_FILE_SIZE_MB = 10; //max file size 

  const imageFileHandler = (e) => {
    Props.finalText("");
    const file = e.target.files[0];
    const reader = new FileReader();
    if (file) {
      if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
            toast.error(`File size exceeds ${MAX_FILE_SIZE_MB}MB limit`);   //toast message for alerting file size exceeded.
            return;
      }
      reader?.readAsDataURL(file);
      reader.onloadend = function (e) {
        setImage({ ...image, file: [reader.result] });
        // ImageConverts(reader.result);
        Props.finalText(reader.result);
      };
      // toast.info("File is Added For Convert !", {
      //   position: toast.POSITION.TOP_RIGHT,
      // });
    }
  };

  const reloadFile = () => {
    setImage({ ...image, file: "" });
    Props.finalText();
  };

  return (
    <div>
      <ToastContainer />
      <div className="pl-20">
        <div className="bg-black bg-opacity-25 flex flex-col place-content-center border-[10px] border-opacity-40 border-[#010101] lg:ml-[6rem] w-80 h-96 rounded-xl">
          {!image.file ? (
            
            <div onChange={imageFileHandler}>
              <div>
                <h1 className="text-white  text-xs font-[sf-pro-regular] text-opacity-70 flex   justify-center">
                  Drag & Drop file here
                </h1>
                <h1 className="text-white opacity-30 text-xs pt-2 font-[sf-pro-regular] flex justify-center">
                  Or
                </h1>
              </div>
              <div className=" flex pt-2 justify-evenly cursor-pointer">
                <label
                  htmlFor="file-upload"
                  className="flex bg-white items-center justify-between bg-opacity-20 rounded-md p-1 w-[35%] cursor-pointer"
                >
                  <div className="flex  pl-2">
                    <img className="h-3" src="../icons/Link.svg" alt="" />
                  </div>
                  <div className="text-white text-xs font-[sf-pro-regular] pl-1 pr-1 items-center flex text-opacity-60 h-5 cursor-pointer">
                    Choose File
                  </div>
                </label>
                <input
                id="file-upload"
                className="opacity-0 w-[8%] cursor-pointer absolute"
                type="file"
                accept="image/*"
                onChange={imageFileHandler}
              />
              </div>

              <div>
                <p className="text-white pt-2 text-xs opacity-30 font-[sf-pro-regular] flex justify-center">
                  Max upload size 10MB
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center h-[46vh]">
              <div
                onClick={Props.uploadImage || image.file[0] ? reloadFile : null}
                className={`bg-white w-6 h-6 ${Props.uploadImage || image.file[0]? "cursor-pointer" : "cursor-not-allowed"} bg-opacity-20 flex item-center justify-center rounded-[4px] float-right mr-[10px] `}
              >
                <Image className="" height={18} width={18} src={ReloadImage} />
              </div>
              <Image src={image.file[0]} height="300" width="280" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUp;