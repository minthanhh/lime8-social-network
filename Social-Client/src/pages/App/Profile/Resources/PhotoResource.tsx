import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAppSelector } from 'src/hooks/useRedux'
import imageService from 'src/services/api/image/image.service'

const PhotoResource = () => {
  const { profile } = useAppSelector((state) => state.profile)
  const [images, setImages] = useState<any[]>([])

  useEffect(() => {
    if (profile._id) {
      const getImages = async () => {
        const result = await imageService.getImagesOfUser(profile._id)
        setImages(result.data.images)
      }

      getImages()
    }
  }, [profile._id])

  return (
    <>
      {images.map((image) => (
        <div
          key={image._id}
          className='overflow-x-hidden p-1 min-w-[247px] flex flex-grow overflow-y-hidden relative basis-0'
        >
          <div className='pt-[100%] h-0 relative w-full'>
            <div className='flex flex-col justify-between absolute min-w-0 min-h-0 z-0 inset-0'>
              <Link to='' className='relative w-full h-full touch-manipulation'>
                <img
                  className='w-full object-cover rounded-md h-full'
                  src={`https://res.cloudinary.com/dgyk7uloc/image/upload/v${image.imgVersion}/${image.imgId}`}
                  alt=''
                />
              </Link>
            </div>
          </div>
        </div>
      ))}

      {Array(16)
        .fill(1)
        .map((_, index) => (
          <div
            key={index}
            className='min-w-[247px] p-1 flex flex-col justify-center items-center flex-grow overflow-hidden basis-0 relative'
          >
            <div className='absolute inset-1'></div>
          </div>
        ))}
    </>
  )
}

export default PhotoResource
