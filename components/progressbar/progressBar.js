import React from "react";
import ProgressBars from "@ramonak/react-progress-bar";
import imageProgress from "../../styles/imageProgress.module.css";

const ProgressBar = ({completedData, bgValue, style, heightValue }) => {
  return (
    <div>
      <ProgressBars
        completed={completedData}
        bgColor={bgValue}
        className={style}
        height={heightValue}
        labelAlignment="right"
        labelClassName={imageProgress.label}
      />
    </div>
  );
};

export default ProgressBar;