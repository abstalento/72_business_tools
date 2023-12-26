import { useEffect, useState } from "react";
import Image from "next/image";

import DialogLayout from "../../components/pomodoro/Dialoglayout";
import DialogTask from "../../components/pomodoro/DialogTask";

import moduleStyle from "../../styles/Dialog.module.css";
import Pomodoro from "../../public/icons/Promodoro.svg";
import Report from "../../public/icons/report.svg";
import Setting from "../../public/icons/pomoSetting.svg";
import ABSlogo from "../../public/icons/abs.svg";
import BtoolsHeader from "../72BTheader/BToolsHeader";
import Services from "../../services/pomodoro/services";
const Navigation = ({
  callBackDialog,
  TimerFinish,
  setPromodoCount,
  useEffectCall,
  sendReportPopup,
  callUseEffectCall,
  callSettingPageCall
}) => {

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isClick, setIsClick] = useState("");
  // const [promodoCount,setPromodoCount ]=useState()
  const [task, setTaask] = useState([]);
  const [minutes, setTime] = useState();
  const [completed, setCompletedSate] = useState();


  // open dialog for both seting and history
  const openDialog = (whichOpen) => {
  
    setDialogOpen(!dialogOpen);
    callBackDialog(false);
    setIsClick(whichOpen);
    sendReportPopup(true);
  };
  // close dialog for history
  const closeDialog = () => {
    setDialogOpen(false);
    sendReportPopup(false);
  };

  const sendPoromodoCount = (data) => {
    setPromodoCount(data);
  };
useEffect(()=>{
    task?.find((items) => items.finished == true ?  setCompletedSate(true) : setCompletedSate(false) )
},[task])
  // fetch local storage data
  useEffect(() => {
    (async function Change() {
      try {
        await Services.getPomodoro();
        await Services.getPomodoro();
        await Services.getPomodoro();
        await Services.getPomodoro();
        await Services.getPomodoro();
        const pomodoro = await Services.getPomodoro();
        setTaask(pomodoro.Data);
        let taskData = await minutescall(pomodoro.Data)
       
        
     
      } catch (err) {
        alert(JSON.stringify(err));
      }
    })();
  }, [dialogOpen, useEffectCall,callUseEffectCall]);
  const minutescall=async (pomodoro)=>{
    pomodoro?.map((card)=>{
      if(card.timeCount.length>0){
        let lastElement = card.timeCount[card.timeCount.length - 1];
        let value=Object.values(lastElement)
        card.minutes = value[0]
      }
      
 })
 return pomodoro
  }

  // useEffect(()=>{
  //   (async function Change() {
  //     try {
  //       await Services.getPomodoroSettings()
  //       await Services.getPomodoroSettings()
  //       const pomodoroSettings = await Services.getPomodoroSettings();
  //          setSetting(pomodoroSettings.setting)

  //     } catch (err) {
  //       alert(JSON.stringify(err));
  //     }
  //   })();
  // },[dialogOpen])

  // useEffect(()=>{

  //   const updatedTask = task?.map((obj) => {
  //     obj.minutes = parseInt(obj.act) * parseInt(setting?.pomodoro);
  //   return obj;
  // });

  // setTask(updatedTask)
  // },[task,setting])

  let arry = [2, 4, 6, 8, 10, 12, 14, 16];
