import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import HighlightedText from '../components/core/homepage/HighlightedText';
import Buttons from '../components/core/homepage/Buttons';

export default function Homepage() {
  return (
    <div className="bg-[#000814] h-[100vh] flex flex-col items-center">
        {/* section-1 */}
        <div className='flex flex-col items-center lg:mt-6'>

            {/* button */}

            <div className='text-[#999DAA] flex items-center justify-center rounded-full w-[80vw] h-[7vh] lg:w-[17vw] lg:h-[6vh] bg-[#161D29] mt-5 shadow shadow-richblack-400'>
                <Link to="/signUp" className='h-[100] w-[100] text-lg flex flex-row items-center  justify-center  '>
                    <div className='mr-2 lg:pb-1 '>
                        Become an Instructor 
                    </div>
                    
                    <FaArrowRight size="12px"/>
                </Link>
            </div>

            {/* heading */}

            <div className='text-4xl font-medium lg:font-semibold mt-10 w-[97vw] lg:w-auto'>
                <span className='text-[#F1F2FF]'>
                    Empower Your Future with 
                </span>
                <HighlightedText text="Coding Skills"/>
            </div>

            {/* content para */}

            <div className='text-[#999DAA] w-[97vw] mt-4 lg:w-[60vw] lg:text-lg lg:text-center'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
            </div>

            {/* buttons */}

            <div className='mt-10'>
                <Buttons active1={true} active2={false} text1="Learn More" text2="Book a Demo"/>
            </div>


        </div>
    </div>
  )
}
