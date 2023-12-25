import { createSlice } from '@reduxjs/toolkit'

interface InitialState {
  isOpenModalVideo: boolean
  videoUrl: string
}

const initialState: InitialState = {
  videoUrl: '',
  isOpenModalVideo: false
}

const modalVideoSlice = createSlice({
  name: 'modalVideo',
  initialState,
  reducers: {
    toggleOpenModalVideo: (state, action) => {
      state.videoUrl = action.payload
      state.isOpenModalVideo = !state.isOpenModalVideo
    }
  }
})

export const { toggleOpenModalVideo } = modalVideoSlice.actions

export default modalVideoSlice.reducer
