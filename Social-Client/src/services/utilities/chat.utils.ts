import { cloneDeep, find, findIndex, remove } from 'lodash'
import socketService from '../socket/socket.service'
import { createSearchParams } from 'react-router-dom'
import chatService from '../api/chat/chat.service'

export class ChatUtils {
  static privateChatMessages: any[] = []
  static chatUsers: any[] = []

  static usersOnline(setOnlineUsers: any) {
    socketService?.socket?.on('user online', (data: any) => {
      setOnlineUsers(data)
    })
  }
  static usersOnChatPage() {
    socketService?.socket?.on('add chat users', (data: any) => {
      ChatUtils.chatUsers = [...data]
    })
  }
  static joinRoomEvent(user: any, profile: any) {
    const users = {
      receiverId: user.receiverId,
      receiverName: user.receiverUsername,
      senderId: profile?._id,
      senderName: profile?.username
    }
    socketService?.socket?.emit('join room', users)
  }
  static emitChatPageEvent(event: any, data: any) {
    socketService?.socket?.emit(event, data)
  }
  static chatUrlParams(user: any, profile: any) {
    const params = { username: '', id: '' }
    if (user.receiverUsername === profile?.username) {
      params.username = user.senderUsername.toLowerCase()
      params.id = user.senderId
    } else {
      params.username = user.receiverUsername.toLowerCase()
      params.id = user.receiverId
    }
    return params
  }

  static messageData({
    receiver,
    message,
    searchParamsId,
    conversationId,
    chatMessages,
    isRead,
    gifUrl,
    selectedImage
  }: any) {
    const chatConversationId = find(
      chatMessages,
      (chat) => chat.receiverId === searchParamsId || chat.senderId === searchParamsId
    )

    const messageData = {
      conversationId: chatConversationId ? chatConversationId.conversationId : conversationId,
      receiverId: receiver?._id,
      receiverUsername: receiver?.username,
      receiverAvatarColor: receiver?.avatarColor,
      receiverProfilePicture: receiver?.profilePicture,
      content: message.trim(),
      isRead,
      gifUrl,
      selectedImage
    }
    return messageData
  }

  static updatedSelectedChatUser({
    chatMessageList,
    profile,
    username,
    setSelectedChatUser,
    params,
    pathname,
    navigate,
    dispatch
  }: any) {
    if (chatMessageList.length) {
      dispatch(setSelectedChatUser({ isLoading: false, user: chatMessageList[0] }))
      navigate(`${pathname}?${createSearchParams(params)}`)
    } else {
      dispatch(setSelectedChatUser({ isLoading: false, user: null }))
      const sender = find(
        ChatUtils.chatUsers,
        (user) => user.userOne === profile?.username && user.userTwo.toLowerCase() === username
      )
      if (sender) {
        chatService.removeChatUsers(sender)
      }
    }
  }

  static socketIOChatList(profile: any, chatMessageList: any, setChatMessageList: any) {
    socketService?.socket?.on('chat list', (data: any) => {
      if (data.senderUsername === profile?.username || data.receiverUsername === profile?.username) {
        const messageIndex = findIndex(chatMessageList, ['conversationId', data.conversationId])
        chatMessageList = cloneDeep(chatMessageList)
        if (messageIndex > -1) {
          remove(chatMessageList, (chat: any) => chat.conversationId === data.conversationId)
          chatMessageList = [data, ...chatMessageList]
        } else {
          remove(chatMessageList, (chat: any) => chat.receiverUsername === data.receiverUsername)
          chatMessageList = [data, ...chatMessageList]
        }
        setChatMessageList(chatMessageList)
      }
    })
  }

  static socketIOMessageReceived(chatMessages: any, username: any, setConversationId: any, setChatMessages: any) {
    chatMessages = cloneDeep(chatMessages)
    socketService?.socket?.on('message received', (data: any) => {
      if (data.senderUsername.toLowerCase() === username || data.receiverUsername.toLowerCase() === username) {
        setConversationId(data.conversationId)
        ChatUtils.privateChatMessages.push(data)
        chatMessages = [...ChatUtils.privateChatMessages]
        setChatMessages(chatMessages)
      }
    })

    socketService?.socket?.on('message read', (data: any) => {
      if (data.senderUsername.toLowerCase() === username || data.receiverUsername.toLowerCase() === username) {
        const findMessageIndex = findIndex(ChatUtils.privateChatMessages, ['_id', data._id])
        if (findMessageIndex > -1) {
          ChatUtils.privateChatMessages.splice(findMessageIndex, 1, data)
          chatMessages = [...ChatUtils.privateChatMessages]
          setChatMessages(chatMessages)
        }
      }
    })
  }

  static socketIOMessageReaction(chatMessages: any, username: any, setConversationId: any, setChatMessages: any) {
    socketService?.socket?.on('message reaction', (data: any) => {
      if (data.senderUsername.toLowerCase() === username || data.receiverUsername.toLowerCase() === username) {
        chatMessages = cloneDeep(chatMessages)
        setConversationId(data.conversationId)
        const messageIndex = findIndex(chatMessages, (message: any) => message?._id === data._id)
        if (messageIndex > -1) {
          chatMessages.splice(messageIndex, 1, data)
          setChatMessages(chatMessages)
        }
      }
    })
  }
}
