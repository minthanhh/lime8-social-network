import { memo, useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import FangHeadSvg from 'src/assets/icons/components/navigations/FangHeadSvg'
import SettingSvg from 'src/assets/icons/components/navigations/SettingSvg'
import SignOutSvg from 'src/assets/icons/components/navigations/SignOutSvg'
import AppSettings from 'src/configs/appsettings'
import { useAppSelector } from 'src/hooks/useRedux'
import withBaseComponent from 'src/hooks/withBaseComponent'
import IHocProps from 'src/interfaces/hoc.interface'
import userService from 'src/services/api/user/user.service'
import { clearUser } from 'src/store/slices/user/user.slice'
import Swal from 'sweetalert2'

const SidebarMessage = ({ navigate, dispatch }: IHocProps) => {
  const location = useLocation()
  const pathname = location.pathname.includes('/friends/')
    ? `/${location.pathname.split('/')[1]}/`
    : `/${location.pathname.split('/')[1]}`
  const logout = () => {
    Swal.fire({
      title: 'Bạn có chắc là muốn đăng xuất?',
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(clearUser())
        userService.logoutUser()
        navigate('/')
      }
    })
  }

  return (
    <div className='h-screen sticky md:flex flex-col overflow-auto w-max base-hidden-scroll hidden top-0 flex-shrink-0'>
      {/* Logo Fang */}
      <div className='mx-6 mb-10 mt-5'>
        <FangHeadSvg width='40px' height='40px' />
      </div>

      {/* Navigations Layout Messages */}
      <nav className='flex items-start flex-col h-full'>
        <div className='flex flex-col items-start justify-center w-full'>
          {AppSettings.Routes.map((route) => (
            <div key={route.pathname} className='relative w-full'>
              <NavLink
                to={route.pathname}
                className={({ isActive }) =>
                  isActive
                    ? location.pathname?.includes('chat')
                      ? `${AppSettings.NavigationStyles.Active} cursor-not-allowed`
                      : AppSettings.NavigationStyles.Active
                    : AppSettings.NavigationStyles.UnActive
                }
              >
                <route.icon width='28px' height='28px' active={route.pathname === pathname} />
              </NavLink>
              {route.pathname === pathname && (
                <div className='linear-gradient-activated h-10 w-2.5 absolute -left-[5%] top-2/4 rounded-lg -translate-y-2/4'></div>
              )}
            </div>
          ))}
        </div>

        <div className='flex flex-col items-start justify-center mt-auto w-full pb-10'>
          <NavLink to={'settings'} className='flex items-center justify-center py-4 w-full'>
            <SettingSvg width='28' height='28' />
          </NavLink>
          <button onClick={logout} className='w-full flex items-center justify-center py-4'>
            <SignOutSvg width='28' height='28' />
          </button>
        </div>
      </nav>
    </div>
  )
}

export default withBaseComponent(memo(SidebarMessage))
