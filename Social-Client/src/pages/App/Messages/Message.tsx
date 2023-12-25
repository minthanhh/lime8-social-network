import { useEffect, useState } from 'react'
import AddFriend from 'src/assets/icons/components/AddFriend'
import SearchMessageSvg from 'src/assets/icons/components/SearchMessageSvg'
import BellSvg from 'src/assets/icons/components/messages/BellSvg'
import IconSvg from 'src/assets/icons/components/messages/IconSvg'
import LinkSvg from 'src/assets/icons/components/messages/LinkSvg'
import MoreSvg from 'src/assets/icons/components/MoreSvg'
import CallSvg from 'src/assets/icons/components/messages/CallSvg'
import PhoneSvg from 'src/assets/icons/components/messages/PhoneSvg'
import LockSvg from 'src/assets/icons/components/messages/LockSvg'
import ReportSvg from 'src/assets/icons/components/messages/ReportSvg'
import TrashSvg from 'src/assets/icons/components/messages/TrashSvg'
import ChatBox from 'src/components/Messages/ChatBox'
import User from 'src/components/User/User'
import UserPresence from 'src/components/User/UserPresence'
import { useAppSelector } from 'src/hooks/useRedux'
import { SearchSvg, SendSvg } from 'src/components/icons'

import { ListFriendMocks } from 'src/mocks/data/message'
import { RootState } from 'src/store'
import { Link } from 'react-router-dom'

