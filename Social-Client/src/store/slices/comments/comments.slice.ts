import { createSlice } from '@reduxjs/toolkit'
import { getAllCommentByPostId } from 'src/store/api/comment'

interface IAllPosts {
  comments: any[]
  isLoading: boolean
}
const initialState: IAllPosts = {
  comments: [],
  isLoading: false
}

const AllCommentSlice = createSlice({
  initialState,
  name: 'comments',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCommentByPostId.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllCommentByPostId.fulfilled, (state, action) => {
        state.isLoading = false

        if (action.payload) {
          state.comments = action.payload
        }
      })
  }
})
export default AllCommentSlice.reducer
