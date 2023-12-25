import { NavigationProps } from '../../type'

const FriendsSvg = ({ width, height, active }: NavigationProps) => {
  return active ? (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24' fill='none'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.6699 13.1299C18.0399 14.0599 18.9999 15.3199 18.9999 16.9999V19.9999H22.9999V16.9999C22.9999 14.8199 19.4299 13.5299 16.6699 13.1299Z'
        fill='url(#paint0_linear_1014_1227)'
      />
      <path
        d='M9 12C11.2091 12 13 10.2091 13 8C13 5.79086 11.2091 4 9 4C6.79086 4 5 5.79086 5 8C5 10.2091 6.79086 12 9 12Z'
        fill='url(#paint1_linear_1014_1227)'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15 12C17.21 12 19 10.21 19 8C19 5.79 17.21 4 15 4C14.53 4 14.09 4.1 13.67 4.24C14.5305 5.30422 15 6.6314 15 8C15 9.3686 14.5305 10.6958 13.67 11.76C14.09 11.9 14.53 12 15 12ZM9 13C6.33 13 1 14.34 1 17V20H17V17C17 14.34 11.67 13 9 13Z'
        fill='url(#paint2_linear_1014_1227)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_1014_1227'
          x1='17'
          y1='16.5'
          x2='23.5'
          y2='16.5'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#2ECEC2' />
          <stop offset='0.369792' stopColor='#34BAD0' />
          <stop offset='1' stopColor='#3B89F1' />
        </linearGradient>
        <linearGradient id='paint1_linear_1014_1227' x1='5' y1='8' x2='12.5' y2='8' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#2ECEC2' />
          <stop offset='0.369792' stopColor='#34BAD0' />
          <stop offset='1' stopColor='#3B89F1' />
        </linearGradient>
        <linearGradient id='paint2_linear_1014_1227' x1='1' y1='11' x2='19' y2='11' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#2ECEC2' />
          <stop offset='0.369792' stopColor='#34BAD0' />
          <stop offset='1' stopColor='#3B89F1' />
        </linearGradient>
      </defs>
    </svg>
  ) : (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24' fill='none'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M16.6699 13.1299C18.0399 14.0599 18.9999 15.3199 18.9999 16.9999V19.9999H22.9999V16.9999C22.9999 14.8199 19.4299 13.5299 16.6699 13.1299Z'
        fill='#1B1D2A'
      />
      <path
        d='M9 12C11.2091 12 13 10.2091 13 8C13 5.79086 11.2091 4 9 4C6.79086 4 5 5.79086 5 8C5 10.2091 6.79086 12 9 12Z'
        fill='#1B1D2A'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15 12C17.21 12 19 10.21 19 8C19 5.79 17.21 4 15 4C14.53 4 14.09 4.1 13.67 4.24C14.5305 5.30422 15 6.6314 15 8C15 9.3686 14.5305 10.6958 13.67 11.76C14.09 11.9 14.53 12 15 12ZM9 13C6.33 13 1 14.34 1 17V20H17V17C17 14.34 11.67 13 9 13Z'
        fill='#1B1D2A'
      />
    </svg>
  )
}

export default FriendsSvg
