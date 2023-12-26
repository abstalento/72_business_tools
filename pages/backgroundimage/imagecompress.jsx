import React from "react";
import DragDrop from "../../components/dragDrop/Dragdrop";
import Navbar from "../../components/fileconvert/navbar/Navbar";
import TitleComponent from "../../components/titlecomponent/titleComponent";

export default function bgimageCompress() {
  return <div className="bg-cover bg-bgcompressblue h-[100vh]">
    <Navbar/>
    <div>
    <TitleComponent
          head="Convert your"
          content=" file easily"
          nav="Convert your Image files from one format to another format in online for free!"
        />
    </div>
    <div className="mt-5">
      <DragDrop/>
    </div>
    
  </div>;
}
