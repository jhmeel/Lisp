import React from 'react'
import MetaData from '../../../components/Layouts/metaData'
import './style.css'
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, loginUser } from '../../../../actions/userActions'
import { LOGIN_SUCCESS } from '../../../../constants/userConstants';

const Login = () => {

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, isAuthenticated,user, error } = useSelector((state) => state.user);

  const [loginInfo,setLoginInfo]= useState({
    email:"",
    password:"",
  })
   const {email,password} = loginInfo
  const handleLogin = (e) => {
      e.preventDefault();
      dispatch(loginUser(loginInfo));
  }
  const handleDataChange = (e) => {
    
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  }


  useEffect(() => {
      if (error) {
          enqueueSnackbar(error, { variant: "error" });
          dispatch(clearErrors());
      }
      if (isAuthenticated) {
          navigate(`/profile/${user.username}`)
      }
  }, [dispatch, error, isAuthenticated, navigate, enqueueSnackbar]);

  return (
    <>
    <MetaData title="Login | lISP" />
    <div className="form-container">

      <div className="login-column">
        <h2>Login</h2>
          <form onSubmit={handleLogin} encType="multipart/form-data">
            <div className="input-container">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                autoFocus
                placeholder=''
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
            placeholder=""
            onChange={handleDataChange}
            required
          />
        </div>
        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
          
            </form>
            <Link to="/signup" className="redirect">New to LISP? Create an account</Link>
            </div>
            </div>
    </>
  
  )
}

export default Login