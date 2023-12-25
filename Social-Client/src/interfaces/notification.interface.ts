export interface NotificationDocuments {
  id: string
  userTo: string
  userFrom: string
  notificationType: string
  message: string
  entityId: string
  createdItemId: string
  comment: string
  reaction: string
  post: string
  imgId: string
  imgPost: string
  gifUrl: string
  read: boolean
  createdAt: Date
}
