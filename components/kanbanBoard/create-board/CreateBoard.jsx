import Image from "next/image";
import BoardPreviewSceleton from "../../../public/icons/BoardPreview.svg";
import { useState } from "react";

function CreateBoard() {
  const [selectedBackground, setSelectedBackground] = useState("");

  const [boardTitle, setBoardTitle] = useState("");
  const [colorPicker, setColorPicker] = useState([
    { color: "#42A5F5" },
    { color: "#66BB6A" },
    { color: "#FFA726" },
    { color: "#EF5350" },
    { color: "#AB47BC" },
    { color: "#EC407A" },
    { color: "#7E57C2" },
    { color: "#009688" },
    { color: "#FF7043" },
    { color: "grey" },
  ]);

  const selectedColor = (colorCode) => {
    localStorage.setItem("bgColor", colorCode);
    setSelectedBackground(colorCode);
  };

  const handleBoardTitle = (title) => {
    setBoardTitle(title.target.value);
  };

  return (
    <>
      <div className="w-[20%] h-[50%] bg-white border-gray-700 border-2 ">
        <p className="flex justify-center mb-2 text-gray-700">Create Board</p>
        <div className="h-0.5 bg-black opacity-5 m-4"></div>
        <div className="flex justify-center">
          <Image
            style={{ backgroundColor: `${selectedBackground}` }}
            src={BoardPreviewSceleton}
            alt="me"
            width="250"
            height="150"
          />
        </div>
        <div>
          <p className="my-2 mx-3 text-gray-700">Background</p>
          <div className="w-[32%] h-[110px] flex justify-evenly flex-wrap mb-[15px] overflow-auto mx-3 scrollBar">
            {colorPicker?.map((colorGroups, index) => {
              return (
                <button
                  key={index}
                  className="w-[23px] h-[23px] rounded"
                  style={{ backgroundColor: `${colorGroups.color}` }}
                  onClick={() => selectedColor(colorGroups.color)}
                ></button>
              );
            })}
          </div>
        </div>
        <label className="form-label inline-block my-2 mx-3 text-gray-700">
          Board title
        </label>
        <input
          type="text"
          className="
        form-control
        block
        px-3
        mx-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
          id="exampleFormControlInput1"
          onChange={(title) => handleBoardTitle(title)}
          placeholder="Example label"
        />
        <div className="flex justify-center my-4">
          {selectedBackground && boardTitle != "" ? (
            <div
              className="bg-blue-600 px-3
        py-1.5 w-60 flex justify-center  rounded"
            >
              <button disabled={false} className="text-white">
                Create
              </button>
            </div>
          ) : (
            <div
              className="bg-blue-600 px-3 opacity-30
        py-1.5 w-60 flex justify-center rounded"
            >
              <button disabled={true} className="text-white">
                Create
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CreateBoard;
