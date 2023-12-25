interface props {
  width: string
  height: string
}
const OpenEye = ({ width, height }: props) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 28 28' fill='none'>
    <path
      d='M17.675 13.6853C17.675 14.6599 17.2878 15.5947 16.5986 16.2839C15.9094 16.9731 14.9747 17.3603 14 17.3603C13.0253 17.3603 12.0906 16.9731 11.4014 16.2839C10.7122 15.5947 10.325 14.6599 10.325 13.6853C10.325 12.7106 10.7122 11.7758 11.4014 11.0866C12.0906 10.3974 13.0253 10.0103 14 10.0103C14.9747 10.0103 15.9094 10.3974 16.5986 11.0866C17.2878 11.7758 17.675 12.7106 17.675 13.6853Z'
      fill='url(#paint0_linear_919_6)'
    />
    <path
      d='M2.23999 13.6851C2.23999 13.6851 6.64999 5.6001 14 5.6001C21.35 5.6001 25.76 13.6851 25.76 13.6851C25.76 13.6851 21.35 21.7701 14 21.7701C6.64999 21.7701 2.23999 13.6851 2.23999 13.6851ZM14 18.8301C15.3645 18.8301 16.6732 18.288 17.6381 17.3232C18.6029 16.3583 19.145 15.0496 19.145 13.6851C19.145 12.3206 18.6029 11.0119 17.6381 10.047C16.6732 9.08216 15.3645 8.5401 14 8.5401C12.6355 8.5401 11.3268 9.08216 10.3619 10.047C9.39705 11.0119 8.85499 12.3206 8.85499 13.6851C8.85499 15.0496 9.39705 16.3583 10.3619 17.3232C11.3268 18.288 12.6355 18.8301 14 18.8301Z'
      fill='url(#paint1_linear_919_6)'
    />
    <defs>
      <linearGradient
        id='paint0_linear_919_6'
        x1='10.325'
        y1='14.0193'
        x2='17.675'
        y2='14.0193'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2ECEC2' />
        <stop offset='0.380208' stopColor='#34BAD0' />
        <stop offset={1} stopColor='#3B89F1' />
      </linearGradient>
      <linearGradient
        id='paint1_linear_919_6'
        x1='2.23999'
        y1='14.4201'
        x2='25.76'
        y2='14.4201'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2ECEC2' />
        <stop offset='0.380208' stopColor='#34BAD0' />
        <stop offset={1} stopColor='#3B89F1' />
      </linearGradient>
    </defs>
  </svg>
)

export default OpenEye
