
import Navbar from "../../components/fileconvert/navbar/Navbar";
import Footer from "../../components/homepage/footer/FooterFile";

export default function About(){
    return(
        <>
      <div className="bg-cover bg-imagebg h-[94vh] ">
        <Navbar/>
        <div className="z-50 flex flex-col justify-center items-center text-white w-full h-screen">
       <p className="text-white font-[50px] text-5xl font-[sf-pro-bold] ">Coming Soon</p>
       </div>
        </div>
    
       <div className="h-[6vh]">
       <Footer />
       </div>
        
       
        </>
    )
}