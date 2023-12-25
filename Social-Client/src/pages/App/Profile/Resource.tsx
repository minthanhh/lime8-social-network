import { NavLink, Outlet } from 'react-router-dom'
import { Article, Button } from 'src/components'

const Resource = () => {
  return (
    <Article className='p-3'>
      <nav className='flex items-center mb-4'>
        <NavLink to='' className={({ isActive }) => (isActive ? 'px-6 py-2 border-b-2 border-dark' : 'px-6 py-2')}>
          Ảnh
        </NavLink>
        <NavLink
          to='resources-video'
          className={({ isActive }) => (isActive ? 'px-6 py-2 border-b-2 border-dark' : 'px-6 py-2')}
        >
          Video
        </NavLink>

        <Button className='py-2 px-3 ml-auto' rounded='rounded-xl'>
          Thêm ảnh & Video
        </Button>
      </nav>

      <div className='flex flex-wrap -m-1'>
        <Outlet />
      </div>
    </Article>
  )
}

export default Resource
