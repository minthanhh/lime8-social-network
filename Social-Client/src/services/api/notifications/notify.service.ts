import http from 'src/services/http'

class NotifyService {
  async getAllNotifications() {
    const response = await http.get('notifications')
    return response
  }
}
export default new NotifyService()
