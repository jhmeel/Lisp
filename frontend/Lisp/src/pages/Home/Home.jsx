import React from 'react'
import './style.css'
import MetaData from '../../components/Layouts/metaData'
import BCarousel from '../../components/carousel-bar/carousel'
import { useState,useEffect } from 'react'
import ArticleItem from '../../components/Blog/ArticleItem/ArticleItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import SpinLoader from '../../components/Spinloader/Spinloader'
import SkeletonLoader from  '../../components/skeletonLoader/SkeletonLoader'



const data = [
  
  {
    title:"How to write type-safe CSS Modules",
  date:"12-02-2023",
  postedBy:{name:"sheyi",image:"/src/assets/images/LOVE YOU BRO.jpg"},
  caption:"Having the correct CSS class names in place ensures that the intended styles are applied to a given component,...",
  image:"/src/assets/images/create-beautiful-stroked-text-css.avif",
},
 
{
  title:"A guide to Node.js design patterns",
date:"03-04-2023",
postedBy:{name:"sheyi",image:"/src/assets/images/LOVE YOU BRO.jpg"},
caption:"Learn more about design patterns, like the factory method pattern, the singleton pattern, and the builder pattern you can...",
image:"/src/assets/images/type-safe-css-modules-typescript-nocdn.avif",
},
 
{
  title:"Creating smoother CSS transitions with Animate CSS Grid",
date:"01-05-2023",
postedBy:{name:"sheyi",image:"/src/assets/images/LOVE YOU BRO.jpg"},
caption:"Let's explore how to use the Animate CSS Grid package to animate and create smoother transitions for our grid.",
image:"/src/assets/images/Using-Cow-Rust-efficient-memory-utilization.avif",
},
 
{
  title:"How to create a web app in Rust with Rocket and Diesel",
date:"11-08-2023",
postedBy:{name:"sheyi",image:"/src/assets/images/LOVE YOU BRO.jpg"},
caption:"Follow along with this full tutorial to learn how to create a web application with Rust, Rocket, and Diesel.",
image:"/src/assets/images/using-kotlin-sleep-delay-wait-android-app-web-nocdn.avif",
}, {
  title:"How to write type-safe CSS Modules",
date:"12-02-2023",
postedBy:{name:"sheyi",image:"/src/assets/images/LOVE YOU BRO.jpg"},
caption:"Having the correct CSS class names in place ensures that the intended styles are applied to a given component,...",
image:"/src/assets/images/create-beautiful-stroked-text-css.avif",
},

{
title:"A guide to Node.js design patterns",
date:"03-04-2023",
postedBy:{name:"sheyi",image:"/src/assets/images/LOVE YOU BRO.jpg"},
caption:"Learn more about design patterns, like the factory method pattern, the singleton pattern, and the builder pattern you can...",
image:"/src/assets/images/type-safe-css-modules-typescript-nocdn.avif",
},

{
title:"Creating smoother CSS transitions with Animate CSS Grid",
date:"01-05-2023",
postedBy:{name:"sheyi",image:"/src/assets/images/LOVE YOU BRO.jpg"},
caption:"Let's explore how to use the Animate CSS Grid package to animate and create smoother transitions for our grid.",
image:"/src/assets/images/Using-Cow-Rust-efficient-memory-utilization.avif",
},

{
title:"How to create a web app in Rust with Rocket and Diesel",
date:"11-08-2023",
postedBy:{name:"sheyi",image:"/src/assets/images/LOVE YOU BRO.jpg"},
caption:"Follow along with this full tutorial to learn how to create a web application with Rust, Rocket, and Diesel.",
image:"/src/assets/images/using-kotlin-sleep-delay-wait-android-app-web-nocdn.avif",
}
]
const Home = () => {
  const [page, setPage] = useState(2);
const loading = false
const totalPosts = data.length

  const fetchMorePosts = () => {
    setPage((prev) => prev + 1)
   // dispatch(getPostsOfFollowing(page));
  }

  //  const {isLoading,payload,error} = getRequest("articles/all")
  // console.log(payload)
  
  

  return (
    <>
    <MetaData title="Home"/>
    <main>
    <div className='carousel-bar'>
    <BCarousel/>
    </div>
     <section className='articles'>
       <h1 className='featured-post'>Featured Articles</h1>
       {loading &&
            Array(data.length).fill("").map((el, i) => ( <SkeletonLoader key={i} />))
        }
       <InfiniteScroll
            dataLength={data.length}
            next={fetchMorePosts}
            hasMore={data.length !== totalPosts}
            loader={<SpinLoader />}>
    
            <div className="article-holder">
            {data.map((item,i)=>{
        return <ArticleItem key={i} {...item}/>
        
       })
      }
            </div>
         </InfiniteScroll>
     </section>
    </main>
    
    </>

   
  )
}

export default Home