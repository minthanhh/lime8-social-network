import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  exploreModalIsOpen: false,
  uploadModalIsOpen: false
}

const exploreSlice = createSlice({
  initialState,
  name: 'explore',
  reducers: {
    toggleOpenModalExplore: (state) => {
      state.exploreModalIsOpen = !state.exploreModalIsOpen
    },
    toggleOpenModalUpload: (state) => {
      state.uploadModalIsOpen = !state.uploadModalIsOpen
    }
  }
})

export const { toggleOpenModalExplore, toggleOpenModalUpload } = exploreSlice.actions
export default exploreSlice.reducer
