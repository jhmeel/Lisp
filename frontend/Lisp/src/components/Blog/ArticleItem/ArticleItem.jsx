 import React from 'react'
 import './style.css'
import { savedIcon,savedIconFill } from '../../../assets/svgIcons'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'


const ArticleItem = ({id,title,image,caption,postedBy,date,readDuration="3min"}) => {
    const [isSaved,setIsSaved] = useState(false)
const saveArticle = ()=>{
    setIsSaved(!isSaved)
}
    
  return (
   <div className="container">
        <div className='article-img'>
        <Link to={`/article/${title}`}> <img draggable="false" loading='lazy' src={image} alt={title}/></Link>
        </div>
        <div className="content">
        <Link to={`/article/${title}`}><div className='title'>{title}</div></Link>
            <div className='caption'>{caption}</div>
            <div className='meta'>
                <div className='postedBy'>
                    <img draggable={false} loading='lazy' src={postedBy.image} alt={postedBy.name}/>
                    <Link to={`/user/${postedBy.name}`}><span className='postedby-name'>{postedBy.name}</span></Link>
                    </div>
                    <span className='date'>{moment(date).fromNow()}</span>
                    <span className='read-dur'>{readDuration}</span>
                    <span onClick={saveArticle}className='save-icon'>{!isSaved && savedIcon || savedIconFill}</span>
                    </div>
                </div>
            </div>
        
  )
}

export default ArticleItem