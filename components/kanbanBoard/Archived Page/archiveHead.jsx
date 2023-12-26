import { data } from "autoprefixer";
import React, { useEffect, useState } from "react";
import { Services } from "../../../services/kanbanBoard/service";
import ListDesign from "../listviewpage/listDesign";

import ListView from "../listviewpage/listView";
import ArchivePage from "./ArchivedPage";



const ArchiveHeader = ({showModalPopup,clodeMenuitem, setShowModalClose,gridValue,projectUuidData, setUseEffectCall, searchValue , sendCountLength, sendComCountLength, selectDayValue, sendGrid, sendPending}) => {
   
   const closeMenu=()=>{
      clodeMenuitem()
   }
   return (
      <>
         <div className=" bg-[#F4F5FA] h-[100vh]  " onClick={closeMenu}>
             
               <ArchivePage  setUseEffectCall={setUseEffectCall} search={searchValue} showModal={showModalPopup} onClose={() => setShowModalClose(false)} projectUuid={projectUuidData} sendCount={sendCountLength} sendComCount={sendComCountLength} selectDate={selectDayValue} />
      
            {/* // (<ListView callUseeffect={sendGrid} showModal={showModalPopup} onClose={() => setShowModalClose(false)} search={searchValue} sendvalue={projectUuidData} />) */}
         

         </div>
        
      </>
   )
}

export default ArchiveHeader