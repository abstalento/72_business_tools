import { useState, useEffect } from "react";
import Myimage from "../../components/todolistcomponents/Image/Image";
import Edit from "./Edit";
import Delete from "./Delete";
export default function Addtodobox({
  data,
  index,
  sidebar,
  arrayaddtodo,
  setArrayaddtodo,
  setFilterdata,
}) {
  const [completed, setCompleted] = useState(true);
  const [status, setStaus] = useState(true);
  const [editlayout, setEditlayout] = useState(false);
  const [editdata, setEditdata] = useState("");
  const [deleteImage, setDeleteImage] = useState(true);
  // const [newlist, setNewlist] = useState([]);
  //update
  const [updateObject, setUpdateObject] = useState({
    heading: "",
    categorytype: "",
    piority: "",
    date: "",
    time: "",
    taskstatus: "Progress",
  });
  const [currentindex, setCurrentindex] = useState();

  const [deletecurrentindex, setDeleteCurrentIndex] = useState();

  const [deletelayout, setDeletelayout] = useState(false);

  const DeleteclickLayout = (index) => {
    setDeleteCurrentIndex(index);
    setDeletelayout(true);
  };

  const Closeedit = () => {
    setDeletelayout(false);
  };
  let valuedata;
  const Editclick = (index) => {
    setCurrentindex(index);
    setEditlayout(!editlayout);
    // setNewlist(arrayaddtodo);
    valuedata = arrayaddtodo[index].heading;

    // setUpdateObject({ ...updateObject, heading: valuedata });

    // console.log(valuedata, newlist, index, "valuedata");
    setEditdata(valuedata);
    // setArrayaddtodo({
    //   ...arrayaddtodo[currentindex],
    //   heading: editdata.heading,
    // });
  };

  const saveChange2 = (event) => {
    // setEditdata((prevState) => ({
    //   ...prevState,
    //   [event.target.name]: event.target.value,
    // }));

    setEditdata(event.target.value);
    setUpdateObject({
      ...updateObject,
      heading: event.target.value,
    });
  };

  const saveChange = (event) => {
    setUpdateObject((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };
  // const [updatearray, setUpatearray] = useState([]);
  // setUpatearray([...updatearray, updateObject]);

  //

  //
  const Deleteokay = () => {
    const dataResult = arrayaddtodo.filter((a, i) => i !== deletecurrentindex);
    setArrayaddtodo(dataResult);
    setFilterdata(dataResult);
    setDeletelayout(false);
  };

  let piority;
  // let headingUpdate;
  const HandlelogUpdate = (item) => {
    setUpdateObject({
      ...updateObject,
      piority: item,
    });

    piority = arrayaddtodo.map((elm, index) => {
      if (index === currentindex) {
        return updateObject;
      } else return elm;
    });
    // setUpdateObject({ ...updateObject,  });
    // headingUpdate = arrayaddtodo.map((elm, index) => {
    //   console.log(index, currentindex, updateObject);
    //   if (index === currentindex) {
    //     return updateObject;
    //   } else return elm;
    // });
  };

  const Updateclick = () => {
    if (updateObject.heading === "") {
      return alert("Not Validate");
    } else if (updateObject.heading.length >= 30) {
      return alert("Maximum 30 characters allowed");
    } else if (updateObject.categorytype === "") {
      return alert("Dropdown Not Validate");
    } else if (updateObject.piority === "") {
      return alert("piority Not Validate");
    } else if (updateObject.date === "") {
      return alert("Date Not Validate");
    } else if (updateObject.time === "") {
      return alert("Time Not Validate");
    } else {

      let update = arrayaddtodo.map((elm, index) => {
        if (index === currentindex) {
          return updateObject;
        } else return elm;
      });

      setArrayaddtodo(piority);
      // setArrayaddtodo(headingUpdate);
      setArrayaddtodo(update);
      setEditlayout(false);
      if (typeof window !== "undefined") {
        window.location.reload(false);
      }
      
      // let updateEdit = (arrayaddtodo[currentindex].heading = editdata.heading);
      // setArrayaddtodo(updateEdit);
      // console.log(arrayaddtodo[currentindex], updateObject, "Updateclick");
      // const update = arrayaddtodo[currentindex] == updateObject;
      // setArrayaddtodo(update);
      // console.log(update, "update");
      // const update = [arrayaddtodo[currentindex], updateObject];
      // setArrayaddtodo(update);
      // console.log(arrayaddtodo[currentindex], updateObject, "hhhh");
      // arrayaddtodo.splice(currentindex, 1, updateObject);

      // setEditlayout(false);
      //
    }
  };

  const Taskstatusclick = (i, st) => {
    // alert(i);
    let value = st ? "completed" : "Progress";
    // alert(value);

    let updd = arrayaddtodo.map((elm, index) => {
      if (index === i) {
        return { ...elm, taskstatus: value };
      } else return elm;
    });

    setArrayaddtodo(updd);
    setFilterdata(updd);

    // let bbff = (addtodo.find((index) => index === i).taskstatus = value);

    // setAddtodo(addtodo.filter((index) => index === i));
    // console.log(bbff);
    // setStaus(!status);
    // let Objindex = arrayaddtodo[i].taskstatus;

    //
    // console.log(UPtask, "UPtask");
    // setArrayaddtodo(UPtask);
    // console.log(Objindex, "objIndex");
    setCompleted(!completed);
    setStaus(!status);
  };

  const clearclick = () => {
    setEditlayout(false);
  };
  const Redflag = "todolistimages/Redflag.svg";
  const Yellowflag = "todolistimages/yellowflag.svg";
  const Greenflag = "todolistimages/greenflag.svg";
  let ImageObject = {
    Image: " ",
  };
  const getImageStatus = (item) => {
    switch (item) {
      case "High":
        ImageObject.Image = Redflag;
        break;
      case "Medium":
        ImageObject.Image = Yellowflag;
        break;
      case "Low":
        ImageObject.Image = Greenflag;
        break;

      default:
        break;
    }
    return ImageObject;
  };

  return (
    <div>
      <div className="border-solid border-t border-[#000000] opacity-5"></div>

      <div className="flex flex-row flex-wrap justify-evenly mt-[20px]">
        {" "}
        <div
          className="cursor-pointer ml-[-243px]"
          onClick={() => Taskstatusclick(index, status)}
        >
          <Myimage
            src={
              completed
                ? "/todolistimages/brownCircle.svg"
                : "/todolistimages/completedGreen.svg"
            }
            alt="Task"
            width={30}
            height={25}
          />
        </div>
        <div className="ml-[-250px] mt-[2px] w-64 m-2 truncate text-[#000000] opacity-15 text-[20px] font-['sf-pro-medium']">
          {" "}
          <span className={completed ? null : "line-through	"}>
            {data.heading}
            {data.taskstatus}
          </span>
        </div>
        <div className="flex flex-row space-x-6">
          <div>
            {" "}
            <Myimage
              src="/todolistimages/calendarblack.svg"
              alt="calendar"
              width={25}
              height={15}
            />
            <span className="ml-[5px]">{data.date}</span>
          </div>
          <div>
            {" "}
            <Myimage
              src="/todolistimages/clockBlack.svg"
              alt="clock"
              width={25}
              height={15}
            />
            <span>{data.time}</span>
          </div>
        </div>
        <div className="flex flex-row space-x-12 mr-[-138px]">
          <div>
            <Myimage
              src={`/${
                getImageStatus(data.piority) ? ImageObject.Image : null
              }`}
              alt="piority"
              width={30}
              height={25}
            />
          </div>{" "}
          <div onClick={() => Editclick(index)}>
            {" "}
            <Myimage
              src="/todolistimages/editblue.svg"
              alt="Edit"
              width={30}
              height={25}
            />
          </div>{" "}
          <div
            onMouseEnter={() => setDeleteImage(false)}
            onMouseLeave={() => setDeleteImage(true)}
            className="cursor-pointer "
            onClick={() => DeleteclickLayout(index)}
          >
            <Myimage
              src={
                deleteImage
                  ? "/todolistimages/deleteblack.svg "
                  : "/todolistimages/reddelete.svg "
              }
              alt="Delete"
              width={30}
              height={25}
            />
          </div>
        </div>{" "}
      </div>

      <div className="flex flex-row">
        <div className="text-[#000000] text-[20px] font-['sf-pro-bold'] ml-[80px] pb-[10px]">
          {" "}
          {data.categorytype}
        </div>
      </div>

      <div className="border-solid border-b border-[#000000] opacity-10"></div>

      {editlayout ? (
        <div>
          <Edit
            heading={updateObject.heading}
            categorytype={setUpdateObject.categorytype}
            date={setUpdateObject.date}
            time={setUpdateObject.time}
            saveChange={saveChange}
            sidebar={sidebar}
            HandlelogUpdate={HandlelogUpdate}
            Updateclick={Updateclick}
            saveChange2={saveChange2}
            editdata={editdata}
            clearclick={clearclick}
          ></Edit>
        </div>
      ) : null}

      {deletelayout ? (
        <div>
          {" "}
          <Delete Closeedit={Closeedit} Deleteokay={Deleteokay}></Delete>
        </div>
      ) : null}
    </div>
  );
}
