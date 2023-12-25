/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import { useSearchParams } from 'react-router-dom'
import { usePlayerAction } from 'src/hooks/usePlayerAction'
import { useAppDispatch } from 'src/hooks/useRedux'
import { toggleOpenModalExplore } from 'src/store/slices/modal/explore.slice'

interface VideoCardProps {
  publicId: string
  url: string
}
const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
  minimumIntegerDigits: 2
})

function formatDuration(time: number) {
  const minutes = Math.floor(time / 60) % 60
  const seconds = Math.floor(time % 60)

  return `${minutes}:${leadingZeroFormatter.format(seconds)}`
}

const VideoCard = ({ publicId, url }: VideoCardProps) => {
  const dispatch = useAppDispatch()
  const { ref, muted, progress, toggleMuted } = usePlayerAction()
  const [, setSearchParams] = useSearchParams()

  const handleMouseOver = () => {
    if (ref.current) {
      ref.current.play()
    }
  }

  const handleMouseOut = () => {
    if (ref.current) {
      ref.current.pause()
      ref.current.currentTime = 0
    }
  }
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      onClick={() => {
        dispatch(toggleOpenModalExplore())
        setSearchParams({ modal_id: publicId })
      }}
      className='relative video-explore shadow-shadowMain mb-4 w-full break-inside-avoid rounded-xl cursor-pointer overflow-hidden'
    >
      <div className='relative group' onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <video ref={ref} muted={muted} playsInline>
          <track kind='captions'></track>
          <source src={url} />
        </video>

        <div className='absolute bottom-3 px-3 w-full'>
          <div className='hidden items-center group-hover:flex justify-between'>
            <svg
              className='w-4 h-4'
              xmlns='http://www.w3.org/2000/svg'
              width='176'
              height='192'
              viewBox='0 0 176 192'
              fill='none'
            >
              <path
                d='M176 16V176C176 180.243 174.314 184.313 171.314 187.314C168.313 190.314 164.243 192 160 192H120C115.757 192 111.687 190.314 108.686 187.314C105.686 184.313 104 180.243 104 176V16C104 11.7565 105.686 7.68687 108.686 4.68629C111.687 1.68571 115.757 0 120 0H160C164.243 0 168.313 1.68571 171.314 4.68629C174.314 7.68687 176 11.7565 176 16ZM56 0H16C11.7565 0 7.68687 1.68571 4.68629 4.68629C1.68571 7.68687 0 11.7565 0 16V176C0 180.243 1.68571 184.313 4.68629 187.314C7.68687 190.314 11.7565 192 16 192H56C60.2435 192 64.3131 190.314 67.3137 187.314C70.3143 184.313 72 180.243 72 176V16C72 11.7565 70.3143 7.68687 67.3137 4.68629C64.3131 1.68571 60.2435 0 56 0Z'
                fill='white'
              />
            </svg>

            <button className='flex items-center' onClick={toggleMuted}>
              {!muted ? (
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                  <path d='M6 9H3V15H6L11 19V5L6 9Z' stroke='white' strokeWidth='2' strokeLinejoin='round' />
                  <path
                    d='M18.5 5.5C19.3536 6.35357 20.0308 7.36692 20.4928 8.48219C20.9548 9.59747 21.1925 10.7928 21.1925 12C21.1925 13.2072 20.9548 14.4025 20.4928 15.5178C20.0308 16.6331 19.3536 17.6464 18.5 18.5M15 8C16.0608 9.06088 16.6568 10.4997 16.6568 12C16.6568 13.5003 16.0608 14.9391 15 16'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                  />
                </svg>
              ) : (
                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                  <path
                    d='M22 9L16 15M16 9L22 15M11 5L6 9H2V15H6L11 19V5Z'
                    stroke='white'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </svg>
              )}
            </button>
          </div>
          <div className='flex items-center group-hover:hidden justify-end w-full'>
            <span className='inline-block text-xs text-light bg-black/60 rounded-[3px] px-2 py-0.5 ml-auto'>
              {formatDuration(ref.current?.duration as number)}
            </span>
          </div>
        </div>

        <div className='absolute w-full hidden group-hover:block -translate-y-2/5 bottom-0 shadow-shadowMain'>
          <div className='w-full h-[2px] dark:bg-slate-300/60 bg-slate-600/50'>
            <div
              className='w-0 h-[2px] bg-light transition-all ease-linear duration-75'
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className='bg-light dark:bg-dark p-3'>
        <p className='text-sm text-dark dark:text-light mb-1'>Play piano with girl friend</p>
        <span className='text-dark dark:text-light font-normal text-xs'>@minthanhh</span>
      </div>
    </div>
  )
}

export default VideoCard
