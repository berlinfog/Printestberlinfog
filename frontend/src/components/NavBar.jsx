import React,{useState,useEffect,useRef} from 'react'
import {Link,NavLink,useNavigate} from "react-router-dom";
import {
  BiSearchAlt,
  BiPlus,
  BiChevronRight,
  BiChevronLeft,
} from "react-icons/bi"
import {RiHome7Fill} from "react-icons/ri"
import Pin from "../container/Pin"
import logo from "../assets/instagram.png"
import { categories } from '../utils/data';

const isActiveStyles = 
  "flex items-center px-2 md:px-5 gap-2 md:gap3  font-extrabold transition-all duration-200 ease-in-out capitalize" 
const isNotActiveStyle ="flex items-center px-2 md:px-5 gap-2 md:gap3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize" 
const NavBar = ({searchTerm,setSearchTerm,user}) => {
  const navigate = useNavigate();
  // console.log(user);
  const [isScroll, setIsScroll] = useState(false);
  const scrollRefe = useRef();
  const scrollOnClick = (side)=>{
    setIsScroll(true);
    side === 'right' ? (scrollRefe.current.scrollLeft += 200) : (scrollRefe.current.scrollLeft -= 200);
    scrollRefe.current.scrollLeft < 199 ? setIsScroll(false):setIsScroll(true);
  };
  return (

    <div className='flex flex-col'>
      <div className='flex items-center w-full py-2'>
        {/*logo*/}
        <Link to="/">
          <img src={logo} alt="Logo" className='w-15 cursor-pointer'></img>
        </Link>
        {/* search box */}
        <div className='flex justify-between items-center w-full
         bg-white p-2 shadow-md rounded-lg mx-4'>
         <BiSearchAlt fontSize={30} className="text-gray-700"/>
        <input type="text" placeholder='Search' className='w-full outline-none 
        border-none px-3 text-gray-800 font-semibold text-base' 
        onFocus={()=>navigate("/search")}
        value={searchTerm}
        onChange={(e)=>setSearchTerm(e.target.value)}
         />
        </div>
        {/* big screen */}
        <div className="flex justify-center items-center">
          <Link to="create-pin">
            <button
            type="botton"
            className='w-36 min-w-36 p-2 text-base text-gray-700
            border border-gray-300 rounded-md hover:shadow-xl duration-150 ease-in-out md:flex hidden'>
            Submit a photo
            </button>
          {/* small screen */}
          <div className='bg-black w-10 h-10 rounded-md md:hidden flex items-center justify-center'>
            <BiPlus fontSize={24} className="text-white"/>
          </div>
          
          </Link> 
          {/* user profile */}
          
          <Link to={`user-profile/${user?._id}`} 
            className='flex items-center justify-center w-10 min-w-10 h-10 
          min-h-10 shadow-lg rounded-full bg-slate-500 ml-4'>
          <img
            src={user?.image}
            
            className="rounded-full" 
            alt=""/>
          </Link>

        </div>

        
      </div>
      {/* categories */}
      <div className='flex items-center w-full py-2'>
        <NavLink to="/" className={({isActive})=>isActive 
          ? isActiveStyles : isNotActiveStyle}>
          <RiHome7Fill fontSize={30} >

          </RiHome7Fill>
        </NavLink>
        <div className='h-6 w-[1px] bg-slate-500 '></div> 
        <div className='flex items-center w-full h-10 overflow-y-scroll hide_scrollbar relative'>
          {/* chervron left icon */}
          <div 
            className={`${isScroll ? "flex" : "flex"} absolute left-0 w-8 h-10 justify-start items-center bg-gradient-to-r from-gray-50 cursor-pointer `}
            onClick={() => scrollOnClick('left')}
            id="leftSide">
            <BiChevronLeft fontSize={30} ></BiChevronLeft>
          </div>
          {/* !load all category */}
          <div id="category"
            className='flex items-center w-full overflow-y-scroll hide_scrollbar 
            scroll-smooth duration-150 ease-in-out object-cover'
            ref={scrollRefe}>
            {categories.slice(0,categories.length).map((category)=>(
              <NavLink 
                to={`/category/${category.name}`}
                key={category.name}
                className={({isActive})=>isActive ? isActiveStyles : isNotActiveStyle}
              >
              {category.name}
              </NavLink>

            ))}
          </div>
          {/* right icon */}
          <div
            className='absolute right-0 w-8 h-10 md:flex hidden justify-end items-center bg-gradient-to-l from-gray-50 cursor-pointer'
            onClick={()=>scrollOnClick('right')}>
            <BiChevronRight fontSize={30}></BiChevronRight>
          </div>
        </div>
      </div>
    </div>
  )
 }

export default NavBar