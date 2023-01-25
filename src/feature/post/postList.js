import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import PostAuthor from '../user/postAuthor'
import TimeAgo from './RelaiveTimeStamp'
import ReactionButtons from './ReactionBtn'

function PostList() {
  let posts = useSelector((state) => state.posts)
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))
  // const orderedPosts = posts.sort((a,b)=>(b.date).localeCompare(a.date))
  const renderPost = orderedPosts.map((post) => {
    return (
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
  })

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {renderPost}
    </section>
  )
}

export default PostList
