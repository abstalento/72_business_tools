import React from 'react';

const Footer = () => {
  const date = new Date().getFullYear();
  return (
    <footer className="flex justify-center fixed bottom-0 items-center h-5vh mt-5% lg:mt-2% bg-[#f5f5f5] w-full">
      <h1 className="text-lg lg:text-xl xl:text-2xl 2xl:text-3xl text-center">
        &copy; {date}, Alpha Business Solutions Pvt. Ltd. All Rights Reserved.
      </h1>
    </footer>
  );
};
export default Footer;
