import React, { useState } from 'react'
import { Dialog } from '@mui/material'
import PropTypes from 'prop-types'
import Image from "next/image";
import MyInput from '../my-input/myInput';

const SwotAddListPopUp = (props) => {
  const [fullWidth] = useState(false)
  const [maxWidth] = useState('md')
  const [swotTitle,setSwotTitle] = useState()
  const [inputValue, setInputValue] = useState()
  const addSwotTitle = () => {
    props.title(swotTitle,false)
  }
  const closeAddSwot = () => {
    props.action(false)
  }
  const closePop = () => {
    props.action(false)
  }
  const handleHeading = (event) => {
    const { name, value } = event.target;
    setInputValue(value)
    const obj = {
        swotName: name,
        swotValue: value
    }
    setSwotTitle(obj)
  }

  return (
    <>
 <div className='bg-[#000000] h-screen flex justify-around items-center z-50 absolute inset-0 bg-opacity-[0.5]'> 
 <div
          className='mx-auto md:w-[40%] 2xl:w-[25%] lg:w-[30%] w-[84%] border-2 rounded-lg bg-white'
        >
          <div className='flex items-center p-6 w-[96%]'>
            <h1 style={{ fontFamily: 'sfpro-bold', fontSize: '113%' }} className='mx-auto'>
              Create New List
            </h1>
            <Image width="23px" height="15px"
              src="/icons/crossblue.svg"
              onClick={closePop}
              className='hover:cursor-pointer'
            />
          </div>
          <div className='pb-2 flex justify-evenly'>
            {/* <h1 style={{ width: '55%', fontFamily: 'sfpro-medium' }} className=' p-3 text-center'>
              Do you want to add this as new SWOT list
            </h1> */}
            <MyInput
            type="text"
            name="swotTitle"
            placeholder="Enter New List Name"
            value={inputValue}
            onChange={handleHeading}
            className="h-[39px] text-sm outline-none rounded-md w-[55%] border border-[#00000033] pl-3 font-[sfpro-medium]"
          />
          </div>
          <div style={{ width: '72%' }} className='flex justify-between mx-auto p-4 pb-6'>
            <button
              style={{ width: '47%', fontFamily: 'sfpro-medium' }}
              className='bg-[#00000099]/50 text-white h-11 rounded-lg border-2 border-[#DBDBDB6E]'
              onClick={closeAddSwot}
            >
              Cancel
            </button>
            <button
              id='saveYes'
              disabled={inputValue? false : true}
              className={`rounded-lg bg-color4 w-[47%] font-[sfpro-medium] bg-[#35BC2C]/90 text-white ${inputValue? null : 'cursor-not-allowed opacity-30'}`}
              onClick={addSwotTitle}
            >
              Create
            </button>
          </div>
        </div>
 </div>
       
     
    </>
  )
}
export default SwotAddListPopUp
