export interface PostDocuments {
  _id?: string
  userId?: string
  username: string
  email: string
  avatarColor: string
  profilePicture: string
  bgColor: string
  post: string
  commentCount: string
  imagePost: string
  imgId?: string
  videoPost?: string
  videoId?: string
  feelings?: string
  gifUrl?: string
  privacy?: string
  imgVersion?: string
  reactions?: number
  createdAt?: Date
}
