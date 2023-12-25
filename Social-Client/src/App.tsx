import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes'
import { AnimatePresence, motion } from 'framer-motion'
import PostMain from './components/Posts/PostMain'
import { ToastContainer } from 'react-toastify'
import ModalExplore from './pages/App/Explore/ModalExplore'
import ModalUpload from './pages/App/Explore/ModalUpload'
import { useEffect } from 'react'
import socketService from './services/socket/socket.service'
import PostEdit from './components/Posts/PostEdit'
import 'moment/locale/vi'
import { useTheme } from './hooks/useTheme'
import { useAppDispatch, useAppSelector } from './hooks/useRedux'
import { toggleOpenModalVideo } from './store/slices/modal/video.slice'

export default function App() {
  const { isOpenModalVideo, videoUrl } = useAppSelector((state) => state.modalVideo)
  const dispatch = useAppDispatch()
  useTheme()

  useEffect(() => {
    socketService.setupSocketConnection()
  }, [])

  return (
    <AnimatePresence>
      <BrowserRouter>
        <AppRoutes />
        <PostEdit />
        <PostMain />
        <ModalExplore />
        <ModalUpload />
        {isOpenModalVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='fixed w-full inset-0 flex items-center justify-center h-full bg-black/60 z-50'
          >
            <div className='w-[800px] relative h-auto rounded-md overflow-hidden'>
              <video src={videoUrl} className='w-full h-full object-contain' controls autoPlay>
                <track kind='captions'></track>
              </video>

              <motion.button
                whileTap={{ scale: 1.2 }}
                className='absolute top-2 right-3'
                onClick={() => dispatch(toggleOpenModalVideo(''))}
              >
                <i className='fa-solid fa-xmark text-4xl text-dark dark:text-light'></i>
              </motion.button>
            </div>
          </motion.div>
        )}
        <ToastContainer
          position='top-center'
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
        />
      </BrowserRouter>
    </AnimatePresence>
  )
}
