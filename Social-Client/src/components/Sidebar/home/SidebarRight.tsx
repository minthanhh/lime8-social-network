import { Link } from 'react-router-dom'
import { Article } from 'src/components'
import { useAppSelector } from 'src/hooks/useRedux'

const TrendingFeeds = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1617631458201-5c120f4e2483?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YmxhY2slMjBwaW5rfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1616427724713-061d064eebab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjBwaW5rfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
  },

  {
    id: 3,
    image:
      'https://plus.unsplash.com/premium_photo-1673624400256-7f26339a334c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmxhY2slMjBwaW5rfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1502736842968-bcaab72d0700?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8YmxhY2slMjBwaW5rfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60'
  }
]

const UserSuggestions = [
  {
    id: 1,
    avatar: 'https://24365withblinks.com/images/about/profile_jisoo.jpg',
    name: 'Kim Jisoo'
  },
  {
    id: 2,
    avatar: 'https://24365withblinks.com/images/about/profile_jennie.jpg',
    name: 'Jennie Kim'
  },
  {
    id: 3,
    avatar: 'https://24365withblinks.com/images/about/profile_rose.jpg',
    name: 'Roseanne Park'
  },
  {
    id: 4,
    avatar: 'https://24365withblinks.com/images/about/profile_lisa.jpg',
    name: 'Lalisa Manoban'
  },
  {
    id: 5,
    avatar: 'https://24365withblinks.com/images/about/profile_lisa.jpg',
    name: 'Lalisa Manoban'
  },
  {
    id: 6,
    avatar: 'https://24365withblinks.com/images/about/profile_lisa.jpg',
    name: 'Lalisa Manoban'
  },
  {
    id: 7,
    avatar: 'https://24365withblinks.com/images/about/profile_lisa.jpg',
    name: 'Lalisa Manoban'
  }
]
export default function SidebarRight() {
  const { suggestedUserList } = useAppSelector((state) => state.profile)
  const { profile } = useAppSelector((state) => state.user)
  return (
    <aside className='md:flex flex-shrink-0 hidden flex-col md:max-w-[22.5%] lg:max-w-1/5 sticky inherits-h-header overflow-auto gap-3 py-3 base-hidden-scroll'>
      <Article className='p-3 flex flex-col justify-evenly'>
        <h2 className='font-bold lg:text-base text-dark dark:text-light text-xs lg:mb-3 mb-2 text-center'>
          Trending feed
        </h2>

        <div className='grid grid-cols-2 md:gap-1 lg:gap-2'>
          {TrendingFeeds.map(({ image, id }) => (
            <div key={id} className='w-full relative'>
              <div className='aspect-2/1'>
                <img
                  alt=''
                  src={image}
                  className='absolute inset-0 rounded-sm lg:rounded-md w-full h-full object-cover'
                />
              </div>
            </div>
          ))}
        </div>
      </Article>

      <Article className='flex flex-col justify-evenly p-3'>
        <h2 className='font-bold lg:text-base text-dark dark:text-light text-xs lg:mb-3 mb-2 text-center'>
          Suggestions for you
        </h2>

        <div className='flex flex-col flex-grow overflow-y-auto mt-2'>
          <div className='flex flex-col min-h-[160px] lg:min-h-[300px] max-h-60 lg:max-h-80'>
            {suggestedUserList.map((userSuggested) => {
              if (profile?.blockedBy.includes(userSuggested?._id)) return null
              return (
                <Link
                  key={userSuggested._id}
                  to={`/profile/${userSuggested._id}`}
                  className='flex flex-row items-center gap-2 dark:hover:bg-slate-400/25 hover:bg-gray-100 p-1 lg:p-2 rounded-md transition-all ease-linear duration-150'
                >
                  <div className='relative w-7 lg:w-10 h-7 lg:h-10 flex-shrink-0'>
                    <img
                      loading='lazy'
                      src={userSuggested.profilePicture}
                      alt={userSuggested.username}
                      className='absolute rounded-full w-full h-full object-cover inset-0'
                    />
                  </div>
                  <h4 className='text-xs lg:text-sm'>{userSuggested.username}</h4>
                </Link>
              )
            })}
          </div>
        </div>
      </Article>

      <Article className='p-3 flex justify-center lg:justify-evenly items-center'>
        <h2 className='font-bold lg:text-base text-dark dark:text-light text-xs lg:mb-3 mb-2 text-center'>
          Content creator
        </h2>

        <div className='lg:mt-3 flex -space-x-2 justify-center mb-2'>
          {UserSuggestions.slice(0, 4).map(({ id, avatar }) => (
            <div key={id} className='lg:h-8 lg:w-8 w-5 h-5 relative inline-block'>
              <img
                className='h-full w-full rounded-full object-cover absolute inset-0 ring-2 ring-light dark:ring-dark'
                src={avatar}
                loading='lazy'
                alt=''
              />
            </div>
          ))}
        </div>
        <p className='text-center text-[10px] lg:text-xs lg:mt-2'>
          More than 142k people became content creators, become a content creator of Lime8
        </p>
      </Article>
    </aside>
  )
}
