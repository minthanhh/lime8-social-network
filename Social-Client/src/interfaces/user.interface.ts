export interface IUser {
  _id: string
  uId: string

  fullName: string
  username: string
  email: string
  bgImageId: string
  bgImageVersion: string
  avatarColor: string
  profilePicture: string

  quote: string
  work: string
  birthday: string
  school: string
  location: string
  relatives: string

  blocked: string[]
  blockedBy: string[]
  followingCount: number
  followersCount: number
  postsCount: number
  createdAt: string
}
