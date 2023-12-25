import { AdvancedImage } from '@cloudinary/react'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { cld } from 'src/services/cloudinary/clodinary'
import { RootState } from 'src/store'
import './test.css'
import { usePlayerAction } from 'src/hooks/usePlayerAction'
import { toggleOpenModalExplore } from 'src/store/slices/modal/explore.slice'
import { useEffect, useRef } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
const listTest = [
  {
    id: 'vqv1yhjoa6o1ttiyslw8'
  },
  {
    id: 'hrbdhg1ragahbuhwxj0k'
  },
  {
    id: 'z5wnkquvxzflyqb8a8lw'
  },
  {
    id: 'cw6a9nlpku1nhtdb82gt'
  }
]

const ModalExplore = () => {
  const exploreModalIsOpen = useAppSelector((state: RootState) => state.explore.exploreModalIsOpen)
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const containerRef = useRef<HTMLDivElement | null>(null)
  const videoId = searchParams.get('modal_id')
  const videoRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (videoId && videoRef.current) {
      // Sử dụng `scrollIntoView` để cuộn đến phần tử có ID tương ứng
      videoRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [videoId])

  useEffect(() => {
    const container = containerRef.current

    const handleScrolling = () => {
      const scrollPosition = container?.scrollTop
      listTest.forEach((item) => {
        const element = document.getElementsByClassName(`item-${item.id}`)[0] as HTMLDivElement

        if (element.offsetTop === Math.round(scrollPosition as number)) {
          setSearchParams({ modal_id: item.id })
        }
      })
    }

    if (container) {
      container.addEventListener('scroll', handleScrolling)
    }

    return () => {
      container?.removeEventListener('scroll', handleScrolling)
    }
  }, [setSearchParams])

  if (exploreModalIsOpen) {
    return (
      <div className='fixed modal-explore inset-0 w-full h-full z-50 bg-[#20212c] overflow-y-hidden overflow-x-hidden'>
        <div ref={containerRef} className='w-full h-full snap-mandatory snap-y overflow-y-scroll'>
          <div className='sticky bg-transparent top-5 left-5 p-2 z-[9999] cursor-pointer w-max'>
            <button onClick={() => dispatch(toggleOpenModalExplore())} className='p-2'>
              <svg
                width='18'
                height='18'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='mcc8KhCO'
                viewBox='0 0 18 18'
              >
                <path
                  d='M17.448 17.448a1.886 1.886 0 01-2.668 0L9 11.668l-5.78 5.78A1.886 1.886 0 11.552 14.78L6.332 9 .552 3.22A1.886 1.886 0 113.22.552L9 6.332l5.78-5.78a1.886 1.886 0 112.668 2.668L11.668 9l5.78 5.78a1.886 1.886 0 010 2.668z'
                  fill='#fff'
                ></path>
              </svg>
            </button>
          </div>
          {listTest.map((item) => (
            <div key={item.id} className={`flex items-center justify-center w-full h-full snap-start item-${item.id}`}>
              <PlayerVideo videoRef={item.id === videoId ? videoRef : null} videoId={item.id} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}

interface PlayerVideoProps {
  videoId: string
  videoRef: React.MutableRefObject<HTMLDivElement | null> | null
}

const PlayerVideo = ({ videoId, videoRef }: PlayerVideoProps) => {
  const { ref, progress, togglePlay, play, handleTimeUpdate } = usePlayerAction()

  return (
    <>
      <div ref={videoRef} className='h-full w-full relative z-[100]'>
        <video ref={ref} className='h-[calc(100%_-_48px)] w-full' onTimeUpdate={handleTimeUpdate} playsInline loop>
          <track kind='captions'></track>
          <source
            src={`https://res.cloudinary.com/dyfyxrbm6/video/upload/q_auto/v1/videos/${videoId}.mp4?_a=BATASxAA0`}
          />
        </video>

        <div className='h-[48px] flex-shrink-0 w-full'>
          <div className='w-full h-[2px] dark:bg-slate-300/60 bg-slate-600/50'>
            <div
              className='w-0 h-[2px] bg-light transition-all ease-linear duration-75'
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className='flex items-center w-full h-full'>
            <button onClick={togglePlay} className='mr-auto ml-2'>
              {!play ? (
                <svg width='32' height='32' fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
                  <path
                    d='M23.5 15.134a1 1 0 010 1.732l-11.25 6.495a1 1 0 01-1.5-.866V9.505a1 1 0 011.5-.866l11.25 6.495z'
                    fill='#fff'
                  ></path>
                </svg>
              ) : (
                <svg width='32' height='32' fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'>
                  <rect x='9' y='8' width='5' height='16' rx='1' fill='#fff'></rect>
                  <rect x='18' y='8' width='5' height='16' rx='1' fill='#fff'></rect>
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className='absolute inset-0 -z-10 overflow-hidden w-full h-auto test'>
          <AdvancedImage cldImg={cld.image(`videos/${videoId}`).setAssetType('video').format('auto:image')} />
        </div>
      </div>
    </>
  )
}

export default ModalExplore
