import express from 'express';
import { loginUser, signupUser, logoutUser,  followUser, updateProfile, updatePassword, forgotPassword, resetPassword, getUserDetails, getAccountDetails, getAllUsers, searchUsers, getUserDetailsById, deleteProfile  } from '../controller/User.js';
import { isAuthenticated } from '../middlewears/auth.js';
import upload from '../middlewears/upload.js';
const User = express();

User.route("/signup").post(signupUser);
User.route("/login").post(loginUser);
User.route("/logout").get(logoutUser);

User.route("/me")
    .get(isAuthenticated, getAccountDetails)
    .delete(isAuthenticated, deleteProfile);

User.route("/user/:username").get(isAuthenticated, getUserDetails);
User.route("/userdetails/:id").get(isAuthenticated, getUserDetailsById);

User.route("/users/suggested").get(isAuthenticated, getAllUsers);
User.route("/users").get(isAuthenticated, searchUsers);

User.route("/follow/:id").get(isAuthenticated, followUser);

User.route("/update/profile").put(isAuthenticated, upload.single('avatar'), updateProfile);
User.route("/update/password").put(isAuthenticated, updatePassword);

User.route('/password/forgot').post(forgotPassword);
User.route('/password/reset/:token').put(resetPassword);

export default User