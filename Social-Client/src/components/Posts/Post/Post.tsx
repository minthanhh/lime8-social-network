import { Avatar } from 'src/components'
import Utils from 'src/services/utilities/utils'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import MoreSvg from 'src/assets/icons/components/MoreSvg'
import { useCollapse } from 'react-collapsed'
import { Link } from 'react-router-dom'
import SendSvg from 'src/assets/icons/components/messages/SendSvg'
import postService from 'src/services/api/post/post.service'
import { RootState } from 'src/store'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import socketService from 'src/services/socket/socket.service'
import clsx from 'clsx'
import { cloneDeep } from 'lodash'
import { toast } from 'react-toastify'
import { toggleOpenEditModal } from 'src/store/slices/modal/modal.slice'
import { updatePostEdit } from 'src/store/slices/post/postEdit.slice'

import moment from 'moment'
import Reactions from '../Reactions/Reactions'
import { reactionsMap } from 'src/services/utilities/static.data'
import { UniqueHelper } from 'src/helpers/unique.helper'
import { IReaction } from 'src/interfaces/reaction.interface'
import Tippy from '@tippyjs/react/headless'
import loadable from '@loadable/component'
import { updateReactionsCount } from 'src/store/slices/post/posts.slice'
import { toggleOpenModalVideo } from 'src/store/slices/modal/video.slice'

const EmojiPicker = loadable(() => import('../Emoji/Emoji'), {
  fallback: <p id='loading'>Loading...</p>
})

interface PostProps {
  profilePicture: string
  quote?: string
  username: string
  imagePost?: string
  videoPost?: string
  bgColor?: string
  gifUrl?: string
  post?: string

  imgVersion?: string
  imgId?: string
  videoVersion?: string
  videoId?: string
  postId?: string
  userId?: string
  currentPost?: any

  listPost: any[]
}

type ItemWithCreatedAt = {
  createdAt: string
}

function sortDatesByOldestFirst<T extends ItemWithCreatedAt>(list: T[]) {
  return list.sort((a, b) => {
    return Number(new Date(a.createdAt)) - Number(new Date(b.createdAt))
  })
}

const initialReactions = {
  like: 0,
  love: 0,
  happy: 0,
  sad: 0,
  wow: 0,
  angry: 0
}

