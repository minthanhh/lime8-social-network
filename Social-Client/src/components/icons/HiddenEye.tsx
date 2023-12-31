interface props {
  width: string
  height: string
}
const HiddenEye = ({ width, height }: props) => (
  <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 40 40' fill='none'>
    <path
      d='M4.99982 6.71908L6.71841 5.00049L34.9999 33.282L33.2813 35.0006L4.99982 6.71908ZM20.2609 15.007L24.9929 19.739C24.9272 18.5053 24.4075 17.3395 23.534 16.4659C22.6604 15.5924 21.4946 15.0727 20.2609 15.007ZM19.739 24.9929L15.007 20.2609C15.0727 21.4946 15.5924 22.6604 16.466 23.5339C17.3396 24.4075 18.5054 24.9272 19.739 24.9929Z'
      fill='url(#paint0_linear_942_638)'
    />
    <path
      d='M20 27.5C18.8462 27.5001 17.7079 27.2339 16.6738 26.7222C15.6396 26.2106 14.7374 25.4672 14.0375 24.55C13.3375 23.6328 12.8586 22.5664 12.638 21.4339C12.4174 20.3014 12.4611 19.1332 12.7656 18.0203L7.36953 12.6234C5.16563 14.6422 3.06562 17.2766 1.25 20C3.31406 23.4375 6.1375 26.9719 9.07812 28.9984C12.4516 31.3219 16.1195 32.5 19.9812 32.5C22.0916 32.5015 24.1862 32.1367 26.1719 31.4219L21.9836 27.2344C21.3373 27.4113 20.6701 27.5006 20 27.5ZM20 12.5C21.1538 12.4999 22.2921 12.7661 23.3262 13.2778C24.3604 13.7894 25.2626 14.5328 25.9625 15.45C26.6625 16.3672 27.1414 17.4336 27.362 18.5661C27.5826 19.6986 27.5389 20.8668 27.2344 21.9797L32.7547 27.5C35.032 25.4492 37.1352 22.6906 38.75 20C36.6891 16.607 33.8359 13.0812 30.8453 11.0297C27.4297 8.6875 23.7742 7.5 19.9812 7.5C17.8941 7.503 15.8245 7.88114 13.8711 8.61641L18.0203 12.7656C18.6654 12.5891 19.3312 12.4997 20 12.5Z'
      fill='url(#paint1_linear_942_638)'
    />
    <defs>
      <linearGradient
        id='paint0_linear_942_638'
        x1='19.9999'
        y1='5.00049'
        x2='19.9999'
        y2='35.0006'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#2ECEC2' />
        <stop offset='0.34375' stopColor='#2ECEC2' />
        <stop offset={1} stopColor='#3B89F1' />
      </linearGradient>
      <linearGradient id='paint1_linear_942_638' x1={20} y1='7.5' x2={20} y2='32.5' gradientUnits='userSpaceOnUse'>
        <stop stopColor='#2ECEC2' />
        <stop offset='0.34375' stopColor='#2ECEC2' />
        <stop offset={1} stopColor='#3B89F1' />
      </linearGradient>
    </defs>
  </svg>
)

export default HiddenEye
