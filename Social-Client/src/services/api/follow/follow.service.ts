import http from 'src/services/http'

class FollowService {
  async getFollowings() {
    const respone = await http.get('user/following')
    return respone
  }

  async getFollowers(userId: string) {
    const respone = await http.get(`user/followers/${userId}`)
    return respone
  }

  async followUser(followerId: string) {
    const respone = await http.put(`user/follow/${followerId}`)
    return respone
  }
  async unFollowUser(followeeId: string, followerId: string) {
    const respone = await http.put(`/user/unfollow/${followerId}/${followeeId}`)
    return respone
  }
}

export default new FollowService()
