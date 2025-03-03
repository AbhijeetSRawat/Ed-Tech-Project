import React from 'react'
import { Link } from 'react-router-dom'
import { GoArrowRight } from "react-icons/go";

export default function Buttons({text1,text2,active1,active2,link1,link2}) {
  return (
    <div>
        <div className='flex gap-6'>
            <div className={` flex justify-center items-center  shadow-sm shadow-white  lg:text-[18px]   rounded-lg w-auto min-w-[150px] h-[48px] lg:w-[200px] ${(active1)?`bg-[#FFD60A] text-black`:`bg-[#161D29] text-pure-greys-300`}`}>
                <Link className='flex items-center gap-1' to={link1} >{text1} <GoArrowRight />
                </Link>
            </div>

            <div className={` flex justify-center items-center  shadow-sm shadow-white  lg:text-[18px]  rounded-lg w-[135px] h-[48px] ${(active2)?`bg-[#FFD60A] text-black`:`bg-[#161D29] text-pure-greys-300`}`}>
                <Link to={link2} >{text2}</Link>
            </div>
        </div>
    </div>
  )
}
