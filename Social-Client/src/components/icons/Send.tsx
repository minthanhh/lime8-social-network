interface Props {
  width: string
  height: string
}

const Send = ({ width, height }: Props) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 40 40' fill='none'>
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M5.67002 11.1215C5.23669 7.23153 9.24169 4.37486 12.78 6.05153L32.6867 15.4815C36.5 17.2865 36.5 22.7132 32.6867 24.5182L12.78 33.9499C9.24169 35.6265 5.23835 32.7699 5.67002 28.8799L6.47002 21.6665H20C20.442 21.6665 20.866 21.4909 21.1785 21.1784C21.4911 20.8658 21.6667 20.4419 21.6667 19.9999C21.6667 19.5578 21.4911 19.1339 21.1785 18.8213C20.866 18.5088 20.442 18.3332 20 18.3332H6.47169L5.67169 11.1215H5.67002Z'
        fill='#F5F5F5'
      />
    </svg>
  )
}

export default Send
