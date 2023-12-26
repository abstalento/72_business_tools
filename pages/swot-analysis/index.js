import { useEffect, useState } from "react";
import SwotContent from "../../container/swot-container/swot-content/swotContent";
import SwotHeader from "../../container/swot-container/swot-header/swotHeader";
import SwotSidebar from "../../container/swot-container/swot-sidebar/swotSidebar";
import { useRouter } from "next/router";
import BtoolsFooter from "../../container/72BTfooter/BToolsFooter";
import BtoolsHeader from "../../container/72BTheader/BToolsHeader";
import FeedBackButton from "../../container/72FeedBackButton/feedBackButton";

export default function SwotAnalysis(props) {
  const router = useRouter();
  const [swotSingleData, setSwotSingleData] = useState();
  const [renderData, setRenderData] = useState(0);
  const [updateStateRender, setUpdataStateRender] = useState();
  const [updateUserId, setUpdateUserId] = useState();
  const [isUpdate, setUpdate] = useState();
  const [CloseSideBar, setCloseSideBar]=useState()
  const getSwotData = (swotUser) => {
    setRenderData((preState) => preState + 1);
    setSwotSingleData(swotUser);
  };

  const renderSidebar = (data) => {
    setRenderData(data);
  };
  const updateState = (data) => {
    setUpdataStateRender(data);
  };
  useEffect(() => {
    // if(Object.keys(router.query).length !== 0 && router.query) {
    //     setUpdateUserId(JSON.parse(router.query.data))
    //     setUpdate(JSON.parse(router.query.update))
    // }
    const getActiveData = JSON.parse(localStorage.getItem("swot"));
    if (getActiveData) {
      setUpdateUserId(getActiveData.data ? getActiveData?.data : "");
      setUpdate(getActiveData.update ? getActiveData.update : "");
    }
  }, []);
  return (
    <>
      <div className="">
        <div className="">
          {/* <SwotHeader styles="flex items-center h-[5vh] min-h-[60px] w-[13%] justify-evenly p-4" /> */}
          <BtoolsHeader
            Src="/images/Swot Analysis.png"
            Height="35"
            Width="100"
          />
        </div>
        <div className="flex h-[95vh] min-h-[95vh] justify-center ">
          <div className="w-[100%] flex">
            <SwotSidebar
              CloseSideBar={CloseSideBar}
              renderComponent={renderData}
              renderUpdateState={updateState}
            />
            <SwotContent
            CloseSideBar={setCloseSideBar}
              getSwotData={getSwotData}
              sideBarRender={renderSidebar}
              swotUser={swotSingleData}
              isUpdate={isUpdate}
              userid={updateUserId}
              updateData={updateStateRender}
            />
          </div>
          {/* <div className="w-1/5">
                        <SwotSidebar swotUser={swotSingleData} isUpdate={isUpdate} userid={updateUserId}/>
                    </div> */}
        </div>
        {/* <div className="text-xs font-[sfpro-medium] bg-white h-[6vh] p-3 flex justify-center items-center">
          © 2022, Alpha Business Solutions Pvt. Ltd. All Rights Reserved.
        </div> */}
        <div>
          <FeedBackButton
            Src="/images/Swot Analysis.png"
            Path="/"
            appName="swotAnalysis"
          />
        </div>
        <BtoolsFooter />
      </div>
    </>
  );
}
