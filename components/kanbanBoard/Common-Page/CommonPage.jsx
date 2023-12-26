import React from "react";
const CommonPage = ({
  children,
  onTabClick,
  ProjectTextColor,
  CalenderTextColor,
  OverviewTextColor,
  ArchivedTextColor,
  menu,
}) => {
  return (
    <div className=" h-[100vh]  ">
      <div className=" mx-auto ">
        <div className="w-[100%] mx-auto flex justify-between items-center bg-white"></div>
        <div className="md:grid grid-cols-[60px_calc(100%-60px)] relative bg-white ">
          <aside className="relative" aria-label="Sidebar">
            {menu ? (
              <div
                className="absolute z-[1] overflow-y-auto transition-all  overflow-x-hidden py-4 px-3 bg-white h-[100vh]
 md:h-[100%] md:w-[60px] w-[197px]  hover:w-[197px] group"
              >
                <ul className="space-y-2">
                  <li>
                    <div className="flex justify-between">
                      <div>
                        <button
                          onClick={() => onTabClick("Overview")}
                          className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg"
                        >
                          {OverviewTextColor ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="22"
                              viewBox="0 0 28.065 27"
                            >
                              <g id="Overview" transform="translate(0)">
                                <rect
                                  id="Rectangle_118"
                                  data-name="Rectangle 118"
                                  width="26"
                                  height="27"
                                  transform="translate(0)"
                                  fill="#fff"
                                />
                                <path
                                  id="homepage"
                                  d="M28.712,13.147V26.263A2.637,2.637,0,0,1,26.078,28.9H21.687a1.756,1.756,0,0,1-1.756-1.756v-4.83a.878.878,0,0,0-.878-.878H14.661a.878.878,0,0,0-.878.878v4.83A1.756,1.756,0,0,1,12.026,28.9H7.635A2.637,2.637,0,0,1,5,26.263V13.147a1.765,1.765,0,0,1,.853-1.507l10.1-6.06a1.756,1.756,0,0,1,1.808,0l10.1,6.06A1.765,1.765,0,0,1,28.712,13.147Z"
                                  transform="translate(-0.647 -2.897)"
                                  fill="#773dfe"
                                />
                              </g>
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="22"
                              viewBox="0 0 28.066 27"
                            >
                              <g id="Overview" transform="translate(0.067)">
                                <rect
                                  id="Rectangle_118"
                                  data-name="Rectangle 118"
                                  width="26"
                                  height="27"
                                  transform="translate(-0.067)"
                                  fill="#fff"
                                />
                                <path
                                  id="homepage"
                                  d="M28.712,13.147V26.263A2.637,2.637,0,0,1,26.078,28.9H21.687a1.756,1.756,0,0,1-1.756-1.756v-4.83a.878.878,0,0,0-.878-.878H14.661a.878.878,0,0,0-.878.878v4.83A1.756,1.756,0,0,1,12.026,28.9H7.635A2.637,2.637,0,0,1,5,26.263V13.147a1.765,1.765,0,0,1,.853-1.507l10.1-6.06a1.756,1.756,0,0,1,1.808,0l10.1,6.06A1.765,1.765,0,0,1,28.712,13.147Z"
                                  transform="translate(-0.713 -2.897)"
                                  opacity="0.15"
                                />
                              </g>
                            </svg>
                          )}
                          {OverviewTextColor ? (
                            <div className="mt-1 ml-2">
                              <h1 className="group-hover:bg-transparent bg-[#773dfe] w-1 h-6"></h1>
                            </div>
                          ) : null}
                          <span
                            className="ml-4 whitespace-nowrap font-['sf-pro-regular'] font-bold"
                            // style={{
                            //   color: `${
                            //     OverviewTextColor ? "#3D5AFE" : "#232E38"
                            //   }`,
                            // }}
                          >
                            Overview
                          </span>
                        </button>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex justify-between">
                      <div>
                        <button
                          onClick={() => onTabClick("Projects")}
                          className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg"
                        >
                          {ProjectTextColor ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="26"
                              viewBox="0 0 26 27"
                            >
                              <g id="Projects" transform="translate(0.067)">
                                <rect
                                  id="Rectangle_118"
                                  data-name="Rectangle 118"
                                  width="26"
                                  height="27"
                                  transform="translate(-0.067)"
                                  fill="#fff"
                                />
                                <path
                                  id="note"
                                  d="M19.508,1H4.868A1.869,1.869,0,0,0,3,2.868V21.591a1.869,1.869,0,0,0,1.868,1.868H19.508a1.869,1.869,0,0,0,1.868-1.868V2.868A1.869,1.869,0,0,0,19.508,1ZM7.084,6.1h5.1a1.021,1.021,0,1,1,0,2.042h-5.1a1.021,1.021,0,0,1,0-2.042ZM17.292,18.355H7.084a1.021,1.021,0,0,1,0-2.042H17.292a1.021,1.021,0,0,1,0,2.042Zm0-5.1H7.084a1.021,1.021,0,0,1,0-2.042H17.292a1.021,1.021,0,0,1,0,2.042Z"
                                  transform="translate(0.955 2.541)"
                                  fill="#773dfe"
                                />
                              </g>
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="26"
                              viewBox="0 0 26 27"
                            >
                              <g id="Projects" transform="translate(0)">
                                <rect
                                  id="Rectangle_118"
                                  data-name="Rectangle 118"
                                  width="26"
                                  height="27"
                                  transform="translate(0)"
                                  fill="#fff"
                                />
                                <path
                                  id="note"
                                  d="M19.508,1H4.868A1.869,1.869,0,0,0,3,2.868V21.591a1.869,1.869,0,0,0,1.868,1.868H19.508a1.869,1.869,0,0,0,1.868-1.868V2.868A1.869,1.869,0,0,0,19.508,1ZM7.084,6.1h5.1a1.021,1.021,0,1,1,0,2.042h-5.1a1.021,1.021,0,0,1,0-2.042ZM17.292,18.355H7.084a1.021,1.021,0,0,1,0-2.042H17.292a1.021,1.021,0,0,1,0,2.042Zm0-5.1H7.084a1.021,1.021,0,0,1,0-2.042H17.292a1.021,1.021,0,0,1,0,2.042Z"
                                  transform="translate(1.021 2.541)"
                                  fill="#d9d9d9"
                                />
                              </g>
                            </svg>
                          )}
                          {ProjectTextColor ? (
                            <div className="mt-1 ml-2">
                              <h1 className="group-hover:bg-transparent bg-[#773dfe] w-1 h-6"></h1>
                            </div>
                          ) : null}
                          <span
                            className="flex-1 ml-4 whitespace-nowrap font-['sf-pro-regular'] font-bold"
                            // style={{
                            //   color: `${
                            //     ProjectTextColor ? "#3D5AFE" : "#232E38"
                            //   }`,
                            // }}
                          >
                            Projects
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
                          onClick={() => onTabClick("Calender")}
                          className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg "
                        >
                          {CalenderTextColor ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="26"
                              viewBox="0 0 26 27"
                            >
                              <g id="Calendar" transform="translate(0)">
                                <rect
                                  id="Rectangle_118"
                                  data-name="Rectangle 118"
                                  width="26"
                                  height="27"
                                  transform="translate(0)"
                                  fill="none"
                                />
                                <g
                                  id="Layer_93"
                                  data-name="Layer 93"
                                  transform="translate(4.419 2.709)"
                                >
                                  <path
                                    id="Union_1"
                                    data-name="Union 1"
                                    d="M3.237,21.581A3.237,3.237,0,0,1,0,18.344V9.712H21.581v8.632a3.238,3.238,0,0,1-3.237,3.237ZM0,7.553V6.475A3.237,3.237,0,0,1,3.237,3.237h1.08V1.08a1.079,1.079,0,1,1,2.157,0V3.237h8.632V1.08a1.079,1.079,0,1,1,2.158,0V3.237h1.079a3.238,3.238,0,0,1,3.237,3.237V7.553Z"
                                    fill="#773dfe"
                                  />
                                </g>
                              </g>
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="26"
                              viewBox="0 0 26 27"
                            >
                              <g id="Calendar" transform="translate(0)">
                                <rect
                                  id="Rectangle_118"
                                  data-name="Rectangle 118"
                                  width="26"
                                  height="27"
                                  transform="translate(0)"
                                  fill="none"
                                />
                                <g
                                  id="Layer_93"
                                  data-name="Layer 93"
                                  transform="translate(4.419 2.709)"
                                >
                                  <path
                                    id="Union_1"
                                    data-name="Union 1"
                                    d="M3.237,21.581A3.237,3.237,0,0,1,0,18.344V9.712H21.581v8.632a3.238,3.238,0,0,1-3.237,3.237ZM0,7.553V6.475A3.237,3.237,0,0,1,3.237,3.237h1.08V1.08a1.079,1.079,0,1,1,2.157,0V3.237h8.632V1.08a1.079,1.079,0,1,1,2.158,0V3.237h1.079a3.238,3.238,0,0,1,3.237,3.237V7.553Z"
                                    fill="#d9d9d9"
                                  />
                                </g>
                              </g>
                            </svg>
                          )}

                          {CalenderTextColor ? (
                            <div className="mt-1 ml-2">
                              <h1 className="group-hover:bg-transparent bg-[#773dfe] w-1 h-6"></h1>
                            </div>
                          ) : null}

                          <span
                            className="flex-1 ml-4 whitespace-nowrap font-['sf-pro-regular'] font-bold"
                            // style={{
                            //   color: `${
                            //     CalenderTextColor ? "#3D5AFE" : "#232E38"
                            //   }`,
                            // }}
                          >
                            Calendar
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

                  <li>
                    <div className="flex justify-between">
                      <div>
                        <button
                          onClick={() => onTabClick("Archived")}
                          className="flex items-center p-3 text-base font-normal text-gray-900 rounded-lg "
                        >
                          {ArchivedTextColor ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 22.32 22.32"
                            >
                              <path
                                id="archive"
                                d="M2,8.363a2.232,2.232,0,0,1,.489-1.394l2.97-3.712A3.348,3.348,0,0,1,8.073,2H18.247a3.348,3.348,0,0,1,2.614,1.256l2.97,3.712a2.232,2.232,0,0,1,.489,1.394V20.972a3.348,3.348,0,0,1-3.348,3.348H5.348A3.348,3.348,0,0,1,2,20.972ZM8.073,4.232H18.247a1.116,1.116,0,0,1,.871.419L21.1,7.127a.279.279,0,0,1-.218.453H5.439a.279.279,0,0,1-.218-.453L7.2,4.651a1.116,1.116,0,0,1,.871-.419Zm6.205,7.811a1.116,1.116,0,1,0-2.232,0V17.72l-.887-.887a1.116,1.116,0,1,0-1.578,1.578l2,2a2.232,2.232,0,0,0,3.156,0l2-2a1.116,1.116,0,1,0-1.578-1.578l-.883.883Z"
                                transform="translate(-2 -2)"
                                fill="#693dfe"
                                fill-rule="evenodd"
                              />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="22"
                              height="22"
                              viewBox="0 0 22.32 22.32"
                            >
                              <path
                                id="archive"
                                d="M2,8.363a2.232,2.232,0,0,1,.489-1.394l2.97-3.712A3.348,3.348,0,0,1,8.073,2H18.247a3.348,3.348,0,0,1,2.614,1.256l2.97,3.712a2.232,2.232,0,0,1,.489,1.394V20.972a3.348,3.348,0,0,1-3.348,3.348H5.348A3.348,3.348,0,0,1,2,20.972ZM8.073,4.232H18.247a1.116,1.116,0,0,1,.871.419L21.1,7.127a.279.279,0,0,1-.218.453H5.439a.279.279,0,0,1-.218-.453L7.2,4.651a1.116,1.116,0,0,1,.871-.419Zm6.205,7.811a1.116,1.116,0,1,0-2.232,0V17.72l-.887-.887a1.116,1.116,0,1,0-1.578,1.578l2,2a2.232,2.232,0,0,0,3.156,0l2-2a1.116,1.116,0,1,0-1.578-1.578l-.883.883Z"
                                transform="translate(-2 -2)"
                                fill-rule="evenodd"
                                opacity="0.2"
                              />
                            </svg>
                          )}

                          {ArchivedTextColor ? (
                            <div className="mt-1 ml-2">
                              <h1 className="group-hover:bg-transparent bg-[#773dfe] w-1 h-6"></h1>
                            </div>
                          ) : null}

                          <span
                            className="flex-1 ml-5 whitespace-nowrap font-['sf-pro-regular'] font-bold"
                            // style={{
                            //   color: `${
                            //     CalenderTextColor ? "#3D5AFE" : "#232E38"
                            //   }`,
                            // }}
                          >
                            Archived
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
            ) : (
              <div className="hidden md:block">
                <div
                  className="absolute z-[1] overflow-y-auto transition-all  overflow-x-hidden py-4 px-3 bg-white h-[100vh]
 md:h-[100%] md:w-[60px] w-[197px]  hover:w-[197px] group"
                >
                  <ul className="space-y-2">
                    <li>
                      <div className="flex justify-between">
                        <div>
                          <button
                            onClick={() => onTabClick("Overview")}
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg"
                          >
                            {OverviewTextColor ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="22"
                                viewBox="0 0 28.065 27"
                              >
                                <g id="Overview" transform="translate(0)">
                                  <rect
                                    id="Rectangle_118"
                                    data-name="Rectangle 118"
                                    width="26"
                                    height="27"
                                    transform="translate(0)"
                                    fill="#fff"
                                  />
                                  <path
                                    id="homepage"
                                    d="M28.712,13.147V26.263A2.637,2.637,0,0,1,26.078,28.9H21.687a1.756,1.756,0,0,1-1.756-1.756v-4.83a.878.878,0,0,0-.878-.878H14.661a.878.878,0,0,0-.878.878v4.83A1.756,1.756,0,0,1,12.026,28.9H7.635A2.637,2.637,0,0,1,5,26.263V13.147a1.765,1.765,0,0,1,.853-1.507l10.1-6.06a1.756,1.756,0,0,1,1.808,0l10.1,6.06A1.765,1.765,0,0,1,28.712,13.147Z"
                                    transform="translate(-0.647 -2.897)"
                                    fill="#773dfe"
                                  />
                                </g>
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="22"
                                viewBox="0 0 28.066 27"
                              >
                                <g id="Overview" transform="translate(0.067)">
                                  <rect
                                    id="Rectangle_118"
                                    data-name="Rectangle 118"
                                    width="26"
                                    height="27"
                                    transform="translate(-0.067)"
                                    fill="#fff"
                                  />
                                  <path
                                    id="homepage"
                                    d="M28.712,13.147V26.263A2.637,2.637,0,0,1,26.078,28.9H21.687a1.756,1.756,0,0,1-1.756-1.756v-4.83a.878.878,0,0,0-.878-.878H14.661a.878.878,0,0,0-.878.878v4.83A1.756,1.756,0,0,1,12.026,28.9H7.635A2.637,2.637,0,0,1,5,26.263V13.147a1.765,1.765,0,0,1,.853-1.507l10.1-6.06a1.756,1.756,0,0,1,1.808,0l10.1,6.06A1.765,1.765,0,0,1,28.712,13.147Z"
                                    transform="translate(-0.713 -2.897)"
                                    opacity="0.15"
                                  />
                                </g>
                              </svg>
                            )}
                            {OverviewTextColor ? (
                              <div className="mt-1 ml-2">
                                <h1 className="group-hover:bg-transparent bg-[#773dfe] w-1 h-6"></h1>
                              </div>
                            ) : null}
                            <span
                              className="ml-4 whitespace-nowrap font-['sf-pro-regular'] font-bold"
                              // style={{
                              //   color: `${
                              //     OverviewTextColor ? "#3D5AFE" : "#232E38"
                              //   }`,
                              // }}
                            >
                              Overview
                            </span>
                          </button>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className="flex justify-between">
                        <div>
                          <button
                            onClick={() => onTabClick("Projects")}
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg"
                          >
                            {ProjectTextColor ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="26"
                                viewBox="0 0 26 27"
                              >
                                <g id="Projects" transform="translate(0.067)">
                                  <rect
                                    id="Rectangle_118"
                                    data-name="Rectangle 118"
                                    width="26"
                                    height="27"
                                    transform="translate(-0.067)"
                                    fill="#fff"
                                  />
                                  <path
                                    id="note"
                                    d="M19.508,1H4.868A1.869,1.869,0,0,0,3,2.868V21.591a1.869,1.869,0,0,0,1.868,1.868H19.508a1.869,1.869,0,0,0,1.868-1.868V2.868A1.869,1.869,0,0,0,19.508,1ZM7.084,6.1h5.1a1.021,1.021,0,1,1,0,2.042h-5.1a1.021,1.021,0,0,1,0-2.042ZM17.292,18.355H7.084a1.021,1.021,0,0,1,0-2.042H17.292a1.021,1.021,0,0,1,0,2.042Zm0-5.1H7.084a1.021,1.021,0,0,1,0-2.042H17.292a1.021,1.021,0,0,1,0,2.042Z"
                                    transform="translate(0.955 2.541)"
                                    fill="#773dfe"
                                  />
                                </g>
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="26"
                                viewBox="0 0 26 27"
                              >
                                <g id="Projects" transform="translate(0)">
                                  <rect
                                    id="Rectangle_118"
                                    data-name="Rectangle 118"
                                    width="26"
                                    height="27"
                                    transform="translate(0)"
                                    fill="#fff"
                                  />
                                  <path
                                    id="note"
                                    d="M19.508,1H4.868A1.869,1.869,0,0,0,3,2.868V21.591a1.869,1.869,0,0,0,1.868,1.868H19.508a1.869,1.869,0,0,0,1.868-1.868V2.868A1.869,1.869,0,0,0,19.508,1ZM7.084,6.1h5.1a1.021,1.021,0,1,1,0,2.042h-5.1a1.021,1.021,0,0,1,0-2.042ZM17.292,18.355H7.084a1.021,1.021,0,0,1,0-2.042H17.292a1.021,1.021,0,0,1,0,2.042Zm0-5.1H7.084a1.021,1.021,0,0,1,0-2.042H17.292a1.021,1.021,0,0,1,0,2.042Z"
                                    transform="translate(1.021 2.541)"
                                    fill="#d9d9d9"
                                  />
                                </g>
                              </svg>
                            )}
                            {ProjectTextColor ? (
                              <div className="mt-1 ml-2">
                                <h1 className="group-hover:bg-transparent bg-[#773dfe] w-1 h-6"></h1>
                              </div>
                            ) : null}
                            <span
                              className="flex-1 ml-4 whitespace-nowrap font-['sf-pro-regular'] font-bold"
                              // style={{
                              //   color: `${
                              //     ProjectTextColor ? "#3D5AFE" : "#232E38"
                              //   }`,
                              // }}
                            >
                              Projects
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
                            onClick={() => onTabClick("Calender")}
                            className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg "
                          >
                            {CalenderTextColor ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="26"
                                viewBox="0 0 26 27"
                              >
                                <g id="Calendar" transform="translate(0)">
                                  <rect
                                    id="Rectangle_118"
                                    data-name="Rectangle 118"
                                    width="26"
                                    height="27"
                                    transform="translate(0)"
                                    fill="none"
                                  />
                                  <g
                                    id="Layer_93"
                                    data-name="Layer 93"
                                    transform="translate(4.419 2.709)"
                                  >
                                    <path
                                      id="Union_1"
                                      data-name="Union 1"
                                      d="M3.237,21.581A3.237,3.237,0,0,1,0,18.344V9.712H21.581v8.632a3.238,3.238,0,0,1-3.237,3.237ZM0,7.553V6.475A3.237,3.237,0,0,1,3.237,3.237h1.08V1.08a1.079,1.079,0,1,1,2.157,0V3.237h8.632V1.08a1.079,1.079,0,1,1,2.158,0V3.237h1.079a3.238,3.238,0,0,1,3.237,3.237V7.553Z"
                                      fill="#773dfe"
                                    />
                                  </g>
                                </g>
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="26"
                                viewBox="0 0 26 27"
                              >
                                <g id="Calendar" transform="translate(0)">
                                  <rect
                                    id="Rectangle_118"
                                    data-name="Rectangle 118"
                                    width="26"
                                    height="27"
                                    transform="translate(0)"
                                    fill="none"
                                  />
                                  <g
                                    id="Layer_93"
                                    data-name="Layer 93"
                                    transform="translate(4.419 2.709)"
                                  >
                                    <path
                                      id="Union_1"
                                      data-name="Union 1"
                                      d="M3.237,21.581A3.237,3.237,0,0,1,0,18.344V9.712H21.581v8.632a3.238,3.238,0,0,1-3.237,3.237ZM0,7.553V6.475A3.237,3.237,0,0,1,3.237,3.237h1.08V1.08a1.079,1.079,0,1,1,2.157,0V3.237h8.632V1.08a1.079,1.079,0,1,1,2.158,0V3.237h1.079a3.238,3.238,0,0,1,3.237,3.237V7.553Z"
                                      fill="#d9d9d9"
                                    />
                                  </g>
                                </g>
                              </svg>
                            )}

                            {CalenderTextColor ? (
                              <div className="mt-1 ml-2">
                                <h1 className="group-hover:bg-transparent bg-[#773dfe] w-1 h-6"></h1>
                              </div>
                            ) : null}

                            <span
                              className="flex-1 ml-4 whitespace-nowrap font-['sf-pro-regular'] font-bold"
                              // style={{
                              //   color: `${
                              //     CalenderTextColor ? "#3D5AFE" : "#232E38"
                              //   }`,
                              // }}
                            >
                              Calendar
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

                    <li>
                      <div className="flex justify-between">
                        <div>
                          <button
                            onClick={() => onTabClick("Archived")}
                            className="flex items-center p-3 text-base font-normal text-gray-900 rounded-lg "
                          >
                            {ArchivedTextColor ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 22.32 22.32"
                              >
                                <path
                                  id="archive"
                                  d="M2,8.363a2.232,2.232,0,0,1,.489-1.394l2.97-3.712A3.348,3.348,0,0,1,8.073,2H18.247a3.348,3.348,0,0,1,2.614,1.256l2.97,3.712a2.232,2.232,0,0,1,.489,1.394V20.972a3.348,3.348,0,0,1-3.348,3.348H5.348A3.348,3.348,0,0,1,2,20.972ZM8.073,4.232H18.247a1.116,1.116,0,0,1,.871.419L21.1,7.127a.279.279,0,0,1-.218.453H5.439a.279.279,0,0,1-.218-.453L7.2,4.651a1.116,1.116,0,0,1,.871-.419Zm6.205,7.811a1.116,1.116,0,1,0-2.232,0V17.72l-.887-.887a1.116,1.116,0,1,0-1.578,1.578l2,2a2.232,2.232,0,0,0,3.156,0l2-2a1.116,1.116,0,1,0-1.578-1.578l-.883.883Z"
                                  transform="translate(-2 -2)"
                                  fill="#693dfe"
                                  fill-rule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="22"
                                height="22"
                                viewBox="0 0 22.32 22.32"
                              >
                                <path
                                  id="archive"
                                  d="M2,8.363a2.232,2.232,0,0,1,.489-1.394l2.97-3.712A3.348,3.348,0,0,1,8.073,2H18.247a3.348,3.348,0,0,1,2.614,1.256l2.97,3.712a2.232,2.232,0,0,1,.489,1.394V20.972a3.348,3.348,0,0,1-3.348,3.348H5.348A3.348,3.348,0,0,1,2,20.972ZM8.073,4.232H18.247a1.116,1.116,0,0,1,.871.419L21.1,7.127a.279.279,0,0,1-.218.453H5.439a.279.279,0,0,1-.218-.453L7.2,4.651a1.116,1.116,0,0,1,.871-.419Zm6.205,7.811a1.116,1.116,0,1,0-2.232,0V17.72l-.887-.887a1.116,1.116,0,1,0-1.578,1.578l2,2a2.232,2.232,0,0,0,3.156,0l2-2a1.116,1.116,0,1,0-1.578-1.578l-.883.883Z"
                                  transform="translate(-2 -2)"
                                  fill-rule="evenodd"
                                  opacity="0.2"
                                />
                              </svg>
                            )}

                            {ArchivedTextColor ? (
                              <div className="mt-1 ml-2">
                                <h1 className="group-hover:bg-transparent bg-[#773dfe] w-1 h-6"></h1>
                              </div>
                            ) : null}

                            <span
                              className="flex-1 ml-5 whitespace-nowrap font-['sf-pro-regular'] font-bold"
                              // style={{
                              //   color: `${
                              //     CalenderTextColor ? "#3D5AFE" : "#232E38"
                              //   }`,
                              // }}
                            >
                              Archived
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
            )}
          </aside>
          <section className="">{children}</section>
        </div>
      </div>
    </div>
  );
};

export default CommonPage;
