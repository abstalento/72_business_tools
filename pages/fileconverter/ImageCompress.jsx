import React from "react";
import DragDrop from "../../components/dragDrop/Dragdrop";
import Navbar from "../../components/fileconvert/navbar/Navbar";
import TitleComponent from "../../components/titlecomponent/titleComponent";
import Footer from "../../components/homepage/footer/FooterFile";

export default function bgimageCompress() {
  return (
  <>
 <div className="bg-cover bg-bgcompressblue h-[94vh]">
    <Navbar/>
    <div>
    <TitleComponent
          head="Convert your"
          content=" file easily"
          nav="Convert your Image files from one format to another format in online for free!"
        />
    </div>
    <div className="mt-4">
      <DragDrop/>
    </div>
  </div>
  <div className="h-[6vh]">
      <Footer />
      </div>
  </>
  )
}
