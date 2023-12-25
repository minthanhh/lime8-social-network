export interface MessageDocument {
  id: string
  receiverId: string
  isRead: boolean
  senderAvatarColor: string
  receiverAvatarColor: string
  content: string
  senderUsername: string
  receiverUsername: string
  receiverProfilePicture: string
  gifUrl: string
  reactions: {
    angry: number
    happy: number
    like: number
    love: number
    sad: number
    wow: number
  }
  deleteForMe: boolean
  conversationId: string
  senderId: string
  selectedImage: string
  createdAt: Date
  deletedForEveryone: boolean
}
