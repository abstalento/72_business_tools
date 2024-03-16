import React from "react";

function Result({ total }) {
  // Function to format rupees with commas
  const formatRupees = (amount) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Function to convert rupees into words
  const rupeesToWords = (amount) => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];

    const convertToWords = (num) => {
      let words = '';
      if (num >= 10000000) {
        words += convertToWords(Math.floor(num / 10000000)) + ' Crore ';
        num %= 10000000;
      }
      if (num >= 100000) {
        words += convertToWords(Math.floor(num / 100000)) + ' Lakh ';
        num %= 100000;
      }
      if (num >= 1000) {
        words += convertToWords(Math.floor(num / 1000)) + ' Thousand ';
        num %= 1000;
      }
      if (num >= 100) {
        words += convertToWords(Math.floor(num / 100)) + ' Hundred ';
        num %= 100;
      }
      if (num >= 20) {
        words += tens[Math.floor(num / 10)] + ' ';
        num %= 10;
      }
      if (num >= 10) {
        words += teens[num - 10] + ' ';
        num = 0;
      }
      if (num > 0) {
        words += ones[num] + ' ';
      }
      return words;
    };

    if (amount === 0) {
      return "Zero Rupees Only";
    }

    return convertToWords(Math.floor(amount)) + ' Rupees Only';
  };

  // function downloadPdf() {
  //   const doc = new jsPDF();
  //   doc.text(75, 10, `Employee Turnover Cost Calculator`);
  //   doc.text(20, 20, `Employee Position: ${position}`);
  //   doc.text(20, 30, `Cost1: ${}`);
  //   doc.text(20, 40, `Total Expenses: ${expenses}`);
  //   doc.text(20, 50, `Revenue: ${revenue}`);
  //   doc.text(20, 60, `Net Profit Margin: ${profitMargin} %`);
  //   doc.save("NetProfit_report.pdf");
  // }

  return (
    <div className="w-full justify-center">
      <div className="flex mt-[5%] justify-center">
        <p>Total Turnover Cost</p>
      </div>
      <div className="w-full justify-center flex">
        <div className="justify-center text-center border-2 border-pink-600 bg-white h-[23vh] w-[80%] rounded-lg">
          <div className="h-[55%] flex items-end w-[100%] justify-center">
            {/* Display formatted rupees with commas */}
            <p className="text-5xl">{formatRupees(total)}</p>
          </div>
          <div>
            {/* Display rupees in words */}
            <p className="">{rupeesToWords(total)}</p>
          </div>
        </div>
      </div>
      <div className="h-[16vh] flex items-center justify-center">
        {/* <input type="button" className="bg-[#B31bA6] text-white w-[40%] h-[7vh] rounded-lg text-2xl" value="Download" /> */}
        {/* <button
          className='bg-[#B31bA6] text-white w-[40%] h-[7vh] rounded-lg text-2xl'>
          Download
        </button> */}
      </div>
      <div className="w-full justify-center flex">
        <div className="justify-center text-center border-2 border-gray-400 bg-white h-[20vh] w-[80%] rounded-lg">
          <div className="flex w-[100%] justify-center">
            <p className="text-xl mt-[3%] font-semibold">Disclaimer</p>
          </div>
          <div>
            <p className="text-sm mt-[3%] ml-[4%] w-[85%]">That's Because Losing A Team Member Includes Added Costs Like: Advertising The Position Your Company Now Must Backfil. Onboarding The Eventual Person Who Accepts The Offer</p>
          </div>
        </div>
      </div>
      <div className="mt-[8%] flex">
        <p className="w-[57%] ml-[10%]">Privacy Policy</p>
        <p>Tearms&Conditions</p>
      </div>
    </div>
  );
}

export default Result;