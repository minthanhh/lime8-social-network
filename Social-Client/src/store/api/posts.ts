import { createAsyncThunk } from '@reduxjs/toolkit'
import postService from 'src/services/api/post/post.service'
import Swal from 'sweetalert2'

export const getAllPostThunk = createAsyncThunk('post/getPosts', async () => {
  try {
    const responesePost = await postService.getAllPost(1)

    return responesePost.data
  } catch (error: any) {
    Swal.fire('Thông báo', error.message, 'error')
  }
})
