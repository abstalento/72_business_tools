import React from 'react'
import Head from 'next/head';
import Header from '../Components/Header';
import Content from '../Components/Content';
import Footer from '../Components/Footer';
import useWindowSize from '../public/hooks/useWindowSize';
import FirstField from '../Components/Input/FirstField';
import SubField from '../Components/Input/SubField';
import LeadCost from '../Components/Input/FirstField/LeadCost';
import WebCost from '../Components/Input/FirstField/WebCost';


export default function Home() {
  const {width} = useWindowSize();
  return (
    <div>
      <main className='relative flex justify-center items-center w-screen h-screen overflow-hidden mt-[-3%]' style={{ zIndex: 0 }}>
      <div className='absolute lg:flex h-[50%] bg-[#FFCA64] gap-[1%] w-full top-[10%] justify-center items-center'>
          <FirstField />
          <SubField />
          {/* <Content /> */}
      </div>
    </main>
    </div>
  );
}
