import { Article, Metric } from '../..'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { IsActive, NotActive } from 'src/styles'
import AppSettings from 'src/configs/appsettings'
import { useTheme } from 'src/hooks/useTheme'
import SettingSvg from 'src/assets/icons/components/navigations/SettingSvg'
import SignOutSvg from 'src/assets/icons/components/navigations/SignOutSvg'
import { useAppSelector } from 'src/hooks/useRedux'
import { clearUser, updateUserProfile } from 'src/store/slices/user/user.slice'
import userService from 'src/services/api/user/user.service'
import Swal from 'sweetalert2'
import withBaseComponent from 'src/hooks/withBaseComponent'
import IHocProps from 'src/interfaces/hoc.interface'
import { memo, useEffect } from 'react'
import socketService from 'src/services/socket/socket.service'
const Metrics = [
  {
    id: 1,
    label: 'posts',
    count: 623
  },
  {
    id: 2,
    label: 'Follower',
    count: 775.2
  },
  {
    id: 3,
    label: 'Following',
    count: 88
  }
]

const Sidebar = ({ navigate, dispatch }: IHocProps) => {
  const { profile } = useAppSelector((state) => state.user)
  const location = useLocation()
  const { posts } = useAppSelector((state) => state.allPost)
  const { chooseTheme } = useTheme()
  const logout = () => {
    Swal.fire({
      title: 'Bạn có chắc là muốn đăng xuất?',
      showCancelButton: true,
      confirmButtonText: 'Đăng Xuất',
      denyButtonText: `Không!`
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearUser())
        userService.logoutUser()
        navigate('/')
      }
    })
  }

  useEffect(() => {
    socketService.socket?.on('add follower', (data: any) => {
      if (profile?._id === data._id) {
        dispatch(updateUserProfile({ followersCount: data.followersCount, followingCount: data.followingCount }))
      }
    })
  }, [profile?._id, dispatch])

  useEffect(() => {
    socketService.socket?.on('remove follower', ({ followeeId, followersCount }: any) => {
      if (profile?._id === followeeId) {
        dispatch(
          updateUserProfile({
            followersCount: profile!.followersCount - followersCount
          })
        )
      }
    })
  }, [profile, dispatch])

  return (
    <div className='md:flex hidden flex-shrink-0 flex-col md:max-w-[22.5%] lg:max-w-1/5 sticky inherits-h-header base-hidden-scroll overflow-y-auto overflow-x-hidden gap-3 py-3'>
      <Article className='p-3 flex flex-col items-center justify-center md:flex-grow-0 md:gap-0 lg:gap-2 xl:gap-4'>
        <Link
          to={'/profile/' + profile?._id}
          className='flex flex-col justify-center items-center md:gap-1 xl:gap-2 my-2'
        >
          <div className='rounded-full relative sm:w-10 sm:h-10 md:w-14 md:h-14 lg:w-20 lg:h-20 overflow-hidden'>
            <img
              className='absolute inset-0 object-cover w-full h-full max-w-full'
              src={profile?.profilePicture}
              alt=''
            />
          </div>

          <h5 className='md:text-xs lg:text-sm text-dark dark:text-light font-bold'>{profile?.username}</h5>
        </Link>

        <div className='flex items-center justify-between flex-row w-full'>
          <div className='flex flex-col items-center justify-center md:justify-between gap-1'>
            <span className='md:text-[10px] lg:text-xs font-bold'>{profile?.postsCount}</span>
            <p className='font-bold md:text-[8px] xl:text-xs'>Post</p>
          </div>

          <div className='flex flex-col items-center justify-center md:justify-between gap-1'>
            <span className='md:text-[10px] lg:text-xs font-bold'>{profile?.followersCount}</span>
            <p className='font-bold md:text-[8px] xl:text-xs'>Follower</p>
          </div>
          <div className='flex flex-col items-center justify-center md:justify-between gap-1'>
            <span className='md:text-[10px] lg:text-xs font-bold'>{profile?.followingCount}</span>
            <p className='font-bold md:text-[8px] xl:text-xs'>Following</p>
          </div>
        </div>
      </Article>

      <Article className='flex flex-col lg:justify-center md:justify-start md:flex-grow-0 items-start lg:gap-3 md:gap-0 py-5 md:py-2'>
        {AppSettings.Routes.map((route, index) => (
          <div key={index} className='relative overflow-hidden'>
            <NavLink to={route.pathname} className={({ isActive }) => (isActive ? IsActive : NotActive)}>
              <route.icon
                width='28px'
                height='28px'
                active={location.pathname === route.pathname}
                theme={chooseTheme}
              />
              {route.label}
              {route.pathname === location.pathname && (
                <div className='linear-gradient-activated md:h-8 lg:h-10 md:w-1.5 lg:w-2.5 absolute -left-[3%] top-2/4 rounded-lg -translate-y-2/4'></div>
              )}
            </NavLink>
          </div>
        ))}
      </Article>

      <Article className='flex flex-col lg:gap-5 items-start lg:py-5 md:flex-grow-0 lg:justify-center'>
        <NavLink to={'/home/settings'} className={({ isActive }) => (isActive ? IsActive : NotActive)}>
          <SettingSvg height='28' width='28' />
          Settings
        </NavLink>
        <button onClick={logout} className={NotActive}>
          <SignOutSvg height='28' width='28' />
          Logout
        </button>
      </Article>

      <Article className='flex flex-col justify-center lg:justify-center lg:text-left text-center lg:p-3 p-2'>
        <h2 className='font-bold lg:text-base text-dark dark:text-light text-xs lg:mb-3 mb-2 text-center'>
          Contact us
        </h2>
        <address className='text-[10px] lg:text-xs mb-1'>lime8@gmail.com</address>
        <p className='text-[10px] leading-4 lg:leading-none break-words text-xs'>
          Copyright © COGNOSPHERE. All Rights Reserved.
        </p>
      </Article>
    </div>
  )
}

export default withBaseComponent(memo(Sidebar))
