/* eslint-disable jsx-a11y/click-events-have-key-events */

import { Avatar } from 'src/components'
import Reactions from 'src/components/Chat/reactions/Reactions'
import { reactionsMap } from 'src/services/utilities/static.data'
import { timeAgo } from 'src/services/utilities/timeago'

const LeftMessageDisplay = ({
  chat,
  profile,
  toggleReaction,
  showReactionIcon,
  index,
  activeElementIndex,
  reactionRef,
  setToggleReaction,
  handleReactionClick,
  deleteMessage,
  showReactionIconOnHover,
  setActiveElementIndex,
  setSelectedReaction,
  setShowImageModal,
  setImageUrl,
  showImageModal
}: any) => {
  return (
    <div className='flex flex-col gap-2 px-5 py-2 w-full rounded-3xl items-start'>
      <div className='relative max-w-[65%] w-max bg-gray-100 dark:bg-slate-400/25 text-dark dark:text-light px-3 py-2 rounded-xl '>
        <div className='flex flex-col gap-2'>
          <Avatar
            style={{ color: '#333' }}
            fullName={chat.senderUsername}
            avatar={chat.senderProfilePicture}
            size='sm'
          />
          <div className='message-content-container'>
            <div className='message-content-container-wrapper'>
              <div
                aria-hidden='true'
                className='message-content'
                onClick={() => {
                  if (!chat?.deleteForMe) {
                    deleteMessage(chat, 'deleteForMe')
                  }
                }}
                onMouseEnter={() => {
                  if (!chat?.deleteForMe) {
                    showReactionIconOnHover(true, index)
                    setActiveElementIndex(index)
                  }
                }}
              >
                {chat?.deleteForMe && chat?.receiverUsername === profile?.username && (
                  <div className='message-bubble left-message-bubble'>
                    <span className='message-deleted'>Tin nhắn đã xoá</span>
                  </div>
                )}

                {!chat?.deleteForMe && (
                  <>
                    {chat?.content !== 'Gửi 1 ảnh động' && chat?.content !== 'Gửi 1 ảnh' && (
                      <div className='message-bubble left-message-bubble'>{chat?.content}</div>
                    )}
                    {chat?.selectedImage && (
                      <div
                        className='message-image'
                        style={{
                          marginTop: `${chat?.content && chat?.content !== 'Gửi 1 ảnh' ? '5px' : ''}`
                        }}
                      >
                        <img
                          aria-hidden='true'
                          className='object-cover w-full max-w-[200px]'
                          src={chat?.selectedImage}
                          alt=''
                          onClick={() => {
                            setImageUrl(chat?.selectedImage)
                            setShowImageModal(!showImageModal)
                          }}
                        />
                      </div>
                    )}
                    {chat?.gifUrl && (
                      <div className='message-gif'>
                        <img src={chat?.gifUrl} alt='' />
                      </div>
                    )}
                  </>
                )}
              </div>
              {showReactionIcon && index === activeElementIndex && !chat?.deleteForMe && (
                <div
                  aria-hidden='true'
                  className='w-10 h-10 flex justify-center items-center text-3xl rounded-3xl absolute border bg-white-02 cursor-pointer right-[-50px] bottom-2 text-dark dark:text-light'
                  onClick={() => setToggleReaction(true)}
                >
                  &#9786;
                </div>
              )}
            </div>
            {chat?.reaction && chat.reaction.length > 0 && !chat?.deleteForMe && (
              <div className='absolute bottom-1 right-1 flex items-center -space-x-4'>
                {chat?.reaction.map((data: { senderName: string; type: string }, idx: number) => (
                  <img
                    key={idx}
                    aria-hidden='true'
                    className='w-7 h-7 object-cover rounded-lg'
                    src={reactionsMap[data?.type]}
                    alt={data.senderName}
                    onClick={() => {
                      if (data?.senderName === profile?.username) {
                        const body = {
                          conversationId: chat?.conversationId,
                          messageId: chat?._id,
                          reaction: data?.type,
                          type: 'remove'
                        }
                        setSelectedReaction(body)
                      }
                    }}
                  />
                ))}
              </div>
            )}
            <div className='message-time'>
              <span data-testid='text-dark dark:text-light text-sm font-semibold'>
                {timeAgo.timeFormat(chat?.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {toggleReaction && index === activeElementIndex && (
        <div ref={reactionRef}>
          <Reactions
            showLabel={false}
            handleClick={(event: any) => {
              const body = {
                conversationId: chat?.conversationId,
                messageId: chat?._id,
                reaction: event,
                type: 'add'
              }
              handleReactionClick(body)
              setToggleReaction(false)
            }}
          />
        </div>
      )}
    </div>
  )
}
export default LeftMessageDisplay
