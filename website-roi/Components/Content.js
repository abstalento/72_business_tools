import React from 'react';
import SubField from './Input/SubField';
import WebCost from './Input/FirstField/WebCost'
import LeadCost from './Input/FirstField/LeadCost'
import FirstField from './Input/FirstField';


const Content = () => {
  return (
    <main className='relative flex justify-center items-center w-screen h-screen' style={{ zIndex: 0 }}>
      <div className='absolute flex h-[50%] bg-[#FFCA64] gap-[1%] w-full top-[10%] justify-center items-center'>
          <FirstField />
          <SubField />
      </div>
    </main>
  );
};

export default Content;