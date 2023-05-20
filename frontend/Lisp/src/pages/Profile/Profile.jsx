import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { clearErrors, followUser, getUserDetails,logoutUser } from '../../../actions/userActions';
import {getPostDetails,getPostsOfFollowing  } from '../../../actions/postActions';
import BackdropLoader from '../../components/backdropLoader/BackdropLoader';
import { FOLLOW_USER_RESET, USER_DETAILS_RESET } from '../../../constants/userConstants';
import MetaData from '../../components/Layouts/metaData';
import NotFound from '../Notfound/Notfound';
import InfiniteScroll from 'react-infinite-scroll-component'
import SpinLoader from '../../components/Spinloader/Spinloader'
import './style.css'
import ArticleItem from '../../components/Blog/ArticleItem/ArticleItem';

 import {metaballsMenu,postsIconFill,editIcon,postUploadOutline ,settingsIcon, exploreOutline, savedIcon, switchAccountIcon} from '../../assets/svgIcons'

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
]

const Profile = () => {

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();

    const [follow, setFollow] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [followersModal, setFollowersModal] = useState(false);
    const [usersArr, setUsersArr] = useState([]);
    const [savedTab, setSavedTab] = useState(false);
    const [isPTabOpen,setIsPTabOpened] = useState(false)

    const togglePTab = ()=>{
      setIsPTabOpened(!isPTabOpen)
  
    }

    const { loading, isAuthenticated,user, error } = useSelector((state) => state.user);
    const { error: followError, success, message } = useSelector((state) => state.followUser);
    const [page, setPage] = useState(2);
    const totalPosts = data.length

  const fetchMorePosts = () => {
    setPage((prev) => prev + 1)
    dispatch(getPostsOfFollowing(page));
  }
    const handleFollow = () => {
        setFollow(!follow); 
        dispatch(followUser(user._id));
    }

    const handleFollowersModal = () => {
        setFollowersModal(true);
        setViewModal(true)
        setUsersArr(user?.followers);
    }

    const handleFollowingModal = () => {
        setViewModal(true)
        setFollowersModal(false);
        setUsersArr(user?.following);
    }

    const closeModal = () => {
        setViewModal(false)
    }

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: "error" });
            dispatch(clearErrors());
        }
        dispatch(getUserDetails(params.username));

        if (followError) {
            enqueueSnackbar(followError, { variant: "error" });
            dispatch(clearErrors());
        }
        if (success) {
            enqueueSnackbar(message, { variant: "info" });
            dispatch({ type: FOLLOW_USER_RESET });
        }

        return () => {
             dispatch({ type: USER_DETAILS_RESET })
         }

    }, [dispatch, error, params.username, followError, success, message]);

    useEffect(() => {
         console.log(user?.followers?.some((id) => id === loggedInUser._id))
        setFollow(user?.followers?.some((u) => u._id === loggedInUser._id))
    }, [user]);

    const logout = ()=>{
      dispatch(logoutUser())
      togglePTab()
      navigate("/")
    }
    return (
        <>
            <MetaData title={` Profile • Lisp`} />

            {loading && <BackdropLoader />}
            {user
             ? <div className='profile-container'>
                 <div className='p-sub-cont'>
                 <div onClick={togglePTab} className='nav'>{metaballsMenu}</div>
                 <div className='p-img-cont'>
                     <img className='p-img' src="/src/assets/images/create-beautiful-stroked-text-css.avif"alt={user.username}/>
                 </div>
                 {isPTabOpen &&
                   <div className='p-nav-tab'>
                   <ul id="p-ul">
                   <Link to="/editProfile"><li>{editIcon} Edit profile</li></Link>
                     <Link to="/savedArticles"><li>{savedIcon} Bookmarked Articles</li></Link>
                     <li onClick={logout}>{switchAccountIcon} Logout</li>
                   </ul>
                 </div>}
                
                 <div className='f-cont'>
                 <span className='p-name'>{user.username}</span>
                 <div className='f-count'>
                 <span className='followers'>Followers {user.followers.length} </span>
                 <span className='following'>Following {user.following.length}</span>
                 </div>
                 <Link to="/article/new"><button className='write'>Write <span className='p-upload-icon'>{postUploadOutline}</span></button></Link>
                
                 </div>
                
                 </div>
                 <div className='timeline-cont'>
                    
                     <span className='my-art'>My Articles  <span className='post-icon'>{postsIconFill}</span></span>
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

                 </div>
                

                 </div>
            :<NotFound />
            }
            

        </>
    )
}

export default Profile