import catchAsync from '../middlewears/catchAsync.js';
import sendCookie from '../utils/sendCookie.js';
import ErrorHandler from '../utils/errorHandler.js';
import logger from '../utils/logger.js'
import database from '../utils/connectDb.js'
import {  hashPassword,comparePassword } from '../utils/hash.js';

export const signupUser = catchAsync(async (req, res, next) => {


    const { email, username, password, phonenumber} = req.body;
    const user =  database.findOne({username,email});
  
    if (user) {
        if (user.username === username) {
            return next(new ErrorHandler("Username already exists", 401));
        }
        return next(new ErrorHandler("Email already exists", 401));
    }
    

    const newUser = {
        username,
        email,
        username,
        password:await hashPassword(password),
        phonenumber,
        createdAt:Date.now(),
        followers:[],
        following:[],
        posts:[],
        avatar:"",
        bio:"",
        type:'User',
    }
    database.insert(newUser,(err,data)=>console.log(err?err:data))
    database.save()
    logger.info('user created successfully')

    sendCookie(newUser, 201, res);
});

export const loginUser = catchAsync(async (req, res, next) => {

    const { email, password } = req.body;

    const user = database.findOne({email})
    

    if (!user) {
        return next(new ErrorHandler("User doesn't exist", 401));
    }

    const isPasswordMatched = comparePassword(password,user.password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Password doesn't match", 401));
    }

    sendCookie(user, 200, res);
});

export const logoutUser = catchAsync(async (req, res, next) => {
    res.cookie('auth', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});





// Get User Details --Logged In User
export const getAccountDetails = catchAsync(async (req, res, next) => {
    const user = database.findById(req.user._id)
    res.status(200).json({
        success:true,
        user,
    })
});

// Get User Details
export const getUserDetails = catchAsync(async (req, res, next) => {
    const user = database.findOne({username:req.params.username})
    res.status(200).json({
        success:true,
        user,
    })
});

// Get User Details By Id
export const getUserDetailsById = catchAsync(async (req, res, next) => {

    const user = database.findById(req.params.id)

    res.status(200).json({
        success: true,
        user,
    });
});

// Get All Users
export const getAllUsers = catchAsync(async (req, res, next) => {

    const users = database.find("User");

    const suggestedUsers = users.filter((u) => !u.followers.includes(req.user._id) && u._id.toString() !== req.user._id.toString()).slice(-5)

    res.status(200).json({
        success: true,
        users: suggestedUsers,
    });
});

// Update Password
export const updatePassword = catchAsync(async (req, res, next) => {

    const { oldPassword, newPassword } = req.body;

    const user = database.findById(req.user._id)

    const isPasswordMatched = comparePassword(newPassword,oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Old Password", 401));
    }

    user.password = newPassword;
    database.save();
    sendCookie(user, 201, res);
});

// Update Profile
export const updateProfile = catchAsync(async (req, res, next) => {

    const {username, phonenumber, bio, email,password} = req.body;

    const newUserData = {
        
        username,
        email,
        phonenumber,
        password,
        bio
    }

    const userExists = database.findOne({username})
    
    if (userExists && userExists._id !== req.user._id) {
        return next(new ErrorHandler("username already exist", 404));
    }

    if (req.body.avatar !== "") {
        const user = database.findById(req.user._id);

        newUserData.avatar = req.file?.path
    }
    database.update(req.user._id, newUserData);
    database.save()

    res.status(200).json({
        success: true,
        newUserData
    });
});

// Delete Profile
export const deleteProfile = catchAsync(async (req, res, next) => {
 database.delete(req.user._id)
 res.status(200).json({success:true})
    
});

// Follow | Unfollow User
export const followUser = catchAsync(async (req, res, next) => {

   
});

// Forgot Password
export const forgotPassword = catchAsync(async (req, res, next) => {

});

// Reset Password
export const resetPassword = catchAsync(async (req, res, next) => {

    
});

// User Search
export const searchUsers = catchAsync(async (req, res, next) => {

   
});


