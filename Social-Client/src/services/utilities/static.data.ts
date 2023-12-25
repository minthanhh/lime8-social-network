import Icons from 'src/assets/icons'
import like from 'src/assets/reactions/like.gif'
import wow from 'src/assets/reactions/wow.gif'
import happy from 'src/assets/reactions/haha.gif'
import sad from 'src/assets/reactions/sad.gif'
import angry from 'src/assets/reactions/angry.gif'
import love from 'src/assets/reactions/heart.gif'

export const AvatarColor = [
  '#f44336',
  '#e91e63',
  '#2196f3',
  '#9c27b0',
  '#3f51b5',
  '#00bcd4',
  '#4caf50',
  '#ff9800',
  '#8bc34a',
  '#009688',
  '#03a9f4',
  '#cddc39',
  '#2962ff',
  '#448aff',
  '#84ffff',
  '#00e676',
  '#43a047',
  '#d32f2f',
  '#ff1744',
  '#ad1457',
  '#6a1b9a',
  '#1a237e',
  '#1de9b6',
  '#d84315'
]

export const PrivacyList = [
  {
    icon: Icons.Privacy.Public,
    label: 'Công khai',
    description: 'Bất kì ai ở trên hoặc ngoài Lime8',
    value: 'public'
  },
  {
    icon: Icons.Privacy.Friends,
    label: 'Bạn bè',
    description: 'Bạn bè của bạn trên Lime8',
    value: 'friends'
  },
  {
    icon: Icons.Privacy.FriendsExcept,
    label: 'Bạn bè ngoại trừ',
    description: 'Không hiển thị với một số bạn bè',
    value: 'except'
  },
  {
    icon: Icons.Privacy.SpecificFriends,
    label: 'Bạn bè cụ thể',
    description: 'Chỉ hiển thị với một số bạn bè',
    value: 'specific'
  },
  {
    icon: Icons.Privacy.OnlyMe,
    label: 'Chỉ mình tôi',
    value: 'onlyMe'
  }
]

export const FeelingList = [
  {
    name: 'Hạnh phúc',
    icon: '🤣'
  },
  {
    name: 'Buồn tình',
    icon: '😍'
  },
  {
    name: 'Tức giận',
    icon: '🤬'
  },
  {
    name: 'bất ngờ',
    icon: '😊'
  },
  {
    name: 'Đang mắc địch',
    icon: '👌'
  },
  {
    name: 'yêu thương',
    icon: '❤️'
  }
]

export const PostList = [
  {
    post: 'Lợi thật xinh đẹp như nàng tiên cá',
    id: 1,
    fullName: 'Ngô Lê Lợi',
    profilePicture: '',
    quote: 'Hải phòng không lòng vòng',
    privacy: 'Public',
    imgPost:
      'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-6/362998647_1199336594072065_3860460511219135481_n.jpg?stp=c0.119.1440.1440a_dst-jpg_s552x414&_nc_cat=104&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Lz7LMuawixEAX-Dne4g&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfAjpBfnXf4hMxqylzNsLhx7blElnEOCNXKgvUCmd_rVSw&oe=653FAA16'
  },
  {
    id: 2,
    fullName: 'Lê Thị Mỹ Tho',
    quote: 'Bé iu của bảo',
    privacy: 'Public',
    imgPost: 'https://i.pinimg.com/474x/9e/93/ed/9e93eda9ebdca2b9e612c52187207287.jpg',
    profilePicture: 'https://i.pinimg.com/474x/52/1f/7e/521f7e14bf2032715aefc35245f95d2b.jpg'
  }
]

