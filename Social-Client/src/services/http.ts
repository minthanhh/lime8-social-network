import axios, { type AxiosInstance } from 'axios'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:4080/api/v1/',
      withCredentials: true
    })
  }
}
const http = new Http()
export default http.instance
