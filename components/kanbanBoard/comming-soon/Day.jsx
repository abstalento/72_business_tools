import React, { useState } from "react";

const Day = () => {

    const [dateVal,setDateVal] = useState(1)
    const [dayVal , setDayVal] = useState(1)
    
    const dayMonth = new Date()
    const date = dayMonth.getDate()
    const dayNameE1 = dayMonth.toLocaleString('en',{weekday : 'short'}).toLocaleUpperCase();
  
  
    return (
      <>
       
        
       <div className="">
        <h1>Day Page</h1>
        <div className="flex">
        <button>Prev</button>
        <div className="flex-col">
        {/* <h1>{remainingDays} </h1>
        <h1>{totalDays}</h1>
        <h1>{today}</h1> */}
        </div>
        <button>Next</button>
        </div>
    
       </div>

    
    
      </>
    );
  };
  
  export default Day;