import React from 'react';

const Header = () => {
  return (
    <div className='flex border-b-2 border-gray-200 bg-[#B31bA6]'>
      <img src="https://www.72businesstools.com/images/72BT%20Logo.png" className='m-[1%]' alt="logo" />  
      <span className='absolute border-2 h-[40px] border-gray-400 mt-[1%] ml-[10%]'></span> 
      <p className='ml-[3%] mt-[1.5%] text-white text-lg'>Employee TurnOver Cost Calculator</p>
      <p className='ml-auto mr-[2%] mt-[1.5%] text-white text-lg'>Currency : </p>
      <select className='mr-[2%] mt-[1.5%] h-[10%] w-[4%] border-2 border-black'>
        <option>INR</option>
        <option>USD</option>
        <option>UE</option>
        <option>EURO</option>
        <option>Pounds</option>
        <option>JPY</option>
      </select>
    </div>
  );
};

export default Header;