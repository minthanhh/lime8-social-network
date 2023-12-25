interface Props {
  width: string
  height: string
  active: boolean
}

const Toptv = ({ width, height, active }: Props) => {
  return active ? (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24' fill='none'>
      <path
        d='M19.5 3H4.5C3.67157 3 3 3.67157 3 4.5V19.5C3 20.3284 3.67157 21 4.5 21H19.5C20.3284 21 21 20.3284 21 19.5V4.5C21 3.67157 20.3284 3 19.5 3Z'
        stroke='url(#paint0_linear_985_26)'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.25 12V8.10303L12.625 10.0515L16 12L12.625 13.9485L9.25 15.897V12Z'
        stroke='url(#paint1_linear_985_26)'
        strokeWidth='2'
        strokeLinejoin='round'
      />
      <defs>
        <linearGradient id='paint0_linear_985_26' x1='21' y1='12' x2='3' y2='12' gradientUnits='userSpaceOnUse'>
          <stop stopColor='#3B89F1' />
          <stop offset='0.291667' stopColor='#3997E7' />
          <stop offset='1' stopColor='#34BAD0' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_985_26'
          x1='12.625'
          y1='8.10303'
          x2='12.625'
          y2='15.897'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#3B89F1' />
          <stop offset='0.291667' stopColor='#3997E7' />
          <stop offset='1' stopColor='#34BAD0' />
        </linearGradient>
      </defs>
    </svg>
  ) : (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24' fill='none'>
      <path
        d='M19.5 3H4.5C3.67157 3 3 3.67157 3 4.5V19.5C3 20.3284 3.67157 21 4.5 21H19.5C20.3284 21 21 20.3284 21 19.5V4.5C21 3.67157 20.3284 3 19.5 3Z'
        stroke='#1B1D2A'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M9.25 12V8.10303L12.625 10.0515L16 12L12.625 13.9485L9.25 15.897V12Z'
        stroke='#1B1D2A'
        strokeWidth='2'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Toptv