let lastElement = arry[arry.length - 1];


  return (
    <div className="flex w-full justify-between p-0 lg:p-4 md:p-4  items-center">
      <div className="flex justify-start w-[85%]">
        {/* <div className="flex w-[10%] justify-evenly">
          <Image src={ABSlogo} width="25" height="25" />
          <div className="flex ">
            <p className="font-semibold">ABS</p>
            <p>|</p>
            <Image src={Pomodoro} width="25" height="25" />
            <p className="indent-1">Timer</p>
          </div>
        </div> */}
        <div className="w-[85%]">
          <BtoolsHeader Src="/images/Promodoro.png" Height="35" Width="100" />
        </div>
      </div>
      <div className="flex w-[30%] 2xl:w-[15%] lg:w-[21%] xl:w-[16%] md:w-[12%] justify-end">
        <div className="flex justify-around w-full">
          <div
            className={`${completed? "cursor-pointer" :"cursor-not-allowed"  } flex 2xl:w-[34%] xl:w-[38%] lg:w-[40%] justify-between bg-black bg-opacity-10 h-[4vh] rounded-lg p-1 pl-2 pr-2 `}
            onClick={() => {
              task?.find((items) =>
                items.finished == true ? openDialog("history") : null
              );
            }}
          >
            <Image src={Report} width="13" height="13" />
            <p className="text-[#AB47BC] text-[13px] hidden lg:block">
              Report
            </p>
          </div>
          <div
            className="flex 2xl:w-[34%] xl:w-[38%] lg:w-[37%] justify-between bg-black bg-opacity-10 h-[4vh] rounded-lg p-1 pl-2 pr-2 cursor-pointer"
            onClick={() => openDialog("setting")}
          >
            <Image src={Setting} width="13" height="13" />
            <p className="text-[#AB47BC] text-[13px]  hidden lg:block">
              Setting
            </p>
          </div>
        </div>
      </div>
      {isClick === "setting" ? (
        <DialogLayout
        callSettingPageCall={callSettingPageCall}
          sendPoromodoCount={sendPoromodoCount}
          callBackDialog={callBackDialog}
          close={closeDialog}
          open={dialogOpen}
        />
      ) : (
        <>
          {dialogOpen && (
            <div
              className="bg-[#080808]   h-[100vh]  flex justify-around items-center z-50 absolute inset-0 bg-opacity-[0.8]"
             
            >
              <div className="bg-white flex justify-center items-center lg:w-[50%] w-[90%] xl:w-[40%] md:w-[60%] h-[75vh] rounded-md">
                <div className="p-1 md:p-6 w-[95%]">
                  <div className="h-[7vh] font-[sf-pro-regular] flex justify-between items-center text-[20px] text-[#636363]">
                    <h1>Reports</h1>
                    <Image
                                        width="20px"
                                        height="25px"
                                        src="/icons/Close-button.svg"
                                        className="hover:cursor-pointer"
                                        onClick={closeDialog}
                                        />
                  </div>
                  <div className="h-[63vh] overflow-scroll scrollBar">
                    {task && task.length !== 0 ? (
                      task.filter((obj) => obj.finished).map((completedTask) => {
                          return (
                            <div className="pb-3">
                              <div className="bg-[#F2F2F2] p-3 min-h-[5vh] flex flex-col items-center pl-4 rounded-xl">
                                <div className="flex w-[100%] justify-between">
                                  <div>
                                   
                                    <h1 className="text-[12px] md:text-[15px] font-[sf-pro-regular]">DATE</h1>
                                  </div>
                                  <div>
                               
                                    <h1 className="text-[12px] md:text-[15px] font-[sf-pro-regular]">PROJECT / TASK</h1>
                                  </div>
                                  <div>
                                
                                    <h1 className="text-[12px] md:text-[15px] font-[sf-pro-regular]">MINUTES</h1>
                                  </div>
                                </div>

                                <div className="flex w-[100%]  justify-between ">
                                  <div className="flex w-[20%] text-[13px] md:text-[14px] " >
                                    <div>{completedTask.Date}</div>
                                  </div>
                                  <div className="flex items-start justify-center md:pl-[16px]  w-[70%] ">
                                    <div
                                      className="w-[15px] h-[15px] mt-[2px] rounded-full bg-[#4BAE4F]
                                   text-white flex items-center justify-center text-xs "
                                    >
                                      <p>✓</p>
                                    </div>
                                    <div className="flex flex-col w-[70%]  ">
                                      <p className="line-through text-justify font-[sf-pro-regular] ml-2 text-[13px] md:text-[14px] text">
                                        {completedTask.taskName}
                                      </p>
                                      <p className="text-[#9E9E9E] font-[sf-pro-regular] ml-2 text-[13px]">
                                        {completedTask.notes}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="w-[10%] text-[12px] md:text-[14px]">
                                    
                                   {completedTask.minutes? completedTask.minutes :"00:00" }
                          
                                  </div>
                                </div>
                                {/* </div> */}
                              </div>
                            </div>
                          );
                        })
                    ) : (
                      <h1></h1>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Navigation;
