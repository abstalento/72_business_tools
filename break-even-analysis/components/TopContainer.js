import React from "react";

function TopContainer() {
  return (
    <div className="relative block w-[100%] h-[23.5vh] mt-5">
      <div
        className={`relative block w-full h-auto break-before-all justify-center text-center`}
      >
        <h1
          className={`w-full capitalize font-bold text-[25px] sm:text-[30px] md:text-[50px]`}
        >
          Break even analysis calculator
        </h1>
      </div>
      <div className="absolute mt-[15px] w-[100%] flex justify-center">
        <p className=" relative w-[90%] lg:w-[49%] text-center justify-center text-sm">
          Finding your break-even point answers one of the most important
          questions for any business. When will it start making a profit?The
          break-even point calculates the number of units(or the amount of
          sales) that an organization needs to make for cost to equal income
        </p>
      </div>
    </div>
  );
}

export default TopContainer;
