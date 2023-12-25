import { io } from 'socket.io-client'

class SocketService {
  socket: any

  setupSocketConnection() {
    this.socket = io('http://localhost:4080', {
      transports: ['websocket'],
      secure: true
    })
    this.socketConnectionEvents()
  }

  socketConnectionEvents() {
    this.socket.on('connect', () => {
      console.log('connected')
    })

    this.socket.on('disconnect', (reason: any) => {
      console.log(`Reason: ${reason}`)
      this.socket.connect()
    })

    this.socket.on('connect_error', (error: any) => {
      console.log(`Error: ${error}`)
      this.socket.connect()
    })
  }
}

export default new SocketService()
