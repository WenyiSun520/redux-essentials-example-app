import React,{useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {postUpdated} from './postSlice';

export const EditPostForm = ({match}) => {
  let id= match.params;
  
  let editedPost = useSelector(state => state.posts.find(post=> post.id ===id.id));


  const [title, setTitle] = useState(editedPost.title)
  const [content, setContent] = useState(editedPost.content)

  const dispatch = useDispatch();
  const history = useHistory();

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onSavePostClicked=()=>{
      if(title && content){
          dispatch(postUpdated({id:id.id,title, content}))
             history.push(`/posts/${id.id}`)
      }
  }
  

  
  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder={editedPost.title}
          value={title}
          onChange={onTitleChanged}
        ></input>

        <label htmlFor="postContent">Post Content:</label>
        <input
          type="text"
          id="postContent"
          name="postContent"
          placeholder={editedPost.content}
          value={content}
          onChange={onContentChanged}
        ></input>
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  )
}
export default EditPostForm;
