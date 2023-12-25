interface Props {
  width: string
  height: string
}

const AddSvg = ({ height, width, className }: Props & { className?: string }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        d='M12 21C10.346 21 9 19.654 9 18L9.053 14.947L6.018 15C4.346 15 3 13.654 3 12C3 10.346 4.346 9 6 9L9.053 8.946L9 6.018C9 4.346 10.346 3 12 3C13.654 3 15 4.346 15 6L15.055 8.946L18.018 9C19.654 9 21 10.346 21 12C21 13.654 19.654 15 18 15L15.055 14.947L15 18.018C15 19.654 13.654 21 12 21ZM11 13V18.018C11 18.551 11.449 19 12 19C12.551 19 13 18.551 13 18V13H18.018C18.551 13 19 12.551 19 12C19 11.449 18.551 11 18 11H13V6C13 5.431 12.551 5 12 5C11.449 5 11 5.449 11 6V11H6C5.431 11 5 11.449 5 12C5 12.551 5.449 13 6 13H11Z'
        fill='white'
      />
    </svg>
  )
}

export default AddSvg
