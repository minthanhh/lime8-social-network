import { createSlice } from '@reduxjs/toolkit'
import { getNotifications } from 'src/store/api/notification'

const initialState = {
  loading: false,
  notifications: []
}

const NotificationsSlice = createSlice({
  initialState,
  name: 'notification',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getNotifications.pending, (state) => {
        state.loading = true
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.loading = false
        state.notifications = action.payload?.notifications
      })
  }
})
export default NotificationsSlice.reducer