const Message = () => {
  const [selectChatBox, setSelectChatBox] = useState<string>('')

  const profile = useAppSelector((state: RootState) => state.user.profile)

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div className='w-full flex h-full overflow-x-hidden'>
      {/* Navigation Messages */}
      <div className='w-full flex-col sm:w-[350px] bg-light dark:bg-darkMessage shadow-lg h-screen overflow-y-auto flex-shrink-0'>
        {/* Avatar User */}
        <User
          alt='User'
          username='Eminem'
          sloggan='10 things you should remember!'
          className='my-5 px-6'
          source='https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQjVCJMbseIAEjcb1XuiGMc87zPg0WFJTeJ7frMFIGTBM5ul7VRr8CAiCZHvyxif6IJKs0dzuCPYGZjXZE'
        />
        <div className='after:m-0 base-border-main h-[1px]'></div>

        <div className='flex items-start flex-col w-full my-5 h-[80%]'>
          {/* Frients Presence */}
          <div className='w-full mb-5 px-6'>
            <p className='font-semibold text-dark text-sm mb-2 dark:text-light'>Online now</p>
            <div className='flex overflow-x-scroll w-full base-hidden-scroll items-center overflow-y-hidden gap-3 p-[2px] relative'>
              {Array(8)
                .fill({})
                .map((_, index) => (
                  <UserPresence
                    key={index}
                    alt=''
                    presence='active'
                    source='https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQjVCJMbseIAEjcb1XuiGMc87zPg0WFJTeJ7frMFIGTBM5ul7VRr8CAiCZHvyxif6IJKs0dzuCPYGZjXZE'
                  />
                ))}
            </div>
          </div>

          {/* Search Frients */}
          <div className='w-full mb-5 px-6'>
            <div className='flex items-center justify-between mb-2'>
              <h2 className='text-dark font-semibold text-sm dark:text-light'>Message</h2>
              <MoreSvg width='25px' />
            </div>

            <div className='flex items-center justify-between gap-3'>
              <label
                htmlFor='searchFriendInput'
                className='bg-inputLight rounded-full flex items-center flex-1 shadow-md'
              >
                <span className='h-full px-4 cursor-pointer'>
                  <SearchMessageSvg width='18px' height='18px' />
                </span>
                <input
                  type='text'
                  id='searchFriendInput'
                  className='outline-none border-none bg-transparent py-3 text-xs font-light'
                  placeholder='Enter for search...'
                />
              </label>

              <span className='cursor-pointer'>
                <AddFriend width='24px' height='24px' />
              </span>
            </div>
          </div>

          {/* Frients Messages */}
          <div className='flex items-start flex-col overflow-y-auto h-full px-6 w-full gap-3 base-hidden-scroll'>
            {windowWidth < 576 &&
              ListFriendMocks.map((friend) => (
                <Link key={friend.id} to={`/message/${friend.id}`} className='block w-full'>
                  <ChatBox
                    key={friend.id}
                    message={''}
                    presence={'active'}
                    username={friend.fullName}
                    source={friend.profilePicture}
                    alt={friend.fullName}
                  />
                </Link>
              ))}
            {windowWidth > 576 &&
              ListFriendMocks.map((friend) => (
                <ChatBox
                  key={friend.id}
                  onClick={() => setSelectChatBox(friend.id)}
                  message={''}
                  presence={'active'}
                  username={friend.fullName}
                  source={friend.profilePicture}
                  alt={friend.fullName}
                />
              ))}
          </div>
        </div>
      </div>

      {selectChatBox && (
        <>
          {/* {windowWidth >= 576 && <Outlet />} */}
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
                {/* {messages.map((message) => (
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
                ))} */}
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

          {/* More Profile Frient */}
          <div className='md:flex flex-col w-3/12 bg-light dark:bg-darkMain px-6 justify-between hidden'>
            <User
              source='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8eg7kYUVGeqWE0QwEcwVcDKVo_CsaYyi9BQ&usqp=CAU'
              username='Bé iu <3'
              sloggan='@_besiuhhhhhh'
              alt='test'
              presence='active'
              className='flex-col w-full text-center my-5'
            />
            <div className='after:m-0 base-border-main h-[1px]'></div>

            {/* Gallerys */}
            <div className='my-5'>
              <div className='flex items-center justify-between mb-3'>
                <h3 className='text-dark dark:text-light font-semibold text-sm'>Media(21)</h3>
                <button className='style-main text-sm'>See all</button>
              </div>
              <div className='grid grid-cols-3 w-full gap-3'>
                <div className='w-full relative rounded-lg overflow-hidden max-h-[100px] h-[100px]'>
                  <img
                    src='https://images.unsplash.com/photo-1694638277367-4cebdf9f0b5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
                    alt=''
                    className='absolute inset-0 w-full h-full object-cover'
                  />
                </div>
                <div className='w-full relative rounded-lg overflow-hidden max-h-[100px] h-[100px]'>
                  <img
                    src='https://images.unsplash.com/photo-1694638277367-4cebdf9f0b5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
                    alt=''
                    className='absolute inset-0 w-full h-full object-cover'
                  />
                </div>
                <div className='w-full relative rounded-lg overflow-hidden max-h-[100px] h-[100px]'>
                  <img
                    src='https://images.unsplash.com/photo-1694638277367-4cebdf9f0b5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
                    alt=''
                    className='absolute inset-0 w-full h-full object-cover'
                  />
                </div>
                <div className='w-full relative rounded-lg overflow-hidden max-h-[100px] h-[100px]'>
                  <img
                    src='https://images.unsplash.com/photo-1694638277367-4cebdf9f0b5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
                    alt=''
                    className='absolute inset-0 w-full h-full object-cover'
                  />
                </div>
                <div className='w-full relative rounded-lg overflow-hidden max-h-[100px] h-[100px]'>
                  <img
                    src='https://images.unsplash.com/photo-1694638277367-4cebdf9f0b5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
                    alt=''
                    className='absolute inset-0 w-full h-full object-cover'
                  />
                </div>
                <div className='w-full relative rounded-lg overflow-hidden max-h-[100px] h-[100px]'>
                  <img
                    src='https://images.unsplash.com/photo-1694638277367-4cebdf9f0b5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
                    alt=''
                    className='absolute inset-0 w-full h-full object-cover'
                  />
                </div>
              </div>
            </div>

            <div className='after:m-0 base-border-main h-[1px]'></div>

            {/* Reports  */}
            <div className='my-5'>
              <h3 className='text-dark dark:text-light  font-semibold text-sm mb-2'>Settings</h3>

              <div className='flex flex-col gap-1'>
                <div className='flex items-center gap-3'>
                  <button>
                    <ReportSvg width='24px' height='24px' />
                  </button>
                  <p className='text-dark dark:text-light'>Report</p>
                </div>
                <div className='flex items-center gap-3'>
                  <button>
                    <LockSvg width='24px' height='24px' />
                  </button>
                  <p className='text-dark dark:text-light'>Terminal key code</p>
                </div>
                <div className='flex items-center gap-3'>
                  <button>
                    <BellSvg width='24px' height='24px' />
                  </button>
                  <p className='text-dark dark:text-light'>Turn off notifications</p>
                </div>
                <div className='flex items-center gap-3'>
                  <button>
                    <TrashSvg width='24px' height='24px' />
                  </button>
                  <p className='text-dark dark:text-light'>Remove message</p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {!selectChatBox && (
        <div className='text-dark flex items-center justify-center mx-auto dark:text-light'>
          Vui lòng chọn đoạn hội thoại
        </div>
      )}
    </div>
  )
}

export default Message
