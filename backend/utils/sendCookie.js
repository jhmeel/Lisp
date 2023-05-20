import jwt from 'jsonwebtoken';
import crypto from 'crypto'
const generateToken = function() {
    const Token = crypto.randomBytes(20).toString("hex");
    return jwt.sign({ id: Token}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}
const sendCookie = (user, statusCode, res) => {
    if(!user){
        res.status(400).json({
        success:false,
        message:"invalid user data",
        
    })
    return
}
    const authToken = generateToken();

    const options = {
       maxAge: new Date(
        Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
        httpOnly: true,
        path: "/",
    }

    res.status(statusCode).cookie('auth',{authToken,user},options).json({
        success: true,
        user,
    });
}

export default sendCookie;