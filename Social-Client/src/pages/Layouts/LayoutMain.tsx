import { Header } from 'src/components'
import { Outlet } from 'react-router-dom'
import { lazy, Suspense } from 'react'

const LazySidebarLeft = lazy(() => import('src/components/Sidebar/home/SidebarLeft'))
const LazySidebarRight = lazy(() => import('src/components/Sidebar/home/SidebarRight'))
import LayoutMainSkeleton from './skeletons/LayoutMainSkeleton'

const LayoutMain = () => {
  return (
    <div className='w-full bg-lightMain dark:bg-darkMain text-dark dark:text-light'>
      <Header />
      <div className='flex md:w-[90%] xl:w-4/5 w-full flex-col md:flex-row md:mx-auto relative -z-0'>
        <Suspense fallback={<LayoutMainSkeleton />}>
          <LazySidebarLeft />
          <Outlet />
          <LazySidebarRight />
        </Suspense>
      </div>
    </div>
  )
}

export default LayoutMain
