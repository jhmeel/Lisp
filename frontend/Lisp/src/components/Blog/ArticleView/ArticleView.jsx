import React from 'react'
import MetaData from '../../Layouts/metaData'
import { useState,useEffect,useRef} from 'react'
 import axios from 'axios'
 import { Link } from 'react-router-dom';
 import {likeFill, commentIcon, emojiIcon, likeIconOutline, moreIcons,savedIcon, saveIconFill, saveIconOutline, shareIcon } from '../../svgIcons'
 import { Picker } from 'emoji-mart'
 import ScrollToBottom from 'react-scroll-to-bottom';
 import moment from 'moment';
 import './style.css'

const ArticleView = ({id,title,image,caption,body,postedBy,date,readDuration,savedBy,likes,comments}) => {

  const commentInput = useRef(null);
  const [allLikes, setAllLikes] = useState(likes);
  const [allComments, setAllComments] = useState(comments);
  const [allSavedBy, setAllSavedBy] = useState(savedBy);

  const user = {
    _id:""
      }

  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState("");
  const [viewComment, setViewComment] = useState(false);
  const [showEmojis, setShowEmojis] = useState(false);

  const [likeEffect, setLikeEffect] = useState(false);

  const handleLike = async () => {
      setLiked(!liked);
     // await dispatch(likePost(_id));
      const { data } = await axios.get(`/api/v1/articles/detail/${_id}`)
      setAllLikes(data.post.likes)
  }

  const handleComment = async (e) => {
      e.preventDefault();
     // await dispatch(addComment(_id, comment));
      setComment("");
      const { data } = await axios.get(`/api/v1/articles/detail/${_id}`)
      setAllComments(data.post.comments)
  }

  const handleSave = async () => {
      setSaved(!saved);
     // await dispatch(savePost(_id));
      const { data } = await axios.get(`/api/v1/articles/detail/${_id}`)
      setAllSavedBy(data.post.savedBy)
  }

  const setLike = () => {
      setLikeEffect(true)
      setTimeout(() => {
          setLikeEffect(false)
      }, 500)
      if (liked) {
          return;
      }
      handleLike();
  }

  useEffect(() => {
      setLiked(allLikes.some((u) => u._id === user._id))
  }, [allLikes]);

  useEffect(() => {
      setSaved(allSavedBy.some((id) => id === user._id))
  }, [allSavedBy]);

  return (
      <>
      <MetaData title={title} description={caption} />
       <main>
       <div className='image-holder'>
         <img className="article-img"loading="lazy" src={image} alt={title}/>
       </div>
       <div className="sub-container">
        <h1>{title}</h1>
        <div className='meta-data'>
          <div className='postedBy'>
            <img src={postedBy.image} alt={postedBy.name}/>
            <span className='name'>{postedBy.name}</span>
            <span className='dur'>{readDuration}</span>
          </div>
        </div>
       </div>
       <div className='article-body'>{body}</div>
       <div className="like-comt-cont">
      <div className="icont-cont">
      <div className="icon-bar">
        <button onClick={handleLike}>{liked ? likeFill : likeIconOutline}</button>
        <button onClick={() => commentInput.current.focus()}>{commentIcon}</button>
        {shareIcon}
    </div>
    <button onClick={handleSave}>{saved ? saveIconFill : saveIconOutline}</button>
</div>

{/* likes  */}
<span onClick={handleLikeModal} className="">{allLikes.length} likes</span>

{/* comment */}
<div className="comment">
    <Link to={`/${postedBy.name}`} className="">{postedBy.name}</Link>
    <span className="caption">{caption}</span>
</div>

{/* time */}
{allComments.length > 0 ?

    <span onClick={() => setViewComment(!viewComment)} className="">
        {viewComment ? "Hide Comments" :
            allComments.length === 1 ?
                `View ${allComments.length} Comment` :
                `View All ${allComments.length} Comments`
        }
    </span> :

    <span className="">No Comments Yet!</span>

}
<span className="">{moment(createdAt).fromNow()}</span>

{viewComment &&
    <ScrollToBottom className="">
        {allComments.map((c) => (
            <div className="" key={c._id}>
                <img draggable="false" className="" src={c.user.avatar} alt="avatar" />
                <Link to={`/${c.user}`} className="">{c.user.username}</Link>
                <p className="">{c.comment}</p>
            </div>
        ))}
    </ScrollToBottom>
}

</div>

{/* comment input container */}
<form onSubmit={handleComment} className="comt-form">
<span onClick={() => setShowEmojis(!showEmojis)} className="">{emojiIcon}</span>

{showEmojis && (
    <div className="emoji-tab">
        <Picker
            set="google"
            onSelect={(e) => setComment(comment + e.native)}
            title="Emojis"
        />
    </div>
)}

<input
    className="comt-input"
    type="text"
    value={comment}
    ref={commentInput}
    required
    onFocus={() => setShowEmojis(false)}
    onChange={(e) => setComment(e.target.value)}
    placeholder="Add a comment..." />
<button type="submit" className="" disabled={comment.trim().length < 1}>Post</button>
</form>
       </main>
      </>
   
  )
}

export default ArticleView