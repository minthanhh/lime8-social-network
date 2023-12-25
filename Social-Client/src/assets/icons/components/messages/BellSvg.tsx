import Props from '../../type'

const BellSvg = ({ width, height }: Props) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 40 40' fill='none'>
      <path
        d='M16.6667 34.9997H23.3333C23.3333 36.833 21.8333 38.333 20 38.333C18.1667 38.333 16.6667 36.833 16.6667 34.9997ZM35 31.6663V33.333H5V31.6663L8.33333 28.333V18.333C8.33333 13.1663 11.6667 8.66634 16.6667 7.16634V6.66634C16.6667 4.83301 18.1667 3.33301 20 3.33301C21.8333 3.33301 23.3333 4.83301 23.3333 6.66634V7.16634C28.3333 8.66634 31.6667 13.1663 31.6667 18.333V28.333L35 31.6663ZM28.3333 18.333C28.3333 13.6663 24.6667 9.99967 20 9.99967C15.3333 9.99967 11.6667 13.6663 11.6667 18.333V29.9997H28.3333V18.333Z'
        fill='url(#paint0_linear_828_422)'
      />
      <defs>
        <linearGradient
          id='paint0_linear_828_422'
          x1='8.5'
          y1='20.9997'
          x2='32'
          y2='20.9997'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#2ECEC2' />
          <stop offset='0.307292' stopColor='#34BAD0' />
          <stop offset='1' stopColor='#3B89F1' />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default BellSvg
