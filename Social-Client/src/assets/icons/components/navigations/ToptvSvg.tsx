import { NavigationProps } from '../../type'

const ToptvSvg = ({ width, height, active }: NavigationProps) => {
  return active ? (
    <svg xmlns='http://www.w3.org/2000/svg' width='17' height='17' viewBox='0 0 17 17' fill='none'>
      <path
        d='M14.6667 14.6667H1.83333V1.83333H14.6667M14.6667 0H1.83333C1.3471 0 0.880788 0.193154 0.536971 0.536971C0.193154 0.880788 0 1.3471 0 1.83333V14.6667C0 15.1529 0.193154 15.6192 0.536971 15.963C0.880788 16.3068 1.3471 16.5 1.83333 16.5H14.6667C15.1529 16.5 15.6192 16.3068 15.963 15.963C16.3068 15.6192 16.5 15.1529 16.5 14.6667V1.83333C16.5 1.3471 16.3068 0.880788 15.963 0.536971C15.6192 0.193154 15.1529 0 14.6667 0ZM6.41667 4.58333V11.9167L11 8.25L6.41667 4.58333Z'
        fill='url(#paint0_linear_1355_281)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_1355_281'
          x1='-1.84571e-08'
          y1='8'
          x2='16'
          y2='8'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#2ECEC2' />
          <stop offset='0.489583' stopColor='#34BAD0' />
          <stop offset='1' stopColor='#3B89F1' />
        </linearGradient>
      </defs>
    </svg>
  ) : (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 22 22' fill='none'>
      <path
        d='M17.4167 17.4167H4.58333V4.58333H17.4167M17.4167 2.75H4.58333C4.0971 2.75 3.63079 2.94315 3.28697 3.28697C2.94315 3.63079 2.75 4.0971 2.75 4.58333V17.4167C2.75 17.9029 2.94315 18.3692 3.28697 18.713C3.63079 19.0568 4.0971 19.25 4.58333 19.25H17.4167C17.9029 19.25 18.3692 19.0568 18.713 18.713C19.0568 18.3692 19.25 17.9029 19.25 17.4167V4.58333C19.25 4.0971 19.0568 3.63079 18.713 3.28697C18.3692 2.94315 17.9029 2.75 17.4167 2.75ZM9.16667 7.33333V14.6667L13.75 11L9.16667 7.33333Z'
        className='fill-dark dark:fill-light'
      />
    </svg>
  )
}

export default ToptvSvg
