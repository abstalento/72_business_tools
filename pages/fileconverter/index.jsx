import Navbar from "../../components/fileconvert/navbar/Navbar";
import Footer from "../../components/homepage/footer/FooterFile";
import BtoolsFooter from "../../container/72BTfooter/BToolsFooter";
import BtoolsHeader from "../../container/72BTheader/BToolsHeader";

export default function Home() {
  return (
    <>
      <div className="">
        <BtoolsHeader/>
      </div>
      <div className="bg-cover bg-imagebg h-[88vh] ">
        <Navbar />
        <div className="flex justify-center content-center flex-col h-[75vh]">
          <div className="text-[#FFCC41] tracking-[5.6px] text-center p-2 text-[60px] font-[sfpro]">
            Convert your{" "}
            <p className="text-white tracking-normal p-2 font-[sf-pro-medium] text-7xl">
              file easily
            </p>
          </div>
          <div className="text-center text-[#FAFDFD] text-opacity-[40%] font-[sf-pro-regular] w-[19%] text-[12px] mx-auto">
            Convert your Image files from one format to another format in online
            for free!
          </div>
        </div>
      </div>

      <div className="h-[6vh]">
        {/* <Footer /> */}
        <BtoolsFooter/>
      </div>
    </>
  );
}
