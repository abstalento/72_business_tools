import React from "react";

function Feedback() {
  return (
    <>
      <div className="bottom-0 fixed flex w-[100%] h-[8vh] bg-[rgb(0,0,0,0.8)] text-center justify-center items-center place-items-center ">
        <p className="m-2 p-1 text-white">
          Take a moment to share your experience on our website
        </p>
        <button
          className="ml-5 w-[130px] md:w-[12%] lg:w-[10%] bg-white font-medium h-[5vh] rounded-md cursor-not-allowed"
          disabled
        >
          FeedBack
        </button>
      </div>
    </>
  );
}

export default Feedback;
