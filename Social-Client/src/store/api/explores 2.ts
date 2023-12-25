import { createAsyncThunk } from '@reduxjs/toolkit'
import Cloudinary from 'src/services/utilities/upload.utils'

export const getAllExploreThunk = createAsyncThunk('explore/getAllExploreThunk', async (_, thunk) => {
  try {
    const results = Cloudinary.getAllVideo()
    return results
  } catch (error: any) {
    return thunk.rejectWithValue(error)
  }
})

export const addExplore = createAsyncThunk('explore/addExplore', async (file: File, thunk) => {
  try {
    return await Cloudinary.addVideo(file!)
  } catch (error: any) {
    return thunk.rejectWithValue(error)
  }
})
