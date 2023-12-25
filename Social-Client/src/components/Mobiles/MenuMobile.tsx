import { NavLink } from 'react-router-dom'
import AppSettings from 'src/configs/appsettings'

const MenuMobile = () => {
  return (
    <div className='fixed md:hidden bottom-0 left-0 right-0 flex items-center bg-light dark:bg-dark shadow-shadowMain py-2 justify-between px-6 z-50'>
      {AppSettings.Routes.map((route, index) => (
        <NavLink key={index} to={route.pathname}>
          <route.icon width='28' height='28' />
        </NavLink>
      ))}
    </div>
  )
}

export default MenuMobile
