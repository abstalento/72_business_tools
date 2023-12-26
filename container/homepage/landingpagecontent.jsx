import Business from "./BusinessTool";
import { React, useState } from "react";
import { business, feature, management, sales } from "../../utils/landing";
import BusinessTool from "./BusinessTool";
import Visitors from "../Visitors/visitors";
export default function Landingpagecontent({ data, selectDropDown }) {
  const [searchData, setSearchData] = useState("");
  const [dropdownData, setDropdownData] = useState("All");
  return (
    <div className="">
      {(selectDropDown === "Finance" || selectDropDown === "All") && (
        <BusinessTool
          data={business}
          searchData={searchData}
          style={business}
          filterData={data}
        />
      )}
      {(selectDropDown === "Productivity" || selectDropDown === "All") && (
        <BusinessTool data={sales} searchData={searchData} filterData={data} />

      )}
       {(selectDropDown === "Management" || selectDropDown === "All") && (
        <BusinessTool data={management} searchData={searchData} style={management} filterData={data} />

      )}
      <div className="w-[100%]  flex justify-center pt-[35px] ">
         <div>
           <div className="text-center text-[20px] opacity-100 font-['sf-pro-bold'] text-black">Views</div>
           <div>
             <Visitors/>
           </div>
         </div>
      </div>

<div className="flex justify-center flex-col w-[100%] pt-[25px] pb-[20px]">
     <p className="text-center text-[20px] opacity-100 font-['sf-pro-bold'] text-black">About 72 Business Tools </p> 
     <div className="flex justify-center">
     <div className= "text-center text-md w-[90%] lg:w-[67%] xl:w-[50%]  font-['sf-pro-light'] text-black opacity-70">
     <p> 72 Business Tools is a quality product from <a target="_blank" className="font-bold" href="https://alphabsolutions.com/"  > Alpha Business Solutions </a> made in Tirunelveli, Tamilnadu, India.</p>
    <p > No Sign-In is required, Data is stored in your device. Developed with Next.js for optimised loading speeds.</p>
    <p> We are planning to provide the users with to access all tools for Free, as FREE software is a fundamental part of the software ecosystem and it is important for startup society as a whole. We are planning to give 72 software tools. Now we are launching with 14 tools & 58 More tools are on the way.</p>
    <p> <span className="font-semibold text-md">If you want to automate your business process please get in touch with us. &nbsp;<a href="mailto:connect@alphabsolutions.com"><span className="font-semibold underline text-md" >connect@alphabsolutions.com </span></a></span> </p> </div> 
     </div>
      </div>
      
       

      
    </div>
  );
}
