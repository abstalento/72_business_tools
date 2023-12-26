import Image from "next/image";
import { useEffect, useState } from "react";
import Service from "../../../services/todoList/service";

const SideBar = ({
  showList,
  callUseEffect,
  newTask,
  myEdit,
  HandleMenuItem,
  headerName,
  addListState,
}) => {
  const [todoListName, setTodoListName] = useState([]);
  const [selectIndex, setSelectIndex] = useState();
  const [storeData, setStoreData] = useState();
  const [OverviewTextColor, setOverviewTextColor] = useState("overview");

  const listShow = (data, index) => {
    showList(data);
    setSelectIndex(index);
    setOverviewTextColor(data.value);
    headerName(data.value);
  };
  const allList = () => {
    showList("All");
  };
  const addList = () => {
    addListState();
  };

  const onTabClick = (data) => {
    setOverviewTextColor(data);
    headerName(data);
  };
  const onListClick = (data) => {
    setOverviewTextColor(data);
    showList("All");
    headerName(data);
  };
  useEffect(() => {
    (async function serviceCall() {
      await Service.todoListData();
      const todolistData = await Service.todoListData();
      if (todolistData.data) {
        // setTodoDatas(todoHistory.data)
        setTodoListName(todolistData.data);
      }
    })();
    (async function serviceCall() {
      await Service.todoHistory();
      const todoHistory = await Service.todoHistory();
      if (todoHistory.data) {
        setStoreData(todoHistory.data);
      }
    })();
  }, [callUseEffect]);

  // const hsndleDeletList = (id) => {
  //   const clone = [...todoListName]
  //   clone.splice(id, 1);
  //   setTodoListName(clone)
  //   console.log(clone, "deletlistdeletlistdeletlist");
  // }


  return (
    // <section
    //   className=" absolute bg-white z-[51] h-[100vh] w-[62px] hover:w-[160px]
    //         group sidebar hover:delay-150 transition-all"
    // >
    //   <div className="flex items-center bg-red-300">
    //     <div className="flex justify-between">
    //       <Image src="/icons/Overview.svg" width="20" height="20" />
    //       <Image src="/icons/todoSideBarLine.svg" width="10" height="10" className="visible group-hover:invisible"/>
    //     </div>
    //     <p className="font-[sf-pro-medium] invisible group-hover:delay-300 group-hover:visible">
    //       Overview
    //     </p>
    //   </div>
    //   <div className="flex pl-5 w-[62px] group-hover:w-[160px]">
    //     <Image src="/icons/Overview.svg" width="20" height="20" />
    //     <Image
    //         src="/icons/todoSideBarLine.svg"
    //         width="10"
    //         height="10"
    //         className="visible group-hover:invisible justify-end self-end"
    //       />
    //       <span className="hidden group-hover:block text-[14px] font-[sf-pro-medium]">Overview</span>
    //   </div>
    //   <div
    //     className="pl-5 pt-2 flex items-center space-x-4 cursor-pointer"
    //     onClick={storeData ? allList : null}
    //   >
    //     <div className="flex justify-between">
    //       <Image src="/icons/Projects.svg" width="20" height="20" />
    //       <Image
    //         src="/icons/todoSideBarLine.svg"
    //         width="10"
    //         height="24"
    //         className="visible group-hover:invisible"
    //       />
    //     </div>
    //     <p className="font-[sf-pro-medium] invisible  w-0  group-hover:delay-300 group-hover:visible">
    //       List
    //     </p>
    //   </div>
    //   <div className="max-h-[60vh] overflow-scroll scrollBar invisible group-hover:delay-300 group-hover:visible">
    //     <ul className="font-[sf-pro-medium] pl-14 ">
    //       {todoListName?.map((value, index) => {
    //         return (
    //           <li
    //             onClick={() => (storeData ? listShow(value, index) : null)}
    //             className={`cursor-pointer w-[100%] hover:text-[#E90854]`}
    //           >
    //             {value}
    //           </li>
    //         );
    //       })}
    //     </ul>
    //   </div>
    // </section>
    <div className="">
      <div className=" mx-auto ">
        <div className="w-[100%] bg-orange-600 mx-auto flex justify-between items-center "></div>
        <div className="md:grid grid-cols-[60px_calc(100%-60px)] relative bg-white ">
          <aside className="relative" aria-label="Sidebar">
            <div
              className="absolute z-[1] overflow-y-auto transition-all  overflow-x-hidden py-4 px-3 bg-white 
 h-[65vh]  md:mt-0 md:h-[93vh] md:w-[60px] w-[200px] md:hover:w-[197px] group"
            >
              <ul className="space-y-2">
                <li>
                  <div className="flex justify-between">
                    <div>
                      <button
                        onClick={() => onTabClick("overview")}
                        className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg"
                      >
                        {OverviewTextColor == "overview" ? (
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
                                fill="#E90854"
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
                        {OverviewTextColor == "overview" ? (
                          <div className="mt-1 ml-2">
                            <h1 className="group-hover:bg-transparent bg-[#E90854] w-1 h-6"></h1>
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
                      <button className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg">
                        {OverviewTextColor !== "overview" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => {
                              storeData ? onListClick("list") : null;
                            }}
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
                                fill="#E90854"
                              />
                            </g>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => {
                              storeData ? onListClick("list") : null;
                            }}
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
                        {OverviewTextColor !== "overview" ? (
                          <div className="mt-1 ml-2">
                            <h1 className="group-hover:bg-transparent bg-[#E90854] w-1 h-6"></h1>
                          </div>
                        ) : null}

                        <div
                          className="flex justify-between items-center"
                          onClick={addList}
                        >
                          <span className="flex-1 ml-4 whitespace-nowrap font-['sf-pro-regular'] font-bold">
                            List
                          </span>
                          <span className="ml-14">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="11.296"
                              height="11.296"
                              viewBox="0 0 11.296 11.296"
                            >
                              <path
                                id="plus"
                                d="M10.526,4.621H6.675V.77A.77.77,0,0,0,5.9,0H5.391a.77.77,0,0,0-.77.77V4.621H.77a.77.77,0,0,0-.77.77V5.9a.77.77,0,0,0,.77.77H4.621v3.851a.77.77,0,0,0,.77.77H5.9a.77.77,0,0,0,.77-.77V6.675h3.851a.77.77,0,0,0,.77-.77V5.391A.77.77,0,0,0,10.526,4.621Zm0,0"
                                fill="#E90854"
                              />
                            </svg>
                          </span>
                        </div>
                      </button>
                    </div>
                  </div>
                </li>

                <div className="max-h-[75vh] overflow-scroll scrollBar group-hover:delay-300 ">
                  <ul className="font-[sf-pro-medium] pl-14 ">
                    {todoListName?.map((value, index) => {
                      return (
                        <div className="flex group ">
                          <li
                            onClick={() =>
                              storeData ? listShow(value, index) : null
                            }
                            className={`cursor-pointer w-[100%] hover:text-[#E90854] ${OverviewTextColor == value
                              ? "text-[#E90854]"
                              : "text-black"
                              }`}
                          >

                            {value}
                          </li>
                          {/* <div onClick={() => hsndleDeletList(index)}>
                            <svg
                              id="delete_2_"
                              data-name="delete (2)"
                              xmlns="http://www.w3.org/2000/svg"
                              width="13"
                              height="17.901"
                              viewBox="0 0 15.478 19.901"
                              fill="currentColor"
                              className="text-[#2e2e2e] hover:text-[#e10918] group transition-all"
                            >
                              <g
                                id="Group_17243"
                                data-name="Group 17243"
                                transform="translate(0)"
                                className="opacity-20 group-hover:opacity-100 transition-all"
                              >
                                <g
                                  id="Group_17242"
                                  data-name="Group 17242"
                                  transform="translate(0)"
                                >
                                  <path
                                    id="Path_21094"
                                    data-name="Path 21094"
                                    d="M64,98.6a2.211,2.211,0,0,0,2.211,2.211h8.845A2.211,2.211,0,0,0,77.267,98.6V85.333H64Z"
                                    transform="translate(-62.894 -80.911)"
                                  />
                                  <path
                                    id="Path_21095"
                                    data-name="Path 21095"
                                    d="M54.276,1.106,53.17,0H47.642L46.537,1.106h-3.87V3.317H58.145V1.106Z"
                                    transform="translate(-42.667)"
                                  />
                                </g>
                              </g>
                            </svg>
                          </div> */}
                        </div>
                      );
                    })}
                  </ul>
                </div>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
