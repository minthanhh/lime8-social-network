import { createAsyncThunk } from '@reduxjs/toolkit'
import chatService from 'src/services/api/chat/chat.service'

const getConversationList = createAsyncThunk('chat/getUserChatList', async () => {
  try {
    const response = await chatService.getConversationList()
    return response.data
  } catch (error: any) {
    return []
  }
})

export { getConversationList }
