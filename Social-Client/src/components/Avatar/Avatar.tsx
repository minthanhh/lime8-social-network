export type AvatarSizes = 'sm' | 'lg' | 'md'

const avatarSizes: Record<AvatarSizes, string> = {
  md: 'lg:w-14 lg:h-14 md:w-12 md:h-12 w-10 h-10',
  lg: 'w-16 h-16',
  sm: 'w-8 h-8'
}

interface AvatarProps {
  subs?: string
  size?: AvatarSizes
  fullName: string
  avatar: string
  style?: any
}

const Avatar = ({ fullName, avatar, size = 'sm', subs, style }: AvatarProps) => {
  return (
    <div className='flex items-center gap-3 text-dark dark:text-light'>
      <div className={`${avatarSizes[size]}`}>
        <div className='rounded-full overflow-hidden relative pt-[100%]'>
          <img src={avatar} className='absolute w-full h-full object-cover inset-0' alt='' />
        </div>
      </div>

      <div style={style} className='flex flex-col gap-1'>
        <h3 className='font-bold md:text-xs lg:text-sm text-dark dark:text-light'>{fullName}</h3>
        <span className='text-[10px] md:text-xs font-medium'>{subs}</span>
      </div>
    </div>
  )
}

export default Avatar
