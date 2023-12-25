import { Outlet } from 'react-router-dom'
import SidebarMessage from 'src/components/Sidebar/message/SidebarMessage'

const LayoutMessage = () => {
  return (
    <div className='flex w-full bg-lightMain dark:bg-darkMain'>
      <SidebarMessage />
      <Outlet />
    </div>
  )
}

export default LayoutMessage
