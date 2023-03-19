import { createSlice, nanoid , createAsyncThunk} from '@reduxjs/toolkit';
// import { sub } from 'date-fns'
import { client } from '../../api/client'


const initialState = {
  posts:[],
  status:"idle",
  error: null
}

export const fetchAllPosts = createAsyncThunk('posts/fetchPosts', async ()=>{
  const response = await client.get('/fakeApi/posts')
  return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async initialPost =>{
  const response = await client.post('/fakeApi/posts',initialPost)
  return response.data
})



const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded:{
      reducer (state, action) {
      state.posts.push(action.payload)
    },
     //prepare callback function to generate random value
    prepare(title, content, userId) {
      return {
        payload: {
          id: nanoid(),
          date: new Date().toISOString(),
          title,
          content,
          user: userId,
          reactions: {
            thumbsUp: 0,
            hooray: 0,
            heart: 0,
            rocket: 0,
            eyes: 0,
          },
        },
      }
    },
    },
    postUpdated(state, action) {
      // the payload obj will looks like:
      //{type: 'posts/postUpdated', payload: {id, title, content}}
      const { id, title, content } = action.payload
      const correspondingPost = state.posts.find((post) => post.id === id)
      if (correspondingPost) {
        //if correspondingPost exsited
        correspondingPost.title = title
        correspondingPost.content = content
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const correspondingPost = state.posts.find((post) => post.id === postId)
      if (correspondingPost) {
        correspondingPost.reactions[reaction]++
      }
    },
  },
  extraReducers(builder){
    builder
      .addCase(fetchAllPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.posts = state.posts.concat(action.payload)
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled,(state,action)=>{
        state.posts.push(action.payload)
      })


  }
})

export const { postAdded, postUpdated, reactionAdded } = postSlice.actions
export default postSlice.reducer
