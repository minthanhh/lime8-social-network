interface Props {
  width: string
  height: string
}

const Heart = ({ height, width }: Props) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 32 32' fill='none'>
      <path
        d='M22.6663 6C19.8663 6 17.3997 7.4 15.9997 9.6C14.5997 7.4 12.133 6 9.33301 6C4.93301 6 1.33301 9.6 1.33301 14C1.33301 21.9333 15.9997 30 15.9997 30C15.9997 30 30.6663 22 30.6663 14C30.6663 9.6 27.0663 6 22.6663 6Z'
        fill='#F5F5F5'
      />
    </svg>
  )
}

export default Heart
