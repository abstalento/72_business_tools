import React from "react";
import logo from "../public/icons/72BTimage.png";
import Image from "next/image";

function Header() {
  return (
    <>
      <div className="w-[100%] h-[5vh] bg-white">
        <div className="ml-5 flex items-center justify-between h-[100%]">
          <Image
            src={logo}
            width={100}
            alt="Logo"
            className="cursor-pointer"
            // onClick={() => (
            //   (window.open = "https://www.google.com"), (target = "_blank")
            // )}
          />
        </div>
      </div>
    </>
  );
}

export default Header;
