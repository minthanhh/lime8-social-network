export type ReactionTypes = 'like' | 'wow' | 'love' | 'angry' | 'sad' | 'happy'

export interface IReaction {
  _id?: string
  postId: string
  type: ReactionTypes
  username: string
  profilePicture?: string
  avatarColor: string
}
