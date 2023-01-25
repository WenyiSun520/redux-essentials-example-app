import { createSlice, nanoid } from '@reduxjs/toolkit';
import { sub } from 'date-fns'


const initialState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {
      thumbsUp: 0,
      hooray: 0,
      heart: 0,
      rocket: 0,
      eyes: 0,
    },
  },
]

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded:{
      reducer (state, action) {
      state.push(action.payload)
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
      const correspondingPost = state.find((post) => post.id === id)
      if (correspondingPost) {
        //if correspondingPost exsited
        correspondingPost.title = title
        correspondingPost.content = content
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const correspondingPost = state.find((post) => post.id === postId)
      if (correspondingPost) {
        correspondingPost.reactions[reaction]++
      }
    },
  },
})

export const { postAdded, postUpdated, reactionAdded } = postSlice.actions
export default postSlice.reducer
