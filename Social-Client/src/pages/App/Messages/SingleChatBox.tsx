import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import MoreSvg from 'src/assets/icons/components/MoreSvg'
import CallSvg from 'src/assets/icons/components/messages/CallSvg'
import IconSvg from 'src/assets/icons/components/messages/IconSvg'
import LinkSvg from 'src/assets/icons/components/messages/LinkSvg'
import PhoneSvg from 'src/assets/icons/components/messages/PhoneSvg'
import { SearchSvg, SendSvg } from 'src/components/icons'
import { useAppSelector } from 'src/hooks/useRedux'
import { Messages } from 'src/mocks/data/message'
import { RootState } from 'src/store'

const SingleChatBox = () => {
  const profile = useAppSelector((state: RootState) => state.user.profile)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const navigate = useNavigate()

  const { receiverId } = useParams()

  const messages = Messages.filter(
    (item) =>
      (item.senderId === receiverId && profile._id === item.receiverId) ||
      (item.receiverId === receiverId && profile._id === item.senderId)
  )

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (windowWidth > 567) {
      navigate('/message')
    }
  }, [windowWidth, navigate])

  return (
    <div className='w-full flex flex-col h-screen bg-light dark:bg-[#0C0F1D] flex-1'>
      <header className='flex items-center justify-between px-6 my-5'>
        {/* <User
          username={messages?.receiverUsername || ''}
          source={conversation?.receiverAvatarColor || ''}
          alt={conversation?.receiverUsername || ''}
          presence='active'
        >
          <span className='text-xs text-dark font-normal'>Online</span>
        </User> */}
        <div className='flex items-center gap-4'>
          <span>
            <SearchSvg width='24px' height='24px' />
          </span>
          <span>
            <CallSvg width='24px' height='28px' />
          </span>
          <span>
            <PhoneSvg width='22px' height='22px' />
          </span>
          <span>
            <MoreSvg width='24px' height='5px' />
          </span>
        </div>
      </header>
      {/* Chat Box */}
      <div className='flex flex-col h-full overflow-auto px-6'>
        <div className='flex flex-col gap-4'>
          {messages.map((message) => (
            <div
              key={message.id}
              className={clsx(
                'rounded-full px-4 py-2 w-max text-sm font-normal',
                message.senderId === profile._id
                  ? 'ml-auto style-bg-main text-light'
                  : 'mr-auto dark:bg-messageDark bg-messageLight text-dark dark:text-light'
              )}
            >
              {message.content}
            </div>
          ))}
        </div>
      </div>
      {/* Input Chat */}
      <div className='flex items-center w-full gap-6 mt-auto px-6 py-6'>
        <div className='base-border-main flex flex-1'>
          <div className='bg-inputLight dark:bg-inputDark w-full flex items-center rounded-full'>
            <span className='px-6'>
              <LinkSvg height='24px' width='24px' />
            </span>
            <input
              type='text'
              placeholder='Type a message here...'
              className='outline-none border-none bg-transparent py-1.5 flex-1'
            />
            <button className='px-6 relative' onClick={() => {}}>
              <IconSvg height='24px' width='24px' />
            </button>
          </div>
        </div>

        <span>
          <SendSvg height='32' width='32' />
        </span>
      </div>
    </div>
  )
}

export default SingleChatBox
