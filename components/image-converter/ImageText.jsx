import React, { useState } from "react";
import { useEffect } from "react";
import icons from "../../public/images/cv.png";

const ReadText = require("text-from-image");

const ImageText = () => {
  const [image, setImage] = useState({});

  const imageFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function (e) {
      setImage({ ...image, file: [reader.result] });
      ImageConvert(reader.result);
    };
  };
  const ImageConvert = (img) => {
    ReadText(`${img}`)
      .then((text) => {
        console.log(text, "From Image");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    // ImageConvert();
  }, []);

  return (
    <div>
      Upload Your Image
      <div>
        {/* <input
          id="addProfilebtn"
          className="border cursor-pointer"
          type="file"
          accept="image/*"
          onChange={imageFileHandler}
        /> */}
      </div>
    </div>
  );
};

export default ImageText;
