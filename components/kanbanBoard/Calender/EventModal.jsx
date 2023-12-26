import React, { useContext, useState , useEffect } from "react";
import GlobalContext from "./GlobalContext";
import { red } from "@mui/material/colors";
import Services from "../../../services/kanbanBoard/service";

const labelsClasses = [
  "Orange",
  "green",
  "red",
  "blue"]

export default function EventModal({saveData}) {
  const {
    setShowEventModal,
    daySelected,
    dispatchCalEvent,
    selectedEvent,
  } = useContext(GlobalContext);

  const [title, setTitle] = useState(
    selectedEvent ? selectedEvent.title : "");

  const [dateValue, SetDateValue] = useState("")

  const [description, setDescription] = useState(
    selectedEvent ? selectedEvent.description : ""
  );
  const [selectedLabel, setSelectedLabel] = useState(
    selectedEvent
      ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
      : labelsClasses[0]
  );

  const [object,setObject]=useState({
    title: "Big Meeting",
    day: "2023, 02, 7",
    label: 'red',
  },{
    title: "Meeting",
    day: "2023, 02, 7",
    label: 'red',
  })

  const [allData,setAllData]=useState([]);
const [useEffectt,setUseEfect]=useState(false)

  function handleSubmit() {
    
  }

  

  // return (
  //   <div className="h-screen w-full fixed left-0 top-0 flex justify-center items-center">
  //     <form className="bg-white rounded-lg shadow-2xl w-1/4">
  //       <header className="bg-gray-100 px-4 py-2 flex justify-between items-center">
  //         <div className="flex w-[100%] justify-between">
  //           <div>
  //           {selectedEvent && (
  //             <span
  //               onClick={() => {
  //                 dispatchCalEvent({
  //                   type: "delete",
  //                   payload: selectedEvent,
  //                 });
  //                 setShowEventModal(false);
  //               }}
  //               className="material-icons-outlined text-gray-400 cursor-pointer"
  //             >
  //               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  //                 <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
  //               </svg>

  //             </span>
  //           )}
  //           </div>
  //          <div className=" ">
  //          <button onClick={() => setShowEventModal(false)}>
  //             <span className="material-icons-outlined text-gray-400">
  //               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  //                 <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
  //               </svg>

  //             </span>
  //           </button>
  //          </div>
  //         </div>
  //       </header>
  //       <div className="p-3">
  //         <div className="grid grid-cols-1/5 items-end gap-y-7">
  //           <div></div>
  //           <input
  //             type="text"
  //             name="title"
  //             placeholder="Add title"
  //             value={title}
  //             required
  //             className="pt-3 border-0 text-gray-600 text-xl font-semibold pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
  //             onChange={(e) => setTitle(e.target.value)}
  //           />
  //           <p>{daySelected.format("dddd, MMMM DD")}</p>
  //           <input
  //             type="text"
  //             name="description"
  //             placeholder="Add a description"
  //             value={description}
  //             required
  //             className="pt-3 border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500"
  //             onChange={(e) => setDescription(e.target.value)}
  //           />
  //           <input type="date"  onChange={(e) => SetDateValue(e.target.value)} />

  //           <div className="flex gap-x-2">
  //             {labelsClasses.map((lblClass, i) => (
  //               <span
  //                 key={i}
  //                 onClick={() => setSelectedLabel(lblClass)}
  //                 className={`bg-${lblClass}-500 w-10 h-6 cursor-pointer`}>
  //               </span>
  //             ))}
  //           </div>

  //         </div>
  //       </div>
  //       <footer className="flex justify-end border-t p-3 mt-5">
  //         <button
  //           type="submit"
  //           onClick={handleSubmit}
  //           className="bg-blue-500 hover:bg-blue-500 px-6 py-2 rounded text-white "
  //         >
  //           Save
  //         </button>
  //       </footer>
  //     </form>
  //   </div>
  // );
}