import { useEffect, useRef, useState } from "react";
import MyButton from "../my-button/myButton";
import MyInput from "../my-input/myInput";
import MyImage from "../../../components/swot-components/my-image/myImage";

const DefaultLayout = ({
  title,
  data,
  addField,
  addData,
  deleteField,
  imageSrc,
  styles,
}) => {
  // console.log(data,'data');
  const [storeData, setStoreData] = useState([]);
  const [isActivated, setActivated] = useState(false);
  const [scrollpagee, setScrollPage]=useState(false)
  const chatContainer = useRef();
  const handleField = (heading) => {
    setActivated(true);
    addField(heading);
  };
  const handleData = (e, id) => {
    let data = {
      id,
      title,
      dataValue: e.target.value,
      fieldName: e.target.name,
    };
    setActivated(true);
    addData(data);
  };



  const handleKeyPress = (e, heading) => {
    if (e.key === "Enter") {
      addField(heading);


      
   
  
    }
  };


  useEffect(()=>{
    const scrollToMyRef = () => {
      const scroll =
        chatContainer.current?.scrollHeight -
        chatContainer.current?.clientHeight;
      chatContainer.current?.scrollTo(0, scroll);
    };
    scrollToMyRef()
    scrollToMyRef()
  },[storeData])
     
 
  
 







  const handleDelete = (id) => {
    setActivated(true);
    deleteField(id, title);
  };

  const swotPoints = data[title]?.reduce(
    (total, value) => Number(total) + Number(value.points),
    0
  );

  const defaultValue = data[title]?.reduce(
    (total, value) => total + value.defaultPoints,
    0
  );

  useEffect(() => {
    const swotData = JSON.parse(localStorage.getItem("swot"));
    if (swotData !== null && !isActivated) {
      setStoreData(swotData[title]);
      setActivated(false);
    } else {
      setStoreData(data[title]);
      setActivated(false);
    }
  }, [data, title, isActivated]);

// useEffect(()=>{
//   window.scroll({ bottom: document.body.scrollHeight, left: 0,  behavior: 'smooth' })
//   console.log("caliinggggg");
//   // scroll.current?.scrollIntoView({behavior:"smooth"})
// },[addField])
  return (
    <div className="bg-white rounded-lg shadow-lg m-4 min-h-[230px] h-[260px]  min-w-[38%] p-3">
      <div
        className={`flex text-white font-[sfpro-medium] min-w-[95%] p-[8px] justify-between items-center rounded-md ${styles}`}
      >
        <div className="flex items-center space-x-2 w-[50%] md:w-[32%]">
          <div className="flex justify-between">
            <MyImage src={imageSrc} height="15" width="15" alt="Logo" />
            <h1 className="ml-2">{title}</h1>
          </div>
          <button className="h-[17px] " onClick={() => handleField(title)}>
            <MyImage src="/icons/Add.svg" height="18" width="20" alt="Logo" />
          </button>
        </div>
        <div className="flex font-[sfpro-medium] justify-between text-xs bg-black/10 p-1 px-2 w-24 rounded-md">
          <div>
            <span>Score</span>
          </div>
          <div>
            <span>{Number(swotPoints / data[title].length).toFixed(1)}</span>
            <span>/</span>
            <span>{defaultValue / data[title].length}</span>
          </div>
        </div>
      </div>
      <div 
        ref={chatContainer}
        className={`mt-4 h-[180px] overflow-auto overflow-x-hidden swotContentscroll ` }   
      >
        {storeData?.map((elem, ind) => {
          return (
            <div
             
              key={ind}
              className="flex justify-between mb-2 font-[sfpro-medium]"
            >
              <MyInput
                type="text"
                name="name"
                id={title}
                placeholder={`Enter ${title} here`}
                value={storeData[ind].name}
                className="h-[39px] outline-none text-[12px] rounded-md w-[46%] lg:w-[60%] 2xl:w-[68%] xl:w-[68%] pl-3 font-[sfpro-medium] bg-[#F5F5F5]"
                onChange={(e) => handleData(e, ind, title)}
                onKeyPress={(e) => handleKeyPress(e, title)}
              />
              <div className="xl:w-[20%] 2xl:w-[18%] lg:w-[26%] w-[32%] flex justify-between items-center">
                <div className="w-10 h-[39px] text-sm rounded-md bg-[#F5F5F5] flex items-center justify-center">
                  <MyInput
                    type="number"
                    name="points"
                    id={`${title}Numbers`}
                    value={
                      (storeData[ind].points =
                        storeData[ind].points > 10 ? "0" : storeData[ind].points < 0 ? "0" : storeData[ind].points)
                    }
                    className="w-8 h-[39px] outline-none text-center rounded-md bg-[#F5F5F5]"
                    onChange={(e) => handleData(e, ind)}
                  />
                </div>
                <div className="w-10 h-[39px] text-sm rounded-md bg-[#F5F5F5] flex items-center justify-center">
                  <p className="text-sm">/</p>
                  <p className="text-sm">{storeData[ind].defaultPoints}</p>
                </div>
              </div>
             
              {/* <MyInput
                type="text"
                name="points"
                value={storeData[ind].points}
                className="h-[39px] outline-none rounded-md bg-[#F5F5F5]"
                onChange={(e) => handleData(e, ind)}
              /> */}
              <div
                className={`h-[39px] w-10 outline-none flex items-center justify-center rounded-md opacity-70 ${
                  storeData.length > 1 ? "cursor-pointer" : "cursor-not-allowed"
                }`}
                onClick={storeData.length > 1 ? () => handleDelete(ind) : null}
              >
                <MyImage
                  src="/icons/Icon material-delete.svg"
                  height="15"
                  width="20"
                  alt="Logo"
                />
              </div>
              {/* {storeData.length > 1&&<MyButton 
                                    styles="h-[39px] rounded-md bg-[#F5F5F5]"
                                        content="D"
                                        onClick={()=>handleDelete(ind)}
                                    />} */}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DefaultLayout;
