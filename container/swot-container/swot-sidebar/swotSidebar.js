import MyButton from "../../../components/swot-components/my-button/myButton";
import { useRouter } from "next/router";
import Link from "next/link";
import PdfProvider from "../../../components/swot-components/pdf-provider/pdfProvider";
import { useEffect, useState } from "react";
import PdfContent from "../pdf-content/pdfContent";
import { SERVER_PROPS_ID } from "next/dist/shared/lib/constants";
import MyImage from "../../../components/swot-components/my-image/myImage";
import Service from "../../../services/swotanalysis/service";
import PouchDB from "pouchdb";

export default function SwotSidebar({
  swotUser,
  isUpdate,
  userid,
  renderComponent,
  renderUpdateState,
  CloseSideBar
}) {
  // console.log(renderComponent);
  const router = useRouter();
  const [allUsers, setAllUsers] = useState([]);
  const [mapData, setMapData] = useState();
  const [update, setUpadte] = useState(true);
  const [isWidth, setIsWidth] = useState(true);
  const [updateId, setUpadteId] = useState();

  useEffect(()=>{
    setIsWidth(true)
  },[CloseSideBar])
  const handleHistory = () => {
    const getUsers = JSON.parse(localStorage.getItem("swotUsers"));
    if (getUsers) {
      if (swotUser) {
        getUsers.map((elem, i) => {
          setAllUsers(allUsers.push(elem));
        });
        setAllUsers(allUsers.push(swotUser));
        localStorage.setItem("swotUsers", JSON.stringify(allUsers));
      }
    } else {
      if (swotUser) {
        setAllUsers(allUsers.push(swotUser));
        localStorage.setItem("swotUsers", JSON.stringify(allUsers));
      }
    }
    router.push({
      pathname: "/swot-analysis/swot-history",
      query: { data: true },
    });
  };
  const handleUpdate = () => {
    const getUsers = JSON.parse(localStorage.getItem("swotUsers"));
    const getUser = JSON.parse(localStorage.getItem("swot"));
    getUsers.splice(updateId, 1, getUser);
    localStorage.setItem("swotUsers", JSON.stringify(getUsers));
    router.push({
      pathname: "/swot-analysis/swot-history",
      query: { data: true },
    });
  };

  const editSwot = (swotData, editId) => {
    const getUsers = JSON.parse(localStorage.getItem("swotUsers"));
    (async function serviceCall() {
      await Service.swotHistory();
      const swotHistory = await Service.swotHistory();
      const swotactive = await Service.swotActiveData();
      // const updatedUser = getUsers.find((item, id) => {
      //   return id === editId;
      // });
      // localStorage.setItem("swot", JSON.stringify(swot));
      // const getActiveData = JSON.parse(localStorage.getItem("swot"));
      // localStorage.setItem(
      //   "swot",
      //   JSON.stringify({ ...getActiveData, data: editId, update: true })
      // );

      var db = new PouchDB("swotAnalysis");
      db.get("swotActiveData", function (err, doc) {
        if (err) {
          var doc = {
            _id: "swotActiveData",
            data: { ...doc.data, data: editId, update: true, swotData },
          };
          db.put(doc);
        }
        db.put(
          {
            _id: doc._id,
            data: { ...doc.data, data: editId, update: true, swotData },
            _rev: doc._rev,
          },
          function (err, response) {
            if (err) {
              return console.log(err, "err");
            } else {
              console.log(response, "ress");
            }
          }
        );
      });
      setUpadte(!update);
      renderUpdateState(update);
    })();
  };

  const widthAdjust = () => {
    setIsWidth(!isWidth);
  };

  useEffect(() => {
    (async function serviceCall() {
      await Service.swotHistory();
      await Service.swotActiveData()
      const swotactive = await Service.swotActiveData();
      const swotHistory = await Service.swotHistory();
      // const getSwot = JSON.parse(localStorage.getItem("swotUsers"));
      if (swotHistory) {
        setMapData(swotHistory.data);
      }
      const getActiveData = JSON.parse(localStorage.getItem("swot"));
      if (swotactive.data) {
        setUpadteId(swotactive.data.data);
      }
    })();
  }, [renderComponent]);
  return (
    <div className={`${!isWidth ? "md:w-[22%] lg:w-[20%] xl:w-[15%] 2xl:w-[13%] mt-[41px] w-[45%] z-50 absolute inset-0 bg-[#ffffff]" : " w-[10%] md:w-[4%]"} border-t-2 group`}>
      <div className="pl-2 md:pl-1 lg:pl-3 xl:pl-6 w-36 h-12 flex items-center justify-between text-sm font-[sfpro-medium]">
        <MyImage
          width="20px"
          height="20px"
          onClick={widthAdjust}
          src="/icons/swotMenu.svg"
          style="cursor-pointer"
        />
        {isWidth ? null : (
          <p className="font-[sf-pro-bold] text-[18px]">SWOT List</p>
        )}
      </div>
      {isWidth ? (
        <div className=" text-center overflow-scroll overflow-x-hidden scrollBar h-[86vh]">
          {" "}
          {mapData?.map((value, index) => (
            <p
              className={`cursor-pointer font-[sfpro-medium] ${
                updateId == index ? "text-[#EF5350]" : "text-black"
              }`}
              onClick={() => editSwot(value, index)}
            >
              {value?.swotTitle?.slice(0, 1)}
            </p>
          ))}
        </div>
      ) : (
        <div className="pr-4">
          {mapData && mapData?.length != 0 ? (
            <div className="md:h-[600px] h-[740px] overflow-scroll overflow-x-hidden scrollBar pr-9">
              {mapData?.map((value, index) => (
                <p
                  className={`pl-6 mt-4 text-[14px] font-[sfpro-medium] cursor-pointer ${
                    updateId == index ? "text-[#EF5350]" : "text-black"
                  }`}
                  onClick={() => editSwot(value, index)}
                >
                  {value.swotTitle}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
