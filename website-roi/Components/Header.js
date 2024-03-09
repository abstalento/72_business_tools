import React from 'react';
import Image from 'next/image';
import logo from '../public/icons/logo.png';
import {FaLaptop,FaTabletAlt,FaMobileAlt} from 'react-icons/fa';

const Header = ({title,width}) => {
  return (
    <header className="flex fixed top-0 items-center h-5vh mt-5% lg:mt-2% bg-[#f5f5f5] w-full z-2" style={{ zIndex: 2 }}>
      <div className='w-[25%] md:w-[20%] lg:w-[10%] m-[1%]'>
        <Image 
          src={logo}
          alt="image"
          layout="responsive"
          width={1024}
          height={576}
        />
      </div>
      <p 
        className='text-bold ml-[5%] lg:text-lg md:text-lg text-sm border-l-2 pl-[3%] pb-[1%] md:pt-1 lg:pt-1 border-black'
      >
        {title}
      </p>
      <section className="justify-end ml-auto mr-8">     
        {width < 768 ? <FaMobileAlt color="blue"/> : width < 992 ? <FaTabletAlt color="blue"/> : <FaLaptop color="blue"/>}
      </section>

    </header>
  );
};

Header.defaultProps = {
  title:"WEB ROI CALCULATOR"
}

export default Header;