export const StoryList = [
  {
    id: 1,
    avatar:
      'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5pbWFsfGVufDB8fDB8fHww',
    username: 'Jisoo',
    justPostedNow: false
  },
  {
    id: 3,
    avatar:
      'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW5pbWFsfGVufDB8fDB8fHww',
    username: 'Rose',
    justPostedNow: false
  },
  {
    id: 4,
    avatar:
      'https://images.unsplash.com/photo-1555169062-013468b47731?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5pbWFsfGVufDB8fDB8fHww',
    username: 'leola',
    justPostedNow: false
  },
  {
    id: 5,
    avatar:
      'https://plus.unsplash.com/premium_photo-1675432656807-216d786dd468?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YW5pbWFsfGVufDB8fDB8fHww',
    username: 'lisa',
    justPostedNow: false
  },
  {
    id: 10,
    avatar:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFuaW1hbHxlbnwwfHwwfHx8MA%3D%3D',
    username: 'mono',
    justPostedNow: false
  },
  {
    id: 6,
    avatar:
      'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFuaW1hbHxlbnwwfHwwfHx8MA%3D%3D',
    username: 'sontum',
    justPostedNow: true
  },
  {
    id: 7,
    avatar:
      'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFuaW1hbHxlbnwwfHwwfHx8MA%3D%3D',
    username: 'sontum',
    justPostedNow: true
  },
  {
    id: 8,
    avatar:
      'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFuaW1hbHxlbnwwfHwwfHx8MA%3D%3D',
    username: 'sontum',
    justPostedNow: true
  }
]

export const SuggesList = [
  {
    id: 1,
    avatar:
      'https://images.unsplash.com/photo-1474511320723-9a56873867b5?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YW5pbWFsfGVufDB8fDB8fHww',
    username: 'Jisoo',
    justPostedNow: false
  },
  {
    id: 3,
    avatar:
      'https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YW5pbWFsfGVufDB8fDB8fHww',
    username: 'Rose',
    justPostedNow: false
  },
  {
    id: 4,
    avatar:
      'https://images.unsplash.com/photo-1555169062-013468b47731?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YW5pbWFsfGVufDB8fDB8fHww',
    username: 'leola',
    justPostedNow: false
  },
  {
    id: 5,
    avatar:
      'https://plus.unsplash.com/premium_photo-1675432656807-216d786dd468?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YW5pbWFsfGVufDB8fDB8fHww',
    username: 'lisa',
    justPostedNow: false
  },
  {
    id: 10,
    avatar:
      'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGFuaW1hbHxlbnwwfHwwfHx8MA%3D%3D',
    username: 'mono',
    justPostedNow: false
  },
  {
    id: 6,
    avatar:
      'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFuaW1hbHxlbnwwfHwwfHx8MA%3D%3D',
    username: 'sontum',
    justPostedNow: true
  },
  {
    id: 7,
    avatar:
      'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFuaW1hbHxlbnwwfHwwfHx8MA%3D%3D',
    username: 'sontum',
    justPostedNow: true
  },
  {
    id: 8,
    avatar:
      'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&q=60&w=500&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFuaW1hbHxlbnwwfHwwfHx8MA%3D%3D',
    username: 'sontum',
    justPostedNow: true
  }
]

