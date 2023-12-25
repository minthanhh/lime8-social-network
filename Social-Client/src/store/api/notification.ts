import { createAsyncThunk } from '@reduxjs/toolkit'
import notifyService from 'src/services/api/notifications/notify.service'

export const getNotifications = createAsyncThunk('notifications/getNotifications', async (_, thunk) => {
  try {
    const result = await notifyService.getAllNotifications()
    return result.data
  } catch (error) {
    return thunk.rejectWithValue(error)
  }
})
