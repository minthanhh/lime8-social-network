import { createSlice } from '@reduxjs/toolkit'
import { IUser } from 'src/interfaces'

interface InitialState {
  token: string
  profile: IUser | null
  isOpenModalAvatar: boolean
  isOpenModalBackground: boolean
}

const initialState: InitialState = {
  token: '',
  profile: null,
  isOpenModalAvatar: false,
  isOpenModalBackground: false
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    toggleOpenModalAvatar: (state) => {
      state.isOpenModalAvatar = !state.isOpenModalAvatar
    },
    toggleOpenModalBackground: (state) => {
      state.isOpenModalBackground = !state.isOpenModalBackground
    },
    addUser: (state, action) => {
      const { token, profile } = action.payload
      state.token = token
      state.profile = profile
    },
    clearUser: (state) => {
      state.token = ''
      state.profile = null
    },
    updateUserProfile: (state, action) => {
      if (action.payload) {
        state.profile = { ...state.profile, ...action.payload }
      }
    }
  }
})

export const { addUser, clearUser, updateUserProfile, toggleOpenModalAvatar, toggleOpenModalBackground } =
  userSlice.actions
export default userSlice.reducer
