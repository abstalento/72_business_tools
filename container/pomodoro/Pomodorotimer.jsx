import Head from "next/head";
import React, { useEffect, useMemo, useRef, useState } from "react";
import TimerBtn from "../../components/pomodoro/Timerbtn";
import Task from "../../container/pomodoro/Task";
// import bg from "../../public/src/pomodoroAssests/bg.png";
import Image from "next/image";
import moduleStyle from "../../styles/Dialog.module.css";
import { createWorker } from "tesseract.js";
// audioFiles
import BirdSound from "../../public/src/audio/bird.wav";
import BirdSounds from "../../public/src/audio/bird.mp3";
import Tick1 from "../../public/src/audio/tick1.mp3";
import Tick2 from "../../public/src/audio/tick2.mp3";
import FooterFile from "../../components/homepage/footer/FooterFile";
import FeedBackButton from "../72FeedBackButton/feedBackButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import * as audioContextTimers from "audio-context-timers";

const PomodoroTimer = ({ upSetting,sendCallSettingPage, isDarkModeFun,setTimerFinish,promodoCount,useEffectCallData,report,sendTypeTimer,sendCallUseEffectData }) => {
  // default value
  const buttonLenght = ["Pomodoro", "Short break", "Long break"];
  const soundAlarm = { bird: BirdSounds };
  const timerRuningSound = { tick1: Tick1, tick2: Tick2 };

  // sound for end timer and timer running
  const [defaultAlarm, setDefaultAlarm] = useState("bird");
  const [defaultRunnerSound, setDefaultRunningSound] = useState("tick2");

  // time for timer and interval iteration
  const [defaultPromoTimer, setDefaultPromoTime] = useState(25);
  const [defaultShortTimer, setDefaultShortTime] = useState(15);
  const [defaultLongTimer, setDefaultLongTime] = useState(5);
  

  
  const [longBreakIntervals, setLongBreakInterval] = useState(2);

  // default timer and button name
  const [typeTimer, setTypeTime] = useState("Pomodoro");
  const [btnTimerName, setBtnTimerName] = useState("START");

  
   
  const [autoPomodoro, setAutoStartPomodoro] = useState(false);
  const [autoBreak, setAutoStartBreak] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [timerFinished, setTimerFinisher] = useState(false);
  const [isTimerRun, setIsTimerRun] = useState(false);
  const [increasePomodoroCount, setIncreasePomodoro] = useState(false);
  const [currentRunningSec, setCurrentRunningSec] = useState(0);
  const [isStopPomodoro, setIsStopPomodoro] = useState(false);
  const [selectedTask, setSelectedTask] = useState();
  const [playSound, setPlaySound] = useState(false);
  const [initialStart, setIntialStart] = useState(true);
  const [btnClickDataValue, setClickDataValue] = useState();
  
  const [selectobj, sendSelectobj] = useState();
  // console.log(totalTime,"totalTime");

  const sendSelectedobj=(data)=>{
    sendSelectobj(data)
  }
  // custom hook for time
  const useCountDown = (mintues) => {
    const conRemaingTime = (seconds) =>
      `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60)}`;

    const timer = useRef();
    const remainingRef = useRef(mintues);
    const [startTimer, setTimer] = useState(false);
    const [timeFormat, setTimeFormat] = useState();
    let remaingTime = conRemaingTime(mintues);
    
     
    useEffect(() => {  
      remainingRef.current = mintues;
      let timeData = conRemaingTime(mintues)
      setTimeFormat(timeData)
// 
 
    }, [mintues]);
    
    

    // let value=parseInt(promodoCount?.pomodoro)+ parseInt(timeValue)
    // // let final=value?.replace(".",":")
    // console.log(value,"valuevaluevalue");
 
    // useEffect(()=>{
      
     
    //      console.log(timeValue,"timeValue");
    //    

    // },[timeFormat])

    // useEffect(()=>{
    //   setTotalTime(timeFormat)
    // },[timeFormat])
    // execute when button click
    const btnClick = () => {
      // if (!startTimer) {
      if (remainingRef.current === 0) remainingRef.current = mintues;
      setTimer(!startTimer);
      // } else {
      //   alert("Timer already running");
      // }
    };


    const changeTimeMode = (newSetting, oldSetting) => {
      let previousMode;

      try {
        previousMode = localStorage.getItem("previousTimerMode");
      } catch (error) {
        console.error(error);
        previousMode = typeTimer;
      }

      previousMode = previousMode !== null ? previousMode : typeTimer;

      if (newSetting.completedCyle < longBreakIntervals) {
        if (previousMode === "Pomodoro") {
          setTypeTime("Short break");
          // setIncreasePomodoro(true);
          localStorage.setItem("previousTimerMode", "Short break");
        } else if (previousMode === "Long break") {
          setTypeTime("Pomodoro");
          localStorage.setItem("previousTimerMode", "Pomodoro");
        } else {
          setTypeTime("Pomodoro");
          localStorage.setItem("previousTimerMode", "Pomodoro");
        }
      } else {
        setTypeTime("Long break");
        localStorage.setItem("previousTimerMode", "Long break");
        return true;
      }
    };

    const increaseComplete = (setting) => {
      let result = setting;
      let completePomodoroCycle = setting?.completedCyle
        ? setting.completedCyle
        : 0;
      let previousMode;
      try {
        previousMode = localStorage.getItem("previousTimerMode");
      } catch (error) {
        console.error(error);
        previousMode = typeTimer;
      }

      previousMode = previousMode !== null ? previousMode : typeTimer;

      if (previousMode === "Pomodoro" && completePomodoroCycle !== 0) {
        result = { ...setting, completedCyle: completePomodoroCycle + 1 };
        setTimerFinisher(true);
        setTimerFinish(true);
      } else if (previousMode === "Pomodoro") {
        result = { ...setting, completedCyle: completePomodoroCycle + 1 };
        setTimerFinisher(true);
        setTimerFinish(true);
      }
      const isCycleComplete = changeTimeMode(result, completePomodoroCycle);
      if (isCycleComplete) {
        result = { ...setting, completedCyle: 0 };
      }
      return result;
    };

    // start timer
    const timerStart = () => {
      // setTimerFinisher(false);
      isDarkModeFun(isDarkMode, true);
      setIncreasePomodoro(false);
      timer.current = setInterval(() => {
        const tick = document.getElementById("tick");
        const audio = document.getElementById("alarm");
        remainingRef.current -= 1;
        if (remainingRef.current <= 0) {
          setPlaySound(true);
          tick.pause();
          remaingTime = conRemaingTime(mintues);
          setTimeFormat(remaingTime);
          clearInterval(timer.current);
          // const audio = document.getElementById("alarm");
          audio.play();
          setTimer(!startTimer);
          setBtnTimerName("START");
          setIsTimerRun(false);

          isDarkModeFun(isDarkMode, false);
          let setting;
          try {
            setting = JSON.parse(localStorage.getItem("setting"));
      
          } catch (error) {
            setting = {
              pomodoro: defaultPromoTimer,
              shortBreak: defaultShortTimer,
              longBreak: defaultLongTimer,
              alarmSound: "bird",
              alarmVolume: "100",
              tickingSound: "tick1",
              tickVolume: "100",
              darkMode: false,
              longBreakIntervel: longBreakIntervals,
              autoStartPomodoro: false,
              autoStartBreak: false,
              completePomodoroCycle: 0,
            };
          }
          setting = setting
            ? setting
            : {
                pomodoro: defaultPromoTimer,
                shortBreak: defaultShortTimer,
                longBreak: defaultLongTimer,
                alarmSound: "bird",
                alarmVolume: "100",
                tickingSound: "tick1",
                tickVolume: "100",
                darkMode: false,
                longBreakIntervel: longBreakIntervals,
                autoStartPomodoro: false,
                autoStartBreak: false,
                completePomodoroCycle: 0,
              };

          let previousMode;
          try {
            previousMode = localStorage.getItem("previousTimerMode");
          } catch (error) {
            console.error(error);
            previousMode = typeTimer;
          }

          previousMode = previousMode !== null ? previousMode : typeTimer;
          // changeTimeMode(updateSetting);
          if (previousMode === "Pomodoro") {
            setTimerFinisher(true);
            if(isStopPomodoro){
              localStorage.removeItem("stopPomodoro")
              setIsStopPomodoro(false)
            }
          }

          const updateSetting = increaseComplete(setting);
          localStorage.setItem("setting", JSON.stringify(updateSetting));
          autoStart(updateSetting);
        } else {
          // audio.play();
          // setTimerFinisher(false);
          tick.play();
          remaingTime = conRemaingTime(remainingRef.current);
          setCurrentRunningSec(remainingRef.current);
          setTimeFormat(remaingTime);
        }
      }, 1000);
    };

    // auto start the timer
    const autoStart = ({ completedCyle }) => {
      setBtnTimerName("STOP");
      // setTimerFinisher(false)
      if (typeTimer === "Pomodoro" && autoBreak) {
        if (completedCyle < longBreakIntervals) {
          // setTypeTime("Short break");
          // localStorage.setItem("lastCompleted", "Pomodoro")
          timerStart();
          setTimer(true);
          remainingRef.current = mintues;
        } else {
          localStorage.setItem("lastCompleted", JSON.stringify(typeTimer));

          // setTypeTime("Long break");
          timerStart();
          setTimer(true);
          remainingRef.current = mintues;
        }
      } else if (
        (typeTimer === "Short break" || typeTimer === "Long break") &&
        autoPomodoro
      ) {
        // localStorage.setItem("lastCompleted", JSON.stringify(typeTimer))
        // setTypeTime("Pomodoro");
        timerStart();
        setTimer(true);
        remainingRef.current = mintues;
      }
    };

    // cancel Timer
    const cancelTime = () => {
      clearInterval(timer.current);
      remainingRef.current = mintues;
      remaingTime = conRemaingTime(mintues);
      setTimeFormat(remaingTime);
      setTimer(false);
    };

    const falseTimeFinished = () => setTimerFinisher(false);

    useEffect(() => {
      if (startTimer) {
        if (playSound) {
          const alarm = document.getElementById("alarm");
          alarm.play();
          setPlaySound(false);
        }
        setTimerFinisher(false);
        setBtnTimerName("STOP");
        setIsTimerRun(true);
        timerStart();
        setIntialStart(true);
        isDarkModeFun(isDarkMode, true);
      } else {
        const tick = document.getElementById("tick");
        tick.pause();
        const alarm = document.getElementById("alarm");
        alarm.pause();
        setBtnTimerName("START");
        clearInterval(timer.current);
        isDarkModeFun(isDarkMode, false);
      }
      return () => {
        clearInterval(timer.current);
        isDarkModeFun(isDarkMode, false);
      };
    }, [startTimer]);

    useEffect(() => {
      setTimer(false);
      // setDefaultAlarm(new Audio(soundAlarm[0].sound))
    }, []);

    return {
      btnClick,
      time: timeFormat,
      cancelTime,
      falseTimeFinished,
    };
  };

  // call custom hook
  let defaultTimer =  typeTimer == "Short break"? defaultShortTimer: typeTimer == "Long break"?defaultLongTimer:defaultPromoTimer
  const { btnClick, time, cancelTime, falseTimeFinished } = useCountDown(defaultTimer * 60);
  
  const btnClickData=(data)=>{
    btnClick(data)
    
    setClickDataValue(data)

  }

  // const {audio}= useAudioPlay()

  // buttonValue from Timerbtn
  const callbackTimer = (Btnvalue) => {
   
    localStorage.setItem("previousTimerMode", Btnvalue);
    if (!isTimerRun) {
      setTypeTime(Btnvalue);
      // cancelTime();
      if (Btnvalue === "Pomodoro") {
        const stopPomodoroTime = localStorage.getItem("stopPomodoro");
        if (stopPomodoroTime) {
          let convertMintues = stopPomodoroTime / 60;
          setDefaultPromoTime(convertMintues);
        }
      }
    } else {
      if (confirm("Do you want change the task")) {
        cancelTime();
        setIsTimerRun(false);
        setTypeTime(Btnvalue);
        if (Btnvalue !== "Pomodoro") {
          localStorage.setItem("stopPomodoro", currentRunningSec);
        }
        setBtnTimerName("START");
      } else {
      }
    }
  };

  // callback from task to change timer finished false

  // const timerFinishedFun =()=>setTimerFinisher(false)

  // change the Timer seonds
  const changeTimer = () => {
    try {
      let {
        pomodoro,
        shortBreak,
        longBreak,
        tickingSound,
        tickVolume,
        darkMode,
        alarmSound,
        alarmVolume,
        longBreakIntervel,
        autoStartBreak,
        autoStartPomodoro,
      } = JSON.parse(localStorage.getItem("setting"));
      let stopPomodoro = localStorage.getItem("stopPomodoro");

      // change src and volume for audio tag ticking
      const tick = document.getElementById("tick");
      tick.src = timerRuningSound[tickingSound];
      if (tickVolume == 100) tick.volume = `1.0`;
      else tick.volume = `0.${tickVolume}`;

      // change src and volume for audio tag audio
      const alarm = document.getElementById("alarm");
      alarm.src = soundAlarm[alarmSound];
      if (alarmVolume == 100) alarm.volume = "1.0";
      else alarm.volume = `0.${alarmVolume}`;

      setDefaultRunningSound(tickingSound);
      setDefaultAlarm(longBreak);
      setIsDarkMode(darkMode);
      setLongBreakInterval(longBreakIntervel);
      setAutoStartPomodoro(autoStartPomodoro);
      setAutoStartBreak(autoStartBreak);

      if (stopPomodoro && typeTimer === "Pomodoro") {
        // setDefaultPromoTime(pomodoro);
        if (stopPomodoro) {
          let convertMintues = stopPomodoro / 60;
          setDefaultPromoTime(pomodoro);
          setIsStopPomodoro(true);
        }
      } else {
        switch (typeTimer) {
          case "Pomodoro":
            if (pomodoro)  setDefaultPromoTime(pomodoro);
            break;
          case "Short break":
            if (shortBreak) setDefaultShortTime(shortBreak);
            break;
          case "Long break":
            if (longBreak)  setDefaultLongTime(longBreak);
            break;
          case "alarmSound":
            if (alarmSound) setDefaultAlarm(alarmSound);
              
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.error("no local data");
    }
  };
  const chatContainer = useRef();
  useEffect(() => {
    changeTimer();
    if (playSound) {
      const alarm = document.getElementById("alarm");
      alarm.play();
      setPlaySound(false);
    }

    // localStorage.setItem("lastCompleted",)
  }, [typeTimer, report,upSetting]);


  const sendSelectedCard=(data)=>{
    setSelectedTask(data)

  }
  const sendCallUseEffect=(data)=>{
    sendCallUseEffectData(data)
    // btnClick("STOP")
   

   
      // setTotalTime(prevTotalTime => prevTotalTime + elapsedTime);


      let now = new Date();
      now.setMinutes(now.getMinutes() - 30);
      now = new Date(now);

  }


    // const notify = () => {
    //   toast.info("Hang on  Minute Image Converting!", {
    //     position: toast.POSITION.TOP_RIGHT,
    //   });
    // }
   

    useEffect(()=>{
     let initialSetting = JSON.parse(localStorage.getItem("setting"))
      let setting={
        pomodoro: 25,
        shortBreak: 5,
        longBreak: 15,
        alarmSound: "bird",
        alarmVolume: "100",
        tickingSound: "tick1",
        tickVolume: "100",
        darkMode: false,
        longBreakIntervel: 3,
        autoStartPomodoro: false,
        autoStartBreak: false,
      }
      if(!initialSetting){
        localStorage.setItem("setting", JSON.stringify(setting));
      }
     
    },[])
  
  
  
  
  
  
  useEffect(()=>{
    sendTypeTimer(typeTimer)
},[typeTimer])








  return (
    <React.Fragment>
      <Head>
        <title>
          {time} | {typeTimer}
        </title>
      </Head>

      {/* <div className="h-[90vh] flex flex-col justify-evenly pt-4 pb-4 items-center">
        <div className="bg-white bg-opacity-[41%] h-[35vh] rounded-3xl w-[80%] flex flex-col content-center">
      
          <div
            className={`flex justify-between items-center w-full 
         h-[10vh] rounded-tl-3xl rounded-tr-3xl`}
          >
            {buttonLenght.map((btnValue, index) => (
              <React.Fragment key={index}>
                <TimerBtn
                  btnName={btnValue}
                  btnStyle=" rounded-lg text-white text-opacity-90"
                  timer={callbackTimer}
                  selected={typeTimer}
                />
              </React.Fragment>
            ))}
          </div>
          <div className="flex flex-col h-[25vh]">
            <div className="flex justify-center text-center h-[15vh]">
              <p className="text-white font-semibold text-[100px]">{time}</p>
            </div>
            <div className="flex justify-center items-center h-[10vh]">
              <TimerBtn
                btnName={btnTimerName}
                btnStyle="border-2 border-white border-opacity-70 rounded-lg text-black text-opacity-90"
                timer={btnClick}
                isTimerFinished={timerFinished}
              />
            </div>
          </div>
          <audio id="audio">
            <source src={`${soundAlarm[defaultAlarm]}`} type="audio/wav" />
          </audio>
        </div>
        <div className="w-full">
          <Task
            timeType={typeTimer}
            isTimerFinished={timerFinished}
            changeTimerFalse={"timerFinishedFun"}
          />
        </div>
      </div> */}
      <div className={`${moduleStyle.noScrollbar} flex justify-center`}  ref={chatContainer}>
        <div className="flex flex-col h-[90vh] pt-10 w-[95%] md:w-[50%] lg:w-[35%] xl:w-[34%]">
          <div className="bg-white bg-opacity-20 h-[35vh] rounded-3xl w-full flex flex-col items-center">
            <div className="flex justify-evenly w-full pt-4 h-[10vh] ">
              {buttonLenght.map((btnValue, index) => (
                <div key={index}>
                  <TimerBtn
                    btnName={btnValue}
                    btnStyle=" rounded-lg text-white text-opacity-90 font-[sf-pro-medium] text-[13px]"
                    timer={callbackTimer}
                    selected={typeTimer}
                  />
                </div>
              ))}
            </div>
            <div className="h-[13vh] w-full flex justify-center text-center items-center">
          
              <p className="text-white text-[10vh] text-center font-[sf-pro-bold]" >
                {time}
              </p>
            </div>
            <div className="flex justify-center items-center h-[11vh] w-full">
              <TimerBtn
              selectobj={selectobj}
              selectedTask={selectedTask}
                btnName={btnTimerName}
                btnStyle={`bg-white  ${typeTimer=="Short break" ? "text-[#33718a]" : typeTimer=="Long break" ? "text-[#124970]" : "text-[#AB47BC]" }  text-[#AB47BC] rounded-3xl 
              text-black text-opacity-90 h-[calc(11vh/2)] w-[calc(80%/3)] font-[Sf-pro-semibold] `}
                timer={btnClickData}
                isTimerFinished={timerFinished}
              />
             
            </div>
          </div>
          <audio id="alarm">
            <source src={`${soundAlarm[defaultAlarm]}`} type="audio/wav" />
          </audio>
          <audio id="tick" controls={false} hidden="hidden" loop>
            <source
              src={`${timerRuningSound[defaultRunnerSound]}`}
              type="audio/mp3"
            />
          </audio>
          <div className="">
            <Task
            sendSelectedobj={sendSelectedobj}
            typeTimer={typeTimer}
            sendCallSettingPage={sendCallSettingPage}
            btnClickDataValue={btnClickDataValue}
            sendCallUseEffect={sendCallUseEffect}
            time={time}
            sendSelectedCard={sendSelectedCard}
            report={report}
            chatContainer={chatContainer}
            useEffectCallData={useEffectCallData}
            promodoCount={promodoCount}
              timeType={typeTimer}
              isTimerFinished={timerFinished}
              changeTimerFalse={"timerFinishedFun"}
              isIncreasePomodoro={increasePomodoroCount}
              falseTimeFinished={falseTimeFinished}
            />
          </div>
        </div>
      </div>  
    </React.Fragment>
  );
  // }
};

export default React.memo(PomodoroTimer);
