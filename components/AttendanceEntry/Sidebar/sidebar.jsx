import React from "react";
const CommonSideBar = ({
  children,
  onTabClick,
  ProjectTextColor,
  CalenderTextColor,
  OverviewTextColor,
  ArchivedTextColor,
  menuValue
}) => {
  return (
    <div className="">
      <div className="">
        <div className="w-[100%] mx-auto flex justify-between items-center bg-white"></div>
        <div className="md:grid grid-cols-[60px_calc(100%-60px)] relative bg-white ">
          <aside className="relative" aria-label="Sidebar">
       
           {
            menuValue ? (
              <div
              className="absolute z-[1] overflow-y-auto mt-[60px] md:mt-0 transition-all h-[90vh] md:h-[100vh] overflow-x-hidden py-4 px-3 bg-white 
 :w-[197px] group"
            >
              <ul className="space-y-2">
                <li>
                  <div className="flex justify-between">
                    <div>
                      <button
                        onClick={() => onTabClick("DashBoard")}
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg"
                      >
                        {OverviewTextColor ? (
                         <img src="../icons/DashBoard.svg" alt="" />
                        ) : (
                          <img src="../icons/DashBoard.svg" alt="" />

                        )}
                        {OverviewTextColor ? (
                          
                      <div className="ml-2">
                        <h1 className="group-hover:bg-transparent bg-[#773dfe] w-1 h-6"></h1>
                      </div>
                    ) :  null}
                        <span
                          className="ml-5 whitespace-nowrap font-['sf-pro-regular'] font-bold"
                          // style={{
                          //   color: `${
                          //     OverviewTextColor ? "#3D5AFE" : "#232E38"
                          //   }`,
                          // }}
                        >
                          DashBoard
                        </span>
                      </button>
                    </div>
                    
                  </div>
                </li>
                <li>
                  <div className="flex justify-between">
                    <div>
                      <button
                        onClick={() => onTabClick("Attendance")}
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg"
                      >
                        {ProjectTextColor ? (
                            <img src="../icons/Attendance.svg" alt="" />
                        ) : (
                          <img src="../icons/Attendance.svg" alt="" />
                        )}
                        {ProjectTextColor ? (
                      <div className=" ml-2">
                        <h1 className="group-hover:bg-transparent bg-[#773dfe] w-1 h-6"></h1>
                      </div>
                    ) : null}
                        <span
                          className="flex-1 ml-5 whitespace-nowrap font-['sf-pro-regular'] font-bold"
                          // style={{
                          //   color: `${
                          //     ProjectTextColor ? "#3D5AFE" : "#232E38"
                          //   }`,
                          // }}
                        >
                          Attendance
                        </span>
                      </button>
                    </div>
                    {/* {ProjectTextColor ? (
                      <div className="mt-3 ml-16">
                        <h1 className="bg-[#349581] w-1 h-5"></h1>
                      </div>
                    ) : null} */}
                  </div>
                </li>
                <li>
                  <div className="flex justify-between">
                    <div>
                      <button
                        onClick={() => onTabClick("EmployeeDetails")}
                        className="flex items-center p-2.5 text-base font-normal text-gray-900 rounded-lg "
                      >
                        {CalenderTextColor ? (
                        <img src="../icons/EmployeeDetails.svg" alt="" />
                        ) : (
                          <img src="../icons/EmployeeDetails.svg" alt="" />
                  
                        )}

                      {CalenderTextColor ? (
                      <div className="mt-1 ml-2">
                        <h1 className="group-hover:bg-transparent bg-[#773dfe] w-1 h-6"></h1>
                      </div>
                    ) : null}

                        <span
                          className="flex-1 ml-6 whitespace-nowrap font-['sf-pro-regular'] font-bold"
                          // style={{
                          //   color: `${
                          //     CalenderTextColor ? "#3D5AFE" : "#232E38"
                          //   }`,
                          // }}
                        >
                          Employee Details
                        </span>
                      </button>
                    </div>
                    {/* {CalenderTextColor ? (
                      <div className="mt-3 ml-14">
                        <h1 className="bg-[#349581] w-1 h-5"></h1>
                      </div>
                    ) : null} */}
                  </div>
                </li>
              </ul>
            </div> ) :(
              <div className="hidden md:block">
                  <div
              className="absolute z-[1] overflow-y-auto transition-all h-[100vh] overflow-x-hidden py-4 px-3 bg-white 
  w-[60px] hover:w-[197px] group"
            >
              <ul className="space-y-2">
                <li>
                  <div className="flex justify-between">
                    <div>
                      <button
                        onClick={() => onTabClick("DashBoard")}
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg"
                      >
                        {OverviewTextColor ? (
                         <img src="../icons/DashBoard.svg" alt="" />
                        ) : (
                          <img src="../icons/DashBoard.svg" alt="" />

                        )}
                        {OverviewTextColor ? (
                          
                      <div className="ml-2">
                        <h1 className="group-hover:bg-transparent bg-[#773dfe] w-1 h-6"></h1>
                      </div>
                    ) :  null}
                        <span
                          className="ml-5 whitespace-nowrap font-['sf-pro-regular'] font-bold"
                          // style={{
                          //   color: `${
                          //     OverviewTextColor ? "#3D5AFE" : "#232E38"
                          //   }`,
                          // }}
                        >
                          DashBoard
                        </span>
                      </button>
                    </div>
                    
                  </div>
                </li>
                <li>
                  <div className="flex justify-between">
                    <div>
                      <button
                        onClick={() => onTabClick("Attendance")}
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg"
                      >
                        {ProjectTextColor ? (
                            <img src="../icons/Attendance.svg" alt="" />
                        ) : (
                          <img src="../icons/Attendance.svg" alt="" />
                        )}
                        {ProjectTextColor ? (
                      <div className=" ml-2">
                        <h1 className="group-hover:bg-transparent bg-[#773dfe] w-1 h-6"></h1>
                      </div>
                    ) : null}
                        <span
                          className="flex-1 ml-5 whitespace-nowrap font-['sf-pro-regular'] font-bold"
                          // style={{
                          //   color: `${
                          //     ProjectTextColor ? "#3D5AFE" : "#232E38"
                          //   }`,
                          // }}
                        >
                          Attendance
                        </span>
                      </button>
                    </div>
                    {/* {ProjectTextColor ? (
                      <div className="mt-3 ml-16">
                        <h1 className="bg-[#349581] w-1 h-5"></h1>
                      </div>
                    ) : null} */}
                  </div>
                </li>
                <li>
                  <div className="flex justify-between">
                    <div>
                      <button
                        onClick={() => onTabClick("EmployeeDetails")}
                        className="flex items-center p-2.5 text-base font-normal text-gray-900 rounded-lg "
                      >
                        {CalenderTextColor ? (
                        <img src="../icons/EmployeeDetails.svg" alt="" />
                        ) : (
                          <img src="../icons/EmployeeDetails.svg" alt="" />
                  
                        )}

                      {CalenderTextColor ? (
                      <div className="mt-1 ml-2">
                        <h1 className="group-hover:bg-transparent bg-[#773dfe] w-1 h-6"></h1>
                      </div>
                    ) : null}

                        <span
                          className="flex-1 ml-6 whitespace-nowrap font-['sf-pro-regular'] font-bold"
                          // style={{
                          //   color: `${
                          //     CalenderTextColor ? "#3D5AFE" : "#232E38"
                          //   }`,
                          // }}
                        >
                          Employee Details
                        </span>
                      </button>
                    </div>
                    {/* {CalenderTextColor ? (
                      <div className="mt-3 ml-14">
                        <h1 className="bg-[#349581] w-1 h-5"></h1>
                      </div>
                    ) : null} */}
                  </div>
                </li>
              </ul>
            </div>
              </div>
            )
            
           }
          </aside>
          <section className="">
            {children}
          </section>
        </div>
      </div>
    </div>
  );
};

export default CommonSideBar;
