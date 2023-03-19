import React,{useEffect} from 'react'
import { Spinner } from '../../components/Spinner'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllPosts } from './postSlice'
import { Link } from 'react-router-dom'
import PostAuthor from '../user/postAuthor'
import TimeAgo from './RelaiveTimeStamp'
import ReactionButtons from './ReactionBtn'

const PostExcerpt = ({post})=>{
  return(
      <article className="post-excerpt" key={post.id}>
        <h3>{post.title}</h3>
        <PostAuthor authorId={post.user} />
        <TimeAgo timestamp={post.date} />
        <p className="post-content">{post.content.substring(0, 100)}</p>
        <ReactionButtons post={post} />
        <Link to={`/posts/${post.id}`} className="button muted-button">
          View Post
        </Link>
      </article>
  )
}
function PostList() {
  const dispatch = useDispatch();
  let posts = useSelector((state) => state.posts.posts)
  let postStatus = useSelector((state)=> state.posts.status)
  let error = useSelector((state) => state.posts.error)

  useEffect(()=>{
    if(postStatus === 'idle'){
      dispatch(fetchAllPosts())

    }
  },[postStatus,dispatch]
  )

  // const orderedPosts = posts.sort((a,b)=>(b.date).localeCompare(a.date))
  let content;
  if(postStatus === "loading"){
    content = <Spinner text="loading" />
  } 
  if(postStatus === "succeeded"){
      const orderedPosts = posts
        .slice()
        .sort((a, b) => b.date.localeCompare(a.date))
      content = orderedPosts.map((post)=>(<PostExcerpt key= {post.id} post= {post} />))

  }

  if(postStatus === "fail"){
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostList
