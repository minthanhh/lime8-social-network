/* eslint-disable jsx-a11y/no-static-element-interactions */
import { FaArrowLeft, FaArrowRight, FaTimes } from 'react-icons/fa'

const ImageModal = ({ image, onCancel, onClickLeft, onClickRight, showArrow, lastItemRight, lastItemLeft }: any) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full bg-black-02 flex items-center justify-center'>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
      <div className='absolute text-white cursor-pointer top-[90px] right-4' onClick={onCancel}>
        <FaTimes size={24} />
      </div>
      {showArrow && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          className={'absolute text-white cursor-pointer left-4'}
          onClick={onClickLeft}
          style={{ pointerEvents: `${lastItemLeft ? 'none' : 'all'}`, color: `${lastItemLeft ? '#bdbdbd' : ''}` }}
        >
          <FaArrowLeft size={24} />
        </div>
      )}
      <div className='fixed z-[1000] flex'>
        <div className='flex items-center justify-center'>
          <img className='object-contain h-full w-[1000px]' alt='' src={`${image}`} />
        </div>
      </div>
      {showArrow && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events
        <div
          className={'absolute text-white cursor-pointer right-4'}
          onClick={onClickRight}
          style={{ pointerEvents: `${lastItemRight ? 'none' : 'all'}`, color: `${lastItemRight ? '#bdbdbd' : ''}` }}
        >
          <FaArrowRight />
        </div>
      )}
    </div>
  )
}

export default ImageModal
