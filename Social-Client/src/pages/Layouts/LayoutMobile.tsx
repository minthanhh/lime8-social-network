import { Outlet } from 'react-router-dom'
import MenuMobile from 'src/components/Mobiles/MenuMobile'

const LayoutMobile = () => {
  return (
    <>
      <Outlet />
      <MenuMobile />
    </>
  )
}

export default LayoutMobile
