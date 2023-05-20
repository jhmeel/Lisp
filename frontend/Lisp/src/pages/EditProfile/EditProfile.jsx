import React from 'react'
import MetaData from '../../components/Layouts/metaData'
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, redirect } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updateProfile,loadUser } from '../../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../../constants/userConstants';
import './style.css'

const EditProfile = () => {
    
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.user);
  const {  error, isUpdated, loading} = useSelector((state) => state.profile);

  const [updatedInfo,setUpdatedInfo]= useState({
    username:"",
    phonenumber:"",
    email:"",
    password:"",
    bio:"",
  })
    const [avatarPreview, setAvatarPreview] = useState();

   const {username,phonenumber,email,password,bio} = updatedInfo
   const [avatar,setAvatar] = useState('')

  
  const handleUpdate = (e) => {
      e.preventDefault();
      // const userCheck = /^[a-z0-9_.-]{6,25}$/igm;

      // if (!userCheck.test(username)) {
      //  enqueueSnackbar("invalid username", { variant: "error" });
      //     return;
      // }
   
      dispatch(updateProfile(updatedInfo));
  }
  const handleDataChange = (e) => {
    if (e.target.name === 'avatar') {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
            }
        };

        reader.readAsDataURL(e.target.files[0]);
         console.log(e.target.files[0])
         setAvatar(e.target.files[0])
    }
    
    setUpdatedInfo({ ...updatedInfo, avatar, [e.target.name]: e.target.value });
    
   
  }


  useEffect(() => {
      if (error) {
          enqueueSnackbar(error, { variant: "error" });
          dispatch(clearErrors());
      }
      if (isUpdated) {
        enqueueSnackbar("user updated!!", { variant: "success" });
        dispatch(loadUser());
        navigate(`/profile/${username}`);

        dispatch({ type: UPDATE_PROFILE_RESET });
    }
}, [dispatch, user, error, isUpdated]);
  return (
   <>
        <MetaData title="Edit-Profile | lISP" />
     <div className="form-container">

      <div className="login-column">
        <h2>Update Profile</h2>
          <form onSubmit={handleUpdate} encType="multipart/form-data">
          <div className="input-container">
          <label htmlFor="Username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            placeholder={user.username}
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
                autoFocus
                placeholder={user.email}
                onChange={handleDataChange}
                required
                
              />
            </div>
            <div className="input-container">
          <label htmlFor="phonenumber">Phonenumber:</label>
          <input
            type="number"
            id="phonenumber"
            name="phonenumber"
            value={phonenumber}
            placeholder={user.phonenumber}
            onChange={handleDataChange}
            required
          />
        </div>
        <div className="input-container">
          <label htmlFor="bio">Bio:</label>
          <input
            type="text"
            id="bio"
            name="bio"
            value={bio}
            placeholder={user.bio}
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
        <img
           alt="Avatar Preview"
            src={avatarPreview}
             width={48}
             height={48}
/>
        <div className="input-container">
          <label htmlFor="avatar">Avatar:</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleDataChange}
          />
        </div>
        
        <button type="submit" className="update-button" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </button>
          
            </form>
           
            </div>
            </div>
    </>
  

    
  )
}


export default EditProfile


