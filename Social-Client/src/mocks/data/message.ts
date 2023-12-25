import { MessageDocument } from 'src/interfaces/message.interface'

export const Messages: MessageDocument[] = [
  {
    id: 'messageId1',
    receiverId: 'idCuaBao',
    isRead: true,
    senderAvatarColor:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    receiverAvatarColor:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    content: 'Hé lô bạn lế gia báo',
    senderUsername: 'Hồ Minh Thành',
    receiverUsername: 'Lê Gia Bảo',
    receiverProfilePicture: '',
    gifUrl: '',
    reactions: {
      angry: 0,
      happy: 0,
      like: 0,
      love: 0,
      sad: 0,
      wow: 0
    },
    deleteForMe: false,
    conversationId: 'conversationId1',
    senderId: '6539fbc7d4bb48295407855f',
    selectedImage: '',
    createdAt: new Date(),
    deletedForEveryone: false
  },
  {
    id: 'messageId2',
    receiverId: '6539fbc7d4bb48295407855f',
    isRead: true,
    senderAvatarColor:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    receiverAvatarColor:
      'https://images.unsplash.com/photo-1552053831-71594a27632d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60',
    content: 'Sao em em thích hé lô hông?',
    senderUsername: 'Lê Gia Bảo',
    receiverUsername: 'Hồ Minh Thành',
    receiverProfilePicture: '',
    gifUrl: '',
    reactions: {
      angry: 0,
      happy: 0,
      like: 0,
      love: 0,
      sad: 0,
      wow: 0
    },
    deleteForMe: false,
    conversationId: 'conversationId2',
    senderId: 'idCuaBao',
    selectedImage: '',
    createdAt: new Date(),
    deletedForEveryone: false
  }
]

export const ListFriendMocks = [
  {
    id: 'idCuaLoi',
    username: '',
    fullName: 'Lợi Lắc Đắc',
    profilePicture:
      'https://images.unsplash.com/photo-1682686578289-cf9c8c472c9b?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8',
    presence: false
  },
  {
    id: 'idCuaBao',
    username: '',
    fullName: 'Lê bảo gấu',
    profilePicture:
      'https://images.unsplash.com/photo-1682686578289-cf9c8c472c9b?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8',
    presence: false
  },
  {
    id: 'idCuaTrung',
    username: '',
    fullName: 'Trung chó dí',
    profilePicture:
      'https://images.unsplash.com/photo-1682686578289-cf9c8c472c9b?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8',
    presence: false
  },
  {
    id: 'idCuaDi',
    username: '',
    fullName: 'Trung dí bảo',
    profilePicture:
      'https://images.unsplash.com/photo-1682686578289-cf9c8c472c9b?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHwxfHx8ZW58MHx8fHx8',
    presence: false
  }
]
