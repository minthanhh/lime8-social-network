class Cloudinary {
  private static storageKey = 'ExporeList'
  private static existData: any[] = JSON.parse(localStorage.getItem(this.storageKey) as string)

  static async addVideo(file: File): Promise<void> {
    const formData = new FormData()

    formData.append('file', file)
    formData.append('upload_preset', 'fskseq9j')
    formData.append('api_key', '845178792751456')

    const results = await fetch('https://api.cloudinary.com/v1_1/dyfyxrbm6/video/upload', {
      method: 'POST',
      body: formData
    }).then((r) => r.json())

    const data = this.existData ? this.existData : []
    data.unshift(results)

    localStorage.setItem(this.storageKey, JSON.stringify(data))

    return results
  }

  static getAllVideo() {
    return this.existData
  }
}

export default Cloudinary
