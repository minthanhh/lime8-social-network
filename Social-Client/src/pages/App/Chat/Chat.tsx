import { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { ChatList } from 'src/components'
import ChatWindow from 'src/components/Chat/window/ChatWindow'
import useEffectOnce from 'src/hooks/useEffectOnce'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { getConversationList } from 'src/store/api/chat'
import { setSelectedChatUser } from 'src/store/slices/chat/chat.slice'

const Chat = () => {
  const { selectedChatUser, chatList } = useAppSelector((state) => state.chat)
  const dispatch = useAppDispatch()
  const [, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { profile } = useAppSelector((state) => state.user)

  useEffect(() => {
    if (chatList.length > 0 && !selectedChatUser) {
      if (profile?._id === chatList[0]?.senderId) {
        navigate(`/chat?username=${chatList[0]?.receiverUsername.toLowerCase()}&id=${chatList[0]?.receiverId}`)
      } else {
        navigate(`/chat?username=${chatList[0]?.senderUsername.toLowerCase()}&id=${chatList[0]?.senderId}`)
      }

      dispatch(setSelectedChatUser({ isLoading: false, user: chatList[0] }))
    }
  }, [chatList, dispatch, selectedChatUser, setSearchParams, navigate, location, profile?._id])

  useEffectOnce(() => {
    dispatch(getConversationList())
  })

  return (
    <div className='w-[calc(100%_-_88px)] flex overflow-y-hidden h-screen'>
      <div className='w-1/4'>
        <ChatList />
      </div>
      <div className='w-3/4 bg-light dark:bg-[#0C0F1D] flex'>
        {(selectedChatUser || chatList.length > 0) && <ChatWindow />}

        {!selectedChatUser && (
          <div className='flex justify-center w-full h-full items-center text-dark dark:text-light'>
            Please add or search for dialogue
          </div>
        )}
      </div>
    </div>
  )
}
export default Chat
