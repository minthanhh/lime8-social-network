import Props from '../type'

const AddFriend = ({ width, height }: Props) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 32 32'
      className='fill-dark dark:fill-light'
    >
      <path d='M24 24H23.7969C23.5573 22.8333 23.1354 21.7604 22.5312 20.7812C21.9271 19.8021 21.1927 18.9583 20.3281 18.25C19.4635 17.5417 18.4896 16.9896 17.4062 16.5938C16.3229 16.1979 15.1875 16 14 16C13.0833 16 12.1979 16.1198 11.3438 16.3594C10.4896 16.599 9.69271 16.9323 8.95312 17.3594C8.21354 17.7865 7.54167 18.3073 6.9375 18.9219C6.33333 19.5365 5.8125 20.2135 5.375 20.9531C4.9375 21.6927 4.59896 22.4896 4.35938 23.3438C4.11979 24.1979 4 25.0833 4 26H2C2 24.75 2.18229 23.5469 2.54688 22.3906C2.91146 21.2344 3.4375 20.1667 4.125 19.1875C4.8125 18.2083 5.625 17.3385 6.5625 16.5781C7.5 15.8177 8.5625 15.2188 9.75 14.7812C8.57292 14.0104 7.65625 13.0417 7 11.875C6.34375 10.7083 6.01042 9.41667 6 8C6 6.89583 6.20833 5.85938 6.625 4.89062C7.04167 3.92188 7.60938 3.07292 8.32812 2.34375C9.04688 1.61458 9.89583 1.04167 10.875 0.625C11.8542 0.208333 12.8958 0 14 0C15.1042 0 16.1406 0.208333 17.1094 0.625C18.0781 1.04167 18.9271 1.60938 19.6562 2.32812C20.3854 3.04688 20.9583 3.89583 21.375 4.875C21.7917 5.85417 22 6.89583 22 8C22 8.6875 21.9167 9.35938 21.75 10.0156C21.5833 10.6719 21.3333 11.2917 21 11.875C20.6667 12.4583 20.276 12.9948 19.8281 13.4844C19.3802 13.974 18.8542 14.4062 18.25 14.7812C19.4167 15.2292 20.4896 15.8438 21.4688 16.625C22.4479 17.4062 23.2917 18.3229 24 19.375V24ZM8 8C8 8.83333 8.15625 9.60938 8.46875 10.3281C8.78125 11.0469 9.20833 11.6823 9.75 12.2344C10.2917 12.7865 10.9271 13.2188 11.6562 13.5312C12.3854 13.8438 13.1667 14 14 14C14.8229 14 15.599 13.8438 16.3281 13.5312C17.0573 13.2188 17.6927 12.7917 18.2344 12.25C18.776 11.7083 19.2083 11.0729 19.5312 10.3438C19.8542 9.61458 20.0104 8.83333 20 8C20 7.17708 19.8438 6.40104 19.5312 5.67188C19.2188 4.94271 18.7917 4.30729 18.25 3.76562C17.7083 3.22396 17.0677 2.79167 16.3281 2.46875C15.5885 2.14583 14.8125 1.98958 14 2C13.1667 2 12.3906 2.15625 11.6719 2.46875C10.9531 2.78125 10.3177 3.20833 9.76562 3.75C9.21354 4.29167 8.78125 4.93229 8.46875 5.67188C8.15625 6.41146 8 7.1875 8 8ZM28 26H32V28H28V32H26V28H22V26H26V22H28V26Z' />
    </svg>
  )
}

export default AddFriend