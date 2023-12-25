import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { toggleOpenPrivacyModal } from 'src/store/slices/modal/modal.slice'
import { motion } from 'framer-motion'
import { PrivacyList } from 'src/services/utilities/static.data'
import { Button } from 'src/components'
import { RootState } from 'src/store'
import { changePrivacyPost } from 'src/store/slices/post/post.slice'
import { useCallback, useEffect, useState } from 'react'
import { updatePostEdit } from 'src/store/slices/post/postEdit.slice'

const ModalPrivacy = () => {
  const dispatch = useAppDispatch()
  const privacyValue = useAppSelector((state: RootState) => state.post.privacy)
  const editPrivacy = useAppSelector((state) => state.postEdit.privacy)
  const [privacyState, setPrivacyState] = useState(privacyValue)
  const editModalIsOpen = useAppSelector((state) => state.modal.editModalIsOpen)

  useEffect(() => {
    if (editModalIsOpen) {
      setPrivacyState(editPrivacy)
    }
  }, [editModalIsOpen, editPrivacy])

  const handleSetPrivacy = useCallback(() => {
    if (editModalIsOpen) {
      dispatch(updatePostEdit({ privacy: privacyState }))
      dispatch(toggleOpenPrivacyModal())
    } else {
      dispatch(changePrivacyPost(privacyState))
      dispatch(toggleOpenPrivacyModal())
    }
  }, [dispatch, privacyState, editModalIsOpen])

  const handleTogglePrivacyModal = useCallback(() => {
    dispatch(toggleOpenPrivacyModal())
  }, [dispatch])

  return (
    <motion.div
      initial={{ opacity: 1, x: -80 }}
      animate={{
        opacity: 1,
        x: 0
      }}
      exit={{ opacity: 0, x: -100 }}
      className='bg-light dark:bg-dark w-1/3 px-6 pb-4 rounded-md absolute z-50 h-[500px]'
    >
      <div className='text-center py-4'>
        <h2 className='text-base font-bold text-dark dark:text-light'>Đối tượng của bài viết</h2>
      </div>

      <div className='border-linear-color w-3/4 mx-auto'></div>

      <h6 className='text-sm font-semibold text-dark dark:text-light mb-1 mt-4'>Ai có thể xem bài viết của bạn?</h6>

      <p className='text-xs font-normal text-dark dark:text-light'>
        Bài viết của bạn sẽ hiển thị ở Bảng feed, trang cá nhân và kết quả tìm kiếm, Tuy đối tượng mặc định là Công
        khai, nhưng bạn có thể thay đổi đối tượng của riêng bài viết này.
      </p>

      <div className='flex flex-col'>
        {PrivacyList.map((privacy, index) => (
          <button key={index} className='text-left'>
            <label
              htmlFor={privacy.label}
              className='flex items-center gap-2 p-2 hover:bg-slate-400/30 cursor-pointer select-none transition-all ease-linear duration-150 rounded-md'
            >
              <div className='rounded-full p-1 border border-dark'>
                <privacy.icon width='32' height='32' />
              </div>

              <div className='flex flex-col flex-1'>
                <h6 className='text-sm font-semibold text-dark dark:text-light'>{privacy.label}</h6>
                <p className='text-xs font-normal text-dark dark:text-light'>{privacy.description}</p>
              </div>

              <input
                id={privacy.label}
                type='radio'
                name='privacy'
                value={privacy.value}
                onChange={(e) => setPrivacyState(e.target.value)}
                checked={privacyState === privacy.value}
              />
            </label>
          </button>
        ))}
      </div>

      <div className='flex items-center justify-end gap-2 mt-4'>
        <Button
          className='py-2 px-6 shadow-shadowMain'
          rounded='rounded-md'
          textColor='text-dark dark:text-light'
          bg='bg-light dark:bg-dark'
          onClick={handleTogglePrivacyModal}
        >
          Hủy
        </Button>
        <Button className='py-2 px-6' rounded='rounded-md' onClick={handleSetPrivacy}>
          Xong
        </Button>
      </div>

      <button className='absolute top-3 left-3' onClick={handleTogglePrivacyModal}>
        <svg xmlns='http://www.w3.org/2000/svg' width='35' height='35' viewBox='0 0 50 50' fill='none'>
          <path
            d='M39.6753 23.3989H15.0222L29.7778 10.5899C30.0137 10.3834 29.8705 10 29.5587 10H25.8298C25.6654 10 25.5095 10.059 25.3873 10.1643L9.46459 23.9803C9.31876 24.1067 9.2018 24.263 9.12164 24.4386C9.04148 24.6142 9 24.8049 9 24.9979C9 25.1909 9.04148 25.3816 9.12164 25.5572C9.2018 25.7328 9.31876 25.889 9.46459 26.0154L25.48 39.9157C25.5432 39.9705 25.6191 40 25.6991 40H29.5545C29.8663 40 30.0095 39.6124 29.7736 39.4101L15.0222 26.6011H39.6753C39.8607 26.6011 40.0123 26.4494 40.0123 26.264V23.736C40.0123 23.5506 39.8607 23.3989 39.6753 23.3989Z'
            className='fill-dark dark:fill-light'
          />
          <rect x='0.5' y='0.5' width='49' height='49' rx='24.5' stroke='url(#paint0_linear_893_392)' />
          <defs>
            <linearGradient id='paint0_linear_893_392' x1='0' y1='25' x2='50' y2='25' gradientUnits='userSpaceOnUse'>
              <stop stopColor='#2ECEC2' />
              <stop offset='0.354167' stopColor='#34BAD0' />
              <stop offset='1' stopColor='#3B89F1' />
            </linearGradient>
          </defs>
        </svg>
      </button>
    </motion.div>
  )
}

export default ModalPrivacy
