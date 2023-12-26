import React, { useEffect, useState } from "react";
import Services from "../../../services/kanbanBoard/service";
// import { Services } from "../../../services/kanbanBoard/service";
import Createnewprojectpopup from "../createnewpopup/Createnewprojectpopup";
import ListHeader from "./header";
import ListDesign from "./listDesign";

const ListView=({showModal,onClose,clodeMenuitem, search,callUseeffect,sendvalue, sendCount,sendComCount})=>{

const [callback,setCallback]=useState(0)
const [dbData, setDbData]=useState()

    const pageChange=(data)=>{

        sendvalue(data)
    }
const clodeMenu=()=>{
    clodeMenuitem()
}
    const onUseEffectCall = () => {
        setCallback((preState)=>++preState)
    }

    useEffect(()=>{
        (async function Change() {
             await Services.getKanbanBoardNewProjectHistory()
             await Services.getKanbanBoardNewProjectHistory()
             const kanbanBoardNewProjectHistory = await Services.getKanbanBoardNewProjectHistory()
              if(kanbanBoardNewProjectHistory.data){
                 setDbData(kanbanBoardNewProjectHistory.data)
              }else{
                setDbData()
              }
        })()
     },[callback])

    return(
        <div className="h-screen w-auto  flex flex-col justify-center items-center" onClick={clodeMenu}>
            
            {/* <ListHeader></ListHeader> */}

            {
                showModal==true ? (<>  <Createnewprojectpopup CloseButton={onClose} onUseEffectCall={onUseEffectCall}/> </>) : null
            }

{
        dbData == undefined ? 
      <div className="bg-[#f4f5fa] h-[100vh] w-full flex justify-center items-center">
          <h1 className="text-[30px] font-[sfpro-bold]  ">No Project Found !</h1>
      </div>:<>
      <ListDesign showModal={showModal} useEffectCall={callback} callUseeffect={callUseeffect} onUseEffectCall={onUseEffectCall} search={search} pageChange={pageChange} sendCount={sendCount} sendComCount={sendComCount}/>
      </>
      }
          
            
        </div>
    )
}
export default ListView;