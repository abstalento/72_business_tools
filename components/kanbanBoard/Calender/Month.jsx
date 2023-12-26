import React from "react";
import Day from "./Day";
// import Date from "./daystyle";




 const Month=({month})=> {
  return (
    <div className="flex mt-[3%] w-[100%] justify-center ">
      <div className="w-[90%]">
      <div className=" grid grid-cols-7 pl-5 grid-rows-7 bg-[#FFFFFF] justify-items-center rounded-3xl">
      {month.map((row, i) => (
        <React.Fragment key={i} className="">
          {row.map((day, idx) => (
            <Day day={day} key={idx} rowIdx={i} />
            // <Date day={day} key={idx} rowIdx={i}/>
          ))}
        </React.Fragment>
      ))}
      </div>
      </div>
    </div>
  );
}

export default Month;