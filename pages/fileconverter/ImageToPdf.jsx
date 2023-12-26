import React from "react";
import Navbar from "../../components/fileconvert/navbar/Navbar";
import Convert from "../../components/fileconverter/convert";
import TitleComponent from "../../components/titlecomponent/titleComponent";
import Footer from "../../components/homepage/footer/FooterFile";
import BtoolsHeader from "../../container/72BTheader/BToolsHeader";
import BtoolsFooter from "../../container/72BTfooter/BToolsFooter";
import FeedBackButton from "../../container/72FeedBackButton/feedBackButton";

export default function Bgimage() {
  return (
    <div className=" scrollBar overflow-x-hidden">
      <div className="">
        <BtoolsHeader Src="/images/imageToPdf.png" Height="25" Width="100" />
      </div>
      <div className=" bg-cover bg-bgcompressblue pb-2 h-[100vh] scrollBar overflow-x-hidden">
        {/* <Navbar /> */}
        <TitleComponent
          head="Convert your"
          content="file to pdf"
          nav="Convert your Image files from one format to another format in online for free!"
        />
        <div className="mt-5">
          <Convert />
        </div>
      </div>
      <div className="">
        {/* <Footer /> */}
        <div>
          <FeedBackButton Src="/images/imageToPdf.png" Path="/" appName="imageToPdf"/>
        </div>
        <BtoolsFooter />
      </div>
    </div>
  );
}
