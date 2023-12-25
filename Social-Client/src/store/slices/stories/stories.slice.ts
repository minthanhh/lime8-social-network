import { createSlice } from '@reduxjs/toolkit'

interface IStoriesState {
  stories: any[]
  isLoading: boolean
}

const initialState: IStoriesState = {
  stories: [],
  isLoading: false
}

const StoriesSlice = createSlice({
  initialState,
  name: 'stories',
  reducers: {}
})

export default StoriesSlice.reducer
