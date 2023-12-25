import MoreSvg from 'src/assets/icons/components/MoreSvg'
import User from '../../User/User'

interface ChatBoxProps {
  onClick?: () => void
  username: string
  avatar: string
}

const ChatBox = ({ avatar, username, onClick }: ChatBoxProps) => {
  return (
    <button
      onClick={onClick}
      className='bg-chatBoxLight dark:bg-chatBoxDark shadow-md w-full px-4 rounded-lg flex flex-1 h-max py-4 items-center'
    >
      <User className='flex-1' username={username} alt={'User'} source={avatar} presence={'active'}>
        <span className='text-ellipsis line-clamp-1 flex-1 text-dark dark:text-light text-xs font-light'>{'text'}</span>
      </User>
      <span className='cursor-pointer p-1'>
        <MoreSvg fill='#99999999' opacity='0.6' width='20px' height='4px' />
      </span>
    </button>
  )
}

export default ChatBox
