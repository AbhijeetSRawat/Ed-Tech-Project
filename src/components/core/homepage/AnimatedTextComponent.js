import React from 'react'
import HighlightedText from './HighlightedText'
import Buttons from './Buttons'
import { TypeAnimation } from 'react-type-animation'

export default function AnimatedTextComponent({heading1,heading2,link1,link2,highlightedText,para,button1,button2,animatedtext,flex_direction}) {
  return (
    <div className={`lg:flex ${flex_direction}  `}>
        <div className='lg:w-[486px] lg:ml-10 flex flex-col h-[350px] justify-between mb-5'>
            <div className='text-4xl m-2 font-medium lg:font-semibold mt-10 mb-4 w-[97vw] lg:w-auto'>
                <span className='text-[#F1F2FF] '>{heading1}</span>
                <HighlightedText text={highlightedText}/>
                <span className='text-[#F1F2FF]'>{heading2}</span>
            </div>
            <div className='m-2 text-[#999DAA] mb-8'>
                {para}
            </div>
            <div className='mb-5 flex justify-center lg:justify-start lg:ml-2'>
                <Buttons text1={button1} link1={link1} link2={link2} text2={button2} active1={true} active2={false}/>
            </div>
        </div>
        <div className='flex rounded-md border border-richblue-50 m-3 mb-10 lg:ml-10 p-3 h-[350px] lg:w-[470px]'>
            <div className='flex flex-col items-center w-[20px] text-white mr-2'>
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
                <p>13</p>
            </div>
            <TypeAnimation className='flex '
                sequence={[animatedtext,50,""]}
                repeat={Infinity}
                omitDeletionAnimation={true}
                cursor={false}
                style={
                            { 
                                whiteSpace: 'pre-line' ,
                                color:'yellow',
                                
                            }
                        }
            />
                
        </div>
    </div>
  )
}
