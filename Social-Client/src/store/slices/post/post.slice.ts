import { PostDocuments } from './../../../interfaces/post.interface'
import { createSlice } from '@reduxjs/toolkit'

interface InitialState extends PostDocuments {}

const initialState: InitialState = {
  userId: '',
  username: '',
  email: '',
  avatarColor: '',
  profilePicture: '',
  bgColor: '',
  post: '',
  commentCount: '',
  imagePost: '',
  imgId: '',
  videoPost: '',
  videoId: '',
  feelings: '',
  gifUrl: '',
  privacy: 'public',
  reactions: 0
}

const PostSlice = createSlice({
  initialState,
  name: 'post',
  reducers: {
    resetPost: () => {
      return initialState
    },

    changeBgColor: (state, action) => {
      state.bgColor = action.payload
    },

    changePrivacyPost: (state, action) => {
      state.privacy = action.payload
    },

    changeFeelingPost: (state, action) => {
      state.feelings = action.payload
    },
    updatePostItem: (state, action) => {
      return { ...state, ...action.payload }
    }
  }
})
export const { resetPost, changePrivacyPost, changeFeelingPost, changeBgColor, updatePostItem } = PostSlice.actions
export default PostSlice.reducer
