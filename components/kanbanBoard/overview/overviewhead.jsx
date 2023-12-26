import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";
import { Services } from "../../../services/kanbanBoard/service";
import ListDesign from "../listviewpage/listDesign";

import ListView from "../listviewpage/listView";

import PenProjects from "./pending";


const OverHeader = ({showModalPopup,getSearch, SearchValueData,closeSidebar, setShowModalClose,gridValue,projectUuidData, searchValue , sendCountLength, sendComCountLength, selectDateValue, sendGrid, sendPending}) => {
   
 

   return (
      <>
         <div className=" bg-[#F4F5FA] h-[100vh]  ">
            {
            sendGrid ? (<div>

               <PenProjects search={searchValue} closeSidebar={closeSidebar} getSearchChange={getSearch} showModal={showModalPopup} onClose={() => setShowModalClose(false)} projectUuid={projectUuidData} SearchValueDataValue={SearchValueData} sendCount={sendCountLength} sendComCount={sendComCountLength} selectDate={selectDateValue} />
            </div>) : (<ListView clodeMenuitem={closeSidebar} callUseeffect={sendGrid} showModal={showModalPopup} onClose={() => setShowModalClose(false)} search={searchValue} sendvalue={projectUuidData} sendComCount={sendComCountLength} sendCount={sendCountLength} />)
         }
         </div>
        
      </>
   )
}

export default OverHeader