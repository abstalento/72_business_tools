import React from 'react'
import PropTypes from 'prop-types'
const SideButton = (props) => {
  const { btnValue, downLoadClick, className } = props
  return (
    <div>

      <button
      onClick={downLoadClick}
        className={`w-[100%] ${className} font-[sfpro-Regular] text-[12px] h-[35px]`}
      >
        {btnValue}
      </button>
    </div>
  )
}
export default SideButton
