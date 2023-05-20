import React from 'react'
import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";
import MetaData from '../../../components/Layouts/metaData';
import './style.css'
import logo from "/src/assets/logo/lisp.png"
import { postRequest } from '../../../utils/hook';
import SpinLoader from '../../../components/Spinloader/Spinloader';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, registerUser} from "../../../../actions/userActions"
import BackdropLoader from '../../../components/backdropLoader/BackdropLoader';
import './style.css'




const signup = () => {

   const dispatch = useDispatch();
   const navigate = useNavigate();
   const { enqueueSnackbar } = useSnackbar();
 
   const { loading, isAuthenticated, error } = useSelector((state) => state.user);
  
   const [user, setUser] = useState({
     username: "",
     email: "",
     phonenuber:"",
     password: "",
     cpassword: "",
   });
 
   const { username, email, phonenumber, password, cpassword } = user;
 
   const handleRegister = (e) => {
     e.preventDefault();
     if (password.length < 8) {
       enqueueSnackbar("Password length must be atleast 8 characters", { variant: "warning" });
       return;
     }
     if (password !== cpassword) {
       enqueueSnackbar("Password Doesn't Match", { variant: "error" });
       return;
     }
     if (!phonenumber) {
       enqueueSnackbar("input phonenumber", { variant: "error" });
       return;
     }
 
     dispatch(registerUser({username,email,phonenumber,password}));
   };
 
   const handleDataChange = (e) => {
    
       setUser({ ...user, [e.target.name]: e.target.value });
     }
  
 
    useEffect(() => {
     if (error) {
       enqueueSnackbar(error, { variant: "error" });
       dispatch(clearErrors());
     }
     if (isAuthenticated) {
       navigate("/");
     }
   }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);
 

  return (
    <>
    <MetaData title='Signup | LISP'/>
    <div className="form-container">
        <div className="form-sidebar">
          <div className='logo'>
          <img className="lisp" src={logo} alt="logo"/>
          </div>
         
          <h1>Looks like you're new here!</h1>
          <p>Sign up with your particulars to get started...</p>
        </div>  
        <div className="signup-column">
          <form onSubmit={handleRegister} encType="multipart/form-data">
            <h1>Signup For Lisp</h1>
            <div className="input-container">
              <label htmlFor="full-name">Full Name:</label>
              <input
                type="text"
                id="full-name"
                name="username"
                value={username}
                autoFocus
                onChange={handleDataChange}
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleDataChange}
                required
              />
            </div>
            <div className="input-container">
              <label htmlFor="Phonenumber">Phonenumber:</label>
              <input
                type="number"
                id="phonenumber"
                name="phonenumber"
                value={phonenumber}
                onChange={handleDataChange}
                required
              />
            </div>
            <div className="input-container">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleDataChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            id="confirm-password"
            name="cpassword"
            value={cpassword}
            onChange={handleDataChange}
            required
          />
        </div>
        <button type="submit" className="signup-button" disabled={loading}>
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
        
            </form>
            <div className="meta-signup">
            <Link to="/login" className="redirect">Already have an account? Login</Link>
            <Link to="/password/forgot" className="redirect"><span className="fpswd">Forgotten password?</span></Link>
            </div>
           
            </div>
  </div>
    </>
   
  )
}

export default signup