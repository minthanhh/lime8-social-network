import Props from '../../type'

const OnlyMe = ({ width, height, className }: Props & { className?: string }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={width} height={height} viewBox='0 0 45 45' fill='none'>
      <path
        d='M35.5714 21H33.8571V16.5C33.8571 11.2625 28.9857 7 23 7C17.0143 7 12.1429 11.2625 12.1429 16.5V21H10.4286C8.53571 21 7 22.3438 7 24V36C7 37.6562 8.53571 39 10.4286 39H35.5714C37.4643 39 39 37.6562 39 36V24C39 22.3438 37.4643 21 35.5714 21ZM28.1429 21H17.8571V16.5C17.8571 14.0187 20.1643 12 23 12C25.8357 12 28.1429 14.0187 28.1429 16.5V21Z'
        className={className ? className : 'fill-dark dark:fill-light'}
      />
    </svg>
  )
}

export default OnlyMe
