import { useEffect } from 'react'
import { Button } from 'src/components'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { RootState } from 'src/store'
import { getAllExploreThunk } from 'src/store/api/explores'
import { toggleOpenModalUpload } from 'src/store/slices/modal/explore.slice'
import VideoCard from './VideoCard'

const Explore = () => {
  const { explores } = useAppSelector((state: RootState) => state.allExplore)
  const addLoading = useAppSelector((state: RootState) => state.allExplore.addLoading)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllExploreThunk())
  }, [dispatch])

  return (
    <>
      <div className='px-6 mb-6 flex items-center mt-3'>
        <Button onClick={() => dispatch(toggleOpenModalUpload())} className='ml-auto py-2 px-8' rounded='rounded-md'>
          Upload
        </Button>
      </div>

      <div className='columns-5 px-6 overflow-auto'>
        {addLoading && (
          <div className='w-full h-[340px] animate-pulse bg-light dark:bg-dark rounded-xl flex flex-col overflow-hidden mb-4'>
            <div className='h-[250px] bg-gray-200 dark:bg-gray-700'></div>
            <div className='p-3'>
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded-full my-2'></div>
              <div className='h-3 my-3 bg-gray-200 w-[90px] dark:bg-gray-700 rounded-full'></div>
            </div>
          </div>
        )}

        {explores.map((explore) => (
          <VideoCard key={explore.public_id} publicId={explore.public_id} url={explore.url} />
        ))}
      </div>
    </>
  )
}

export default Explore
