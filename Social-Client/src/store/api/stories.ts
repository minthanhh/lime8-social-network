import { createAsyncThunk } from '@reduxjs/toolkit'
import { StoryList } from 'src/services/utilities/static.data'
import Swal from 'sweetalert2'

export const getAllStoryFaker = createAsyncThunk('story/getAllStoryFaker', async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500))
    return StoryList
  } catch (error: any) {
    Swal.fire('Thông báo', error.message, 'error')
  }
})

export const getAllStory = createAsyncThunk('stories/getAllStory', async (_, thunk) => {
  try {
    console.log('test')
  } catch (error: any) {
    return thunk.rejectWithValue(error)
  }
})

export const addStory = createAsyncThunk('stories/addStory', async (data, thunk) => {
  try {
    console.log(data)
  } catch (error: any) {
    return thunk.rejectWithValue(error)
  }
})
