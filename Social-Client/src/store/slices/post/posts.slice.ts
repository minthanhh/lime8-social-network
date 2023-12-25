import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { getAllPostThunk } from 'src/store/api/posts'
// import { PostDocuments } from 'src/interfaces/post.interface'

interface IPost {
  imgId?: string
  profilePicture: string
  username: string
  imgVersion?: string
  gifUrl?: string
  bgColor?: string
  post?: string
  _id?: string
  commentsCount?: string
  videoId?: string
  privacy?: string
  avatarColor: string
  userId: string
  email: string
  createdAt: string
  feelings?: string
  videoVersion?: string
  suggestions?: string

  reactionsCount?: number
}

interface IAllPosts {
  posts: IPost[]
  totalPostsCount: number
  isLoading: boolean
}
const initialState: IAllPosts = {
  posts: [],
  totalPostsCount: 0,
  isLoading: false
}

const AllPostSlice = createSlice({
  initialState,
  name: 'allPost',
  reducers: {
    addToPosts: (state, action) => {
      state.posts = [...action.payload]
    },
    updateMorePosts: (state, action) => {
      if (action.payload) {
        state.posts = [...state.posts, ...action.payload]
      }
    },
    updateReactionsCount: (state, action) => {
      if (action.payload) {
        state.posts = [...action.payload]
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllPostThunk.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAllPostThunk.fulfilled, (state, action) => {
        state.isLoading = false

        if (action.payload) {
          const { posts } = action.payload
          state.posts = [...posts]
        }
      })
  }
})
export const { addToPosts, updateMorePosts, updateReactionsCount } = AllPostSlice.actions
export default AllPostSlice.reducer
