import { createSlice } from '@reduxjs/toolkit'
import { getAllStoryFaker } from 'src/store/api/stories'
interface IAllStories {
  stories: any[]
  isLoading: boolean
}
const initialState: IAllStories = {
  stories: [],
  isLoading: false
}

const AllPostSlice = createSlice({
  initialState,
  name: 'allStories',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllStoryFaker.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllStoryFaker.fulfilled, (state, action) => {
        state.isLoading = false
        state.stories = [...action.payload!]
      })
  }
})
export default AllPostSlice.reducer
