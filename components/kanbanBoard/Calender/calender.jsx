import React, { useState, useContext, useEffect } from "react";
import CalenderHead from "./CalenderHead";
import Month from "./Month";
import { getMonth } from "./util";
import GlobalContext from "./GlobalContext";
import EventModal from "./EventModal";
import DayPage from "./DayPage/DayPage";





const Calender = ({changingPath,closemenuitem}) => {

  const [currenMonth, setCurrentMonth] = useState(getMonth());

  const { monthIndex, showEventModal } = useContext(GlobalContext)

  // const [PageRender,setPageRender]=useState('Calender');


  // const changingPath=(data)=>{
  //   setPageRender(data)
  // }

  const sendValue=(data)=>{
    setPageRender(data)
  }

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);

  return (
    <div className="w-auto h-screen flex-cols items-center overflow-auto hide-scroll-bar scroll-smooth scrollBar bg-[#F5F7F9]" onClick={()=>closemenuitem(false)}>

      {
        changingPath==='Calender'?(<><div>
          {showEventModal && <EventModal />}
          <CalenderHead changingPath={changingPath}  />
          <Month month={currenMonth} />
        </div></>):(<><div>
        <DayPage sendValue={sendValue}/>
      </div></>)
      }
      
      
    </div>
  )
}

export default Calender;