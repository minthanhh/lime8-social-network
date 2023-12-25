import http from 'src/services/http'

class CommentService {
  async getAllCommentOfPost(postId: string) {
    const respone = await http.get(`post/comments/${postId}`)
    return respone
  }

  async sendComment(data: any) {
    const respone = await http.post('post/comment', data)
    return respone
  }
}

export default new CommentService()
