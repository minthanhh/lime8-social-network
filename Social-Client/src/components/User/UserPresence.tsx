import clsx from 'clsx'

export type AvatarSizes = 'sm' | 'lg' | 'md' | 'xl'

const avatarSizes: Record<AvatarSizes, string> = {
  md: '',
  lg: 'w-16 h-16',
  sm: 'w-12 h-12',
  xl: 'md:w-36 md:h-36 after:-m-[4px] w-24 h-24'
}

const borderSizes: Record<AvatarSizes, string> = {
  md: '',
  lg: 'w-16 h-16',
  sm: 'border-[1.5px]',
  xl: 'border-[2px]'
}

interface UserPresenceProps {
  source: string
  presence?: string
  alt: string
  size?: AvatarSizes
}

const UserPresence = ({ source, alt, presence, size = 'sm' }: UserPresenceProps) => {
  return (
    <div className={clsx('base-border-main flex flex-shrink', avatarSizes[size])}>
      <div className='aspect-square relative w-full'>
        <img
          loading='lazy'
          src={source}
          alt={alt}
          className={clsx(
            'w-full h-full object-cover absolute inset-0 rounded-full border-[1.5px] border-white',
            borderSizes[size]
          )}
        />

        {presence === 'active' && (
          <span className='absolute top-[2px] left-[2px] rounded-full bg-green-500 w-2 h-2'></span>
        )}
      </div>
    </div>
  )
}

export default UserPresence
