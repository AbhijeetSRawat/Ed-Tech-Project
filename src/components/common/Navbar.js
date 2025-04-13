import logo from "../../assets/Logo/Logo-Full-Light.png"
import { IoIosSearch } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { Link, matchPath, useLocation } from "react-router-dom";
import {NavbarLinks} from "../../data/navbar-links"
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/auth/ProfileDropDown";
import { useEffect, useState } from "react";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";


const Navbar = () => {

    const location =useLocation();

    const matchRoute = (route)=>{
        return matchPath({path:route},location.pathname);
    }

    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const {totalItems}=useSelector((state)=>state.cart);

    const [subLinks,setSubLinks] = useState([]);

    const fetchSubLinks = async()=>{
        try{
            const result = await apiConnector("GET",categories.CATEGORIES_API);
            console.log("Printing Sublinks Result : ",result);
            setSubLinks(result.data.allCategories);
            
        }
        catch(error){
            console.log("Could not fetch category list");
        }
    }


    useEffect(()=>{
        fetchSubLinks();
    },[]);

    return ( 
        <div>

            <div className=" bg-richblack-900 h-[60px] md:h-[56px] px-2 md:px-[120px]  w-[11/12] max-w-1240 border flex justify-between items-center border-b-richblack-300">
                

                {/* logo */}
                <Link to="/">
                    <img src={logo} alt="StudyNotion" className="w-40 h-8" />
                </Link>
                

                

                {/* list of links */}
                <div className=" hidden md:flex ">
                    <ul className="flex gap-3 cursor-pointer">
                            {
                                NavbarLinks.map((link,index)=>(
                                    <li key={index}>
                                        {
                                            (link.title === "Catalog")?(
                                            <div className="relative group">
                                                
                                                <div>
                                                    <div className="text-white"> Catalog
                                                    </div>
                                                </div>

                                                <div className="absolute w-[150px] opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                    transition-all duration-300 delay-200  text-richblack-600 z-[10000] top-10 flex flex-col  rounded-md p-3 bg-white ">
                                                {
                                                    (subLinks.length)?(
                                                    
                                                    <div className="flex flex-col gap-2 ">

                                                            {
                                                                subLinks.map((sublink,index)=>(
                                                                    
                                                                        <Link className=" bg-white  rounded-sm" to={`/catalog/${sublink.name}`}>
                                                                            {sublink.name}
                                                                        </Link>
                                                                    
                                                                ))
                                                            }

                                                    </div>
                                                    ):(
                                                    <div>No Courses Present</div>
                                                )
                                                }
                                            </div>

                                                <div className="absolute w-[25px] h-[25px] opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                    transition-all duration-300 delay-200  bg-white rotate-45 top-8 left-1 rounded-sm"></div>

                                            </div>
                                                ):(
                                                <Link to={link?.path}>
                                                    <p className={`${matchRoute(link?.path)?"text-yellow-25":"text-richblack-25"}`}>
                                                        {link.title}
                                                    </p>
                                                </Link>
                                            )
                                        }
                                    </li>
                                ))
                            }
                        
                            
                        </ul>
                </div>

                {/* cart and search icons */}
                <div className="flex mr-2">
                    {
                        user && user?.accountType!=="Instructor" && (
                            <div>
                                 <div>
                                        <IoIosSearch className="text-richblack-100" size="30px"/>   
                                    </div>
                                    
                                    <Link to="/dashboard/cart" className="relative">
                                        <IoCartOutline className="text-richblack-100" size="30px"/>
                    
                                        {
                                            totalItems > 0 && (
                                                <span>
                                                    {totalItems}
                                                </span>
                                            ) 
                                        }
                                    </Link>
                            </div>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/login">
                                <button className="text-richblack-50 border w-[60px] md:w-[80px] h-[40px] mr-3 bg-richblack-800 shadow-sm shadow-white border-richblack-500 rounded-md ">Log In</button>
                            </Link>
                        )
                    }
                    {
                        token === null && (
                            <Link to="/signup">
                                <button className="text-richblack-50 border w-[65px] md:w-[80px] h-[40px] bg-richblack-800 shadow-sm shadow-white border-richblack-500 rounded-md ">Sign Up</button>
                            </Link>
                        )
                    }
                    {
                        token && <ProfileDropDown/>
                    }
                </div>
            </div>

        </div>
     );
}
 
export default Navbar;