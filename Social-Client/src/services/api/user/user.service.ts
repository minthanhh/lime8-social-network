import http from 'src/services/http'

class UserService {
  async getUserSuggestions() {
    const response = await http.get('user/profile/suggestions')
    return response
  }
  async updateBasicInfo(data: any) {
    const response = await http.put('user', data)
    return response
  }
  async searchUsers(query: string) {
    const response = await http.get(`/user/profile/search/${query}`)
    return response
  }
  async checkCurrentUser() {
    const response = await http.get('currentuser')
    return response
  }
  async logoutUser() {
    const response = await http.get('signout')
    return response
  }

  async getSuggestedUsersList() {
    return (await http.get('user/profile/suggestions')).data
  }

  async userBlockedByAccountOwner(followerId: string) {
    return (await http.put(`user/block/${followerId}`)).data
  }

  async userUnBlockedByAccountOwner(followerId: string) {
    return (await http.put(`user/unblock/${followerId}`)).data
  }
}
export default new UserService()
