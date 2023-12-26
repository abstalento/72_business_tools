import { useState } from "react";

const MyProjects = () => {
  let ProjectDetails = [
    {
      id: 1,
      title: "Project name",
      style: "w-[15%] m-5",
    },
    {
      id: 2,
      title: "Status",
      style: "w-[15%] m-5",
    },
    {
      id: 3,
      title: "Task progress",
      style: "w-[15%] m-5",
    },
    {
      id: 4,
      title: "Dates",
      style: "w-[15%] m-5",
    },
    {
      id: 4,
      title: "Priority",
      style: "w-[15%] m-5",
    },
  ];

  let tableValues = [
    {
      projectname: "Increase revenue 70%",
      status: "On Track",
      style: "w-[15%] m-5",
      taskprogress: "68%",
      date: "Jan 1-Dec 10",
      priority: "medium",
      type: "Sales",
      prioritybtnStyle:"flex justify-center rounded-full w-[6%] h-6 m-5 bg-[#4d7c0f]",
      statusUpdate:
        "Status Update - Sept16 we are largely on trach as we completed Q1...",
    },
    {
      projectname: "Improve sales experience",
      status: "On Track",
      style: "w-[15%] m-5",
      taskprogress: "74%",
      date: "Jan 1-Sep-14",
      priority: "High",
      type: "Sales",
      prioritybtnStyle:"flex justify-center rounded-full w-[6%] h-6 m-5 bg-[red]",
      statusUpdate:
        "Status Update - Sept16 we are largely on trach as we completed Q1...",
    },
    {
      projectname: "Launch experiment",
      status: "At Risk",
      style: "w-[15%] m-5",
      taskprogress: "35%",
      date: "Jan 1-Sep-30",
      priority: "Low",
      type: "Marketing",
      prioritybtnStyle:"flex justify-center rounded-full w-[6%] h-6 m-5 bg-[#fbbf24]",
      statusUpdate:
        "Status Update - Sept16 we are largely on trach as we completed Q1...",
    },
  ];

  return (
    <>
      <div className="bg-[#e5e7eb] h-[100%] w-full flex-col">
        <div className="h-[10%] flex items-center ml-10">
          <p className="text-[20px] text-black">My Projects</p>
        </div>
        <div className="flex w-full justify-center">
          <div className="w-[94%]  bg-white rounded ">
            <div className="flex m-6 bg-[#e5e7eb] h-14 rounded items-center">
              {ProjectDetails.map((tableData) => {
                return (
                  <>
                    <div className={tableData.style}>
                      <p>{tableData.title}</p>
                    </div>
                  </>
                );
              })}
            </div>
           
            {tableValues.map((data) => {
              return (
                <>
                  <div className="flex m-6">
                    <div className={data.style}>
                      <h1>{data.projectname}</h1>
                      <p>{data.type}</p>
                    </div>
                    <div className={data.style}>
                      <h1>{data.status}</h1>
                      <p>{data.statusUpdate}</p>
                    </div>
                    <div className={data.style}>
                      <h1>{data.taskprogress}</h1>
                    </div>
                    <div className={data.style}>
                      <h1>{data.date}</h1>
                    </div>
                    <div className={data.prioritybtnStyle}>
                      <h1 className="text-white">{data.priority}</h1>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProjects;
