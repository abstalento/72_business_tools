import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TimerBtn = ({ btnName, btnStyle, timer,selectedTask,selectobj,selected, isTimerFinished }) => {
   if(selectobj){
   }
  const [timerStart, setTimerStart] = useState(false);



  const aleratMessage = () => toast.info("Please select a Task!");



  const handleButton = (event) => {
    const { value } = event.target;
    if (btnName === "Start") {
      setTimerStart(!timerStart);
    }
    timer(value);
  };

  return (
    <>
      {/* ${
          selected === btnName ? "bg-slate-600" : "bg-transparent"
        } active:bg-slate-50 */}
      {/* <div className={`flex flex-col ${btnName!=="Start"?"w-[calc(95%/3)]":"w-[calc(95%/3)]"} `}> */}
        <button
      
          id="startPromo"
          value={btnName} 
          className={`${btnStyle} `}
          onClick={selectedTask ||  selected=="Pomodoro" || selected=="Short break" || selected=="Long break" ? handleButton :aleratMessage }
        >
          {btnName}
        </button>
        <ToastContainer />
        {selected === btnName?<hr size="20px" className="w-[100%]"/>:""}
        {/* <div
          className={` ${selected === btnName ? "border-2 border-white" : ""}`}
        ></div> */}
      {/* </div> */}
    </>
  );
};

export default React.memo(TimerBtn);
