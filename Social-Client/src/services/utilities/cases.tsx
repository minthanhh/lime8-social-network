import Icons from 'src/assets/icons'

enum Privacy {
  EXCEPT = 'except',
  ONLYME = 'onlyMe',
  SPECIFIC = 'specific',
  FRIENDS = 'friends'
}

export function privacyCase(privacy: string) {
  switch (privacy) {
    case Privacy.EXCEPT:
      return (
        <div className='flex items-center gap-2'>
          <Icons.Privacy.FriendsExcept width='20' height='20' className='fill-light' />
          Bạn bè ngoại trừ
        </div>
      )
    case Privacy.ONLYME:
      return (
        <div className='flex items-center gap-2'>
          <Icons.Privacy.OnlyMe width='20' height='20' className='fill-light' />
          Chỉ mình tôi
        </div>
      )
    case Privacy.FRIENDS:
      return (
        <div className='flex items-center gap-2'>
          <Icons.Privacy.Friends width='20' height='20' className='fill-light' />
          Bạn bè
        </div>
      )
    case Privacy.SPECIFIC:
      return (
        <div className='flex items-center gap-2'>
          <Icons.Privacy.SpecificFriends width='20' height='20' className='fill-light' />
          Bạn bè cụ thể
        </div>
      )
    default:
      return (
        <div className='flex items-center gap-2'>
          <Icons.Privacy.Public width='20' height='20' className='fill-light' />
          Mọi người
        </div>
      )
  }
}
