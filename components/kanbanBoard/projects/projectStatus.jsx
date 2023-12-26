import { useSlotProps } from "@mui/base";
import { boxSizing } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
// import uuid from "uuid";
import { v1 as uuid } from "uuid";
import AddNewPopup from "../createnewpopup/AddNewPopup";
import TaskPopUp from "../createnewpopup/TaskPopUp";
import TaskModalPopup from "../task-modal-popup/TaskModalPopup";
import PouchDB from "pouchdb";
import GlobalContext from "../Calender/GlobalContext";
import { filter } from "lodash";
import Services from "../../../services/kanbanBoard/service";
import Deletepopup from "../createnewpopup/Deletepopup";

let itemsOfTodo = [];

const itemsOfInprogress = [];

const itemsOfCompleted = [];
let id = [uuid()];
const columnsFromBackends = {
  [uuid()]: {
    name: "To Do",
    items: itemsOfTodo
  },
  [uuid()]: {
    name: "Pending",
    items: itemsOfTodo
  },
  [uuid()]: {
    name: "Completed",
    items: itemsOfTodo
  },
};

const columnsFromBackend = {
  // [uuid()]: {
  //   name: "To Do",
  //   items: itemsOfTodo
  // },
  // [uuid()]: {
  //   name: "Pending",
  //   items: itemsOfTodo
  // },
  // [uuid()]: {
  //   name: "Completed",
  //   items: itemsOfTodo
  // },
};


