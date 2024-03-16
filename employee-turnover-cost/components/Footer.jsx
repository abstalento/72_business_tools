import React from 'react'

const Footer = () => {
  const date = new Date().getFullYear();

  return (
    
    <div className='bg-[#B31bA6] text-white absolute left-0 bottom-0 flex fixed justify-center w-full py-2.5'><p>&copy; {date}, Alpha Business Solutions Pvt. Ltd. All Rights Reserved.</p></div>
  )
}

export default Footer