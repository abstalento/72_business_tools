// import React, { useState } from "react";
// import ProgressBar from "@ramonak/react-progress-bar";
// import imageProgress from "../../styles/imageProgress.module.css";
// import TitleComponent from "../titlecomponent/titleComponent";

// const ImageConverter = () => {
//   const [image, setImage] = useState({
//     file: null,
//     ImageUploaded: false,
//   });

//   const imageFileHandler = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();
//     reader.readAsDataURL(file);

//     reader.onloadend = function (e) {
//       setImage({ ...image, file: [reader.result], ImageUploaded: true });
//     };
//   };

//   return (
//     <div>
//       <input
//         id="addProfilebtn"
//         className="border cursor-pointer"
//         type="file"
//         accept="image/*"
//         onChange={imageFileHandler}
//       />
//       {/* <ProgressBar
//         completed={30}
//         className="w-[600px]"
//         labelAlignment="right"
//         labelClassName={imageProgress.label}
//         completedClassName={imageProgress.barCompleted}
//       /> */}
//       <TitleComponent
//         head="Compress your"
//         content="file easily"
//         nav="Compress your image from one size online for free!"
//       />
//     </div>
//   );
// };

// export default ImageConverter;



import React, { useState } from "react";
import ProgressBar from "../../components/progressbar/progressBar";
import imageProgress from "../../styles/imageProgress.module.css";
import TitleComponent from "../titlecomponent/titleComponent";

const ImageConverter = () => {
  const [image, setImage] = useState({
    file: null,
    ImageUploaded: false,
  });

  const [progress, setProgress] = useState(0);

  const imageFileHandler = (e) => {
    setProgress(0);
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onprogress = function (e) {
      ;
      while (e.total < e.loaded) {
        setProgress(((e.length / e.total) % 10) * 10);
      }
      if (e.total == e.loaded) {
        setProgress(100);
      }
    }
    reader.onloadend = function (e) {
      setImage({ ...image, file: [reader.result], ImageUploaded: true });
    };
  };

  return (
    <div>
      <input
        id="addProfilebtn"
        className="border cursor-pointer"
        type="file"
        accept="image/*"
        onChange={imageFileHandler}
      />

      
      <ProgressBar completedData={progress} bgValue="green" style="w-[80%] mx-auto" heightValue="8px"/>
    </div>
  );
};

export default ImageConverter;

