import { createAsyncThunk } from '@reduxjs/toolkit'
import postService from 'src/services/api/post/post.service'

export const getAllCommentByPostId = createAsyncThunk('comments/getAllCommentByPostId', async (postId: string) => {
  try {
    const result = await postService.getAllCommentOfPost(postId)
    return result.data.comments
  } catch (error) {
    console.log(error)
  }
})
