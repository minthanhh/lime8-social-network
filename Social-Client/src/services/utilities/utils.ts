import { addUser, clearUser } from 'src/store/slices/user/user.slice'
import { AvatarColor } from './static.data'
import { floor, random, some } from 'lodash'

export default class Utils {
  static randomAvatarColor() {
    return AvatarColor[floor(random(0.9) * AvatarColor.length)]
  }
  static generateAvatar(text: string, foregroundColor: string, backgroundColor: string) {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d') as CanvasRenderingContext2D

    canvas.width = 200
    canvas.height = 200

    context.fillStyle = backgroundColor
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.font = 'bold 100px Poppins'
    context.fillStyle = foregroundColor
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(text, canvas.width / 2, canvas.height / 2)

    return canvas.toDataURL('image/png')
  }
  static dispatchUser({ response, pageReload, dispatch, setUser }: any) {
    pageReload(true)
    dispatch(addUser({ token: response.data.token, profile: response.data.user }))
    setUser(response.data.user)
  }
  static clearStore({ dispatch, deleteStorageUsername, deleteSessionPageReload, setLoggedIn }: any) {
    dispatch(clearUser())
    deleteStorageUsername()
    deleteSessionPageReload()
    setLoggedIn(false)
  }
  static appImageUrl(version: string, id: string, type?: string) {
    if (typeof version === 'string' && typeof id === 'string') {
      version = version.replace(/['"]+/g, '')
      id = id.replace(/['"]+/g, '')
    }
    return `https://res.cloudinary.com/dgyk7uloc/${type === 'video' ? 'video' : 'image'}/upload/v${version}/${id}`
  }
  static checkIfUserIsOnline(username: any, onlineUsers: any) {
    return some(onlineUsers, (user) => user === username?.toLowerCase())
  }
  static generateString(length: number) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ' '
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
  }
}
