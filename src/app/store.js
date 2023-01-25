import { configureStore } from '@reduxjs/toolkit'
import postsReducer from '../feature/post/postSlice.js'
import usersReducer from '../feature/user/userSlice.js'

export default configureStore({
  reducer: {
    // all the data for state.posts will be updated by the postsReducer function when actions are dispatched.
    posts: postsReducer,
    users: usersReducer,
  },
})
