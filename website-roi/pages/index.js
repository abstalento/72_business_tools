import React from 'react'
import Head from 'next/head';
import Header from '../Components/Header';
import Content from '../Components/Content';
import Footer from '../Components/Footer';
import useWindowSize from '../public/hooks/useWindowSize';


export default function Home() {
  const {width} = useWindowSize();
  return (
    <div>
      <Header 
        title = "WEB ROI CALCULATOR"
        width = {width}
      />
      <Content 
      />
      <Footer />

    </div>
  );
}
