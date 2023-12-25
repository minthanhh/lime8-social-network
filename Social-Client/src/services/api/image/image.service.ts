import http from 'src/services/http'

class ImageService {
  async updateAvatarProfile(image: string) {
    const respone = await http.post('images/profile', { image })
    return respone
  }

  async updateBackgroundProfile(image: string) {
    const respone = await http.post('images/background', { image })
    return respone
  }

  async deleteAvatarProfile(imageId: string) {
    const respone = await http.delete(`images/${imageId}`)
    return respone
  }

  async deleteBackgroundProfile(imageId: string) {
    const respone = await http.delete(`images/background/${imageId}`)
    return respone
  }

  async getImagesOfUser(userId: string) {
    const respone = await http.get(`/images/${userId}`)
    return respone
  }
}

export default new ImageService()
