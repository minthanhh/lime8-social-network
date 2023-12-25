import { Search } from '..'
import ToggleTheme from '../Toggle/ToggleTheme'
import { useAppSelector } from 'src/hooks/useRedux'
import { DefaultAvatar } from 'src/assets/bg'

const HeaderChildren = () => {
  const { profile } = useAppSelector((state) => state.user)

  return (
    <div className='w-full sm:flex items-center px-6 py-4 bg-transparent sticky z-50 top-0 right-0 hidden'>
      <div className='flex flex-1 items-center justify-center -m-2'>
        <Search />
      </div>
      <div className='flex items-center gap-5'>
        <ToggleTheme />

        <div className='base-border-main w-10 flex flex-shrink'>
          <div className='aspect-square relative w-full'>
            <img
              loading='lazy'
              src={profile?.profilePicture || DefaultAvatar}
              alt={profile?.username}
              className='w-full h-full object-cover absolute inset-0 rounded-full border-[1.5px] border-white'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeaderChildren
