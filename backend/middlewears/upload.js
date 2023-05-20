import multer from 'multer'
import ErrorHandler from '../utils/errorHandler.js';
import path from 'path'


const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./uploads/');
    },
    filename:(req,file,cb)=>{
        cb(null,file.filename+"-"+Date.now()+'-'+path.extname(file.originalname))
    }
})

const upload = multer({storage:storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter:(req,file,cb)=>{
    if(file.mimetype.includes('image/')){
        cb(null,true)
    }else{
        cb(new ErrorHandler("Only image files are allowed"))
    }
 
}  
})

export default upload