import React from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import PostAuthor from '../user/postAuthor.js'
import TimeAgo from './RelaiveTimeStamp'
import ReactionButtons from './ReactionBtn'

export default function SinglePostPage({ match }) {
  let { id } = match.params
  // console.log(id);
  const post = useSelector(state => 
    state.posts.find(post => post.id === id)
  )




  if (!post) {
    return (
      <section>
        <h2>Page Not Found!</h2>
      </section>
    )
  }
  return (
    <section>
      <article className="single-post">
        <PostAuthor authorId={post.user} />
        <TimeAgo timestamp={post.date} />

        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <ReactionButtons post={post} />
        <Link to={`/editPosts/${post.id}`} className="button">
          Edit Post
        </Link>
      </article>
    </section>
  )
}
