import Props from '../../type'

const ReportSvg = ({ width, height }: Props) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 40 40' fill='none'>
      <path
        opacity='0.3'
        d='M15.1663 8.33301L8.33301 15.1663V24.833L15.1663 31.6663H24.833L31.6663 24.833V15.1663L24.833 8.33301H15.1663ZM19.9997 28.333C19.083 28.333 18.333 27.583 18.333 26.6663C18.333 25.7497 19.083 24.9997 19.9997 24.9997C20.9163 24.9997 21.6663 25.7497 21.6663 26.6663C21.6663 27.583 20.9163 28.333 19.9997 28.333ZM21.6663 23.333H18.333V11.6663H21.6663V23.333Z'
        fill='white'
      />
      <path
        d='M26.2167 5H13.7833L5 13.7833V26.2167L13.7833 35H26.2167L35 26.2167V13.7833L26.2167 5ZM31.6667 24.8333L24.8333 31.6667H15.1667L8.33333 24.8333V15.1667L15.1667 8.33333H24.8333L31.6667 15.1667V24.8333Z'
        fill='url(#paint0_linear_828_411)'
      />
      <path
        d='M19.9997 28.3333C20.9201 28.3333 21.6663 27.5871 21.6663 26.6667C21.6663 25.7462 20.9201 25 19.9997 25C19.0792 25 18.333 25.7462 18.333 26.6667C18.333 27.5871 19.0792 28.3333 19.9997 28.3333Z'
        fill='url(#paint1_linear_828_411)'
      />
      <path d='M18.333 11.667H21.6663V23.3337H18.333V11.667Z' fill='url(#paint2_linear_828_411)' />
      <defs>
        <linearGradient id='paint0_linear_828_411' x1='5' y1='20' x2='36' y2='20' gradientUnits='userSpaceOnUse'>
          <stop offset='0.0260417' stopColor='#2ECEC2' />
          <stop offset='0.307292' stopColor='#34BAD0' />
          <stop offset='1' stopColor='#3B89F1' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_828_411'
          x1='19.9997'
          y1='25'
          x2='19.9997'
          y2='28.3333'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0.0260417' stopColor='#2ECEC2' />
          <stop offset='0.307292' stopColor='#34BAD0' />
          <stop offset='1' stopColor='#3B89F1' />
        </linearGradient>
        <linearGradient
          id='paint2_linear_828_411'
          x1='19.9997'
          y1='11.667'
          x2='19.9997'
          y2='23.3337'
          gradientUnits='userSpaceOnUse'
        >
          <stop offset='0.0260417' stopColor='#2ECEC2' />
          <stop offset='0.307292' stopColor='#34BAD0' />
          <stop offset='1' stopColor='#3B89F1' />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default ReportSvg
