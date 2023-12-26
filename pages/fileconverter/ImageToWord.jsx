import Navbar from "../../components/fileconvert/navbar/Navbar";
import Footer from "../../components/homepage/footer/FooterFile";

export default function ImageToWord() {
  return (
    <>
      <div className="bg-cover bg-imagebg h-[94vh]  ">
        <Navbar/>
      <div className="z-50 flex flex-col justify-center items-center text-white w-full h-screen">
        <h1 className="text-5xl text-white">
          We are <b>Almost</b> there
        </h1>
        <p className="text-white text-2xl">Stay tuned for something amazing!</p>
        </div>
      </div>

      <div className="h-[6vh]">
        <Footer />
      </div>
    </>
  );
}
