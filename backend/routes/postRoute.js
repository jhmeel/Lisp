import express from 'express';
import { newPost,allPosts,newComment, saveUnsavePost,likeUnlikePost,getPostDetails,updatePost,deletePost } from '../controller/Post.js';
import { isAuthenticated } from '../middlewears/auth.js';
import upload from '../middlewears/upload.js';
const Post = express();

Post.route("/article/new").post(isAuthenticated,upload.single("post") ,newPost);
Post.route("/article/all").get(allPosts);

Post.route("/article/detail/:id").get(isAuthenticated, getPostDetails);

Post.route("/article/:id")
    .get(isAuthenticated, likeUnlikePost)
   .post(isAuthenticated, saveUnsavePost)
    .put(isAuthenticated, updatePost)
    .delete(isAuthenticated, deletePost);

Post.route("/article/comment/:id").post(isAuthenticated, newComment)

export default Post; 