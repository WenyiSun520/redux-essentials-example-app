import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = []

export const fetchAllUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      //Immer lets us update state in two ways: either mutating the existing state value, or returning a new result.
      return action.payload
    })
  },
})

export default userSlice.reducer
