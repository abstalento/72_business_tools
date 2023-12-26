import { Dialog } from "@mui/material";
import Image from "next/image";
import PouchDB from "pouchdb";
const DeleteAllTask = ({ open, close,sendUseEffectCall}) => {

  const deleteAllTask = () => {
    var db = new PouchDB("Pomodoro");
    db.get("Pomodoro", function (err, doc) {
       return db.remove(doc); 

    });
    close()
    sendUseEffectCall(true)
  };
  return (
    open && (
      <div className="bg-[#080808]   h-[115vh]  flex justify-around items-center z-50 absolute inset-0 bg-opacity-[0.8]">
      <div className="bg-white flex justify-around items-center lg:w-[30%] w-[80%] xl:w-[20%] md:w-[20%] h-[25vh] rounded-md">
          <div className=" h-[75%] w-[88%] flex flex-col">
                          <div className="flex justify-end h-[20px] w-full">
                              <Image
                                  width="20px"
                                  height="25px"
                                  src="/icons/Close-button.svg"
                                  className="hover:cursor-pointer"
                                  onClick={close}
                                  />
                          </div>
                          <div className="flex-col justify-around items-center text-center">
                              <h2 className="font-semibold"> Do you want do delete all task?</h2>
                              <p className="text-[9px] mt-3"><sup>*</sup>Once deleted you can't retrieve back</p>
                          </div>
                          <div className="flex justify-center items-center mt-5">
                              <button className="bg-[#BC0101] cursor-pointer text-white rounded w-[150px] h-[30px]  font-[sfpro] text-[14px]"   onClick={deleteAllTask}>Delete</button>
                          </div>
  
          </div>
      </div>
      </div>
    )
   
    // <Dialog
    //   open={open}
    //   PaperProps={{
    //     style: {
    //       width: "25%",
    //       height: "20vh",
    //       margin: 0,
    //       borderRadius: "20px",
    //     },
    //   }}
    //   close={close}
    // >
    //   <div className="p-4">
    //     <p className="font-[Sf-pro-semibold]">
    //       Do you want do delete all task?
    //     </p>
    //     {/* <div className="w-full flex justify-center"> */}
    //     <div className="w-[60%] h-[10vh] flex justify-between items-center">
    //       <button
    //         className="w-[100px] h-[30px] bg-red-600 rounded-2xl text-white"
    //         onClick={deleteAllTask}
    //       >
    //         Delete All
    //       </button>
    //       <button className="font-[sf-pro-medium]" onClick={close}>
    //         Cancel
    //       </button>
    //     </div>
    //     {/* </div> */}
    //   </div>
    // </Dialog>
  );
};

export default DeleteAllTask;
