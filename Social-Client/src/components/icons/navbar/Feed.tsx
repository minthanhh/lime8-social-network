interface Props {
  width: string
  height: string
}

const Favorite = ({ width, height }: Props) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 20 20' fill='none'>
      <path
        d='M17.5 15.8331V10.2223C17.5 9.77018 17.408 9.32278 17.2297 8.90733C17.0513 8.49187 16.7903 8.11704 16.4625 7.80564L11.1483 2.75814C10.8386 2.46388 10.4277 2.2998 10.0004 2.2998C9.57318 2.2998 9.16225 2.46388 8.8525 2.75814L3.5375 7.80564C3.20971 8.11704 2.9487 8.49187 2.77034 8.90733C2.59198 9.32278 2.5 9.77018 2.5 10.2223V15.8331C2.5 16.2752 2.67559 16.6991 2.98816 17.0117C3.30072 17.3242 3.72464 17.4998 4.16667 17.4998H15.8333C16.2754 17.4998 16.6993 17.3242 17.0118 17.0117C17.3244 16.6991 17.5 16.2752 17.5 15.8331Z'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

export default Favorite

{
  /* <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20' fill='none'>
        <path
          d='M17.5 15.8331V10.2223C17.5 9.77018 17.408 9.32278 17.2297 8.90733C17.0513 8.49187 16.7903 8.11704 16.4625 7.80564L11.1483 2.75814C10.8386 2.46388 10.4277 2.2998 10.0004 2.2998C9.57318 2.2998 9.16225 2.46388 8.8525 2.75814L3.5375 7.80564C3.20971 8.11704 2.9487 8.49187 2.77034 8.90733C2.59198 9.32278 2.5 9.77018 2.5 10.2223V15.8331C2.5 16.2752 2.67559 16.6991 2.98816 17.0117C3.30072 17.3242 3.72464 17.4998 4.16667 17.4998H15.8333C16.2754 17.4998 16.6993 17.3242 17.0118 17.0117C17.3244 16.6991 17.5 16.2752 17.5 15.8331Z'
          stroke='url(#paint0_linear_982_6)'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
        />
        <defs>
          <linearGradient
            id='paint0_linear_982_6'
            x1='2'
            y1='9.99976'
            x2='17'
            y2='9.99976'
            gradientUnits='userSpaceOnUse'
          >
            <stop stop-color='#3B89F1' />
            <stop offset='1' stop-color='#34BAD0' />
          </linearGradient>
        </defs>
      </svg> */
}
