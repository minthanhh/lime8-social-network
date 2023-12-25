import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import MoreSvg from 'src/assets/icons/components/MoreSvg'
import { Article } from 'src/components'
import AppSettings from 'src/configs/appsettings'
import { useAppSelector } from 'src/hooks/useRedux'
import followService from 'src/services/api/follow/follow.service'

const Friend = () => {
  const { profile } = useAppSelector((state) => state.profile)
  const [listFollower, setListFollower] = useState<any[]>([])

  useEffect(() => {
    const getFollowers = async () => {
      const result = await followService.getFollowers(profile._id)
      setListFollower(result.data.followers)
    }

    getFollowers()
  }, [profile._id])

  return (
    <Article margin='mx-0' className='p-3 gap-2 sm:gap-4'>
      <h2 className='text-base sm:text-lg font-bold sm:my-4'>Bạn bè</h2>

      <nav className='flex items-center justify-start gap-4'>
        {AppSettings.RoutesProfileFriends.map((route, index) => (
          <NavLink key={index} to={route.pathname} className='text-xs font-medium sm:text-base'>
            {route.label}
          </NavLink>
        ))}
      </nav>

      <div className='flex items-center w-full flex-wrap gap-2 mt-2'>
        {listFollower.length > 0 &&
          listFollower.map((follower) => (
            <div
              key={follower._id}
              className='flex sm:flex-row w-[calc(50%_-_4px)] sm:w-[calc(50%_-_16px)] relative gap-2 sm:gap-0 items-center p-1 sm:p-3 shadow-shadowMain rounded-md'
            >
              <Link
                to={`/profile/${follower._id}`}
                className='block sm:mr-4 flex-shrink-0 relative sm:w-[80px] sm:h-[80px] w-[40px] h-[40px]'
              >
                <img
                  src={follower.profilePicture}
                  className='absolute inset-0 w-full h-full rounded-md object-cover max-w-full'
                  alt={follower.username}
                />
              </Link>

              <div className='flex-grow sm:pr-4'>
                <Link to={`/profile/${follower._id}`}>
                  <span className='max-w-full text-[10px] break-words min-w-0 font-semibold sm:text-base isolate text-dark dark:text-light block'>
                    {follower.username}
                  </span>
                </Link>
              </div>

              <div className='px-1 py-3.5 cursor-pointer hover:bg-slate-400/50 rounded-full absolute right-2'>
                <MoreSvg width='25' />
              </div>
            </div>
          ))}

        {listFollower.length === 0 && <div>No Friends</div>}
      </div>
    </Article>
  )
}

export default Friend
