import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost } from './postSlice'
// import { postAdded } from './postSlice'

export const AddPostForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [userId, setUserId] = useState('')
  const [requestStatus, setRequestStatus] = useState('idle')

  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)

  const canSave =
    [title, content, userId].every(Boolean) && requestStatus === 'idle'

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setUserId(e.target.value)
  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ))

  const onSavePostClicked = async () => {
    if (canSave) {
      try {
        setRequestStatus('pending')
        await dispatch(addNewPost({ title, content, user: userId })).unwrap()
        setUserId('')
        setTitle('')
        setContent('')
      } catch (err) {
        console.error('Failed to save the post: ', err)
      } finally {
        setRequestStatus('idle')
      }
    }
  }

  return (
    <section>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
        ></input>
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Post Content:</label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        ></input>
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  )
}
// import React, { useState } from 'react';
// import {useDispatch} from 'react-redux';
// import {postAdded } from './postSlice';
// import {nanoid} from '@reduxjs/toolkit'

// function AddPostForm() {
//   const [title, setTitle] = useState('')
//   const [content, setContent] = useState('')

//   const onTitleChanged = (e) => setTitle(e.target.value)
//   const onContentChanged = (e) => setContent(e.target.value)
//   const dispatch = useDispatch();

//   const saveNewPost = ()=>{
//       if(title & content){
//           dispatch(postAdded({
//               id:nanoid(),
//               title,
//               content
//           }))
//           setTitle('')
//           setContent('')
//       }
//   }

//   return (
//     <section>
//       <h2>Add a new Post</h2>
//       <form>
//         <label htmlFor="postTitle">Post Title:</label>
//         <input
//           type="text"
//           id="postTitle"
//           name="postTitle"
//           value={title}
//           onChange={onTitleChanged}
//         ></input>

//         <label htmlFor="postContent">Post Content:</label>
//         <input
//           type="text"
//           id="postContent"
//           name="postContent"
//           value={content}
//           onChange={onContentChanged}
//         ></input>
//         <button type="button" onClick={saveNewPost}>Save Post</button>
//       </form>
//     </section>
//   )
// }

export default AddPostForm
