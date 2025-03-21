import React from 'react'

const HighlightText = ({text}) => {
  return (
    <span className='font-bold bg-gradient-to-r from-blue-600 to-indigo-400 text-transparent bg-clip-text'>
        {" "}
        {text}
        {" "}
    </span>
  )
}

export default HighlightText
