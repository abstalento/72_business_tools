import { useState } from "react";
import CardBoards from "../create-board/CreateBoard";

const BoardCard = (props) => {
  const [popup, setPopup] = useState(true);

  const onPress = () => {
    setPopup(false);
  };

  return (
    <div className="flex">
      <div
        style={{ backgroundColor: props.data.color }}
        className="h-24 text-white w-48 rounded-md ml-1 hover:opacity-80 hover:text-gray-100 hover:shadow-lg"
      >
        <h1 className=" font-bold pl-2 pt-1 ">{props.data.title}</h1>
      </div>
      <div
        style={{ backgroundColor: props.data.color1 }}
        className="h-24 text-white w-48 rounded-md ml-3 hover:opacity-80 hover:text-gray-100 hover:shadow-lg"
      >
        <h1 className=" font-bold pl-2 pt-1 ">{props.data.title1}</h1>
      </div>
      <div
        onClick={onPress}
        style={{ backgroundColor: props.data.color2 }}
        className="h-24 text-gray-800 w-48 rounded-md ml-3 hover:opacity-80 hover:text-gray-600 hover:shadow-lg"
      >
        <div className="flex">
          <h1 className=" font-bold flex pl-2 pt-1">{props.data.title2}</h1>
          <img className="pl-2 mt-2 h-4 w-6" src="../images/plus.png" alt="" />
        </div>
      </div>
      <CardBoards />
    </div>
  );
};

export default BoardCard;
