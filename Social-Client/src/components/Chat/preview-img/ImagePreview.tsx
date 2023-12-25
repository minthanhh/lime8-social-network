import { FaTimes } from 'react-icons/fa'

interface IImagePreview {
  image: string
  onRemoreImg: () => void
}
const ImagePreview = ({ image, onRemoreImg }: IImagePreview) => {
  return (
    <div className='absolute left-4 bottom-[78px]'>
      <div className='border rounded-md'>
        <img className='w-40 object-cover rounded-sm' src={image} alt='' />
        <span
          aria-hidden='true'
          className='absolute rounded-full bg-light dark:bg-dark p-1 shadow-md -top-1.5 cursor-pointer -right-1.5'
          onClick={onRemoreImg}
        >
          <FaTimes size={14} className='text-dark dark:text-light' />
        </span>
      </div>
    </div>
  )
}

export default ImagePreview
