import Props from '../../type'

const Close = ({ width, height }: Props) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 50 50' fill='none'>
      <path
        d='M15 15L35 35M35 15L15 35'
        strokeMiterlimit='10'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='stroke-2 stroke-dark dark:stroke-light'
      />
      <rect x='0.5' y='0.5' width='49' height='49' rx='24.5' stroke='url(#paint0_linear_893_108)' />
      <defs>
        <linearGradient id='paint0_linear_893_108' x1='0' y1='25' x2='50' y2='25' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#2ECEC2' />
          <stop offset='0.348958' stopColor='#34BAD0' />
          <stop offset='1' stopColor='#3B89F1' />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default Close
