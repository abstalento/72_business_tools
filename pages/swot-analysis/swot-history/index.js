import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MyButton from "../../../components/swot-components/my-button/myButton";
import MyInput from "../../../components/swot-components/my-input/myInput";
import SwotHeader from "../../../container/swot-container/swot-header/swotHeader";

export default function SwotHistory() {
  const [mapData, setMapData] = useState();
  const router = useRouter();
  const goHome = () => {
    localStorage.removeItem("swot");
    router.push({
      pathname: "/swot-analysis/",
      // query: {data: true}
    });
  };
  const handleEdit = (uid) => {
    const getUsers = JSON.parse(localStorage.getItem("swotUsers"));
    const updatedUser = getUsers.find((item, id) => {
      return id === uid;
    });
    localStorage.setItem("swot", JSON.stringify(updatedUser));
    const getActiveData = JSON.parse(localStorage.getItem("swot"));
    localStorage.setItem(
      "swot",
      JSON.stringify({ ...getActiveData, data: uid, update: true })
    );
    router.push({
      pathname: "/swot-analysis/",
      query: {
        data: uid,
        update: true,
      },
    });
  };
  const handleDelete = (id) => {
    const usersData = JSON.parse(localStorage.getItem("swotUsers"));
    usersData.splice(id, 1);
    setMapData(usersData);
    localStorage.setItem("swotUsers", JSON.stringify(usersData));
  };
  useEffect(() => {
    // console.log(JSON.parse(router.query.data), "ak-47")
    const getSwot = JSON.parse(localStorage.getItem("swotUsers"));
    if (getSwot) {
      setMapData(getSwot);
    }
  }, [router.query.data]);

  return (
    <div className="w-[100%] h-screen overflow-scroll overflow-x-hidden scrollBar mx-auto">
      <div className="">
      <SwotHeader styles="flex space-x-2 p-3 pl-10"/>
      </div>
      <section className=" bg-[#F5F5F5] h-[100vh] w-full flex justify-center">
        <div className="w-5/6 px-5 py-3">
          <h1 className="text-center my-12 text-xl font-[sfpro-bold]">My History</h1>
          <h2 className="my-2 font-[sfpro-medium] mt-4 text-lg">
            We automatically save all your Swots that you draft to your devices
          </h2>
          <div className="py-1 min-h-[80px] w-full">
            <MyInput
              className="w-full h-[50px] focus:outline-none pl-2 rounded-md font-[sfpro-regular-display]"
              placeholder="Search"
            />
          </div>
          {mapData && mapData.length != 0 ? (
            <div className="max-h-[350px] min-h-[300px] font-[sfpro-regular-display] rounded-md bg-white flex flex-wrap w-[100%] p-8 overflow-y-scroll border my-3 overflow-scroll overflow-x-hidden scrollBar">
              {mapData.map((elem, id) => {
                return (
                  <div
                    key={id}
                    className="group flex flex-col md:w-[12%] h-[130px] mr-4 mb-4 rounded-lg border-2 border-[#009e74] bg-[#F1FAF9]"
                  >
                    {/* <span
                    onClick={() => handleDelete(id)}
                    className="text-right cursor-pointer"
                  >
                    D
                  </span> */}
                    <div className="h-[30px] w-[100%] pt-2 pb-[10px] flex justify-end pr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="MuiSvgIcon-root text-[#515254]/60 hidden h-[15px] group-hover:block hover:text-[#e10918] cursor-pointer"
                        focusable="false"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        onClick={() => handleDelete(id)}
                      >
                        <path
                          d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                          fill="currentColor"
                        ></path>
                      </svg>
                    </div>
                    <div className="text-center" onClick={() => handleEdit(id)}>
                      <h1 className="text-center">{elem?.swotTitle}</h1>
                      <div>
                        <span>{`S:${elem?.Strength?.length} - W: ${elem?.Weakness?.length}`}</span>
                      </div>
                      <div>
                        <span>{`O:${elem?.Opportunities?.length} - T: ${elem?.Threats?.length}`}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="min-h-[400px] bg-white text-black/50 flex justify-center items-center rounded-md shadow-lg font-medium">
              <h1>No SWOTs found</h1>
            </div>
          )}
          <div className="float-right">
            {/* <MyButton
            styles="bg-red-300 mt-2"
            onClick={goHome}
            content="Add New Swot"
          /> */}
            <MyButton
              onClick={goHome}
              content="Add new SWOT"
              styles="w-40 text-lg rounded-lg shadow-lg text-[#000000]/50 px-3 py-2 font-[sfpro-medium] bg-white mt-8"
            />
          </div>
        </div>
      </section>
      <div className="font-[sfpro-regular-display] h-14 flex items-center justify-center text-md w-9/12 mx-auto">
        <p>© 2023,  Alpha Business Solutions Pvt. Ltd. All Rights Reserved.</p>
      </div>
    </div>
  );
}
