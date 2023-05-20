import { verify } from 'jsonwebtoken';
import database from '../utils/connectDb.js';
import ErrorHandler from "../utils/errorHandler.js";
import catchAsync from "./catchAsync.js";

export const isAuthenticated = catchAsync(async (req, res, next) => {

    const { auth } = req.cookies;

    if(!auth || !auth.authToken) {
        return next(new ErrorHandler("Please Login to Access", 401));
    }

    const decodedData = verify(auth.authToken, process.env.JWT_SECRET);
    req.user = auth.user;
    next();
});