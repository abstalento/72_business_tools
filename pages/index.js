import React, { useState } from 'react';
import Head from "next/head";
import Footer from "../components/homepage/footer/FooterFile";
import Landingpagetop from "../container/homepage/landingpagetop.jsx";
import Landingpagecontent from "../container/homepage/landingpagecontent";

export default function Home() {
  const [searchData, setSearchData] = useState("");
    const [type, setType]=useState("All")
    const onSearchChange = (value) => {
      setSearchData(value);
    };
  const handleDropDown =(type)=>{
      setType(type)
    }
 
  return (
    <div className="w-full bg-[#f2f2f2] h-screen overflow-scroll no-scrollbar">
      <Head>
      <link rel="manifest" href="/manifest.json" />
        <title>72 Business tools</title>
        <meta name="description" content="72" />
        <link rel="icon" href="/72.png" />
      </Head>
      <div>
      <Landingpagetop onSearchCallback={onSearchChange}  dropDown={handleDropDown}/>
      <div className='min-h-screen'>
     <Landingpagecontent data={searchData} selectDropDown={type}/>
     </div>
    </div>
     <Footer />
    </div>
  );
}

