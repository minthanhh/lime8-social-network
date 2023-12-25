import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/user/user.slice'
import modalSlice from './slices/modal/modal.slice'
import postSlice from './slices/post/post.slice'
import allPostSlice from './slices/post/posts.slice'
import allStorySlice from './slices/story/stories.slice'
import exploreSlice from './slices/modal/explore.slice'
import chatSlice from './slices/chat/chat.slice'
import allCommentOfPost from './slices/comments/comments.slice'
import notificationSlice from './slices/notifications/notifications.slice'
import profileSlice from './slices/profile/profile.slice'
import postEditSlice from './slices/post/postEdit.slice'
import modalVideoSlice from './slices/modal/video.slice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    modal: modalSlice,
    post: postSlice,
    allPost: allPostSlice,
    allStory: allStorySlice,
    explore: exploreSlice,
    chat: chatSlice,
    allComment: allCommentOfPost,
    notification: notificationSlice,
    profile: profileSlice,
    postEdit: postEditSlice,
    modalVideo: modalVideoSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
