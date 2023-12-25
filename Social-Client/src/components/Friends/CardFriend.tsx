import { Button } from '..'
interface CardFriendProps {
  avatar: string
  id?: number
  fullName: string
  followers: number
  following: number
  onClick?: () => void
  text: string
}
const CardFriend = ({ avatar, fullName, followers, following, onClick, text }: CardFriendProps) => {
  return (
    <div className='flex gap-2 items-center w-full bg-light dark:bg-dark shadow-shadowMain rounded-md p-2 sm:p-3'>
      <div className='relative sm:rounded-md overflow-hidden rounded-full w-20 sm:h-20'>
        <div className='aspect-square pt-[100%]'>
          <img className='absolute flex-shrink-0 inset-0 w-full h-full object-cover' src={avatar} alt='' />
        </div>
      </div>

      <div className='flex flex-col flex-1'>
        <h4 className='text-base sm:text-sm font-semibold text-dark dark:text-light mb-1'>{fullName}</h4>
        <span className='flex items-center gap-2 mb-3'>
          <span className='text-xs text-dark dark:text-light'>Followers: {followers}</span>
          <span className='text-xs text-dark dark:text-light'>Followings: {following}</span>
        </span>
        <Button
          onClick={onClick}
          className='text-xs ml-auto text-right sm:ml-0 py-1.5 px-3 w-max'
          rounded='rounded-md sm:rounded-lg'
        >
          {text}
        </Button>
      </div>
    </div>
  )
}

export default CardFriend
