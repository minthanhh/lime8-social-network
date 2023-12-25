import { giphyService } from '../api/gifs/gifphy.service'

export class GiphyUtils {
  static async getTrendingGifs(setGifs: any, setLoading: any) {
    setLoading(true)
    try {
      const response = await giphyService.trending()
      setGifs(response.data.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  static async searchGifs(gif: any, setGifs: any, setLoading: any) {
    if (gif.length <= 1) {
      GiphyUtils.getTrendingGifs(setGifs, setLoading)
      return
    }
    setLoading(true)
    try {
      const response = await giphyService.search(gif)
      setGifs(response.data.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
}
