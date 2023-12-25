import { Link } from 'react-router-dom'
import { RobotNotFound, RobotNotFoundDark } from 'src/assets/bg'
import FangHeadSvg from 'src/assets/icons/components/navigations/FangHeadSvg'
import { Button } from 'src/components'
import { useTheme } from 'src/hooks/useTheme'

export default function NotFound() {
  const { chooseTheme } = useTheme()

  return (
    <div className='w-full h-full overflow-hidden p-4 md:p-10 bg-lightMain dark:bg-darkMain'>
      <div className='relative flex flex-col md:flex-row h-full w-full bg-[#F4F4F4] dark:bg-dark shadow-shadowMain rounded-[50px] gap-5 items-center justify-center'>
        <Link to='/home/feeds'>
          <div className='absolute flex items-cetner gap-3 top-10 left-5 md:left-20'>
            <FangHeadSvg color={chooseTheme ? 'black' : 'white'} width='50' height='50' />
            <span className='font-bold uppercase text-[30px] text-dark dark:text-light'>lime8</span>
          </div>
        </Link>

        <div className='w-[250px] md:w-[400px]'>
          <img src={chooseTheme ? RobotNotFound : RobotNotFoundDark} alt='Robot Page Not Found' />
        </div>

        <div className='flex flex-col gap-6 text-center items-center md:items-start md:text-left'>
          <h3 className='text-[30px] md:text-[60px] font-bold text-dark dark:text-light'>PAGE NOT FOUND</h3>

          <p className='text-dark dark:text-light text-sm font-semibold w-4/5 md:text-xl'>
            we could not find the page you were looking for
          </p>
          <Link to='/home/feeds'>
            <Button className='py-4 px-10'>Back to home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
