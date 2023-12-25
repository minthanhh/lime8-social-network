import http from 'src/services/http'

class ProfileService {
  async getAllProfileOfUser(username: string, userId: string, uId: string) {
    const response = await http.get(`user/profile/posts/${username}/${userId}/${uId}`)
    return response
  }

  async getAllUser(page = 1) {
    const response = await http.get(`user/profile/list-all/${page}`)
    return response
  }

  async updateInfoProfile(data: any) {
    const response = await http.put(`user/profile/basic-info`, data)
    return response
  }

  async getUserProfileById(userId: any) {
    const response = await http.get(`user/profile/all/${userId}`)
    return response
  }
}
export default new ProfileService()
