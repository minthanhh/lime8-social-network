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
  privacy: '',
  reactions: 0,
  imgVersion: ''
}

const PostEditSlice = createSlice({
  initialState,
  name: 'post',
  reducers: {
    resetEditPost: () => initialState,
    updatePostEdit: (state, action) => {
      if (action.payload) {
        const { imgId, imgVersion, imagePost } = action.payload

        if (
          !imagePost &&
          imgVersion !== undefined &&
          imgId !== undefined &&
          imgId !== 'undefined' &&
          imgVersion !== 'undefined'
        ) {
          return {
            ...state,
            ...action.payload,
            imagePost: `https://res.cloudinary.com/dgyk7uloc/image/upload/v${imgVersion}/${imgId}`
          }
        } else {
          return {
            ...state,
            ...action.payload,
            imagePost: imagePost
          }
        }
      }
    }
  }
})

export const { updatePostEdit, resetEditPost } = PostEditSlice.actions
export default PostEditSlice.reducer
