import { SocketContext } from './socket.context'
import { io } from 'socket.io-client'

const socket = io('http://localhost:4080', {
  transports: ['websocket'],
  secure: true
})

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  return <SocketContext.Provider value={{ socket }}>{children}</SocketContext.Provider>
}
