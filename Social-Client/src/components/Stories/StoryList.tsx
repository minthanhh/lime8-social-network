import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { RootState } from 'src/store'
import { getAllStoryFaker } from 'src/store/api/stories'
import { Story } from '..'
import { AddSvg } from '../icons'
import StoryListSkeleton from './skeleton/StoryListSkeleton'

const StoryList = () => {
  const { isLoading, stories } = useAppSelector((state: RootState) => state.allStory)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getAllStoryFaker())
  }, [dispatch])

  if (isLoading) {
    return <StoryListSkeleton />
  }

  if (stories.length > 0 && !isLoading) {
    return (
      <>
        <Story
          size='lg'
          justPostNow={true}
          username='Add Story'
          className='w-full h-full flex items-center justify-center'
        >
          <AddSvg width='20' height='20' className='-m-[2px]' />
        </Story>
        {stories.map((story) => (
          <Story
            key={story.id}
            size='lg'
            avatar={story.avatar}
            username={story.username}
            justPostNow={story.justPostedNow}
          />
        ))}
      </>
    )
  }

  return <div>Error Boundary</div>
}

export default StoryList
