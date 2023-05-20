import React from 'react'
import { homeFill,saveIconFill,messageFill, postsIconFill, switchAccountIcon,postUploadOutline, searchIcon,profileIcon,hamburger,downwardarr,forwardArr} from '../../../assets/svgIcons'
import logo from "/src/assets/logo/lisp.png"
import './style.css'
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, redirect, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, logoutUser } from '../../../../actions/userActions'

const Header = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, isAuthenticated,user, error } = useSelector((state) => state.user);
  const [isOpened,setIsopened] = useState(false)
  const [isNavOpened,setIsNavopened] = useState(false)

  const toggleTab = ()=>{
    setIsopened(!isOpened)

  }
  const toggleNav = ()=>{
    setIsNavopened(!isNavOpened)
  }
const navigateToProfile = ()=>{
  navigate(`/profile/${user.username}`)
  toggleTab()
}
  const logout = ()=>{
    dispatch(logoutUser())
    toggleTab()
    navigate("/")
  }
  return (
    <>
    <header>
        <div className="logo-holder">
        <Link to="/"><img className="logo" src={logo} alt="Logo"/></Link>
        </div>
<div className="hetero">
<div className="search">
          <input className="search-bar" placeholder="Search..." type="text" /><span className="search-icon">{searchIcon}</span>
         
        </div>
       <div class="user-tab">
      <span onClick={toggleTab} className="profile-icon">{profileIcon}</span> 
      <span className="d-arr" onClick={toggleTab}>{!isOpened && downwardarr || forwardArr}</span>
</div> 

{isOpened &&  
 <div className="tab-info">
  {isAuthenticated ? <div className="user-info">
    <span className="usr-img" onClick={navigateToProfile}> <img src="" alt="my-pic"/></span>
   
    <span onClick={navigateToProfile}className="usr-name">{user.username}</span>
    <button onClick={logout} className="log-out">Logout</button>
  </div>  :
  <div className="btns"> 
 <Link to="signup"><button onClick={toggleTab} className="s-up">Signup</button></Link>
  <Link to="login"><button onClick={toggleTab}>Login</button></Link>
  </div>}
</div> }
</div>
  

       <div onClick={toggleNav} className="hamburger">{hamburger}</div>
       {isNavOpened &&  <div className='navigator'>
         <span className='logo-holder'>
         <Link to="/"><img onClick={toggleNav} className="logo" src={logo} alt="Logo"/></Link>
         </span>
         <div className="search">
          <input className="search-bar" placeholder="Search..." type="text" /><span className="search-icon">{searchIcon}</span>
         
        </div>
         <ul id="h-ul">
          <Link to='/'><li id="home" onClick={toggleNav}>{homeFill}  Home</li></Link> 
          <Link to=""> <li id="prof"onClick={toggleNav}>{profileIcon} Profile</li></Link>
          <Link to="/article/new"><li id='n-art'onClick={toggleNav}>{postUploadOutline}  New Article</li></Link>
           <Link to="/savedArticles"><li id="b-art"onClick={toggleNav}>{saveIconFill} Bookmarked Articles</li></Link>

           <Link to="/help"><li id='help'onClick={toggleNav}>{messageFill} Help?</li></Link>

           <Link to="/Adverts"><li id="adds"onClick={toggleNav}>{postsIconFill} Advertize with us</li></Link>
           <Link to="/login"><li id="switch-acct"onClick={toggleNav}>{switchAccountIcon}  Switch Account</li></Link>

         </ul>
       </div> }
      

    </header>
    </>
  )
}

export default Header