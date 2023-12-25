import clsx from 'clsx'
import { useTheme } from 'src/hooks/useTheme'

const ToggleTheme = () => {
  const { toggleTheme, chooseTheme } = useTheme()

  return (
    <button onClick={toggleTheme} className='button-toggle-shadow p-1 w-14 h-7 rounded-full flex items-center'>
      <div
        className={clsx(
          'absolute rounded-full w-6 h-6 transition-all ease-linear bg-light dark:bg-dark duration-200 flex items-center justify-center',
          chooseTheme ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        <i
          className={clsx(
            'text-xs dark:text-light text-yellow-500 fa-solid animate-animateSpin',
            chooseTheme ? 'fa-sun' : 'fa-moon'
          )}
        ></i>
      </div>
    </button>
  )
}

export default ToggleTheme