const Post = ({
  imagePost,
  profilePicture,
  quote,
  username,
  bgColor,
  gifUrl,
  post,
  postId,
  userId,
  videoPost,
  currentPost,
  imgId,
  imgVersion,
  videoId,
  videoVersion,
  listPost
}: PostProps) => {
  const dispatch = useAppDispatch()
  const postRef = useRef<HTMLDivElement | null>(null)
  const profile = useAppSelector((state: RootState) => state.user.profile)
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()

  const [postSeeMore, setPostSeeMore] = useState(false)
  const [editPostPopup, setEditPostPopup] = useState(false)

  const [comment, setComment] = useState('')
  const [reactions, setReactions] = useState<any[]>([])
  const [listComment, setListComment] = useState<any[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [toggleDisplayReactions, setToggleDisplayReactions] = useState(false)

  const [selectedImagePreview, setSelectedImagePreview] = useState<string>('')
  const [isPreviewLoading, setIsPreviewLoading] = useState(false)
  const [isShowEmojiPicker, setIsShowEmojiPicker] = useState(false)
  const [isShowModalVideo, setIsShowModalVideo] = useState(false)

  const getAllReactionOfPost = async (postId: string) => {
    try {
      const result = await postService.getAllReaction(postId)
      setReactions([...result.data.reactions])
    } catch (error) {
      console.log(error)
    }
  }

  const getAllCommentOfPost = async (postId: string) => {
    try {
      const result = await postService.getAllCommentOfPost(postId)
      setListComment(sortDatesByOldestFirst(result.data.comments))
    } catch (error) {
      console.log(error)
    }
  }

  const socketIOComment = (stateComments: any, setStateComments: any) => {
    stateComments = cloneDeep(stateComments)
    socketService.socket?.on('add comment', (comment: any) => {
      if (comment.postId === postId) {
        stateComments = [...stateComments, comment]
        setStateComments(stateComments)
      }
    })
  }

  useEffect(() => {
    socketService.socket?.on('typing', (data: { typing: boolean }) => {
      setIsTyping(data.typing)
    })
  }, [])

  useEffect(() => {
    if (comment === '') {
      socketService.socket?.emit('typing', { typing: false })
    }
  }, [comment])

  useEffect(() => {
    getAllReactionOfPost(postId as string)
    getAllCommentOfPost(postId as string)
  }, [postId])

  useEffect(() => {
    socketIOComment(listComment, setListComment)
  }, [listComment])

  useEffect(() => {
    socketService.socket?.on('reaction', (reaction: any) => {
      if (reaction.postId === postId) {
        const usernameExists = reactions.some(({ username }) => username === reaction.username)
        if (usernameExists) {
          setReactions([...reactions.map((r) => (r.username === reaction.username ? reaction : r))])
        } else {
          setReactions([reaction, ...reactions])
        }
      }
    })
  }, [postId, reactions])

  useEffect(() => {
    socketService.socket?.on('delete reaction', (username: any) => {
      setReactions([...reactions.filter((r) => r.username !== username)])
    })
  }, [reactions])

  useEffect(() => {
    return () => {
      selectedImagePreview === '' && URL.revokeObjectURL(selectedImagePreview)
    }
  }, [selectedImagePreview])

  const handleReactionPost = useCallback(
    async (reactionType: string, previousReaction: string) => {
      const usernameExists = reactions.find(({ username }) => username === profile?.username)
      if (!usernameExists) {
        await postService.addReactionToPost({
          userTo: userId,
          postId,
          type: reactionType,
          previousReaction: '',
          postReactions: { ...initialReactions, [reactionType]: 1 },
          profilePicture: profile?.profilePicture
        })
      } else {
        if (usernameExists?.type === reactionType) {
          await postService.removeReactionOfPost(postId as string, reactionType, initialReactions)
        } else {
          await postService.addReactionToPost({
            userTo: userId,
            postId,
            type: reactionType,
            previousReaction: previousReaction,
            postReactions: { ...initialReactions, [reactionType]: 1 },
            profilePicture: profile?.profilePicture
          })
        }
      }

      setToggleDisplayReactions(false)
    },
    [postId, userId, profile?.profilePicture, profile?.username, reactions]
  )

  const handleCommentPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (comment === '') return

    await postService.addCommentToPost({
      userTo: userId,
      postId: postId,
      comment: comment,
      profilePicture: profile?.profilePicture
    })
    setComment('')
  }

  const handleDeletePost = async (postId: string) => {
    await postService.deletePost(postId)

    setEditPostPopup(false)
    toast.success('Bạn đã xóa bài đăng thành công')
  }

  const handleCommentWithImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPreviewLoading(true)
    const file = e.target.files?.[0]
    if (selectedImagePreview !== '') {
      URL.revokeObjectURL(selectedImagePreview)
      setSelectedImagePreview('')
    }
    if (!file) {
      setIsPreviewLoading(false)
      return
    }
    setSelectedImagePreview(URL.createObjectURL(file))

    await new Promise((resolve) => setTimeout(resolve, 300))
    setIsPreviewLoading(false)
  }

  let imageUrl: string = ''
  let content = <div>{post}</div>

  if (bgColor !== '') {
    content = (
      <div
        className={`rounded-xl md:rounded-md overflow-hidden h-[200px] md:h-[300px] lg:h-[350px] flex items-center justify-center ${bgColor}`}
      >
        <p className='font-semibold text-base sm:text-xl text-center text-light'>{post}</p>
      </div>
    )
  }

  if (imgId && imgVersion && !bgColor && !videoPost && !bgColor) {
    imageUrl = Utils.appImageUrl(imgVersion!, imgId!)
    content = (
      <>
        <div className='group/text'>
          <p className={`text-xs font-medium sm:text-sm ${postSeeMore ? '' : 'line-clamp-3'}`}>{post}</p>
          {post!.length > 200 && (
            <motion.button
              onClick={() => setPostSeeMore((v) => !v)}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className='text-xs style-bg-main py-1 px-2 rounded-lg mt-2 outline-none text-light'
            >
              {postSeeMore ? 'Close' : 'See More'}
            </motion.button>
          )}
        </div>

        <div className='rounded-xl md:rounded-md overflow-hidden'>
          <img src={imageUrl} className='w-full h-auto object-contain' alt='' />
        </div>
      </>
    )
  }

  if (videoId && videoVersion && !bgColor && !imagePost) {
    imageUrl = Utils.appImageUrl(videoVersion!, videoId!, 'video')

    content = (
      <>
        <div className='group/text'>
          <p className={`text-xs font-medium sm:text-sm ${postSeeMore ? '' : 'line-clamp-3'}`}>{post}</p>
          {post!.length > 200 && (
            <motion.button
              onClick={() => setPostSeeMore((v) => !v)}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              className='text-xs style-bg-main py-1 px-2 rounded-lg mt-2 outline-none text-light'
            >
              {postSeeMore ? 'Close' : 'See More'}
            </motion.button>
          )}
        </div>

        <div className='rounded-xl md:rounded-md overflow-hidden relative w-full h-[300px]'>
          <video src={imageUrl} className='w-full h-full absolute object-cover'>
            <track kind='captions'></track>
          </video>

          <div className='absolute w-full h-full bg-black/50 flex items-center justify-center'>
            <motion.button
              animate={{ scale: 1 }}
              whileHover={{ scale: 0.9 }}
              whileTap={{ scale: 1.2 }}
              onClick={() => dispatch(toggleOpenModalVideo(imageUrl))}
              className='outline-none'
            >
              <svg width='50' height='50' fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
                <path
                  d='M23.5 15.134a1 1 0 010 1.732l-11.25 6.495a1 1 0 01-1.5-.866V9.505a1 1 0 011.5-.866l11.25 6.495z'
                  fill='#fff'
                ></path>
              </svg>
            </motion.button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div
        ref={postRef}
        className='bg-light shadow-shadowMain w-full default-animations dark:bg-dark rounded-md px-3 py-4 mb-3 lg:mb-6 last:mb-0 relative overflow-hidden'
      >
        <div className='flex flex-col gap-2 lg:gap-4'>
          <div className='flex items-center justify-between'>
            <Link to={`/profile/${userId}`}>
              <Avatar avatar={profilePicture} subs={quote} fullName={username} size='md' />
            </Link>

            {profile?._id === userId && (
              <div className='relative'>
                <button
                  className='rounded-full py-3.5 px-1 hover:bg-slate-300/25'
                  onClick={() => setEditPostPopup((v) => !v)}
                >
                  <MoreSvg width='25' />
                </button>
                {editPostPopup && (
                  <div className='absolute top-[120%] bg-light dark:bg-dark rounded-md shadow w-[150px] flex flex-col right-0 p-2 z-50 dark:shadow-shadowMain'>
                    <button
                      onClick={() => {
                        dispatch(toggleOpenEditModal())
                        dispatch(updatePostEdit(currentPost))
                        setEditPostPopup(false)
                      }}
                      className='rounded-md py-1 px-1 hover:bg-slate-300/25'
                    >
                      Edit
                    </button>
                    <button
                      className='rounded-md py-1 px-1 hover:bg-slate-300/25'
                      onClick={() => handleDeletePost(postId as string)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {content}
          <div className='flex items-center md:justify-between select-none'>
            <div className='flex w-2/4 justify-center'>
              <div className='relative'>
                <button
                  onClick={() => setToggleDisplayReactions(!toggleDisplayReactions)}
                  className={clsx('flex items-center outline-none', reactions.length > 0 ? 'gap-2' : 'gap-4')}
                >
                  {reactions.length > 0 ? (
                    <div className='flex items-center -space-x-7'>
                      {UniqueHelper.uniquePropertyInList<IReaction>(reactions, 'type').map(({ type }, idx) => {
                        return (
                          <Tippy
                            key={idx}
                            role='tooltip'
                            popperOptions={{
                              placement: 'auto'
                            }}
                            render={(attrs) => (
                              <div
                                className='bg-light dark:bg-dark shadow-md p-2 flex flex-col gap-1 rounded-md items-center w-[120px]'
                                {...attrs}
                              >
                                {reactions
                                  .filter((r) => r.type === type)
                                  .map(({ username, _id }) => {
                                    return (
                                      <span className='text-dark text-[10px] dark:text-light' key={_id}>
                                        {username}
                                      </span>
                                    )
                                  })}
                              </div>
                            )}
                          >
                            <motion.img
                              transition={{ ease: 'backIn', duration: 0.4, type: 'keyframes' }}
                              initial={{ scale: 1.5 }}
                              animate={{ scale: 1 }}
                              src={reactionsMap[type]}
                              className='w-10 h-10'
                              alt={`Icon ${type}`}
                            />
                          </Tippy>
                        )
                      })}
                    </div>
                  ) : (
                    <i className='fa-heart md:text-xl lg:text-2xl style-main fa-regular py-1'></i>
                  )}

                  <span className='flex items-center gap-1 text-xs md:text-sm font-medium'>
                    {reactions.length}
                    <span className='hidden md:block'>Like</span>
                  </span>
                </button>

                {toggleDisplayReactions && (
                  <motion.div
                    initial={{ translateY: 10 }}
                    animate={{ translateY: 0 }}
                    exit={{ translateY: 10 }}
                    className='absolute bottom-[130%] -left-24 w-max bg-light dark:bg-dark rounded-full overflow-hidden shadow'
                  >
                    <Reactions
                      onClick={handleReactionPost}
                      reactions={reactions}
                      usernameReaction={profile?.username as string}
                    />
                  </motion.div>
                )}
              </div>
            </div>
            <div
              {...getToggleProps({
                onClick: () => {
                  if (!isExpanded) {
                    URL.revokeObjectURL(selectedImagePreview)
                    setSelectedImagePreview('')
                    setIsShowEmojiPicker(false)
                  }
                }
              })}
              className='flex w-2/4 flex-row gap-4 md:mr-0 justify-center'
            >
              <i className='fa-regular fa-message md:text-xl lg:text-2xl style-main vertical-align'></i>
              <span className='flex items-center gap-1 text-xs md:text-sm'>
                {listComment.length}
                <span className='hidden md:block'>comment</span>
              </span>
            </div>
          </div>
        </div>

        <div {...getCollapseProps()} className='relative mt-3'>
          {listComment.length > 0 && (
            <div className='h-auto max-h-[400px] overflow-y-auto mb-16 flex flex-col -mx-3 px-3 border-t border-slate-400/25'>
              {listComment.map((comment, index) => {
                const usernamesMatch = profile?.username === comment.username
                const viTime = moment.utc(comment.createdAt).clone().utcOffset(7).format('h:mm A')
                const isAdjacentCommenting = index && listComment[index].username === listComment[index - 1].username
                const showDateAtAdjacentEnd =
                  index === listComment.length - 1 || listComment[index].username !== listComment[index + 1].username

                return (
                  <div
                    key={comment._id}
                    className={clsx(
                      'flex flex-1 items-center gap-4',
                      usernamesMatch ? 'ml-auto flex-row-reverse' : '',
                      isAdjacentCommenting ? 'mt-1' : 'mt-4'
                    )}
                  >
                    <div className={clsx('flex gap-2 items-start', usernamesMatch ? 'flex-row-reverse' : '')}>
                      {!isAdjacentCommenting ? (
                        <img
                          src={comment.profilePicture}
                          alt={comment.username}
                          loading='lazy'
                          className='rounded-full object-cover max-w-full w-8 h-8 flex-shrink-0'
                        />
                      ) : (
                        <span className='mr-[32px]'></span>
                      )}
                      <div className='flex flex-col bg-slate-300/25 rounded-md py-2 px-3'>
                        {!isAdjacentCommenting && (
                          <span className={clsx('text-xs font-bold  max-w-[300px]', usernamesMatch ? 'ml-auto' : '')}>
                            {comment.username}
                          </span>
                        )}
                        <span className={clsx('text-sm font-medium', usernamesMatch ? 'ml-auto' : '')}>
                          {comment.comment}
                        </span>
                      </div>
                    </div>
                    {showDateAtAdjacentEnd && <time className='text-slate-400 text-[11px]'>{viTime}</time>}
                  </div>
                )
              })}
            </div>
          )}

          {listComment.length === 0 && (
            <div className='mb-12 mt-2 text-center py-2 border-t border-slate-400/25 font-semibold'>No comments</div>
          )}
          {isTyping && (
            <div className='shadow-shadowMain absolute -bottom-4 left-0 p-2 m-2 rounded-md w-max'>
              <div className='loader gap-1'>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        {/**
         *  @description If isExpanded variable is true, then display template form input to comment for post.
         */}
        {isExpanded && (
          <AnimatePresence mode='wait'>
            <motion.div
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              exit={{ y: 100 }}
              transition={{ ease: 'easeInOut', duration: 1.1 }}
              className='absolute bottom-0 left-0 right-0 w-full h-auto rounded-lg flex items-center gap-2 bg-light dark:bg-dark shadow-shadowMain p-3'
            >
              <Link to={`/profile/${userId}`}>
                <img src={profile?.profilePicture as string} alt='' className='object-cover rounded-full w-8 h-8' />
              </Link>

              <form
                id='form-submit-comment'
                onSubmit={handleCommentPost}
                className='flex items-center justify-center flex-1 gap-2'
              >
                <div className='flex items-center bg-gray-100 dark:bg-gray-400/25 rounded-md py-1 px-2 w-full'>
                  <input
                    onChange={(e) => {
                      socketService.socket?.emit('typing', { typing: true })
                      setComment(e.target.value)
                    }}
                    type='text'
                    className='outline-none font-medium placeholder:text-dark placeholder:dark:text-light flex-1 text-sm bg-transparent'
                    placeholder='Write comment...'
                    value={comment}
                    autoComplete='off'
                    id={'comment' + postId}
                  />
                  <div className='relative'>
                    <button onClick={() => setIsShowEmojiPicker(!isShowEmojiPicker)}>
                      <i className='fa-regular fa-face-smile text-lg'></i>
                    </button>

                    {isShowEmojiPicker && (
                      <div className='absolute bottom-full right-0'>
                        <EmojiPicker onEmojiClick={() => {}} />
                      </div>
                    )}
                  </div>
                </div>

                <motion.label
                  transition={{ type: 'spring', damping: 5, duration: 1 }}
                  whileTap={{ scale: 0.8 }}
                  htmlFor='input-image-comment'
                  className='hover:bg-gray-100 relative dark:hover:bg-gray-400/25 default-animations outline-none rounded-md p-0.5 hover:cursor-pointer'
                >
                  <i className='fa-regular fa-image text-2xl style-main px-1 p-2'></i>

                  <input onChange={handleCommentWithImage} id='input-image-comment' type='file' hidden />
                  {selectedImagePreview !== '' && (
                    <div
                      className={clsx(
                        'absolute bottom-[150%] -left-20 bg-light dark:bg-dark rounded-md w-40 z-50 shadow p-1',
                        isPreviewLoading && 'h-20 flex items-center justify-center'
                      )}
                    >
                      {isPreviewLoading ? (
                        <svg
                          className='animate-spin h-6 w-6 text-dark dark:text-light'
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                        >
                          <circle
                            className='opacity-25'
                            cx='12'
                            cy='12'
                            r='10'
                            stroke='currentColor'
                            strokeWidth='4'
                          ></circle>
                          <path
                            className='opacity-75'
                            fill='currentColor'
                            d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                          ></path>
                        </svg>
                      ) : (
                        <img
                          src={selectedImagePreview}
                          className='w-full h-full object-cover max-w-full rounded-md'
                          loading='lazy'
                          alt='Img Comment'
                        />
                      )}
                    </div>
                  )}
                </motion.label>

                <motion.button
                  type='submit'
                  disabled={comment === ''}
                  whileTap={{ scale: 0.8 }}
                  transition={{ type: 'spring', damping: 5, duration: 1 }}
                  className={clsx(
                    'rounded-md outline-none flex items-center justify-center p-1.5 hover:bg-gray-100 dark:hover:bg-gray-400/25 text-sm transition-all ease-linear duration-150',
                    comment === '' && 'cursor-not-allowed'
                  )}
                >
                  <SendSvg width='22' height='22' />
                </motion.button>
              </form>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </>
  )
}

export default Post
