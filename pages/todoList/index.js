import SideBar from "../../components/todolist/sidebar/sideBarTodo";
import BtoolsHeader from "../../container/72BTheader/BToolsHeader";
import Image from "next/image";
import PdfProvider from "../../components/invoicegenerator/pdf-provider/PdfProvider";
import AddTodoList from "../../components/todolist/addTodoList/addTodoList";
import { useEffect, useState } from "react";
import PouchDB from "pouchdb";
import Service from "../../services/todoList/service";
import TodoDeletePopUp from "../../components/todolist/todoDelete/todoDelete";
import ExportTodoList from "../../components/todolist/exportPopUp/exportPopUp";
import FeedBackButton from "../../container/72FeedBackButton/feedBackButton";
import BtoolsFooter from "../../container/72BTfooter/BToolsFooter";
import VerifyIcon from "../../public/icons/verify.svg";
import { PDFViewer } from "@react-pdf/renderer";
import TodoPdfContent from "../../components/todolist/pdfcontenttodo/pdfContentTodo";
import { v4 as uuidv4 } from "uuid";
import CompleteTodoList from "../../components/todolist/completePopUp/todoComplete";
import SearchPopup from "../../components/todolist/search popup/searchpopup";

const TodoList = (props) => {

  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let myMonth = month >= 9 ? month : ("0" + month)
  let dayZero = day >= 9 ? day : ("0" + day)
  let currentDateValue = `${year}-${myMonth}-${dayZero}`;




  const [todoListName, setTodoListName] = useState([]);
  const [isNewTask, setIsNewTask] = useState(false);
  const [headName, setHeadName] = useState("overview");
  const [stateDate, setStateDate] = useState(currentDateValue);
  // const [stateDateValue, setStateDateValue]=useState(currentDateValue)
  const [dataSearch, setDataSearch] = useState();
  const [editId, setEditId] = useState();
  const [callUseEffect, setCallUseEffect] = useState(0);
  const [useEffectCall, setUseEffectCall] = useState(0);
  const [completeData, setCompleteData] = useState();
  const [isComplete, setIsComplete] = useState(false);
  const [completeIndex, setCompleteIndex] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [monthLength, setMonthLength] = useState(0);
  const [isExport, setIsExport] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const [isDelete, setIsDelete] = useState(false);
  const [HandleMenuItem, setHandleMenuItem] = useState(false);
  const [searchBarView, setSearchBar] = useState(false);
  const [dateView, setDateChange] = useState(false);
  const [openDotViewPage, setOpenDotView] = useState(false);
  const [openSavePage, setOpenDateSavePage] = useState()
  const [indexMap, setIndex] = useState();
  const [openViewEditPage, setopenDotViewEditPage] = useState()
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [openSearchPopup, setOpenSearchPopup] = useState()
  const [isAllowToComplete,setIsAllowToComplete] = useState(false)
  const [todoDatas, setTodoDatas] = useState({
    // todoList:"",
    datas: [
      {
        id: uuidv4(),
        taskTitle: "",
        listName: "",
        description: "",
        date: "",
        time: "",
        priority: "",
        finishedIn: "",
        isComplete: "progress",
      },
    ],
  });
  const [priorityImage, setPriorityImage] = useState({
    myImage: "",
  });
  const [storeData, setStoreData] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [filterStoreData, setFilterStoreData] = useState([]);
  const [isFilterClick,setIsFilterClick] = useState(false)
  const [isTodoList, setIsTodoList] = useState(false);
  if (typeof window !== "undefined") {
    const tx = document.getElementsByTagName("textarea");
    for (let i = 0; i < tx.length; i++) {
      tx[i].setAttribute(
        "style",
        "height:" + tx[i].scrollHeight + "px;overflow-y:hidden;"
      );
      tx[i].addEventListener("input", OnInput, false);
    }

    function OnInput() {
      this.style.height = 0;
      this.style.height = this.scrollHeight + "px";
    }
  } else {
  }
  const addNewTask = () => {
    setIsEdit(false);
    setSearchValue();
    setIsNewTask(true);
    setTodoDatas({
      ...todoDatas,
      datas: [
        {
          id: uuidv4(),
          taskTitle: "",
          listName: "",
          description: "",
          date: "",
          time: "",
          priority: "",
          finishedIn: "",
          isComplete: "progress",
        },
      ],
  
    });
    
  };

  const addList = () => {
    if (storeData == undefined) {
      setIsTodoList(true);
    } else {
      addNewTask()
    }
  };

  const addTodoList = (data) => {
    // newData[data.todoName] = data.todoValue
    // setTodoDatas({...todoDatas,[data.todoName]:data.todoValue})
    const newList = [...todoListName, data.todoValue];
    setTodoListName([...todoListName, data.todoValue]);
    var db = new PouchDB("todoList");
    db.get("todoListDatas", function (err, doc) {
      if (err) {
        // allUser.push(newData);
        var doc = {
          _id: "todoListDatas",
          data: newList,
        };
        db.put(doc);
        // setUseEffectCall((preState) => ++preState);
        // setCallUseEffect((preVal) => ++preVal);
      }
      if (doc) {
        // doc.data.map((elem, i) => {
        //   allUser.push(elem);
        // });
        // allUser.push(newData);
        // const newList = [...todoListName,data.todoValue]
      }
      // setUseEffectCall((preState) => ++preState);
      db.put(
        {
          _id: doc._id,
          data: newList,
          _rev: doc._rev,
        },

        function (err, response) {
          if (err) {
            return console.log(err, "err");
          } else {
            console.log(response, "ress");
            setUseEffectCall((preState) => ++preState);
            addNewTask()
          }
        }
      );
    });
    setIsNewTask(true)
    setIsTodoList(false);
  };

  const addTodoChange = (index) => {
    return (event) => {
      let searchIndex;
      if (event.target.value === "addnew") {
        setIsTodoList(true);
      } else {
        if (searchValue) {
          let filteredStoreData = filterStoreData.datas.at(index);
          const { name, value } = event.target;
          searchIndex = storeData.datas.findIndex(
            (data) => data.id == filteredStoreData.id
          );
          const todoDatasState = JSON.parse(JSON.stringify(filterStoreData));
          todoDatasState.datas[index][name] = value;
          setFilterStoreData(todoDatasState);
          storeData.datas.splice(searchIndex, 1, todoDatasState.datas.at(index));
        }

        if (isEdit) {
          const { name, value } = event.target;
          const todoDatasState = JSON.parse(JSON.stringify(storeData));
          todoDatasState.datas[searchValue ? searchIndex : index][name] = value;
          setStoreData(todoDatasState);
        } else {
          const { name, value } = event.target;
          const todoDatasState = JSON.parse(JSON.stringify(todoDatas));
          todoDatasState.datas[searchValue ? searchIndex : index][name] = value;
          setTodoDatas(todoDatasState);
        }
      }

    };
  };

  const searchData = (e) => {
    let searchData = {};
    setSearchValue(e.target.value.toLowerCase());
    if (!e.target.value) return setFilterStoreData([]);
    const mySearch = dataSearch.datas.filter(
      (value) =>
        value.taskTitle.toLowerCase().indexOf(e.target.value.toLowerCase()) >=
          0 ||
        value.listName.toLowerCase().indexOf(e.target.value.toLowerCase()) >= 0
    );
    searchData.datas = mySearch;
    setFilterStoreData(searchData);
  };

  const dateChange = async (e) => {
    setStateDate(e.target.value);
    setSearchValue(e.target.value);
    const filterObj = {};
    var db = new PouchDB("todoList");
    const pouchdbStoreData = (await db.get("todoHistory")).data;
    const filterTodoList = pouchdbStoreData.datas.filter((data) => {
      if (data.date == e.target.value) {
        // console.log(data);
        return data;
      }
    });

    filterObj.datas = filterTodoList;
    setFilterStoreData(filterObj);
  };

  const addListClick = (stateData = undefined) => {

    var db = new PouchDB("todoList");
    db.get("todoHistory", function (err, doc) {
      let allUser = [];

      if (err) {
        var doc = {
          _id: "todoHistory",
          data: todoDatas,
        };
        db.put(doc);
        setIsNewTask(false);
      }
      if (doc) { 
        if (isEdit || isAllowToComplete) {
          let storedData = storeData
          if(stateData && isAllowToComplete){
            storedData = stateData
          }
          allUser = doc.data;
          if(isFilterClick){
           let updatedObj =  storedData.datas[editId]
           let filterData = allUser.datas.filter(data=>data.id !== updatedObj.id)
           filterData.push(updatedObj)
           allUser.datas = filterData
          }else{
            allUser.datas = storedData.datas;
          }
          
          setIsEdit(false);
          setIsAllowToComplete(false)
        } else {
          allUser = doc.data;
          allUser.datas.push(todoDatas.datas.at(-1));
          setIsNewTask(false);
        }
      }
      db.put(
        {
          _id: doc._id,
          data: allUser,
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
    setCallUseEffect((preVal) => ++preVal);
    setUseEffectCall((preState) => ++preState);
    setopenDotViewEditPage(!openDotViewEditPage)
    setShowEditPopup(false)
    setOpenDotView(false)
  };
  const undoAddTask = () => {
    setIsNewTask(false);
  };
  const closeAddPopUp = () => {
    setIsTodoList(false);
  };

  const addListState = () => {
    setIsTodoList(true);
  };
const addListStateMobile=()=>{
  setIsTodoList(false);
}
  const editClick = (index) => {
    setIsEdit(true);
    setEditId(index);
    setIsNewTask(false);
    setShowEditPopup(true)
    if(isFilterClick){
      setStoreData(filterStoreData)
    }
  };
  const todoDelete = (index) => {
    setIsDelete(true);
    setDeleteId(index);


  };
  const closeDelete = () => {
    setIsDelete(false);
  };
  const handleDelete = (data) => {
    var db = new PouchDB("todoList");
    db.get("todoHistory", function (err, doc) {
      let allUser = [];
      if (err) {
        var doc = {
          _id: "todoHistory",
          data: todoDatas,
        };
        db.put(doc);
      }
      if (doc) {
        if (searchValue) {
          let filteredStoreData = filterStoreData.datas.at(data);
          let searchIndex = storeData.datas.findIndex(
            (data) => data.id == filteredStoreData.id
          );
          doc.data.datas.splice(searchIndex, 1);
          setSearchValue();
        } else {
          doc.data.datas.splice(data, 1);
        }
        allUser = doc.data;
        allUser.datas = doc.data.datas;
      }
      db.put(
        {
          _id: doc._id,
          data: allUser,
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
    setIsDelete(false);
    setCallUseEffect((preValue) => ++preValue);
  };
  const progressClick = (index, data) => {
    setEditId(index);
    setIsEdit(true)
    setIsAllowToComplete(true)
    setCompleteData(data);
    setCompleteIndex(index);
    setIsComplete(true);
  };

  const openExportPopup = () => {
    setIsExport(true);
  };
  const exportClose = (data) => {
    setIsExport(data);
  };
  const popUpClose = () => {
    setIsExport(false);
  };
  const opensearchPage = () => {
    setOpenSearchPopup(!openSearchPopup)
  }
  const headerName = (data) => {
    setHeadName(data);
  };
  const openDateSavePage = () => {
    setOpenDateSavePage(!openSavePage)
  }

  const listShow = async (datas) => {
    if (isNewTask == false && isEdit == false) {
      setSearchValue(datas);
      const filterObj = {};
      var db = new PouchDB("todoList");
      const pouchdbStoreData = (await db.get("todoHistory")).data;
      const filterTodoList = pouchdbStoreData.datas.filter((data) => {
        if (datas == "All") {
          return pouchdbStoreData.datas;
        } else {
          return data.listName == datas;
        }
      });
      filterObj.datas = filterTodoList;
      setIsFilterClick(true)
      setFilterStoreData(filterObj);
    }
  };

  let currentDay = new Date();

  const currentDate = currentDay.getMonth() + 1;
  const filterData = storeData?.datas.filter((value) => {
    const myDay = new Date(value.date);
    const myDate = myDay.getMonth() + 1;
    return myDate == currentDate && value.isComplete !== "complete";
  });
  const closepopUpData = (data) => {
    setIsComplete(data);
  };

  const completeProgress = (data, index) => {
    if (searchValue) {
      let filteredStoreData = filterStoreData.datas.at(index);
      let searchIndex = storeData.datas.findIndex(
        (data) => data.id == filteredStoreData.id
      );
      const todoDatasState = JSON.parse(JSON.stringify(filterStoreData));
      todoDatasState.datas[index]["isComplete"] =
        data.isComplete == "progress" ? "complete" : "progress";
      setFilterStoreData(todoDatasState);
      
      storeData.datas.splice(searchIndex, 1, todoDatasState.datas.at(index));
      addListClick(todoDatasState)
    } else {
      const todoDatasState = JSON.parse(JSON.stringify(storeData));
      todoDatasState.datas[index]["isComplete"] =
        data.isComplete == "progress" ? "complete" : "progress";
      setStoreData(todoDatasState);
      addListClick(todoDatasState)
    }
    setIsComplete(false);
  };

  const finishedProgress = (name, value, index) => {
    let searchIndex;

    if (searchValue) {
      let filteredStoreData = filterStoreData.datas.at(index);
      // const { name, value } = event.target;
      searchIndex = storeData.datas.findIndex(
        (data) => data.id == filteredStoreData.id
      );
      const todoDatasState = JSON.parse(JSON.stringify(filterStoreData));
      todoDatasState.datas[index][name] = value;
      setFilterStoreData(todoDatasState);
      storeData.datas.splice(searchIndex, 1, todoDatasState.datas.at(index));
    }

    if (isEdit || isAllowToComplete) {
      // const { name, value } = event.target;
      const todoDatasState = JSON.parse(JSON.stringify(storeData));
      todoDatasState.datas[searchValue ? searchIndex : index][name] = value;
      setStoreData(todoDatasState);
    } else {
      // const { name, value } = event.target;
      const todoDatasState = JSON.parse(JSON.stringify(todoDatas));
      todoDatasState.datas[searchValue ? searchIndex : index][name] = value;
      setTodoDatas(todoDatasState);
    }
  };

  const handleMenu = () => {
    setHandleMenuItem(!HandleMenuItem);
  };
  const handleMenuClose = () => {
    setHandleMenuItem(false);
  };

  const searchBar = () => {
    setSearchBar(!searchBarView);
  };

  const dateChangeView = () => {
    setDateChange(!dateView);
  };

  const openDotView = (index) => {
    setIndex(index);
    setOpenDotView(!openDotViewPage);
    setopenDotViewEditPage(!openDotViewEditPage)
  };

  const openDotViewEditPage = () => {
    setopenDotViewEditPage(true)
  }
  const getTodoHistory = async () => {
    await Service.todoHistory();
    const todoHistory = await Service.todoHistory();
    return todoHistory
  }
  useEffect(() => {
    (async function serviceCall() {
      let todoHistory = await getTodoHistory()
      if (todoHistory.data) {
        // setTodoDatas(todoHistory.data)
        setStoreData(todoHistory.data);
        setDataSearch(todoHistory.data);
      }
    })();
    (async function serviceCall() {
      await Service.todoListData();
      const todolistData = await Service.todoListData();
      if (todolistData.data) {
        setTodoListName(todolistData.data);
      }
    })();
  }, [callUseEffect]);

  const closeEditPopup = async () => {
    let todoHistory = await getTodoHistory()
    if (todoHistory.data) {
      // setTodoDatas(todoHistory.data)
      setStoreData(todoHistory.data);
      setDataSearch(todoHistory.data);
    }
    setShowEditPopup(false)
    openDotView()
    setIsEdit(false)
  }
  const addNewList = (e) => {
    e.stopPropagation();

  }
  return (
    <>
      {isComplete ? (
        <CompleteTodoList
          completeValue={completeData}
          completeId={completeIndex}
          closepopUpData={closepopUpData}
          completeProgress={completeProgress}
          finishedProgress={finishedProgress}
        />
      ) : null}

      {isExport ? (
        <ExportTodoList
          datas={storeData.datas}
          closepopUp={popUpClose}
          closeExport={exportClose}
        />
      ) : null}
      {isDelete ? (
        <TodoDeletePopUp
          closeDeletePopup={closeDelete}
          deleteField={deleteId}
          newTodo={handleDelete}
        />
      ) : null}
      {
        isTodoList ? (
          <AddTodoList title={addTodoList} closeAdd={closeAddPopUp} />
        ) : null}
      <div className="h-[100vh] hidden md:block ">
        <div className="border-b flex  items-center justify-between">
          <div className="flex items-center">
            <div>
              <BtoolsHeader
                Src="/images/NewListLogo.png"
                Height="50"
                Width="120"
              />
            </div>
            <div className=" hidden md:block font-[sf-pro-medium] text-[12px] bg-[#F1F1F1] px-1">
              / {headName}
            </div>
          </div>
          <div>
            <div className="md:pr-10 pt-1">
              <div className="flex space-x-3">
                <div
                  className="md:w-[45%] lg:45 xl:w-[45%] w-[45%]"
                  id="listPopup"
                  title="Add New List"
                  onClick={addList}
                >
                  <Image
                    width="38px"
                    height="38px"
                    src="/icons/AddTodo.svg"
                    className="hover:cursor-pointer"
                  />
                </div>
                <div
                  className={`${storeData?.datas.length == 0 ||
                    storeData?.datas == undefined
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                    }`}
                  onClick={
                    storeData?.datas.length == 0 ||
                      storeData?.datas == undefined
                      ? null
                      : openExportPopup
                  }
                >
                  <Image
                    width="38px"
                    height="38px"
                    src="/icons/TodoExport.svg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="relative md:hidden ">
            {HandleMenuItem && (
              <SideBar
                callUseEffect={useEffectCall}
                showList={listShow}
                newTask={isNewTask}
                myEdit={isEdit}
                addListState={addListState}
                headerName={headerName}
              />
            )}
          </div>
          <div className="relative md:block hidden">
            <SideBar
              callUseEffect={useEffectCall}
              showList={listShow}
              newTask={isNewTask}
              myEdit={isEdit}
              addListState={addListState}
              headerName={headerName}
            />
          </div>
          <div className="w-[100%] bg-[#00000029]/5 hidden md:block">
            <div className="w-[100%] bg-[#EBEBEB] h-[calc(100vh-90vh)] flex items-center justify-between">


              <div className="flex w-[48%] items-center  space-x-3 pl-12">

                <div
                  id="addTask"
                  className={`flex items-center group hover:bg-white p-1 rounded-[5px] justify-center space-x-3 md:w-[20%] lg:w-[7%] xl:w-[28%] bg-[#FFFFFF]/50 ${todoListName.length == 0 || todoListName == undefined
                    ? "cursor-not-allowed"
                    : "cursor-pointer"
                    }`}
                  onClick={
                    todoListName.length == 0 || todoListName == undefined
                      ? null
                      : addNewTask
                  }
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 22 22">
                    <g id="Group_18258" data-name="Group 18258" transform="translate(0 -4)">#0d0d0d
                      <rect id="Rectangle_7346" data-name="Rectangle 7346" width="22" className="group-hover:text-[#E90854]" height="35" rx="2" transform="translate(0 4)" fill="currentcolor" opacity="0.8" />
                      <path id="plus_2_" data-name="plus (2)" d="M10.983,5.2H6.359V.578A.578.578,0,0,0,5.2.578V5.2H.578a.578.578,0,0,0,0,1.156H5.2v4.625a.578.578,0,1,0,1.156,0V6.359h4.625a.578.578,0,1,0,0-1.156Zm0,0" transform="translate(5.404 9.5)" fill="#fff" stroke="#fff" stroke-width="1" />
                    </g>
                  </svg>
                  <h1 className="font-[sf-pro-medium] text-lg group-hover:text-[#E90854] md:hidden lg:hidden xl:block">Add New Task</h1>
                </div>
                <div>
                  <Image
                    src="/icons/lineIcon.svg"
                    height="38"
                    width="12"
                    alt="btLineLogo"
                  />
                </div>
                <div className="bg-white w-[75%] md:px-3 md:p-1 rounded flex items-center justify-between">
                  <div className="flex items-center space-x-2 w-[80%]">
                    <Image
                      src="/icons/Search Icon.svg"
                      width="15"
                      height="30"
                    />
                    <input
                      className="font-[sf-pro-medium] w-[100%] focus:outline-none"
                      placeholder="Search projects..."
                      onChange={dataSearch?.datas ? searchData : null}

                    />
                  </div>
                  <div className="lg:w-[18%] md:w-[34%]">
                    <button className="bg-[#E90854] font-[sf-pro-medium] w-[100%] rounded text-white">
                      Search
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex text-[12px] font-[sf-pro-medium] items-center w-[48%] space-x-2">
                <div className="p-1 bg-white w-[22%] rounded-md flex items-center justify-center space-x-2">
                  <Image
                    src="/icons/todoCalender.svg"
                    height="32"
                    width="22"
                    alt="btLineLogo"
                  />
                  <input className="datePickercalendarIcon" type="date" onChange={storeData == undefined || storeData?.datas?.length == 0 ? null : dateChange} value={stateDate} />
                  <Image
                    src="/icons/todoDownArrow.svg"
                    height="32"
                    width="12"
                    alt="btLineLogo"
                  />
                </div>
                <div>
                  <Image
                    src="/icons/lineIcon.svg"
                    height="32"
                    width="12"
                    alt="btLineLogo"
                  />
                </div>
                <h1 className="text-[16px]">
                  You've got{" "}
                  <span className="text-[#E90854] font-bold mx-1">
                    {filterData?.length ? filterData?.length : 0}
                  </span>{" "}
                  tasks coming up in the next days.
                </h1>
              </div>
            </div>
            {/* <div
              id="addTask"
              className={`flex space-x-6 mx-16 items-center mt-5 w-[18%] ${
                todoListName.length == 0 || todoListName == undefined
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              onClick={
                todoListName.length == 0 || todoListName == undefined
                  ? null
                  : addNewTask
              }
            >
              <Image src="/icons/todoAddTask.svg" width="20" height="50" />
              <h1 className="font-[sf-pro-medium] text-lg w-[80%]">
                Add New Task
              </h1>isNewTask
            </div> */}
            {todoListName.length == 0 || todoListName == undefined ? (
              <div className="min-h-[80vh] font-[sf-pro-medium] flex justify-center items-center">
                Add List to start your Todo
              </div>
            ) : (
              <div className="min-h-[80vh] max-h-[80vh] mb-6 overflow-scroll scrollBar">
                {isNewTask ? (
                  <div>
                    {todoDatas.datas.map((data, index) => {
                      return (
                        <div className=" mt-5 w-[80%] mx-16 min-h-[15vh] rounded-xl bg-white flex p-3 justify-between">
                          <div className="w-[75%]">
                            <div className="w-[100%] pl-4 flex h-[5vh] justify-between items-center">
                              <div className="flex justify-between items-center font-[sf-pro-medium]">
                                <div className="flex items-center w-[70%] space-x-2">
                                  <Image
                                    src="/icons/taskTodo.svg"
                                    width="20"
                                    height="50"
                                  />
                                  <input
                                    id="taskadd"
                                    className="focus:outline-none w-[80%]"
                                    placeholder="Enter your task tittle.."
                                    maxLength={38}
                                    name="taskTitle"
                                    value={data.taskTitle}
                                    onChange={addTodoChange(index)}
                                  />
                                  <span className="relative top-1">
                                    {data.priority == "Low Priority" ? (
                                      <VerifyIcon
                                        fill="currentColor"
                                        width="18px"
                                        height="30px"
                                        style={{
                                          color: "#FC9F13",
                                        }}
                                      />
                                    ) : data.priority == "Mid Priority" ? (
                                      <VerifyIcon
                                        fill="currentColor"
                                        width="18px"
                                        height="30px"
                                        style={{
                                          color: "#857AF0",
                                        }}
                                      />
                                    ) : data.priority == "High Priority" ? (
                                      <VerifyIcon
                                        fill="currentColor"
                                        width="18px"
                                        height="30px"
                                        style={{
                                          color: "#E90854",
                                        }}
                                      />
                                    ) : (
                                      <VerifyIcon
                                        fill="currentColor"
                                        width="18px"
                                        height="30px"
                                        style={{
                                          color: "#16161666",
                                        }}
                                      />
                                    )}
                                  </span>
                                </div>
                                <div className="bg-[#F6F6F6]/100 mt-2 px-2 w-[50%] rounded text-md">
                                  <select
                                    name="listName"
                                    className="bg-[#F6F6F6]/100 w-[100%]"
                                    placeholder="Select List Name"
                                    value={data.listName}
                                    onChange={addTodoChange(index)}
                                  >
                                    <option hidden>Select List</option>
                                    {todoListName.map((value) => {
                                      return (
                                        <option value={value}>{value}</option>
                                      );
                                    })}
                                  </select>
                                </div>
                              </div>
                              {/* <div className="font-[sf-pro-medium] w-[22%]">
                      <span>*Finished in:</span>
                      <input value={data.finishedIn} onChange={addTodoChange(index)} name="finishedIn" className="w-[50%] pl-1 focus:outline-none" maxLength={10}/>
                    </div> */}
                            </div>
                            <textarea
                              id="addDescription"
                              className="focus:outline-none w-[100%] block resize-none overflow-hidden pl-11 mt-1 font-[sf-pro-medium]"
                              placeholder="Enter your task description."
                              name="description"
                              value={data.description}
                              onChange={addTodoChange(index)}
                            />
                          </div>
                          <div className="w-[24%] pl-6 border-l-[3px] border-dashed flex">
                            <div className="flex flex-col space-y-3 pt-2 w-[90%]">
                              <input
                                id="addDate"
                                className="font-[interSemiBold] w-[65%] text-[13px]"
                                type="date"
                                name="date"
                                value={data.date}
                                onChange={addTodoChange(index)}
                              />
                              <input
                                id="addTime"
                                className="font-[interSemiBold] w-[65%] text-[13px]"
                                type="time"
                                name="time"
                                value={data.time}
                                onChange={addTodoChange(index)}
                              />
                              <div className="flex items-center w-[65%] justify-between text-[13px]">
                                <select
                                  id="addPriority"
                                  placeholder="Select Priority"
                                  className="font-[interSemiBold] focus:outline-none"
                                  name="priority"
                                  value={data.priority}
                                  onChange={addTodoChange(index)}
                                >
                                  <option value="Select Priority" hidden>
                                    Select Priority
                                  </option>
                                  <option value="Low Priority">
                                    Low Priority
                                  </option>
                                  <option value="Mid Priority">
                                    Mid Priority
                                  </option>
                                  <option value="High Priority">
                                    High Priority
                                  </option>
                                </select>
                                {data.priority == "Low Priority" ? (
                                  <VerifyIcon
                                    fill="currentColor"
                                    width="18px"
                                    height="30px"
                                    style={{
                                      color: "#FC9F13",
                                    }}
                                  />
                                ) : data.priority == "Mid Priority" ? (
                                  <VerifyIcon
                                    fill="currentColor"
                                    width="18px"
                                    height="30px"
                                    style={{
                                      color: "#857AF0",
                                    }}
                                  />
                                ) : data.priority == "High Priority" ? (
                                  <VerifyIcon
                                    fill="currentColor"
                                    width="18px"
                                    height="30px"
                                    style={{
                                      color: "#E90854",
                                    }}
                                  />
                                ) : (
                                  <VerifyIcon
                                    fill="currentColor"
                                    width="18px"
                                    height="30px"
                                    style={{
                                      color: "#16161666",
                                    }}
                                  />
                                )}
                              </div>
                            </div>
                            <div className=" flex flex-col items-center mt-1">
                              <span
                                id="newTodo"
                                className={`${data.taskTitle &&
                                  data.priority &&
                                  data.date &&
                                  data.time &&
                                  data.listName
                                  ? "cursor-pointer"
                                  : "cursor-not-allowed"
                                  }`}
                                onClick={
                                  data.taskTitle &&
                                    data.priority &&
                                    data.date &&
                                    data.time &&
                                    data.listName
                                    ? addListClick
                                    : null
                                }
                              >
                                <Image
                                  src="/icons/todoAdd.svg"
                                  width="20"
                                  height="30"
                                />
                              </span>
                              <span>
                                <Image
                                  src="/icons/dotLines.svg"
                                  width="20"
                                  height="30"
                                />
                              </span>
                              <span
                                className="cursor-pointer"
                                onClick={undoAddTask}
                              >
                                <Image
                                  src="/icons/todoCross.svg"
                                  width="20"
                                  height="30"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}{" "}
                  </div>
                ) : null}
                {!todoDatas.datas.length == 0 ? (
                  <div>
                    {searchValue
                      ?
                      filterStoreData?.datas?.length == 0 ? <div className="h-[60vh] font-[sf-pro-medium] flex items-center justify-center">No task Found</div> :
                        filterStoreData?.datas?.map((data, index) => (
                          <div className=" mt-5 w-[80%] mx-16 min-h-[16vh] rounded-xl bg-white flex p-3 justify-between">
                            <div className="w-[75%]">
                              <div className="w-[100%] pl-4 flex h-[5vh] justify-between items-center">
                                <div className="flex space-x-4 w-[60%] items-center font-[sf-pro-medium]">
                                  <div className="flex items-center space-x-2 w-[70%]">
                                    <Image
                                      src={`${data.isComplete == "complete"
                                        ? "/icons/taskComplete.svg"
                                        : "/icons/taskTodo.svg"
                                        } `} //taskTodo.svg
                                      width="20"
                                      height="50"
                                      onClick={data?.description!=''&& data?.isComplete!='' && data?.listName!='' && data?.priority!='' && data?.taskTitle?() => progressClick(index, data):null}
                                    />
                                    {isEdit && editId == index ? (
                                      <input
                                        className={`focus:outline-none w-[100%] font-extrabold ${data.isComplete == "complete"
                                          ? "text-[#409E0A]"
                                          : ""
                                          }`}
                                        placeholder="Enter your task tittle.."
                                        name="taskTitle"
                                        value={data.taskTitle}
                                        onChange={
                                          isEdit && editId == index
                                            ? addTodoChange(index)
                                            : null
                                        }
                                      />
                                    ) : (
                                      <p
                                        className={`focus:outline-none w-[100%] font-extrabold ${data.isComplete == "complete"
                                          ? "text-[#409E0A]"
                                          : ""
                                          }`}
                                      >
                                        {data.taskTitle}
                                      </p>
                                    )}
                                    <span className="relative top-1">
                                      {data.isComplete == "complete" ? (
                                        <VerifyIcon
                                          fill="currentColor"
                                          width="18px"
                                          height="30px"
                                          style={{
                                            color: "#409E0A",
                                          }}
                                        />
                                      ) : (
                                        <span>
                                          {data.priority == "Low Priority" ? (
                                            <VerifyIcon
                                              fill="currentColor"
                                              width="18px"
                                              height="30px"
                                              style={{
                                                color: "#FC9F13",
                                              }}
                                            />
                                          ) : data.priority ==
                                            "Mid Priority" ? (
                                            <VerifyIcon
                                              fill="currentColor"
                                              width="18px"
                                              height="30px"
                                              style={{
                                                color: "#857AF0",
                                              }}
                                            />
                                          ) : data.priority ==
                                            "High Priority" ? (
                                            <VerifyIcon
                                              fill="currentColor"
                                              width="18px"
                                              height="30px"
                                              style={{
                                                color: "#E90854",
                                              }}
                                            />
                                          ) : (
                                            <VerifyIcon
                                              fill="currentColor"
                                              width="18px"
                                              height="30px"
                                              style={{
                                                color: "#409E0A",
                                              }}
                                            />
                                          )}
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                  <div className="bg-[#F6F6F6]/100 w-[30%] px-2 rounded text-md">
                                    {isEdit && editId == index ? (
                                      <select
                                        name="listName"
                                        className={`bg-[#F6F6F6]/100 focus:outline-none font-[interSemiBold] ${data.isComplete == "complete"
                                          ? "text-[#409E0A]"
                                          : "text-[#E90854]"
                                          }`}
                                        placeholder="Select List Name"
                                        value={data.listName}
                                        onChange={
                                          isEdit && editId == index
                                            ? addTodoChange(index)
                                            : null
                                        }
                                      >
                                        {todoListName.map((value) => {
                                          return (
                                            <option value={value}>
                                              {value}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    ) : (
                                      <p
                                        className={`bg-[#F6F6F6]/100 font-[interSemiBold] ${data.isComplete == "complete"
                                          ? "text-[#409E0A]"
                                          : "text-[#E90854]"
                                          }`}
                                      >
                                        #{data.listName}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                {/* <div className={`font-[sf-pro-medium] ${data.isComplete == 'complete' ? 'text-[#409E0A]':''}`}>
                    *Finished in: 02:00 Hrs
                  </div> */}
                                <div
                                  className={`font-[sf-pro-medium] w-[22%] ${data.isComplete == "complete"
                                    ? "text-[#409E0A]"
                                    : ""
                                    }`}
                                >
                                  <span>*Finished in:</span>
                                  <input
                                    placeholder="00:00 Hrs"
                                    value={data.finishedIn}
                                    onChange={
                                      isEdit && editId == index
                                        ? addTodoChange(index)
                                        : null
                                    }
                                    name="finishedIn"
                                    className="w-[50%] text-[13px] pl-1 focus:outline-none"
                                    maxLength={10}
                                  />
                                </div>
                              </div>
                              <textarea
                                className={`overflow-hidden resize-none block focus:outline-none w-[100%] pl-11 mt-1 font-[sf-pro-medium] ${data.isComplete == "complete"
                                  ? "line-through"
                                  : ""
                                  }`}
                                placeholder="Enter your task description."
                                name="description"
                                value={data.description}
                                onChange={
                                  isEdit && editId == index
                                    ? addTodoChange(index)
                                    : null
                                }
                              />
                            </div>
                            <div className="w-[24%] pl-6 border-l-[3px] border-dashed flex">
                              <div className="flex flex-col pt-1 space-y-2 w-[90%]">
                                <input
                                  className="font-[interSemiBold] w-[65%] text-[13px]"
                                  type="date"
                                  name="date"
                                  value={data.date}
                                  onChange={
                                    isEdit && editId == index
                                      ? addTodoChange(index)
                                      : null
                                  }
                                />
                                <input
                                  className="font-[interSemiBold] w-[65%] text-[13px]"
                                  type="time"
                                  name="time"
                                  value={data.time}
                                  onChange={
                                    isEdit && editId == index
                                      ? addTodoChange(index)
                                      : null
                                  }
                                />
                                <div className="flex font-[interSemiBold] items-center w-[65%] justify-between text-[13px]">
                                  <select
                                    placeholder="Select Priority"
                                    className="font-[interSemiBold] focus:outline-none"
                                    name="priority"
                                    value={data.priority}
                                    onChange={
                                      isEdit && editId == index
                                        ? addTodoChange(index)
                                        : null
                                    }
                                  >
                                    <option>Low Priority</option>
                                    <option>Mid Priority</option>
                                    <option>High Priority</option>
                                  </select>
                                  {/* <Image
                      src= '/icons/verifylow.svg'
                      width="18"
                      height="30"
                    /> */}
                                  {data.isComplete == "Low Priority" ? (
                                    <VerifyIcon
                                      fill="currentColor"
                                      width="18px"
                                      height="30px"
                                      style={{
                                        color: "#FC9F13",
                                      }}
                                    />
                                  ) : data.priority == "Mid Priority" ? (
                                    <VerifyIcon
                                      fill="currentColor"
                                      width="18px"
                                      height="30px"
                                      style={{
                                        color: "#857AF0",
                                      }}
                                    />
                                  ) : data.priority == "High Priority" ? (
                                    <VerifyIcon
                                      fill="currentColor"
                                      width="18px"
                                      height="30px"
                                      style={{
                                        color: "#E90854",
                                      }}
                                    />
                                  ) : (
                                    <VerifyIcon
                                      fill="currentColor"
                                      width="18px"
                                      height="30px"
                                      style={{
                                        color: "#FC9F13",
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                              <div className=" flex flex-col items-center space-y-1">
                                {isEdit && editId == index ? (
                                  <span
                                    className={`cursor-pointer ${data.taskTitle
                                      ? "cursor-pointer"
                                      : "cursor-not-allowed"
                                      }`}
                                    onClick={
                                      data.taskTitle ? addListClick : null
                                    }
                                  >
                                    <Image
                                      src="/icons/todoSave.svg"
                                      width="15"
                                      height="20"
                                    />
                                  </span>
                                ) : (
                                  <span
                                    className="cursor-pointer"
                                    onClick={() => editClick(index)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="26"
                                      viewBox="0 0 30 30"
                                      className="text-[rgba(0,0,0,0.4)] hover:text-blue-700"
                                    >
                                      <g
                                        id="Group_18235"
                                        data-name="Group 18235"
                                        transform="translate(-1808 -374)"
                                      >
                                        <rect
                                          id="Rectangle_7337"
                                          data-name="Rectangle 7337"
                                          width="30"
                                          height="30"
                                          rx="3"
                                          transform="translate(1808 374)"
                                          fill="#fbfbfb"
                                        />
                                        <g
                                          id="pencil_4_"
                                          data-name="pencil (4)"
                                          transform="translate(1813 379)"
                                        >
                                          <g
                                            id="Group_18217"
                                            data-name="Group 18217"
                                            transform="translate(13.785 0)"
                                          >
                                            <g
                                              id="Group_18216"
                                              data-name="Group 18216"
                                              transform="translate(0 0)"
                                            >
                                              <path
                                                id="Path_34508"
                                                data-name="Path 34508"
                                                d="M360.117,2.422l-1.8-1.8a2.116,2.116,0,0,0-2.989,0l-.706.706,4.792,4.793.706-.706A2.112,2.112,0,0,0,360.117,2.422Z"
                                                transform="translate(-354.619 0)"
                                                fill="currentColor"
                                              />
                                            </g>
                                          </g>
                                          <g
                                            id="Group_18219"
                                            data-name="Group 18219"
                                            transform="translate(0 14.645)"
                                          >
                                            <g
                                              id="Group_18218"
                                              data-name="Group 18218"
                                              transform="translate(0)"
                                            >
                                              <path
                                                id="Path_34509"
                                                data-name="Path 34509"
                                                d="M.856,376.747.01,381.315a.583.583,0,0,0,.679.68l4.568-.846Z"
                                                transform="translate(0 -376.747)"
                                                fill="currentColor"
                                              />
                                            </g>
                                          </g>
                                          <g
                                            id="Group_18221"
                                            data-name="Group 18221"
                                            transform="translate(1.485 2.149)"
                                          >
                                            <g
                                              id="Group_18220"
                                              data-name="Group 18220"
                                            >
                                              <path
                                                id="Path_34510"
                                                data-name="Path 34510"
                                                d="M49.673,55.274,38.2,66.75l4.792,4.793L54.466,60.067Z"
                                                transform="translate(-38.198 -55.274)"
                                                fill="currentColor"
                                              />
                                            </g>
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
                                  </span>
                                )}
                                <span>
                                  <Image
                                    src="/icons/dotLines.svg"
                                    width="20"
                                    height="30"
                                  />
                                </span>
                                <span
                                  className="cursor-pointer"
                                  onClick={() => todoDelete(index)}
                                >
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
                                </span>
                              </div>
                            </div>
                          </div>
                        ))

                      : storeData?.datas?.map((data, index) => {
                        return (
                          <div className=" mt-5 w-[80%] mx-16 min-h-[16vh] rounded-xl bg-white flex p-3 justify-between">
                            <div className="w-[75%]">
                              <div className="w-[100%] pl-4 flex h-[5vh] justify-between items-center">
                                <div className="flex space-x-4 w-[60%] items-center font-[sf-pro-medium]">
                                  <div className="flex items-center space-x-2 w-[70%]">
                                    <Image
                                      src={`${data.isComplete == "complete"
                                        ? "/icons/taskComplete.svg"
                                        : "/icons/taskTodo.svg"
                                        } `} //taskTodo.svg
                                      width="20"
                                      height="50"
                                      onClick={data?.description!=''&& data?.isComplete!='' && data?.listName!='' && data?.priority!='' && data?.taskTitle?() => progressClick(index, data):null}
                                    />
                                    {isEdit && editId == index ? (
                                      <input
                                        className={`focus:outline-none w-[100%] font-extrabold ${data.isComplete == "complete"
                                          ? "text-[#409E0A]"
                                          : ""
                                          }`}
                                        placeholder="Enter your task tittle.."
                                        name="taskTitle"
                                        value={data.taskTitle}
                                        onChange={
                                          isEdit && editId == index
                                            ? addTodoChange(index)
                                            : null
                                        }
                                      />
                                    ) : (
                                      <p
                                        className={`focus:outline-none w-[100%] font-extrabold ${data.isComplete == "complete"
                                          ? "text-[#409E0A]"
                                          : ""
                                          }`}
                                      >
                                        {data.taskTitle}
                                      </p>
                                    )}
                                    <span className="relative top-1">
                                      {data.isComplete == "complete" ? (
                                        <VerifyIcon
                                          fill="currentColor"
                                          width="18px"
                                          height="30px"
                                          style={{
                                            color: "#409E0A",
                                          }}
                                        />
                                      ) : (
                                        <span>
                                          {data.priority == "Low Priority" ? (
                                            <VerifyIcon
                                              fill="currentColor"
                                              width="18px"
                                              height="30px"
                                              style={{
                                                color: "#FC9F13",
                                              }}
                                            />
                                          ) : data.priority ==
                                            "Mid Priority" ? (
                                            <VerifyIcon
                                              fill="currentColor"
                                              width="18px"
                                              height="30px"
                                              style={{
                                                color: "#857AF0",
                                              }}
                                            />
                                          ) : data.priority ==
                                            "High Priority" ? (
                                            <VerifyIcon
                                              fill="currentColor"
                                              width="18px"
                                              height="30px"
                                              style={{
                                                color: "#E90854",
                                              }}
                                            />
                                          ) : (
                                            <VerifyIcon
                                              fill="currentColor"
                                              width="18px"
                                              height="30px"
                                              style={{
                                                color: "#409E0A",
                                              }}
                                            />
                                          )}
                                        </span>
                                      )}
                                    </span>
                                  </div>
                                  <div className="bg-[#F6F6F6]/100 w-[30%] px-2 rounded text-md">
                                    {isEdit && editId == index ? (
                                      <select
                                        name="listName"
                                        className={`bg-[#F6F6F6]/100 focus:outline-none font-[interSemiBold] ${data.isComplete == "complete"
                                          ? "text-[#409E0A]"
                                          : "text-[#E90854]"
                                          }`}
                                        placeholder="Select List Name"
                                        value={data.listName}
                                        onChange={
                                          isEdit && editId == index
                                            ? addTodoChange(index)
                                            : null
                                        }
                                      >
                                        {todoListName.map((value) => {
                                          return (
                                            <option value={value}>
                                              {value}
                                            </option>
                                          );
                                        })}
                                      </select>
                                    ) : (
                                      <p
                                        className={`bg-[#F6F6F6]/100 font-[interSemiBold] ${data.isComplete == "complete"
                                          ? "text-[#409E0A]"
                                          : "text-[#E90854]"
                                          }`}
                                      >
                                        #{data.listName}
                                      </p>
                                    )}
                                  </div>
                                </div>
                                {/* <div className={`font-[sf-pro-medium] ${data.isComplete == 'complete' ? 'text-[#409E0A]':''}`}>
                        *Finished in: 02:00 Hrs
                      </div> */}
                                <div
                                  className={`font-[sf-pro-medium] w-[22%] ${data.isComplete == "complete"
                                    ? "text-[#409E0A]"
                                    : ""
                                    }`}
                                >
                                  <span>*Finished in:</span>
                                  <input
                                    placeholder="00:00 Hrs"
                                    value={data.finishedIn}
                                    onChange={
                                      isEdit && editId == index
                                        ? addTodoChange(index)
                                        : null
                                    }
                                    name="finishedIn"
                                    className="w-[50%] text-[13px] pl-1 focus:outline-none"
                                    maxLength={10}
                                  />
                                </div>
                              </div>
                              <textarea
                                className={`overflow-hidden resize-none block focus:outline-none w-[100%] pl-11 mt-1 font-[sf-pro-medium] ${data.isComplete == "complete"
                                  ? "line-through"
                                  : ""
                                  }`}
                                placeholder="Enter your task description."
                                name="description"
                                value={data.description}
                                onChange={
                                  isEdit && editId == index
                                    ? addTodoChange(index)
                                    : null
                                }
                              />
                            </div>
                            <div className="w-[24%] pl-6 border-l-[3px] border-dashed flex">
                              <div className="flex flex-col pt-1 space-y-2 w-[90%]">
                                <input
                                  className="font-[interSemiBold] w-[65%] text-[13px]"
                                  type="date"
                                  name="date"
                                  value={data.date}
                                  onChange={
                                    isEdit && editId == index
                                      ? addTodoChange(index)
                                      : null
                                  }
                                />
                                <input
                                  className="font-[interSemiBold] w-[65%] text-[13px]"
                                  type="time"
                                  name="time"
                                  value={data.time}
                                  onChange={
                                    isEdit && editId == index
                                      ? addTodoChange(index)
                                      : null
                                  }
                                />
                                <div className="flex font-[interSemiBold] items-center w-[65%] justify-between text-[13px]">
                                  <select
                                    placeholder="Select Priority"
                                    className="font-[interSemiBold] focus:outline-none"
                                    name="priority"
                                    value={data.priority}
                                    onChange={
                                      isEdit && editId == index
                                        ? addTodoChange(index)
                                        : null
                                    }
                                  >
                                    <option>Low Priority</option>
                                    <option>Mid Priority</option>
                                    <option>High Priority</option>
                                  </select>
                                  {/* <Image
                          src= '/icons/verifylow.svg'
                          width="18"
                          height="30"
                        /> */}
                                  {data.isComplete == "Low Priority" ? (
                                    <VerifyIcon
                                      fill="currentColor"
                                      width="18px"
                                      height="30px"
                                      style={{
                                        color: "#FC9F13",
                                      }}
                                    />
                                  ) : data.priority == "Mid Priority" ? (
                                    <VerifyIcon
                                      fill="currentColor"
                                      width="18px"
                                      height="30px"
                                      style={{
                                        color: "#857AF0",
                                      }}
                                    />
                                  ) : data.priority == "High Priority" ? (
                                    <VerifyIcon
                                      fill="currentColor"
                                      width="18px"
                                      height="30px"
                                      style={{
                                        color: "#E90854",
                                      }}
                                    />
                                  ) : (
                                    <VerifyIcon
                                      fill="currentColor"
                                      width="18px"
                                      height="30px"
                                      style={{
                                        color: "#FC9F13",
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                              <div className=" flex flex-col items-center space-y-1">
                                {isEdit && editId == index ? (
                                  <span
                                    className={`cursor-pointer ${data.taskTitle
                                      ? "cursor-pointer"
                                      : "cursor-not-allowed"
                                      }`}
                                    onClick={
                                      data.taskTitle ? addListClick : null
                                    }
                                  >
                                    <Image
                                      src="/icons/todoSave.svg"
                                      width="15"
                                      height="20"
                                    />
                                  </span>
                                ) : (
                                  <span
                                    className="cursor-pointer"
                                    onClick={() => editClick(index)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="20"
                                      height="26"
                                      viewBox="0 0 30 30"
                                      className="text-[rgba(0,0,0,0.4)] hover:text-blue-700"
                                    >
                                      <g
                                        id="Group_18235"
                                        data-name="Group 18235"
                                        transform="translate(-1808 -374)"
                                      >
                                        <rect
                                          id="Rectangle_7337"
                                          data-name="Rectangle 7337"
                                          width="30"
                                          height="30"
                                          rx="3"
                                          transform="translate(1808 374)"
                                          fill="#fbfbfb"
                                        />
                                        <g
                                          id="pencil_4_"
                                          data-name="pencil (4)"
                                          transform="translate(1813 379)"
                                        >
                                          <g
                                            id="Group_18217"
                                            data-name="Group 18217"
                                            transform="translate(13.785 0)"
                                          >
                                            <g
                                              id="Group_18216"
                                              data-name="Group 18216"
                                              transform="translate(0 0)"
                                            >
                                              <path
                                                id="Path_34508"
                                                data-name="Path 34508"
                                                d="M360.117,2.422l-1.8-1.8a2.116,2.116,0,0,0-2.989,0l-.706.706,4.792,4.793.706-.706A2.112,2.112,0,0,0,360.117,2.422Z"
                                                transform="translate(-354.619 0)"
                                                fill="currentColor"
                                              />
                                            </g>
                                          </g>
                                          <g
                                            id="Group_18219"
                                            data-name="Group 18219"
                                            transform="translate(0 14.645)"
                                          >
                                            <g
                                              id="Group_18218"
                                              data-name="Group 18218"
                                              transform="translate(0)"
                                            >
                                              <path
                                                id="Path_34509"
                                                data-name="Path 34509"
                                                d="M.856,376.747.01,381.315a.583.583,0,0,0,.679.68l4.568-.846Z"
                                                transform="translate(0 -376.747)"
                                                fill="currentColor"
                                              />
                                            </g>
                                          </g>
                                          <g
                                            id="Group_18221"
                                            data-name="Group 18221"
                                            transform="translate(1.485 2.149)"
                                          >
                                            <g
                                              id="Group_18220"
                                              data-name="Group 18220"
                                            >
                                              <path
                                                id="Path_34510"
                                                data-name="Path 34510"
                                                d="M49.673,55.274,38.2,66.75l4.792,4.793L54.466,60.067Z"
                                                transform="translate(-38.198 -55.274)"
                                                fill="currentColor"
                                              />
                                            </g>
                                          </g>
                                        </g>
                                      </g>
                                    </svg>
                                  </span>
                                )}
                                <span>
                                  <Image
                                    src="/icons/dotLines.svg"
                                    width="20"
                                    height="30"
                                  />
                                </span>
                                <span
                                  className="cursor-pointer"
                                  onClick={() => todoDelete(index)}
                                >
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
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      })}{" "}
                  </div>
                ) : null}
              </div>
            )}

            <div>
              <FeedBackButton />
              <BtoolsFooter />
            </div>
          </div>
        </div>
      </div>











      {/* mobile */}
      <div className=" w-[100%] h-screen  md:hidden ">
        <div className="border-b flex bg  items-center justify-between  ">
          <div className="flex flex-col items-center justify-center w-[100%]">
            <div className="w-[90%] flex justify-around items-center ">
              <div className="w-[77%]">
                <BtoolsHeader
                  Src="/images/NewListLogo.png"
                  Height="50"
                  Width="100"
                />
              </div>

              {/* <div className="mt-[8px]">
                <Image src="/icons/Search Icon.svg" width="23" height="30" onClick={opensearchPage} />
              </div> */}
            </div>
            <div className="flex items-center  w-[100%] h-[6vh]   justify-around">
              <div className="flex flex-row justify-between w-[90%] items-center">
                <div className="mr-[15px]">
                  {
                    HandleMenuItem ?
                      <img
                        src="/images/closedark.png"
                        width="20"

                        onClick={handleMenu}
                      /> : <img
                        src="/images/menu.png"
                        className="w-7"
                        onClick={handleMenu}
                      />
                  }
                </div>
                <div >
                  <input
                    className="w-[90%] border-2 px-2 bg-[#F5F5F5] h-[4vh] rounded-lg"
                    type="date"
                    onChange={
                      storeData == undefined || storeData?.datas?.length == 0
                        ? null
                        : dateChange
                    }

                    value={stateDate}
                  />

                </div>
                <div className="mx-auto w-[90%] rounded-lg justify-between  items-center flex p-1 border-2 bg-[#F5F5F5] ">
                  <Image src="/icons/Search Icon.svg" width="15" height="15" />
                  <input
                    className="font-[sf-pro-medium] w-[86%] bg-[#F5F5F5] focus:outline-none"
                    placeholder="Search projects..."
                    onChange={searchData}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[74vh] overflow-scroll">

          {/* {
          openSearchPopup &&  
           <div className="bg-[#080808] h-[107vh]  flex justify-around items-center z-50 absolute inset-0 bg-opacity-[0.8]">
              <div className="mx-auto w-[80%] rounded-lg  items-center flex p-3 border-2 bg-white ">
              <input
                      className="font-[sf-pro-medium] h-[] w-[100%] focus:outline-none"
                      placeholder="Search projects..."
                      onChange={ searchData }
                    />

               <Image src="/icons/Search Icon.svg" width="23" height="30" onClick={opensearchPage} />
                
            </div>
          </div>
         
        } */}
          <div className="absolute">
            {HandleMenuItem && (
              <SideBar
                callUseEffect={useEffectCall}
                showList={listShow}
                newTask={isNewTask}
                myEdit={isEdit}
                HandleMenuItem={HandleMenuItem}
                addListState={addListStateMobile}
                headerName={headerName}
              />
            )}
          </div>

          {isNewTask ? (
            <div>
              {todoDatas.datas.map((data, index) => {
                return (
                  // mobile responsive me
                  <div className="bg-[#272727B3] flex justify-around items-center w-full h-[100vh] fixed bottom-0 bg-opacity-[30%]">
                    <div className="bg-white h-[72vh] justify-between flex-col flex items-center rounded-[10px] w-[90%]">
                      <div className="flex justify-around items-center flex-col w-[90%] h-[12vh]">
                        <div className="flex w-full h-[8vh]">
                          <div className="w-[33.3%] h-[8vh]">
                          </div>
                          <div className="w-[33.3%] flex justify-around items-end h-[8vh]">
                            <h1 className="text-[23px] font-[sfpro-regular]">Add Task</h1>
                          </div>
                          <div onClick={undoAddTask} className="w-[33.3%] flex justify-end items-end h-[8vh]">
                            <Image src='/icons/plustodo.svg'
                              width="30"
                              height="30"
                            ></Image>
                          </div>
                        </div>
                        <div className="flex justify-center items-center w-full h-[4vh]">
                          <h1 className="text-[#000000] font-[sfpro-regular] opacity-[40%] text-[12px]">Create task to store in your list</h1>
                        </div>
                      </div>
                      <div className="flex justify-start items-start w-[90%] h-[60vh]">
                        <div className="flex flex-col justify-between h-[57vh] w-full">
                          <div className="h-[42px] w-full">
                            <select
                              name="listName"
                              className="bg-[#F6F6F6] outline-none px-2 rounded-md border-2 border-solid border-[#70707080] h-[6vh] w-[100%]"
                              placeholder="# Select the list"
                              value={data.listName}
                              onChange={addTodoChange(index)}

                            >
                              <option hidden># Select the list</option>
                              <option value="addnew">Add New List</option>
                              {todoListName.map((value) => {
                                return <option value={value}>{value}</option>;
                              })}
                            </select>
                          </div>
                          <div className="h-[42px] w-full">
                            <input
                              id="taskadd"
                              className="outline-none px-2 rounded-md border-2 border-solid border-[#70707080] bg-[#F6F6F6] h-[6vh] w-[100%]"
                              placeholder="Task Title"
                              maxLength={38}
                              name="taskTitle"
                              value={data.taskTitle}
                              onChange={addTodoChange(index)}
                            />
                          </div>
                          <div className="h-[14vh] border-2 rounded-md border-solid border-[#70707080] bg-[#F6F6F6] w-full">
                            <textarea
                              id="addDescription"
                              className="pt-2 px-2 rounded-md  bg-[#F6F6F6] outline-none max-h-[12vh] w-[100%] block resize-none overflow-hidden font-[sf-pro-medium]"
                              placeholder="Task Descriptions"
                              name="description"
                              value={data.description}
                              onChange={addTodoChange(index)}
                            />
                          </div>
                          <div className="h-[42px] flex-row flex justify-between w-full">
                            <div className="w-[45%] h-[6vh]">
                              <input
                                id="addTime"
                                className="font-[interSemiBold] outline-none px-2 rounded-md border-2 border-solid border-[#70707080] bg-[#F6F6F6] w-full h-[6vh] text-[13px]"
                                type="time"
                                name="time"
                                value={data.time}
                                onChange={addTodoChange(index)}
                              />
                            </div>
                            <div className="w-[45%] h-[6vh]">
                              <input
                                id="addDate"
                                className="font-[interSemiBold] outline-none px-2 rounded-md border-2 border-solid border-[#70707080] bg-[#F6F6F6] w-full h-[6vh] text-[13px]"
                                type="date"
                                name="date"
                                value={data.date}
                                onChange={addTodoChange(index)}
                              />
                            </div>
                          </div>
                          <div className="h-[42px] w-full px-2 rounded-md border-2 border-solid border-[#70707080] pl-[15px] justify-between items-center flex flex-row bg-[#F6F6F6]">
                            {data.priority == "Low Priority" ? (
                              <VerifyIcon
                                fill="currentColor"
                                width="18px"
                                height="30px"
                                style={{
                                  color: "#FC9F13",
                                }}
                              />
                            ) : data.priority == "Mid Priority" ? (
                              <VerifyIcon
                                fill="currentColor"
                                width="18px"
                                height="30px"
                                style={{
                                  color: "#857AF0",
                                }}
                              />
                            ) : data.priority == "High Priority" ? (
                              <VerifyIcon
                                fill="currentColor"
                                width="18px"
                                height="30px"
                                style={{
                                  color: "#E90854",
                                }}
                              />
                            ) : (
                              <VerifyIcon
                                fill="currentColor"
                                width="18px"
                                height="30px"
                                style={{
                                  color: "#16161666",
                                }}
                              />
                            )
                            }
                            <select
                              id="addPriority"
                              placeholder="Select Priority"
                              className="font-[interSemiBold] outline-none  bg-[#F6F6F6] h-[4vh] w-[88%] focus:outline-none"
                              name="priority"
                              value={data.priority}
                              onChange={addTodoChange(index)}
                            >
                              <option value="Select Priority" hidden>
                                Select the priority
                              </option>
                              <option value="Low Priority">
                                Low Priority
                              </option>
                              <option value="Mid Priority">
                                Mid Priority
                              </option>
                              <option value="High Priority">
                                High Priority
                              </option>
                            </select>
                          </div>
                          <div className="h-[42px] w-full">
                            <button onClick={
                              data.taskTitle == "" &&
                                data.priority == "" &&
                                data.date == "" &&
                                data.time == "" &&
                                data.listName == ""
                                ? null
                                : addListClick
                            } className="w-full rounded-md text-white text-[24px] h-[6vh] bg-[#E90854]">Save</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}{" "}
            </div>
          ) : null}



          {
            filterStoreData?.datas?.map((data, index) => (
              <div className="w-[100%] h-[35vh] flex justify-center items-center ">
                <div className="w-[90%] justify-between flex-col bg-[#f9f7f7] px-2 rounded-md py-2 h-[30vh]">
                  <div className="flex items-center justify-around  w-[100%]">
                    <Image
                      src={`${data.isComplete == "complete"
                        ? "/icons/taskComplete.svg"
                        : "/icons/taskTodo.svg"
                        } `} //taskTodo.svg
                      width="20"
                      height="50"
                      onClick={data?.description!=''&& data?.isComplete!='' && data?.listName!='' && data?.priority!='' && data?.taskTitle?() => progressClick(index, data):null}
                    />
                    {isEdit && editId == index ? (
                      <input
                        className={`focus:outline-none  w-[100%] font-extrabold ${data.isComplete == "complete" ? "text-[#409E0A]" : ""
                          }`}
                        placeholder="Enter your task tittle.."
                        name="taskTitle"
                        value={data.taskTitle}
                        onChange={
                          isEdit && editId == index
                            ? addTodoChange(index)
                            : null
                        }
                      />
                    ) : (
                      <p
                        className={`focus:outline-none truncate w-[100%] ml-2 text-[15px]  font-extrabold ${data.isComplete == "complete" ? "text-[#409E0A]" : ""
                          }`}
                      >
                        {data.taskTitle}
                      </p>
                    )}

                    <div>
                      {openDotViewPage && indexMap == index ? (
                        <img
                          src="/images/close.png"
                          className="w-7"
                          onClick={() => openDotView(index)}
                        />
                      ) : (
                        <img
                          src="/images/dots.png"
                          className="w-8"
                          onClick={() => openDotView(index)}
                        />
                      )}
                    </div>
                  </div>
                  <div className="w-[88%] flex justify-center h-[16vh] overflow-scroll ml-5 ">
                    <textarea
                      className={`overflow-hidden scrollbar-hide   bg-[#f9f7f7]  resize-none block focus:outline-none w-[100%] md:pl-11 mt-1 font-[sf-pro-medium] ${data.isComplete == "complete" ? "line-through" : ""
                        }`}
                      placeholder="Enter your task description."
                      name="description"
                      value={data.description}
                      onChange={
                        isEdit && editId == index ? addTodoChange(index) : null
                      }
                    />
                  </div>

                  <div className="mt-3 flex justify-between items-center  w-[100%]">
                    <div className="flex ">
                      <div className="flex items-center">
                        {data.isComplete == "complete" ? (
                          <VerifyIcon
                            fill="currentColor"
                            width="18px"
                            height="30px"
                            style={{
                              color: "#409E0A",
                            }}
                          />
                        ) : (
                          <span>
                            {data.priority == "Low Priority" ? (
                              <VerifyIcon
                                fill="currentColor"
                                width="18px"
                                height="30px"
                                style={{
                                  color: "#FC9F13",
                                }}
                              />
                            ) : data.priority == "Mid Priority" ? (
                              <VerifyIcon
                                fill="currentColor"
                                width="18px"
                                height="30px"
                                style={{
                                  color: "#857AF0",
                                }}
                              />
                            ) : data.priority == "High Priority" ? (
                              <VerifyIcon
                                fill="currentColor"
                                width="18px"
                                height="30px"
                                style={{
                                  color: "#E90854",
                                }}
                              />
                            ) : (
                              <VerifyIcon
                                fill="currentColor"
                                width="18px"
                                height="30px"
                                style={{
                                  color: "#409E0A",
                                }}
                              />
                            )}
                          </span>
                        )}
                        <div>
                          <div className="bg-[#a8b1ab] w-[115px] ml-2 rounded truncate text-md">
                            {isEdit && editId == index ? (
                              <select
                                name="listName"
                                className={`bg-[#F6F6F6]/100   focus:outline-none  ${data.isComplete == "complete"
                                  ? "text-[#409E0A]"
                                  : "text-[#E90854]"
                                  }`}
                                placeholder="Select List Name"
                                value={data.listName}
                                onChange={
                                  isEdit && editId == index
                                    ? addTodoChange(index)
                                    : null
                                }
                              >
                                {todoListName.map((value) => {
                                  return <option value={value}>{value}</option>;
                                })}
                              </select>
                            ) : (
                              <p
                                className={`bg-[#F6F6F6]/100 font-[interSemiBold] ${data.isComplete == "complete"
                                  ? "text-[#409E0A]"
                                  : "text-[#E90854]"
                                  }`}
                              >
                                #{data.listName}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <h2 className=""> *Finished in: </h2>
                      <input
                        placeholder="00:00 Hrs"
                        value={data.finishedIn}
                        onChange={
                          isEdit && editId == index
                            ? addTodoChange(index)
                            : null
                        }
                        name="finishedIn"
                        className="w-[40%] text-[13px] pl-1 focus:outline-none"
                        maxLength={10}
                      />
                    </div>
                  </div>
                  {openDotViewPage && indexMap == index && (
                    <div
                      className={`${openDotViewPage
                        ? "w-[20%] left-[209px] h-[23vh]   "
                        : "w-[47%] "
                        } h-[24vh] bottom-[193px]  relative bg-[#ffffff]`}
                    >
                      <div className="flex flex-col justify-around h-[24vh] items-center">
                        {/* <div>
                          <img
                            src="/images/info.png"
                            className="w-7"
                            onClick={() => openDotView(index)}
                          />
                        </div> */}
                        {isEdit && editId == index ? (
                          <span
                            className={`cursor-pointer ${data.taskTitle
                              ? "cursor-pointer"
                              : "cursor-not-allowed"
                              }`}
                            onClick={data.taskTitle ? addListClick : null}
                          >
                            <Image
                              src="/icons/todoSave.svg"
                              width="20"
                              height="20"
                            />
                          </span>

                        ) : (
                          <div
                            className="cursor-pointer"
                            onClick={() => editClick(index)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="25"
                              height="26"
                              viewBox="0 0 30 30"
                              className="text-[rgba(0,0,0,0.4)] hover:text-blue-700"
                            >
                              <g
                                id="Group_18235"
                                data-name="Group 18235"
                                transform="translate(-1808 -374)"
                              >
                                <rect
                                  id="Rectangle_7337"
                                  data-name="Rectangle 7337"
                                  width="30"
                                  height="30"
                                  rx="3"
                                  transform="translate(1808 374)"
                                  fill="#fbfbfb"
                                />
                                <g
                                  id="pencil_4_"
                                  data-name="pencil (4)"
                                  transform="translate(1813 379)"
                                >
                                  <g
                                    id="Group_18217"
                                    data-name="Group 18217"
                                    transform="translate(13.785 0)"
                                  >
                                    <g
                                      id="Group_18216"
                                      data-name="Group 18216"
                                      transform="translate(0 0)"
                                    >
                                      <path
                                        id="Path_34508"
                                        data-name="Path 34508"
                                        d="M360.117,2.422l-1.8-1.8a2.116,2.116,0,0,0-2.989,0l-.706.706,4.792,4.793.706-.706A2.112,2.112,0,0,0,360.117,2.422Z"
                                        transform="translate(-354.619 0)"
                                        fill="currentColor"
                                      />
                                    </g>
                                  </g>
                                  <g
                                    id="Group_18219"
                                    data-name="Group 18219"
                                    transform="translate(0 14.645)"
                                  >
                                    <g
                                      id="Group_18218"
                                      data-name="Group 18218"
                                      transform="translate(0)"
                                    >
                                      <path
                                        id="Path_34509"
                                        data-name="Path 34509"
                                        d="M.856,376.747.01,381.315a.583.583,0,0,0,.679.68l4.568-.846Z"
                                        transform="translate(0 -376.747)"
                                        fill="currentColor"
                                      />
                                    </g>
                                  </g>
                                  <g
                                    id="Group_18221"
                                    data-name="Group 18221"
                                    transform="translate(1.485 2.149)"
                                  >
                                    <g id="Group_18220" data-name="Group 18220">
                                      <path
                                        id="Path_34510"
                                        data-name="Path 34510"
                                        d="M49.673,55.274,38.2,66.75l4.792,4.793L54.466,60.067Z"
                                        transform="translate(-38.198 -55.274)"
                                        fill="currentColor"
                                      />
                                    </g>
                                  </g>
                                </g>
                              </g>
                            </svg>
                          </div>
                        )}

                        <div>
                          <Image
                            src="/icons/dotLines.svg"
                            width="20"
                            height="30"
                          />
                        </div>
                        <div
                          className="cursor-pointer"
                          onClick={() => todoDelete(index)}
                        >
                          <svg
                            id="delete_2_"
                            data-name="delete (2)"
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
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
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

            ))
          }

          {/* edit card */}
          <div className="overflow-auto " onClick={() => setHandleMenuItem(false)}>
            {
              storeData?.datas?.filter((user) => user.taskTitle.toLowerCase().includes(searchValue ? searchValue : "")).map((data, index) => {
                return (
                  <div className="w-[100%] h-[35vh] flex justify-center items-center ">
                    <div className="w-[90%] justify-between flex-col bg-[#f9f7f7] px-2 rounded-md py-2 h-[30vh]">
                      <div className="flex items-center justify-around  w-[100%]">
                        <Image
                          src={`${data.isComplete == "complete"
                            ? "/icons/taskComplete.svg"
                            : "/icons/taskTodo.svg"
                            } `}
                          width="20"
                          height="50"
                          onClick={data?.description!=''&& data?.isComplete!='' && data?.listName!='' && data?.priority!='' && data?.taskTitle?() => progressClick(index, data):null}
                        />
                        {isEdit && editId == index ? (
                          <input
                            disabled
                            className={`focus:outline-none  w-[100%] font-extrabold ${data.isComplete == "complete" ? "text-[#409E0A]" : ""
                              }`}
                            placeholder="Enter your task tittle.."
                            name="taskTitle"
                            value={data.taskTitle}
                            onChange={
                              isEdit && editId == index
                                ? addTodoChange(index)
                                : null
                            }
                          />
                        ) : (
                          <p
                            className={`focus:outline-none truncate w-[100%] ml-2 text-[15px]  font-extrabold ${data.isComplete == "complete" ? "text-[#409E0A]" : ""
                              }`}
                          >
                            {data.taskTitle}
                          </p>
                        )}

                        <div>
                          {openDotViewPage && indexMap == index ? (
                            <img
                              src="/images/close.png"
                              className="w-7"
                              onClick={() => openDotView(index)}
                            />
                          ) : (
                            <img
                              src="/images/dots.png"
                              className="w-8"
                              onClick={() => openDotView(index)}
                            />
                          )}
                        </div>
                      </div>
                      <div className="w-[88%] flex justify-center h-[16vh] overflow-scroll ml-5 ">
                        <textarea disabled
                          className={`overflow-hidden scrollbar-hide   bg-[#f9f7f7]  resize-none block focus:outline-none w-[100%] md:pl-11 mt-1 font-[sf-pro-medium] ${data.isComplete == "complete" ? "line-through" : ""
                            }`}
                          placeholder="Enter your task description."
                          name="description"
                          value={data.description}
                          onChange={
                            isEdit && editId == index ? addTodoChange(index) : null
                          }
                        />
                      </div>

                      <div className="mt-3 flex justify-between items-center  w-[100%]">
                        <div className="flex ">
                          <div className="flex items-center">
                            {data.isComplete == "complete" ? (
                              <VerifyIcon
                                fill="currentColor"
                                width="18px"
                                height="30px"
                                style={{
                                  color: "#409E0A",
                                }}
                              />
                            ) : (
                              <span>
                                {data.priority == "Low Priority" ? (
                                  <VerifyIcon
                                    fill="currentColor"
                                    width="18px"
                                    height="30px"
                                    style={{
                                      color: "#FC9F13",
                                    }}
                                  />
                                ) : data.priority == "Mid Priority" ? (
                                  <VerifyIcon
                                    fill="currentColor"
                                    width="18px"
                                    height="30px"
                                    style={{
                                      color: "#857AF0",
                                    }}
                                  />
                                ) : data.priority == "High Priority" ? (
                                  <VerifyIcon
                                    fill="currentColor"
                                    width="18px"
                                    height="30px"
                                    style={{
                                      color: "#E90854",
                                    }}
                                  />
                                ) : (
                                  <VerifyIcon
                                    fill="currentColor"
                                    width="18px"
                                    height="30px"
                                    style={{
                                      color: "#409E0A",
                                    }}
                                  />
                                )}
                              </span>
                            )}
                            <div>
                              <div className="bg-[#a8b1ab] truncate w-[115px] ml-2 rounded text-md">
                                {isEdit && editId == index ? (
                                  <select 
                                    name="listName"
                                    className={`bg-[#F6F6F6]/100 w-[100%]  focus:outline-none  ${data.isComplete == "complete"
                                      ? "text-[#409E0A]"
                                      : "text-[#E90854]"
                                      }`}
                                    placeholder="Select List Name"
                                    value={data.listName}
                                    onChange={
                                      isEdit && editId == index
                                        ? addTodoChange(index)
                                        : null
                                    }
                                  >
                                    {todoListName.map((value) => {
                                      return <option value={value}>{value}</option>;
                                    })}
                                  </select>
                                ) : (
                                  <p
                                    className={`bg-[#F6F6F6]/100 font-[interSemiBold] ${data.isComplete == "complete"
                                      ? "text-[#409E0A]"
                                      : "text-[#E90854]"
                                      }`}
                                  >
                                    #{data.listName}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <h2 className=""> *Finished in: </h2>
                          <input
                            placeholder="00:00 Hrs"
                            value={data.finishedIn}
                            onChange={
                              isEdit && editId == index
                                ? addTodoChange(index)
                                : null
                            }
                            name="finishedIn"
                            className="w-[40%] text-[13px] pl-1 focus:outline-none"
                            maxLength={10}
                          />
                        </div>
                      </div>
                      {openDotViewPage && indexMap == index && (
                        <div
                          className={`${openDotViewPage
                            ? "w-[20%] left-[209px] h-[23vh]   "
                            : "w-[47%] "
                            } h-[27vh] bottom-[205px]  relative bg-[#ffffff]`}
                        >
                          <div className="flex flex-col justify-around h-[24vh] items-center">
                            {/* <div>
                              <img
                                src="/images/info.png"
                                className="w-7"
                                onClick={() => openDotViewEditPage(index)}
                              />
                            </div> */}
                            <div
                              className="cursor-pointer"
                              onClick={() => editClick(index)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="25"
                                height="26"
                                viewBox="0 0 30 30"
                                className="text-[rgba(0,0,0,0.4)] hover:text-blue-700"
                              >
                                <g
                                  id="Group_18235"
                                  data-name="Group 18235"
                                  transform="translate(-1808 -374)"
                                >
                                  <rect
                                    id="Rectangle_7337"
                                    data-name="Rectangle 7337"
                                    width="30"
                                    height="30"
                                    rx="3"
                                    transform="translate(1808 374)"
                                    fill="#fbfbfb"
                                  />
                                  <g
                                    id="pencil_4_"
                                    data-name="pencil (4)"
                                    transform="translate(1813 379)"
                                  >
                                    <g
                                      id="Group_18217"
                                      data-name="Group 18217"
                                      transform="translate(13.785 0)"
                                    >
                                      <g
                                        id="Group_18216"
                                        data-name="Group 18216"
                                        transform="translate(0 0)"
                                      >
                                        <path
                                          id="Path_34508"
                                          data-name="Path 34508"
                                          d="M360.117,2.422l-1.8-1.8a2.116,2.116,0,0,0-2.989,0l-.706.706,4.792,4.793.706-.706A2.112,2.112,0,0,0,360.117,2.422Z"
                                          transform="translate(-354.619 0)"
                                          fill="currentColor"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_18219"
                                      data-name="Group 18219"
                                      transform="translate(0 14.645)"
                                    >
                                      <g
                                        id="Group_18218"
                                        data-name="Group 18218"
                                        transform="translate(0)"
                                      >
                                        <path
                                          id="Path_34509"
                                          data-name="Path 34509"
                                          d="M.856,376.747.01,381.315a.583.583,0,0,0,.679.68l4.568-.846Z"
                                          transform="translate(0 -376.747)"
                                          fill="currentColor"
                                        />
                                      </g>
                                    </g>
                                    <g
                                      id="Group_18221"
                                      data-name="Group 18221"
                                      transform="translate(1.485 2.149)"
                                    >
                                      <g id="Group_18220" data-name="Group 18220">
                                        <path
                                          id="Path_34510"
                                          data-name="Path 34510"
                                          d="M49.673,55.274,38.2,66.75l4.792,4.793L54.466,60.067Z"
                                          transform="translate(-38.198 -55.274)"
                                          fill="currentColor"
                                        />
                                      </g>
                                    </g>
                                  </g>
                                </g>
                              </svg>
                            </div>


                            <div>
                              <Image
                                src="/icons/dotLines.svg"
                                width="30"
                                height="40"
                              />
                            </div>
                            <div
                              className="cursor-pointer"
                              onClick={() => todoDelete(index)}
                            >
                              <svg
                                id="delete_2_"
                                data-name="delete (2)"
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
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
                            </div>
                          </div>
                        </div>
                      )}

                      {
                        openViewEditPage && indexMap == index && (
                          <div className="bg-[#ffffff]  left-[102px] w-[56%] justify-center flex   relative bottom-[194px] h-[20vh]">
                            <div className=" justify-center flex ">
                              <div className="flex flex-col pt-3 justify-between  ">
                                <input
                                  className="font-[interSemiBold] text-[13px]"
                                  type="date"
                                  name="date"
                                  value={data.date}
                                  onChange={
                                    isEdit && editId == index
                                      ? addTodoChange(index)
                                      : null
                                  }
                                />
                                <input
                                  className="font-[interSemiBold]  text-[13px]"
                                  type="time"
                                  name="time"
                                  value={data.time}
                                  onChange={
                                    isEdit && editId == index
                                      ? addTodoChange(index)
                                      : null
                                  }
                                />
                                <div className="flex font-[interSemiBold] items-center justify-between text-[13px]">
                                  <select
                                    placeholder="Select Priority"
                                    className="font-[interSemiBold] focus:outline-none"
                                    name="priority"
                                    value={data.priority}
                                    onChange={
                                      isEdit && editId == index
                                        ? addTodoChange(index)
                                        : null
                                    }
                                  >
                                    <option>Low Priority</option>
                                    <option>Mid Priority</option>
                                    <option>High Priority</option>
                                  </select>

                                  {data.isComplete == "Low Priority" ? (
                                    <VerifyIcon
                                      fill="currentColor"
                                      width="18px"
                                      height="30px"
                                      style={{
                                        color: "#FC9F13",
                                      }}
                                    />
                                  ) : data.priority == "Mid Priority" ? (
                                    <VerifyIcon
                                      fill="currentColor"
                                      width="18px"
                                      height="30px"
                                      style={{
                                        color: "#857AF0",
                                      }}
                                    />
                                  ) : data.priority == "High Priority" ? (
                                    <VerifyIcon
                                      fill="currentColor"
                                      width="18px"
                                      height="30px"
                                      style={{
                                        color: "#E90854",
                                      }}
                                    />
                                  ) : (
                                    <VerifyIcon
                                      fill="currentColor"
                                      width="18px"
                                      height="30px"
                                      style={{
                                        color: "#FC9F13",
                                      }}
                                    />
                                  )}
                                </div>
                                <div className=" flex  justify-between items-center ">
                                  {isEdit && editId == index ? (
                                    <span
                                      className="cursor-pointer"
                                      onClick={() => todoDelete(index)}
                                    >
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
                                    </span>

                                  ) : (
                                    <span
                                      className="cursor-pointer"
                                      onClick={() => editClick(index)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="26"
                                        viewBox="0 0 30 30"
                                        className="text-[rgba(0,0,0,0.4)] hover:text-blue-700"
                                      >
                                        <g
                                          id="Group_18235"
                                          data-name="Group 18235"
                                          transform="translate(-1808 -374)"
                                        >
                                          <rect
                                            id="Rectangle_7337"
                                            data-name="Rectangle 7337"
                                            width="30"
                                            height="30"
                                            rx="3"
                                            transform="translate(1808 374)"
                                            fill="#fbfbfb"
                                          />
                                          <g
                                            id="pencil_4_"
                                            data-name="pencil (4)"
                                            transform="translate(1813 379)"
                                          >
                                            <g
                                              id="Group_18217"
                                              data-name="Group 18217"
                                              transform="translate(13.785 0)"
                                            >
                                              <g
                                                id="Group_18216"
                                                data-name="Group 18216"
                                                transform="translate(0 0)"
                                              >
                                                <path
                                                  id="Path_34508"
                                                  data-name="Path 34508"
                                                  d="M360.117,2.422l-1.8-1.8a2.116,2.116,0,0,0-2.989,0l-.706.706,4.792,4.793.706-.706A2.112,2.112,0,0,0,360.117,2.422Z"
                                                  transform="translate(-354.619 0)"
                                                  fill="currentColor"
                                                />
                                              </g>
                                            </g>
                                            <g
                                              id="Group_18219"
                                              data-name="Group 18219"
                                              transform="translate(0 14.645)"
                                            >
                                              <g
                                                id="Group_18218"
                                                data-name="Group 18218"
                                                transform="translate(0)"
                                              >
                                                <path
                                                  id="Path_34509"
                                                  data-name="Path 34509"
                                                  d="M.856,376.747.01,381.315a.583.583,0,0,0,.679.68l4.568-.846Z"
                                                  transform="translate(0 -376.747)"
                                                  fill="currentColor"
                                                />
                                              </g>
                                            </g>
                                            <g
                                              id="Group_18221"
                                              data-name="Group 18221"
                                              transform="translate(1.485 2.149)"
                                            >
                                              <g
                                                id="Group_18220"
                                                data-name="Group 18220"
                                              >
                                                <path
                                                  id="Path_34510"
                                                  data-name="Path 34510"
                                                  d="M49.673,55.274,38.2,66.75l4.792,4.793L54.466,60.067Z"
                                                  transform="translate(-38.198 -55.274)"
                                                  fill="currentColor"
                                                />
                                              </g>
                                            </g>
                                          </g>
                                        </g>
                                      </svg>
                                    </span>
                                  )}
                                  <span>
                                    <Image
                                      src="/icons/dotLines.svg"
                                      width="40"
                                      height="30"
                                      className="rotate-90"
                                    />
                                  </span>
                                  <span
                                    className={`cursor-pointer ${data.taskTitle
                                      ? "cursor-pointer"
                                      : "cursor-not-allowed"
                                      }`}
                                    onClick={
                                      data.taskTitle ? addListClick : null
                                    }
                                  >
                                    <Image
                                      src="/icons/todoSave.svg"
                                      width="15"
                                      height="20"
                                    />
                                  </span>
                                </div>
                              </div>

                            </div>
                          </div>
                        )
                      }
                    </div>
                  </div>
                );
              })
            }
          </div>

          {/* mobile edit popup */}
          {
            showEditPopup ? <div className="bg-[#272727B3] flex justify-around items-center w-full h-[100vh] fixed bottom-0 bg-opacity-[30%]">
              <div className="bg-white h-[72vh] justify-around flex items-center rounded-[10px] w-[90%]">
                {
                  storeData?.datas?.map((data, index) => {
                    return (
                      <>
                        {
                          index == editId ? <>
                            <div className="rounded-[10px] flex flex-col justify-between items-center h-[72vh] w-full">
                              <div className="w-[90%] h-[72vh]">
                                <div className="flex w-full h-[8vh]">
                                  <div className="w-[33.3%] h-[8vh]">
                                  </div>
                                  <div className="w-[33.3%] flex justify-around items-end h-[8vh]">
                                    <h1 className="text-[23px] font-[sfpro-regular]">Edit Task</h1>
                                  </div>
                                  <div onClick={closeEditPopup} className="w-[33.3%] flex justify-end items-end h-[8vh]">
                                    <Image src='/icons/plustodo.svg'
                                      width="30"
                                      height="30"
                                    ></Image>
                                  </div>
                                </div>
                                <div className="flex justify-center items-center w-full h-[4vh]">
                                  <h1 className="text-[#000000] opacity-[40%] font-[sfpro-regular] text-[12px]">Edit task to make changes in your work</h1>
                                </div>
                                <div className="flex-col flex justify-between h-[60vh] w-full">
                                  <div className="h-[6vh] w-full">
                                    <select
                                      name="listName"
                                      className="w-full px-2 outline-none h-[6vh] rounded-md border-2 border-solid border-[#70707080] bg-[#F6F6F6]"
                                      placeholder="Select List Name"
                                      value={data.listName}
                                      onChange={
                                        isEdit && editId == index
                                          ? addTodoChange(index)
                                          : null
                                      }
                                    >
                                      {todoListName.map((value) => {
                                        return <option value={value}>{value}</option>;
                                      })}
                                    </select>
                                  </div>
                                  <div className="h-[6vh] w-full">
                                    <input
                                      className="h-[6vh] px-2 outline-none rounded-md border-2 border-solid border-[#70707080] bg-[#F6F6F6] w-full "
                                      placeholder="Enter your task tittle.."
                                      name="taskTitle"
                                      value={data.taskTitle}
                                      onChange={
                                        isEdit && editId == index
                                          ? addTodoChange(index)
                                          : null
                                      }
                                    />
                                  </div>
                                  <div className="rounded-md px-2 border-2 border-solid bg-[#F6F6F6] border-[#70707080] h-[14vh] w-full">
                                    <textarea
                                      className="max-h-[12vh] px-2 pt-2 outline-none bg-[#F6F6F6] w-full resize-none"
                                      placeholder="Enter your task description."
                                      name="description"
                                      value={data.description}
                                      onChange={
                                        isEdit && editId == index ? addTodoChange(index) : null
                                      }
                                    />
                                  </div>
                                  <div className="flex justify-between flex-row h-[6vh] w-full">
                                    <div className="h-[6vh] w-[45%]">
                                      <input
                                        className="font-[interSemiBold] px-2 outline-none rounded-md border-2 border-solid border-[#70707080] bg-[#F6F6F6] w-full h-[6vh]  text-[13px]"
                                        type="time"
                                        name="time"
                                        value={data.time}
                                        onChange={
                                          isEdit && editId == index
                                            ? addTodoChange(index)
                                            : null
                                        }
                                      />
                                    </div>
                                    <div className="h-[6vh] w-[45%]">
                                      <input
                                        className="font-[interSemiBold] px-2 outline-none rounded-md border-2 border-solid border-[#70707080] bg-[#F6F6F6] w-full h-[6vh] text-[13px]"
                                        type="date"
                                        name="date"
                                        value={data.date}
                                        onChange={
                                          isEdit && editId == index
                                            ? addTodoChange(index)
                                            : null
                                        }
                                      />
                                    </div>
                                  </div>
                                  <div className="bg-[#F6F6F6] rounded-md border-2 border-solid border-[#70707080] px-2 flex justify-between items-center flex-row h-[6vh] w-full">
                                    {data.isComplete == "Low Priority" ? (
                                      <VerifyIcon
                                        fill="currentColor"
                                        width="18px"
                                        height="30px"
                                        style={{
                                          color: "#FC9F13",
                                        }}
                                      />
                                    ) : data.priority == "Mid Priority" ? (
                                      <VerifyIcon
                                        fill="currentColor"
                                        width="18px"
                                        height="30px"
                                        style={{
                                          color: "#857AF0",
                                        }}
                                      />
                                    ) : data.priority == "High Priority" ? (
                                      <VerifyIcon
                                        fill="currentColor"
                                        width="18px"
                                        height="30px"
                                        style={{
                                          color: "#E90854",
                                        }}
                                      />
                                    ) : (
                                      <VerifyIcon
                                        fill="currentColor"
                                        width="18px"
                                        height="30px"
                                        style={{
                                          color: "#FC9F13",
                                        }}
                                      />
                                    )}
                                    <select
                                      placeholder="Select Priority"
                                      className="font-[interSemiBold] px-2 outline-none bg-[#F6F6F6] h-[5vh] w-[88%] focus:outline-none"
                                      name="priority"
                                      value={data.priority}
                                      onChange={
                                        isEdit && editId == index
                                          ? addTodoChange(index)
                                          : null
                                      }
                                    >
                                      <option>Low Priority</option>
                                      <option>Mid Priority</option>
                                      <option>High Priority</option>
                                    </select>
                                  </div>
                                  <div className="mb-[15px] h-[6vh] w-full">
                                    <button className="bg-[#E90854] text-[24px] text-white font-[sfpro-medium] rounded-md h-[6vh] w-full"
                                      onClick={
                                        data.taskTitle ? addListClick : null
                                      }>Update</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </> : null
                        }
                      </>
                    )
                  })
                }
              </div>
            </div> : null
          }


        </div>

        {/* 
                    <div className=" flex justify-center w-[100%] h-[8vh]">
          <div
            id="addTask"
            className={`flex items-center  w-[90%] justify-center bg-[#0064FE] rounded-lg  ${
              todoListName.length == 0 || todoListName == undefined
                ? "cursor-not-allowed"
                : "cursor-pointer"
            }`}
            onClick={
              todoListName.length == 0 || todoListName == undefined
                ? null
                : addNewTask
            }
          >
            <div className="w-[15%]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 22 22"
              >
                <g
                  id="Group_18258"
                  data-name="Group 18258"
                  transform="translate(0 -4)"
                >
                  #0d0d0d
                  <rect
                    id="Rectangle_7346"
                    data-name="Rectangle 7346"
                    width="22"
                    className="group-hover:text-[#E90854]"
                    height="35"
                    rx="2"
                    transform="translate(0 4)"
                    fill="#fff"
                    opacity="0.8"
                  />
                  <path
                    id="plus_2_"
                    data-name="plus (2)"
                    d="M10.983,5.2H6.359V.578A.578.578,0,0,0,5.2.578V5.2H.578a.578.578,0,0,0,0,1.156H5.2v4.625a.578.578,0,1,0,1.156,0V6.359h4.625a.578.578,0,1,0,0-1.156Zm0,0"
                    transform="translate(5.404 9.5)"
                    fill="#0064FE"
                    stroke="#0064FE"
                    stroke-width="1"
                  />
                </g>
              </svg>
            </div>
            
            <div>
              <h1 className="text-[#ffffff]"> Add New Task</h1>
            </div>
          </div>
                    </div>
                <div
                  className="md:w-[40%] lg:45 xl:w-[45%] w-[45%]"
                  id="listPopup"
                  title="Add New List"
                  onClick={addList}
                >
                  <Image
                    width="38px"
                    height="38px"
                    src="/icons/AddTodo.svg"
                    className="hover:cursor-pointer"
                  />
                </div> */}

        {/* open popup */}


        <div className="flex justify-center w-[100%] h-[8vh]">
          <div
            className=" flex items-center  w-[90%] justify-center bg-[#0064FE] rounded-lg "
            id="listPopup"
            title="Add New List"
            onClick={addList}
          >
            <div className="w-[15%]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 22 22"
              >
                <g
                  id="Group_18258"
                  data-name="Group 18258"
                  transform="translate(0 -4)"
                >
                  #0d0d0d
                  <rect
                    id="Rectangle_7346"
                    data-name="Rectangle 7346"
                    width="22"
                    className="group-hover:text-[#E90854]"
                    height="35"
                    rx="2"
                    transform="translate(0 4)"
                    fill="#fff"
                    opacity="0.8"
                  />
                  <path
                    id="plus_2_"
                    data-name="plus (2)"
                    d="M10.983,5.2H6.359V.578A.578.578,0,0,0,5.2.578V5.2H.578a.578.578,0,0,0,0,1.156H5.2v4.625a.578.578,0,1,0,1.156,0V6.359h4.625a.578.578,0,1,0,0-1.156Zm0,0"
                    transform="translate(5.404 9.5)"
                    fill="#0064FE"
                    stroke="#0064FE"
                    stroke-width="1"
                  />
                </g>
              </svg>
            </div>
            <div>
              {
                <h2 className="text-[#ffffff]">{storeData == undefined ? "Create New List" : "Create New Task"}</h2>
              }

            </div>
          </div>
        </div>
        <div className="">
          <BtoolsFooter />
        </div>
      </div>
      <div className="md:hidden block sm:block">
        {
          isNewTask || showEditPopup ? null :
            <div onClick={
              storeData?.datas?.length == 0 ||
                storeData?.datas == undefined
                ? null
                : openExportPopup
            } className=" fixed flex items-center justify-end bottom-[1420px] top-[550px]  right-[22px] h-[10vh] w-full">
              <div className="bg-[#e90854] h-[4rem] flex justify-center items-center rounded-full w-[4rem]">
                <img src="/icons/Icon download.svg" height={20} width={20} alt="download" />
              </div>
            </div>
        }
      </div>
      {/* {todoListName.length > 0 ?
      <PDFViewer height={"800px"} width={"850px"} showToolbar={true}>
        <TodoPdfContent datas={storeData.datas}/>
      </PDFViewer> : null } */}
    </>
  );

};

export default TodoList;
