import React from 'react'

export default function Buttons({text1,text2,active1,active2}) {
  return (
    <div>
        <div className='flex gap-6'>
            <div className={` flex justify-center items-center shadow shadow-sm shadow-white  lg:text-[18px]   rounded-lg w-[135px] h-[48px] ${(active1)?`bg-[#FFD60A] text-black`:`bg-[#161D29] text-pure-greys-300`}`}>
                {text1}
            </div>

            <div className={` flex justify-center items-center shadow shadow-sm shadow-white  lg:text-[18px]  rounded-lg w-[135px] h-[48px] ${(active2)?`bg-[#FFD60A] text-black`:`bg-[#161D29] text-pure-greys-300`}`}>
                {text2}
            </div>
        </div>
    </div>
  )
}
