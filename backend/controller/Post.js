import catchAsync from '../middlewears/catchAsync.js';
import ErrorHandler from '../utils/errorHandler.js';
import logger from '../utils/logger.js'
import database from '../utils/connectDb.js'

// Create New Post
export const newPost = catchAsync(async (req, res, next) => {
console.log(req.user)
    const postData = {
        title:req.body.title,
        body:req.body.content,
        caption: req.body.caption,
        comment:[],
        likes:[],
        savedBy:[],
        image: req.file?.path || "",
        postedBy: req.user._id,
        createdAt:Date.now(),
        type:'Post'
    }

    const post = database.insert(postData);
    database.save()

    res.status(201).json({
        success: true,
        post,
    });
});


export const allPosts = catchAsync(async (req, res, next) => {
    const post = database.find('Post');
    res.status(200).json({
        success: true,
        post,
    });
});

export const getPostDetails = catchAsync(async (req, res, next) => {

    const post = database.findById(req.params.id);
    res.status(200).json({
        success: true,
        post,
    });
});

export const updatePost = catchAsync(async (req, res, next) => {
console.log(req.body)
    const postData = {
        caption: req.body.caption,
       image: req.file?.path || '',
    }

    const post = database.update({_id:req.params.id},postData);
    database.save()

    res.status(200).json({
        success: true,
        post,
    });
});

export const deletePost = catchAsync(async (req, res, next) => {
    database.delete(req.params.id);
    res.status(200).json({
        success: true
    });
});



export const newComment = ()=>{

}
export const saveUnsavePost = ()=>{

}
export const likeUnlikePost = ()=>{
    
}