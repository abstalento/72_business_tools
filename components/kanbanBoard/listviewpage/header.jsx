import React from "react";

const ListHeader=()=>{
    return(
        <div className=" bg-[#F4F5FA]">
         <div className="flex gap-x-14 bg-[#B9B9B9] p-3 " >
            <div className="">
               <select name="" id="" className=" outline-none p-1 rounded-md">
                  <option value="">This Month</option>
                  <option value="">Last Month</option>
               </select>
            </div>
            <div className="flex mt-1">
               <img src="../icons/check-circle.svg" alt="" className="w-4 mb-2.5" />

               <h2 className="ml-1">5 Projects Completed</h2>
            </div>
            <div className="flex mt-1">
            <img src="../icons/sandclock.svg" alt="" className="w-4 mb-2.5" />

               <h2 className="ml-1">2 Projects Pending</h2>
            </div>
            <div className="bg-[#FFFFFF] py-2 w-50 flex rounded-md  " >
               <img src="../icons/Search-Icon.svg" alt="" className="px-2 w-8" />
               <input type="search" placeholder="Search projects...." className="w-60 outline-none border-none bg-[#F4F5FA]]" name="search" onChange={(e) => setSearch(e.target.value.toLowerCase())} />
               <button type="submit" className="bg-[#3D5AFE] text-white rounded-md px-5">Search</button>
            </div>

            <div className="content-center bg-[#F4F5FA] px-2 flex justify-center  cursor-pointer rounded-md ">
               <div onClick={()=>setGrid(true)} className="flex justify-center">
                  <img src="../icons/Grid.svg" alt="" className="w-6" />
               </div>

               <div className="ml-1 flex justify-center" onClick={()=>setGrid(false)}  >
               <img src="../icons/List.svg" alt="" className="w-6" />
               </div>

            </div>
            <div>
               <img src="../icons/Buttons.svg" className="cursor-pointer" alt="" onClick={()=>setShowModal(true)} />
               {/* <button className="bg-[#3C59FB] mt-1 text-white py-1 px-5 rounded-md ml-5" onClick={()=>setShowModal(true)}>Create New Project +</button> */}
            </div>
         </div>
         <div>

         </div>
         {/* <div>
               <CreateModalPopup isVisible={showModal} onClose={()=>setShowModal(false)}/>
         </div> */}
         {/* {
            grid ? (<div>
          
               <PenProjects search={search} />
            </div>) : (<MyProjects/>)
         } */}
         
      </div>
    )
}
export default ListHeader;