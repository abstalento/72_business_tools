import React from "react";
import TitleComponent from "../../components/titlecomponent/titleComponent";

export default function bgimage() {
  return (
    <div className=" bg-cover bg-imagebg h-[100vh] ">
      <div>
      <TitleComponent
        head="Convert your"
        content=" file easily"
        nav="Convert your Image files from one format to another format in online for free!"
      />
      </div>
    </div>
  );
}