export const ListFollow = [
  {
    id: 1,
    avatar: 'https://i.pinimg.com/474x/d0/e5/dd/d0e5ddcfc87427eabe0dbc6b110a04bc.jpg',
    fullName: 'Minh Thành',
    friends: [
      {
        id: 1,
        avatar: 'https://i.pinimg.com/474x/c2/85/78/c28578d3c5d0333a7ec4b3e94f48f3e5.jpg'
      },
      {
        id: 2,
        avatar: 'https://i.pinimg.com/474x/fe/da/09/feda09c956a3baa1cff9f1e4a0509d20.jpg'
      },
      {
        id: 3,
        avatar: 'https://i.pinimg.com/474x/30/38/a1/3038a15f0479f8514136ab1f16097347.jpg'
      }
    ]
  },
  {
    id: 2,
    avatar: 'https://i.pinimg.com/474x/95/2b/a4/952ba4a2a9c044c45ec41d0ce533951c.jpg',
    fullName: 'Mỹ Duyên',
    friends: [
      {
        id: 1,
        avatar: 'https://i.pinimg.com/474x/c2/85/78/c28578d3c5d0333a7ec4b3e94f48f3e5.jpg'
      },
      {
        id: 2,
        avatar: 'https://i.pinimg.com/474x/fe/da/09/feda09c956a3baa1cff9f1e4a0509d20.jpg'
      },
      {
        id: 3,
        avatar: 'https://i.pinimg.com/474x/30/38/a1/3038a15f0479f8514136ab1f16097347.jpg'
      }
    ]
  },
  {
    id: 3,
    avatar: 'https://i.pinimg.com/474x/5d/74/fe/5d74fe82c0a24a3f03a8938cbec4ac9b.jpg',
    fullName: 'Lợi Xuân',
    friends: [
      {
        id: 1,
        avatar: 'https://i.pinimg.com/474x/c2/85/78/c28578d3c5d0333a7ec4b3e94f48f3e5.jpg'
      },
      {
        id: 2,
        avatar: 'https://i.pinimg.com/474x/fe/da/09/feda09c956a3baa1cff9f1e4a0509d20.jpg'
      },
      {
        id: 3,
        avatar: 'https://i.pinimg.com/474x/30/38/a1/3038a15f0479f8514136ab1f16097347.jpg'
      }
    ]
  },
  {
    id: 4,
    avatar: 'https://i.pinimg.com/474x/7c/e0/76/7ce07667632333a9a60c26bb54011ad3.jpg',
    fullName: 'LeeBao',
    friends: [
      {
        id: 1,
        avatar: 'https://i.pinimg.com/474x/c2/85/78/c28578d3c5d0333a7ec4b3e94f48f3e5.jpg'
      },
      {
        id: 2,
        avatar: 'https://i.pinimg.com/474x/fe/da/09/feda09c956a3baa1cff9f1e4a0509d20.jpg'
      },
      {
        id: 3,
        avatar: 'https://i.pinimg.com/474x/30/38/a1/3038a15f0479f8514136ab1f16097347.jpg'
      }
    ]
  },
  {
    id: 5,
    avatar: 'https://i.pinimg.com/474x/d2/2e/14/d22e1421474ee8df0fda089fcc3f64e1.jpg',
    fullName: 'Moving',
    friends: [
      {
        id: 1,
        avatar: 'https://i.pinimg.com/474x/c2/85/78/c28578d3c5d0333a7ec4b3e94f48f3e5.jpg'
      },
      {
        id: 2,
        avatar: 'https://i.pinimg.com/474x/fe/da/09/feda09c956a3baa1cff9f1e4a0509d20.jpg'
      },
      {
        id: 3,
        avatar: 'https://i.pinimg.com/474x/30/38/a1/3038a15f0479f8514136ab1f16097347.jpg'
      }
    ]
  },
  {
    id: 6,
    avatar: 'https://i.pinimg.com/474x/ad/2e/c1/ad2ec15749150014b0eb4a01c2a2ed6b.jpg',
    fullName: 'Vạn Thành',
    friends: [
      {
        id: 1,
        avatar: 'https://i.pinimg.com/474x/c2/85/78/c28578d3c5d0333a7ec4b3e94f48f3e5.jpg'
      },
      {
        id: 2,
        avatar: 'https://i.pinimg.com/474x/fe/da/09/feda09c956a3baa1cff9f1e4a0509d20.jpg'
      },
      {
        id: 3,
        avatar: 'https://i.pinimg.com/474x/30/38/a1/3038a15f0479f8514136ab1f16097347.jpg'
      }
    ]
  },
  {
    id: 7,
    avatar: 'https://i.pinimg.com/474x/e9/0a/24/e90a24c4f3c024c3c1fa58e25424553a.jpg',
    fullName: 'Hải Cường',
    friends: [
      {
        id: 1,
        avatar: 'https://i.pinimg.com/474x/c2/85/78/c28578d3c5d0333a7ec4b3e94f48f3e5.jpg'
      },
      {
        id: 2,
        avatar: 'https://i.pinimg.com/474x/fe/da/09/feda09c956a3baa1cff9f1e4a0509d20.jpg'
      },
      {
        id: 3,
        avatar: 'https://i.pinimg.com/474x/30/38/a1/3038a15f0479f8514136ab1f16097347.jpg'
      }
    ]
  },
  {
    id: 8,
    avatar: 'https://i.pinimg.com/474x/33/d6/a3/33d6a3ce454d15f37afac4d75cc814a4.jpg',
    fullName: 'Chung Vi',
    friends: [
      {
        id: 1,
        avatar: 'https://i.pinimg.com/474x/c2/85/78/c28578d3c5d0333a7ec4b3e94f48f3e5.jpg'
      },
      {
        id: 2,
        avatar: 'https://i.pinimg.com/474x/fe/da/09/feda09c956a3baa1cff9f1e4a0509d20.jpg'
      },
      {
        id: 3,
        avatar: 'https://i.pinimg.com/474x/30/38/a1/3038a15f0479f8514136ab1f16097347.jpg'
      }
    ]
  },
  {
    id: 9,
    avatar: 'https://i.pinimg.com/474x/03/57/0b/03570b3c4abf73e5c23acbc669df8051.jpg',
    fullName: 'Thaỏ Thành',
    friends: [
      {
        id: 1,
        avatar: 'https://i.pinimg.com/474x/c2/85/78/c28578d3c5d0333a7ec4b3e94f48f3e5.jpg'
      },
      {
        id: 2,
        avatar: 'https://i.pinimg.com/474x/fe/da/09/feda09c956a3baa1cff9f1e4a0509d20.jpg'
      },
      {
        id: 3,
        avatar: 'https://i.pinimg.com/474x/30/38/a1/3038a15f0479f8514136ab1f16097347.jpg'
      }
    ]
  },
  {
    id: 10,
    avatar: 'https://i.pinimg.com/474x/b4/96/a9/b496a9537226f58abea355c8da21e262.jpg',
    fullName: 'Mèo con đáng iu',
    friends: [
      {
        id: 1,
        avatar: 'https://i.pinimg.com/474x/c2/85/78/c28578d3c5d0333a7ec4b3e94f48f3e5.jpg'
      },
      {
        id: 2,
        avatar: 'https://i.pinimg.com/474x/fe/da/09/feda09c956a3baa1cff9f1e4a0509d20.jpg'
      },
      {
        id: 3,
        avatar: 'https://i.pinimg.com/474x/30/38/a1/3038a15f0479f8514136ab1f16097347.jpg'
      }
    ]
  },
  {
    id: 11,
    avatar: 'https://i.pinimg.com/474x/1e/71/10/1e71102c66c13c93952824521513dca9.jpg',
    fullName: 'Thanh Thảo',
    friends: [
      {
        id: 1,
        avatar: 'https://i.pinimg.com/474x/c2/85/78/c28578d3c5d0333a7ec4b3e94f48f3e5.jpg'
      },
      {
        id: 2,
        avatar: 'https://i.pinimg.com/474x/fe/da/09/feda09c956a3baa1cff9f1e4a0509d20.jpg'
      },
      {
        id: 3,
        avatar: 'https://i.pinimg.com/474x/30/38/a1/3038a15f0479f8514136ab1f16097347.jpg'
      }
    ]
  },
  {
    id: 12,
    avatar: 'https://i.pinimg.com/474x/d7/a2/16/d7a216eed472a0438f08b4941c90c7b0.jpg',
    fullName: 'Thiên Thần',
    friends: [
      {
        id: 1,
        avatar: 'https://i.pinimg.com/474x/c2/85/78/c28578d3c5d0333a7ec4b3e94f48f3e5.jpg'
      },
      {
        id: 2,
        avatar: 'https://i.pinimg.com/474x/fe/da/09/feda09c956a3baa1cff9f1e4a0509d20.jpg'
      },
      {
        id: 3,
        avatar: 'https://i.pinimg.com/474x/30/38/a1/3038a15f0479f8514136ab1f16097347.jpg'
      }
    ]
  },
  {
    id: 13,
    avatar: 'https://i.pinimg.com/474x/af/9a/31/af9a313a6b1ced136aa73e10267b0091.jpg',
    fullName: 'Cu Cường',
    friends: [
      {
        id: 1,
        avatar: 'https://i.pinimg.com/474x/c2/85/78/c28578d3c5d0333a7ec4b3e94f48f3e5.jpg'
      },
      {
        id: 2,
        avatar: 'https://i.pinimg.com/474x/fe/da/09/feda09c956a3baa1cff9f1e4a0509d20.jpg'
      },
      {
        id: 3,
        avatar: 'https://i.pinimg.com/474x/30/38/a1/3038a15f0479f8514136ab1f16097347.jpg'
      }
    ]
  },
  {
    id: 14,
    avatar: 'https://i.pinimg.com/474x/a4/cf/e6/a4cfe6c92d053ffc6065dd15b4c96973.jpg',
    fullName: 'Ác Quỷ Trong Em',
    friends: [
      {
        id: 1,
        avatar: 'https://i.pinimg.com/474x/c2/85/78/c28578d3c5d0333a7ec4b3e94f48f3e5.jpg'
      },
      {
        id: 2,
        avatar: 'https://i.pinimg.com/474x/fe/da/09/feda09c956a3baa1cff9f1e4a0509d20.jpg'
      },
      {
        id: 3,
        avatar: 'https://i.pinimg.com/474x/30/38/a1/3038a15f0479f8514136ab1f16097347.jpg'
      }
    ]
  },
  {
    id: 15,
    avatar: 'https://i.pinimg.com/474x/67/d7/47/67d7474f84a8cbf9c454db546f201037.jpg',
    fullName: 'LuXuRy',
    friends: [
      {
        id: 1,
        avatar: 'https://i.pinimg.com/474x/c2/85/78/c28578d3c5d0333a7ec4b3e94f48f3e5.jpg'
      },
      {
        id: 2,
        avatar: 'https://i.pinimg.com/474x/fe/da/09/feda09c956a3baa1cff9f1e4a0509d20.jpg'
      },
      {
        id: 3,
        avatar: 'https://i.pinimg.com/474x/30/38/a1/3038a15f0479f8514136ab1f16097347.jpg'
      }
    ]
  },
  {
    id: 16,
    avatar: 'https://i.pinimg.com/474x/4d/ad/00/4dad00978dc3639729edd6102ca100b9.jpg',
    fullName: 'Hoài Thương',
    friends: [
      {
        id: 1,
        avatar: 'https://i.pinimg.com/474x/c2/85/78/c28578d3c5d0333a7ec4b3e94f48f3e5.jpg'
      },
      {
        id: 2,
        avatar: 'https://i.pinimg.com/474x/fe/da/09/feda09c956a3baa1cff9f1e4a0509d20.jpg'
      },
      {
        id: 3,
        avatar: 'https://i.pinimg.com/474x/30/38/a1/3038a15f0479f8514136ab1f16097347.jpg'
      }
    ]
  },
  {
    id: 17,
    avatar: 'https://i.pinimg.com/474x/3e/66/c4/3e66c4b6483271f52c41976832d09e9a.jpg',
    fullName: 'Uyên Lee',
    friends: [
      {
        id: 1,
        avatar: 'https://i.pinimg.com/474x/c2/85/78/c28578d3c5d0333a7ec4b3e94f48f3e5.jpg'
      },
      {
        id: 2,
        avatar: 'https://i.pinimg.com/474x/fe/da/09/feda09c956a3baa1cff9f1e4a0509d20.jpg'
      },
      {
        id: 3,
        avatar: 'https://i.pinimg.com/474x/30/38/a1/3038a15f0479f8514136ab1f16097347.jpg'
      }
    ]
  }
]

export const reactionsMap: any = {
  like,
  love,
  wow,
  sad,
  happy,
  angry
}
