import { createSlice } from '@reduxjs/toolkit'
import { getAllProfileOfUser, getSuggestedUsersList } from 'src/store/api/profile'

interface ProfileState {
  loading: boolean
  profile: any
  posts: any[]
  suggestedUserList: any[]
}

const initialState: ProfileState = {
  loading: false,
  profile: {},
  posts: [],
  suggestedUserList: []
}

const ProfileSlice = createSlice({
  initialState,
  name: 'profile',
  reducers: {
    updateCurrentProfile: (state, action) => ({ ...state, profile: { ...state.profile, ...action.payload } })
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProfileOfUser.pending, (state) => {
        state.loading = true
      })
      .addCase(getAllProfileOfUser.fulfilled, (state, action) => {
        state.loading = false

        if (action.payload) {
          const { posts, user } = action.payload

          state.profile = user
          state.posts = [...posts]
        }
      })
      .addCase(getSuggestedUsersList.fulfilled, (state, action) => {
        state.suggestedUserList = action.payload
      })
  }
})

export const { updateCurrentProfile } = ProfileSlice.actions
export default ProfileSlice.reducer
