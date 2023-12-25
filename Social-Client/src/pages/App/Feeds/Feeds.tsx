import { Button } from 'src/components'
import { Link, useLocation } from 'react-router-dom'
import WatchAllSvg from 'src/assets/icons/components/WatchAllSvg'
import useEffectOnce from 'src/hooks/useEffectOnce'
import { useAppDispatch } from 'src/hooks/useRedux'
import { getAllPostThunk } from 'src/store/api/posts'
import PostList from 'src/components/Posts/PostList'
import StoryList from 'src/components/Stories/StoryList'
import { useEffect, useState } from 'react'
import { getSuggestedUsersList } from 'src/store/api/profile'
import { setSelectedChatUser } from 'src/store/slices/chat/chat.slice'

const Feeds = () => {
  const dispatch = useAppDispatch()
  const [sortType, setSortType] = useState<string>(localStorage.getItem('sortType')! || 'none')
  const location = useLocation()

  useEffect(() => {
    localStorage.setItem('sortType', sortType)
  }, [sortType])

  useEffect(() => {
    if (!location.pathname.includes('chat')) {
      dispatch(setSelectedChatUser({ isLoading: false, user: null }))
    }
  }, [location.pathname, dispatch])

  useEffectOnce(() => {
    dispatch(getAllPostThunk())
    dispatch(getSuggestedUsersList())
  })

  return (
    <div className='w-full md:max-w-[55%] lg:max-w-[60%] flex h-full flex-col flex-shrink px-3 md:px-1 lg:px-3 py-3'>
      <div className='md:flex hidden items-center justify-between select-none md:mb-2 lg:mb-3'>
        <h2 className='md:text-sm lg:text-lg font-bold text-dark dark:text-light'>Stories</h2>
        <Link to='' className='flex items-center font-bold md:text-xs lg:text-sm gap-2'>
          Watch all
          <WatchAllSvg width='15' height='15' />
        </Link>
      </div>

      <div className='w-full'>
        <div className='base-hidden-scroll flex flex-col flex-shrink-0 overflow-x-scroll default-animations bg-light rounded-md dark:bg-dark p-2 md:p-1.5 lg:p-3 md:shadow-shadowMain'>
          <div className='relative flex items-center p-[2px] justify-between gap-2.5 md:gap-5'>
            <StoryList />
          </div>
        </div>
      </div>

      <div className='mt-3 md:mt-2 lg:mt-3 flex flex-col'>
        <div className='md:flex hidden items-center justify-between md:mb-2 lg:mb-3'>
          <h2 className='font-bold md:text-sm lg:text-lg'>Feeds</h2>

          <div className='flex items-center gap-2'>
            <Button
              onClick={() => setSortType('time')}
              className='py-2 px-5 shadow-md md:text-xs lg:text-sm'
              textColor='text-dark dark:text-light'
              bg='bg-light dark:bg-dark'
            >
              Latest
            </Button>
            <Button onClick={() => setSortType('popular')} className='py-2 px-5 shadow-md md:text-xs lg:text-sm'>
              Popular
            </Button>
          </div>
        </div>

        <PostList sortType={sortType} />
      </div>
    </div>
  )
}

export default Feeds
