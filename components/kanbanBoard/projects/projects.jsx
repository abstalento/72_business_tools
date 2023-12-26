import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { Arrow } from "../../../public/icons/arrow.svg";
import GlobalContext from "../Calender/GlobalContext";
import ProjectStatus from "./projectStatus";

const Projects = ({userData ,backPage,setclosemenuitem}) => {

  const { selectedCardValue, selectedCardId } = useContext(GlobalContext)

const [projectname,setProjectname] = useState('')

const dataFromChild = (value)=>{
    setProjectname(value)
}

const closemenuitem=()=>{
  setclosemenuitem()

}


  return (
    <>
    {
        selectedCardId == undefined ? 
      <div className="bg-[#f4f5fa]  h-[100vh] w-full flex justify-center items-center" onClick={closemenuitem}>
          <h1 className="md:text-[20px] text-[15px] font-[sfpro-bold]  ">No Project Selected !</h1>
      </div>:<>
      <div className="bg-[#F4F5FA] h-[100vh] pl-5 pt-2 pr-5" onClick={closemenuitem}>
      <div className=" m-auto mt-2">

      <div className="flex text-[11px] font-[sfpro-medium] mb-3 w-[100%] md:w-[20%]">
        <p className=" text-[#707070] font-semibold cursor-pointer" onClick={()=>backPage("Overview")}>PROJECTS</p>
        <p className="ml-2">/</p>
        <p className="text-[#773dfe] font-semibold ml-2">{projectname}</p>
      </div>
      <div>
              <ProjectStatus  SaveCallBackData={dataFromChild} closemenuitem={closemenuitem}/> 
           
      </div>
      </div>
    </div>
      </>
      }
    </>
    
  );
};

export default Projects;
