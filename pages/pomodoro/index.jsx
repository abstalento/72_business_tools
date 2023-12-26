import Image from "next/image";
import React, { useState } from "react";
import Navigation from "../../container/pomodoro/Navigation";
import PomodoroTimer from "../../container/pomodoro/Pomodorotimer";
import moduleStyle from "../../styles/Dialog.module.css";
import FooterFile from "../../components/homepage/footer/FooterFile";
import FeedBackButton from "../../container/72FeedBackButton/feedBackButton";


const PomodoroLanding = () => {
  const [upSetting, setUpSetting] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isTimerRun, setIsTimerRun] = useState(false);
  const [TimerFinish,setTimerFinishValue]=useState()
  const [promodoCount,setPromodoCountSetting]=useState()
  const [ClickCard,setIsClickCardValue]=useState()
  const [useEffectCall,setuseEffectCallData]=useState()
  const [report,setReport]=useState()
  const [bgColor, setBgColor]=useState("Pomodoro")
 const [callUseEffectCall, sendCallUseEffectCall]=useState()
 const [callSettingPageCall,sendCallSettingPageCall]=useState(false)

  const enableDarkMode = (darkMode, isTimer) => {
    setIsDarkMode(darkMode);
    setIsTimerRun(isTimer);
  };
  const callBackDialog = (setting) => setUpSetting(setting);

  const setTimerFinish=(data)=>{
    setTimerFinishValue(data)
  
  }

  const setPromodoCount=(data)=>{
    setPromodoCountSetting(data)
  }

  const setIsClickCard=(data)=>{
    setIsClickCardValue(data)
  }

  const useEffectCallData=(data)=>{
    setuseEffectCallData(!useEffectCall)
  }
  const sendReportPopup=(data)=>{
    setReport(data)
  }

  const sendTypeTimer=(data)=>{
    setBgColor(data)
  }

const sendCallUseEffect=(data)=>{
  sendCallUseEffectCall(data)
}
const sendCallSettingPage=(data)=>{
 
  sendCallSettingPageCall(data)
}
  return (
    <>
      <div className={moduleStyle.noScrollbar}>
        {/* <BGImage/> */}
        <div
          className={`absolute ${isDarkMode && isTimerRun ? "bg-black" : "bg-[#AB47BC]"} ${bgColor=="Short break" ? "bg-[#33718a]" : bgColor=="Long break" ? "bg-[#124970]" : "bg-[#AB47BC]" }  bg-opacity-90 h-[100vh]`}
        >
          <img src="../images/bg.png" width={"100%"} height={"100vh"} />
        </div>
        <div className="bg-opacity-25 flex flex-col items-center relative w-full h-[100vh] ">
          <div className="flex w-full  bg-white h-[7vh] sticky top-0">
            <Navigation callBackDialog={callBackDialog} callSettingPageCall={callSettingPageCall} TimerFinish={TimerFinish} setPromodoCount={setPromodoCount} callUseEffectCall={callUseEffectCall} sendReportPopup={sendReportPopup} useEffectCall={useEffectCall} />
          </div>
          <div className="w-full max-h-[100%] container">
            <PomodoroTimer
            sendCallSettingPage={sendCallSettingPage}
            sendCallUseEffectData={sendCallUseEffect}
            sendTypeTimer={sendTypeTimer}
            report={report}
            useEffectCallData={useEffectCallData}
            ClickCard={ClickCard}
            setIsClickCard={setIsClickCard}
            promodoCount={promodoCount}
            setTimerFinish={setTimerFinish}
              upSetting={upSetting}
              isDarkModeFun={enableDarkMode}
            />
          </div>
        </div>
      </div>
      <div className="w-[100%]">
          <FeedBackButton Src="/images/Promodoro.png" Path="/" appName="Pomodoro"/>
          <FooterFile />
        </div>
    </>
  );
};

export default PomodoroLanding;
