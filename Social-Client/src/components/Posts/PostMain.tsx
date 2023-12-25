import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'

/**
 * HOC (Higher Order Component) to reuse dispatching, selectors, navigate, of redux and react-router-dom
 */
import withBaseComponent from 'src/hooks/withBaseComponent'
import { RootState } from 'src/store'

/**
 * Secondary Modals
 */
import ModalFeeling from './Modals/Feeling/ModalFeeling'
import ModalPrivacy from './Modals/Privacy/ModalPrivacy'

/**
 * Redux actions
 */
import { toggleOpenMainModal, toggleOpenPrivacyModal } from 'src/store/slices/modal/modal.slice'
import { resetPost } from 'src/store/slices/post/post.slice'

/**
 * utilities
 */
import { privacyCase } from 'src/services/utilities/cases'

/**
 * Components
 */
import Icons from 'src/assets/icons'
import { animatePostMain } from './animations'
import { Button, User } from '..'
import Form from './Form/Form'
import Options from './Options/Options'
import postService from 'src/services/api/post/post.service'

// # mock user data

const PostMain = withBaseComponent(({ dispatch, useSelector }) => {
  // # states
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  // # Selectors
  const profile = useSelector((state: RootState) => state.user.profile)
  const mainModalIsOpen = useSelector((state: RootState) => state.modal.mainModalIsOpen)
  const privacyModalIsOpen = useSelector((state: RootState) => state.modal.privacyModalIsOpen)
  const feelingModalIsOpen = useSelector((state: RootState) => state.modal.feelingModalIsOpen)

  // # Selectors value
  const privacy = useSelector((state: RootState) => state.post.privacy)
  const feeling = useSelector((state: RootState) => state.post.feelings)
  const bgColor = useSelector((state: RootState) => state.post.bgColor)
  const imagePost = useSelector((state: RootState) => state.post.imagePost)
  const videoPost = useSelector((state: RootState) => state.post.videoPost)
  const gifUrl = useSelector((state: RootState) => state.post.gifUrl)

  // # Functions handle modals and posts
  const handleCloseMainModal = useCallback(() => {
    dispatch(toggleOpenMainModal())
    dispatch(resetPost())
  }, [dispatch])

  const handleTogglePrivacyModal = useCallback(() => {
    dispatch(toggleOpenPrivacyModal())
  }, [dispatch])

  const hanldeSetContent = (content: string) => {
    setContent(content)
  }

  // # Functions handle submit and dispatch
  const handleSubmit = async () => {
    setLoading(true)

    const post = {
      privacy: privacy || '',
      feelings: feeling || '',
      bgColor: bgColor || '',
      post: content || '',
      profilePicture: profile.profilePicture,
      imagePost: imagePost || '',
      videoPost: videoPost || '',
      gifUrl: gifUrl || ''
    }

    if (!post.imagePost && !post.videoPost) {
      delete post.imagePost
      delete post.videoPost

      if (!post.bgColor) {
        await postService.createPost({ ...post })
      } else {
        if (!post.post) {
          setLoading(false)
          return
        }
        await postService.createPost({ ...post })
      }
    }

    if (post.imagePost && !post.bgColor) {
      delete post.videoPost
      await postService.createPostWithImage({ ...post })
    }

    if (post.videoPost && !post.bgColor) {
      delete post.imagePost
      await postService.createPostWithVideo({ ...post })
    }

    dispatch(toggleOpenMainModal())
    setContent('')
    dispatch(resetPost())
    setLoading(false)
  }

  if (mainModalIsOpen) {
    return (
      <div className='fixed w-full h-full inset-0 z-50 bg-black/60 flex items-center justify-center overflow-x-hidden overflow-y-hidden'>
        {privacyModalIsOpen && <ModalPrivacy />}
        {feelingModalIsOpen && <ModalFeeling />}

        <motion.div {...animatePostMain} className='bg-light dark:bg-dark w-1/3 px-6 pb-4 rounded-md relative'>
          <h2 className='text-base py-4 mx-auto font-bold text-dark dark:text-light text-center'>Tạo bài viết</h2>
          <div className='border-linear-color w-3/4 mx-auto'></div>

          <div className='flex flex-col gap-4 my-4'>
            <User source={profile.profilePicture} username={profile.username} alt='Avatar User' feeling={feeling}>
              <Button
                className='flex items-center py-0.5 px-2 gap-2 text-xs font-normal w-max'
                rounded='rounded-lg'
                onClick={handleTogglePrivacyModal}
              >
                {privacyCase(privacy)}
              </Button>
            </User>

            <Form content={content} onChangeContent={hanldeSetContent} />
            <Options />

            <Button onClick={handleSubmit} className='w-full py-2 flex justify-center' rounded='rounded-lg'>
              {loading ? (
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
})

export default PostMain
