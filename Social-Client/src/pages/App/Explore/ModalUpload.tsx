import { useEffect, useState } from 'react'
import { usePlayerAction } from 'src/hooks/usePlayerAction'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { ImageUtils } from 'src/services/utilities/image.utils'
import { RootState } from 'src/store'
import { toggleOpenModalUpload } from 'src/store/slices/modal/explore.slice'
import './upload.css'
import { Button } from 'src/components'
import { addExplore } from 'src/store/api/explores'

const ModalUpload = () => {
  const dispatch = useAppDispatch()
  const { ref, play, togglePlay } = usePlayerAction()
  const uploadModalIsOpen = useAppSelector((state: RootState) => state.explore.uploadModalIsOpen)

  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [fileVideo, setFileVideo] = useState<File | null>(null)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const file = e.target.files[0]
    ImageUtils.checkFile(file, 'video')
    setFileVideo(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    setLoading(true)

    if (typeof fileVideo === 'undefined') {
      setLoading(false)
      return
    }
    dispatch(addExplore(fileVideo!))
    dispatch(toggleOpenModalUpload())
  }

  useEffect(() => {
    if (!uploadModalIsOpen) {
      setFileVideo(null)
      setPreview('')
    }

    return () => URL.revokeObjectURL(preview)
  }, [preview, uploadModalIsOpen])

  if (uploadModalIsOpen) {
    return (
      <div className='fixed inset-0 w-full h-full bg-black/50 flex items-center justify-center z-50'>
        <div className='absolute bg-transparent top-5 left-5 p-2 z-[9999] cursor-pointer w-max'>
          <button
            onClick={() => {
              dispatch(toggleOpenModalUpload())
            }}
            className='p-2'
          >
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

        <div className='bg-light dark:bg-dark shadow-shadowMain w-auto p-3 rounded-md'>
          <form method='post' onSubmit={handleOnSubmit} className='block w-[300px]'>
            <input type='file' onChange={handleOnChange} id='uploadVideo' name='file' hidden />

            {preview && (
              <button
                type='button'
                onClick={() => togglePlay()}
                className='block w-full pt-[56.%] h-auto cursor-pointer relative mx-aut'
              >
                {!play && (
                  <svg
                    className='hover:bg-slate-300/60 absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 z-50 rounded-full'
                    width='32'
                    height='32'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 32 32'
                  >
                    <path
                      d='M23.5 15.134a1 1 0 010 1.732l-11.25 6.495a1 1 0 01-1.5-.866V9.505a1 1 0 011.5-.866l11.25 6.495z'
                      fill='#fff'
                    ></path>
                  </svg>
                )}

                <video ref={ref} loop autoPlay src={preview}>
                  <track kind='captions'></track>
                  <source src={preview} />
                </video>
              </button>
            )}

            <label htmlFor='uploadVideo' className='block w-[300px] h-auto cursor-pointer relative mx-auto'>
              <div>{preview ? 'Change video' : 'Choose Video'}</div>
            </label>

            {preview && (
              <Button className='py-2 px-4 w-full mt-6' rounded='rounded-md' type='submit'>
                Upload Files {loading && 'LOading..'}
              </Button>
            )}
          </form>
        </div>
      </div>
    )
  }
  return null
}

export default ModalUpload
