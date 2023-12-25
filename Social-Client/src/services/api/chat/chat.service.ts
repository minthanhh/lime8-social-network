import http from 'src/services/http'

class ChatService {
  async getConversationList() {
    const response = await http.get('chat/conversation-list')
    return response
  }
  async getChatMessages(receiverId: any) {
    const response = await http.get(`chat/user/${receiverId}`)
    return response
  }
  async addUsersChat(data: any) {
    const response = await http.post(`chat/add-chat-users`, data)
    return response
  }
  async removeChatUsers(body: any) {
    const response = await http.post('chat/remove-chat-users', body)
    return response
  }
  async markMessagesAsRead(senderId: string, receiverId: string) {
    const response = await http.put(`chat/mark-as-read`, { senderId, receiverId })
    return response
  }
  async saveChatMessage(data: any) {
    const response = await http.post(`chat/message`, data)
    return response
  }
  async updateMessageReaction(data: any) {
    const response = await http.put(`chat/reaction`, data)
    return response
  }
  async markMessageAsDelete({messageId, senderId, receiverId, type}: any) {
    const response = await http.delete(`/chat/user/mark-as-deleted/${messageId}/${senderId}/${receiverId}/${type}`)
    return response
  }
}
export default new ChatService()
