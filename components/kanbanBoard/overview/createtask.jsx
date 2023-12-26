import React, { useEffect, useState } from "react";

import Image from "next/image";



const CreateModalPopup = ({ isVisible, onClose, saveData }) => {

    if (!isVisible) return null;
    const [allData, setAllData] = useState([])
    const [state, setState] = useState({ title: "", priority: "", summary: "", start: "", end: "" })




    const saveList = () => {
        setAllData([...allData, state])
        // onClose(false)

        saveData(allData)



    };

    useEffect(() => {

        saveData(allData)


    }, [allData])


    const clear = () => {
        setState({ title: "", priority: "", summary: "", start: "", end: "" })
    }

    let Details = [{
        id: 1,
        title: "Project Abs",
        paragraph: "White-box testing is a method of software testing that tests internal structures or workings of an application, as opposed to its functionality. White-box testing is a method of software testing that tests internal structures or workings of an application, as opposed to its functionality.",
        date: "Yesterday, November 18th last at 5.00 PM",
        priority: "Low",
    }
        , {
        id: 1,
        title: "Project A",
        paragraph: "White-box testing is a method of software testing that tests internal structures or workings of an application, as opposed to its functionality. White-box testing is a method of software testing that tests internal structures or workings of an application, as opposed to its functionality.",
        date: "Yesterday, November 18th last at 5.00 PM",
        priority: "Low",
    }]

    return (
        <>
            <div className="justify-center bg-[#080808] bg-opacity-[0.5] items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50  ">
                <div className=" relative w-[45%] h-[55%] bg-white rounded-3xl  items-center flex justify-center ">
                    <div className="h-[85%] w-[90%] flex justify-between flex-col ">
                        <div className="flex justify-between  ">
                            <div>
                                <h1 className="text-lg font-[sfpro-bold]">Create New Project</h1>
                            </div>
                            <div>
                                <button className="text-2xl place-self-end" onClick={onClose}>x</button>
                            </div>
                        </div>


                        <div className="flex  justify-between">
                            <div>
                                <h4 className="text-sm font-[sfpro-bold]">Project Name</h4>
                            </div>
                            <div>
                                <input type="text" placeholder="Development Creative Project"
                                    className="bg-[#F9F9F9] outline-none p-3 rounded-md"
                                    onChange={e => setState({ ...state, title: e.target.value })}
                                    value={state.title}
                                />
                            </div>
                            <div className="flex p-2  bg-[#F9F9F9] rounded-lg">
                                <div className="flex items-center">
                                    <label className="text-sm font-[sfpro-bold]">Choose Priority</label>
                                </div>

                                <div className=" flex items-center">
                                    <select className="bg-[#EF5350] text-white border-none outline-none ml-1 h-6 text-sm rounded-md "
                                        name="priority" id="" onChange={e => setState({ ...state, priority: e.target.value })} value={state.priority}
                                    >
                                        <option className="bg-red-500">High</option>
                                        <option className="bg-yellow-500">Medium</option>
                                        <option className="bg-green-500">Low</option>
                                    </select>
                                </div>

                            </div>

                        </div>


                        <div className="flex justify-between">

                            <div>
                                <h4 className="text-sm font-[sfpro-bold]">Descriptions</h4>
                            </div>
                            <div className="w-[75%]">
                                <textarea className="w-full h-[15vh] p-2 bg-[#F9F9F9] rounded-lg outline-none overflow-hidden resize-none"
                                    name="summary"
                                    placeholder="White-box testing is a method of software testing that tests internal structures or workings of... "
                                    onChange={e => setState({ ...state, summary: e.target.value })}
                                    value={state.summary} maxLength={100}></textarea>
                            </div>


                        </div>
                        <div className="flex justify-between items-center w-full">
                            <div>
                                <label className="text-sm font-[sfpro-bold]">Period of Task</label>
                            </div>
                            <div className="flex justify-between w-[75%]">
                                <div className=" flex gap-2 items-center p-[25px] w-[180px] h-[5vh] bg-[#F9F9F9] rounded-lg outline-none">
                                    <Image
                                        width="20px"
                                        height="25px"
                                        src="../icons/Calendar.svg"
                                        className="hover:cursor-pointer"
                                    />
                                    <h2 className="font-[sfpro] text-[12px]"><input type="date" name="start" id="" value={state.start} className="bg-[#F9F9F9] outline-none" onChange={e => setState({ ...state, start: e.target.value })} /></h2>
                                    <input type="date" className="hidden" ></input>
                                </div>
                                <div className=" flex gap-2 p-[25px] items-center w-[180px] h-[5vh] bg-[#F9F9F9] rounded-lg outline-none">
                                    <Image
                                        width="20px"
                                        height="25px"
                                        src="../icons/Calendar.svg"
                                        className="hover:cursor-pointer"
                                    />
                                    <h2 className="font-[sfpro] text-[12px]"><input type="date" name="end" id="" value={state.end} className="bg-[#F9F9F9] outline-none" onChange={e => setState({ ...state, end: e.target.value })} /></h2>
                                    <input type="date" className="hidden" />
                                </div>
                            </div>
                        </div>



                        <div className="flex justify-end gap-5 w-full" >
                            <button className="bg-black bg-opacity-1 text-white rounded w-[150px] h-[34px] font-[sfpro] text-[12px]" onClick={clear} >Clear</button>
                            <button className="bg-[#3D5AFE] text-white rounded w-[150px] h-[34px]  font-[sfpro] text-[12px]" onClick={saveList} >Create New Project</button>
                        </div>



                    </div>
                </div>
            </div>
        </>
    )

}

export default CreateModalPopup;