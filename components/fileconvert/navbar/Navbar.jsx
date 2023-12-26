import Link from "next/link";
import { useState } from "react";
export default function () {
  const [dropdownOpen, setdropdownOpen] = useState(false);

  return (
    <div className=" w-[100%] h-12 pt-2">
      <nav className="">
        <ul className="flex justify-center space-x-5 text-[13px]">
          <li>
            <Link href="/fileconverter/">
              <a
                className="block  pr-4 pl-3 text-[#FAFDFD] text-opacity-[50%] rounded md:bg-transparent 
                             md:p-0 dark:text-white"
                aria-current="page"
              >
                Home
              </a>
            </Link>
          </li>
          <li>
            <button
              id="dropdownNavbarLink"
              onClick={() => setdropdownOpen(!dropdownOpen)}
              data-dropdown-toggle="dropdownNavbar"
              className="text-[#FAFDFD] text-opacity-[50%] hover:text-blue-700 border-b
                                 border-gray-100 md:hover:bg-transparent md:border-0  md:p-0 font-medium flex items-center 
                                 "
            >
              Convert
              <svg
                class="w-4 h-4 ml-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </button>

            <div
              id="dropdownNavbar"
              className={`${
                dropdownOpen
                  ? "top-full opacity-100 visible"
                  : "top-[110%] invisible opacity-0"
              } bg-black opacity-70 text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-4 w-16`}
            >
              <ul className="" aria-labelledby="dropdownLargeButton">
                <li>
                  <a
                    href="/fileconverter/ImageToWord"
                    className="text-sm hover:cursor-pointer text-white block px-4 py-2"
                  >
                    Word
                  </a>
                </li>
                <li>
                  <a
                    href="/fileconverter/ImageToPdf"
                    className="text-sm hover:cursor-pointer text-white block px-4 py-2"
                  >
                    Pdf
                  </a>
                </li>
                <li>
                  <a
                    href="/fileconverter/ImageToText"
                    className="text-sm hover:cursor-pointer text-white block px-4 py-2"
                  >
                    Text
                  </a>
                </li>
              </ul>
            </div>
          </li>

          {/* <select className="bg-white bg-opacity-30">
                             <Link href="/home"><option defaultValue value="">Word</option></Link>
                           <Link href="/pdf"><option  value="">Pdf</option></Link>
                              <Link href="/bgimageConvert"><option  value="">Text</option></Link>
                               </select>
                            
                     <div className="dropdown-content">
                            <a href="/backgroundimage/imagecompress">Link 1</a>
                            <a href="#">Link 2</a>
                            <a href="#">Link 3</a>
                            
                                         </div> */}
          {/* </a> */}

          <Link href="/fileconverter/ImageCompress">
            <a
              className="block text-[#FAFDFD] text-opacity-[50%] rounded
                             hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0
                              dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700
                               dark:hover:text-white md:dark:hover:bg-transparent"
            >
              Compress
            </a>
          </Link>
          <Link href="/fileconverter/About">
            <a
              className="block  pr-4 pl-3 text-[#FAFDFD] text-opacity-[50%] rounded
                             hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0
                              dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white
                               md:dark:hover:bg-transparent"
            >
              About
            </a>
          </Link>
        </ul>
      </nav>
    </div>
  );
}
