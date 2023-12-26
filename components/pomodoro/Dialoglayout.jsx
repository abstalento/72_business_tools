import { Dialog, Stack, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import PouchDB from "pouchdb";
import BirdSound from "../../public/src/audio/bird.wav";
import removeChar from "../../utils/removeChar";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import moduleStyle from "../../styles/Dialog.module.css";
import Image from "next/image";
const DialogLayout = ({ open, close,callSettingPageCall, callBackDialog, sendPoromodoCount }) => {
  const clickOutside = useRef();
  const [callUseEffect,setCallUseEffect ]=useState(false)
  const [setting, setSetting] = useState({});


  const [onChangeIn, setOnchangeIn] = useState(false);

  useEffect(()=>{
    sendPoromodoCount(setting)
  },[setting,callUseEffect,callSettingPageCall])

  useEffect(()=>{
    // localStorage.setItem("setting", JSON.stringify(setting));
    let settingData = JSON.parse(localStorage.getItem("setting"));
    setSetting(settingData)
  },[])



  // get time for timer
  const inputField = (event) => {
    let { name, value } = event.target;
    value = removeChar(value);
    setSetting({ ...setting, [name]: value });
    setOnchangeIn(true);

  };

  // select sound for alarm and running sound
  const alarmSelect = (event) => {
    const { value, name } = event.target;
    setSetting({ ...setting, [name]: value });
    setOnchangeIn(true);
  };

  // Style for toggle buttons
  const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: "flex",
    "&:active": {
      "& .MuiSwitch-thumb": {
        width: 15,
      },
      "& .MuiSwitch-switchBase.Mui-checked": {
        transform: "translateX(9px)",
      },
    },
    "& .MuiSwitch-switchBase": {
      padding: 2,
      "&.Mui-checked": {
        transform: "translateX(12px)",
        color: "#fff",
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor:
            theme.palette.mode === "dark" ? "#177ddc" : "#1890ff",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(["width"], {
        duration: 200,
      }),
    },
    "& .MuiSwitch-track": {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === "dark"
          ? "rgba(255,255,255,.35)"
          : "rgba(0,0,0,.25)",
      boxSizing: "border-box",
    },
  }));

  // Auto restart the timer
  const autoStart = (event) => {
    const { name, value } = event.target;
    setSetting({ ...setting, [name]: !setting[name] });
    setOnchangeIn(true);
    // console.log(name)
  };

  // Enable Dark mode for running timer
  const enableDarkMode = (event) => {
    const { name } = event.target;
    setSetting({ ...setting, [name]: !setting.darkMode });
    setOnchangeIn(true);
  };

  // use to update the localStorage
  useEffect(() => {
    if (onChangeIn) {
      localStorage.setItem("setting", JSON.stringify(setting));
      setOnchangeIn(false);
    }
  }, [setting]);

  // update the statte
  useEffect(() => {
    try {
      const {
        pomodoro,
        shortBreak,
        longBreak,
        darkMode,
        tickingSound,
        tickVolume,
        alarmSound,
        alarmVolume,
        autoStartPomodoro,
        autoStartBreak,
        longBreakIntervel,
      } = JSON.parse(localStorage.getItem("setting"));
      setSetting({
        ...setting,
        pomodoro,
        shortBreak,
        longBreak,
        darkMode,
        tickingSound,
        tickVolume,
        alarmSound,
        alarmVolume,
        autoStartPomodoro,
        autoStartBreak,
        longBreakIntervel,
      });
    } catch (error) {
      console.error(error);
    }
    return () => {
      callBackDialog(true);
    };
  }, [open]);

  return (
    <>

{
  open && 
  
  <div className="bg-[#080808]   h-screen  flex justify-around items-center z-50 absolute inset-0 bg-opacity-[0.8]"ref={clickOutside}  >
  <div className="bg-white flex justify-around items-center lg:w-[30%] w-[85%] xl:w-[25%] md:w-[40%] h-[80vh] rounded-md">
  <div className={moduleStyle.noScrollbar}>
      <div
        className={`pl-5 pr-5 overflow-visible moduleStyle.noScrollbar flex flex-col justify-evenly h-[80vh]`}
      >
        {/* Timer setup */}
        <div className="h-[10vh] flex flex-col justify-evenly">
          <div className="flex justify-between"  >
          <p className="font-[sf-pro-medium]">Timer Setup</p>
          <Image
         
                                        width="20px"
                                        height="25px"
                                        src="/icons/Close-button.svg"
                                        className="hover:cursor-pointer"
                                        onClick={close}
                                       
                                        />
          </div>
          <hr
            style={{ borderTop: "dashed 2px ", opacity: "30%", borderColor: "#707070" }}
            className="border-opacity-20"
          />
          
        </div>

        {/* set time */}
        <div className="h-[20vh] flex flex-col justify-evenly">
          <p className="font-[sf-pro-medium]">Time (Minutes)</p>
          <div className="w-full flex h-[10vh] justify-evenly">
            <div className="flex flex-col w-[calc(80%/3)] justify-evenly ">
              <p className="text-[9px] text-[#00000080] font-[sf-pro-regular]">
                Pomodoro
              </p>
              <div className="bg-[#0404041A] w-full rounded-md h-[5vh]">
                <input
                  type="text"
                  value={setting.pomodoro}
                  onChange={inputField}
                  name="pomodoro"
                  placeholder="mintues"
                  className="bg-transparent w-full indent-2 h-full"
                />
              </div>
            </div>
            <div className="flex flex-col w-[calc(80%/3)] justify-evenly">
              <p className="text-[9px] text-[#00000080] font-[sf-pro-regular]">
                Short Break
              </p>
              <div className=" bg-[#0404041A]  w-full rounded-md h-[5vh]">
                <input
                  type="text"
                  value={setting.shortBreak}
                  onChange={inputField}
                  name="shortBreak"
                  placeholder="mintues"
                  className="bg-transparent w-full indent-2 h-full"
                />
              </div>
            </div>
            <div className="flex flex-col w-[calc(80%/3)] justify-evenly">
              <p className="text-[9px] text-[#00000080] font-[sf-pro-regular]">
                Long Break
              </p>
              <div className=" bg-[#0404041A] w-full rounded-md h-[5vh]">
                <input
                  type="text"
                  value={setting.longBreak}
                  onChange={inputField}
                  name="longBreak"
                  placeholder="mintues"
                  className="bg-transparent w-full indent-2 h-full"
                />
              </div>
            </div>
          </div>
          <hr
            style={{ borderTop: "dashed 2px", opacity: "30%", borderColor: "#707070" }}
            className="border-opacity-20 "
          />
        </div>
        {/* <p onClick={close}>Close</p> */}
        {/* <div>
        <p>Pomodoro: </p>
        <input
          type="text"
          value={setting.pomodoro}
          onChange={inputField}
          name="pomodoro"
          placeholder="mintues"
          className="border-2 border-black border-opacity-30 rounded-lg"
        />
      </div> */}

        {/* <div>
        <p>Short Break: </p>
        <input
          type="text"
          value={setting.shortBreak}
          onChange={inputField}
          name="shortBreak"
          placeholder="mintues"
          className="border-2 border-black border-opacity-30 rounded-lg"
        />
      </div> */}

        {/* <div>
        <p>Long Break: </p>
        <input
          type="text"
          value={setting.longBreak}
          onChange={inputField}
          name="longBreak"
          placeholder="mintues"
          className="border-2 border-black border-opacity-30 rounded-lg"
        />
      </div> */}

        <div className="flex justify-between items-center h-[8vh]">
          <div>
            <p className="font-[sf-pro-medium]">Auto Start Break? </p>
          </div>
          <div>
            <Stack direction="row" spacing={1} alignItems="center">
              <AntSwitch
                name="autoStartBreak"
                checked={setting.autoStartBreak}
                onClick={autoStart}
                // value={setting.autoStartBreak}
                inputProps={{ "aria-label": "ant design" }}
              />
            </Stack>
          </div>
        </div>
        <hr
          style={{ borderTop: "dashed 2px", opacity: "30%",borderColor: "#707070" }}
          className="border-opacity-20"
        />

        <div className="flex justify-between items-center h-[8vh]">
          <div>
            <p className="font-[sf-pro-medium]">Auto Start Pomodoros? </p>
          </div>
          <div>
            <Stack direction="row" spacing={1} alignItems="center">
              <AntSwitch
                name="autoStartPomodoro"
                onClick={autoStart}
                checked={setting.autoStartPomodoro}
                inputProps={{ "aria-label": "ant design" }}
              />
            </Stack>
          </div>
        </div>
        <hr
          style={{ borderTop: "dashed 2px", opacity: "30%", borderColor: "#707070" }}
          className="border-opacity-20"
        />

        {/* Long Break intervel */}
        <div className="flex justify-between h-[10vh]  items-center">
          <div>
            <p className="font-[sf-pro-medium]">Long Break intervel</p>
          </div>
          <div className="bg-[#0404041A] w-[30%] h-[5vh] rounded-md">
            <input
              type="text"
              value={setting.longBreakIntervel}
              onChange={inputField}
              name="longBreakIntervel"
              // placeholder="mintues"
              className="bg-transparent w-full indent-2 h-full"
            />
          </div>
        </div>
        <hr
          style={{ borderTop: "dashed 2px", opacity: "30%", borderColor: "#707070" }}
          className="border-opacity-20"
        />

        {/* Alarm sound */}
        <div className="flex flex-col justify-evenly h-[15vh]">
          <div className="w-full">
            <p className="font-[sf-pro-medium]">Alarm Sound</p>
          </div>
          <div className="flex justify-between pl-3 pr-3">
            <div className="bg-[#0404041A] w-[40%] h-[5vh] rounded-md pl-2 pr-2">
              <select
                name="alarmSound"
                defaultValue={setting.alarmSound}
                onClick={alarmSelect}
                className="bg-transparent w-full h-full font-[sf-pro-regular] text-black text-opacity-40"
              >
                <option value="bird">BirdSound</option>
              </select>
            </div>
            {/* <div className="bg-[#0404041A] w-[23%] h-[5vh] rounded-md flex text-center">
              <input
                type="text"
                // value={setting.pomodoro}
                // onChange={inputField}
                name="pomodoro"
                placeholder="Repeat"
                className="bg-transparent w-full indent-2 font-[sf-pro-regular]"
              />
            </div> */}
            <div className="w-[23%] h-[5vh] rounded-md flex text-center">
              <input
                type="range"
                value={setting.alarmVolume}
                onChange={inputField}
                name="alarmVolume"
                placeholder="Volume"
                className="bg-transparent w-full indent-2 accent-slate-200"
              />
            </div>
          </div>
        </div>
        <hr
          style={{ borderTop: "dashed 2px", opacity: "30%", borderColor: "#707070" }}
          className="border-opacity-20"
        />

        {/* Ticking Sound */}
        <div className="flex flex-col justify-evenly h-[15vh]">
          <div className="w-full">
            <p className="font-[sf-pro-medium]">Ticking Sound</p>
          </div>
          <div className="flex justify-between pl-3 pr-3">
            <div className="bg-[#0404041A] w-[40%] h-[5vh] rounded-md pl-2 pr-2">
              <select
                name="tickingSound"
                defaultValue={setting.tickingSound}
                onClick={alarmSelect}
                className="bg-transparent w-full h-full font-[sf-pro-regular] text-black text-opacity-40"
              >
                <option value="tick1">Ticking one</option>
                <option value="tick2">Ticking Two</option>
              </select>
            </div>
            {/* <div className="bg-[#0404041A] w-[23%] h-[5vh] rounded-md flex text-center">
              <input
                type="text"
                // value={setting.pomodoro}
                onChange={inputField}
                name="pomodoro"
                placeholder="Repeat"
                className="bg-transparent w-full indent-2"
              />
            </div> */}
            <div className="w-[23%] h-[5vh] rounded-md flex text-center">
              <input
                type="range"
                value={setting.tickVolume}
                onChange={inputField}
                name="tickVolume"
                placeholder="Volume"
                className="bg-transparent w-full indent-2 accent-slate-200 "
              />
            </div>
          </div>
        </div>
        <hr
          style={{ borderTop: "dashed 2px", opacity: "30%",borderColor: "#707070" }}
          className="border-opacity-20"
        />

        {/* Dark Mode */}
        <div className="flex justify-between items-center h-[12vh]">
          <div>
            <p className="font-[sf-pro-medium]">Dark Mode When running</p>
          </div>
          <div>
            <Stack direction="row" spacing={1} alignItems="center">
              {/* <Typography>Off</Typography> */}
              <AntSwitch
                // defaultChecked
                name="darkMode"
                checked={setting.darkMode}
                onClick={enableDarkMode}
                inputProps={{ "aria-label": "ant design" }}
              />
              {/* <Typography>On</Typography> */}
            </Stack>
          </div>
        </div>
      </div>
    </div>
  </div>
 </div>
}


      
 
    </>
  );
};

export default DialogLayout;
