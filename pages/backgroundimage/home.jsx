import Navbar from "../../components/fileconvert/navbar/Navbar";
import Title from "../../components/fileconvert/title/Title";
import Bgimage from "../backgroundimage/bgimage";

export default function Home(){
    return(
        <>
      <div className="bg-cover bg-imagebg h-[100vh] ">
        <Navbar/>
        <div className="flex justify-center content-center flex-col h-[75vh]">
        <div className="text-[#FFCC41] text-7xl text-center p-2 font-[sf-pro-light]">
Convert your <p className="text-white p-2 font-[sf-pro-medium] text-8xl">file easily</p>
        </div>
        <div className="text-center text-[#FAFDFD] text-opacity-[40%] font-[sf-pro-regular]">Convert your Image files from one format to another format in online for free!</div>
        </div>
        </div>
       
   
          
        
        
      
       
        

        </>
    )
}