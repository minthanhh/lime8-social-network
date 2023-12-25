import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import Options from './Options/Options'
import Icons from 'src/assets/icons'
import { motion } from 'framer-motion'
import { animatePostMain } from './animations'
import { Button, User } from '..'
import { privacyCase } from 'src/services/utilities/cases'
import { useCallback, useEffect, useState } from 'react'
import Form from './Form/Form'
import { toggleOpenEditModal, toggleOpenPrivacyModal } from 'src/store/slices/modal/modal.slice'
import { resetEditPost } from 'src/store/slices/post/postEdit.slice'
import ModalPrivacy from './Modals/Privacy/ModalPrivacy'
import ModalFeeling from './Modals/Feeling/ModalFeeling'
import postService from 'src/services/api/post/post.service'

const PostEdit = () => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const profile = useAppSelector((state) => state.user.profile)
  const editModalIsOpen = useAppSelector((state) => state.modal.editModalIsOpen)
  const privacyModalIsOpen = useAppSelector((state) => state.modal.privacyModalIsOpen)
  const feelingModalIsOpen = useAppSelector((state) => state.modal.feelingModalIsOpen)
  const valuesPostEdit = useAppSelector((state) => state.postEdit)

  const privacy = useAppSelector((state) => state.postEdit.privacy)
  const feeling = useAppSelector((state) => state.postEdit.feelings)
  const bgColor = useAppSelector((state) => state.postEdit.bgColor)
  const imagePost = useAppSelector((state) => state.postEdit.imagePost)
  const videoPost = useAppSelector((state) => state.postEdit.videoPost)
  const gifUrl = useAppSelector((state) => state.postEdit.gifUrl)

  const [content, setContent] = useState('')

  useEffect(() => {
    if (valuesPostEdit.post) {
      setContent(valuesPostEdit.post)
    }
  }, [valuesPostEdit.post])

  const hanldeSetContent = (content: string) => {
    setContent(content)
  }

  const handleTogglePrivacyModal = useCallback(() => {
    dispatch(toggleOpenPrivacyModal())
  }, [dispatch])

  const handleCloseMainModal = useCallback(() => {
    dispatch(toggleOpenEditModal())
    dispatch(resetEditPost())
  }, [dispatch])

  const handleSubmit = async () => {
    setIsLoading(true)

    const post: {
      privacy?: string
      feelings?: string
      bgColor?: string
      post?: string
      profilePicture?: string
      imagePost?: string
      videoPost?: string
      gifUrl?: string
    } = {
      privacy: privacy || '',
      feelings: feeling || '',
      bgColor: bgColor || '',
      post: content || '',
      profilePicture: profile?.profilePicture,
      imagePost: imagePost || '',
      videoPost: videoPost || '',
      gifUrl: gifUrl || ''
    }

    if (post.post && !post.bgColor && !post.imagePost && !post.videoPost) {
      delete post.imagePost
      delete post?.videoPost
      await postService.updatePost(valuesPostEdit._id as string, post)
    } else if (post?.post && post.bgColor) {
      delete post.imagePost
      delete post.videoPost
      await postService.updatePost(valuesPostEdit._id as string, post)
    } else if (post?.post && post?.imagePost !== '' && !post.bgColor) {
      delete post.videoPost
      await postService.updatePostWithImage(valuesPostEdit._id as string, post)
    } else if (post?.post && post.imagePost && !post.bgColor && !post.videoPost) {
      delete post.imagePost
      await postService.updatePostWithVideo(valuesPostEdit._id as string, post)
    }

    dispatch(toggleOpenEditModal())
    dispatch(resetEditPost())
    setContent('')
    setIsLoading(false)
  }

  if (editModalIsOpen) {
    return (
      <div className='fixed w-full h-full inset-0 z-50 bg-black/60 flex items-center justify-center overflow-x-hidden overflow-y-hidden'>
        {privacyModalIsOpen && <ModalPrivacy />}
        {feelingModalIsOpen && <ModalFeeling />}

        <motion.div {...animatePostMain} className='bg-light dark:bg-dark w-1/3 px-6 pb-4 rounded-md relative'>
          <h2 className='text-base py-4 mx-auto font-bold text-dark dark:text-light text-center'>Tạo bài viết</h2>
          <div className='border-linear-color w-3/4 mx-auto'></div>

          <div className='flex flex-col gap-4 my-4'>
            <User
              source={profile?.profilePicture || ''}
              username={profile?.username || ''}
              alt='Avatar User'
              feeling={feeling}
            >
              <Button
                className='flex items-center py-0.5 px-2 gap-2 text-xs font-normal w-max'
                rounded='rounded-lg'
                onClick={handleTogglePrivacyModal}
              >
                {privacyCase(privacy as string)}
              </Button>
            </User>

            <Form content={content} onChangeContent={hanldeSetContent} />
            <Options />

            <Button onClick={handleSubmit} className='w-full py-2 flex justify-center' rounded='rounded-lg'>
              {isLoading ? (
                <svg
                  className='animate-spin -ml-1 mr-3 h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  ></path>
                </svg>
              ) : (
                'Đăng bài'
              )}
            </Button>
          </div>

          <button onClick={handleCloseMainModal} className='absolute top-3 right-3'>
            <Icons.Post.Close width='35' height='35' />
          </button>
        </motion.div>
      </div>
    )
  }

  return null
}

export default PostEdit
