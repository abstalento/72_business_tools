import React from "react";
const Result = ({ fixedCost, variableCost, unit, sellingPrice }) => {
  const bepUnit = () => {
    const result = fixedCost / (sellingPrice * unit - variableCost * unit);
    return result > 0 || result < 0 ? parseFloat(result.toFixed(2)) : 0;
  };

  const unitValue = bepUnit();

  const bepPrice = () => {
    const result = unitValue * sellingPrice;
    return result > 0 || result < 0 ? parseFloat(result.toFixed(2)) : 0;
  };

  const sellingPriceValue = bepPrice();

  return (
    <>
      <div className="bg-white w-[100%] h-[55vh] rounded-3xl block justify-even shadow-lg shadow-slate-700/40">
        <div className="ml-[2%]">
          <h1 className="font-bold text-[30px] font-sans">
            BEP Calculation Output
          </h1>
        </div>

        <div className="flex flex-row w-full">
          {/* Left chart side */}
          <div className="w-[75%] h-[48vh] relative block">
            <div className="block h-[100%] w-[100%] absolute justify-center items-center">
              <div className="border-2 border-black ml-[2%] mr-0 w-[90%] h-[100%]"></div>
            </div>
          </div>

          {/* Right result Side */}
          <div className="w-[25%] h-[45vh]">
            <div className="flex flex-col w-[100%] h-full justify-center">
              <div className="w-[85%] bg-slate-500/15 rounded-lg">
                <h1 className="text-lg font-bold ml-[10%] ">Result</h1>
                <p className="text-[12px] font-medium ml-[10%] text-justify w-[80%] break-words p-2">
                  Enter your fixed costs, Input variable cost per unit, Specify
                  the selling price per unit. Breakeven point is where total
                  revenue equals total costs. below this point, you incur
                  losses; above, you male profits.
                </p>
              </div>

              <div className="bg-slate-500/15 w-[85%] h-[14vh] mt-[5%] rounded-lg">
                <p className="font-sans font-medium mt-[1%] flex flex-col items-center text-sm">
                  Your Break Even Point is:
                </p>
                <p className="text-center font-sans text-[25px] leading-8 font-bold">
                  {unitValue} <span className="ml-[5%]">(Unit)</span>
                </p>
                <p className="text-center font-sans text-[25px] leading-10 font-bold">
                  {sellingPriceValue} <span className="ml-[5%]">(Price)</span>
                </p>
              </div>
              {console.log(fixedCost, variableCost, unit, sellingPrice)}
              {console.log(unitValue, sellingPriceValue)}
              <div>
                <button className="text-white bg-red-600 w-[85%] p-[3%] mt-[5%] rounded-lg font-bold text-2xl">
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Result;
