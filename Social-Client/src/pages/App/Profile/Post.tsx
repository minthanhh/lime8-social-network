import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Article, Button } from 'src/components'
import PostList from 'src/components/Posts/PostList'
import StoryList from 'src/components/Stories/StoryList'
import { useAppSelector } from 'src/hooks/useRedux'
import followService from 'src/services/api/follow/follow.service'

const ProfilePost = () => {
  const { posts, profile } = useAppSelector((state) => state.profile)
  const [followers, setFollowers] = useState<any[]>([])

  useEffect(() => {
    const getFollowers = async () => {
      const result = await followService.getFollowers(profile._id)
      setFollowers(result.data.followers)
    }

    getFollowers()
  }, [profile._id])

  return (
    <div className='flex flex-col-reverse sm:flex-row items-start max-w-7xl mx-auto gap-3 sm:mt-10'>
      <div className='w-full sm:w-8/12'>
        <PostList allPosts={posts} sortType='time' />
      </div>
      <div className='w-full sm:w-1/3 sm:sticky flex flex-col gap-3 sm:top-0 sm:h-full'>
        <Article margin='mx-0' className='flex flex-col gap-1 sm:gap-3 p-3'>
          <div className='flex items-center justify-between'>
            <h3 className='text-sm font-semibold'>Your latest stories</h3>
            <Button className='sm:py-1 py-0.5 px-2 sm:px-3'>watch all</Button>
          </div>

          <div className='overflow-x-scroll overflow-y-hidden base-hidden-scroll'>
            <div className='flex items-center flex-nowrap gap-2.5 sm:gap-3.5 p-1'>
              <StoryList />
            </div>
          </div>
        </Article>

        <Article className='p-3' margin='mx-0'>
          <div className='flex items-center justify-between mb-1'>
            <h5 className='text-dark dark:text-light font-bold text-sm'>Bạn bè</h5>
            <Link to='friends' className=''>
              <Button className='py-1 px-3 text-xs' rounded='rounded-md'>
                Xem tất cả
              </Button>
            </Link>
          </div>

          <span className='text-xs font-normal mb-2'>{followers.length} người bạn</span>

          <div className='grid grid-cols-3 gap-2'>
            {followers.map((follower) => (
              <Link key={follower._id} to={`/profile/${follower._id}`}>
                <div className='flex flex-col gap-2'>
                  <div className='relative'>
                    <div className='pt-[100%] aspect-square'>
                      <img
                        src={follower.profilePicture}
                        alt={follower.username}
                        className='rounded-md absolute inset-0 w-full h-full max-w-full object-cover'
                      />
                    </div>
                  </div>
                  <h3 className='text-xs font-semibold text-dark dark:text-light truncate'> {follower.username}</h3>
                </div>
              </Link>
            ))}
          </div>
        </Article>
      </div>
    </div>
  )
}

export default ProfilePost
