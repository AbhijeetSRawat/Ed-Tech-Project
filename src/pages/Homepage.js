import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa6";
import HighlightedText from '../components/core/homepage/HighlightedText';
import Buttons from '../components/core/homepage/Buttons';
import Banner from '../assets/Images/banner.mp4'
import AnimatedTextComponent from '../components/core/homepage/AnimatedTextComponent';
import Logo1 from '../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../assets/TimeLineLogo/Logo4.svg'
import TimeLineImage from '../assets/Images/TimelineImage.png'
import KnowYourProgress from '../assets/Images/Know_your_progress.png'
import CompareWithOthers from '../assets/Images/Compare_with_others.png'
import PlanYourLessons from '../assets/Images/Plan_your_lessons.png'
import Instructor from '../assets/Images/Instructor.png'

export default function Homepage() {
  return (
    <div className="bg-[#000814]  flex flex-col items-center overflow-x-hidden">
        {/* section-1 */}
        <div className='flex flex-col items-center lg:mt-6 relative'>

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
                <Buttons active1={true} active2={false} text1="Learn More" text2="Book a Demo" link1="/contactUs" link2="/signUp" />
            </div>

            {/* video */}
            
            <video autoPlay loop muted className=' z-[100] w-[92vw] mt-10 mb-10 lg:h-[515px] lg:w-[1035px] lg:mb-20 '>
                <source src={Banner} type="video/mp4" />
            </video>

            <div className='w-[92vw] h-[26vh] bg-white absolute top-[460px] left-[24px] lg:h-[515px] lg:w-[920px] lg:left-[72px] lg:top-[355px]'></div>

            <div>
                <AnimatedTextComponent heading1="Unlock Your" heading2="with our online courses." link1="/login" link2="/contactUs" highlightedText="coding potential" para="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you." button1={`Try it Yourself`} flex_direction={`flex-row`} button2="Learn More" animatedtext={`<!DOCTYPE html> \n <html> \n <head> \n <title>Example</title> \n <linkrel="stylesheet"href="styles.css"> \n </head> \n </body> \n <h1><ahref="/">Header</a> \n </h1> \n <nav><ahref="one/">One</a> \n <ahref="two/">Two</a> \n <ahref="three/">Three</a> \n </nav> `}/>
            </div>

            <div>
            <AnimatedTextComponent heading1="Start" heading2="" link1="/login" link2="/contactUs" highlightedText="coding in seconds" para="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson." button1={`Continue Lesson`} flex_direction={`flex-row-reverse`} button2="Learn More" animatedtext={`<!DOCTYPE html> \n <html> \n <head> \n <title>Example</title> \n <linkrel="stylesheet"href="styles.css"> \n </head> \n </body> \n <h1><ahref="/">Header</a> \n </h1> \n <nav><ahref="one/">One</a> \n <ahref="two/">Two</a> \n <ahref="three/">Three</a> \n </nav> `}/>
            </div>
        </div>

        {/* section 3 */}

        <div className='bg-[#F9F9F9] relative w-full flex flex-col items-center lg:w-[full] lg:h-[921px] py-[90px] '>
            <div className=' w-full p-3 flex flex-col lg:flex-row lg:w-[1200px] lg:h-[144px] lg:w-[1200px]'>
                <div className='text-4xl font-semibold mb-4'>
                    Get the skills you need for a <HighlightedText text="job that is in demand." />
                </div>
                
                <div className='flex flex-col justify-between'>
                <p className='text-[#2C333F] font-semibold mb-3'>
                The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                </p>

                <div className='w-[137px] h-[48px] flex justify-center items-center rounded-lg bg-yellow-50'>Learn More</div>
                </div>
                
            </div>

            <div className='mt-4 lg:flex lg:justify-between lg:w-[1200px]'>
                <div className='flex flex-col justify-evenly lg:pt-16 gap-5 lg:h-[545px]'>
                    <div className='m-3 z-[1] flex gap-5'>
                        <div className='bg-[#FFFFFF] w-[50px] shadow-lg h-[50px] rounded-full flex justify-center items-center '>
                            <img src={Logo1} alt="Logo1" />
                        </div>
                        <div className='flex flex-col justify-center'>
                            <h2 className='text-xl font-semibold '>Leadership</h2>
                            <p className='text-sm'>Fully commited to the success company</p>
                        </div>
                    </div>
                    <div className='m-3 z-[1] flex gap-5'>
                        <div className='bg-[#FFFFFF] w-[50px] shadow-lg h-[50px] rounded-full flex justify-center items-center '>
                            <img src={Logo2} alt="Logo1" />
                        </div>
                        <div className='flex flex-col justify-center'>
                            <h2 className='text-xl font-semibold '>Responsibility</h2>
                            <p className='text-sm'>Students will always be our top priority</p>
                        </div>
                    </div>
                    <div className='m-3 z-[1] flex gap-5'>
                        <div className='bg-[#FFFFFF] w-[50px] shadow-lg h-[50px] rounded-full flex justify-center items-center '>
                            <img src={Logo3} alt="Logo1" />
                        </div>
                        <div className='flex flex-col justify-center'>
                            <h2 className='text-xl font-semibold '>Flexibility</h2>
                            <p className='text-sm'>The ability to switch is an important skills</p>
                        </div>
                    </div>
                    <div className='m-3 z-[1] flex gap-5'>
                        <div className='bg-[#FFFFFF] w-[50px] shadow-lg h-[50px] rounded-full flex justify-center items-center '>
                            <img src={Logo4} alt="Logo1" />
                        </div>
                        <div className='flex flex-col justify-center'>
                            <h2 className='text-xl font-semibold '>Solve the problem</h2>
                            <p className='text-sm'>Code your way to a solution</p>
                        </div>
                    </div>
                </div>
                <div className='m-3 my-8'>
                    <img className='rounded-xl shadow-lg lg:w-[714px] lg:h-[545px]' src={TimeLineImage} alt="" />
                </div>
            </div>

            <div className='border absolute top-[65vh]  left-[10vw] border-[#AFB2Bf] border-dotted w-[0px] h-[270px] lg:h-[370px] lg:top-[50vh] lg:left-[11.5vw]'></div>

            <div className='bg-[#014A32] w-[70vw] flex flex-col justify-center items-center gap-10 py-4 rounded-md shadow-2xl lg:flex-row lg:w-[30vw] lg:absolute lg:left-[50vw] lg:top-[103vh]'>
                <div className='flex flex-row gap-5 h-[10vh] gap-5 items-center lg:border lg:border-[#014A32] lg:border-r-[#05A77B] lg:pr-10'>
                    <div className='text-5xl font-bold text-white'>10</div>
                    <div className='flex flex-col text-[#05A77B]'>
                        <div>YEARS</div>
                        <div>EXPERIENCES</div>
                    </div>
                </div>
                <div className='flex flex-row gap-5 h-[10vh] gap-5 items-center'>
                    <div className='text-5xl font-bold text-white'>250</div>
                    <div className='flex flex-col text-[#05A77B]'>
                        <div>TYPES OF</div>
                        <div>COURSES</div>
                    </div>
                </div>
            </div>
        </div>

        {/* section 4 */}

        <div className='bg-[#F9F9F9] relative w-full  flex flex-col items-center lg:w-[full] h-[1350px] lg:h-[850px]  '>
            <div className='text-4xl font-bold mx-3 '>
            Your swiss knife for<HighlightedText text="learning any language "/>
            </div>

            <div>
                <p className='p-3'>
                Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                </p>
            </div>

            <div className='mt-6 p-3 gap-0 relative lg:w-[1103px]'>
                <img className='' src={KnowYourProgress} alt="KnowYourProgress" />
                <img className='absolute top-[41vh] lg:top-0 lg:left-[22vw]' src={CompareWithOthers} alt="KnowYourProgress" />
                <img className='absolute top-[86vh] lg:top-0 lg:left-[45vw]' src={PlanYourLessons} alt="KnowYourProgress" />

                <div className='font-bold rounded-lg shadow-lg ml-[25vw] z-[100] absolute top-[140vh] lg:top-[80vh] lg:left-[10vw] w-[130px] h-[45px] bg-yellow-50 flex justify-center items-center'> Learn More</div>

            </div>

        </div>
        
        {/* section 5 */}

        <div className='h-[929px] w-full lg:relative'>

            <div className='lg:flex lg:flex-row-reverse lg:justify-evenly lg:m-12 lg:gap-5'>
                <div className='lg:flex lg:flex-col lg:justify-center '>
                    <p className=' w-[full] px-3 mt-10 text-white text-4xl font-semibold'>
                        Become an
                        <HighlightedText text="instructor"/>
                    </p>
                    <p className='text-[#838894] px-3 mt-4 lg:w-[486px]'>
                    Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                    </p>
                </div>

                <img src={Instructor} alt="instructor" className='mt-4 px-3 rounded-md shadow-lg lg:z-[10]' />
                <div className='lg:w-[616px] lg:h-[545px] lg:bg-white lg:absolute lg:left-[8vw]'></div>

                <div className='bg-yellow-50 w-[212px] h-[50px] flex justify-center items-center gap-1 mt-10 ml-3 rounded-lg lg:absolute lg:top-[59vh] lg:left-[58vw]'><p className='font-bold'>Start Teaching Today</p> <FaArrowRight/></div>
            </div >
            
        </div>


        {/* footer */}

        <div>
            
        </div>
    </div>
  )
}
