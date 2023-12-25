import Props from '../type'

const WatchAllSvg = ({ width, height }: Props) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 21 20' fill='none'>
      <path
        d='M2.87402 10.0001V15.8059C2.87402 17.7309 5.01832 18.9468 6.76405 18.0126L9.47447 16.5609M2.87402 6.66676V4.19426C2.87402 2.26926 5.01832 1.05343 6.76405 1.98759L17.6057 7.79426C18.0121 8.0071 18.3521 8.32484 18.5892 8.71342C18.8262 9.10199 18.9515 9.54677 18.9515 10.0001C18.9515 10.4534 18.8262 10.8982 18.5892 11.2868C18.3521 11.6754 18.0121 11.9931 17.6057 12.2059L12.1849 15.1093'
        strokeWidth='1.5'
        strokeLinecap='round'
        className='stroke-dark dark:stroke-light'
      />
    </svg>
  )
}

export default WatchAllSvg
