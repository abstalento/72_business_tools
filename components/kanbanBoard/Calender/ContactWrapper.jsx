import React, {
    useState,
    useEffect,
    useReducer,
    useMemo,
  } from "react";
  import GlobalContext from "./GlobalContext";
  import dayjs from "dayjs";
  
  function savedEventsReducer(state, { type, payload }) {
  
    switch (type) {
      case "push":
        return [...state,payload];
      // case "update":
      //   return state.map((evt) =>
      //     evt.id === payload.id ? payload : evt
      //   );
      // case "delete":
      //   return state.filter((evt) => evt.id !== payload.id);
      default:
        throw new Error();
    }
  }
  // function initEvents() {
  //   const storageEvents = localStorage.getItem("savedEvents");
  //   const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  //   return parsedEvents;
  // }
  
  export default function ContextWrapper(props) {


    const [sendEmployee,setSendEmployee]=useState([])
    const [ sentUseffectCall,setSentUseffectCall]=useState([])
    const [ sentCalenderData, setSentCalenderData]=useState()
    const [OpenPopupPage,setOpenPopupPage]=useState(false)
    const [dashBoardData,setDashBoardData]=useState()
    const [sendCountDB, setDbCount]=useState()
    const [ changeDashBoard,setChangeDashBoard]=useState(false)
    const [CalendarData, setCalendarData ]=useState([])
    const [OpenViewPopup, setOpenViewPopup] = useState(false)
    const [getDashPopup,setGetDashPopup] = useState(false);
    const [WeekIndex, setWeekIndex] = useState();
    const [selectedCardId, setSelectedCardId]=useState()
    const [selectedCardValue, setSelectedCardValue]=useState()
    const [monthIndex, setMonthIndex] = useState(dayjs().month());
    const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
    const [daySelected, setDaySelected] = useState(dayjs());
    const [showEventModal, setShowEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [labels, setLabels] = useState([]);
    const [savedEvents, dispatchCalEvent] = useReducer(
      savedEventsReducer,[]
      // ,initEvents
    );

    const [selectedemployee,setSelectedemployee]=useState()

    const [savedAttendance, dispatchCalAttendance] = useReducer(
      savedEventsReducer,[]
      // ,initEvents
    );
  
    const filteredEvents = useMemo(() => {
      return savedEvents.filter((evt) =>
        labels
          .filter((lbl) => lbl.checked)
          .map((lbl) => lbl.label)
          .includes(evt.label)
      );
    }, [savedEvents, labels]);
  
    // useEffect(() => {
    //   localStorage.setItem("savedEvents", JSON.stringify(savedEvents));

    // }, [savedEvents]);
  
    useEffect(() => {
      setLabels((prevLabels) => {
        return [...new Set(savedEvents.map((evt) => evt.label))].map(
          (label) => {
            const currentLabel = prevLabels.find(
              (lbl) => lbl.label === label
            );
            return {
              label,
              checked: currentLabel ? currentLabel.checked : true,
            };
          }
        );
      });
    }, [savedEvents]);
  
    useEffect(() => {
      if (smallCalendarMonth !== null) {
        setMonthIndex(smallCalendarMonth);
      }
    }, [smallCalendarMonth]);
  
    useEffect(() => {
      if (!showEventModal) {
        setSelectedEvent(null);
      }
    }, [showEventModal]);
  
    function updateLabel(label) {
      setLabels(
        labels.map((lbl) => (lbl.label === label.label ? label : lbl))
      );
    }
  
    return (
      <GlobalContext.Provider
        value={{
          monthIndex,
          setMonthIndex,
          smallCalendarMonth,
          setSmallCalendarMonth,
          daySelected,
          setDaySelected,
          showEventModal,
          setShowEventModal,
          dispatchCalEvent,
          selectedEvent,
          setSelectedEvent,
          savedEvents,
          setLabels,
          labels,
          updateLabel,
          filteredEvents,
          selectedCardValue, 
          setSelectedCardValue,
          selectedCardId, 
          setSelectedCardId,
          WeekIndex,
          setWeekIndex,
          OpenViewPopup, 
          setOpenViewPopup,
          savedAttendance,
          dispatchCalAttendance,
          OpenPopupPage,
          setOpenPopupPage,
          changeDashBoard,
          setChangeDashBoard,
          selectedemployee,
          setSelectedemployee,
          getDashPopup,
          setGetDashPopup,
          CalendarData,
           setCalendarData ,
           sendCountDB,
            setDbCount,
            dashBoardData,
            setDashBoardData,
            sentCalenderData, 
            setSentCalenderData,
            sentUseffectCall,
            setSentUseffectCall,
            sendEmployee,
            setSendEmployee
        }}>
        {props.children}
      </GlobalContext.Provider>
    );
  }

