import { useCallback, useEffect, useState } from 'react'
import MessageInput from './message-input/MessageInput'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { Link, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import chatService from 'src/services/api/chat/chat.service'
import profileService from 'src/services/api/profile/profile.service'
import { ChatUtils } from 'src/services/utilities/chat.utils'
import Utils from 'src/services/utilities/utils'
import { some } from 'lodash'
import MessageDisplay from './message-display/MessageDisplay'
import MoreSvg from 'src/assets/icons/components/MoreSvg'
import CallSvg from 'src/assets/icons/components/messages/CallSvg'
import PhoneSvg from 'src/assets/icons/components/messages/PhoneSvg'
import SearchSvg from 'src/assets/icons/components/SearchSvg'
import ReportSvg from 'src/assets/icons/components/messages/ReportSvg'
import BellSvg from 'src/assets/icons/components/messages/BellSvg'
import TrashSvg from 'src/assets/icons/components/messages/TrashSvg'
import { User } from 'src/components'
import clsx from 'clsx'
import userService from 'src/services/api/user/user.service'
import { updateUserProfile } from 'src/store/slices/user/user.slice'
import Blocked, { swalBlockedOptions, swalSuccessOptions } from './Blocked/Blocked'
import Swal from 'sweetalert2'
import { useTheme } from 'src/hooks/useTheme'

const ChatWindow = () => {
  const { profile } = useAppSelector((state) => state.user)
  const { isLoading } = useAppSelector((state) => state.chat)
  const [receiver, setReceiver] = useState<any>()
  const [conversationId, setConversationId] = useState('')
  const [chatMessages, setChatMessages] = useState<any>([])
  const [onlineUsers, setOnlineUsers] = useState([])
  const [rendered, setRendered] = useState(false)
  const [searchParams] = useSearchParams()
  const [showMoreDetails, setShowMoreDetails] = useState(false)
  const { selectedChatUser } = useAppSelector((state) => state.chat)
  const dispatch = useAppDispatch()
  const { chooseTheme } = useTheme()
  const [isBlocked, setIsBlocked] = useState(false)

  const getChatMessage = async (receiverId: any) => {
    try {
      const response = await chatService.getChatMessages(receiverId)
      ChatUtils.privateChatMessages = [...response.data.messages]
      setChatMessages([...ChatUtils.privateChatMessages])
    } catch (err: any) {
      toast(err.response.data.message)
    }
  }
  const getNewUserMessages = useCallback(() => {
    if (searchParams.get('id') && searchParams.get('username')) {
      setConversationId('')
      setChatMessages([])
      getChatMessage(searchParams.get('id'))
    }
  }, [searchParams])
  const getUserProfileById = useCallback(async () => {
    try {
      const response = await profileService.getUserProfileById(searchParams.get('id'))
      setReceiver(response.data.user)
      ChatUtils.joinRoomEvent(response.data.user, profile)
    } catch (error: any) {
      toast(error.response.data.message)
    }
  }, [profile, searchParams])
  const sendChatMessage = async (message: any, gifUrl: any, selectedImage: any) => {
    try {
      const checkUserOne = some(
        ChatUtils.chatUsers,
        (user) => user?.userOne === profile?.username && user?.userTwo === receiver?.username
      )
      const checkUserTwo = some(
        ChatUtils.chatUsers,
        (user) => user?.userOne === receiver?.username && user?.userTwo === profile?.username
      )
      const messageData = ChatUtils.messageData({
        receiver,
        conversationId,
        message,
        searchParamsId: searchParams.get('id'),
        chatMessages,
        gifUrl,
        selectedImage,
        isRead: checkUserOne && checkUserTwo
      })
      await chatService.saveChatMessage(messageData)
    } catch (error: any) {
      toast(error.response.data.message)
    }
  }

  const updateMessageReaction = async (data: any) => {
    try {
      await chatService.updateMessageReaction(data)
    } catch (error: any) {
      toast(error.response.data.message)
    }
  }
  const deleteChatMessage = async ({ senderId, receiverId, messageId, type }: any) => {
    try {
      await chatService.markMessageAsDelete({ messageId, senderId, receiverId, type })
    } catch (error: any) {
      toast(error.response.data.message)
    }
  }

  useEffect(() => {
    if (rendered) {
      getUserProfileById()
      getNewUserMessages()
    }
    if (!rendered) setRendered(true)
  }, [getUserProfileById, getNewUserMessages, searchParams, rendered])

  useEffect(() => {
    if (rendered) {
      ChatUtils.socketIOMessageReceived(chatMessages, searchParams.get('username'), setConversationId, setChatMessages)
    }
    if (!rendered) setRendered(true)
    ChatUtils.usersOnline(setOnlineUsers)
    ChatUtils.usersOnChatPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, rendered])

  useEffect(() => {
    ChatUtils.socketIOMessageReaction(chatMessages, searchParams.get('username'), setConversationId, setChatMessages)
  }, [chatMessages, searchParams])

  const handleBlockingUser = async () => {
    try {
      if (profile?.blocked.includes(receiver?._id)) {
        const { isConfirmed } = await Swal.fire(
          swalBlockedOptions(receiver?.username, chooseTheme, async () => {
            await userService.userUnBlockedByAccountOwner(receiver?._id)
            dispatch(updateUserProfile({ blocked: profile?.blocked.filter((id) => id !== id) }))
          })
        )
        if (!isConfirmed) return
        Swal.fire({
          ...swalSuccessOptions(chooseTheme),
          title: 'Unblocked successfully',
          text: 'You can now send messages'
        })
      } else {
        const { isConfirmed } = await Swal.fire({
          ...swalBlockedOptions(receiver?.username, chooseTheme, async () => {
            await userService.userUnBlockedByAccountOwner(receiver?._id)
            dispatch(updateUserProfile({ blocked: profile?.blocked.filter((id) => id !== id) }))
          }),
          text: `You really want to block ${receiver?.username}?`
        })

        if (!isConfirmed) return
        Swal.fire({
          ...swalSuccessOptions(chooseTheme),
          title: 'Block successfully',
          text: 'You have blocked this user'
        })
        await userService.userBlockedByAccountOwner(receiver?._id)
        dispatch(
          updateUserProfile({
            blocked: [...profile!.blocked, receiver?._id]
          })
        )
        console.log('Blocked')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <div className={clsx('text-white relative h-full overflow-y-hidden', showMoreDetails ? 'w-[65%]' : 'w-full')}>
        {isLoading ? (
          <div>loading...</div>
        ) : (
          <>
            <div className='header border-b border-gray-200 dark:border-slate-400/25 h-16 w-full flex sticky top-0 right-0 items-center px-4 z-[888] bg-light dark:bg-dark justify-between'>
              {receiver && (
                <Link to={`/profile/${receiver?._id}`}>
                  <div className='flex items-center gap-3'>
                    <img className='w-12 h-12 rounded-full' src={receiver?.profilePicture} alt='' />
                    <p className='flex flex-col'>
                      <span className='font-semibold text-lg text-dark dark:text-light'>{receiver?.username}</span>
                      <span className='text-[12px] text-sky-700'>
                        {Utils.checkIfUserIsOnline(receiver?.username, onlineUsers) && <span>Đang online</span>}
                      </span>
                    </p>
                  </div>
                </Link>
              )}

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
                <button
                  className='hover:bg-gray-100 hover:dark:bg-slate-400/25 py-3.5 px-1 rounded-full'
                  onClick={() => setShowMoreDetails((v) => !v)}
                >
                  <MoreSvg width='24px' height='5px' />
                </button>
              </div>
            </div>
            <MessageDisplay
              chatMessages={chatMessages}
              profile={profile}
              updateMessageReaction={updateMessageReaction}
              deleteChatMessage={deleteChatMessage}
            />
          </>
        )}

        <div className='sticky bottom-0 w-full bg-light dark:bg-dark'>
          {profile?.blocked.includes(receiver?._id) ? (
            <Blocked blockedId={receiver?._id} blockedName={receiver?.username} />
          ) : (
            <MessageInput setChatMessage={sendChatMessage} />
          )}
        </div>
      </div>

      {showMoreDetails && (
        <div className='md:flex flex-col w-[35%] border-l border-gray-200 dark:border-slate-400/25 bg-light dark:bg-darkMain px-6 justify-evenly hidden'>
          <div className='flex flex-col justify-center items-center gap-2'>
            <img
              className='rounded-full object-cover w-20 h-20'
              src={
                profile?._id === selectedChatUser?.senderId
                  ? selectedChatUser?.receiverProfilePicture
                  : selectedChatUser?.senderProfilePicture
              }
              alt=''
            />

            <h4 className='text-dark dark:text-light font-bold'>
              {profile?._id === selectedChatUser?.senderId
                ? selectedChatUser?.receiverUsername
                : selectedChatUser?.senderUsername}
            </h4>
          </div>

          <div className='after:m-0 base-border-main h-[1px]'></div>

          {/* Gallerys */}
          <div className='my-5'>
            <div className='flex items-center justify-between mb-3'>
              <h3 className='text-dark dark:text-light font-semibold text-sm'>Media(21)</h3>
              <button className='style-main text-sm'>See all</button>
            </div>
            <div className='grid grid-cols-3 w-full gap-3'>
              <div className='w-full relative rounded-lg overflow-hidden h-[100px]'>
                <img
                  src='https://images.unsplash.com/photo-1694638277367-4cebdf9f0b5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
                  alt=''
                  className='absolute inset-0 w-full h-full object-cover'
                />
              </div>
              <div className='w-full relative rounded-lg overflow-hidden h-[100px]'>
                <img
                  src='https://images.unsplash.com/photo-1694638277367-4cebdf9f0b5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
                  alt=''
                  className='absolute inset-0 w-full h-full object-cover'
                />
              </div>
              <div className='w-full relative rounded-lg overflow-hidden h-[100px]'>
                <img
                  src='https://images.unsplash.com/photo-1694638277367-4cebdf9f0b5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
                  alt=''
                  className='absolute inset-0 w-full h-full object-cover'
                />
              </div>
              <div className='w-full relative rounded-lg overflow-hidden h-[100px]'>
                <img
                  src='https://images.unsplash.com/photo-1694638277367-4cebdf9f0b5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
                  alt=''
                  className='absolute inset-0 w-full h-full object-cover'
                />
              </div>
              <div className='w-full relative rounded-lg overflow-hidden h-[100px]'>
                <img
                  src='https://images.unsplash.com/photo-1694638277367-4cebdf9f0b5a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60'
                  alt=''
                  className='absolute inset-0 w-full h-full object-cover'
                />
              </div>
              <div className='w-full relative rounded-lg overflow-hidden h-[100px]'>
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
            <h3 className='text-dark dark:text-light  font-semibold text-base mb-2'>Settings</h3>

            <div className='flex flex-col'>
              <button
                onClick={handleBlockingUser}
                className='flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-slate-400/25  rounded-md px-1 py-2 default-animations'
              >
                <ReportSvg width='25 ' height='25 ' />
                <p className='text-dark dark:text-light'>
                  {profile?.blocked.includes(receiver?._id) ? 'Un Blocked' : 'block'}
                </p>
              </button>
              <button className='flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-slate-400/25 rounded-md px-1 py-2 default-animations'>
                <BellSvg width='25' height='25' />
                <p className='text-dark dark:text-light'>Turn off notifications</p>
              </button>
              <button className='flex items-center gap-3 hover:bg-gray-100 dark:hover:bg-slate-400/25  rounded-md px-1 py-2 default-animations'>
                <TrashSvg width='25' height='25' />

                <p className='text-dark dark:text-light'>Remove message</p>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatWindow
