import React, { useState } from 'react';
import { useEffect } from 'react';
import Service from '../../services/cashbookledger/services';
import PouchDB from "pouchdb";
import { Modal } from '@mui/material';

export default function CreateLedger(props) {
  const [showModal, setShowModal] = React.useState(props.Popover);
  const [ledgerName, setLedgerName] = useState({
    label: "",
    value: "",
    description: ""
  })
  const [ledgerArray, setLedgerArray] = React.useState([]);
  const ledgerChange = (e) => {
    let { name, value } = e.target
    if(name == 'description'){
      setLedgerName({ ...ledgerName, [name]: value })
    }else{
      setLedgerName({ ...ledgerName, [name]: value, value: value })
    }
    
  }


  const handleSave = () => {
    props.onSave(ledgerName)
    setShowModal(!Modal)
  }
  const handleClose = () => {
    props.onClose()
  }
  // const onAddLedgerEntry = ()=>{
  //   console.log(ledgerArray,ledgerName,"LLLLLLLLLLLL");
  //   let array = [...ledgerArray]

  //  array.push(ledgerName)
  //   var db= new PouchDB("LedgerEntry")
  //   db.get("LedgerEntry",function(err,doc){
  //     if (err){
  //       var doc ={
  //         _id: "LedgerEntry",
  //         data:array,
  //       };
  //       db.put(doc);

  //     }
  //     db.put(
  //       {
  //         _id: doc._id,
  //         data: array,
  //         _rev: doc._rev,
  //       },
  //       function (err, response) {
  //         if (err) {
  //           return console.log(err, "err");
  //         } else {
  //           console.log(array, "ress");
  //         }
  //       }
  //     );
  //   })
  //   setShowModal(false)
  //    console.log(ledgerName)

  // }

  return (
    <>
      {showModal ? (
        <>
          <div className='md:hidden'>
            <div className='h-[100vh] flex justify-around items-center w-full bg-black bg-opacity-25 fixed top-0'>
              <div className='bg-white shadow-lg h-[45vh] rounded-[10px] w-[90%]'>
                <div className='flex flex-row justify-between items-center px-5 h-[7vh] w-full'>
                  <h1 className='text-lg font-semibold font-[sf-pro-medium]'>Create Ledger</h1>
                  <button type="button"
                    onClick={handleClose}
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg
                                 text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="staticModal">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"></path></svg>
                  </button>
                </div>
                <div className='px-5 h-[8vh] flex items-end w-full'>
                  <div className='flex flex-col border w-full rounded-lg p-2'>
                    <label className='text-xs text-[#707070] font-[sfpro-medium] text-opacity-100'>Ledger Name</label>
                    <input type="text" className='outline-none font-[sf-pro-regular] text-black text-sm' placeholder='Enter new ledger name' name='label'
                      value={ledgerName.label} onChange={(e) => ledgerChange(e)} />
                  </div>
                </div>
                <div className='px-5 h-[15vh] w-full'>
                  <div className='my-4 flex flex-col border rounded-lg p-2 h-28'>
                    <label className='text-xs text-[#707070] font-[sfpro-medium] text-opacity-100'>Descriptions</label>
                    <textarea className='resize-none outline-none font-[sf-pro-regular] text-[#232E38] text-sm' name='description' value={ledgerName.description}
                      onChange={(e) => ledgerChange(e)}
                      placeholder='Describe about the Ledger/Store the info about'>
                    </textarea>
                  </div>
                </div>
                <div className='h-[11vh] w-full'>
                  <div className="flex justify-evenly p-6  border-solid border-slate-200 rounded-b">
                    <button
                      className="bg-[#000000] text-white background-transparent font-[sf-semibold] text-opacity-100 
                       px-6 py-2 text-sm outline-none rounded-md focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={ledgerName.label == '' ? true : false}
                      className={`bg-[#076DF3] text-white active:bg-[#076DF3] font-[sf-semibold]  text-sm px-6 
                      py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${ledgerName.label === ""
                          ? "opacity-40"
                          : null
                        }`}
                      type="button"
                      onClick={() => handleSave()}
                    >Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='sm:hidden hidden md:block'>
            <div
              className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >
              <div className="relative w-auto my-6 mx-auto max-w-2xl">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg w-[480px] relative flex flex-col  bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-solid border-slate-200 rounded-t">
                    <h3 className="text-lg font-semibold font-[sf-pro-medium]">
                      Create Ledger
                    </h3>


                    <button type="button"
                      onClick={handleClose}
                      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg
                                 text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="staticModal">
                      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"></path></svg>
                    </button>
                  </div>

                  <div className="relative p-6 flex-auto">
                    <div className='flex flex-col border rounded-lg p-2'>
                      <label className='text-xs text-[#707070] font-[sfpro-medium] text-opacity-100'>Ledger Name</label>
                      <input type="text" className='outline-none font-[sf-pro-regular] text-black text-sm' placeholder='Enter new ledger name' name='label'
                        value={ledgerName.label} onChange={(e) => ledgerChange(e)} />
                    </div>
                    <div className='my-4 flex flex-col border rounded-lg p-2 h-28'>
                      <label className='text-xs text-[#707070] font-[sfpro-medium] text-opacity-100'>Descriptions</label>
                      <textarea className='resize-none outline-none font-[sf-pro-regular] text-[#232E38] text-sm' name='description' value={ledgerName.description}
                        onChange={(e) => ledgerChange(e)}
                        placeholder='Describe about the Ledger/Store the info about'>
                      </textarea>
                    </div>
                  </div>

                  <div className="flex justify-evenly p-6  border-solid border-slate-200 rounded-b">
                    <button
                      className="bg-[#000000] text-white background-transparent font-[sf-semibold] text-opacity-100 
                       px-6 py-2 text-sm outline-none rounded-md focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={handleClose}
                    >
                      Cancel
                    </button>
                    <button
                      disabled={ledgerName.label == '' ? true : false}
                      className={`bg-[#076DF3] text-white active:bg-[#076DF3] font-[sf-semibold]  text-sm px-6 
                      py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 ${ledgerName.label === ""
                          ? "opacity-40"
                          : null
                        }`}
                      type="button"
                      onClick={() => handleSave()}
                    >Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
        </>
      ) : null}
    </>
  );
}
