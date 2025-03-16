import React from 'react'
import CTAButton from './CTAButton'
import HighlightText from './HighlightText';
import { FaArrowCircleRight } from "react-icons/fa";
import {TypeAnimation} from "react-type-animation"


const CodeBlocks = ({
    position , heading , subHeading , ctaBtn1 , ctaBtn2 , codeblock , backgroundgradient , codeColor
}) => {
  return (
    <div className={`flex ${position} my-20 justify-between gap-20`}>
        {/* Section 1 */}
        <div className='w-[40%] flex flex-col gap-8'>
            {heading}
            <div className='text-richblack-200 font-bold'>
                {subHeading}
            </div>

            <div className='flex gap-10 mt-7'>
                <CTAButton active={ctaBtn1.active} linkto={ctaBtn1.linkto}>
                    <div className='flex gap-2 items-center'>
                        {ctaBtn1.btnText}
                        <FaArrowCircleRight/>
                    </div>
                </CTAButton>
                <CTAButton active={ctaBtn2.active} linkto={ctaBtn2.linkto}>
                        {ctaBtn2.btnText}
                </CTAButton>
            </div>
        </div>

        {/* Section 2 */}
        <div className='w-[50%]'>
        <div className='relative flex flex-row text-sm h-fit w-[100%] lg:w-500px p-4 bg-richblack-800 shadow-lg '>
            
            <div className='absolute top-10 left-30 z-10'>
                <div 
                    className=' rounded-full bg-gradient-to-br from-violet-800 to-blue-600'
                    style={{
                        boxShadow: `10px 10px 120px 120px rgba(104, 58, 183, 0.3)`
                    }}
                ></div>
            </div>
            
            <div className='flex flex-col text-center w-[10%] text-richblack-200 font-inter font-bold'>
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
                <p>12</p>
            </div>

            <div className={`flex flex-col w-[90%] gap-2 font-mono ${codeColor} pr-2 `}>
                <TypeAnimation
                
                sequence={[codeblock , 10000 , ""]}
                repeat={Infinity}
                cursor={true}
                style={
                    {
                        whiteSpace:"pre-line",
                        display:"block"
                    }
                }
                omitDeletionAnimation={true}
                />
            </div>
        </div>
        </div>
      
    </div>
  )
}

export default CodeBlocks
