import { Outlet } from 'react-router-dom'
import HeaderChildren from 'src/components/Header/HeaderChildren'

const LayoutChildren = () => {
  return (
    <div className='w-full h-full flex flex-col'>
      <HeaderChildren />
      <Outlet />
    </div>
  )
}

export default LayoutChildren
