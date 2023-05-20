import React from 'react'
import Signup from './pages/Auth/Signup/Signup'
import Login from  './pages/Auth/Login/Login'
import Header from './components/Layouts/Header/Header'
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home/Home';
import NotFound from './pages/Notfound/Notfound'
import { useState,useEffect,lazy,Suspense, } from 'react';
import ForgotPassword from './pages/Auth/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword/ResetPassword';
import PrivateRoute from './utils/privateRoute';
import Profile from  './pages/Profile/Profile'
import Editor from  './pages/Editor/Editor'
import EditProfile from  './pages/EditProfile/EditProfile'

const App = () => {
const {pathname} = useLocation()
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }, [pathname])
  return (
    <>
    <Header />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
           <Route path="/profile/:username" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
           }/>
            <Route path="/article/new" element={
            <PrivateRoute>
              <Editor />
            </PrivateRoute>
           }/>
            <Route path="/editProfile" element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
           }/>



        <Route path="*" element={<NotFound />}></Route>

        </Routes>
    </>
  
  )
}

export default App




