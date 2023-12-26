import React from "react";
import ImageConvert from "../../components/image-converter/image";
import TitleComponent from "../../components/titlecomponent/titleComponent";
import Navbar from "../../components/fileconvert/navbar/Navbar";
import Footer from "../../components/homepage/footer/FooterFile";
import BtoolsHeader from "../../container/72BTheader/BToolsHeader";
import BtoolsFooter from "../../container/72BTfooter/BToolsFooter";
import FeedBackButton from "../../container/72FeedBackButton/feedBackButton";

export default function BgimageConvert() {
  return (
    <div className="w-[100%] h-[100vh] scrollBar overflow-x-hidden">
      <div className="w-[100%]">
        <BtoolsHeader Src="/images/imageToText.png" Height="25" Width="120" />
      </div>
      <div className="bg-cover w-[100%] sm:w-[540px] md:w-[768px] lg:w-[1024px] xl:w-[1280px] 2xl:w-[1536px] pb-2 bg-bgconvertpurple">
        {/* <div> */}
        {/* <Navbar /> */}
        <TitleComponent
          head="Convert your"
          content=" file easily"
          nav="Convert your Image files from one format to another format in online for free!"
        />
        <ImageConvert />
        {/* </div> */}
      </div>
      <div className="h-[5vh]">
        {/* <Footer /> */}

        <FeedBackButton
          Src="/images/imageToText.png"
          Path="/"
          appName="imageToText"
        />

        <BtoolsFooter />
      </div>
    </div>
  );
}
