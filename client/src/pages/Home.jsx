import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowCircleRight } from "react-icons/fa";
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from './../components/core/HomePage/CTAButton';
import Banner from '../assets/Images/banner.mp4';
import CodeBlocks from './../components/core/HomePage/CodeBlocks';


const Home = () => {
  return (
    <div className='relative mx-auto flex flex-col w-11/12 
    items-center text-white justify-center max-w-maxContent '>
      {/* Section 1 */}
        <div>
            <Link to={"/signup"}>
                <div className='group mt-16 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
                transition duration-200 hover:scale-95 w-fit'>
                    <div className='group-hover:bg-richblack-900 flex flex-row items-center gap-2 px-10 py-[5px] rounded-full '>
                        <p>Become an instructor</p>
                        <FaArrowCircleRight />
                    </div>
                </div>
            </Link>

            <div className='text-center font-semibold text-4xl mt-10'>
                Empower Your Future With 
                <HighlightText text={"Coding Skills"}/>
            </div>

            <div className='w-[90%] mx-auto text-center text-lg text-richblack-200 font-bold mt-5'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on experience, quizes and personalized feedback from instructor.
            </div>

            <div className='flex flex-row gap-5 mt-10 items-center justify-center'>
                <CTAButton active={true} linkto={"/signup"} >
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkto={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>

            <div className=' mx-5 my-13 shadow-[-5px_-10px_30px_rgba(8,_112,_184,_0.7)] '> 
                <video muted autoPlay loop className='shadow-[10px_10px_0px_0px_#fff]'>
                    <source src={Banner} type='video/mp4' />
                </video>
            </div>

            {/* Code Section 1 */}
            <CodeBlocks
                position={"lg:flex-row"}
                heading={
                    <div className='text-4xl font-bold'>
                        Unlock Your
                        <HighlightText text={"Coding skills"}/>
                        With our online courses
                    </div>
                }
                subHeading={
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you. "
                }
                ctaBtn1={
                    {
                        btnText:"Try it yourself",
                        linkto:"/signup",
                        active:true
                    }
                }
                ctaBtn2={
                    {
                        btnText:"Learn more",
                        linkto:"/login",
                        active:false
                    }
                }
                codeblock={
                    `<!doctype html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8" />
                        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
                        <title>Vite + React</title>
                    </head>
                    <body>
                        <div id="root"></div>
                        <script type="module" src="/src/main.jsx"></script>
                    </body>
                    </html>`
                }
                codeColor={"text-yellow-50"}
            />
            {/* Code Section 2 */}
            <CodeBlocks
                position={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl font-bold'>
                        Unlock Your
                        <HighlightText text={"Coding skills"}/>
                        With our online courses
                    </div>
                }
                subHeading={
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you. "
                }
                ctaBtn1={
                    {
                        btnText:"Try it yourself",
                        linkto:"/signup",
                        active:true
                    }
                }
                ctaBtn2={
                    {
                        btnText:"Learn more",
                        linkto:"/login",
                        active:false
                    }
                }
                codeblock={
                    `<!doctype html>
                    <html lang="en">
                    <head>
                        <meta charset="UTF-8" />
                        <link rel="icon" type="image/svg+xml" href="/vite.svg" />
                        <title>Vite + React</title>
                    </head>
                    <body>
                        <div id="root"></div>
                        <script type="module" src="/src/main.jsx"></script>
                    </body>
                    </html>`
                }
                codeColor={"text-pink-200"}
            />
            


        </div>

      {/* Section 2 */}

      <div className='bg-gray-50 text-richblack-800 w-screen'> 
        <div className='homepage_bg h-[333px]'>
            <div className='w-11/12 max-w-maxContent flex flex-col justify-between items-center gap-5 mx-auto'>
                <div className='h-[150px]'></div>
                <div className='flex flex-row gap-7 text-white'>
                    <CTAButton 
                        active={true}
                        linkto={"/signup"}
                    >
                        <div className='flex flex-row items-center gap-2'>
                            Explore full catalog
                            <FaArrowCircleRight/>
                        </div>
                    </CTAButton>
                    <CTAButton 
                        active={false}
                        linkto={"/signup"}
                    >
                        Learn More
                    </CTAButton>
                </div>
            </div>

        </div>

      </div>
      
      
      {/* Section 3 */}
      
      
      {/* Footer */}
    </div>
  )
}

export default Home
