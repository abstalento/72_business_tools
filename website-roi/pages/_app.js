import "../styles/global.css";

import React from 'react'
import Head from 'next/head';
import Header from '../Components/Header';
import Content from '../Components/Content';
import Footer from '../Components/Footer';
import useWindowSize from '../public/hooks/useWindowSize';


const MyApp = ({ Component, pageProps }) => {
  const {width} = useWindowSize();

  return  (
    <>
      <Header 
        title = "WEB ROI CALCULATOR"
        width = {width}
      />
      <Footer />
    <Component {...pageProps} />
    </>
  );
};

export default MyApp