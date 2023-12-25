import Props from '../type'

const EditSvg = ({ width, height }: Props) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 24 24' fill='none'>
      <path
        d='M12.9 6.85415L17.142 11.0972L7.242 20.9972H3V16.7542L12.9 6.85415ZM14.314 5.44015L16.435 3.31915C16.6225 3.13168 16.8768 3.02637 17.142 3.02637C17.4072 3.02637 17.6615 3.13168 17.849 3.31915L20.678 6.14715C20.8655 6.33468 20.9708 6.58899 20.9708 6.85415C20.9708 7.11932 20.8655 7.37363 20.678 7.56115L18.556 9.68315L14.314 5.44015Z'
        fill='white'
      />
    </svg>
  )
}

export default EditSvg
