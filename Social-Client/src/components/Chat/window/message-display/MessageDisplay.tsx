import React, { useRef, useState } from 'react'
import useChatScrollToBottom from 'src/hooks/useChatScrollToBottom'
import useDetectOutsideClick from 'src/hooks/useDetectOUtsideClick'
import { timeAgo } from 'src/services/utilities/timeago'
import RightMessageDisplay from './right/RightMessageDisplay'
import ImageModal from 'src/components/preview-model/ImageModel'
import Swal from 'sweetalert2'
import Utils from 'src/services/utilities/utils'
import LeftMessageDisplay from './left/LeftMessageDisplay'

function MessageDisplay({ chatMessages, profile, updateMessageReaction, deleteChatMessage }: any) {
  const [imageUrl, setImageUrl] = useState('')
  const [showReactionIcon, setShowReactionIcon] = useState(false)
  const [showImageModel, setShowImageModel] = useState(false)
  const [deleteDialog, setDeleteDialog] = useState<any>({
    open: false,
    message: null,
    type: ''
  })
  const [activeElementIndex, setActiveElementIndex] = useState(null)
  const [selectedReaction, setSelectedReaction] = useState(null)
  const reactionRef = useRef<any>(null)
  const [toggleReaction, setToggleReaction] = useDetectOutsideClick(reactionRef, false)
  const scrollRef = useChatScrollToBottom(chatMessages)
  const showReactionIconOnHover = (show: any, index: any) => {
    if (index === activeElementIndex || !activeElementIndex) {
      setShowReactionIcon(show)
    }
  }

  const handleReactionClick = (data: any) => {
    updateMessageReaction(data)
    setSelectedReaction(null)
  }

  const deleteMessage = (message: any, type: any) => {
    setDeleteDialog({
      open: true,
      message,
      type
    })
  }
  return (
    <>
      {showImageModel && (
        <ImageModal image={`${imageUrl}`} onCancel={() => setShowImageModel(!showImageModel)} showArrow={false} />
      )}
      {selectedReaction &&
        Swal.fire({
          title: 'Bạn muốn huỷ thả cảm xúc?',
          showCancelButton: true,
          confirmButtonText: 'Xoá',
          denyButtonText: `Không!`
        }).then((result) => {
          if (result.isConfirmed) {
            handleReactionClick(selectedReaction)
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            setSelectedReaction(null)
          }
        })}
      {deleteDialog.open &&
        Swal.fire({
          title: 'Bạn muốn Xoá tin nhắn',
          showCancelButton: true,
          confirmButtonText: `${deleteDialog.type === 'deleteForMe' ? 'Xoá mình tôi' : 'Xoá cả hai'}`,
          denyButtonText: `Không!`
        }).then((result) => {
          if (result.isConfirmed) {
            const { message, type } = deleteDialog
            deleteChatMessage(message.senderId, message.receiverId, message._id, type)
            setDeleteDialog({
              open: false,
              message: null,
              type: ''
            })
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            setDeleteDialog({
              open: false,
              message: null,
              type: ''
            })
          }
        })}
      <div
        ref={scrollRef}
        className='overflow-y-scroll base-hidden-scroll scroll-behavior scroll-smooth h-screen -mt-[64px] py-[64px] pt-[52px]'
      >
        {chatMessages?.map((chat: any, index: any) => (
          <div className='w-full p-5' key={Utils.generateString(8)}>
            {(index === 0 ||
              timeAgo.dayMonthYear(chat.createdAt) !== timeAgo.dayMonthYear(chatMessages[index - 1].createdAt)) && (
              <div className='w-full text-center'>
                <div className='m-auto rounded-3xl text-dark dark:text-light py-1'>
                  {timeAgo.chatMessageTransform(chat.createdAt)}
                </div>
              </div>
            )}
            {(chat.receiverUsername === profile?.username || chat.senderUsername === profile?.username) && (
              <>
                <div className='flex justify-end'>
                  {chat.senderUsername === profile?.username && (
                    <RightMessageDisplay
                      chat={chat}
                      profile={profile}
                      handleReactionClick={handleReactionClick}
                      delMessage={deleteMessage}
                      toggleReaction={toggleReaction}
                      setToggleReaction={setToggleReaction}
                      reactionRef={reactionRef}
                      index={index}
                      activeElementIndex={activeElementIndex}
                      setActiveElementIndex={setActiveElementIndex}
                      showReactionIconOnHover={showReactionIconOnHover}
                      showReactionIcon={showReactionIcon}
                      setSelectedReaction={setSelectedReaction}
                      lastChatMessage={chatMessages[chatMessages.length - 1]}
                      showImageModel={showImageModel}
                      setShowImageModel={setShowImageModel}
                      setImageUrl={setImageUrl}
                    />
                  )}
                </div>
                <div className='flex justify-start'>
                  {chat.receiverUsername === profile?.username && (
                    <LeftMessageDisplay
                      chat={chat}
                      profile={profile}
                      toggleReaction={toggleReaction}
                      showReactionIcon={showReactionIcon}
                      index={index}
                      activeElementIndex={activeElementIndex}
                      reactionRef={reactionRef}
                      setToggleReaction={setToggleReaction}
                      handleReactionClick={handleReactionClick}
                      deleteMessage={deleteMessage}
                      showReactionIconOnHover={showReactionIconOnHover}
                      setActiveElementIndex={setActiveElementIndex}
                      setShowImageModal={setShowImageModel}
                      setImageUrl={setImageUrl}
                      showImageModal={showImageModel}
                      setSelectedReaction={setSelectedReaction}
                    />
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default MessageDisplay
