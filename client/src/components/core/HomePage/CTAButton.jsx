import React from 'react'
import { Link } from 'react-router-dom'

const CTAButton = ({children, active , linkto}) => {
  return (
    <Link to={linkto}>
        <div className={`text-center text-[13px] px-6 py-3 rounded-md font-bold
            ${active ? 'bg-yellow-400 text-black':'bg-richblack-700 text-white'}
            hover:scale-95 transition-all duration-200`}>
            {children}
        </div>
    </Link>
  )
}

export default CTAButton
