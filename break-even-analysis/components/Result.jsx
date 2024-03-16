// import React from "react";
// const Result = ({ fixedCost, variableCost, pricePerUnit, quantity }) => {
//   const bepUnit = () => {
//     const result = fixedCost / (Number(pricePerUnit) - Number(variableCost));
//     return result > 0 || result < 0 ? parseFloat(result.toFixed(2)) : 0;
//   };

//   const unitValue = bepUnit();

//   const bepPrice = () => {
//     const result = (Number(fixedCost) + Number(variableCost)) / quantity;
//     return result > 0 || result < 0 ? parseFloat(result.toFixed(2)) : 0;
//   };

//   const sellingPriceValue = bepPrice();

//   return (
//     <>
//       <div className="bg-white w-[100%] h-[55vh] rounded-3xl block justify-even shadow-lg shadow-slate-700/40">
//         <div className="ml-[2%]">
//           <h1 className="font-bold text-[30px] font-sans">
//             BEP Calculation Output
//           </h1>
//         </div>

//         <div className="flex flex-row w-full">
//           {/* Left chart side */}
//           <div className="w-[75%] h-[48vh] relative block">
//             <div className="block h-[100%] w-[100%] absolute justify-center items-center">
//               <div className="border-2 border-black ml-[2%] mr-0 w-[90%] h-[100%]"></div>
//             </div>
//           </div>

//           {/* Right result Side */}
//           <div className="w-[25%] h-[45vh]">
//             <div className="flex flex-col w-[100%] h-full justify-center">
//               <div className="w-[85%] bg-slate-500/15 rounded-lg">
//                 <h1 className="text-lg font-bold ml-[10%] ">Result</h1>
//                 <p className="text-[12px] font-medium ml-[10%] text-justify w-[80%] break-words p-2">
//                   Enter your fixed costs, Input variable cost per unit, Specify
//                   the selling price per unit. Breakeven point is where total
//                   revenue equals total costs. below this point, you incur
//                   losses; above, you male profits.
//                 </p>
//               </div>

//               <div className="bg-slate-500/15 w-[85%] h-[14vh] mt-[5%] rounded-lg">
//                 <p className="font-sans font-medium mt-[1%] flex flex-col items-center text-sm">
//                   Your Break Even Point is:
//                 </p>
//                 <p className="text-center font-sans text-[25px] leading-8 font-bold">
//                   {quantity == 0 ? unitValue : sellingPriceValue}
//                   <span className="ml-[5%]">
//                     ({quantity == 0 ? "Unit" : "Price"})
//                   </span>
//                 </p>
//               </div>
//               <div>
//                 <button className="text-white bg-red-600 w-[85%] p-[3%] mt-[5%] rounded-lg font-bold text-2xl">
//                   Download
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Result;

import React from "react";
import jsPDF from "jspdf";
const Result = ({ fixedCost, variableCost, pricePerUnit, quantity }) => {
  const bepUnit = () => {
    const result = fixedCost / (Number(pricePerUnit) - Number(variableCost));
    return result > 0 || result < 0 ? parseFloat(result.toFixed(2)) : 0;
  };

  const unitValue = bepUnit();

  const bepPrice = () => {
    const result = (Number(fixedCost) + Number(variableCost)) / quantity;
    return result > 0 || result < 0 ? parseFloat(result.toFixed(2)) : 0;
  };

  const sellingPriceValue = bepPrice().toString();

  function downloadPdf() {
    const doc = new jsPDF();
    doc.setFillColor(253, 221, 154);
    doc.rect(
      0,
      0,
      doc.internal.pageSize.width,
      doc.internal.pageSize.height,
      "F"
    );
    doc.text(80, 10, "Break Even Analysis");
    doc.text(20, 20, `Fixed Cost: ${fixedCost}`);
    doc.text(20, 30, `Variable Cost: ${variableCost}`);
    if (pricePerUnit > 0) {
      doc.text(20, 40, `Price Per Unit: ${pricePerUnit}`);
      doc.text(20, 50, `Result: ${unitValue} Unit`);
    } else if (quantity > 0) {
      doc.text(20, 40, `Total Number of Units: ${quantity}`);
      doc.text(20, 50, `Result: ${sellingPriceValue} Price`);
    }
    if (sellingPriceValue > 0) doc.save("BEA_report.pdf");
  }

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
                <h1 className="text-lg font-bold ml-[13%] ">Result</h1>
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
                  {quantity == 0 ? unitValue : sellingPriceValue}
                  <span className="ml-[5%]">
                    ({quantity == 0 ? "Unit" : "Price"})
                  </span>
                </p>
              </div>
              <div>
                <button
                  className="text-white bg-red-600 w-[85%] p-[3%] mt-[5%] rounded-lg font-bold text-2xl"
                  onClick={downloadPdf}
                >
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