function ProjectStatus(props) {
  const { selectedCardValue, selectedCardId } = useContext(GlobalContext);

  const [columns, setColumns] = useState(columnsFromBackend);
  const [newColumn, setNewColumn] = useState({})
  const [todoDb, setToDoDb] = useState();

  const [projectName, setProjectName] = useState();
  const [useEffectCall, setUseEffectCall] = useState(true);
  const [callUseEffect, setCallUseEffect] = useState(true);
  const [getData, setGetData] = useState(false);
  const [TodoAddList, setTodoAddList] = useState(false);
  const [columnIndex, setColumnIndex] = useState();
  const [columnName, setColumnName] = useState();
  const [getInputData, setToGetInputData] = useState(false);
  const [addTitle, setAddTitle] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [Title, setTitle] = useState("");
  const [selectedCard, setSelectedcard] = useState();
  const [cardId, setCardId] = useState();
  const [cardIndex, setCardIndex] = useState();
  const [index, setIndex] = useState(0);
  const [PopupClear, setPopupClear] = useState();
  const [DeleteDAta, setDeleteDAta] = useState();
  const [showModalPopup, setShowModalPopup] = useState(false)

  const closemenu=()=>{
    props.closemenuitem()
  }
  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      let sourceDrag = {
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      };
      var db = new PouchDB("KanbanBoardNewProject");
      db.get("kanbanBoardNewProjectHistory", function (err, doc) {
        if (doc) {
          let proList = doc.data;
          let index = proList.findIndex((elmt) => elmt.id == selectedCardId);
          if (index != -1) {
            proList[index].taskList = sourceDrag;
            db.get("kanbanBoardNewProjectHistory")
              .then(function (doc) {
                return db.put({
                  _id: "kanbanBoardNewProjectHistory",
                  _rev: doc._rev,
                  data: proList,
                });
              })
              .then(function (response) {
                // handle response
                console.log("RESP-->", response);
              })
              .catch(function (err) {
                console.log(err);
              });
          }
          setCallUseEffect(!callUseEffect);
        }
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };


  const setCloseButton = (data) => {
    setShowModalPopup(data)

  }


  const HandleDelete = (data) => {
    setDeleteDAta(data)
    setShowModalPopup(true)


  }

  const deleteInvoice = (data) => {
    setShowModalPopup(true)
    setDeleteDAta(data)
  }

  const sendDeleteIdValue = (data) => {
    let myObject = {}
    {
      Object.entries(columns).filter(([columnId, column], index) => {

        if (columnId !== data) {
          myObject[columnId] = {
            name: column.name,
            items: column.items,
          }
          var db = new PouchDB("KanbanBoardNewProject");
          db.get("kanbanBoardNewProjectHistory", function (err, doc) {
            if (doc) {
              let proList = doc.data;
              let index = proList.findIndex((elmt) => elmt.id == selectedCardId);
              if (index != -1) {
                proList[index].taskList = myObject;
                db.get("kanbanBoardNewProjectHistory")
                  .then(function (doc) {
                    return db.put({
                      _id: "kanbanBoardNewProjectHistory",
                      _rev: doc._rev,
                      data: proList,
                    });
                  })
                  .then(function (response) {
                    console.log("RESP-->", response);
                  })
                  .catch(function (err) {
                    console.log(err);
                  });
              }
              setCallUseEffect(!callUseEffect);
            }
          });
        }
      })
    }
    setShowModalPopup(false)
  }


  const addingList = (sampleData, id, data) => {
    let addedData = {
      id: sampleData.id,
      description: sampleData.description,
      taskTitle: sampleData.taskTitle,
      priority: sampleData.priority,
      attachment: sampleData.attachment,
      projectName: sampleData.projectName,
      periodOfTask: sampleData.periodOfTask,
    };

    Object.entries(columns).map(([columnId, column]) => {
      if (columnId == id) {
        const sourceColumn = columns[id];
        let newSource = {
          ...columns,
          [id]: {
            ...sourceColumn,
            items: [...sourceColumn.items, addedData],
          },
        };
        var db = new PouchDB("KanbanBoardNewProject");
        db.get("kanbanBoardNewProjectHistory", function (err, doc) {
          if (doc) {
            let proList = doc.data;
            let index = proList.findIndex((elmt) => elmt.id == selectedCardId);
            if (index != -1) {
              proList[index].taskList = newSource;
              db.get("kanbanBoardNewProjectHistory")
                .then(function (doc) {
                  return db.put({
                    _id: "kanbanBoardNewProjectHistory",
                    _rev: doc._rev,
                    data: proList,
                  });
                })
                .then(function (response) {
                  // handle response
                  console.log("RESP-->", response);
                })
                .catch(function (err) {
                  console.log(err);
                });
            }
            setCallUseEffect(!callUseEffect);
          }
        });

        // setColumns({
        //   ...columns,
        //   [id]: {
        //     ...sourceColumn,
        //     items: [...sourceColumn.items, addedData],
        //     },

        // });
      }
    });
  };

  useEffect(() => {
    (async function Change() {
      await Services.getKanbanBoardNewProjectHistory();
      await Services.getKanbanBoardNewProjectHistory();
      const kanbanBoardHistory =
        await Services.getKanbanBoardNewProjectHistory();
      if (kanbanBoardHistory.data) {
        let myHistory = kanbanBoardHistory.data.filter(
          (value) => value.id == selectedCardId
        );
        let myColumn = myHistory.map((value) => setColumns(value.taskList));
        props.SaveCallBackData(myHistory[0]?.projectName);
        setProjectName(myHistory[0]?.projectName);
      }
    })();
  }, [callUseEffect]);

  useEffect(() => {
    (async function Change() {
      const kanbanBoardNewProjectHistory =
        await Services.getKanbanBoardNewProjectHistory()
      if (kanbanBoardNewProjectHistory.data == undefined) {
        setToDoDb([]);
      } else {
        setToDoDb(kanbanBoardNewProjectHistory.data);
      }
    })();
  }, [columns]);

  const AddList = (data, index) => {
    setIndex(index);
    setShowModal(true);
    setUseEffectCall(false);
    setSelectedItemId("");
  };




  const handleTitleKeyPress = (e, index, columns) => {
    if (e.key == "Enter") {
      setColumns({
        ...columns,
        [uuid()]: {
          name: e.target.value,
          items: [],
        },
      });
      setAddTitle(false);
    }
    // setAddTitle(false)
  };
  const addAnotherTitle = () => {
    setAddTitle(!addTitle);

  };

  const cardSelect = (e, name, columnId, index) => {
    e.projectName = projectName;
    setSelectedItemId(e);
    setSelectedcard(name);
    setTitle(name);
    setCardIndex(index);
    setCardId(columnId);
    setShowModal(true);
    setUseEffectCall(true);
  };

  const popupClose = () => {
    setShowModal(false);
  };

  const columnClick = (index, name, columnId) => {
    setColumnName(name)
    setColumnIndex(index)
    setCardId(columnId)
  }

  const columnNameChange = (e) => {
    let value = e.target.value
    setColumnName(value)
  }

  const columnNameKeyPress = (e) => {

    if (e.key == "Enter") {
      {
        Object.entries(columns).filter(([columnId, column], index) => {
          if (cardId == columnId) {
            let newSource = {
              ...columns,
              [columnId]: {
                name: e.target.value,
                items: column.items,
              },
            }
            var db = new PouchDB("KanbanBoardNewProject");
            db.get("kanbanBoardNewProjectHistory", function (err, doc) {
              if (doc) {
                let proList = doc.data;
                let index = proList.findIndex((elmt) => elmt.id == selectedCardId);
                if (index != -1) {
                  proList[index].taskList = newSource;
                  db.get("kanbanBoardNewProjectHistory")
                    .then(function (doc) {
                      return db.put({
                        _id: "kanbanBoardNewProjectHistory",
                        _rev: doc._rev,
                        data: proList,
                      });
                    })
                    .then(function (response) {
                      console.log("RESP-->", response);
                    })
                    .catch(function (err) {
                      console.log(err);
                    });
                }
                setCallUseEffect(!callUseEffect);
                setColumnIndex()
              }
            });
          }


        })
      }
    }
  }

  const close = (data, name, id, index, column) => {
    let taskTitle = "",
      projectName = "",
      priority = "",
      description = "",
      attachment = "",
      periodOfTask = "";

    data.map((details) => {
      details.state.listData.map((getData) => {
        if (
          getData.taskTitle != "" &&
          getData.priority != "" &&
          getData.projectName != ""
        ) {
          projectName = getData.projectName;
          priority = getData.priority;
          periodOfTask = getData.periodOfTask;
          taskTitle = getData.taskTitle;
          description = getData.description;
          attachment = getData.attachment;
        }
      });
    });

    let sampleData = {
      id: selectedItemId?.id ? selectedItemId.id : uuid(),
      description: description,
      taskTitle: taskTitle,
      attachment: attachment,
      priority: priority,
      projectName: projectName,
      periodOfTask: periodOfTask,
    };

    if (selectedItemId?.id == sampleData.id) {
      const sourceColumn = columns[cardId];
      sourceColumn.items.splice(cardIndex, 1, sampleData);
      var db = new PouchDB("KanbanBoardNewProject");
      db.get("kanbanBoardNewProjectHistory", function (err, doc) {
        if (doc) {
          let proList = doc.data;
          let index = proList.findIndex((elmt) => elmt.id == selectedCardId);
          if (index != -1) {
            proList[index].taskList = columns;
            db.get("kanbanBoardNewProjectHistory")
              .then(function (doc) {
                return db.put({
                  _id: "kanbanBoardNewProjectHistory",
                  _rev: doc._rev,
                  data: proList,
                });
              })
              .then(function (response) {
                // handle response
                console.log("RESP-->", response);
              })
              .catch(function (err) {
                console.log(err);
              });
          }
          setCallUseEffect(!callUseEffect);
        }
      });
    } else {
      addingList(sampleData, id);
      props.SaveCallBackData(sampleData.projectName);
    }
    setShowModal(false);
    setGetData(true);
  };

  return (
    <>
      {
        showModalPopup == true ? (<><Deletepopup DeleteData={DeleteDAta} sendDeleteId={sendDeleteIdValue} setCloseButton={setCloseButton} /></>) : null
      }
      <div className="flex items-center w-auto"  >
        <div className="w-full md:flex h-[90vh] justify-start items-start overflow-x-scroll scroll-smooth scrollBar hide-scroll-bar">
          {showModal ? (
            <TaskPopUp
              renderDetails={selectedItemId}
              projectTitle={projectName}
              saveCallback={close}
              columnDetails={columns}
              index={index}
              closePopup={popupClose}
              openPopUp={useEffectCall}
            />
          ) : null}

          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div className="w-[22%] xl:w-[27%] md:w-[60%] lg:w-[32%]">
                  <div className="flex md:w-[100%] w-[20rem]  xl:pl-[20px] xl:pr-[176px] 2xl:pl-[8px] 2xl:pr-[207px] justify-between items-center">
                    <div className="w-fit flex cursor-pointer truncate" title={column.name}>
                      {columnIndex == index ? <input className="outline-none rounded-sm" value={columnName} onChange={columnNameChange} onKeyPress={(e) => columnNameKeyPress(e)} /> : <h1 className="font-[sfpro-bold] text-[#232E38] w-full text-[18px]" onClick={() => { column.name == "To Do" || column.name == "Completed" || column.name == "In Progress" ? null : columnClick(index, column.name, columnId) }}>
                        {column.name}
                      </h1>}
                      {
                        column.name == "To Do" || column.name == "Completed" || column.name == "In Progress" ? <></> : <>
                          <svg
                            id="deleteButton"
                            xmlns="http://www.w3.org/2000/svg"
                            className="MuiSvgIcon-root text-[#999999] h-[25px] group-hover:block hover:text-[#e10918] cursor-pointer"
                            onClick={() => deleteInvoice(columnId, index)}
                            focusable="false"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                          >
                            <path
                              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                              fill="currentColor"
                            ></path>
                          </svg></>
                      }
                    </div>
                    <div className="p-3">
                      <p className="text-white bg-[#773dfe] font-[sf-pro-medium] justify-center flex rounded-full w-6">
                        {column.items.length}
                      </p>
                    </div>
                  </div>
                  <div
                    className="flex flex-col lg:flex-row md:items-center  mb-2"
                    key={columnId}
                  >
                    <div
                      style={{
                      
                        borderRadius: 15,
                      }}
                       >
                        
                      <Droppable droppableId={columnId} key={columnId}>
                        {(provided, snapshot) => {
                          return (
                            <div
                              className="scrollBar md:min-h-[800px]  "
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                               
                                paddingTop: 8,
                                width: 450,
                                marginLeft: -30,
                              
                                maxHeight: 500,
                                borderBottomLeftRadius: 15,
                                borderBottomRightRadius: 15,
                                boxSizing: "border-box",
                                marginRight: 3,
                                // height:400,
                                overflowY: "scroll",
                                resize: "none",
                            
                              }}
                            >
                              {column.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          onClick={(e) =>
                                            cardSelect(
                                              item,
                                              column.name,
                                              columnId,
                                              index
                                            )
                                          }
                                          style={{
                                            userSelect: "none",
                                            paddingLeft: 20,
                                            paddingBottom: 15,
                                            marginBottom: 15,
                                            marginLeft: 40,
                                            maxHeight: "1000rem",
                                            minHeight: "120px",
                                            width: "280px",
                                            backgroundColor: snapshot.isDragging
                                              ? "#FFFFFF"
                                              : "#FFFFFF",
                                            color: "black",
                                            borderRadius: 5,
                                            boxSizing: "border-box",

                                            ...provided.draggableProps.style,
                                          }}
                                        >

                                          <div className="pt-3 mt-3">
                                            <p
                                              className={` rounded-lg h-[8px] w-[50px] ${item.priority == "Low"
                                                ? "bg-[#ffc107]"
                                                : item.priority == "High"
                                                  ? "bg-[#ef5350]"
                                                  : item.priority == "Medium"
                                                    ? "bg-[#66bb6a]"
                                                    : "bg-white"
                                                }`}
                                            ></p>
                                          </div>
                                          <div className="">
                                            <p className="text-[16px] pr-[17px] text-justify font-[sfpro-Bold] mt-3 text-black">
                                              {item.taskTitle}
                                            </p>
                                          </div>
                                          {/* </div> */}
                                          <div>
                                            <p className="text-[12px] pr-[17px] text-justify opacity-70 font-[sf-pro-regular] text-black">
                                              {item.description}
                                            </p>
                                          </div>
                                          {item?.attachment ? (
                                            <div>
                                              <img
                                                src={item?.attachment}
                                                className="h-[150px] w-fit mr-2"
                                              />
                                            </div>
                                          ) : null}
                                        </div>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                              
                              {provided.placeholder}
                              <div
                        onClick={(e) => AddList(column.name, index)}
                    className="bg-white flex rounded-md justify-center mt-[10px]  ml-[37px] h-[40px] w-[284px] px-1 mb-3"
                      >
                    <img
                      src="../icons/createplusBlack.svg"
                      className="opacity-60 cursor-pointer "
                      height={15}
                      width={15}
                    />
                  </div>
                            </div>
                          );
                        }}
                        
                      </Droppable>
                      
                    </div>
                    
                  </div>
                
                </div>
              );
            })}
            <div
              className="flex w-[22%] h-[30px] md:p-3 mt-2 items-center"
            >

              <div className="w-[100%]">
                {addTitle ? (
                  <input
                    type="text"
                    className=" border-[#000] border-spacing-2 placeholder-gray-800 font-[sf-pro-medium] pl-2 rounded-md bg-[#F9F9F9] outline-none"
                    name=""
                    placeholder="Enter Your Title"
                    autoFocus="on"
                    id=""
                    maxLength={25}
                    onKeyPress={(e, index) =>
                      handleTitleKeyPress(e, index, columns)
                    }
                  />
                ) :  (
                  <div className="md:min-w-[170px] md:flex flex w-[170px] md:pt-0 pt-[4rem] items-center cursor-pointer"   onClick={addAnotherTitle} >
                    <p className="font-[sfpro-bold]  text-xs font-semibold text-[16px]">
                      Add Another List
                    </p>
                    <div
                      className="flex justify-start p-3 items-center"
                    >
                      <img
                        src="../icons/createplusBlack.svg"
                        className="cursor-pointer"
                        height={10}
                        width={15}
                        alt=""
                      

                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </DragDropContext>
        </div>
      </div>
    </>

  );
}

export default ProjectStatus;
