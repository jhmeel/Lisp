'use strict'
import express, { json, urlencoded} from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import errorMiddleware from './middlewears/error.js'
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'
import User from './routes/userRoute.js'
import Post from './routes/postRoute.js'
import logger from './utils/logger.js'

dotenv.config()

const PORT = process.env.PORT || 4000
const app = express()
app.use(json());
app.use(cookieParser());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(errorMiddleware)


app.use('/api/v1', User);
app.use('/api/v1', Post);


app.listen(PORT,()=>{
    logger.info(`server is Running! on port:${PORT} 🚀');`)
})